var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UMB_PREVIEW_CONTEXT } from '../preview.context.js';
import { css, customElement, html, property, repeat } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
let UmbPreviewDeviceElement = class UmbPreviewDeviceElement extends UmbLitElement {
    constructor() {
        super(...arguments);
        this.#devices = [
            {
                alias: 'fullsize',
                label: 'Fit browser',
                css: 'fullsize',
                icon: 'icon-application-window-alt',
                dimensions: { height: '100%', width: '100%' },
            },
            {
                alias: 'desktop',
                label: 'Desktop',
                css: 'desktop shadow',
                icon: 'icon-display',
                dimensions: { height: '1080px', width: '1920px' },
            },
            {
                alias: 'laptop',
                label: 'Laptop',
                css: 'laptop shadow',
                icon: 'icon-laptop',
                dimensions: { height: '768px', width: '1366px' },
            },
            {
                alias: 'ipad-portrait',
                label: 'Tablet portrait',
                css: 'ipad-portrait shadow',
                icon: 'icon-ipad',
                dimensions: { height: '929px', width: '769px' },
            },
            {
                alias: 'ipad-landscape',
                label: 'Tablet landscape',
                css: 'ipad-landscape shadow flip',
                icon: 'icon-ipad',
                dimensions: { height: '675px', width: '1024px' },
            },
            {
                alias: 'smartphone-portrait',
                label: 'Smartphone portrait',
                css: 'smartphone-portrait shadow',
                icon: 'icon-iphone',
                dimensions: { height: '640px', width: '360px' },
            },
            {
                alias: 'smartphone-landscape',
                label: 'Smartphone landscape',
                css: 'smartphone-landscape shadow flip',
                icon: 'icon-iphone',
                dimensions: { height: '360px', width: '640px' },
            },
        ];
        this.device = this.#devices[0];
    }
    #devices;
    connectedCallback() {
        super.connectedCallback();
        this.#changeDevice(this.device);
    }
    async #changeDevice(device) {
        if (device === this.device)
            return;
        this.device = device;
        const previewContext = await this.getContext(UMB_PREVIEW_CONTEXT);
        previewContext?.updateIFrame({
            className: device.css,
            height: device.dimensions.height,
            width: device.dimensions.width,
        });
    }
    render() {
        return html `
			<uui-button look="primary" popovertarget="devices-popover">
				<div>
					<uui-icon name=${this.device.icon} class=${this.device.css.includes('flip') ? 'flip' : ''}></uui-icon>
					<span>${this.device.label}</span>
				</div>
			</uui-button>
			<uui-popover-container id="devices-popover" placement="top-end">
				<umb-popover-layout>
					${repeat(this.#devices, (item) => item.alias, (item) => html `
							<uui-menu-item
								label=${item.label}
								?active=${item === this.device}
								@click=${() => this.#changeDevice(item)}>
								<uui-icon slot="icon" name=${item.icon} class=${item.css.includes('flip') ? 'flip' : ''}></uui-icon>
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
    property({ attribute: false, type: Object })
], UmbPreviewDeviceElement.prototype, "device", void 0);
UmbPreviewDeviceElement = __decorate([
    customElement('umb-preview-device')
], UmbPreviewDeviceElement);
export { UmbPreviewDeviceElement };
export { UmbPreviewDeviceElement as element };
