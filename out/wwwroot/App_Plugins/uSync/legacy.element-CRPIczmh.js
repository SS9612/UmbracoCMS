import { html as i, nothing as w, css as S, state as C, customElement as L } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as x } from "@umbraco-cms/backoffice/lit-element";
import { UMB_MODAL_MANAGER_CONTEXT as h, UMB_CONFIRM_MODAL as p } from "@umbraco-cms/backoffice/modal";
import { USYNC_CORE_CONTEXT_TOKEN as T } from "@jumoo/uSync";
var O = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, _ = (e) => {
  throw TypeError(e);
}, f = (e, t, o, a) => {
  for (var n = a > 1 ? void 0 : a ? $(t, o) : t, s = e.length - 1, u; s >= 0; s--)
    (u = e[s]) && (n = (a ? u(t, o, n) : u(n)) || n);
  return a && n && O(t, o, n), n;
}, y = (e, t, o) => t.has(e) || _("Cannot " + o), v = (e, t, o) => (y(e, t, "read from private field"), o ? o.call(e) : t.get(e)), d = (e, t, o) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), E = (e, t, o, a) => (y(e, t, "write to private field"), t.set(e, o), o), g = (e, t, o) => (y(e, t, "access private method"), o), r, l, m, b;
let c = class extends x {
  constructor() {
    super(), d(this, l), d(this, r), this.consumeContext(T, (e) => {
      e && (E(this, r, e), this.observe(e.legacy, (t) => {
        this._legacy = t;
      }));
    });
  }
  render() {
    return i`<umb-body-layout>
			${this.renderLegacyNote()} ${this.renderActions()}
		</umb-body-layout>`;
  }
  renderLegacyNote() {
    var e, t;
    return i` <uui-box headline="Legacy uSync files detected">
			<p>
				uSync has found an old uSync folder at
				<strong>${((e = this._legacy) == null ? void 0 : e.legacyFolder) ?? ""}</strong>. It is likely that the
				content will need converting in some way.
			</p>
			${this.renderLegacyTypes((t = this._legacy) == null ? void 0 : t.legacyTypes)}
		</uui-box>`;
  }
  renderLegacyTypes(e) {
    if (e == null || e.length == 0)
      return w;
    const t = e.map((o) => i`<li>${o}</li>`);
    return i`
			<div>
				<h3>Obsolete DataTypes</h3>
				<p>
					The following DataTypes - found in the legacy folder - are no longer supported
					in Umbraco 14+ and will need to be converted.
				</p>
				<ul>
					${t}
				</ul>
				<p>
					You can convert these DataTypes using
					<a href="https://github.com/Jumoo/uSyncMigrations" target="_blank"
						>uSync.Migrations</a
					><br />
				</p>
			</div>
		`;
  }
  renderActions() {
    var e, t;
    return i`
			<div class="legacy-actions">
				<uui-box>
					<div class="actions">
						<uui-button
							label="copy"
							color="positive"
							look="primary"
							@click=${g(this, l, m)}
							>Overwrite v${(e = this._legacy) == null ? void 0 : e.latestVersion} folder</uui-button
						>
						<p>
							Copy the contents of the legacy folder to the new
							${(t = this._legacy) == null ? void 0 : t.latestFolder} folder
						</p>
					</div>
				</uui-box>

				<uui-box>
					<div class="actions">
						<uui-button
							label="ignore"
							color="warning"
							look="primary"
							@click=${g(this, l, b)}
							>Ignore legacy folder</uui-button
						>
						<p>Ignore the legacy folder and continue</p>
					</div>
				</uui-box>
			</div>
		`;
  }
};
r = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
m = async function() {
  var o, a;
  const e = await this.getContext(h), t = e == null ? void 0 : e.open(this, p, {
    data: {
      headline: this.localize.term("uSync_legacyCopyTitle", [
        (o = this._legacy) == null ? void 0 : o.latestVersion
      ]),
      content: i`${this.localize.term("uSync_legacyCopyContent", [
        (a = this._legacy) == null ? void 0 : a.latestFolder
      ])}`,
      color: "danger",
      confirmLabel: "Copy"
    }
  });
  t == null || t.onSubmit().then(async () => {
    var n;
    await ((n = v(this, r)) == null ? void 0 : n.copyLegacy()), window.location.reload();
  }).catch(() => {
    console.log("copy cancelled");
  });
};
b = async function() {
  const e = await this.getContext(h), t = e == null ? void 0 : e.open(this, p, {
    data: {
      headline: this.localize.term("uSync_legacyIgnoreTitle"),
      content: i`${this.localize.term("uSync_legacyIgnoreContent")}`,
      color: "danger",
      confirmLabel: "Ignore"
    }
  });
  t == null || t.onSubmit().then(async () => {
    var o;
    await ((o = v(this, r)) == null ? void 0 : o.ignoreLegacy()), window.location.reload();
  }).catch(() => {
    console.log("ignore cancelled");
  });
};
c.styles = S`
		uui-box {
			margin-bottom: var(--uui-size-3);
		}

		.legacy-actions {
			display: flex;
			gap: var(--uui-size-space-4);
			justify-content: space-between;
		}

		.legacy-actions uui-box {
			flex-basis: 50%;
		}

		.legacy-actions .actions {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		uui-button {
			font-size: var(--uui-type-h5-size);
		}
	`;
f([
  C()
], c.prototype, "_legacy", 2);
c = f([
  L("usync-sync-legacy-files")
], c);
const A = c;
export {
  c as SyncLegacyFilesElement,
  A as default
};
//# sourceMappingURL=legacy.element-CRPIczmh.js.map
