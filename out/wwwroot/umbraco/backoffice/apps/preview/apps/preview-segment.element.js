var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UMB_PREVIEW_CONTEXT } from '../preview.context.js';
import { css, customElement, html, nothing, repeat, state, } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbSegmentCollectionRepository } from '@umbraco-cms/backoffice/segment';
let UmbPreviewSegmentElement = class UmbPreviewSegmentElement extends UmbLitElement {
    constructor() {
        super(...arguments);
        this.#segmentRepository = new UmbSegmentCollectionRepository(this);
        this._segments = [];
    }
    #segmentRepository;
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.#loadSegments();
    }
    async #loadSegments() {
        const { data } = await this.#segmentRepository.requestCollection({ skip: 0, take: 100 });
        this._segments = data?.items ?? [];
        const searchParams = new URLSearchParams(window.location.search);
        const segment = searchParams.get('segment');
        if (segment && segment !== this._segment?.unique) {
            this._segment = this._segments.find((c) => c.unique === segment);
        }
    }
    async #onClick(segment) {
        if (this._segment === segment)
            return;
        this._segment = segment;
        const previewContext = await this.getContext(UMB_PREVIEW_CONTEXT);
        previewContext?.updateIFrame({ segment: segment?.unique });
    }
    render() {
        if (!this._segments.length)
            return nothing;
        return html `
			<uui-button look="primary" popovertarget="segments-popover">
				<div>
					<uui-icon name="icon-filter"></uui-icon>
					<span>${this._segment?.name ?? 'Segments'}</span>
				</div>
			</uui-button>
			<uui-popover-container id="segments-popover" placement="top-end">
				<umb-popover-layout>
					<uui-menu-item label="Default" ?active=${!this._segment} @click=${() => this.#onClick()}></uui-menu-item>
					${repeat(this._segments, (item) => item.unique, (item) => html `
							<uui-menu-item
								label=${item.name}
								?active=${item.unique === this._segment?.unique}
								@click=${() => this.#onClick(item)}>
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
], UmbPreviewSegmentElement.prototype, "_segment", void 0);
__decorate([
    state()
], UmbPreviewSegmentElement.prototype, "_segments", void 0);
UmbPreviewSegmentElement = __decorate([
    customElement('umb-preview-segment')
], UmbPreviewSegmentElement);
export { UmbPreviewSegmentElement };
export { UmbPreviewSegmentElement as element };
