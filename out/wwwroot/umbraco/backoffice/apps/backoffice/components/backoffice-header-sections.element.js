var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UMB_BACKOFFICE_CONTEXT } from '../backoffice.context.js';
import { css, html, customElement, state, repeat, ifDefined } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
let UmbBackofficeHeaderSectionsElement = class UmbBackofficeHeaderSectionsElement extends UmbLitElement {
    constructor() {
        super();
        this._sections = [];
        this._currentSectionAlias = '';
        this.consumeContext(UMB_BACKOFFICE_CONTEXT, (backofficeContext) => {
            this._backofficeContext = backofficeContext;
            this._observeSections();
            this._observeCurrentSection();
        });
    }
    _observeSections() {
        if (!this._backofficeContext)
            return;
        this.observe(this._backofficeContext.allowedSections, (allowedSections) => {
            const oldValue = this._sections;
            this._sections = allowedSections;
            this.requestUpdate('_sections', oldValue);
        }, 'observeSections');
    }
    _observeCurrentSection() {
        if (!this._backofficeContext)
            return;
        this.observe(this._backofficeContext.activeSectionAlias, (currentSectionAlias) => {
            this._currentSectionAlias = currentSectionAlias || '';
        }, 'observeCurrentSection');
    }
    render() {
        return html `
			<uui-tab-group id="tabs" data-mark="section-links">
				${repeat(this._sections, (section) => section.alias, (section) => html `
						<uui-tab
							?active="${this._currentSectionAlias === section.alias}"
							href="${`section/${section.manifest?.meta.pathname}`}"
							label="${ifDefined(section.manifest?.meta.label
            ? this.localize.string(section.manifest?.meta.label)
            : section.manifest?.name)}"
							data-mark="section-link:${section.alias}"></uui-tab>
					`)}
			</uui-tab-group>
		`;
    }
    static { this.styles = [
        css `
			:host {
				display: contents;
			}
			#tabs {
				height: 60px;
				flex-basis: 100%;
				font-size: 16px; /* specific for the header */
				--uui-tab-text: var(--uui-color-header-contrast);
				--uui-tab-text-hover: var(--uui-color-header-contrast-emphasis);
				--uui-tab-text-active: var(--uui-color-header-contrast-emphasis);
				background-color: var(--uui-color-header-background);
				--uui-tab-group-dropdown-background: var(--uui-color-header-surface);
			}
		`,
    ]; }
};
__decorate([
    state()
], UmbBackofficeHeaderSectionsElement.prototype, "_sections", void 0);
__decorate([
    state()
], UmbBackofficeHeaderSectionsElement.prototype, "_currentSectionAlias", void 0);
UmbBackofficeHeaderSectionsElement = __decorate([
    customElement('umb-backoffice-header-sections')
], UmbBackofficeHeaderSectionsElement);
export { UmbBackofficeHeaderSectionsElement };
