import { UmbLocalizationController } from '@umbraco-cms/backoffice/localization-api';
import { UmbControllerHostElementMixin } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextConsumerController, UmbContextProviderController } from '@umbraco-cms/backoffice/context-api';
import { UmbObserverController, simpleHashCode } from '@umbraco-cms/backoffice/observable-api';
export const UmbElementMixin = (superClass) => {
    class UmbElementMixinClass extends UmbControllerHostElementMixin(superClass) {
        #localize;
        get localize() {
            return (this.#localize ??= new UmbLocalizationController(this));
        }
        observe(
        // This type dance checks if the Observable given could be undefined, if it potentially could be undefined it means that this potentially could return undefined and then call the callback with undefined. [NL]
        source, callback, controllerAlias) {
            // Fallback to use a hash of the provided method, but only if the alias is undefined and there is a callback.
            if (controllerAlias === undefined && callback) {
                controllerAlias = simpleHashCode(callback.toString());
            }
            else if (controllerAlias === null) {
                // if value is null, then reset it to undefined. Null is used to explicitly tell that we do not want a controller alias. [NL]
                controllerAlias = undefined;
            }
            if (source) {
                return new UmbObserverController(this, source, callback, controllerAlias);
            }
            else {
                callback?.(undefined);
                this.removeUmbControllerByAlias(controllerAlias);
                return undefined;
            }
        }
        provideContext(alias, instance) {
            return new UmbContextProviderController(this, alias, instance);
        }
        consumeContext(alias, callback) {
            return new UmbContextConsumerController(this, alias, callback);
        }
        async getContext(contextAlias, options) {
            const controller = new UmbContextConsumerController(this, contextAlias);
            if (options) {
                if (options.passContextAliasMatches) {
                    controller.passContextAliasMatches();
                }
                if (options.skipHost) {
                    controller.skipHost();
                }
            }
            return controller.asPromise(options);
        }
    }
    return UmbElementMixinClass;
};
