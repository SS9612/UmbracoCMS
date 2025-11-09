var No = Object.defineProperty;
var On = (t) => {
  throw TypeError(t);
};
var Do = (t, e, n) => e in t ? No(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var xn = (t, e, n) => Do(t, typeof e != "symbol" ? e + "" : e, n), Gt = (t, e, n) => e.has(t) || On("Cannot " + n);
var h = (t, e, n) => (Gt(t, e, "read from private field"), n ? n.call(t) : e.get(t)), m = (t, e, n) => e.has(t) ? On("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), v = (t, e, n, s) => (Gt(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n), mt = (t, e, n) => (Gt(t, e, "access private method"), n);
import { UMB_AUTH_CONTEXT as ps } from "@umbraco-cms/backoffice/auth";
import { css as O, property as A, customElement as x, LitElement as ze, html as p, ifDefined as _s, nothing as R, classMap as nt, state as f, when as It, query as Mo } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as ut } from "@umbraco-cms/backoffice/element-api";
import { USYNC_SIGNALR_CONTEXT_TOKEN as gs, HandlerStatus as je, ChangeType as ee, USYNC_DETAILS_MODAL as Lo, USYNC_IMPORT_SINGLE_MODAL as Uo, uSyncConstants as T, uSyncActionRepository as fs, USYNC_CORE_CONTEXT_TOKEN as ms, uSyncWorkspaceContext as Ho, uSyncActionDataSource as zo, USyncSettingsDataSource as Wo, uSyncMigrationDataSource as Bo, ActionsService as Fe, MigrationsService as Xt, SettingsService as yt, uSyncMenuElement as jo, SyncLegacyFilesCondition as Fo } from "@jumoo/uSync";
import { UMB_MODAL_MANAGER_CONTEXT as Ht, UmbModalBaseElement as zt, UmbModalToken as Wt } from "@umbraco-cms/backoffice/modal";
import { diffWords as Vo } from "@umbraco-cms/backoffice/utils";
import { UmbLitElement as We } from "@umbraco-cms/backoffice/lit-element";
import { UmbObjectState as Je, UmbArrayState as vt, UmbBooleanState as Nn } from "@umbraco-cms/backoffice/observable-api";
import { UmbContextToken as ys } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerBase as fn } from "@umbraco-cms/backoffice/class-api";
import * as Dn from "@jumoo/uSync/external/signalr";
import { UMB_WORKSPACE_CONTEXT as qo } from "@umbraco-cms/backoffice/workspace";
import { UmbTextStyles as Yo } from "@umbraco-cms/backoffice/style";
import { tryExecute as L } from "@umbraco-cms/backoffice/resources";
import { UmbConditionBase as vs, umbExtensionsRegistry as Ss } from "@umbraco-cms/backoffice/extension-registry";
import { UmbExtensionsManifestInitializer as Ko } from "@umbraco-cms/backoffice/extension-api";
import { UMB_SECTION_CONTEXT as ws } from "@umbraco-cms/backoffice/section";
import { UmbId as Go } from "@umbraco-cms/backoffice/id";
import { UmbTemporaryFileManager as Xo, TemporaryFileStatus as bs } from "@umbraco-cms/backoffice/temporary-file";
const Jo = "change", Zo = "uploaded";
class Qo extends Event {
  constructor(e) {
    super(Jo, {
      bubbles: !0,
      composed: !0,
      cancelable: !1
    }), this.file = e;
  }
}
class ei extends Event {
  constructor(e) {
    super(Zo, {
      bubbles: !0,
      composed: !0,
      cancelable: !1
    }), this.result = e;
  }
}
const ti = "usync-action-click";
class ni extends Event {
  constructor(e) {
    super(ti, {
      bubbles: !0,
      composed: !0,
      cancelable: !1
    }), this.button = e;
  }
}
const si = "perform-action";
class oi extends Event {
  constructor(e, n, s, o, i) {
    super(si, {
      bubbles: !0,
      composed: !0,
      cancelable: !1
    }), this.group = e, this.key = n, this.force = s, this.clean = o, this.file = i;
  }
}
var ii = Object.defineProperty, ri = Object.getOwnPropertyDescriptor, Es = (t) => {
  throw TypeError(t);
}, Bt = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? ri(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && ii(e, n, o), o;
}, ai = (t, e, n) => e.has(t) || Es("Cannot " + n), ci = (t, e, n) => e.has(t) ? Es("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), li = (t, e, n) => (ai(t, e, "access private method"), n), cn, $s;
let Te = class extends ze {
  constructor() {
    super(...arguments), ci(this, cn), this.disabled = !1;
  }
  render() {
    var e, n;
    const t = this.group.buttons.map((s) => p`
				<usync-action-button
					.button=${s}
					.disabled=${this.disabled}
					state=${_s(this.state)}
					@usync-action-click=${(o) => li(this, cn, $s).call(this, o, this.group)}></usync-action-button>
			`);
    return p`
			<uui-box class="action-box ${this.disabled ? "disabled" : ""}">
				<div class="box-content">
					<h2 class="box-heading">${(e = this.group) == null ? void 0 : e.groupName}</h2>
					<umb-icon name=${(n = this.group) == null ? void 0 : n.icon}></umb-icon>
					<div class="box-buttons">${t}</div>
				</div>
			</uui-box>
		`;
  }
};
cn = /* @__PURE__ */ new WeakSet();
$s = function(t, e) {
  t != null && t.button && this.dispatchEvent(
    new oi(
      e,
      t.button.key,
      t.button.force,
      t.button.clean,
      t.button.file
    )
  );
};
Te.styles = O`
		:host {
			flex-grow: 1;
		}

		.action-box {
			transition: opacity 0.2s ease-in-out;
		}

		.box-content {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.box-heading {
			font-size: var(--uui-size-8);
			margin: 0;
		}

		umb-icon {
			margin: var(--uui-size-8) 0 var(--uui-size-10);
			font-size: var(--uui-type-h2-size);
			color: var(--uui-color-text-alt);
		}

		uui-button {
			margin: 0 var(--uui-size-space-2);
			font-size: var(--uui-size-6);
		}

		.box-buttons {
			margin: var(--uui-size-space-2) 0;
		}

		.disabled {
			opacity: 0.4;
		}
	`;
Bt([
  A({ type: Object })
], Te.prototype, "group", 2);
Bt([
  A({ type: String })
], Te.prototype, "state", 2);
Bt([
  A({ type: Boolean })
], Te.prototype, "disabled", 2);
Te = Bt([
  x("usync-action-box")
], Te);
var hi = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, Cs = (t) => {
  throw TypeError(t);
}, ge = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? ui(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && hi(e, n, o), o;
}, di = (t, e, n) => e.has(t) || Cs("Cannot " + n), pi = (t, e, n) => e.has(t) ? Cs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), _i = (t, e, n) => (di(t, e, "access private method"), n), ln, As;
let q = class extends ut(ze) {
  constructor() {
    super(), pi(this, ln), this.addMsg = {}, this.title = "", this.complete = !1, this.showProgress = !0, this.consumeContext(gs, (t) => {
      t && (this.observe(t.update, (e) => {
        this.updateMsg = e;
      }), this.observe(t.add, (e) => {
        this.addMsg = e;
      }));
    });
  }
  render() {
    var a, c, u, d;
    if (!this.actions) return R;
    let t = 0;
    const n = 100 / this.actions.length, s = (((a = this.updateMsg) == null ? void 0 : a.count) ?? 0) / (((c = this.updateMsg) == null ? void 0 : c.total) ?? 1);
    let o = (u = this.actions) == null ? void 0 : u.map((_) => (_.status == je.COMPLETE && t++, p`
				<div
					class="action 
                    ${_.status == je.COMPLETE ? "complete" : ""} 
                    ${_.status == je.PROCESSING ? "working" : ""}">
					<div class="icon-holder">
						<uui-icon .name=${_.icon ?? "icon-box"}></uui-icon>
						${this.renderBadge(_)}
					</div>
					<h4>${_.name ?? "unknown"}</h4>
				</div>
			`)), i = this.showProgress ? t * n + s * n - n : 0;
    this.complete ? _i(this, ln, As).call(this) : this.showProgress = !0;
    const r = { hidden: !this.showProgress };
    return p`
			<uui-box>
				<h2>${this.title}</h2>
				<div class="action-list">${o}</div>
				<div class="update-box">${(d = this.updateMsg) == null ? void 0 : d.message}</div>
				<uui-progress-bar
					progress=${i}
					class=${nt(r)}></uui-progress-bar>
			</uui-box>
		`;
  }
  renderBadge(t) {
    if (t.status == je.PENDING) return;
    if (t.status == je.PROCESSING)
      return p`<uui-badge color="positive" look="default">
				<uui-icon name="icon-circle-dotted" class="rotating"></uui-icon
			></uui-badge>`;
    const e = t.inError ? "warning" : "positive", n = t.inError ? "Some errors occured duing import" : "Changes imported successfully";
    return !this.complete || t.changes == 0 ? p`<uui-badge .color=${e} look="default" title=${n}
				><uui-icon name="icon-check"></uui-icon
			></uui-badge>` : p`<uui-badge .color=${e} title=${n}>${t.changes}</uui-badge>`;
  }
};
ln = /* @__PURE__ */ new WeakSet();
As = function() {
  window.setTimeout(() => {
    this.showProgress = !1;
  }, 2e3);
};
q.styles = O`
		:host {
			display: block;
		}

		h2 {
			text-align: center;
			margin: 0;
		}

		.action-list {
			margin-top: var(--uui-size-space-4);
			padding: var(--uui-size-space-4) 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}

		.action {
			display: flex;
			flex-direction: column;
			align-items: center;
			min-width: var(--uui-size-layout-5);
			color: var(--uui-color-text-alt);
			opacity: 0.67;
			margin: var(--uui-size-space-4) 0 var(--uui-size-space-6);
		}

		.action h4 {
			margin: var(--uui-size-space-4) 0;
		}

		.icon-holder {
			position: relative;
			padding: 0 var(--uui-size-7);
		}

		.rotating {
			animation: spin-animation 2s infinite;
			animation-timing-function: linear;
			display: inline-block;
		}

		@keyframes spin-animation {
			0% {
				transform: rotate(360deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}

		.action uui-icon {
			font-size: var(--uui-size-12);
		}

		.action uui-badge uui-icon {
			font-size: var(--uui-type-h4-size);
		}

		.complete {
			color: var(--uui-color-default-emphasis);
		}

		.working {
			color: var(--uui-color-positive);
			opacity: 1;
		}

		.update-box {
			font-weight: bold;
			text-align: center;
		}

		uui-progress-bar {
			padding: 0;
			margin: 0;
		}

		.hidden {
			opacity: 0;
		}
	`;
