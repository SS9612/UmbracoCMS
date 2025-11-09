import { isUmbContextProvideEventType, isUmbContextUnprovidedEventType, UMB_CONTEXT_PROVIDE_EVENT_TYPE, UMB_CONTEXT_UNPROVIDED_EVENT_TYPE, } from '../provide/context-provide.event.js';
import { UmbContextRequestEventImplementation } from './context-request.event.js';
/**
 * @class UmbContextConsumer
 * @description The context consumer class, used to consume a context from a host element.
 * Notice it is not recommended to use this class directly, but rather use the `consumeContext` method from a `UmbElement` or `UmbElementMixin` or `UmbControllerBase` or `UmbClassMixin`.
 * Alternatively, you can use the `UmbContextConsumerController` to consume a context from a host element. But this does require that you can implement one of the Class Mixins mentioned above.
 */
export class UmbContextConsumer {
    #raf;
    #skipHost;
    #stopAtContextMatch;
    #callback;
    #promise;
    #promiseOptions;
    #promiseResolver;
    #promiseRejecter;
    #instance;
    get instance() {
        return this.#instance;
    }
    #contextAlias;
    #apiAlias;
    #discriminator;
    /**
     * Creates an instance of UmbContextConsumer.
     * @param {Element} host - The host element.
     * @param {string} contextIdentifier - The context identifier, an alias or a Context Token.
     * @param {UmbContextCallback} callback - The callback.
     * @memberof UmbContextConsumer
     */
    constructor(host, contextIdentifier, callback) {
        this.#stopAtContextMatch = true;
        this._onResponse = (instance) => {
            if (this.#instance === instance) {
                this.#resolvePromise();
                return true;
            }
            if (instance === undefined) {
                throw new Error('Not allowed to set context api instance to undefined.');
            }
            if (this.#discriminator) {
                // Notice if discriminator returns false, we do not want to setInstance. [NL]
                if (this.#discriminator(instance)) {
                    this.setInstance(instance);
                    return true;
                }
            }
            else {
                this.setInstance(instance);
                return true;
            }
            return false;
        };
        this.#currentTarget = window;
        this.#onProvide = (event) => {
            // Does seem a bit unnecessary, we could just assume the type via type casting...
            if (!isUmbContextProvideEventType(event))
                return;
            if (this.#contextAlias === event.contextAlias) {
                this.request();
            }
        };
        this.#onUnprovided = (event) => {
            // Does seem a bit unnecessary, we could just assume the type via type casting...
            if (!isUmbContextUnprovidedEventType(event))
                return;
            if (this.#contextAlias === event.contextAlias && event.instance === this.#instance) {
                this.#unprovide();
            }
        };
        if (typeof host === 'function') {
            this._retrieveHost = host;
        }
        else {
            this._retrieveHost = () => host;
        }
        const idSplit = contextIdentifier.toString().split('#');
        this.#contextAlias = idSplit[0];
        this.#apiAlias = idSplit[1] ?? 'default';
        this.#callback = callback;
        this.#discriminator = contextIdentifier.getDiscriminator?.();
    }
    getHostElement() {
        return this._retrieveHost();
    }
    /**
     * @public
     * @memberof UmbContextConsumer
     * @description Make the consumption skip the contexts provided by the Host element.
     * @returns {UmbContextConsumer} - The current instance of the UmbContextConsumer.
     */
    skipHost() {
        this.#skipHost = true;
        return this;
    }
    /**
     * @public
     * @memberof UmbContextConsumer
     * @description Pass beyond any context aliases that matches this.
     * The default behavior is to stop at first Context Alias match, this is to avoid receiving unforeseen descending contexts.
     * @returns {UmbContextConsumer} - The current instance of the UmbContextConsumer.
     */
    passContextAliasMatches() {
        this.#stopAtContextMatch = false;
        return this;
    }
    async setInstance(instance) {
        this.#instance = instance;
        this.#setCurrentTarget(instance.getHostElement());
        await this.#callback?.(instance); // Resolve callback first as it might perform something you like completed before resolving the promise, as the promise might be used to determine when things are ready/initiated [NL]
        this.#resolvePromise();
    }
    #resolvePromise() {
        if (this.#promiseResolver && this.#instance !== undefined) {
            this.#promiseResolver(this.#instance);
            this.#promise = undefined;
            this.#promiseOptions = undefined;
            this.#promiseResolver = undefined;
            this.#promiseRejecter = undefined;
        }
        if (!this.#callback) {
            this.destroy();
        }
    }
    #rejectPromise() {
        if (this.#promiseRejecter) {
            const hostElement = this._retrieveHost();
            // If we still have the rejecter, it means that the context was not found immediately, so lets reject the promise. [NL]
            this.#promiseRejecter?.(`Context could not be found. (Context Alias: ${this.#contextAlias} with API Alias: ${this.#apiAlias}). Controller is hosted on ${hostElement?.parentNode?.nodeName ?? 'Not attached node'} > ${hostElement?.nodeName}`);
            this.#promise = undefined;
            this.#promiseOptions = undefined;
            this.#promiseResolver = undefined;
            this.#promiseRejecter = undefined;
        }
        if (!this.#callback) {
            this.destroy();
        }
    }
    /**
     * @public
     * @memberof UmbContextConsumer
     * @param {UmbContextConsumerAsPromiseOptionsType} options - Prevent the promise from timing out.
     * @description Get the context as a promise.
     * @returns {UmbContextConsumer} - A promise that resolves when the context is consumed.
     */
    asPromise(options) {
        return (this.#promise ??
            (this.#promise = new Promise((resolve, reject) => {
                if (this.#instance) {
                    this.#promiseOptions = undefined;
                    this.#promiseResolver = undefined;
                    this.#promiseRejecter = undefined;
                    resolve(this.#instance);
                }
                else {
                    this.#promiseOptions = options;
                    this.#promiseResolver = resolve;
                    this.#promiseRejecter = reject;
                }
            })));
    }
    /**
     * @public
     * @memberof UmbContextConsumer
     * @description Request the context from the host element.
     */
    request() {
        if (this.#raf !== undefined) {
            cancelAnimationFrame(this.#raf);
        }
        const event = new UmbContextRequestEventImplementation(this.#contextAlias, this.#apiAlias, this._onResponse, this.#stopAtContextMatch);
        (this.#skipHost ? this._retrieveHost()?.parentNode : this._retrieveHost())?.dispatchEvent(event);
        if (this.#promiseResolver && this.#promiseOptions?.preventTimeout !== true) {
            this.#raf = requestAnimationFrame(() => {
                // For unproviding, then setInstance to undefined here. [NL]
                this.#rejectPromise();
                this.#raf = undefined;
            });
        }
    }
    hostConnected() {
        this.#setupCurrentTarget();
        this.request();
    }
    hostDisconnected() {
        if (this.#raf !== undefined) {
            cancelAnimationFrame(this.#raf);
            this.#raf = undefined;
        }
        this.#unprovide();
        if (this.#promiseRejecter) {
            const hostElement = this._retrieveHost();
            this.#promiseRejecter(`Context request was cancelled, host was disconnected. (Context Alias: ${this.#contextAlias} with API Alias: ${this.#apiAlias}). Controller is hosted on ${hostElement?.parentNode?.nodeName ?? 'Not attached node'} > ${hostElement?.nodeName}`);
        }
        this.#promise = undefined;
        this.#promiseOptions = undefined;
        this.#promiseResolver = undefined;
        this.#promiseRejecter = undefined;
        this.#dismentalCurrentTarget();
        this.#currentTarget = window;
    }
    #currentTarget;
    #setCurrentTarget(target) {
        this.#dismentalCurrentTarget();
        this.#currentTarget = target ?? window;
        this.#setupCurrentTarget();
    }
    #setupCurrentTarget() {
        this.#currentTarget.addEventListener(UMB_CONTEXT_PROVIDE_EVENT_TYPE, this.#onProvide);
        // TODO: consider not listening if it does not have a Context....
        this.#currentTarget.addEventListener(UMB_CONTEXT_UNPROVIDED_EVENT_TYPE, this.#onUnprovided);
    }
    #dismentalCurrentTarget() {
        if (this.#currentTarget) {
            this.#currentTarget.removeEventListener(UMB_CONTEXT_PROVIDE_EVENT_TYPE, this.#onProvide);
            this.#currentTarget.removeEventListener(UMB_CONTEXT_UNPROVIDED_EVENT_TYPE, this.#onUnprovided);
        }
    }
    #onProvide;
    #onUnprovided;
    #unprovide() {
        if (this.#instance !== undefined) {
            this.#instance = undefined;
            this.#callback?.(undefined);
        }
    }
    destroy() {
        this.hostDisconnected();
        this._retrieveHost = undefined;
        this.#callback = undefined;
        this.#promise = undefined;
        this.#promiseOptions = undefined;
        this.#promiseResolver = undefined;
        this.#promiseRejecter = undefined;
        this.#instance = undefined;
        this.#discriminator = undefined;
    }
}
