import { UmbElementMixin as G } from "@umbraco-cms/backoffice/element-api";
import { LitElement as w, html as l, css as E, property as m, customElement as P, classMap as B, when as N, state as A } from "@umbraco-cms/backoffice/external/lit";
import { USYNC_CORE_CONTEXT_TOKEN as F } from "@jumoo/uSync";
var H = Object.defineProperty, T = Object.getOwnPropertyDescriptor, C = (e) => {
  throw TypeError(e);
}, u = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? T(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && H(t, s, i), i;
}, j = (e, t, s) => t.has(e) || C("Cannot " + s), L = (e, t, s) => t.has(e) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), R = (e, t, s) => (j(e, t, "access private method"), s), g, M;
let c = class extends w {
  constructor() {
    super(...arguments), L(this, g);
  }
  render() {
    return l`
			<div class="usync-setting-value">
				<div class="info">
					<h5>${this.name}</h5>
					<div>${this.description}</div>
				</div>
				<div class="value">${R(this, g, M).call(this)}</div>
			</div>
		`;
  }
};
g = /* @__PURE__ */ new WeakSet();
M = function() {
  if (this.value === void 0 || this.value === null)
    return l`(Not Set)`;
  if (typeof this.value == "boolean") {
    const e = { _set: this.value };
    return l`
				<uui-icon
					name=${this.value ? "icon-check" : "icon-wrong"}
					class=${B(e)}></uui-icon>
			`;
  } else if (Array.isArray(this.value)) {
    const e = this.value.map((t) => l`<li>${t}</li>`);
    return l`<ul>
					${e}
				</ul>`;
  } else
    return l` <div>${this.value}</div> `;
};
c.styles = E`
		.usync-setting-value {
			display: flex;
			justify-content: space-between;
			padding: var(--uui-size-space-2) 0;
			border-bottom: 1px solid var(--uui-color-divider);
		}

		.usync-setting-value h5 {
			margin: 0;
			padding: 0;
		}

		uui-icon {
			color: var(--uui-color-danger);
		}

		uui-icon._set {
			color: var(--uui-color-positive);
		}

		ul {
			list-style: none;
		}
	`;
