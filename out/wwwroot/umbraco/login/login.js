import { property as l, customElement as w, ifDefined as fe, html as u, css as k, when as ue, nothing as S, query as He, state as c, queryAssignedElements as St, unsafeHTML as Ot, until as Ut } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as v } from "@umbraco-cms/backoffice/lit-element";
import { umbExtensionsRegistry as ae, UmbAppEntryPointExtensionInitializer as Dt } from "@umbraco-cms/backoffice/extension-registry";
import { UmbRepositoryBase as Tt } from "@umbraco-cms/backoffice/repository";
import { UmbLocalizationController as qt } from "@umbraco-cms/backoffice/localization-api";
import { UmbContextBase as Mt, UmbControllerBase as At } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as Rt } from "@umbraco-cms/backoffice/context-api";
import { UmbBundleExtensionInitializer as Ft, UmbServerExtensionRegistrator as Wt } from "@umbraco-cms/backoffice/extension-api";
import { UUIIconRegistryEssential as Vt } from "@umbraco-cms/backoffice/external/uui";
import { UmbServerConnection as Bt, UmbServerContext as Nt } from "@umbraco-cms/backoffice/server";
import { firstValueFrom as jt } from "@umbraco-cms/backoffice/external/rxjs";
import "@umbraco-cms/backoffice/localization";
var Ht = async (t, e) => {
  let r = typeof e == "function" ? await e(t) : e;
  if (r) return t.scheme === "bearer" ? `Bearer ${r}` : t.scheme === "basic" ? `Basic ${btoa(r)}` : r;
}, Gt = { bodySerializer: (t) => JSON.stringify(t, (e, r) => typeof r == "bigint" ? r.toString() : r) }, Jt = (t) => {
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
}, Zt = (t) => {
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
}, Yt = (t) => {
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
}, Ge = ({ allowReserved: t, explode: e, name: r, style: o, value: a }) => {
  if (!e) {
    let n = (t ? a : a.map((d) => encodeURIComponent(d))).join(Zt(o));
    switch (o) {
      case "label":
        return `.${n}`;
      case "matrix":
        return `;${r}=${n}`;
      case "simple":
        return n;
      default:
        return `${r}=${n}`;
    }
  }
  let s = Jt(o), i = a.map((n) => o === "label" || o === "simple" ? t ? n : encodeURIComponent(n) : de({ allowReserved: t, name: r, value: n })).join(s);
  return o === "label" || o === "matrix" ? s + i : i;
}, de = ({ allowReserved: t, name: e, value: r }) => {
  if (r == null) return "";
  if (typeof r == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${t ? r : encodeURIComponent(r)}`;
}, Je = ({ allowReserved: t, explode: e, name: r, style: o, value: a }) => {
  if (a instanceof Date) return `${r}=${a.toISOString()}`;
  if (o !== "deepObject" && !e) {
    let n = [];
    Object.entries(a).forEach(([W, _]) => {
      n = [...n, W, t ? _ : encodeURIComponent(_)];
    });
    let d = n.join(",");
    switch (o) {
      case "form":
        return `${r}=${d}`;
      case "label":
        return `.${d}`;
      case "matrix":
        return `;${r}=${d}`;
      default:
        return d;
    }
  }
  let s = Yt(o), i = Object.entries(a).map(([n, d]) => de({ allowReserved: t, name: o === "deepObject" ? `${r}[${n}]` : n, value: d })).join(s);
  return o === "label" || o === "matrix" ? s + i : i;
}, Kt = /\{[^{}]+\}/g, Qt = ({ path: t, url: e }) => {
  let r = e, o = e.match(Kt);
  if (o) for (let a of o) {
    let s = !1, i = a.substring(1, a.length - 1), n = "simple";
    i.endsWith("*") && (s = !0, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (i = i.substring(1), n = "label") : i.startsWith(";") && (i = i.substring(1), n = "matrix");
    let d = t[i];
    if (d == null) continue;
    if (Array.isArray(d)) {
      r = r.replace(a, Ge({ explode: s, name: i, style: n, value: d }));
      continue;
    }
    if (typeof d == "object") {
      r = r.replace(a, Je({ explode: s, name: i, style: n, value: d }));
      continue;
    }
    if (n === "matrix") {
      r = r.replace(a, `;${de({ name: i, value: d })}`);
      continue;
    }
    let W = encodeURIComponent(n === "label" ? `.${d}` : d);
    r = r.replace(a, W);
  }
  return r;
}, Ze = ({ allowReserved: t, array: e, object: r } = {}) => (o) => {
  let a = [];
  if (o && typeof o == "object") for (let s in o) {
    let i = o[s];
    if (i != null) if (Array.isArray(i)) {
      let n = Ge({ allowReserved: t, explode: !0, name: s, style: "form", value: i, ...e });
      n && a.push(n);
    } else if (typeof i == "object") {
      let n = Je({ allowReserved: t, explode: !0, name: s, style: "deepObject", value: i, ...r });
      n && a.push(n);
    } else {
      let n = de({ allowReserved: t, name: s, value: i });
      n && a.push(n);
    }
  }
  return a.join("&");
}, Xt = (t) => {
  if (!t) return "stream";
  let e = t.split(";")[0]?.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((r) => e.startsWith(r))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, er = async ({ security: t, ...e }) => {
  for (let r of t) {
    let o = await Ht(r, e.auth);
    if (!o) continue;
    let a = r.name ?? "Authorization";
    switch (r.in) {
      case "query":
        e.query || (e.query = {}), e.query[a] = o;
        break;
      case "cookie":
        e.headers.append("Cookie", `${a}=${o}`);
        break;
      case "header":
      default:
        e.headers.set(a, o);
        break;
    }
    return;
  }
}, Ue = (t) => tr({ baseUrl: t.baseUrl, path: t.path, query: t.query, querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : Ze(t.querySerializer), url: t.url }), tr = ({ baseUrl: t, path: e, query: r, querySerializer: o, url: a }) => {
  let s = a.startsWith("/") ? a : `/${a}`, i = (t ?? "") + s;
  e && (i = Qt({ path: e, url: i }));
  let n = r ? o(r) : "";
  return n.startsWith("?") && (n = n.substring(1)), n && (i += `?${n}`), i;
}, De = (t, e) => {
  let r = { ...t, ...e };
  return r.baseUrl?.endsWith("/") && (r.baseUrl = r.baseUrl.substring(0, r.baseUrl.length - 1)), r.headers = Ye(t.headers, e.headers), r;
}, Ye = (...t) => {
  let e = new Headers();
  for (let r of t) {
    if (!r || typeof r != "object") continue;
    let o = r instanceof Headers ? r.entries() : Object.entries(r);
    for (let [a, s] of o) if (s === null) e.delete(a);
    else if (Array.isArray(s)) for (let i of s) e.append(a, i);
    else s !== void 0 && e.set(a, typeof s == "object" ? JSON.stringify(s) : s);
  }
  return e;
}, ge = class {
  _fns;
  constructor() {
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  getInterceptorIndex(t) {
    return typeof t == "number" ? this._fns[t] ? t : -1 : this._fns.indexOf(t);
  }
  exists(t) {
    let e = this.getInterceptorIndex(t);
    return !!this._fns[e];
  }
  eject(t) {
    let e = this.getInterceptorIndex(t);
    this._fns[e] && (this._fns[e] = null);
  }
  update(t, e) {
    let r = this.getInterceptorIndex(t);
    return this._fns[r] ? (this._fns[r] = e, t) : !1;
  }
  use(t) {
    return this._fns = [...this._fns, t], this._fns.length - 1;
  }
}, rr = () => ({ error: new ge(), request: new ge(), response: new ge() }), ar = Ze({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), or = { "Content-Type": "application/json" }, Ke = (t = {}) => ({ ...Gt, headers: or, parseAs: "auto", querySerializer: ar, ...t }), ir = (t = {}) => {
  let e = De(Ke(), t), r = () => ({ ...e }), o = (i) => (e = De(e, i), r()), a = rr(), s = async (i) => {
    let n = { ...e, ...i, fetch: i.fetch ?? e.fetch ?? globalThis.fetch, headers: Ye(e.headers, i.headers) };
    n.security && await er({ ...n, security: n.security }), n.body && n.bodySerializer && (n.body = n.bodySerializer(n.body)), (n.body === void 0 || n.body === "") && n.headers.delete("Content-Type");
    let d = Ue(n), W = { redirect: "follow", ...n }, _ = new Request(d, W);
    for (let p of a.request._fns) p && (_ = await p(_, n));
    let Lt = n.fetch, m = await Lt(_);
    for (let p of a.response._fns) p && (m = await p(m, _, n));
    let X = { request: _, response: m };
    if (m.ok) {
      if (m.status === 204 || m.headers.get("Content-Length") === "0") return { data: {}, ...X };
      let p = (n.parseAs === "auto" ? Xt(m.headers.get("Content-Type")) : n.parseAs) ?? "json";
      if (p === "stream") return { data: m.body, ...X };
      let te = await m[p]();
      return p === "json" && (n.responseValidator && await n.responseValidator(te), n.responseTransformer && (te = await n.responseTransformer(te))), { data: te, ...X };
    }
    let ee = await m.text();
    try {
      ee = JSON.parse(ee);
    } catch {
    }
    let V = ee;
    for (let p of a.error._fns) p && (V = await p(ee, m, _, n));
    if (V = V || {}, n.throwOnError) throw V;
    return { error: V, ...X };
  };
  return { buildUrl: Ue, connect: (i) => s({ ...i, method: "CONNECT" }), delete: (i) => s({ ...i, method: "DELETE" }), get: (i) => s({ ...i, method: "GET" }), getConfig: r, head: (i) => s({ ...i, method: "HEAD" }), interceptors: a, options: (i) => s({ ...i, method: "OPTIONS" }), patch: (i) => s({ ...i, method: "PATCH" }), post: (i) => s({ ...i, method: "POST" }), put: (i) => s({ ...i, method: "PUT" }), request: s, setConfig: o, trace: (i) => s({ ...i, method: "TRACE" }) };
};
const Q = ir(Ke()), sr = (t) => (t?.client ?? Q).post({
  security: [
    {
      scheme: "bearer",
      type: "http"
    }
  ],
  url: "/umbraco/management/api/v1/security/forgot-password",
  ...t,
  headers: {
    "Content-Type": "application/json",
    ...t?.headers
  }
}), nr = (t) => (t?.client ?? Q).post({
  security: [
    {
      scheme: "bearer",
      type: "http"
    }
  ],
  url: "/umbraco/management/api/v1/security/forgot-password/reset",
  ...t,
  headers: {
    "Content-Type": "application/json",
    ...t?.headers
  }
}), ur = (t) => (t?.client ?? Q).post({
  url: "/umbraco/management/api/v1/security/forgot-password/verify",
  ...t,
  headers: {
    "Content-Type": "application/json",
    ...t?.headers
  }
}), lr = (t) => (t?.client ?? Q).post({
  url: "/umbraco/management/api/v1/user/invite/create-password",
  ...t,
  headers: {
    "Content-Type": "application/json",
    ...t?.headers
  }
}), dr = (t) => (t?.client ?? Q).post({
  url: "/umbraco/management/api/v1/user/invite/verify",
  ...t,
  headers: {
    "Content-Type": "application/json",
    ...t?.headers
  }
});
function cr(t) {
  return typeof t == "object" && t !== null && "type" in t && "title" in t && "status" in t && "detail" in t;
}
class hr extends Tt {
  #e = new qt(this);
  async login(e) {
    try {
      const r = new Request("/umbraco/management/api/v1/security/back-office/login", {
        method: "POST",
        body: JSON.stringify({
          username: e.username,
          password: e.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }), o = await fetch(r);
      if (!o.ok) {
        if (o.status === 402) {
          const a = await o.json();
          return {
            status: o.status,
            twoFactorView: a.twoFactorLoginView ?? "",
            twoFactorProviders: a.enabledTwoFactorProviderNames ?? []
          };
        }
        return {
          status: o.status,
          error: await this.#r(o)
        };
      }
      return {
        status: o.status,
        data: {
          username: e.username
        }
      };
    } catch (r) {
      return {
        status: 500,
        error: r instanceof Error ? r.message : this.#e.term("auth_receivedErrorFromServer")
      };
    }
  }
  async validateMfaCode(e, r) {
    try {
      const o = new Request("/umbraco/management/api/v1/security/back-office/verify-2fa", {
        method: "POST",
        body: JSON.stringify({
          code: e,
          provider: r
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }), a = await fetch(o);
      return a.ok ? {} : {
        error: a.status === 400 ? this.#e.term("auth_mfaInvalidCode") : await this.#r(a)
      };
    } catch (o) {
      return {
        error: o instanceof Error ? o.message : this.#e.term("auth_receivedErrorFromServer")
      };
    }
  }
  async resetPassword(e) {
    const { error: r } = await sr({
      body: {
        email: e
      }
    });
    return r ? {
      error: this.#t(r, "Could not reset the password")
    } : {};
  }
  async validatePasswordResetCode(e, r) {
    const { data: o, error: a } = await ur({
      body: {
        user: {
          id: e
        },
        resetCode: r
      }
    });
    return a || !o ? {
      error: this.#t(a, "Could not validate the password reset code")
    } : o;
  }
  async newPassword(e, r, o) {
    const { error: a } = await nr({
      body: {
        password: e,
        resetCode: r,
        user: {
          id: o
        }
      }
    });
    return a ? {
      error: this.#t(a, "Could not reset the password")
    } : {};
  }
  async validateInviteCode(e, r) {
    const { data: o, error: a } = await dr({
      body: {
        token: e,
        user: {
          id: r
        }
      }
    });
    return a || !o ? {
      error: this.#t(a, "Could not validate the invite code")
    } : o;
  }
  async newInvitedUserPassword(e, r, o) {
    const { error: a } = await lr({
      body: {
        password: e,
        token: r,
        user: {
          id: o
        }
      }
    });
    return a ? {
      error: this.#t(a, "Could not create a password for the invited user")
    } : {};
  }
  #t(e, r) {
    if (cr(e))
      return e.detail ?? e.title ?? void 0;
    if (!(e instanceof Error))
      return r ?? "An unknown error occurred.";
    if (e.name !== "CancelError")
      return e.message;
  }
  async #r(e) {
    switch (e.status) {
      case 400:
      case 401:
        return this.#e.term("auth_userFailedLogin");
      case 402:
        return this.#e.term("auth_mfaText");
      case 403:
        return this.#e.term("auth_userLockedOut");
      default:
        return this.#e.term("auth_receivedErrorFromServer");
    }
  }
}
class pr extends Mt {
  constructor() {
    super(...arguments), this.supportsPersistLogin = !1, this.twoFactorView = "", this.isMfaEnabled = !1, this.mfaProviders = [], this.#e = new hr(this), this.#t = "";
  }
  #e;
  #t;
  set returnPath(e) {
    this.#t = e;
  }
  /**
   * Gets the return path from the query string.
   *
   * It will first look for a `ReturnUrl` parameter, then a `returnPath` parameter, and finally the `returnPath` property.
   *
   * @returns The return path from the query string.
   */
  get returnPath() {
    const e = new URLSearchParams(window.location.search);
    let r = e.get("ReturnUrl") ?? e.get("returnPath") ?? this.#t;
    if (!r)
      return "";
    const o = new URL(r, window.location.origin);
    return o.origin !== window.location.origin ? "" : o.toString();
  }
  login(e) {
    return this.#e.login(e);
  }
  resetPassword(e) {
    return this.#e.resetPassword(e);
  }
  validatePasswordResetCode(e, r) {
    return this.#e.validatePasswordResetCode(e, r);
  }
  newPassword(e, r, o) {
    return this.#e.newPassword(e, r, o);
  }
  newInvitedUserPassword(e, r, o) {
    return this.#e.newInvitedUserPassword(e, r, o);
  }
  validateInviteCode(e, r) {
    return this.#e.validateInviteCode(e, r);
  }
  validateMfaCode(e, r) {
    return this.#e.validateMfaCode(e, r);
  }
}
const U = new Rt("UmbAuthContext");
class mr extends At {
  constructor(e) {
    super(e), new Ft(e, ae), new Vt().attach(e), e.classList.add("uui-text"), e.classList.add("uui-font");
  }
  async register(e) {
    const r = window.location.origin, o = new Bt(e, r);
    new Nt(this, {
      backofficePath: "/umbraco",
      serverUrl: r,
      serverConnection: o
    }), await new Wt(this, ae).registerPublicExtensions().catch((s) => {
      console.error("Failed to register public extensions for the slim backoffice.", s);
    });
    const a = new Dt(e, ae);
    await jt(a.loaded);
  }
}
const fr = "#umb-login-form input{width:100%;height:var(--input-height);box-sizing:border-box;display:block;border:1px solid var(--uui-color-border);border-radius:var(--uui-border-radius);background-color:var(--uui-color-surface);padding:var(--uui-size-1, 3px) var(--uui-size-space-4, 9px)}#umb-login-form uui-form-layout-item{margin-top:var(--uui-size-space-4);margin-bottom:var(--uui-size-space-4)}#umb-login-form input:focus-within{border-color:var(--uui-input-border-color-focus, var(--uui-color-border-emphasis, #a1a1a1));outline:calc(2px * var(--uui-show-focus-outline, 1)) solid var(--uui-color-focus)}#umb-login-form input:hover:not(:focus-within){border-color:var(--uui-input-border-color-hover, var(--uui-color-border-standalone, #c2c2c2))}#umb-login-form input::-ms-reveal{display:none}#umb-login-form input span{position:absolute;right:1px;top:50%;transform:translateY(-50%);z-index:100}#umb-login-form input span svg{background-color:#fff;display:block;padding:.2em;width:1.3em;height:1.3em}", gr = [
  {
    name: "Auth Bundle",
    alias: "Umb.Auth.Bundle",
    type: "bundle",
    js: () => import("./manifests-CTnEFKn2.js")
  }
];
var wr = Object.defineProperty, vr = Object.getOwnPropertyDescriptor, Qe = (t) => {
  throw TypeError(t);
}, P = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? vr(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && wr(e, r, a), a;
}, Xe = (t, e, r) => e.has(t) || Qe("Cannot " + r), we = (t, e, r) => (Xe(t, e, "read from private field"), r ? r.call(t) : e.get(t)), Te = (t, e, r) => e.has(t) ? Qe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), br = (t, e, r) => (Xe(t, e, "access private method"), r), N, be, et;
const qe = (t) => {
  const e = document.createElement("input");
  return e.type = t.type, e.name = t.name, e.autocomplete = t.autocomplete, e.id = t.id, e.required = !0, e.inputMode = t.inputmode, e.ariaLabel = t.label, e.autofocus = t.autofocus || !1, e;
}, Me = (t) => {
  const e = document.createElement("label"), r = document.createElement("umb-localize");
  return r.key = t.localizeAlias, r.innerHTML = t.localizeFallback, e.htmlFor = t.forId, e.appendChild(r), e;
}, Ae = (t, e) => {
  const r = document.createElement("uui-form-layout-item");
  return r.appendChild(t), r.appendChild(e), r;
}, yr = (t) => {
  const e = document.createElement("style");
  e.innerHTML = fr;
  const r = document.createElement("form");
  return r.id = "umb-login-form", r.name = "login-form", r.spellcheck = !1, t.push(e), t.forEach((o) => r.appendChild(o)), r;
};
let y = class extends v {
  constructor() {
    super(), Te(this, be), this.disableLocalLogin = !1, this.usernameIsEmail = !1, this.allowPasswordReset = !1, this.allowUserInvite = !1, Te(this, N, new pr(this, U)), this.addEventListener("umb-login-flow", (t) => {
      t instanceof CustomEvent && (this.flow = t.detail.flow || void 0), this.requestUpdate();
    });
  }
  set returnPath(t) {
    we(this, N).returnPath = t;
  }
  get returnPath() {
    return we(this, N).returnPath;
  }
  async firstUpdated() {
    await new mr(this).register(this), ae.registerMany(gr), setTimeout(() => {
      requestAnimationFrame(() => {
        br(this, be, et).call(this);
      });
    }, 100);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._usernameLayoutItem?.remove(), this._passwordLayoutItem?.remove(), this._usernameLabel?.remove(), this._usernameInput?.remove(), this._passwordLabel?.remove(), this._passwordInput?.remove();
  }
  render() {
    return u`
			<umb-auth-layout
				background-image=${fe(this.backgroundImage)}
				logo-image=${fe(this.logoImage)}
				logo-image-alternative=${fe(this.logoImageAlternative)}>
				${this._renderFlowAndStatus()}
			</umb-auth-layout>
		`;
  }
  _renderFlowAndStatus() {
    if (this.disableLocalLogin)
      return u`
				<umb-error-layout no-back-link>
					<umb-localize key="auth_localLoginDisabled"
						>Unfortunately, it is not possible to log in directly. It has been disabled by a login
						provider.</umb-localize
					>
				</umb-error-layout>
			`;
    const t = new URLSearchParams(window.location.search);
    let e = this.flow || t.get("flow")?.toLowerCase();
    const r = t.get("status");
    if (r === "resetCodeExpired")
      return u` <umb-error-layout message=${this.localize.term("auth_resetCodeExpired")}> </umb-error-layout>`;
    if (e === "invite-user" && r === "false")
      return u` <umb-error-layout message=${this.localize.term("auth_userInviteExpiredMessage")}>
			</umb-error-layout>`;
    switch (e && e === "mfa" && !we(this, N).isMfaEnabled && (e = void 0), e) {
      case "mfa":
        return u` <umb-mfa-page></umb-mfa-page>`;
      case "reset":
        return u` <umb-reset-password-page></umb-reset-password-page>`;
      case "reset-password":
        return u` <umb-new-password-page></umb-new-password-page>`;
      case "invite-user":
        return u` <umb-invite-page></umb-invite-page>`;
      default:
        return u` <umb-login-page
					?allow-password-reset=${this.allowPasswordReset}
					?username-is-email=${this.usernameIsEmail}>
					<slot></slot>
					<slot name="subheadline" slot="subheadline"></slot>
				</umb-login-page>`;
    }
  }
};
N = /* @__PURE__ */ new WeakMap();
be = /* @__PURE__ */ new WeakSet();
et = function() {
  const t = this.usernameIsEmail ? this.localize.term("auth_email") : this.localize.term("auth_username"), e = this.localize.term("auth_password");
  this._usernameInput = qe({
    id: "username-input",
    type: "text",
    name: "username",
    autocomplete: "username",
    label: t,
    inputmode: this.usernameIsEmail ? "email" : "",
    autofocus: !0
  }), this._passwordInput = qe({
    id: "password-input",
    type: "password",
    name: "password",
    autocomplete: "current-password",
    label: e,
    inputmode: ""
  }), this._usernameLabel = Me({
    forId: "username-input",
    localizeAlias: this.usernameIsEmail ? "auth_email" : "auth_username",
    localizeFallback: this.usernameIsEmail ? "Email" : "Username"
  }), this._passwordLabel = Me({
    forId: "password-input",
    localizeAlias: "auth_password",
    localizeFallback: "Password"
  }), this._usernameLayoutItem = Ae(this._usernameLabel, this._usernameInput), this._passwordLayoutItem = Ae(this._passwordLabel, this._passwordInput), this._form = yr([this._usernameLayoutItem, this._passwordLayoutItem]), this.insertAdjacentElement("beforeend", this._form);
};
P([
  l({ type: Boolean, attribute: "disable-local-login" })
], y.prototype, "disableLocalLogin", 2);
P([
  l({ attribute: "background-image" })
], y.prototype, "backgroundImage", 2);
P([
  l({ attribute: "logo-image" })
], y.prototype, "logoImage", 2);
P([
  l({ attribute: "logo-image-alternative" })
], y.prototype, "logoImageAlternative", 2);
P([
  l({ type: Boolean, attribute: "username-is-email" })
], y.prototype, "usernameIsEmail", 2);
P([
  l({ type: Boolean, attribute: "allow-password-reset" })
], y.prototype, "allowPasswordReset", 2);
P([
  l({ type: Boolean, attribute: "allow-user-invite" })
], y.prototype, "allowUserInvite", 2);
P([
  l({ attribute: "return-url" })
], y.prototype, "returnPath", 1);
y = P([
  w("umb-auth")
], y);
var _r = Object.defineProperty, Cr = Object.getOwnPropertyDescriptor, tt = (t) => {
  throw TypeError(t);
}, ce = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Cr(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && _r(e, r, a), a;
}, xr = (t, e, r) => e.has(t) || tt("Cannot " + r), $r = (t, e, r) => e.has(t) ? tt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), Re = (t, e, r) => (xr(t, e, "access private method"), r), oe, rt, at;
let M = class extends v {
  constructor() {
    super(...arguments), $r(this, oe);
  }
  updated(t) {
    super.updated(t), t.has("backgroundImage") && (this.style.setProperty("--logo-alternative-display", this.backgroundImage ? "none" : "unset"), this.style.setProperty("--image", `url('${this.backgroundImage}') no-repeat center center/cover`));
  }
  render() {
    return u`
			<div id=${this.backgroundImage ? "main" : "main-no-image"}>
				${Re(this, oe, rt).call(this)} ${Re(this, oe, at).call(this)}
			</div>
			${ue(
      this.logoImageAlternative,
      (t) => u`<img id="logo-on-background" src=${t} alt="logo" aria-hidden="true" />`
    )}
		`;
  }
};
oe = /* @__PURE__ */ new WeakSet();
rt = function() {
  return this.backgroundImage ? u`
			<div id="image-container">
				<div id="image">
					<svg
						id="curve-top"
						width="1746"
						height="1374"
						viewBox="0 0 1746 1374"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M8 1C61.5 722.5 206.5 1366.5 1745.5 1366.5" stroke="currentColor" stroke-width="15" />
					</svg>
					<svg
						id="curve-bottom"
						width="1364"
						height="552"
						viewBox="0 0 1364 552"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M1 8C387 24 1109 11 1357 548" stroke="currentColor" stroke-width="15" />
					</svg>

					${ue(
    this.logoImage,
    (t) => u`<img id="logo-on-image" src=${t} alt="logo" aria-hidden="true" />`
  )}
				</div>
			</div>
		` : S;
};
at = function() {
  return u`
			<div id="content-container">
				<div id="content">
					<slot></slot>
				</div>
			</div>
		`;
};
M.styles = [
  k`
			:host {
				--uui-color-interactive: var(--umb-login-primary-color, #283a97);
				--uui-button-border-radius: var(--umb-login-button-border-radius, 45px);
				--uui-color-default: var(--uui-color-interactive);
				--uui-button-height: 42px;
				--uui-select-height: 38px;

				--input-height: 40px;
				--header-font-size: var(--umb-login-header-font-size, 3rem);
				--header-secondary-font-size: var(--umb-login-header-secondary-font-size, 2.4rem);
				--curves-color: var(--umb-login-curves-color, #f5c1bc);
				--curves-display: var(--umb-login-curves-display, inline);

				display: block;
				background: var(--umb-login-background, #f4f4f4);
				color: var(--umb-login-text-color, #000);
			}

			#main-no-image,
			#main {
				max-width: 1920px;
				display: flex;
				justify-content: center;
				height: 100vh;
				padding: 8px;
				box-sizing: border-box;
				margin: 0 auto;
			}

			#image-container {
				display: var(--umb-login-image-display, none);
				width: 100%;
			}

			#content-container {
				background: var(--umb-login-content-background, none);
				display: var(--umb-login-content-display, flex);
				width: var(--umb-login-content-width, 100%);
				height: var(--umb-login-content-height, 100%);
				box-sizing: border-box;
				overflow: auto;
				border-radius: var(--umb-login-content-border-radius, 0);
			}

			#content {
				max-width: 360px;
				margin: auto;
				width: 100%;
			}

			#image {
				background: var(--umb-login-image, var(--image));
				width: 100%;
				height: 100%;
				border-radius: var(--umb-login-image-border-radius, 38px);
				position: relative;
				overflow: hidden;
				color: var(--curves-color);
			}

			#image svg {
				position: absolute;
				width: 45%;
				height: fit-content;
				display: var(--curves-display);
			}

			#curve-top {
				top: -9%;
				right: -9%;
			}

			#curve-bottom {
				bottom: -0.5%;
				left: -0.1%;
			}

			#logo-on-image,
			#logo-on-background {
				position: absolute;
				display: var(--umb-logo-display, block);
				top: var(--umb-logo-top, 24px);
				left: var(--umb-logo-left, 24px);
				width: var(--umb-logo-width, auto);
				height: var(--umb-logo-height, 55px);
			}

			@media only screen and (min-width: 900px) {
				:host {
					--header-font-size: var(--umb-login-header-font-size-large, 4rem);
				}

				#main {
					padding: 32px;
					padding-right: 0;
					align-items: var(--umb-login-align-items, unset);
				}

				#image-container {
					display: var(--umb-login-image-display, block);
				}

				#content-container {
					display: var(--umb-login-content-display, flex);
					padding: 16px;
				}

				#logo-on-background {
					display: var(--logo-alternative-display);
				}
			}
		`
];
ce([
  l({ attribute: "background-image" })
], M.prototype, "backgroundImage", 2);
ce([
  l({ attribute: "logo-image" })
], M.prototype, "logoImage", 2);
ce([
  l({ attribute: "logo-image-alternative" })
], M.prototype, "logoImageAlternative", 2);
M = ce([
  w("umb-auth-layout")
], M);
var Pr = Object.defineProperty, zr = Object.getOwnPropertyDescriptor, Pe = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? zr(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && Pr(e, r, a), a;
};
let J = class extends v {
  constructor() {
    super(...arguments), this.header = "", this.message = "";
  }
  render() {
    return u`
      <header id="header">
        <h1>${this.header}</h1>
        <span>${this.message}</span>
      </header>

      <umb-back-to-login-button></umb-back-to-login-button>

      <slot></slot>
    `;
  }
};
J.styles = [
  k`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-layout-1);
      }

      #header {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-5);
      }

      #header span {
        color: var(--uui-color-text-alt); /* TODO Change to uui color when uui gets a muted text variable */
        font-size: 14px;
      }

      #header h1 {
        margin: 0;
        font-weight: 400;
        font-size: var(--header-secondary-font-size);
        color: var(--uui-color-interactive);
        line-height: 1.2;
      }

      uui-button {
        width: 100%;
        margin-top: var(--uui-size-space-5);
        --uui-button-padding-top-factor: 1.5;
        --uui-button-padding-bottom-factor: 1.5;
      }
    `
];
Pe([
  l({ type: String })
], J.prototype, "header", 2);
Pe([
  l({ type: String })
], J.prototype, "message", 2);
J = Pe([
  w("umb-confirmation-layout")
], J);
var Er = Object.defineProperty, Ir = Object.getOwnPropertyDescriptor, he = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Ir(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && Er(e, r, a), a;
};
let A = class extends v {
  constructor() {
    super(...arguments), this.header = "", this.message = "", this.noBackLink = !1;
  }
  render() {
    return u`
      <header id="header">
        <h1>${this.header?.length ? this.header : u`<umb-localize key="auth_friendlyGreeting">Hi there</umb-localize>`}</h1>
        <span>${this.message}</span>
      </header>
      <slot></slot>
      ${this.noBackLink ? "" : u`<umb-back-to-login-button></umb-back-to-login-button>`}
    `;
  }
};
A.styles = [
  k`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-layout-1);
      }

      #header {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-5);
      }

      #header span {
        color: var(--uui-color-text-alt); /* TODO Change to uui color when uui gets a muted text variable */
        font-size: 14px;
      }

      #header h1 {
        margin: 0;
        font-weight: 400;
        font-size: var(--header-secondary-font-size);
        color: var(--uui-color-interactive);
        line-height: 1.2;
      }

      ::slotted(uui-button) {
        width: 100%;
        margin-top: var(--uui-size-space-5);
        --uui-button-padding-top-factor: 1.5;
        --uui-button-padding-bottom-factor: 1.5;
      }
    `
];
he([
  l({ type: String })
], A.prototype, "header", 2);
he([
  l({ type: String })
], A.prototype, "message", 2);
he([
  l({ type: Boolean, attribute: "no-back-link" })
], A.prototype, "noBackLink", 2);
A = he([
  w("umb-error-layout")
], A);
var kr = Object.defineProperty, Lr = Object.getOwnPropertyDescriptor, ot = (t) => {
  throw TypeError(t);
}, z = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Lr(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && kr(e, r, a), a;
}, Sr = (t, e, r) => e.has(t) || ot("Cannot " + r), Or = (t, e, r) => e.has(t) ? ot("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), Fe = (t, e, r) => (Sr(t, e, "access private method"), r), ie, it, st;
let g = class extends v {
  constructor() {
    super(), Or(this, ie), this.state = void 0, this.error = "", this.userId = "", this.isInvite = !1, this._passwordPattern = "", this.consumeContext(U, (t) => {
      let e = "";
      this._passwordConfiguration = t?.passwordConfiguration, this._passwordConfiguration?.requireDigit && (e += "(?=.*\\d)"), this._passwordConfiguration?.requireLowercase && (e += "(?=.*[a-z])"), this._passwordConfiguration?.requireUppercase && (e += "(?=.*[A-Z])"), this._passwordConfiguration?.requireNonLetterOrDigit && (e += "(?=.*\\W)"), e += `.{${this._passwordConfiguration?.minimumPasswordLength ?? 10},}`, this._passwordPattern = e;
    });
  }
  renderHeader() {
    return this.isInvite ? u`
        <h1>Hi!</h1>
        <span>
          <umb-localize key="auth_userInviteWelcomeMessage">
            Welcome to Umbraco! Just need to get your password setup and then you're good to go
          </umb-localize>
        </span>
      ` : u`
        <h1>
          <umb-localize key="auth_newPassword">New password</umb-localize>
        </h1>
        <span>
            <umb-localize key="auth_setPasswordInstruction">Please provide a new password.</umb-localize>
        </span>
      `;
  }
  render() {
    return u`
      <uui-form>
        <form id="LoginForm" name="login" @submit=${Fe(this, ie, it)}>
          <header id="header">${this.renderHeader()}</header>
          <uui-form-layout-item>
            <uui-label id="passwordLabel" for="password" slot="label" required>
              <umb-localize key="auth_newPassword">New password</umb-localize>
            </uui-label>
            <uui-input-password
              type="password"
              id="password"
              name="password"
              autocomplete="new-password"
              pattern="${this._passwordPattern}"
              .minlength=${this._passwordConfiguration?.minimumPasswordLength}
              .minlengthMessage=${this.localize.term("auth_passwordMinLength", this._passwordConfiguration?.minimumPasswordLength ?? 10)}
              .label=${this.localize.term("auth_newPassword")}
              required
              required-message=${this.localize.term("auth_passwordIsBlank")}>
            </uui-input-password>
          </uui-form-layout-item>

          <uui-form-layout-item>
            <uui-label id="confirmPasswordLabel" for="confirmPassword" slot="label" required>
              <umb-localize key="auth_confirmNewPassword">Confirm new password</umb-localize>
            </uui-label>
            <uui-input-password
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autocomplete="new-password"
              pattern="${this._passwordPattern}"
              .minlength=${this._passwordConfiguration?.minimumPasswordLength}
              .minlengthMessage=${this.localize.term("auth_passwordMinLength", this._passwordConfiguration?.minimumPasswordLength ?? 10)}
              .label=${this.localize.term("auth_confirmNewPassword")}
              required
              required-message=${this.localize.term("auth_required")}></uui-input-password>
          </uui-form-layout-item>

          ${Fe(this, ie, st).call(this)}

          <uui-button
            type="submit"
            label=${this.localize.term("auth_continue")}
            look="primary"
            color="default"
            .state=${this.state}></uui-button>
        </form>
      </uui-form>

      <umb-back-to-login-button style="margin-top: var(--uui-size-space-6)"></umb-back-to-login-button>
    `;
  }
};
ie = /* @__PURE__ */ new WeakSet();
it = function(t) {
  if (t.preventDefault(), !this._passwordConfiguration) return;
  const e = t.target;
  if (this.passwordElement.setCustomValidity(""), this.confirmPasswordElement.setCustomValidity(""), !e || !e.checkValidity()) return;
  const r = new FormData(e), o = r.get("password"), a = r.get("confirmPassword");
  let s = !1;
  if (this._passwordConfiguration.minimumPasswordLength > 0 && o.length < this._passwordConfiguration.minimumPasswordLength && (s = !0), this._passwordConfiguration.requireNonLetterOrDigit && (/\W/.test(o) || (s = !0)), this._passwordConfiguration.requireDigit && (/\d/.test(o) || (s = !0)), this._passwordConfiguration.requireLowercase && (/[a-z]/.test(o) || (s = !0)), this._passwordConfiguration.requireUppercase && (/[A-Z]/.test(o) || (s = !0)), s) {
    const i = this.localize.term(
      "auth_errorInPasswordFormat",
      this._passwordConfiguration.minimumPasswordLength,
      this._passwordConfiguration.requireNonLetterOrDigit ? 1 : 0
    ) ?? "The password does not meet the minimum requirements!";
    this.passwordElement.setCustomValidity(i);
    return;
  }
  if (o !== a) {
    const i = this.localize.term(
      "auth_passwordMismatch"
    ) ?? "The confirmed password doesn't match the new password!";
    this.confirmPasswordElement.setCustomValidity(i);
    return;
  }
  this.dispatchEvent(new CustomEvent("submit", { detail: { password: o } }));
};
st = function() {
  return !this.error || this.state !== "failed" ? S : u`<span class="text-danger">${this.error}</span>`;
};
g.styles = [
  k`
      #header {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-5);
      }

      #header span {
        color: var(--uui-color-text-alt); /* TODO Change to uui color when uui gets a muted text variable */
        font-size: 14px;
      }

      #header h1 {
        margin: 0;
        font-weight: 400;
        font-size: var(--header-secondary-font-size);
        color: var(--uui-color-interactive);
        line-height: 1.2;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-5);
      }

      uui-form-layout-item {
        margin: 0;
      }

      uui-input-password {
        width: 100%;
        height: var(--input-height);
        border-radius: var(--uui-border-radius);
      }

      uui-button {
        width: 100%;
        margin-top: var(--uui-size-space-5);
        --uui-button-padding-top-factor: 1.5;
        --uui-button-padding-bottom-factor: 1.5;
      }

      .text-danger {
        color: var(--uui-color-danger-standalone);
      }
    `
];
z([
  He("#password")
], g.prototype, "passwordElement", 2);
z([
  He("#confirmPassword")
], g.prototype, "confirmPasswordElement", 2);
z([
  l()
], g.prototype, "state", 2);
z([
  l()
], g.prototype, "error", 2);
z([
  l()
], g.prototype, "userId", 2);
z([
  l({ type: Boolean, attribute: "is-invite" })
], g.prototype, "isInvite", 2);
z([
  c()
], g.prototype, "_passwordConfiguration", 2);
z([
  c()
], g.prototype, "_passwordPattern", 2);
g = z([
  w("umb-new-password-layout")
], g);
var Ur = Object.defineProperty, Dr = Object.getOwnPropertyDescriptor, nt = (t) => {
  throw TypeError(t);
}, pe = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Dr(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && Ur(e, r, a), a;
}, ze = (t, e, r) => e.has(t) || nt("Cannot " + r), f = (t, e, r) => (ze(t, e, "read from private field"), r ? r.call(t) : e.get(t)), re = (t, e, r) => e.has(t) ? nt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), ye = (t, e, r, o) => (ze(t, e, "write to private field"), e.set(t, r), r), We = (t, e, r) => (ze(t, e, "access private method"), r), Z, R, x, se, ut, lt;
let Y = class extends v {
  constructor() {
    super(), re(this, se), re(this, Z, ""), re(this, R, ""), this.state = void 0, this.error = "", this.loading = !0, re(this, x), this.consumeContext(U, (t) => {
      ye(this, x, t), We(this, se, ut).call(this);
    });
  }
  render() {
    return this.loading ? u`<uui-loader-bar></uui-loader-bar>` : this.error ? u`
          <umb-error-layout
            header=${this.localize.term("auth_error")}
            message=${this.error ?? this.localize.term("auth_defaultError")}>
          </umb-error-layout>` : u`
        <umb-new-password-layout
          @submit=${We(this, se, lt)}
          is-invite
          .userId=${f(this, R)}
          .state=${this.state}
          .error=${this.error}></umb-new-password-layout>`;
  }
};
Z = /* @__PURE__ */ new WeakMap();
R = /* @__PURE__ */ new WeakMap();
x = /* @__PURE__ */ new WeakMap();
se = /* @__PURE__ */ new WeakSet();
ut = async function() {
  const t = new URLSearchParams(window.location.search), e = t.get("inviteCode"), r = t.get("userId");
  if (!e || !r) {
    this.error = "The invite has expired or is invalid", this.loading = !1;
    return;
  }
  if (!f(this, x)) return;
  ye(this, Z, e), ye(this, R, r);
  const o = await f(this, x).validateInviteCode(f(this, Z), f(this, R));
  if (o.error) {
    this.error = o.error, this.loading = !1;
    return;
  }
  if (!o.passwordConfiguration) {
    this.error = "There is no password configuration for the invite code. Please contact the administrator.", this.loading = !1;
    return;
  }
  f(this, x).passwordConfiguration = o.passwordConfiguration, this.loading = !1;
};
lt = async function(t) {
  t.preventDefault();
  const e = t.detail.password;
  if (!e || !f(this, x)) return;
  this.state = "waiting";
  const r = await f(this, x).newInvitedUserPassword(e, f(this, Z), f(this, R));
  if (r.error) {
    this.error = r.error, this.state = "failed";
    return;
  }
  this.state = "success", window.location.href = f(this, x).returnPath;
};
pe([
  c()
], Y.prototype, "state", 2);
pe([
  c()
], Y.prototype, "error", 2);
pe([
  c()
], Y.prototype, "loading", 2);
Y = pe([
  w("umb-invite-page")
], Y);
var Tr = Object.defineProperty, qr = Object.getOwnPropertyDescriptor, dt = (t) => {
  throw TypeError(t);
}, D = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? qr(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && Tr(e, r, a), a;
}, Ee = (t, e, r) => e.has(t) || dt("Cannot " + r), h = (t, e, r) => (Ee(t, e, "read from private field"), r ? r.call(t) : e.get(t)), B = (t, e, r) => e.has(t) ? dt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), ct = (t, e, r, o) => (Ee(t, e, "write to private field"), e.set(t, r), r), ve = (t, e, r) => (Ee(t, e, "access private method"), r), L, C, q, ht, Ie, pt, le, mt, ft;
let $ = class extends v {
  constructor() {
    super(), B(this, q), this.usernameIsEmail = !1, this.allowPasswordReset = !1, this._loginError = "", this.supportPersistLogin = !1, B(this, L), B(this, C), B(this, Ie, async (t) => {
      if (t.preventDefault(), !h(this, C)) return;
      const e = t.target;
      if (!e) return;
      const r = new FormData(e), o = r.get("username"), a = r.get("password"), s = r.has("persist");
      if (!o || !a) {
        this._loginError = this.localize.term("auth_userFailedLogin"), this._loginState = "failed";
        return;
      }
      this._loginState = "waiting";
      const i = await h(this, C).login({
        username: o,
        password: a,
        persist: s
      });
      if (this._loginError = i.error || "", this._loginState = i.error ? "failed" : "success", i.status === 402) {
        h(this, C).isMfaEnabled = !0, i.twoFactorView && (h(this, C).twoFactorView = i.twoFactorView), i.twoFactorProviders && (h(this, C).mfaProviders = i.twoFactorProviders), this.dispatchEvent(new CustomEvent("umb-login-flow", { composed: !0, detail: { flow: "mfa" } }));
        return;
      }
      if (i.error)
        return;
      const n = h(this, C).returnPath;
      n && (location.href = n);
    }), B(this, le, () => {
      h(this, L)?.requestSubmit();
    }), this.consumeContext(U, (t) => {
      ct(this, C, t), this.supportPersistLogin = t?.supportsPersistLogin ?? !1;
    });
  }
  render() {
    return u`
      <header id="header">
        <h1 id="greeting">
          <umb-localize .key=${h(this, q, pt)}></umb-localize>
        </h1>
        <slot name="subheadline"></slot>
      </header>
      <slot @slotchange=${ve(this, q, ht)}></slot>
      <div id="secondary-actions">
        ${ue(
      this.supportPersistLogin,
      () => u`
            <uui-form-layout-item>
              <uui-checkbox
                name="persist"
                .label=${this.localize.term("auth_rememberMe")}>
                <umb-localize key="auth_rememberMe">Remember me</umb-localize>
              </uui-checkbox>
            </uui-form-layout-item>`
    )}
        ${ue(
      this.allowPasswordReset,
      () => u`
              <button type="button" id="forgot-password" @click=${ve(this, q, ft)}>
                <umb-localize key="auth_forgottenPassword">Forgotten password?</umb-localize>
              </button>`
    )}
      </div>
      <uui-button
        type="submit"
        id="umb-login-button"
        look="primary"
        @click=${h(this, le)}
        .label=${this.localize.term("auth_login")}
        color="default"
        .state=${this._loginState}></uui-button>

      ${ve(this, q, mt).call(this)}
    `;
  }
};
L = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakMap();
q = /* @__PURE__ */ new WeakSet();
ht = async function() {
  ct(this, L, this.slottedElements?.find((t) => t.id === "umb-login-form")), h(this, L) && (h(this, L).addEventListener("keypress", (t) => {
    t.key === "Enter" && h(this, le).call(this);
  }), h(this, L).onsubmit = h(this, Ie));
};
Ie = /* @__PURE__ */ new WeakMap();
pt = function() {
  return [
    "auth_greeting0",
    "auth_greeting1",
    "auth_greeting2",
    "auth_greeting3",
    "auth_greeting4",
    "auth_greeting5",
    "auth_greeting6"
  ][(/* @__PURE__ */ new Date()).getDay()];
};
le = /* @__PURE__ */ new WeakMap();
mt = function() {
  return !this._loginError || this._loginState !== "failed" ? S : u`<span class="text-error text-danger">${this._loginError}</span>`;
};
ft = function() {
  this.dispatchEvent(new CustomEvent("umb-login-flow", { composed: !0, detail: { flow: "reset" } }));
};
$.styles = [
  k`
      :host {
        display: flex;
        flex-direction: column;
      }

      #header {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-5);
      }

      #header span {
        color: var(--uui-color-text-alt); /* TODO Change to uui color when uui gets a muted text variable */
        font-size: 14px;
      }

      #greeting {
        color: var(--uui-color-interactive);
        text-align: center;
        font-weight: 400;
        font-size: var(--header-font-size);
        margin: 0 0 var(--uui-size-layout-1);
        line-height: 1.2;
      }

      #umb-login-button {
        margin-top: var(--uui-size-space-4);
        width: 100%;
      }

      #forgot-password {
        cursor: pointer;
        background: none;
        border: 0;
        height: 1rem;
        color: var(--uui-color-text-alt); /* TODO Change to uui color when uui gets a muted text variable */
        gap: var(--uui-size-space-1);
        align-self: center;
        text-decoration: none;
        display: inline-flex;
        line-height: 1;
        font-size: 14px;
        font-family: var(--uui-font-family),sans-serif;
        margin-left: auto;
        margin-bottom: var(--uui-size-space-3);
      }

      #forgot-password:hover {
        color: var(--uui-color-interactive-emphasis);
      }

      .text-error {
        margin-top: var(--uui-size-space-4);
      }

      .text-danger {
        color: var(--uui-color-danger-standalone);
      }

      #secondary-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `
];
D([
  l({ type: Boolean, attribute: "username-is-email" })
], $.prototype, "usernameIsEmail", 2);
D([
  St({ flatten: !0 })
], $.prototype, "slottedElements", 2);
D([
  l({ type: Boolean, attribute: "allow-password-reset" })
], $.prototype, "allowPasswordReset", 2);
D([
  c()
], $.prototype, "_loginState", 2);
D([
  c()
], $.prototype, "_loginError", 2);
D([
  c()
], $.prototype, "supportPersistLogin", 2);
$ = D([
  w("umb-login-page")
], $);
async function Mr(t) {
  if (t.endsWith(".html"))
    return fetch(t).then((r) => r.text());
  const e = await import(
    /* @vite-ignore */
    t
  );
  if (!e.default) throw new Error("No default export found");
  return new e.default();
}
function Ar(t) {
  return typeof t == "string" ? u`${Ot(t)}` : t;
}
var Rr = Object.defineProperty, Fr = Object.getOwnPropertyDescriptor, gt = (t) => {
  throw TypeError(t);
}, me = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Fr(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && Rr(e, r, a), a;
}, ke = (t, e, r) => e.has(t) || gt("Cannot " + r), O = (t, e, r) => (ke(t, e, "read from private field"), r ? r.call(t) : e.get(t)), Ve = (t, e, r) => e.has(t) ? gt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), Wr = (t, e, r, o) => (ke(t, e, "write to private field"), e.set(t, r), r), Be = (t, e, r) => (ke(t, e, "access private method"), r), b, ne, wt, vt;
let F = class extends v {
  constructor() {
    super(), Ve(this, ne), this.providers = [], this.error = null, Ve(this, b), this.consumeContext(U, (t) => {
      Wr(this, b, t), Be(this, ne, wt).call(this);
    });
  }
  renderDefaultView() {
    return u`
      <uui-form>
        <form id="LoginForm" @submit=${Be(this, ne, vt)} novalidate>
          <header id="header">
            <h1>
              <umb-localize key="auth_mfaTitle">One last step</umb-localize>
            </h1>

            <p>
              <umb-localize key="auth_mfaText">
                You have enabled 2-factor authentication and must verify your identity.
              </umb-localize>
            </p>
          </header>

          <!-- if there's only one provider active, it will skip this step! -->
          ${this.providers.length > 1 ? u`
              <uui-form-layout-item>
                <uui-label id="providerLabel" for="provider" slot="label" required>
                  <umb-localize key="auth_mfaMultipleText">Please choose a 2-factor provider</umb-localize>
                </uui-label>
                <uui-select label=${this.localize.term("auth_mfaMultipleText")} id="provider" name="provider" .options=${this.providers} aria-required="true" required></uui-select>
              </uui-form-layout-item>
            ` : S}

          <uui-form-layout-item>
            <uui-label id="mfacodeLabel" for="mfacode" slot="label" required>
              <umb-localize key="auth_mfaCodeInput">Verification code</umb-localize>
            </uui-label>

            <uui-input
              autofocus
              id="mfacode"
              type="text"
              name="token"
              inputmode="numeric"
              autocomplete="one-time-code"
              placeholder=${this.localize.term("auth_mfaCodeInputHelp")}
              aria-required="true"
              required
              required-message=${this.localize.term("auth_mfaCodeInputHelp")}
              label=${this.localize.term("auth_mfaCodeInput")}
              style="width:100%;">
            </uui-input>
          </uui-form-layout-item>

          ${this.error ? u` <span class="text-danger">${this.error}</span> ` : S}

          <uui-button
            .state=${this.buttonState}
            button-style="success"
            look="primary"
            color="default"
            label=${this.localize.term("auth_validate")}
            type="submit"></uui-button>
        </form>
      </uui-form>

      <umb-back-to-login-button style="margin-top: var(--uui-size-space-6)"></umb-back-to-login-button>
    `;
  }
  async renderCustomView() {
    const t = O(this, b)?.twoFactorView;
    if (!t) return S;
    try {
      const e = await Mr(t);
      return typeof e == "object" && (e.providers = this.providers.map((r) => r.value), e.returnPath = O(this, b)?.returnPath ?? ""), Ar(e);
    } catch (e) {
      const r = e instanceof Error ? e.message : "Unknown error";
      return console.group("[MFA login] Failed to load custom view"), console.log("Element reference", this), console.log("Custom view", t), console.error("Failed to load custom view:", e), console.groupEnd(), u`<span class="text-danger">${r}</span>`;
    }
  }
  render() {
    return O(this, b)?.twoFactorView ? Ut(this.renderCustomView(), u`
          <uui-loader-bar></uui-loader-bar>`) : this.renderDefaultView();
  }
};
b = /* @__PURE__ */ new WeakMap();
ne = /* @__PURE__ */ new WeakSet();
wt = function() {
  this.providers = O(this, b)?.mfaProviders.map((t) => ({ name: t, value: t, selected: !1 })) ?? [], this.providers.length ? this.providers[0].selected = !0 : this.error = "Error: No providers available";
};
vt = async function(t) {
  if (t.preventDefault(), !O(this, b)) return;
  this.error = null;
  const e = t.target;
  if (!e) return;
  const r = e.elements.namedItem("mfacode");
  if (r && (r.error = !1, r.errorMessage = "", r.setCustomValidity("")), !e.checkValidity()) return;
  const o = new FormData(e);
  let a = o.get("provider");
  if (!a) {
    if (!this.providers.length) {
      this.error = "No providers available";
      return;
    }
    a = this.providers[0].value;
  }
  if (!a) {
    this.error = "No provider selected";
    return;
  }
  const s = o.get("token");
  this.buttonState = "waiting";
  const i = await O(this, b).validateMfaCode(s, a);
  if (i.error) {
    r ? (r.error = !0, r.errorMessage = i.error) : this.error = i.error, this.buttonState = "failed";
    return;
  }
  this.buttonState = "success";
  const n = O(this, b).returnPath;
  n && (location.href = n);
};
F.styles = [
  k`
      #header {
        text-align: center;
      }

      #header h1 {
        font-weight: 400;
        font-size: var(--header-secondary-font-size);
        color: var(--uui-color-interactive);
        line-height: 1.2;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-layout-2);
      }

      #provider {
        width: 100%;
      }

      uui-form-layout-item {
        margin: 0;
      }

      uui-input,
      uui-input-password {
        width: 100%;
        height: var(--input-height);
        border-radius: var(--uui-border-radius);
      }

      uui-input {
        width: 100%;
      }

      uui-button {
        width: 100%;
        --uui-button-padding-top-factor: 1.5;
        --uui-button-padding-bottom-factor: 1.5;
      }

      .text-danger {
        color: var(--uui-color-danger-standalone);
      }
    `
];
me([
  c()
], F.prototype, "providers", 2);
me([
  c()
], F.prototype, "buttonState", 2);
me([
  c()
], F.prototype, "error", 2);
F = me([
  w("umb-mfa-page")
], F);
var Vr = Object.defineProperty, Br = Object.getOwnPropertyDescriptor, bt = (t) => {
  throw TypeError(t);
}, T = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Br(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && Vr(e, r, a), a;
}, Le = (t, e, r) => e.has(t) || bt("Cannot " + r), j = (t, e, r) => (Le(t, e, "read from private field"), e.get(t)), Ne = (t, e, r) => e.has(t) ? bt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), Nr = (t, e, r, o) => (Le(t, e, "write to private field"), e.set(t, r), r), _e = (t, e, r) => (Le(t, e, "access private method"), r), E, H, yt, _t, Ct;
let I = class extends v {
  constructor() {
    super(), Ne(this, H), this.state = void 0, this.page = "new", this.error = "", this.userId = "", this.resetCode = "", this.loading = !0, Ne(this, E), this.consumeContext(U, (t) => {
      Nr(this, E, t), _e(this, H, yt).call(this);
    });
  }
  render() {
    return this.loading ? u`<uui-loader-bar></uui-loader-bar>` : _e(this, H, Ct).call(this);
  }
};
E = /* @__PURE__ */ new WeakMap();
H = /* @__PURE__ */ new WeakSet();
yt = async function() {
  const t = new URLSearchParams(window.location.search), e = t.get("resetCode"), r = t.get("userId");
  if (!r || !e) {
    this.page = "error", this.loading = !1;
    return;
  }
  if (!j(this, E)) return;
  this.resetCode = e, this.userId = r;
  const o = await j(this, E).validatePasswordResetCode(this.userId, this.resetCode);
  if (o.error) {
    this.page = "error", this.error = o.error, this.loading = !1;
    return;
  }
  if (!o.passwordConfiguration) {
    this.page = "error", this.error = "Password configuration is missing", this.loading = !1;
    return;
  }
  j(this, E).passwordConfiguration = o.passwordConfiguration, this.loading = !1;
};
_t = async function(t) {
  if (t.preventDefault(), this.error = "", !j(this, E)) return;
  const e = t.detail.password;
  this.state = "waiting";
  const r = await j(this, E).newPassword(e, this.resetCode, this.userId);
  if (r.error) {
    this.state = "failed", this.error = r.error;
    return;
  }
  this.state = "success", this.page = "done";
};
Ct = function() {
  switch (this.page) {
    case "new":
      return u`
          <umb-new-password-layout
            @submit=${_e(this, H, _t)}
            .userId=${this.userId}
            .state=${this.state}
            .error=${this.error}></umb-new-password-layout>`;
    case "error":
      return u`
          <umb-error-layout
            header=${this.localize.term("auth_error")}
            message=${this.error ?? this.localize.term("auth_defaultError")}>
          </umb-error-layout>`;
    case "done":
      return u`
          <umb-confirmation-layout
            header=${this.localize.term("auth_success")}
            message=${this.localize.term("auth_setPasswordConfirmation")}>
          </umb-confirmation-layout>`;
  }
};
T([
  c()
], I.prototype, "state", 2);
T([
  c()
], I.prototype, "page", 2);
T([
  c()
], I.prototype, "error", 2);
T([
  c()
], I.prototype, "userId", 2);
T([
  c()
], I.prototype, "resetCode", 2);
T([
  c()
], I.prototype, "loading", 2);
I = T([
  w("umb-new-password-page")
], I);
var jr = Object.defineProperty, Hr = Object.getOwnPropertyDescriptor, xt = (t) => {
  throw TypeError(t);
}, Se = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Hr(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (o ? i(e, r, a) : i(a)) || a);
  return o && a && jr(e, r, a), a;
}, $t = (t, e, r) => e.has(t) || xt("Cannot " + r), Gr = (t, e, r) => ($t(t, e, "read from private field"), r ? r.call(t) : e.get(t)), je = (t, e, r) => e.has(t) ? xt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), Ce = (t, e, r) => ($t(t, e, "access private method"), r), Oe, G, Pt, zt, Et;
let K = class extends v {
  constructor() {
    super(...arguments), je(this, G), this.resetCallState = void 0, this.error = "", je(this, Oe, async (t) => {
      t.preventDefault();
      const e = t.target;
      if (!e || !e.checkValidity()) return;
      const o = new FormData(e).get("email");
      this.resetCallState = "waiting";
      const a = await this.getContext(U);
      if (!a) {
        this.resetCallState = "failed", this.error = "Authentication context not available.";
        return;
      }
      const s = await a.resetPassword(o);
      this.resetCallState = s.error ? "failed" : "success", this.error = s.error || "";
    });
  }
  render() {
    return this.resetCallState === "success" ? Ce(this, G, Et).call(this) : Ce(this, G, Pt).call(this);
  }
};
Oe = /* @__PURE__ */ new WeakMap();
G = /* @__PURE__ */ new WeakSet();
Pt = function() {
  return u`
			<uui-form>
				<form id="LoginForm" name="login" @submit="${Gr(this, Oe)}">
					<header id="header">
						<h1>
							<umb-localize key="auth_forgottenPassword">Forgotten password?</umb-localize>
						</h1>
						<span>
							<umb-localize key="auth_forgottenPasswordInstruction">
								An email will be sent to the address specified with a link to reset your password
							</umb-localize>
						</span>
					</header>

					<uui-form-layout-item>
						<uui-label for="email" slot="label" required>
							<umb-localize key="auth_email">Email</umb-localize>
						</uui-label>
						<uui-input
							type="email"
							id="email"
							name="email"
							.label=${this.localize.term("auth_email")}
							required
							required-message=${this.localize.term("auth_required")}>
						</uui-input>
					</uui-form-layout-item>

					${Ce(this, G, zt).call(this)}

					<uui-button
						type="submit"
						.label=${this.localize.term("auth_submit")}
						look="primary"
						color="default"
						.state=${this.resetCallState}></uui-button>
				</form>
			</uui-form>

			<umb-back-to-login-button style="margin-top: var(--uui-size-space-6)"></umb-back-to-login-button>
		`;
};
zt = function() {
  return !this.error || this.resetCallState !== "failed" ? S : u`<span class="text-danger">${this.error}</span>`;
};
Et = function() {
  return u`
			<umb-confirmation-layout
				header=${this.localize.term("auth_forgottenPassword")}
				message=${this.localize.term("auth_requestPasswordResetConfirmation")}>
			</umb-confirmation-layout>
		`;
};
K.styles = [
  k`
			#header {
				text-align: center;
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-5);
			}

			#header span {
				color: var(--uui-color-text-alt); /* TODO Change to uui color when uui gets a muted text variable */
				font-size: 14px;
			}

			#header h1 {
				margin: 0;
				font-weight: 400;
				font-size: var(--header-secondary-font-size);
				color: var(--uui-color-interactive);
				line-height: 1.2;
			}

			form {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-layout-2);
			}

			uui-form-layout-item {
				margin: 0;
			}

			uui-input,
			uui-input-password {
				width: 100%;
				height: var(--input-height);
				border-radius: var(--uui-border-radius);
			}

			uui-input {
				width: 100%;
			}

			uui-button {
				width: 100%;
				--uui-button-padding-top-factor: 1.5;
				--uui-button-padding-bottom-factor: 1.5;
			}

			#resend {
				display: inline-flex;
				font-size: 14px;
				align-self: center;
				gap: var(--uui-size-space-1);
			}

			#resend a {
				color: var(--uui-color-selected);
				font-weight: 600;
				text-decoration: none;
			}

			#resend a:hover {
				color: var(--uui-color-interactive-emphasis);
			}
		`
];
Se([
  c()
], K.prototype, "resetCallState", 2);
Se([
  c()
], K.prototype, "error", 2);
K = Se([
  w("umb-reset-password-page")
], K);
var Jr = Object.getOwnPropertyDescriptor, It = (t) => {
  throw TypeError(t);
}, Zr = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Jr(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = i(a) || a);
  return a;
}, Yr = (t, e, r) => e.has(t) || It("Cannot " + r), Kr = (t, e, r) => e.has(t) ? It("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), Qr = (t, e, r) => (Yr(t, e, "access private method"), r), xe, kt;
let $e = class extends v {
  constructor() {
    super(...arguments), Kr(this, xe);
  }
  render() {
    return u`
			<button type="button" @click=${Qr(this, xe, kt)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
				</svg>
				<span><umb-localize key="auth_returnToLogin">Return to login form</umb-localize></span>
			</button>
		`;
  }
};
xe = /* @__PURE__ */ new WeakSet();
kt = function() {
  this.dispatchEvent(new CustomEvent("umb-login-flow", { composed: !0, detail: { flow: "login" } }));
};
$e.styles = [
  k`
			:host {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			button {
				cursor: pointer;
				background: none;
				border: 0;
				height: 1rem;
				color: var(--uui-color-text-alt); /* TODO Change to uui color when uui gets a muted text variable */
				gap: var(--uui-size-space-1);
				align-self: center;
				text-decoration: none;
				display: inline-flex;
				line-height: 1;
				font-size: 14px;
				font-family: var(--uui-font-family),sans-serif;
			}
			button svg {
				width: 1rem;
			}
			button:hover {
				color: var(--uui-color-interactive-emphasis);
			}
		`
];
$e = Zr([
  w("umb-back-to-login-button")
], $e);
export {
  U as UMB_AUTH_CONTEXT,
  pr as UmbAuthContext,
  M as UmbAuthLayoutElement,
  mr as UmbSlimBackofficeController
};
//# sourceMappingURL=login.js.map
