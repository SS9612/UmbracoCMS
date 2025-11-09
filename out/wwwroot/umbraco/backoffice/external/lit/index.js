/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, X = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Y = Symbol(), rt = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Y) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ot = (s) => new gt(typeof s == "string" ? s : s + "", void 0, Y), ue = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new gt(e, s, Y);
}, Ht = (s, t) => {
  if (X) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = j.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, ot = X ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ot(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Nt, defineProperty: Rt, getOwnPropertyDescriptor: kt, getOwnPropertyNames: Lt, getOwnPropertySymbols: jt, getPrototypeOf: Dt } = Object, z = globalThis, ht = z.trustedTypes, It = ht ? ht.emptyScript : "", Bt = z.reactiveElementPolyfillSupport, T = (s, t) => s, I = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? It : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, F = (s, t) => !Nt(s, t), at = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: F };
Symbol.metadata ??= Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Rt(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = kt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const a = n?.call(this);
      r?.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Dt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, i = [...Lt(e), ...jt(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(ot(n));
    } else t !== void 0 && e.push(ot(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ht(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : I).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : I;
      this._$Em = n, this[n] = o.fromAttribute(e, r.type) ?? this._$Ej?.get(n) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      const n = this.constructor, r = this[t];
      if (i ??= n.getPropertyOptions(t), !((i.hasChanged ?? F)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: r }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: o } = r, a = this[n];
        o !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[T("elementProperties")] = /* @__PURE__ */ new Map(), S[T("finalized")] = /* @__PURE__ */ new Map(), Bt?.({ ReactiveElement: S }), (z.reactiveElementVersions ??= []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, B = J.trustedTypes, lt = B ? B.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Q = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, tt = "?" + y, qt = `<${tt}>`, b = document, O = () => b.createComment(""), H = (s) => s === null || typeof s != "object" && typeof s != "function", et = Array.isArray, mt = (s) => et(s) || typeof s?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, dt = />/g, g = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, $t = /"/g, vt = /^(?:script|style|textarea|title)$/i, st = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), pe = st(1), fe = st(2), _e = st(3), _ = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), v = b.createTreeWalker(b, 129);
function bt(s, t) {
  if (!et(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const Et = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = x;
  for (let a = 0; a < e; a++) {
    const h = s[a];
    let c, u, l = -1, $ = 0;
    for (; $ < h.length && (o.lastIndex = $, u = o.exec(h), u !== null); ) $ = o.lastIndex, o === x ? u[1] === "!--" ? o = ct : u[1] !== void 0 ? o = dt : u[2] !== void 0 ? (vt.test(u[2]) && (n = RegExp("</" + u[2], "g")), o = g) : u[3] !== void 0 && (o = g) : o === g ? u[0] === ">" ? (o = n ?? x, l = -1) : u[1] === void 0 ? l = -2 : (l = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? g : u[3] === '"' ? $t : ut) : o === $t || o === ut ? o = g : o === ct || o === dt ? o = x : (o = g, n = void 0);
    const d = o === g && s[a + 1].startsWith("/>") ? " " : "";
    r += o === x ? h + qt : l >= 0 ? (i.push(c), h.slice(0, l) + Q + h.slice(l) + y + d) : h + y + (l === -2 ? a : d);
  }
  return [bt(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class N {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, h = this.parts, [c, u] = Et(t, e);
    if (this.el = N.createElement(c, i), v.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (n = v.nextNode()) !== null && h.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const l of n.getAttributeNames()) if (l.endsWith(Q)) {
          const $ = u[o++], d = n.getAttribute(l).split(y), f = /([.?@])?(.*)/.exec($);
          h.push({ type: 1, index: r, name: f[2], strings: d, ctor: f[1] === "." ? Ct : f[1] === "?" ? wt : f[1] === "@" ? Pt : R }), n.removeAttribute(l);
        } else l.startsWith(y) && (h.push({ type: 6, index: r }), n.removeAttribute(l));
        if (vt.test(n.tagName)) {
          const l = n.textContent.split(y), $ = l.length - 1;
          if ($ > 0) {
            n.textContent = B ? B.emptyScript : "";
            for (let d = 0; d < $; d++) n.append(l[d], O()), v.nextNode(), h.push({ type: 2, index: ++r });
            n.append(l[$], O());
          }
        }
      } else if (n.nodeType === 8) if (n.data === tt) h.push({ type: 2, index: r });
      else {
        let l = -1;
        for (; (l = n.data.indexOf(y, l + 1)) !== -1; ) h.push({ type: 7, index: r }), l += y.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = b.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(s, t, e = s, i) {
  if (t === _) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = H(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = E(s, n._$AS(s, t.values), n, i)), t;
}
let St = class {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? b).importNode(e, !0);
    v.currentNode = n;
    let r = v.nextNode(), o = 0, a = 0, h = i[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let c;
        h.type === 2 ? c = new w(r, r.nextSibling, this, t) : h.type === 1 ? c = new h.ctor(r, h.name, h.strings, this, t) : h.type === 6 && (c = new xt(r, this, t)), this._$AV.push(c), h = i[++a];
      }
      o !== h?.index && (r = v.nextNode(), o++);
    }
    return v.currentNode = b, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
};
class w {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), H(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== _ && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : mt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = N.createElement(bt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const r = new St(n, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    et(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t) n === e.length ? e.push(i = new w(this.O(O()), this.O(O()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = E(this, t, e, 0), o = !H(t) || t !== this._$AH && t !== _, o && (this._$AH = t);
    else {
      const a = t;
      let h, c;
      for (t = r[0], h = 0; h < r.length - 1; h++) c = E(this, a[i + h], e, h), c === _ && (c = this._$AH[h]), o ||= !H(c) || c !== this._$AH[h], c === p ? t = p : t !== p && (t += (c ?? "") + r[h + 1]), this._$AH[h] = c;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ct extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class wt extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Pt extends R {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? p) === _) return;
    const i = this._$AH, n = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== p && (i === p || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class xt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const zt = { M: Q, P: y, A: tt, C: 1, L: Et, R: St, D: mt, V: E, I: w, H: R, N: wt, U: Pt, B: Ct, F: xt }, Gt = J.litHtmlPolyfillSupport;
Gt?.(N, w), (J.litHtmlVersions ??= []).push("3.3.0");
const Vt = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = n = new w(t.insertBefore(O(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis;
let D = class extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return _;
  }
};
D._$litElement$ = !0, D.finalized = !0, it.litElementHydrateSupport?.({ LitElement: D });
const Wt = it.litElementPolyfillSupport;
Wt?.({ LitElement: D });
const ge = { _$AK: (s, t, e) => {
  s._$AK(t, e);
}, _$AL: (s) => s._$AL };
(it.litElementVersions ??= []).push("4.2.0");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = !1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ve = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kt = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: F }, Zt = (s = Kt, t, e) => {
  const { kind: i, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const h = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, h, s);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(a) {
      const h = this[o];
      t.call(this, a), this.requestUpdate(o, h, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Xt(s) {
  return (t, e) => typeof e == "object" ? Zt(s, t, e) : ((i, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function be(s) {
  return Xt({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ee(s) {
  return (t, e) => {
    const i = typeof t == "function" ? t : t[e];
    Object.assign(i, s);
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = (s, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(s, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Se(s, t) {
  return (e, i, n) => {
    const r = (o) => o.renderRoot?.querySelector(s) ?? null;
    if (t) {
      const { get: o, set: a } = typeof i == "object" ? e : n ?? (() => {
        const h = Symbol();
        return { get() {
          return this[h];
        }, set(c) {
          this[h] = c;
        } };
      })();
      return C(e, i, { get() {
        let h = o.call(this);
        return h === void 0 && (h = r(this), (h !== null || this.hasUpdated) && a.call(this, h)), h;
      } });
    }
    return C(e, i, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Yt;
function Ce(s) {
  return (t, e) => C(t, e, { get() {
    return (this.renderRoot ?? (Yt ??= document.createDocumentFragment())).querySelectorAll(s);
  } });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function we(s) {
  return (t, e) => C(t, e, { async get() {
    return await this.updateComplete, this.renderRoot?.querySelector(s) ?? null;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Pe(s) {
  return (t, e) => {
    const { slot: i, selector: n } = s ?? {}, r = "slot" + (i ? `[name=${i}]` : ":not([name])");
    return C(t, e, { get() {
      const o = this.renderRoot?.querySelector(r), a = o?.assignedElements(s) ?? [];
      return n === void 0 ? a : a.filter((h) => h.matches(n));
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function xe(s) {
  return (t, e) => {
    const { slot: i } = s ?? {}, n = "slot" + (i ? `[name=${i}]` : ":not([name])");
    return C(t, e, { get() {
      return this.renderRoot?.querySelector(n)?.assignedNodes(s) ?? [];
    } });
  };
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Ft } = zt, Jt = (s) => s === null || typeof s != "object" && typeof s != "function", Qt = (s) => s.strings === void 0, ft = () => document.createComment(""), M = (s, t, e) => {
  const i = s._$AA.parentNode, n = t === void 0 ? s._$AB : t._$AA;
  if (e === void 0) {
    const r = i.insertBefore(ft(), n), o = i.insertBefore(ft(), n);
    e = new Ft(r, o, s, s.options);
  } else {
    const r = e._$AB.nextSibling, o = e._$AM, a = o !== s;
    if (a) {
      let h;
      e._$AQ?.(s), e._$AM = s, e._$AP !== void 0 && (h = s._$AU) !== o._$AU && e._$AP(h);
    }
    if (r !== n || a) {
      let h = e._$AA;
      for (; h !== r; ) {
        const c = h.nextSibling;
        i.insertBefore(h, n), h = c;
      }
    }
  }
  return e;
}, m = (s, t, e = s) => (s._$AI(t, e), s), te = {}, ee = (s, t = te) => s._$AH = t, se = (s) => s._$AH, W = (s) => {
  s._$AP?.(!1, !0);
  let t = s._$AA;
  const e = s._$AB.nextSibling;
  for (; t !== e; ) {
    const i = t.nextSibling;
    t.remove(), t = i;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = { ATTRIBUTE: 1, CHILD: 2 }, P = (s) => (...t) => ({ _$litDirective$: s, values: t });
let L = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = (s, t) => {
  const e = s._$AN;
  if (e === void 0) return !1;
  for (const i of e) i._$AO?.(t, !1), U(i, t);
  return !0;
}, q = (s) => {
  let t, e;
  do {
    if ((t = s._$AM) === void 0) break;
    e = t._$AN, e.delete(s), s = t;
  } while (e?.size === 0);
}, Mt = (s) => {
  for (let t; t = s._$AM; s = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(s)) break;
    e.add(s), re(t);
  }
};
function ie(s) {
  this._$AN !== void 0 ? (q(this), this._$AM = s, Mt(this)) : this._$AM = s;
}
function ne(s, t = !1, e = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(i)) for (let r = e; r < i.length; r++) U(i[r], !1), q(i[r]);
  else i != null && (U(i, !1), q(i));
  else U(this, s);
}
const re = (s) => {
  s.type == k.CHILD && (s._$AP ??= ne, s._$AQ ??= ie);
};
class Tt extends L {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, i) {
    super._$AT(t, e, i), Mt(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (U(this, t), q(this));
  }
  setValue(t) {
    if (Qt(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = P(class extends L {
  constructor(s) {
    if (super(s), s.type !== k.ATTRIBUTE || s.name !== "class" || s.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return " " + Object.keys(s).filter((t) => s[t]).join(" ") + " ";
  }
  update(s, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), s.strings !== void 0 && (this.nt = new Set(s.strings.join(" ").split(/\s/).filter((i) => i !== "")));
      for (const i in t) t[i] && !this.nt?.has(i) && this.st.add(i);
      return this.render(t);
    }
    const e = s.element.classList;
    for (const i of this.st) i in t || (e.remove(i), this.st.delete(i));
    for (const i in t) {
      const n = !!t[i];
      n === this.st.has(i) || this.nt?.has(i) || (n ? (e.add(i), this.st.add(i)) : (e.remove(i), this.st.delete(i)));
    }
    return _;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = (s) => s ?? p;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* Oe(s, t) {
  if (s !== void 0) {
    let e = 0;
    for (const i of s) yield t(i, e++);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = () => new oe();
let oe = class {
};
const K = /* @__PURE__ */ new WeakMap(), Re = P(class extends Tt {
  render(s) {
    return p;
  }
  update(s, [t]) {
    const e = t !== this.G;
    return e && this.G !== void 0 && this.rt(void 0), (e || this.lt !== this.ct) && (this.G = t, this.ht = s.options?.host, this.rt(this.ct = s.element)), p;
  }
  rt(s) {
    if (this.isConnected || (s = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let e = K.get(t);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), K.set(t, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, s), s !== void 0 && this.G.call(this.ht, s);
    } else this.G.value = s;
  }
  get lt() {
    return typeof this.G == "function" ? K.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = (s, t, e) => {
  const i = /* @__PURE__ */ new Map();
  for (let n = t; n <= e; n++) i.set(s[n], n);
  return i;
}, ke = P(class extends L {
  constructor(s) {
    if (super(s), s.type !== k.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(s, t, e) {
    let i;
    e === void 0 ? e = t : t !== void 0 && (i = t);
    const n = [], r = [];
    let o = 0;
    for (const a of s) n[o] = i ? i(a, o) : o, r[o] = e(a, o), o++;
    return { values: r, keys: n };
  }
  render(s, t, e) {
    return this.dt(s, t, e).values;
  }
  update(s, [t, e, i]) {
    const n = se(s), { values: r, keys: o } = this.dt(t, e, i);
    if (!Array.isArray(n)) return this.ut = o, r;
    const a = this.ut ??= [], h = [];
    let c, u, l = 0, $ = n.length - 1, d = 0, f = r.length - 1;
    for (; l <= $ && d <= f; ) if (n[l] === null) l++;
    else if (n[$] === null) $--;
    else if (a[l] === o[d]) h[d] = m(n[l], r[d]), l++, d++;
    else if (a[$] === o[f]) h[f] = m(n[$], r[f]), $--, f--;
    else if (a[l] === o[f]) h[f] = m(n[l], r[f]), M(s, h[f + 1], n[l]), l++, f--;
    else if (a[$] === o[d]) h[d] = m(n[$], r[d]), M(s, n[l], n[$]), $--, d++;
    else if (c === void 0 && (c = _t(o, d, f), u = _t(a, l, $)), c.has(a[l])) if (c.has(a[$])) {
      const A = u.get(o[d]), G = A !== void 0 ? n[A] : null;
      if (G === null) {
        const nt = M(s, n[l]);
        m(nt, r[d]), h[d] = nt;
      } else h[d] = m(G, r[d]), M(s, n[l], G), n[A] = null;
      d++;
    } else W(n[$]), $--;
    else W(n[l]), l++;
    for (; d <= f; ) {
      const A = M(s, h[f + 1]);
      m(A, r[d]), h[d++] = A;
    }
    for (; l <= $; ) {
      const A = n[l++];
      A !== null && W(A);
    }
    return this.ut = o, ee(s, h), _;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = "important", he = " !" + Ut, Le = P(class extends L {
  constructor(s) {
    if (super(s), s.type !== k.ATTRIBUTE || s.name !== "style" || s.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return Object.keys(s).reduce((t, e) => {
      const i = s[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(s, [t]) {
    const { style: e } = s.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft) t[i] == null && (this.ft.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = null);
    for (const i in t) {
      const n = t[i];
      if (n != null) {
        this.ft.add(i);
        const r = typeof n == "string" && n.endsWith(he);
        i.includes("-") || r ? e.setProperty(i, r ? n.slice(0, -11) : n, r ? Ut : "") : e[i] = n;
      }
    }
    return _;
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Z extends L {
  constructor(t) {
    if (super(t), this.it = p, t.type !== k.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === p || t == null) return this._t = void 0, this.it = t;
    if (t === _) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
Z.directiveName = "unsafeHTML", Z.resultType = 1;
const je = P(Z);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ae {
  constructor(t) {
    this.G = t;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(t) {
    this.G = t;
  }
  deref() {
    return this.G;
  }
}
class le {
  constructor() {
    this.Y = void 0, this.Z = void 0;
  }
  get() {
    return this.Y;
  }
  pause() {
    this.Y ??= new Promise((t) => this.Z = t);
  }
  resume() {
    this.Z?.(), this.Y = this.Z = void 0;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = (s) => !Jt(s) && typeof s.then == "function", yt = 1073741823;
class ce extends Tt {
  constructor() {
    super(...arguments), this._$Cwt = yt, this._$Cbt = [], this._$CK = new ae(this), this._$CX = new le();
  }
  render(...t) {
    return t.find((e) => !At(e)) ?? _;
  }
  update(t, e) {
    const i = this._$Cbt;
    let n = i.length;
    this._$Cbt = e;
    const r = this._$CK, o = this._$CX;
    this.isConnected || this.disconnected();
    for (let a = 0; a < e.length && !(a > this._$Cwt); a++) {
      const h = e[a];
      if (!At(h)) return this._$Cwt = a, h;
      a < n && h === i[a] || (this._$Cwt = yt, n = 0, Promise.resolve(h).then(async (c) => {
        for (; o.get(); ) await o.get();
        const u = r.deref();
        if (u !== void 0) {
          const l = u._$Cbt.indexOf(h);
          l > -1 && l < u._$Cwt && (u._$Cwt = l, u.setValue(c));
        }
      }));
    }
    return _;
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
}
const De = P(ce);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ie(s, t, e) {
  return s ? t(s) : e?.(s);
}
export {
  Tt as AsyncDirective,
  gt as CSSResult,
  D as LitElement,
  S as ReactiveElement,
  Z as UnsafeHTMLDirective,
  ce as UntilDirective,
  ge as _$LE,
  zt as _$LH,
  Ht as adoptStyles,
  Te as classMap,
  He as createRef,
  ue as css,
  ve as customElement,
  I as defaultConverter,
  P as directive,
  Ee as eventOptions,
  ot as getCompatibleStyle,
  pe as html,
  Ue as ifDefined,
  me as isServer,
  Oe as map,
  _e as mathml,
  _ as noChange,
  F as notEqual,
  p as nothing,
  Xt as property,
  Se as query,
  Ce as queryAll,
  Pe as queryAssignedElements,
  xe as queryAssignedNodes,
  we as queryAsync,
  Re as ref,
  Vt as render,
  ke as repeat,
  Zt as standardProperty,
  be as state,
  Le as styleMap,
  X as supportsAdoptingStyleSheets,
  fe as svg,
  Ot as unsafeCSS,
  je as unsafeHTML,
  De as until,
  Ie as when
};
//# sourceMappingURL=index.js.map
