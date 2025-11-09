/*
 * @license
 * Portions Copyright (c) 2013, the Dart project authors.
 */
const O = ["this"], y = ["+", "-", "!"], m = [
  "=",
  "+",
  "-",
  "*",
  "/",
  "%",
  "^",
  "==",
  "!=",
  ">",
  "<",
  ">=",
  "<=",
  "||",
  "&&",
  "??",
  "&",
  "===",
  "!==",
  "|",
  "|>"
], E = {
  "!": 0,
  ":": 0,
  ",": 0,
  ")": 0,
  "]": 0,
  "}": 0,
  "|>": 1,
  "?": 2,
  "??": 3,
  "||": 4,
  "&&": 5,
  "|": 6,
  "^": 7,
  "&": 8,
  // equality
  "!=": 9,
  "==": 9,
  "!==": 9,
  "===": 9,
  // relational
  ">=": 10,
  ">": 10,
  "<=": 10,
  "<": 10,
  // additive
  "+": 11,
  "-": 11,
  // multiplicative
  "%": 12,
  "/": 12,
  "*": 12,
  // postfix
  "(": 13,
  "[": 13,
  ".": 13,
  "{": 13
  // not sure this is correct
}, v = 13;
/*
 * @license
 * Portions Copyright (c) 2013, the Dart project authors.
 */
