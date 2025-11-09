import { html as o, nothing as d, css as m, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as p, UmbModalToken as v } from "@umbraco-cms/backoffice/modal";
var g = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, y = (e) => {
  throw TypeError(e);
}, f = (e, t, a, n) => {
  for (var r = n > 1 ? void 0 : n ? _(t, a) : t, c = e.length - 1, s; c >= 0; c--)
    (s = e[c]) && (r = (n ? s(t, a, r) : s(r)) || r);
  return n && r && g(t, a, r), r;
}, C = (e, t, a) => t.has(e) || y("Cannot " + a), S = (e, t, a) => t.has(e) ? y("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), L = (e, t, a) => (C(e, t, "access private method"), a), i, u;
let l = class extends p {
  constructor() {
    super(...arguments), S(this, i);
  }
  render() {
    var e, t;
    return o`
			<umb-body-layout headline="Legacy uSync folder detected">
				<div class="content">
					${this.renderLegacyFolder((e = this.data) == null ? void 0 : e.legacyFolder)}
					${this.renderLegacyTypes((t = this.data) == null ? void 0 : t.legacyTypes)} ${this.renderCopy()}
				</div>
				<div slot="actions">
					<uui-button id="cancel" label="close" @click=${L(this, i, u)}>
						${this.localize.term("general_close")}
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
  renderLegacyFolder(e) {
    return e == null ? d : o`${this.localize.term("uSync.legacyInfo", [e])}`;
  }
  renderLegacyTypes(e) {
    var a;
    if (e == null || e.length == 0)
      return d;
    const t = (a = this.data) == null ? void 0 : a.legacyTypes.map((n) => o`<li>${n}</li>`);
    return o`<div>
			${this.localize.term("uSync.legacyObsolete", [t])}
		</div>`;
  }
  renderCopy() {
    var e;
    return o`${this.localize.term("uSync.legacyCopy", [
      ((e = this.data) == null ? void 0 : e.legacyFolder) ?? "uSync/v15"
    ])} `;
  }
};
i = /* @__PURE__ */ new WeakSet();
u = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
};
l.styles = m`
		.content {
			margin: -10px 0;
		}

		em {
			color: var(--uui-color-positive);
		}
	`;
l = f([
  h("usync-legacy-modal")
], l);
const E = l, M = new v(
  "usync.legacy.modal",
  {
    modal: {
      type: "dialog",
      size: "small"
    }
  }
);
export {
  M as USYNC_LEGACY_MODAL,
  E as default,
  l as uSyncLegacyModalElement
};
//# sourceMappingURL=legacy-modal-element-CKIH2-p4.js.map
