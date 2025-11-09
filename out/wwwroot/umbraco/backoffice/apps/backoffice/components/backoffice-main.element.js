var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UMB_BACKOFFICE_CONTEXT } from '../backoffice.context.js';
import { css, html, customElement, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbSectionContext, UMB_SECTION_PATH_PATTERN } from '@umbraco-cms/backoffice/section';
import { createExtensionElement } from '@umbraco-cms/backoffice/extension-api';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
let UmbBackofficeMainElement = class UmbBackofficeMainElement extends UmbLitElement {
    constructor() {
        super();
        this._routes = [];
        this._sections = [];
        this.consumeContext(UMB_BACKOFFICE_CONTEXT, (_instance) => {
            this._backofficeContext = _instance;
            this._observeBackoffice();
        });
    }
    async _observeBackoffice() {
        if (this._backofficeContext) {
            this.observe(this._backofficeContext.allowedSections, (sections) => {
                this._sections = sections.filter((x) => x.manifest);
                this._createRoutes();
            }, 'observeAllowedSections');
        }
    }
    _createRoutes() {
        if (!this._sections)
            return;
        // TODO: Refactor this for re-use across the app where the routes are re-generated at any time.
        const newRoutes = this._sections.map((section) => {
            return {
                path: UMB_SECTION_PATH_PATTERN.generateLocal({ sectionName: section.manifest.meta.pathname }),
                component: () => createExtensionElement(section.manifest, 'umb-section-default'),
                setup: (component) => {
                    const manifest = section.manifest;
                    if (manifest) {
                        component.manifest = section.manifest;
                        this._backofficeContext?.setActiveSectionAlias(manifest.alias);
                        this._provideSectionContext(manifest);
                    }
                },
            };
        });
        if (newRoutes.length > 0) {
            newRoutes.push({
                path: '',
                pathMatch: 'full',
                awaitStability: true,
                redirectTo: newRoutes[0].path,
            });
            newRoutes.push({
                path: `**`,
                component: async () => (await import('@umbraco-cms/backoffice/router')).UmbRouteNotFoundElement,
            });
        }
        this._routes = newRoutes;
    }
    _provideSectionContext(sectionManifest) {
        if (!this._sectionContext) {
            this._sectionContext = new UmbSectionContext(this);
        }
        this._sectionContext.setManifest(sectionManifest);
    }
    render() {
        return this._routes.length > 0 ? html `<umb-router-slot .routes=${this._routes}></umb-router-slot>` : nothing;
    }
    static { this.styles = [
        css `
			:host {
				display: block;
				background-color: var(--uui-color-background);
				width: 100%;
				height: calc(
					100% - 60px
				); /* 60 => top header height, TODO: Make sure this comes from somewhere so it is maintainable and eventually responsive. */
			}
		`,
    ]; }
};
__decorate([
    state()
], UmbBackofficeMainElement.prototype, "_routes", void 0);
__decorate([
    state()
], UmbBackofficeMainElement.prototype, "_sections", void 0);
UmbBackofficeMainElement = __decorate([
    customElement('umb-backoffice-main')
], UmbBackofficeMainElement);
export { UmbBackofficeMainElement };
