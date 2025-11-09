var $ = function(t, e) {
  return $ = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
  }, $(t, e);
};
function x(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  $(t, e);
  function n() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (n.prototype = e.prototype, new n());
}
function Ct(t, e, n, r) {
  function i(o) {
    return o instanceof n ? o : new n(function(u) {
      u(o);
    });
  }
  return new (n || (n = Promise))(function(o, u) {
    function f(s) {
      try {
        a(r.next(s));
      } catch (v) {
        u(v);
      }
    }
    function c(s) {
      try {
        a(r.throw(s));
      } catch (v) {
        u(v);
      }
    }
    function a(s) {
      s.done ? o(s.value) : i(s.value).then(f, c);
    }
    a((r = r.apply(t, e || [])).next());
  });
}
function ft(t, e) {
  var n = { label: 0, sent: function() {
    if (o[0] & 1) throw o[1];
    return o[1];
  }, trys: [], ops: [] }, r, i, o, u = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return u.next = f(0), u.throw = f(1), u.return = f(2), typeof Symbol == "function" && (u[Symbol.iterator] = function() {
    return this;
  }), u;
  function f(a) {
    return function(s) {
      return c([a, s]);
    };
  }
  function c(a) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; u && (u = 0, a[0] && (n = 0)), n; ) try {
      if (r = 1, i && (o = a[0] & 2 ? i.return : a[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, a[1])).done) return o;
      switch (i = 0, o && (a = [a[0] & 2, o.value]), a[0]) {
        case 0:
        case 1:
          o = a;
          break;
        case 4:
          return n.label++, { value: a[1], done: !1 };
        case 5:
          n.label++, i = a[1], a = [0];
          continue;
        case 7:
          a = n.ops.pop(), n.trys.pop();
          continue;
        default:
          if (o = n.trys, !(o = o.length > 0 && o[o.length - 1]) && (a[0] === 6 || a[0] === 2)) {
            n = 0;
            continue;
          }
          if (a[0] === 3 && (!o || a[1] > o[0] && a[1] < o[3])) {
            n.label = a[1];
            break;
          }
          if (a[0] === 6 && n.label < o[1]) {
            n.label = o[1], o = a;
            break;
          }
          if (o && n.label < o[2]) {
            n.label = o[2], n.ops.push(a);
            break;
          }
          o[2] && n.ops.pop(), n.trys.pop();
          continue;
      }
      a = e.call(t, n);
    } catch (s) {
      a = [6, s], i = 0;
    } finally {
      r = o = 0;
    }
    if (a[0] & 5) throw a[1];
    return { value: a[0] ? a[1] : void 0, done: !0 };
  }
}
function O(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, n = e && t[e], r = 0;
  if (n) return n.call(t);
  if (t && typeof t.length == "number") return {
    next: function() {
      return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t };
    }
  };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function P(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n) return t;
  var r = n.call(t), i, o = [], u;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; ) o.push(i.value);
  } catch (f) {
    u = { error: f };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (u) throw u.error;
    }
  }
  return o;
}
function T(t, e, n) {
  if (n || arguments.length === 2) for (var r = 0, i = e.length, o; r < i; r++)
    (o || !(r in e)) && (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
  return t.concat(o || Array.prototype.slice.call(e));
}
function A(t) {
  return this instanceof A ? (this.v = t, this) : new A(t);
}
function jt(t, e, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(t, e || []), i, o = [];
  return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), f("next"), f("throw"), f("return", u), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function u(l) {
    return function(y) {
      return Promise.resolve(y).then(l, v);
    };
  }
  function f(l, y) {
    r[l] && (i[l] = function(h) {
      return new Promise(function(_, w) {
        o.push([l, h, _, w]) > 1 || c(l, h);
      });
    }, y && (i[l] = y(i[l])));
  }
  function c(l, y) {
    try {
      a(r[l](y));
    } catch (h) {
      d(o[0][3], h);
    }
  }
  function a(l) {
    l.value instanceof A ? Promise.resolve(l.value.v).then(s, v) : d(o[0][2], l);
  }
  function s(l) {
    c("next", l);
  }
  function v(l) {
    c("throw", l);
  }
  function d(l, y) {
    l(y), o.shift(), o.length && c(o[0][0], o[0][1]);
  }
}
function kt(t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = t[Symbol.asyncIterator], n;
  return e ? e.call(t) : (t = typeof O == "function" ? O(t) : t[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function r(o) {
    n[o] = t[o] && function(u) {
      return new Promise(function(f, c) {
        u = t[o](u), i(f, c, u.done, u.value);
      });
    };
  }
  function i(o, u, f, c) {
    Promise.resolve(c).then(function(a) {
      o({ value: a, done: f });
    }, u);
  }
}
function p(t) {
  return typeof t == "function";
}
function H(t) {
  var e = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, n = t(e);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var K = H(function(t) {
  return function(n) {
    t(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, i) {
      return i + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function M(t, e) {
  if (t) {
    var n = t.indexOf(e);
    0 <= n && t.splice(n, 1);
  }
}
var R = function() {
  function t(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var e, n, r, i, o;
    if (!this.closed) {
      this.closed = !0;
      var u = this._parentage;
      if (u)
        if (this._parentage = null, Array.isArray(u))
          try {
            for (var f = O(u), c = f.next(); !c.done; c = f.next()) {
              var a = c.value;
              a.remove(this);
            }
          } catch (h) {
            e = { error: h };
          } finally {
            try {
              c && !c.done && (n = f.return) && n.call(f);
            } finally {
              if (e) throw e.error;
            }
          }
        else
          u.remove(this);
      var s = this.initialTeardown;
      if (p(s))
        try {
          s();
        } catch (h) {
          o = h instanceof K ? h.errors : [h];
        }
      var v = this._finalizers;
      if (v) {
        this._finalizers = null;
        try {
          for (var d = O(v), l = d.next(); !l.done; l = d.next()) {
            var y = l.value;
            try {
              et(y);
            } catch (h) {
              o = o ?? [], h instanceof K ? o = T(T([], P(o)), P(h.errors)) : o.push(h);
            }
          }
        } catch (h) {
          r = { error: h };
        } finally {
          try {
            l && !l.done && (i = d.return) && i.call(d);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (o)
        throw new K(o);
    }
  }, t.prototype.add = function(e) {
    var n;
    if (e && e !== this)
      if (this.closed)
        et(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this))
            return;
          e._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(e);
      }
  }, t.prototype._hasParent = function(e) {
    var n = this._parentage;
    return n === e || Array.isArray(n) && n.includes(e);
  }, t.prototype._addParent = function(e) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
  }, t.prototype._removeParent = function(e) {
    var n = this._parentage;
    n === e ? this._parentage = null : Array.isArray(n) && M(n, e);
  }, t.prototype.remove = function(e) {
    var n = this._finalizers;
    n && M(n, e), e instanceof t && e._removeParent(this);
  }, t.EMPTY = function() {
    var e = new t();
    return e.closed = !0, e;
  }(), t;
}(), st = R.EMPTY;
function lt(t) {
  return t instanceof R || t && "closed" in t && p(t.remove) && p(t.add) && p(t.unsubscribe);
}
function et(t) {
  p(t) ? t() : t.unsubscribe();
}
var Rt = {
  Promise: void 0
}, Vt = {
  setTimeout: function(t, e) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setTimeout.apply(void 0, T([t, e], P(n)));
  },
  clearTimeout: function(t) {
    return clearTimeout(t);
  },
  delegate: void 0
};
function vt(t) {
  Vt.setTimeout(function() {
    throw t;
  });
}
function B() {
}
function W(t) {
  t();
}
var J = function(t) {
  x(e, t);
  function e(n) {
    var r = t.call(this) || this;
    return r.isStopped = !1, n ? (r.destination = n, lt(n) && n.add(r)) : r.destination = Lt, r;
  }
  return e.create = function(n, r, i) {
    return new C(n, r, i);
  }, e.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, e.prototype.error = function(n) {
    this.isStopped || (this.isStopped = !0, this._error(n));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(n) {
    this.destination.next(n);
  }, e.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
}(R), Ut = function() {
  function t(e) {
    this.partialObserver = e;
  }
  return t.prototype.next = function(e) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(e);
      } catch (r) {
        L(r);
      }
  }, t.prototype.error = function(e) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(e);
      } catch (r) {
        L(r);
      }
    else
      L(e);
  }, t.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (n) {
        L(n);
      }
  }, t;
}(), C = function(t) {
  x(e, t);
  function e(n, r, i) {
    var o = t.call(this) || this, u;
    return p(n) || !n ? u = {
      next: n ?? void 0,
      error: r ?? void 0,
      complete: i ?? void 0
    } : u = n, o.destination = new Ut(u), o;
  }
  return e;
}(J);
function L(t) {
  vt(t);
}
function Ft(t) {
  throw t;
}
var Lt = {
  closed: !0,
  next: B,
  error: Ft,
  complete: B
}, z = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function E(t) {
  return t;
}
function Wt(t) {
  return t.length === 0 ? E : t.length === 1 ? t[0] : function(n) {
    return t.reduce(function(r, i) {
      return i(r);
    }, n);
  };
}
var g = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var n = new t();
    return n.source = this, n.operator = e, n;
  }, t.prototype.subscribe = function(e, n, r) {
    var i = this, o = Dt(e) ? e : new C(e, n, r);
    return W(function() {
      var u = i, f = u.operator, c = u.source;
      o.add(f ? f.call(o, c) : c ? i._subscribe(o) : i._trySubscribe(o));
    }), o;
  }, t.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (n) {
      e.error(n);
    }
  }, t.prototype.forEach = function(e, n) {
    var r = this;
    return n = rt(n), new n(function(i, o) {
      var u = new C({
        next: function(f) {
          try {
            e(f);
          } catch (c) {
            o(c), u.unsubscribe();
          }
        },
        error: o,
        complete: i
      });
      r.subscribe(u);
    });
  }, t.prototype._subscribe = function(e) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(e);
  }, t.prototype[z] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], n = 0; n < arguments.length; n++)
      e[n] = arguments[n];
    return Wt(e)(this);
  }, t.prototype.toPromise = function(e) {
    var n = this;
    return e = rt(e), new e(function(r, i) {
      var o;
      n.subscribe(function(u) {
        return o = u;
      }, function(u) {
        return i(u);
      }, function() {
        return r(o);
      });
    });
  }, t.create = function(e) {
    return new t(e);
  }, t;
}();
function rt(t) {
  var e;
  return (e = t ?? Rt.Promise) !== null && e !== void 0 ? e : Promise;
}
function Mt(t) {
  return t && p(t.next) && p(t.error) && p(t.complete);
}
function Dt(t) {
  return t && t instanceof J || Mt(t) && lt(t);
}
function Yt(t) {
  return p(t?.lift);
}
function m(t) {
  return function(e) {
    if (Yt(e))
      return e.lift(function(n) {
        try {
          return t(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function b(t, e, n, r, i) {
  return new qt(t, e, n, r, i);
}
var qt = function(t) {
  x(e, t);
  function e(n, r, i, o, u, f) {
    var c = t.call(this, n) || this;
    return c.onFinalize = u, c.shouldUnsubscribe = f, c._next = r ? function(a) {
      try {
        r(a);
      } catch (s) {
        n.error(s);
      }
    } : t.prototype._next, c._error = o ? function(a) {
      try {
        o(a);
      } catch (s) {
        n.error(s);
      } finally {
        this.unsubscribe();
      }
    } : t.prototype._error, c._complete = i ? function() {
      try {
        i();
      } catch (a) {
        n.error(a);
      } finally {
        this.unsubscribe();
      }
    } : t.prototype._complete, c;
  }
  return e.prototype.unsubscribe = function() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      t.prototype.unsubscribe.call(this), !r && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }, e;
}(J), Gt = H(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), D = function(t) {
  x(e, t);
  function e() {
    var n = t.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return e.prototype.lift = function(n) {
    var r = new it(this, this);
    return r.operator = n, r;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Gt();
  }, e.prototype.next = function(n) {
    var r = this;
    W(function() {
      var i, o;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var u = O(r.currentObservers), f = u.next(); !f.done; f = u.next()) {
            var c = f.value;
            c.next(n);
          }
        } catch (a) {
          i = { error: a };
        } finally {
          try {
            f && !f.done && (o = u.return) && o.call(u);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, e.prototype.error = function(n) {
    var r = this;
    W(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = n;
        for (var i = r.observers; i.length; )
          i.shift().error(n);
      }
    });
  }, e.prototype.complete = function() {
    var n = this;
    W(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = !0;
        for (var r = n.observers; r.length; )
          r.shift().complete();
      }
    });
  }, e.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(e.prototype, "observed", {
    get: function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), t.prototype._trySubscribe.call(this, n);
  }, e.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, e.prototype._innerSubscribe = function(n) {
    var r = this, i = this, o = i.hasError, u = i.isStopped, f = i.observers;
    return o || u ? st : (this.currentObservers = null, f.push(n), new R(function() {
      r.currentObservers = null, M(f, n);
    }));
  }, e.prototype._checkFinalizedStatuses = function(n) {
    var r = this, i = r.hasError, o = r.thrownError, u = r.isStopped;
    i ? n.error(o) : u && n.complete();
  }, e.prototype.asObservable = function() {
    var n = new g();
    return n.source = this, n;
  }, e.create = function(n, r) {
    return new it(n, r);
  }, e;
}(g), it = function(t) {
  x(e, t);
  function e(n, r) {
    var i = t.call(this) || this;
    return i.destination = n, i.source = r, i;
  }
  return e.prototype.next = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || i === void 0 || i.call(r, n);
  }, e.prototype.error = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || i === void 0 || i.call(r, n);
  }, e.prototype.complete = function() {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || r === void 0 || r.call(n);
  }, e.prototype._subscribe = function(n) {
    var r, i;
    return (i = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)) !== null && i !== void 0 ? i : st;
  }, e;
}(D), Fn = function(t) {
  x(e, t);
  function e(n) {
    var r = t.call(this) || this;
    return r._value = n, r;
  }
  return Object.defineProperty(e.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._subscribe = function(n) {
    var r = t.prototype._subscribe.call(this, n);
    return !r.closed && n.next(this._value), r;
  }, e.prototype.getValue = function() {
    var n = this, r = n.hasError, i = n.thrownError, o = n._value;
    if (r)
      throw i;
    return this._throwIfClosed(), o;
  }, e.prototype.next = function(n) {
    t.prototype.next.call(this, this._value = n);
  }, e;
}(D), Q = {
  now: function() {
    return (Q.delegate || Date).now();
  },
  delegate: void 0
}, Kt = function(t) {
  x(e, t);
  function e(n, r, i) {
    n === void 0 && (n = 1 / 0), r === void 0 && (r = 1 / 0), i === void 0 && (i = Q);
    var o = t.call(this) || this;
    return o._bufferSize = n, o._windowTime = r, o._timestampProvider = i, o._buffer = [], o._infiniteTimeWindow = !0, o._infiniteTimeWindow = r === 1 / 0, o._bufferSize = Math.max(1, n), o._windowTime = Math.max(1, r), o;
  }
  return e.prototype.next = function(n) {
    var r = this, i = r.isStopped, o = r._buffer, u = r._infiniteTimeWindow, f = r._timestampProvider, c = r._windowTime;
    i || (o.push(n), !u && o.push(f.now() + c)), this._trimBuffer(), t.prototype.next.call(this, n);
  }, e.prototype._subscribe = function(n) {
    this._throwIfClosed(), this._trimBuffer();
    for (var r = this._innerSubscribe(n), i = this, o = i._infiniteTimeWindow, u = i._buffer, f = u.slice(), c = 0; c < f.length && !n.closed; c += o ? 1 : 2)
      n.next(f[c]);
    return this._checkFinalizedStatuses(n), r;
  }, e.prototype._trimBuffer = function() {
    var n = this, r = n._bufferSize, i = n._timestampProvider, o = n._buffer, u = n._infiniteTimeWindow, f = (u ? 1 : 2) * r;
    if (r < 1 / 0 && f < o.length && o.splice(0, o.length - f), !u) {
      for (var c = i.now(), a = 0, s = 1; s < o.length && o[s] <= c; s += 2)
        a = s;
      a && o.splice(0, a + 1);
    }
  }, e;
}(D), Zt = function(t) {
  x(e, t);
  function e(n, r) {
    return t.call(this) || this;
  }
  return e.prototype.schedule = function(n, r) {
    return this;
  }, e;
}(R), ot = {
  setInterval: function(t, e) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setInterval.apply(void 0, T([t, e], P(n)));
  },
  clearInterval: function(t) {
    return clearInterval(t);
  },
  delegate: void 0
}, $t = function(t) {
  x(e, t);
  function e(n, r) {
    var i = t.call(this, n, r) || this;
    return i.scheduler = n, i.work = r, i.pending = !1, i;
  }
  return e.prototype.schedule = function(n, r) {
    var i;
    if (r === void 0 && (r = 0), this.closed)
      return this;
    this.state = n;
    var o = this.id, u = this.scheduler;
    return o != null && (this.id = this.recycleAsyncId(u, o, r)), this.pending = !0, this.delay = r, this.id = (i = this.id) !== null && i !== void 0 ? i : this.requestAsyncId(u, this.id, r), this;
  }, e.prototype.requestAsyncId = function(n, r, i) {
    return i === void 0 && (i = 0), ot.setInterval(n.flush.bind(n, this), i);
  }, e.prototype.recycleAsyncId = function(n, r, i) {
    if (i === void 0 && (i = 0), i != null && this.delay === i && this.pending === !1)
      return r;
    r != null && ot.clearInterval(r);
  }, e.prototype.execute = function(n, r) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var i = this._execute(n, r);
    if (i)
      return i;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, e.prototype._execute = function(n, r) {
    var i = !1, o;
    try {
      this.work(n);
    } catch (u) {
      i = !0, o = u || new Error("Scheduled action threw falsy error");
    }
    if (i)
      return this.unsubscribe(), o;
  }, e.prototype.unsubscribe = function() {
    if (!this.closed) {
      var n = this, r = n.id, i = n.scheduler, o = i.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, M(o, this), r != null && (this.id = this.recycleAsyncId(i, r, null)), this.delay = null, t.prototype.unsubscribe.call(this);
    }
  }, e;
}(Zt), ut = function() {
  function t(e, n) {
    n === void 0 && (n = t.now), this.schedulerActionCtor = e, this.now = n;
  }
  return t.prototype.schedule = function(e, n, r) {
    return n === void 0 && (n = 0), new this.schedulerActionCtor(this, e).schedule(r, n);
  }, t.now = Q.now, t;
}(), Bt = function(t) {
  x(e, t);
  function e(n, r) {
    r === void 0 && (r = ut.now);
    var i = t.call(this, n, r) || this;
    return i.actions = [], i._active = !1, i;
  }
  return e.prototype.flush = function(n) {
    var r = this.actions;
    if (this._active) {
      r.push(n);
      return;
    }
    var i;
    this._active = !0;
    do
      if (i = n.execute(n.state, n.delay))
        break;
    while (n = r.shift());
    if (this._active = !1, i) {
      for (; n = r.shift(); )
        n.unsubscribe();
      throw i;
    }
  }, e;
}(ut), V = new Bt($t), Ht = V, Jt = new g(function(t) {
  return t.complete();
});
function ht(t) {
  return t && p(t.schedule);
}
function dt(t) {
  return t[t.length - 1];
}
function zt(t) {
  return p(dt(t)) ? t.pop() : void 0;
}
function Y(t) {
  return ht(dt(t)) ? t.pop() : void 0;
}
var pt = function(t) {
  return t && typeof t.length == "number" && typeof t != "function";
};
function yt(t) {
  return p(t?.then);
}
function bt(t) {
  return p(t[z]);
}
function mt(t) {
  return Symbol.asyncIterator && p(t?.[Symbol.asyncIterator]);
}
function wt(t) {
  return new TypeError("You provided " + (t !== null && typeof t == "object" ? "an invalid object" : "'" + t + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function Qt() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var gt = Qt();
function St(t) {
  return p(t?.[gt]);
}
function _t(t) {
  return jt(this, arguments, function() {
    var n, r, i, o;
    return ft(this, function(u) {
      switch (u.label) {
        case 0:
          n = t.getReader(), u.label = 1;
        case 1:
          u.trys.push([1, , 9, 10]), u.label = 2;
        case 2:
          return [4, A(n.read())];
        case 3:
          return r = u.sent(), i = r.value, o = r.done, o ? [4, A(void 0)] : [3, 5];
        case 4:
          return [2, u.sent()];
        case 5:
          return [4, A(i)];
        case 6:
          return [4, u.sent()];
        case 7:
          return u.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return n.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function xt(t) {
  return p(t?.getReader);
}
function S(t) {
  if (t instanceof g)
    return t;
  if (t != null) {
    if (bt(t))
      return Xt(t);
    if (pt(t))
      return Nt(t);
    if (yt(t))
      return tn(t);
    if (mt(t))
      return It(t);
    if (St(t))
      return nn(t);
    if (xt(t))
      return en(t);
  }
  throw wt(t);
}
function Xt(t) {
  return new g(function(e) {
    var n = t[z]();
    if (p(n.subscribe))
      return n.subscribe(e);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Nt(t) {
  return new g(function(e) {
    for (var n = 0; n < t.length && !e.closed; n++)
      e.next(t[n]);
    e.complete();
  });
}
function tn(t) {
  return new g(function(e) {
    t.then(function(n) {
      e.closed || (e.next(n), e.complete());
    }, function(n) {
      return e.error(n);
    }).then(null, vt);
  });
}
function nn(t) {
  return new g(function(e) {
    var n, r;
    try {
      for (var i = O(t), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        if (e.next(u), e.closed)
          return;
      }
    } catch (f) {
      n = { error: f };
    } finally {
      try {
        o && !o.done && (r = i.return) && r.call(i);
      } finally {
        if (n) throw n.error;
      }
    }
    e.complete();
  });
}
function It(t) {
  return new g(function(e) {
    rn(t, e).catch(function(n) {
      return e.error(n);
    });
  });
}
function en(t) {
  return It(_t(t));
}
function rn(t, e) {
  var n, r, i, o;
  return Ct(this, void 0, void 0, function() {
    var u, f;
    return ft(this, function(c) {
      switch (c.label) {
        case 0:
          c.trys.push([0, 5, 6, 11]), n = kt(t), c.label = 1;
        case 1:
          return [4, n.next()];
        case 2:
          if (r = c.sent(), !!r.done) return [3, 4];
          if (u = r.value, e.next(u), e.closed)
            return [2];
          c.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return f = c.sent(), i = { error: f }, [3, 11];
        case 6:
          return c.trys.push([6, , 9, 10]), r && !r.done && (o = n.return) ? [4, o.call(n)] : [3, 8];
        case 7:
          c.sent(), c.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (i) throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return e.complete(), [2];
      }
    });
  });
}
function I(t, e, n, r, i) {
  r === void 0 && (r = 0), i === void 0 && (i = !1);
  var o = e.schedule(function() {
    n(), i ? t.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if (t.add(o), !i)
    return o;
}
function Et(t, e) {
  return e === void 0 && (e = 0), m(function(n, r) {
    n.subscribe(b(r, function(i) {
      return I(r, t, function() {
        return r.next(i);
      }, e);
    }, function() {
      return I(r, t, function() {
        return r.complete();
      }, e);
    }, function(i) {
      return I(r, t, function() {
        return r.error(i);
      }, e);
    }));
  });
}
function At(t, e) {
  return e === void 0 && (e = 0), m(function(n, r) {
    r.add(t.schedule(function() {
      return n.subscribe(r);
    }, e));
  });
}
function on(t, e) {
  return S(t).pipe(At(e), Et(e));
}
function un(t, e) {
  return S(t).pipe(At(e), Et(e));
}
function an(t, e) {
  return new g(function(n) {
    var r = 0;
    return e.schedule(function() {
      r === t.length ? n.complete() : (n.next(t[r++]), n.closed || this.schedule());
    });
  });
}
function cn(t, e) {
  return new g(function(n) {
    var r;
    return I(n, e, function() {
      r = t[gt](), I(n, e, function() {
        var i, o, u;
        try {
          i = r.next(), o = i.value, u = i.done;
        } catch (f) {
          n.error(f);
          return;
        }
        u ? n.complete() : n.next(o);
      }, 0, !0);
    }), function() {
      return p(r?.return) && r.return();
    };
  });
}
function Ot(t, e) {
  if (!t)
    throw new Error("Iterable cannot be null");
  return new g(function(n) {
    I(n, e, function() {
      var r = t[Symbol.asyncIterator]();
      I(n, e, function() {
        r.next().then(function(i) {
          i.done ? n.complete() : n.next(i.value);
        });
      }, 0, !0);
    });
  });
}
function fn(t, e) {
  return Ot(_t(t), e);
}
function sn(t, e) {
  if (t != null) {
    if (bt(t))
      return on(t, e);
    if (pt(t))
      return an(t, e);
    if (yt(t))
      return un(t, e);
    if (mt(t))
      return Ot(t, e);
    if (St(t))
      return cn(t, e);
    if (xt(t))
      return fn(t, e);
  }
  throw wt(t);
}
function q(t, e) {
  return e ? sn(t, e) : S(t);
}
function Ln() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  var n = Y(t);
  return q(t, n);
}
var G = H(function(t) {
  return function() {
    t(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function Wn(t, e) {
  var n = typeof e == "object";
  return new Promise(function(r, i) {
    var o = !1, u;
    t.subscribe({
      next: function(f) {
        u = f, o = !0;
      },
      error: i,
      complete: function() {
        o ? r(u) : n ? r(e.defaultValue) : i(new G());
      }
    });
  });
}
function Mn(t, e) {
  var n = typeof e == "object";
  return new Promise(function(r, i) {
    var o = new C({
      next: function(u) {
        r(u), o.unsubscribe();
      },
      error: i,
      complete: function() {
        n ? r(e.defaultValue) : i(new G());
      }
    });
    t.subscribe(o);
  });
}
function ln(t) {
  return t instanceof Date && !isNaN(t);
}
function X(t, e) {
  return m(function(n, r) {
    var i = 0;
    n.subscribe(b(r, function(o) {
      r.next(t.call(e, o, i++));
    }));
  });
}
var vn = Array.isArray;
function hn(t, e) {
  return vn(e) ? t.apply(void 0, T([], P(e))) : t(e);
}
function dn(t) {
  return X(function(e) {
    return hn(t, e);
  });
}
var pn = Array.isArray, yn = Object.getPrototypeOf, bn = Object.prototype, mn = Object.keys;
function wn(t) {
  if (t.length === 1) {
    var e = t[0];
    if (pn(e))
      return { args: e, keys: null };
    if (gn(e)) {
      var n = mn(e);
      return {
        args: n.map(function(r) {
          return e[r];
        }),
        keys: n
      };
    }
  }
  return { args: t, keys: null };
}
function gn(t) {
  return t && typeof t == "object" && yn(t) === bn;
}
function Sn(t, e) {
  return t.reduce(function(n, r, i) {
    return n[r] = e[i], n;
  }, {});
}
function Dn() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  var n = Y(t), r = zt(t), i = wn(t), o = i.args, u = i.keys;
  if (o.length === 0)
    return q([], n);
  var f = new g(_n(o, n, u ? function(c) {
    return Sn(u, c);
  } : E));
  return r ? f.pipe(dn(r)) : f;
}
function _n(t, e, n) {
  return n === void 0 && (n = E), function(r) {
    at(e, function() {
      for (var i = t.length, o = new Array(i), u = i, f = i, c = function(s) {
        at(e, function() {
          var v = q(t[s], e), d = !1;
          v.subscribe(b(r, function(l) {
            o[s] = l, d || (d = !0, f--), f || r.next(n(o.slice()));
          }, function() {
            --u || r.complete();
          }));
        }, r);
      }, a = 0; a < i; a++)
        c(a);
    }, r);
  };
}
function at(t, e, n) {
  t ? I(n, t, e) : e();
}
function xn(t, e, n, r, i, o, u, f) {
  var c = [], a = 0, s = 0, v = !1, d = function() {
    v && !c.length && !a && e.complete();
  }, l = function(h) {
    return a < r ? y(h) : c.push(h);
  }, y = function(h) {
    a++;
    var _ = !1;
    S(n(h, s++)).subscribe(b(e, function(w) {
      e.next(w);
    }, function() {
      _ = !0;
    }, void 0, function() {
      if (_)
        try {
          a--;
          for (var w = function() {
            var j = c.shift();
            u || y(j);
          }; c.length && a < r; )
            w();
          d();
        } catch (j) {
          e.error(j);
        }
    }));
  };
  return t.subscribe(b(e, l, function() {
    v = !0, d();
  })), function() {
  };
}
function N(t, e, n) {
  return n === void 0 && (n = 1 / 0), p(e) ? N(function(r, i) {
    return X(function(o, u) {
      return e(r, o, i, u);
    })(S(t(r, i)));
  }, n) : (typeof e == "number" && (n = e), m(function(r, i) {
    return xn(r, i, t, n);
  }));
}
function In(t) {
  return N(E, t);
}
function En() {
  return In(1);
}
function ct() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  return En()(q(t, Y(t)));
}
function tt(t, e, n) {
  t === void 0 && (t = 0), n === void 0 && (n = Ht);
  var r = -1;
  return e != null && (ht(e) ? n = e : r = e), new g(function(i) {
    var o = ln(t) ? +t - n.now() : t;
    o < 0 && (o = 0);
    var u = 0;
    return n.schedule(function() {
      i.closed || (i.next(u++), 0 <= r ? this.schedule(void 0, r) : i.complete());
    }, o);
  });
}
function Pt(t, e) {
  return m(function(n, r) {
    var i = 0;
    n.subscribe(b(r, function(o) {
      return t.call(e, o, i++) && r.next(o);
    }));
  });
}
function An(t) {
  return m(function(e, n) {
    var r = !1, i = null, o = null, u = !1, f = function() {
      if (o?.unsubscribe(), o = null, r) {
        r = !1;
        var a = i;
        i = null, n.next(a);
      }
      u && n.complete();
    }, c = function() {
      o = null, u && n.complete();
    };
    e.subscribe(b(n, function(a) {
      r = !0, i = a, o || S(t(a)).subscribe(o = b(n, f, c));
    }, function() {
      u = !0, (!r || !o || o.closed) && n.complete();
    }));
  });
}
function Yn(t, e) {
  return e === void 0 && (e = V), An(function() {
    return tt(t, e);
  });
}
function On(t) {
  return m(function(e, n) {
    var r = null, i = !1, o;
    r = e.subscribe(b(n, void 0, void 0, function(u) {
      o = S(t(u, On(t)(e))), r ? (r.unsubscribe(), r = null, o.subscribe(n)) : i = !0;
    })), i && (r.unsubscribe(), r = null, o.subscribe(n));
  });
}
function qn(t, e) {
  return e === void 0 && (e = V), m(function(n, r) {
    var i = null, o = null, u = null, f = function() {
      if (i) {
        i.unsubscribe(), i = null;
        var a = o;
        o = null, r.next(a);
      }
    };
    function c() {
      var a = u + t, s = e.now();
      if (s < a) {
        i = this.schedule(void 0, a - s), r.add(i);
        return;
      }
      f();
    }
    n.subscribe(b(r, function(a) {
      o = a, u = e.now(), i || (i = e.schedule(c, t), r.add(i));
    }, function() {
      f(), r.complete();
    }, void 0, function() {
      o = i = null;
    }));
  });
}
function Pn(t) {
  return m(function(e, n) {
    var r = !1;
    e.subscribe(b(n, function(i) {
      r = !0, n.next(i);
    }, function() {
      r || n.next(t), n.complete();
    }));
  });
}
function Tt(t) {
  return t <= 0 ? function() {
    return Jt;
  } : m(function(e, n) {
    var r = 0;
    e.subscribe(b(n, function(i) {
      ++r <= t && (n.next(i), t <= r && n.complete());
    }));
  });
}
function Tn(t) {
  return X(function() {
    return t;
  });
}
function Cn(t, e) {
  return N(function(n, r) {
    return S(t(n, r)).pipe(Tt(1), Tn(n));
  });
}
function Gn(t, e) {
  e === void 0 && (e = V);
  var n = tt(t, e);
  return Cn(function() {
    return n;
  });
}
function Kn(t, e) {
  return e === void 0 && (e = E), t = t ?? jn, m(function(n, r) {
    var i, o = !0;
    n.subscribe(b(r, function(u) {
      var f = e(u);
      (o || !t(i, f)) && (o = !1, i = f, r.next(u));
    }));
  });
}
function jn(t, e) {
  return t === e;
}
function kn(t) {
  return t === void 0 && (t = Rn), m(function(e, n) {
    var r = !1;
    e.subscribe(b(n, function(i) {
      r = !0, n.next(i);
    }, function() {
      return r ? n.complete() : n.error(t());
    }));
  });
}
function Rn() {
  return new G();
}
function Zn(t, e) {
  var n = arguments.length >= 2;
  return function(r) {
    return r.pipe(t ? Pt(function(i, o) {
      return t(i, o, r);
    }) : E, Tt(1), n ? Pn(e) : kn(function() {
      return new G();
    }));
  };
}
function Vn(t) {
  t === void 0 && (t = {});
  var e = t.connector, n = e === void 0 ? function() {
    return new D();
  } : e, r = t.resetOnError, i = r === void 0 ? !0 : r, o = t.resetOnComplete, u = o === void 0 ? !0 : o, f = t.resetOnRefCountZero, c = f === void 0 ? !0 : f;
  return function(a) {
    var s, v, d, l = 0, y = !1, h = !1, _ = function() {
      v?.unsubscribe(), v = void 0;
    }, w = function() {
      _(), s = d = void 0, y = h = !1;
    }, j = function() {
      var k = s;
      w(), k?.unsubscribe();
    };
    return m(function(k, nt) {
      l++, !h && !y && _();
      var U = d = d ?? n();
      nt.add(function() {
        l--, l === 0 && !h && !y && (v = Z(j, c));
      }), U.subscribe(nt), !s && l > 0 && (s = new C({
        next: function(F) {
          return U.next(F);
        },
        error: function(F) {
          h = !0, _(), v = Z(w, i, F), U.error(F);
        },
        complete: function() {
          y = !0, _(), v = Z(w, u), U.complete();
        }
      }), S(k).subscribe(s));
    })(a);
  };
}
function Z(t, e) {
  for (var n = [], r = 2; r < arguments.length; r++)
    n[r - 2] = arguments[r];
  if (e === !0) {
    t();
    return;
  }
  if (e !== !1) {
    var i = new C({
      next: function() {
        i.unsubscribe(), t();
      }
    });
    return S(e.apply(void 0, T([], P(n)))).subscribe(i);
  }
}
function $n(t, e, n) {
  var r, i, o, u, f = !1;
  return t && typeof t == "object" ? (r = t.bufferSize, u = r === void 0 ? 1 / 0 : r, i = t.windowTime, e = i === void 0 ? 1 / 0 : i, o = t.refCount, f = o === void 0 ? !1 : o, n = t.scheduler) : u = t ?? 1 / 0, Vn({
    connector: function() {
      return new Kt(u, e, n);
    },
    resetOnError: !0,
    resetOnComplete: !1,
    resetOnRefCountZero: f
  });
}
function Bn(t) {
  return Pt(function(e, n) {
    return t <= n;
  });
}
function Hn() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  var n = Y(t);
  return m(function(r, i) {
    (n ? ct(t, r, n) : ct(t, r)).subscribe(i);
  });
}
function Jn(t, e) {
  return m(function(n, r) {
    var i = null, o = 0, u = !1, f = function() {
      return u && !i && r.complete();
    };
    n.subscribe(b(r, function(c) {
      i?.unsubscribe();
      var a = 0, s = o++;
      S(t(c, s)).subscribe(i = b(r, function(v) {
        return r.next(e ? e(c, v, s, a++) : v);
      }, function() {
        i = null, f();
      }));
    }, function() {
      u = !0, f();
    }));
  });
}
function zn(t) {
  return m(function(e, n) {
    S(t).subscribe(b(n, function() {
      return n.complete();
    }, B)), !n.closed && e.subscribe(n);
  });
}
function Qn(t, e, n) {
  var r = p(t) || e || n ? { next: t, error: e, complete: n } : t;
  return r ? m(function(i, o) {
    var u;
    (u = r.subscribe) === null || u === void 0 || u.call(r);
    var f = !0;
    i.subscribe(b(o, function(c) {
      var a;
      (a = r.next) === null || a === void 0 || a.call(r, c), o.next(c);
    }, function() {
      var c;
      f = !1, (c = r.complete) === null || c === void 0 || c.call(r), o.complete();
    }, function(c) {
      var a;
      f = !1, (a = r.error) === null || a === void 0 || a.call(r, c), o.error(c);
    }, function() {
      var c, a;
      f && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)), (a = r.finalize) === null || a === void 0 || a.call(r);
    }));
  }) : E;
}
function Un(t, e) {
  return m(function(n, r) {
    var i = e ?? {}, o = i.leading, u = o === void 0 ? !0 : o, f = i.trailing, c = f === void 0 ? !1 : f, a = !1, s = null, v = null, d = !1, l = function() {
      v?.unsubscribe(), v = null, c && (_(), d && r.complete());
    }, y = function() {
      v = null, d && r.complete();
    }, h = function(w) {
      return v = S(t(w)).subscribe(b(r, l, y));
    }, _ = function() {
      if (a) {
        a = !1;
        var w = s;
        s = null, r.next(w), !d && h(w);
      }
    };
    n.subscribe(b(r, function(w) {
      a = !0, s = w, !(v && !v.closed) && (u ? _() : h(w));
    }, function() {
      d = !0, !(c && a && v && !v.closed) && r.complete();
    }));
  });
}
function Xn(t, e, n) {
  e === void 0 && (e = V);
  var r = tt(t, e);
  return Un(function() {
    return r;
  }, n);
}
export {
  Fn as BehaviorSubject,
  g as Observable,
  Kt as ReplaySubject,
  D as Subject,
  R as Subscription,
  Yn as auditTime,
  On as catchError,
  Dn as combineLatest,
  qn as debounceTime,
  Gn as delay,
  Kn as distinctUntilChanged,
  Pt as filter,
  Zn as first,
  Mn as firstValueFrom,
  q as from,
  Wn as lastValueFrom,
  X as map,
  Ln as of,
  $n as shareReplay,
  Bn as skip,
  Hn as startWith,
  Jn as switchMap,
  zn as takeUntil,
  Qn as tap,
  Xn as throttleTime
};
//# sourceMappingURL=index.js.map