const w = ["==", "!=", "<=", ">=", "||", "&&", "??", "|>"], g = ["===", "!=="];
var i;
(function(e) {
  e[e.STRING = 1] = "STRING", e[e.IDENTIFIER = 2] = "IDENTIFIER", e[e.DOT = 3] = "DOT", e[e.COMMA = 4] = "COMMA", e[e.COLON = 5] = "COLON", e[e.INTEGER = 6] = "INTEGER", e[e.DECIMAL = 7] = "DECIMAL", e[e.OPERATOR = 8] = "OPERATOR", e[e.GROUPER = 9] = "GROUPER", e[e.KEYWORD = 10] = "KEYWORD", e[e.ARROW = 11] = "ARROW";
})(i || (i = {}));
const o = (e, t, r = 0) => ({
  kind: e,
  value: t,
  precedence: r
}), x = (e) => e === 9 || e === 10 || e === 13 || e === 32, I = (e) => e === 95 || e === 36 || // ch &= ~32 puts ch into the range [65,90] [A-Z] only if ch was already in
// the that range or in the range [97,122] [a-z]. We must mutate ch only after
// checking other characters, thus the comma operator.
(e &= -33, 65 <= e && e <= 90), k = (e) => I(e) || d(e), T = (e) => O.indexOf(e) !== -1, A = (e) => e === 34 || e === 39, d = (e) => 48 <= e && e <= 57, P = (e) => e === 43 || e === 45 || e === 42 || e === 47 || e === 33 || e === 38 || e === 37 || e === 60 || e === 61 || e === 62 || e === 63 || e === 94 || e === 124, _ = (e) => e === 40 || e === 41 || e === 91 || e === 93 || e === 123 || e === 125, D = (e) => e.replace(/\\(.)/g, (t, r) => {
  switch (r) {
    case "n":
      return `
`;
    case "r":
      return "\r";
    case "t":
      return "	";
    case "b":
      return "\b";
    case "f":
      return "\f";
    default:
      return r;
  }
});
class G {
  #i;
  #h = -1;
  #s = 0;
  #e;
  constructor(t) {
    this.#i = t, this.#t();
  }
  nextToken() {
    for (; x(this.#e); )
      this.#t(!0);
    if (A(this.#e))
      return this.#u();
    if (I(this.#e))
      return this.#l();
    if (d(this.#e))
      return this.#c();
    if (this.#e === 46)
      return this.#a();
    if (this.#e === 44)
      return this.#f();
    if (this.#e === 58)
      return this.#o();
    if (P(this.#e))
      return this.#p();
    if (_(this.#e))
      return this.#E();
    if (this.#t(), this.#e !== void 0)
      throw new Error(`Expected end of input, got ${this.#e}`);
  }
  #t(t) {
    this.#h++, this.#h < this.#i.length ? (this.#e = this.#i.charCodeAt(this.#h), t === !0 && (this.#s = this.#h)) : this.#e = void 0;
  }
  #r(t = 0) {
    const r = this.#i.substring(this.#s, this.#h + t);
    return t === 0 && this.#n(), r;
  }
  #n() {
    this.#s = this.#h;
  }
  #u() {
    const t = "unterminated string", r = this.#e;
    for (this.#t(!0); this.#e !== r; ) {
      if (this.#e === void 0)
        throw new Error(t);
      if (this.#e === 92 && (this.#t(), this.#e === void 0))
        throw new Error(t);
      this.#t();
    }
    const s = o(i.STRING, D(this.#r()));
    return this.#t(), s;
  }
  #l() {
    do
      this.#t();
    while (k(this.#e));
    const t = this.#r(), r = T(t) ? i.KEYWORD : i.IDENTIFIER;
    return o(r, t);
  }
  #c() {
    do
      this.#t();
    while (d(this.#e));
    return this.#e === 46 ? this.#a() : o(i.INTEGER, this.#r());
  }
  #a() {
    return this.#t(), d(this.#e) ? this.#d() : (this.#n(), o(i.DOT, ".", v));
  }
  #f() {
    return this.#t(!0), o(i.COMMA, ",");
  }
  #o() {
    return this.#t(!0), o(i.COLON, ":");
  }
  #d() {
    do
      this.#t();
    while (d(this.#e));
    return o(i.DECIMAL, this.#r());
  }
  #p() {
    this.#t();
    let t = this.#r(2);
    if (g.indexOf(t) !== -1)
      this.#t(), this.#t();
    else {
      if (t = this.#r(1), t === "=>")
        return this.#t(), o(i.ARROW, t);
      w.indexOf(t) !== -1 && this.#t();
    }
    return t = this.#r(), o(i.OPERATOR, t, E[t]);
  }
  #E() {
    const t = String.fromCharCode(this.#e), r = o(i.GROUPER, t, E[t]);
    return this.#t(!0), r;
  }
}
/*
 * @license
 * Portions Copyright (c) 2013, the Dart project authors.
 */
const S = (e, t) => new N(e, t).parse();
class N {
  #i;
  #h;
  #s;
  #e;
  #t;
  constructor(t, r) {
    this.#h = new G(t), this.#s = r;
  }
  parse() {
    return this.#r(), this.#n();
  }
  #r(t, r) {
    if (!this._matches(t, r))
      throw new Error(`Expected kind ${t} (${r}), was ${this.#e?.kind} (${this.#e?.value})`);
    const s = this.#h.nextToken();
    this.#e = s, this.#i = s?.kind, this.#t = s?.value;
  }
  _matches(t, r) {
    return !(t && this.#i !== t || r && this.#t !== r);
  }
  #n() {
    if (!this.#e)
      return this.#s.empty();
    const t = this.#a();
    return t === void 0 ? void 0 : this.#u(t, 0);
  }
  // #parsePrecedence and #parseBinary implement the precedence climbing
  // algorithm as described in:
  // http://en.wikipedia.org/wiki/Operator-precedence_parser#Precedence_climbing_method
  #u(t, r) {
    if (t === void 0)
      throw new Error("Expected left to be defined.");
    for (; this.#e; )
      if (this._matches(i.GROUPER, "(")) {
        const s = this.#R();
        t = this.#s.invoke(t, void 0, s);
      } else if (this._matches(i.GROUPER, "[")) {
        const s = this.#y();
        t = this.#s.index(t, s);
      } else if (this._matches(i.DOT)) {
        this.#r();
        const s = this.#a();
        t = this.#l(t, s);
      } else {
        if (this._matches(i.KEYWORD))
          break;
        if (this._matches(i.OPERATOR) && this.#e.precedence >= r)
          t = this.#t === "?" ? this.#f(t) : this.#c(t, this.#e);
        else
          break;
      }
    return t;
  }
  #l(t, r) {
    if (r === void 0)
      throw new Error("expected identifier");
    if (r.type === "ID")
      return this.#s.getter(t, r.value);
    if (r.type === "Invoke" && r.receiver.type === "ID") {
      const s = r.receiver;
      return this.#s.invoke(t, s.value, r.arguments);
    } else
      throw new Error(`expected identifier: ${r}`);
  }
  #c(t, r) {
    if (m.indexOf(r.value) === -1)
      throw new Error(`unknown operator: ${r.value}`);
    this.#r();
    let s = this.#a();
    for (; (this.#i === i.OPERATOR || this.#i === i.DOT || this.#i === i.GROUPER) && this.#e.precedence > r.precedence; )
      s = this.#u(s, this.#e.precedence);
    return this.#s.binary(t, r.value, s);
  }
  #a() {
    if (this._matches(i.OPERATOR)) {
      const t = this.#t;
      if (this.#r(), t === "+" || t === "-") {
        if (this._matches(i.INTEGER))
          return this.#O(t);
        if (this._matches(i.DECIMAL))
          return this.#v(t);
      }
      if (y.indexOf(t) === -1)
        throw new Error(`unexpected token: ${t}`);
      const r = this.#u(this.#o(), v);
      return this.#s.unary(t, r);
    }
    return this.#o();
  }
  #f(t) {
    this.#r(i.OPERATOR, "?");
    const r = this.#n();
    this.#r(i.COLON);
    const s = this.#n();
    return this.#s.ternary(t, r, s);
  }
  #o() {
    switch (this.#i) {
      case i.KEYWORD:
        const t = this.#t;
        if (t === "this")
          return this.#r(), this.#s.id(t);
        throw O.indexOf(t) !== -1 ? new Error(`unexpected keyword: ${t}`) : new Error(`unrecognized keyword: ${t}`);
      case i.IDENTIFIER:
        return this.#E();
      case i.STRING:
        return this.#w();
      case i.INTEGER:
        return this.#O();
      case i.DECIMAL:
        return this.#v();
      case i.GROUPER:
        return this.#t === "(" ? this.#m() : this.#t === "{" ? this.#p() : this.#t === "[" ? this.#d() : void 0;
      case i.COLON:
        throw new Error('unexpected token ":"');
      default:
        return;
    }
  }
  #d() {
    const t = [];
    do {
      if (this.#r(), this._matches(i.GROUPER, "]"))
        break;
      t.push(this.#n());
    } while (this._matches(i.COMMA));
    return this.#r(i.GROUPER, "]"), this.#s.list(t);
  }
  #p() {
    const t = {};
    do {
      if (this.#r(), this._matches(i.GROUPER, "}"))
        break;
      const r = this.#t;
      (this._matches(i.STRING) || this._matches(i.IDENTIFIER)) && this.#r(), this.#r(i.COLON), t[r] = this.#n();
    } while (this._matches(i.COMMA));
    return this.#r(i.GROUPER, "}"), this.#s.map(t);
  }
  #E() {
    const t = this.#t;
    if (t === "true")
      return this.#r(), this.#s.literal(!0);
    if (t === "false")
      return this.#r(), this.#s.literal(!1);
    if (t === "null")
      return this.#r(), this.#s.literal(null);
    if (t === "undefined")
      return this.#r(), this.#s.literal(void 0);
    const r = this.#I(), s = this.#R();
    return s ? this.#s.invoke(r, void 0, s) : r;
  }
  #I() {
    if (!this._matches(i.IDENTIFIER))
      throw new Error(`expected identifier: ${this.#t}`);
    const t = this.#t;
    return this.#r(), this.#s.id(t);
  }
  #R() {
    if (!this._matches(i.GROUPER, "("))
      return;
    const t = [];
    do {
      if (this.#r(), this._matches(i.GROUPER, ")"))
        break;
      const r = this.#n();
      t.push(r);
    } while (this._matches(i.COMMA));
    return this.#r(i.GROUPER, ")"), t;
  }
  #y() {
    this.#r();
    const t = this.#n();
    return this.#r(i.GROUPER, "]"), t;
  }
  #m() {
    const t = this.#R();
    if (this._matches(i.ARROW)) {
      this.#r();
      const r = this.#n(), s = t?.map((n) => n.value) ?? [];
      return this.#s.arrowFunction(s, r);
    } else
      return this.#s.paren(t[0]);
  }
  #w() {
    const t = this.#s.literal(this.#t);
    return this.#r(), t;
  }
  #O(t = "") {
    const r = this.#s.literal(parseInt(`${t}${this.#t}`, 10));
    return this.#r(), r;
  }
  #v(t = "") {
    const r = this.#s.literal(parseFloat(`${t}${this.#t}`));
    return this.#r(), r;
  }
}
/*
 * @license
 * Portions Copyright (c) 2013, the Dart project authors.
 */
class U {
  empty() {
    return { type: "Empty" };
  }
  // TODO(justinfagnani): just use a JS literal?
  literal(t) {
    return {
      type: "Literal",
      value: t
    };
  }
  id(t) {
    return {
      type: "ID",
      value: t
    };
  }
  unary(t, r) {
    return {
      type: "Unary",
      operator: t,
      child: r
    };
  }
  binary(t, r, s) {
    return {
      type: "Binary",
      operator: r,
      left: t,
      right: s
    };
  }
  getter(t, r) {
    return {
      type: "Getter",
      receiver: t,
      name: r
    };
  }
  invoke(t, r, s) {
    if (s === void 0)
      throw new Error("args");
    return {
      type: "Invoke",
      receiver: t,
      method: r,
      arguments: s
    };
  }
  paren(t) {
    return {
      type: "Paren",
      child: t
    };
  }
  index(t, r) {
    return {
      type: "Index",
      receiver: t,
      argument: r
    };
  }
  ternary(t, r, s) {
    return {
      type: "Ternary",
      condition: t,
      trueExpr: r,
      falseExpr: s
    };
  }
  map(t) {
    return {
      type: "Map",
      entries: t
    };
  }
  list(t) {
    return {
      type: "List",
      items: t
    };
  }
  arrowFunction(t, r) {
    return {
      type: "ArrowFunction",
      params: t,
      body: r
    };
  }
}
/*
 * @license
 * Portions Copyright (c) 2013, the Dart project authors.
 */
const { hasOwn: R, fromEntries: C } = Object, b = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t) => e % t,
  "==": (e, t) => e == t,
  "!=": (e, t) => e != t,
  "===": (e, t) => e === t,
  "!==": (e, t) => e !== t,
  ">": (e, t) => e > t,
  ">=": (e, t) => e >= t,
  "<": (e, t) => e < t,
  "<=": (e, t) => e <= t,
  "||": (e, t) => e || t,
  "&&": (e, t) => e && t,
  "??": (e, t) => e ?? t,
  "|": (e, t) => t(e),
  "|>": (e, t) => t(e)
}, M = {
  "+": (e) => e,
  "-": (e) => -e,
  "!": (e) => !e
};
class F {
  empty() {
    return {
      type: "Empty",
      evaluate(t) {
        return t;
      },
      getIds(t) {
        return t;
      }
    };
  }
  // TODO(justinfagnani): just use a JS literal?
  literal(t) {
    return {
      type: "Literal",
      value: t,
      evaluate(r) {
        return this.value;
      },
      getIds(r) {
        return r;
      }
    };
  }
  id(t) {
    return {
      type: "ID",
      value: t,
      evaluate(r) {
        return this.value === "this" ? r : r?.[this.value];
      },
      getIds(r) {
        return r.push(this.value), r;
      }
    };
  }
  unary(t, r) {
    const s = M[t];
    return {
      type: "Unary",
      operator: t,
      child: r,
      evaluate(n) {
        return s(this.child.evaluate(n));
      },
      getIds(n) {
        return this.child.getIds(n);
      }
    };
  }
  binary(t, r, s) {
    const n = b[r];
    return {
      type: "Binary",
      operator: r,
      left: t,
      right: s,
      evaluate(h) {
        if (this.operator === "=") {
          if (this.left.type !== "ID" && this.left.type !== "Getter" && this.left.type !== "Index")
            throw new Error(`Invalid assignment target: ${this.left}`);
          const f = this.right.evaluate(h);
          let a, l;
          return this.left.type === "Getter" ? (a = this.left.receiver.evaluate(h), l = this.left.name) : this.left.type === "Index" ? (a = this.left.receiver.evaluate(h), l = this.left.argument.evaluate(h)) : this.left.type === "ID" && (a = h, l = this.left.value), a === void 0 ? void 0 : a[l] = f;
        }
        return n(this.left.evaluate(h), this.right.evaluate(h));
      },
      getIds(h) {
        return this.left.getIds(h), this.right.getIds(h), h;
      }
    };
  }
  getter(t, r) {
    return {
      type: "Getter",
      receiver: t,
      name: r,
      evaluate(s) {
        return this.receiver.evaluate(s)?.[this.name];
      },
      getIds(s) {
        return this.receiver.getIds(s), s;
      }
    };
  }
  invoke(t, r, s) {
    if (r != null && typeof r != "string")
      throw new Error("method not a string");
    return {
      type: "Invoke",
      receiver: t,
      method: r,
      arguments: s,
      evaluate(n) {
        const h = this.receiver.evaluate(n), f = this.method ? h : n?.this ?? n, a = this.method ? h?.[r] : h, c = (this.arguments ?? []).map((u) => u?.evaluate(n));
        return a?.apply?.(f, c);
      },
      getIds(n) {
        return this.receiver.getIds(n), this.arguments?.forEach((h) => h?.getIds(n)), n;
      }
    };
  }
  paren(t) {
    return t;
  }
  index(t, r) {
    return {
      type: "Index",
      receiver: t,
      argument: r,
      evaluate(s) {
        return this.receiver.evaluate(s)?.[this.argument.evaluate(s)];
      },
      getIds(s) {
        return this.receiver.getIds(s), s;
      }
    };
  }
  ternary(t, r, s) {
    return {
      type: "Ternary",
      condition: t,
      trueExpr: r,
      falseExpr: s,
      evaluate(n) {
        return this.condition.evaluate(n) ? this.trueExpr.evaluate(n) : this.falseExpr.evaluate(n);
      },
      getIds(n) {
        return this.condition.getIds(n), this.trueExpr.getIds(n), this.falseExpr.getIds(n), n;
      }
    };
  }
  map(t) {
    return {
      type: "Map",
      entries: t,
      evaluate(r) {
        const s = {};
        if (t && this.entries)
          for (const n in t) {
            const h = this.entries[n];
            h && (s[n] = h.evaluate(r));
          }
        return s;
      },
      getIds(r) {
        if (t && this.entries)
          for (const s in t) {
            const n = this.entries[s];
            n && n.getIds(r);
          }
        return r;
      }
    };
  }
  // TODO(justinfagnani): if the list is deeply literal
  list(t) {
    return {
      type: "List",
      items: t,
      evaluate(r) {
        return this.items?.map((s) => s?.evaluate(r));
      },
      getIds(r) {
        return this.items?.forEach((s) => s?.getIds(r)), r;
      }
    };
  }
  arrowFunction(t, r) {
    return {
      type: "ArrowFunction",
      params: t,
      body: r,
      evaluate(s) {
        const n = this.params, h = this.body;
        return function(...f) {
          const a = C(n.map((c, u) => [c, f[u]])), l = new Proxy(s ?? {}, {
            set(c, u, p) {
              return R(a, u) && (a[u] = p), c[u] = p;
            },
            get(c, u) {
              return R(a, u) ? a[u] : c[u];
            }
          });
          return h.evaluate(l);
        };
      },
      getIds(s) {
        return this.body.getIds(s).filter((n) => !this.params.includes(n));
      }
    };
  }
}
export {
  U as DefaultAstFactory,
  F as EvalAstFactory,
  N as Parser,
  S as parse
};
//# sourceMappingURL=index.js.map
