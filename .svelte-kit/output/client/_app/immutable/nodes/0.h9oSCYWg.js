import {
  s as a,
  b as r,
  u as i,
  g as u,
  d as f,
} from "../chunks/scheduler.2pBl59A6.js";
import { S as _, i as c, k as p, l as m } from "../chunks/index.JfgdDZH5.js";
const d = !0,
  $ = !1,
  v = Object.freeze(
    Object.defineProperty(
      { __proto__: null, prerender: d, ssr: $ },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
function g(n) {
  let s;
  const l = n[1].default,
    t = r(l, n, n[0], null);
  return {
    c() {
      t && t.c();
    },
    l(e) {
      t && t.l(e);
    },
    m(e, o) {
      t && t.m(e, o), (s = !0);
    },
    p(e, [o]) {
      t &&
        t.p &&
        (!s || o & 1) &&
        i(t, l, e, e[0], s ? f(l, e[0], o, null) : u(e[0]), null);
    },
    i(e) {
      s || (p(t, e), (s = !0));
    },
    o(e) {
      m(t, e), (s = !1);
    },
    d(e) {
      t && t.d(e);
    },
  };
}
function b(n, s, l) {
  let { $$slots: t = {}, $$scope: e } = s;
  return (
    (n.$$set = (o) => {
      "$$scope" in o && l(0, (e = o.$$scope));
    }),
    [e, t]
  );
}
class h extends _ {
  constructor(s) {
    super(), c(this, s, b, g, a, {});
  }
}
export { h as component, v as universal };
