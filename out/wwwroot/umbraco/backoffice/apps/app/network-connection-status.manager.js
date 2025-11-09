import { UmbControllerBase } from '@umbraco-cms/backoffice/class-api';
import { UmbLocalizationController } from '@umbraco-cms/backoffice/localization-api';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
export class UmbNetworkConnectionStatusManager extends UmbControllerBase {
    #notificationContext;
    #offlineNotification;
    #localize = new UmbLocalizationController(this);
    constructor(host) {
        super(host);
        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (notificationContext) => {
            this.#notificationContext = notificationContext;
        });
        window.addEventListener('online', () => this.#onOnline());
        window.addEventListener('offline', () => this.#onOffline());
    }
    #onOnline() {
        this.#offlineNotification?.close();
        this.#notificationContext?.peek('positive', {
            data: {
                headline: this.#localize.term('speechBubbles_onlineHeadline'),
                message: this.#localize.term('speechBubbles_onlineMessage'),
            },
        });
    }
    #onOffline() {
        this.#offlineNotification = this.#notificationContext?.stay('danger', {
            data: {
                headline: this.#localize.term('speechBubbles_offlineHeadline'),
                message: this.#localize.term('speechBubbles_offlineMessage'),
            },
        });
    }
    destroy() {
        this.#offlineNotification?.close();
        this.removeEventListener('online', () => this.#onOnline());
        this.removeEventListener('offline', () => this.#onOffline());
        super.destroy();
    }
}