ge([
  f()
], q.prototype, "updateMsg", 2);
ge([
  f()
], q.prototype, "addMsg", 2);
ge([
  A({ type: String })
], q.prototype, "title", 2);
ge([
  A({ type: Array })
], q.prototype, "actions", 2);
ge([
  A({ type: Boolean })
], q.prototype, "complete", 2);
ge([
  f()
], q.prototype, "showProgress", 2);
q = ge([
  x("usync-progress-box")
], q);
var gi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, ks = (t) => {
  throw TypeError(t);
}, jt = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? fi(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && gi(e, n, o), o;
}, mn = (t, e, n) => e.has(t) || ks("Cannot " + n), mi = (t, e, n) => (mn(t, e, "read from private field"), e.get(t)), Mn = (t, e, n) => e.has(t) ? ks("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), yi = (t, e, n, s) => (mn(t, e, "write to private field"), e.set(t, n), n), Ln = (t, e, n) => (mn(t, e, "access private method"), n), Pt, wt, Is, Ps;
let Re = class extends ut(ze) {
  constructor() {
    super(), Mn(this, wt), Mn(this, Pt), this.results = [], this.showAll = !1, this.changeCount = 0, this.consumeContext(Ht, (t) => {
      yi(this, Pt, t);
    });
  }
  groupBy(t, e) {
    return t.reduce((n, s) => {
      const o = e(s), i = n[o] || [];
      return i.push(s), { ...n, [o]: i };
    }, {});
  }
  render() {
    var n, s, o;
    this.changeCount = ((n = this.results) == null ? void 0 : n.filter((i) => i.change !== ee.NO_CHANGE).length) ?? 0;
    const t = this.groupBy(this.results || [], (i) => i.itemType), e = [];
    for (const i in t) {
      if ((t[i].filter((c) => c.change !== ee.NO_CHANGE).length ?? 0) === 0 && !this.showAll) continue;
      const a = p`<usync-result-group
				.groupName=${i}
				.results=${t[i]}
				.showAll=${this.showAll}
				@show-detail=${Ln(this, wt, Ps)}></usync-result-group> `;
      e.push(a);
    }
    return this.changeCount == 0 && !this.showAll ? p`
					${this.renderResultBar(((s = this.results) == null ? void 0 : s.length) || 0, this.changeCount)}
					<div class="empty">
						<umb-localize key="uSync_noChange"></umb-localize>
					</div>
				` : p`<div id="result-box">
					${this.renderResultBar(((o = this.results) == null ? void 0 : o.length) || 0, this.changeCount)}
					${e}
				</div>`;
  }
  renderResultBar(t, e) {
    const n = e === 0 ? "uSync_noChangeCount" : "uSync_changeCount";
    return p`<div class="result-header">
			<uui-toggle
				.label=${this.localize.term("uSync_showAll")}
				?checked=${this.showAll}
				@change=${Ln(this, wt, Is)}></uui-toggle>
			<umb-localize .key=${n} .args=${[t, e]}
				>${e}/${t} items</umb-localize
			>
		</div>`;
  }
};
Pt = /* @__PURE__ */ new WeakMap();
wt = /* @__PURE__ */ new WeakSet();
Is = function() {
  this.showAll = !this.showAll;
};
Ps = async function(t) {
  var s;
  if (console.debug("Showing detail for action:", t.action), t.action.change == ee.EXPORT) return;
  const e = (s = mi(this, Pt)) == null ? void 0 : s.open(this, Lo, {
    data: {
      item: t.action,
      showActions: t.action.change == ee.CREATE || t.action.change == ee.UPDATE || t.action.change == ee.IMPORT
    }
  });
  await (e == null ? void 0 : e.onSubmit().catch(() => {
  }));
};
Re.styles = O`
		:host {
			display: block;
			margin: var(--uui-size-space-4) 0;
			display: flex;
			flex-direction: column;
			gap: var(--uui-size-space-4);
		}

		#result-box {
			display: flex;
			flex-direction: column;
			gap: var(--uui-size-space-4);
		}

		uui-table {
			position: relative;
			z-index: 100;
		}

		.result-header {
			display: flex;
			justify-content: space-between;
			padding: var(--uui-size-space-4);
			border: 1px solid var(--uui-color-border);
			padding: var(--uui-size-space-4);
		}

		.result-header h3 {
			margin: 0;
			padding: 0;
		}

		.empty {
			padding: var(--uui-size-20);
			font-size: var(--uui-type-h5-size);
			text-align: center;
			font-weight: 900;
		}

		.error {
			background-color: #fce4ec;
		}
	`;
jt([
  A({ type: Array })
], Re.prototype, "results", 2);
jt([
  f()
], Re.prototype, "showAll", 2);
jt([
  f()
], Re.prototype, "changeCount", 2);
Re = jt([
  x("usync-results")
], Re);
var vi = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, Ts = (t) => {
  throw TypeError(t);
}, Rs = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? Si(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && vi(e, n, o), o;
}, wi = (t, e, n) => e.has(t) || Ts("Cannot " + n), bi = (t, e, n) => e.has(t) ? Ts("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Un = (t, e, n) => (wi(t, e, "access private method"), n), bt, hn;
let Tt = class extends ut(ze) {
  constructor() {
    super(...arguments), bi(this, bt);
  }
  render() {
    var t, e;
    return ((t = this.item) == null ? void 0 : t.change) == ee.CREATE ? this.render_create() : ((e = this.item) == null ? void 0 : e.details.length) ?? !1 ? this.renderChangeTable() : this.renderNoChanges();
  }
  renderChangeTable() {
    return p`
			<uui-table>
				<uui-table-head>
					<uui-table-head-cell>
						<umb-localize key="uSync_changeAction">Action</umb-localize>
					</uui-table-head-cell>
					<uui-table-head-cell>
						<umb-localize key="uSync_changeItem">Item</umb-localize>
					</uui-table-head-cell>
					<uui-table-head-cell>
						<umb-localize key="uSync_changeDiffrence">Difference</umb-localize>
					</uui-table-head-cell>
				</uui-table-head>
				${this.render_details()}
			</uui-table>
		`;
  }
  renderNoChanges() {
    var t;
    return p`
			<div class="change-box">
				<h3>
					<umb-localize key="uSync_noChanges${(t = this.item) == null ? void 0 : t.change}"
						>No changes</umb-localize
					>
				</h3>
				${this.renderMessage()}
			</div>
		`;
  }
  render_create() {
    return p`
			<div class="change-box">
				<h3>
					<umb-localize key="uSync_changeCreate">This item is being created</umb-localize>
				</h3>
			</div>
		`;
  }
  renderMessage() {
    var n, s, o, i, r;
    const t = ((s = (n = this.item) == null ? void 0 : n.message) == null ? void 0 : s.length) ?? !1 ? (o = this.item) == null ? void 0 : o.message : ((i = this.item) == null ? void 0 : i.change) == ee.IMPORT ? "No changes were made but the item was imported" : "...", e = { error: ((r = this.item) == null ? void 0 : r.success) == !1 };
    return p`<div class="${nt(e)}">${t}</div> `;
  }
  render_details() {
    var e;
    var t = (e = this.item) == null ? void 0 : e.details.map((n) => {
      const s = Un(this, bt, hn).call(this, n.oldValue), o = Un(this, bt, hn).call(this, n.newValue), r = Vo(s, o).map((a) => a.added ? p`<ins>${a.value}</ins>` : a.removed ? p`<del>${a.value}</del>` : p`<span>${a.value}</span>`);
      return p`
				<uui-table-row>
					<uui-table-cell>${n.name}</uui-table-cell>
					<uui-table-cell>${n.change}</uui-table-cell>
					<uui-table-cell class="detail-data">
						<pre>${r}</pre>
					</uui-table-cell>
				</uui-table-row>
			`;
    });
    return t;
  }
  render_changes() {
  }
};
bt = /* @__PURE__ */ new WeakSet();
hn = function(t) {
  try {
    return JSON.stringify(JSON.parse(t ?? ""), null, 1);
  } catch {
    return t ?? "";
  }
};
Tt.styles = O`
		:host {
			display: block;
			margin: var(--uui-size-space-4) 0;
		}

		.change-box {
			display: block;
			padding: var(
				--uui-box-header-padding,
				var(--uui-size-space-4, 12px) var(--uui-size-space-5, 18px)
			);
		}

		.change-box h3 {
			margin: 0;
		}

		.error {
			color: var(--uui-color-danger);
			margin-top: var(--uui-size-space-2);
		}

		uui-table-cell {
			vertical-align: top;
		}

		uui-table-cell pre {
			margin: 0;
			padding: 0;
		}

		pre ins {
			color: var(--uui-color-positive);
		}

		pre del {
			color: var(--uui-color-danger);
		}
	`;
Rs([
  A({ type: Object })
], Tt.prototype, "item", 2);
Tt = Rs([
  x("usync-change-view")
], Tt);
var Ei = /* @__PURE__ */ ((t) => (t.STANDARD = "Standard", t.VAR_ARGS = "VarArgs", t.ANY = "Any", t.HAS_THIS = "HasThis", t.EXPLICIT_THIS = "ExplicitThis", t))(Ei || {}), $i = /* @__PURE__ */ ((t) => (t.NO_CHANGE = "NoChange", t.CREATE = "Create", t.UPDATE = "Update", t.DELETE = "Delete", t.ERROR = "Error", t.WARNING = "Warning", t))($i || {}), H = /* @__PURE__ */ ((t) => (t.NO_CHANGE = "NoChange", t.CREATE = "Create", t.IMPORT = "Import", t.EXPORT = "Export", t.UPDATE = "Update", t.DELETE = "Delete", t.WILL_CHANGE = "WillChange", t.INFORMATION = "Information", t.ROLLEDBACK = "Rolledback", t.FAIL = "Fail", t.IMPORT_FAIL = "ImportFail", t.MISMATCH = "Mismatch", t.PARENT_MISSING = "ParentMissing", t.HIDDEN = "Hidden", t.CLEAN = "Clean", t.REMOVED = "Removed", t))(H || {}), Ci = /* @__PURE__ */ ((t) => (t.NONE = "None", t.SPECIAL_NAME = "SpecialName", t.RT_SPECIAL_NAME = "RTSpecialName", t.RESERVED_MASK = "ReservedMask", t))(Ci || {}), Ai = /* @__PURE__ */ ((t) => (t.DEFAULT = "Default", t.INFO = "Info", t.ERROR = "Error", t.SUCCESS = "Success", t.WARNING = "Warning", t))(Ai || {}), ki = /* @__PURE__ */ ((t) => (t.PRIVATE_SCOPE = "PrivateScope", t.PRIVATE = "Private", t.FAM_AND_ASSEM = "FamANDAssem", t.ASSEMBLY = "Assembly", t.FAMILY = "Family", t.FAM_OR_ASSEM = "FamORAssem", t.PUBLIC = "Public", t.FIELD_ACCESS_MASK = "FieldAccessMask", t.STATIC = "Static", t.INIT_ONLY = "InitOnly", t.LITERAL = "Literal", t.NOT_SERIALIZED = "NotSerialized", t.HAS_FIELD_RVA = "HasFieldRVA", t.SPECIAL_NAME = "SpecialName", t.RT_SPECIAL_NAME = "RTSpecialName", t.HAS_FIELD_MARSHAL = "HasFieldMarshal", t.PINVOKE_IMPL = "PinvokeImpl", t.HAS_DEFAULT = "HasDefault", t.RESERVED_MASK = "ReservedMask", t))(ki || {}), Ii = /* @__PURE__ */ ((t) => (t.NONE = "None", t.COVARIANT = "Covariant", t.CONTRAVARIANT = "Contravariant", t.VARIANCE_MASK = "VarianceMask", t.REFERENCE_TYPE_CONSTRAINT = "ReferenceTypeConstraint", t.NOT_NULLABLE_VALUE_TYPE_CONSTRAINT = "NotNullableValueTypeConstraint", t.DEFAULT_CONSTRUCTOR_CONSTRAINT = "DefaultConstructorConstraint", t.SPECIAL_CONSTRAINT_MASK = "SpecialConstraintMask", t.ALLOW_BY_REF_LIKE = "AllowByRefLike", t))(Ii || {}), Pi = /* @__PURE__ */ ((t) => (t.PENDING = "Pending", t.PROCESSING = "Processing", t.COMPLETE = "Complete", t.ERROR = "Error", t))(Pi || {}), Ti = /* @__PURE__ */ ((t) => (t.SEQUENTIAL = "Sequential", t.EXPLICIT = "Explicit", t.AUTO = "Auto", t))(Ti || {}), Ri = /* @__PURE__ */ ((t) => (t.CONSTRUCTOR = "Constructor", t.EVENT = "Event", t.FIELD = "Field", t.METHOD = "Method", t.PROPERTY = "Property", t.TYPE_INFO = "TypeInfo", t.CUSTOM = "Custom", t.NESTED_TYPE = "NestedType", t.ALL = "All", t))(Ri || {}), Oi = /* @__PURE__ */ ((t) => (t.PRIVATE_SCOPE = "PrivateScope", t.REUSE_SLOT = "ReuseSlot", t.PRIVATE = "Private", t.FAM_AND_ASSEM = "FamANDAssem", t.ASSEMBLY = "Assembly", t.FAMILY = "Family", t.FAM_OR_ASSEM = "FamORAssem", t.PUBLIC = "Public", t.MEMBER_ACCESS_MASK = "MemberAccessMask", t.UNMANAGED_EXPORT = "UnmanagedExport", t.STATIC = "Static", t.FINAL = "Final", t.VIRTUAL = "Virtual", t.HIDE_BY_SIG = "HideBySig", t.NEW_SLOT = "NewSlot", t.VTABLE_LAYOUT_MASK = "VtableLayoutMask", t.CHECK_ACCESS_ON_OVERRIDE = "CheckAccessOnOverride", t.ABSTRACT = "Abstract", t.SPECIAL_NAME = "SpecialName", t.RT_SPECIAL_NAME = "RTSpecialName", t.PINVOKE_IMPL = "PinvokeImpl", t.HAS_SECURITY = "HasSecurity", t.REQUIRE_SEC_OBJECT = "RequireSecObject", t.RESERVED_MASK = "ReservedMask", t))(Oi || {}), xi = /* @__PURE__ */ ((t) => (t.IL = "IL", t.MANAGED = "Managed", t.NATIVE = "Native", t.OPTIL = "OPTIL", t.CODE_TYPE_MASK = "CodeTypeMask", t.RUNTIME = "Runtime", t.MANAGED_MASK = "ManagedMask", t.UNMANAGED = "Unmanaged", t.NO_INLINING = "NoInlining", t.FORWARD_REF = "ForwardRef", t.SYNCHRONIZED = "Synchronized", t.NO_OPTIMIZATION = "NoOptimization", t.PRESERVE_SIG = "PreserveSig", t.AGGRESSIVE_INLINING = "AggressiveInlining", t.AGGRESSIVE_OPTIMIZATION = "AggressiveOptimization", t.INTERNAL_CALL = "InternalCall", t.MAX_METHOD_IMPL_VAL = "MaxMethodImplVal", t))(xi || {}), Ni = /* @__PURE__ */ ((t) => (t.NONE = "None", t.IN = "In", t.OUT = "Out", t.LCID = "Lcid", t.RETVAL = "Retval", t.OPTIONAL = "Optional", t.HAS_DEFAULT = "HasDefault", t.HAS_FIELD_MARSHAL = "HasFieldMarshal", t.RESERVED3 = "Reserved3", t.RESERVED4 = "Reserved4", t.RESERVED_MASK = "ReservedMask", t))(Ni || {}), Di = /* @__PURE__ */ ((t) => (t.NONE = "None", t.SPECIAL_NAME = "SpecialName", t.RT_SPECIAL_NAME = "RTSpecialName", t.HAS_DEFAULT = "HasDefault", t.RESERVED2 = "Reserved2", t.RESERVED3 = "Reserved3", t.RESERVED4 = "Reserved4", t.RESERVED_MASK = "ReservedMask", t))(Di || {}), Mi = /* @__PURE__ */ ((t) => (t.NONE = "None", t.LEVEL1 = "Level1", t.LEVEL2 = "Level2", t))(Mi || {}), Li = /* @__PURE__ */ ((t) => (t.NOT_PUBLIC = "NotPublic", t.AUTO_LAYOUT = "AutoLayout", t.ANSI_CLASS = "AnsiClass", t.CLASS = "Class", t.PUBLIC = "Public", t.NESTED_PUBLIC = "NestedPublic", t.NESTED_PRIVATE = "NestedPrivate", t.NESTED_FAMILY = "NestedFamily", t.NESTED_ASSEMBLY = "NestedAssembly", t.NESTED_FAM_AND_ASSEM = "NestedFamANDAssem", t.VISIBILITY_MASK = "VisibilityMask", t.NESTED_FAM_OR_ASSEM = "NestedFamORAssem", t.SEQUENTIAL_LAYOUT = "SequentialLayout", t.EXPLICIT_LAYOUT = "ExplicitLayout", t.LAYOUT_MASK = "LayoutMask", t.INTERFACE = "Interface", t.CLASS_SEMANTICS_MASK = "ClassSemanticsMask", t.ABSTRACT = "Abstract", t.SEALED = "Sealed", t.SPECIAL_NAME = "SpecialName", t.RT_SPECIAL_NAME = "RTSpecialName", t.IMPORT = "Import", t.SERIALIZABLE = "Serializable", t.WINDOWS_RUNTIME = "WindowsRuntime", t.UNICODE_CLASS = "UnicodeClass", t.AUTO_CLASS = "AutoClass", t.STRING_FORMAT_MASK = "StringFormatMask", t.CUSTOM_FORMAT_CLASS = "CustomFormatClass", t.HAS_SECURITY = "HasSecurity", t.RESERVED_MASK = "ReservedMask", t.BEFORE_FIELD_INIT = "BeforeFieldInit", t.CUSTOM_FORMAT_MASK = "CustomFormatMask", t))(Li || {}), Ui = async (t, e) => {
  let n = typeof e == "function" ? await e(t) : e;
  if (n) return t.scheme === "bearer" ? `Bearer ${n}` : t.scheme === "basic" ? `Basic ${btoa(n)}` : n;
}, Hi = { bodySerializer: (t) => JSON.stringify(t, (e, n) => typeof n == "bigint" ? n.toString() : n) }, zi = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Wi = (t) => {
  switch (t) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, Bi = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Os = ({ allowReserved: t, explode: e, name: n, style: s, value: o }) => {
  if (!e) {
    let a = (t ? o : o.map((c) => encodeURIComponent(c))).join(Wi(s));
    switch (s) {
      case "label":
        return `.${a}`;
      case "matrix":
        return `;${n}=${a}`;
      case "simple":
        return a;
      default:
        return `${n}=${a}`;
    }
  }
  let i = zi(s), r = o.map((a) => s === "label" || s === "simple" ? t ? a : encodeURIComponent(a) : Ft({ allowReserved: t, name: n, value: a })).join(i);
  return s === "label" || s === "matrix" ? i + r : r;
}, Ft = ({ allowReserved: t, name: e, value: n }) => {
  if (n == null) return "";
  if (typeof n == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${t ? n : encodeURIComponent(n)}`;
}, xs = ({ allowReserved: t, explode: e, name: n, style: s, value: o }) => {
  if (o instanceof Date) return `${n}=${o.toISOString()}`;
  if (s !== "deepObject" && !e) {
    let a = [];
    Object.entries(o).forEach(([u, d]) => {
      a = [...a, u, t ? d : encodeURIComponent(d)];
    });
    let c = a.join(",");
    switch (s) {
      case "form":
        return `${n}=${c}`;
      case "label":
        return `.${c}`;
      case "matrix":
        return `;${n}=${c}`;
      default:
        return c;
    }
  }
  let i = Bi(s), r = Object.entries(o).map(([a, c]) => Ft({ allowReserved: t, name: s === "deepObject" ? `${n}[${a}]` : a, value: c })).join(i);
  return s === "label" || s === "matrix" ? i + r : r;
}, ji = /\{[^{}]+\}/g, Fi = ({ path: t, url: e }) => {
  let n = e, s = e.match(ji);
  if (s) for (let o of s) {
    let i = !1, r = o.substring(1, o.length - 1), a = "simple";
    r.endsWith("*") && (i = !0, r = r.substring(0, r.length - 1)), r.startsWith(".") ? (r = r.substring(1), a = "label") : r.startsWith(";") && (r = r.substring(1), a = "matrix");
    let c = t[r];
    if (c == null) continue;
    if (Array.isArray(c)) {
      n = n.replace(o, Os({ explode: i, name: r, style: a, value: c }));
      continue;
    }
    if (typeof c == "object") {
      n = n.replace(o, xs({ explode: i, name: r, style: a, value: c }));
      continue;
    }
    if (a === "matrix") {
      n = n.replace(o, `;${Ft({ name: r, value: c })}`);
      continue;
    }
    let u = encodeURIComponent(a === "label" ? `.${c}` : c);
    n = n.replace(o, u);
  }
  return n;
}, Ns = ({ allowReserved: t, array: e, object: n } = {}) => (s) => {
  let o = [];
  if (s && typeof s == "object") for (let i in s) {
    let r = s[i];
    if (r != null) {
      if (Array.isArray(r)) {
        o = [...o, Os({ allowReserved: t, explode: !0, name: i, style: "form", value: r, ...e })];
        continue;
      }
      if (typeof r == "object") {
        o = [...o, xs({ allowReserved: t, explode: !0, name: i, style: "deepObject", value: r, ...n })];
        continue;
      }
      o = [...o, Ft({ allowReserved: t, name: i, value: r })];
    }
  }
  return o.join("&");
}, Vi = (t) => {
  var n;
  if (!t) return "stream";
  let e = (n = t.split(";")[0]) == null ? void 0 : n.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((s) => e.startsWith(s))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, qi = async ({ security: t, ...e }) => {
  for (let n of t) {
    let s = await Ui(n, e.auth);
    if (!s) continue;
    let o = n.name ?? "Authorization";
    switch (n.in) {
      case "query":
        e.query || (e.query = {}), e.query[o] = s;
        break;
      case "cookie":
        e.headers.append("Cookie", `${o}=${s}`);
        break;
      case "header":
      default:
        e.headers.set(o, s);
        break;
    }
    return;
  }
}, Hn = (t) => Yi({ baseUrl: t.baseUrl, path: t.path, query: t.query, querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : Ns(t.querySerializer), url: t.url }), Yi = ({ baseUrl: t, path: e, query: n, querySerializer: s, url: o }) => {
  let i = o.startsWith("/") ? o : `/${o}`, r = (t ?? "") + i;
  e && (r = Fi({ path: e, url: r }));
  let a = n ? s(n) : "";
  return a.startsWith("?") && (a = a.substring(1)), a && (r += `?${a}`), r;
}, zn = (t, e) => {
  var s;
  let n = { ...t, ...e };
  return (s = n.baseUrl) != null && s.endsWith("/") && (n.baseUrl = n.baseUrl.substring(0, n.baseUrl.length - 1)), n.headers = Ds(t.headers, e.headers), n;
}, Ds = (...t) => {
  let e = new Headers();
  for (let n of t) {
    if (!n || typeof n != "object") continue;
    let s = n instanceof Headers ? n.entries() : Object.entries(n);
    for (let [o, i] of s) if (i === null) e.delete(o);
    else if (Array.isArray(i)) for (let r of i) e.append(o, r);
    else i !== void 0 && e.set(o, typeof i == "object" ? JSON.stringify(i) : i);
  }
  return e;
}, Jt = class {
  constructor() {
    xn(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(e) {
    return this._fns.indexOf(e) !== -1;
  }
  eject(e) {
    let n = this._fns.indexOf(e);
    n !== -1 && (this._fns = [...this._fns.slice(0, n), ...this._fns.slice(n + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}, Ki = () => ({ error: new Jt(), request: new Jt(), response: new Jt() }), Gi = Ns({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), Xi = { "Content-Type": "application/json" }, Ms = (t = {}) => ({ ...Hi, headers: Xi, parseAs: "auto", querySerializer: Gi, ...t }), Ji = (t = {}) => {
  let e = zn(Ms(), t), n = () => ({ ...e }), s = (r) => (e = zn(e, r), n()), o = Ki(), i = async (r) => {
    let a = { ...e, ...r, fetch: r.fetch ?? e.fetch ?? globalThis.fetch, headers: Ds(e.headers, r.headers) };
    a.security && await qi({ ...a, security: a.security }), a.body && a.bodySerializer && (a.body = a.bodySerializer(a.body)), (a.body === void 0 || a.body === "") && a.headers.delete("Content-Type");
    let c = Hn(a), u = { redirect: "follow", ...a }, d = new Request(c, u);
    for (let W of o.request._fns) d = await W(d, a);
    let _ = a.fetch, y = await _(d);
    for (let W of o.response._fns) y = await W(y, d, a);
    let D = { request: d, response: y };
    if (y.ok) {
      if (y.status === 204 || y.headers.get("Content-Length") === "0") return { data: {}, ...D };
      let W = (a.parseAs === "auto" ? Vi(y.headers.get("Content-Type")) : a.parseAs) ?? "json";
      if (W === "stream") return { data: y.body, ...D };
      let ft = await y[W]();
      return W === "json" && (a.responseValidator && await a.responseValidator(ft), a.responseTransformer && (ft = await a.responseTransformer(ft))), { data: ft, ...D };
    }
    let z = await y.text();
    try {
      z = JSON.parse(z);
    } catch {
    }
    let Be = z;
    for (let W of o.error._fns) Be = await W(z, y, d, a);
    if (Be = Be || {}, a.throwOnError) throw Be;
    return { error: Be, ...D };
  };
  return { buildUrl: Hn, connect: (r) => i({ ...r, method: "CONNECT" }), delete: (r) => i({ ...r, method: "DELETE" }), get: (r) => i({ ...r, method: "GET" }), getConfig: n, head: (r) => i({ ...r, method: "HEAD" }), interceptors: o, options: (r) => i({ ...r, method: "OPTIONS" }), patch: (r) => i({ ...r, method: "PATCH" }), post: (r) => i({ ...r, method: "POST" }), put: (r) => i({ ...r, method: "PUT" }), request: i, setConfig: s, trace: (r) => i({ ...r, method: "TRACE" }) };
};
const k = Ji(Ms({
  baseUrl: "http://localhost:33331",
  throwOnError: !0
}));
class Xc {
  /**
   * @deprecated
   */
  static getActions(e) {
    return ((e == null ? void 0 : e.client) ?? k).get({
      url: "/umbraco/usync/api/v1/Actions",
      ...e
    });
  }
  static getActionsBySet(e) {
    return ((e == null ? void 0 : e.client) ?? k).get({
      url: "/umbraco/usync/api/v1/ActionsBySet",
      ...e
    });
  }
  static download(e) {
    return ((e == null ? void 0 : e.client) ?? k).post({
      url: "/umbraco/usync/api/v1/Download",
      ...e
    });
  }
  static importSingle(e) {
    return ((e == null ? void 0 : e.client) ?? k).post({
      url: "/umbraco/usync/api/v1/Import",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
  static performAction(e) {
    return ((e == null ? void 0 : e.client) ?? k).post({
      url: "/umbraco/usync/api/v1/Perform",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
  static processUpload(e) {
    return ((e == null ? void 0 : e.client) ?? k).post({
      url: "/umbraco/usync/api/v1/ProcessUpload",
      ...e
    });
  }
}
class Jc {
  static checkLegacy(e) {
    return ((e == null ? void 0 : e.client) ?? k).get({
      url: "/umbraco/usync/api/v1/CheckLegacy",
      ...e
    });
  }
  static copyLegacy(e) {
    return ((e == null ? void 0 : e.client) ?? k).post({
      url: "/umbraco/usync/api/v1/CopyLegacy",
      ...e
    });
  }
  static ignoreLegacy(e) {
    return ((e == null ? void 0 : e.client) ?? k).post({
      url: "/umbraco/usync/api/v1/IgnoreLegacy",
      ...e
    });
  }
}
class Zc {
  static getAddOns(e) {
    return ((e == null ? void 0 : e.client) ?? k).get({
      url: "/umbraco/usync/api/v1/AddOns",
      ...e
    });
  }
  static getAddonSplash(e) {
    return ((e == null ? void 0 : e.client) ?? k).get({
      url: "/umbraco/usync/api/v1/AddOnSplash",
      ...e
    });
  }
  static getHandlerSetSettings(e) {
    return ((e == null ? void 0 : e.client) ?? k).get({
      url: "/umbraco/usync/api/v1/HandlerSettings",
      ...e
    });
  }
  static getSets(e) {
    return ((e == null ? void 0 : e.client) ?? k).get({
      url: "/umbraco/usync/api/v1/Sets",
      ...e
    });
  }
  static getSettings(e) {
    return ((e == null ? void 0 : e.client) ?? k).get({
      url: "/umbraco/usync/api/v1/Settings",
      ...e
    });
  }
}
var Zi = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, dt = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? Qi(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && Zi(e, n, o), o;
};
let he = class extends We {
  constructor() {
    super(...arguments), this.expanded = !1, this.showAll = !1, this.results = [], this.groupName = "";
  }
  getChangeCount() {
    var t;
    return (t = this.results) == null ? void 0 : t.filter((e) => e.change !== H.NO_CHANGE).length;
  }
  render() {
    var e;
    const t = this.getChangeCount() ?? 0;
    return t === 0 && !this.showAll ? R : p`
			<uui-box
				class=${nt({
      has_changes: t > 0
    })}>
				<div
					class="summary ${It(this.expanded, () => "expanded")}"
					@click=${() => this.expanded = !this.expanded}>
					<h4>${this.localize.term("uSync_" + this.groupName)}</h4>
					<div class="summary-right">
						<h4 class="count">${t}/${(e = this.results) == null ? void 0 : e.length}</h4>
						<uui-icon
							name="icon-play"
							class=${nt({ expanded: this.expanded })}></uui-icon>
					</div>
				</div>
				<uui-table>
					${It(
      this.expanded == !0,
      () => p`${this.renderGroupedRows(this.results)}`
    )}
				</uui-table>
			</uui-box>
		`;
  }
  renderGroupedRows(t) {
    return t == null ? void 0 : t.map((n) => !this.showAll && n.change == H.NO_CHANGE ? R : p`<usync-result-row .result=${n}></usync-result-row>`);
  }
};
he.styles = O`
		uui-box {
			cursor: pointer;
			--uui-box-default-padding: 0;
		}

		.expanded {
			border-bottom: 1px solid var(--uui-color-border);
		}

		.summary {
			display: flex;
			margin: 0;
			padding: 0 20px;
			justify-content: space-between;
		}

		.summary-right {
			display: flex;
			align-items: center;
			gap: var(--uui-size-space-2);
			color: var(--uui-color-border-emphasis);
		}

		.summary-right uui-icon {
			transform: rotate(90deg);
			transition: transform 0.5s cubic-bezier(0.42, 0, 0.37, 1.62);
		}

		.summary-right uui-icon.expanded {
			transform: rotate(-90deg);
			border-bottom: none;
		}

		.count {
			color: var(--uui-text);
		}
	`;
dt([
  f()
], he.prototype, "expanded", 2);
dt([
  A({ type: Boolean })
], he.prototype, "showAll", 2);
dt([
  A({ type: Array })
], he.prototype, "results", 2);
dt([
  A({ type: String })
], he.prototype, "groupName", 2);
he = dt([
  x("usync-result-group")
], he);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ls = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = globalThis, yn = Et.ShadowRoot && (Et.ShadyCSS === void 0 || Et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vn = Symbol(), Wn = /* @__PURE__ */ new WeakMap();
let Us = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== vn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (yn && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = Wn.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Wn.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const er = (t) => new Us(typeof t == "string" ? t : t + "", void 0, vn), tr = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((s, o, i) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[i + 1], t[0]);
  return new Us(n, t, vn);
}, nr = (t, e) => {
  if (yn) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), o = Et.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = n.cssText, t.appendChild(s);
  }
}, Bn = yn ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return er(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: sr, defineProperty: or, getOwnPropertyDescriptor: ir, getOwnPropertyNames: rr, getOwnPropertySymbols: ar, getPrototypeOf: cr } = Object, te = globalThis, jn = te.trustedTypes, lr = jn ? jn.emptyScript : "", Zt = te.reactiveElementPolyfillSupport, Ze = (t, e) => t, Rt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? lr : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, Sn = (t, e) => !sr(t, e), Fn = { attribute: !0, type: String, converter: Rt, reflect: !1, useDefault: !1, hasChanged: Sn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), te.litPropertyMetadata ?? (te.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let fe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Fn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, n);
      o !== void 0 && or(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: o, set: i } = ir(this.prototype, e) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: o, set(r) {
      const a = o == null ? void 0 : o.call(this);
      i == null || i.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Fn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ze("elementProperties"))) return;
    const e = cr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ze("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ze("properties"))) {
      const n = this.properties, s = [...rr(n), ...ar(n)];
      for (const o of s) this.createProperty(o, n[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [s, o] of n) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, s] of this.elementProperties) {
      const o = this._$Eu(n, s);
      o !== void 0 && this._$Eh.set(o, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) n.unshift(Bn(o));
    } else e !== void 0 && n.push(Bn(e));
    return n;
  }
  static _$Eu(e, n) {
    const s = n.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((n) => n(this));
  }
  addController(e) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((n = e.hostConnected) == null || n.call(e));
  }
  removeController(e) {
    var n;
    (n = this._$EO) == null || n.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const s of n.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return nr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((n) => {
      var s;
      return (s = n.hostConnected) == null ? void 0 : s.call(n);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var s;
      return (s = n.hostDisconnected) == null ? void 0 : s.call(n);
    });
  }
  attributeChangedCallback(e, n, s) {
    this._$AK(e, s);
  }
  _$ET(e, n) {
    var i;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const r = (((i = s.converter) == null ? void 0 : i.toAttribute) !== void 0 ? s.converter : Rt).toAttribute(n, s.type);
      this._$Em = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var i, r;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = s.getPropertyOptions(o), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((i = a.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? a.converter : Rt;
      this._$Em = o, this[o] = c.fromAttribute(n, a.type) ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, n, s) {
    var o;
    if (e !== void 0) {
      const i = this.constructor, r = this[e];
      if (s ?? (s = i.getPropertyOptions(e)), !((s.hasChanged ?? Sn)(r, n) || s.useDefault && s.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(i._$Eu(e, s)))) return;
      this.C(e, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: s, reflect: o, wrapped: i }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? n ?? this[e]), i !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (n = void 0), this._$AL.set(e, n)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [i, r] of o) {
        const { wrapped: a } = r, c = this[i];
        a !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, r, c);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (s = this._$EO) == null || s.forEach((o) => {
        var i;
        return (i = o.hostUpdate) == null ? void 0 : i.call(o);
      }), this.update(n)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
fe.elementStyles = [], fe.shadowRootOptions = { mode: "open" }, fe[Ze("elementProperties")] = /* @__PURE__ */ new Map(), fe[Ze("finalized")] = /* @__PURE__ */ new Map(), Zt == null || Zt({ ReactiveElement: fe }), (te.reactiveElementVersions ?? (te.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hr = { attribute: !0, type: String, converter: Rt, reflect: !1, hasChanged: Sn }, ur = (t = hr, e, n) => {
  const { kind: s, metadata: o } = n;
  let i = globalThis.litPropertyMetadata.get(o);
  if (i === void 0 && globalThis.litPropertyMetadata.set(o, i = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), i.set(n.name, t), s === "accessor") {
    const { name: r } = n;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, c, t);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = n;
    return function(a) {
      const c = this[r];
      e.call(this, a), this.requestUpdate(r, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Hs(t) {
  return (e, n) => typeof n == "object" ? ur(t, e, n) : ((s, o, i) => {
    const r = o.hasOwnProperty(i);
    return o.constructor.createProperty(i, s), r ? Object.getOwnPropertyDescriptor(o, i) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function zs(t) {
  return Hs({ ...t, state: !0, attribute: !1 });
}
const dr = "show-detail";
class pr extends Event {
  constructor(e) {
    super(dr, {
      bubbles: !0,
      composed: !0,
      cancelable: !1
    }), this.action = e;
  }
}
var _r = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, Ws = (t) => {
  throw TypeError(t);
}, Bs = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? gr(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && _r(e, n, o), o;
}, fr = (t, e, n) => e.has(t) || Ws("Cannot " + n), mr = (t, e, n) => e.has(t) ? Ws("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Vn = (t, e, n) => (fr(t, e, "access private method"), n), $t, js, Fs;
let Oe = class extends zt {
  constructor() {
    super(), mr(this, $t);
  }
  render() {
    var t, e;
    return p`
			<umb-body-layout headline="Changes : ${((t = this.data) == null ? void 0 : t.item.name) ?? ""}">
				<div class="layout">
					<uui-box style="--uui-box-default-padding: 0;">
						<div slot="header" id="header">
							<h3><umb-localize key="uSync_detailHeadline"></umb-localize></h3>
							<umb-localize key="uSync_detailHeader"></umb-localize>
						</div>
						<div slot="header-actions">${this.renderActions()}</div>
					</uui-box>
					<uui-box style="--uui-box-default-padding: 0;">
						<usync-change-view .item=${(e = this.data) == null ? void 0 : e.item}></usync-change-view>
					</uui-box>
				</div>
				<div slot="actions">
					<uui-button
						id="cancel"
						.label=${this.localize.term("general_close")}
						@click="${Vn(this, $t, Fs)}"></uui-button>
				</div>
			</umb-body-layout>
		`;
  }
  renderActions() {
    var t;
    return (t = this.data) != null && t.showActions ? p` <uui-button
			id="import"
			type="button"
			look="outline"
			.state=${this.importState}
			.label=${this.localize.term("uSync_importSingle")}
			@click="${Vn(this, $t, js)}"></uui-button>` : R;
  }
};
$t = /* @__PURE__ */ new WeakSet();
js = async function(t) {
  var o, i;
  if (t.stopPropagation(), !((o = this.data) != null && o.item)) return;
  const e = await this.getContext(Ht);
  if (!e) return;
  const n = e.open(this, Uo, {
    data: { action: (i = this.data) == null ? void 0 : i.item }
  });
  return await (n == null ? void 0 : n.onSubmit().catch(() => {
  }));
};
Fs = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
Oe.styles = O`
		.layout {
			display: flex;
			flex-direction: column;
			gap: var(--uui-size-space-4);
		}

		#header h3 {
			margin: 0;
		}
	`;
Bs([
  f()
], Oe.prototype, "importState", 2);
Oe = Bs([
  x("usync-details-modal")
], Oe);
const yr = Oe, vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yr,
  get uSyncDetailsModalElement() {
    return Oe;
  }
}, Symbol.toStringTag, { value: "Module" })), tl = new Wt("usync.details.modal", {
  modal: {
    type: "sidebar",
    size: "large"
  }
});
var Sr = Object.defineProperty, wr = Object.getOwnPropertyDescriptor, Vs = (t) => {
  throw TypeError(t);
}, br = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? wr(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && Sr(e, n, o), o;
}, Er = (t, e, n) => e.has(t) || Vs("Cannot " + n), $r = (t, e, n) => e.has(t) ? Vs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Cr = (t, e, n) => (Er(t, e, "access private method"), n), un, qs;
let Ot = class extends zt {
  constructor() {
    super(...arguments), $r(this, un);
  }
  render() {
    var e, n, s;
    const t = `Error: ${((e = this.data) == null ? void 0 : e.action.name) ?? ""} [${(n = this.data) == null ? void 0 : n.action.itemType}]`;
    return p`<umb-body-layout .headline=${t}>
			<strong>
				<umb-localize key="uSync_errorHeader"></umb-localize>
			</strong>
			<div class="error">${(s = this.data) == null ? void 0 : s.action.message}</div>
			<div slot="actions">
				<uui-button
					id="cancel"
					.label=${this.localize.term("general_close")}
					@click="${Cr(this, un, qs)}"></uui-button>
			</div>
		</umb-body-layout>`;
  }
};
un = /* @__PURE__ */ new WeakSet();
qs = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
Ot.styles = O`
		umb-body-layout {
			max-width: 450px;
		}

		.error {
			padding: 10px;
			font-family: monospace;
			color: red;
		}
	`;
Ot = br([
  x("usync-error-modal")
], Ot);
const Ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return Ot;
  }
}, Symbol.toStringTag, { value: "Module" })), kr = new Wt("usync.error.modal", {
  modal: {
    type: "dialog"
  }
}), nl = new Wt("usync.import.single.modal", {
  modal: {
    type: "dialog"
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = globalThis, xt = Qe.trustedTypes, qn = xt ? xt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ys = "$lit$", Y = `lit$${Math.random().toFixed(9).slice(2)}$`, Ks = "?" + Y, Ir = `<${Ks}>`, ue = document, st = () => ue.createComment(""), ot = (t) => t === null || typeof t != "object" && typeof t != "function", wn = Array.isArray, Pr = (t) => wn(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Qt = `[ 	
\f\r]`, Ve = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Yn = /-->/g, Kn = />/g, ne = RegExp(`>|${Qt}(?:([^\\s"'>=/]+)(${Qt}*=${Qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gn = /'/g, Xn = /"/g, Gs = /^(?:script|style|textarea|title)$/i, Tr = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), qe = Tr(1), xe = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), Jn = /* @__PURE__ */ new WeakMap(), oe = ue.createTreeWalker(ue, 129);
function Xs(t, e) {
  if (!wn(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qn !== void 0 ? qn.createHTML(e) : e;
}
const Rr = (t, e) => {
  const n = t.length - 1, s = [];
  let o, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = Ve;
  for (let a = 0; a < n; a++) {
    const c = t[a];
    let u, d, _ = -1, y = 0;
    for (; y < c.length && (r.lastIndex = y, d = r.exec(c), d !== null); ) y = r.lastIndex, r === Ve ? d[1] === "!--" ? r = Yn : d[1] !== void 0 ? r = Kn : d[2] !== void 0 ? (Gs.test(d[2]) && (o = RegExp("</" + d[2], "g")), r = ne) : d[3] !== void 0 && (r = ne) : r === ne ? d[0] === ">" ? (r = o ?? Ve, _ = -1) : d[1] === void 0 ? _ = -2 : (_ = r.lastIndex - d[2].length, u = d[1], r = d[3] === void 0 ? ne : d[3] === '"' ? Xn : Gn) : r === Xn || r === Gn ? r = ne : r === Yn || r === Kn ? r = Ve : (r = ne, o = void 0);
    const D = r === ne && t[a + 1].startsWith("/>") ? " " : "";
    i += r === Ve ? c + Ir : _ >= 0 ? (s.push(u), c.slice(0, _) + Ys + c.slice(_) + Y + D) : c + Y + (_ === -2 ? a : D);
  }
  return [Xs(t, i + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class it {
  constructor({ strings: e, _$litType$: n }, s) {
    let o;
    this.parts = [];
    let i = 0, r = 0;
    const a = e.length - 1, c = this.parts, [u, d] = Rr(e, n);
    if (this.el = it.createElement(u, s), oe.currentNode = this.el.content, n === 2 || n === 3) {
      const _ = this.el.content.firstChild;
      _.replaceWith(..._.childNodes);
    }
    for (; (o = oe.nextNode()) !== null && c.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const _ of o.getAttributeNames()) if (_.endsWith(Ys)) {
          const y = d[r++], D = o.getAttribute(_).split(Y), z = /([.?@])?(.*)/.exec(y);
          c.push({ type: 1, index: i, name: z[2], strings: D, ctor: z[1] === "." ? xr : z[1] === "?" ? Nr : z[1] === "@" ? Dr : Vt }), o.removeAttribute(_);
        } else _.startsWith(Y) && (c.push({ type: 6, index: i }), o.removeAttribute(_));
        if (Gs.test(o.tagName)) {
          const _ = o.textContent.split(Y), y = _.length - 1;
          if (y > 0) {
            o.textContent = xt ? xt.emptyScript : "";
            for (let D = 0; D < y; D++) o.append(_[D], st()), oe.nextNode(), c.push({ type: 2, index: ++i });
            o.append(_[y], st());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ks) c.push({ type: 2, index: i });
      else {
        let _ = -1;
        for (; (_ = o.data.indexOf(Y, _ + 1)) !== -1; ) c.push({ type: 7, index: i }), _ += Y.length - 1;
      }
      i++;
    }
  }
  static createElement(e, n) {
    const s = ue.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Ne(t, e, n = t, s) {
  var r, a;
  if (e === xe) return e;
  let o = s !== void 0 ? (r = n._$Co) == null ? void 0 : r[s] : n._$Cl;
  const i = ot(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== i && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), i === void 0 ? o = void 0 : (o = new i(t), o._$AT(t, n, s)), s !== void 0 ? (n._$Co ?? (n._$Co = []))[s] = o : n._$Cl = o), o !== void 0 && (e = Ne(t, o._$AS(t, e.values), o, s)), e;
}
class Or {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? ue).importNode(n, !0);
    oe.currentNode = o;
    let i = oe.nextNode(), r = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let u;
        c.type === 2 ? u = new pt(i, i.nextSibling, this, e) : c.type === 1 ? u = new c.ctor(i, c.name, c.strings, this, e) : c.type === 6 && (u = new Mr(i, this, e)), this._$AV.push(u), c = s[++a];
      }
      r !== (c == null ? void 0 : c.index) && (i = oe.nextNode(), r++);
    }
    return oe.currentNode = ue, o;
  }
  p(e) {
    let n = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, n), n += s.strings.length - 2) : s._$AI(e[n])), n++;
  }
}
class pt {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, n, s, o) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = Ne(this, e, n), ot(e) ? e === $ || e == null || e === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : e !== this._$AH && e !== xe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Pr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== $ && ot(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ue.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: n, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = it.createElement(Xs(s.h, s.h[0]), this.options)), s);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === o) this._$AH.p(n);
    else {
      const r = new Or(o, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = Jn.get(e.strings);
    return n === void 0 && Jn.set(e.strings, n = new it(e)), n;
  }
  k(e) {
    wn(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let s, o = 0;
    for (const i of e) o === n.length ? n.push(s = new pt(this.O(st()), this.O(st()), this, this.options)) : s = n[o], s._$AI(i), o++;
    o < n.length && (this._$AR(s && s._$AB.nextSibling, o), n.length = o);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, n); e && e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class Vt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, s, o, i) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = e, this.name = n, this._$AM = o, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = $;
  }
  _$AI(e, n = this, s, o) {
    const i = this.strings;
    let r = !1;
    if (i === void 0) e = Ne(this, e, n, 0), r = !ot(e) || e !== this._$AH && e !== xe, r && (this._$AH = e);
    else {
      const a = e;
      let c, u;
      for (e = i[0], c = 0; c < i.length - 1; c++) u = Ne(this, a[s + c], n, c), u === xe && (u = this._$AH[c]), r || (r = !ot(u) || u !== this._$AH[c]), u === $ ? e = $ : e !== $ && (e += (u ?? "") + i[c + 1]), this._$AH[c] = u;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class xr extends Vt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === $ ? void 0 : e;
  }
}
class Nr extends Vt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== $);
  }
}
class Dr extends Vt {
  constructor(e, n, s, o, i) {
    super(e, n, s, o, i), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = Ne(this, e, n, 0) ?? $) === xe) return;
    const s = this._$AH, o = e === $ && s !== $ || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, i = e !== $ && (s === $ || o);
    o && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Mr {
  constructor(e, n, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ne(this, e);
  }
}
const en = Qe.litHtmlPolyfillSupport;
en == null || en(it, pt), (Qe.litHtmlVersions ?? (Qe.litHtmlVersions = [])).push("3.3.0");
const Lr = (t, e, n) => {
  const s = (n == null ? void 0 : n.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const i = (n == null ? void 0 : n.renderBefore) ?? null;
    s._$litPart$ = o = new pt(e.insertBefore(st(), i), i, void 0, n ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = globalThis;
class Ct extends fe {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var n;
    const e = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = e.firstChild), e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Lr(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return xe;
  }
}
var ds;
Ct._$litElement$ = !0, Ct.finalized = !0, (ds = ae.litElementHydrateSupport) == null || ds.call(ae, { LitElement: Ct });
const tn = ae.litElementPolyfillSupport;
tn == null || tn({ LitElement: Ct });
(ae.litElementVersions ?? (ae.litElementVersions = [])).push("4.2.0");
var j, ve, Se, Ut, Js;
class Ur extends fn {
  constructor(n) {
    super(n);
    m(this, Ut);
    m(this, j);
    m(this, ve);
    m(this, Se);
    v(this, ve, new Je(void 0)), this.update = h(this, ve).asObservable(), v(this, Se, new Je({})), this.add = h(this, Se).asObservable(), this.provideContext(gs, this), this.consumeContext(ps, async (s) => {
      !s || !(s != null && s.getOpenApiConfiguration()) || mt(this, Ut, Js).call(this, "/umbraco/SyncHub", await s.getLatestToken());
    });
  }
  hostConnected() {
    super.hostConnected();
  }
  hostDisconnected() {
    var n;
    super.hostDisconnected(), (n = h(this, j)) == null || n.stop().then(() => {
      console.debug("connection stopped");
    });
  }
  getClientId() {
    var n;
    return ((n = h(this, j)) == null ? void 0 : n.connectionId) ?? null;
  }
}
j = new WeakMap(), ve = new WeakMap(), Se = new WeakMap(), Ut = new WeakSet(), Js = function(n, s) {
  v(this, j, new Dn.HubConnectionBuilder().withUrl(n, { accessTokenFactory: () => s }).configureLogging(Dn.LogLevel.Warning).build()), h(this, j).on("add", (o) => {
    h(this, Se).setValue(o);
  }), h(this, j).on("update", (o) => {
    h(this, ve).setValue(o);
  }), h(this, j).start().then(() => {
  });
};
const Hr = new Wt("usync.import.modal", {
  modal: {
    type: "dialog"
  }
});
var zr = Object.defineProperty, Wr = Object.getOwnPropertyDescriptor, Zs = (t) => {
  throw TypeError(t);
}, Qs = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? Wr(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && zr(e, n, o), o;
}, Br = (t, e, n) => e.has(t) || Zs("Cannot " + n), jr = (t, e, n) => e.has(t) ? Zs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), nn = (t, e, n) => (Br(t, e, "access private method"), n), Ye, eo, to, no;
let De = class extends zt {
  constructor() {
    super(...arguments), jr(this, Ye);
  }
  render() {
    return p`
			<umb-body-layout .headline=${this.localize.term("uSync_importHeader")}>
				${this.renderForm()} ${this.renderResult()}
			</umb-body-layout>
		`;
  }
  renderForm() {
    if (this.result === void 0)
      return p` ${this.localize.term("uSync_uploadIntro")}
			<usync-file-upload @uploaded=${nn(this, Ye, no)}></usync-file-upload>
			<div slot="actions">
				<uui-button
					id="cancel"
					.label=${this.localize.term("general_close")}
					@click="${nn(this, Ye, eo)}"></uui-button>
			</div>`;
  }
  renderResult() {
    if (this.result != null)
      return p`${It(
        this.result.success,
        () => p`${this.localize.term("uSync_uploadSuccess")}`,
        () => {
          var t;
          return p`${this.localize.term("uSync_uploadError")} ${(t = this.result) == null ? void 0 : t.errors}`;
        }
      )}
			<div slot="actions">
				<uui-button id="continue" label="Import" @click="${nn(this, Ye, to)}"></uui-button>
			</div>`;
  }
};
Ye = /* @__PURE__ */ new WeakSet();
eo = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
to = function() {
  var t, e;
  this.value = (t = this.result) == null ? void 0 : t.success, (e = this.modalContext) == null || e.submit();
};
no = function(t) {
  this.result = t.result;
};
De.styles = O`
		umb-body-layout {
			max-width: 450px;
		}

		usync-file-upload {
			padding: 10px 0;
		}
	`;
Qs([
  f()
], De.prototype, "result", 2);
De = Qs([
  x("usync-import-dialog")
], De);
const Fr = De, Vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fr,
  get uSyncImportModalDialog() {
    return De;
  }
}, Symbol.toStringTag, { value: "Module" }));
var P, we, be, Ee, G, X, J, $e, Ce, Ae, ke;
class Zn extends fn {
  constructor(n) {
    var s, o, i;
    super(n);
    m(this, P);
    m(this, we);
    m(this, be);
    m(this, Ee);
    m(this, G);
    m(this, X);
    m(this, J);
    m(this, $e);
    m(this, Ce);
    m(this, Ae);
    m(this, ke);
    this.workspaceAlias = T.workspace.alias, v(this, we, null), v(this, be, new vt([], (r) => r.key)), this.actions = h(this, be).asObservable(), v(this, Ee, new vt([], (r) => r.name)), this.currentAction = h(this, Ee).asObservable(), v(this, G, new Nn(!1)), this.working = h(this, G).asObservable(), v(this, X, new Nn(!1)), this.completed = h(this, X).asObservable(), v(this, J, new vt([], (r) => r.name)), this.results = h(this, J).asObservable(), v(this, $e, new Je(void 0)), this.settings = (s = h(this, $e)) == null ? void 0 : s.asObservable(), v(this, Ce, new Je(void 0)), this.handlerSettings = (o = h(this, Ce)) == null ? void 0 : o.asObservable(), v(this, Ae, new vt([], (r) => r)), this.sets = h(this, Ae).asObservable(), v(this, ke, new Je(void 0)), this.legacy = (i = h(this, ke)) == null ? void 0 : i.asObservable(), this.provideContext(bn, this), this.provideContext(qo, this), v(this, P, new fs(this)), v(this, we, new Ur(this));
  }
  getEntityType() {
    return T.workspace.rootElement;
  }
  /**
   * Return the current actions from the repository
   */
  async getActions(n) {
    const { data: s } = await h(this, P).getActions(n);
    s && h(this, be).setValue(s);
  }
  /**
   * Get the current uSync settings
   */
  async getSettings() {
    const { data: n } = await h(this, P).getSettings();
    return n && h(this, $e).setValue(n), n;
  }
  async getAddons() {
    const { data: n } = await h(this, P).getAddons();
    return n;
  }
  /**
   * Check to see if there is a legacy uSync folder on disk.
   */
  async checkLegacy() {
    const { data: n } = await h(this, P).checkLegacy();
    return n && h(this, ke).setValue(n), n;
  }
  async ignoreLegacy() {
    const { data: n } = await h(this, P).ignoreLegacy();
    return n ?? !1;
  }
  async copyLegacy() {
    const { data: n } = await h(this, P).copyLegacy();
    return n ?? !1;
  }
  /**
   * Get handler defaults.
   */
  async getDefaultHandlerSetSettings(n) {
    const { data: s } = await h(this, P).getHandlerSettings(n);
    s && h(this, Ce).setValue(s);
  }
  async getHandlerSets() {
    const { data: n } = await h(this, P).getSets();
    n && h(this, Ae).setValue(n);
  }
  /**
   * Perform an action (e.g import, export, etc) with options
   * @param options options for the action
   */
  async performAction(n) {
    var a;
    var s = ((a = h(this, we)) == null ? void 0 : a.getClientId()) ?? "";
    h(this, G).setValue(!0), h(this, X).setValue(!1), h(this, J).setValue([]);
    var o = !1, i = "", r = 0;
    if (n.file && n.action === "Import" && !await this.uploadFile()) {
      h(this, X).setValue(!0), h(this, G).setValue(!1), h(this, J).setValue([]);
      return;
    }
    do {
      const { data: c } = await h(this, P).performAction({
        id: i,
        set: n.setName,
        action: n.action,
        group: n.group.key,
        force: n.force,
        clean: n.clean,
        file: n.file,
        step: r,
        clientId: s
      });
      if (c) {
        r++;
        let u = c.status ?? [];
        h(this, Ee).setValue(u), i = c.requestId, o = c.complete, o && h(this, J).setValue((c == null ? void 0 : c.actions) ?? []);
      } else
        o = !0;
    } while (!o);
    n.file && n.action === "Export" && await this.downloadFile(i), h(this, X).setValue(!0), h(this, G).setValue(!1);
  }
  async uploadFile() {
    const n = await this.getContext(Ht);
    return n ? !!await n.open(this, Hr, {
      data: {}
    }).onSubmit().catch(() => !1) : void 0;
  }
  async downloadFile(n) {
    const s = await h(this, P).downloadFile(n);
    if (!s) return;
    const o = window.URL.createObjectURL(s), i = document.createElement("a");
    i.href = o, i.download = "usync-export.zip", document.body.appendChild(i), i.dispatchEvent(new MouseEvent("click")), i.remove(), window.URL.revokeObjectURL(o);
  }
  async importSingle(n) {
    return n ? await h(this, P).importSingle(n) : void 0;
  }
}
P = new WeakMap(), we = new WeakMap(), be = new WeakMap(), Ee = new WeakMap(), G = new WeakMap(), X = new WeakMap(), J = new WeakMap(), $e = new WeakMap(), Ce = new WeakMap(), Ae = new WeakMap(), ke = new WeakMap();
const bn = new ys(
  "uSyncWorkspaceContext"
), qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  USYNC_CORE_CONTEXT_TOKEN: bn,
  default: Zn,
  uSyncWorkspaceContext: Zn
}, Symbol.toStringTag, { value: "Module" }));
var Yr = Object.defineProperty, Kr = Object.getOwnPropertyDescriptor, so = (t) => {
  throw TypeError(t);
}, N = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? Kr(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && Yr(e, n, o), o;
}, En = (t, e, n) => e.has(t) || so("Cannot " + n), et = (t, e, n) => (En(t, e, "read from private field"), e.get(t)), Qn = (t, e, n) => e.has(t) ? so("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Gr = (t, e, n, s) => (En(t, e, "write to private field"), e.set(t, n), n), se = (t, e, n) => (En(t, e, "access private method"), n), K, B, oo, io, ro, ao, co, lo, ho;
let C = class extends We {
  constructor() {
    super(), Qn(this, B), Qn(this, K), this._loaded = !1, this._working = !1, this._completed = !1, this._showProgress = !1, this._results = [], this._disabled = !1, this._setName = "Default", this._sets = [], this.consumeContext(ms, (t) => {
      t && (Gr(this, K, t), t.getSettings(), this.observe(t.settings, (e) => {
        var n, s;
        e && (this._setName = e.defaultSet ?? "Default", (n = et(this, K)) == null || n.checkLegacy(), (s = et(this, K)) == null || s.getHandlerSets());
      }), this.observe(t.sets, (e) => {
        var n;
        e && (this._sets = e, (n = et(this, K)) == null || n.getActions(this._setName));
      }), this.observe(t.actions, (e) => {
        !e || e.length == 0 || (this._actions = e, this._loaded = this._actions !== null);
      }), this.observe(t.currentAction, (e) => {
        this._workingActions = e;
      }), this.observe(t.working, (e) => {
        this._working = e, this._working ? (this._buttonState = "waiting", this._disabled = !0) : this._disabled = !1;
      }), this.observe(t.results, (e) => {
        this._results = e;
      }), this.observe(t.completed, (e) => {
        this._completed = e, this._completed && (this._buttonState = "success");
      }), this.observe(t.legacy, (e) => {
        this._legacy = e;
      }));
    });
  }
  render() {
    return this._loaded == !1 ? p`<uui-loader></uui-loader>` : p`
				<umb-body-layout>
					${se(this, B, ro).call(this)} ${se(this, B, io).call(this)}
					<div class="wrapper">
						${se(this, B, ao).call(this)} ${se(this, B, co).call(this)} ${se(this, B, lo).call(this)}
						${se(this, B, ho).call(this)}
					</div>
				</umb-body-layout>
			`;
  }
};
K = /* @__PURE__ */ new WeakMap();
B = /* @__PURE__ */ new WeakSet();
oo = function(t) {
  var e;
  t && (this._showProgress = !0, this._group = t.group, (e = et(this, K)) == null || e.performAction({
    setName: this._setName,
    group: t.group,
    action: t.key,
    force: t.force ?? !1,
    clean: t.clean ?? !1,
    file: t.file ?? !1
  }));
};
io = function() {
  if (this._sets.length < 2) return R;
  var t = this._sets.map((e) => ({
    name: e.name,
    value: e.name,
    selected: e.name === this._setName
  }));
  return p`<div class="set-picker">
			<label for="set-select"
				>${this.localize.term("USyncSettings_currentHandlerSet")}</label
			>
			<uui-select
				id="set-select"
				.label=${this.localize.term("USyncSettings_currentHandlerSet")}
				.options=${t}
				@change=${(e) => {
    var s;
    const n = e.target;
    this._setName = n.value, (s = et(this, K)) == null || s.getActions(this._setName);
  }}>
			</uui-select>
		</div> `;
};
ro = function() {
  var t;
  return (t = this._legacy) != null && t.hasLegacy ? p`
					<div class="legacy-banner">
						<umb-icon name="icon-alert"></umb-icon>
						${this.localize.term("uSync_legacyBanner")}
					</div>
				` : R;
};
ao = function() {
  var e;
  if (!this._actions || !Array.isArray(this._actions)) return R;
  var t = (e = this._actions) == null ? void 0 : e.map((n) => p`
				<usync-action-box
					.disabled=${this._disabled}
					.group="${n}"
					.state=${this._buttonState}
					@perform-action=${se(this, B, oo)}>
				</usync-action-box>
			`);
  return p` <div class="action-buttons-box">${t}</div> `;
};
co = function() {
  return this._showProgress === !0 || this._completed === !0 ? R : p`
			<umb-empty-state>
				<h2>
					<uui-icon name="usync-logo"></uui-icon>
					<umb-localize key="uSync_banner"></umb-localize>
				</h2>
			</umb-empty-state>
		`;
};
lo = function() {
  var t;
  return this._showProgress == !1 && this._completed == !1 ? R : p`
			<usync-progress-box
				.title=${((t = this._group) == null ? void 0 : t.groupName) ?? "doh!"}
				.actions=${this._workingActions}
				.complete=${this._completed}></usync-progress-box>
		`;
};
ho = function() {
  return this._completed ? p`<usync-results .results=${this._results}></usync-results>` : R;
};
C.styles = [
  O`
			:host {
				display: block;
				margin-top: calc(var(--uui-size-space-4) * -1);
			}

			.wrapper {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-4);
			}

			.legacy-banner {
				display: flex;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-4);
				margin: var(--uui-size-space-4) 0;
				background-color: var(--uui-color-warning);
				color: var(--uui-color-warning-contrast);
			}

			.results-box {
				position: relative;
				display: block;
				z-index: 1;
			}

			.action-buttons-box {
				position: relative;
				display: flex;
				gap: var(--uui-size-space-4);
				flex-wrap: wrap;
				align-content: stretch;
				z-index: 1;
			}

			umb-empty-state {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0;
				right: 0;
				margin: 0 auto;
				text-align: center;
				color: var(--uui-color-border);
				z-index: 0;
			}

			umb-empty-state h2 {
				font-size: var(--uui-type-h2-size);
			}

			umb-empty-state uui-icon {
				position: relative;
				top: var(--uui-size-2);
			}

			.set-picker {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
				gap: var(--uui-size-space-2);
				margin-bottom: var(--uui-size-space-4);
				border: 1px solid var(--uui-color-border);
				padding: var(--uui-size-space-4);
			}

			.set-picker label {
				font-weight: 700;
			}

			.set-picker label::after {
				content: ':';
			}
		`
];
N([
  f()
], C.prototype, "_actions", 2);
N([
  f()
], C.prototype, "_workingActions", 2);
N([
  f()
], C.prototype, "_loaded", 2);
N([
  f()
], C.prototype, "_legacy", 2);
N([
  f()
], C.prototype, "_buttonState", 2);
N([
  f()
], C.prototype, "_working", 2);
N([
  f()
], C.prototype, "_completed", 2);
N([
  f()
], C.prototype, "_showProgress", 2);
N([
  f()
], C.prototype, "_group", 2);
N([
  f()
], C.prototype, "_results", 2);
N([
  f()
], C.prototype, "_disabled", 2);
N([
  f()
], C.prototype, "_setName", 2);
N([
  f()
], C.prototype, "_sets", 2);
C = N([
  x("usync-default-view")
], C);
const Xr = C, Jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xr,
  get uSyncDefaultViewElement() {
    return C;
  }
}, Symbol.toStringTag, { value: "Module" }));
var Zr = Object.defineProperty, Qr = Object.getOwnPropertyDescriptor, uo = (t) => {
  throw TypeError(t);
}, po = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? Qr(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && Zr(e, n, o), o;
}, _o = (t, e, n) => e.has(t) || uo("Cannot " + n), es = (t, e, n) => (_o(t, e, "read from private field"), n ? n.call(t) : e.get(t)), ea = (t, e, n) => e.has(t) ? uo("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ta = (t, e, n, s) => (_o(t, e, "write to private field"), e.set(t, n), n), Ke;
let Me = class extends ut(ze) {
  constructor() {
    super(), ea(this, Ke), this.version = T.version, ta(this, Ke, new Ho(this)), this.observe(es(this, Ke).completed, (t) => {
    });
  }
  async connectedCallback() {
    super.connectedCallback();
    const t = await es(this, Ke).getAddons();
    this.version = `v${(t == null ? void 0 : t.version) ?? T.version}`;
  }
  render() {
    return p`
			<umb-workspace-editor .enforceNoFooter=${!0}>
				<div slot="header" class="header">
					<div>
						<strong><umb-localize key="uSync_name"></umb-localize></strong><br /><em
							>${this.version}</em
						>
					</div>
				</div>
			</umb-workspace-editor>
		`;
  }
};
Ke = /* @__PURE__ */ new WeakMap();
Me.styles = [
  Yo,
  O`
			umb-workspace-editor > div.header {
				display: flex;
				align-items: center;
				align-content: center;
			}
		`
];
po([
  f()
], Me.prototype, "version", 2);
Me = po([
  x("usync-workspace-root")
], Me);
const na = Me, sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: na,
  get uSyncWorkspaceRootElement() {
    return Me;
  }
}, Symbol.toStringTag, { value: "Module" }));
var oa = Object.defineProperty, ia = Object.getOwnPropertyDescriptor, go = (t) => {
  throw TypeError(t);
}, $n = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? ia(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && oa(e, n, o), o;
}, Cn = (t, e, n) => e.has(t) || go("Cannot " + n), ra = (t, e, n) => (Cn(t, e, "read from private field"), n ? n.call(t) : e.get(t)), ts = (t, e, n) => e.has(t) ? go("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), aa = (t, e, n, s) => (Cn(t, e, "write to private field"), e.set(t, n), n), ns = (t, e, n) => (Cn(t, e, "access private method"), n), Nt, At, fo, mo;
let Le = class extends zt {
  constructor() {
    super(), ts(this, At), ts(this, Nt), this.consumeContext(bn, (t) => {
      t && aa(this, Nt, t);
    });
  }
  render() {
    var t, e;
    return qe`<umb-body-layout
			.headline=${`Import : ${((t = this.data) == null ? void 0 : t.action.name) ?? ""} [${(e = this.data) == null ? void 0 : e.action.itemType}]`}>
			${this.renderResult()}
			<div slot="actions">
				<uui-button
					id="cancel"
					.label=${this.localize.term("general_close")}
					@click="${ns(this, At, fo)}"></uui-button>
				${It(
      !this.result,
      () => qe` <uui-button
							id="import"
							look="primary"
							color="positive"
							type="button"
							.state=${this.importState}
							.label=${this.localize.term("uSync_importSingle")}
							@click="${ns(this, At, mo)}"></uui-button>`
    )}
			</div>
		</umb-body-layout>`;
  }
  renderResult() {
    return this.result ? this.result.success ? qe`<div>
				<umb-localize key="uSync_importSingleSuccess"></umb-localize>
			</div>` : qe`<div>
				<umb-localize
					key="uSync_importSingleFailed"
					.args=${[this.result.message]}></umb-localize>
			</div>` : qe` <strong>
				<umb-localize key="uSync_importSingleWarning"></umb-localize>
			</strong>`;
  }
};
Nt = /* @__PURE__ */ new WeakMap();
At = /* @__PURE__ */ new WeakSet();
fo = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
mo = async function() {
  var e, n;
  if (!((e = this.data) != null && e.action)) return;
  this.importState = "waiting";
  const t = await ((n = ra(this, Nt)) == null ? void 0 : n.importSingle(this.data.action));
  this.result = t == null ? void 0 : t.data, t != null && t.data.success ? this.importState = "success" : this.importState = "failed";
};
Le.styles = tr`
		umb-body-layout {
			min-width: 450px;
			max-width: 450px;
		}
	`;
$n([
  zs()
], Le.prototype, "importState", 2);
$n([
  zs()
], Le.prototype, "result", 2);
Le = $n([
  Ls("usync-import-single-modal")
], Le);
const ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return Le;
  }
}, Symbol.toStringTag, { value: "Module" }));
var la = Object.defineProperty, ha = Object.getOwnPropertyDescriptor, yo = (t) => {
  throw TypeError(t);
}, vo = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? ha(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && la(e, n, o), o;
}, ua = (t, e, n) => e.has(t) || yo("Cannot " + n), da = (t, e, n) => e.has(t) ? yo("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ss = (t, e, n) => (ua(t, e, "access private method"), n), kt, So, wo;
let Dt = class extends We {
  constructor() {
    super(...arguments), da(this, kt);
  }
  render() {
    if (!this.result) return null;
    const t = this.result, e = t.change == H.NO_CHANGE ? "icon-trafic" : t.success ? "icon-check color-green" : "icon-wrong color-red", n = t.change == H.NO_CHANGE || t.change == H.EXPORT;
    return p`<div
			class="${nt({ no_change: n })} row"
			@click=${() => ss(this, kt, So).call(this, t)}>
			<div class="icon-cell" .noPadding=${!0}>
				<umb-icon .name=${e}></umb-icon>
			</div>
			<div class="row-content" .clipText=${!0}>
				<div class="item-detail">
					<div class="item-change">${t.change}</div>
				</div>
				<div class="item-name">
					<div>${t.name}</div>
					<div>${this.renderMessage(t)}</div>
				</div>
			</div>
		</div>`;
  }
  renderMessage(t) {
    return t.change != H.FAIL && t.change != H.IMPORT_FAIL || !t.message ? p`<em>${t.message}</em>` : p` <uui-button
					look="outline"
					color="danger"
					label="View error"
					compact
					@click=${(e) => ss(this, kt, wo).call(this, e, t)}></uui-button>`;
  }
};
kt = /* @__PURE__ */ new WeakSet();
So = async function(t) {
  t.change == H.NO_CHANGE || t.change == H.EXPORT || this.dispatchEvent(new pr(t));
};
wo = async function(t, e) {
  t.stopPropagation();
  const n = await this.getContext(Ht), s = n == null ? void 0 : n.open(this, kr, {
    data: {
      action: e
    }
  });
  return await (s == null ? void 0 : s.onSubmit().catch(() => {
  }));
};
Dt.styles = O`
		.row {
			display: flex;
			align-items: center;
			gap: var(--uui-size-space-5);
			padding: var(--uui-size-space-5);
			border-bottom: 1px solid var(--uui-color-border);
			cursor: pointer;
		}

		.row:hover {
			background-color: var(--uui-color-surface-alt);
		}

		.no_change {
			color: var(--uui-color-disabled-contrast);
			cursor: default;
		}

		.row-content {
			gap: 10px;
			flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.item-name {
			display: flex;
			font-weight: bold;
			align-items: center;
			flex-grow: 2;
			justify-content: space-between;
		}

		.item-detail {
			display: flex;
			flex-direction: column;
			font-size: smaller;
			min-width: 60px;
		}
	`;
vo([
  Hs({ type: Object })
], Dt.prototype, "result", 2);
Dt = vo([
  Ls("usync-result-row")
], Dt);
const sl = new ys(
  "uSyncSignalRContext"
);
class ce extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
   *
   * @param {string} errorMessage A descriptive error message.
   * @param {number} statusCode The HTTP status code represented by this error.
   */
  constructor(e, n) {
    const s = new.target.prototype;
    super(`${e}: Status code '${n}'`), this.statusCode = n, this.__proto__ = s;
  }
}
class An extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(e = "A timeout occurred.") {
    const n = new.target.prototype;
    super(e), this.__proto__ = n;
  }
}
class U extends Error {
  /** Constructs a new instance of {@link AbortError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(e = "An abort occurred.") {
    const n = new.target.prototype;
    super(e), this.__proto__ = n;
  }
}
class pa extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.UnsupportedTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, n) {
    const s = new.target.prototype;
    super(e), this.transport = n, this.errorType = "UnsupportedTransportError", this.__proto__ = s;
  }
}
class _a extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.DisabledTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, n) {
    const s = new.target.prototype;
    super(e), this.transport = n, this.errorType = "DisabledTransportError", this.__proto__ = s;
  }
}
class ga extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToStartTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, n) {
    const s = new.target.prototype;
    super(e), this.transport = n, this.errorType = "FailedToStartTransportError", this.__proto__ = s;
  }
}
class os extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToNegotiateWithServerError}.
   *
   * @param {string} message A descriptive error message.
   */
  constructor(e) {
    const n = new.target.prototype;
    super(e), this.errorType = "FailedToNegotiateWithServerError", this.__proto__ = n;
  }
}
class fa extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.AggregateErrors}.
   *
   * @param {string} message A descriptive error message.
   * @param {Error[]} innerErrors The collection of errors this error is aggregating.
   */
  constructor(e, n) {
    const s = new.target.prototype;
    super(e), this.innerErrors = n, this.__proto__ = s;
  }
}
class bo {
  constructor(e, n, s) {
    this.statusCode = e, this.statusText = n, this.content = s;
  }
}
class qt {
  get(e, n) {
    return this.send({
      ...n,
      method: "GET",
      url: e
    });
  }
  post(e, n) {
    return this.send({
      ...n,
      method: "POST",
      url: e
    });
  }
  delete(e, n) {
    return this.send({
      ...n,
      method: "DELETE",
      url: e
    });
  }
  /** Gets all cookies that apply to the specified URL.
   *
   * @param url The URL that the cookies are valid for.
   * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
   */
  // @ts-ignore
  getCookieString(e) {
    return "";
  }
}
var l;
(function(t) {
  t[t.Trace = 0] = "Trace", t[t.Debug = 1] = "Debug", t[t.Information = 2] = "Information", t[t.Warning = 3] = "Warning", t[t.Error = 4] = "Error", t[t.Critical = 5] = "Critical", t[t.None = 6] = "None";
})(l || (l = {}));
class rt {
  constructor() {
  }
  /** @inheritDoc */
  // eslint-disable-next-line
  log(e, n) {
  }
}
rt.instance = new rt();
const ma = "9.0.6";
class b {
  static isRequired(e, n) {
    if (e == null)
      throw new Error(`The '${n}' argument is required.`);
  }
  static isNotEmpty(e, n) {
    if (!e || e.match(/^\s*$/))
      throw new Error(`The '${n}' argument should not be empty.`);
  }
  static isIn(e, n, s) {
    if (!(e in n))
      throw new Error(`Unknown ${s} value: ${e}.`);
  }
}
class w {
  // react-native has a window but no document so we should check both
  static get isBrowser() {
    return !w.isNode && typeof window == "object" && typeof window.document == "object";
  }
  // WebWorkers don't have a window object so the isBrowser check would fail
  static get isWebWorker() {
    return !w.isNode && typeof self == "object" && "importScripts" in self;
  }
  // react-native has a window but no document
  static get isReactNative() {
    return !w.isNode && typeof window == "object" && typeof window.document > "u";
  }
  // Node apps shouldn't have a window object, but WebWorkers don't either
  // so we need to check for both WebWorker and window
  static get isNode() {
    return typeof process < "u" && process.release && process.release.name === "node";
  }
}
function at(t, e) {
  let n = "";
  return de(t) ? (n = `Binary data of length ${t.byteLength}`, e && (n += `. Content: '${ya(t)}'`)) : typeof t == "string" && (n = `String data of length ${t.length}`, e && (n += `. Content: '${t}'`)), n;
}
function ya(t) {
  const e = new Uint8Array(t);
  let n = "";
  return e.forEach((s) => {
    const o = s < 16 ? "0" : "";
    n += `0x${o}${s.toString(16)} `;
  }), n.substr(0, n.length - 1);
}
function de(t) {
  return t && typeof ArrayBuffer < "u" && (t instanceof ArrayBuffer || // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
  t.constructor && t.constructor.name === "ArrayBuffer");
}
async function Eo(t, e, n, s, o, i) {
  const r = {}, [a, c] = Ue();
  r[a] = c, t.log(l.Trace, `(${e} transport) sending data. ${at(o, i.logMessageContent)}.`);
  const u = de(o) ? "arraybuffer" : "text", d = await n.post(s, {
    content: o,
    headers: { ...r, ...i.headers },
    responseType: u,
    timeout: i.timeout,
    withCredentials: i.withCredentials
  });
  t.log(l.Trace, `(${e} transport) request complete. Response status: ${d.statusCode}.`);
}
function va(t) {
  return t === void 0 ? new Mt(l.Information) : t === null ? rt.instance : t.log !== void 0 ? t : new Mt(t);
}
class Sa {
  constructor(e, n) {
    this._subject = e, this._observer = n;
  }
  dispose() {
    const e = this._subject.observers.indexOf(this._observer);
    e > -1 && this._subject.observers.splice(e, 1), this._subject.observers.length === 0 && this._subject.cancelCallback && this._subject.cancelCallback().catch((n) => {
    });
  }
}
class Mt {
  constructor(e) {
    this._minLevel = e, this.out = console;
  }
  log(e, n) {
    if (e >= this._minLevel) {
      const s = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${l[e]}: ${n}`;
      switch (e) {
        case l.Critical:
        case l.Error:
          this.out.error(s);
          break;
        case l.Warning:
          this.out.warn(s);
          break;
        case l.Information:
          this.out.info(s);
          break;
        default:
          this.out.log(s);
          break;
      }
    }
  }
}
function Ue() {
  let t = "X-SignalR-User-Agent";
  return w.isNode && (t = "User-Agent"), [t, wa(ma, ba(), $a(), Ea())];
}
function wa(t, e, n, s) {
  let o = "Microsoft SignalR/";
  const i = t.split(".");
  return o += `${i[0]}.${i[1]}`, o += ` (${t}; `, e && e !== "" ? o += `${e}; ` : o += "Unknown OS; ", o += `${n}`, s ? o += `; ${s}` : o += "; Unknown Runtime Version", o += ")", o;
}
function ba() {
  if (w.isNode)
    switch (process.platform) {
      case "win32":
        return "Windows NT";
      case "darwin":
        return "macOS";
      case "linux":
        return "Linux";
      default:
        return process.platform;
    }
  else
    return "";
}
function Ea() {
  if (w.isNode)
    return process.versions.node;
}
function $a() {
  return w.isNode ? "NodeJS" : "Browser";
}
function sn(t) {
  return t.stack ? t.stack : t.message ? t.message : `${t}`;
}
function Ca() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("could not find global");
}
class Aa extends qt {
  constructor(e) {
    if (super(), this._logger = e, typeof fetch > "u" || w.isNode) {
      const n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      this._jar = new (n("tough-cookie")).CookieJar(), typeof fetch > "u" ? this._fetchType = n("node-fetch") : this._fetchType = fetch, this._fetchType = n("fetch-cookie")(this._fetchType, this._jar);
    } else
      this._fetchType = fetch.bind(Ca());
    if (typeof AbortController > "u") {
      const n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      this._abortControllerType = n("abort-controller");
    } else
      this._abortControllerType = AbortController;
  }
  /** @inheritDoc */
  async send(e) {
    if (e.abortSignal && e.abortSignal.aborted)
      throw new U();
    if (!e.method)
      throw new Error("No method defined.");
    if (!e.url)
      throw new Error("No url defined.");
    const n = new this._abortControllerType();
    let s;
    e.abortSignal && (e.abortSignal.onabort = () => {
      n.abort(), s = new U();
    });
    let o = null;
    if (e.timeout) {
      const c = e.timeout;
      o = setTimeout(() => {
        n.abort(), this._logger.log(l.Warning, "Timeout from HTTP request."), s = new An();
      }, c);
    }
    e.content === "" && (e.content = void 0), e.content && (e.headers = e.headers || {}, de(e.content) ? e.headers["Content-Type"] = "application/octet-stream" : e.headers["Content-Type"] = "text/plain;charset=UTF-8");
    let i;
    try {
      i = await this._fetchType(e.url, {
        body: e.content,
        cache: "no-cache",
        credentials: e.withCredentials === !0 ? "include" : "same-origin",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          ...e.headers
        },
        method: e.method,
        mode: "cors",
        redirect: "follow",
        signal: n.signal
      });
    } catch (c) {
      throw s || (this._logger.log(l.Warning, `Error from HTTP request. ${c}.`), c);
    } finally {
      o && clearTimeout(o), e.abortSignal && (e.abortSignal.onabort = null);
    }
    if (!i.ok) {
      const c = await is(i, "text");
      throw new ce(c || i.statusText, i.status);
    }
    const a = await is(i, e.responseType);
    return new bo(i.status, i.statusText, a);
  }
  getCookieString(e) {
    let n = "";
    return w.isNode && this._jar && this._jar.getCookies(e, (s, o) => n = o.join("; ")), n;
  }
}
function is(t, e) {
  let n;
  switch (e) {
    case "arraybuffer":
      n = t.arrayBuffer();
      break;
    case "text":
      n = t.text();
      break;
    case "blob":
    case "document":
    case "json":
      throw new Error(`${e} is not supported.`);
    default:
      n = t.text();
      break;
  }
  return n;
}
class ka extends qt {
  constructor(e) {
    super(), this._logger = e;
  }
  /** @inheritDoc */
  send(e) {
    return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new U()) : e.method ? e.url ? new Promise((n, s) => {
      const o = new XMLHttpRequest();
      o.open(e.method, e.url, !0), o.withCredentials = e.withCredentials === void 0 ? !0 : e.withCredentials, o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.content === "" && (e.content = void 0), e.content && (de(e.content) ? o.setRequestHeader("Content-Type", "application/octet-stream") : o.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"));
      const i = e.headers;
      i && Object.keys(i).forEach((r) => {
        o.setRequestHeader(r, i[r]);
      }), e.responseType && (o.responseType = e.responseType), e.abortSignal && (e.abortSignal.onabort = () => {
        o.abort(), s(new U());
      }), e.timeout && (o.timeout = e.timeout), o.onload = () => {
        e.abortSignal && (e.abortSignal.onabort = null), o.status >= 200 && o.status < 300 ? n(new bo(o.status, o.statusText, o.response || o.responseText)) : s(new ce(o.response || o.responseText || o.statusText, o.status));
      }, o.onerror = () => {
        this._logger.log(l.Warning, `Error from HTTP request. ${o.status}: ${o.statusText}.`), s(new ce(o.statusText, o.status));
      }, o.ontimeout = () => {
        this._logger.log(l.Warning, "Timeout from HTTP request."), s(new An());
      }, o.send(e.content);
    }) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."));
  }
}
class Ia extends qt {
  /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
  constructor(e) {
    if (super(), typeof fetch < "u" || w.isNode)
      this._httpClient = new Aa(e);
    else if (typeof XMLHttpRequest < "u")
      this._httpClient = new ka(e);
    else
      throw new Error("No usable HttpClient found.");
  }
  /** @inheritDoc */
  send(e) {
    return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new U()) : e.method ? e.url ? this._httpClient.send(e) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."));
  }
  getCookieString(e) {
    return this._httpClient.getCookieString(e);
  }
}
class M {
  static write(e) {
    return `${e}${M.RecordSeparator}`;
  }
  static parse(e) {
    if (e[e.length - 1] !== M.RecordSeparator)
      throw new Error("Message is incomplete.");
    const n = e.split(M.RecordSeparator);
    return n.pop(), n;
  }
}
M.RecordSeparatorCode = 30;
M.RecordSeparator = String.fromCharCode(M.RecordSeparatorCode);
class Pa {
  // Handshake request is always JSON
  writeHandshakeRequest(e) {
    return M.write(JSON.stringify(e));
  }
  parseHandshakeResponse(e) {
    let n, s;
    if (de(e)) {
      const a = new Uint8Array(e), c = a.indexOf(M.RecordSeparatorCode);
      if (c === -1)
        throw new Error("Message is incomplete.");
      const u = c + 1;
      n = String.fromCharCode.apply(null, Array.prototype.slice.call(a.slice(0, u))), s = a.byteLength > u ? a.slice(u).buffer : null;
    } else {
      const a = e, c = a.indexOf(M.RecordSeparator);
      if (c === -1)
        throw new Error("Message is incomplete.");
      const u = c + 1;
      n = a.substring(0, u), s = a.length > u ? a.substring(u) : null;
    }
    const o = M.parse(n), i = JSON.parse(o[0]);
    if (i.type)
      throw new Error("Expected a handshake response from the server.");
    return [s, i];
  }
}
var g;
(function(t) {
  t[t.Invocation = 1] = "Invocation", t[t.StreamItem = 2] = "StreamItem", t[t.Completion = 3] = "Completion", t[t.StreamInvocation = 4] = "StreamInvocation", t[t.CancelInvocation = 5] = "CancelInvocation", t[t.Ping = 6] = "Ping", t[t.Close = 7] = "Close", t[t.Ack = 8] = "Ack", t[t.Sequence = 9] = "Sequence";
})(g || (g = {}));
class Ta {
  constructor() {
    this.observers = [];
  }
  next(e) {
    for (const n of this.observers)
      n.next(e);
  }
  error(e) {
    for (const n of this.observers)
      n.error && n.error(e);
  }
  complete() {
    for (const e of this.observers)
      e.complete && e.complete();
  }
  subscribe(e) {
    return this.observers.push(e), new Sa(this, e);
  }
}
class Ra {
  constructor(e, n, s) {
    this._bufferSize = 1e5, this._messages = [], this._totalMessageCount = 0, this._waitForSequenceMessage = !1, this._nextReceivingSequenceId = 1, this._latestReceivedSequenceId = 0, this._bufferedByteCount = 0, this._reconnectInProgress = !1, this._protocol = e, this._connection = n, this._bufferSize = s;
  }
  async _send(e) {
    const n = this._protocol.writeMessage(e);
    let s = Promise.resolve();
    if (this._isInvocationMessage(e)) {
      this._totalMessageCount++;
      let o = () => {
      }, i = () => {
      };
      de(n) ? this._bufferedByteCount += n.byteLength : this._bufferedByteCount += n.length, this._bufferedByteCount >= this._bufferSize && (s = new Promise((r, a) => {
        o = r, i = a;
      })), this._messages.push(new Oa(n, this._totalMessageCount, o, i));
    }
    try {
      this._reconnectInProgress || await this._connection.send(n);
    } catch {
      this._disconnected();
    }
    await s;
  }
  _ack(e) {
    let n = -1;
    for (let s = 0; s < this._messages.length; s++) {
      const o = this._messages[s];
      if (o._id <= e.sequenceId)
        n = s, de(o._message) ? this._bufferedByteCount -= o._message.byteLength : this._bufferedByteCount -= o._message.length, o._resolver();
      else if (this._bufferedByteCount < this._bufferSize)
        o._resolver();
      else
        break;
    }
    n !== -1 && (this._messages = this._messages.slice(n + 1));
  }
  _shouldProcessMessage(e) {
    if (this._waitForSequenceMessage)
      return e.type !== g.Sequence ? !1 : (this._waitForSequenceMessage = !1, !0);
    if (!this._isInvocationMessage(e))
      return !0;
    const n = this._nextReceivingSequenceId;
    return this._nextReceivingSequenceId++, n <= this._latestReceivedSequenceId ? (n === this._latestReceivedSequenceId && this._ackTimer(), !1) : (this._latestReceivedSequenceId = n, this._ackTimer(), !0);
  }
  _resetSequence(e) {
    if (e.sequenceId > this._nextReceivingSequenceId) {
      this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));
      return;
    }
    this._nextReceivingSequenceId = e.sequenceId;
  }
  _disconnected() {
    this._reconnectInProgress = !0, this._waitForSequenceMessage = !0;
  }
  async _resend() {
    const e = this._messages.length !== 0 ? this._messages[0]._id : this._totalMessageCount + 1;
    await this._connection.send(this._protocol.writeMessage({ type: g.Sequence, sequenceId: e }));
    const n = this._messages;
    for (const s of n)
      await this._connection.send(s._message);
    this._reconnectInProgress = !1;
  }
  _dispose(e) {
    e ?? (e = new Error("Unable to reconnect to server."));
    for (const n of this._messages)
      n._rejector(e);
  }
  _isInvocationMessage(e) {
    switch (e.type) {
      case g.Invocation:
      case g.StreamItem:
      case g.Completion:
      case g.StreamInvocation:
      case g.CancelInvocation:
        return !0;
      case g.Close:
      case g.Sequence:
      case g.Ping:
      case g.Ack:
        return !1;
    }
  }
  _ackTimer() {
    this._ackTimerHandle === void 0 && (this._ackTimerHandle = setTimeout(async () => {
      try {
        this._reconnectInProgress || await this._connection.send(this._protocol.writeMessage({ type: g.Ack, sequenceId: this._latestReceivedSequenceId }));
      } catch {
      }
      clearTimeout(this._ackTimerHandle), this._ackTimerHandle = void 0;
    }, 1e3));
  }
}
class Oa {
  constructor(e, n, s, o) {
    this._message = e, this._id = n, this._resolver = s, this._rejector = o;
  }
}
const xa = 30 * 1e3, Na = 15 * 1e3, Da = 1e5;
var S;
(function(t) {
  t.Disconnected = "Disconnected", t.Connecting = "Connecting", t.Connected = "Connected", t.Disconnecting = "Disconnecting", t.Reconnecting = "Reconnecting";
})(S || (S = {}));
class kn {
  /** @internal */
  // Using a public static factory method means we can have a private constructor and an _internal_
  // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
  // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
  // public parameter-less constructor.
  static create(e, n, s, o, i, r, a) {
    return new kn(e, n, s, o, i, r, a);
  }
  constructor(e, n, s, o, i, r, a) {
    this._nextKeepAlive = 0, this._freezeEventListener = () => {
      this._logger.log(l.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
    }, b.isRequired(e, "connection"), b.isRequired(n, "logger"), b.isRequired(s, "protocol"), this.serverTimeoutInMilliseconds = i ?? xa, this.keepAliveIntervalInMilliseconds = r ?? Na, this._statefulReconnectBufferSize = a ?? Da, this._logger = n, this._protocol = s, this.connection = e, this._reconnectPolicy = o, this._handshakeProtocol = new Pa(), this.connection.onreceive = (c) => this._processIncomingData(c), this.connection.onclose = (c) => this._connectionClosed(c), this._callbacks = {}, this._methods = {}, this._closedCallbacks = [], this._reconnectingCallbacks = [], this._reconnectedCallbacks = [], this._invocationId = 0, this._receivedHandshakeResponse = !1, this._connectionState = S.Disconnected, this._connectionStarted = !1, this._cachedPingMessage = this._protocol.writeMessage({ type: g.Ping });
  }
  /** Indicates the state of the {@link HubConnection} to the server. */
  get state() {
    return this._connectionState;
  }
  /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
   *  in the disconnected state or if the negotiation step was skipped.
   */
  get connectionId() {
    return this.connection && this.connection.connectionId || null;
  }
  /** Indicates the url of the {@link HubConnection} to the server. */
  get baseUrl() {
    return this.connection.baseUrl || "";
  }
  /**
   * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
   * Reconnecting states.
   * @param {string} url The url to connect to.
   */
  set baseUrl(e) {
    if (this._connectionState !== S.Disconnected && this._connectionState !== S.Reconnecting)
      throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
    if (!e)
      throw new Error("The HubConnection url must be a valid url.");
    this.connection.baseUrl = e;
  }
  /** Starts the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
   */
  start() {
    return this._startPromise = this._startWithStateTransitions(), this._startPromise;
  }
  async _startWithStateTransitions() {
    if (this._connectionState !== S.Disconnected)
      return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
    this._connectionState = S.Connecting, this._logger.log(l.Debug, "Starting HubConnection.");
    try {
      await this._startInternal(), w.isBrowser && window.document.addEventListener("freeze", this._freezeEventListener), this._connectionState = S.Connected, this._connectionStarted = !0, this._logger.log(l.Debug, "HubConnection connected successfully.");
    } catch (e) {
      return this._connectionState = S.Disconnected, this._logger.log(l.Debug, `HubConnection failed to start successfully because of error '${e}'.`), Promise.reject(e);
    }
  }
  async _startInternal() {
    this._stopDuringStartError = void 0, this._receivedHandshakeResponse = !1;
    const e = new Promise((n, s) => {
      this._handshakeResolver = n, this._handshakeRejecter = s;
    });
    await this.connection.start(this._protocol.transferFormat);
    try {
      let n = this._protocol.version;
      this.connection.features.reconnect || (n = 1);
      const s = {
        protocol: this._protocol.name,
        version: n
      };
      if (this._logger.log(l.Debug, "Sending handshake request."), await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(s)), this._logger.log(l.Information, `Using HubProtocol '${this._protocol.name}'.`), this._cleanupTimeout(), this._resetTimeoutPeriod(), this._resetKeepAliveInterval(), await e, this._stopDuringStartError)
        throw this._stopDuringStartError;
      (this.connection.features.reconnect || !1) && (this._messageBuffer = new Ra(this._protocol, this.connection, this._statefulReconnectBufferSize), this.connection.features.disconnected = this._messageBuffer._disconnected.bind(this._messageBuffer), this.connection.features.resend = () => {
        if (this._messageBuffer)
          return this._messageBuffer._resend();
      }), this.connection.features.inherentKeepAlive || await this._sendMessage(this._cachedPingMessage);
    } catch (n) {
      throw this._logger.log(l.Debug, `Hub handshake failed with error '${n}' during start(). Stopping HubConnection.`), this._cleanupTimeout(), this._cleanupPingTimer(), await this.connection.stop(n), n;
    }
  }
  /** Stops the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
   */
  async stop() {
    const e = this._startPromise;
    this.connection.features.reconnect = !1, this._stopPromise = this._stopInternal(), await this._stopPromise;
    try {
      await e;
    } catch {
    }
  }
  _stopInternal(e) {
    if (this._connectionState === S.Disconnected)
      return this._logger.log(l.Debug, `Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`), Promise.resolve();
    if (this._connectionState === S.Disconnecting)
      return this._logger.log(l.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
    const n = this._connectionState;
    return this._connectionState = S.Disconnecting, this._logger.log(l.Debug, "Stopping HubConnection."), this._reconnectDelayHandle ? (this._logger.log(l.Debug, "Connection stopped during reconnect delay. Done reconnecting."), clearTimeout(this._reconnectDelayHandle), this._reconnectDelayHandle = void 0, this._completeClose(), Promise.resolve()) : (n === S.Connected && this._sendCloseMessage(), this._cleanupTimeout(), this._cleanupPingTimer(), this._stopDuringStartError = e || new U("The connection was stopped before the hub handshake could complete."), this.connection.stop(e));
  }
  async _sendCloseMessage() {
    try {
      await this._sendWithProtocol(this._createCloseMessage());
    } catch {
    }
  }
  /** Invokes a streaming hub method on the server using the specified name and arguments.
   *
   * @typeparam T The type of the items returned by the server.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
   */
  stream(e, ...n) {
    const [s, o] = this._replaceStreamingParams(n), i = this._createStreamInvocation(e, n, o);
    let r;
    const a = new Ta();
    return a.cancelCallback = () => {
      const c = this._createCancelInvocation(i.invocationId);
      return delete this._callbacks[i.invocationId], r.then(() => this._sendWithProtocol(c));
    }, this._callbacks[i.invocationId] = (c, u) => {
      if (u) {
        a.error(u);
        return;
      } else c && (c.type === g.Completion ? c.error ? a.error(new Error(c.error)) : a.complete() : a.next(c.item));
    }, r = this._sendWithProtocol(i).catch((c) => {
      a.error(c), delete this._callbacks[i.invocationId];
    }), this._launchStreams(s, r), a;
  }
  _sendMessage(e) {
    return this._resetKeepAliveInterval(), this.connection.send(e);
  }
  /**
   * Sends a js object to the server.
   * @param message The js object to serialize and send.
   */
  _sendWithProtocol(e) {
    return this._messageBuffer ? this._messageBuffer._send(e) : this._sendMessage(this._protocol.writeMessage(e));
  }
  /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
   *
   * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
   * be processing the invocation.
   *
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
   */
  send(e, ...n) {
    const [s, o] = this._replaceStreamingParams(n), i = this._sendWithProtocol(this._createInvocation(e, n, !0, o));
    return this._launchStreams(s, i), i;
  }
  /** Invokes a hub method on the server using the specified name and arguments.
   *
   * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
   * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
   * resolving the Promise.
   *
   * @typeparam T The expected return type.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
   */
  invoke(e, ...n) {
    const [s, o] = this._replaceStreamingParams(n), i = this._createInvocation(e, n, !1, o);
    return new Promise((a, c) => {
      this._callbacks[i.invocationId] = (d, _) => {
        if (_) {
          c(_);
          return;
        } else d && (d.type === g.Completion ? d.error ? c(new Error(d.error)) : a(d.result) : c(new Error(`Unexpected message type: ${d.type}`)));
      };
      const u = this._sendWithProtocol(i).catch((d) => {
        c(d), delete this._callbacks[i.invocationId];
      });
      this._launchStreams(s, u);
    });
  }
  on(e, n) {
    !e || !n || (e = e.toLowerCase(), this._methods[e] || (this._methods[e] = []), this._methods[e].indexOf(n) === -1 && this._methods[e].push(n));
  }
  off(e, n) {
    if (!e)
      return;
    e = e.toLowerCase();
    const s = this._methods[e];
    if (s)
      if (n) {
        const o = s.indexOf(n);
        o !== -1 && (s.splice(o, 1), s.length === 0 && delete this._methods[e]);
      } else
        delete this._methods[e];
  }
  /** Registers a handler that will be invoked when the connection is closed.
   *
   * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
   */
  onclose(e) {
    e && this._closedCallbacks.push(e);
  }
  /** Registers a handler that will be invoked when the connection starts reconnecting.
   *
   * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
   */
  onreconnecting(e) {
    e && this._reconnectingCallbacks.push(e);
  }
  /** Registers a handler that will be invoked when the connection successfully reconnects.
   *
   * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
   */
  onreconnected(e) {
    e && this._reconnectedCallbacks.push(e);
  }
  _processIncomingData(e) {
    if (this._cleanupTimeout(), this._receivedHandshakeResponse || (e = this._processHandshakeResponse(e), this._receivedHandshakeResponse = !0), e) {
      const n = this._protocol.parseMessages(e, this._logger);
      for (const s of n)
        if (!(this._messageBuffer && !this._messageBuffer._shouldProcessMessage(s)))
          switch (s.type) {
            case g.Invocation:
              this._invokeClientMethod(s).catch((o) => {
                this._logger.log(l.Error, `Invoke client method threw error: ${sn(o)}`);
              });
              break;
            case g.StreamItem:
            case g.Completion: {
              const o = this._callbacks[s.invocationId];
              if (o) {
                s.type === g.Completion && delete this._callbacks[s.invocationId];
                try {
                  o(s);
                } catch (i) {
                  this._logger.log(l.Error, `Stream callback threw error: ${sn(i)}`);
                }
              }
              break;
            }
            case g.Ping:
              break;
            case g.Close: {
              this._logger.log(l.Information, "Close message received from server.");
              const o = s.error ? new Error("Server returned an error on close: " + s.error) : void 0;
              s.allowReconnect === !0 ? this.connection.stop(o) : this._stopPromise = this._stopInternal(o);
              break;
            }
            case g.Ack:
              this._messageBuffer && this._messageBuffer._ack(s);
              break;
            case g.Sequence:
              this._messageBuffer && this._messageBuffer._resetSequence(s);
              break;
            default:
              this._logger.log(l.Warning, `Invalid message type: ${s.type}.`);
              break;
          }
    }
    this._resetTimeoutPeriod();
  }
  _processHandshakeResponse(e) {
    let n, s;
    try {
      [s, n] = this._handshakeProtocol.parseHandshakeResponse(e);
    } catch (o) {
      const i = "Error parsing handshake response: " + o;
      this._logger.log(l.Error, i);
      const r = new Error(i);
      throw this._handshakeRejecter(r), r;
    }
    if (n.error) {
      const o = "Server returned handshake error: " + n.error;
      this._logger.log(l.Error, o);
      const i = new Error(o);
      throw this._handshakeRejecter(i), i;
    } else
      this._logger.log(l.Debug, "Server handshake complete.");
    return this._handshakeResolver(), s;
  }
  _resetKeepAliveInterval() {
    this.connection.features.inherentKeepAlive || (this._nextKeepAlive = (/* @__PURE__ */ new Date()).getTime() + this.keepAliveIntervalInMilliseconds, this._cleanupPingTimer());
  }
  _resetTimeoutPeriod() {
    if ((!this.connection.features || !this.connection.features.inherentKeepAlive) && (this._timeoutHandle = setTimeout(() => this.serverTimeout(), this.serverTimeoutInMilliseconds), this._pingServerHandle === void 0)) {
      let e = this._nextKeepAlive - (/* @__PURE__ */ new Date()).getTime();
      e < 0 && (e = 0), this._pingServerHandle = setTimeout(async () => {
        if (this._connectionState === S.Connected)
          try {
            await this._sendMessage(this._cachedPingMessage);
          } catch {
            this._cleanupPingTimer();
          }
      }, e);
    }
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  serverTimeout() {
    this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
  }
  async _invokeClientMethod(e) {
    const n = e.target.toLowerCase(), s = this._methods[n];
    if (!s) {
      this._logger.log(l.Warning, `No client method with the name '${n}' found.`), e.invocationId && (this._logger.log(l.Warning, `No result given for '${n}' method and invocation ID '${e.invocationId}'.`), await this._sendWithProtocol(this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)));
      return;
    }
    const o = s.slice(), i = !!e.invocationId;
    let r, a, c;
    for (const u of o)
      try {
        const d = r;
        r = await u.apply(this, e.arguments), i && r && d && (this._logger.log(l.Error, `Multiple results provided for '${n}'. Sending error to server.`), c = this._createCompletionMessage(e.invocationId, "Client provided multiple results.", null)), a = void 0;
      } catch (d) {
        a = d, this._logger.log(l.Error, `A callback for the method '${n}' threw error '${d}'.`);
      }
    c ? await this._sendWithProtocol(c) : i ? (a ? c = this._createCompletionMessage(e.invocationId, `${a}`, null) : r !== void 0 ? c = this._createCompletionMessage(e.invocationId, null, r) : (this._logger.log(l.Warning, `No result given for '${n}' method and invocation ID '${e.invocationId}'.`), c = this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)), await this._sendWithProtocol(c)) : r && this._logger.log(l.Error, `Result given for '${n}' method but server is not expecting a result.`);
  }
  _connectionClosed(e) {
    this._logger.log(l.Debug, `HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`), this._stopDuringStartError = this._stopDuringStartError || e || new U("The underlying connection was closed before the hub handshake could complete."), this._handshakeResolver && this._handshakeResolver(), this._cancelCallbacksWithError(e || new Error("Invocation canceled due to the underlying connection being closed.")), this._cleanupTimeout(), this._cleanupPingTimer(), this._connectionState === S.Disconnecting ? this._completeClose(e) : this._connectionState === S.Connected && this._reconnectPolicy ? this._reconnect(e) : this._connectionState === S.Connected && this._completeClose(e);
  }
  _completeClose(e) {
    if (this._connectionStarted) {
      this._connectionState = S.Disconnected, this._connectionStarted = !1, this._messageBuffer && (this._messageBuffer._dispose(e ?? new Error("Connection closed.")), this._messageBuffer = void 0), w.isBrowser && window.document.removeEventListener("freeze", this._freezeEventListener);
      try {
        this._closedCallbacks.forEach((n) => n.apply(this, [e]));
      } catch (n) {
        this._logger.log(l.Error, `An onclose callback called with error '${e}' threw error '${n}'.`);
      }
    }
  }
  async _reconnect(e) {
    const n = Date.now();
    let s = 0, o = e !== void 0 ? e : new Error("Attempting to reconnect due to a unknown error."), i = this._getNextRetryDelay(s++, 0, o);
    if (i === null) {
      this._logger.log(l.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."), this._completeClose(e);
      return;
    }
    if (this._connectionState = S.Reconnecting, e ? this._logger.log(l.Information, `Connection reconnecting because of error '${e}'.`) : this._logger.log(l.Information, "Connection reconnecting."), this._reconnectingCallbacks.length !== 0) {
      try {
        this._reconnectingCallbacks.forEach((r) => r.apply(this, [e]));
      } catch (r) {
        this._logger.log(l.Error, `An onreconnecting callback called with error '${e}' threw error '${r}'.`);
      }
      if (this._connectionState !== S.Reconnecting) {
        this._logger.log(l.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
        return;
      }
    }
    for (; i !== null; ) {
      if (this._logger.log(l.Information, `Reconnect attempt number ${s} will start in ${i} ms.`), await new Promise((r) => {
        this._reconnectDelayHandle = setTimeout(r, i);
      }), this._reconnectDelayHandle = void 0, this._connectionState !== S.Reconnecting) {
        this._logger.log(l.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
        return;
      }
      try {
        if (await this._startInternal(), this._connectionState = S.Connected, this._logger.log(l.Information, "HubConnection reconnected successfully."), this._reconnectedCallbacks.length !== 0)
          try {
            this._reconnectedCallbacks.forEach((r) => r.apply(this, [this.connection.connectionId]));
          } catch (r) {
            this._logger.log(l.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${r}'.`);
          }
        return;
      } catch (r) {
        if (this._logger.log(l.Information, `Reconnect attempt failed because of error '${r}'.`), this._connectionState !== S.Reconnecting) {
          this._logger.log(l.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`), this._connectionState === S.Disconnecting && this._completeClose();
          return;
        }
        o = r instanceof Error ? r : new Error(r.toString()), i = this._getNextRetryDelay(s++, Date.now() - n, o);
      }
    }
    this._logger.log(l.Information, `Reconnect retries have been exhausted after ${Date.now() - n} ms and ${s} failed attempts. Connection disconnecting.`), this._completeClose();
  }
  _getNextRetryDelay(e, n, s) {
    try {
      return this._reconnectPolicy.nextRetryDelayInMilliseconds({
        elapsedMilliseconds: n,
        previousRetryCount: e,
        retryReason: s
      });
    } catch (o) {
      return this._logger.log(l.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${n}) threw error '${o}'.`), null;
    }
  }
  _cancelCallbacksWithError(e) {
    const n = this._callbacks;
    this._callbacks = {}, Object.keys(n).forEach((s) => {
      const o = n[s];
      try {
        o(null, e);
      } catch (i) {
        this._logger.log(l.Error, `Stream 'error' callback called with '${e}' threw error: ${sn(i)}`);
      }
    });
  }
  _cleanupPingTimer() {
    this._pingServerHandle && (clearTimeout(this._pingServerHandle), this._pingServerHandle = void 0);
  }
  _cleanupTimeout() {
    this._timeoutHandle && clearTimeout(this._timeoutHandle);
  }
  _createInvocation(e, n, s, o) {
    if (s)
      return o.length !== 0 ? {
        target: e,
        arguments: n,
        streamIds: o,
        type: g.Invocation
      } : {
        target: e,
        arguments: n,
        type: g.Invocation
      };
    {
      const i = this._invocationId;
      return this._invocationId++, o.length !== 0 ? {
        target: e,
        arguments: n,
        invocationId: i.toString(),
        streamIds: o,
        type: g.Invocation
      } : {
        target: e,
        arguments: n,
        invocationId: i.toString(),
        type: g.Invocation
      };
    }
  }
  _launchStreams(e, n) {
    if (e.length !== 0) {
      n || (n = Promise.resolve());
      for (const s in e)
        e[s].subscribe({
          complete: () => {
            n = n.then(() => this._sendWithProtocol(this._createCompletionMessage(s)));
          },
          error: (o) => {
            let i;
            o instanceof Error ? i = o.message : o && o.toString ? i = o.toString() : i = "Unknown error", n = n.then(() => this._sendWithProtocol(this._createCompletionMessage(s, i)));
          },
          next: (o) => {
            n = n.then(() => this._sendWithProtocol(this._createStreamItemMessage(s, o)));
          }
        });
    }
  }
  _replaceStreamingParams(e) {
    const n = [], s = [];
    for (let o = 0; o < e.length; o++) {
      const i = e[o];
      if (this._isObservable(i)) {
        const r = this._invocationId;
        this._invocationId++, n[r] = i, s.push(r.toString()), e.splice(o, 1);
      }
    }
    return [n, s];
  }
  _isObservable(e) {
    return e && e.subscribe && typeof e.subscribe == "function";
  }
  _createStreamInvocation(e, n, s) {
    const o = this._invocationId;
    return this._invocationId++, s.length !== 0 ? {
      target: e,
      arguments: n,
      invocationId: o.toString(),
      streamIds: s,
      type: g.StreamInvocation
    } : {
      target: e,
      arguments: n,
      invocationId: o.toString(),
      type: g.StreamInvocation
    };
  }
  _createCancelInvocation(e) {
    return {
      invocationId: e,
      type: g.CancelInvocation
    };
  }
  _createStreamItemMessage(e, n) {
    return {
      invocationId: e,
      item: n,
      type: g.StreamItem
    };
  }
  _createCompletionMessage(e, n, s) {
    return n ? {
      error: n,
      invocationId: e,
      type: g.Completion
    } : {
      invocationId: e,
      result: s,
      type: g.Completion
    };
  }
  _createCloseMessage() {
    return { type: g.Close };
  }
}
const Ma = [0, 2e3, 1e4, 3e4, null];
class rs {
  constructor(e) {
    this._retryDelays = e !== void 0 ? [...e, null] : Ma;
  }
  nextRetryDelayInMilliseconds(e) {
    return this._retryDelays[e.previousRetryCount];
  }
}
class le {
}
le.Authorization = "Authorization";
le.Cookie = "Cookie";
class La extends qt {
  constructor(e, n) {
    super(), this._innerClient = e, this._accessTokenFactory = n;
  }
  async send(e) {
    let n = !0;
    this._accessTokenFactory && (!this._accessToken || e.url && e.url.indexOf("/negotiate?") > 0) && (n = !1, this._accessToken = await this._accessTokenFactory()), this._setAuthorizationHeader(e);
    const s = await this._innerClient.send(e);
    return n && s.statusCode === 401 && this._accessTokenFactory ? (this._accessToken = await this._accessTokenFactory(), this._setAuthorizationHeader(e), await this._innerClient.send(e)) : s;
  }
  _setAuthorizationHeader(e) {
    e.headers || (e.headers = {}), this._accessToken ? e.headers[le.Authorization] = `Bearer ${this._accessToken}` : this._accessTokenFactory && e.headers[le.Authorization] && delete e.headers[le.Authorization];
  }
  getCookieString(e) {
    return this._innerClient.getCookieString(e);
  }
}
var E;
(function(t) {
  t[t.None = 0] = "None", t[t.WebSockets = 1] = "WebSockets", t[t.ServerSentEvents = 2] = "ServerSentEvents", t[t.LongPolling = 4] = "LongPolling";
})(E || (E = {}));
var I;
(function(t) {
  t[t.Text = 1] = "Text", t[t.Binary = 2] = "Binary";
})(I || (I = {}));
let Ua = class {
  constructor() {
    this._isAborted = !1, this.onabort = null;
  }
  abort() {
    this._isAborted || (this._isAborted = !0, this.onabort && this.onabort());
  }
  get signal() {
    return this;
  }
  get aborted() {
    return this._isAborted;
  }
};
class as {
  // This is an internal type, not exported from 'index' so this is really just internal.
  get pollAborted() {
    return this._pollAbort.aborted;
  }
  constructor(e, n, s) {
    this._httpClient = e, this._logger = n, this._pollAbort = new Ua(), this._options = s, this._running = !1, this.onreceive = null, this.onclose = null;
  }
  async connect(e, n) {
    if (b.isRequired(e, "url"), b.isRequired(n, "transferFormat"), b.isIn(n, I, "transferFormat"), this._url = e, this._logger.log(l.Trace, "(LongPolling transport) Connecting."), n === I.Binary && typeof XMLHttpRequest < "u" && typeof new XMLHttpRequest().responseType != "string")
      throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
    const [s, o] = Ue(), i = { [s]: o, ...this._options.headers }, r = {
      abortSignal: this._pollAbort.signal,
      headers: i,
      timeout: 1e5,
      withCredentials: this._options.withCredentials
    };
    n === I.Binary && (r.responseType = "arraybuffer");
    const a = `${e}&_=${Date.now()}`;
    this._logger.log(l.Trace, `(LongPolling transport) polling: ${a}.`);
    const c = await this._httpClient.get(a, r);
    c.statusCode !== 200 ? (this._logger.log(l.Error, `(LongPolling transport) Unexpected response code: ${c.statusCode}.`), this._closeError = new ce(c.statusText || "", c.statusCode), this._running = !1) : this._running = !0, this._receiving = this._poll(this._url, r);
  }
  async _poll(e, n) {
    try {
      for (; this._running; )
        try {
          const s = `${e}&_=${Date.now()}`;
          this._logger.log(l.Trace, `(LongPolling transport) polling: ${s}.`);
          const o = await this._httpClient.get(s, n);
          o.statusCode === 204 ? (this._logger.log(l.Information, "(LongPolling transport) Poll terminated by server."), this._running = !1) : o.statusCode !== 200 ? (this._logger.log(l.Error, `(LongPolling transport) Unexpected response code: ${o.statusCode}.`), this._closeError = new ce(o.statusText || "", o.statusCode), this._running = !1) : o.content ? (this._logger.log(l.Trace, `(LongPolling transport) data received. ${at(o.content, this._options.logMessageContent)}.`), this.onreceive && this.onreceive(o.content)) : this._logger.log(l.Trace, "(LongPolling transport) Poll timed out, reissuing.");
        } catch (s) {
          this._running ? s instanceof An ? this._logger.log(l.Trace, "(LongPolling transport) Poll timed out, reissuing.") : (this._closeError = s, this._running = !1) : this._logger.log(l.Trace, `(LongPolling transport) Poll errored after shutdown: ${s.message}`);
        }
    } finally {
      this._logger.log(l.Trace, "(LongPolling transport) Polling complete."), this.pollAborted || this._raiseOnClose();
    }
  }
  async send(e) {
    return this._running ? Eo(this._logger, "LongPolling", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  async stop() {
    this._logger.log(l.Trace, "(LongPolling transport) Stopping polling."), this._running = !1, this._pollAbort.abort();
    try {
      await this._receiving, this._logger.log(l.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
      const e = {}, [n, s] = Ue();
      e[n] = s;
      const o = {
        headers: { ...e, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      };
      let i;
      try {
        await this._httpClient.delete(this._url, o);
      } catch (r) {
        i = r;
      }
      i ? i instanceof ce && (i.statusCode === 404 ? this._logger.log(l.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.") : this._logger.log(l.Trace, `(LongPolling transport) Error sending a DELETE request: ${i}`)) : this._logger.log(l.Trace, "(LongPolling transport) DELETE request accepted.");
    } finally {
      this._logger.log(l.Trace, "(LongPolling transport) Stop finished."), this._raiseOnClose();
    }
  }
  _raiseOnClose() {
    if (this.onclose) {
      let e = "(LongPolling transport) Firing onclose event.";
      this._closeError && (e += " Error: " + this._closeError), this._logger.log(l.Trace, e), this.onclose(this._closeError);
    }
  }
}
class Ha {
  constructor(e, n, s, o) {
    this._httpClient = e, this._accessToken = n, this._logger = s, this._options = o, this.onreceive = null, this.onclose = null;
  }
  async connect(e, n) {
    return b.isRequired(e, "url"), b.isRequired(n, "transferFormat"), b.isIn(n, I, "transferFormat"), this._logger.log(l.Trace, "(SSE transport) Connecting."), this._url = e, this._accessToken && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`), new Promise((s, o) => {
      let i = !1;
      if (n !== I.Text) {
        o(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
        return;
      }
      let r;
      if (w.isBrowser || w.isWebWorker)
        r = new this._options.EventSource(e, { withCredentials: this._options.withCredentials });
      else {
        const a = this._httpClient.getCookieString(e), c = {};
        c.Cookie = a;
        const [u, d] = Ue();
        c[u] = d, r = new this._options.EventSource(e, { withCredentials: this._options.withCredentials, headers: { ...c, ...this._options.headers } });
      }
      try {
        r.onmessage = (a) => {
          if (this.onreceive)
            try {
              this._logger.log(l.Trace, `(SSE transport) data received. ${at(a.data, this._options.logMessageContent)}.`), this.onreceive(a.data);
            } catch (c) {
              this._close(c);
              return;
            }
        }, r.onerror = (a) => {
          i ? this._close() : o(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."));
        }, r.onopen = () => {
          this._logger.log(l.Information, `SSE connected to ${this._url}`), this._eventSource = r, i = !0, s();
        };
      } catch (a) {
        o(a);
        return;
      }
    });
  }
  async send(e) {
    return this._eventSource ? Eo(this._logger, "SSE", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  stop() {
    return this._close(), Promise.resolve();
  }
  _close(e) {
    this._eventSource && (this._eventSource.close(), this._eventSource = void 0, this.onclose && this.onclose(e));
  }
}
class za {
  constructor(e, n, s, o, i, r) {
    this._logger = s, this._accessTokenFactory = n, this._logMessageContent = o, this._webSocketConstructor = i, this._httpClient = e, this.onreceive = null, this.onclose = null, this._headers = r;
  }
  async connect(e, n) {
    b.isRequired(e, "url"), b.isRequired(n, "transferFormat"), b.isIn(n, I, "transferFormat"), this._logger.log(l.Trace, "(WebSockets transport) Connecting.");
    let s;
    return this._accessTokenFactory && (s = await this._accessTokenFactory()), new Promise((o, i) => {
      e = e.replace(/^http/, "ws");
      let r;
      const a = this._httpClient.getCookieString(e);
      let c = !1;
      if (w.isNode || w.isReactNative) {
        const u = {}, [d, _] = Ue();
        u[d] = _, s && (u[le.Authorization] = `Bearer ${s}`), a && (u[le.Cookie] = a), r = new this._webSocketConstructor(e, void 0, {
          headers: { ...u, ...this._headers }
        });
      } else
        s && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(s)}`);
      r || (r = new this._webSocketConstructor(e)), n === I.Binary && (r.binaryType = "arraybuffer"), r.onopen = (u) => {
        this._logger.log(l.Information, `WebSocket connected to ${e}.`), this._webSocket = r, c = !0, o();
      }, r.onerror = (u) => {
        let d = null;
        typeof ErrorEvent < "u" && u instanceof ErrorEvent ? d = u.error : d = "There was an error with the transport", this._logger.log(l.Information, `(WebSockets transport) ${d}.`);
      }, r.onmessage = (u) => {
        if (this._logger.log(l.Trace, `(WebSockets transport) data received. ${at(u.data, this._logMessageContent)}.`), this.onreceive)
          try {
            this.onreceive(u.data);
          } catch (d) {
            this._close(d);
            return;
          }
      }, r.onclose = (u) => {
        if (c)
          this._close(u);
        else {
          let d = null;
          typeof ErrorEvent < "u" && u instanceof ErrorEvent ? d = u.error : d = "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.", i(new Error(d));
        }
      };
    });
  }
  send(e) {
    return this._webSocket && this._webSocket.readyState === this._webSocketConstructor.OPEN ? (this._logger.log(l.Trace, `(WebSockets transport) sending data. ${at(e, this._logMessageContent)}.`), this._webSocket.send(e), Promise.resolve()) : Promise.reject("WebSocket is not in the OPEN state");
  }
  stop() {
    return this._webSocket && this._close(void 0), Promise.resolve();
  }
  _close(e) {
    this._webSocket && (this._webSocket.onclose = () => {
    }, this._webSocket.onmessage = () => {
    }, this._webSocket.onerror = () => {
    }, this._webSocket.close(), this._webSocket = void 0), this._logger.log(l.Trace, "(WebSockets transport) socket closed."), this.onclose && (this._isCloseEvent(e) && (e.wasClean === !1 || e.code !== 1e3) ? this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason || "no reason given"}).`)) : e instanceof Error ? this.onclose(e) : this.onclose());
  }
  _isCloseEvent(e) {
    return e && typeof e.wasClean == "boolean" && typeof e.code == "number";
  }
}
const cs = 100;
class Wa {
  constructor(e, n = {}) {
    if (this._stopPromiseResolver = () => {
    }, this.features = {}, this._negotiateVersion = 1, b.isRequired(e, "url"), this._logger = va(n.logger), this.baseUrl = this._resolveUrl(e), n = n || {}, n.logMessageContent = n.logMessageContent === void 0 ? !1 : n.logMessageContent, typeof n.withCredentials == "boolean" || n.withCredentials === void 0)
      n.withCredentials = n.withCredentials === void 0 ? !0 : n.withCredentials;
    else
      throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
    n.timeout = n.timeout === void 0 ? 100 * 1e3 : n.timeout;
    let s = null, o = null;
    if (w.isNode && typeof require < "u") {
      const i = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      s = i("ws"), o = i("eventsource");
    }
    !w.isNode && typeof WebSocket < "u" && !n.WebSocket ? n.WebSocket = WebSocket : w.isNode && !n.WebSocket && s && (n.WebSocket = s), !w.isNode && typeof EventSource < "u" && !n.EventSource ? n.EventSource = EventSource : w.isNode && !n.EventSource && typeof o < "u" && (n.EventSource = o), this._httpClient = new La(n.httpClient || new Ia(this._logger), n.accessTokenFactory), this._connectionState = "Disconnected", this._connectionStarted = !1, this._options = n, this.onreceive = null, this.onclose = null;
  }
  async start(e) {
    if (e = e || I.Binary, b.isIn(e, I, "transferFormat"), this._logger.log(l.Debug, `Starting connection with transfer format '${I[e]}'.`), this._connectionState !== "Disconnected")
      return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
    if (this._connectionState = "Connecting", this._startInternalPromise = this._startInternal(e), await this._startInternalPromise, this._connectionState === "Disconnecting") {
      const n = "Failed to start the HttpConnection before stop() was called.";
      return this._logger.log(l.Error, n), await this._stopPromise, Promise.reject(new U(n));
    } else if (this._connectionState !== "Connected") {
      const n = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
      return this._logger.log(l.Error, n), Promise.reject(new U(n));
    }
    this._connectionStarted = !0;
  }
  send(e) {
    return this._connectionState !== "Connected" ? Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")) : (this._sendQueue || (this._sendQueue = new In(this.transport)), this._sendQueue.send(e));
  }
  async stop(e) {
    if (this._connectionState === "Disconnected")
      return this._logger.log(l.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`), Promise.resolve();
    if (this._connectionState === "Disconnecting")
      return this._logger.log(l.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
    this._connectionState = "Disconnecting", this._stopPromise = new Promise((n) => {
      this._stopPromiseResolver = n;
    }), await this._stopInternal(e), await this._stopPromise;
  }
  async _stopInternal(e) {
    this._stopError = e;
    try {
      await this._startInternalPromise;
    } catch {
    }
    if (this.transport) {
      try {
        await this.transport.stop();
      } catch (n) {
        this._logger.log(l.Error, `HttpConnection.transport.stop() threw error '${n}'.`), this._stopConnection();
      }
      this.transport = void 0;
    } else
      this._logger.log(l.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
  }
  async _startInternal(e) {
    let n = this.baseUrl;
    this._accessTokenFactory = this._options.accessTokenFactory, this._httpClient._accessTokenFactory = this._accessTokenFactory;
    try {
      if (this._options.skipNegotiation)
        if (this._options.transport === E.WebSockets)
          this.transport = this._constructTransport(E.WebSockets), await this._startTransport(n, e);
        else
          throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
      else {
        let s = null, o = 0;
        do {
          if (s = await this._getNegotiationResponse(n), this._connectionState === "Disconnecting" || this._connectionState === "Disconnected")
            throw new U("The connection was stopped during negotiation.");
          if (s.error)
            throw new Error(s.error);
          if (s.ProtocolVersion)
            throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
          if (s.url && (n = s.url), s.accessToken) {
            const i = s.accessToken;
            this._accessTokenFactory = () => i, this._httpClient._accessToken = i, this._httpClient._accessTokenFactory = void 0;
          }
          o++;
        } while (s.url && o < cs);
        if (o === cs && s.url)
          throw new Error("Negotiate redirection limit exceeded.");
        await this._createTransport(n, this._options.transport, s, e);
      }
      this.transport instanceof as && (this.features.inherentKeepAlive = !0), this._connectionState === "Connecting" && (this._logger.log(l.Debug, "The HttpConnection connected successfully."), this._connectionState = "Connected");
    } catch (s) {
      return this._logger.log(l.Error, "Failed to start the connection: " + s), this._connectionState = "Disconnected", this.transport = void 0, this._stopPromiseResolver(), Promise.reject(s);
    }
  }
  async _getNegotiationResponse(e) {
    const n = {}, [s, o] = Ue();
    n[s] = o;
    const i = this._resolveNegotiateUrl(e);
    this._logger.log(l.Debug, `Sending negotiation request: ${i}.`);
    try {
      const r = await this._httpClient.post(i, {
        content: "",
        headers: { ...n, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      });
      if (r.statusCode !== 200)
        return Promise.reject(new Error(`Unexpected status code returned from negotiate '${r.statusCode}'`));
      const a = JSON.parse(r.content);
      return (!a.negotiateVersion || a.negotiateVersion < 1) && (a.connectionToken = a.connectionId), a.useStatefulReconnect && this._options._useStatefulReconnect !== !0 ? Promise.reject(new os("Client didn't negotiate Stateful Reconnect but the server did.")) : a;
    } catch (r) {
      let a = "Failed to complete negotiation with the server: " + r;
      return r instanceof ce && r.statusCode === 404 && (a = a + " Either this is not a SignalR endpoint or there is a proxy blocking the connection."), this._logger.log(l.Error, a), Promise.reject(new os(a));
    }
  }
  _createConnectUrl(e, n) {
    return n ? e + (e.indexOf("?") === -1 ? "?" : "&") + `id=${n}` : e;
  }
  async _createTransport(e, n, s, o) {
    let i = this._createConnectUrl(e, s.connectionToken);
    if (this._isITransport(n)) {
      this._logger.log(l.Debug, "Connection was provided an instance of ITransport, using that directly."), this.transport = n, await this._startTransport(i, o), this.connectionId = s.connectionId;
      return;
    }
    const r = [], a = s.availableTransports || [];
    let c = s;
    for (const u of a) {
      const d = this._resolveTransportOrError(u, n, o, (c == null ? void 0 : c.useStatefulReconnect) === !0);
      if (d instanceof Error)
        r.push(`${u.transport} failed:`), r.push(d);
      else if (this._isITransport(d)) {
        if (this.transport = d, !c) {
          try {
            c = await this._getNegotiationResponse(e);
          } catch (_) {
            return Promise.reject(_);
          }
          i = this._createConnectUrl(e, c.connectionToken);
        }
        try {
          await this._startTransport(i, o), this.connectionId = c.connectionId;
          return;
        } catch (_) {
          if (this._logger.log(l.Error, `Failed to start the transport '${u.transport}': ${_}`), c = void 0, r.push(new ga(`${u.transport} failed: ${_}`, E[u.transport])), this._connectionState !== "Connecting") {
            const y = "Failed to select transport before stop() was called.";
            return this._logger.log(l.Debug, y), Promise.reject(new U(y));
          }
        }
      }
    }
    return r.length > 0 ? Promise.reject(new fa(`Unable to connect to the server with any of the available transports. ${r.join(" ")}`, r)) : Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
  }
  _constructTransport(e) {
    switch (e) {
      case E.WebSockets:
        if (!this._options.WebSocket)
          throw new Error("'WebSocket' is not supported in your environment.");
        return new za(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
      case E.ServerSentEvents:
        if (!this._options.EventSource)
          throw new Error("'EventSource' is not supported in your environment.");
        return new Ha(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
      case E.LongPolling:
        return new as(this._httpClient, this._logger, this._options);
      default:
        throw new Error(`Unknown transport: ${e}.`);
    }
  }
  _startTransport(e, n) {
    return this.transport.onreceive = this.onreceive, this.features.reconnect ? this.transport.onclose = async (s) => {
      let o = !1;
      if (this.features.reconnect)
        try {
          this.features.disconnected(), await this.transport.connect(e, n), await this.features.resend();
        } catch {
          o = !0;
        }
      else {
        this._stopConnection(s);
        return;
      }
      o && this._stopConnection(s);
    } : this.transport.onclose = (s) => this._stopConnection(s), this.transport.connect(e, n);
  }
  _resolveTransportOrError(e, n, s, o) {
    const i = E[e.transport];
    if (i == null)
      return this._logger.log(l.Debug, `Skipping transport '${e.transport}' because it is not supported by this client.`), new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);
    if (Ba(n, i))
      if (e.transferFormats.map((a) => I[a]).indexOf(s) >= 0) {
        if (i === E.WebSockets && !this._options.WebSocket || i === E.ServerSentEvents && !this._options.EventSource)
          return this._logger.log(l.Debug, `Skipping transport '${E[i]}' because it is not supported in your environment.'`), new pa(`'${E[i]}' is not supported in your environment.`, i);
        this._logger.log(l.Debug, `Selecting transport '${E[i]}'.`);
        try {
          return this.features.reconnect = i === E.WebSockets ? o : void 0, this._constructTransport(i);
        } catch (a) {
          return a;
        }
      } else
        return this._logger.log(l.Debug, `Skipping transport '${E[i]}' because it does not support the requested transfer format '${I[s]}'.`), new Error(`'${E[i]}' does not support ${I[s]}.`);
    else
      return this._logger.log(l.Debug, `Skipping transport '${E[i]}' because it was disabled by the client.`), new _a(`'${E[i]}' is disabled by the client.`, i);
  }
  _isITransport(e) {
    return e && typeof e == "object" && "connect" in e;
  }
  _stopConnection(e) {
    if (this._logger.log(l.Debug, `HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`), this.transport = void 0, e = this._stopError || e, this._stopError = void 0, this._connectionState === "Disconnected") {
      this._logger.log(l.Debug, `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);
      return;
    }
    if (this._connectionState === "Connecting")
      throw this._logger.log(l.Warning, `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`), new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);
    if (this._connectionState === "Disconnecting" && this._stopPromiseResolver(), e ? this._logger.log(l.Error, `Connection disconnected with error '${e}'.`) : this._logger.log(l.Information, "Connection disconnected."), this._sendQueue && (this._sendQueue.stop().catch((n) => {
      this._logger.log(l.Error, `TransportSendQueue.stop() threw error '${n}'.`);
    }), this._sendQueue = void 0), this.connectionId = void 0, this._connectionState = "Disconnected", this._connectionStarted) {
      this._connectionStarted = !1;
      try {
        this.onclose && this.onclose(e);
      } catch (n) {
        this._logger.log(l.Error, `HttpConnection.onclose(${e}) threw error '${n}'.`);
      }
    }
  }
  _resolveUrl(e) {
    if (e.lastIndexOf("https://", 0) === 0 || e.lastIndexOf("http://", 0) === 0)
      return e;
    if (!w.isBrowser)
      throw new Error(`Cannot resolve '${e}'.`);
    const n = window.document.createElement("a");
    return n.href = e, this._logger.log(l.Information, `Normalizing '${e}' to '${n.href}'.`), n.href;
  }
  _resolveNegotiateUrl(e) {
    const n = new URL(e);
    n.pathname.endsWith("/") ? n.pathname += "negotiate" : n.pathname += "/negotiate";
    const s = new URLSearchParams(n.searchParams);
    return s.has("negotiateVersion") || s.append("negotiateVersion", this._negotiateVersion.toString()), s.has("useStatefulReconnect") ? s.get("useStatefulReconnect") === "true" && (this._options._useStatefulReconnect = !0) : this._options._useStatefulReconnect === !0 && s.append("useStatefulReconnect", "true"), n.search = s.toString(), n.toString();
  }
}
function Ba(t, e) {
  return !t || (e & t) !== 0;
}
class In {
  constructor(e) {
    this._transport = e, this._buffer = [], this._executing = !0, this._sendBufferedData = new St(), this._transportResult = new St(), this._sendLoopPromise = this._sendLoop();
  }
  send(e) {
    return this._bufferData(e), this._transportResult || (this._transportResult = new St()), this._transportResult.promise;
  }
  stop() {
    return this._executing = !1, this._sendBufferedData.resolve(), this._sendLoopPromise;
  }
  _bufferData(e) {
    if (this._buffer.length && typeof this._buffer[0] != typeof e)
      throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);
    this._buffer.push(e), this._sendBufferedData.resolve();
  }
  async _sendLoop() {
    for (; ; ) {
      if (await this._sendBufferedData.promise, !this._executing) {
        this._transportResult && this._transportResult.reject("Connection stopped.");
        break;
      }
      this._sendBufferedData = new St();
      const e = this._transportResult;
      this._transportResult = void 0;
      const n = typeof this._buffer[0] == "string" ? this._buffer.join("") : In._concatBuffers(this._buffer);
      this._buffer.length = 0;
      try {
        await this._transport.send(n), e.resolve();
      } catch (s) {
        e.reject(s);
      }
    }
  }
  static _concatBuffers(e) {
    const n = e.map((i) => i.byteLength).reduce((i, r) => i + r), s = new Uint8Array(n);
    let o = 0;
    for (const i of e)
      s.set(new Uint8Array(i), o), o += i.byteLength;
    return s.buffer;
  }
}
class St {
  constructor() {
    this.promise = new Promise((e, n) => [this._resolver, this._rejecter] = [e, n]);
  }
  resolve() {
    this._resolver();
  }
  reject(e) {
    this._rejecter(e);
  }
}
const ja = "json";
class Fa {
  constructor() {
    this.name = ja, this.version = 2, this.transferFormat = I.Text;
  }
  /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
   *
   * @param {string} input A string containing the serialized representation.
   * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
   */
  parseMessages(e, n) {
    if (typeof e != "string")
      throw new Error("Invalid input for JSON hub protocol. Expected a string.");
    if (!e)
      return [];
    n === null && (n = rt.instance);
    const s = M.parse(e), o = [];
    for (const i of s) {
      const r = JSON.parse(i);
      if (typeof r.type != "number")
        throw new Error("Invalid payload.");
      switch (r.type) {
        case g.Invocation:
          this._isInvocationMessage(r);
          break;
        case g.StreamItem:
          this._isStreamItemMessage(r);
          break;
        case g.Completion:
          this._isCompletionMessage(r);
          break;
        case g.Ping:
          break;
        case g.Close:
          break;
        case g.Ack:
          this._isAckMessage(r);
          break;
        case g.Sequence:
          this._isSequenceMessage(r);
          break;
        default:
          n.log(l.Information, "Unknown message type '" + r.type + "' ignored.");
          continue;
      }
      o.push(r);
    }
    return o;
  }
  /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
   *
   * @param {HubMessage} message The message to write.
   * @returns {string} A string containing the serialized representation of the message.
   */
  writeMessage(e) {
    return M.write(JSON.stringify(e));
  }
  _isInvocationMessage(e) {
    this._assertNotEmptyString(e.target, "Invalid payload for Invocation message."), e.invocationId !== void 0 && this._assertNotEmptyString(e.invocationId, "Invalid payload for Invocation message.");
  }
  _isStreamItemMessage(e) {
    if (this._assertNotEmptyString(e.invocationId, "Invalid payload for StreamItem message."), e.item === void 0)
      throw new Error("Invalid payload for StreamItem message.");
  }
  _isCompletionMessage(e) {
    if (e.result && e.error)
      throw new Error("Invalid payload for Completion message.");
    !e.result && e.error && this._assertNotEmptyString(e.error, "Invalid payload for Completion message."), this._assertNotEmptyString(e.invocationId, "Invalid payload for Completion message.");
  }
  _isAckMessage(e) {
    if (typeof e.sequenceId != "number")
      throw new Error("Invalid SequenceId for Ack message.");
  }
  _isSequenceMessage(e) {
    if (typeof e.sequenceId != "number")
      throw new Error("Invalid SequenceId for Sequence message.");
  }
  _assertNotEmptyString(e, n) {
    if (typeof e != "string" || e === "")
      throw new Error(n);
  }
}
const Va = {
  trace: l.Trace,
  debug: l.Debug,
  info: l.Information,
  information: l.Information,
  warn: l.Warning,
  warning: l.Warning,
  error: l.Error,
  critical: l.Critical,
  none: l.None
};
function qa(t) {
  const e = Va[t.toLowerCase()];
  if (typeof e < "u")
    return e;
  throw new Error(`Unknown log level: ${t}`);
}
class il {
  configureLogging(e) {
    if (b.isRequired(e, "logging"), Ya(e))
      this.logger = e;
    else if (typeof e == "string") {
      const n = qa(e);
      this.logger = new Mt(n);
    } else
      this.logger = new Mt(e);
    return this;
  }
  withUrl(e, n) {
    return b.isRequired(e, "url"), b.isNotEmpty(e, "url"), this.url = e, typeof n == "object" ? this.httpConnectionOptions = { ...this.httpConnectionOptions, ...n } : this.httpConnectionOptions = {
      ...this.httpConnectionOptions,
      transport: n
    }, this;
  }
  /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
   *
   * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
   */
  withHubProtocol(e) {
    return b.isRequired(e, "protocol"), this.protocol = e, this;
  }
  withAutomaticReconnect(e) {
    if (this.reconnectPolicy)
      throw new Error("A reconnectPolicy has already been set.");
    return e ? Array.isArray(e) ? this.reconnectPolicy = new rs(e) : this.reconnectPolicy = e : this.reconnectPolicy = new rs(), this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.serverTimeoutInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withServerTimeout(e) {
    return b.isRequired(e, "milliseconds"), this._serverTimeoutInMilliseconds = e, this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.keepAliveIntervalInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withKeepAliveInterval(e) {
    return b.isRequired(e, "milliseconds"), this._keepAliveIntervalInMilliseconds = e, this;
  }
  /** Enables and configures options for the Stateful Reconnect feature.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withStatefulReconnect(e) {
    return this.httpConnectionOptions === void 0 && (this.httpConnectionOptions = {}), this.httpConnectionOptions._useStatefulReconnect = !0, this._statefulReconnectBufferSize = e == null ? void 0 : e.bufferSize, this;
  }
  /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
   *
   * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
   */
  build() {
    const e = this.httpConnectionOptions || {};
    if (e.logger === void 0 && (e.logger = this.logger), !this.url)
      throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
    const n = new Wa(this.url, e);
    return kn.create(n, this.logger || rt.instance, this.protocol || new Fa(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds, this._statefulReconnectBufferSize);
  }
}
function Ya(t) {
  return t.log !== void 0;
}
var F, Z, ie;
class rl extends fn {
  constructor(n) {
    super(n);
    m(this, F);
    m(this, Z);
    m(this, ie);
    v(this, F, new zo(this)), v(this, Z, new Wo(this)), v(this, ie, new Bo(this));
  }
  /**
   * Get the list of possible actions from the server
   * @returns Promise
   */
  async getActions(n) {
    return h(this, F).getActionsBySet(n);
  }
  /**
   * Request of the action to perform
   * @returns PerformActionResponse.
   */
  async performAction(n) {
    return h(this, F).performAction({
      requestId: n.id,
      action: n.action,
      options: {
        group: n.group,
        force: n.force ?? !1,
        clean: n.clean ?? !1,
        files: n.file ?? !1,
        clientId: n.clientId,
        set: n.set ?? "Default"
      },
      stepNumber: n.step
    });
  }
  /**
   * Retreives the current uSync settings
   * @returns the current uSync settings
   */
  async getSettings() {
    return await h(this, Z).getSettings();
  }
  async getAddons() {
    return await h(this, Z).getAddons();
  }
  /**
   * Get the handler settings based on the set.
   * @param setName name of the handler set in the configuration
   * @returns the settings for the named handler set.
   */
  async getHandlerSettings(n) {
    return await h(this, Z).getHandlerSettings(n);
  }
  /**
   * Checks to see if there are legacy datatypes on disk.
   * @returns results of a check for legacy files
   */
  async checkLegacy() {
    return await h(this, ie).checkLegacy();
  }
  /**
   * sets a .ignore folder in the legacy folder so we don't detect it next time.
   * @returns true if the legacy folder is ignored.
   */
  async ignoreLegacy() {
    return await h(this, ie).ignoreLegacy();
  }
  /**
   * copies the legacy folder to the new v14 folder.
   * @returns true if the legacy folder is copied to the new folder.
   */
  async copyLegacy() {
    return await h(this, ie).copyLegacy();
  }
  async downloadFile(n) {
    return (await h(this, F).downloadFile(n)).data;
  }
  async processUpload(n) {
    return (await h(this, F).processUpload(n)).data;
  }
  async getSets() {
    return await h(this, Z).getSets();
  }
  async importSingle(n) {
    return await h(this, F).importSingle(n);
  }
}
F = new WeakMap(), Z = new WeakMap(), ie = new WeakMap();
var V;
class al {
  constructor(e) {
    m(this, V);
    v(this, V, e);
  }
  async getActionsBySet(e) {
    return await L(
      h(this, V),
      Fe.getActionsBySet({
        query: { setName: e }
      })
    );
  }
  async performAction(e) {
    return await L(
      h(this, V),
      Fe.performAction({
        body: e
      })
    );
  }
  async downloadFile(e) {
    return await L(
      h(this, V),
      Fe.download({
        query: {
          requestId: e
        }
      })
    );
  }
  async processUpload(e) {
    return await L(
      h(this, V),
      Fe.processUpload({
        query: {
          tempKey: e
        }
      })
    );
  }
  async importSingle(e) {
    return await L(
      h(this, V),
      Fe.importSingle({
        body: e
      })
    );
  }
}
V = new WeakMap();
var re;
class cl {
  constructor(e) {
    m(this, re);
    v(this, re, e);
  }
  async checkLegacy() {
    return await L(h(this, re), Xt.checkLegacy());
  }
  async ignoreLegacy() {
    return await L(h(this, re), Xt.ignoreLegacy());
  }
  async copyLegacy() {
    return await L(h(this, re), Xt.copyLegacy());
  }
}
re = new WeakMap();
var Q;
class ll {
  constructor(e) {
    m(this, Q);
    v(this, Q, e);
  }
  async getSettings() {
    return await L(h(this, Q), yt.getSettings());
  }
  async getHandlerSettings(e) {
    return await L(
      h(this, Q),
      yt.getHandlerSetSettings({ query: { id: e } })
    );
  }
  async getAddons() {
    return await L(h(this, Q), yt.getAddOns());
  }
  async getSets() {
    return await L(h(this, Q), yt.getSets());
  }
}
Q = new WeakMap();
const Ka = {
  name: "uSync",
  path: "usync",
  icon: "icon-infinity",
  menuName: "Syncronisation",
  menuAlias: "usync.menu",
  version: "16.0.0",
  conditions: {
    legacy: "usync.legacy.condition"
  },
  workspace: {
    alias: "usync.workspace",
    rootElement: "usync-root",
    elementName: "usync-workspace-root",
    contextAlias: "usync.workspace.context",
    defaultView: {
      alias: "usync.workspace.default"
    },
    settingView: {
      alias: "usync.workspace.settings"
    },
    addOnView: {
      alias: "usync.workspace.addons"
    },
    legacyView: {
      alais: "usync.workspace.legacy"
    }
  }
}, hl = Ka;
class ul extends vs {
  constructor(e, n) {
    super(e, n), this.config = n.config, this.consumeContext(ms, (s) => {
      s && s.checkLegacy().then((o) => {
        this.permitted = (o == null ? void 0 : o.hasLegacy) ?? !1;
      });
    });
  }
}
const dn = "usync.section";
var Ie, Pe, ht, pn;
class Ga extends vs {
  constructor(n, s) {
    super(n, s);
    m(this, ht);
    m(this, Ie);
    m(this, Pe);
    new Ko(
      this,
      Ss,
      "section",
      () => !0,
      async (o) => {
        v(this, Pe, o.map((i) => i.alias)), this.permitted = mt(this, ht, pn).call(this);
      },
      "uSyncAllSectionsManifestFilter"
    ), this.consumeContext(ws, (o) => {
      o && this.observe(o.alias, (i) => {
        v(this, Ie, i), this.permitted = mt(this, ht, pn).call(this);
      });
    });
  }
}
Ie = new WeakMap(), Pe = new WeakMap(), ht = new WeakSet(), pn = function() {
  return !h(this, Ie) || !h(this, Pe) ? !1 : !h(this, Pe).includes(dn) || h(this, Ie) === dn;
};
var Xa = Object.defineProperty, Ja = Object.getOwnPropertyDescriptor, $o = (t) => {
  throw TypeError(t);
}, Yt = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? Ja(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && Xa(e, n, o), o;
}, Pn = (t, e, n) => e.has(t) || $o("Cannot " + n), ls = (t, e, n) => (Pn(t, e, "read from private field"), e.get(t)), hs = (t, e, n) => e.has(t) ? $o("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Za = (t, e, n, s) => (Pn(t, e, "write to private field"), e.set(t, n), n), Qa = (t, e, n) => (Pn(t, e, "access private method"), n), ct, _n, Co;
let lt = class extends ut(ze) {
  constructor() {
    super(), hs(this, _n), hs(this, ct), this.hasChildren = !1, Ss.byType("usync-menuItem").subscribe((t) => {
      this.hasChildren = t.length > 0;
    }), this.consumeContext(ws, (t) => {
      this.observe(
        t == null ? void 0 : t.pathname,
        (e) => {
          Za(this, ct, e), Qa(this, _n, Co).call(this);
        },
        "observePathname"
      );
    });
  }
  render() {
    return p`<umb-menu-item-layout
			label=${this.manifest.meta.label ?? this.manifest.name}
			icon-name=${this.manifest.meta.icon ?? "icon-bug"}
			.href=${this.itemPath}
			?has-Children=${this.hasChildren}
			>${this.renderChildren()}
		</umb-menu-item-layout>`;
  }
  renderChildren() {
    return p`<umb-extension-slot
			type="usync-menuItem"
			default-element="umb-menu-item-default"></umb-extension-slot>`;
  }
};
ct = /* @__PURE__ */ new WeakMap();
_n = /* @__PURE__ */ new WeakSet();
Co = function() {
  ls(this, ct) && (this.itemPath = `section/${ls(this, ct)}/workspace/${this.manifest.meta.entityType}`);
};
Yt([
  A({ type: Object, attribute: !1 })
], lt.prototype, "manifest", 2);
Yt([
  f()
], lt.prototype, "hasChildren", 2);
Yt([
  f()
], lt.prototype, "itemPath", 2);
lt = Yt([
  x("usync-menu")
], lt);
const Ao = "usync.condition.new-section", ec = "Umb.Section.Settings", me = {
  alias: "usync.menu",
  name: "uSync",
  icon: "icon-infinity",
  rootElement: T.workspace.rootElement
}, ko = {
  type: "menu",
  alias: me.alias,
  name: me.name,
  meta: {
    label: me.name,
    icon: me.icon,
    entityType: me.rootElement
  }
}, tc = {
  type: "menuItem",
  alias: "usync.menu.item",
  name: "uSync menu item",
  element: jo,
  meta: {
    label: "uSync",
    icon: "usync-logo",
    entityType: T.workspace.rootElement,
    menus: [me.alias]
  }
}, nc = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "usync.sidebarapp",
  name: "uSync section sidebar menu",
  weight: 150,
  meta: {
    label: "Synchronisation",
    menu: ko.alias
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      oneOf: [ec, dn]
    },
    {
      alias: Ao
    }
  ]
}, sc = [
  // uSyncSection,
  ko,
  nc,
  tc
  // subMenuItem
], oc = {
  type: "modal",
  alias: "usync.import.modal",
  name: "uSync import modal",
  js: () => Promise.resolve().then(() => Vr)
}, ic = [oc];
var rc = Object.defineProperty, ac = Object.getOwnPropertyDescriptor, Io = (t) => {
  throw TypeError(t);
}, _t = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? ac(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && rc(e, n, o), o;
}, cc = (t, e, n) => e.has(t) || Io("Cannot " + n), lc = (t, e, n) => e.has(t) ? Io("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), on = (t, e, n) => (cc(t, e, "access private method"), n), Ge, gn, Po;
let pe = class extends We {
  constructor() {
    super(...arguments), lc(this, Ge), this.disabled = !1, this._popoverOpen = !1;
  }
  render() {
    var t, e, n;
    return p`
			<uui-button-group>
				<uui-button
					class="action-button"
					.disabled=${this.disabled}
					label=${this.localize.term(`uSync_${(t = this.button) == null ? void 0 : t.label}`)}
					color=${(e = this.button) == null ? void 0 : e.color}
					look=${(n = this.button) == null ? void 0 : n.look}
					state=${_s(this.state)}
					@click=${() => on(this, Ge, gn).call(this, this.button)}></uui-button>

				${this.renderDropdown(this.button)}
			</uui-button-group>
		`;
  }
  renderDropdown(t) {
    var s, o;
    if (!((s = this.button) != null && s.children)) return R;
    const e = (o = this.button) == null ? void 0 : o.children.map((i) => p` <uui-menu-item
				.disabled=${this.disabled}
				.label=${this.localize.term(`uSync_${i.label}`)}
				@click-label=${() => on(this, Ge, gn).call(this, i)}></uui-menu-item>`);
    if (e.length == 0) return R;
    const n = `popover_${t == null ? void 0 : t.key}`;
    return p`
			<uui-button
				.disabled=${this.disabled}
				popovertarget=${n}
				.label=${this.button.label}
				color=${t == null ? void 0 : t.color}
				look=${t == null ? void 0 : t.look}
				compact>
				<uui-symbol-expand
					class="expand-symbol"
					.open=${this._popoverOpen}></uui-symbol-expand>
			</uui-button>

			<uui-popover-container
				id=${n}
				margin="6"
				placement="bottom-end"
				@toggle=${on(this, Ge, Po)}>
				<umb-popover-layout>
					<uui-scroll-container> ${e} </uui-scroll-container>
				</umb-popover-layout>
			</uui-popover-container>
		`;
  }
};
Ge = /* @__PURE__ */ new WeakSet();
gn = function(t) {
  t && this.dispatchEvent(new ni(t));
};
Po = function(t) {
  this._popoverOpen = t.newState === "open";
};
pe.styles = O`
		.action-button {
			min-width: 110px;
		}

		.expand-symbol {
			transform: rotate(90deg);
		}

		.expand-symbol[open] {
			transform: rotate(180deg);
		}
	`;
_t([
  A({ type: Object })
], pe.prototype, "button", 2);
_t([
  A({ type: String })
], pe.prototype, "state", 2);
_t([
  A({ type: Boolean })
], pe.prototype, "disabled", 2);
_t([
  f()
], pe.prototype, "_popoverOpen", 2);
pe = _t([
  x("usync-action-button")
], pe);
var hc = Object.defineProperty, uc = Object.getOwnPropertyDescriptor, gt = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? uc(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && hc(e, n, o), o;
};
let _e = class extends We {
  constructor() {
    super(...arguments), this.label = "Upload", this.accept = "";
  }
  async _getFile(t) {
    return await new Promise((e, n) => {
      t.file(e, n);
    });
  }
  async _onFilePickerChange() {
    const e = (this._input.files ? Array.from(this._input.files) : [])[0], s = e instanceof File ? e : await this._getFile(e);
    this._file = s, this._dispachChangeEvent();
  }
  async _removeFile() {
    this._file = void 0, this._input.value = "", this._dispachChangeEvent();
  }
  _onUpload() {
    this._input.click();
  }
  _dispachChangeEvent() {
    this.dispatchEvent(new Qo(this._file));
  }
  render() {
    return p`<input
				@click=${(t) => t.stopPropagation()}
				type="file"
				id="file"
				this.accept=${this.accept}
				@change=${this._onFilePickerChange} />
			${this._renderFile()} ${this._renderButton()}`;
  }
  _renderFile() {
    return this._file ? p` <div class="file">
			<div>${this._file.name}</div>
			<uui-button
				@click="${() => this._removeFile()}"
				compact
				color="danger"
				label="Remove">
				<umb-icon name="icon-trash"></umb-icon>
			</uui-button>
		</div>` : R;
  }
  _renderButton() {
    return this._file ? R : p` <uui-button
					id="add-button"
					look="placeholder"
					label=${this.label}
					@click="${this._onUpload}"></uui-button>`;
  }
};
_e.styles = [
  O`
			.file {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			#file {
				display: none;
			}

			#add-button {
				width: 100%;
			}
		`
];
gt([
  A({ type: String })
], _e.prototype, "label", 2);
gt([
  A({ type: String })
], _e.prototype, "accept", 2);
gt([
  Mo("#file")
], _e.prototype, "_input", 2);
gt([
  f()
], _e.prototype, "_file", 2);
_e = gt([
  x("usync-upload-file-picker")
], _e);
var dc = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, To = (t) => {
  throw TypeError(t);
}, Kt = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? pc(e, n) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (o = (s ? r(e, n, o) : r(o)) || o);
  return s && o && dc(e, n, o), o;
}, Tn = (t, e, n) => e.has(t) || To("Cannot " + n), Rn = (t, e, n) => (Tn(t, e, "read from private field"), n ? n.call(t) : e.get(t)), rn = (t, e, n) => e.has(t) ? To("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), us = (t, e, n, s) => (Tn(t, e, "write to private field"), e.set(t, n), n), an = (t, e, n) => (Tn(t, e, "access private method"), n), tt, Lt, Xe, Ro, Oo, xo;
let He = class extends We {
  constructor() {
    super(), rn(this, Xe), rn(this, tt), rn(this, Lt), us(this, tt, new Xo(this)), us(this, Lt, new fs(this)), this.observe(Rn(this, tt).queue, (t) => {
      t.forEach((e) => {
        e.status === bs.SUCCESS && (an(this, Xe, Oo).call(this, e.temporaryUnique), this.buttonState = "success");
      });
    });
  }
  render() {
    return p`${this.renderUploadForm()}`;
  }
  renderUploadForm() {
    return p` ${this.renderFile()} ${this.renderUploadButton()} `;
  }
  renderFile() {
    return p`
			<div class="upload-box">
				<usync-upload-file-picker
					label="Select uSync Zip file"
					@change=${an(this, Xe, xo)}></usync-upload-file-picker>
			</div>
		`;
  }
  renderUploadButton() {
    return this.selected ? p`<uui-button
			type="button"
			look="primary"
			@click="${an(this, Xe, Ro)}"
			label="Upload"
			.state=${this.buttonState}></uui-button>` : R;
  }
};
tt = /* @__PURE__ */ new WeakMap();
Lt = /* @__PURE__ */ new WeakMap();
Xe = /* @__PURE__ */ new WeakSet();
Ro = function() {
  if (!this.selected) return;
  this.buttonState = "waiting";
  const t = {
    temporaryUnique: Go.new(),
    file: this.selected,
    status: bs.WAITING
  };
  Rn(this, tt).upload([t]);
};
Oo = async function(t) {
  const e = await Rn(this, Lt).processUpload(t);
  if (!(e != null && e.success)) {
    console.log("upload error", e);
    return;
  }
  this.dispatchEvent(new ei(e));
};
xo = function(t) {
  this.selected = t.file;
};
He.styles = O`
		:host {
			display: flex;
			justify-content: space-between;
		}

		.upload-box {
			flex-grow: 2;
		}

		usync-upload-file-picker {
			width: 100%;
			flex-grow: 2;
		}
	`;
Kt([
  f()
], He.prototype, "buttonState", 2);
Kt([
  f()
], He.prototype, "selected", 2);
Kt([
  f()
], He.prototype, "result", 2);
He = Kt([
  x("usync-file-upload")
], He);
const ye = T.workspace.alias, _c = {
  type: "workspace",
  alias: ye,
  name: "uSync core workspace",
  js: () => Promise.resolve().then(() => sa),
  meta: {
    entityType: T.workspace.rootElement
  }
}, gc = {
  type: "workspaceContext",
  alias: T.workspace.contextAlias,
  name: "uSync workspace context",
  js: () => Promise.resolve().then(() => qr),
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: ye
    }
  ]
}, fc = [
  {
    type: "workspaceView",
    alias: T.workspace.defaultView.alias,
    name: "uSync workspace default view",
    js: () => Promise.resolve().then(() => Jr),
    weight: 300,
    meta: {
      label: "Default",
      pathname: "default",
      icon: "usync-logo"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ye
      }
    ]
  },
  {
    type: "workspaceView",
    alias: T.workspace.settingView.alias,
    name: "uSync workspace settings view",
    js: () => import("./settings.element-BlTkOcq7.js"),
    weight: 200,
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ye
      }
    ]
  },
  {
    type: "workspaceView",
    alias: T.workspace.addOnView.alias,
    name: "uSync addons",
    js: () => import("./addons.element-C_4i0uPA.js"),
    weight: 100,
    meta: {
      label: "AddOns",
      pathname: "addons",
      icon: "icon-box"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ye
      }
    ]
  },
  {
    type: "workspaceView",
    alias: T.workspace.legacyView.alais,
    name: "uSync legacy",
    js: () => import("./legacy.element-CRPIczmh.js"),
    weight: 150,
    meta: {
      label: "Legacy",
      pathname: "legacy",
      icon: "icon-dock-connector color-red"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ye
      },
      {
        alias: T.conditions.legacy,
        hasLegacyFiles: !0
      }
    ]
  }
], mc = [], yc = [
  gc,
  _c,
  ...fc,
  ...mc,
  ...ic
], vc = [
  {
    type: "localization",
    alias: "usync.lang.enus",
    name: "English",
    weight: 0,
    meta: {
      culture: "en"
    },
    js: () => import("./en-us-DumZQfLC.js")
  }
], Sc = [...vc], wc = {
  type: "modal",
  alias: "usync.details.modal",
  name: "usync details modal",
  js: () => Promise.resolve().then(() => vr)
}, bc = {
  type: "modal",
  alias: "usync.legacy.modal",
  name: "uSync legacy modal",
  js: () => import("./legacy-modal-element-CKIH2-p4.js")
}, Ec = {
  type: "modal",
  alias: "usync.error.modal",
  name: "uSync error modal",
  js: () => Promise.resolve().then(() => Ar)
}, $c = {
  type: "modal",
  alias: "usync.import.single.modal",
  name: "uSync single import modal",
  js: () => Promise.resolve().then(() => ca)
}, Cc = [wc, bc, Ec, $c], Ac = [
  {
    type: "condition",
    alias: T.conditions.legacy,
    name: "uSync Legacy Files Condition",
    api: Fo
  },
  {
    type: "condition",
    alias: Ao,
    name: "uSync New Section Condition",
    api: Ga
  }
], kc = {
  type: "icons",
  alias: "usync.icons",
  name: "uSync Icons",
  js: () => import("./icons-DpRH-q6X.js")
}, Ic = [kc], Pc = [
  ...Sc,
  ...sc,
  ...yc,
  ...Cc,
  ...Ac,
  ...Ic
], dl = (t, e) => {
  e.registerMany(Pc), t.consumeContext(ps, (n) => {
    if (n) {
      var s = n.getOpenApiConfiguration();
      k.setConfig({
        auth: s.token,
        baseUrl: s.base,
        credentials: s.credentials
      }), k.interceptors.request.use(async (o, i) => {
        const r = await n.getLatestToken();
        return o.headers.set("Authorization", `Bearer ${r}`), o;
      });
    }
  });
};
export {
  U as AbortError,
  Xc as ActionsService,
  Ei as CallingConventions,
  $i as ChangeDetailType,
  H as ChangeType,
  Ia as DefaultHttpClient,
  Ci as EventAttributes,
  Ai as EventMessageTypeModel,
  ki as FieldAttributes,
  Ii as GenericParameterAttributes,
  Pi as HandlerStatus,
  qt as HttpClient,
  ce as HttpError,
  bo as HttpResponse,
  E as HttpTransportType,
  kn as HubConnection,
  il as HubConnectionBuilder,
  S as HubConnectionState,
  Fa as JsonHubProtocol,
  Ti as LayoutKind,
  l as LogLevel,
  Ri as MemberTypes,
  g as MessageType,
  Oi as MethodAttributes,
  xi as MethodImplAttributes,
  Jc as MigrationsService,
  rt as NullLogger,
  Ni as ParameterAttributes,
  Di as PropertyAttributes,
  Mi as SecurityRuleSet,
  Zc as SettingsService,
  Ta as Subject,
  ul as SyncLegacyFilesCondition,
  Ga as SyncNewSectionCondition,
  An as TimeoutError,
  I as TransferFormat,
  Li as TypeAttributes,
  bn as USYNC_CORE_CONTEXT_TOKEN,
  tl as USYNC_DETAILS_MODAL,
  kr as USYNC_ERROR_MODAL,
  nl as USYNC_IMPORT_SINGLE_MODAL,
  sl as USYNC_SIGNALR_CONTEXT_TOKEN,
  ll as USyncSettingsDataSource,
  ma as VERSION,
  k as client,
  dl as onInit,
  Te as uSyncActionBox,
  al as uSyncActionDataSource,
  rl as uSyncActionRepository,
  Tt as uSyncChangeView,
  hl as uSyncConstants,
  Oe as uSyncDetailsModalElement,
  lt as uSyncMenuElement,
  cl as uSyncMigrationDataSource,
  q as uSyncProcessBox,
  he as uSyncResultGroupView,
  Dt as uSyncResultRow,
  Re as uSyncResultsView,
  Ur as uSyncSignalRContext,
  Zn as uSyncWorkspaceContext,
  Me as uSyncWorkspaceRootElement
};
//# sourceMappingURL=uSync.js.map
