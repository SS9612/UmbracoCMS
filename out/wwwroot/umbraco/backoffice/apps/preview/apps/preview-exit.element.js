var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UMB_PREVIEW_CONTEXT } from '../preview.context.js';
import { css, customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
let UmbPreviewExitElement = class UmbPreviewExitElement extends UmbLitElement {
    async #onClick() {
        const previewContext = await this.getContext(UMB_PREVIEW_CONTEXT);
        previewContext?.exitPreview(0);
    }
    render() {
        return html `
			<uui-button look="primary" @click=${this.#onClick}>
				<div>
					<uui-icon name="icon-power"></uui-icon>
					<span>${this.localize.term('preview_endLabel')}</span>
				</div>
			</uui-button>
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
		`,
    ]; }
};
UmbPreviewExitElement = __decorate([
    customElement('umb-preview-exit')
], UmbPreviewExitElement);
export { UmbPreviewExitElement };
export { UmbPreviewExitElement as element };
