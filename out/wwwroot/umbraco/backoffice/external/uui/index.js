/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fr = globalThis, xn = Fr.ShadowRoot && (Fr.ShadyCSS === void 0 || Fr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $n = Symbol(), oa = /* @__PURE__ */ new WeakMap();
let pl = class {
  constructor(t, i, o) {
    if (this._$cssResult$ = !0, o !== $n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (xn && t === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (t = oa.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && oa.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const yt = (e) => new pl(typeof e == "string" ? e : e + "", void 0, $n), p = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((o, r, s) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[s + 1], e[0]);
  return new pl(i, e, $n);
}, ac = (e, t) => {
  if (xn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const o = document.createElement("style"), r = Fr.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = i.cssText, e.appendChild(o);
  }
}, sa = xn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const o of t.cssRules) i += o.cssText;
  return yt(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: lc, defineProperty: uc, getOwnPropertyDescriptor: cc, getOwnPropertyNames: hc, getOwnPropertySymbols: dc, getPrototypeOf: pc } = Object, Wo = globalThis, na = Wo.trustedTypes, vc = na ? na.emptyScript : "", fc = Wo.reactiveElementPolyfillSupport, Ki = (e, t) => e, uo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? vc : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, kn = (e, t) => !lc(e, t), aa = { attribute: !0, type: String, converter: uo, reflect: !1, useDefault: !1, hasChanged: kn };
Symbol.metadata ??= Symbol("metadata"), Wo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Xt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = aa) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(t, o, i);
      r !== void 0 && uc(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, o) {
    const { get: r, set: s } = cc(this.prototype, t) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: r, set(n) {
      const u = r?.call(this);
      s?.call(this, n), this.requestUpdate(t, u, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? aa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ki("elementProperties"))) return;
    const t = pc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ki("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ki("properties"))) {
      const i = this.properties, o = [...hc(i), ...dc(i)];
      for (const r of o) this.createProperty(r, i[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [o, r] of i) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const r = this._$Eu(i, o);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const r of o) i.unshift(sa(r));
    } else t !== void 0 && i.push(sa(t));
    return i;
  }
  static _$Eu(t, i) {
    const o = i.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
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
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const o of i.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ac(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, o) {
    this._$AK(t, o);
  }
  _$ET(t, i) {
    const o = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, o);
    if (r !== void 0 && o.reflect === !0) {
      const s = (o.converter?.toAttribute !== void 0 ? o.converter : uo).toAttribute(i, o.type);
      this._$Em = t, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const o = this.constructor, r = o._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const s = o.getPropertyOptions(r), n = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : uo;
      this._$Em = r, this[r] = n.fromAttribute(i, s.type) ?? this._$Ej?.get(r) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, i, o) {
    if (t !== void 0) {
      const r = this.constructor, s = this[t];
      if (o ??= r.getPropertyOptions(t), !((o.hasChanged ?? kn)(s, i) || o.useDefault && o.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, o)))) return;
      this.C(t, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: o, reflect: r, wrapped: s }, n) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? i ?? this[t]), s !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (i = void 0), this._$AL.set(t, i)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
        for (const [r, s] of this._$Ep) this[r] = s;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, s] of o) {
        const { wrapped: n } = s, u = this[r];
        n !== !0 || this._$AL.has(r) || u === void 0 || this.C(r, void 0, s, u);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Xt.elementStyles = [], Xt.shadowRootOptions = { mode: "open" }, Xt[Ki("elementProperties")] = /* @__PURE__ */ new Map(), Xt[Ki("finalized")] = /* @__PURE__ */ new Map(), fc?.({ ReactiveElement: Xt }), (Wo.reactiveElementVersions ??= []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Cn = globalThis, co = Cn.trustedTypes, la = co ? co.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, vl = "$lit$", at = `lit$${Math.random().toFixed(9).slice(2)}$`, fl = "?" + at, bc = `<${fl}>`, Mt = document, or = () => Mt.createComment(""), sr = (e) => e === null || typeof e != "object" && typeof e != "function", En = Array.isArray, gc = (e) => En(e) || typeof e?.[Symbol.iterator] == "function", hs = `[ 	
\f\r]`, Vi = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ua = /-->/g, ca = />/g, Ct = RegExp(`>|${hs}(?:([^\\s"'>=/]+)(${hs}*=${hs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ha = /'/g, da = /"/g, bl = /^(?:script|style|textarea|title)$/i, gl = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), l = gl(1), b = gl(2), se = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), pa = /* @__PURE__ */ new WeakMap(), At = Mt.createTreeWalker(Mt, 129);
function ml(e, t) {
  if (!En(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return la !== void 0 ? la.createHTML(t) : t;
}
const mc = (e, t) => {
  const i = e.length - 1, o = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Vi;
  for (let u = 0; u < i; u++) {
    const c = e[u];
    let h, m, f = -1, C = 0;
    for (; C < c.length && (n.lastIndex = C, m = n.exec(c), m !== null); ) C = n.lastIndex, n === Vi ? m[1] === "!--" ? n = ua : m[1] !== void 0 ? n = ca : m[2] !== void 0 ? (bl.test(m[2]) && (r = RegExp("</" + m[2], "g")), n = Ct) : m[3] !== void 0 && (n = Ct) : n === Ct ? m[0] === ">" ? (n = r ?? Vi, f = -1) : m[1] === void 0 ? f = -2 : (f = n.lastIndex - m[2].length, h = m[1], n = m[3] === void 0 ? Ct : m[3] === '"' ? da : ha) : n === da || n === ha ? n = Ct : n === ua || n === ca ? n = Vi : (n = Ct, r = void 0);
    const x = n === Ct && e[u + 1].startsWith("/>") ? " " : "";
    s += n === Vi ? c + bc : f >= 0 ? (o.push(h), c.slice(0, f) + vl + c.slice(f) + at + x) : c + at + (f === -2 ? u : x);
  }
  return [ml(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
let Is = class _l {
  constructor({ strings: t, _$litType$: i }, o) {
    let r;
    this.parts = [];
    let s = 0, n = 0;
    const u = t.length - 1, c = this.parts, [h, m] = mc(t, i);
    if (this.el = _l.createElement(h, o), At.currentNode = this.el.content, i === 2 || i === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (r = At.nextNode()) !== null && c.length < u; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const f of r.getAttributeNames()) if (f.endsWith(vl)) {
          const C = m[n++], x = r.getAttribute(f).split(at), O = /([.?@])?(.*)/.exec(C);
          c.push({ type: 1, index: s, name: O[2], strings: x, ctor: O[1] === "." ? yc : O[1] === "?" ? wc : O[1] === "@" ? xc : Go }), r.removeAttribute(f);
        } else f.startsWith(at) && (c.push({ type: 6, index: s }), r.removeAttribute(f));
        if (bl.test(r.tagName)) {
          const f = r.textContent.split(at), C = f.length - 1;
          if (C > 0) {
            r.textContent = co ? co.emptyScript : "";
            for (let x = 0; x < C; x++) r.append(f[x], or()), At.nextNode(), c.push({ type: 2, index: ++s });
            r.append(f[C], or());
          }
        }
      } else if (r.nodeType === 8) if (r.data === fl) c.push({ type: 2, index: s });
      else {
        let f = -1;
        for (; (f = r.data.indexOf(at, f + 1)) !== -1; ) c.push({ type: 7, index: s }), f += at.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const o = Mt.createElement("template");
    return o.innerHTML = t, o;
  }
};
function li(e, t, i = e, o) {
  if (t === se) return t;
  let r = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const s = sr(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(e), r._$AT(e, i, o)), o !== void 0 ? (i._$Co ??= [])[o] = r : i._$Cl = r), r !== void 0 && (t = li(e, r._$AS(e, t.values), r, o)), t;
}
let _c = class {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: o } = this._$AD, r = (t?.creationScope ?? Mt).importNode(i, !0);
    At.currentNode = r;
    let s = At.nextNode(), n = 0, u = 0, c = o[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let h;
        c.type === 2 ? h = new xi(s, s.nextSibling, this, t) : c.type === 1 ? h = new c.ctor(s, c.name, c.strings, this, t) : c.type === 6 && (h = new $c(s, this, t)), this._$AV.push(h), c = o[++u];
      }
      n !== c?.index && (s = At.nextNode(), n++);
    }
    return At.currentNode = Mt, r;
  }
  p(t) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, i), i += o.strings.length - 2) : o._$AI(t[i])), i++;
  }
};
class xi {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, o, r) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = li(this, t, i), sr(t) ? t === k || t == null || t === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : t !== this._$AH && t !== se && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : gc(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== k && sr(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Mt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: o } = t, r = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = Is.createElement(ml(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new _c(r, this), n = s.u(this.options);
      s.p(i), this.T(n), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = pa.get(t.strings);
    return i === void 0 && pa.set(t.strings, i = new Is(t)), i;
  }
  k(t) {
    En(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, r = 0;
    for (const s of t) r === i.length ? i.push(o = new xi(this.O(or()), this.O(or()), this, this.options)) : o = i[r], o._$AI(s), r++;
    r < i.length && (this._$AR(o && o._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t && t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
let Go = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, o, r, s) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = s, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = k;
  }
  _$AI(t, i = this, o, r) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) t = li(this, t, i, 0), n = !sr(t) || t !== this._$AH && t !== se, n && (this._$AH = t);
    else {
      const u = t;
      let c, h;
      for (t = s[0], c = 0; c < s.length - 1; c++) h = li(this, u[o + c], i, c), h === se && (h = this._$AH[c]), n ||= !sr(h) || h !== this._$AH[c], h === k ? t = k : t !== k && (t += (h ?? "") + s[c + 1]), this._$AH[c] = h;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}, yc = class extends Go {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === k ? void 0 : t;
  }
};
class wc extends Go {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== k);
  }
}
class xc extends Go {
  constructor(t, i, o, r, s) {
    super(t, i, o, r, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = li(this, t, i, 0) ?? k) === se) return;
    const o = this._$AH, r = t === k && o !== k || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, s = t !== k && (o === k || r);
    r && this.element.removeEventListener(this.name, this, o), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class $c {
  constructor(t, i, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    li(this, t);
  }
}
const kc = { I: xi }, Cc = Cn.litHtmlPolyfillSupport;
Cc?.(Is, xi), (Cn.litHtmlVersions ??= []).push("3.3.0");
const Ec = (e, t, i) => {
  const o = i?.renderBefore ?? t;
  let r = o._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    o._$litPart$ = r = new xi(t.insertBefore(or(), s), s, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pn = globalThis;
let v = class extends Xt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ec(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return se;
  }
};
v._$litElement$ = !0, v.finalized = !0, Pn.litElementHydrateSupport?.({ LitElement: v });
const Pc = Pn.litElementPolyfillSupport;
Pc?.({ LitElement: v });
(Pn.litElementVersions ??= []).push("4.2.0");
var Sc = `.uui-h1,
.uui-h2,
.uui-h3,
.uui-h4,
.uui-h5,
.uui-a,
.uui-p,
.uui-p-lead,
.uui-small,
.uui-quoteblock,
.uui-ul,
.uui-ol,
.uui-text {
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 21px;
  -webkit-font-smoothing: antialiased;
}

.uui-text h1,
.uui-h1.uui-h1 {
  font-size: var(--uui-type-h1-size,60px);
  line-height: var(--uui-size-layout-4,66px);
  font-weight: 300;
  margin-left: -5px;
  margin-top: var(--uui-size-layout-1,24px);
  margin-bottom: var(--uui-size-layout-1,24px);
}

.uui-text p + h1,
.uui-text p + .uui-h1 {
  margin-top: var(--uui-size-layout-4,66px);
}

.uui-text h1.--no-top-margin,
.uui-text h1:first-child,
.uui-h1.--no-top-margin,
.uui-h1:first-child {
  margin-top: 0;
}

.uui-text h2,
.uui-h2.uui-h2 {
  font-size: var(--uui-type-h2-size,42px);
  line-height: var(--uui-size-layout-3,42px);
  font-weight: 300;
  margin-left: -3px;
  margin-top: var(--uui-size-layout-1,24px);
  margin-bottom: var(--uui-size-layout-1,24px);
}

.uui-text p + h2,
.uui-text p + .uui-h2 {
  margin-top: var(--uui-size-layout-3,42px);
}

.uui-text h2.--no-top-margin,
.uui-text h2:first-child,
.uui-h2.--no-top-margin,
.uui-h2:first-child {
  margin-top: 0;
}

.uui-text h3,
.uui-h3.uui-h3 {
  font-size: var(--uui-type-h3-size,30px);
  line-height: var(--uui-size-large);
  font-weight: 300;
  margin-left: -2px;
  margin-top: var(--uui-size-layout-1,24px);
  margin-bottom: var(--uui-size-layout-1,24px);
}

.uui-text h3.--no-top-margin,
.uui-text h3:first-child,
.uui-h3.--no-top-margin,
.uui-h3:first-child {
  margin-top: 0;
}

.uui-text h4,
.uui-h4.uui-h4 {
  font-size: var(--uui-type-h4-size,21px);
  line-height: 21px;
  font-weight: 400;
  margin-left: -1px;
  margin-top: var(--uui-size-layout-1,24px);
  margin-bottom: var(--uui-size-layout-1,24px);
}

.uui-text h4.--no-top-margin,
.uui-text h4:first-child,
.uui-h4.--no-top-margin,
.uui-h4:first-child {
  margin-top: 0;
}

.uui-text h5,
.uui-h5.uui-h5 {
  font-size: var(--uui-type-h5-size,14px);
  line-height: inherit;
  font-weight: 700;
  margin-left: 0;
  margin-top: var(--uui-size-layout-1,24px);
  margin-bottom: 0;
}

.uui-text h5.--no-top-margin,
.uui-text h5:first-child,
.uui-h5.--no-top-margin,
.uui-h5:first-child {
  margin-top: 0;
}

.uui-p,
.uui-text p {
  margin-top: var(--uui-size-layout-1,24px);
  margin-bottom: var(--uui-size-layout-1,24px);
}

.uui-p-lead,
.uui-text p.uui-lead {
  font-size: var(--uui-size-6,18px);
  line-height: var(--uui-size-8,24px);
}

.uui-a,
.uui-text a {
  color: var(--uui-color-interactive,#1b264f);
}

.uui-a:link,
.uui-a:active .uui-text a:link,
.uui-text a:active {
  color: var(--uui-color-interactive,#1b264f);
}

.uui-a:hover,
.uui-text a:hover {
  color: var(--uui-color-interactive-emphasis,#3544b1);
}

.uui-small,
.uui-text small {
  display: inline-block;
  font-size: var(--uui-type-small-size,12px);
  line-height: 18px;
}

.uui-quoteblock,
.uui-text blockquote {
  float: right;
  font-size: 14px;
  line-height: inherit;
  font-weight: 700;
  font-style: italic;
  margin-top: 0;
  margin-bottom: var(--uui-size-layout-1,24px);
  margin-right: -0.035em;
  max-width: 16em;
  quotes: '“' '”' '‘' '’';
}

.uui-quoteblock:before,
.uui-text blockquote:before {
  content: open-quote;
  margin-left: -0.4em;
  margin-right: 0.08em;
  vertical-align: bottom;
  font-weight: 400;
  font-size: 2em;
}

.uui-quoteblock:after,
.uui-text blockquote:after {
  content: close-quote;
  margin-left: 0.04em;
  margin-right: -0.4em;
  vertical-align: bottom;
  font-weight: 400;
  font-size: 2em;
  margin-bottom: -2px;
  display: inline-block;
}

.uui-ul,
.uui-text ul {
  list-style-type: square;
  padding-left: var(--uui-size-layout-1,24px);
  margin-top: var(--uui-size-layout-1,24px);
  margin-bottom: var(--uui-size-layout-1,24px);
}

.uui-ol,
.uui-text ol {
  padding-left: var(--uui-size-layout-1,24px);
  margin-top: var(--uui-size-layout-1,24px);
  margin-bottom: var(--uui-size-layout-1,24px);
}
`;
const _r = yt(Sc);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oc = { attribute: !0, type: String, converter: uo, reflect: !1, hasChanged: kn }, Ic = (e = Oc, t, i) => {
  const { kind: o, metadata: r } = i;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), o === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), o === "accessor") {
    const { name: n } = i;
    return { set(u) {
      const c = t.get.call(this);
      t.set.call(this, u), this.requestUpdate(n, c, e);
    }, init(u) {
      return u !== void 0 && this.C(n, void 0, e, u), u;
    } };
  }
  if (o === "setter") {
    const { name: n } = i;
    return function(u) {
      const c = this[n];
      t.call(this, u), this.requestUpdate(n, c, e);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function a(e) {
  return (t, i) => typeof i == "object" ? Ic(e, t, i) : ((o, r, s) => {
    const n = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, o), n ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function g(e) {
  return a({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Sn = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(e, t) {
  return (i, o, r) => {
    const s = (n) => n.renderRoot?.querySelector(e) ?? null;
    return Sn(i, o, { get() {
      return s(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Ac;
function Uc(e) {
  return (t, i) => Sn(t, i, { get() {
    return (this.renderRoot ?? (Ac ??= document.createDocumentFragment())).querySelectorAll(e);
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function wt(e) {
  return (t, i) => {
    const { slot: o, selector: r } = e ?? {}, s = "slot" + (o ? `[name=${o}]` : ":not([name])");
    return Sn(t, i, { get() {
      const n = this.renderRoot?.querySelector(s), u = n?.assignedElements(e) ?? [];
      return r === void 0 ? u : u.filter((c) => c.matches(r));
    } });
  };
}
const p0 = p`
  @keyframes uui-blink {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`, v0 = yt("uui-blink 0.9s infinite both"), f0 = p`
  @keyframes pulse {
    0% {
      -webkit-transform: translate(-50%, -50%) scale(0.2);
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0.9;
    }
    80% {
      -webkit-transform: translate(-50%, -50%) scale(1.2);
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate(-50%, -50%) scale(2.2);
      transform: translate(-50%, -50%) scale(2.2);
      opacity: 0;
    }
  }
`, b0 = yt(
  "pulse 0.8s ease-in-out infinite both"
), g0 = p`
  @keyframes uui-horizontal-shake {
    10%,
    90% {
      transform: translateX(-1px);
    }

    20%,
    80% {
      transform: translateX(1px);
    }

    30%,
    50%,
    70% {
      transform: translateX(-2px);
    }

    40%,
    60% {
      transform: translateX(2px);
    }
  }
`, m0 = yt(
  "uui-horizontal-shake 600ms ease backwards"
);
let yl = class extends Event {
  constructor(t, i = {}) {
    super(t, { ...i }), this.detail = i.detail || {};
  }
}, Wt = class extends yl {
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
  static {
    this.VALID = "valid";
  }
  static {
    this.INVALID = "invalid";
  }
}, Pr = class extends yl {
  static {
    this.SELECTED = "selected";
  }
  static {
    this.DESELECTED = "deselected";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      cancelable: !0,
      ...i
    });
  }
};
var zc = Object.defineProperty, Mc = (e, t, i, o) => {
  for (var r = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(t, i, r) || r);
  return r && zc(t, i, r), r;
};
const x0 = (e) => {
  class t extends e {
    constructor() {
      super(...arguments), this.active = !1;
    }
  }
  return Mc([
    a({ type: Boolean, reflect: !0 })
  ], t.prototype, "active"), t;
};
var Dc = Object.defineProperty, va = (e, t, i, o) => {
  for (var r = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(t, i, r) || r);
  return r && Dc(t, i, r), r;
};
const $0 = (e, t) => {
  class i extends t {
    constructor() {
      super(...arguments), this._labelSlotHasContent = !1;
    }
    firstUpdated(r) {
      super.firstUpdated(r), this.label || console.warn(this.tagName + " needs a `label`", this);
    }
    labelSlotChanged(r) {
      this._labelSlotHasContent = r.target.assignedNodes({ flatten: !0 }).length > 0;
    }
    /**
     * Call in the mixed element to render the label template. It contains a slot. This is optional.
     * @method renderLabel
     * @returns {TemplateResult}
     */
    renderLabel() {
      return l`
        ${this._labelSlotHasContent === !1 ? l`<span class="label">${this.label}</span>` : ""}
        <slot
          class="label"
          style=${this._labelSlotHasContent ? "" : "display: none"}
          name=${e || ""}
          @slotchange=${this.labelSlotChanged}></slot>
      `;
    }
  }
  return va([
    a({ type: String })
  ], i.prototype, "label"), va([
    g()
  ], i.prototype, "_labelSlotHasContent"), i;
};
var Lc = Object.defineProperty, Tc = Object.getOwnPropertyDescriptor, fa = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Tc(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Lc(t, i, r), r;
};
const k0 = (e) => {
  class t extends e {
    constructor(...o) {
      super(...o), this._selectable = !1, this.deselectable = !0, this.selected = !1, this.#e = this, this.#i = (r) => {
        r.code !== "Space" && r.code !== "Enter" || r.composedPath().indexOf(this.#e) === 0 && this.#t(r);
      }, this.#t = (r) => {
        if ((this._selectable || this.deselectable && this.selected) === !1) return;
        const n = r.composedPath();
        this.#e === this && n.some((c) => {
          const h = c.tagName;
          return h === "A" || h === "BUTTON" || h === "INPUT" || h === "TEXTAREA" || h === "SELECT";
        }) || n.indexOf(this.#e) !== -1 && (r.type === "keydown" && r.preventDefault(), this.#o());
      }, this.addEventListener("click", this.#t), this.addEventListener("keydown", this.#i);
    }
    get selectable() {
      return this._selectable;
    }
    set selectable(o) {
      const r = this._selectable;
      r !== o && (this._selectable = o, this.#e === this && this.#e.setAttribute(
        "tabindex",
        `${o ? "0" : "-1"}`
      ), this.requestUpdate("selectable", r));
    }
    #e;
    get selectableTarget() {
      return this.#e;
    }
    set selectableTarget(o) {
      const r = this.#e;
      r.removeAttribute("tabindex"), r.removeEventListener("click", this.#t), r.removeEventListener(
        "keydown",
        this.#i
      ), this.#e = o, this.#e === this && this.#e.setAttribute(
        "tabindex",
        this._selectable ? "0" : "-1"
      ), o.addEventListener("click", this.#t), o.addEventListener("keydown", this.#i);
    }
    #i;
    #t;
    #o() {
      this.selectable && (this.deselectable === !1 ? this.#r() : this.selected ? this.#s() : this.#r());
    }
    #r() {
      if (!this.selectable) return;
      const o = new Pr(Pr.SELECTED);
      this.dispatchEvent(o), !o.defaultPrevented && (this.selected = !0);
    }
    #s() {
      if (!this.deselectable) return;
      const o = new Pr(Pr.DESELECTED);
      this.dispatchEvent(o), !o.defaultPrevented && (this.selected = !1);
    }
  }
  return fa([
    a({ type: Boolean, reflect: !0 })
  ], t.prototype, "selectable", 1), fa([
    a({ type: Boolean, reflect: !0 })
  ], t.prototype, "selected", 2), t;
};
var Nc = Object.defineProperty, Vc = Object.getOwnPropertyDescriptor, Bc = (e, t, i, o) => {
  for (var r = Vc(t, i), s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(t, i, r) || r);
  return r && Nc(t, i, r), r;
};
const C0 = (e) => {
  class t extends e {
    constructor() {
      super(...arguments), this._selectOnly = !1;
    }
    get selectOnly() {
      return this._selectOnly;
    }
    set selectOnly(o) {
      const r = this._selectOnly;
      this._selectOnly = o, this.requestUpdate("selectOnly", r);
    }
  }
  return Bc([
    a({ type: Boolean, reflect: !0, attribute: "select-only" })
  ], t.prototype, "selectOnly"), t;
};
var Hc = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, Et = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? jc(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Hc(t, i, r), r;
};
const Rc = [
  "customError",
  "valueMissing",
  "badInput",
  "typeMismatch",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort"
], E0 = (e, t) => {
  class i extends e {
    constructor(...r) {
      super(...r), this.name = "", this.#e = {}, this._pristine = !1, this.required = !1, this.requiredMessage = "This field is required", this.error = !1, this.errorMessage = "This field is invalid", this.#i = t, this.#t = null, this.#o = [], this.#r = [], this.#n = () => {
        this.pristine = !1;
      }, this._internals = this.attachInternals(), this.pristine = !0, this.addValidator(
        "valueMissing",
        () => this.requiredMessage,
        () => this.hasAttribute("required") && this.hasValue() === !1
      ), this.addValidator(
        "customError",
        () => this.errorMessage,
        () => this.error
      ), this.addEventListener("blur", () => {
        this.pristine = !1, this.checkValidity();
      });
    }
    static {
      this.formAssociated = !0;
    }
    // Do not 'reflect' as the attribute is used as fallback.
    get value() {
      return this.#i;
    }
    set value(r) {
      const s = this.#i;
      this.#i = r, "ElementInternals" in window && "setFormValue" in window.ElementInternals.prototype && this._internals.setFormValue(this.#i ?? null), this.requestUpdate("value", s);
    }
    #e;
    set pristine(r) {
      this._pristine !== r && (this._pristine = r, r ? this.setAttribute("pristine", "") : this.removeAttribute("pristine"), this.#a());
    }
    get pristine() {
      return this._pristine;
    }
    #i;
    #t;
    #o;
    #r;
    /**
     * Determine wether this FormControl has a value.
     * @method hasValue
     * @returns {boolean}
     */
    hasValue() {
      return this.value !== this.getDefaultValue();
    }
    /**
     * Focus first element that is invalid.
     * @method focusFirstInvalidElement
     * @returns {HTMLElement | undefined}
     */
    focusFirstInvalidElement() {
      const r = this.#r.find(
        (s) => s.validity.valid === !1
      );
      r ? "focusFirstInvalidElement" in r ? r.focusFirstInvalidElement() : r.focus() : this.focus();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this.#s();
    }
    #s() {
      this.#t && this.#t.removeEventListener("submit", this.#n);
    }
    /**
     * Add validator, to validate this Form Control.
     * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState for available Validator FlagTypes.
     *
     * @example
     * this.addValidator(
     *  'tooLong',
     *  () => 'This input contains too many characters',
     *  () => this._value.length > 10
     * );
     * @method hasValue
     * @param {FlagTypes} flagKey the type of validation.
     * @param {method} getMessageMethod method to retrieve relevant message. Is executed every time the validator is re-executed.
     * @param {method} checkMethod method to determine if this validator should invalidate this form control. Return true if this should prevent submission.
     */
    addValidator(r, s, n) {
      const u = {
        flagKey: r,
        getMessageMethod: s,
        checkMethod: n,
        weight: Rc.indexOf(r)
      };
      return this.#o.push(u), this.#o.sort(
        (c, h) => c.weight > h.weight ? 1 : h.weight > c.weight ? -1 : 0
      ), u;
    }
    removeValidator(r) {
      const s = this.#o.indexOf(r);
      s !== -1 && this.#o.splice(s, 1);
    }
    /**
     * @method addFormControlElement
     * @description Important notice if adding a native form control then ensure that its value and thereby validity is updated when value is changed from the outside.
     * @param element {NativeFormControlElement} - element to validate and include as part of this form association.
     */
    addFormControlElement(r) {
      this.#r.push(r), r.addEventListener(Wt.INVALID, () => {
        this._runValidators();
      }), r.addEventListener(Wt.VALID, () => {
        this._runValidators();
      }), this._pristine === !1 && (r.checkValidity(), this._runValidators());
    }
    /**
     * @method setCustomValidity
     * @description Set custom validity state, set to empty string to remove the custom message.
     * @param message {string} - The message to be shown
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity|HTMLObjectElement:setCustomValidity}
     */
    setCustomValidity(r) {
      this._customValidityObject && this.removeValidator(this._customValidityObject), r != null && r !== "" && (this._customValidityObject = this.addValidator(
        "customError",
        () => r,
        () => !0
      )), this._runValidators();
    }
    /**
     * @protected
     * @method _runValidators
     * @description Run all validators and set the validityState of this form control.
     * Run this method when you want to re-run all validators.
     * This can be relevant if you have a validators that is using values that is not triggering the Lit Updated Callback.
     * Such are mainly properties that are not declared as a Lit state and or Lit property.
     */
    _runValidators() {
      this.#e = {};
      let r, s;
      this.#o.some((u) => u.checkMethod() ? (this.#e[u.flagKey] = !0, r = u.getMessageMethod(), !0) : !1), r || this.#r.some((u) => {
        let c;
        for (c in u.validity)
          if (c !== "valid" && u.validity[c])
            return this.#e[c] = !0, r = u.validationMessage, s ??= u, !0;
        return !1;
      });
      const n = Object.values(this.#e).includes(!0);
      this.#e.valid = !n, this._internals.setValidity(
        this.#e,
        // Turn messages into an array and join them with a comma. [NL]:
        //[...messages].join(', '),
        r,
        s ?? this.getFormElement() ?? void 0
      ), this.#a();
    }
    #a() {
      this._pristine !== !0 && (this.#e.valid ? this.dispatchEvent(new Wt(Wt.VALID)) : this.dispatchEvent(
        new Wt(Wt.INVALID)
      ));
    }
    updated(r) {
      super.updated(r), this._runValidators();
    }
    #n;
    submit() {
      this.#t?.requestSubmit();
    }
    formAssociatedCallback() {
      this.#s(), this.#t = this._internals.form, this.#t && (this.#t.hasAttribute("submit-invalid") && (this.pristine = !1), this.#t.addEventListener("submit", this.#n));
    }
    formResetCallback() {
      this.pristine = !0, this.value = this.getInitialValue() ?? this.getDefaultValue();
    }
    getDefaultValue() {
      return t;
    }
    getInitialValue() {
      return this.getAttribute("value");
    }
    checkValidity() {
      this.pristine = !1, this._runValidators();
      for (const r in this.#r)
        if (this.#r[r].checkValidity() === !1)
          return !1;
      return this._internals?.checkValidity();
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
    get validity() {
      return this.#e;
    }
    get validationMessage() {
      return this._internals?.validationMessage;
    }
  }
  return Et([
    a({ type: String })
  ], i.prototype, "name", 2), Et([
    a()
  ], i.prototype, "value", 1), Et([
    a({ type: Boolean, reflect: !0, attribute: "pristine" })
  ], i.prototype, "pristine", 1), Et([
    a({ type: Boolean, reflect: !0 })
  ], i.prototype, "required", 2), Et([
    a({ type: String, attribute: "required-message" })
  ], i.prototype, "requiredMessage", 2), Et([
    a({ type: Boolean, reflect: !0 })
  ], i.prototype, "error", 2), Et([
    a({ type: String, attribute: "error-message" })
  ], i.prototype, "errorMessage", 2), i;
};
let P0 = class {
  constructor(t, i) {
    this._callback = t, this._timerId = null, this._remaining = null, this._onComplete = () => {
      this._remaining = null, this._callback();
    }, this.setDuration(i);
  }
  setDuration(t) {
    this._duration = t, this._timerId !== null && this.restart();
  }
  /** starts the timer */
  start() {
    this._timerId === null && this.resume();
  }
  /** restarts the timer by setting remaining time to duration. */
  restart() {
    this._remaining = this._duration, this.resume();
  }
  pause() {
    this._timerId !== null && (window.clearTimeout(this._timerId), this._timerId = null, this._remaining !== null && (this._remaining -= Date.now() - this._startTime));
  }
  resume() {
    this._timerId !== null && window.clearTimeout(this._timerId), this._remaining === null && (this._remaining = this._duration), this._startTime = Date.now(), this._timerId = window.setTimeout(this._onComplete, this._remaining);
  }
  destroy() {
    this.pause();
  }
};
const O0 = (e, t, i = `This element has to be present for ${e.nodeName} to work appropriate.`) => {
  customElements.get(t) || console.warn(
    `%c ${e.nodeName} requires ${t} element to be registered!`,
    "font-weight: bold;",
    i,
    e
  );
}, I0 = (e, t) => {
  function i(r) {
    const s = e.getBoundingClientRect(), n = e.ownerDocument.defaultView, u = s.left + n.scrollX, c = s.top + n.scrollY;
    let h;
    if ("TouchEvent" in window && r instanceof TouchEvent)
      h = r.touches[0];
    else if (r instanceof MouseEvent)
      h = r;
    else
      return;
    const m = h.pageX - u, f = h.pageY - c;
    t?.onMove && t.onMove(m, f);
  }
  function o() {
    document.removeEventListener("pointermove", i), document.removeEventListener("pointerup", o), t?.onStop && t.onStop();
  }
  document.addEventListener("pointermove", i, { passive: !0 }), document.addEventListener("pointerup", o), t?.initialEvent && i(t.initialEvent);
}, A0 = (e, t, i) => Math.min(Math.max(e, t), i), U0 = (e, t, i) => i + t - e, z0 = (e) => {
  const t = Math.round(e).toString(16);
  return t.length === 1 ? `0${t}` : t;
}, Fc = (e, t, i) => {
  let o = e;
  for (; o !== null; ) {
    const r = o instanceof HTMLElement && o.hasAttribute(t) && o.getAttribute(t) === i, s = o.querySelector(`[${t}="${i}"]`) !== null;
    if (r)
      return o;
    if (s)
      return o.querySelector(
        `[${t}="${i}"]`
      );
    o = o.parentElement || o.parentNode || o.host || null;
  }
  return null;
};
function M0(e) {
  return e ? e.assignedNodes({ flatten: !0 }).length > 0 : !1;
}
var Wc = Object.defineProperty, Gc = (e, t, i, o) => {
  for (var r = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(t, i, r) || r);
  return r && Wc(t, i, r), r;
};
const D0 = (e) => {
  class t extends e {
    constructor(...o) {
      super(...o), this.#e = !1, this._togglePopover = () => {
        if (!this.popoverContainerElement) return;
        const r = Fc(
          this,
          "id",
          this.popoverContainerElement
        );
        r && (this.#e ? r.hidePopover() : r.showPopover());
      }, this.#i = (r) => {
        requestAnimationFrame(() => {
          this.#e = r.detail.newState === "open";
        });
      }, this.addEventListener("uui-popover-before-toggle", this.#i);
    }
    #e;
    #i;
  }
  return Gc([
    a({ type: String, attribute: "popovertarget" })
  ], t.prototype, "popoverContainerElement"), t;
};
function L0(e, t) {
  return (i) => {
    if (e.indexOf("-") > 0 === !1) {
      console.error(
        `${e} is not a valid custom element name. A custom element name should consist of at least two words separated by a hyphen.`
      );
      return;
    }
    window.customElements.get(e) || window.customElements.define(e, i, t);
  };
}
const T0 = [
  "default",
  "primary",
  "secondary",
  "outline",
  "placeholder"
], N0 = [
  "default",
  "positive",
  "warning",
  "danger",
  "invalid"
], V0 = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6"
];
function d(e, t) {
  return (i) => {
    if (e.indexOf("-") > 0 === !1) {
      console.error(
        `${e} is not a valid custom element name. A custom element name should consist of at least two words separated by a hyphen.`
      );
      return;
    }
    window.customElements.get(e) || window.customElements.define(e, i, t);
  };
}
var qc = Object.getOwnPropertyDescriptor, Kc = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? qc(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let nr = class extends v {
  render() {
    return l`<slot></slot>`;
  }
};
nr.styles = [
  p`
      :host {
        display: inline-flex;
        align-items: stretch;
      }

      ::slotted(*) {
        --uui-button-border-radius: 0;
        flex-grow: 1;
      }

      ::slotted([look='outline']:not(:first-child)) {
        --uui-button-merge-border-left: 1;
      }
      ::slotted([look='placeholder']:not(:first-child)) {
        --uui-button-merge-border-left: 1;
      }

      ::slotted(*:first-child) {
        --uui-button-border-radius: var(--uui-border-radius,3px) 0 0
          var(--uui-border-radius,3px);
      }
      ::slotted(*:last-child) {
        --uui-button-border-radius: 0 var(--uui-border-radius,3px)
          var(--uui-border-radius,3px) 0;
      }

      ::slotted(*:hover) {
        z-index: 1;
      }
    `
];
nr = Kc([
  d("uui-button-group")
], nr);
var Xc = Object.getOwnPropertyDescriptor, Yc = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Xc(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let As = class extends nr {
};
As.styles = [
  ...nr.styles,
  p`
      ::slotted(*) {
        --uui-button-padding-left-factor: 0.5;
        --uui-button-padding-right-factor: 0.5;
      }

      ::slotted(*:first-child) {
        --uui-button-border-radius: 50px 0 0 50px;
        --uui-button-padding-left-factor: 2;
      }
      ::slotted(*:last-child) {
        --uui-button-border-radius: 0 50px 50px 0;
        --uui-button-padding-right-factor: 2;
      }
      ::slotted(*:first-child:last-child) {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-padding-left-factor: 2;
        --uui-button-padding-right-factor: 2;
      }

      ::slotted([look='outline']),
      ::slotted([look='placeholder']) {
        --uui-button-padding-left-factor: 1;
        --uui-button-padding-right-factor: 1;
      }

      ::slotted(uui-button[look='outline']:first-child),
      ::slotted(uui-button[look='placeholder']:first-child) {
        --uui-button-border-radius: 50px 0 0 50px;
        --uui-button-padding-left-factor: 1.5;
      }
      ::slotted(uui-button[look='outline']:last-child),
      ::slotted(uui-button[look='placeholder']:last-child) {
        --uui-button-border-radius: 0 50px 50px 0;
        --uui-button-padding-right-factor: 1.5;
      }
      ::slotted(uui-button[look='outline']:first-child:last-child),
      ::slotted(uui-button[look='placeholder']:first-child:last-child) {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-padding-left-factor: 1.5;
        --uui-button-padding-right-factor: 1.5;
      }
    `
];
As = Yc([
  d("uui-action-bar")
], As);
var Zc = Object.defineProperty, Qc = Object.getOwnPropertyDescriptor, qo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Qc(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Zc(t, i, r), r;
};
let ui = class extends v {
  constructor() {
    super(...arguments), this._avatarArray = [], this.limit = 0;
  }
  firstUpdated() {
    this._setAvatarArray();
  }
  _onSlotChange() {
    this._setAvatarArray(), this._updateAvatarVisibility();
  }
  _setAvatarArray() {
    this._avatarArray = this._avatarNodes ? this._avatarNodes : [];
  }
  updated(e) {
    e.has("limit") && this._updateAvatarVisibility();
  }
  _updateAvatarVisibility() {
    this._avatarArray.forEach((e, t) => {
      e.style.display = t < this.limit || this.limit === 0 ? "" : "none";
    });
  }
  _isLimitExceeded() {
    return this.limit !== 0 && this._avatarArray.length > this.limit;
  }
  render() {
    return l`
      <slot @slotchange=${this._onSlotChange}></slot>
      ${this._isLimitExceeded() ? (
      //prettier-ignore
      l`<small id="overflow-indication">+${this._avatarArray.length - this.limit}</small>`
    ) : ""}
    `;
  }
};
ui.styles = [
  p`
      :host {
        display: inline-flex;
        align-items: center;
        padding-left: 3px;
        padding-right: 3px;
      }

      ::slotted(uui-avatar) {
        margin-left: -0.2em;
        margin-right: -0.2em;
        border: 0.1em solid var(--uui-avatar-border-color);
      }

      #overflow-indication {
        margin-left: 6px;
      }
    `
];
qo([
  wt({
    selector: "uui-avatar, [uui-avatar]",
    flatten: !0
  })
], ui.prototype, "_avatarNodes", 2);
qo([
  g()
], ui.prototype, "_avatarArray", 2);
qo([
  a({ type: Number, attribute: !0 })
], ui.prototype, "limit", 2);
ui = qo([
  d("uui-avatar-group")
], ui);
var Jc = Object.defineProperty, eh = Object.getOwnPropertyDescriptor, $i = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? eh(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Jc(t, i, r), r;
};
let ut = class extends v {
  constructor() {
    super(...arguments), this.overflow = !0, this.imgSrc = "", this.imgSrcset = "", this.name = "";
  }
  get _initials() {
    return this.initials?.substring(0, 3) || this.createInitials(this.name);
  }
  connectedCallback() {
    super.connectedCallback(), this.name || console.warn(this.tagName + " needs a `name`", this);
  }
  createInitials(e) {
    let t = "";
    if (!e)
      return t;
    const o = [...e.matchAll(/(?:^|\s)(.)/g)].map((r) => r[1]).join("");
    return o?.length ? (t = o[0].charAt(0), o.length > 1 && (t += o[o.length - 1].charAt(0)), t.toUpperCase()) : t;
  }
  renderImage() {
    return l` <img
      src="${this.imgSrc}"
      srcset="${this.imgSrcset}"
      alt="${this._initials}"
      title="${this.name}" />`;
  }
  render() {
    return l`
      ${this.imgSrc ? this.renderImage() : ""}
      ${this.imgSrc ? "" : this._initials}
      <slot></slot>
    `;
  }
};
ut.styles = [
  p`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        font-weight: 700;
        -webkit-font-smoothing: subpixel-antialiased;
        width: calc(2em + 4px);
        height: calc(2em + 4px);
        user-select: none;
        /* box-sizing: border-box; */
        aspect-ratio: 1;
        background-color: var(--uui-palette-spanish-pink,#f5c1bc);
        color: var(--uui-palette-space-cadet,#1b264f);
      }

      :host([overflow]) {
        overflow: unset;
      }

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        overflow: hidden;
        border-radius: 50%;
      }
    `
];
$i([
  a({ type: Boolean, attribute: !0, reflect: !0 })
], ut.prototype, "overflow", 2);
$i([
  a({ type: String, attribute: "img-src" })
], ut.prototype, "imgSrc", 2);
$i([
  a({ type: String, attribute: "img-srcset" })
], ut.prototype, "imgSrcset", 2);
$i([
  a({ type: String, reflect: !0 })
], ut.prototype, "name", 2);
$i([
  a({ type: String })
], ut.prototype, "initials", 2);
ut = $i([
  d("uui-avatar")
], ut);
var th = Object.defineProperty, ih = Object.getOwnPropertyDescriptor, Ko = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ih(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && th(t, i, r), r;
};
let ci = class extends v {
  constructor() {
    super(...arguments), this.color = "default", this.look = "primary", this.attention = !1;
  }
  render() {
    return l` <slot></slot> `;
  }
};
ci.styles = [
  p`
      :host {
        position: var(--uui-badge-position, absolute);
        display: flex;
        justify-content: center;
        align-items: center;

        padding: var(--uui-size-1,3px) var(--uui-size-2,6px);
        inset: var(--uui-badge-inset, -8px -8px auto auto);

        text-align: center;
        font-size: var(--uui-badge-font-size, var(--uui-type-small-size,12px));
        font-weight: 900;
        line-height: 1;

        margin-right: 0;

        min-width: var(--uui-size-8,24px);
        min-height: var(--uui-size-8,24px);
        box-sizing: border-box;

        border-radius: var(--uui-size-4,12px);
        border: 1px solid transparent;
      }

      :host {
        --color: var(--uui-color-default,#1b264f);
        --color-standalone: var(--uui-color-default-standalone,rgb(
    28,
    35,
    59
  ));
        --color-contrast: var(--uui-color-default-contrast,#fff);
      }
      :host([color='positive']) {
        --color: var(--uui-color-positive,#0b8152);
        --color-standalone: var(--uui-color-positive-standalone,rgb(
    10,
    115,
    73
  ));
        --color-contrast: var(--uui-color-positive-contrast,#fff);
      }
      :host([color='warning']) {
        --color: var(--uui-color-warning,#fbd142);
        --color-standalone: var(--uui-color-warning-standalone,#a17700);
        --color-contrast: var(--uui-color-warning-contrast,#000);
      }
      :host([color='danger']) {
        --color: var(--uui-color-danger,#d42054);
        --color-standalone: var(--uui-color-danger-standalone,rgb(
    191,
    33,
    78
  ));
        --color-contrast: var(--uui-color-danger-contrast,white);
      }
      :host([color='invalid']) {
        --color: var(--uui-color-invalid,#d42054);
        --color-standalone: var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
        --color-contrast: var(--uui-color-invalid-contrast,white);
      }

      :host {
        background-color: var(--uui-color-surface,#fff);
        color: var(--color-standalone);
        border-color: transparent;
      }
      :host([look='primary']) {
        background-color: var(--color);
        color: var(--color-contrast);
        border-color: transparent;
      }
      :host([look='secondary']) {
        background-color: var(--uui-color-surface-alt,#f3f3f5);
        color: var(--color-standalone);
        border-color: transparent;
      }
      :host([look='outline']) {
        background-color: var(--uui-color-surface,#fff);
        color: var(--color-standalone);
        border-color: var(--color-standalone);
      }
      :host([look='placeholder']) {
        border-style: dashed;
        background-color: var(--uui-color-surface,#fff);
        color: var(--color-standalone);
        border-color: var(--uui-color-border-standalone,#c2c2c2);
      }

      /** TODO: we didn't want to target elements by name, but what else can we do? */
      ::slotted(uui-icon) {
        margin-left: -0.2em;
        margin-right: -0.2em;
      }

      @keyframes --uui-badge-bounce {
        0% {
          transform: translateY(0);
        }
        20% {
          transform: translateY(-6px);
        }
        40% {
          transform: translateY(0);
        }
        55% {
          transform: translateY(-3px);
        }
        70% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(0);
        }
      }
      :host([attention]) {
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-name: --uui-badge-bounce;
        animation-timing-function: ease;
      }
      @media (prefers-reduced-motion) {
        :host([attention]) {
          animation: none;
        }
      }
    `
];
Ko([
  a({ reflect: !0 })
], ci.prototype, "color", 2);
Ko([
  a({ reflect: !0 })
], ci.prototype, "look", 2);
Ko([
  a({ type: Boolean, reflect: !0 })
], ci.prototype, "attention", 2);
ci = Ko([
  d("uui-badge")
], ci);
var rh = Object.defineProperty, oh = (e, t, i, o) => {
  for (var r = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(t, i, r) || r);
  return r && rh(t, i, r), r;
};
const yr = (e) => {
  class t extends e {
    constructor() {
      super(...arguments), this.active = !1;
    }
  }
  return oh([
    a({ type: Boolean, reflect: !0 })
  ], t.prototype, "active"), t;
};
var sh = Object.defineProperty, ba = (e, t, i, o) => {
  for (var r = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(t, i, r) || r);
  return r && sh(t, i, r), r;
};
const De = (e, t) => {
  class i extends t {
    constructor() {
      super(...arguments), this._labelSlotHasContent = !1;
    }
    firstUpdated(r) {
      super.firstUpdated(r), this.label || console.warn(this.tagName + " needs a `label`", this);
    }
    labelSlotChanged(r) {
      this._labelSlotHasContent = r.target.assignedNodes({ flatten: !0 }).length > 0;
    }
    /**
     * Call in the mixed element to render the label template. It contains a slot. This is optional.
     * @method renderLabel
     * @returns {TemplateResult}
     */
    renderLabel() {
      return l`
        ${this._labelSlotHasContent === !1 ? l`<span class="label">${this.label}</span>` : ""}
        <slot
          class="label"
          style=${this._labelSlotHasContent ? "" : "display: none"}
          name=${e || ""}
          @slotchange=${this.labelSlotChanged}></slot>
      `;
    }
  }
  return ba([
    a({ type: String })
  ], i.prototype, "label"), ba([
    g()
  ], i.prototype, "_labelSlotHasContent"), i;
};
let nh = class extends Event {
  constructor(t, i = {}) {
    super(t, { ...i }), this.detail = i.detail || {};
  }
}, Sr = class extends nh {
  static {
    this.SELECTED = "selected";
  }
  static {
    this.DESELECTED = "deselected";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      cancelable: !0,
      ...i
    });
  }
};
var ah = Object.defineProperty, lh = Object.getOwnPropertyDescriptor, ga = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? lh(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ah(t, i, r), r;
};
const ki = (e) => {
  class t extends e {
    constructor(...o) {
      super(...o), this._selectable = !1, this.deselectable = !0, this.selected = !1, this.#e = this, this.#i = (r) => {
        r.code !== "Space" && r.code !== "Enter" || r.composedPath().indexOf(this.#e) === 0 && this.#t(r);
      }, this.#t = (r) => {
        if ((this._selectable || this.deselectable && this.selected) === !1) return;
        const n = r.composedPath();
        this.#e === this && n.some((c) => {
          const h = c.tagName;
          return h === "A" || h === "BUTTON" || h === "INPUT" || h === "TEXTAREA" || h === "SELECT";
        }) || n.indexOf(this.#e) !== -1 && (r.type === "keydown" && r.preventDefault(), this.#o());
      }, this.addEventListener("click", this.#t), this.addEventListener("keydown", this.#i);
    }
    get selectable() {
      return this._selectable;
    }
    set selectable(o) {
      const r = this._selectable;
      r !== o && (this._selectable = o, this.#e === this && this.#e.setAttribute(
        "tabindex",
        `${o ? "0" : "-1"}`
      ), this.requestUpdate("selectable", r));
    }
    #e;
    get selectableTarget() {
      return this.#e;
    }
    set selectableTarget(o) {
      const r = this.#e;
      r.removeAttribute("tabindex"), r.removeEventListener("click", this.#t), r.removeEventListener(
        "keydown",
        this.#i
      ), this.#e = o, this.#e === this && this.#e.setAttribute(
        "tabindex",
        this._selectable ? "0" : "-1"
      ), o.addEventListener("click", this.#t), o.addEventListener("keydown", this.#i);
    }
    #i;
    #t;
    #o() {
      this.selectable && (this.deselectable === !1 ? this.#r() : this.selected ? this.#s() : this.#r());
    }
    #r() {
      if (!this.selectable) return;
      const o = new Sr(Sr.SELECTED);
      this.dispatchEvent(o), !o.defaultPrevented && (this.selected = !0);
    }
    #s() {
      if (!this.deselectable) return;
      const o = new Sr(Sr.DESELECTED);
      this.dispatchEvent(o), !o.defaultPrevented && (this.selected = !1);
    }
  }
  return ga([
    a({ type: Boolean, reflect: !0 })
  ], t.prototype, "selectable", 1), ga([
    a({ type: Boolean, reflect: !0 })
  ], t.prototype, "selected", 2), t;
};
var uh = Object.defineProperty, ch = Object.getOwnPropertyDescriptor, hh = (e, t, i, o) => {
  for (var r = ch(t, i), s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(t, i, r) || r);
  return r && uh(t, i, r), r;
};
const Xo = (e) => {
  class t extends e {
    constructor() {
      super(...arguments), this._selectOnly = !1;
    }
    get selectOnly() {
      return this._selectOnly;
    }
    set selectOnly(o) {
      const r = this._selectOnly;
      this._selectOnly = o, this.requestUpdate("selectOnly", r);
    }
  }
  return hh([
    a({ type: Boolean, reflect: !0, attribute: "select-only" })
  ], t.prototype, "selectOnly"), t;
};
let wl = class extends Event {
  constructor(t, i = {}) {
    super(t, { ...i }), this.detail = i.detail || {};
  }
}, Gt = class extends wl {
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
  static {
    this.VALID = "valid";
  }
  static {
    this.INVALID = "invalid";
  }
}, F0 = class extends wl {
  static {
    this.SELECTED = "selected";
  }
  static {
    this.DESELECTED = "deselected";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      cancelable: !0,
      ...i
    });
  }
};
var dh = Object.defineProperty, ph = Object.getOwnPropertyDescriptor, Pt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ph(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && dh(t, i, r), r;
};
const vh = [
  "customError",
  "valueMissing",
  "badInput",
  "typeMismatch",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort"
], Le = (e, t) => {
  class i extends e {
    constructor(...r) {
      super(...r), this.name = "", this.#e = {}, this._pristine = !1, this.required = !1, this.requiredMessage = "This field is required", this.error = !1, this.errorMessage = "This field is invalid", this.#i = t, this.#t = null, this.#o = [], this.#r = [], this.#n = () => {
        this.pristine = !1;
      }, this._internals = this.attachInternals(), this.pristine = !0, this.addValidator(
        "valueMissing",
        () => this.requiredMessage,
        () => this.hasAttribute("required") && this.hasValue() === !1
      ), this.addValidator(
        "customError",
        () => this.errorMessage,
        () => this.error
      ), this.addEventListener("blur", () => {
        this.pristine = !1, this.checkValidity();
      });
    }
    static {
      this.formAssociated = !0;
    }
    // Do not 'reflect' as the attribute is used as fallback.
    get value() {
      return this.#i;
    }
    set value(r) {
      const s = this.#i;
      this.#i = r, "ElementInternals" in window && "setFormValue" in window.ElementInternals.prototype && this._internals.setFormValue(this.#i ?? null), this.requestUpdate("value", s);
    }
    #e;
    set pristine(r) {
      this._pristine !== r && (this._pristine = r, r ? this.setAttribute("pristine", "") : this.removeAttribute("pristine"), this.#a());
    }
    get pristine() {
      return this._pristine;
    }
    #i;
    #t;
    #o;
    #r;
    /**
     * Determine wether this FormControl has a value.
     * @method hasValue
     * @returns {boolean}
     */
    hasValue() {
      return this.value !== this.getDefaultValue();
    }
    /**
     * Focus first element that is invalid.
     * @method focusFirstInvalidElement
     * @returns {HTMLElement | undefined}
     */
    focusFirstInvalidElement() {
      const r = this.#r.find(
        (s) => s.validity.valid === !1
      );
      r ? "focusFirstInvalidElement" in r ? r.focusFirstInvalidElement() : r.focus() : this.focus();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this.#s();
    }
    #s() {
      this.#t && this.#t.removeEventListener("submit", this.#n);
    }
    /**
     * Add validator, to validate this Form Control.
     * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState for available Validator FlagTypes.
     *
     * @example
     * this.addValidator(
     *  'tooLong',
     *  () => 'This input contains too many characters',
     *  () => this._value.length > 10
     * );
     * @method hasValue
     * @param {FlagTypes} flagKey the type of validation.
     * @param {method} getMessageMethod method to retrieve relevant message. Is executed every time the validator is re-executed.
     * @param {method} checkMethod method to determine if this validator should invalidate this form control. Return true if this should prevent submission.
     */
    addValidator(r, s, n) {
      const u = {
        flagKey: r,
        getMessageMethod: s,
        checkMethod: n,
        weight: vh.indexOf(r)
      };
      return this.#o.push(u), this.#o.sort(
        (c, h) => c.weight > h.weight ? 1 : h.weight > c.weight ? -1 : 0
      ), u;
    }
    removeValidator(r) {
      const s = this.#o.indexOf(r);
      s !== -1 && this.#o.splice(s, 1);
    }
    /**
     * @method addFormControlElement
     * @description Important notice if adding a native form control then ensure that its value and thereby validity is updated when value is changed from the outside.
     * @param element {NativeFormControlElement} - element to validate and include as part of this form association.
     */
    addFormControlElement(r) {
      this.#r.push(r), r.addEventListener(Gt.INVALID, () => {
        this._runValidators();
      }), r.addEventListener(Gt.VALID, () => {
        this._runValidators();
      }), this._pristine === !1 && (r.checkValidity(), this._runValidators());
    }
    /**
     * @method setCustomValidity
     * @description Set custom validity state, set to empty string to remove the custom message.
     * @param message {string} - The message to be shown
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity|HTMLObjectElement:setCustomValidity}
     */
    setCustomValidity(r) {
      this._customValidityObject && this.removeValidator(this._customValidityObject), r != null && r !== "" && (this._customValidityObject = this.addValidator(
        "customError",
        () => r,
        () => !0
      )), this._runValidators();
    }
    /**
     * @protected
     * @method _runValidators
     * @description Run all validators and set the validityState of this form control.
     * Run this method when you want to re-run all validators.
     * This can be relevant if you have a validators that is using values that is not triggering the Lit Updated Callback.
     * Such are mainly properties that are not declared as a Lit state and or Lit property.
     */
    _runValidators() {
      this.#e = {};
      let r, s;
      this.#o.some((u) => u.checkMethod() ? (this.#e[u.flagKey] = !0, r = u.getMessageMethod(), !0) : !1), r || this.#r.some((u) => {
        let c;
        for (c in u.validity)
          if (c !== "valid" && u.validity[c])
            return this.#e[c] = !0, r = u.validationMessage, s ??= u, !0;
        return !1;
      });
      const n = Object.values(this.#e).includes(!0);
      this.#e.valid = !n, this._internals.setValidity(
        this.#e,
        // Turn messages into an array and join them with a comma. [NL]:
        //[...messages].join(', '),
        r,
        s ?? this.getFormElement() ?? void 0
      ), this.#a();
    }
    #a() {
      this._pristine !== !0 && (this.#e.valid ? this.dispatchEvent(new Gt(Gt.VALID)) : this.dispatchEvent(
        new Gt(Gt.INVALID)
      ));
    }
    updated(r) {
      super.updated(r), this._runValidators();
    }
    #n;
    submit() {
      this.#t?.requestSubmit();
    }
    formAssociatedCallback() {
      this.#s(), this.#t = this._internals.form, this.#t && (this.#t.hasAttribute("submit-invalid") && (this.pristine = !1), this.#t.addEventListener("submit", this.#n));
    }
    formResetCallback() {
      this.pristine = !0, this.value = this.getInitialValue() ?? this.getDefaultValue();
    }
    getDefaultValue() {
      return t;
    }
    getInitialValue() {
      return this.getAttribute("value");
    }
    checkValidity() {
      this.pristine = !1, this._runValidators();
      for (const r in this.#r)
        if (this.#r[r].checkValidity() === !1)
          return !1;
      return this._internals?.checkValidity();
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
    get validity() {
      return this.#e;
    }
    get validationMessage() {
      return this._internals?.validationMessage;
    }
  }
  return Pt([
    a({ type: String })
  ], i.prototype, "name", 2), Pt([
    a()
  ], i.prototype, "value", 1), Pt([
    a({ type: Boolean, reflect: !0, attribute: "pristine" })
  ], i.prototype, "pristine", 1), Pt([
    a({ type: Boolean, reflect: !0 })
  ], i.prototype, "required", 2), Pt([
    a({ type: String, attribute: "required-message" })
  ], i.prototype, "requiredMessage", 2), Pt([
    a({ type: Boolean, reflect: !0 })
  ], i.prototype, "error", 2), Pt([
    a({ type: String, attribute: "error-message" })
  ], i.prototype, "errorMessage", 2), i;
}, fh = (e, t, i) => {
  let o = e;
  for (; o !== null; ) {
    const r = o instanceof HTMLElement && o.hasAttribute(t) && o.getAttribute(t) === i, s = o.querySelector(`[${t}="${i}"]`) !== null;
    if (r)
      return o;
    if (s)
      return o.querySelector(
        `[${t}="${i}"]`
      );
    o = o.parentElement || o.parentNode || o.host || null;
  }
  return null;
};
var bh = Object.defineProperty, gh = (e, t, i, o) => {
  for (var r = void 0, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(t, i, r) || r);
  return r && bh(t, i, r), r;
};
const mh = (e) => {
  class t extends e {
    constructor(...o) {
      super(...o), this.#e = !1, this._togglePopover = () => {
        if (!this.popoverContainerElement) return;
        const r = fh(
          this,
          "id",
          this.popoverContainerElement
        );
        r && (this.#e ? r.hidePopover() : r.showPopover());
      }, this.#i = (r) => {
        requestAnimationFrame(() => {
          this.#e = r.detail.newState === "open";
        });
      }, this.addEventListener("uui-popover-before-toggle", this.#i);
    }
    #e;
    #i;
  }
  return gh([
    a({ type: String, attribute: "popovertarget" })
  ], t.prototype, "popoverContainerElement"), t;
};
class S extends Event {
  constructor(t, i = {}) {
    super(t, { ...i }), this.detail = i.detail || {};
  }
}
class Or extends S {
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
  static {
    this.VALID = "valid";
  }
  static {
    this.INVALID = "invalid";
  }
}
class ei extends S {
  static {
    this.SELECTED = "selected";
  }
  static {
    this.DESELECTED = "deselected";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      cancelable: !0,
      ...i
    });
  }
}
class ma extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var _h = Object.defineProperty, yh = Object.getOwnPropertyDescriptor, Ci = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yh(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && _h(t, i, r), r;
};
class Te extends Le(
  De("", v),
  ""
) {
  constructor(t = "checkbox") {
    super(), this._value = "", this.labelPosition = "right", this._checked = !1, this.indeterminate = !1, this.disabled = !1, this.readonly = !1, this._value === "" && (this._value = "on"), this.inputRole = t, this.addEventListener("keydown", this.#e);
  }
  /** intentional overwrite of FormControlMixins value getter and setter method. */
  get value() {
    return this._value;
  }
  set value(t) {
    const i = super.value;
    this._value = t, "ElementInternals" in window && //@ts-ignore
    "setFormValue" in window.ElementInternals.prototype && this._internals.setFormValue(
      this._checked && this.name !== "" ? this._value : null
    ), this.requestUpdate("value", i);
  }
  // Do not 'reflect' as the attribute is used as fallback.
  get checked() {
    return this._checked;
  }
  set checked(t) {
    const i = this._checked;
    this._checked = t, this._internals.setFormValue(
      this._checked && this.name !== "" ? this._value ? this._value : "on" : null
    ), this.requestUpdate("checked", i);
  }
  getFormElement() {
    return this._input;
  }
  #e(t) {
    t.key == "Enter" && this.submit();
  }
  hasValue() {
    return this.checked;
  }
  formResetCallback() {
    super.formResetCallback(), this.checked = this.hasAttribute("checked");
  }
  firstUpdated(t) {
    super.firstUpdated(t);
    const i = this.shadowRoot?.querySelector("label");
    let o = !1;
    this._input.addEventListener("blur", () => {
      o === !1 && this.style.setProperty("--uui-show-focus-outline", "1"), o = !1;
    }), i.addEventListener("mousedown", () => {
      this.style.setProperty("--uui-show-focus-outline", "0"), o = !0;
    }), i.addEventListener("mouseup", () => {
      o = !1;
    });
  }
  /**
   * This method enables <label for="..."> to focus the input
   */
  async focus() {
    await this.updateComplete, this._input.focus();
  }
  async click() {
    await this.updateComplete, this._input.click();
  }
  _onInputChange(t) {
    t.stopPropagation(), this.pristine = !1, this.checked = this._input.checked, this.indeterminate = this._input.indeterminate, this.dispatchEvent(new ma(ma.CHANGE));
  }
  render() {
    return l`
      <label>
        <input
          id="input"
          type="checkbox"
          @change="${this._onInputChange}"
          .disabled=${this.disabled || this.readonly}
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          aria-checked="${this.checked ? "true" : "false"}"
          aria-label=${this.label}
          role="${this.inputRole}" />
        ${this.renderCheckbox()} ${this.renderLabel()}
      </label>
    `;
  }
  static {
    this.styles = [
      p`
      :host {
        display: inline-block;
      }

      label {
        position: relative;
        cursor: pointer;
        user-select: none;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-items: center;
        gap: var(--uui-size-3,9px);
      }

      :host([readonly]) label {
        cursor: default;
      }

      input {
        position: absolute;
        height: 0px;
        width: 0px;
        opacity: 0;
      }

      :host([label-position='left']) label {
        flex-direction: row-reverse;
      }

      :host([label-position='top']) label {
        gap: var(--uui-size-half-base-unit);
        flex-direction: column-reverse;
      }

      :host([label-position='bottom']) label {
        gap: var(--uui-size-half-base-unit);
        flex-direction: column;
      }

      :host([disabled]) label {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .label {
        display: block;
      }

      span.label:empty {
        display: none;
      }
    `
    ];
  }
}
Ci([
  a({ type: String, attribute: "label-position", reflect: !0 })
], Te.prototype, "labelPosition", 2);
Ci([
  a({ type: Boolean })
], Te.prototype, "checked", 1);
Ci([
  a({ type: Boolean, reflect: !0 })
], Te.prototype, "indeterminate", 2);
Ci([
  a({ type: Boolean, reflect: !0 })
], Te.prototype, "disabled", 2);
Ci([
  a({ type: Boolean, reflect: !0 })
], Te.prototype, "readonly", 2);
Ci([
  P("#input")
], Te.prototype, "_input", 2);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xl = Symbol.for(""), wh = (e) => {
  if (e?.r === xl) return e?._$litStatic$;
}, _a = (e) => ({ _$litStatic$: e, r: xl }), ya = /* @__PURE__ */ new Map(), xh = (e) => (t, ...i) => {
  const o = i.length;
  let r, s;
  const n = [], u = [];
  let c, h = 0, m = !1;
  for (; h < o; ) {
    for (c = t[h]; h < o && (s = i[h], (r = wh(s)) !== void 0); ) c += r + t[++h], m = !0;
    h !== o && u.push(s), n.push(c), h++;
  }
  if (h === o && n.push(t[o]), m) {
    const f = n.join("$$lit$$");
    (t = ya.get(f)) === void 0 && (n.raw = n, ya.set(f, t = n)), i = u;
  }
  return e(t, ...i);
}, wa = xh(l);
var $h = Object.defineProperty, kh = Object.getOwnPropertyDescriptor, Nt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? kh(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && $h(t, i, r), r;
};
function ds(e) {
  return e ? e.assignedNodes({ flatten: !0 }).length > 0 : !1;
}
let Ye = class extends v {
  constructor() {
    super(...arguments), this.headline = null, this._headlineVariantTag = "h5", this._headlineSlotHasContent = !1, this._headlineSlotChanged = (e) => {
      this._headlineSlotHasContent = ds(e.target);
    }, this._headerSlotHasContent = !1, this._headerSlotChanged = (e) => {
      this._headerSlotHasContent = ds(e.target);
    }, this._headerActionsSlotHasContent = !1, this._headerActionsSlotChanged = (e) => {
      this._headerActionsSlotHasContent = ds(e.target);
    };
  }
  set headlineVariant(e) {
    this._headlineVariantTag = e;
  }
  get headlineVariant() {
    return this._headlineVariantTag;
  }
  /**
   * Renders a header with the `header`-slot, `header-actions`-slot, headline and `headline`-slot within
   * @returns {TemplateResult}
   * @protected
   * @method
   */
  renderHeader() {
    return wa`<div
      id="header"
      class="uui-text"
      style=${this._headerSlotHasContent || this._headlineSlotHasContent || this._headerActionsSlotHasContent || this.headline !== null ? "" : "display: none"}>
      <${_a(this._headlineVariantTag)}
        id="headline"
        class="uui-h5"
        style=${this._headlineSlotHasContent || this.headline !== null ? "" : "display: none"}>
        ${this.headline}
        <slot name="headline" @slotchange=${this._headlineSlotChanged}></slot>
      </${_a(this._headlineVariantTag)}>
      <slot name="header" @slotchange=${this._headerSlotChanged}></slot>
      <slot name="header-actions" @slotchange=${this._headerActionsSlotChanged}></slot>
    </div>`;
  }
  render() {
    return wa`
      ${this.renderHeader()}
      <slot></slot>
    `;
  }
};
Ye.styles = [
  _r,
  p`
      :host {
        display: block;
        border: var(--uui-box-border-width, 0) solid
          var(--uui-box-border-color, var(--uui-color-divider-standalone,#e9e9eb));
        box-shadow: var(--uui-box-box-shadow, var(--uui-shadow-depth-1,0 1px 3px rgba(0,0,0,0.12) , 0 1px 2px rgba(0,0,0,0.24)));
        border-radius: var(--uui-box-border-radius, var(--uui-border-radius,3px));
        background-color: var(--uui-color-surface,#fff);
      }

      #header {
        display: flex;
        align-items: center;
        column-gap: var(--uui-size-space-5,18px);
        border-bottom: 1px solid var(--uui-color-divider-standalone,#e9e9eb);
        padding: var(
          --uui-box-header-padding,
          var(--uui-size-space-4,12px) var(--uui-size-space-5,18px)
        );
      }

      slot:not([name]) {
        display: block;
        padding: var(--uui-box-default-padding, var(--uui-size-space-5,18px));
      }

      slot[name='header-actions'] {
        display: block;
        margin-left: auto;
      }
    `
];
Nt([
  a({ type: String })
], Ye.prototype, "headline", 2);
Nt([
  a({ attribute: "headline-variant" })
], Ye.prototype, "headlineVariant", 1);
Nt([
  g()
], Ye.prototype, "_headlineVariantTag", 2);
Nt([
  g()
], Ye.prototype, "_headlineSlotHasContent", 2);
Nt([
  g()
], Ye.prototype, "_headerSlotHasContent", 2);
Nt([
  g()
], Ye.prototype, "_headerActionsSlotHasContent", 2);
Ye = Nt([
  d("uui-box")
], Ye);
var Ch = Object.defineProperty, Eh = Object.getOwnPropertyDescriptor, On = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Eh(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ch(t, i, r), r;
};
let hi = class extends v {
  constructor() {
    super(...arguments), this.lastItem = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "listitem");
  }
  renderLinkAndSeparator() {
    const e = this.href ? l`<a id="link" href=${this.href}><slot></slot></a>` : l`<span id="link"><slot></slot></span>`;
    return l`${e}<span part="separator"></span>`;
  }
  renderCurrent() {
    return l`<span id="last-item"><slot></slot></span>`;
  }
  render() {
    return l`${this.lastItem ? this.renderCurrent() : this.renderLinkAndSeparator()}`;
  }
};
hi.styles = [
  p`
      :host {
        font-size: var(--uui-type-small-size,12px);
        color: currentColor;
      }

      a,
      a:visited {
        color: currentColor;
      }
      a:hover {
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }
      a:focus {
        color: var(--uui-color-focus,#3879ff);
      }

      [part='separator']::after {
        content: '/';
        speak: never;
        position: relative;
        top: 1px;
        margin: -3px 1px 0;
        color: var(--uui-color-border,#d8d7d9);
      }

      #link,
      #last-item {
        padding: 0 4px;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `
];
On([
  a()
], hi.prototype, "href", 2);
On([
  a({ type: Boolean, attribute: "last-item" })
], hi.prototype, "lastItem", 2);
hi = On([
  d("uui-breadcrumb-item")
], hi);
var Ph = Object.defineProperty, Sh = Object.getOwnPropertyDescriptor, $l = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Sh(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ph(t, i, r), r;
};
let ho = class extends v {
  elementIsBreadcrumbItem(e) {
    return e instanceof hi;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-label", "breadcrumb"), this.setAttribute("role", "navigation");
  }
  handleSlotChange() {
    if (this.slotNodes.length > 0) {
      const e = this.slotNodes[this.slotNodes.length - 1];
      e.setAttribute("aria-current", "page"), this.elementIsBreadcrumbItem(e) && (e.lastItem = !0);
    }
  }
  render() {
    return l`<ol id="breadcrumbs-list">
      <slot @slotchange=${this.handleSlotChange}></slot>
    </ol>`;
  }
};
ho.styles = [
  p`
      :host {
        display: flex;
      }

      #breadcrumbs-list {
        display: flex;
        list-style-type: decimal;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }
    `
];
$l([
  wt({
    flatten: !0,
    selector: "uui-breadcrumb-item, [uui-breadcrumb-item], [role=listitem]"
  })
], ho.prototype, "slotNodes", 2);
ho = $l([
  d("uui-breadcrumbs")
], ho);
const Oh = p`
  @keyframes uui-blink {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`, Ih = yt("uui-blink 0.9s infinite both"), Ah = p`
  @keyframes pulse {
    0% {
      -webkit-transform: translate(-50%, -50%) scale(0.2);
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0.9;
    }
    80% {
      -webkit-transform: translate(-50%, -50%) scale(1.2);
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate(-50%, -50%) scale(2.2);
      transform: translate(-50%, -50%) scale(2.2);
      opacity: 0;
    }
  }
`;
yt(
  "pulse 0.8s ease-in-out infinite both"
);
const Yo = p`
  @keyframes uui-horizontal-shake {
    10%,
    90% {
      transform: translateX(-1px);
    }

    20%,
    80% {
      transform: translateX(1px);
    }

    30%,
    50%,
    70% {
      transform: translateX(-2px);
    }

    40%,
    60% {
      transform: translateX(2px);
    }
  }
`, Zo = yt(
  "uui-horizontal-shake 600ms ease backwards"
);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, Ei = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Pi = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, o) {
    this._$Ct = t, this._$AM = i, this._$Ci = o;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kl = "important", Uh = " !" + kl, Ze = Ei(class extends Pi {
  constructor(e) {
    if (super(e), e.type !== me.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce((t, i) => {
      const o = e[i];
      return o == null ? t : t + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${o};`;
    }, "");
  }
  update(e, [t]) {
    const { style: i } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const o of this.ft) t[o] == null && (this.ft.delete(o), o.includes("-") ? i.removeProperty(o) : i[o] = null);
    for (const o in t) {
      const r = t[o];
      if (r != null) {
        this.ft.add(o);
        const s = typeof r == "string" && r.endsWith(Uh);
        o.includes("-") || s ? i.setProperty(o, s ? r.slice(0, -11) : r, s ? kl : "") : i[o] = r;
      }
    }
    return se;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _ = (e) => e ?? k;
class xa extends S {
  static {
    this.CLICK = "click";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      composed: !0,
      ...i
    });
  }
}
var zh = Object.defineProperty, Mh = Object.getOwnPropertyDescriptor, Cl = (e) => {
  throw TypeError(e);
}, Vt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Mh(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && zh(t, i, r), r;
}, Dh = (e, t, i) => t.has(e) || Cl("Cannot " + i), Lh = (e, t, i) => t.has(e) ? Cl("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), po = (e, t, i) => (Dh(e, t, "access private method"), i), ii, In, El, Pl;
let Qe = class extends v {
  constructor() {
    super(...arguments), Lh(this, ii), this._position = 0, this.vertical = !1;
  }
  _onMouseMove(e) {
    this._position = (this.vertical ? e.offsetY : e.offsetX) - 5;
  }
  _handleClick(e) {
    e.preventDefault(), e.stopImmediatePropagation(), e.target?.blur?.(), this.dispatchEvent(
      new xa(xa.CLICK)
    );
  }
  render() {
    return this.href ? po(this, ii, El).call(this) : po(this, ii, Pl).call(this);
  }
};
ii = /* @__PURE__ */ new WeakSet();
In = function() {
  return l`
      <div
        id="plus"
        style=${Ze({
    left: this.vertical ? "" : this._position + "px",
    top: this.vertical ? this._position + "px" : ""
  })}>
        <svg
          id="plus-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            d="M420.592 214.291H296.104V89.804h-83.102v124.487H88.518v83.104h124.484v124.488h83.102V297.395h124.488z" />
        </svg>
      </div>
    `;
};
El = function() {
  return l`<a
      id="button-wrapper"
      @mousemove=${this._onMouseMove}
      href=${_(this.href)}
      target=${_(this.target || void 0)}
      rel=${_(
    this.rel || _(
      this.target === "_blank" ? "noopener noreferrer" : void 0
    )
  )}
      aria-label=${this.label ? this.label : "create new element"}>
      ${po(this, ii, In).call(this)}
    </a>`;
};
Pl = function() {
  return l`
      <button
        id="button-wrapper"
        @mousemove=${this._onMouseMove}
        @click=${this._handleClick}
        aria-label=${this.label ? this.label : "create new element"}>
        ${po(this, ii, In).call(this)}
      </button>
    `;
};
Qe.styles = [
  Oh,
  p`
      :host {
        display: flex;
        position: relative;
        z-index: 1;
      }

      :host(:not([vertical])) {
        height: 20px;
        width: 100%;
        margin: -10px 0;
      }

      :host([vertical]) {
        height: 100%;
        width: 20px;
        margin: 0 -10px;
      }

      #button-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        z-index: 1;
        outline: 0;
        transition: opacity 0.24s;
        display: inline-flex;
        width: 100%;
        border: none;
        height: 100%;
        padding: 0;

        text-decoration: none;
        background: transparent;
        color: currentColor;

        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;

        opacity: 0;
      }

      :host(:focus) #button-wrapper,
      :host(:focus-within) #button-wrapper,
      :host(:hover) #button-wrapper {
        opacity: 1;
      }

      :host(:focus) #button-wrapper:before,
      :host(:focus-within) #button-wrapper:before,
      :host(:hover) #button-wrapper:before {
        animation: ${Ih};
        background-color: var(--uui-color-interactive-emphasis,#3544b1);
        border-color: var(--uui-color-surface,#fff) !important;
      }

      #button-wrapper:before {
        content: '';
        position: absolute;
        right: 0;
        left: 0;
        height: 2px;
        background-color: transparent;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        border-radius: 2px;
        pointer-events: none;
        transition:
          background-color 720ms ease-out,
          border-color 240ms;
      }

      :host(:not([vertical])) #button-wrapper:before {
        top: 50%;
        transform: translateY(-50%);
      }

      :host([vertical]) #button-wrapper:before {
        height: 100%;
        width: 2px;
        left: 50%;
        transform: translateX(-50%);
        border-top: none;
        border-bottom: none;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
      }

      :host(:not([vertical]):not(:hover)) #plus:not(:focus) {
        left: calc(50% - 2px) !important;
      }

      :host([vertical]:not(:hover)) #plus:not(:focus) {
        top: calc(50% - 2px) !important;
      }

      #plus {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        box-sizing: border-box;
        width: 28px;
        height: 28px;
        border-radius: 3em;
        font-size: 14px;
        border: 2px solid var(--uui-color-interactive-emphasis,#3544b1);
        color: var(--uui-color-interactive-emphasis,#3544b1);
        background-color: var(--uui-color-surface,#fff);

        opacity: 0;
        transform: scale(0);
        transition:
          transform 240ms ease-in,
          opacity 240ms,
          left 100ms linear 150ms,
          top 100ms linear 150ms;
      }
      :host(:focus) #plus,
      :host(:focus-within) #plus,
      :host(:hover) #plus {
        opacity: 1;
        transform: scale(1);
        transition:
          transform 240ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
          opacity 80ms,
          box-shadow 240ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 0 0 2px var(--uui-color-surface,#fff);
      }

      :host(:not([vertical])) #plus {
        margin-left: -18px;
      }

      :host([vertical]) #plus {
        left: -4px;
        margin-top: -18px;
      }

      #button-wrapper:focus #plus {
        /* TODO: implement focus outline system */
        border: 2px solid var(--uui-color-focus,#3879ff);
        color: var(--uui-color-focus,#3879ff);
      }

      #plus-icon {
        width: 50%;
        fill: currentColor;
      }

      #button-wrapper:active #plus {
        transform: scale(1.1);
      }
    `
];
Vt([
  g()
], Qe.prototype, "_position", 2);
Vt([
  a({ type: String })
], Qe.prototype, "label", 2);
Vt([
  a({ type: Boolean, reflect: !0 })
], Qe.prototype, "vertical", 2);
Vt([
  a({ type: String })
], Qe.prototype, "href", 2);
Vt([
  a({ type: String })
], Qe.prototype, "target", 2);
Vt([
  a({ type: String })
], Qe.prototype, "rel", 2);
Qe = Vt([
  d("uui-button-inline-create")
], Qe);
class Th {
  constructor(t, i) {
    this._callback = t, this._timerId = null, this._remaining = null, this._onComplete = () => {
      this._remaining = null, this._callback();
    }, this.setDuration(i);
  }
  setDuration(t) {
    this._duration = t, this._timerId !== null && this.restart();
  }
  /** starts the timer */
  start() {
    this._timerId === null && this.resume();
  }
  /** restarts the timer by setting remaining time to duration. */
  restart() {
    this._remaining = this._duration, this.resume();
  }
  pause() {
    this._timerId !== null && (window.clearTimeout(this._timerId), this._timerId = null, this._remaining !== null && (this._remaining -= Date.now() - this._startTime));
  }
  resume() {
    this._timerId !== null && window.clearTimeout(this._timerId), this._remaining === null && (this._remaining = this._duration), this._startTime = Date.now(), this._timerId = window.setTimeout(this._onComplete, this._remaining);
  }
  destroy() {
    this.pause();
  }
}
const y = (e, t, i = `This element has to be present for ${e.nodeName} to work appropriate.`) => {
  customElements.get(t) || console.warn(
    `%c ${e.nodeName} requires ${t} element to be registered!`,
    "font-weight: bold;",
    i,
    e
  );
}, Sl = (e, t) => {
  function i(r) {
    const s = e.getBoundingClientRect(), n = e.ownerDocument.defaultView, u = s.left + n.scrollX, c = s.top + n.scrollY;
    let h;
    if ("TouchEvent" in window && r instanceof TouchEvent)
      h = r.touches[0];
    else if (r instanceof MouseEvent)
      h = r;
    else
      return;
    const m = h.pageX - u, f = h.pageY - c;
    t?.onMove && t.onMove(m, f);
  }
  function o() {
    document.removeEventListener("pointermove", i), document.removeEventListener("pointerup", o), t?.onStop && t.onStop();
  }
  document.addEventListener("pointermove", i, { passive: !0 }), document.addEventListener("pointerup", o), t?.initialEvent && i(t.initialEvent);
}, A = (e, t, i) => Math.min(Math.max(e, t), i), $a = (e, t, i) => i + t - e, Nh = (e, t, i) => {
  let o = e;
  for (; o !== null; ) {
    const r = o instanceof HTMLElement && o.hasAttribute(t) && o.getAttribute(t) === i, s = o.querySelector(`[${t}="${i}"]`) !== null;
    if (r)
      return o;
    if (s)
      return o.querySelector(
        `[${t}="${i}"]`
      );
    o = o.parentElement || o.parentNode || o.host || null;
  }
  return null;
};
function Vh(e) {
  return e ? e.assignedNodes({ flatten: !0 }).length > 0 : !1;
}
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>`;
const Qo = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 1-1h3l9-9" /><path d="M3 21v-3l9-9" /><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" /><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" /><path d="M15 2v5h5" /></svg>`;
const Bh = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /><path d="M2 10h20" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>`;
const Hh = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></svg>`;
const jh = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>`;
const An = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>`;
const Rh = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>`;
const Fh = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>`;
const Wh = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></svg>`, Gh = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>`;
b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" /><path d="M17.8 11.8 19 13" /><path d="M15 9h0" /><path d="M17.8 6.2 19 5" /><path d="m3 21 9-9" /><path d="M12.2 6.2 11 5" /></svg>`;
const qh = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>`;
var Kh = Object.defineProperty, Xh = Object.getOwnPropertyDescriptor, Ol = (e) => {
  throw TypeError(e);
}, ye = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Xh(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Kh(t, i, r), r;
}, Il = (e, t, i) => t.has(e) || Ol("Cannot " + i), Yh = (e, t, i) => (Il(e, t, "read from private field"), t.get(e)), Zh = (e, t, i) => t.has(e) ? Ol("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Qh = (e, t, i, o) => (Il(e, t, "write to private field"), t.set(e, i), i), Wr;
let te = class extends Le(
  De("", mh(v))
) {
  constructor() {
    super(), this.type = "button", this.disabled = !1, this.look = "default", this.color = "default", this.compact = !1, this.state = void 0, Zh(this, Wr), this.addEventListener("click", this._onHostClick);
  }
  getFormElement() {
    return this._button;
  }
  async focus() {
    await this.updateComplete, this._button.focus();
  }
  async blur() {
    await this.updateComplete, this._button.blur();
  }
  async click() {
    await this.updateComplete, this._button.click();
  }
  _onHostClick(e) {
    if (this.disabled) {
      e.preventDefault(), e.stopImmediatePropagation();
      return;
    }
    if (this._internals?.form)
      switch (this.type) {
        case "reset":
          this._internals.form.reset();
          break;
        case "button":
          break;
        default:
          this._internals.form.requestSubmit ? this._internals.form.requestSubmit() : this._internals.form.dispatchEvent(new SubmitEvent("submit"));
          break;
      }
    this._togglePopover();
  }
  // Reset the state after 2sec if it is 'success' or 'failed'.
  updated(e) {
    super.updated(e), e.has("state") && (clearTimeout(Yh(this, Wr)), (this.state === "success" || this.state === "failed") && Qh(this, Wr, setTimeout(
      () => this.state = void 0,
      2e3
    )));
  }
  renderState() {
    let e;
    switch (this.state) {
      case "waiting":
        y(this, "uui-loader-circle"), e = l`<uui-loader-circle id="loader"></uui-loader-circle>`;
        break;
      case "success":
        y(this, "uui-icon"), e = l`<uui-icon
          name="check"
          .fallback=${Qo.strings[0]}></uui-icon>`;
        break;
      case "failed":
        y(this, "uui-icon"), e = l`<uui-icon
          name="wrong"
          .fallback=${qh.strings[0]}></uui-icon>`;
        break;
      default:
        return k;
    }
    return l`<div id="state">${e}</div>`;
  }
  render() {
    return this.href ? l`
          <a
            id="button"
            aria-label=${_(this.label)}
            href=${_(this.disabled ? void 0 : this.href)}
            target=${_(this.target || void 0)}
            rel=${_(
      this.rel || _(
        this.target === "_blank" ? "noopener noreferrer" : void 0
      )
    )}>
            ${this.renderState()} ${this.renderLabel()}
            <slot name="extra"></slot>
          </a>
        ` : l`
          <button
            id="button"
            type=${this.type}
            ?disabled=${this.disabled}
            aria-label=${_(this.label)}>
            ${this.renderState()} ${this.renderLabel()}
            <slot name="extra"></slot>
          </button>
        `;
  }
};
Wr = /* @__PURE__ */ new WeakMap();
te.styles = [
  Yo,
  p`
      :host {
        position: relative;
        display: inline-flex;
        margin-left: calc(var(--uui-button-merge-border-left, 0) * -1px);
        --uui-button-padding-left-factor: 3;
        --uui-button-padding-right-factor: 3;
        --uui-button-padding-top-factor: 1;
        --uui-button-padding-bottom-factor: 1;

        min-height: var(--uui-button-height, var(--uui-size-11,33px));
        max-height: 100%;
        cursor: pointer;

        text-align: center;
        font-size: var(--uui-button-font-size, inherit);
        font-weight: var(--uui-button-font-weight, 500);
        transition:
          background-color 80ms,
          border-color 80ms,
          color 80ms;
      }

      :host([compact]) {
        --uui-button-padding-left-factor: 1;
        --uui-button-padding-right-factor: 1;
        --uui-button-padding-top-factor: 0;
        --uui-button-padding-bottom-factor: 0;
      }

      .label {
        line-height: 1; /** needed to reset 'a > span' */
        transition: opacity 120ms;
        display: flex;
        gap: var(--uui-size-1,3px);
        align-items: center;
      }

      :host([state]:not([state=''])) .label {
        opacity: 0;
      }

      #state {
        position: absolute;
        opacity: 0;
        animation-name: fadeIn;
        animation-delay: 40ms;
        animation-duration: 360ms;
        animation-fill-mode: forwards;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        align-items: center;
      }

      #button {
        width: 100%;
        background-color: transparent;
        color: inherit;
        font-size: inherit;
        border-radius: inherit;
        font-family: inherit;
        font-weight: inherit;
        text-align: inherit;
        border: none;
        cursor: inherit;

        display: inline-flex;
        align-items: center;
        justify-content: var(--uui-button-content-align, center);

        /* for anchor tag: */
        text-decoration: none;
        color: currentColor;
        line-height: inherit;

        border-width: var(--uui-button-border-width, 1px);
        border-style: solid;
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-border-radius,3px)
        );
        cursor: pointer;

        padding: calc(var(--uui-size-2,6px) * var(--uui-button-padding-top-factor))
          calc(var(--uui-size-2,6px) * var(--uui-button-padding-right-factor))
          calc(var(--uui-size-2,6px) * var(--uui-button-padding-bottom-factor))
          calc(var(--uui-size-2,6px) * var(--uui-button-padding-left-factor));

        box-shadow: none;

        transition: var(--uui-button-transition, none);
      }

      #button:focus-visible {
        outline: 2px solid var(--color-emphasis);
      }

      button[disabled]:active,
      a:not([href]):active {
        animation: ${Zo};
      }

      /* ANIMATIONS */
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      #icon-check,
      #icon-wrong {
        display: grid;
        place-items: center;
        width: 1.5em;
      }

      #loader {
        font-size: 1.5em;
      }
      :host([look]:not([look=''])) #loader {
        color: inherit;
      }

      /* edge case for default color */
      :host(:not([color]):not([look='primary'])),
      :host([color='']:not([look='primary'])),
      :host([color='default']:not([look='primary'])) {
        --uui-button-contrast-hover: var(--uui-color-default-emphasis,#3544b1);
      }

      :host([color='warning'][look='outline']) #button,
      :host([color='warning'][look='placeholder']) #button {
        --uui-button-contrast-hover: var(--color-standalone);
      }

      /** Button color attribute: */
      #button {
        --color: var(--uui-color-default,#1b264f);
        --color-standalone: var(--uui-color-default-standalone,rgb(
    28,
    35,
    59
  ));
        --color-emphasis: var(--uui-color-default-emphasis,#3544b1);
        --color-contrast: var(--uui-color-default-contrast,#fff);
      }
      :host([color='positive']) #button {
        --color: var(--uui-color-positive,#0b8152);
        --color-standalone: var(--uui-color-positive-standalone,rgb(
    10,
    115,
    73
  ));
        --color-emphasis: var(--uui-color-positive-emphasis,rgb(
    13,
    155,
    98
  ));
        --color-contrast: var(--uui-color-positive-contrast,#fff);
      }
      :host([color='warning']) #button {
        --color: var(--uui-color-warning,#fbd142);
        --color-standalone: var(--uui-color-warning-standalone,#a17700);
        --color-emphasis: var(--uui-color-warning-emphasis,rgb(
    251,
    224,
    101
  ));
        --color-contrast: var(--uui-color-warning-contrast,#000);
      }
      :host([color='danger']) #button {
        --color: var(--uui-color-danger,#d42054);
        --color-standalone: var(--uui-color-danger-standalone,rgb(
    191,
    33,
    78
  ));
        --color-emphasis: var(--uui-color-danger-emphasis,rgb(
    226,
    60,
    107
  ));
        --color-contrast: var(--uui-color-danger-contrast,white);
      }
      :host([color='invalid']) #button {
        --color: var(--uui-color-invalid,#d42054);
        --color-standalone: var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
        --color-emphasis: var(--uui-color-invalid-emphasis,rgb(
    226,
    60,
    107
  ));
        --color-contrast: var(--uui-color-invalid-contrast,white);
      }
      :host([disabled]) #button {
        --color: var(--uui-color-disabled,#f3f3f5);
        --color-standalone: var(--uui-color-disabled-contrast,#c4c4c4);
        --color-emphasis: var(--uui-color-disabled,#f3f3f5);
        --color-contrast: var(--uui-color-disabled-contrast,#c4c4c4);

        cursor: default;
      }

      /** Button look attribute: */
      /* DEFAULT */
      #button {
        background-color: var(--uui-button-background-color, transparent);
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(--uui-button-border-color, transparent);
      }
      :host(:not([disabled]):hover) #button {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-color-surface-emphasis,rgb(
    250,
    250,
    250
  ))
        );
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover, transparent);
      }
      :host([disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          transparent
        );
        color: var(--uui-button-contrast-disabled, var(--color-contrast));
        border-color: var(--uui-button-border-color-disabled, transparent);
      }

      /* PRIMARY */
      :host([look='primary']) #button {
        background-color: var(--uui-button-background-color, var(--color));
        color: var(--uui-button-contrast, var(--color-contrast));
        border-color: var(--uui-button-border-color, transparent);

        /* special for primary: */
        font-weight: var(--uui-button-font-weight, 700);
      }

      :host([look='primary']:hover) #button {
        background-color: var(
          --uui-button-background-color-hover,
          var(--color-emphasis)
        );
        color: var(--uui-button-contrast-hover, var(--color-contrast));
        border-color: var(--uui-button-border-color-hover, transparent);
      }

      /* special outline offset tof primary style so you can see the outline */
      :host([look='primary']) #button:focus-visible {
        outline-offset: 2px;
      }

      :host([look='primary'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--color)
        );
        color: var(--uui-button-contrast-disabled, var(--color-contrast));
        border-color: var(--uui-button-border-color-disabled, var(--color));
      }
      /* SECONDARY */
      :host([look='secondary']) #button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-color-surface-alt,#f3f3f5)
        );
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(--uui-button-border-color, transparent);

        /* special for secondary: */
        font-weight: var(--uui-button-font-weight, 700);
      }
      :host([look='secondary']:hover) #button {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-color-surface-emphasis,rgb(
    250,
    250,
    250
  ))
        );
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover, transparent);
      }
      :host([look='secondary'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--color)
        );
        color: var(--uui-button-contrast-disabled, var(--color-contrast));
        border-color: var(--uui-button-border-color-disabled, var(--color));
      }

      /* OUTLINE */
      :host([look='outline']) #button {
        background-color: var(--uui-button-background-color, transparent);
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(
          --uui-button-border-color,
          var(--uui-color-border-standalone,#c2c2c2)
        );

        /* special for outline: */
        font-weight: var(--uui-button-font-weight, 700);
      }
      :host([look='outline']:not([disabled]):hover) #button {
        background-color: var(--uui-button-background-color-hover, transparent);
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover);
      }
      :host([look='outline'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          transparent
        );
        color: var(--uui-button-contrast-disabled, var(--color-standalone));
        border-color: var(
          --uui-button-border-color-disabled,
          var(--color-standalone)
        );
      }

      /* PLACEHOLDER */
      :host([look='placeholder']) #button {
        border-style: dashed;
        background-color: var(--uui-button-background-color, transparent);
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(
          --uui-button-border-color,
          var(--uui-color-border-standalone,#c2c2c2)
        );
      }
      :host([look='placeholder']:not([disabled]):hover) #button {
        background-color: var(--uui-button-background-color-hover, transparent);
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover);
      }
      :host([look='placeholder'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--color)
        );
        color: var(--uui-button-contrast-disabled, var(--color-standalone));
        border-color: var(
          --uui-button-border-color-disabled,
          var(--color-standalone)
        );
      }
    `
];
ye([
  a({ type: String, reflect: !0 })
], te.prototype, "type", 2);
ye([
  a({ type: Boolean, reflect: !0 })
], te.prototype, "disabled", 2);
ye([
  a({ reflect: !0 })
], te.prototype, "look", 2);
ye([
  a({ reflect: !0 })
], te.prototype, "color", 2);
ye([
  a({ type: Boolean, reflect: !0 })
], te.prototype, "compact", 2);
ye([
  a({ type: String, reflect: !0 })
], te.prototype, "state", 2);
ye([
  a({ type: String })
], te.prototype, "href", 2);
ye([
  a({ type: String })
], te.prototype, "target", 2);
ye([
  a({ type: String })
], te.prototype, "rel", 2);
ye([
  P("#button")
], te.prototype, "_button", 2);
te = ye([
  d("uui-button")
], te);
class Ir extends S {
  constructor() {
    super(...arguments), this.text = null;
  }
  static {
    this.COPIED = "copied";
  }
  static {
    this.COPYING = "copying";
  }
}
var Jh = Object.defineProperty, ed = Object.getOwnPropertyDescriptor, Al = (e) => {
  throw TypeError(e);
}, Jo = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ed(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Jh(t, i, r), r;
}, Ul = (e, t, i) => t.has(e) || Al("Cannot " + i), ps = (e, t, i) => (Ul(e, t, "read from private field"), i ? i.call(e) : t.get(e)), ka = (e, t, i) => t.has(e) ? Al("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), td = (e, t, i, o) => (Ul(e, t, "write to private field"), t.set(e, i), i), Ri, Us;
let di = class extends te {
  constructor() {
    super(), this.text = "", this.copyFrom = "", this.animationStateDelay = 250, ka(this, Ri), ka(this, Us, async () => {
      this.state = "waiting";
      let e = this.text;
      if (this.copyFrom) {
        const i = document.getElementById(this.copyFrom);
        if (i)
          "value" in i ? e = i.value : e = i.textContent ?? i.innerText ?? "";
        else {
          console.error(`Element ID ${this.copyFrom} not found to copy from`), this.state = "failed";
          return;
        }
      }
      const t = new Ir(Ir.COPYING);
      t.text = e, this.dispatchEvent(t), t.text != null && (e = t.text);
      try {
        await navigator.clipboard.writeText(e);
        const i = new Ir(Ir.COPIED);
        i.text = e, this.dispatchEvent(i), td(this, Ri, setTimeout(() => {
          this.state = "success";
        }, this.animationStateDelay));
      } catch (i) {
        this.state = "failed", console.error("Error copying to clipboard", i);
      }
    }), y(this, "uui-icon"), this.addEventListener("click", ps(this, Us));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), ps(this, Ri) && clearTimeout(ps(this, Ri));
  }
  renderLabel() {
    return l`
      <slot class="label">
        <uui-icon name="copy"></uui-icon>
      </slot>
    `;
  }
};
Ri = /* @__PURE__ */ new WeakMap();
Us = /* @__PURE__ */ new WeakMap();
di.styles = te.styles;
Jo([
  a({ type: String })
], di.prototype, "text", 2);
Jo([
  a({ type: String, attribute: "copy-from" })
], di.prototype, "copyFrom", 2);
Jo([
  a({ type: Number, attribute: "animation-state-delay" })
], di.prototype, "animationStateDelay", 2);
di = Jo([
  d("uui-button-copy-text")
], di);
var id = Object.getOwnPropertyDescriptor, rd = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? id(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let vo = class extends Te {
  renderCheckbox() {
    return l`
      <div id="ticker">
        <div id="icon-check">
          ${this.indeterminate ? Fh : Qo}
        </div>
      </div>
    `;
  }
};
vo.formAssociated = !0;
vo.styles = [
  ...Te.styles,
  Yo,
  p`
      :host {
        --uui-checkbox-size: 18px;
      }

      #ticker {
        position: relative;
        grid-area: 'input';
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        box-sizing: border-box;
        width: var(--uui-checkbox-size);
        height: var(--uui-checkbox-size);
        border-radius: var(
          --uui-checkbox-border-radius,
          var(--uui-border-radius,3px)
        );

        color: var(--uui-toggle-color, var(--uui-color-selected-contrast,#fff));
        background-color: var(
          --uui-toggle-background-color,
          var(--uui-color-surface,#fff)
        );
        border: 1px solid
          var(--uui-checkbox-border-color, var(--uui-color-border-standalone,#c2c2c2));
        font-size: calc(var(--uui-checkbox-size) * 0.7);
      }
      label:hover input:not([disabled]) + #ticker {
        border-color: var(
          --uui-checkbox-border-color-hover,
          var(--uui-color-border-emphasis,#a1a1a1)
        );
        background-color: var(
          --uui-checkbox-background-color-hover,
          var(--uui-color-surface-emphasis,rgb(
    250,
    250,
    250
  ))
        );
      }
      label:focus #ticker {
        border-color: var(
          --uui-checkbox-border-color-focus,
          var(--uui-color-border-emphasis,#a1a1a1)
        );
        background-color: var(
          --uui-checkbox-background-color-focus,
          var(--uui-color-surface-emphasis,rgb(
    250,
    250,
    250
  ))
        );
      }
      input:checked:not([disabled]) + #ticker,
      input:indeterminate:not([disabled]) + #ticker {
        border-color: var(--uui-color-selected,#3544b1);
      }

      label:hover input:checked:not([disabled]) + #ticker,
      label:hover input:indeterminate:not([disabled]) + #ticker {
        border-color: var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
      }

      label:focus input:checked + #ticker,
      label:focus input:indeterminate + #ticker {
        border-color: var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
      }

      #icon-check {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 0;
        transition:
          fill 120ms,
          opacity 120ms;
        color: var(--uui-color-selected-contrast,#fff);
        opacity: 0;
      }

      #ticker::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: calc(
          var(--uui-checkbox-border-radius, var(--uui-border-radius,3px)) * 0.5
        );
        background-color: var(--uui-color-selected,#3544b1);
        transition:
          transform 120ms ease,
          opacity 120ms,
          background-color 120ms;
        transform: scale(0);
        opacity: 0;
      }
      label:hover input:checked:not([disabled]) + #ticker::before,
      label:hover input:indeterminate:not([disabled]) + #ticker::before {
        background-color: var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
      }

      input:checked + #ticker::before,
      input:indeterminate + #ticker::before {
        transform: scale(1);
        opacity: 1;
      }
      input:checked + #ticker #icon-check,
      input:indeterminate + #ticker #icon-check {
        opacity: 1;
      }
      label:focus input:checked + #ticker,
      label:focus input:indeterminate + #ticker {
        background-color: var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
      }

      input:focus + #ticker {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus,#3879ff);
      }

      :host(:not([disabled], [readonly]))
        label:active
        input:checked
        + #ticker::before {
        /** Stretch when mouse down */
        transform: scale(0.9);
      }

      :host(:not([disabled], [readonly]))
        label:active
        input:indeterminate
        + #ticker::before {
        /** Stretch when mouse down */
        transform: scale(0.9);
      }

      :host(:not([pristine]):invalid) #ticker,
      :host(:not([pristine]):invalid) label:hover #ticker,
      :host(:not([pristine]):invalid) label:hover input:checked:not([disabled]) + #ticker,
      :host(:not([pristine]):invalid) label:hover input:indeterminate:not([disabled]) + #ticker,
      :host(:not([pristine]):invalid) label:focus input:checked + #ticker,
      :host(:not([pristine]):invalid) label:focus input:indeterminate + #ticker,
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) #ticker,
      :host(:not([pristine])[internals-invalid]) label:hover #ticker,
      :host(:not([pristine])[internals-invalid]) label:hover input:checked:not([disabled]) + #ticker,
      :host(:not([pristine])[internals-invalid]) label:hover input:indeterminate:not([disabled]) + #ticker,
      :host(:not([pristine])[internals-invalid]) label:focus input:checked + #ticker,
      :host(:not([pristine])[internals-invalid]) label:focus input:indeterminate + #ticker {
        border: 1px solid var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
      }

      :host([disabled]) #ticker {
        background-color: var(--uui-color-disabled,#f3f3f5);
      }
      :host([disabled]) input:checked + #ticker {
        background-color: var(--uui-color-disabled,#f3f3f5);
      }
      :host([disabled]) input:indeterminate + #ticker {
        background-color: var(--uui-color-disabled,#f3f3f5);
      }
      :host([disabled]) #ticker::before {
        background-color: var(--uui-color-disabled,#f3f3f5);
      }
      :host([disabled]) #ticker #icon-check {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }
      :host([disabled]) label:active #ticker {
        animation: ${Zo};
      }
      :host([disabled]) input:checked + #ticker #icon-check,
      :host([disabled]) input:indeterminate + #ticker #icon-check {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }
    `
];
vo = rd([
  d("uui-checkbox")
], vo);
class Ar extends S {
  static {
    this.OPEN = "open";
  }
}
var od = Object.defineProperty, sd = Object.getOwnPropertyDescriptor, Si = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? sd(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && od(t, i, r), r;
};
let Z = class extends Xo(
  ki(v)
) {
  constructor() {
    super(...arguments), this.disabled = !1, this.error = !1;
  }
  // This is deprecated - use href instead
  handleOpenClick(e) {
    this.disabled || (e.stopPropagation(), this.dispatchEvent(new Ar(Ar.OPEN)));
  }
  // This is deprecated - use href instead
  handleOpenKeydown(e) {
    this.disabled || e.key === "Enter" && (e.preventDefault(), e.stopPropagation(), this.dispatchEvent(new Ar(Ar.OPEN)));
  }
  renderCheckbox() {
    if (this.selectable)
      return l`
      <uui-checkbox
        id="select-checkbox"
        label="select"
        tabindex="-1"
        ?checked=${this.selected}
        @click=${(e) => e.stopPropagation()}
        @change=${() => this.click()}>
      </uui-checkbox>
    `;
  }
  render() {
    return l`<slot id="open-part"></slot>
      <div id="select-border"></div>`;
  }
};
Z.styles = [
  _r,
  p`
      :host {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-1,0 1px 3px rgba(0,0,0,0.12) , 0 1px 2px rgba(0,0,0,0.24));
        border-radius: var(--uui-border-radius,3px);
        min-height: var(--uui-layout-medium);
        background-color: var(--uui-color-surface,#fff);
        --uui-card-border-width: 3px;
        transition: box-shadow 100ms ease-out;
      }

      :host([selectable]:focus-visible) {
        outline-color: var(--uui-color-focus,#3879ff);
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
      }

      :host() * {
        /* TODO: implement globally shared outline style */
        outline-color: var(--uui-color-focus,#3879ff);
      }

      :host([error])::before {
        content: '';
        position: absolute;
        pointer-events: none;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        box-sizing: border-box;
        border: var(--uui-card-border-width) solid var(--uui-color-invalid,#d42054);
        border-radius: var(--uui-border-radius,3px);
      }

      button {
        font-size: inherit;
        font-family: inherit;
        border: 0;
        padding: 0;
        background-color: transparent;
        text-align: left;
        color: var(--uui-color-text,#060606);
      }

      a {
        text-decoration: none;
        color: inherit;
        line-height: initial;
      }

      button:focus,
      a:focus {
        outline-color: var(--uui-color-focus,#3879ff);
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
        border-radius: var(--uui-border-radius,3px);
      }

      :host([selectable]) {
        cursor: pointer;
      }
      :host([selectable]) #select-border {
        position: absolute;
        z-index: 2;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host([selectable]) #select-border::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid var(--uui-color-selected,#3544b1);
        border-radius: calc(var(--uui-border-radius,3px) + 2px);
        box-shadow:
          0 0 4px 0 var(--uui-color-selected,#3544b1),
          inset 0 0 2px 0 var(--uui-color-selected,#3544b1);
      }
      :host([selected]) #select-border {
        opacity: 1;
      }
      :host([selectable]:not([selected]):hover) #select-border {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover) #select-border {
        opacity: 0.8;
      }

      :host([selectable]:not([selected])) #open-part:hover + #select-border {
        opacity: 0;
      }
      :host([selectable][selected]) #open-part:hover + #select-border {
        opacity: 1;
      }

      :host([selectable]:not([selected]):hover) #select-border::after {
        animation: not-selected--hover 1.2s infinite;
      }
      @keyframes not-selected--hover {
        0%,
        100% {
          opacity: 0.66;
        }
        50% {
          opacity: 1;
        }
      }

      :host([selectable][selected]:hover) #select-border::after {
        animation: selected--hover 1.4s infinite;
      }
      @keyframes selected--hover {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.66;
        }
      }
      :host([selectable]) #open-part:hover + #select-border::after {
        animation: none;
      }

      :host([select-only]) *,
      :host([select-only]) ::slotted(*) {
        pointer-events: none;
      }

      :host([disabled]) {
        background: var(--uui-color-disabled,#f3f3f5);
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }

      #select-checkbox {
        position: absolute;
        top: var(--uui-size-4,12px);
        left: var(--uui-size-4,12px);
        opacity: 0;
        transition: opacity 120ms;
        z-index: 3;
      }
      :host(:focus) #select-checkbox,
      :host(:focus-within) #select-checkbox,
      :host(:hover) #select-checkbox,
      #select-checkbox[checked] {
        opacity: 1;
      }
    `
];
Si([
  a({ type: Boolean, reflect: !0, attribute: "disabled" })
], Z.prototype, "disabled", 2);
Si([
  a({ type: Boolean, reflect: !0 })
], Z.prototype, "error", 2);
Si([
  a({ type: String })
], Z.prototype, "href", 2);
Si([
  a({ type: String })
], Z.prototype, "target", 2);
Si([
  a({ type: String })
], Z.prototype, "rel", 2);
Z = Si([
  d("uui-card")
], Z);
var nd = Object.defineProperty, ad = Object.getOwnPropertyDescriptor, zl = (e) => {
  throw TypeError(e);
}, es = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ad(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && nd(t, i, r), r;
}, ld = (e, t, i) => t.has(e) || zl("Cannot " + i), ud = (e, t, i) => t.has(e) ? zl("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Xi = (e, t, i) => (ld(e, t, "access private method"), i), Ut, Ml, Dl, Ll, Un;
let pi = class extends Z {
  constructor() {
    super(...arguments), ud(this, Ut), this.name = "";
  }
  get background() {
  }
  set background(e) {
    this.style.backgroundColor = e ?? "";
  }
  render() {
    return l`
      ${Xi(this, Ut, Ll).call(this)}
      ${this.href ? Xi(this, Ut, Dl).call(this) : Xi(this, Ut, Ml).call(this)}
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>
      ${this.selectable ? this.renderCheckbox() : k}
      <slot name="tag"></slot>
      <slot name="actions"></slot>
    `;
  }
};
Ut = /* @__PURE__ */ new WeakSet();
Ml = function() {
  const e = this.disabled ? void 0 : this.selectOnly ? -1 : 0;
  return l`
      <button
        id="open-part"
        class="uui-text"
        tabindex=${_(e)}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        ${Xi(this, Ut, Un).call(this)}
      </button>
    `;
};
Dl = function() {
  const e = this.disabled ? void 0 : this.selectOnly ? -1 : 0, t = this.target === "_blank" ? "noopener noreferrer" : void 0;
  return l`
      <a
        id="open-part"
        class="uui-text"
        tabindex=${_(e)}
        href=${_(this.disabled ? void 0 : this.href)}
        target=${_(this.target || void 0)}
        rel=${_(this.rel || t)}>
        ${Xi(this, Ut, Un).call(this)}
      </a>
    `;
};
Ll = function() {
  return l`<div id="portrait">
      <slot></slot>
    </div> `;
};
Un = function() {
  return l`
      <div id="content">
        <span title="${this.name}" id="name">${this.name}</span>
        <small title="${_(this.description)}">${this.description}<slot name="description"></slot></small>
      </div></div>
    `;
};
pi.styles = [
  ...Z.styles,
  p`
      :host {
        background-color: var(--uui-color-surface-alt,#f3f3f5);
      }

      slot[name='tag'] {
        position: absolute;
        top: var(--uui-size-4,12px);
        right: var(--uui-size-4,12px);
        display: flex;
        justify-content: right;
        z-index: 2;
      }

      slot[name='actions'] {
        position: absolute;
        top: var(--uui-size-4,12px);
        right: var(--uui-size-4,12px);
        display: flex;
        justify-content: right;
        z-index: 2;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:focus) slot[name='actions'],
      :host(:focus-within) slot[name='actions'],
      :host(:hover) slot[name='actions'] {
        opacity: 1;
      }

      #portrait {
        display: flex;
        justify-content: center;
        min-height: 150px;
        max-height: 150px;
        width: 100%;
        margin-bottom: var(--uui-size-layout-2,30px);
      }

      slot:not([name])::slotted(*) {
        align-self: center;
        border-radius: var(--uui-border-radius,3px);
        object-fit: cover;
        max-width: 100%;
        max-height: 100%;
        font-size: var(--uui-size-8,24px);
      }

      #open-part {
        position: absolute;
        z-index: 1;
        inset: 0;
        color: var(--uui-color-interactive,#1b264f);
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      :host([disabled]) #open-part {
        pointer-events: none;
        background: var(--uui-color-disabled,#f3f3f5);
        color: var(--uui-color-contrast-disabled);
      }

      #open-part:hover {
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }
      #open-part:hover #name {
        text-decoration: underline;
      }
      #open-part #name,
      #open-part small {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
      }

      :host([image]:not([image=''])) #open-part {
        transition: opacity 0.5s 0.5s;
        opacity: 0;
      }

      #content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        font-family: inherit;
        font-size: var(--uui-type-small-size,12px);
        box-sizing: border-box;
        text-align: left;
        word-break: break-word;
        padding-top: var(--uui-size-space-3,9px);
      }

      #content::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        border-top: 1px solid var(--uui-color-divider,#f6f6f7);
        border-radius: 0 0 var(--uui-border-radius,3px) var(--uui-border-radius,3px);
        background-color: var(--uui-color-surface,#fff);
        pointer-events: none;
        opacity: 0.96;
      }

      :host(:focus) slot[name='actions'],
      :host(:focus-within) slot[name='actions'],
      :host(:hover) slot[name='actions'] {
        opacity: 1;
      }

      :host(
          [image]:not([image='']):hover,
          [image]:not([image='']):focus,
          [image]:not([image='']):focus-within,
          [selected][image]:not([image='']),
          [error][image]:not([image=''])
        )
        #open-part {
        opacity: 1;
        transition-duration: 120ms;
        transition-delay: 0s;
      }

      :host([selectable]) #open-part {
        inset: var(--uui-size-space-3,9px) var(--uui-size-space-4,12px);
      }
      :host(:not([selectable])) #content {
        padding: var(--uui-size-space-3,9px) var(--uui-size-space-4,12px);
      }
      :host([selectable]) #content::before {
        inset: calc(var(--uui-size-space-3,9px) * -1)
          calc(var(--uui-size-space-4,12px) * -1);
        top: 0;
      }
    `
];
es([
  a({ type: String })
], pi.prototype, "name", 2);
es([
  a({ type: String })
], pi.prototype, "description", 2);
es([
  a({ type: String, attribute: "background" })
], pi.prototype, "background", 1);
pi = es([
  d("uui-card-block-type")
], pi);
var cd = Object.defineProperty, hd = Object.getOwnPropertyDescriptor, Tl = (e) => {
  throw TypeError(e);
}, ts = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? hd(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && cd(t, i, r), r;
}, dd = (e, t, i) => t.has(e) || Tl("Cannot " + i), pd = (e, t, i) => t.has(e) ? Tl("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), fo = (e, t, i) => (dd(e, t, "access private method"), i), ri, zn, Nl, Vl;
let vi = class extends Z {
  constructor() {
    super(...arguments), pd(this, ri), this.name = "", this.detail = "", this._iconSlotHasContent = !1, this.fallbackIcon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    id="icon">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>`;
  }
  _onSlotIconChange(e) {
    this._iconSlotHasContent = e.target.assignedNodes({ flatten: !0 }).length > 0;
  }
  _renderFallbackIcon() {
    return y(this, "uui-icon"), l`<uui-icon .svg="${this.fallbackIcon}"></uui-icon>`;
  }
  renderDetail() {
    return l`<small id="detail"
        >${this.detail}<slot name="detail"></slot></small
      ><slot id="default"></slot>`;
  }
  render() {
    return l`
      ${this.href ? fo(this, ri, Vl).call(this) : fo(this, ri, Nl).call(this)}
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>
      ${this.selectable ? this.renderCheckbox() : k}
      <slot name="tag"></slot>
      <slot name="actions"></slot>
    `;
  }
};
ri = /* @__PURE__ */ new WeakSet();
zn = function() {
  return l`
      <span id="content" class="uui-text">
        <span id="item">
          <span id="icon">
            <slot name="icon" @slotchange=${this._onSlotIconChange}></slot>
            ${this._iconSlotHasContent === !1 ? this._renderFallbackIcon() : ""}
          </span>
          <div title="${this.name}" id="name">
            ${this.name}<slot name="name"></slot>
          </div>
        </span>
        ${this.renderDetail()}
      </span>
    `;
};
Nl = function() {
  const e = this.disabled ? void 0 : this.selectOnly ? -1 : 0;
  return l`
      <button
        id="open-part"
        tabindex=${_(e)}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        ${fo(this, ri, zn).call(this)}
      </button>
    `;
};
Vl = function() {
  const e = this.disabled ? void 0 : this.selectOnly ? -1 : 0, t = this.target === "_blank" ? "noopener noreferrer" : void 0;
  return l`
      <a
        id="open-part"
        tabindex=${_(e)}
        href=${_(this.disabled ? void 0 : this.href)}
        target=${_(this.target || void 0)}
        rel=${_(this.rel || t)}>
        ${fo(this, ri, zn).call(this)}
      </a>
    `;
};
vi.styles = [
  ...Z.styles,
  p`
      :host {
        min-width: 250px;
        flex-direction: column;
        justify-content: space-between;
      }

      slot[name='tag'] {
        position: absolute;
        top: var(--uui-size-4,12px);
        right: var(--uui-size-4,12px);
        display: flex;
        justify-content: right;
      }

      slot[name='actions'] {
        position: absolute;
        top: var(--uui-size-4,12px);
        right: var(--uui-size-4,12px);
        display: flex;
        justify-content: right;

        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:focus) slot[name='actions'],
      :host(:focus-within) slot[name='actions'],
      :host(:hover) slot[name='actions'] {
        opacity: 1;
      }

      slot:not([name]) {
        display: block;
        margin: var(--uui-size-1,3px);
        margin-top: var(--uui-size-3,9px);
      }

      slot:not([name])::slotted(*) {
        font-size: var(--uui-type-small-size,12px);
        line-height: calc(2 * var(--uui-size-3,9px));
      }

      #open-part {
        display: flex;
        position: relative;
        align-items: center;
        cursor: pointer;
        flex-grow: 1;
        padding: var(--uui-size-space-4,12px) var(--uui-size-space-5,18px);
      }

      #open-part #name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
      }

      #content {
        align-self: stretch;
        display: flex;
        flex-direction: column;
      }

      #item {
        position: relative;
        display: flex;
        align-self: stretch;
        line-height: normal;
        align-items: center;
        margin-top: var(--uui-size-1,3px);
      }

      #icon {
        font-size: 1.2em;
        margin-right: var(--uui-size-1,3px);
      }

      :host([selectable]) #open-part {
        padding: 0;
        margin: var(--uui-size-space-4,12px) var(--uui-size-space-5,18px);
      }

      :host([disabled]) #name {
        pointer-events: none;
      }

      :host(:not([disabled])) #open-part:hover #icon {
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }
      :host(:not([disabled])) #open-part:hover #name {
        text-decoration: underline;
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }
      :host(:not([disabled])) #open-part:hover #detail {
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }
      :host(:not([disabled])) #open-part:hover #default {
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }

      #select-checkbox {
        top: var(--uui-size-5,15px);
        left: var(--uui-size-6,18px);
      }
    `
];
ts([
  a({ type: String })
], vi.prototype, "name", 2);
ts([
  a({ type: String })
], vi.prototype, "detail", 2);
ts([
  g()
], vi.prototype, "_iconSlotHasContent", 2);
vi = ts([
  d("uui-card-content-node")
], vi);
var vd = Object.defineProperty, fd = Object.getOwnPropertyDescriptor, Bl = (e) => {
  throw TypeError(e);
}, wr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fd(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && vd(t, i, r), r;
}, bd = (e, t, i) => t.has(e) || Bl("Cannot " + i), gd = (e, t, i) => t.has(e) ? Bl("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), bo = (e, t, i) => (bd(e, t, "access private method"), i), oi, Hl, jl, Mn;
let Dt = class extends Z {
  constructor() {
    super(...arguments), gd(this, oi), this.name = "", this.fileExt = "", this.hasPreview = !1;
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-symbol-folder"), y(this, "uui-symbol-file");
  }
  queryPreviews(e) {
    this.hasPreview = e.composedPath()[0].assignedElements({
      flatten: !0
    }).length > 0;
  }
  renderMedia() {
    return this.hasPreview === !0 ? "" : this.fileExt === "" ? l`<uui-symbol-folder id="entity-symbol"></uui-symbol-folder>` : l`<uui-symbol-file
      id="entity-symbol"
      type="${this.fileExt}"></uui-symbol-file>`;
  }
  render() {
    return l` ${this.renderMedia()}
      <slot @slotchange=${this.queryPreviews}></slot>
      ${this.href ? bo(this, oi, jl).call(this) : bo(this, oi, Hl).call(this)}
      <!-- Select border must be right after .open-part -->
      <div id="select-border"></div>
      ${this.selectable ? this.renderCheckbox() : k}
      <slot name="tag"></slot>
      <slot name="actions"></slot>`;
  }
};
oi = /* @__PURE__ */ new WeakSet();
Hl = function() {
  const e = this.disabled ? void 0 : this.selectOnly ? -1 : 0;
  return l`
      <button
        id="open-part"
        tabindex=${_(e)}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        ${bo(this, oi, Mn).call(this)}
      </button>
    `;
};
jl = function() {
  const e = this.disabled ? void 0 : this.selectOnly ? -1 : 0, t = this.target === "_blank" ? "noopener noreferrer" : void 0;
  return l`
      <a
        id="open-part"
        tabindex=${_(e)}
        href=${_(this.disabled ? void 0 : this.href)}
        target=${_(this.target || void 0)}
        rel=${_(this.rel || t)}>
        ${bo(this, oi, Mn).call(this)}
      </a>
    `;
};
Mn = function() {
  return l`
      <div id="content" class="uui-text">
        <!--
        TODO: Implement info box when pop-out is ready
        -->
        <span id="name" title="${this.name}">${this.name}</span>
        <small id="detail">${this.detail}<slot name="detail"></slot></small>
      </div>
    `;
};
Dt.styles = [
  ...Z.styles,
  p`
      #entity-symbol {
        align-self: center;
        width: 60%;
        margin-bottom: var(--uui-size-layout-1,24px);
        padding: var(--uui-size-space-6,24px);
      }

      slot[name='tag'] {
        position: absolute;
        top: var(--uui-size-4,12px);
        right: var(--uui-size-4,12px);
        display: flex;
        justify-content: right;
        z-index: 2;
      }

      slot[name='actions'] {
        position: absolute;
        top: var(--uui-size-4,12px);
        right: var(--uui-size-4,12px);
        display: flex;
        justify-content: right;
        z-index: 2;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:focus) slot[name='actions'],
      :host(:focus-within) slot[name='actions'],
      :host(:hover) slot[name='actions'] {
        opacity: 1;
      }

      slot:not([name])::slotted(*) {
        align-self: center;
        border-radius: var(--uui-border-radius,3px);
        object-fit: cover;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      #open-part {
        position: absolute;
        z-index: 1;
        inset: 0;
        color: var(--uui-color-interactive,#1b264f);
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      :host([disabled]) #open-part {
        pointer-events: none;
        color: var(--uui-color-contrast-disabled);
      }

      #open-part:hover {
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }
      #open-part:hover #name {
        text-decoration: underline;
      }

      #open-part #name {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
      }

      :host([image]:not([image=''])) #open-part {
        transition: opacity 0.5s 0.5s;
        opacity: 0;
      }

      #content {
        position: relative;
        display: flex;
        flex-direction: column;
        font-family: inherit;
        box-sizing: border-box;
        text-align: left;
        word-break: break-word;
        padding-top: var(--uui-size-space-3,9px);
      }

      #content::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        border-top: 1px solid var(--uui-color-divider,#f6f6f7);
        border-radius: 0 0 var(--uui-border-radius,3px) var(--uui-border-radius,3px);
        background-color: var(--uui-color-surface,#fff);
        pointer-events: none;
        opacity: 0.96;
      }

      #detail {
        opacity: 0.6;
      }

      :host(
          [image]:not([image='']):hover,
          [image]:not([image='']):focus,
          [image]:not([image='']):focus-within,
          [selected][image]:not([image='']),
          [error][image]:not([image=''])
        )
        #open-part {
        opacity: 1;
        transition-duration: 120ms;
        transition-delay: 0s;
      }

      :host([selectable]) #open-part {
        inset: var(--uui-size-space-3,9px) var(--uui-size-space-4,12px);
      }
      :host(:not([selectable])) #content {
        padding: var(--uui-size-space-3,9px) var(--uui-size-space-4,12px);
      }
      :host([selectable]) #content::before {
        inset: calc(var(--uui-size-space-3,9px) * -1)
          calc(var(--uui-size-space-4,12px) * -1);
        top: 0;
      }

      /*
      #info-icon {
        margin-right: var(--uui-size-2);
        display: flex;
        height: var(--uui-size-8);
      }
      */
    `
];
wr([
  a({ type: String })
], Dt.prototype, "name", 2);
wr([
  a({ type: String })
], Dt.prototype, "detail", 2);
wr([
  a({ type: String, attribute: "file-ext" })
], Dt.prototype, "fileExt", 2);
wr([
  g()
], Dt.prototype, "hasPreview", 2);
Dt = wr([
  d("uui-card-media")
], Dt);
var md = Object.defineProperty, _d = Object.getOwnPropertyDescriptor, Rl = (e) => {
  throw TypeError(e);
}, Dn = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? _d(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && md(t, i, r), r;
}, yd = (e, t, i) => t.has(e) || Rl("Cannot " + i), wd = (e, t, i) => t.has(e) ? Rl("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), go = (e, t, i) => (yd(e, t, "access private method"), i), si, Fl, Wl, Ln;
let ar = class extends Z {
  constructor() {
    super(...arguments), wd(this, si), this.name = "", this._avatarSlotHasContent = !1, this._avatarSlotChanged = (e) => {
      this._avatarSlotHasContent = Vh(e.target);
    };
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-avatar");
  }
  render() {
    return l`
      ${this.href ? go(this, si, Wl).call(this) : go(this, si, Fl).call(this)}
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>
      ${this.selectable ? this.renderCheckbox() : k}
      <slot name="tag"></slot>
      <slot name="actions"></slot>
    `;
  }
};
si = /* @__PURE__ */ new WeakSet();
Fl = function() {
  const e = this.disabled ? void 0 : this.selectOnly ? -1 : 0;
  return l`
      <div
        id="open-part"
        tabindex=${_(e)}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        ${go(this, si, Ln).call(this)}
      </div>
    `;
};
Wl = function() {
  const e = this.disabled ? void 0 : this.selectOnly ? -1 : 0, t = this.target === "_blank" ? "noopener noreferrer" : void 0;
  return l`
      <a
        id="open-part"
        tabindex=${_(e)}
        href=${_(this.disabled ? void 0 : this.href)}
        target=${_(this.target || void 0)}
        rel=${_(this.rel || t)}>
        ${go(this, si, Ln).call(this)}
      </a>
    `;
};
Ln = function() {
  return l`
      <div id="content">
        ${this._avatarSlotHasContent ? k : l`<uui-avatar
              class="avatar"
              name=${this.name}
              size="m"></uui-avatar>`}
        <slot
          name="avatar"
          class="avatar"
          @slotchange=${this._avatarSlotChanged}></slot>
        <span title="${this.name}">${this.name}</span>
        <slot></slot>
      </div>
    `;
};
ar.styles = [
  ...Z.styles,
  p`
      :host {
        min-width: 250px;
      }

      slot:not([name])::slotted(*) {
        font-size: var(--uui-type-small-size,12px);
        line-height: var(--uui-size-6,18px);
      }

      ::slotted(*) {
        text-align: center;
      }

      slot[name='tag'] {
        position: absolute;
        top: 6px;
        right: 6px;
        display: flex;
        justify-content: right;
      }

      slot[name='actions'] {
        position: absolute;
        top: var(--uui-size-space-4,12px);
        right: var(--uui-size-space-4,12px);
        display: flex;
        justify-content: right;

        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:focus) slot[name='actions'],
      :host(:focus-within) slot[name='actions'],
      :host(:hover) slot[name='actions'] {
        opacity: 1;
      }

      #open-part {
        cursor: pointer;
        flex-grow: 1;
        padding: var(--uui-size-space-5,18px) var(--uui-size-space-4,12px);
      }

      :host([disabled]) #open-part {
        pointer-events: none;
      }

      #open-part:hover #content {
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }
      #open-part:hover #content > span {
        text-decoration: underline;
      }

      :host([selectable]) #open-part {
        padding: 0;
        margin: var(--uui-size-space-5,18px) var(--uui-size-space-4,12px);
      }

      #content {
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        margin: 0 0 3px 0;
        height: 100%;
      }

      #content > span {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: center;
        margin-top: 3px;
        font-weight: 700;
        overflow-wrap: anywhere;
      }

      .avatar {
        font-size: 1.5em;
        margin-top: var(--uui-size-space-1,3px);
        margin-bottom: var(--uui-size-space-2,6px);
      }
    `
];
Dn([
  a({ type: String })
], ar.prototype, "name", 2);
Dn([
  g()
], ar.prototype, "_avatarSlotHasContent", 2);
ar = Dn([
  d("uui-card-user")
], ar);
var xd = Object.defineProperty, $d = Object.getOwnPropertyDescriptor, Gl = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? $d(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && xd(t, i, r), r;
};
let mo = class extends v {
  constructor() {
    super(), this.open = !1, console.error(
      "´uui-caret´ is deprecated, please use ´uui-symbol-expand´ or ´uui-symbol-sort´"
    );
  }
  render() {
    return l`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="m4 9 8 8 8-8"></path>
    </svg>`;
  }
};
mo.styles = [
  p`
      :host {
        display: inline-block;
        width: 12px;
        vertical-align: middle;
      }

      svg {
        transform-origin: 50% 50%;
        transition: transform 100ms cubic-bezier(0.1, 0, 0.9, 1);

      :host([open]) svg {
        transform: rotate(180deg);
      }
    `
];
Gl([
  a({ type: Boolean, reflect: !0 })
], mo.prototype, "open", 2);
mo = Gl([
  d("uui-caret")
], mo);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zs = Ei(class extends Pi {
  constructor(e) {
    if (super(e), e.type !== me.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in t) t[o] && !this.nt?.has(o) && this.st.add(o);
      return this.render(t);
    }
    const i = e.element.classList;
    for (const o of this.st) o in t || (i.remove(o), this.st.delete(o));
    for (const o in t) {
      const r = !!t[o];
      r === this.st.has(o) || this.nt?.has(o) || (r ? (i.add(o), this.st.add(o)) : (i.remove(o), this.st.delete(o)));
    }
    return se;
  }
});
var kd = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, He = function(e) {
  return typeof e == "string" ? e.length > 0 : typeof e == "number";
}, R = function(e, t, i) {
  return t === void 0 && (t = 0), i === void 0 && (i = Math.pow(10, t)), Math.round(i * e) / i + 0;
}, de = function(e, t, i) {
  return t === void 0 && (t = 0), i === void 0 && (i = 1), e > i ? i : e > t ? e : t;
}, ql = function(e) {
  return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
}, Ca = function(e) {
  return { r: de(e.r, 0, 255), g: de(e.g, 0, 255), b: de(e.b, 0, 255), a: de(e.a) };
}, vs = function(e) {
  return { r: R(e.r), g: R(e.g), b: R(e.b), a: R(e.a, 3) };
}, Cd = /^#([0-9a-f]{3,8})$/i, Ur = function(e) {
  var t = e.toString(16);
  return t.length < 2 ? "0" + t : t;
}, Kl = function(e) {
  var t = e.r, i = e.g, o = e.b, r = e.a, s = Math.max(t, i, o), n = s - Math.min(t, i, o), u = n ? s === t ? (i - o) / n : s === i ? 2 + (o - t) / n : 4 + (t - i) / n : 0;
  return { h: 60 * (u < 0 ? u + 6 : u), s: s ? n / s * 100 : 0, v: s / 255 * 100, a: r };
}, Xl = function(e) {
  var t = e.h, i = e.s, o = e.v, r = e.a;
  t = t / 360 * 6, i /= 100, o /= 100;
  var s = Math.floor(t), n = o * (1 - i), u = o * (1 - (t - s) * i), c = o * (1 - (1 - t + s) * i), h = s % 6;
  return { r: 255 * [o, u, n, n, c, o][h], g: 255 * [c, o, o, u, n, n][h], b: 255 * [n, n, c, o, o, u][h], a: r };
}, Ea = function(e) {
  return { h: ql(e.h), s: de(e.s, 0, 100), l: de(e.l, 0, 100), a: de(e.a) };
}, Pa = function(e) {
  return { h: R(e.h), s: R(e.s), l: R(e.l), a: R(e.a, 3) };
}, Sa = function(e) {
  return Xl((i = (t = e).s, { h: t.h, s: (i *= ((o = t.l) < 50 ? o : 100 - o) / 100) > 0 ? 2 * i / (o + i) * 100 : 0, v: o + i, a: t.a }));
  var t, i, o;
}, Yi = function(e) {
  return { h: (t = Kl(e)).h, s: (r = (200 - (i = t.s)) * (o = t.v) / 100) > 0 && r < 200 ? i * o / 100 / (r <= 100 ? r : 200 - r) * 100 : 0, l: r / 2, a: t.a };
  var t, i, o, r;
}, Ed = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Pd = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Sd = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Od = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Oa = { string: [[function(e) {
  var t = Cd.exec(e);
  return t ? (e = t[1]).length <= 4 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: e.length === 4 ? R(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : e.length === 6 || e.length === 8 ? { r: parseInt(e.substr(0, 2), 16), g: parseInt(e.substr(2, 2), 16), b: parseInt(e.substr(4, 2), 16), a: e.length === 8 ? R(parseInt(e.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(e) {
  var t = Sd.exec(e) || Od.exec(e);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : Ca({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(e) {
  var t = Ed.exec(e) || Pd.exec(e);
  if (!t) return null;
  var i, o, r = Ea({ h: (i = t[1], o = t[2], o === void 0 && (o = "deg"), Number(i) * (kd[o] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return Sa(r);
}, "hsl"]], object: [[function(e) {
  var t = e.r, i = e.g, o = e.b, r = e.a, s = r === void 0 ? 1 : r;
  return He(t) && He(i) && He(o) ? Ca({ r: Number(t), g: Number(i), b: Number(o), a: Number(s) }) : null;
}, "rgb"], [function(e) {
  var t = e.h, i = e.s, o = e.l, r = e.a, s = r === void 0 ? 1 : r;
  if (!He(t) || !He(i) || !He(o)) return null;
  var n = Ea({ h: Number(t), s: Number(i), l: Number(o), a: Number(s) });
  return Sa(n);
}, "hsl"], [function(e) {
  var t = e.h, i = e.s, o = e.v, r = e.a, s = r === void 0 ? 1 : r;
  if (!He(t) || !He(i) || !He(o)) return null;
  var n = function(u) {
    return { h: ql(u.h), s: de(u.s, 0, 100), v: de(u.v, 0, 100), a: de(u.a) };
  }({ h: Number(t), s: Number(i), v: Number(o), a: Number(s) });
  return Xl(n);
}, "hsv"]] }, Ia = function(e, t) {
  for (var i = 0; i < t.length; i++) {
    var o = t[i][0](e);
    if (o) return [o, t[i][1]];
  }
  return [null, void 0];
}, Id = function(e) {
  return typeof e == "string" ? Ia(e.trim(), Oa.string) : typeof e == "object" && e !== null ? Ia(e, Oa.object) : [null, void 0];
}, fs = function(e, t) {
  var i = Yi(e);
  return { h: i.h, s: de(i.s + 100 * t, 0, 100), l: i.l, a: i.a };
}, bs = function(e) {
  return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
}, Aa = function(e, t) {
  var i = Yi(e);
  return { h: i.h, s: i.s, l: de(i.l + 100 * t, 0, 100), a: i.a };
}, Ua = function() {
  function e(t) {
    this.parsed = Id(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return e.prototype.isValid = function() {
    return this.parsed !== null;
  }, e.prototype.brightness = function() {
    return R(bs(this.rgba), 2);
  }, e.prototype.isDark = function() {
    return bs(this.rgba) < 0.5;
  }, e.prototype.isLight = function() {
    return bs(this.rgba) >= 0.5;
  }, e.prototype.toHex = function() {
    return t = vs(this.rgba), i = t.r, o = t.g, r = t.b, n = (s = t.a) < 1 ? Ur(R(255 * s)) : "", "#" + Ur(i) + Ur(o) + Ur(r) + n;
    var t, i, o, r, s, n;
  }, e.prototype.toRgb = function() {
    return vs(this.rgba);
  }, e.prototype.toRgbString = function() {
    return t = vs(this.rgba), i = t.r, o = t.g, r = t.b, (s = t.a) < 1 ? "rgba(" + i + ", " + o + ", " + r + ", " + s + ")" : "rgb(" + i + ", " + o + ", " + r + ")";
    var t, i, o, r, s;
  }, e.prototype.toHsl = function() {
    return Pa(Yi(this.rgba));
  }, e.prototype.toHslString = function() {
    return t = Pa(Yi(this.rgba)), i = t.h, o = t.s, r = t.l, (s = t.a) < 1 ? "hsla(" + i + ", " + o + "%, " + r + "%, " + s + ")" : "hsl(" + i + ", " + o + "%, " + r + "%)";
    var t, i, o, r, s;
  }, e.prototype.toHsv = function() {
    return t = Kl(this.rgba), { h: R(t.h), s: R(t.s), v: R(t.v), a: R(t.a, 3) };
    var t;
  }, e.prototype.invert = function() {
    return he({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, e.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), he(fs(this.rgba, t));
  }, e.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), he(fs(this.rgba, -t));
  }, e.prototype.grayscale = function() {
    return he(fs(this.rgba, -1));
  }, e.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), he(Aa(this.rgba, t));
  }, e.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), he(Aa(this.rgba, -t));
  }, e.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, e.prototype.alpha = function(t) {
    return typeof t == "number" ? he({ r: (i = this.rgba).r, g: i.g, b: i.b, a: t }) : R(this.rgba.a, 3);
    var i;
  }, e.prototype.hue = function(t) {
    var i = Yi(this.rgba);
    return typeof t == "number" ? he({ h: t, s: i.s, l: i.l, a: i.a }) : R(i.h);
  }, e.prototype.isEqual = function(t) {
    return this.toHex() === he(t).toHex();
  }, e;
}(), he = function(e) {
  return e instanceof Ua ? e : new Ua(e);
};
class za extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var Ad = Object.defineProperty, Ud = Object.getOwnPropertyDescriptor, Ne = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ud(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ad(t, i, r), r;
};
let fe = class extends v {
  constructor() {
    super(...arguments), this.isDraggingGridHandle = !1, this.disabled = !1, this.readonly = !1, this.hue = 0, this.saturation = 0, this.lightness = 0, this.brightness = 0, this.alpha = 100, this._value = "#000";
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    this._value = e, this.requestUpdate("value", t);
    try {
      const i = he(e);
      if (i.isValid()) {
        const { h: o, s: r, l: s, a: n } = i.toHsl();
        o !== 0 && (this.hue = o), this.lightness = s, this.saturation = r, this.brightness = this.getBrightness(s), this.alpha = n * 100;
      }
    } catch (i) {
      console.error("Something went wrong parsing the color string.", i);
    }
  }
  handleGridDrag(e) {
    if (this.disabled || this.readonly) return;
    const t = this.shadowRoot.querySelector(".color-area"), i = t.querySelector(".color-area__handle"), { width: o, height: r } = t.getBoundingClientRect();
    i.focus(), e.preventDefault(), e.stopPropagation(), this.isDraggingGridHandle = !0, Sl(t, {
      onMove: (s, n) => {
        isNaN(s) || isNaN(n) || (this.saturation = A(s / o * 100, 0, 100), this.brightness = A(100 - n / r * 100, 0, 100), this.lightness = this.getLightness(this.brightness), this.syncValues());
      },
      onStop: () => this.isDraggingGridHandle = !1,
      initialEvent: e
    });
  }
  handleGridKeyDown(e) {
    if (this.disabled) return;
    const t = e.shiftKey ? 10 : 1;
    e.key === "ArrowLeft" && (e.preventDefault(), this.saturation = A(this.saturation - t, 0, 100), this.syncValues()), e.key === "ArrowRight" && (e.preventDefault(), this.saturation = A(this.saturation + t, 0, 100), this.syncValues()), e.key === "ArrowUp" && (e.preventDefault(), this.brightness = A(this.brightness + t, 0, 100), this.lightness = this.getLightness(this.brightness), this.syncValues()), e.key === "ArrowDown" && (e.preventDefault(), this.brightness = A(this.brightness - t, 0, 100), this.lightness = this.getLightness(this.brightness), this.syncValues());
  }
  getBrightness(e) {
    return A(-1 * (200 * e / (this.saturation - 200)), 0, 100);
  }
  getLightness(e) {
    return A(
      (200 - this.saturation) * e / 100 * 5 / 10,
      0,
      100
    );
  }
  syncValues() {
    const e = he({
      h: this.hue,
      s: this.saturation,
      l: this.lightness,
      a: this.alpha / 100
    });
    this._value = e.toRgbString(), this.dispatchEvent(new za(za.CHANGE));
  }
  /** Generates a hex string from HSL values. Hue must be 0-360. All other arguments must be 0-100. */
  getHexString(e, t, i, o = 100) {
    const r = he(
      `hsla(${e}, ${t}%, ${i}%, ${o / 100})`
    );
    return r.isValid() ? r.toHex() : "";
  }
  render() {
    const e = this.saturation, t = 100 - this.brightness;
    return l`
      <div
        part="grid"
        class="color-area"
        style=${Ze({
      backgroundColor: this.getHexString(this.hue, 100, 50)
    })}
        @mousedown=${this.handleGridDrag}
        @touchstart=${this.handleGridDrag}>
        <span
          part="grid-handle"
          class=${zs({
      "color-area__handle": !0,
      "color-area__handle--dragging": this.isDraggingGridHandle
    })}
          style=${Ze({
      top: `${t}%`,
      left: `${e}%`,
      backgroundColor: this.getHexString(
        this.hue,
        this.saturation,
        this.lightness,
        this.alpha
      )
    })}
          role="application"
          tabindex=${_(this.disabled ? void 0 : "0")}
          aria-label="HSB"
          @keydown=${this.handleGridKeyDown}></span>
      </div>
    `;
  }
};
fe.styles = [
  p`
      :host {
        display: inline-block;
        width: 280px;
        height: 200px;
      }

      :host([disabled]) {
        cursor: not-allowed;
      }

      :host([disabled]) .color-area {
        user-select: none;
        pointer-events: none;
        opacity: 0.55;
      }

      :host([readonly]) {
        pointer-events: none;
        cursor: default;
      }

      .color-area {
        position: relative;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 100%
          ),
          linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
        box-sizing: border-box;
        cursor: crosshair;
        forced-color-adjust: none;
      }
      .color-area__handle {
        position: absolute;
        width: var(--uui-color-area-grid-handle-size, 16px);
        height: var(--uui-color-area-grid-handle-size, 16px);
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        border: solid 2px white;
        margin-top: calc(var(--uui-color-area-grid-handle-size, 16px) / -2);
        margin-left: calc(var(--uui-color-area-grid-handle-size, 16px) / -2);
        transition: 150ms transform;
        box-sizing: inherit;
      }
      .color-area__handle--dragging {
        cursor: none;
        transform: scale(1.5);
      }
      .color-area__handle--empty {
        display: none;
      }
    `
];
Ne([
  g()
], fe.prototype, "isDraggingGridHandle", 2);
Ne([
  a({ type: Boolean, reflect: !0 })
], fe.prototype, "disabled", 2);
Ne([
  a({ type: Boolean, reflect: !0 })
], fe.prototype, "readonly", 2);
Ne([
  a({ type: Number })
], fe.prototype, "hue", 2);
Ne([
  a({ type: Number })
], fe.prototype, "saturation", 2);
Ne([
  a({ type: Number })
], fe.prototype, "lightness", 2);
Ne([
  a({ type: Number })
], fe.prototype, "brightness", 2);
Ne([
  a({ type: Number })
], fe.prototype, "alpha", 2);
Ne([
  a({ type: String })
], fe.prototype, "value", 1);
fe = Ne([
  d("uui-color-area")
], fe);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: zd } = kc, Yl = (e) => e.strings === void 0, Ma = () => document.createComment(""), Bi = (e, t, i) => {
  const o = e._$AA.parentNode, r = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const s = o.insertBefore(Ma(), r), n = o.insertBefore(Ma(), r);
    i = new zd(s, n, e, e.options);
  } else {
    const s = i._$AB.nextSibling, n = i._$AM, u = n !== e;
    if (u) {
      let c;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (c = e._$AU) !== n._$AU && i._$AP(c);
    }
    if (s !== r || u) {
      let c = i._$AA;
      for (; c !== s; ) {
        const h = c.nextSibling;
        o.insertBefore(c, r), c = h;
      }
    }
  }
  return i;
}, St = (e, t, i = e) => (e._$AI(t, i), e), Md = {}, Zl = (e, t = Md) => e._$AH = t, Dd = (e) => e._$AH, gs = (e) => {
  e._$AP?.(!1, !0);
  let t = e._$AA;
  const i = e._$AB.nextSibling;
  for (; t !== i; ) {
    const o = t.nextSibling;
    t.remove(), t = o;
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ld = Ei(class extends Pi {
  constructor(e) {
    if (super(e), e.type !== me.PROPERTY && e.type !== me.ATTRIBUTE && e.type !== me.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!Yl(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [t]) {
    if (t === se || t === k) return t;
    const i = e.element, o = e.name;
    if (e.type === me.PROPERTY) {
      if (t === i[o]) return se;
    } else if (e.type === me.BOOLEAN_ATTRIBUTE) {
      if (!!t === i.hasAttribute(o)) return se;
    } else if (e.type === me.ATTRIBUTE && i.getAttribute(o) === t + "") return se;
    return Zl(e), t;
  }
});
var Td = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, je = function(e) {
  return typeof e == "string" ? e.length > 0 : typeof e == "number";
}, F = function(e, t, i) {
  return t === void 0 && (t = 0), i === void 0 && (i = Math.pow(10, t)), Math.round(i * e) / i + 0;
}, pe = function(e, t, i) {
  return t === void 0 && (t = 0), i === void 0 && (i = 1), e > i ? i : e > t ? e : t;
}, Ql = function(e) {
  return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
}, Da = function(e) {
  return { r: pe(e.r, 0, 255), g: pe(e.g, 0, 255), b: pe(e.b, 0, 255), a: pe(e.a) };
}, ms = function(e) {
  return { r: F(e.r), g: F(e.g), b: F(e.b), a: F(e.a, 3) };
}, Nd = /^#([0-9a-f]{3,8})$/i, zr = function(e) {
  var t = e.toString(16);
  return t.length < 2 ? "0" + t : t;
}, Jl = function(e) {
  var t = e.r, i = e.g, o = e.b, r = e.a, s = Math.max(t, i, o), n = s - Math.min(t, i, o), u = n ? s === t ? (i - o) / n : s === i ? 2 + (o - t) / n : 4 + (t - i) / n : 0;
  return { h: 60 * (u < 0 ? u + 6 : u), s: s ? n / s * 100 : 0, v: s / 255 * 100, a: r };
}, eu = function(e) {
  var t = e.h, i = e.s, o = e.v, r = e.a;
  t = t / 360 * 6, i /= 100, o /= 100;
  var s = Math.floor(t), n = o * (1 - i), u = o * (1 - (t - s) * i), c = o * (1 - (1 - t + s) * i), h = s % 6;
  return { r: 255 * [o, u, n, n, c, o][h], g: 255 * [c, o, o, u, n, n][h], b: 255 * [n, n, c, o, o, u][h], a: r };
}, La = function(e) {
  return { h: Ql(e.h), s: pe(e.s, 0, 100), l: pe(e.l, 0, 100), a: pe(e.a) };
}, Ta = function(e) {
  return { h: F(e.h), s: F(e.s), l: F(e.l), a: F(e.a, 3) };
}, Na = function(e) {
  return eu((i = (t = e).s, { h: t.h, s: (i *= ((o = t.l) < 50 ? o : 100 - o) / 100) > 0 ? 2 * i / (o + i) * 100 : 0, v: o + i, a: t.a }));
  var t, i, o;
}, Zi = function(e) {
  return { h: (t = Jl(e)).h, s: (r = (200 - (i = t.s)) * (o = t.v) / 100) > 0 && r < 200 ? i * o / 100 / (r <= 100 ? r : 200 - r) * 100 : 0, l: r / 2, a: t.a };
  var t, i, o, r;
}, Vd = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Bd = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Hd = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, jd = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ms = { string: [[function(e) {
  var t = Nd.exec(e);
  return t ? (e = t[1]).length <= 4 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: e.length === 4 ? F(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : e.length === 6 || e.length === 8 ? { r: parseInt(e.substr(0, 2), 16), g: parseInt(e.substr(2, 2), 16), b: parseInt(e.substr(4, 2), 16), a: e.length === 8 ? F(parseInt(e.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(e) {
  var t = Hd.exec(e) || jd.exec(e);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : Da({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(e) {
  var t = Vd.exec(e) || Bd.exec(e);
  if (!t) return null;
  var i, o, r = La({ h: (i = t[1], o = t[2], o === void 0 && (o = "deg"), Number(i) * (Td[o] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return Na(r);
}, "hsl"]], object: [[function(e) {
  var t = e.r, i = e.g, o = e.b, r = e.a, s = r === void 0 ? 1 : r;
  return je(t) && je(i) && je(o) ? Da({ r: Number(t), g: Number(i), b: Number(o), a: Number(s) }) : null;
}, "rgb"], [function(e) {
  var t = e.h, i = e.s, o = e.l, r = e.a, s = r === void 0 ? 1 : r;
  if (!je(t) || !je(i) || !je(o)) return null;
  var n = La({ h: Number(t), s: Number(i), l: Number(o), a: Number(s) });
  return Na(n);
}, "hsl"], [function(e) {
  var t = e.h, i = e.s, o = e.v, r = e.a, s = r === void 0 ? 1 : r;
  if (!je(t) || !je(i) || !je(o)) return null;
  var n = function(u) {
    return { h: Ql(u.h), s: pe(u.s, 0, 100), v: pe(u.v, 0, 100), a: pe(u.a) };
  }({ h: Number(t), s: Number(i), v: Number(o), a: Number(s) });
  return eu(n);
}, "hsv"]] }, Va = function(e, t) {
  for (var i = 0; i < t.length; i++) {
    var o = t[i][0](e);
    if (o) return [o, t[i][1]];
  }
  return [null, void 0];
}, Rd = function(e) {
  return typeof e == "string" ? Va(e.trim(), Ms.string) : typeof e == "object" && e !== null ? Va(e, Ms.object) : [null, void 0];
}, _s = function(e, t) {
  var i = Zi(e);
  return { h: i.h, s: pe(i.s + 100 * t, 0, 100), l: i.l, a: i.a };
}, ys = function(e) {
  return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
}, Ba = function(e, t) {
  var i = Zi(e);
  return { h: i.h, s: i.s, l: pe(i.l + 100 * t, 0, 100), a: i.a };
}, _o = function() {
  function e(t) {
    this.parsed = Rd(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return e.prototype.isValid = function() {
    return this.parsed !== null;
  }, e.prototype.brightness = function() {
    return F(ys(this.rgba), 2);
  }, e.prototype.isDark = function() {
    return ys(this.rgba) < 0.5;
  }, e.prototype.isLight = function() {
    return ys(this.rgba) >= 0.5;
  }, e.prototype.toHex = function() {
    return t = ms(this.rgba), i = t.r, o = t.g, r = t.b, n = (s = t.a) < 1 ? zr(F(255 * s)) : "", "#" + zr(i) + zr(o) + zr(r) + n;
    var t, i, o, r, s, n;
  }, e.prototype.toRgb = function() {
    return ms(this.rgba);
  }, e.prototype.toRgbString = function() {
    return t = ms(this.rgba), i = t.r, o = t.g, r = t.b, (s = t.a) < 1 ? "rgba(" + i + ", " + o + ", " + r + ", " + s + ")" : "rgb(" + i + ", " + o + ", " + r + ")";
    var t, i, o, r, s;
  }, e.prototype.toHsl = function() {
    return Ta(Zi(this.rgba));
  }, e.prototype.toHslString = function() {
    return t = Ta(Zi(this.rgba)), i = t.h, o = t.s, r = t.l, (s = t.a) < 1 ? "hsla(" + i + ", " + o + "%, " + r + "%, " + s + ")" : "hsl(" + i + ", " + o + "%, " + r + "%)";
    var t, i, o, r, s;
  }, e.prototype.toHsv = function() {
    return t = Jl(this.rgba), { h: F(t.h), s: F(t.s), v: F(t.v), a: F(t.a, 3) };
    var t;
  }, e.prototype.invert = function() {
    return ge({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, e.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), ge(_s(this.rgba, t));
  }, e.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), ge(_s(this.rgba, -t));
  }, e.prototype.grayscale = function() {
    return ge(_s(this.rgba, -1));
  }, e.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), ge(Ba(this.rgba, t));
  }, e.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), ge(Ba(this.rgba, -t));
  }, e.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, e.prototype.alpha = function(t) {
    return typeof t == "number" ? ge({ r: (i = this.rgba).r, g: i.g, b: i.b, a: t }) : F(this.rgba.a, 3);
    var i;
  }, e.prototype.hue = function(t) {
    var i = Zi(this.rgba);
    return typeof t == "number" ? ge({ h: t, s: i.s, l: i.l, a: i.a }) : F(i.h);
  }, e.prototype.isEqual = function(t) {
    return this.toHex() === ge(t).toHex();
  }, e;
}(), ge = function(e) {
  return e instanceof _o ? e : new _o(e);
}, Ha = [], Fd = function(e) {
  e.forEach(function(t) {
    Ha.indexOf(t) < 0 && (t(_o, Ms), Ha.push(t));
  });
};
function Wd(e, t) {
  var i = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, o = {};
  for (var r in i) o[i[r]] = r;
  var s = {};
  e.prototype.toName = function(n) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
    var u, c, h = o[this.toHex()];
    if (h) return h;
    if (n?.closest) {
      var m = this.toRgb(), f = 1 / 0, C = "black";
      if (!s.length) for (var x in i) s[x] = new e(i[x]).toRgb();
      for (var O in i) {
        var X = (u = m, c = s[O], Math.pow(u.r - c.r, 2) + Math.pow(u.g - c.g, 2) + Math.pow(u.b - c.b, 2));
        X < f && (f = X, C = O);
      }
      return C;
    }
  }, t.string.push([function(n) {
    var u = n.toLowerCase(), c = u === "transparent" ? "#0000" : i[u];
    return c ? new e(c).toRgb() : null;
  }, "name"]);
}
class Mr extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var Gd = Object.defineProperty, qd = Object.getOwnPropertyDescriptor, B = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? qd(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Gd(t, i, r), r;
};
Fd([Wd]);
const ja = "EyeDropper" in window;
let L = class extends De("label", v) {
  constructor() {
    super(...arguments), this._value = "", this.inputValue = "", this.hue = 0, this.saturation = 0, this.lightness = 0, this.alpha = 100, this._colord = ge("hsl(0, 0%, 0%)"), this.format = "hex", this.name = "", this.size = "medium", this.noFormatToggle = !1, this.inline = !1, this.disabled = !1, this.opacity = !1, this.readonly = !1, this.uppercase = !1, this.swatches = [
      "#d0021b",
      "#f5a623",
      "#f8e71c",
      "#8b572a",
      "#7ed321",
      "#417505",
      "#bd10e0",
      "#9013fe",
      "#4a90e2",
      "#50e3c2",
      "#b8e986",
      "#000",
      "#444",
      "#888",
      "#ccc",
      "#fff"
    ];
  }
  set value(e) {
    this.value !== e && this.setColor(e), this._value = e;
  }
  get value() {
    return this._value;
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-icon"), y(this, "uui-icon-registry-essential"), y(this, "uui-input"), y(this, "uui-button"), y(this, "uui-button-group"), y(this, "uui-color-swatches"), y(this, "uui-color-swatch"), y(this, "uui-color-area"), y(this, "uui-color-slider"), y(this, "uui-popover-container");
  }
  /** Returns the current value as a string in the specified format. */
  getFormattedValue(e) {
    const t = this.opacity ? `${e}a` : e, i = this._colord.toHex(), o = i.length > 7 ? i.substring(0, i.length - 2) : i, { r, g: s, b: n } = this._colord.toRgb(), { h: u, s: c, l: h } = this._colord.toHsl(), { v: m } = this._colord.toHsv(), f = this._colord.alpha();
    switch (t) {
      case "hex":
        return this.setLetterCase(o);
      case "hexa":
        return this.setLetterCase(i);
      case "rgb":
        return this.setLetterCase(`rgb(${r}, ${s}, ${n})`);
      case "rgba":
        return this.setLetterCase(this._colord.toRgbString());
      case "hsl":
        return this.setLetterCase(`hsl(${u}, ${c}%, ${h}%)`);
      case "hsla":
        return this.setLetterCase(this._colord.toHslString());
      case "hsv":
        return this.setLetterCase(`hsv(${u}, ${c}%, ${h}%)`);
      case "hsva":
        return this.setLetterCase(`hsva(${u}, ${c}%, ${m}%, ${f})`);
      //this._colord.toHsvString();
      default:
        return "";
    }
  }
  getBrightness(e) {
    return A(-1 * (200 * e / (this.saturation - 200)), 0, 100);
  }
  getLightness(e) {
    return A(
      (200 - this.saturation) * e / 100 * 5 / 10,
      0,
      100
    );
  }
  handleFormatToggle() {
    const e = ["hex", "rgb", "hsl", "hsv"], t = (e.indexOf(this.format) + 1) % e.length;
    this.format = e[t], this._syncValues();
  }
  handleAlphaChange(e) {
    e.stopPropagation(), this._swatches?.resetSelection();
    const t = e.target, i = {
      h: this.hue,
      s: this.saturation,
      l: this.lightness,
      a: Math.round(t.value) / 100
    };
    this.setColor(i);
  }
  handleHueChange(e) {
    e.stopPropagation(), this._swatches?.resetSelection();
    const i = {
      h: e.target.value,
      s: this.saturation,
      l: this.lightness,
      a: this.alpha / 100
    };
    this.setColor(i);
  }
  handleGridChange(e) {
    e.stopPropagation(), this._swatches?.resetSelection();
    const t = e.target, i = {
      h: this.hue,
      s: t.saturation,
      l: t.lightness,
      a: this.alpha / 100
    };
    this.setColor(i);
  }
  handleInputChange(e) {
    e.stopImmediatePropagation(), this._swatches?.resetSelection(), this.inputValue = this._input.value, this.setColor(this.inputValue);
  }
  handleInputKeyDown(e) {
    e.stopImmediatePropagation(), e.key === "Enter" && (this._swatches?.resetSelection(), this.inputValue = this._input.value, this.setColor(this.inputValue), setTimeout(() => this._input.select()));
  }
  handleColorSwatchChange(e) {
    e.stopImmediatePropagation();
    const t = e.target;
    this.setColor(t.value);
  }
  handleCopy() {
    navigator.clipboard.writeText(this._input.value).then(() => {
      this._previewButton.classList.add("color-picker__preview-color--copied"), this._previewButton.addEventListener("animationend", () => {
        this._previewButton.classList.remove(
          "color-picker__preview-color--copied"
        );
      });
    });
  }
  handleEyeDropper() {
    if (!ja)
      return;
    new EyeDropper().open().then((t) => this.setColor(t.sRGBHex)).catch(() => {
    });
  }
  setColor(e) {
    if (e === this.value) return;
    if (!e)
      return this.alpha = 100, this.inputValue = "", this._value = e, this.dispatchEvent(
        new Mr(Mr.CHANGE)
      ), !0;
    const t = new _o(e), { h: i, s: o, l: r, a: s } = t.toHsl();
    this.hue = i, this.saturation = o, this.lightness = r, this.alpha = this.opacity ? s * 100 : 100;
    const n = e;
    return n && n.h && (this.hue = n.h), this._colord = t, this._syncValues(), this.dispatchEvent(
      new Mr(Mr.CHANGE)
    ), !0;
  }
  setLetterCase(e) {
    return typeof e != "string" ? "" : this.uppercase ? e.toUpperCase() : e.toLowerCase();
  }
  /** Generates a hex string from HSL values. Hue must be 0-360. All other arguments must be 0-100. */
  getHexString(e, t, i, o = 100) {
    const r = ge(
      `hsla(${e}, ${t}%, ${i}%, ${o / 100})`
    );
    return r.isValid() ? r.toHex() : "";
  }
  _syncValues() {
    this.inputValue = this.getFormattedValue(this.format), this._value = this.inputValue;
  }
  _renderColorPicker() {
    const e = this.value ? `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})` : "transparent";
    return l`
      <div
        class=${zs({
      "color-picker": !0,
      "color-picker--inline": this.inline,
      "color-picker--disabled": this.disabled
    })}
        aria-disabled=${this.disabled ? "true" : "false"}>
        <uui-color-area
          .value="${this.value}"
          .hue="${Math.round(this.hue)}"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @change=${this.handleGridChange}>
        </uui-color-area>
        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <uui-color-slider
              hide-value-label
              label="hue"
              class="hue-slider"
              .value=${Math.round(this.hue)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              @change=${this.handleHueChange}>
            </uui-color-slider>
            ${this.opacity ? l`
                  <uui-color-slider
                    label="alpha"
                    class="opacity-slider"
                    .value=${Math.round(this.alpha)}
                    type="opacity"
                    .color=${this.getHexString(
      this.hue,
      this.saturation,
      this.lightness
    )}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    @change=${this.handleAlphaChange}>
                  </uui-color-slider>
                ` : ""}
          </div>
          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            title="Copy"
            aria-label="Copy"
            style=${Ze({ "--preview-color": e })}
            @click=${this.handleCopy}></button>
        </div>
        <div class="color-picker__user-input" aria-live="polite">
          <uui-input
            label="label"
            type="text"
            part="input"
            name=${this.name}
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${Ld(this.inputValue)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            @keydown=${this.handleInputKeyDown}
            @change=${this.handleInputChange}>
          </uui-input>
          <uui-button-group>
            ${this.noFormatToggle ? "" : l`<uui-button
                  label="Toggle color format"
                  @click=${this.handleFormatToggle}
                  class="color-picker__toggle-format"
                  ?disabled=${this.disabled}
                  compact>
                  <span>${this.format}</span>
                </uui-button>`}
            ${ja ? l`<uui-button
                  label="Select a color"
                  ?disabled=${this.disabled || this.readonly}
                  @click=${this.handleEyeDropper}
                  compact>
                  <uui-icon-registry-essential>
                    <uui-icon name="colorpicker"></uui-icon>
                  </uui-icon-registry-essential>
                </uui-button>` : ""}
          </uui-button-group>
        </div>
        ${this._renderSwatches()}
      </div>
    `;
  }
  _renderSwatches() {
    return this.swatches?.length ? l`<uui-color-swatches
      id="swatches"
      class="color-picker__swatches"
      label="Swatches"
      ?disabled=${this.disabled}
      ?readonly=${this.readonly}
      @change=${this.handleColorSwatchChange}>
      ${this.swatches.map(
      (e) => l`<uui-color-swatch label="${e}" .value=${e}>
          </uui-color-swatch>`
    )}
    </uui-color-swatches>` : k;
  }
  _renderPreviewButton() {
    const e = this.value ? `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})` : "transparent";
    return l`<button
        type="button"
        part="trigger"
        aria-label="${this.label || "Open Color picker"}"
        class=${zs({
      "color-picker__trigger": !0,
      "color-dropdown__trigger--disabled": this.disabled,
      "color-dropdown__trigger--small": this.size === "small",
      "color-dropdown__trigger--medium": this.size === "medium",
      "color-dropdown__trigger--large": this.size === "large",
      "color-picker__transparent-bg": !0
    })}
        style=${Ze({ "--preview-color": e })}
        ?disabled=${this.disabled}
        aria-haspopup="true"
        aria-expanded="false"
        popovertarget="color-picker-popover"></button>
      <uui-popover-container id="color-picker-popover">
        ${this._renderColorPicker()}
      </uui-popover-container>`;
  }
  render() {
    return this.inline ? this._renderColorPicker() : this._renderPreviewButton();
  }
};
L.styles = [
  p`
      :host {
        --uui-look-outline-border: #ddd;
        --uui-look-outline-border-hover: #aaa;
        font-size: 0.8rem;
        color: var(--uui-color-text,#060606);
        display: block;
        width: var(--uui-color-picker-width, 280px);
      }
      :host > button {
        cursor: pointer;
      }
      uui-popover-container {
        width: inherit;
      }
      .color-picker {
        width: 100%;
        background-color: var(--uui-color-surface,#fff);
        user-select: none;
        border: solid 1px var(--uui-color-border,#d8d7d9);
      }
      .color-picker__user-input {
        display: flex;
        padding: 0 0.75rem 0.75rem 0.75rem;
      }
      .color-picker__user-input uui-button {
        border: var(--uui-input-border-width, 1px) solid
          var(--uui-input-border-color, var(--uui-color-border,#d8d7d9));
        border-left: none;
      }
      .color-picker__preview,
      .color-picker__trigger {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 2.25rem;
        height: 2.25rem;
        border: none;
        border-radius: 50%;
        background: none;
      }
      .color-picker__preview {
        cursor: copy;
        margin-left: 0.75rem;
        border-radius: 50%;
      }
      .color-picker__trigger[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
      }
      .color-picker__preview::before,
      .color-picker__trigger::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
        background-color: var(--preview-color);
      }

      .color-dropdown__trigger--empty::before {
        background-color: transparent;
      }

      .color-picker__transparent-bg {
        border: 1px solid var(--uui-color-border,#d8d7d9);
        background-image: linear-gradient(
            45deg,
            var(--uui-palette-grey,#c4c4c4) 25%,
            transparent 25%
          ),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey,#c4c4c4) 75%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey,#c4c4c4) 75%),
          linear-gradient(45deg, var(--uui-palette-grey,#c4c4c4) 25%, transparent 25%);
        background-size: 10px 10px;
        background-position:
          0 0,
          0 0,
          -5px -5px,
          5px 5px;
      }

      .color-picker__preview-color--copied {
        animation: pulse 0.75s;
      }

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 var(--uui-palette-space-cadet-light,rgb(
    38,
    53,
    110
  ));
        }
        70% {
          box-shadow: 0 0 0 0.5rem transparent;
        }
        100% {
          box-shadow: 0 0 0 0 transparent;
        }
      }

      .color-picker__controls {
        padding: 0.75rem;
        display: flex;
        align-items: center;
      }
      .color-picker__sliders {
        flex: 1 1 auto;
      }

      uui-color-slider:not(:last-of-type) {
        margin-bottom: 1rem;
      }

      .color-picker__toggle-format {
        min-width: 45px;
        --uui-button-font-size: 0.8rem;
      }
      .color-picker__toggle-format > span {
        text-transform: uppercase;
      }

      uui-color-swatches {
        border-top: solid 1px var(--uui-color-border,#d8d7d9);
        padding: 0.75rem;
      }

      button[slot='trigger'] {
        border-radius: 50%;
        cursor: pointer;
        width: 36px;
        height: 36px;
      }

      uui-input {
        /*  lower the font size to avoid overflow with hlsa format */
        font-size: 0.85rem;
        box-sizing: content-box;
        flex: 1;
      }

      uui-color-area {
        width: 100%;
      }
    `
];
B([
  P('[part="input"]')
], L.prototype, "_input", 2);
B([
  P(".color-picker__preview")
], L.prototype, "_previewButton", 2);
B([
  P("#swatches")
], L.prototype, "_swatches", 2);
B([
  g()
], L.prototype, "inputValue", 2);
B([
  g()
], L.prototype, "hue", 2);
B([
  g()
], L.prototype, "saturation", 2);
B([
  g()
], L.prototype, "lightness", 2);
B([
  g()
], L.prototype, "alpha", 2);
B([
  g()
], L.prototype, "_colord", 2);
B([
  a()
], L.prototype, "value", 1);
B([
  a()
], L.prototype, "format", 2);
B([
  a()
], L.prototype, "name", 2);
B([
  a()
], L.prototype, "size", 2);
B([
  a({ attribute: "no-format-toggle", type: Boolean })
], L.prototype, "noFormatToggle", 2);
B([
  a({ type: Boolean, reflect: !0 })
], L.prototype, "inline", 2);
B([
  a({ type: Boolean, reflect: !0 })
], L.prototype, "disabled", 2);
B([
  a({ type: Boolean })
], L.prototype, "opacity", 2);
B([
  a({ type: Boolean, reflect: !0 })
], L.prototype, "readonly", 2);
B([
  a({ type: Boolean })
], L.prototype, "uppercase", 2);
B([
  a({ attribute: !1 })
], L.prototype, "swatches", 2);
L = B([
  d("uui-color-picker")
], L);
var Kd = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, Re = function(e) {
  return typeof e == "string" ? e.length > 0 : typeof e == "number";
}, W = function(e, t, i) {
  return t === void 0 && (t = 0), i === void 0 && (i = Math.pow(10, t)), Math.round(i * e) / i + 0;
}, ve = function(e, t, i) {
  return t === void 0 && (t = 0), i === void 0 && (i = 1), e > i ? i : e > t ? e : t;
}, tu = function(e) {
  return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
}, Ra = function(e) {
  return { r: ve(e.r, 0, 255), g: ve(e.g, 0, 255), b: ve(e.b, 0, 255), a: ve(e.a) };
}, ws = function(e) {
  return { r: W(e.r), g: W(e.g), b: W(e.b), a: W(e.a, 3) };
}, Xd = /^#([0-9a-f]{3,8})$/i, Dr = function(e) {
  var t = e.toString(16);
  return t.length < 2 ? "0" + t : t;
}, iu = function(e) {
  var t = e.r, i = e.g, o = e.b, r = e.a, s = Math.max(t, i, o), n = s - Math.min(t, i, o), u = n ? s === t ? (i - o) / n : s === i ? 2 + (o - t) / n : 4 + (t - i) / n : 0;
  return { h: 60 * (u < 0 ? u + 6 : u), s: s ? n / s * 100 : 0, v: s / 255 * 100, a: r };
}, ru = function(e) {
  var t = e.h, i = e.s, o = e.v, r = e.a;
  t = t / 360 * 6, i /= 100, o /= 100;
  var s = Math.floor(t), n = o * (1 - i), u = o * (1 - (t - s) * i), c = o * (1 - (1 - t + s) * i), h = s % 6;
  return { r: 255 * [o, u, n, n, c, o][h], g: 255 * [c, o, o, u, n, n][h], b: 255 * [n, n, c, o, o, u][h], a: r };
}, Fa = function(e) {
  return { h: tu(e.h), s: ve(e.s, 0, 100), l: ve(e.l, 0, 100), a: ve(e.a) };
}, Wa = function(e) {
  return { h: W(e.h), s: W(e.s), l: W(e.l), a: W(e.a, 3) };
}, Ga = function(e) {
  return ru((i = (t = e).s, { h: t.h, s: (i *= ((o = t.l) < 50 ? o : 100 - o) / 100) > 0 ? 2 * i / (o + i) * 100 : 0, v: o + i, a: t.a }));
  var t, i, o;
}, Qi = function(e) {
  return { h: (t = iu(e)).h, s: (r = (200 - (i = t.s)) * (o = t.v) / 100) > 0 && r < 200 ? i * o / 100 / (r <= 100 ? r : 200 - r) * 100 : 0, l: r / 2, a: t.a };
  var t, i, o, r;
}, Yd = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Zd = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Qd = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Jd = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, qa = { string: [[function(e) {
  var t = Xd.exec(e);
  return t ? (e = t[1]).length <= 4 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: e.length === 4 ? W(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : e.length === 6 || e.length === 8 ? { r: parseInt(e.substr(0, 2), 16), g: parseInt(e.substr(2, 2), 16), b: parseInt(e.substr(4, 2), 16), a: e.length === 8 ? W(parseInt(e.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(e) {
  var t = Qd.exec(e) || Jd.exec(e);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : Ra({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(e) {
  var t = Yd.exec(e) || Zd.exec(e);
  if (!t) return null;
  var i, o, r = Fa({ h: (i = t[1], o = t[2], o === void 0 && (o = "deg"), Number(i) * (Kd[o] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return Ga(r);
}, "hsl"]], object: [[function(e) {
  var t = e.r, i = e.g, o = e.b, r = e.a, s = r === void 0 ? 1 : r;
  return Re(t) && Re(i) && Re(o) ? Ra({ r: Number(t), g: Number(i), b: Number(o), a: Number(s) }) : null;
}, "rgb"], [function(e) {
  var t = e.h, i = e.s, o = e.l, r = e.a, s = r === void 0 ? 1 : r;
  if (!Re(t) || !Re(i) || !Re(o)) return null;
  var n = Fa({ h: Number(t), s: Number(i), l: Number(o), a: Number(s) });
  return Ga(n);
}, "hsl"], [function(e) {
  var t = e.h, i = e.s, o = e.v, r = e.a, s = r === void 0 ? 1 : r;
  if (!Re(t) || !Re(i) || !Re(o)) return null;
  var n = function(u) {
    return { h: tu(u.h), s: ve(u.s, 0, 100), v: ve(u.v, 0, 100), a: ve(u.a) };
  }({ h: Number(t), s: Number(i), v: Number(o), a: Number(s) });
  return ru(n);
}, "hsv"]] }, Ka = function(e, t) {
  for (var i = 0; i < t.length; i++) {
    var o = t[i][0](e);
    if (o) return [o, t[i][1]];
  }
  return [null, void 0];
}, ep = function(e) {
  return typeof e == "string" ? Ka(e.trim(), qa.string) : typeof e == "object" && e !== null ? Ka(e, qa.object) : [null, void 0];
}, xs = function(e, t) {
  var i = Qi(e);
  return { h: i.h, s: ve(i.s + 100 * t, 0, 100), l: i.l, a: i.a };
}, $s = function(e) {
  return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
}, Xa = function(e, t) {
  var i = Qi(e);
  return { h: i.h, s: i.s, l: ve(i.l + 100 * t, 0, 100), a: i.a };
}, Ds = function() {
  function e(t) {
    this.parsed = ep(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return e.prototype.isValid = function() {
    return this.parsed !== null;
  }, e.prototype.brightness = function() {
    return W($s(this.rgba), 2);
  }, e.prototype.isDark = function() {
    return $s(this.rgba) < 0.5;
  }, e.prototype.isLight = function() {
    return $s(this.rgba) >= 0.5;
  }, e.prototype.toHex = function() {
    return t = ws(this.rgba), i = t.r, o = t.g, r = t.b, n = (s = t.a) < 1 ? Dr(W(255 * s)) : "", "#" + Dr(i) + Dr(o) + Dr(r) + n;
    var t, i, o, r, s, n;
  }, e.prototype.toRgb = function() {
    return ws(this.rgba);
  }, e.prototype.toRgbString = function() {
    return t = ws(this.rgba), i = t.r, o = t.g, r = t.b, (s = t.a) < 1 ? "rgba(" + i + ", " + o + ", " + r + ", " + s + ")" : "rgb(" + i + ", " + o + ", " + r + ")";
    var t, i, o, r, s;
  }, e.prototype.toHsl = function() {
    return Wa(Qi(this.rgba));
  }, e.prototype.toHslString = function() {
    return t = Wa(Qi(this.rgba)), i = t.h, o = t.s, r = t.l, (s = t.a) < 1 ? "hsla(" + i + ", " + o + "%, " + r + "%, " + s + ")" : "hsl(" + i + ", " + o + "%, " + r + "%)";
    var t, i, o, r, s;
  }, e.prototype.toHsv = function() {
    return t = iu(this.rgba), { h: W(t.h), s: W(t.s), v: W(t.v), a: W(t.a, 3) };
    var t;
  }, e.prototype.invert = function() {
    return Fe({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, e.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), Fe(xs(this.rgba, t));
  }, e.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), Fe(xs(this.rgba, -t));
  }, e.prototype.grayscale = function() {
    return Fe(xs(this.rgba, -1));
  }, e.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), Fe(Xa(this.rgba, t));
  }, e.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), Fe(Xa(this.rgba, -t));
  }, e.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, e.prototype.alpha = function(t) {
    return typeof t == "number" ? Fe({ r: (i = this.rgba).r, g: i.g, b: i.b, a: t }) : W(this.rgba.a, 3);
    var i;
  }, e.prototype.hue = function(t) {
    var i = Qi(this.rgba);
    return typeof t == "number" ? Fe({ h: t, s: i.s, l: i.l, a: i.a }) : W(i.h);
  }, e.prototype.isEqual = function(t) {
    return this.toHex() === Fe(t).toHex();
  }, e;
}(), Fe = function(e) {
  return e instanceof Ds ? e : new Ds(e);
};
class Ya extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var tp = Object.defineProperty, ip = Object.getOwnPropertyDescriptor, we = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ip(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && tp(t, i, r), r;
};
let ae = class extends De("label", v) {
  constructor() {
    super(...arguments), this.type = "hue", this.color = "", this.min = 0, this.max = 100, this.precision = 1, this.vertical = !1, this.value = 0, this.readonly = !1, this.disabled = !1, this.hideValueLabel = !1;
  }
  willUpdate(e) {
    if (e.has("type") && (this.type === "hue" ? this.max = 360 : this.type === "saturation" ? this.max = 100 : this.type === "lightness" ? this.max = 100 : this.type === "opacity" && (this.max = this.max ?? 100), this.precision = this.precision ?? 1, this.color)) {
      const t = new Ds(this.color), { h: i, s: o, l: r } = t.toHsl(), { r: s, g: n, b: u } = t.toRgb(), c = this.type === "saturation" ? `linear-gradient(to ${this.vertical ? "top" : "right"}, hsl(${i}, 0%, ${r}%), hsl(${i}, 100%, ${r}%))` : this.type === "lightness" ? `linear-gradient(to ${this.vertical ? "top" : "right"}, hsl(${i}, ${o}%, 0%), hsl(${i}, ${o}%, 100%))` : null, h = this.type === "opacity" ? `linear-gradient(to ${this.vertical ? "top" : "right"}, transparent 0%, rgba(${s}, ${n}, ${u}, ${this.max}%) 100%)` : null;
      this.style.setProperty("--uui-slider-background-image", c), this.style.setProperty("--uui-slider-hue-color", h);
    }
  }
  firstUpdated() {
    this.container = this.shadowRoot.querySelector("#color-slider"), this.handle = this.container.querySelector(
      "#color-slider__handle"
    );
  }
  handleDrag(e) {
    if (this.disabled || this.readonly || !this.container || !this.handle)
      return;
    const { width: t, height: i } = this.container.getBoundingClientRect();
    this.handle.focus(), e.preventDefault(), Sl(this.container, {
      onMove: (o, r) => {
        this.vertical ? this.value = $a(
          A(r / i * this.max, this.min, this.max),
          this.min,
          this.max
        ) : this.value = A(o / t * this.max, this.min, this.max), this.syncValues();
      },
      initialEvent: e
    });
  }
  handleClick(e) {
    this.disabled || this.readonly || (this.value = this.getValueFromMousePosition(e), this.syncValues());
  }
  handleKeyDown(e) {
    const t = e.shiftKey ? 10 : 1;
    e.key === "ArrowLeft" ? (e.preventDefault(), this.value = A(this.value - t, this.min, this.max), this.syncValues()) : e.key === "ArrowRight" ? (e.preventDefault(), this.value = A(this.value + t, this.min, this.max), this.syncValues()) : e.key === "ArrowUp" ? (e.preventDefault(), this.value = A(this.value + t, this.min, this.max), this.syncValues()) : e.key === "ArrowDown" ? (e.preventDefault(), this.value = A(this.value - t, this.min, this.max), this.syncValues()) : e.key === "Home" ? (e.preventDefault(), this.value = this.min, this.syncValues()) : e.key === "End" && (e.preventDefault(), this.value = this.max, this.syncValues());
  }
  getValueFromMousePosition(e) {
    return this.vertical ? this.getValueFromYCoordinate(e.clientY) : this.getValueFromXCoordinate(e.clientX);
  }
  getValueFromTouchPosition(e) {
    return this.vertical ? this.getValueFromYCoordinate(e.touches[0].clientY) : this.getValueFromXCoordinate(e.touches[0].clientX);
  }
  getValueFromXCoordinate(e) {
    const { left: t, width: i } = this.container.getBoundingClientRect();
    return A(
      this.roundToPrecision((e - t) / i * this.max),
      this.min,
      this.max
    );
  }
  getValueFromYCoordinate(e) {
    const { top: t, height: i } = this.container.getBoundingClientRect();
    return A(
      this.roundToPrecision((e - t) / i * this.max),
      this.min,
      this.max
    );
  }
  roundToPrecision(e) {
    const t = 1 / this.precision;
    return Math.ceil(e * t) / t;
  }
  syncValues() {
    this.dispatchEvent(new Ya(Ya.CHANGE));
  }
  get cssPropCurrentValue() {
    return this.value === 0 ? this.vertical ? 100 : 0 : 100 / (this.vertical ? this.max / $a(this.value, this.min, this.max) : this.max / this.value);
  }
  render() {
    return l`<div
        part="slider"
        id="color-slider"
        role="slider"
        aria-label="${this.label}"
        aria-orientation="${this.vertical ? "vertical" : "horizontal"}"
        aria-valuemin="${Math.round(this.min)}"
        aria-valuemax="${Math.round(this.max)}"
        aria-valuenow="${Math.round(this.value)}"
        @click=${this.handleClick}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
        @keydown=${this.handleKeyDown}>
        ${this.type === "opacity" ? l`<div
              id="current-hue"
              style=${Ze({
      backgroundImage: "var(--uui-slider-hue-color)"
    })}></div>` : ""}
        <!-- <slot name="detail"> </slot> -->
        <span
          id="color-slider__handle"
          style="--current-value: ${this.cssPropCurrentValue}%;"
          tabindex=${_(this.disabled ? void 0 : "0")}>
        </span>
      </div>
      ${this.hideValueLabel ? null : Math.round(this.value)}`;
  }
};
ae.styles = [
  p`
      :host {
        --uui-slider-height: 15px;
        --uui-slider-handle-size: 17px;
        --uui-slider-background-image: #fff;
        --uui-slider-background-size: 100%;
        --uui-slider-background-position: top left;
        display: block;
      }

      :host([type='hue']) {
        --uui-slider-background-image: linear-gradient(
          to right,
          rgb(255, 0, 0) 0%,
          rgb(255, 255, 0) 17%,
          rgb(0, 255, 0) 33%,
          rgb(0, 255, 255) 50%,
          rgb(0, 0, 255) 67%,
          rgb(255, 0, 255) 83%,
          rgb(255, 0, 0) 100%
        );
      }

      :host([vertical][type='hue']) {
        --uui-slider-background-image: linear-gradient(
          to top,
          rgb(255, 0, 0) 0%,
          rgb(255, 255, 0) 17%,
          rgb(0, 255, 0) 33%,
          rgb(0, 255, 255) 50%,
          rgb(0, 0, 255) 67%,
          rgb(255, 0, 255) 83%,
          rgb(255, 0, 0) 100%
        );
      }

      :host([type='opacity']) {
        --uui-slider-background-image: linear-gradient(
            45deg,
            var(--uui-palette-grey,#c4c4c4) 25%,
            transparent 25%
          ),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey,#c4c4c4) 75%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey,#c4c4c4) 75%),
          linear-gradient(45deg, var(--uui-palette-grey,#c4c4c4) 25%, transparent 25%);

        --uui-slider-background-size: 10px 10px;
        --uui-slider-background-position: 0 0, 0 0, -5px -5px, 5px 5px;
      }

      #color-slider {
        position: relative;
        background-image: var(--uui-slider-background-image);
        background-size: var(--uui-slider-background-size);
        background-position: var(--uui-slider-background-position);
        border-radius: 3px;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
        width: 100%;
        height: var(--uui-slider-height);
      }

      :host([vertical]) #color-slider {
        width: var(--uui-slider-height);
        height: 300px;
      }

      :host([disabled]) {
        cursor: not-allowed;
      }

      :host([disabled]) #color-slider {
        user-select: none;
        pointer-events: none;
        opacity: 0.55;
      }

      :host([readonly]) {
        cursor: default;
      }

      :host([readonly]) #color-slider {
        pointer-events: none;
      }

      #color-slider__handle {
        position: absolute;
        top: calc(50% - var(--uui-slider-handle-size) / 2);
        width: var(--uui-slider-handle-size);
        height: var(--uui-slider-handle-size);
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        margin-left: calc(var(--uui-slider-handle-size) / -2);
        left: var(--current-value, 0%);
      }

      :host([vertical]) #color-slider__handle {
        left: unset;
        top: var(--current-value, 100%);
        margin-left: -1px;
        margin-top: calc(var(--uui-slider-handle-size) / -2);
      }

      ::slotted(*:first-child) {
        border-radius: 3px;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
      }

      #current-hue {
        border-radius: 3px;
        position: absolute;
        inset: 0 0 0 0;
      }
    `
];
we([
  a({ reflect: !0 })
], ae.prototype, "type", 2);
we([
  a()
], ae.prototype, "color", 2);
we([
  a({ type: Number })
], ae.prototype, "min", 2);
we([
  a({ type: Number })
], ae.prototype, "max", 2);
we([
  a({ type: Number })
], ae.prototype, "precision", 2);
we([
  a({ type: Boolean, reflect: !0 })
], ae.prototype, "vertical", 2);
we([
  a({ type: Number })
], ae.prototype, "value", 2);
we([
  a({ type: Boolean, reflect: !0 })
], ae.prototype, "readonly", 2);
we([
  a({ type: Boolean, reflect: !0 })
], ae.prototype, "disabled", 2);
we([
  a({ type: Boolean, attribute: "hide-value-label", reflect: !0 })
], ae.prototype, "hideValueLabel", 2);
ae = we([
  d("uui-color-slider")
], ae);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ji = (e, t) => {
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const o of i) o._$AO?.(t, !1), Ji(o, t);
  return !0;
}, yo = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while (i?.size === 0);
}, ou = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), sp(t);
  }
};
function rp(e) {
  this._$AN !== void 0 ? (yo(this), this._$AM = e, ou(this)) : this._$AM = e;
}
function op(e, t = !1, i = 0) {
  const o = this._$AH, r = this._$AN;
  if (r !== void 0 && r.size !== 0) if (t) if (Array.isArray(o)) for (let s = i; s < o.length; s++) Ji(o[s], !1), yo(o[s]);
  else o != null && (Ji(o, !1), yo(o));
  else Ji(this, e);
}
const sp = (e) => {
  e.type == me.CHILD && (e._$AP ??= op, e._$AQ ??= rp);
};
class np extends Pi {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, o) {
    super._$AT(t, i, o), ou(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), i && (Ji(this, t), yo(this));
  }
  setValue(t) {
    if (Yl(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = t, this._$Ct._$AI(i, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
const ks = /* @__PURE__ */ new WeakMap(), Gr = Ei(class extends np {
  render(e) {
    return k;
  }
  update(e, [t]) {
    const i = t !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = t, this.ht = e.options?.host, this.rt(this.ct = e.element)), k;
  }
  rt(e) {
    if (this.isConnected || (e = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let i = ks.get(t);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), ks.set(t, i)), i.get(this.G) !== void 0 && this.G.call(this.ht, void 0), i.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
    } else this.G.value = e;
  }
  get lt() {
    return typeof this.G == "function" ? ks.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
var ap = Object.defineProperty, lp = Object.getOwnPropertyDescriptor, su = (e) => {
  throw TypeError(e);
}, Oi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? lp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ap(t, i, r), r;
}, up = (e, t, i) => t.has(e) || su("Cannot " + i), cp = (e, t, i) => t.has(e) ? su("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), hp = (e, t, i) => (up(e, t, "access private method"), i), Ls, nu;
let ct = class extends De(
  "label",
  ki(yr(v))
) {
  constructor() {
    super(), cp(this, Ls), this.disabled = !1, this.readonly = !1, this.showLabel = !1, this.addEventListener("click", this._setAriaAttributes);
  }
  get value() {
    return this._value ?? "";
  }
  set value(e) {
    const t = this._value;
    this._value = e, this.requestUpdate("value", t);
  }
  get color() {
    return this._color;
  }
  set color(e) {
    const t = this._color;
    this._color = e, this.requestUpdate("color", t);
  }
  _setAriaAttributes() {
    this.selectable && this.setAttribute("aria-checked", this.selected.toString());
  }
  firstUpdated() {
    this._setAriaAttributes();
  }
  willUpdate(e) {
    (e.has("disabled") || e.has("readonly")) && this.selectable && (this.selectable = !this.disabled && !this.readonly, this.deselectable = !this.disabled && !this.readonly), (e.has("selectable") || e.has("selected")) && this._setAriaAttributes();
  }
  focus(e) {
    this.selectableTarget?.focus(e);
  }
  render() {
    return l`
      <button
        id="swatch"
        ${Gr(hp(this, Ls, nu))}
        aria-label=${this.label}
        ?disabled="${this.disabled}"
        title="${this.label}">
        <div class="color-swatch color-swatch--transparent-bg">
          <div
            class="color-swatch__color"
            style="background: var(--uui-swatch-color, ${this.color ?? this.value})"></div>
          <div
            class="color-swatch__check"
            style="color: var(--uui-swatch-color, ${this.color ?? this.value})">
            ${Qo}
          </div>
        </div>
        ${this._renderWithLabel()}
      </button>
    `;
  }
  _renderWithLabel() {
    return this.showLabel ? l`<div class="color-swatch__label">
      <strong>${this.renderLabel()}</strong>
      ${this.value}
    </div>` : k;
  }
};
Ls = /* @__PURE__ */ new WeakSet();
nu = function(e) {
  this.selectableTarget = e || this;
};
ct.styles = [
  p`
      :host {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        transition: box-shadow 100ms ease-out;
        flex-direction: column;
      }

      :host(*),
      * {
        /* TODO: implement globally shared outline style */
        outline-color: var(--uui-color-focus,#3879ff);
        outline-offset: 4px;
      }

      :host(:focus-within:not([disabled])) {
        outline: none;
      }

      :host(:focus:not([disabled])) #swatch {
        outline-color: var(--uui-color-focus,#3879ff);
        outline-width: var(--uui-swatch-border-width, 1px);
        outline-style: solid;
        outline-offset: var(--uui-swatch-border-width, 1px);
      }

      :host([selectable]) #swatch {
        cursor: pointer;
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.5;
      }

      :host([readonly]) {
        cursor: default;
      }

      #swatch {
        cursor: inherit;
        outline: none;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        text-align: left;
        border-radius: 3px;
      }

      :host(:not([selectable])) #swatch:focus {
        outline: none;
      }

      :host([selectable]) #swatch::after {
        content: '';
        position: absolute;
        pointer-events: none;
        inset: calc(var(--uui-swatch-border-width, 1px) * -1);
        width: calc(100% + calc(var(--uui-swatch-border-width, 1px) * 2));
        height: calc(100% + calc(var(--uui-swatch-border-width, 1px) * 2));
        box-sizing: border-box;
        border: var(--uui-swatch-border-width, 2px) solid
          var(--uui-color-selected,#3544b1);
        border-radius: calc(
          var(--uui-border-radius,3px) + var(--uui-swatch-border-width, 1px)
        );
        transition: opacity 100ms ease-out;
        opacity: 0;
      }
      :host([selectable]:not([disabled]):hover) #swatch::after {
        opacity: 0.33;
      }
      :host([selectable][selected]:not([disabled]):hover) #swatch::after {
        opacity: 0.66;
      }
      :host([selectable][selected]:not([disabled])) #swatch::after {
        opacity: 1;
      }

      .color-swatch {
        position: relative;
        width: var(--uui-swatch-size, 25px);
        height: var(--uui-swatch-size, 25px);
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      :host([show-label]) .color-swatch {
        width: 120px;
        height: 50px;
      }

      .color-swatch.color-swatch--transparent-bg {
        background-image: linear-gradient(
            45deg,
            var(--uui-palette-grey,#c4c4c4) 25%,
            transparent 25%
          ),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey,#c4c4c4) 75%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey,#c4c4c4) 75%),
          linear-gradient(45deg, var(--uui-palette-grey,#c4c4c4) 25%, transparent 25%);
        background-size: 10px 10px;
        background-position:
          0 0,
          0 0,
          -5px -5px,
          5px 5px;
      }
      .color-swatch__color {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: inherit;
        box-sizing: border-box;
      }

      :host([show-label]) .color-swatch__color {
        border-radius: 3px 3px 0 0;
      }

      .color-swatch__check {
        position: absolute;
        vertical-align: middle;
        width: calc(var(--uui-swatch-size, 25px) / 2);
        height: calc(var(--uui-swatch-size, 25px) / 2);
        line-height: 0;
        filter: invert(1) grayscale(1) contrast(9);
        pointer-events: none;
        opacity: 0;
      }

      :host([selected]) .color-swatch__check {
        opacity: 1;
      }

      slot[name='label']::slotted(*),
      .label {
        font-size: var(--uui-size-4,12px);
      }

      .color-swatch__label {
        max-width: 120px;
        box-sizing: border-box;
        padding: var(--uui-size-space-1,3px) var(--uui-size-space-2,6px);
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        background: white;
        border: 1px solid var(--uui-color-border,#d8d7d9);
        border-radius: 0 0 3px 3px;
        font-size: var(--uui-size-4, 12px);
      }

      .color-swatch__label strong {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
      }
    `
];
Oi([
  a()
], ct.prototype, "value", 1);
Oi([
  a()
], ct.prototype, "color", 1);
Oi([
  a({ type: Boolean, reflect: !0 })
], ct.prototype, "disabled", 2);
Oi([
  a({ type: Boolean, reflect: !0 })
], ct.prototype, "readonly", 2);
Oi([
  a({ type: Boolean, attribute: "show-label", reflect: !0 })
], ct.prototype, "showLabel", 2);
ct = Oi([
  d("uui-color-swatch")
], ct);
class Lr extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var dp = Object.defineProperty, pp = Object.getOwnPropertyDescriptor, xr = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? pp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && dp(t, i, r), r;
};
let Lt = class extends De("label", v) {
  constructor() {
    super(), this.value = "", this.disabled = !1, this.readonly = !1, this._onSelected = (e) => {
      const t = e.target;
      this._swatches.includes(t) && (this._selectedElement && (this._selectedElement.selected = !1, this._selectedElement.active = !1, this._selectedElement = void 0), this._selectedElement = t, this._activeElement = this._selectedElement, this.value = this._selectedElement.value || "", this.dispatchEvent(new Lr(Lr.CHANGE)));
    }, this._onDeselected = (e) => {
      const t = e.target;
      this._swatches.includes(t) && (this._activeElement === t && (this._activeElement = void 0), this._selectedElement === t && (this._selectedElement.selected = !1, this._selectedElement.active = !1, this._selectedElement = void 0, this.value = "", this.dispatchEvent(
        new Lr(Lr.CHANGE)
      )));
    }, this.addEventListener(ei.SELECTED, this._onSelected), this.addEventListener(ei.DESELECTED, this._onDeselected);
  }
  get _activeElement() {
    return this.__activeElement;
  }
  set _activeElement(e) {
    this.__activeElement && (this.__activeElement.active = !1), e && (e.active = !0, this.__activeElement = e);
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "radiogroup"), this.setAttribute("aria-label", this.label);
  }
  willUpdate(e) {
    e.has("label") && this.setAttribute("aria-label", this.label);
  }
  _handleSlotChange() {
    !this._swatches || this._swatches.length === 0 || this._swatches.forEach((e) => {
      e.setAttribute("aria-checked", "false"), e.setAttribute("role", "radio"), this.disabled ? e.setAttribute("disabled", "") : e.setAttribute("selectable", "selectable"), this.readonly && e.setAttribute("readonly", ""), this.value !== "" && e.value === this.value && (e.selected = !0, e.setAttribute("aria-checked", "true"), this._selectedElement = e, this._activeElement = this._selectedElement);
    });
  }
  /**
   * Deselects all swatches.
   *
   * @memberof UUIColorSwatchesElement
   */
  resetSelection() {
    this._swatches.forEach((e) => {
      e.selected = !1, e.active = !1, e.selectable = !e.disabled;
    }), this._activeElement = void 0, this._selectedElement = void 0, this.value = "";
  }
  render() {
    return l`<slot @slotchange=${this._handleSlotChange}></slot>`;
  }
};
Lt.styles = [
  p`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
    `
];
xr([
  a()
], Lt.prototype, "value", 2);
xr([
  a({ type: Boolean, reflect: !0 })
], Lt.prototype, "disabled", 2);
xr([
  a({ type: Boolean, reflect: !0 })
], Lt.prototype, "readonly", 2);
xr([
  wt({ selector: "uui-color-swatch" })
], Lt.prototype, "_swatches", 2);
Lt = xr([
  d("uui-color-swatches")
], Lt);
class Ae extends S {
  static {
    this.CHANGE = "change";
  }
  static {
    this.INNER_SLOT_CHANGE = "inner-slot-change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var vp = Object.defineProperty, fp = Object.getOwnPropertyDescriptor, au = (e) => {
  throw TypeError(e);
}, xt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && vp(t, i, r), r;
}, bp = (e, t, i) => t.has(e) || au("Cannot " + i), gp = (e, t, i) => t.has(e) ? au("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Za = (e, t, i) => (bp(e, t, "access private method"), i), qr, Ts;
let Me = class extends v {
  constructor() {
    super(...arguments), gp(this, qr), this.displayValue = "", this._value = "", this._activeElementValue = null, this._onSlotChange = () => {
      Za(this, qr, Ts).call(this), this._updateSelection(), this.dispatchEvent(
        new Ae(Ae.INNER_SLOT_CHANGE)
      );
    }, this._onSelected = (e) => {
      this._selectedElement && (this._selectedElement.selected = !1, this._selectedElement.active = !1, this._selectedElement = void 0), this._selectedElement = e.composedPath()[0], this.value = this._selectedElement.value || "", this.displayValue = this._selectedElement.displayValue || "", this.dispatchEvent(new Ae(Ae.CHANGE));
    }, this._onDeselected = (e) => {
      const t = e.composedPath()[0];
      this._selectedElement === t && (this.value = "", this.displayValue = "", this.dispatchEvent(new Ae(Ae.CHANGE)));
    }, this._moveIndex = (e) => {
      const t = Math.min(
        Math.max(this._getActiveIndex + e, 0),
        this._options.length - 1
      );
      this._goToIndex(t);
    }, this._onKeyDown = (e) => {
      if (!(this._options.length <= 0))
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault(), e.ctrlKey ? this._moveIndex(-10) : this._moveIndex(-1);
            break;
          case "ArrowDown":
            e.preventDefault(), e.ctrlKey ? this._moveIndex(10) : this._moveIndex(1);
            break;
          case "Home": {
            e.preventDefault(), this._goToIndex(0);
            break;
          }
          case "Enter": {
            e.preventDefault(), this._getActiveElement?.click();
            break;
          }
          case "End": {
            e.preventDefault(), this._goToIndex(this._options.length - 1);
            break;
          }
        }
    };
  }
  get value() {
    return this._value;
  }
  set value(e) {
    if (this._value === e) return;
    const t = this._value;
    this._value = e, this._updateSelection(), this.requestUpdate("value", t);
  }
  get for() {
    return this._for;
  }
  set for(e) {
    this._for && this._for.removeEventListener("keydown", this._onKeyDown), this._for = e, this._for && this._for.addEventListener("keydown", this._onKeyDown);
  }
  connectedCallback() {
    super.connectedCallback(), this._for || (this._for = this), this.addEventListener(ei.SELECTED, this._onSelected), this.addEventListener(ei.DESELECTED, this._onDeselected);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this._onKeyDown), this.removeEventListener(ei.SELECTED, this._onSelected), this.removeEventListener(ei.DESELECTED, this._onDeselected);
  }
  _updateSelection() {
    this.displayValue = "";
    for (const e of this._options)
      e.value === this._value ? (this.displayValue = e.displayValue || "", e.selected = !0) : e.selected = !1;
  }
  get _getActiveIndex() {
    return this._activeElementValue === null ? -1 : this._options.findIndex(
      (e) => e.value === this._activeElementValue
    );
  }
  get _getActiveElement() {
    return this._activeElementValue === null ? null : this._options.find(
      (e) => e.value === this._activeElementValue
    );
  }
  _goToIndex(e) {
    if (this._options.length === 0) return;
    e = Math.min(Math.max(e, 0), this._options.length - 1);
    const t = this._options[e];
    this._activeElementValue = t.value, Za(this, qr, Ts).call(this), t && t.scrollIntoView({
      behavior: "auto",
      block: "nearest",
      inline: "nearest"
    });
  }
  render() {
    return l` <slot @slotchange=${this._onSlotChange}></slot> `;
  }
};
qr = /* @__PURE__ */ new WeakSet();
Ts = function() {
  for (let t = 0; t < this._activeOptions.length; t++)
    this._activeOptions[t].active = !1;
  const e = this._getActiveElement;
  e ? e.active = !0 : this._goToIndex(0);
};
Me.styles = [
  p`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
    `
];
xt([
  a()
], Me.prototype, "value", 1);
xt([
  a({ type: String })
], Me.prototype, "displayValue", 2);
xt([
  a({ attribute: !1 })
], Me.prototype, "for", 1);
xt([
  wt({
    flatten: !0,
    selector: "uui-combobox-list-option:not([disabled])"
  })
], Me.prototype, "_options", 2);
xt([
  wt({
    flatten: !0,
    selector: "uui-combobox-list-option[active]"
  })
], Me.prototype, "_activeOptions", 2);
xt([
  g()
], Me.prototype, "_value", 2);
xt([
  g()
], Me.prototype, "_activeElementValue", 2);
Me = xt([
  d("uui-combobox-list")
], Me);
var mp = Object.defineProperty, _p = Object.getOwnPropertyDescriptor, Ii = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? _p(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && mp(t, i, r), r;
};
let ht = class extends ki(
  yr(v)
) {
  constructor() {
    super(), this._disabled = !1, this._displayValue = "", this.selectable = !0, this.deselectable = !1;
  }
  get value() {
    return this._value ? this._value : this.textContent?.trim() || "";
  }
  set value(e) {
    const t = this._value;
    this._value = e, this.requestUpdate("value", t);
  }
  get displayValue() {
    return this._displayValue ? this._displayValue : this.textContent?.trim() || "";
  }
  set displayValue(e) {
    const t = this._displayValue;
    this._displayValue = e, this.requestUpdate("displayValue", t);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    const t = this._disabled;
    this._disabled = e, this.selectable = !this._disabled, this.requestUpdate("disabled", t);
  }
  render() {
    return l`<slot></slot>`;
  }
};
ht.styles = [
  p`
      :host {
        position: relative;
        cursor: pointer;
        margin: 1px var(--uui-size-2,6px);
        border-radius: var(--uui-border-radius,3px);
        outline: 2px solid transparent;
        outline-offset: -2px;
        padding: var(--uui-size-1,3px);
        padding-left: var(--uui-size-2,6px);
      }

      :host(:first-child) {
        margin-top: 6px;
      }
      :host(:last-child) {
        margin-bottom: 6px;
      }

      :host([selected]):host([active])::after {
        display: block;
        content: '';
        position: absolute;
        inset: 0px;
        outline: var(--uui-color-surface,#fff) solid 2px;
        outline-offset: -4px;
      }
      /*
      :host::before {
        display: block;
        content: '';
        opacity: 0;
        position: absolute;
        inset: 0;
        background-color: var(--uui-color-selected);
      }

      :host(:hover)::before {
        opacity: 0.15;
        border-radius: var(--uui-border-radius);
      } */

      :host(:hover) {
        background-color: var(--uui-color-surface-emphasis,rgb(
    250,
    250,
    250
  ));
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }

      :host([disabled]) {
        cursor: auto;
        color: var(--uui-color-disabled-contrast,#c4c4c4);
        background-color: var(--uui-color-disabled,#f3f3f5);
      }

      :host([disabled]:hover) {
        background-color: var(--uui-color-disabled,#f3f3f5);
      }

      :host([active]) {
        outline-color: var(--uui-color-focus,#3879ff);
      }

      :host([selected]) {
        color: var(--uui-color-selected-contrast,#fff);
        background-color: var(--uui-color-selected,#3544b1);
      }

      :host([selected]:hover) {
        color: var(--uui-color-selected-contrast,#fff);
        background-color: var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
      }
      :host([selected][disabled]) {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
        background-color: var(--uui-color-disabled,#f3f3f5);
      }
    `
];
Ii([
  g()
], ht.prototype, "_disabled", 2);
Ii([
  g()
], ht.prototype, "_displayValue", 2);
Ii([
  a({ type: String })
], ht.prototype, "value", 1);
Ii([
  a({ type: String, attribute: "display-value" })
], ht.prototype, "displayValue", 1);
Ii([
  a({ type: Boolean, reflect: !0 })
], ht.prototype, "disabled", 1);
ht = Ii([
  d("uui-combobox-list-option")
], ht);
class Pe extends S {
  static {
    this.SEARCH = "search";
  }
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var yp = Object.defineProperty, wp = Object.getOwnPropertyDescriptor, lu = (e) => {
  throw TypeError(e);
}, Q = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && yp(t, i, r), r;
}, Tn = (e, t, i) => t.has(e) || lu("Cannot " + i), $ = (e, t, i) => (Tn(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Y = (e, t, i) => t.has(e) ? lu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), uu = (e, t, i, o) => (Tn(e, t, "write to private field"), t.set(e, i), i), Kr = (e, t, i) => (Tn(e, t, "access private method"), i), oe, Yt, ti, cu, Fi, wo, Xr, Yr, Ns, xo, $o, Vs, Zr, Zt, Bs, Qr, Jr, Hs, eo;
let G = class extends Le(v, "") {
  constructor() {
    super(...arguments), Y(this, ti), this.closeLabel = "Close", this.disabled = !1, this.hideExpandSymbol = !1, this.readonly = !1, this.placeholder = "", Y(this, oe), Y(this, Yt), this._displayValue = "", this._search = "", this._isPhone = !1, this._isOpen = !1, Y(this, Fi, () => {
      this._isPhone = $(this, Yt).matches;
    }), Y(this, Xr, () => requestAnimationFrame(() => this._input.focus())), Y(this, Yr, () => requestAnimationFrame(() => {
      this.shadowRoot?.activeElement || $(this, Zt).call(this);
    })), Y(this, Ns, (e) => {
      e.preventDefault(), e.stopImmediatePropagation(), this.search = e.target.value, this.dispatchEvent(new Pe(Pe.SEARCH)), $(this, Zr).call(this);
    }), Y(this, xo, () => {
      this.value && this.value !== $(this, oe)?.value && Kr(this, ti, wo).call(this);
    }), Y(this, $o, () => {
      this.value = $(this, oe)?.value || "", this.search = this.value ? this.search : "", $(this, Zt).call(this), this.dispatchEvent(new Pe(Pe.CHANGE));
    }), Y(this, Vs, () => {
      this.readonly || (this.open = !this.open);
    }), Y(this, Zr, () => {
      this.open || this.readonly || (this.open = !0);
    }), Y(this, Zt, () => {
      this.open && (this.open = !1, this.search = "", this._input.value = this._displayValue, this.dispatchEvent(new Pe(Pe.SEARCH)));
    }), Y(this, Bs, (e) => {
      this.open === !1 && e.key === "Enter" && (e.preventDefault(), e.stopImmediatePropagation()), (e.key === "ArrowUp" || e.key === "ArrowDown") && $(this, Zr).call(this), (e.key === "Escape" || e.key === "Enter") && $(this, Zt).call(this);
    }), Y(this, Qr, (e) => {
      e.key && e.key !== "Enter" || (e.preventDefault(), e.stopImmediatePropagation(), this.value = "", this.search = "", this._input.value = this._displayValue, this._input.focus(), this.dispatchEvent(new Pe(Pe.SEARCH)), this.dispatchEvent(new Pe(Pe.CHANGE)));
    }), Y(this, Jr, () => l`<uui-input
      slot="trigger"
      id="combobox-input"
      label="combobox-input"
      type="text"
      .value=${this._displayValue}
      .placeholder=${this.placeholder}
      autocomplete="off"
      .disabled=${this.disabled}
      .readonly=${this.readonly}
      popovertarget="combobox-popover"
      @click=${$(this, Vs)}
      @input=${$(this, Ns)}
      @keydown=${$(this, Bs)}>
      <slot name="input-prepend" slot="prepend"></slot>
      ${$(this, Hs).call(this)}
      ${this.hideExpandSymbol ? k : l`<div id="expand-symbol-wrapper" slot="append">
            <uui-symbol-expand .open=${this._isOpen}></uui-symbol-expand>
          </div>`}
      <slot name="input-append" slot="append"></slot>
    </uui-input>`), Y(this, Hs, () => this.disabled || this.readonly ? k : l`<uui-button
      id="clear-button"
      @click=${$(this, Qr)}
      @keydown=${$(this, Qr)}
      label="clear"
      slot="append"
      compact
      style="height: 100%;"
      tabindex=${this.value || this.search ? "" : "-1"}
      class=${this.value || this.search ? "visible" : ""}>
      <uui-icon name="remove" .fallback=${An.strings[0]}></uui-icon>
    </uui-button>`), Y(this, eo, () => l`<div id="dropdown">
      <uui-scroll-container tabindex="-1" id="scroll-container">
        <slot @slotchange=${Kr(this, ti, cu)}></slot>
      </uui-scroll-container>
    </div>`);
  }
  get value() {
    return super.value;
  }
  set value(e) {
    super.value = e, typeof e == "string" && Kr(this, ti, wo).call(this);
  }
  get search() {
    return this._search;
  }
  set search(e) {
    if (this.search === e) return;
    const t = this._search;
    this._search = e, this.requestUpdate("search", t);
  }
  get open() {
    return this._isOpen;
  }
  set open(e) {
    const t = e;
    this._isOpen = e;
    const i = this._comboboxPopoverElement;
    if (i)
      if (e) {
        const o = this._input.offsetWidth;
        i.style.setProperty("--popover-width", `${o}px`), i.showPopover();
      } else
        i.hidePopover();
    this.requestUpdate("open", t);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("blur", $(this, Yr)), this.addEventListener("mousedown", $(this, Xr)), uu(this, Yt, window.matchMedia("(max-width: 600px)")), $(this, Fi).call(this), $(this, Yt).addEventListener("change", $(this, Fi)), y(this, "uui-icon"), y(this, "uui-input"), y(this, "uui-button"), y(this, "uui-combobox-list"), y(this, "uui-scroll-container"), y(this, "uui-popover-container"), y(this, "uui-symbol-expand");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("blur", $(this, Yr)), this.removeEventListener("mousedown", $(this, Xr)), $(this, Yt).removeEventListener("change", $(this, Fi));
  }
  getFormElement() {
    return this._input;
  }
  async focus() {
    await this.updateComplete, this._input.focus();
  }
  async blur() {
    await this.updateComplete, this._input.blur();
  }
  async click() {
    await this.updateComplete, this._input.click();
  }
  render() {
    return this._isPhone && this.open ? l`<div id="phone-wrapper">
        <uui-button label="close" look="primary" @click=${$(this, Zt)}>
          ${this.closeLabel}
        </uui-button>
        ${$(this, Jr).call(this)} ${$(this, eo).call(this)}
      </div>` : l`
        ${$(this, Jr).call(this)}
        <uui-popover-container
          id="combobox-popover"
          popover="manual"
          placement="bottom-end">
          ${$(this, eo).call(this)}
        </uui-popover-container>
      `;
  }
};
oe = /* @__PURE__ */ new WeakMap();
Yt = /* @__PURE__ */ new WeakMap();
ti = /* @__PURE__ */ new WeakSet();
cu = function() {
  $(this, oe) && ($(this, oe).removeEventListener(
    Ae.CHANGE,
    $(this, $o)
  ), $(this, oe).removeEventListener(
    Ae.INNER_SLOT_CHANGE,
    $(this, xo)
  ));
  const e = this._comboboxListElements?.[0];
  e && (uu(this, oe, e), $(this, oe).for = this, $(this, oe).addEventListener(
    Ae.CHANGE,
    $(this, $o)
  ), $(this, oe).addEventListener(
    Ae.INNER_SLOT_CHANGE,
    $(this, xo)
  )), this.updateComplete.then(() => {
    Kr(this, ti, wo).call(this);
  });
};
Fi = /* @__PURE__ */ new WeakMap();
wo = function() {
  $(this, oe) && ($(this, oe).value = this.value, requestAnimationFrame(
    () => this._displayValue = $(this, oe).displayValue || ""
  ));
};
Xr = /* @__PURE__ */ new WeakMap();
Yr = /* @__PURE__ */ new WeakMap();
Ns = /* @__PURE__ */ new WeakMap();
xo = /* @__PURE__ */ new WeakMap();
$o = /* @__PURE__ */ new WeakMap();
Vs = /* @__PURE__ */ new WeakMap();
Zr = /* @__PURE__ */ new WeakMap();
Zt = /* @__PURE__ */ new WeakMap();
Bs = /* @__PURE__ */ new WeakMap();
Qr = /* @__PURE__ */ new WeakMap();
Jr = /* @__PURE__ */ new WeakMap();
Hs = /* @__PURE__ */ new WeakMap();
eo = /* @__PURE__ */ new WeakMap();
G.styles = [
  p`
      :host {
        display: inline-flex;
      }

      #combobox-input {
        width: 100%;
        border-radius: var(--uui-size-1,3px);
      }

      #combobox-popover {
        width: var(--uui-dropdown-width, var(--popover-width, inherit));
      }

      #scroll-container {
        overflow-y: auto;
        width: 100%;
        max-height: var(--uui-combobox-popover-max-height, 500px);
      }
      #expand-symbol-wrapper {
        height: 100%;
        padding-right: var(--uui-size-space-3,9px);
        display: flex;
        justify-content: center;
      }

      #clear-button {
        opacity: 0;
        transition: opacity 80ms;
      }

      :host(:not([disabled]):not([readonly]):focus-within)
        #clear-button.visible,
      :host(:not([disabled]):not([readonly]):hover) #clear-button.visible {
        opacity: 1;
      }

      #dropdown {
        overflow: hidden;
        z-index: -1;
        background-color: var(
          --uui-combobox-popover-background-color,
          var(--uui-color-surface,#fff)
        );
        border: 1px solid var(--uui-color-border,#d8d7d9);
        border-radius: var(--uui-border-radius,3px);
        width: 100%;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-3,0 10px 20px rgba(0,0,0,0.19) , 0 6px 6px rgba(0,0,0,0.23));
      }

      :host([disabled]) #caret {
        fill: var(--uui-color-disabled-contrast,#c4c4c4);
      }

      #phone-wrapper {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        z-index: 1;
        font-size: 1.1em;
      }

      #phone-wrapper #dropdown {
        display: flex;
      }

      #phone-wrapper #combobox-input {
        height: var(--uui-size-16,48px);
      }

      #phone-wrapper > uui-button {
        height: var(--uui-size-14,42px);
        width: 100%;
      }

      #phone-wrapper #scroll-container {
        max-height: unset;
      }
    `
];
Q([
  a({ attribute: "value", reflect: !0 })
], G.prototype, "value", 1);
Q([
  a({ type: String })
], G.prototype, "search", 1);
Q([
  a({ type: Boolean })
], G.prototype, "open", 1);
Q([
  a({ type: String, attribute: "close-label" })
], G.prototype, "closeLabel", 2);
Q([
  a({ type: Boolean, reflect: !0 })
], G.prototype, "disabled", 2);
Q([
  a({ type: Boolean, reflect: !1, attribute: "hide-expand-symbol" })
], G.prototype, "hideExpandSymbol", 2);
Q([
  a({ type: Boolean, reflect: !0 })
], G.prototype, "readonly", 2);
Q([
  a()
], G.prototype, "placeholder", 2);
Q([
  P("#combobox-input")
], G.prototype, "_input", 2);
Q([
  P("#combobox-popover")
], G.prototype, "_comboboxPopoverElement", 2);
Q([
  wt({
    flatten: !0,
    selector: "uui-combobox-list"
  })
], G.prototype, "_comboboxListElements", 2);
Q([
  g()
], G.prototype, "_displayValue", 2);
Q([
  g()
], G.prototype, "_search", 2);
Q([
  g()
], G.prototype, "_isPhone", 2);
Q([
  g()
], G.prototype, "_isOpen", 2);
G = Q([
  d("uui-combobox")
], G);
var xp = Object.defineProperty, $p = Object.getOwnPropertyDescriptor, Nn = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? $p(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && xp(t, i, r), r;
};
let lr = class extends v {
  constructor() {
    super(...arguments), this.headline = null, this._headlineSlotHasContent = !1, this._headlineSlotChanged = (e) => {
      this._headlineSlotHasContent = e.target.assignedNodes({ flatten: !0 }).length > 0;
    };
  }
  /**
   * Renders a h3 with the headline slot nested
   * @returns {TemplateResult}
   * @protected
   * @method
   */
  renderHeadline() {
    return l` <h3
      style=${this._headlineSlotHasContent || this.headline !== null ? "" : "display: none"}>
      ${this.headline}
      <slot name="headline" @slotchange=${this._headlineSlotChanged}></slot>
    </h3>`;
  }
  /**
   * Renders default slot
   * @returns {TemplateResult}
   * @protected
   * @method
   */
  renderContent() {
    return l`<slot></slot>`;
  }
  /**
   * Renders actions slot
   * @returns {TemplateResult}
   * @protected
   * @method
   */
  renderActions() {
    return l`<slot id="actions" name="actions"></slot>`;
  }
  render() {
    return l`${this.renderHeadline()} ${this.renderContent()}
    ${this.renderActions()} `;
  }
};
lr.styles = [
  p`
      :host {
        display: block;
        padding: var(--uui-size-10,30px) var(--uui-size-14,42px);
        color: var(--uui-color-text,#060606);
      }

      #actions {
        margin-top: var(--uui-size-8,24px);
        display: flex;
        justify-content: end;
        gap: var(--uui-size-4,12px);
      }
    `
];
Nn([
  a({ type: String })
], lr.prototype, "headline", 2);
Nn([
  g()
], lr.prototype, "_headlineSlotHasContent", 2);
lr = Nn([
  d("uui-dialog-layout")
], lr);
var kp = Object.getOwnPropertyDescriptor, Cp = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? kp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let js = class extends v {
  render() {
    return l`<slot></slot>`;
  }
};
js.styles = [
  p`
      :host {
        position: relative;
        display: block;
        max-width: 580px;
        color: var(--uui-color-text,#060606);

        background-color: var(
          --uui-dialog-background-color,
          var(--uui-color-surface,#fff)
        );

        box-shadow: var(--uui-shadow-depth-5,0 19px 38px rgba(0,0,0,0.30) , 0 15px 12px rgba(0,0,0,0.22));
        border-radius: var(
          --uui-dialog-border-radius,
          calc(var(--uui-border-radius,3px) * 2)
        );
      }
    `
];
js = Cp([
  d("uui-dialog")
], js);
var Ep = Object.defineProperty, Pp = Object.getOwnPropertyDescriptor, hu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Pp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ep(t, i, r), r;
};
let ko = class extends v {
  constructor() {
    super(...arguments), this.error = !1;
  }
  render() {
    return l`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      id="upload-icon">
      <path
        d=${this.error ? "M254.501 38.16c-120.308 0-217.838 97.53-217.838 217.838 0 120.31 97.53 217.838 217.838 217.838 120.31 0 217.838-97.528 217.838-217.838 0-120.308-97.528-217.838-217.838-217.838zm151.667 217.838c0 29.861-8.711 57.708-23.671 81.209L173.293 128.002c23.499-14.961 51.345-23.67 81.208-23.67 83.629.001 151.667 68.037 151.667 151.666zm-303.332 0c0-29.859 8.71-57.707 23.67-81.204l209.201 209.201c-23.498 14.96-51.346 23.671-81.206 23.671-83.632 0-151.665-68.04-151.665-151.668z" : "M206.491 364.184h99.013V223.676h92.922L255.997 51.111 113.575 223.676h92.916zM85.043 398.311h341.912v62.578H85.043z"} />
    </svg> `;
  }
};
ko.styles = [
  p`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      #upload-icon {
        fill: var(--uui-color-default,#1b264f);
        width: 100px;
        transition: fill 0.3s ease;
        position: relative;
        z-index: 2;
      }

      :host([error]) #upload-icon {
        fill: var(--uui-color-invalid,#d42054);
      }
    `
];
hu([
  a({ type: Boolean, reflect: !0 })
], ko.prototype, "error", 2);
ko = hu([
  d("uui-symbol-file-dropzone")
], ko);
class Tr extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var Sp = Object.defineProperty, Op = Object.getOwnPropertyDescriptor, Ai = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Op(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Sp(t, i, r), r;
};
let dt = class extends De("", v) {
  constructor() {
    super(), this._acceptedFileExtensions = [], this._acceptedMimeTypes = [], this._accept = "", this.disallowFolderUpload = !1, this.multiple = !1, this.addEventListener("dragenter", this._onDragEnter, !1), this.addEventListener("dragleave", this._onDragLeave, !1), this.addEventListener("dragover", this._onDragOver, !1), this.addEventListener("drop", this._onDrop, !1);
  }
  set accept(e) {
    if (e) {
      const i = [], o = [];
      e.split(",").forEach((r) => {
        r = r.trim().toLowerCase(), /[a-z]+\/[a-z*]/s.test(r) ? i.push(r) : o.push(r.replace(/^\./, ""));
      }), this._acceptedMimeTypes = i, this._acceptedFileExtensions = o;
    } else
      this._acceptedMimeTypes = [], this._acceptedFileExtensions = [];
    const t = this._accept;
    this._accept = e, this.requestUpdate("accept", t);
  }
  get accept() {
    return this._accept;
  }
  /**
   * Opens the native file picker to select a file.
   * @method browse
   */
  browse() {
    this._input.click();
  }
  async _getAllEntries(e) {
    const t = [...e], i = [], o = [];
    for (const r of t) {
      if (r?.kind !== "file") continue;
      const s = this._getEntry(r);
      if (s)
        if (s.isDirectory) {
          if (!this.disallowFolderUpload && this.multiple) {
            const n = await this._mkdir(s);
            i.push(n);
          }
        } else {
          const n = r.getAsFile();
          if (!n) continue;
          this._isAccepted(n) && o.push(n);
        }
    }
    return { files: o, folders: i };
  }
  /**
   * Get the directory entry from a DataTransferItem.
   * @remark Supports both WebKit and non-WebKit browsers.
   */
  _getEntry(e) {
    let t = null;
    return "webkitGetAsEntry" in e ? t = e.webkitGetAsEntry() : "getAsEntry" in e && (t = e.getAsEntry()), t;
  }
  // Make directory structure
  async _mkdir(e) {
    const t = e.createReader(), i = [], o = [], r = (n) => new Promise((u, c) => {
      n.readEntries(async (h) => {
        if (!h.length) {
          u();
          return;
        }
        for (const m of h)
          if (m.isFile) {
            const f = await this._getAsFile(m);
            this._isAccepted(f) && o.push(f);
          } else if (m.isDirectory) {
            const f = await this._mkdir(
              m
            );
            i.push(f);
          }
        await r(n), u();
      }, c);
    });
    return await r(t), { folderName: e.name, folders: i, files: o };
  }
  _isAccepted(e) {
    if (this._acceptedFileExtensions.length === 0 && this._acceptedMimeTypes.length === 0)
      return !0;
    const t = e.type.toLowerCase(), i = e.name.split(".").pop();
    if (i && this._acceptedFileExtensions.includes(i.toLowerCase()))
      return !0;
    for (const o of this._acceptedMimeTypes) {
      if (t === o)
        return !0;
      if (o.endsWith("/*") && t.startsWith(o.replace("*", "")))
        return !0;
    }
    return !1;
  }
  async _getAsFile(e) {
    return new Promise((t, i) => e.file(t, i));
  }
  async _onDrop(e) {
    e.preventDefault(), this._dropzone.classList.remove("hover");
    const t = e.dataTransfer?.items;
    if (t) {
      const i = await this._getAllEntries(t);
      if (this.multiple === !1 && i.files.length && (i.files = [i.files[0]], i.folders = []), !i.files.length && !i.folders.length)
        return;
      this.dispatchEvent(
        new Tr(Tr.CHANGE, {
          detail: i
        })
      );
    }
  }
  _onDragOver(e) {
    e.preventDefault();
  }
  _onDragEnter(e) {
    this._dropzone.classList.add("hover"), e.preventDefault();
  }
  _onDragLeave(e) {
    this._dropzone.classList.remove("hover"), e.preventDefault();
  }
  _onFileInputChange() {
    const e = this._input.files ? Array.from(this._input.files) : [];
    this.multiple === !1 && e.length > 1 && e.splice(1, e.length - 1);
    const t = e.filter((i) => this._isAccepted(i));
    t.length && this.dispatchEvent(
      new Tr(Tr.CHANGE, {
        detail: { files: t, folders: [] }
      })
    );
  }
  render() {
    return l`
      <div id="dropzone">
        <uui-symbol-file-dropzone id="symbol"></uui-symbol-file-dropzone>
        ${this.renderLabel()}
        <input
          @click=${(e) => e.stopImmediatePropagation()}
          id="input"
          type="file"
          accept=${this.accept}
          ?multiple=${this.multiple}
          @change=${this._onFileInputChange}
          aria-label="${this.label}" />
        <slot></slot>
      </div>
    `;
  }
};
dt.styles = [
  p`
      #dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: var(--uui-size-4,12px);
        border: 3px solid transparent;
        margin: -3px;
        backdrop-filter: blur(2px);
      }
      #dropzone.hover {
        border-color: var(--uui-color-default,#1b264f);
      }
      #dropzone.hover::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.2;
        border-color: var(--uui-color-default,#1b264f);
        background-color: var(--uui-color-default,#1b264f);
      }
      #symbol {
        color: var(--uui-color-default,#1b264f);
        max-width: 100%;
        max-height: 100%;
      }
      #input {
        position: absolute;
        width: 0px;
        height: 0px;
        opacity: 0;
        display: none;
      }
    `
];
Ai([
  P("#input")
], dt.prototype, "_input", 2);
Ai([
  P("#dropzone")
], dt.prototype, "_dropzone", 2);
Ai([
  a({ type: String })
], dt.prototype, "accept", 1);
Ai([
  a({
    type: Boolean,
    reflect: !0,
    attribute: "disallow-folder-upload"
  })
], dt.prototype, "disallowFolderUpload", 2);
Ai([
  a({ type: Boolean })
], dt.prototype, "multiple", 2);
dt = Ai([
  d("uui-file-dropzone")
], dt);
class Ip {
  static humanFileSize(t, i = !1, o = 1) {
    const r = i ? 1e3 : 1024;
    if (Math.abs(t) < r)
      return t + " B";
    const s = i ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let n = -1;
    const u = 10 ** o;
    do
      t /= r, ++n;
    while (Math.round(Math.abs(t) * u) / u >= r && n < s.length - 1);
    return t.toFixed(o) + " " + s[n];
  }
}
var Ap = Object.defineProperty, Up = Object.getOwnPropertyDescriptor, Ve = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Up(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ap(t, i, r), r;
};
let be = class extends v {
  constructor() {
    super(...arguments), this._name = "", this._url = "", this._extension = "", this._src = "", this._size = 0, this._isDirectory = !1;
  }
  get file() {
    return this._file;
  }
  set file(e) {
    const t = this._file;
    e instanceof File && (this._name = e.name.split(".")[0], this._extension = e.name.split(".")[1], this._isDirectory = !1, this._size = e.size, this._isFileAnImage(e) && (this._isImage = !0, this._getThumbnail(e).then((i) => {
      this._src = i;
    })), this.requestUpdate("file", t));
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-symbol-file-thumbnail"), y(this, "uui-symbol-folder"), y(this, "uui-symbol-file");
  }
  _openSource() {
    window.open(this._url, "_blank");
  }
  _fileTypeTemplate() {
    return this._isDirectory ? l`<uui-symbol-folder id="file-symbol"></uui-symbol-folder>` : this._isImage ? l`<uui-symbol-file-thumbnail
        .src=${this._src}
        .alt=${this._name}
        id="file-symbol"></uui-symbol-file-thumbnail>` : l`<uui-symbol-file
      id="file-symbol"
      .type=${this._extension}></uui-symbol-file>`;
  }
  _renderLongName() {
    const t = this._name.substring(0, this._name.length - 6), i = this._name.substring(
      this._name.length - 6,
      this._name.length
    );
    return l`
      <span
        id="file-name"
        class=${this._url ? "has-source" : ""}
        @click=${() => this._url ? this._openSource() : ""}
        @keydown=${() => ""}>
        <span id="file-name-start">${t}</span>
        <span id="file-name-end">${i}</span>
      </span>
    `;
  }
  _isFileAnImage(e) {
    return e ? e.type.split("/")[0] === "image" : !1;
  }
  async _getThumbnail(e) {
    return await new Promise((t) => {
      const i = new FileReader();
      i.readAsDataURL(e), i.onload = () => {
        t(i.result);
      };
    });
  }
  render() {
    return l`
      <slot id="actions" name="actions"></slot>
      ${this._fileTypeTemplate()}
      <div id="file-info">
        ${this._renderLongName()}
        <span id="file-size">
          ${this._size && !this._isDirectory ? l`${Ip.humanFileSize(this._size, !0)}` : ""}
        </span>
      </div>
    `;
  }
};
be.styles = [
  p`
      :host {
        position: relative;
        display: grid;
        /* These have to be changed together */
        grid-template-rows: 100px 50px;
        width: 150px;
        height: 150px;
        /* --------------------------------- */
        box-sizing: border-box;
        aspect-ratio: 1;
        color: var(--uui-color-text,#060606);
      }

      :host(:hover) slot[name='actions']::slotted(*) {
        opacity: 1;
      }

      slot[name='actions']::slotted(*) {
        position: absolute;
        top: 8px;
        right: 8px;
        max-width: 100%;
        height: 32px;
        font-size: 13px;
        opacity: 0;
        z-index: 1;
        transition: opacity 150ms;
      }

      #file-symbol {
        aspect-ratio: 1 / 1;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
      }

      #file-info {
        min-width: 0;
        display: flex;
        text-align: center;
        flex-direction: column;
        font-size: 1rem;
      }

      #file-name {
        display: flex;
        justify-content: center;
      }

      #file-name-start {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      #file-name-end {
        white-space: nowrap;
      }

      #file-size {
        opacity: 0.6;
      }

      .has-source:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    `
];
Ve([
  g()
], be.prototype, "_name", 2);
Ve([
  g()
], be.prototype, "_url", 2);
Ve([
  g()
], be.prototype, "_extension", 2);
Ve([
  g()
], be.prototype, "_src", 2);
Ve([
  g()
], be.prototype, "_size", 2);
Ve([
  g()
], be.prototype, "_isDirectory", 2);
Ve([
  g()
], be.prototype, "_file", 2);
Ve([
  g()
], be.prototype, "_isImage", 2);
Ve([
  a({ attribute: !1 })
], be.prototype, "file", 1);
be = Ve([
  d("uui-file-preview")
], be);
var zp = Object.defineProperty, Mp = Object.getOwnPropertyDescriptor, is = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Mp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && zp(t, i, r), r;
};
let fi = class extends v {
  constructor() {
    super(...arguments), this.description = null, this._labelSlotHasContent = !1, this._labelSlotChanged = (e) => {
      this._labelSlotHasContent = e.target.assignedNodes({ flatten: !0 }).length > 0;
    }, this._descriptionSlotHasContent = !1, this._descriptionSlotChanged = (e) => {
      this._descriptionSlotHasContent = e.target.assignedNodes({ flatten: !0 }).length > 0;
    };
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-form-validation-message");
  }
  render() {
    return l`
      <div id="label" style=${this._labelSlotHasContent ? "" : "display: none"}>
        <slot name="label" @slotchange=${this._labelSlotChanged}></slot>
      </div>
      <div
        id="description"
        style=${this._descriptionSlotHasContent || this.description !== null ? "" : "display: none"}>
        ${this.description}
        <slot
          name="description"
          @slotchange=${this._descriptionSlotChanged}></slot>
      </div>
      <uui-form-validation-message>
        <slot></slot>
        <slot name="message" slot="message"></slot>
      </uui-form-validation-message>
    `;
  }
};
fi.styles = [
  p`
      :host {
        position: relative;
        display: block;
        margin-top: var(--uui-size-space-5,18px);
        margin-bottom: var(--uui-size-space-5,18px);
      }
      #label {
        margin-top: -5px;
        margin-bottom: 5px;
      }
      #description {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
        font-size: var(--uui-type-small-size,12px);
      }
      #label + #description {
        margin-top: -8px;
        min-height: 8px;
      }
    `
];
is([
  a({ type: String })
], fi.prototype, "description", 2);
is([
  g()
], fi.prototype, "_labelSlotHasContent", 2);
is([
  g()
], fi.prototype, "_descriptionSlotHasContent", 2);
fi = is([
  d("uui-form-layout-item")
], fi);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qa = (e, t, i) => {
  const o = /* @__PURE__ */ new Map();
  for (let r = t; r <= i; r++) o.set(e[r], r);
  return o;
}, Vn = Ei(class extends Pi {
  constructor(e) {
    if (super(e), e.type !== me.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let o;
    i === void 0 ? i = t : t !== void 0 && (o = t);
    const r = [], s = [];
    let n = 0;
    for (const u of e) r[n] = o ? o(u, n) : n, s[n] = i(u, n), n++;
    return { values: s, keys: r };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, o]) {
    const r = Dd(e), { values: s, keys: n } = this.dt(t, i, o);
    if (!Array.isArray(r)) return this.ut = n, s;
    const u = this.ut ??= [], c = [];
    let h, m, f = 0, C = r.length - 1, x = 0, O = s.length - 1;
    for (; f <= C && x <= O; ) if (r[f] === null) f++;
    else if (r[C] === null) C--;
    else if (u[f] === n[x]) c[x] = St(r[f], s[x]), f++, x++;
    else if (u[C] === n[O]) c[O] = St(r[C], s[O]), C--, O--;
    else if (u[f] === n[O]) c[O] = St(r[f], s[O]), Bi(e, c[O + 1], r[f]), f++, O--;
    else if (u[C] === n[x]) c[x] = St(r[C], s[x]), Bi(e, r[f], r[C]), C--, x++;
    else if (h === void 0 && (h = Qa(n, x, O), m = Qa(u, f, C)), h.has(u[f])) if (h.has(u[C])) {
      const X = m.get(n[x]), Be = X !== void 0 ? r[X] : null;
      if (Be === null) {
        const tt = Bi(e, r[f]);
        St(tt, s[x]), c[x] = tt;
      } else c[x] = St(Be, s[x]), Bi(e, r[f], Be), r[X] = null;
      x++;
    } else gs(r[C]), C--;
    else gs(r[f]), f++;
    for (; x <= O; ) {
      const X = Bi(e, c[O + 1]);
      St(X, s[x]), c[x++] = X;
    }
    for (; f <= C; ) {
      const X = r[f++];
      X !== null && gs(X);
    }
    return this.ut = n, Zl(e, c), se;
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Rs extends Pi {
  constructor(t) {
    if (super(t), this.it = k, t.type !== me.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === k || t == null) return this._t = void 0, this.it = t;
    if (t === se) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const i = [t];
    return i.raw = i, this._t = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
Rs.directiveName = "unsafeHTML", Rs.resultType = 1;
const to = Ei(Rs);
var Dp = Object.defineProperty, Lp = Object.getOwnPropertyDescriptor, du = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Lp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Dp(t, i, r), r;
};
let Co = class extends v {
  constructor() {
    super(), this._for = null, this._messages = /* @__PURE__ */ new Map(), this._onControlInvalid = (e) => {
      const t = e.composedPath()[0];
      t.pristine === !1 ? this._messages.set(t, t.validationMessage) : this._messages.delete(t), this.requestUpdate("_messages");
    }, this._onControlValid = (e) => {
      const t = e.composedPath()[0];
      this._messages.delete(t), this.requestUpdate("_messages");
    }, this.for === null && (this.for = this);
  }
  get for() {
    return this._for;
  }
  set for(e) {
    let t = null;
    typeof e == "string" ? t = this.getRootNode()?.getElementById(e) : e instanceof HTMLElement && (t = e);
    const i = t ?? this, o = this._for;
    o !== i && (o !== null && (o.removeEventListener(
      Or.INVALID,
      this._onControlInvalid
    ), o.removeEventListener(
      Or.VALID,
      this._onControlValid
    )), this._for = i, this._for.addEventListener(
      Or.INVALID,
      this._onControlInvalid
    ), this._for.addEventListener(
      Or.VALID,
      this._onControlValid
    ));
  }
  render() {
    return l`
      <slot></slot>
      <div id="messages">
        ${Vn(
      this._messages,
      (e) => l`<div>${to(e[1])}</div>`
    )}
        <slot name="message"></slot>
      </div>
    `;
  }
};
Co.styles = [
  p`
      #messages {
        color: var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
      }
    `
];
du([
  a({ reflect: !1, attribute: !0 })
], Co.prototype, "for", 1);
Co = du([
  d("uui-form-validation-message")
], Co);
var Tp = Object.getOwnPropertyDescriptor, Np = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Tp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let Ja = class extends v {
  constructor() {
    super(...arguments), this._formElement = null;
  }
  getFormElement() {
    return this._formElement;
  }
  _onSlotChanged(e) {
    this._formElement && (this._formElement.removeEventListener("submit", this._onSubmit), this._formElement.removeEventListener("reset", this._onReset));
    const t = e.target.assignedNodes({ flatten: !0 }).filter((i) => i instanceof HTMLFormElement);
    this._formElement = t.length > 0 ? t[0] : null, this._formElement && (this._formElement.setAttribute("novalidate", ""), this._formElement.addEventListener("submit", this._onSubmit), this._formElement.addEventListener("reset", this._onReset));
  }
  _onSubmit(e) {
    if (e.target === null)
      return;
    const t = e.target;
    if (!t.checkValidity()) {
      t.setAttribute("submit-invalid", "");
      return;
    }
    t.removeAttribute("submit-invalid");
  }
  _onReset(e) {
    e.target !== null && e.target.removeAttribute("submit-invalid");
  }
  render() {
    return l`<slot @slotchange=${this._onSlotChanged}></slot>`;
  }
};
Ja = Np([
  d("uui-form")
], Ja);
class Eo extends S {
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      composed: !0,
      ...i
    }), this.icon = null;
  }
  static {
    this.ICON_REQUEST = "icon-request";
  }
  acceptRequest(t) {
    this.icon = t, this.stopImmediatePropagation();
  }
}
var Vp = Object.defineProperty, Bp = Object.getOwnPropertyDescriptor, Bt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Bp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Vp(t, i, r), r;
};
let Je = class extends v {
  constructor() {
    super(...arguments), this._name = null, this._retrievedNameIcon = !1, this._nameSvg = null, this.label = "", this.svg = null, this.fallback = null, this._useFallback = !1;
  }
  get name() {
    return this._name;
  }
  set name(e) {
    this._name = e, this.shadowRoot && this.requestIcon();
  }
  requestIcon() {
    if (this._name !== "" && this._name !== null) {
      const e = new Eo(Eo.ICON_REQUEST, {
        detail: { iconName: this._name }
      });
      this.dispatchEvent(e), e.icon !== null ? (this._retrievedNameIcon = !0, e.icon.then((t) => {
        this._useFallback = !1, this._nameSvg = t;
      })) : (this._retrievedNameIcon = !1, this._useFallback = !0);
    }
  }
  connectedCallback() {
    super.connectedCallback(), this._retrievedNameIcon === !1 && this.requestIcon();
  }
  disconnectedCallback() {
    this._retrievedNameIcon = !1;
  }
  firstUpdated() {
    this._retrievedNameIcon === !1 && this.requestIcon(), typeof this.label == "string" && this.label.length > 0 ? (this.setAttribute("role", "img"), this.setAttribute("aria-label", this.label), this.removeAttribute("aria-hidden")) : (this.removeAttribute("role"), this.removeAttribute("aria-label"), this.setAttribute("aria-hidden", "true"));
  }
  render() {
    return this._useFallback === !0 ? this.fallback === null ? l`<slot name="fallback"></slot>` : l`${to(this.fallback)}` : this._nameSvg !== null ? l`${to(this._nameSvg)}` : this.svg !== null ? l`${to(this.svg)}` : l`<slot></slot>`;
  }
};
Je.styles = [
  p`
      :host {
        vertical-align: text-bottom;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.125em;
        height: 1.125em;
      }

      :host svg,
      ::slotted(svg) {
        color: var(--uui-icon-color, currentColor);
        width: 100%;
      }

      :host-context(div[slot='prepend']) {
        margin-left: var(--uui-size-2, 6px);
      }

      :host-context(div[slot='append']) {
        margin-right: var(--uui-size-2, 6px);
      }
    `
];
Bt([
  g()
], Je.prototype, "_nameSvg", 2);
Bt([
  a()
], Je.prototype, "label", 2);
Bt([
  a()
], Je.prototype, "name", 1);
Bt([
  a({ attribute: !1 })
], Je.prototype, "svg", 2);
Bt([
  a({ attribute: !1 })
], Je.prototype, "fallback", 2);
Bt([
  g()
], Je.prototype, "_useFallback", 2);
Je = Bt([
  d("uui-icon")
], Je);
class el {
  constructor(t) {
    this.promise = new Promise((i, o) => {
      this.resolve = i, this.reject = o;
    }), t && this.resolve(t);
  }
  set svg(t) {
    this.resolve(t);
  }
}
class pu {
  constructor() {
    this.icons = {}, this._onIconRequest = (t) => {
      const i = this.getIcon(t.detail.iconName);
      i !== null && t.acceptRequest(i);
    };
  }
  /**
   * Attach an element to provide this registry. Use detach when disconnected.
   * @param {EventTarget} element the element of which to provide this icon-set.
   */
  attach(t) {
    t.addEventListener(
      Eo.ICON_REQUEST,
      this._onIconRequest
    );
  }
  /**
   * Detach an element from providing this registry.
   * @param {EventTarget} element the element of which to stop providing this icon-set.
   */
  detach(t) {
    t.removeEventListener(
      Eo.ICON_REQUEST,
      this._onIconRequest
    );
  }
  /**
   * Define a icon to be served by this registry.
   * @param {string} iconName the name to use for this icon.
   * @param {string} svgString the svg source for this icon.
   */
  defineIcon(t, i) {
    if (this.icons[t]) {
      this.icons[t].svg = i;
      return;
    }
    this.icons[t] = new el(i);
  }
  /**
   * Retrieve the SVG source of an icon, Returns ´null´ if the name does not exist.
   * @param {string} iconName the name of the icon to retrieve.
   */
  getIcon(t) {
    return this.icons[t] || this.acceptIcon(t) ? this.icons[t].promise : null;
  }
  /**
   * Declare that this registry will be providing a icon for this name
   * @param {string} iconName the name of the icon to be provided.
   */
  provideIcon(t) {
    return this.icons[t] = new el();
  }
  /**
   * extend this method to provide your own logic.
   * @param iconName
   * @returns
   */
  //@ts-ignore-start
  // eslint-disable-next-line
  acceptIcon(t) {
    return !1;
  }
  //@ts-ignore-end
  /**
     * Dynamic concept by extending this class:
     * extend getIcon in this way:
  
      protected acceptIcon(iconName: string): boolean {
  
        // Check if this is something we want to accept and provide.
        if(iconName === "myCustomIcon") {
  
          // Inform that we will be providing this.
          const icon = this.provideIcon(iconName);
  
          // When data is available set it on this icon object, this can be done at any point in time:
          icon.svg = "...";
  
          return true;
        }
  
        return false;
      }
    */
  getIconNames() {
    return Object.keys(this.icons);
  }
}
var Hp = Object.defineProperty, jp = Object.getOwnPropertyDescriptor, vu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? jp(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Hp(t, i, r), r;
};
let Po = class extends v {
  constructor() {
    super(), this._icons = {}, this._registry = new pu(), this._registry.attach(this);
  }
  get icons() {
    return this._icons;
  }
  set icons(e) {
    this._icons = e, this._registry && Object.entries(this._icons).forEach(
      ([t, i]) => this._registry.defineIcon(t, i)
    );
  }
  get registry() {
    return this._registry;
  }
  set registry(e) {
    this.registry && this.registry.detach(this), e.attach(this), this._registry = e;
  }
  render() {
    return l`<slot></slot>`;
  }
};
vu([
  a({ attribute: !1 })
], Po.prototype, "_icons", 2);
Po = vu([
  d("uui-icon-registry")
], Po);
const Rp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`, Fp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>`, Wp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>`, Gp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>`, qp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>`, Kp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>`, Xp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>`, Yp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 1-1h3l9-9" /><path d="M3 21v-3l9-9" /><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z" /></svg>`, Zp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" /><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" /><path d="M15 2v5h5" /></svg>`, Qp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>`, Jp = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>`, ev = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>`, tv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>`, iv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>`, rv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /><path d="M2 10h20" /></svg>`, ov = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>`, sv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>`, nv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>`, av = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>`, lv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></svg>`, uv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>`, cv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>`, hv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>`, dv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>`, pv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>`, vv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>`, fv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /></svg>`, bv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>`, gv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></svg>`, mv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>`, _v = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" /><path d="M17.8 11.8 19 13" /><path d="M15 9h0" /><path d="M17.8 6.2 19 5" /><path d="m3 21 9-9" /><path d="M12.2 6.2 11 5" /></svg>`, yv = b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>`;
class wv extends pu {
  constructor() {
    super(), this.defineIcon("add", Rp.strings[0]), this.defineIcon("alert", Fp.strings[0]), this.defineIcon("attachment", Wp.strings[0]), this.defineIcon("calendar", Gp.strings[0]), this.defineIcon("check", qp.strings[0]), this.defineIcon("clipboard", Kp.strings[0]), this.defineIcon("code", Xp.strings[0]), this.defineIcon("colorpicker", Yp.strings[0]), this.defineIcon("copy", Zp.strings[0]), this.defineIcon("delete", Qp.strings[0]), this.defineIcon("document", Jp.strings[0]), this.defineIcon("download", ev.strings[0]), this.defineIcon("edit", tv.strings[0]), this.defineIcon("favorite", iv.strings[0]), this.defineIcon("folder", rv.strings[0]), this.defineIcon("forbidden", ov.strings[0]), this.defineIcon("info", sv.strings[0]), this.defineIcon("link", nv.strings[0]), this.defineIcon("lock", av.strings[0]), this.defineIcon("pause", lv.strings[0]), this.defineIcon("picture", uv.strings[0]), this.defineIcon("play", cv.strings[0]), this.defineIcon("remove", hv.strings[0]), this.defineIcon("search", dv.strings[0]), this.defineIcon("see", pv.strings[0]), this.defineIcon("settings", vv.strings[0]), this.defineIcon("subtract", fv.strings[0]), this.defineIcon("sync", bv.strings[0]), this.defineIcon("unlock", gv.strings[0]), this.defineIcon("unsee", mv.strings[0]), this.defineIcon("wand", _v.strings[0]), this.defineIcon("wrong", yv.strings[0]);
  }
}
var xv = Object.getOwnPropertyDescriptor, $v = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? xv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let tl = class extends Po {
  constructor() {
    super(), this.registry = new wv();
  }
};
tl = $v([
  d("uui-icon-registry-essential")
], tl);
var kv = Object.defineProperty, Cv = Object.getOwnPropertyDescriptor, Ui = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Cv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && kv(t, i, r), r;
};
let pt = class extends Le(v) {
  constructor() {
    super(), this.accept = "", this.multiple = !1, this._files = [], this._updateFileWrappers = (e) => {
      let t = [];
      for (const i of e)
        this.multiple ? t.push(i) : t = [i];
      this._files = t;
    }, this.addEventListener("dragenter", () => this._setShowDropzone(!0)), this.addEventListener("dragleave", () => this._setShowDropzone(!1)), this.addEventListener("drop", () => this._setShowDropzone(!1));
  }
  get value() {
    return super.value;
  }
  set value(e) {
    if (super.value = e, e instanceof FormData) {
      const t = this.multiple ? e.getAll(this.name) : [e.get(this.name)];
      this._updateFileWrappers(t);
      return;
    }
    if (e instanceof File) {
      this._updateFileWrappers([e]);
      return;
    }
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-icon"), y(this, "uui-file-dropzone"), y(this, "uui-button"), y(this, "uui-action-bar"), y(this, "uui-file-preview");
  }
  getFormElement() {
    return this._dropZone;
  }
  /**
   * Removes focus from the input.
   */
  async blur() {
    await this.updateComplete, this._dropzone.blur();
  }
  /**
   * This method enables <label for="..."> to focus the input
   */
  async focus() {
    await this.updateComplete, this._dropzone.focus();
  }
  async click() {
    await this.updateComplete, this._dropzone.browse();
  }
  _handleClick(e) {
    e.stopImmediatePropagation(), this._dropzone.browse();
  }
  async _handleFilesChange(e) {
    const i = e.detail.files.filter(
      (r) => r instanceof File || r.isFile
    );
    if (!this.multiple) {
      const r = i[0], n = r instanceof File ? r : await this._getFile(r);
      if (this.value instanceof File) {
        this.value = n;
        return;
      }
      if (this.value instanceof FormData) {
        this.value.delete(this.name), this.value.append(this.name, n), this._updateFileWrappers([n]);
        return;
      }
    }
    let o = this.value;
    if (i.length > 0 && !(this.value instanceof FormData) && (o = new FormData()), o instanceof FormData)
      for (const r of i) {
        const s = r instanceof File;
        o.append(this.name, s ? r : await this._getFile(r));
      }
    this.value = o;
  }
  async _getFile(e) {
    return await new Promise(
      (t, i) => e.file(t, i)
    );
  }
  _removeFile(e) {
    const t = this._files[e];
    if (this.value instanceof FormData) {
      const o = this.value.getAll(this.name).filter((r) => r !== t);
      if (o.length === 0)
        this.value = "";
      else {
        this.value.delete(this.name);
        for (const r of o)
          this.value.append(this.name, r);
      }
      this._updateFileWrappers(o);
    }
    this.value instanceof File && (this.value = "", this._updateFileWrappers([]));
  }
  _setShowDropzone(e) {
    e ? this._dropZone.style.display = "flex" : this._dropZone.style.display = "none";
  }
  _renderFileItem(e, t) {
    return l`<uui-file-preview .file="${e}">
      <uui-action-bar slot="actions">
        <uui-button
          @click=${() => this._removeFile(t)}
          color="danger"
          label=${`Delete ${e.name}`}>
          <uui-icon name="delete" .fallback=${Bh.strings[0]}></uui-icon>
        </uui-button>
      </uui-action-bar>
    </uui-file-preview>`;
  }
  _renderFiles() {
    return l`${Vn(
      this._files,
      (e) => e.name + e.size,
      (e, t) => this._renderFileItem(e, t)
    )}`;
  }
  render() {
    return l`
      <uui-file-dropzone
        id="dropzone"
        ?multiple=${this.multiple}
        .accept=${this.accept}
        @change=${this._handleFilesChange}
        label="Drop files here"></uui-file-dropzone>
      <div id="files">
        ${this._renderFiles()}
        ${this._files.length === 0 || this.multiple ? l`<uui-button
              @click=${this._handleClick}
              id="add-button"
              look="placeholder"
              label="Add"></uui-button>` : k}
      </div>
    `;
  }
};
pt.styles = [
  p`
      :host {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        box-sizing: border-box;
        border: 1px solid var(--uui-color-border,#d8d7d9);
      }

      #input {
        position: absolute;
        width: 0px;
        height: 0px;
        opacity: 0;
        display: none;
      }

      #files {
        display: grid;
        box-sizing: border-box;
        justify-items: center;
        width: 100%;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-auto-rows: min-content;
        gap: 16px;
        padding: 16px;
        overflow: auto;
        max-height: 100%;
      }

      #dropzone {
        display: none;
        position: absolute;
        inset: 0px;
        z-index: 10;
        justify-content: center;
        align-items: center;
      }

      #add-button {
        width: 150px;
        height: 150px;
        display: flex;
        padding: 16px;
        box-sizing: border-box;
        justify-content: center;
        align-items: stretch;
      }
    `
];
Ui([
  P("#dropzone")
], pt.prototype, "_dropzone", 2);
Ui([
  P("#dropzone")
], pt.prototype, "_dropZone", 2);
Ui([
  a({ type: String })
], pt.prototype, "accept", 2);
Ui([
  a({ type: Boolean })
], pt.prototype, "multiple", 2);
Ui([
  g()
], pt.prototype, "_files", 2);
pt = Ui([
  d("uui-input-file")
], pt);
class Nr extends S {
  static {
    this.CHANGE = "change";
  }
  static {
    this.INPUT = "input";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var Ev = Object.defineProperty, Pv = Object.getOwnPropertyDescriptor, fu = (e) => {
  throw TypeError(e);
}, K = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Pv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ev(t, i, r), r;
}, Sv = (e, t, i) => t.has(e) || fu("Cannot " + i), Ov = (e, t, i) => t.has(e) ? fu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Iv = (e, t, i) => (Sv(e, t, "access private method"), i), Fs, bu;
let z = class extends Le(
  De("", v),
  ""
) {
  constructor() {
    super(), Ov(this, Fs), this.minlengthMessage = (e) => `${e} characters left`, this.maxlengthMessage = (e, t) => `Maximum length exceeded (${t}/${e} characters)`, this.disabled = !1, this.readonly = !1, this.placeholder = "", this.autoWidth = !1, this.inputMode = "text", this.tabIndex = 0, this._type = "text", this.addEventListener("mousedown", () => {
      this.style.setProperty("--uui-show-focus-outline", "0");
    }), this.addEventListener("blur", () => {
      this.style.setProperty("--uui-show-focus-outline", "");
    }), this.addEventListener("keydown", Iv(this, Fs, bu)), this.addValidator(
      "tooShort",
      () => {
        const e = this.minlengthMessage;
        return typeof e == "function" ? e(
          this.minlength ? this.minlength - String(this.value).length : 0
        ) : e;
      },
      () => !!this.minlength && String(this.value).length < this.minlength
    ), this.addValidator(
      "tooLong",
      () => {
        const e = this.maxlengthMessage;
        return typeof e == "function" ? e(this.maxlength ?? 0, String(this.value).length) : e;
      },
      () => !!this.maxlength && String(this.value).length > this.maxlength
    ), this.updateComplete.then(() => {
      this.addFormControlElement(this._input);
    });
  }
  get type() {
    return this._type;
  }
  set type(e) {
    this._type = e;
  }
  /**
   * Removes focus from the input.
   */
  async blur() {
    await this.updateComplete, this._input.blur();
  }
  /**
   * This method enables <label for="..."> to focus the input
   */
  async focus() {
    await this.updateComplete, this._input.focus();
  }
  /**
   * Selects all the text in the input.
   */
  async select() {
    await this.updateComplete, this._input.select();
  }
  getFormElement() {
    return this.shadowRoot?.querySelector("input");
  }
  onInput(e) {
    e.stopPropagation(), this.value = e.target.value, this.dispatchEvent(new Nr(Nr.INPUT));
  }
  onChange(e) {
    e.stopPropagation(), this.pristine = !1, this.dispatchEvent(new Nr(Nr.CHANGE));
  }
  renderPrepend() {
    return l`<slot name="prepend"></slot>`;
  }
  renderAppend() {
    return l`<slot name="append"></slot>`;
  }
  render() {
    return l`
      ${this.renderPrepend()}
      ${this.autoWidth ? this.renderInputWithAutoWidth() : this.renderInput()}
      ${this.renderAppend()}
    `;
  }
  renderInputWithAutoWidth() {
    return l`<div id="control">
      ${this.renderInput()}${this.renderAutoWidthBackground()}
    </div>`;
  }
  renderInput() {
    return l`<input
      id="input"
      .type=${this.type}
      .value=${this.value}
      .name=${this.name}
      pattern=${_(this.pattern)}
      min=${_(this.min)}
      max=${_(this.max)}
      step=${_(this.step)}
      spellcheck=${this.spellcheck}
      autocomplete=${_(this.autocomplete)}
      placeholder=${_(this.placeholder)}
      aria-label=${_(this.label)}
      inputmode=${_(this.inputMode)}
      ?disabled=${this.disabled}
      ?autofocus=${this.autofocus}
      ?required=${this.required}
      ?readonly=${this.readonly}
      tabindex=${_(this.tabIndex)}
      @input=${this.onInput}
      @change=${this.onChange} />`;
  }
  renderAutoWidthBackground() {
    return l` <div id="auto" aria-hidden="true">${this.renderText()}</div>`;
  }
  renderText() {
    return l`${this.value.length > 0 ? this.value : this.placeholder}`;
  }
};
Fs = /* @__PURE__ */ new WeakSet();
bu = function(e) {
  this.type !== "color" && e.key == "Enter" && this.submit();
};
z.formAssociated = !0;
z.styles = [
  p`
      :host {
        position: relative;
        display: inline-flex;
        align-items: stretch;
        height: var(--uui-input-height, var(--uui-size-11,33px));
        text-align: left;
        color: var(--uui-color-text,#060606);
        color-scheme: var(--uui-color-scheme, normal);
        box-sizing: border-box;
        background-color: var(
          --uui-input-background-color,
          var(--uui-color-surface,#fff)
        );
        border: var(--uui-input-border-width, 1px) solid
          var(--uui-input-border-color, var(--uui-color-border,#d8d7d9));
        border-radius: var(--uui-border-radius,3px);

        --uui-button-height: 100%;
        --auto-width-text-margin-right: 0;
        --auto-width-text-margin-left: 0;
      }

      #control {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        flex-grow: 1;
      }

      #auto {
        border: 0 1px solid transparent;
        visibility: hidden;
        white-space: pre;
        z-index: -1;
        height: 0px;
        padding: 0 var(--uui-size-space-3,9px);
        margin: 0 var(--auto-width-text-margin-right) 0
          var(--auto-width-text-margin-left);
      }

      :host([auto-width]) #input {
        width: 10px;
        min-width: 100%;
      }

      :host(:hover) {
        border-color: var(
          --uui-input-border-color-hover,
          var(--uui-color-border-standalone,#c2c2c2)
        );
      }
      /* TODO: Fix so we dont get double outline when there is focus on things in the slot. */
      :host(:focus-within) {
        border-color: var(
          --uui-input-border-color-focus,
          var(--uui-color-border-emphasis,#a1a1a1)
        );
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus,#3879ff);
      }
      :host(:focus) {
        border-color: var(
          --uui-input-border-color-focus,
          var(--uui-color-border-emphasis,#a1a1a1)
        );
      }
      :host([disabled]) {
        background-color: var(
          --uui-input-background-color-disabled,
          var(--uui-color-disabled,#f3f3f5)
        );
        border-color: var(
          --uui-input-border-color-disabled,
          var(--uui-color-disabled,#f3f3f5)
        );

        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }
      :host([disabled]) input {
        -webkit-text-fill-color: var(
          --uui-color-disabled-contrast,#c4c4c4
        ); /* required on Safari and IOS */
      }
      :host([readonly]) {
        background-color: var(
          --uui-input-background-color-readonly,
          var(--uui-color-disabled,#f3f3f5)
        );
        border-color: var(
          --uui-input-border-color-readonly,
          var(--uui-color-disabled-standalone,rgb(
    226,
    226,
    226
  ))
        );
      }

      :host(:not([pristine]):invalid),
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) {
        border-color: var(--uui-color-invalid,#d42054);
      }

      input {
        font-family: inherit;
        padding: 1px var(--uui-size-space-3,9px);
        font-size: inherit;
        color: inherit;
        border-radius: var(--uui-border-radius,3px);
        box-sizing: border-box;
        border: none;
        background: none;
        width: 100%;
        height: inherit;
        text-align: inherit;
        outline: none;
      }

      input[type='password']::-ms-reveal {
        display: none;
      }

      /* TODO: make sure color looks good, or remove it as an option as we want to provide color-picker component */
      input[type='color'] {
        width: 30px;
        padding: 0;
        border: none;
      }

      slot[name='prepend'],
      slot[name='append'] {
        display: flex;
        align-items: center;
        line-height: 1;
        height: 100%;
      }

      ::slotted(uui-input),
      ::slotted(uui-input-lock) {
        height: 100%;
        --uui-input-border-width: 0;
      }
    `
];
K([
  a()
], z.prototype, "min", 2);
K([
  a({ type: Number })
], z.prototype, "minlength", 2);
K([
  a({ attribute: "minlength-message" })
], z.prototype, "minlengthMessage", 2);
K([
  a()
], z.prototype, "max", 2);
K([
  a({ type: Number })
], z.prototype, "maxlength", 2);
K([
  a({ attribute: "maxlength-message" })
], z.prototype, "maxlengthMessage", 2);
K([
  a({ type: Number })
], z.prototype, "step", 2);
K([
  a({ type: Boolean, reflect: !0 })
], z.prototype, "disabled", 2);
K([
  a({ type: Boolean, reflect: !0 })
], z.prototype, "readonly", 2);
K([
  a()
], z.prototype, "placeholder", 2);
K([
  a()
], z.prototype, "autocomplete", 2);
K([
  a({ type: Boolean, reflect: !0, attribute: "auto-width" })
], z.prototype, "autoWidth", 2);
K([
  a({ type: String })
], z.prototype, "type", 1);
K([
  a({ attribute: "inputmode" })
], z.prototype, "inputMode", 2);
K([
  a({ type: String })
], z.prototype, "pattern", 2);
K([
  a({ type: Number, reflect: !1, attribute: "tabindex" })
], z.prototype, "tabIndex", 2);
K([
  P("#input")
], z.prototype, "_input", 2);
z = K([
  d("uui-input")
], z);
class il extends S {
  static {
    this.LOCK_CHANGE = "lock-change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var Av = Object.defineProperty, Uv = Object.getOwnPropertyDescriptor, gu = (e) => {
  throw TypeError(e);
}, rs = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Uv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Av(t, i, r), r;
}, mu = (e, t, i) => t.has(e) || gu("Cannot " + i), zv = (e, t, i) => (mu(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Mv = (e, t, i) => t.has(e) ? gu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Dv = (e, t, i, o) => (mu(e, t, "write to private field"), t.set(e, i), i), io;
let bi = class extends z {
  constructor() {
    super(), Mv(this, io, !0), this.unlockLabel = "Unlock input", this.lockLabel = "Lock input", this.readonly = !0, this.tabIndex = -1;
  }
  set locked(e) {
    Dv(this, io, e), this.tabIndex = e ? -1 : 0;
  }
  get locked() {
    return zv(this, io);
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-icon"), y(this, "uui-button");
  }
  _onLockToggle() {
    this.readonly = this.locked = !this.locked, this.pristine = !1, this.dispatchEvent(new il(il.LOCK_CHANGE)), this.locked || this._input?.focus();
  }
  renderIcon() {
    return this.locked === !0 ? l`<uui-icon name="lock" .fallback=${Hh.strings[0]}></uui-icon>` : l`<uui-icon
          name="unlock"
          .fallback=${Wh.strings[0]}></uui-icon>`;
  }
  renderPrepend() {
    return l`<uui-button
      .disabled=${this.disabled}
      @click=${this._onLockToggle}
      compact
      id="lock"
      label="${this.locked ? this.unlockLabel : this.lockLabel}">
      ${this.renderIcon()}
    </uui-button>`;
  }
};
io = /* @__PURE__ */ new WeakMap();
bi.styles = [
  ...z.styles,
  p`
      #lock {
        height: 100%;

        --uui-button-padding-left-factor: 0.75;
        --uui-button-padding-right-factor: 0.75;
        font-size: 12px;
      }

      :host([locked]) #input {
        cursor: not-allowed;
        opacity: 0.55;
      }
    `
];
rs([
  a({ type: Boolean, reflect: !0 })
], bi.prototype, "locked", 1);
rs([
  a({ type: String, reflect: !1, attribute: "unlock-label" })
], bi.prototype, "unlockLabel", 2);
rs([
  a({ type: String, reflect: !1, attribute: "lock-label" })
], bi.prototype, "lockLabel", 2);
bi = rs([
  d("uui-input-lock")
], bi);
var Lv = Object.defineProperty, Tv = Object.getOwnPropertyDescriptor, Bn = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Tv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Lv(t, i, r), r;
};
let ur = class extends z {
  constructor() {
    super(...arguments), this.passwordType = "password";
  }
  get type() {
    return this.passwordType;
  }
  set type(e) {
    this.passwordType = e;
  }
  _onPasswordToggle() {
    this.passwordType === "password" ? this.passwordType = "text" : this.passwordType = "password";
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-icon"), y(this, "uui-button"), this.hasAttribute("spellcheck") || (this.spellcheck = !1);
  }
  renderIcon() {
    return this.passwordType === "password" ? l`<uui-icon name="see" .fallback=${Rh.strings[0]}></uui-icon>` : l`<uui-icon
          name="unsee"
          .fallback=${Gh.strings[0]}></uui-icon>`;
  }
  renderAppend() {
    return l`<uui-button
      .disabled=${this.disabled}
      @click=${this._onPasswordToggle}
      compact
      label="${this.passwordType === "password" ? "Show password" : "Hide password"}"
      id="eye">
      ${this.renderIcon()}
    </uui-button>`;
  }
};
ur.styles = [
  ...z.styles,
  p`
      #eye {
        height: 100%;
        margin-left: -6px;
      }

      #clear:hover {
        color: black;
      }
    `
];
Bn([
  g()
], ur.prototype, "passwordType", 2);
Bn([
  a()
], ur.prototype, "type", 1);
ur = Bn([
  d("uui-input-password")
], ur);
var Nv = Object.getOwnPropertyDescriptor, Vv = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Nv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let Ws = class extends v {
  render() {
    return l`<slot></slot>`;
  }
};
Ws.styles = [
  p`
      :host {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-size-4,12px);
        color: var(--uui-color-text,#060606);
      }

      ::slotted(*:first-child)uui-key {
        margin-left: 0px;
      }

      ::slotted(*:last-child)uui-key {
        margin-right: 0px;
      }
    `
];
Ws = Vv([
  d("uui-keyboard-shortcut")
], Ws);
var Bv = Object.getOwnPropertyDescriptor, Hv = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Bv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let Gs = class extends v {
  render() {
    return l`<slot></slot>`;
  }
};
Gs.styles = [
  p`
      :host {
        background: var(--uui-color-surface,#fff);
        border: 1px solid var(--uui-color-border,#d8d7d9);
        font-family: inherit;
        font-size: var(--uui-type-small-size,12px);
        color: var(--uui-color-text,#060606);
        border-radius: 5px;
        margin: 0px 5px;
        padding: 5px 7px;
        box-sizing: border-box;
        user-select: none;
        text-transform: lowercase;
      }
    `
];
Gs = Hv([
  d("uui-key")
], Gs);
var jv = Object.defineProperty, Rv = Object.getOwnPropertyDescriptor, os = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Rv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && jv(t, i, r), r;
};
let gi = class extends v {
  constructor() {
    super(), this.disabled = !1, this.for = null, this.required = !1, this.addEventListener("click", this._onClick);
  }
  _onClick() {
    if (this.disabled) return;
    const e = this.getForElement();
    e && (e.focus(), e.click());
  }
  getForElement() {
    return typeof this.for == "string" ? this.getRootNode()?.getElementById(this.for) || null : this.for || null;
  }
  render() {
    return l`
      <slot></slot>
      ${this.required ? l`<div id="required">*</div>` : ""}
    `;
  }
};
gi.styles = [
  p`
      :host {
        font-weight: 700;
      }
      :host([for]) {
        cursor: pointer;
      }
      :host([disabled]) {
        cursor: default;
      }
      #required {
        display: inline;
        color: var(--uui-color-danger,#d42054);
        font-weight: 900;
      }
    `
];
os([
  a({ type: Boolean, reflect: !0 })
], gi.prototype, "disabled", 2);
os([
  a({ reflect: !0, attribute: !0 })
], gi.prototype, "for", 2);
os([
  a({ type: Boolean, reflect: !0 })
], gi.prototype, "required", 2);
gi = os([
  d("uui-label")
], gi);
var Fv = Object.defineProperty, Wv = Object.getOwnPropertyDescriptor, Hn = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Wv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Fv(t, i, r), r;
};
let cr = class extends v {
  constructor() {
    super(...arguments), this._progress = 0, this._animationDuration = 1;
  }
  get progress() {
    return this._progress;
  }
  set progress(e) {
    const t = this._progress;
    this._progress = A(e, 0, 100), this.requestUpdate("progress", t);
  }
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(e) {
    const t = this._animationDuration;
    this._animationDuration = e >= 0 ? e : 1, this.requestUpdate("animationDuration", t);
  }
  render() {
    return l`
      ${this.progress ? l`<div
            id="bar"
            style="max-width: ${this.progress.toString()}%;"></div>` : ""}
      <div
        id="bar-anim"
        class=${this.progress ? "" : "animate"}
        style="animation-duration: ${this.animationDuration}s"></div>
      <div id="bar-background"></div>
    `;
  }
};
cr.styles = [
  p`
      :host {
        position: relative;
        display: block;
        width: 100%;
        height: 4px;
        overflow: hidden;
        color: var(--uui-color-default,#1b264f);
      }

      #bar,
      #bar-anim,
      #bar-background {
        position: absolute;
        inset: 0; /* top, left, bottom and right = 0*/
        height: 100%;
      }

      #bar-background,
      #bar {
        background: currentColor;
      }

      #bar {
        transition: max-width 120ms ease;
      }

      #bar-background {
        opacity: 0.3;
      }

      #bar-anim {
        transform: scaleX(0.4);
        animation: bar-loading 1s infinite linear;
        background: linear-gradient(
          -90deg,
          white 0%,
          white 25%,
          transparent 100%
        );
      }

      #bar-anim.animate {
        background: linear-gradient(
          -90deg,
          currentColor 0%,
          currentColor 25%,
          transparent 100%
        );
      }

      @keyframes bar-loading {
        0% {
          transform-origin: -175% 0%;
        }
        100% {
          transform-origin: 175% 0%;
        }
      }
    `
];
Hn([
  a({ type: Number })
], cr.prototype, "progress", 1);
Hn([
  a({ type: Number })
], cr.prototype, "animationDuration", 1);
cr = Hn([
  d("uui-loader-bar")
], cr);
var Gv = Object.defineProperty, qv = Object.getOwnPropertyDescriptor, jn = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? qv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Gv(t, i, r), r;
};
let hr = class extends v {
  constructor() {
    super(...arguments), this.progress = 0, this.showProgress = !1, this._resizeObserver = new ResizeObserver(() => this.onResize()), this._isLarge = !1;
  }
  _circleStyle() {
    return this.progress ? { strokeDasharray: `${this.progress} 100` } : { strokeDasharray: "100 100" };
  }
  firstUpdated() {
    this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._resizeObserver.disconnect();
  }
  onResize() {
    const e = this.clientHeight >= 30;
    this._isLarge != e && (this._isLarge = e, this.requestUpdate());
  }
  renderProgress() {
    return this._isLarge && this.progress && this.showProgress ? l`<span id="progress-display">${this.progress}</span>` : "";
  }
  render() {
    return l`
      <svg
        id="spinner"
        class=${this.progress ? "" : "animate"}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg">
        <circle id="bg" cx="50%" cy="50%" r="16" />
        <g>
          <circle
            id="circle"
            cx="50%"
            cy="50%"
            r="16"
            style=${Ze(this._circleStyle())} />
        </g>
      </svg>
      ${this.renderProgress()}
    `;
  }
};
hr.styles = [
  p`
      :host {
        vertical-align: middle;
        line-height: 0;
        overflow: hidden;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 1em;
        height: 1em;
        color: var(--uui-color-default,#1b264f);
      }

      #spinner {
        width: 100%;
        height: 100%;
      }
      #spinner g {
        transform-origin: 50% 50%;
        animation: 18s linear infinite spinner-animation;
      }
      #spinner.animate g {
        animation: 800ms linear infinite spinner-animation;
      }

      @keyframes spinner-animation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      #spinner.animate #circle {
        animation: 1400ms ease-in infinite circle-animation;
        /** ease-in */
      }

      @keyframes circle-animation {
        0% {
          stroke-dashoffset: -55;
        }
        38% {
          stroke-dashoffset: -88;
        }
        100% {
          stroke-dashoffset: -55;
        }
      }

      svg circle {
        fill: transparent;
        stroke: currentColor;
        stroke-width: 6px;
      }

      #bg {
        opacity: 0.5;
      }

      #circle {
        stroke-linecap: round;
        stroke-dasharray: 0 0;

        transform-origin: 50% 50%;
        transform: rotate(-90deg);
        transition: stroke-dasharray 120ms ease;
      }

      #progress-display {
        position: absolute;
        left: 0;
        top: 50%;
        right: 0;
        stroke: currentColor;
        transform: translateY(-50%);
        font-size: 0.3em;
        font-weight: 700;
        text-align: center;

        /* Center the text */
        padding-top: 0.09em;
      }
    `
];
jn([
  a({ type: Number })
], hr.prototype, "progress", 2);
jn([
  a({ type: Boolean, reflect: !0, attribute: "show-progress" })
], hr.prototype, "showProgress", 2);
hr = jn([
  d("uui-loader-circle")
], hr);
var Kv = Object.getOwnPropertyDescriptor, Xv = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Kv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let qs = class extends v {
  render() {
    return l`
      <div></div>
      <div></div>
      <div></div>
    `;
  }
};
qs.styles = [
  p`
      :host {
        color: var(--uui-color-default,#1b264f);
      }

      div {
        display: inline-block;
        width: var(--uui-size-2,6px);
        height: var(--uui-size-2,6px);
        border: 2px solid currentColor;
        border-radius: 100%;
        animation: loaderAnimation 1.4s infinite;
      }

      div:nth-child(1n) {
        animation-delay: 0s;
      }

      div:nth-child(2n) {
        animation-delay: 0.15s;
      }

      div:nth-child(3n) {
        animation-delay: 0.3s;
      }

      @keyframes loaderAnimation {
        0% {
          transform: scale(0.5);
          background-color: currentColor;
        }
        50% {
          transform: scale(1);
          background-color: transparent;
        }
        100% {
          transform: scale(0.5);
          background-color: currentColor;
        }
      }
    `
];
qs = Xv([
  d("uui-loader")
], qs);
class er extends S {
  static {
    this.SHOW_CHILDREN = "show-children";
  }
  static {
    this.HIDE_CHILDREN = "hide-children";
  }
  static {
    this.CLICK_LABEL = "click-label";
  }
}
var Yv = Object.defineProperty, Zv = Object.getOwnPropertyDescriptor, _u = (e) => {
  throw TypeError(e);
}, xe = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Zv(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Yv(t, i, r), r;
}, Qv = (e, t, i) => t.has(e) || _u("Cannot " + i), Jv = (e, t, i) => t.has(e) ? _u("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), rl = (e, t, i) => (Qv(e, t, "access private method"), i), ro, Ks;
let le = class extends Xo(
  ki(yr(De("label", v)))
) {
  constructor() {
    super(...arguments), Jv(this, ro), this.disabled = !1, this.showChildren = !1, this.hasChildren = !1, this.loading = !1, this.caretLabel = "Reveal the underlying items", this.iconSlotHasContent = !1, this._labelButtonChanged = (e) => {
      this.selectableTarget = e || this;
    }, this._iconSlotChanged = (e) => {
      this.iconSlotHasContent = e.target.assignedNodes({ flatten: !0 }).length > 0;
    }, this._onCaretClicked = () => {
      const e = this.showChildren ? er.HIDE_CHILDREN : er.SHOW_CHILDREN, t = new er(e, { cancelable: !0 });
      this.dispatchEvent(t), !t.defaultPrevented && (this.showChildren = !this.showChildren);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "menu"), y(this, "uui-symbol-expand"), y(this, "uui-loader-bar");
  }
  async focus() {
    await this.updateComplete, this.shadowRoot?.querySelector("#label-button")?.focus?.();
  }
  _renderLabelInside() {
    return l` <slot
        name="icon"
        id="icon"
        style=${this.iconSlotHasContent ? "" : "display: none;"}
        @slotchange=${this._iconSlotChanged}></slot>
      ${this.renderLabel()}
      <slot name="badge" id="badge"> </slot>`;
  }
  _renderLabelAsAnchor() {
    return this.disabled ? l` <span id="label-button" ${Gr(this._labelButtonChanged)}>
        ${this._renderLabelInside()}
      </span>` : l` <a
      id="label-button"
      ${Gr(this._labelButtonChanged)}
      href=${_(this.href)}
      target=${_(this.target || void 0)}
      rel=${_(
      this.rel || _(
        this.target === "_blank" ? "noopener noreferrer" : void 0
      )
    )}
      @click=${rl(this, ro, Ks)}
      ?disabled=${this.disabled}
      aria-label="${this.label}">
      ${this._renderLabelInside()}
    </a>`;
  }
  _renderLabelAsButton() {
    return l` <button
      id="label-button"
      ${Gr(this._labelButtonChanged)}
      @click=${rl(this, ro, Ks)}
      ?disabled=${this.disabled}
      aria-label="${this.label}">
      ${this._renderLabelInside()}
    </button>`;
  }
  render() {
    return l`
      <div id="menu-item" aria-label="menuitem" role="menuitem">
        ${this.hasChildren ? l`<button
              id="caret-button"
              aria-label=${this.caretLabel}
              @click=${this._onCaretClicked}>
              <uui-symbol-expand
                aria-hidden="true"
                ?open=${this.showChildren}></uui-symbol-expand>
            </button>` : ""}
        ${this.href && this.selectOnly !== !0 && this.selectable !== !0 ? this._renderLabelAsAnchor() : this._renderLabelAsButton()}

        <div id="label-button-background"></div>
        <slot id="actions-container" name="actions"></slot>
        ${this.loading ? l`<uui-loader-bar id="loader"></uui-loader-bar>` : ""}
      </div>
      ${this.showChildren ? l`<slot></slot>` : ""}
    `;
  }
};
ro = /* @__PURE__ */ new WeakSet();
Ks = function() {
  if (this.selectOnly) return;
  const e = new er(er.CLICK_LABEL);
  this.dispatchEvent(e);
};
le.styles = [
  p`
      :host {
        box-sizing: border-box;
        display: block;
        --uui-menu-item-child-indent: calc(var(--uui-menu-item-indent, 0) + 1);
        user-select: none;
        --flat-structure-reversed: calc(
          1 - var(--uui-menu-item-flat-structure, 0)
        );
      }

      #menu-item {
        position: relative;
        padding-left: calc(var(--uui-menu-item-indent, 0) * var(--uui-size-4,12px));
        display: grid;
        grid-template-columns:
          calc(var(--flat-structure-reversed) * var(--uui-size-8,24px))
          1fr;
        grid-template-rows: 1fr;
        white-space: nowrap;
      }

      /** Not active, not selected, not disabled: */
      :host(:not([active], [selected], [disabled], [select-mode='highlight']))
        #menu-item
        #label-button:hover
        ~ #label-button-background,
      :host(:not([active], [selected], [disabled]))
        #menu-item
        #caret-button:hover {
        background-color: var(
          --uui-menu-item-background-color-hover,
          var(--uui-color-surface-emphasis,rgb(
    250,
    250,
    250
  ))
        );
      }
      :host(:not([active], [selected], [disabled]))
        #menu-item
        #label-button:hover,
      :host(:not([active], [selected])) #menu-item #caret-button:hover {
        color: var(
          --uui-menu-item-color-hover,
          var(--uui-color-interactive-emphasis,#3544b1)
        );
      }

      /** Active */
      :host([active]) #label-button,
      :host([active]) #caret-button {
        color: var(
          --uui-menu-item-color-active,
          var(--uui-color-current-contrast,#1b264f)
        );
      }
      :host([active]) #label-button-background {
        background-color: var(
          --uui-menu-item-background-color-active,
          var(--uui-color-current,#f5c1bc)
        );
      }
      :host([active]) #label-button:hover ~ #label-button-background,
      :host([active]) #caret-button:hover {
        background-color: var(
          --uui-menu-item-background-color-active-hover,
          var(--uui-color-current-emphasis,rgb(
    248,
    214,
    211
  ))
        );
      }

      /** Disabled */
      :host([disabled]) #menu-item {
        background-color: var(
          --uui-menu-item-background-color-disabled,
          var(--uui-color-disabled,#f3f3f5)
        );
      }

      /** Selected */
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #label-button,
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #caret-button {
        color: var(
          --uui-menu-item-color-selected,
          var(--uui-color-selected-contrast,#fff)
        );
      }
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #label-button-background {
        background-color: var(
          --uui-menu-item-background-color-selected,
          var(--uui-color-selected,#3544b1)
        );
      }
      /** Selected, not highlight mode */
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #label-button:hover
        ~ #label-button-background,
      :host([selected]:not([select-mode='highlight'], [disabled]))
        #caret-button:hover {
        background-color: var(
          --uui-menu-item-background-color-selected-hover,
          var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ))
        );
      }

      /** highlight mode, default */
      :host([select-mode='highlight']:not([disabled], [active], [selectable]))
        #menu-item
        #label-button:hover
        ~ #label-button-background {
        border-radius: var(--uui-border-radius,3px);
        background-color: var(
          --uui-menu-item-background-color-highlight,
          var(--uui-color-surface-emphasis,rgb(
    250,
    250,
    250
  ))
        );
      }

      /** highlight mode, active */
      :host([select-mode='highlight'][active]:not([disabled]))
        #menu-item
        #label-button-background {
        border-radius: var(--uui-border-radius,3px);
      }

      /** highlight mode, active & selected */
      :host([select-mode='highlight'][active][selected]:not([disabled]))
        #menu-item
        #label-button:hover
        ~ #label-button-background {
        border-radius: var(--uui-border-radius,3px);
        background-color: var(
          --uui-menu-item-background-color-highlight-active-selected,
          var(--uui-color-current-emphasis,rgb(
    248,
    214,
    211
  ))
        );
      }

      /** highlight mode, selected */
      :host([select-mode='highlight'][selected]:not([disabled]))
        #menu-item
        #label-button,
      :host([select-mode='highlight'][selected]:not([disabled]))
        #menu-item
        #caret-button {
        color: var(
          --uui-menu-item-color-highlight-selected,
          var(--uui-color-interactive,#1b264f)
        );
      }
      :host([select-mode='highlight'][selectable][selected]:not([disabled]))
        #menu-item
        #label-button:hover {
        color: var(
          --uui-menu-item-background-color-highlight-selectable-selected,
          var(--uui-color-interactive-emphasis,#3544b1)
        );
      }

      /** highlight mode, selected, selectable caret hover */
      :host([selected][selectable][select-mode='highlight']:not([active]))
        #menu-item
        #caret-button:hover {
        border-radius: var(--uui-border-radius,3px);
        background-color: var(
          --uui-menu-item-background-color-highlight-selectable-selected,
          var(--uui-color-surface-emphasis,rgb(
    250,
    250,
    250
  ))
        );
        color: var(
          --uui-menu-item-color-highlight-selectable-selected,
          var(--uui-color-interactive-emphasis,#3544b1)
        );
      }

      /** Highlight borders */

      :host([select-mode='highlight']:not([disabled]))
        #menu-item
        #label-button-background::after {
        border-radius: var(--uui-border-radius,3px);
        position: absolute;
        content: '';
        inset: 1px;
        border: 2px solid
          var(--uui-menu-item-border-color-highlight, var(--uui-color-selected,#3544b1));
        opacity: 0;
      }

      :host([select-mode='highlight'][selectable][selected]:not([disabled]))
        #menu-item
        #caret-button:hover::after {
        border-top-left-radius: var(--uui-border-radius,3px);
        border-bottom-left-radius: var(--uui-border-radius,3px);
        position: absolute;
        content: '';
        inset: 1px 0 1px 1px;
        border: 2px solid
          var(--uui-menu-item-border-color-highlight, var(--uui-color-selected,#3544b1));
        border-right: none;
      }

      :host([select-mode='highlight'][selected]:not([disabled]))
        #menu-item
        #label-button-background::after {
        opacity: 1;
      }

      :host([select-mode='highlight'][selectable]:not([disabled]))
        #menu-item
        #label-button:hover
        ~ #label-button-background::after {
        opacity: 0.33;
      }
      :host([select-mode='highlight'][selected]:not([disabled]))
        #menu-item
        #label-button:hover
        ~ #label-button-background::after {
        opacity: 0.66;
      }

      /** Buttons */

      :host([disabled]) #label-button {
        cursor: default;
        opacity: 0.5;
      }

      button {
        display: inline-flex;
        align-items: center;

        font-family: inherit;
        font-size: inherit;

        padding: 0;
        text-align: left;
        border: none;
        color: inherit;
        background-color: transparent;
        cursor: pointer;
        min-height: var(--uui-size-12,36px);
        z-index: 1;
      }

      #label-button {
        position: relative;
        flex-grow: 1;
        grid-column-start: 2;
        white-space: nowrap;
        overflow: hidden;
        padding-right: var(--uui-size-space-3,9px);
        padding-left: calc(
          var(--uui-menu-item-flat-structure) * var(--uui-size-space-3,9px)
        );
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: currentColor;
        min-height: var(--uui-size-12,36px);
        z-index: 1;
        font-weight: inherit;
      }

      #label-button .label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span#label-button {
        pointer-events: none; /* avoid hovering state on this. */
      }

      #caret-button {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: end;
        padding-inline-end: 3px;
        color: var(--uui-color-interactive,#1b264f);
      }

      #label-button-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: var(--uui-menu-item-border-radius, 0px);
      }

      #actions-container {
        opacity: 0;
        width: 0;
        grid-column-start: 3;
        overflow: hidden;
      }
      :host(:not([disabled])) #menu-item:hover #actions-container,
      :host(:not([disabled])) #menu-item:focus #actions-container,
      :host(:not([disabled])) #menu-item:focus-within #actions-container {
        opacity: 1;
        width: auto;
      }

      #loader {
        position: absolute;
        width: 100%;
        bottom: 0;
      }

      #icon {
        display: inline-flex;
        margin-right: var(--uui-size-2,6px);
      }

      #badge {
        font-size: 12px;
        --uui-badge-position: relative;
        --uui-badge-position: auto;
        display: block;
        margin-left: 6px;
      }

      /** Focus styling */

      :host([select-mode='highlight']) #label-button:focus-visible {
        outline: none;
        overflow: initial;
      }

      :host([select-mode='highlight']) #label-button:focus-visible::after {
        content: '';
        border-radius: calc(var(--uui-border-radius,3px) - 1px);
        position: absolute;
        inset: 3px 3px 3px -5px;
        border: 2px solid var(--uui-color-focus,#3879ff);
      }

      :host([select-mode='highlight']) #caret-button:focus-visible {
        outline: none;
        overflow: initial;
      }

      :host([select-mode='highlight']) #caret-button:focus-visible::after {
        content: '';
        position: absolute;
        inset: 3px;
        border-radius: calc(var(--uui-border-radius,3px) - 1px);
        border: 2px solid var(--uui-color-focus,#3879ff);
      }

      /** Slots */

      slot:not([name]) {
        position: relative;
        display: block;
        width: 100%;
      }
      slot:not([name]) {
        --uui-menu-item-indent: var(--uui-menu-item-child-indent);
      }

      slot[name='actions'] {
        display: flex;
        align-items: center;
        --uui-button-height: calc(var(--uui-size-base-unit) * 4);
        margin-right: var(--uui-size-base-unit);
      }
    `
];
xe([
  a({ type: Boolean, reflect: !0 })
], le.prototype, "disabled", 2);
xe([
  a({ type: Boolean, reflect: !0, attribute: "show-children" })
], le.prototype, "showChildren", 2);
xe([
  a({ type: Boolean, attribute: "has-children" })
], le.prototype, "hasChildren", 2);
xe([
  a({ type: Boolean, attribute: "loading" })
], le.prototype, "loading", 2);
xe([
  a({ type: String })
], le.prototype, "href", 2);
xe([
  a({ type: String })
], le.prototype, "target", 2);
xe([
  a({ type: String })
], le.prototype, "rel", 2);
xe([
  a({ type: String, attribute: "select-mode", reflect: !0 })
], le.prototype, "selectMode", 2);
xe([
  a({ type: String, attribute: "caret-label" })
], le.prototype, "caretLabel", 2);
xe([
  g()
], le.prototype, "iconSlotHasContent", 2);
le = xe([
  d("uui-menu-item")
], le);
var ef = Object.defineProperty, tf = Object.getOwnPropertyDescriptor, zi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? tf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ef(t, i, r), r;
};
const rf = "uui:modal-open", Wi = "uui:modal-close", of = "uui:modal-close-end";
class $e extends v {
  constructor() {
    super(...arguments), this.isOpen = !1, this.isClosing = !1, this.index = 0, this.uniqueIndex = 0, this._transitionDuration = 250, this.open = (t) => {
      t?.preventDefault(), t?.stopImmediatePropagation();
      const i = new CustomEvent(rf, {
        cancelable: !0
      }), o = new CustomEvent("open", {
        cancelable: !0
      });
      this.dispatchEvent(i), this.dispatchEvent(o), !(i.defaultPrevented || o.defaultPrevented) && this._openModal();
    }, this.close = (t) => {
      t?.preventDefault(), t?.stopImmediatePropagation();
      const i = new CustomEvent(Wi, {
        cancelable: !0
      });
      this.dispatchEvent(i), !i.defaultPrevented && this.forceClose();
    };
  }
  get transitionDuration() {
    return this._transitionDuration;
  }
  set transitionDuration(t) {
    this._transitionDuration = t, this.style.setProperty(
      "--uui-modal-transition-duration",
      this._transitionDuration + "ms"
    );
  }
  firstUpdated(t) {
    super.firstUpdated(t), this.isClosing || this.open();
  }
  _openModal() {
    this.isOpen = !0, this._dialogElement?.showModal(), this._dialogElement?.addEventListener("cancel", this.close);
  }
  forceClose() {
    this.isClosing = !0, this.isOpen = !1, this._dialogElement?.close(), this.dispatchEvent(new CustomEvent("close-end")), this.dispatchEvent(new CustomEvent(of)), this.remove();
  }
  static {
    this.styles = [
      p`
      dialog {
        display: block;
        margin: 0;
        padding: 0;
        max-width: unset;
        max-height: unset;
        border: none;
        background: none;
        color: var(--uui-color-text,#060606);
      }
      dialog::backdrop {
        background: none;
        opacity: 0;
      }
      dialog::after {
        content: '';
        position: absolute;
        inset: 0;
        background-color: var(--uui-modal-color-backdrop, rgba(0, 0, 0, 0.5));
        pointer-events: none;
        opacity: 1;
        transition: opacity var(--uui-modal-transition-duration, 250ms);
        z-index: 1;
      }
      :host([index='0']) dialog::after {
        opacity: 0;
      }
    `
    ];
  }
}
zi([
  P("dialog")
], $e.prototype, "_dialogElement", 2);
zi([
  a({ type: Boolean, reflect: !0, attribute: "is-open" })
], $e.prototype, "isOpen", 2);
zi([
  a({ type: Boolean, reflect: !0, attribute: "is-closing" })
], $e.prototype, "isClosing", 2);
zi([
  a({ type: Number, reflect: !0 })
], $e.prototype, "index", 2);
zi([
  a({ type: Number, reflect: !0, attribute: "unique-index" })
], $e.prototype, "uniqueIndex", 2);
zi([
  a({ type: Number, attribute: "transition-duration" })
], $e.prototype, "transitionDuration", 1);
var sf = Object.defineProperty, nf = Object.getOwnPropertyDescriptor, yu = (e) => {
  throw TypeError(e);
}, wu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? nf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && sf(t, i, r), r;
}, af = (e, t, i) => t.has(e) || yu("Cannot " + i), ol = (e, t, i) => (af(e, t, "read from private field"), i ? i.call(e) : t.get(e)), lf = (e, t, i) => t.has(e) ? yu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), oo, Xs;
let dr = class extends $e {
  constructor() {
    super(...arguments), lf(this, oo), this.size = "full";
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.style.setProperty("--uui-modal-offset", -ol(this, oo, Xs) + "px");
  }
  updated(e) {
    super.updated(e), this.uniqueIndex > 10 ? this.setAttribute("hide", "") : this.removeAttribute("hide");
  }
  forceClose() {
    this.isClosing || (this.isClosing = !0, this.style.setProperty("--uui-modal-offset", -ol(this, oo, Xs) + "px"), setTimeout(() => {
      super.forceClose();
    }, this.transitionDuration));
  }
  render() {
    return l`<dialog>
      <slot></slot>
    </dialog>`;
  }
};
oo = /* @__PURE__ */ new WeakSet();
Xs = function() {
  return this._dialogElement?.getBoundingClientRect().width ?? 0;
};
dr.styles = [
  ...$e.styles,
  p`
      :host {
        outline: none;
        --uui-modal-sidebar-left-gap: 24px;
        --uui-modal-sidebar-background: var(--uui-color-surface,#fff);
      }
      @media (min-width: 600px) {
        :host {
          --uui-modal-sidebar-left-gap: 64px;
        }
      }
      dialog {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        max-width: calc(100% - var(--uui-modal-sidebar-left-gap));
        margin-left: auto;
        right: var(--uui-modal-offset);
        transition: right var(--uui-modal-transition-duration, 250ms);
        background: var(
          --uui-modal-sidebar-background,
          var(--uui-color-surface,#fff)
        );
      }
      :host([index='0']) dialog {
        box-shadow: var(--uui-shadow-depth-5,0 19px 38px rgba(0,0,0,0.30) , 0 15px 12px rgba(0,0,0,0.22));
      }
      :host(:not([index='0'])) dialog {
        outline: 1px solid rgba(0, 0, 0, 0.1);
      }
      :host([hide]) dialog {
        display: none;
      }
      :host([size='large']) dialog {
        max-width: min(1200px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
      :host([size='medium']) dialog {
        max-width: min(800px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
      :host([size='small']) dialog {
        max-width: min(500px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
    `
];
wu([
  a({ reflect: !0 })
], dr.prototype, "size", 2);
dr = wu([
  d("uui-modal-sidebar")
], dr);
var uf = Object.defineProperty, cf = Object.getOwnPropertyDescriptor, xu = (e) => {
  throw TypeError(e);
}, Mi = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? cf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && uf(t, i, r), r;
}, $u = (e, t, i) => t.has(e) || xu("Cannot " + i), Hi = (e, t, i) => ($u(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Cs = (e, t, i) => t.has(e) ? xu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Vr = (e, t, i) => ($u(e, t, "access private method"), i), Ys, Qt, Jt, Zs, Qs;
let vt = class extends v {
  constructor() {
    super(), Cs(this, Jt), this.sidebarGap = 64, this.transitionDurationMS = 250, Cs(this, Ys, () => {
      const e = this._modals ?? [];
      if (this._modals = this.modalSlot?.assignedElements({ flatten: !0 }).filter(
        (o) => o instanceof $e
      ) ?? [], e.filter(
        (o) => this._modals.indexOf(o) === -1
      ).forEach(
        (o) => o.removeEventListener(Wi, Hi(this, Qt))
      ), this._modals.filter(
        (o) => e.indexOf(o) === -1
      ).forEach(
        (o) => o.addEventListener(Wi, Hi(this, Qt))
      ), this._sidebars = this._modals.filter(
        (o) => o instanceof dr
      ), this._modals.length === 0) {
        this.removeAttribute("backdrop");
        return;
      }
      Vr(this, Jt, Zs).call(this), Vr(this, Jt, Qs).call(this);
    }), Cs(this, Qt, (e) => {
      if (e.stopImmediatePropagation(), e.target?.removeEventListener(
        Wi,
        Hi(this, Qt)
      ), !this._modals || this._modals.length <= 1) {
        this.removeAttribute("backdrop");
        return;
      }
      Vr(this, Jt, Zs).call(this), Vr(this, Jt, Qs).call(this);
    }), this.addEventListener(Wi, Hi(this, Qt));
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.style.setProperty(
      "--uui-modal-transition-duration",
      this.transitionDurationMS + "ms"
    );
  }
  render() {
    return l`<slot @slotchange=${Hi(this, Ys)}></slot>`;
  }
};
Ys = /* @__PURE__ */ new WeakMap();
Qt = /* @__PURE__ */ new WeakMap();
Jt = /* @__PURE__ */ new WeakSet();
Zs = function() {
  this.setAttribute("backdrop", "");
  const e = this._modals?.filter((t) => !t.isClosing).reverse() ?? [];
  e?.forEach((t, i) => {
    t.index = i, t.transitionDuration = this.transitionDurationMS;
  }), e?.forEach((t) => {
    const i = e?.filter(
      (o) => o.constructor.name === t.constructor.name
    );
    t.uniqueIndex = i?.indexOf(t) ?? 0;
  });
};
Qs = function() {
  requestAnimationFrame(() => {
    let e = 0;
    const t = this._sidebars?.filter((i) => !i.isClosing).reverse() ?? [];
    for (let i = 0; i < t.length; i++) {
      const o = t[i], r = t[i + 1], s = e;
      if (o.updateComplete.then(() => {
        o.style.setProperty(
          "--uui-modal-offset",
          s + "px"
        );
      }), r?.hasAttribute("hide")) break;
      const n = o.shadowRoot?.querySelector("dialog")?.getBoundingClientRect().width ?? 0, u = r?.shadowRoot?.querySelector("dialog")?.getBoundingClientRect().width ?? 0, c = n + e + this.sidebarGap - u;
      e = c > 0 ? c : 0;
    }
  });
};
vt.styles = p`
    :host {
      position: fixed;
      --uui-modal-color-backdrop: rgba(0, 0, 0, 0.5);
    }
    :host::after {
      content: '';
      position: fixed;
      inset: 0;
      background-color: var(--uui-modal-color-backdrop, rgba(0, 0, 0, 0.5));
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--uui-modal-transition-duration, 250ms);
    }
    :host([backdrop])::after {
      opacity: 1;
    }
  `;
Mi([
  P("slot")
], vt.prototype, "modalSlot", 2);
Mi([
  g()
], vt.prototype, "_modals", 2);
Mi([
  g()
], vt.prototype, "_sidebars", 2);
Mi([
  a({ type: Number })
], vt.prototype, "sidebarGap", 2);
Mi([
  a({ type: Number })
], vt.prototype, "transitionDurationMS", 2);
vt = Mi([
  d("uui-modal-container")
], vt);
var hf = Object.getOwnPropertyDescriptor, df = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? hf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let Js = class extends $e {
  render() {
    return l`
      <dialog>
        <slot></slot>
      </dialog>
    `;
  }
};
Js.styles = [
  ...$e.styles,
  p`
      :host {
        outline: none;
        --uui-modal-dialog-background: var(--uui-color-surface,#fff);
      }
      dialog {
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: var(
          --uui-modal-dialog-border-radius,
          calc(var(--uui-border-radius,3px) * 4)
        );
        background: var(
          --uui-modal-dialog-background,
          var(--uui-color-surface,#fff)
        );
      }
      :host([index='0']) dialog {
        box-shadow: var(--uui-shadow-depth-5,0 19px 38px rgba(0,0,0,0.30) , 0 15px 12px rgba(0,0,0,0.22));
      }
      :host(:not([index='0'])) dialog {
        outline: 1px solid rgba(0, 0, 0, 0.1);
      }
    `
];
Js = df([
  d("uui-modal-dialog")
], Js);
class qt extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var pf = Object.defineProperty, vf = Object.getOwnPropertyDescriptor, ce = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? vf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && pf(t, i, r), r;
};
const ff = 45, Es = (e, t, i) => Math.min(Math.max(e, t), i), bf = (e, t) => Array.from({ length: t - e + 1 }, (i, o) => e + o);
let ie = class extends v {
  constructor() {
    super(...arguments), this._observer = new ResizeObserver(this._calculateRange.bind(this)), this.label = "", this.ariaLabel = "", this.firstLabel = "First", this.previousLabel = "Previous", this.nextLabel = "Next", this.lastLabel = "Last", this._total = 100, this._range = 0, this._visiblePages = [], this._current = 1;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "navigation"), this._visiblePages = this._generateVisiblePages(this.current), y(this, "uui-button"), y(this, "uui-button-group");
  }
  disconnectedCallback() {
    this._observer.disconnect();
  }
  firstUpdated() {
    this._observer.observe(this._pagesGroup), this.updateLabel(), this._calculateRange();
  }
  willUpdate(e) {
    (e.has("current") || e.has("label")) && this.updateLabel();
  }
  updateLabel() {
    this.ariaLabel = `${this.label || "Pagination navigation"}. Current page: ${this.current}.`;
  }
  _calculateRange() {
    const e = this.offsetWidth, t = Array.from(this._navButtons).reduce(
      (r, s) => r + s.getBoundingClientRect().width,
      0
    ), o = (e - t) / ff / 2;
    this._range = Math.max(1, Math.floor(o)), this._visiblePages = this._generateVisiblePages(this.current);
  }
  _generateVisiblePages(e) {
    const t = e < this._range ? 1 : e < this.total - this._range ? e - this._range : this.total - this._range * 2, i = e <= this._range ? this._range * 2 + 1 : e < this.total - this._range ? e + this._range : this.total;
    return bf(
      Es(t, 1, this.total),
      Es(i, 1, this.total)
    );
  }
  get total() {
    return this._total;
  }
  set total(e) {
    this._total = e, this._visiblePages = this._generateVisiblePages(this._current), this.requestUpdate("total", e);
  }
  get current() {
    return this._current;
  }
  set current(e) {
    const t = this._current;
    this._current = Es(e, 1, this.total), this._visiblePages = this._generateVisiblePages(this._current), this.requestUpdate("current", t);
  }
  /**
   * This method will change the page to a next one.
   * @memberof UUIPaginationElement
   */
  goToNextPage() {
    this.current++, this.dispatchEvent(new qt(qt.CHANGE));
  }
  /**
   * Change the page to a previous one.
   * @memberof UUIPaginationElement
   */
  goToPreviousPage() {
    this.current--, this.dispatchEvent(new qt(qt.CHANGE));
  }
  /**
   * Change the page to the one passed as an argument to this method.
   * @param {number} page
   * @memberof UUIPaginationElement
   */
  goToPage(e) {
    this.current = e, this.dispatchEvent(new qt(qt.CHANGE));
  }
  /** When having limited display of page-buttons and clicking a page-button that changes the current range, the focus stays on the position of the clicked button which is not anymore representing the number clicked, therefore we move focus to the button that represents the current page. */
  focusActivePage() {
    requestAnimationFrame(() => {
      const e = this.renderRoot.querySelector(".active");
      e && e.focus();
    });
  }
  renderFirst() {
    return l`<uui-button
      compact
      look="outline"
      class="nav"
      role="listitem"
      label=${this.firstLabel}
      ?disabled=${this._current === 1}
      @click=${() => this.goToPage(1)}></uui-button>`;
  }
  renderPrevious() {
    return l`<uui-button
      compact
      look="outline"
      class="nav"
      role="listitem"
      label=${this.previousLabel}
      ?disabled=${this._current === 1}
      @click=${this.goToPreviousPage}></uui-button>`;
  }
  renderNext() {
    return l`<uui-button
      compact
      look="outline"
      role="listitem"
      class="nav"
      label=${this.nextLabel}
      ?disabled=${this._current === this.total}
      @click=${this.goToNextPage}></uui-button>`;
  }
  renderLast() {
    return l`
      <uui-button
        compact
        look="outline"
        role="listitem"
        class="nav"
        label=${this.lastLabel}
        ?disabled=${this.total === this._current}
        @click=${() => this.goToPage(this.total)}></uui-button>
    `;
  }
  renderDots() {
    return l`<uui-button
      compact
      look="outline"
      role="listitem"
      tabindex="-1"
      class="dots"
      label="More pages"
      >...</uui-button
    > `;
  }
  renderPage(e) {
    return l`<uui-button
      compact
      look="outline"
      role="listitem"
      label="Go to page ${e}"
      class=${"page" + (e === this._current ? " active" : "")}
      tabindex=${e === this._current ? "-1" : ""}
      @click=${() => {
      e !== this._current && (this.goToPage(e), this.focusActivePage());
    }}>
      ${e}
    </uui-button>`;
  }
  renderNavigationLeft() {
    return l` ${this.renderFirst()} ${this.renderPrevious()}
    ${this._visiblePages.includes(1) ? "" : this.renderDots()}`;
  }
  renderNavigationRight() {
    return l`${this._visiblePages.includes(this.total) ? "" : this.renderDots()}
    ${this.renderNext()} ${this.renderLast()}`;
  }
  render() {
    return l`<uui-button-group role="list" id="pages">
      ${this.renderNavigationLeft()}
      ${this._visiblePages.map(
      (e) => this.renderPage(e)
    )}
      ${this.renderNavigationRight()}
    </uui-button-group>
    `;
  }
};
ie.styles = [
  p`
      uui-button-group {
        width: 100%;
      }

      uui-button {
        --uui-button-border-color: var(--uui-color-border-standalone,#c2c2c2);
        --uui-button-border-color-hover: var(--uui-color-interactive-emphasis,#3544b1);
        --uui-button-border-color-disabled: var(--uui-color-border-standalone,#c2c2c2);
      }

      .page {
        min-width: 36px;
        max-width: 72px;
      }
      .page.active {
        --uui-button-background-color: var(--uui-color-current,#f5c1bc);
      }

      .nav {
        min-width: 72px;
      }

      .dots {
        pointer-events: none;
      }

      .active {
        pointer-events: none;
      }
    `
];
ce([
  Uc("uui-button.nav")
], ie.prototype, "_navButtons", 2);
ce([
  P("#pages")
], ie.prototype, "_pagesGroup", 2);
ce([
  a()
], ie.prototype, "label", 2);
ce([
  a({ reflect: !0, attribute: "aria-label" })
], ie.prototype, "ariaLabel", 2);
ce([
  a()
], ie.prototype, "firstLabel", 2);
ce([
  a()
], ie.prototype, "previousLabel", 2);
ce([
  a()
], ie.prototype, "nextLabel", 2);
ce([
  a()
], ie.prototype, "lastLabel", 2);
ce([
  a({ type: Number })
], ie.prototype, "total", 1);
ce([
  g()
], ie.prototype, "_range", 2);
ce([
  g()
], ie.prototype, "_visiblePages", 2);
ce([
  a({ type: Number })
], ie.prototype, "current", 1);
ie = ce([
  d("uui-pagination")
], ie);
class sl extends S {
  static {
    this.CLOSE = "close";
  }
}
var gf = Object.defineProperty, mf = Object.getOwnPropertyDescriptor, $r = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? mf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && gf(t, i, r), r;
};
function Br(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
let Tt = class extends v {
  constructor() {
    super(...arguments), this.scrollEventHandler = this._updatePlacement.bind(this), this._open = !1, this._placement = "bottom-start", this._currentPlacement = null, this._scrollParents = [], this.margin = 0, this._onTriggerSlotChanged = (e) => {
      this._trigger = e.target.assignedElements({
        flatten: !0
      })[0];
    }, this._intersectionCallback = (e) => {
      e.forEach((t) => {
        t.isIntersecting === !1 && (this._startScrollListener(), this._updatePlacement());
      });
    }, this._onKeyUp = (e) => {
      if (e.key === "Escape") {
        this._triggerPopoverClose();
        return;
      }
    }, this._onDocumentClick = (e) => {
      e.composedPath().includes(this) || this._triggerPopoverClose();
    };
  }
  get placement() {
    return this._placement;
  }
  set placement(e) {
    const t = this._placement;
    this._placement = e || "bottom-start", this._currentPlacement = null, this._updatePlacement(), this.requestUpdate("placement", t);
  }
  get open() {
    return this._open;
  }
  set open(e) {
    const t = this._open;
    this._open = e, e ? this._openPopover() : this._closePopover(), this.requestUpdate("open", t);
  }
  connectedCallback() {
    super.connectedCallback(), this._getScrollParents();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("mousedown", this._onDocumentClick), document.removeEventListener("keyup", this._onKeyUp), document.removeEventListener("scroll", this.scrollEventHandler), this.intersectionObserver && (this.intersectionObserver.disconnect(), delete this.intersectionObserver), this._scrollParents = [];
  }
  _openPopover() {
    this.containerElement && (this.containerElement.style.opacity = "0", document.addEventListener("mousedown", this._onDocumentClick), document.addEventListener("keyup", this._onKeyUp), this._currentPlacement = null, requestAnimationFrame(() => {
      this._updatePlacement(), this._createIntersectionObserver(), this.containerElement.style.opacity = "1";
    }));
  }
  _closePopover() {
    this.intersectionObserver && (this.intersectionObserver.disconnect(), delete this.intersectionObserver), document.removeEventListener("mousedown", this._onDocumentClick), document.removeEventListener("keyup", this._onKeyUp), this._currentPlacement = null;
  }
  // Use this when changing the open state from within this component.
  _triggerPopoverClose() {
    const e = new sl(sl.CLOSE, {
      cancelable: !0
    });
    this.dispatchEvent(e), !e.defaultPrevented && (this.open = !1);
  }
  _getScrollParents() {
    const e = this.shadowRoot.host;
    let t = getComputedStyle(e);
    if (t.position === "fixed")
      return;
    const i = t.position === "absolute", o = /(auto|scroll)/;
    let r = e;
    for (; r = r.parentElement; )
      if (t = getComputedStyle(r), !(i && t.position === "static") && (o.test(t.overflow + t.overflowY + t.overflowX) && this._scrollParents.push(r), t.position === "fixed"))
        return;
    this._scrollParents.push(document.body);
  }
  _createIntersectionObserver() {
    if (this.intersectionObserver)
      return;
    const e = {
      root: null,
      rootMargin: "0px",
      threshold: 1
    };
    this.intersectionObserver = new IntersectionObserver(
      this._intersectionCallback,
      e
    ), this.intersectionObserver.observe(this.containerElement);
  }
  _startScrollListener() {
    this._scrollParents.forEach((e) => {
      e.addEventListener("scroll", this.scrollEventHandler);
    }), document.addEventListener("scroll", this.scrollEventHandler);
  }
  _stopScrollListener() {
    this._scrollParents.forEach((e) => {
      e.removeEventListener("scroll", this.scrollEventHandler);
    }), document.removeEventListener("scroll", this.scrollEventHandler);
  }
  _updatePlacement() {
    if (!this.shadowRoot)
      return;
    const e = this.containerElement;
    if (!e)
      return;
    const t = this.containerElement?.getBoundingClientRect(), i = this._trigger?.getBoundingClientRect();
    if (i != null && t != null) {
      const o = this._scrollParents.map(
        (Ee) => Ee.getBoundingClientRect()
      );
      this._currentPlacement = this._currentPlacement || this._placement, this._placement !== "auto" && (this._currentPlacement = this._managePlacementFlip(
        this._currentPlacement,
        t,
        o
      ));
      let r = this._currentPlacement.indexOf("top") !== -1, s = this._currentPlacement.indexOf("bottom") !== -1, n = this._currentPlacement.indexOf("left") !== -1, u = this._currentPlacement.indexOf("right") !== -1;
      const c = this._currentPlacement.indexOf("-start") !== -1, h = this._currentPlacement.indexOf("-end") !== -1;
      let m = 0.5, f = 0.5, C = 0.5, x = 0.5, O = 0, X = 0;
      if (this.placement === "auto") {
        const Ee = this._scrollParents[0], Ni = Ee.clientWidth, kt = Ee.clientHeight, Rt = i.x - t.width, Ft = Ni - (i.x + i.width) - t.width, cs = i.y - t.height, kr = kt - (i.y + i.height) - t.height;
        let Cr = 0.5, Er = 0.5;
        const nc = Math.max(Rt, Ft);
        let ra = Math.max(cs, kr);
        kr > cs && kr > this.margin && (ra += 9999), nc > ra ? (Rt > Ft ? (Cr = 0, n = !0) : (Cr = 1, u = !0), O = this.margin) : (cs > kr ? (Er = 0, r = !0) : (Er = 1, s = !0), X = this.margin), m = Cr, f = Er, C = 1 - Cr, x = 1 - Er;
      } else
        r && (x = 1, f = 0), s && (x = 0, f = 1), (r || s) && (X = this.margin, c && (C = 0, m = 0), h && (C = 1, m = 1)), n && (C = 1, m = 0), u && (C = 0, m = 1), (n || u) && (O = this.margin, c && (x = 0, f = 0), h && (x = 1, f = 1));
      const Be = -t.width * C + i.width * m - O * (C * 2 - 1), tt = -t.height * x + i.height * f - X * (x * 2 - 1);
      let Ce = Be, it = tt;
      r || s ? (this._scrollParents.forEach((Ee, Ni) => {
        const kt = Ee === document.body ? 0 : o[Ni].x, Rt = -i.x + kt, Ft = Ee.clientWidth - i.x - i.width + Be + kt - (t.width - i.width) * (1 - m);
        Ce = Br(Ce, Rt, Ft);
      }), Ce = Br(Ce, -t.width, i.width)) : (n || u) && (this._scrollParents.forEach((Ee, Ni) => {
        const kt = Ee === document.body ? 0 : o[Ni].y, Rt = -i.y + kt, Ft = Ee.clientHeight - i.y - i.height + tt + kt - (t.height - i.height) * (1 - f);
        it = Br(it, Rt, Ft);
      }), it = Br(it, -t.height, i.height)), (this._positionX !== Ce || this._positionY !== it) && (this._positionX = Ce, this._positionY = it, Be === Ce && tt === it && this._stopScrollListener(), e.style.left = `${this._positionX}px`, e.style.top = `${this._positionY}px`);
    }
  }
  _managePlacementFlip(e, t, i) {
    const r = e.split("-"), s = r[0], n = r[1] || null;
    let u;
    return this._scrollParents.some((c, h) => {
      const m = c === document.body ? 0 : i[h].x, f = c === document.body ? 0 : i[h].y;
      return s === "top" && t.y - 2 <= f ? (u = "bottom", !0) : s === "bottom" && t.y + t.height + 2 >= c.clientHeight + f ? (u = "top", !0) : s === "left" && t.x - 2 <= m ? (u = "right", !0) : s === "right" && t.x + t.width + 2 >= c.clientWidth + m ? (u = "left", !0) : !1;
    }), u ? (this._startScrollListener(), u + (n ? `-${n}` : "")) : e;
  }
  render() {
    return l`
      <slot
        id="trigger"
        name="trigger"
        @slotchange=${this._onTriggerSlotChanged}></slot>
      <div id="container">
        ${this._open ? l`<slot name="popover"></slot>` : ""}
      </div>
    `;
  }
};
Tt.styles = [
  p`
      :host {
        position: relative;
        display: inline-block;
        width: 100%;
      }
      #container {
        position: absolute;
        width: 100%;
        z-index: var(--uui-popover-z-index, 1);
      }
      slot[name='popover'] {
        display: block;
      }
      #trigger {
        position: relative;
        width: 100%;
      }

      slot[name='trigger']::slotted(uui-button) {
        --uui-button-border-radius: var(
          --uui-popover-toggle-slot-button-border-radius
        );
        --uui-button-merge-border-left: var(
          --uui-popover-toggle-slot-button-merge-border-left
        );
      }
    `
];
$r([
  P("#container")
], Tt.prototype, "containerElement", 2);
$r([
  a({ type: Number })
], Tt.prototype, "margin", 2);
$r([
  a({ type: String, reflect: !0 })
], Tt.prototype, "placement", 1);
$r([
  a({ type: Boolean, reflect: !0 })
], Tt.prototype, "open", 1);
Tt = $r([
  d("uui-popover")
], Tt);
var _f = Object.defineProperty, yf = Object.getOwnPropertyDescriptor, ku = (e) => {
  throw TypeError(e);
}, Ht = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && _f(t, i, r), r;
}, Rn = (e, t, i) => t.has(e) || ku("Cannot " + i), I = (e, t, i) => (Rn(e, t, "read from private field"), i ? i.call(e) : t.get(e)), We = (e, t, i) => t.has(e) ? ku("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Hr = (e, t, i, o) => (Rn(e, t, "write to private field"), t.set(e, i), i), nt = (e, t, i) => (Rn(e, t, "access private method"), i), Ge, mi, Ot, Gi, so, Ke, qi, en, Ie, tn, Cu, rn, Eu, on;
let et = class extends v {
  constructor() {
    super(...arguments), We(this, Ie), this.margin = 0, this._placement = "bottom-start", this._open = !1, this._actualPlacement = this._placement, We(this, Ge, null), We(this, mi, []), We(this, Ot, null), We(this, Gi, { width: 0, height: 0 }), We(this, so, (e) => {
      if (this._open = e.newState === "open", Hr(this, Ge, Nh(
        this,
        "popovertarget",
        this.id
      )), nt(this, Ie, Eu).call(this), I(this, Ge)?.dispatchEvent(
        new CustomEvent("uui-popover-before-toggle", {
          bubbles: !1,
          composed: !1,
          detail: {
            oldState: e.oldState,
            newState: e.newState
          }
        })
      ), !this._open) {
        nt(this, Ie, rn).call(this);
        return;
      }
      nt(this, Ie, Cu).call(this), requestAnimationFrame(() => {
        I(this, Ke).call(this);
      });
    }), We(this, Ke, () => {
      this._open && (this._actualPlacement = this._placement, this.style.opacity = "0", I(this, qi).call(this, 3));
    }), We(this, qi, (e) => {
      if (I(this, en).call(this), e--, I(this, Ge) === null) return;
      const t = this._actualPlacement.indexOf("top") !== -1, i = this._actualPlacement.indexOf("bottom") !== -1, o = this._actualPlacement.indexOf("left") !== -1, r = this._actualPlacement.indexOf("right") !== -1, s = this._actualPlacement.indexOf("-start") !== -1, n = this._actualPlacement.indexOf("-end") !== -1, u = I(this, Ge).getBoundingClientRect(), c = this.getBoundingClientRect();
      let h = 0, m = 0;
      i && (h = u.top + u.height, s && (m = u.left), n && (m = u.left + u.width - c.width), !s && !n && (m = u.left + u.width / 2 - c.width / 2)), t && (h = u.top - c.height, s && (m = u.left), n && (m = u.left + u.width - c.width), !s && !n && (m = u.left + u.width / 2 - c.width / 2)), o && (m = u.left - c.width, s && (h = u.top), n && (h = u.top + u.height - c.height), !s && !n && (h = u.top + u.height / 2 - c.height / 2)), r && (m = u.left + u.width, s && (h = u.top), n && (h = u.top + u.height - c.height), !s && !n && (h = u.top + u.height / 2 - c.height / 2));
      const f = window.innerWidth, C = window.innerHeight, x = Math.min(
        0,
        u.top + u.height
      ), O = Math.max(
        Math.min(h, C - c.height),
        u.top - c.height
      );
      if (Math.max(x, O) !== h && (t || i) && e > 0) {
        nt(this, Ie, tn).call(this), I(this, qi).call(this, e);
        return;
      }
      h = Math.max(x, O);
      const Be = Math.min(
        0,
        u.left + u.width
      ), tt = Math.max(
        Math.min(m, f - c.width),
        u.left - c.width
      ), Ce = Math.max(Be, tt);
      if (Ce !== m && (o || r) && e > 0) {
        nt(this, Ie, tn).call(this), I(this, qi).call(this, e);
        return;
      }
      m = Ce, (h + c.height < 0 || h > C || m + c.width < 0 || m > f) && this.hidePopover(), this.style.transform = `translate(${m}px, ${h}px)`, this.style.opacity = "1";
    }), We(this, en, () => {
      const e = {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
      };
      let t = this._actualPlacement.split("-")[0];
      t = e[t] || t, t = t.charAt(0).toUpperCase() + t.slice(1);
      const i = `padding${t}`;
      this.style.padding = "0", this.style[i] = `${this.margin}px`;
    });
  }
  get open() {
    return this._open;
  }
  get placement() {
    return this._placement;
  }
  set placement(e) {
    this._placement = e, this._actualPlacement = e, I(this, Ke).call(this);
  }
  connectedCallback() {
    this.hasAttribute("popover") || this.setAttribute("popover", ""), super.connectedCallback(), this.addEventListener("beforetoggle", I(this, so)), I(this, Ot) || (Hr(this, Ot, new ResizeObserver((e) => {
      const t = e[0], i = t.contentRect.width, o = t.contentRect.height;
      i === I(this, Gi).width && o === I(this, Gi).height || (Hr(this, Gi, { width: i, height: o }), I(this, Ke).call(this));
    })), I(this, Ot).observe(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("beforetoggle", I(this, so)), nt(this, Ie, rn).call(this), I(this, Ot)?.disconnect(), Hr(this, Ot, null);
  }
  render() {
    return l`<slot></slot>`;
  }
};
Ge = /* @__PURE__ */ new WeakMap();
mi = /* @__PURE__ */ new WeakMap();
Ot = /* @__PURE__ */ new WeakMap();
Gi = /* @__PURE__ */ new WeakMap();
so = /* @__PURE__ */ new WeakMap();
Ke = /* @__PURE__ */ new WeakMap();
qi = /* @__PURE__ */ new WeakMap();
en = /* @__PURE__ */ new WeakMap();
Ie = /* @__PURE__ */ new WeakSet();
tn = function() {
  const [e, t] = this._actualPlacement.split("-"), i = e === "top" ? "bottom" : e === "bottom" ? "top" : e === "left" ? "right" : "left";
  this._actualPlacement = `${i}-${t}`;
};
Cu = function() {
  I(this, mi).forEach((e) => {
    e.addEventListener("scroll", I(this, Ke), { passive: !0 });
  }), document.addEventListener("scroll", I(this, Ke), { passive: !0 });
};
rn = function() {
  I(this, mi).forEach((e) => {
    e.removeEventListener("scroll", I(this, Ke));
  }), document.removeEventListener("scroll", I(this, Ke));
};
Eu = function() {
  if (!I(this, Ge)) return;
  let e = getComputedStyle(I(this, Ge));
  if (e.position === "fixed")
    return;
  const t = e.position === "absolute", i = /(auto|scroll)/;
  let o = I(this, Ge);
  for (; o; ) {
    if (e = getComputedStyle(o), t && e.position === "static") {
      o = nt(this, Ie, on).call(this, o);
      continue;
    }
    if (i.test(e.overflow + e.overflowY + e.overflowX) && I(this, mi).push(o), e.position === "fixed")
      return;
    o = nt(this, Ie, on).call(this, o);
  }
  I(this, mi).push(document.body);
};
on = function(e) {
  return e?.parentElement ? e.parentElement : e?.getRootNode()?.host;
};
et.styles = [
  p`
      :host {
        margin: 0;
        width: fit-content;
        height: fit-content;
        border: none;
        border-radius: 0;
        padding: 0;
        background-color: none;
        background: none;
        overflow: visible;
        color: var(--uui-color-text,#060606);
      }
    `
];
Ht([
  a({ type: Number })
], et.prototype, "margin", 2);
Ht([
  a({ type: Boolean })
], et.prototype, "open", 1);
Ht([
  a({ type: String, reflect: !0 })
], et.prototype, "placement", 1);
Ht([
  g()
], et.prototype, "_placement", 2);
Ht([
  g()
], et.prototype, "_open", 2);
Ht([
  g()
], et.prototype, "_actualPlacement", 2);
et = Ht([
  d("uui-popover-container")
], et);
var wf = Object.defineProperty, xf = Object.getOwnPropertyDescriptor, Pu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? xf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && wf(t, i, r), r;
};
const $f = (e, t, i) => Math.min(Math.max(e, t), i);
let So = class extends v {
  constructor() {
    super(...arguments), this._progress = 0;
  }
  get progress() {
    return this._progress;
  }
  set progress(e) {
    const t = this._progress;
    this._progress = $f(e, 0, 100), this.requestUpdate("progress", t);
  }
  _getProgressStyle() {
    return { width: `${this._progress}%` };
  }
  render() {
    return l`
      <div id="bar" style=${Ze(this._getProgressStyle())}></div>
    `;
  }
};
So.styles = [
  p`
      :host {
        width: 100%;
        height: 4px;
        position: relative;
        overflow: hidden;
        background: var(--uui-color-surface-alt,#f3f3f5);
        border-radius: 100px;
        display: inline-block;
      }

      #bar {
        transition: width 250ms ease;
        background: var(--uui-color-positive,#0b8152);
        height: 100%;
        width: 0%;
      }
    `
];
Pu([
  a({ type: Number })
], So.prototype, "progress", 1);
So = Pu([
  d("uui-progress-bar")
], So);
class Oo extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var kf = Object.defineProperty, Cf = Object.getOwnPropertyDescriptor, Su = (e) => {
  throw TypeError(e);
}, $t = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Cf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && kf(t, i, r), r;
}, Ef = (e, t, i) => t.has(e) || Su("Cannot " + i), Pf = (e, t, i) => t.has(e) ? Su("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Sf = (e, t, i) => (Ef(e, t, "access private method"), i), sn, Ou;
let _e = class extends v {
  constructor() {
    super(...arguments), Pf(this, sn), this.name = "", this.value = "", this.label = "", this.checked = !1, this.disabled = !1, this.readonly = !1;
  }
  focus() {
    this._inputElement.focus();
  }
  click() {
    this._inputElement.click();
  }
  /**
   * Call to uncheck the element
   * @method uncheck
   */
  uncheck() {
    this.checked = !1;
  }
  /**
   * Call to check the element.
   * @method uncheck
   */
  check() {
    this.checked = !0;
  }
  /**
   * Call to make the element focusable, this sets tabindex to 0.
   * @method makeFocusable
   */
  makeFocusable() {
    this.disabled || this.removeAttribute("tabindex");
  }
  /**
   * Call to make the element focusable, this sets tabindex to -1.
   * @method makeUnfocusable
   */
  makeUnfocusable() {
    this.disabled || this.setAttribute("tabindex", "-1");
  }
  render() {
    return l` <label>
      <input
        id="input"
        type="radio"
        name=${this.name}
        value=${this.value}
        .checked=${this.checked}
        .disabled=${this.disabled || this.readonly}
        @change=${Sf(this, sn, Ou)} />
      <div id="button"></div>
      <div id="label">
        ${this.label ? l`<span>${this.label}</span>` : l`<slot></slot>`}
      </div>
    </label>`;
  }
};
sn = /* @__PURE__ */ new WeakSet();
Ou = function(e) {
  e.stopPropagation();
  const t = this._inputElement.checked;
  this.checked = t, t && this.focus(), this.dispatchEvent(new Oo(Oo.CHANGE));
};
_e.styles = [
  Yo,
  p`
      :host {
        display: block;
        box-sizing: border-box;
        font-family: inherit;
        color: currentColor;
        --uui-radio-button-size: var(--uui-size-6,18px);
        margin: var(--uui-size-2,6px) 0;
      }

      label {
        position: relative;
        box-sizing: border-box;
        user-select: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        line-height: 18px;
      }

      :host([readonly]) label {
        cursor: default;
      }

      #input {
        width: 0;
        height: 0;
        opacity: 0;
        margin: 0;
      }

      .label {
        margin-top: 2px;
      }

      #button {
        box-sizing: border-box;
        display: inline-block;
        width: var(--uui-radio-button-size, 18px);
        height: var(--uui-radio-button-size, 18px);
        background-color: var(--uui-color-surface,#fff);
        border: 1px solid var(--uui-color-border-standalone,#c2c2c2);
        border-radius: 100%;
        margin-right: calc(var(--uui-size-2,6px) * 2);
        position: relative;
        flex: 0 0 var(--uui-radio-button-size);
      }

      #button::after {
        content: '';
        width: calc(var(--uui-radio-button-size) / 2);
        height: calc(var(--uui-radio-button-size) / 2);
        background-color: var(--uui-color-selected,#3544b1);
        border-radius: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: all 0.15s ease-in-out;
      }

      :host(:hover) #button {
        border: 1px solid var(--uui-color-border-emphasis,#a1a1a1);
      }

      :host(:focus) {
        outline: none;
      }
      :host(:focus-within) input:focus-visible + #button {
        outline: 2px solid var(--uui-color-focus,#3879ff);
      }

      input:checked ~ #button::after {
        transform: translate(-50%, -50%) scale(1);
      }

      input:checked ~ #button {
        border: 1px solid var(--uui-color-selected,#3544b1);
      }

      input:checked:hover ~ #button {
        border: 1px solid var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
      }

      input:checked:hover ~ #button::after {
        background-color: var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
      }

      :host([disabled]) label {
        cursor: not-allowed;
        opacity: 0.5;
      }
      :host([disabled]) .label {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }

      :host([disabled]) input ~ #button {
        border: 1px solid var(--uui-color-disabled-contrast,#c4c4c4);
      }

      :host([disabled]) input:checked ~ #button {
        border: 1px solid var(--uui-color-disabled-contrast,#c4c4c4);
      }

      :host([disabled]) input:checked ~ #button::after {
        background-color: var(--uui-color-disabled-contrast,#c4c4c4);
      }

      :host([disabled]:active) #button {
        animation: ${Zo};
      }

      @media (prefers-reduced-motion) {
        :host([disabled]:active) #button {
          animation: none;
        }

        #button::after {
          transition: none;
        }
      }
    `
];
$t([
  P("#input")
], _e.prototype, "_inputElement", 2);
$t([
  a({ type: String })
], _e.prototype, "name", 2);
$t([
  a({ type: String })
], _e.prototype, "value", 2);
$t([
  a({ type: String })
], _e.prototype, "label", 2);
$t([
  a({ type: Boolean, reflect: !0 })
], _e.prototype, "checked", 2);
$t([
  a({ type: Boolean, reflect: !0 })
], _e.prototype, "disabled", 2);
$t([
  a({ type: Boolean, reflect: !0 })
], _e.prototype, "readonly", 2);
_e = $t([
  d("uui-radio")
], _e);
class nl extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var Of = Object.defineProperty, If = Object.getOwnPropertyDescriptor, Iu = (e) => {
  throw TypeError(e);
}, Fn = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? If(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Of(t, i, r), r;
}, Wn = (e, t, i) => t.has(e) || Iu("Cannot " + i), w = (e, t, i) => (Wn(e, t, "read from private field"), i ? i.call(e) : t.get(e)), rt = (e, t, i) => t.has(e) ? Iu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), no = (e, t, i, o) => (Wn(e, t, "write to private field"), t.set(e, i), i), N = (e, t, i) => (Wn(e, t, "access private method"), i), H, U, nn, an, Io, Ao, ln, D, Au, Gn, un, qn, Kn, zt, Uu, zu, pr;
const Af = "ArrowLeft", Uf = "ArrowUp", zf = "ArrowRight", Mf = "ArrowDown", Df = " ", Lf = "Enter";
let _i = class extends Le(v, "") {
  constructor() {
    super(), rt(this, D), this.disabled = !1, this.readonly = !1, rt(this, H, null), rt(this, U, []), rt(this, nn, (e) => {
      w(this, U)?.forEach((t) => {
        t !== e.target ? t.makeUnfocusable() : t.makeFocusable();
      });
    }), rt(this, an, (e) => {
      this.contains(e.relatedTarget) || w(this, H) === null && w(this, U)?.forEach((t) => {
        t.makeFocusable();
      });
    }), rt(this, Io, () => {
      this.pristine = !1;
    }), rt(this, Ao, (e) => {
      e.target.checked === !0 && (this.value = e.target.value, N(this, D, pr).call(this));
    }), rt(this, ln, (e) => {
      switch (e.key) {
        case Af:
        case Uf: {
          e.preventDefault(), N(this, D, Uu).call(this);
          break;
        }
        case zf:
        case Mf: {
          e.preventDefault(), N(this, D, zu).call(this);
          break;
        }
        case Df: {
          w(this, H) === null && (this.value = N(this, D, zt).call(this, 1, !1)?.value, N(this, D, pr).call(this));
          break;
        }
        case Lf:
          this.submit();
      }
    }), this.addEventListener("keydown", w(this, ln)), this.addEventListener("focusin", w(this, nn)), this.addEventListener("focusout", w(this, an)), this.updateComplete.then(() => {
      N(this, D, un).call(this, this.value);
    });
  }
  get value() {
    return super.value;
  }
  set value(e) {
    super.value = e, N(this, D, un).call(this, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "radiogroup");
  }
  updated(e) {
    super.updated(e), e.has("disabled") && N(this, D, qn).call(this, this.disabled), e.has("readonly") && N(this, D, Kn).call(this, this.readonly), e.has("name") && N(this, D, Gn).call(this, e.get("name"));
  }
  /**
   * This method enables <label for="..."> to focus the select
   */
  async focus() {
    await this.updateComplete, w(this, H) !== null ? w(this, U)[w(this, H)]?.focus() : N(this, D, zt).call(this, 1, !1)?.focus();
  }
  async blur() {
    await this.updateComplete, w(this, H) !== null ? w(this, U)[w(this, H)]?.blur() : N(this, D, zt).call(this, 1, !1)?.blur();
  }
  async click() {
    await this.updateComplete, w(this, H) !== null ? w(this, U)[w(this, H)]?.click() : N(this, D, zt).call(this, 1, !1)?.click();
  }
  getFormElement() {
    if (w(this, U) && w(this, H))
      return w(this, U)[w(this, H)];
  }
  render() {
    return l` <slot @slotchange=${N(this, D, Au)}></slot> `;
  }
};
H = /* @__PURE__ */ new WeakMap();
U = /* @__PURE__ */ new WeakMap();
nn = /* @__PURE__ */ new WeakMap();
an = /* @__PURE__ */ new WeakMap();
Io = /* @__PURE__ */ new WeakMap();
Ao = /* @__PURE__ */ new WeakMap();
ln = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakSet();
Au = function(e) {
  if (e.stopPropagation(), w(this, U)?.forEach((i) => {
    i.removeEventListener(
      Oo.CHANGE,
      // @ts-ignore TODO: fix typescript error
      w(this, Ao)
    ), i.removeEventListener("blur", w(this, Io));
  }), no(this, H, null), no(this, U, e.target.assignedElements({ flatten: !0 }).filter((i) => i instanceof _e)), w(this, U).length === 0) return;
  w(this, U).forEach((i) => {
    i.addEventListener(
      Oo.CHANGE,
      // @ts-ignore TODO: fix typescript error
      w(this, Ao)
    ), i.addEventListener("blur", w(this, Io));
  }), N(this, D, Gn).call(this, this.name), this.disabled && N(this, D, qn).call(this, !0), this.readonly && N(this, D, Kn).call(this, !0);
  const t = w(this, U).filter((i) => i.checked === !0);
  if (t.length > 1 && (w(this, U).forEach((i) => {
    i.checked = !1;
  }), this.value = "", console.error(
    "There can only be one checked radio among the <" + this.nodeName + "> children",
    this
  )), t.length === 1) {
    const i = t[0];
    this.value = i.value, no(this, H, w(this, U).indexOf(i));
  }
};
Gn = function(e) {
  w(this, U)?.forEach((t) => t.name = e);
};
un = function(e) {
  const t = [];
  w(this, U).forEach((i, o) => {
    i.value === e ? (i.checked = !0, i.makeFocusable(), no(this, H, o)) : (i.checked = !1, t.push(i));
  }), w(this, H) !== null && t.forEach((i) => i.makeUnfocusable());
};
qn = function(e) {
  w(this, U)?.forEach((t) => t.disabled = e);
};
Kn = function(e) {
  w(this, U)?.forEach((t) => t.readonly = e);
};
zt = function(e = 1, t = !0) {
  if (!w(this, U) || w(this, U).length === 0) return null;
  const i = w(this, U).length;
  let o = w(this, H) ?? 0;
  for (let r = 0; r < i + 1; r++) {
    if (!t || r > 0) {
      const s = w(this, U)[o];
      if (!s.disabled && !s.readonly)
        return s;
    }
    o = (o + e + i) % i;
  }
  return null;
};
Uu = function() {
  this.value = N(this, D, zt).call(this, -1)?.value ?? "", w(this, U)[w(this, H) ?? 0]?.focus(), N(this, D, pr).call(this);
};
zu = function() {
  this.value = N(this, D, zt).call(this)?.value ?? "", w(this, U)[w(this, H) ?? 0]?.focus(), N(this, D, pr).call(this);
};
pr = function() {
  this.pristine = !1, this.dispatchEvent(new nl(nl.CHANGE));
};
_i.formAssociated = !0;
_i.styles = [
  p`
      :host {
        display: inline-block;
        padding-right: 3px;
        border: 1px solid transparent;
        border-radius: var(--uui-border-radius,3px);
      }

      :host(:not([pristine]):invalid),
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) {
        border: 1px solid var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
      }
    `
];
Fn([
  a({ type: Boolean, reflect: !0 })
], _i.prototype, "disabled", 2);
Fn([
  a({ type: Boolean, reflect: !0 })
], _i.prototype, "readonly", 2);
_i = Fn([
  d("uui-radio-group")
], _i);
class ot extends S {
  static {
    this.INPUT = "input";
  }
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var Tf = Object.defineProperty, Nf = Object.getOwnPropertyDescriptor, Mu = (e) => {
  throw TypeError(e);
}, T = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Nf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Tf(t, i, r), r;
}, Du = (e, t, i) => t.has(e) || Mu("Cannot " + i), Vf = (e, t, i) => (Du(e, t, "read from private field"), i ? i.call(e) : t.get(e)), al = (e, t, i) => t.has(e) ? Mu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Kt = (e, t, i) => (Du(e, t, "access private method"), i), st, It, cn;
const Ps = {
  TOP: 3,
  CENTER: 2
}, ji = 18, ni = 3, qe = 12, Bf = 24, Ss = (e) => {
  const t = e.toString().indexOf(".");
  return t >= 0 ? e.toString().length - t - 1 : 0;
};
let M = class extends Le(v, "") {
  /** Constructor and Validator */
  constructor() {
    super(), al(this, st), this.disabled = !1, this.readonly = !1, this._min = 0, this._max = 0, this.hideStepValues = !1, this._step = 1, this._movement = !1, this.startPoint = {
      mouse: 0,
      low: 0,
      high: 0
    }, this._lowInputValue = 0, this._highInputValue = 0, this._trackWidth = 0, this._lowValuePercentStart = 0, this._highValuePercentEnd = 100, al(this, cn, (e) => {
      e.key == "Enter" && this.submit();
    }), this._onTouchStart = (e) => {
      if (this.disabled) return;
      const t = e.composedPath()[0];
      if (t !== this._outerTrack)
        if (t === this._innerColor || t === this._innerColorThumb)
          window.addEventListener("touchend", this._onTouchEnd), window.addEventListener("touchcancel", this._onTouchEnd), window.addEventListener("touchmove", this._onTouchMove), this._movement = !0, this._saveStartPoints(e.touches[0].pageX);
        else {
          const i = this._getClickedValue(e.touches[0].pageX), o = Math.abs(this._lowInputValue - i), r = Math.abs(this._highInputValue - i);
          o < r ? this.setValueLow(i) : this.setValueHigh(i);
        }
    }, this._onTouchMove = (e) => {
      this._dragBothValuesByMousePos(e.touches[0].pageX);
    }, this._onTouchEnd = () => {
      this._movement = !1, this.onChanged(), window.removeEventListener("touchend", this._onTouchEnd), window.removeEventListener("touchcancel", this._onTouchEnd), window.removeEventListener("touchmove", this._onTouchMove);
    }, this._onMouseDown = (e) => {
      if (this.disabled || this.readonly) return;
      const t = e.composedPath()[0];
      if (t !== this._outerTrack)
        if (t === this._innerColor || t === this._innerColorThumb)
          window.addEventListener("mouseup", this._onMouseUp), window.addEventListener("mousemove", this._onMouseMove), this._movement = !0, this._saveStartPoints(e.pageX);
        else {
          const i = this._getClickedValue(e.pageX), o = Math.abs(this._lowInputValue - i), r = Math.abs(this._highInputValue - i);
          o < r ? this.setValueLow(i) : this.setValueHigh(i);
        }
    }, this._onMouseMove = (e) => {
      e.preventDefault(), this._dragBothValuesByMousePos(e.pageX);
    }, this._onMouseUp = () => {
      this._movement = !1, this.onChanged(), window.removeEventListener("mouseup", this._onMouseUp), window.removeEventListener("mousemove", this._onMouseMove);
    }, this.addEventListener("keydown", Vf(this, cn)), this.addEventListener("mousedown", this._onMouseDown), this.addEventListener("touchstart", this._onTouchStart), window.addEventListener("resize", () => {
      this._trackWidth = this._outerTrack?.offsetWidth;
    });
  }
  get min() {
    return this._min;
  }
  set min(e) {
    this._min = e, Kt(this, st, It).call(this);
  }
  get max() {
    return this._max;
  }
  set max(e) {
    this._max = e, Kt(this, st, It).call(this);
  }
  get step() {
    return this._step;
  }
  set step(e) {
    this._step = e, Kt(this, st, It).call(this);
  }
  get minGap() {
    return this._minGap;
  }
  set minGap(e) {
    this._minGap = e, Kt(this, st, It).call(this);
  }
  get maxGap() {
    return this._maxGap;
  }
  set maxGap(e) {
    this._maxGap = e, Kt(this, st, It).call(this);
  }
  get value() {
    return super.value;
  }
  set value(e) {
    super.value = e, Kt(this, st, It).call(this);
  }
  setValueLow(e) {
    e = A(
      e,
      this.maxGap ? this._highInputValue - this.maxGap > this.min ? this._highInputValue - this.maxGap : this.min : this.min,
      this.minGap ? this._highInputValue - this.minGap : this._highInputValue - this.step
    ), this.setValue(e, this._highInputValue);
  }
  setValueHigh(e) {
    e = A(
      e,
      this.minGap ? this._lowInputValue + this.minGap : this._lowInputValue + this.step,
      this.maxGap ? this.maxGap + this._lowInputValue < this.max ? this.maxGap + this._lowInputValue : this.max : this.max
    ), this.setValue(this._lowInputValue, e);
  }
  setValue(e, t, i) {
    if (i) {
      const o = this.startPoint.high - this.startPoint.low;
      e = A(e, this.min, this.max - o), t = A(t, this.min + o, this.max);
    }
    this._inputLow.value = e.toString(), this._inputHigh.value = t.toString(), this.value = `${e},${t}`;
  }
  getFormElement() {
    return this._currentFocus ? this._currentFocus : this._inputLow;
  }
  async focus() {
    await this.updateComplete, this.getFormElement().focus();
  }
  async blur() {
    await this.updateComplete, this.getFormElement().blur();
  }
  connectedCallback() {
    super.connectedCallback(), this.value || (this.value = `${this._min},${this._max}`);
  }
  firstUpdated(e) {
    super.updated(e), this._trackWidth = this._outerTrack.offsetWidth, this._runPropertiesChecks();
  }
  _runPropertiesChecks() {
    if (new RegExp(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/).test(this.value) || console.error("Range slider (Value error occurred): Bad input"), this._highInputValue === this._lowInputValue && console.error(
      "Range slider (Value error occurred): Low-end and high-end value should never be equal. Use <uui-slider></uui-slider> instead."
    ), this._lowInputValue > this._highInputValue && console.error(
      "Range slider (Value error occurred): Low-end value should never be higher than high-end value."
    ), (this._highInputValue > this._max || this._highInputValue < this._min) && (this.setValueHigh(this._max), console.warn(
      `Conflict with the high-end value and max value. High-end value has been converted to the max value (${this._max})`
    )), (this._lowInputValue < this._min || this._lowInputValue > this._max) && (this.setValueLow(this._min), console.warn(
      `Conflict with the low-end value and min value. Low-end value has been converted to the min value (${this._min})`
    )), this._step <= 0 && (this._step = 1, console.warn(
      "Property step needs a value higher than 0. Converted the step value to 1 (default)"
    )), (this._max - this._min) / this._step % 1 !== 0 && console.error(
      "Conflict with step value and the min and max values. May experience bad side effects"
    ), this._minGap && this._minGap < this._step && (this._minGap = void 0, console.warn(
      "Conflict with min-gap and step value. The min-gap needs to be higher than the step value. Removed the min-gap property."
    )), this._minGap && this._maxGap && this._minGap > this._maxGap && (this._minGap = void 0, this._maxGap = void 0, console.warn(
      "Conflict with min-gap and max-gap. Removed the min-gap and max-gap properties."
    )), this._minGap && this._max - this._min < this._minGap && (this._minGap = void 0, console.warn(
      "Conflict with the min-gap and the total range. Removed the min-gap."
    )), this._maxGap && this._highInputValue - this._lowInputValue > this._maxGap && (this.setValueHigh(this._lowInputValue + this._maxGap), console.warn(
      `Conflict with value and max-gap. High-end value has been converted to the highest possible value based on the low-end value and the max gap value (${this._highInputValue})`
    )), this._minGap && this._highInputValue - this._lowInputValue < this._minGap) {
      const t = this._minGap;
      this._highInputValue - t < this._min ? (this.setValueHigh(this._lowInputValue + t), console.warn(
        `Conflict with value and min gap. High-end value has been converted to the lowest possible value based on the low-end value and the min gap value (${this._highInputValue}).`
      )) : (this.setValueLow(this._highInputValue - t), console.warn(
        `Conflict with value and min gap. Low-end value has been converted to the highest possible value based on the high-end value and the min gap value (${this._lowInputValue}).`
      ));
    }
  }
  _updateInnerColor() {
    const e = this._max - this._min, t = this._lowInputValue - this._min, i = this._highInputValue - this._min, o = t / e * 100, r = 100 - i / e * 100;
    this._lowValuePercentStart = A(o, 0, 100), this._highValuePercentEnd = A(r, 0, 100);
  }
  _getClickedValue(e) {
    const t = this._outerTrack.getBoundingClientRect().left, r = (e - t - qe) / (this._trackWidth - qe * 2) * (this._max - this._min) + this._min;
    return Math.round(r / this._step) * this._step;
  }
  /** Drag both thumbs logics */
  _saveStartPoints(e) {
    this.startPoint = {
      mouse: e,
      low: this._lowInputValue,
      high: this._highInputValue
    };
  }
  _dragBothValuesByMousePos(e) {
    const t = this._outerTrack.offsetWidth, i = e - this.startPoint.mouse, o = this._max - this._min, r = i / (t + qe * 2), s = Math.round(r * o / this._step) * this._step, n = this.startPoint.low + s, u = this.startPoint.high + s;
    this.setValue(n, u, !0), this.dispatchEvent(new ot(ot.INPUT));
  }
  /** Input Events */
  _onLowInput(e) {
    this.disabled && e.preventDefault(), this.readonly && e.preventDefault(), this._currentFocus = this._inputLow;
    const t = Number(e.target.value);
    this.setValueLow(t), this.dispatchEvent(new ot(ot.INPUT));
  }
  _onHighInput(e) {
    this.disabled && e.preventDefault(), this.readonly && e.preventDefault(), this._currentFocus = this._inputHigh;
    const t = Number(e.target.value);
    this.setValueHigh(t), this.dispatchEvent(new ot(ot.INPUT));
  }
  /** Change Events */
  _onLowChange() {
    this.setValueLow(Number(this._inputLow.value)), this.onChanged();
  }
  _onHighChange() {
    this.setValueHigh(Number(this._inputHigh.value)), this.onChanged();
  }
  onChanged() {
    this.pristine = !1, this.dispatchEvent(new ot(ot.CHANGE));
  }
  /** Render */
  render() {
    return l`
      <div id="range-slider">
        ${this._renderNativeInputs()}
        <div id="inner-track">
          <div
            id="inner-color-thumb"
            class="${this._movement ? "active" : ""}"
            style="left: ${this._lowValuePercentStart}%; right: ${this._highValuePercentEnd}%">
            ${this._renderThumbValues()}
            <div class="${this._movement ? "color active" : "color"}"></div>
          </div>
          ${this._renderSteps()}
        </div>
      </div>
    `;
  }
  _renderThumbValues() {
    return l`<div class="thumb-values">
      <span
        ><span
          >${this._lowInputValue.toFixed(Ss(this._step))}</span
        ></span
      >
      <span
        ><span
          >${this._highInputValue.toFixed(Ss(this._step))}</span
        ></span
      >
    </div>`;
  }
  _renderSteps() {
    const e = (this._max - this._min) / this._step, t = (this._trackWidth - qe * 2) / e;
    if (t < Bf || e % 1 !== 0) return;
    let i = 0;
    const o = new Array(e + 1).fill(t).map((r) => r * i++);
    return l`<div class="step-wrapper">
      <svg height="100%" width="100%">
        <rect x="9" y="9" height="${ni}" rx="2" />
        ${this._renderStepCircles(o)}
      </svg>
      ${this._renderStepValues(e)}
    </div>`;
  }
  _renderStepValues(e) {
    if (this.hideStepValues || e > 20) return;
    let t = 0;
    const i = new Array(e + 1).fill(this._step).map(
      (o) => (this._min + o * t++).toFixed(Ss(this._step))
    );
    return l`<div class="step-values">
      ${i.map((o) => l`<span><span>${o}</span></span>`)}
    </div>`;
  }
  _renderStepCircles(e) {
    const t = this._trackWidth / (this._max - this._min);
    return b`${e.map((i) => {
      const o = i + qe, r = this._lowInputValue - this._min, s = this._highInputValue - this._min;
      return o / t >= r && o / t <= s ? b`<circle class="track-step filled" cx="${o}" cy="${ni * 2}" r="4.5" />` : b`<circle class="track-step regular" cx="${o}" cy="${ni * 2}" r="4.5" />`;
    })}`;
  }
  _renderNativeInputs() {
    return l` <div class="native-wrapper">
      <input
        id="inputLow"
        class="${this._movement ? "focus" : ""}"
        type="range"
        min=${this._min}
        max=${this._max}
        step=${this._step}
        .value=${this._lowInputValue.toString()}
        aria-label="${this.label} low-end value"
        ?disabled="${this.disabled || this.readonly}"
        @input=${this._onLowInput}
        @change=${this._onLowChange} />
      <input
        id="inputHigh"
        class="${this._movement ? "focus" : ""}"
        type="range"
        min="${this._min}"
        max="${this._max}"
        step="${this._step}"
        .value=${this._highInputValue.toString()}
        aria-label="${this.label} high-end value"
        ?disabled="${this.disabled || this.readonly}"
        @input=${this._onHighInput}
        @change=${this._onHighChange} />
    </div>`;
  }
};
st = /* @__PURE__ */ new WeakSet();
It = function() {
  const e = this.value.split(",");
  let t = Number(e[0]) || 0, i = Number(e[1]) || 0;
  i = A(i, this._min, this._max), t = this._min + Math.round((t - this._min) / this._step) * this._step, i = this._min + Math.round((i - this._min) / this._step) * this._step, this._lowInputValue = A(
    t,
    this._min,
    this._minGap ? i - this._minGap : i - this._step
  ), this._highInputValue = A(
    i,
    this._minGap ? this._lowInputValue + this._minGap : this._lowInputValue + this._step,
    Math.min(this._maxGap ? t + this._maxGap : this._max, this._max)
  ), this._updateInnerColor(), this.requestUpdate();
};
cn = /* @__PURE__ */ new WeakMap();
M.formAssociated = !0;
M.styles = [
  p`
      :host {
        --color-interactive: var(--uui-color-selected,#3544b1);
        --color-hover: var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
        --color-focus: var(--uui-color-focus,#3879ff);
        min-height: 30px;
      }

      :host([error]) {
        --color-interactive: var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
        --color-hover: var(--uui-color-invalid,#d42054);
      }

      #range-slider {
        min-height: 30px;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
      }

      /** Track */

      #inner-track {
        user-select: none;
        background-color: var(--uui-color-border-standalone,#c2c2c2);
        position: absolute;
        height: 3px;
        left: ${qe}px; /* Match TRACK_MARGIN */
        right: ${qe}px; /* Match TRACK_MARGIN */
      }

      :host(:not([disabled]):hover) #inner-track,
      :host(:not([disabled]):active) #inner-track {
        background-color: var(--uui-color-border-emphasis,#a1a1a1);
      }

      #inner-color-thumb {
        margin: -9px 0 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: ${ji}px;
        cursor: grab;
        user-select: none;
        z-index: ${Ps.CENTER};
      }

      :host([disabled]) #inner-color-thumb,
      :host([readonly]) #inner-color-thumb {
        cursor: default;
      }

      /** Colored part of track */

      :host([disabled]) #range-slider #inner-color-thumb .color {
        background-color: var(--uui-palette-mine-grey,#3e3e3e) !important;
      }

      #inner-color-thumb:focus .color {
        background-color: var(--color-focus);
      }

      #inner-color-thumb:hover .color,
      #inner-color-thumb .color.active {
        background-color: var(--color-hover);
      }

      :host(:not([readonly])) #inner-color-thumb:hover .color {
        height: ${ni * 2}px;
        background-color: var(--color-hover);
        transform: translateY(-${ni / 2}px);
      }

      .color {
        user-select: none;
        position: absolute;
        inset-inline: 0;
        height: ${ni}px;
        top: 50%;
        transform: translateY(0);
        background-color: var(--color-interactive);
        transition: height 60ms;
      }

      :host([error]) .color {
        background-color: var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
      }
      :host([error]) #inner-color-thumb:hover ~ .color,
      :host([error]) #inner-color-thumb:focus ~ .color {
        background-color: var(--uui-color-invalid-emphasis,rgb(
    226,
    60,
    107
  ));
      }

      /** Steps */
      .step-wrapper {
        margin: 0 ${-1 * qe}px;
        height: 11px;
        position: absolute;
        left: 0;
        right: 0;
        top: -10px;
      }

      /** Step circles */
      .track-step {
        fill: var(--uui-color-border,#d8d7d9);
      }

      :host(:not([disabled]):hover) #inner-track .track-step.regular,
      :host(:not([disabled]):active) #inner-track .track-step.regular {
        fill: var(--uui-color-border-emphasis,#a1a1a1);
      }

      :host .track-step.filled {
        fill: var(--color-interactive);
      }

      :host([error]) .track-step.filled {
        fill: var(--uui-color-invalid-emphasis,rgb(
    226,
    60,
    107
  ));
      }

      :host #inner-color-thumb.active ~ .step-wrapper .track-step.filled,
      :host #inner-color-thumb:hover ~ .step-wrapper .track-step.filled {
        fill: var(--color-hover);
      }

      :host([disabled]) #range-slider .track-step.filled {
        fill: var(--uui-palette-mine-grey,#3e3e3e) !important;
      }

      /** Step values */

      .step-values {
        box-sizing: border-box;
        margin: 0 ${qe}px; /* Match TRACK_MARGIN */
        display: flex;
        justify-content: space-between;
        font-size: var(--uui-type-small-size,12px);
      }

      .step-values > span {
        position: relative;
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }

      .step-values > span > span {
        position: absolute;
        transform: translateX(-50%);
      }

      /** Input */

      .native-wrapper {
        position: relative;
        width: 100%;
        inset-inline: 0px;
        margin: -22px 5px 0 1px;
      }

      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        pointer-events: none;
        position: absolute;
        cursor: pointer;
        background-color: transparent;
        inset-inline: 0;
        width: 100%;
        border-radius: 20px;
      }

      input:focus-within {
        outline: none;
      }

      /** Thumb values */
      .thumb-values {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        color: var(--color-interactive);
        font-weight: bold;
        transition: 120ms opacity;
        opacity: 0;
      }

      .thumb-values > span {
        width: 0;
      }

      .thumb-values > span > span {
        bottom: 15px;
        position: absolute;
        transform: translateX(-50%);
      }

      :host([disabled]) .thumb-values {
        color: var(--uui-palette-mine-grey,#3e3e3e);
      }

      :host([readonly]) .thumb-values {
        opacity: 1;
      }

      #range-slider:hover .thumb-values {
        opacity: 1;
      }

      /** Native thumbs */
      /** Chrome */
      input::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: all;
        cursor: grab;
        position: relative;
        z-index: ${Ps.TOP};
        width: ${ji}px;
        height: ${ji}px;
        border-radius: 24px;
        border: none;
        background-color: var(--color-interactive);
        overflow: visible;
        box-shadow:
          inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface,#fff);
      }

      :host([disabled]) input::-webkit-slider-thumb,
      :host([readonly]) input::-webkit-slider-thumb {
        cursor: default;
      }

      input:focus-within::-webkit-slider-thumb,
      input.focus::-webkit-slider-thumb {
        background-color: var(--color-focus);
        box-shadow:
          inset 0 0 0 2px var(--color-focus),
          inset 0 0 0 4px var(--uui-color-surface,#fff),
          0 0 0 2px var(--color-focus);
      }
      input::-webkit-slider-thumb:hover {
        background-color: var(--color-hover);
        box-shadow:
          inset 0 0 0 2px var(--color-hover),
          inset 0 0 0 4px var(--uui-color-surface,#fff);
      }

      :host([disabled]) #range-slider input::-webkit-slider-thumb {
        background-color: var(--uui-palette-mine-grey,#3e3e3e);
        box-shadow:
          inset 0 0 0 2px var(--uui-palette-mine-grey,#3e3e3e),
          inset 0 0 0 4px var(--uui-color-surface,#fff);
      }

      /** Mozilla */

      input::-moz-range-thumb {
        -moz-appearance: none;
        pointer-events: all;
        cursor: grab;
        position: relative;
        z-index: ${Ps.TOP};
        width: ${ji}px;
        height: ${ji}px;
        border-radius: 24px;
        border: none;
        background-color: var(--color-interactive);
        overflow: visible;
        box-shadow:
          inset 0 0 0 2px var(--color-interactive),
          inset 0 0 0 4px var(--uui-color-surface,#fff);
      }
      :host([disabled]) input::-moz-range-thumb,
      :host([readonly]) input::-moz-range-thumb {
        cursor: default;
      }

      input:focus-within::-moz-range-thumb,
      input.focus::-moz-range-thumb {
        background-color: var(--color-focus);
        box-shadow:
          inset 0 0 0 2px var(--color-focus),
          inset 0 0 0 4px var(--uui-color-surface,#fff),
          0 0 0 2px var(--color-focus);
      }
      input::-moz-range-thumb:hover {
        background-color: var(--color-hover);
        box-shadow:
          inset 0 0 0 2px var(--color-hover),
          inset 0 0 0 4px var(--uui-color-surface,#fff);
      }

      :host([disabled]) #range-slider input::-moz-range-thumb {
        background-color: var(--uui-palette-mine-grey,#3e3e3e);
        box-shadow:
          inset 0 0 0 2px var(--uui-palette-mine-grey,#3e3e3e),
          inset 0 0 0 4px var(--uui-color-surface,#fff);
      }
    `
];
T([
  a({ type: String })
], M.prototype, "label", 2);
T([
  a({ type: Boolean, reflect: !0 })
], M.prototype, "disabled", 2);
T([
  a({ type: Boolean, reflect: !0 })
], M.prototype, "readonly", 2);
T([
  a({ type: Number })
], M.prototype, "min", 1);
T([
  a({ type: Number })
], M.prototype, "max", 1);
T([
  a({ type: Boolean, attribute: "hide-step-values" })
], M.prototype, "hideStepValues", 2);
T([
  a({ type: Number })
], M.prototype, "step", 1);
T([
  a({ type: Number, attribute: "min-gap" })
], M.prototype, "minGap", 1);
T([
  a({ type: Number, attribute: "max-gap" })
], M.prototype, "maxGap", 1);
T([
  a({ type: String })
], M.prototype, "value", 1);
T([
  g()
], M.prototype, "_movement", 2);
T([
  g()
], M.prototype, "_lowInputValue", 2);
T([
  g()
], M.prototype, "_highInputValue", 2);
T([
  g()
], M.prototype, "_trackWidth", 2);
T([
  g()
], M.prototype, "_lowValuePercentStart", 2);
T([
  g()
], M.prototype, "_highValuePercentEnd", 2);
T([
  P("#range-slider")
], M.prototype, "_outerTrack", 2);
T([
  P("#inputLow")
], M.prototype, "_inputLow", 2);
T([
  P("#inputHigh")
], M.prototype, "_inputHigh", 2);
T([
  P(".color")
], M.prototype, "_innerColor", 2);
T([
  P("#inner-color-thumb")
], M.prototype, "_innerColorThumb", 2);
M = T([
  d("uui-range-slider")
], M);
var Hf = Object.getOwnPropertyDescriptor, jf = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Hf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let hn = class extends v {
  render() {
    return l`<slot></slot>`;
  }
};
hn.styles = [
  p`
      :host {
        display: block;
      }

      ::slotted(*:not(:first-child)) {
        margin-top: 1px;
      }
      ::slotted(*:not(:first-child))::before {
        content: '';
        position: absolute;
        top: -1px;
        left: 0;
        right: 0;
        border-top: 1px solid var(--uui-color-border,#d8d7d9);
      }
    `
];
hn = jf([
  d("uui-ref-list")
], hn);
class jr extends S {
  static {
    this.OPEN = "open";
  }
}
var Rf = Object.defineProperty, Ff = Object.getOwnPropertyDescriptor, ss = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ff(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Rf(t, i, r), r;
};
let ft = class extends Xo(
  ki(v)
) {
  constructor() {
    super(...arguments), this.disabled = !1, this.readonly = !1, this.error = !1;
  }
  handleOpenClick(e) {
    e.stopPropagation(), this.dispatchEvent(new jr(jr.OPEN));
  }
  handleOpenKeydown(e) {
    e.key !== " " && e.key !== "Enter" || (e.preventDefault(), e.stopPropagation(), this.dispatchEvent(new jr(jr.OPEN)));
  }
};
ft.styles = [
  p`
      :host {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: var(--uui-font-size);

        box-sizing: border-box;
        border-radius: var(--uui-border-radius,3px);
        background-color: var(--uui-color-surface,#fff);
        --uui-card-before-opacity: 0;
        transition: --uui-card-before-opacity 120ms;
      }

      :host([selectable]:focus-visible) {
        outline-color: var(--uui-color-focus,#3879ff);
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
      }

      :host([error]) {
        border: 2px solid var(--uui-color-invalid,#d42054);
        box-shadow:
          0 0 4px 0 var(--uui-color-invalid,#d42054),
          inset 0 0 2px 0 var(--uui-color-invalid,#d42054);
      }

      :host([standalone]) {
        border: 1px solid var(--uui-color-border,#d8d7d9);
      }

      :host([selectable]) {
        cursor: pointer;
      }
      :host([selectable]) #select-border {
        position: absolute;
        z-index: 2;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host([selectable]) #select-border::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid var(--uui-color-selected,#3544b1);
        border-radius: calc(var(--uui-border-radius,3px) + 2px);
        box-shadow:
          0 0 4px 0 var(--uui-color-selected,#3544b1),
          inset 0 0 2px 0 var(--uui-color-selected,#3544b1);
      }
      :host([selected]) #select-border {
        opacity: 1;
      }
      :host([selectable]:not([selected]):hover) #select-border {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover) #select-border {
        opacity: 0.8;
      }

      :host([selectable]:not([selected])) #open-part:hover + #select-border {
        opacity: 0;
      }
      :host([selectable][selected]) #open-part:hover + #select-border {
        opacity: 1;
      }

      :host([selectable]:not([selected]):hover) #select-border::after {
        animation: not-selected--hover 1.2s infinite;
      }
      @keyframes not-selected--hover {
        0%,
        100% {
          opacity: 0.66;
        }
        50% {
          opacity: 1;
        }
      }

      :host([selectable][selected]:hover) #select-border::after {
        animation: selected--hover 1.4s infinite;
      }
      @keyframes selected--hover {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.66;
        }
      }
      :host([selectable]) #open-part:hover + #select-border::after {
        animation: none;
      }

      :host([select-only]) *,
      :host([select-only]) ::slotted(*) {
        pointer-events: none;
      }

      button {
        font-size: inherit;
        font-family: inherit;
        border: 0;
        padding: 0;
        background-color: transparent;
        text-align: left;
        color: var(--uui-color-text,#060606);
      }
      a {
        text-decoration: none;
        color: inherit;
      }

      button:focus,
      a:focus {
        outline-color: var(--uui-color-focus,#3879ff);
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
        border-radius: var(--uui-border-radius,3px);
      }

      slot[name='actions'] {
        display: flex;
        align-items: center;
        --uui-button-height: calc(var(--uui-size-2,6px) * 4);
        margin-right: var(--uui-size-2,6px);
      }
      #tag-container {
        margin: calc(var(--uui-size-2,6px));
      }
      #actions-container {
        margin: calc(var(--uui-size-2,6px));
        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:hover) #actions-container,
      :host(:focus) #actions-container,
      :host(:focus-within) #actions-container {
        opacity: 1;
      }

      :host([standalone]:not([disabled]):hover) {
        border-color: var(--uui-color-border-emphasis,#a1a1a1);
      }

      :host([disabled]) #open-part {
        cursor: default;
      }

      :host([standalone][disabled]) {
        border-color: var(--uui-color-disabled-standalone,rgb(
    226,
    226,
    226
  ));
      }

      slot[name='tag'] {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    `
];
ss([
  a({ type: Boolean, reflect: !0 })
], ft.prototype, "disabled", 2);
ss([
  a({ type: Boolean, reflect: !0 })
], ft.prototype, "readonly", 2);
ss([
  a({ type: Boolean, reflect: !0 })
], ft.prototype, "error", 2);
ft = ss([
  d("uui-ref")
], ft);
var Wf = Object.defineProperty, Gf = Object.getOwnPropertyDescriptor, Lu = (e) => {
  throw TypeError(e);
}, jt = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Gf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Wf(t, i, r), r;
}, qf = (e, t, i) => t.has(e) || Lu("Cannot " + i), Kf = (e, t, i) => t.has(e) ? Lu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), lt = (e, t, i) => (qf(e, t, "access private method"), i), Ue, Tu, Nu, ns, Vu, Bu, Hu;
let V = class extends ft {
  constructor() {
    super(...arguments), Kf(this, Ue), this.name = "", this.detail = "", this._iconSlotHasContent = !1, this.fallbackIcon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    id="icon">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>`;
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-icon");
  }
  renderDetail() {
    return l`<small id="detail"
      >${this.detail}<slot name="detail"></slot
    ></small>`;
  }
  render() {
    return l`
      ${lt(this, Ue, Hu).call(this)}
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>

      <slot></slot>
      <slot name="tag" id="tag-container"></slot>
      <slot name="actions" id="actions-container"></slot>
    `;
  }
};
Ue = /* @__PURE__ */ new WeakSet();
Tu = function(e) {
  this._iconSlotHasContent = e.target.assignedNodes({ flatten: !0 }).length > 0;
};
Nu = function() {
  return l`<uui-icon .svg="${this.fallbackIcon}"></uui-icon>`;
};
ns = function() {
  return l`
      <span id="content" class="uui-text">
        <span id="icon">
          <slot name="icon" @slotchange=${lt(this, Ue, Tu)}></slot>
          ${this._iconSlotHasContent === !1 ? lt(this, Ue, Nu).call(this) : ""}
        </span>
        <div id="info">
          <div id="name">${this.name}<slot name="name"></slot></div>
          ${this.renderDetail()}
        </div>
      </span>
    `;
};
Vu = function() {
  return l`<a
      id="open-part"
      class="uui-text"
      tabindex=${this.disabled ? k : "0"}
      href=${_(this.disabled ? void 0 : this.href)}
      target=${_(this.target || void 0)}
      rel=${_(
    this.rel || _(
      this.target === "_blank" ? "noopener noreferrer" : void 0
    )
  )}>
      ${lt(this, Ue, ns).call(this)}
    </a>`;
};
Bu = function() {
  return l`
      <button
        type="button"
        id="open-part"
        class="uui-text"
        tabindex="0"
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}
        ?disabled=${this.disabled}>
        ${lt(this, Ue, ns).call(this)}
      </button>
    `;
};
Hu = function() {
  return this.readonly ? l`${lt(this, Ue, ns).call(this)}` : this.href ? lt(this, Ue, Vu).call(this) : lt(this, Ue, Bu).call(this);
};
V.styles = [
  ...ft.styles,
  p`
      :host {
        min-width: 250px;
        padding: 1px;
      }

      #content {
        display: flex;
        flex-grow: 1;
        align-items: center;
        line-height: 1.2em;
        padding: calc(var(--uui-size-3,9px));
      }

      #open-part {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
        display: flex;
        flex-grow: 1;
      }

      #icon {
        font-size: 1.2em;
        margin-right: var(--uui-size-1,3px);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #info {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        height: 100%;
        padding-left: var(--uui-size-2,6px);
        margin-top: 1px;
      }

      #detail {
        opacity: 0.6;
        line-height: 1.2em;
      }

      :host([selectable]) #open-part {
        flex-grow: 0;
        padding: 0;
        margin: calc(var(--uui-size-2,6px));

        #content {
          padding: 0;
        }
      }

      :host(:not([disabled])) #open-part:hover #icon {
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }
      :host(:not([disabled])) #open-part:hover #name {
        text-decoration: underline;
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }
      :host(:not([disabled])) #open-part:hover #detail {
        color: var(--uui-color-interactive-emphasis,#3544b1);
      }

      :host([disabled]) #icon {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }
      :host([disabled]) #name {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }
      :host([disabled]) #detail {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }
    `
];
jt([
  a({ type: String })
], V.prototype, "name", 2);
jt([
  a({ type: String })
], V.prototype, "detail", 2);
jt([
  a({ type: String })
], V.prototype, "href", 2);
jt([
  a({ type: String })
], V.prototype, "target", 2);
jt([
  a({ type: String })
], V.prototype, "rel", 2);
jt([
  g()
], V.prototype, "_iconSlotHasContent", 2);
V = jt([
  d("uui-ref-node")
], V);
var Xf = Object.defineProperty, Yf = Object.getOwnPropertyDescriptor, ju = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Yf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Xf(t, i, r), r;
};
let Uo = class extends V {
  constructor() {
    super(...arguments), this.fallbackIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.212 397.267l106.052-48.024L398.479 199.03l-26.405-26.442-90.519 90.517-15.843-15.891 90.484-90.486-16.204-16.217-150.246 150.243-47.534 106.513zm74.904-100.739l23.285-23.283 3.353 22.221 22.008 3.124-23.283 23.313-46.176 20.991 20.813-46.366zm257.6-173.71L416.188 64.3l-49.755 49.785 58.504 58.503 49.779-49.77zM357.357 300.227h82.826v116.445H68.929V300.227h88.719v-30.648H38.288v177.733h432.537V269.578H357.357v30.649z"></path></svg>', this.alias = "";
  }
  renderDetail() {
    const e = [];
    return this.alias !== "" && e.push(this.alias), this.detail !== "" && e.push(this.detail), l`<small id="detail"
      >${e.join(" | ")}<slot name="detail"></slot
    ></small>`;
  }
};
Uo.styles = [...V.styles];
ju([
  a({ type: String })
], Uo.prototype, "alias", 2);
Uo = ju([
  d("uui-ref-node-data-type")
], Uo);
var Zf = Object.defineProperty, Qf = Object.getOwnPropertyDescriptor, Ru = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Qf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Zf(t, i, r), r;
};
let zo = class extends V {
  constructor() {
    super(...arguments), this.fallbackIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M49.035 60.434h413.93v33.592H49.035zm0 82.005h86.578v86.577H49.035zm163.677 0h86.576v86.577h-86.576zm163.676 0h86.576v86.577h-86.576zM49.035 282.984h413.93v33.593H49.035zm0 82.006h86.578v86.576H49.035zm163.677 0h86.576v86.576h-86.576zm163.676 0h86.576v86.576h-86.576z"></path></svg>', this.alias = "";
  }
  renderDetail() {
    const e = [];
    return this.alias !== "" && e.push(this.alias), this.detail !== "" && e.push(this.detail), l`<small id="detail"
      >${e.join(" | ")}<slot name="detail"></slot
    ></small>`;
  }
};
zo.styles = [...V.styles];
Ru([
  a({ type: String })
], zo.prototype, "alias", 2);
zo = Ru([
  d("uui-ref-node-document-type")
], zo);
var Jf = Object.getOwnPropertyDescriptor, eb = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Jf(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let dn = class extends V {
  constructor() {
    super(...arguments), this.fallbackIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M444.72 215.28H67.28c-11.04 0-20-8.96-20-20V64.896c0-11.04 8.96-20 20-20h377.44c11.04 0 20 8.96 20 20V195.28c0 11.056-8.96 20-20 20zm-357.44-40h337.44V84.896H87.28v90.384zm185.504 215.696c0-6.848.704-13.504 1.936-20H87.28v-90.384h337.44v12.496a108.098 108.098 0 0140 31.36v-63.856c0-11.04-8.96-20-20-20H67.28c-11.04 0-20 8.96-20 20v130.384c0 11.04 8.96 20 20 20h207.44c-1.232-6.496-1.936-13.152-1.936-20zm107.552-76.128c-41.968 0-76.112 34.16-76.112 76.128s34.144 76.128 76.112 76.128 76.128-34.16 76.128-76.128-34.144-76.128-76.128-76.128zm46.016 80.464a7.293 7.293 0 01-7.296 7.296h-27.072v27.088a7.293 7.293 0 01-7.296 7.296H376a7.293 7.293 0 01-7.296-7.296v-27.088h-27.072a7.293 7.293 0 01-7.296-7.296v-8.672a7.293 7.293 0 017.296-7.296h27.072v-27.088A7.293 7.293 0 01376 344.96h8.688a7.293 7.293 0 017.296 7.296v27.088h27.072a7.293 7.293 0 017.296 7.296v8.672z"></path></svg>';
  }
};
dn.styles = [...V.styles];
dn = eb([
  d("uui-ref-node-form")
], dn);
var tb = Object.defineProperty, ib = Object.getOwnPropertyDescriptor, Fu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ib(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && tb(t, i, r), r;
};
let Mo = class extends V {
  constructor() {
    super(...arguments), this.fallbackIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M331.135 98.375c3.677 14.798 4.045 16.031 3.702 31.225-.138 5.855-3.5 32.936-2.586 41.242.751 6.851 2.46 7.395 5.162 13.041 4.705 9.824 3.13 23.376 1.325 33.282-.988 5.42-3.076 13.136-6.248 17.561-3.497 4.876-10.498 4.913-13.592 10.602-4.459 8.195-1.941 19.692-4.752 28.54-3.193 10.033-11.325 10.738-11.938 23.867 3.986.562 7.962 1.134 11.938 1.703 3.99 8.484 11.297 25.552 18.759 30.688 6.25 1.705 12.505 3.411 18.752 5.113 21.907 8.982 46.251 19.732 68.204 28.987 19.991 8.434 43.927 11.439 51.151 32.396 0 14.229 1.343 47.849.976 66.497H36.514c-.367-18.648.974-52.268.974-66.497 7.226-20.957 31.16-23.963 51.151-32.396 21.953-9.255 46.297-20.005 68.201-28.987 6.25-1.702 12.506-3.408 18.754-5.113 7.461-5.136 14.77-22.203 18.76-30.688l8.877-2.158c-2.017-11.206-8.954-12.078-11.845-20.01a91882.59 91882.59 0 00-3.408-35.806c.055.563-8.163-1.497-9.238-2.171-11.58-7.256-11.816-36.723-12.931-48.978-.508-5.603 7.283-10.193 5.118-20.465-12.69-60.138 5.486-88.282 34.229-97.614 19.95-8.083 57.198-23.074 91.941-1.703l8.621 7.991 13.952 2.405c7 4.041 11.465 17.446 11.465 17.446z"></path></svg>', this.groupName = "";
  }
  renderDetail() {
    const e = [];
    return this.detail !== "" && e.push(this.detail), this.groupName !== "" && e.push(this.groupName), l`<small id="detail"
      >${e.join(" | ")}<slot name="detail"></slot
    ></small>`;
  }
};
Mo.styles = [...V.styles];
Fu([
  a({ type: String, attribute: "group-name" })
], Mo.prototype, "groupName", 2);
Mo = Fu([
  d("uui-ref-node-member")
], Mo);
var rb = Object.defineProperty, ob = Object.getOwnPropertyDescriptor, Xn = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ob(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && rb(t, i, r), r;
};
let vr = class extends V {
  constructor() {
    super(...arguments), this.fallbackIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M161.08 106.29l-70.073 40.452 165.498 95.545 70.076-40.453L161.08 106.29zm259.851 41.077L255.435 51.815l-63.578 36.709 165.499 95.542 63.575-36.699zm-150.11 122.19V459.43l164.966-95.238V174.32l-164.966 95.237zM75.082 364.191l164.959 95.234V268.32L75.082 173.09v191.101z"></path></svg>', this.version = "", this.author = "";
  }
  renderDetail() {
    const e = [];
    return this.detail !== "" && e.push(this.detail), this.version !== "" && e.push(this.version), this.author !== "" && e.push(this.author), l`<small id="detail"
      >${e.join(" | ")}<slot name="detail"></slot
    ></small>`;
  }
};
vr.styles = [...V.styles];
Xn([
  a({ type: String })
], vr.prototype, "version", 2);
Xn([
  a({ type: String })
], vr.prototype, "author", 2);
vr = Xn([
  d("uui-ref-node-package")
], vr);
var sb = Object.defineProperty, nb = Object.getOwnPropertyDescriptor, Wu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? nb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && sb(t, i, r), r;
};
let Do = class extends V {
  constructor() {
    super(...arguments), this.fallbackIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M331.135 98.375c3.677 14.798 4.045 16.031 3.702 31.225-.138 5.855-3.5 32.936-2.586 41.242.751 6.851 2.46 7.395 5.162 13.041 4.705 9.824 3.13 23.376 1.325 33.282-.988 5.42-3.076 13.136-6.248 17.561-3.497 4.876-10.498 4.913-13.592 10.602-4.459 8.195-1.941 19.692-4.752 28.54-3.193 10.033-11.325 10.738-11.938 23.867 3.986.562 7.962 1.134 11.938 1.703 3.99 8.484 11.297 25.552 18.759 30.688 6.25 1.705 12.505 3.411 18.752 5.113 21.907 8.982 46.251 19.732 68.204 28.987 19.991 8.434 43.927 11.439 51.151 32.396 0 14.229 1.343 47.849.976 66.497H36.514c-.367-18.648.974-52.268.974-66.497 7.226-20.957 31.16-23.963 51.151-32.396 21.953-9.255 46.297-20.005 68.201-28.987 6.25-1.702 12.506-3.408 18.754-5.113 7.461-5.136 14.77-22.203 18.76-30.688l8.877-2.158c-2.017-11.206-8.954-12.078-11.845-20.01a91882.59 91882.59 0 00-3.408-35.806c.055.563-8.163-1.497-9.238-2.171-11.58-7.256-11.816-36.723-12.931-48.978-.508-5.603 7.283-10.193 5.118-20.465-12.69-60.138 5.486-88.282 34.229-97.614 19.95-8.083 57.198-23.074 91.941-1.703l8.621 7.991 13.952 2.405c7 4.041 11.465 17.446 11.465 17.446z"></path></svg>', this.groupName = "";
  }
  renderDetail() {
    const e = [];
    return this.detail !== "" && e.push(this.detail), this.groupName !== "" && e.push(this.groupName), l`<small id="detail"
      >${e.join(" | ")}<slot name="detail"></slot
    ></small>`;
  }
};
Do.styles = [...V.styles];
Wu([
  a({ type: String, attribute: "group-name" })
], Do.prototype, "groupName", 2);
Do = Wu([
  d("uui-ref-node-user")
], Do);
var ab = Object.defineProperty, lb = Object.getOwnPropertyDescriptor, Gu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? lb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ab(t, i, r), r;
};
let Lo = class extends v {
  constructor() {
    super(...arguments), this.enforceScroll = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0");
  }
  render() {
    return l`<slot></slot>`;
  }
};
Lo.styles = [
  p`
      :host {
        display: block;
        scrollbar-width: thin;
        scrollbar-color: var(--uui-color-disabled-contrast,#c4c4c4)
          var(--uui-color-surface,#fff);
        overflow-y: auto;
      }

      :host([enforce-scroll]) {
        overflow-y: scroll;
      }

      :host::-webkit-scrollbar {
        width: 6px;
        height: 6px; /* needed for horizontal scrollbar */
      }

      :host::-webkit-scrollbar-track {
        background: var(--uui-color-surface,#fff);
        border-radius: 3px;
      }
      :host::-webkit-scrollbar-thumb {
        background-color: var(--uui-color-disabled-contrast,#c4c4c4);
        border-radius: 3px;
      }
    `
];
Gu([
  a({ type: Boolean, reflect: !0, attribute: "enforce-scroll" })
], Lo.prototype, "enforceScroll", 2);
Lo = Gu([
  d("uui-scroll-container")
], Lo);
class ll extends S {
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var ub = Object.defineProperty, cb = Object.getOwnPropertyDescriptor, ke = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? cb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ub(t, i, r), r;
};
let ue = class extends Le(v, "") {
  constructor() {
    super(), this.placeholder = "", this.disabled = !1, this.readonly = !1, this.error = !1, this.options = [], this._groups = [], this.disabledGroups = "", this._disabledGroups = [], this._values = [], this.addEventListener("mousedown", () => {
      this.style.setProperty("--uui-show-focus-outline", "0");
    }), this.addEventListener("blur", () => {
      this.style.setProperty("--uui-show-focus-outline", "");
    });
  }
  /**
   * This method enables <label for="..."> to focus the select
   */
  async focus() {
    await this.updateComplete, this._input.focus();
  }
  async blur() {
    await this.updateComplete, this._input.blur();
  }
  /**
   * This method enables <label for="..."> to open the select
   */
  async click() {
    await this.updateComplete, this._input.click();
  }
  getFormElement() {
    return this._input;
  }
  connectedCallback() {
    super.connectedCallback(), this.label || console.warn(this.tagName + " needs a `label`", this);
  }
  _createDisabledGroups() {
    this.disabledGroups.length !== 0 && (this._disabledGroups = this.disabledGroups.split(","));
  }
  _extractGroups() {
    this.options.length !== 0 && (this._groups = Array.from(
      new Set(
        this.options.filter((e) => e.group).map((e) => e.group)
      )
    ));
  }
  willUpdate(e) {
    if (e.has("options")) {
      this._extractGroups(), this._values = this.options.map((i) => i.value);
      const t = this.options.find((i) => i.selected);
      this.value = t ? t.value : "";
    }
    e.has("value") && (this.value = this._values.includes(this.value) ? this.value : ""), e.has("disabledGroups") && this._createDisabledGroups();
  }
  setValue(e) {
    e.stopPropagation();
    const t = e.target;
    e.target && (this.value = t.value), this.dispatchEvent(
      new ll(ll.CHANGE, {
        bubbles: !0,
        composed: !1
      })
    );
  }
  _renderOption(e, t, i, o) {
    return l`<option
      value="${t}"
      ?selected=${i}
      ?disabled=${o}>
      ${e}
    </option>`;
  }
  _renderGrouped() {
    return this._groups.length === 0 ? k : l`
      ${this._groups.map(
      (e) => l`<optgroup
            label=${e}
            ?disabled=${this._disabledGroups.some(
        (t) => t.toLowerCase() === e.toLowerCase()
      )}>
            ${this.options.map(
        (t) => t.group === e ? this._renderOption(
          t.name,
          t.value,
          t.selected,
          t.disabled
        ) : ""
      )}
          </optgroup>`
    )}
    `;
  }
  _getDisplayValue() {
    return this.options.find((e) => e.value === this.value)?.name || this.value;
  }
  render() {
    return this.readonly ? l`<span>${this._getDisplayValue()}</span>` : l` <select
      id="native"
      aria-label=${this.label}
      @change=${this.setValue}
      ?disabled=${this.disabled}
      .name=${this.name}
      .value=${this.value}>
      <option disabled selected value="" hidden>${this.placeholder}</option>
      ${this._renderGrouped()}
      ${this.options.filter((e) => !e.group).map(
      (e) => this._renderOption(
        e.name,
        e.value,
        e.selected,
        e.disabled
      )
    )}
    </select>`;
  }
};
ue.styles = [
  p`
      :host {
        display: inline-block;
        position: relative;
        font-family: inherit;
      }

      #native {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-select-font-size, inherit);
        height: var(--uui-select-height, var(--uui-size-11,33px));
        padding: var(--uui-select-padding-y, var(--uui-size-1,3px))
          var(--uui-select-padding-x, var(--uui-size-2,6px));
        color: var(--uui-select-text-color, var(--uui-color-text,#060606));
        box-sizing: border-box;
        border-radius: var(--uui-border-radius,3px);
        border: 1px solid
          var(--uui-select-border-color, var(--uui-color-border,#d8d7d9));
        transition: all 150ms ease;
        width: 100%;
        background-color: var(
          --uui-select-background-color,
          var(--uui-color-surface,#fff)
        );
      }

      #native:focus {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-select-outline-color, var(--uui-color-focus,#3879ff));
      }

      #native[disabled] {
        cursor: not-allowed;
        background-color: var(
          --uui-select-disabled-background-color,
          var(--uui-color-disabled,#f3f3f5)
        );
      }

      #native:hover {
        border: 1px solid
          var(--uui-select-border-color-hover, var(--uui-color-border-emphasis,#a1a1a1));
      }

      option:checked {
        background: var(
          --uui-select-selected-option-background-color,
          var(--uui-color-selected,#3544b1)
        );
        color: var(
          --uui-select-selected-option-color,
          var(--uui-color-selected-contrast,#fff)
        );
      }

      #caret {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
      }

      :host([error]) #native {
        border: 1px solid var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
      }

      :host([error]) #native[disabled] {
        border: 1px solid var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
      }
    `
];
ke([
  a({ type: String })
], ue.prototype, "label", 2);
ke([
  a()
], ue.prototype, "placeholder", 2);
ke([
  a({ type: Boolean, reflect: !0 })
], ue.prototype, "disabled", 2);
ke([
  a({ type: Boolean, reflect: !0 })
], ue.prototype, "readonly", 2);
ke([
  a({ type: Boolean, reflect: !0 })
], ue.prototype, "error", 2);
ke([
  a({ type: Array, attribute: !1 })
], ue.prototype, "options", 2);
ke([
  g()
], ue.prototype, "_groups", 2);
ke([
  a()
], ue.prototype, "disabledGroups", 2);
ke([
  g()
], ue.prototype, "_disabledGroups", 2);
ke([
  P("#native")
], ue.prototype, "_input", 2);
ue = ke([
  d("uui-select")
], ue);
const hb = p`
  input[type='range'] {
    left: 0;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 2;

    height: 100%;
    -webkit-appearance: none;
    margin: 0px;
    padding: 0px;
    border: 0 none;
    background: transparent;
    color: transparent;
    overflow: visible;
    border: none;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    margin: 0px;
    padding: 0px;
    border: none;
    background: transparent;
    color: transparent;
    overflow: visible;
    order: none;
  }

  input[type='range']:focus::-webkit-slider-runnable-track {
    background: transparent;
    border: none;
  }

  input[type='range']::-moz-range-track {
    width: 100%;
    height: 100%;
    -moz-appearance: none;
    margin: 0px;
    padding: 0px;
    border: 0 none;
    background: transparent;
    color: transparent;
    overflow: visible;
  }

  input[type='range']::-ms-track {
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    margin: 0px;
    padding: 0px;
    border: 0 none;
    background: transparent;
    color: transparent;
    overflow: visible;
  }
  input[type='range']::-ms-fill-lower,
  input[type='range']::-ms-fill-upper {
    background: transparent;
    border: 0 none;
  }

  input[type='range']::-ms-tooltip {
    display: none;
  }

  input[type='range']::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 12px;
    border: 0 none;
    background: transparent;
    cursor: pointer;
  }

  input[type='range']::-webkit-slider-thumb {
    width: 18px;
    height: 18px;
    border-radius: 12px;
    border: 0 none;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;
  }

  input[type='range']::-ms-thumb {
    width: 18px;
    height: 18px;
    border-radius: 12px;
    border: 0 none;
    background: transparent;
    cursor: pointer;
  }

  input[type='range']:focus::-ms-fill-lower {
    background: transparent;
  }
  input[type='range']:focus::-ms-fill-upper {
    background: transparent;
  }
`;
class Rr extends S {
  static {
    this.INPUT = "input";
  }
  static {
    this.CHANGE = "change";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var db = Object.defineProperty, pb = Object.getOwnPropertyDescriptor, qu = (e) => {
  throw TypeError(e);
}, re = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? pb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && db(t, i, r), r;
}, Yn = (e, t, i) => t.has(e) || qu("Cannot " + i), ul = (e, t, i) => (Yn(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Os = (e, t, i) => t.has(e) ? qu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), cl = (e, t, i, o) => (Yn(e, t, "write to private field"), t.set(e, i), i), vb = (e, t, i) => (Yn(e, t, "access private method"), i), ao, lo, pn, Ku;
const tr = 12, hl = 24, fb = (e, t, i) => Array.from({ length: (t - e) / i + 1 }, (o, r) => e + r * i), bb = (e) => {
  const t = e.toString().indexOf(".");
  return t >= 0 ? e.toString().length - t - 1 : 0;
};
let q = class extends Le(v, "") {
  constructor() {
    super(), Os(this, pn), Os(this, ao, 0), this.hideStepValues = !1, this.hideValueLabel = !1, this.min = 0, this.max = 100, Os(this, lo, 1), this.disabled = !1, this.readonly = !1, this._stepWidth = 0, this.onWindowResize = () => {
      this._stepWidth = this._calculateStepWidth();
    }, this._steps = [], this._sliderPosition = "0%", this.addEventListener("mousedown", () => {
      this.style.setProperty("--uui-show-focus-outline", "0");
    }), this.addEventListener("blur", () => {
      this.style.setProperty("--uui-show-focus-outline", "");
    }), this.addEventListener("keydown", vb(this, pn, Ku));
  }
  get step() {
    return ul(this, lo);
  }
  set step(e) {
    cl(this, lo, e), cl(this, ao, (e.toString().split(".")[1] || []).length);
  }
  get value() {
    return super.value;
  }
  set value(e) {
    if (e instanceof File)
      return;
    const t = super.value;
    let i = e ? parseFloat(e) : 0;
    i = Math.min(Math.max(i, this.min), this.max), this.step > 0 && (i = Math.round(i / this.step) * this.step), super.value = i.toFixed(ul(this, ao)).toString(), this._calculateSliderPosition(), this.requestUpdate("value", t);
  }
  /**
   * This method enables <label for="..."> to focus the select
   */
  async focus() {
    await this.updateComplete, this._input.focus();
  }
  async blur() {
    await this.updateComplete, this._input.blur();
  }
  /**
   * This method enables <label for="..."> to open the select
   */
  async click() {
    await this.updateComplete, this._input.click();
  }
  getFormElement() {
    return this._input;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("resize", this.onWindowResize), this.label || console.warn(this.tagName + " needs a `label`", this);
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this.onWindowResize), super.disconnectedCallback();
  }
  firstUpdated() {
    this._calculateSliderPosition(), this._updateSteps();
  }
  updated(e) {
    super.updated(e), (e.get("max") || e.get("min") || e.get("step")) && (this.value = this.value, this._updateSteps());
  }
  _updateSteps() {
    this._steps = fb(this.min, this.max, this.step), this._stepWidth = this._calculateStepWidth();
  }
  _calculateStepWidth() {
    return (this._track.getBoundingClientRect().width - tr * 2) / (this._steps.length - 1);
  }
  _calculateSliderPosition() {
    const e = (parseFloat(super.value || "0") - this.min) / (this.max - this.min);
    this._sliderPosition = `${Math.floor(e * 1e5) / 1e3}%`;
  }
  _onInput(e) {
    e.stopPropagation(), this.value = this._input.value, this.dispatchEvent(new Rr(Rr.INPUT));
  }
  _onChange(e) {
    e.stopPropagation(), this.pristine = !1, this.dispatchEvent(new Rr(Rr.CHANGE));
  }
  renderTrackSteps() {
    return b`
  ${this._steps.map((e) => {
      if (this._stepWidth >= hl) {
        const t = Math.round(
          tr + this._stepWidth * this._steps.indexOf(e)
        );
        return b`<circle class="track-step" cx="${t}" cy="50%" r="4.5" />`;
      }
      return b``;
    })}
`;
  }
  renderStepValues() {
    return this.hideStepValues ? k : l`<div id="step-values">
      ${this._steps.map(
      (e) => l` <span
            ><span>
              ${this._steps.length <= 20 && this._stepWidth >= hl ? e.toFixed(bb(this.step)) : k}
            </span></span
          >`
    )}
    </div>`;
  }
  render() {
    return l`
      <input
        id="input"
        type="range"
        min="${this.min}"
        max="${this.max}"
        .value="${this.value}"
        aria-label="${this.label}"
        step="${+this.step}"
        ?disabled=${this.disabled || this.readonly}
        ?readonly=${this.readonly}
        @input=${this._onInput}
        @change=${this._onChange} />
      <div id="track" aria-hidden="true">
        <svg height="100%" width="100%">
          <rect x="9" y="9" height="3" rx="2" />
          ${this.renderTrackSteps()}
        </svg>

        <div id="track-inner" aria-hidden="true">
          <div id="thumb" style=${Ze({ left: this._sliderPosition })}>
            ${this.hideValueLabel ? null : l`<div id="thumb-label">${this.value}</div>`}
          </div>
        </div>
      </div>
      ${this.renderStepValues()}
    `;
  }
};
ao = /* @__PURE__ */ new WeakMap();
lo = /* @__PURE__ */ new WeakMap();
pn = /* @__PURE__ */ new WeakSet();
Ku = function(e) {
  e.key == "Enter" && this.submit();
};
q.formAssociated = !0;
q.styles = [
  Ah,
  hb,
  p`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
        min-height: 30px;
        user-select: none;
      }

      input {
        box-sizing: border-box;
        height: 18px;
      }

      #track {
        position: relative;
        height: 18px;
        width: 100%;
        display: flex;
      }

      #track svg {
        height: 21px;
        border-radius: 10px;
        background-color: var(--uui-color-surface,#fff);
      }
      #track svg rect {
        width: calc(100% - 18px);
        fill: var(--uui-color-border-standalone,#c2c2c2);
      }
      input:hover ~ #track svg rect {
        fill: var(--uui-color-border-emphasis,#a1a1a1);
      }

      input:focus ~ #track #thumb {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus,#3879ff);
      }

      .track-step {
        fill: var(--uui-color-border,#d8d7d9);
      }

      input:hover ~ #track svg .track-step {
        fill: var(--uui-color-border-emphasis,#a1a1a1);
      }

      #track-inner {
        position: absolute;
        left: ${tr}px; /* Match TRACK_MARGIN */
        right: ${tr}px; /* Match TRACK_MARGIN */
      }

      #thumb {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 2px;
        bottom: 0;
        left: 0;
        height: 17px;
        width: 17px;
        margin-left: -8px;
        margin-right: -8px;
        border-radius: 50%;
        box-sizing: border-box;

        background-color: var(--uui-color-surface,#fff);
        border: 2px solid var(--uui-color-selected,#3544b1);
      }
      :host([disabled]) #thumb {
        background-color: var(--uui-color-disabled,#f3f3f5);
        border-color: var(--uui-color-disabled-standalone,rgb(
    226,
    226,
    226
  ));
      }

      #thumb:after {
        content: '';
        height: 9px;
        width: 9px;
        border-radius: 50%;
        background-color: var(--uui-color-selected,#3544b1);
      }

      :host([disabled]) #thumb:after {
        background-color: var(--uui-color-disabled,#f3f3f5);
      }

      #thumb-label {
        position: absolute;
        box-sizing: border-box;
        font-weight: 700;
        bottom: 15px;
        left: 50%;
        width: 40px;
        margin-left: -20px;
        text-align: center;
        opacity: 0;
        transition: 120ms opacity;
        color: var(--uui-color-selected,#3544b1);
      }

      input:focus ~ #track #thumb-label,
      input:hover ~ #track #thumb-label {
        opacity: 1;
      }

      #step-values {
        margin: 0 ${tr}px; /* Match TRACK_MARGIN */
        margin-top: 6px;
        display: flex;
        align-items: flex-end;
        box-sizing: border-box;
      }

      #step-values > span {
        flex-basis: 0;
        flex-grow: 1;
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }

      #step-values > span > span {
        transform: translateX(-50%);
        display: inline-block;
        text-align: center;
        font-size: var(--uui-type-small-size,12px);
      }

      #step-values > span:last-child {
        width: 0;
        flex-grow: 0;
      }

      :host(:not([pristine]):invalid) #thumb {
        border-color: var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
      }
      :host(:not([pristine]):invalid) #thumb:after {
        background-color: var(--uui-color-invalid,#d42054);
      }

      // readonly
      :host([readonly]) #thumb {
        background-color: var(--uui-color-disabled,#f3f3f5);
        border-color: var(--uui-color-disabled-standalone,rgb(
    226,
    226,
    226
  ));
      }

      :host([readonly]) #thumb-label {
        opacity: 1;
      }
    `
];
re([
  a({ type: Boolean, attribute: "hide-step-values" })
], q.prototype, "hideStepValues", 2);
re([
  a({ type: Boolean, attribute: "hide-value-label" })
], q.prototype, "hideValueLabel", 2);
re([
  a({ type: Number })
], q.prototype, "min", 2);
re([
  a({ type: Number })
], q.prototype, "max", 2);
re([
  a({ type: Number })
], q.prototype, "step", 1);
re([
  a({ type: String })
], q.prototype, "value", 1);
re([
  a({ type: Boolean, reflect: !0 })
], q.prototype, "disabled", 2);
re([
  a({ type: Boolean, reflect: !0 })
], q.prototype, "readonly", 2);
re([
  a({ type: String })
], q.prototype, "label", 2);
re([
  P("#input")
], q.prototype, "_input", 2);
re([
  P("#track")
], q.prototype, "_track", 2);
re([
  g()
], q.prototype, "_stepWidth", 2);
re([
  g()
], q.prototype, "_steps", 2);
re([
  g()
], q.prototype, "_sliderPosition", 2);
q = re([
  d("uui-slider")
], q);
var gb = Object.defineProperty, mb = Object.getOwnPropertyDescriptor, Xu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? mb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && gb(t, i, r), r;
};
let To = class extends v {
  constructor() {
    super(...arguments), this.open = !1;
  }
  render() {
    return l`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="m4 9 8 8 8-8"></path>
    </svg>`;
  }
};
To.styles = [
  p`
      :host {
        display: inline-flex;
        width: 12px;
        vertical-align: middle;
      }

      svg {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        transition: transform 100ms cubic-bezier(0.1, 0, 0.9, 1);
        width: 100%;
        height: 100%;
      }

      :host([open]) svg {
        transform: rotate(0deg);
      }
    `
];
Xu([
  a({ type: Boolean, reflect: !0 })
], To.prototype, "open", 2);
To = Xu([
  d("uui-symbol-expand")
], To);
var _b = Object.defineProperty, yb = Object.getOwnPropertyDescriptor, Zn = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && _b(t, i, r), r;
};
let fr = class extends v {
  constructor() {
    super(...arguments), this.src = "", this.alt = "";
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-icon");
  }
  render() {
    return this.src ? l`<img src=${this.src} alt=${this.alt} />` : l`<uui-icon
          name="picture"
          .fallback=${jh.strings[0]}></uui-icon>`;
  }
};
fr.styles = [
  p`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      img {
        object-fit: contain;
        height: 100%;
        width: 100%;
      }

      uui-icon {
        width: 100%;
        height: 100%;
        max-width: 100%;
        display: flex;
        max-height: 100%;
        justify-content: center;
        color: var(--uui-color-surface,#fff);
        background: var(--uui-color-surface-alt,#f3f3f5);
      }
    `
];
Zn([
  a({ type: String })
], fr.prototype, "src", 2);
Zn([
  a({ type: String })
], fr.prototype, "alt", 2);
fr = Zn([
  d("uui-symbol-file-thumbnail")
], fr);
var wb = Object.defineProperty, xb = Object.getOwnPropertyDescriptor, Yu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? xb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && wb(t, i, r), r;
};
let No = class extends v {
  constructor() {
    super(...arguments), this.type = "";
  }
  render() {
    return l`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="0.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        id="icon">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      </svg>

      ${this.type ? l`<small id="file-type" class="uui-small"
            >${this.type.toUpperCase()}</small
          >` : ""}
    `;
  }
};
No.styles = [
  _r,
  p`
      :host {
        position: relative;
        display: block;
        box-sizing: border-box;
      }

      #file-type {
        position: absolute;
        bottom: 20%;
        left: 12%;
        margin-left: calc(var(--uui-size-3,9px) * -1);
        padding: 0px var(--uui-size-3,9px);
        font-weight: 700;
        background-color: var(--uui-color-surface-alt,#f3f3f5);
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: var(--uui-border-radius,3px);
      }

      #icon {
        width: 100%;
        color: var(--uui-color-border-standalone,#c2c2c2);
      }
    `
];
Yu([
  a({ type: String })
], No.prototype, "type", 2);
No = Yu([
  d("uui-symbol-file")
], No);
var $b = Object.getOwnPropertyDescriptor, kb = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? $b(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let vn = class extends v {
  render() {
    return l`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="0.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      id="icon">
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>`;
  }
};
vn.styles = [
  p`
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }

      #icon {
        width: 100%;
        color: var(--uui-color-border-standalone,#c2c2c2);
      }
    `
];
vn = kb([
  d("uui-symbol-folder")
], vn);
var Cb = Object.defineProperty, Eb = Object.getOwnPropertyDescriptor, Zu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Eb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Cb(t, i, r), r;
};
let Vo = class extends v {
  constructor() {
    super(...arguments), this.open = !1;
  }
  render() {
    return b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      ${this.open === !0 ? b`<path d="M457.915 242.222H269.053l-.004-78.416c0-33.277-12.63-63.824-33.538-86.175-20.82-22.357-50.579-36.756-83.391-36.731-32.814-.024-62.57 14.375-83.391 36.731-20.915 22.351-33.541 52.897-33.547 86.175v103.859H96.19v-13.476l-35.656-35.656H96.19v-54.728c0-17.765 6.717-33.406 17.084-44.502 10.463-11.09 23.927-17.37 38.845-17.394 14.916.024 28.375 6.304 38.837 17.394 10.375 11.096 17.092 26.738 17.087 44.502v78.416h-26.189c-9.159 0-16.582 7.426-16.582 16.585v194.53c0 9.158 7.423 16.583 16.582 16.583h276.06c9.164 0 16.587-7.425 16.587-16.583v-194.53c.001-9.159-7.422-16.584-16.586-16.584z"></path>` : b`<path d="M404.84 246.573h-22.084l-.002-73.603c0-36.675-13.921-70.311-36.917-94.892-22.91-24.584-55.547-40.367-91.539-40.336-36.003-.031-68.643 15.752-91.55 40.336-23.001 24.582-36.918 58.217-36.925 94.892v73.603h-22.082c-9.16 0-16.585 7.421-16.585 16.583v194.531c0 9.158 7.425 16.585 16.585 16.585H404.84c9.162 0 16.586-7.427 16.586-16.585V263.156c0-9.161-7.424-16.583-16.586-16.583zm-218.013-73.602c0-21.167 8.012-39.893 20.468-53.219 12.552-13.316 28.896-20.982 47.003-21.007 18.095.025 34.438 7.685 46.987 21.007 12.455 13.326 20.467 32.052 20.467 53.219v73.603H186.827v-73.603z"></path>`}
    </svg>`;
  }
};
Vo.styles = [
  p`
      :host {
        display: inline-block;
        vertical-align: middle;
        width: 1em;
      }

      svg {
        fill: currentColor;
      }
    `
];
Zu([
  a({ type: Boolean, reflect: !0 })
], Vo.prototype, "open", 2);
Vo = Zu([
  d("uui-symbol-lock")
], Vo);
var Pb = Object.getOwnPropertyDescriptor, Sb = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Pb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let fn = class extends v {
  render() {
    return b`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="17" cy="50" r="9"></circle>
      <circle cx="50" cy="50" r="9"></circle>
      <circle cx="83" cy="50" r="9"></circle>
    </svg>`;
  }
};
fn.styles = [
  p`
      :host {
        display: inline-block;
        vertical-align: bottom;
        width: 1.15em;
        height: 1.15em;
      }

      svg {
        fill: currentColor;
      }
    `
];
fn = Sb([
  d("uui-symbol-more")
], fn);
var Ob = Object.defineProperty, Ib = Object.getOwnPropertyDescriptor, Qu = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ib(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Ob(t, i, r), r;
};
let Bo = class extends yr(v) {
  constructor() {
    super(...arguments), this.descending = !1;
  }
  render() {
    return l` <svg
        id="up"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="m4 9 8 8 8-8"></path>
      </svg>
      <svg
        id="down"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="m4 9 8 8 8-8"></path>
      </svg>`;
  }
};
Bo.styles = [
  p`
      :host {
        position: relative;
        display: inline-block;
        width: 0.9em;
        height: 1em;
        //vertical-align: middle;
        pointer-events: none;
      }

      svg {
        position: absolute;
        left: 0;
        top: 50%;
        width: 0.9em;
        transform-origin: 50% 50%;
        transition:
          transform 120ms ease-in-out,
          opacity 120ms,
          margin-top 240ms;
        opacity: 0;
        margin-top: -8em;
      }

      #up {
        transform: rotate(180deg);
        margin-top: -1.05em;
      }
      #down {
        margin-top: -0.55em;
      }
      :host([active]) #up {
        margin-top: calc(-0.8em - (0.25em * var(--uui-symbol-sort-hover, 0)));
      }
      :host([active]) #down {
        margin-top: calc(-0.8em + (0.25em * var(--uui-symbol-sort-hover, 0)));
      }

      :host(:hover) {
        --uui-symbol-sort-hover: 1;
      }
      :host(:not([active])) #up,
      :host(:not([active])) #down {
        opacity: calc(0.25 * var(--uui-symbol-sort-hover, 0));
      }

      :host([active]:not([descending])) #down {
        opacity: 1;
      }
      :host([active]:not([descending])) #up {
        opacity: calc(0.25 * var(--uui-symbol-sort-hover, 0));
      }

      :host([active][descending]) #up {
        opacity: 1;
      }
      :host([active][descending]) #down {
        opacity: calc(0.25 * var(--uui-symbol-sort-hover, 0));
      }
    `
];
Qu([
  a({ type: Boolean, reflect: !0 })
], Bo.prototype, "descending", 2);
Bo = Qu([
  d("uui-symbol-sort")
], Bo);
var Ab = Object.getOwnPropertyDescriptor, Ub = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ab(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let bn = class extends v {
  /* consider select-only attribute on this level? */
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "table");
  }
  render() {
    return l`<slot></slot>`;
  }
};
bn.styles = [
  p`
      :host {
        display: table;
        width: 100%;
        border-radius: var(--uui-border-radius,3px);
        background-color: var(--uui-color-surface,#fff);
        cursor: default;
      }
    `
];
bn = Ub([
  d("uui-table")
], bn);
var zb = Object.defineProperty, Mb = Object.getOwnPropertyDescriptor, as = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Mb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && zb(t, i, r), r;
};
let bt = class extends v {
  constructor() {
    super(...arguments), this.disableChildInteraction = !1, this.noPadding = !1, this.clipText = !1, this._observer = new ResizeObserver(() => {
      this._detectOverflow();
    });
  }
  _detectOverflow() {
    this.scrollWidth > this.clientWidth ? this.setAttribute("title", this.innerText) : this.removeAttribute("title");
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "cell");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._observer.disconnect();
  }
  updated(e) {
    super.updated(e), e.has("clipText") && (this.clipText ? (this._detectOverflow(), this._observer.observe(this)) : this._observer.disconnect());
  }
  render() {
    return l` <slot @slotchange=${this._detectOverflow}></slot>`;
  }
};
bt.styles = [
  p`
      :host {
        position: relative;
        display: table-cell;
        height: var(--uui-table-cell-height, var(--uui-size-12,36px));
        padding: var(
          --uui-table-cell-padding,
          var(--uui-size-3,9px) var(--uui-size-5,15px)
        );
        border-top: 1px solid var(--uui-color-border,#d8d7d9);
        vertical-align: middle;
      }

      :host([clip-text]) {
        max-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
      }

      :host([disable-child-interaction]) ::slotted(*) {
        pointer-events: none;
      }

      :host([disable-child-interaction])::after {
        content: '';
        position: absolute;
        inset: 0;
      }

      :host([no-padding]) {
        padding: 0;
      }
    `
];
as([
  a({
    type: Boolean,
    reflect: !0,
    attribute: "disable-child-interaction"
  })
], bt.prototype, "disableChildInteraction", 2);
as([
  a({ type: Boolean, reflect: !0, attribute: "no-padding" })
], bt.prototype, "noPadding", 2);
as([
  a({ type: Boolean, reflect: !0, attribute: "clip-text" })
], bt.prototype, "clipText", 2);
bt = as([
  d("uui-table-cell")
], bt);
var Db = Object.getOwnPropertyDescriptor, Lb = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Db(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let gn = class extends v {
};
gn.styles = [
  p`
      :host {
        display: table-column;
      }
    `
];
gn = Lb([
  d("uui-table-column")
], gn);
var Tb = Object.getOwnPropertyDescriptor, Nb = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Tb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let mn = class extends bt {
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "columnheader");
  }
};
mn.styles = [
  ...bt.styles,
  p`
      :host {
        border-top: none;
      }
    `
];
mn = Nb([
  d("uui-table-head-cell")
], mn);
var Vb = Object.getOwnPropertyDescriptor, Bb = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Vb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let _n = class extends v {
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "row");
  }
  render() {
    return l`<slot></slot>`;
  }
};
_n.styles = [
  p`
      :host {
        display: table-header-group;
        font-weight: bold;
      }
    `
];
_n = Bb([
  d("uui-table-head")
], _n);
var Hb = Object.defineProperty, jb = Object.getOwnPropertyDescriptor, Ju = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? jb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Hb(t, i, r), r;
};
let Ho = class extends Xo(
  ki(v)
) {
  constructor() {
    super();
    let e = !1;
    this.addEventListener("blur", () => {
      e === !1 && this.style.setProperty("--uui-show-focus-outline", "1"), e = !1;
    }), this.addEventListener("mousedown", () => {
      this.style.setProperty("--uui-show-focus-outline", "0"), e = !0;
    }), this.addEventListener("mouseup", () => {
      e = !1;
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "row");
  }
  updated(e) {
    e.has("selectOnly") && this.updateChildSelectOnly();
  }
  updateChildSelectOnly() {
    this.slotCellNodes && this.slotCellNodes.forEach((e) => {
      e.disableChildInteraction !== void 0 && (e.disableChildInteraction = this.selectOnly);
    });
  }
  render() {
    return l` <slot @slotchanged=${this.updateChildSelectOnly}></slot> `;
  }
};
Ho.styles = [
  p`
      :host {
        display: table-row;
        position: relative;
        outline-offset: -3px;
      }

      :host([selectable]) {
        cursor: pointer;
      }

      :host(:focus) {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus,#3879ff);
      }
      :host([selected]) {
        outline: 2px solid
          var(--uui-table-row-color-selected, var(--uui-color-selected,#3544b1));
      }
      :host([selected]:focus) {
        outline-color: var(--uui-color-focus,#3879ff);
      }
    `
];
Ju([
  wt({
    flatten: !0,
    selector: "uui-table-cell, [uui-table-cell], [role=cell]"
  })
], Ho.prototype, "slotCellNodes", 2);
Ho = Ju([
  d("uui-table-row")
], Ho);
var Rb = Object.defineProperty, Fb = Object.getOwnPropertyDescriptor, Di = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Fb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Rb(t, i, r), r;
};
let gt = class extends yr(De("", v)) {
  constructor() {
    super(), this.disabled = !1, this.orientation = "horizontal", this.addEventListener("click", this.onHostClick);
  }
  onHostClick(e) {
    this.disabled && (e.preventDefault(), e.stopImmediatePropagation());
  }
  render() {
    return this.href ? l`
          <a
            id="button"
            href=${_(this.disabled ? void 0 : this.href)}
            target=${_(this.target || void 0)}
            rel=${_(
      this.rel || _(
        this.target === "_blank" ? "noopener noreferrer" : void 0
      )
    )}
            role="tab">
            <slot name="icon"></slot>
            ${this.renderLabel()}
            <slot name="extra"></slot>
          </a>
        ` : l`
          <button
            type="button"
            id="button"
            ?disabled=${this.disabled}
            role="tab">
            <slot name="icon"></slot>
            ${this.renderLabel()}
            <slot name="extra"></slot>
          </button>
        `;
  }
};
gt.styles = [
  p`
      :host {
        color: var(--uui-tab-text, var(--uui-color-interactive,#1b264f));
        font-family: inherit;
        width: fit-content;
      }

      #button {
        position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        min-height: var(--uui-size-12,36px);
        min-width: 70px;
        padding: var(--uui-size-3,9px)
          var(--uui-tab-padding-horizontal, var(--uui-size-5,15px));
        border: none;
        font-size: inherit;
        background: none;
        color: inherit;
        cursor: pointer;
        font-family: inherit;

        /* for anchor tag: */
        text-decoration: none;
        line-height: normal;
      }

      :host([orientation='vertical']) #button {
        min-height: var(--uui-size-14,42px);
        padding: var(--uui-size-2,6px)
          var(--uui-tab-padding-horizontal, var(--uui-size-5,15px));
      }

      :host(:not([disabled])) #button:hover {
        color: var(--uui-tab-text-hover, var(--uui-color-default-emphasis,#3544b1));
      }

      :host(:not([disabled])) #button:active {
        box-shadow:
          inset 0 2px 4px rgba(0, 0, 0, 0.15),
          0 1px 2px rgba(0, 0, 0, 0.05);
      }

      :host([active]) {
        color: var(--uui-tab-text-active, unset);
      }

      :host([disabled]) #button {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
        cursor: default;
      }

      #button::before {
        content: '';
        position: absolute;
        background-color: var(--uui-color-current,#f5c1bc);
        opacity: 0;
      }
      :host([active]) #button::before {
        opacity: 1;
      }

      /* HORIZONTAL */
      :host([orientation='horizontal']) #button::before {
        left: auto;
        right: auto;
        border-radius: var(--uui-border-radius,3px) var(--uui-border-radius,3px) 0 0;
        height: 0px;
        width: calc(100% - 14px);
        bottom: 0;
        transition:
          opacity linear 120ms,
          height ease-in-out 120ms;
      }
      :host([active][orientation='horizontal']) #button::before {
        height: 4px;
      }

      /* VERTICAL */
      :host([orientation='vertical']) #button::before {
        top: auto;
        bottom: auto;
        border-radius: 0 var(--uui-border-radius,3px) var(--uui-border-radius,3px) 0;
        height: calc(100% - 12px);
        width: 0px;
        left: 0;
        transition:
          opacity linear 120ms,
          width ease-in-out 120ms;
      }
      :host([active][orientation='vertical']) #button::before {
        width: 4px;
      }

      #button:hover::before {
        background-color: var(--uui-color-current-emphasis,rgb(
    248,
    214,
    211
  ));
      }
      :host([disabled]) #button::before {
        background-color: var(--uui-color-disabled-standalone,rgb(
    226,
    226,
    226
  ));
      }

      slot[name='icon']::slotted(*) {
        font-size: 20px;
        margin-bottom: var(--uui-size-2,6px);
      }

      slot.label {
        /* TODO: Find a better selector */
        text-align: center;
        display: flex;
        width: 100%;
        flex-direction: column;
      }

      :host([orientation='vertical']) slot.label {
        text-align: left;
      }
    `
];
Di([
  a({ type: Boolean, reflect: !0 })
], gt.prototype, "disabled", 2);
Di([
  a({ type: String })
], gt.prototype, "href", 2);
Di([
  a({ type: String })
], gt.prototype, "target", 2);
Di([
  a({ type: String })
], gt.prototype, "rel", 2);
Di([
  a({ type: String, reflect: !0 })
], gt.prototype, "orientation", 2);
gt = Di([
  d("uui-tab")
], gt);
var Wb = Object.defineProperty, Gb = Object.getOwnPropertyDescriptor, ec = (e) => {
  throw TypeError(e);
}, Li = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Gb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Wb(t, i, r), r;
}, Qn = (e, t, i) => t.has(e) || ec("Cannot " + i), E = (e, t, i) => (Qn(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Se = (e, t, i) => t.has(e) ? ec("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), ir = (e, t, i, o) => (Qn(e, t, "write to private field"), t.set(e, i), i), ne = (e, t, i) => (Qn(e, t, "access private method"), i), ls, ze, Xe, ai, yi, jo, br, rr, ee, tc, ic, Jn, rc, wi, us, oc, ea, yn;
let mt = class extends v {
  constructor() {
    super(...arguments), Se(this, ee), Se(this, ls, 0), this.dropdownContentDirection = "vertical", Se(this, ze, []), Se(this, Xe, []), Se(this, ai, /* @__PURE__ */ new Map()), Se(this, yi, []), Se(this, jo, new ResizeObserver(ne(this, ee, ic).bind(this))), Se(this, br, []), Se(this, rr, !1), Se(this, wi, (e) => {
      const t = e.currentTarget;
      if (ne(this, ee, yn).call(this, t)) {
        t.active = !0;
        const i = E(this, ai).get(t);
        i && (i.active = !0), [
          ...E(this, ze),
          ...E(this, Xe)
        ].filter((s) => s !== t && s !== i).forEach((s) => {
          ne(this, ee, yn).call(this, s) && (s.active = !1);
        }), E(this, Xe).some(
          (s) => s.active && s !== i
        ) ? this._moreButtonElement.classList.add("active-inside") : this._moreButtonElement.classList.remove("active-inside");
      }
    });
  }
  connectedCallback() {
    super.connectedCallback(), ne(this, ee, tc).call(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), E(this, jo).unobserve(this), ne(this, ee, Jn).call(this);
  }
  render() {
    return l`
      <div id="main">
        <div id="grid" role="tablist">
          <slot @slotchange=${ne(this, ee, rc)}></slot>
        </div>
        <uui-button
          popovertarget="popover-container"
          style="display: none"
          id="more-button"
          label="More"
          compact>
          <uui-symbol-more></uui-symbol-more>
        </uui-button>
      </div>
      <uui-popover-container
        id="popover-container"
        popover
        placement="bottom-end">
        <div id="hidden-tabs-container" role="tablist">
          ${Vn(E(this, Xe), (e) => l`${e}`)}
        </div>
      </uui-popover-container>
    `;
  }
};
ls = /* @__PURE__ */ new WeakMap();
ze = /* @__PURE__ */ new WeakMap();
Xe = /* @__PURE__ */ new WeakMap();
ai = /* @__PURE__ */ new WeakMap();
yi = /* @__PURE__ */ new WeakMap();
jo = /* @__PURE__ */ new WeakMap();
br = /* @__PURE__ */ new WeakMap();
rr = /* @__PURE__ */ new WeakMap();
ee = /* @__PURE__ */ new WeakSet();
tc = async function() {
  y(this, "uui-button"), y(this, "uui-popover-container"), y(this, "uui-symbol-more"), await this.updateComplete, E(this, jo).observe(this._mainElement);
};
ic = function(e) {
  const t = Number.parseFloat(
    this.style.getPropertyValue("--uui-tab-group-gap")
  );
  (Number.isNaN(t) ? 0 : t) !== E(this, ls) ? ne(this, ee, us).call(this) : ne(this, ee, ea).call(this, e[0].contentBoxSize[0].inlineSize);
};
Jn = function() {
  E(this, ze).forEach((e) => {
    e.removeEventListener("click", E(this, wi)), E(this, br).forEach((t) => t.disconnect());
  }), E(this, br).length = 0, E(this, yi).length = 0;
};
rc = function() {
  ne(this, ee, Jn).call(this), ne(this, ee, oc).call(this), E(this, ze).forEach((e) => {
    e.addEventListener("click", E(this, wi));
    const t = new ResizeObserver(
      ne(this, ee, us).bind(this)
    );
    t.observe(e), E(this, br).push(t);
  });
};
wi = /* @__PURE__ */ new WeakMap();
us = async function() {
  if (E(this, rr)) return;
  ir(this, rr, !0), requestAnimationFrame(() => {
    ir(this, rr, !1);
  }), await this.updateComplete;
  const e = Number.parseFloat(
    this.style.getPropertyValue("--uui-tab-group-gap")
  ), t = Number.isNaN(e) ? 0 : e;
  ir(this, ls, t);
  let i = 0;
  for (let r = 0; r < E(this, ze).length; r++)
    E(this, ze)[r].style.display = "", i += E(this, ze)[r].offsetWidth, E(this, yi)[r] = i, i += t;
  const o = 2;
  this._mainElement.style.width = i - t + o + "px", ne(this, ee, ea).call(this, this._mainElement.offsetWidth);
};
oc = function() {
  ir(this, ze, this._slottedNodes ? this._slottedNodes : []), ne(this, ee, us).call(this);
};
ea = function(e) {
  const t = this._moreButtonElement.offsetWidth, i = e - (t || 0);
  E(this, Xe).forEach((s) => {
    s.removeEventListener("click", E(this, wi));
  }), ir(this, Xe, []), E(this, ai).clear();
  let o = !1;
  const r = E(this, yi).length;
  for (let s = 0; s < r; s++) {
    const n = E(this, yi)[s], u = E(this, ze)[s];
    if (n <= (s === r - 1 ? e : i))
      u.style.display = "";
    else {
      const c = u.cloneNode(!0);
      c.addEventListener("click", E(this, wi)), c.classList.add("hidden-tab"), c.style.display = "", c.orientation = this.dropdownContentDirection, E(this, ai).set(c, u), E(this, ai).set(u, c), E(this, Xe).push(c), u.style.display = "none", u.active && (o = !0);
    }
  }
  E(this, Xe).length === 0 ? (this._moreButtonElement.style.display = "none", this._popoverContainerElement.hidePopover()) : this._moreButtonElement.style.display = "", o ? this._moreButtonElement.classList.add("active-inside") : this._moreButtonElement.classList.remove("active-inside"), this.requestUpdate();
};
yn = function(e) {
  return typeof e == "object" && "active" in e && typeof e.active == "boolean";
};
mt.styles = [
  p`
      :host {
        min-width: 0;
        display: flex;
        height: 100%;
      }

      #main {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
      }

      #grid {
        width: 1fr;
        display: flex;
        height: 100%;
        min-height: 48px;
        overflow: hidden;
        text-wrap: nowrap;
        color: var(--uui-tab-text);
        gap: var(--uui-tab-group-gap, 0);
      }

      #popover-container {
        --uui-tab-text: var(--uui-tab-group-dropdown-tab-text, unset);
        --uui-tab-text-hover: var(
          --uui-tab-group-dropdown-tab-text-hover,
          unset
        );
        --uui-tab-text-active: var(
          --uui-tab-group-dropdown-tab-text-active,
          unset
        );
      }

      ::slotted(*:not(:last-of-type)) {
        border-right: 1px solid var(--uui-tab-divider, none);
      }

      .hidden-tab {
        width: 100%;
      }

      #hidden-tabs-container {
        width: fit-content;
        display: flex;
        flex-direction: column;
        background-color: var(
          --uui-tab-group-dropdown-background,
          var(--uui-color-surface,#fff)
        );
        border-radius: var(--uui-border-radius,3px);
        box-shadow: var(--uui-shadow-depth-3,0 10px 20px rgba(0,0,0,0.19) , 0 6px 6px rgba(0,0,0,0.23));
        overflow: hidden;
      }
      :host([dropdown-direction='horizontal']) #hidden-tabs-container {
        flex-direction: row;
      }

      #more-button {
        position: relative;

        --uui-button-contrast: var(--uui-tab-text);
        --uui-button-contrast-hover: var(--uui-tab-text-hover);
        --uui-button-background-color: transparent;
        --uui-button-background-color-hover: transparent;
      }
      #more-button::before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-current,#f5c1bc);
        height: 0px;
        border-radius: 3px 3px 0 0;
        opacity: 0;
        transition:
          opacity ease-in 120ms,
          height ease-in 120ms;
      }
      #more-button.active-inside::before {
        opacity: 1;
        height: 4px;
        transition:
          opacity 120ms,
          height ease-out 120ms;
      }
    `
];
Li([
  P("#more-button")
], mt.prototype, "_moreButtonElement", 2);
Li([
  P("#popover-container")
], mt.prototype, "_popoverContainerElement", 2);
Li([
  P("#main")
], mt.prototype, "_mainElement", 2);
Li([
  wt({
    flatten: !0,
    selector: "uui-tab, [uui-tab], [role=tab]"
  })
], mt.prototype, "_slottedNodes", 2);
Li([
  a({
    type: String,
    reflect: !0,
    attribute: "dropdown-content-direction"
  })
], mt.prototype, "dropdownContentDirection", 2);
mt = Li([
  d("uui-tab-group")
], mt);
class q0 extends S {
}
class K0 extends S {
}
var qb = Object.defineProperty, Kb = Object.getOwnPropertyDescriptor, ta = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Kb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && qb(t, i, r), r;
};
let gr = class extends v {
  constructor() {
    super(...arguments), this.color = "default", this.look = "primary";
  }
  render() {
    return l`<slot></slot>`;
  }
};
gr.styles = [
  p`
      :host {
        display: inline-block;
        font-size: var(--uui-tag-font-size, var(--uui-type-small-size,12px));
        font-weight: 700;
        line-height: 1;
        padding: var(
          --uui-tag-padding,
          var(--uui-size-space-1,3px) calc(var(--uui-size-space-1,3px) + 0.5em)
        );
        border-radius: 100px;
        user-select: none;
        border-radius: var(--uui-tag-border-radius, var(--uui-size-4,12px));
        border: 1px solid var(--uui-tag-border-color, transparent);
      }

      slot {
        display: block;
        align-content: center;
        margin: 2px;
      }

      :host {
        --color: var(--uui-color-default,#1b264f);
        --color-standalone: var(--uui-color-default-standalone,rgb(
    28,
    35,
    59
  ));
        --color-contrast: var(--uui-color-default-contrast,#fff);
      }
      :host([color='positive']) {
        --color: var(--uui-color-positive,#0b8152);
        --color-standalone: var(--uui-color-positive-standalone,rgb(
    10,
    115,
    73
  ));
        --color-contrast: var(--uui-color-positive-contrast,#fff);
      }
      :host([color='warning']) {
        --color: var(--uui-color-warning,#fbd142);
        --color-standalone: var(--uui-color-warning-standalone,#a17700);
        --color-contrast: var(--uui-color-warning-contrast,#000);
      }
      :host([color='danger']) {
        --color: var(--uui-color-danger,#d42054);
        --color-standalone: var(--uui-color-danger-standalone,rgb(
    191,
    33,
    78
  ));
        --color-contrast: var(--uui-color-danger-contrast,white);
      }
      :host([color='invalid']) {
        --color: var(--uui-color-invalid,#d42054);
        --color-standalone: var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
        --color-contrast: var(--uui-color-invalid-contrast,white);
      }

      :host {
        background-color: var(--uui-color-surface,#fff);
        color: var(--color-standalone);
        border-color: transparent;
      }
      :host([look='primary']) {
        background-color: var(--color);
        color: var(--color-contrast);
        border-color: transparent;
      }
      :host([look='secondary']) {
        background-color: var(--uui-color-surface-alt,#f3f3f5);
        color: var(--color-standalone);
        border-color: transparent;
      }
      :host([look='outline']) {
        background-color: transparent;
        color: var(--color-standalone);
        border-color: var(--color-standalone);
      }
      :host([look='placeholder']) {
        border-style: dashed;
        background-color: transparent;
        color: var(--color-standalone);
        border-color: var(--uui-color-border-standalone,#c2c2c2);
      }
    `
];
ta([
  a({ reflect: !0 })
], gr.prototype, "color", 2);
ta([
  a({ reflect: !0 })
], gr.prototype, "look", 2);
gr = ta([
  d("uui-tag")
], gr);
class dl extends S {
  static {
    this.CHANGE = "change";
  }
  static {
    this.INPUT = "input";
  }
  constructor(t, i = {}) {
    super(t, {
      bubbles: !0,
      ...i
    });
  }
}
var Xb = Object.defineProperty, Yb = Object.getOwnPropertyDescriptor, J = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Yb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Xb(t, i, r), r;
};
let j = class extends Le(v, "") {
  constructor() {
    super(), this.placeholder = "", this.disabled = !1, this.readonly = !1, this.name = "", this.error = !1, this.minlengthMessage = (e) => `${e} characters left`, this.maxlengthMessage = (e, t) => `Maximum ${e} characters, ${t} too many.`, this.autoHeight = !1, this.addEventListener("mousedown", () => {
      this.style.setProperty("--uui-show-focus-outline", "0");
    }), this.addEventListener("blur", () => {
      this.style.setProperty("--uui-show-focus-outline", "");
    }), this.addValidator(
      "tooShort",
      () => {
        const e = this.minlengthMessage;
        return typeof e == "function" ? e(
          this.minlength ? this.minlength - String(this.value).length : 0
        ) : e;
      },
      () => !!this.minlength && this.value.length < this.minlength
    ), this.addValidator(
      "tooLong",
      () => {
        const e = this.maxlengthMessage;
        return typeof e == "function" ? e(this.maxlength ?? 0, String(this.value).length) : e;
      },
      () => !!this.maxlength && this.value.length > this.maxlength
    );
  }
  connectedCallback() {
    super.connectedCallback(), this.label || console.warn(this.tagName + " needs a `label`", this), this.autoHeight && requestAnimationFrame(() => {
      this.autoUpdateHeight();
    });
  }
  /**
   * This method enables <label for="..."> to focus the select
   */
  async focus() {
    await this.updateComplete, this._textarea.focus();
  }
  async blur() {
    await this.updateComplete, this._textarea.blur();
  }
  /**
   * This method enables <label for="..."> to open the select
   */
  async click() {
    await this.updateComplete, this._textarea.click();
  }
  getFormElement() {
    return this._textarea;
  }
  onInput(e) {
    this.value = e.target.value, this.autoHeight && this.autoUpdateHeight();
  }
  onChange(e) {
    e.stopPropagation(), this.pristine = !1, this.dispatchEvent(new dl(dl.CHANGE));
  }
  autoUpdateHeight() {
    const e = this.shadowRoot.host, t = this._textarea, i = e.scrollTop, o = getComputedStyle(e).height;
    e.style.display = "block", e.style.height = o, t.style.height = "auto", t.scrollHeight + 2 > t.clientHeight ? t.style.height = t.scrollHeight + 2 + "px" : t.scrollHeight + 2 < t.clientHeight && t.style.removeProperty("height"), e.style.removeProperty("display"), e.style.removeProperty("height"), e.scrollTop = i;
  }
  render() {
    return l`
      <textarea
        id="textarea"
        rows=${_(this.rows)}
        cols=${_(this.cols)}
        .value=${this.value}
        .name=${this.name}
        wrap=${_(this.wrap)}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        .disabled=${this.disabled}
        ?readonly=${this.readonly}
        @input=${this.onInput}
        @change=${this.onChange}>
      </textarea>
    `;
  }
};
j.formAssociated = !0;
j.styles = [
  p`
      :host {
        position: relative;
      }
      :host([error]) textarea,
      :host([error]) textarea[disabled] {
        border: 1px solid var(--uui-color-invalid,#d42054) !important;
      }
      :host(:not([pristine]):invalid) textarea,
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) textarea {
        border-color: var(--uui-color-invalid,#d42054);
      }
      :host([auto-height]) textarea {
        resize: none;
      }

      .label {
        display: inline-block;
        margin-bottom: var(--uui-size-1,3px);
        font-weight: bold;
      }

      textarea[readonly] {
        border-color: var(
          --uui-textarea-border-color-readonly,
          var(--uui-color-disabled-standalone,rgb(
    226,
    226,
    226
  ))
        );
        background-color: var(
          --uui-textarea-background-color-readonly,
          var(--uui-color-disabled,#f3f3f5)
        );
      }
      textarea[disabled] {
        cursor: not-allowed;
        background-color: var(
          --uui-textarea-background-color-disabled,
          var(--uui-color-disabled,#f3f3f5)
        );
        border-color: var(
          --uui-textarea-border-color-disabled,
          var(--uui-color-disabled,#f3f3f5)
        );

        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }

      textarea {
        color: var(--uui-color-text,#060606);
        font-family: inherit;
        line-height: var(--uui-size-6,18px);
        box-sizing: border-box;
        min-width: 100%;
        max-width: 100%;
        font-size: inherit;
        padding: var(--uui-size-2,6px);
        border: 1px solid
          var(--uui-textarea-border-color, var(--uui-color-border,#d8d7d9)); /** Note: Specified border size is needed and hardcoded in autoUpdateHeight() */
        border-radius: var(--uui-border-radius,3px);
        outline: none;
        min-height: var(--uui-textarea-min-height);
        max-height: var(--uui-textarea-max-height);
        background-color: var(
          --uui-textarea-background-color,
          var(--uui-color-surface,#fff)
        );
      }
      :host(:hover)
        textarea:not([readonly]):not([disabled])
        :host(:focus-within)
        textarea,
      :host(:focus) textarea {
        border-color: var(
          --uui-textarea-border-color,
          var(--uui-color-border-emphasis,#a1a1a1)
        );
      }
      textarea:focus {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus,#3879ff);
      }
    `
];
J([
  a()
], j.prototype, "placeholder", 2);
J([
  a({ type: Boolean, reflect: !0 })
], j.prototype, "disabled", 2);
J([
  a({ type: Boolean, reflect: !0 })
], j.prototype, "readonly", 2);
J([
  a({ type: String })
], j.prototype, "name", 2);
J([
  a({ type: Boolean, reflect: !0 })
], j.prototype, "error", 2);
J([
  a({ type: Number })
], j.prototype, "minlength", 2);
J([
  a({ attribute: "minlength-message" })
], j.prototype, "minlengthMessage", 2);
J([
  a({ type: Number })
], j.prototype, "maxlength", 2);
J([
  a({ attribute: "maxlength-message" })
], j.prototype, "maxlengthMessage", 2);
J([
  P("#textarea")
], j.prototype, "_textarea", 2);
J([
  a({ type: Boolean, attribute: "auto-height", reflect: !0 })
], j.prototype, "autoHeight", 2);
J([
  a({ type: String })
], j.prototype, "label", 2);
J([
  a({ type: Number })
], j.prototype, "rows", 2);
J([
  a({ type: Number })
], j.prototype, "cols", 2);
J([
  a({ type: String })
], j.prototype, "wrap", 2);
j = J([
  d("uui-textarea")
], j);
class Oe extends S {
  static {
    this.OPENING = "opening";
  }
  static {
    this.OPENED = "opened";
  }
  static {
    this.CLOSING = "closing";
  }
  static {
    this.CLOSED = "closed";
  }
}
var Zb = Object.defineProperty, Qb = Object.getOwnPropertyDescriptor, Ti = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Qb(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Zb(t, i, r), r;
};
let _t = class extends v {
  constructor() {
    super(), this.color = "", this._autoClose = null, this._onOpenTimerComplete = () => {
      this._open && (this.open = !1);
    }, this._timer = null, this._pauseTimer = !1, this.isOpen = !1, this._open = !1, this._animate = !1, this._requestAnimationUpdate = 0, this.addEventListener("keyup", (e) => {
      e.key === "Escape" && (this.open = !1);
    });
  }
  get autoClose() {
    return this._autoClose;
  }
  set autoClose(e) {
    this._autoClose = e, e !== null ? (this._timer === null ? this._timer = new Th(this._onOpenTimerComplete, e) : this._timer.setDuration(e), this._pauseTimer === !1 && this.isOpen === !0 && this._animate === !1 && this._timer.start()) : (this._timer?.destroy(), this._timer = null);
  }
  /**
   * Pause the auto close timer.
   */
  pauseAutoClose() {
    this._pauseTimer = !0, this._timer !== null && this._timer.pause();
  }
  /**
   * Resume the auto close timer.
   */
  resumeAutoClose() {
    this._pauseTimer = !1, this._timer !== null && this.isOpen === !0 && this._animate === !1 && this._timer.restart();
  }
  get open() {
    return this._open;
  }
  set open(e) {
    e === !0 ? this._makeOpen() : this._makeClose();
  }
  connectedCallback() {
    super.connectedCallback(), y(this, "uui-button"), y(this, "uui-icon");
  }
  _getAnimationDuration() {
    return parseInt(
      getComputedStyle(this).getPropertyValue(
        "--uui-toast-notification-animation-duration"
      ),
      10
    ) || 480;
  }
  _makeOpen() {
    this._open !== !0 && (this._open = !0, this.updateComplete.then(() => {
      this._open === !0 && (cancelAnimationFrame(this._requestAnimationUpdate), this._requestAnimationUpdate = requestAnimationFrame(() => {
        clearTimeout(this._animationTimeout), this.isOpen = !0, this.setAttribute("is-open", ""), this.style.height = this._toastEl.getBoundingClientRect().height + "px", this._animate = !0, this.dispatchEvent(
          new Oe(Oe.OPENING)
        ), this._animationTimeout = window.setTimeout(() => {
          this.isOpen === !0 && (this.style.height = "auto", this._animate = !1, this._pauseTimer === !1 && this._timer?.start(), this.dispatchEvent(
            new Oe(Oe.OPENED)
          ));
        }, this._getAnimationDuration());
      }));
    }));
  }
  _makeClose() {
    if (this._open === !1)
      return;
    const e = new Oe(
      Oe.CLOSING,
      { cancelable: !0 }
    );
    this.dispatchEvent(e), e.defaultPrevented !== !0 && (this._open = !1, this._timer?.pause(), cancelAnimationFrame(this._requestAnimationUpdate), this.isOpen === !0 && (this._requestAnimationUpdate = requestAnimationFrame(() => {
      clearTimeout(this._animationTimeout), this.isOpen = !1, this.removeAttribute("is-open"), this.style.height = this._toastEl.getBoundingClientRect().height + "px", this._animate = !0, requestAnimationFrame(() => {
        this.style.height = "0";
      }), this._animationTimeout = window.setTimeout(() => {
        this.isOpen === !1 && (this._animate = !1, this.dispatchEvent(
          new Oe(Oe.CLOSED)
        ), this.parentNode && this.parentNode.removeChild(this));
      }, this._getAnimationDuration());
    })));
  }
  render() {
    return l`
      <div id="toast" class=${this._animate ? "animate" : ""}>
        <div>
          <div id="close">
            <uui-button
              .label=${"close"}
              .color=${this.color}
              .look=${this.color ? "primary" : "default"}
              @click=${() => this.open = !1}>
              <uui-icon
                name="remove"
                .fallback=${An.strings[0]}></uui-icon>
            </uui-button>
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }
};
_t.styles = [
  _r,
  p`
      :host {
        --uui-toast-notification-margin: var(--uui-size-space-2,6px);

        position: relative;
        display: block;
        width: 100%;
        max-width: 400px;
        margin: 0 var(--uui-toast-notification-margin);
        box-sizing: border-box;

        height: 0;
        pointer-events: none;

        transition: height
          var(--uui-toast-notification-animation-duration, 480ms) ease-in-out;
      }
      :host([is-open]) {
        pointer-events: all;
        transition-timing-function: cubic-bezier(
          0.19,
          1,
          0.22,
          1
        ); /* easeOutExpo */
      }

      #toast {
        position: relative;
        display: block;
        padding: calc(var(--uui-toast-notification-margin) * 0.5) 0;
        width: 100%;
        max-width: 400px;
      }
      #toast.animate {
        position: absolute;
      }

      #toast > div {
        position: relative;
        display: block;

        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-1,0 1px 3px rgba(0,0,0,0.12) , 0 1px 2px rgba(0,0,0,0.24));
        background-color: var(--uui-color-surface,#fff);
        padding: var(--uui-size-layout-1,24px);
        padding-right: var(--uui-size-layout-1,24px);
        padding-left: var(--uui-size-layout-3,42px);
        border-radius: calc(var(--uui-border-radius,3px) * 2);

        opacity: 0;
        transition: opacity
          var(--uui-toast-notification-animation-duration, 480ms);
      }
      :host([is-open]) #toast > div {
        opacity: 1;
      }

      #close {
        float: right;
        margin-top: -6px;
        margin-left: var(--uui-size-space-1,3px);
        margin-bottom: -4px;
      }

      #close > uui-button {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-padding-left-factor: 1.5;
        --uui-button-padding-right-factor: 1.5;
      }

      :host #toast > div {
        background-color: var(--uui-color-surface,#fff);
        color: var(--uui-color-text,#060606);
        border-color: var(--uui-color-surface,#fff);
      }
      :host([color='default']) #toast > div {
        background-color: var(--uui-color-default,#1b264f);
        color: var(--uui-color-default-contrast,#fff);
        border-color: var(--uui-color-default-standalone,rgb(
    28,
    35,
    59
  ));
      }
      :host([color='positive']) #toast > div {
        background-color: var(--uui-color-positive,#0b8152);
        color: var(--uui-color-positive-contrast,#fff);
        border-color: var(--uui-color-positive-standalone,rgb(
    10,
    115,
    73
  ));
      }
      :host([color='warning']) #toast > div {
        background-color: var(--uui-color-warning,#fbd142);
        color: var(--uui-color-warning-contrast,#000);
        border-color: var(--uui-color-warning-standalone,#a17700);
      }
      :host([color='danger']) #toast > div {
        background-color: var(--uui-color-danger,#d42054);
        color: var(--uui-color-danger-contrast,white);
        border-color: var(--uui-color-danger-standalone,rgb(
    191,
    33,
    78
  ));
      }
      :host([color='invalid']) #toast > div {
        background-color: var(--uui-color-invalid,#d42054);
        color: var(--uui-color-invalid-contrast,white);
        border-color: var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
      }
    `
];
Ti([
  a({ reflect: !0 })
], _t.prototype, "color", 2);
Ti([
  a({ type: Number })
], _t.prototype, "autoClose", 1);
Ti([
  P("#toast")
], _t.prototype, "_toastEl", 2);
Ti([
  g()
], _t.prototype, "_animate", 2);
Ti([
  a({ type: Boolean, reflect: !0 })
], _t.prototype, "open", 1);
_t = Ti([
  d("uui-toast-notification")
], _t);
var Jb = Object.defineProperty, e0 = Object.getOwnPropertyDescriptor, sc = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? e0(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Jb(t, i, r), r;
};
let Ro = class extends v {
  constructor() {
    super(...arguments), this._autoClose = null, this._autoClosePause = !1, this.pauseAutoClose = () => {
      this._autoClosePause = !0, this._toasts?.forEach((e) => e.pauseAutoClose());
    }, this.resumeAutoClose = () => {
      this.matches(":focus-within:not(:focus)") === !1 && (this._autoClosePause = !1, this._toasts?.forEach((e) => e.resumeAutoClose()));
    }, this.onToastClosed = (e) => {
      this.removeToast(e.target);
    }, this._toasts = [], this.onSlotChanged = (e) => {
      const t = [...this._toasts];
      this._toasts = e.target.assignedElements({ flatten: !0 }).filter(
        (r) => r.nodeName === "UUI-TOAST-NOTIFICATION"
      ), t.filter(
        (r) => this._toasts.indexOf(r) === -1
      ).forEach((r) => {
        r.removeEventListener(
          Oe.CLOSED,
          this.onToastClosed
        ), r.removeEventListener("mouseenter", this.pauseAutoClose), r.removeEventListener("mouseleave", this.resumeAutoClose), r.removeEventListener("focus", this.pauseAutoClose), r.removeEventListener("blur", this.resumeAutoClose);
      }), this._toasts.filter(
        (r) => t.indexOf(r) === -1
      ).forEach((r) => {
        r.addEventListener(
          Oe.CLOSED,
          this.onToastClosed
        ), r.addEventListener("mouseenter", this.pauseAutoClose), r.addEventListener("mouseleave", this.resumeAutoClose), r.addEventListener("focus", this.pauseAutoClose), r.addEventListener("blur", this.resumeAutoClose), this._autoClose && (r.autoClose = this._autoClose), this._autoClosePause === !0 && r.pauseAutoClose(), r.open = !0;
      });
    };
  }
  get autoClose() {
    return this._autoClose;
  }
  set autoClose(e) {
    this._autoClose = e, this._toasts?.forEach((t) => t.autoClose = e);
  }
  /**
   * Instantly remove a toast element.
   * @param  {UUIToastNotificationElement} toast The toast element to remove
   */
  removeToast(e) {
    if (!e)
      e = this._toasts[this._toasts.length - 1];
    else if (this._toasts.indexOf(e) === -1) {
      console.warn(
        "Toast-notification",
        e,
        "could not be removed as it is not a child of this toast-notification-container",
        this
      );
      return;
    }
    this.removeChild(e);
  }
  /**
   * Close a toast element, this will animate out and then be removed.
   * @param  {UUIToastNotificationElement} toast The toast element to close and remove
   */
  closeToast(e) {
    let t = e;
    t || (t = this._toasts[this._toasts.length - 1]), t.open = !1;
  }
  render() {
    return l` <slot @slotchange=${this.onSlotChanged}></slot> `;
  }
};
Ro.styles = [
  p`
      :host {
        position: absolute;
        overflow: hidden;
        max-width: 100%;
        height: 100%;

        pointer-events: none;
        box-sizing: border-box;
      }

      slot {
        display: flex;
        flex-direction: column;
        align-items: end;

        height: 100%;
        box-sizing: border-box;

        padding-top: var(--uui-size-space-1,3px);
        padding-bottom: var(--uui-size-space-1,3px);
      }
      :host([bottom-up]) slot {
        justify-content: end;
      }
      :host([left-align]) slot {
        align-items: start;
      }
    `
];
sc([
  a({ type: Number, reflect: !0, attribute: "auto-close" })
], Ro.prototype, "_autoClose", 2);
Ro = sc([
  d("uui-toast-notification-container")
], Ro);
var t0 = Object.defineProperty, i0 = Object.getOwnPropertyDescriptor, ia = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? i0(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && t0(t, i, r), r;
};
let mr = class extends v {
  constructor() {
    super(...arguments), this.headline = "", this._headlineSlotHasContent = !1, this._headlineSlotChanged = (e) => {
      this._headlineSlotHasContent = e.target.assignedNodes({ flatten: !0 }).length > 0;
    };
  }
  render() {
    return l`
      <div id="message" class="uui-text">
        <h5
          style=${this._headlineSlotHasContent || this.headline && this.headline !== "" ? "" : "display: none"}>
          ${this.headline}
          <slot name="headline" @slotchange=${this._headlineSlotChanged}></slot>
        </h5>
        <slot></slot>
        <slot id="actions" name="actions"></slot>
      </div>
    `;
  }
};
mr.styles = [
  _r,
  p`
      #message {
        margin-bottom: calc(var(--uui-size-space-1,3px) * -1);
      }
      #message::after {
        content: '';
        display: block;
        clear: both;
      }
      #actions {
        /*
        display: flex;
        width: 100%;
        justify-content: flex-end;
        */
        display: block;
        float: right;

        margin-top: var(--uui-size-space-4,12px);
        margin-bottom: calc(var(--uui-size-space-2,6px) * -1);
      }
    `
];
ia([
  a({ type: String })
], mr.prototype, "headline", 2);
ia([
  g()
], mr.prototype, "_headlineSlotHasContent", 2);
mr = ia([
  d("uui-toast-notification-layout")
], mr);
var r0 = Object.getOwnPropertyDescriptor, o0 = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? r0(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let Fo = class extends Te {
  constructor() {
    super("switch");
  }
  renderCheckbox() {
    return l`
      <div id="toggle">
        <div id="icon-checked">${Qo}</div>
        <div id="icon-unchecked">${An}</div>
      </div>
    `;
  }
};
Fo.formAssociated = !0;
Fo.styles = [
  ...Te.styles,
  Yo,
  p`
      :host {
        --uui-toggle-size: 18px;
        --uui-toggle-switch-width: calc(2 * var(--uui-toggle-size));
      }

      #toggle {
        position: relative;
        grid-area: 'input';
        display: flex;
        align-items: center;

        flex-shrink: 0;

        width: var(--uui-toggle-switch-width);
        height: var(--uui-toggle-size);
        border-radius: 100px;

        background-color: var(
          --uui-toggle-background-color,
          var(--uui-color-border,#d8d7d9)
        );
        border: 1px solid
          var(--uui-toggle-border-color, var(--uui-color-border-standalone,#c2c2c2));
        font-size: calc(var(--uui-toggle-size) * 0.6);
      }

      label:hover input:not([disabled]) ~ #toggle {
        border-color: var(
          --uui-toggle-border-color-hover,
          var(--uui-color-border-emphasis,#a1a1a1)
        );
        background-color: var(
          --uui-toggle-background-color-hover,
          var(--uui-color-border,#d8d7d9)
        );
      }

      label:focus #toggle {
        border-color: var(
          --uui-toggle-border-color-focus,
          var(--uui-color-focus,#3879ff)
        );
        background-color: var(
          --uui-toggle-background-color-focus,
          var(--uui-color-surface-emphasis,rgb(
    250,
    250,
    250
  ))
        );
      }

      input:checked ~ #toggle {
        background-color: var(--uui-color-selected,#3544b1);
      }

      label:hover input:checked:not([disabled]) ~ #toggle {
        background-color: var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
      }

      label:focus input:checked ~ #toggle {
        background-color: var(--uui-color-selected-emphasis,rgb(
    70,
    86,
    200
  ));
      }

      #icon-checked,
      #icon-unchecked {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 0;
        transition: color 120ms;
      }

      #icon-checked {
        margin-left: -0.5em;
        left: calc(var(--uui-toggle-size) * 0.5);
        color: var(--uui-color-interactive,#1b264f);
      }

      #icon-unchecked {
        margin-right: -0.5em;
        right: calc(var(--uui-toggle-size) * 0.5);
        color: var(--uui-color-interactive,#1b264f);
      }

      input:checked ~ #toggle #icon-checked {
        color: var(--uui-color-selected-contrast,#fff);
      }

      #toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--uui-toggle-size) - 4px);
        height: calc(var(--uui-toggle-size) - 4px);
        border-radius: 100px;
        background-color: var(--uui-color-selected-contrast,#fff);
        transition:
          width 120ms ease,
          left 120ms ease,
          transform 120ms ease,
          background-color 120ms;
      }

      input:checked ~ #toggle::after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }

      input:focus ~ #toggle {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus,#3879ff);
      }

      :host(:not([disabled], [readonly])) label:active #toggle::after {
        /** Stretch when mouse down */
        width: calc(1.06 * var(--uui-toggle-size));
      }

      :host([disabled]) #toggle {
        background-color: var(--uui-color-disabled-standalone,rgb(
    226,
    226,
    226
  ));
      }
      :host([disabled]) input:checked ~ #toggle {
        background-color: var(--uui-color-disabled-contrast,#c4c4c4);
      }
      :host([disabled]) #toggle::after {
        background-color: var(--uui-color-disabled,#f3f3f5);
      }
      :host([disabled]) #toggle #icon-unchecked {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }
      :host([disabled]) label:active #toggle {
        animation: ${Zo};
      }
      :host([disabled]) input:checked #toggle #icon-checked {
        color: var(--uui-color-disabled-contrast,#c4c4c4);
      }

      :host(:not([pristine]):invalid) #toggle,
      :host(:not([pristine]):invalid) label:hover #toggle,
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) #toggle,
      :host(:not([pristine])[internals-invalid]) label:hover #toggle {
        border: 1px solid var(--uui-color-invalid-standalone,rgb(
    191,
    33,
    78
  ));
      }
    `
];
Fo = o0([
  d("uui-toggle")
], Fo);
var s0 = Object.getOwnPropertyDescriptor, n0 = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? s0(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
};
let wn = class extends v {
  render() {
    return l`<slot></slot>`;
  }
};
wn.styles = [
  p`
      :host(:not(:focus-within)) {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        clip: rect(0 0 0 0) !important;
        clip-path: inset(50%) !important;
        border: none !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        padding: 0 !important;
      }
    `
];
wn = n0([
  d("uui-visually-hidden")
], wn);
export {
  x0 as ActiveMixin,
  $0 as LabelMixin,
  D0 as PopoverTargetMixin,
  C0 as SelectOnlyMixin,
  k0 as SelectableMixin,
  P0 as Timer,
  As as UUIActionBarElement,
  ut as UUIAvatarElement,
  ui as UUIAvatarGroupElement,
  ci as UUIBadgeElement,
  v0 as UUIBlinkAnimationValue,
  p0 as UUIBlinkKeyframes,
  Te as UUIBooleanInputElement,
  ma as UUIBooleanInputEvent,
  Ye as UUIBoxElement,
  hi as UUIBreadcrumbItemElement,
  ho as UUIBreadcrumbsElement,
  di as UUIButtonCopyTextElement,
  te as UUIButtonElement,
  nr as UUIButtonGroupElement,
  Qe as UUIButtonInlineCreateElement,
  xa as UUIButtonInlineCreateEvent,
  pi as UUICardBlockTypeElement,
  vi as UUICardContentNodeElement,
  Z as UUICardElement,
  Ar as UUICardEvent,
  Dt as UUICardMediaElement,
  ar as UUICardUserElement,
  mo as UUICaretElement,
  vo as UUICheckboxElement,
  fe as UUIColorAreaElement,
  za as UUIColorAreaEvent,
  Mr as UUIColorPickerChangeEvent,
  L as UUIColorPickerElement,
  ae as UUIColorSliderElement,
  Ya as UUIColorSliderEvent,
  ct as UUIColorSwatchElement,
  Lt as UUIColorSwatchesElement,
  Lr as UUIColorSwatchesEvent,
  G as UUIComboboxElement,
  Pe as UUIComboboxEvent,
  Me as UUIComboboxListElement,
  Ae as UUIComboboxListEvent,
  ht as UUIComboboxListOptionElement,
  Ir as UUICopyTextEvent,
  js as UUIDialogElement,
  lr as UUIDialogLayoutElement,
  yl as UUIEvent,
  dt as UUIFileDropzoneElement,
  Tr as UUIFileDropzoneEvent,
  be as UUIFilePreviewElement,
  Wt as UUIFormControlEvent,
  E0 as UUIFormControlMixin,
  Ja as UUIFormElement,
  fi as UUIFormLayoutItemElement,
  Co as UUIFormValidationMessageElement,
  b0 as UUIHorizontalPulseAnimationValue,
  f0 as UUIHorizontalPulseKeyframes,
  m0 as UUIHorizontalShakeAnimationValue,
  g0 as UUIHorizontalShakeKeyframes,
  Je as UUIIconElement,
  el as UUIIconHost,
  pu as UUIIconRegistry,
  Po as UUIIconRegistryElement,
  wv as UUIIconRegistryEssential,
  tl as UUIIconRegistryEssentialElement,
  Eo as UUIIconRequestEvent,
  z as UUIInputElement,
  Nr as UUIInputEvent,
  pt as UUIInputFileElement,
  bi as UUIInputLockElement,
  il as UUIInputLockEvent,
  ur as UUIInputPasswordElement,
  N0 as UUIInterfaceColorValues,
  V0 as UUIInterfaceHeadingValues,
  T0 as UUIInterfaceLookValues,
  Gs as UUIKeyElement,
  Ws as UUIKeyboardShortcutElement,
  gi as UUILabelElement,
  cr as UUILoaderBarElement,
  hr as UUILoaderCircleElement,
  qs as UUILoaderElement,
  le as UUIMenuItemElement,
  er as UUIMenuItemEvent,
  of as UUIModalCloseEndEvent,
  Wi as UUIModalCloseEvent,
  vt as UUIModalContainerElement,
  Js as UUIModalDialogElement,
  $e as UUIModalElement,
  rf as UUIModalOpenEvent,
  dr as UUIModalSidebarElement,
  ie as UUIPaginationElement,
  qt as UUIPaginationEvent,
  et as UUIPopoverContainerElement,
  Tt as UUIPopoverElement,
  So as UUIProgressBarElement,
  _e as UUIRadioElement,
  Oo as UUIRadioEvent,
  _i as UUIRadioGroupElement,
  nl as UUIRadioGroupEvent,
  M as UUIRangeSliderElement,
  ft as UUIRefElement,
  jr as UUIRefEvent,
  hn as UUIRefListElement,
  Uo as UUIRefNodeDataTypeElement,
  zo as UUIRefNodeDocumentTypeElement,
  V as UUIRefNodeElement,
  dn as UUIRefNodeFormElement,
  Mo as UUIRefNodeMemberElement,
  vr as UUIRefNodePackageElement,
  Do as UUIRefNodeUserElement,
  Lo as UUIScrollContainerElement,
  ue as UUISelectElement,
  ll as UUISelectEvent,
  Pr as UUISelectableEvent,
  q as UUISliderElement,
  Rr as UUISliderEvent,
  To as UUISymbolExpandElement,
  ko as UUISymbolFileDropzoneElement,
  No as UUISymbolFileElement,
  fr as UUISymbolFileThumbnailElement,
  vn as UUISymbolFolderElement,
  Vo as UUISymbolLockElement,
  fn as UUISymbolMoreElement,
  Bo as UUISymbolSortElement,
  gt as UUITabElement,
  q0 as UUITabEvent,
  mt as UUITabGroupElement,
  K0 as UUITabGroupEvent,
  bt as UUITableCellElement,
  gn as UUITableColumnElement,
  bn as UUITableElement,
  mn as UUITableHeadCellElement,
  _n as UUITableHeadElement,
  Ho as UUITableRowElement,
  gr as UUITagElement,
  _r as UUITextStyles,
  j as UUITextareaElement,
  dl as UUITextareaEvent,
  Ro as UUIToastNotificationContainerElement,
  _t as UUIToastNotificationElement,
  Oe as UUIToastNotificationEvent,
  mr as UUIToastNotificationLayoutElement,
  Fo as UUIToggleElement,
  wn as UUIVisuallyHiddenElement,
  A0 as clamp,
  L0 as defineElement,
  O0 as demandCustomElement,
  I0 as drag,
  Fc as findAncestorByAttributeValue,
  U0 as reverseNumberInRange,
  M0 as slotHasContent,
  z0 as toHex
};
//# sourceMappingURL=index.js.map
