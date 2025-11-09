import { UmbBooleanState, UmbStringState } from '@umbraco-cms/backoffice/observable-api';
import { umbConfirmModal } from '@umbraco-cms/backoffice/modal';
import { UmbContextBase } from '@umbraco-cms/backoffice/class-api';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbDocumentPreviewRepository } from '@umbraco-cms/backoffice/document';
import { UMB_SERVER_CONTEXT } from '@umbraco-cms/backoffice/server';
const UMB_LOCALSTORAGE_SESSION_KEY = 'umb:previewSessions';
export class UmbPreviewContext extends UmbContextBase {
    #unique;
    #culture;
    #segment;
    #serverUrl;
    #webSocket;
    #iframeReady;
    #previewUrl;
    #documentPreviewRepository;
    constructor(host) {
        super(host, UMB_PREVIEW_CONTEXT);
        this.#serverUrl = '';
        this.#iframeReady = new UmbBooleanState(false);
        this.iframeReady = this.#iframeReady.asObservable();
        this.#previewUrl = new UmbStringState(undefined);
        this.previewUrl = this.#previewUrl.asObservable();
        this.#documentPreviewRepository = new UmbDocumentPreviewRepository(this);
        this.#currentArgs = {};
        this.consumeContext(UMB_SERVER_CONTEXT, (instance) => {
            this.#serverUrl = instance?.getServerUrl() ?? '';
            const params = new URLSearchParams(window.location.search);
            this.#unique = params.get('id');
            this.#culture = params.get('culture');
            this.#segment = params.get('segment');
            if (!this.#unique) {
                console.error('No unique ID found in query string.');
                return;
            }
            this.#setPreviewUrl();
        });
    }
    #configureWebSocket() {
        if (this.#webSocket && this.#webSocket.readyState < 2)
            return;
        const url = `${this.#serverUrl.replace('https://', 'wss://')}/umbraco/PreviewHub`;
        this.#webSocket = new WebSocket(url);
        this.#webSocket.addEventListener('open', () => {
            // NOTE: SignalR protocol handshake; it requires a terminating control character.
            const endChar = String.fromCharCode(30);
            this.#webSocket?.send(`{"protocol":"json","version":1}${endChar}`);
        });
        this.#webSocket.addEventListener('message', (event) => {
            if (!event?.data)
                return;
            // NOTE: Strip the terminating control character, (from SignalR).
            const data = event.data.substring(0, event.data.length - 1);
            const json = JSON.parse(data);
            if (json.type === 1 && json.target === 'refreshed') {
                const pageId = json.arguments?.[0];
                if (pageId === this.#unique) {
                    this.#setPreviewUrl({ rnd: Math.random() });
                }
            }
        });
    }
    #getSessionCount() {
        return Math.max(Number(localStorage.getItem(UMB_LOCALSTORAGE_SESSION_KEY)), 0) || 0;
    }
    #setPreviewUrl(args) {
        const host = args?.serverUrl || this.#serverUrl;
        const unique = args?.unique || this.#unique;
        if (!unique) {
            throw new Error('No unique ID found in query string.');
        }
        const url = new URL(unique, host);
        const params = new URLSearchParams(url.search);
        const culture = args?.culture || this.#culture;
        const segment = args?.segment || this.#segment;
        const cultureParam = 'culture';
        const rndParam = 'rnd';
        const segmentParam = 'segment';
        if (culture) {
            params.set(cultureParam, culture);
        }
        else {
            params.delete(cultureParam);
        }
        if (args?.rnd) {
            params.set(rndParam, args.rnd.toString());
        }
        else {
            params.delete(rndParam);
        }
        if (segment) {
            params.set(segmentParam, segment);
        }
        else {
            params.delete(segmentParam);
        }
        const previewUrl = new URL(url.pathname + '?' + params.toString(), host);
        const previewUrlString = previewUrl.toString();
        this.#previewUrl.setValue(previewUrlString);
    }
    #setSessionCount(sessions) {
        localStorage.setItem(UMB_LOCALSTORAGE_SESSION_KEY, sessions.toString());
    }
    checkSession() {
        const sessions = this.#getSessionCount();
        if (sessions > 0)
            return;
        umbConfirmModal(this._host, {
            headline: `Preview website?`,
            content: `You have ended preview mode, do you want to enable it again to view the latest saved version of your website?`,
            cancelLabel: 'View published version',
            confirmLabel: 'Preview latest version',
        })
            .then(() => {
            this.restartSession();
        })
            .catch(() => {
            this.exitSession();
        });
    }
    async exitPreview(sessions = 0) {
        this.#setSessionCount(sessions);
        // We are good to end preview mode.
        if (sessions <= 0) {
            await this.#documentPreviewRepository.exit();
        }
        if (this.#webSocket) {
            this.#webSocket.close();
            this.#webSocket = undefined;
        }
        const url = this.#previewUrl.getValue();
        window.location.replace(url);
    }
    async exitSession() {
        let sessions = this.#getSessionCount();
        sessions--;
        this.exitPreview(sessions);
    }
    iframeLoaded(iframe) {
        if (!iframe)
            return;
        this.#configureWebSocket();
        this.#iframeReady.setValue(true);
    }
    getIFrameWrapper() {
        return this.getHostElement().shadowRoot?.querySelector('#wrapper');
    }
    openWebsite() {
        const url = this.#previewUrl.getValue();
        window.open(url, '_blank');
    }
    reloadIFrame(iframe) {
        const document = iframe.contentDocument;
        if (!document)
            return;
        document.location.reload();
    }
    async restartSession() {
        await this.#documentPreviewRepository.enter();
        this.startSession();
    }
    startSession() {
        let sessions = this.#getSessionCount();
        sessions++;
        this.#setSessionCount(sessions);
    }
    #currentArgs;
    async updateIFrame(args) {
        const mergedArgs = { ...this.#currentArgs, ...args };
        const wrapper = this.getIFrameWrapper();
        if (!wrapper)
            return;
        const scaleIFrame = () => {
            if (wrapper.className === 'fullsize') {
                wrapper.style.transform = '';
            }
            else {
                const wScale = document.body.offsetWidth / (wrapper.offsetWidth + 30);
                const hScale = document.body.offsetHeight / (wrapper.offsetHeight + 30);
                const scale = Math.min(wScale, hScale, 1); // get the lowest ratio, but not higher than 1
                wrapper.style.transform = `scale(${scale})`;
            }
        };
        window.addEventListener('resize', scaleIFrame);
        wrapper.addEventListener('transitionend', scaleIFrame);
        this.#iframeReady.setValue(false);
        const params = new URLSearchParams(window.location.search);
        if (mergedArgs.culture) {
            params.set('culture', mergedArgs.culture);
        }
        else {
            params.delete('culture');
        }
        if (mergedArgs.segment) {
            params.set('segment', mergedArgs.segment);
        }
        else {
            params.delete('segment');
        }
        const newRelativePathQuery = window.location.pathname + '?' + params.toString();
        history.pushState(null, '', newRelativePathQuery);
        this.#currentArgs = mergedArgs;
        this.#setPreviewUrl({ culture: mergedArgs.culture, segment: mergedArgs.segment });
        if (mergedArgs.className)
            wrapper.className = mergedArgs.className;
        if (mergedArgs.height)
            wrapper.style.height = mergedArgs.height;
        if (mergedArgs.width)
            wrapper.style.width = mergedArgs.width;
    }
}
export const UMB_PREVIEW_CONTEXT = new UmbContextToken('UmbPreviewContext');
