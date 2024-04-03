var j = Object.defineProperty;
var C = (e, t, n) =>
  t in e
    ? j(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var y = (e, t, n) => (C(e, typeof t != "symbol" ? t + "" : t, n), n);
import {
  r as h,
  n as p,
  h as v,
  j as O,
  i as A,
  k as B,
  l as b,
  m as I,
  p as L,
  q as N,
  v as P,
  w as T,
  x as D,
} from "./scheduler.2pBl59A6.js";
let $ = !1;
function q() {
  $ = !0;
}
function H() {
  $ = !1;
}
function M(e, t, n, i) {
  for (; e < t; ) {
    const a = e + ((t - e) >> 1);
    n(a) <= i ? (e = a + 1) : (t = a);
  }
  return e;
}
function z(e) {
  if (e.hydrate_init) return;
  e.hydrate_init = !0;
  let t = e.childNodes;
  if (e.nodeName === "HEAD") {
    const r = [];
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      o.claim_order !== void 0 && r.push(o);
    }
    t = r;
  }
  const n = new Int32Array(t.length + 1),
    i = new Int32Array(t.length);
  n[0] = -1;
  let a = 0;
  for (let r = 0; r < t.length; r++) {
    const s = t[r].claim_order,
      o =
        (a > 0 && t[n[a]].claim_order <= s
          ? a + 1
          : M(1, a, (d) => t[n[d]].claim_order, s)) - 1;
    i[r] = n[o] + 1;
    const u = o + 1;
    (n[u] = r), (a = Math.max(u, a));
  }
  const c = [],
    l = [];
  let f = t.length - 1;
  for (let r = n[a] + 1; r != 0; r = i[r - 1]) {
    for (c.push(t[r - 1]); f >= r; f--) l.push(t[f]);
    f--;
  }
  for (; f >= 0; f--) l.push(t[f]);
  c.reverse(), l.sort((r, s) => r.claim_order - s.claim_order);
  for (let r = 0, s = 0; r < l.length; r++) {
    for (; s < c.length && l[r].claim_order >= c[s].claim_order; ) s++;
    const o = s < c.length ? c[s] : null;
    e.insertBefore(l[r], o);
  }
}
function R(e, t) {
  if ($) {
    for (
      z(e),
        (e.actual_end_child === void 0 ||
          (e.actual_end_child !== null &&
            e.actual_end_child.parentNode !== e)) &&
          (e.actual_end_child = e.firstChild);
      e.actual_end_child !== null && e.actual_end_child.claim_order === void 0;

    )
      e.actual_end_child = e.actual_end_child.nextSibling;
    t !== e.actual_end_child
      ? (t.claim_order !== void 0 || t.parentNode !== e) &&
        e.insertBefore(t, e.actual_end_child)
      : (e.actual_end_child = t.nextSibling);
  } else (t.parentNode !== e || t.nextSibling !== null) && e.appendChild(t);
}
function se(e, t, n) {
  $ && !n
    ? R(e, t)
    : (t.parentNode !== e || t.nextSibling != n) &&
      e.insertBefore(t, n || null);
}
function U(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function V(e) {
  return document.createElement(e);
}
function x(e) {
  return document.createTextNode(e);
}
function le() {
  return x(" ");
}
function ae() {
  return x("");
}
function fe(e, t, n, i) {
  return e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i);
}
function E(e, t, n) {
  n == null
    ? e.removeAttribute(t)
    : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
const W = ["width", "height"];
function F(e, t) {
  const n = Object.getOwnPropertyDescriptors(e.__proto__);
  for (const i in t)
    t[i] == null
      ? e.removeAttribute(i)
      : i === "style"
        ? (e.style.cssText = t[i])
        : i === "__value"
          ? (e.value = e[i] = t[i])
          : n[i] && n[i].set && W.indexOf(i) === -1
            ? (e[i] = t[i])
            : E(e, i, t[i]);
}
function G(e, t) {
  Object.keys(t).forEach((n) => {
    J(e, n, t[n]);
  });
}
function J(e, t, n) {
  const i = t.toLowerCase();
  i in e
    ? (e[i] = typeof e[i] == "boolean" && n === "" ? !0 : n)
    : t in e
      ? (e[t] = typeof e[t] == "boolean" && n === "" ? !0 : n)
      : E(e, t, n);
}
function ce(e) {
  return /-/.test(e) ? G : F;
}
function ue(e) {
  return e.dataset.svelteH;
}
function K(e) {
  return Array.from(e.childNodes);
}
function Q(e) {
  e.claim_info === void 0 &&
    (e.claim_info = { last_index: 0, total_claimed: 0 });
}
function S(e, t, n, i, a = !1) {
  Q(e);
  const c = (() => {
    for (let l = e.claim_info.last_index; l < e.length; l++) {
      const f = e[l];
      if (t(f)) {
        const r = n(f);
        return (
          r === void 0 ? e.splice(l, 1) : (e[l] = r),
          a || (e.claim_info.last_index = l),
          f
        );
      }
    }
    for (let l = e.claim_info.last_index - 1; l >= 0; l--) {
      const f = e[l];
      if (t(f)) {
        const r = n(f);
        return (
          r === void 0 ? e.splice(l, 1) : (e[l] = r),
          a
            ? r === void 0 && e.claim_info.last_index--
            : (e.claim_info.last_index = l),
          f
        );
      }
    }
    return i();
  })();
  return (
    (c.claim_order = e.claim_info.total_claimed),
    (e.claim_info.total_claimed += 1),
    c
  );
}
function X(e, t, n, i) {
  return S(
    e,
    (a) => a.nodeName === t,
    (a) => {
      const c = [];
      for (let l = 0; l < a.attributes.length; l++) {
        const f = a.attributes[l];
        n[f.name] || c.push(f.name);
      }
      c.forEach((l) => a.removeAttribute(l));
    },
    () => i(t),
  );
}
function oe(e, t, n) {
  return X(e, t, n, V);
}
function Y(e, t) {
  return S(
    e,
    (n) => n.nodeType === 3,
    (n) => {
      const i = "" + t;
      if (n.data.startsWith(i)) {
        if (n.data.length !== i.length) return n.splitText(i.length);
      } else n.data = i;
    },
    () => x(t),
    !0,
  );
}
function _e(e) {
  return Y(e, " ");
}
function de(e, t) {
  (t = "" + t), e.data !== t && (e.data = t);
}
function me(e, t) {
  e.value = t ?? "";
}
function he(e, t, n, i) {
  n == null
    ? e.style.removeProperty(t)
    : e.style.setProperty(t, n, i ? "important" : "");
}
function $e(e, t) {
  return new e(t);
}
const m = new Set();
let _;
function ye() {
  _ = { r: 0, c: [], p: _ };
}
function pe() {
  _.r || h(_.c), (_ = _.p);
}
function Z(e, t) {
  e && e.i && (m.delete(e), e.i(t));
}
function xe(e, t, n, i) {
  if (e && e.o) {
    if (m.has(e)) return;
    m.add(e),
      _.c.push(() => {
        m.delete(e), i && (n && e.d(1), i());
      }),
      e.o(t);
  } else i && i();
}
function ge(e, t, n) {
  const i = e.$$.props[t];
  i !== void 0 && ((e.$$.bound[i] = n), n(e.$$.ctx[i]));
}
function we(e) {
  e && e.c();
}
function ve(e, t) {
  e && e.l(t);
}
function k(e, t, n) {
  const { fragment: i, after_update: a } = e.$$;
  i && i.m(t, n),
    b(() => {
      const c = e.$$.on_mount.map(P).filter(A);
      e.$$.on_destroy ? e.$$.on_destroy.push(...c) : h(c), (e.$$.on_mount = []);
    }),
    a.forEach(b);
}
function ee(e, t) {
  const n = e.$$;
  n.fragment !== null &&
    (I(n.after_update),
    h(n.on_destroy),
    n.fragment && n.fragment.d(t),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function te(e, t) {
  e.$$.dirty[0] === -1 && (T.push(e), D(), e.$$.dirty.fill(0)),
    (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
}
function be(e, t, n, i, a, c, l = null, f = [-1]) {
  const r = L;
  N(e);
  const s = (e.$$ = {
    fragment: null,
    ctx: [],
    props: c,
    update: p,
    not_equal: a,
    bound: v(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (r ? r.$$.context : [])),
    callbacks: v(),
    dirty: f,
    skip_bound: !1,
    root: t.target || r.$$.root,
  });
  l && l(s.root);
  let o = !1;
  if (
    ((s.ctx = n
      ? n(e, t.props || {}, (u, d, ...g) => {
          const w = g.length ? g[0] : d;
          return (
            s.ctx &&
              a(s.ctx[u], (s.ctx[u] = w)) &&
              (!s.skip_bound && s.bound[u] && s.bound[u](w), o && te(e, u)),
            d
          );
        })
      : []),
    s.update(),
    (o = !0),
    h(s.before_update),
    (s.fragment = i ? i(s.ctx) : !1),
    t.target)
  ) {
    if (t.hydrate) {
      q();
      const u = K(t.target);
      s.fragment && s.fragment.l(u), u.forEach(U);
    } else s.fragment && s.fragment.c();
    t.intro && Z(e.$$.fragment), k(e, t.target, t.anchor), H(), O();
  }
  N(r);
}
class Ne {
  constructor() {
    y(this, "$$");
    y(this, "$$set");
  }
  $destroy() {
    ee(this, 1), (this.$destroy = p);
  }
  $on(t, n) {
    if (!A(n)) return p;
    const i = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return (
      i.push(n),
      () => {
        const a = i.indexOf(n);
        a !== -1 && i.splice(a, 1);
      }
    );
  }
  $set(t) {
    this.$$set &&
      !B(t) &&
      ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
  }
}
const ne = "4";
typeof window < "u" &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(ne);
export {
  fe as A,
  me as B,
  ge as C,
  ue as D,
  Ne as S,
  K as a,
  Y as b,
  oe as c,
  U as d,
  V as e,
  _e as f,
  se as g,
  R as h,
  be as i,
  de as j,
  Z as k,
  xe as l,
  ae as m,
  pe as n,
  E as o,
  he as p,
  ye as q,
  $e as r,
  le as s,
  x as t,
  we as u,
  ve as v,
  k as w,
  ee as x,
  F as y,
  ce as z,
};
