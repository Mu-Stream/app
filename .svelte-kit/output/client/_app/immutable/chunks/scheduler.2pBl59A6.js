function y() {}
function k(t, n) {
  for (const e in n) t[e] = n[e];
  return t;
}
function w(t) {
  return t();
}
function D() {
  return Object.create(null);
}
function E(t) {
  t.forEach(w);
}
function j(t) {
  return typeof t == "function";
}
function F(t, n) {
  return t != t
    ? n == n
    : t !== n || (t && typeof t == "object") || typeof t == "function";
}
function M(t) {
  return Object.keys(t).length === 0;
}
function v(t, ...n) {
  if (t == null) {
    for (const o of n) o(void 0);
    return y;
  }
  const e = t.subscribe(...n);
  return e.unsubscribe ? () => e.unsubscribe() : e;
}
function S(t, n, e) {
  t.$$.on_destroy.push(v(n, e));
}
function A(t, n, e, o) {
  if (t) {
    const c = m(t, n, e, o);
    return t[0](c);
  }
}
function m(t, n, e, o) {
  return t[1] && o ? k(e.ctx.slice(), t[1](o(n))) : e.ctx;
}
function B(t, n, e, o) {
  if (t[2] && o) {
    const c = t[2](o(e));
    if (n.dirty === void 0) return c;
    if (typeof c == "object") {
      const l = [],
        d = Math.max(n.dirty.length, c.length);
      for (let u = 0; u < d; u += 1) l[u] = n.dirty[u] | c[u];
      return l;
    }
    return n.dirty | c;
  }
  return n.dirty;
}
function G(t, n, e, o, c, l) {
  if (c) {
    const d = m(n, e, o, l);
    t.p(d, c);
  }
}
function P(t) {
  if (t.ctx.length > 32) {
    const n = [],
      e = t.ctx.length / 32;
    for (let o = 0; o < e; o++) n[o] = -1;
    return n;
  }
  return -1;
}
function U(t) {
  const n = {};
  for (const e in t) e[0] !== "$" && (n[e] = t[e]);
  return n;
}
function H(t, n) {
  const e = {};
  n = new Set(n);
  for (const o in t) !n.has(o) && o[0] !== "$" && (e[o] = t[o]);
  return e;
}
function I(t) {
  return t && j(t.destroy) ? t.destroy : y;
}
let f;
function _(t) {
  f = t;
}
function i() {
  if (!f) throw new Error("Function called outside component initialization");
  return f;
}
function J(t) {
  i().$$.on_mount.push(t);
}
function K(t) {
  i().$$.after_update.push(t);
}
function L(t) {
  i().$$.on_destroy.push(t);
}
function N(t, n) {
  return i().$$.context.set(t, n), n;
}
function Q(t) {
  return i().$$.context.get(t);
}
function R(t, n) {
  const e = t.$$.callbacks[n.type];
  e && e.slice().forEach((o) => o.call(this, n));
}
const a = [],
  g = [];
let s = [];
const p = [],
  x = Promise.resolve();
let b = !1;
function C() {
  b || ((b = !0), x.then(q));
}
function T() {
  return C(), x;
}
function O(t) {
  s.push(t);
}
function V(t) {
  p.push(t);
}
const h = new Set();
let r = 0;
function q() {
  if (r !== 0) return;
  const t = f;
  do {
    try {
      for (; r < a.length; ) {
        const n = a[r];
        r++, _(n), z(n.$$);
      }
    } catch (n) {
      throw ((a.length = 0), (r = 0), n);
    }
    for (_(null), a.length = 0, r = 0; g.length; ) g.pop()();
    for (let n = 0; n < s.length; n += 1) {
      const e = s[n];
      h.has(e) || (h.add(e), e());
    }
    s.length = 0;
  } while (a.length);
  for (; p.length; ) p.pop()();
  (b = !1), h.clear(), _(t);
}
function z(t) {
  if (t.fragment !== null) {
    t.update(), E(t.before_update);
    const n = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, n),
      t.after_update.forEach(O);
  }
}
function W(t) {
  const n = [],
    e = [];
  s.forEach((o) => (t.indexOf(o) === -1 ? n.push(o) : e.push(o))),
    e.forEach((o) => o()),
    (s = n);
}
export {
  Q as A,
  H as B,
  k as C,
  U as D,
  I as E,
  R as F,
  V as G,
  v as a,
  A as b,
  S as c,
  B as d,
  K as e,
  g as f,
  P as g,
  D as h,
  j as i,
  q as j,
  M as k,
  O as l,
  W as m,
  y as n,
  J as o,
  f as p,
  _ as q,
  E as r,
  F as s,
  T as t,
  G as u,
  w as v,
  a as w,
  C as x,
  L as y,
  N as z,
};