u([
  m({ type: String })
], c.prototype, "name", 2);
u([
  m({ type: String })
], c.prototype, "description", 2);
u([
  m()
], c.prototype, "value", 2);
c = u([
  P("usync-setting-item")
], c);
var V = Object.defineProperty, I = Object.getOwnPropertyDescriptor, S = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? I(t, s) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && V(t, s, i), i;
};
let o = class extends G(w) {
  constructor() {
    super(), this.consumeContext(F, (e) => {
      e && (this.observe(e.settings, (t) => {
        t && (this.settings = t, e.getDefaultHandlerSetSettings(this.settings.defaultSet ?? "Default"));
      }), this.observe(e.handlerSettings, (t) => {
        t && (this.handlerSettings = t);
      }), e.getSettings());
    });
  }
  render() {
    var e, t, s, n, i, r, a, d, h, y, p, v, $, _, f, z, U, b, D, x;
    return l`
			<umb-body-layout>
				<div class="usync-settings-layout">
					<div>
						<uui-box headline=${this.localize.term("USyncSettings_settings")}>
							<usync-setting-item
								.name=${this.localize.term("USyncSettings_importAtStartup")}
								.description=${this.localize.term("USyncSettings_importAtStartupDesc")}
								.value=${(e = this.settings) == null ? void 0 : e.importAtStartup}></usync-setting-item>
							<usync-setting-item
								.name=${this.localize.term("USyncSettings_exportAtStartup")}
								.description=${this.localize.term("USyncSettings_exportAtStartupDesc")}
								.value=${(t = this.settings) == null ? void 0 : t.exportAtStartup}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_exportOnSave")}
								.description=${this.localize.term("USyncSettings_exportOnSaveDesc")}
								.value=${(s = this.settings) == null ? void 0 : s.exportOnSave}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_uiEnabledGroups")}
								.description=${this.localize.term("USyncSettings_uiEnabledGroupsDesc")}
								.value=${(n = this.settings) == null ? void 0 : n.uiEnabledGroups}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_failOnMissingParent")}
								.description=${this.localize.term(
      "USyncSettings_failOnMissingParentDesc"
    )}
								.value=${(i = this.settings) == null ? void 0 : i.failOnMissingParent}></usync-setting-item>
						</uui-box>

						<uui-box headline=${this.localize.term("USyncSettings_filesAndFolders")}>
							<usync-setting-item
								.name=${this.localize.term("USyncSettings_rootSite")}
								.description=${this.localize.term("USyncSettings_rootSiteDesc")}
								.value=${(r = this.settings) == null ? void 0 : r.isRootSite}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_rootLocked")}
								.description=${this.localize.term("USyncSettings_rootLockedDesc")}
								.value=${(a = this.settings) == null ? void 0 : a.lockRoot}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_folders")}
								.description=${this.localize.term("USyncSettings_foldersDesc")}
								.value=${(d = this.settings) == null ? void 0 : d.folders}></usync-setting-item>
						</uui-box>
					</div>

					<div>
						<uui-box headline=${this.localize.term("USyncSettings_handlerDefaults")}>
							<usync-setting-item
								.name=${this.localize.term("USyncSettings_handlerSet")}
								.description=${this.localize.term("USyncSettings_handlerSetDesc")}
								.value=${(h = this.settings) == null ? void 0 : h.defaultSet}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_flatStructure")}
								.description=${this.localize.term("USyncSettings_flatStructureDesc")}
								.value=${(p = (y = this.handlerSettings) == null ? void 0 : y.handlerDefaults) == null ? void 0 : p.useFlatStructure}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_guidNames")}
								.description=${this.localize.term("USyncSettings_guidNamesDesc")}
								.value=${($ = (v = this.handlerSettings) == null ? void 0 : v.handlerDefaults) == null ? void 0 : $.guidNames}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_handlerGroups")}
								.description=${this.localize.term("USyncSettings_handlerGroupsDesc")}
								.value=${(f = (_ = this.handlerSettings) == null ? void 0 : _.handlerDefaults) == null ? void 0 : f.group}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_failOnMissingParent")}
								.description=${this.localize.term(
      "USyncSettings_failOnMissingParentDesc"
    )}
								.value=${(U = (z = this.handlerSettings) == null ? void 0 : z.handlerDefaults) == null ? void 0 : U.failOnMissingParent}></usync-setting-item>

							<usync-setting-item
								.name=${this.localize.term("USyncSettings_disabledHandlers")}
								.description=${this.localize.term("USyncSettings_disabledHandlersDesc")}
								.value=${(b = this.handlerSettings) == null ? void 0 : b.disabledHandlers}></usync-setting-item>
						</uui-box>
						<uui-box headline=${this.localize.term("USyncSettings_bootSettings")}>
							<usync-setting-item
								.name=${this.localize.term("USyncSettings_firstBoot")}
								.description=${this.localize.term("USyncSettings_firstBootDesc")}
								.value=${(D = this.settings) == null ? void 0 : D.importOnFirstBoot}></usync-setting-item>
							${N(
      (x = this.settings) == null ? void 0 : x.importOnFirstBoot,
      () => {
        var O;
        return l` <usync-setting-item
										.name=${this.localize.term("USyncSettings_firstBootGroup")}
										.description=${this.localize.term("USyncSettings_firstBootGroupDesc")}
										.value=${(O = this.settings) == null ? void 0 : O.firstBootGroup}></usync-setting-item>`;
      }
    )}
						</uui-box>
					</div>
				</div>
				<div class="setting-link">
					<umb-localize key="USyncSettings_help"></umb-localize>
				</div>
			</umb-body-layout>
		`;
  }
};
o.styles = E`
		:host {
			display: block;
			margin: calc(var(--uui-size-space-4) * -1) 0;
		}

		.usync-settings-layout {
			display: grid;
			grid-template-columns: 5fr 5fr;
			grid-template-rows: auto auto;
			gap: var(--uui-size-space-4) var(--uui-size-space-4);
			grid-auto-flow: row;
			grid-template-areas: 'settings info', 'handler info';
		}

		.setting-link {
			text-align: center;
		}

		uui-box {
			margin: var(--uui-size-space-4) 0;
		}
	`;
S([
  A()
], o.prototype, "settings", 2);
S([
  A()
], o.prototype, "handlerSettings", 2);
o = S([
  P("usync-settings-view")
], o);
const X = o;
export {
  o as USyncSettingsViewElement,
  X as default,
  c as uSyncSettingItemElement
};
//# sourceMappingURL=settings.element-BlTkOcq7.js.map
