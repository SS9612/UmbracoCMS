const c = [], y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var d = 0, v = y.length; d < v; ++d)
  c[d] = y[d];
function U(n) {
  return c[n >> 18 & 63] + c[n >> 12 & 63] + c[n >> 6 & 63] + c[n & 63];
}
function O(n, e, t) {
  for (var r, o = [], s = e; s < t; s += 3)
    r = (n[s] << 16 & 16711680) + (n[s + 1] << 8 & 65280) + (n[s + 2] & 255), o.push(U(r));
  return o.join("");
}
function C(n) {
  for (var e, t = n.length, r = t % 3, o = [], s = 16383, i = 0, a = t - r; i < a; i += s)
    o.push(O(n, i, i + s > a ? a : i + s));
  return r === 1 ? (e = n[t - 1], o.push(c[e >> 2] + c[e << 4 & 63] + "==")) : r === 2 && (e = (n[t - 2] << 8) + n[t - 1], o.push(c[e >> 10] + c[e >> 4 & 63] + c[e << 2 & 63] + "=")), o.join("");
}
class l {
  constructor(e, t) {
    this.message = e, this.extras = t;
  }
}
const R = typeof window < "u" && !!window.crypto, j = R && !!window.crypto.subtle, _ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function z(n) {
  const e = [];
  for (let t = 0; t < n.byteLength; t += 1) {
    const r = n[t] % _.length;
    e.push(_[r]);
  }
  return e.join("");
}
function N(n) {
  return C(new Uint8Array(n)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function b(n) {
  const e = new ArrayBuffer(n.length), t = new Uint8Array(e);
  for (let r = 0; r < n.length; r++)
    t[r] = n.charCodeAt(r);
  return t;
}
class I {
  generateRandom(e) {
    const t = new Uint8Array(e);
    if (R)
      window.crypto.getRandomValues(t);
    else
      for (let r = 0; r < e; r += 1)
        t[r] = Math.random() * _.length | 0;
    return z(t);
  }
  deriveChallenge(e) {
    return e.length < 43 || e.length > 128 ? Promise.reject(new l("Invalid code length.")) : j ? new Promise((t, r) => {
      crypto.subtle.digest("SHA-256", b(e)).then(
        (o) => t(N(new Uint8Array(o))),
        (o) => r(o)
      );
    }) : Promise.reject(new l("window.crypto.subtle is unavailable."));
  }
}
const Z = !0, W = !1;
function h(n, ...e) {
  (e ? e.length : 0) > 0 ? console.log(n, ...e) : console.log(n);
}
function X(n, e, t) {
  return t;
}
const B = 10, L = function(n) {
  return n.generateRandom(B);
};
class g {
  /**
   * Constructs a new AuthorizationRequest.
   * Use a `undefined` value for the `state` parameter, to generate a random
   * state for CSRF protection.
   */
  constructor(e, t = new I(), r = !0) {
    this.crypto = t, this.usePkce = r, this.clientId = e.client_id, this.redirectUri = e.redirect_uri, this.scope = e.scope, this.responseType = e.response_type || g.RESPONSE_TYPE_CODE, this.state = e.state || L(t), this.extras = e.extras, this.internal = e.internal;
  }
  static {
    this.RESPONSE_TYPE_TOKEN = "token";
  }
  static {
    this.RESPONSE_TYPE_CODE = "code";
  }
  setupCodeVerifier() {
    if (this.usePkce) {
      const e = this.crypto.generateRandom(128);
      return this.crypto.deriveChallenge(e).catch((r) => {
        h("Unable to generate PKCE challenge. Not using PKCE", r);
      }).then((r) => {
        r && (this.internal = this.internal || {}, this.internal.code_verifier = e, this.extras = this.extras || {}, this.extras.code_challenge = r, this.extras.code_challenge_method = "S256");
      });
    } else
      return Promise.resolve();
  }
  /**
   * Serializes the AuthorizationRequest to a JavaScript Object.
   */
  toJson() {
    return this.setupCodeVerifier().then(() => ({
      response_type: this.responseType,
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      state: this.state,
      extras: this.extras,
      internal: this.internal
    }));
  }
}
class ee {
  constructor() {
    this.listener = null;
  }
  setAuthorizationListener(e) {
    this.listener = e;
  }
  /**
   * The authorization complete callback.
   */
  onAuthorizationComplete(e, t, r) {
    this.listener && this.listener(e, t, r);
  }
}
const H = ["redirect_uri", "client_id", "response_type", "state", "scope"];
class J {
  constructor(e, t) {
    this.utils = e, this.crypto = t, this.notifier = null;
  }
  /**
   * A utility method to be able to build the authorization request URL.
   */
  buildRequestUrl(e, t) {
    const r = {
      redirect_uri: t.redirectUri,
      client_id: t.clientId,
      response_type: t.responseType,
      state: t.state,
      scope: t.scope
    };
    if (t.extras)
      for (const a in t.extras)
        Object.prototype.hasOwnProperty.call(t.extras, a) && H.indexOf(a) < 0 && (r[a] = t.extras[a]);
    const o = this.utils.stringify(r);
    return `${e.authorizationEndpoint}?${o}`;
  }
  /**
   * Completes the authorization request if necessary & when possible.
   */
  completeAuthorizationRequestIfPossible() {
    return h("Checking to see if there is an authorization response to be delivered."), this.notifier || h(`Notifier is not present on AuthorizationRequest handler.
          No delivery of result will be possible`), this.completeAuthorizationRequest().then((e) => {
      e || h("No result is available yet."), e && this.notifier && this.notifier.onAuthorizationComplete(e.request, e.response, e.error);
    });
  }
  /**
   * Sets the default Authorization Service notifier.
   */
  setAuthorizationNotifier(e) {
    return this.notifier = e, this;
  }
}
class D {
  constructor(e) {
    this.code = e.code, this.state = e.state;
  }
  toJson() {
    return { code: this.code, state: this.state };
  }
}
class M {
  constructor(e) {
    this.error = e.error, this.errorDescription = e.error_description, this.errorUri = e.error_uri, this.state = e.state;
  }
  toJson() {
    return {
      error: this.error,
      error_description: this.errorDescription,
      error_uri: this.errorUri,
      state: this.state
    };
  }
}
class K {
}
class E extends K {
  xhr(e) {
    if (!e.url)
      return Promise.reject(new l("A URL must be provided."));
    const t = new URL(e.url), r = {};
    r.method = e.method, r.mode = "cors", e.data && (e.method && e.method.toUpperCase() === "POST" ? r.body = e.data : new URLSearchParams(e.data).forEach((i, a) => {
      t.searchParams.append(a, i);
    })), r.headers = {}, e.headers && (r.headers = e.headers);
    const o = e.dataType && e.dataType.toLowerCase() === "json";
    return o && (r.headers.Accept = "application/json, text/javascript, */*; q=0.01"), fetch(t.toString(), r).then((s) => {
      if (s.status >= 200 && s.status < 300) {
        const i = s.headers.get("content-type");
        return o || i && i.indexOf("application/json") !== -1 ? s.json() : s.text();
      } else
        return Promise.reject(new l(s.status.toString(), s.statusText));
    });
  }
}
const Y = ".well-known", $ = "openid-configuration";
class x {
  constructor(e) {
    this.authorizationEndpoint = e.authorization_endpoint, this.tokenEndpoint = e.token_endpoint, this.revocationEndpoint = e.revocation_endpoint, this.userInfoEndpoint = e.userinfo_endpoint, this.endSessionEndpoint = e.end_session_endpoint;
  }
  toJson() {
    return {
      authorization_endpoint: this.authorizationEndpoint,
      token_endpoint: this.tokenEndpoint,
      revocation_endpoint: this.revocationEndpoint,
      end_session_endpoint: this.endSessionEndpoint,
      userinfo_endpoint: this.userInfoEndpoint
    };
  }
  static fetchFromIssuer(e, t) {
    const r = `${e}/${Y}/${$}`;
    return (t || new E()).xhr({ url: r, dataType: "json", method: "GET" }).then((s) => new x(s));
  }
}
class S {
  parse(e, t) {
    return t ? this.parseQueryString(e.hash) : this.parseQueryString(e.search);
  }
  parseQueryString(e) {
    const t = {};
    e = e.trim().replace(/^(\?|#|&)/, "");
    const r = e.split("&");
    for (let o = 0; o < r.length; o += 1) {
      const i = r[o].split("=");
      if (i.length >= 2) {
        const a = decodeURIComponent(i.shift()), u = i.length > 0 ? i.join("=") : null;
        u && (t[a] = decodeURIComponent(u));
      }
    }
    return t;
  }
  stringify(e) {
    const t = [];
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && e[r] && t.push(`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`);
    return t.join("&");
  }
}
class F {
}
class V extends F {
  constructor(e) {
    super(), this.storage = e || window.localStorage;
  }
  getItem(e) {
    return new Promise((t, r) => {
      const o = this.storage.getItem(e);
      t(o || null);
    });
  }
  removeItem(e) {
    return new Promise((t, r) => {
      this.storage.removeItem(e), t();
    });
  }
  clear() {
    return new Promise((e, t) => {
      this.storage.clear(), e();
    });
  }
  setItem(e, t) {
    return new Promise((r, o) => {
      this.storage.setItem(e, t), r();
    });
  }
}
const p = (n) => `${n}_appauth_authorization_request`, T = (n) => `${n}_appauth_authorization_service_configuration`, f = "appauth_current_authorization_request";
class te extends J {
  constructor(e = new V(), t = new S(), r = window.location, o = new I()) {
    super(t, o), this.storageBackend = e, this.locationLike = r;
  }
  performAuthorizationRequest(e, t) {
    const r = this.crypto.generateRandom(10);
    return Promise.all([
      this.storageBackend.setItem(f, r),
      // Calling toJson() adds in the code & challenge when possible
      t.toJson().then((s) => this.storageBackend.setItem(p(r), JSON.stringify(s))),
      this.storageBackend.setItem(T(r), JSON.stringify(e.toJson()))
    ]).then(() => {
      const s = this.buildRequestUrl(e, t);
      return h("Making a request to ", t, s), s;
    });
  }
  /**
   * Attempts to introspect the contents of storage backend and completes the
   * request.
   */
  completeAuthorizationRequest() {
    return this.storageBackend.getItem(f).then((e) => e ? this.storageBackend.getItem(p(e)).then((t) => JSON.parse(t)).then((t) => new g(t)).then((t) => {
      const r = `${this.locationLike.origin}${this.locationLike.pathname}`, o = this.utils.parse(
        this.locationLike,
        !0
        /* use hash */
      ), s = o.state, i = o.code, a = o.error;
      h("Potential authorization request ", r, o, s, i, a);
      const u = s === t.state;
      let k = null, m = null;
      if (u) {
        if (a) {
          const P = o.error_uri, A = o.error_description;
          m = new M({
            error: a,
            error_description: A,
            error_uri: P,
            state: s
          });
        } else
          k = new D({ code: i, state: s });
        return Promise.all([
          this.storageBackend.removeItem(f),
          this.storageBackend.removeItem(p(e)),
          this.storageBackend.removeItem(T(e))
        ]).then(() => (h("Delivering authorization response"), {
          request: t,
          response: k,
          error: m
        }));
      } else
        return h("Mismatched request (state and request_uri) dont match."), Promise.resolve(null);
    }) : null);
  }
}
class re {
  constructor(e) {
    this.token = e.token, this.tokenTypeHint = e.token_type_hint, this.clientId = e.client_id, this.clientSecret = e.client_secret;
  }
  /**
   * Serializes a TokenRequest to a JavaScript object.
   */
  toJson() {
    const e = { token: this.token };
    return this.tokenTypeHint && (e.token_type_hint = this.tokenTypeHint), this.clientId && (e.client_id = this.clientId), this.clientSecret && (e.client_secret = this.clientSecret), e;
  }
  toStringMap() {
    return this.toJson();
  }
}
const ne = "authorization_code", oe = "refresh_token";
class se {
  constructor(e) {
    this.clientId = e.client_id, this.redirectUri = e.redirect_uri, this.grantType = e.grant_type, this.code = e.code, this.refreshToken = e.refresh_token, this.extras = e.extras;
  }
  /**
   * Serializes a TokenRequest to a JavaScript object.
   */
  toJson() {
    return {
      grant_type: this.grantType,
      code: this.code,
      refresh_token: this.refreshToken,
      redirect_uri: this.redirectUri,
      client_id: this.clientId,
      extras: this.extras
    };
  }
  toStringMap() {
    const e = {
      grant_type: this.grantType,
      client_id: this.clientId,
      redirect_uri: this.redirectUri
    };
    if (this.code && (e.code = this.code), this.refreshToken && (e.refresh_token = this.refreshToken), this.extras)
      for (const t in this.extras)
        Object.prototype.hasOwnProperty.call(this.extras, t) && !Object.prototype.hasOwnProperty.call(e, t) && (e[t] = this.extras[t]);
    return e;
  }
}
const G = 0, w = () => Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
class Q {
  constructor(e) {
    this.accessToken = e.access_token, this.tokenType = e.token_type || "bearer", e.expires_in && (this.expiresIn = parseInt(e.expires_in, 10)), this.refreshToken = e.refresh_token, this.scope = e.scope, this.idToken = e.id_token, this.issuedAt = e.issued_at || w();
  }
  toJson() {
    return {
      access_token: this.accessToken,
      id_token: this.idToken,
      refresh_token: this.refreshToken,
      scope: this.scope,
      token_type: this.tokenType,
      issued_at: this.issuedAt,
      expires_in: this.expiresIn?.toString()
    };
  }
  isValid(e = G) {
    return this.expiresIn ? w() < this.issuedAt + this.expiresIn + e : !0;
  }
}
class q {
  constructor(e) {
    this.error = e.error, this.errorDescription = e.error_description, this.errorUri = e.error_uri;
  }
  toJson() {
    return {
      error: this.error,
      error_description: this.errorDescription,
      error_uri: this.errorUri
    };
  }
}
class ie {
  constructor(e = new E(), t = new S()) {
    this.requestor = e, this.utils = t;
  }
  isTokenResponse(e) {
    return e.error === void 0;
  }
  performRevokeTokenRequest(e, t) {
    return this.requestor.xhr({
      url: e.revocationEndpoint,
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: this.utils.stringify(t.toStringMap())
    }).then((o) => !0);
  }
  performTokenRequest(e, t) {
    return this.requestor.xhr({
      url: e.tokenEndpoint,
      method: "POST",
      dataType: "json",
      // adding implicit dataType
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: this.utils.stringify(t.toStringMap())
    }).then((o) => this.isTokenResponse(o) ? new Q(o) : Promise.reject(new l(o.error, new q(o))));
  }
}
export {
  l as AppAuthError,
  M as AuthorizationError,
  ee as AuthorizationNotifier,
  g as AuthorizationRequest,
  J as AuthorizationRequestHandler,
  D as AuthorizationResponse,
  x as AuthorizationServiceConfiguration,
  H as BUILT_IN_PARAMETERS,
  ie as BaseTokenRequestHandler,
  S as BasicQueryStringUtils,
  I as DefaultCrypto,
  E as FetchRequestor,
  ne as GRANT_TYPE_AUTHORIZATION_CODE,
  oe as GRANT_TYPE_REFRESH_TOKEN,
  Z as IS_LOG,
  W as IS_PROFILE,
  V as LocalStorageBackend,
  te as RedirectRequestHandler,
  K as Requestor,
  re as RevokeTokenRequest,
  F as StorageBackend,
  q as TokenError,
  se as TokenRequest,
  Q as TokenResponse,
  z as bufferToString,
  h as log,
  w as nowInSeconds,
  X as profile,
  b as textEncodeLite,
  N as urlSafe
};
//# sourceMappingURL=index.js.map
