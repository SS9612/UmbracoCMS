var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UMB_PREVIEW_CONTEXT } from '../preview.context.js';
import { css, customElement, html, nothing, repeat, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbLanguageCollectionRepository } from '@umbraco-cms/backoffice/language';
let UmbPreviewCultureElement = class UmbPreviewCultureElement extends UmbLitElement {
    constructor() {
        super(...arguments);
        this.#languageRepository = new UmbLanguageCollectionRepository(this);
        this._cultures = [];
    }
    #languageRepository;
    connectedCallback() {
        super.connectedCallback();
        this.#getCultures();
    }
    async #getCultures() {
        const { data: langauges } = await this.#languageRepository.requestCollection({ skip: 0, take: 100 });
        this._cultures = langauges?.items ?? [];
        const searchParams = new URLSearchParams(window.location.search);
        const culture = searchParams.get('culture');
        if (culture && culture !== this._culture?.unique) {
            this._culture = this._cultures.find((c) => c.unique === culture);
        }
    }
    async #onClick(culture) {
        if (this._culture === culture)
            return;
        this._culture = culture;
        const previewContext = await this.getContext(UMB_PREVIEW_CONTEXT);
        previewContext?.updateIFrame({ culture: culture.unique });
    }
    render() {
        if (this._cultures.length <= 1)
            return nothing;
        return html `
			<uui-button look="primary" popovertarget="cultures-popover">
				<div>
					<uui-icon name="icon-globe"></uui-icon>
					<span>${this._culture?.name ?? this.localize.term('treeHeaders_languages')}</span>
				</div>
			</uui-button>
			<uui-popover-container id="cultures-popover" placement="top-end">
				<umb-popover-layout>
					${repeat(this._cultures, (item) => item.unique, (item) => html `
							<uui-menu-item
								label=${item.name}
								?active=${item.unique === this._culture?.unique}
								@click=${() => this.#onClick(item)}>
								<uui-icon slot="icon" name="icon-globe"></uui-icon>
							</uui-menu-item>
						`)}
				</umb-popover-layout>
			</uui-popover-container>
		`;
    }
    static { this.styles = [
        css `
			:host {
				display: flex;
				border-left: 1px solid var(--uui-color-header-contrast);
				--uui-button-font-weight: 400;
				--uui-button-padding-left-factor: 3;
				--uui-button-padding-right-factor: 3;
			}

			uui-button > div {
				display: flex;
				align-items: center;
				gap: 5px;
			}

			umb-popover-layout {
				--uui-color-surface: var(--uui-color-header-surface);
				--uui-color-border: var(--uui-color-header-surface);
				color: var(--uui-color-header-contrast);
			}
		`,
    ]; }
};
__decorate([
    state()
], UmbPreviewCultureElement.prototype, "_culture", void 0);
__decorate([
    state()
], UmbPreviewCultureElement.prototype, "_cultures", void 0);
UmbPreviewCultureElement = __decorate([
    customElement('umb-preview-culture')
], UmbPreviewCultureElement);
export { UmbPreviewCultureElement };
export { UmbPreviewCultureElement as element };
