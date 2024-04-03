import {
  y as li,
  z as ui,
  A as En,
  s as Me,
  B as ve,
  C as fe,
  D as Qe,
  f as Bt,
  b as We,
  u as qe,
  g as ze,
  d as Ge,
  n as Tt,
  a as ci,
  E as Ar,
  c as Cn,
  F as ce,
  r as xr,
  i as fi,
  G as di,
} from "../chunks/scheduler.2pBl59A6.js";
import {
  S as He,
  i as Ve,
  m as Ie,
  g as Ee,
  q as Ft,
  l as se,
  n as Ot,
  k as oe,
  d as pe,
  e as Ae,
  c as xe,
  a as Xe,
  y as nt,
  z as Wt,
  A as he,
  u as Pe,
  v as Le,
  w as De,
  x as Ue,
  B as Or,
  C as hi,
  t as kt,
  s as st,
  b as It,
  f as at,
  D as Pr,
  o as gt,
  h as Ce,
  j as pi,
} from "../chunks/index.JfgdDZH5.js";
import { d as Rn, w as Tr, r as Sn } from "../chunks/index.VIQqXnB6.js";
function Ye(t, e) {
  const r = {},
    n = {},
    s = { $$scope: 1 };
  let a = t.length;
  for (; a--; ) {
    const u = t[a],
      l = e[a];
    if (l) {
      for (const c in u) c in l || (n[c] = 1);
      for (const c in l) s[c] || ((r[c] = l[c]), (s[c] = 1));
      t[a] = l;
    } else for (const c in u) s[c] = 1;
  }
  for (const u in n) u in r || (r[u] = void 0);
  return r;
}
function Ht(t) {
  return typeof t == "object" && t !== null ? t : {};
}
function dr(t) {
  return Object.keys(t).reduce(
    (e, r) => (t[r] === void 0 ? e : e + `${r}:${t[r]};`),
    "",
  );
}
dr({
  position: "absolute",
  opacity: 0,
  "pointer-events": "none",
  margin: 0,
  transform: "translateX(-100%)",
});
function Lr(t) {
  function e(r) {
    return r(t), () => {};
  }
  return { subscribe: e };
}
const Lt = (t) =>
    new Proxy(t, {
      get(e, r, n) {
        return Reflect.get(e, r, n);
      },
      ownKeys(e) {
        return Reflect.ownKeys(e).filter((r) => r !== "action");
      },
    }),
  Dr = (t) => typeof t == "function";
function Ur(t, e) {
  const { stores: r, action: n, returned: s } = e ?? {},
    a = (() => {
      if (r && s)
        return Rn(r, (l) => {
          const c = s(l);
          if (Dr(c)) {
            const d = (...h) =>
              Lt({ ...c(...h), [`data-melt-${t}`]: "", action: n ?? bt });
            return (d.action = n ?? bt), d;
          }
          return Lt({ ...c, [`data-melt-${t}`]: "", action: n ?? bt });
        });
      {
        const l = s,
          c = l == null ? void 0 : l();
        if (Dr(c)) {
          const d = (...h) =>
            Lt({ ...c(...h), [`data-melt-${t}`]: "", action: n ?? bt });
          return (d.action = n ?? bt), Lr(d);
        }
        return Lr(Lt({ ...c, [`data-melt-${t}`]: "", action: n ?? bt }));
      }
    })(),
    u = n ?? (() => {});
  return (u.subscribe = a.subscribe), u;
}
const gi = typeof document < "u";
function bt() {}
function An(t, e, r, n) {
  const s = Array.isArray(e) ? e : [e];
  return (
    s.forEach((a) => t.addEventListener(a, r, n)),
    () => {
      s.forEach((a) => t.removeEventListener(a, r, n));
    }
  );
}
function bi(t, ...e) {
  const r = {};
  for (const n of Object.keys(t)) e.includes(n) || (r[n] = t[n]);
  return r;
}
const mi = (t, e) => {
    const r = (s, a) => {
      t.update((u) => {
        const l = s(u);
        let c = l;
        return e && (c = e({ curr: u, next: l })), a == null || a(c), c;
      });
    };
    return {
      ...t,
      update: r,
      set: (s) => {
        r(() => s);
      },
    };
  },
  yi = {
    ALT: "Alt",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP: "ArrowUp",
    BACKSPACE: "Backspace",
    CAPS_LOCK: "CapsLock",
    CONTROL: "Control",
    DELETE: "Delete",
    END: "End",
    ENTER: "Enter",
    ESCAPE: "Escape",
    F1: "F1",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    HOME: "Home",
    META: "Meta",
    PAGE_DOWN: "PageDown",
    PAGE_UP: "PageUp",
    SHIFT: "Shift",
    SPACE: " ",
    TAB: "Tab",
    CTRL: "Control",
    ASTERISK: "*",
    A: "a",
    P: "p",
  },
  xn = (t) => {
    try {
      li(t);
    } catch {
      return t();
    }
  };
function _i(t, e) {
  let r = [];
  const n = (l) => {
      r.push(l);
    },
    s = () => {
      r.forEach((l) => l()), (r = []);
    },
    a = Rn(t, (l) => (s(), e(l, n)));
  return (
    xn(s),
    {
      ...a,
      subscribe: (...l) => {
        const c = a.subscribe(...l);
        return () => {
          c(), s();
        };
      },
    }
  );
}
function wi(t, e) {
  const r = _i(t, (n, s) => ({ stores: n, onUnsubscribe: s })).subscribe(
    ({ stores: n, onUnsubscribe: s }) => {
      const a = e(n);
      a && s(a);
    },
  );
  return xn(r), r;
}
function vi(t) {
  const e = {};
  return (
    Object.keys(t).forEach((r) => {
      const n = r,
        s = t[n];
      e[n] = Tr(s);
    }),
    e
  );
}
const Ei = { src: "", delayMs: 0, onLoadingStatusChange: void 0 },
  Ci = (t) => {
    const e = { ...Ei, ...t },
      r = vi(bi(e, "loadingStatus", "onLoadingStatusChange")),
      { src: n, delayMs: s } = r,
      a = e.loadingStatus ?? Tr("loading"),
      u = mi(a, e == null ? void 0 : e.onLoadingStatusChange);
    wi([n, s], ([d, h]) => {
      if (gi) {
        const y = new Image();
        (y.src = d),
          (y.onload = () => {
            if (s !== void 0) {
              const S = window.setTimeout(() => {
                u.set("loaded");
              }, h);
              return () => window.clearTimeout(S);
            } else u.set("loaded");
          }),
          (y.onerror = () => {
            u.set("error");
          });
      }
    });
    const l = Ur("avatar-image", {
        stores: [n, u],
        returned: ([d, h]) => {
          const y = dr({ display: h === "loaded" ? "block" : "none" });
          return { src: d, style: y };
        },
      }),
      c = Ur("avatar-fallback", {
        stores: [u],
        returned: ([d]) => ({
          style: d === "loaded" ? dr({ display: "none" }) : void 0,
          hidden: d === "loaded" ? !0 : void 0,
        }),
      });
    return {
      elements: { image: l, fallback: c },
      states: { loadingStatus: u },
      options: r,
    };
  };
Sn(void 0, (t) => {
  function e(n) {
    t(n), t(void 0);
  }
  return An(document, "pointerup", e, { passive: !1, capture: !0 });
});
Sn(void 0, (t) => {
  function e(n) {
    n && n.key === yi.ESCAPE && t(n), t(void 0);
  }
  return An(document, "keydown", e, { passive: !1 });
});
function Ri(t, e) {
  const r = {};
  return (
    e.forEach((n) => {
      r[n] = { [`data-${t}-${n}`]: "" };
    }),
    (n) => r[n]
  );
}
function Si(t) {
  const e = {};
  for (const r in t) {
    const n = t[r];
    n !== void 0 && (e[r] = n);
  }
  return e;
}
function Ai(t) {
  return function (e, r) {
    if (r === void 0) return;
    const n = t[e];
    n && n.set(r);
  };
}
function kr() {
  return { NAME: "avatar", PARTS: ["root", "image", "fallback"] };
}
function xi(t) {
  const { NAME: e, PARTS: r } = kr(),
    n = Ri(e, r),
    s = { ...Ci(Si(t)), getAttrs: n };
  return ui(e, s), { ...s, updateOption: Ai(s.options) };
}
function Ti(t = "") {
  const { NAME: e } = kr(),
    r = En(e);
  return t ? r.options.src.set(t) : r.options.src.set(""), r;
}
function ki() {
  const { NAME: t } = kr();
  return En(t);
}
const Ii = (t) => ({}),
  jr = (t) => ({ attrs: t[2] }),
  Mi = (t) => ({}),
  Wr = (t) => ({ attrs: t[2] });
function Ni(t) {
  let e, r;
  const n = t[8].default,
    s = We(n, t, t[7], jr);
  let a = [t[3], t[2]],
    u = {};
  for (let l = 0; l < a.length; l += 1) u = fe(u, a[l]);
  return {
    c() {
      (e = Ae("div")), s && s.c(), this.h();
    },
    l(l) {
      e = xe(l, "DIV", {});
      var c = Xe(e);
      s && s.l(c), c.forEach(pe), this.h();
    },
    h() {
      nt(e, u);
    },
    m(l, c) {
      Ee(l, e, c), s && s.m(e, null), t[9](e), (r = !0);
    },
    p(l, c) {
      s &&
        s.p &&
        (!r || c & 128) &&
        qe(s, n, l, l[7], r ? Ge(n, l[7], c, Ii) : ze(l[7]), jr),
        nt(e, (u = Ye(a, [c & 8 && l[3], l[2]])));
    },
    i(l) {
      r || (oe(s, l), (r = !0));
    },
    o(l) {
      se(s, l), (r = !1);
    },
    d(l) {
      l && pe(e), s && s.d(l), t[9](null);
    },
  };
}
function Bi(t) {
  let e;
  const r = t[8].default,
    n = We(r, t, t[7], Wr);
  return {
    c() {
      n && n.c();
    },
    l(s) {
      n && n.l(s);
    },
    m(s, a) {
      n && n.m(s, a), (e = !0);
    },
    p(s, a) {
      n &&
        n.p &&
        (!e || a & 128) &&
        qe(n, r, s, s[7], e ? Ge(r, s[7], a, Mi) : ze(s[7]), Wr);
    },
    i(s) {
      e || (oe(n, s), (e = !0));
    },
    o(s) {
      se(n, s), (e = !1);
    },
    d(s) {
      n && n.d(s);
    },
  };
}
function Fi(t) {
  let e, r, n, s;
  const a = [Bi, Ni],
    u = [];
  function l(c, d) {
    return c[1] ? 0 : 1;
  }
  return (
    (e = l(t)),
    (r = u[e] = a[e](t)),
    {
      c() {
        r.c(), (n = Ie());
      },
      l(c) {
        r.l(c), (n = Ie());
      },
      m(c, d) {
        u[e].m(c, d), Ee(c, n, d), (s = !0);
      },
      p(c, [d]) {
        let h = e;
        (e = l(c)),
          e === h
            ? u[e].p(c, d)
            : (Ft(),
              se(u[h], 1, 1, () => {
                u[h] = null;
              }),
              Ot(),
              (r = u[e]),
              r ? r.p(c, d) : ((r = u[e] = a[e](c)), r.c()),
              oe(r, 1),
              r.m(n.parentNode, n));
      },
      i(c) {
        s || (oe(r), (s = !0));
      },
      o(c) {
        se(r), (s = !1);
      },
      d(c) {
        c && pe(n), u[e].d(c);
      },
    }
  );
}
function Oi(t, e, r) {
  const n = [
    "delayMs",
    "loadingStatus",
    "onLoadingStatusChange",
    "asChild",
    "el",
  ];
  let s = ve(e, n),
    { $$slots: a = {}, $$scope: u } = e,
    { delayMs: l = void 0 } = e,
    { loadingStatus: c = void 0 } = e,
    { onLoadingStatusChange: d = void 0 } = e,
    { asChild: h = !1 } = e,
    { el: y = void 0 } = e;
  const {
      states: { loadingStatus: S },
      updateOption: k,
      getAttrs: T,
    } = xi({
      src: "",
      delayMs: l,
      onLoadingStatusChange: ({ next: m }) => (
        r(4, (c = m)), d == null || d(m), m
      ),
    }),
    C = T("root");
  function A(m) {
    Bt[m ? "unshift" : "push"](() => {
      (y = m), r(0, y);
    });
  }
  return (
    (t.$$set = (m) => {
      (e = fe(fe({}, e), Qe(m))),
        r(3, (s = ve(e, n))),
        "delayMs" in m && r(5, (l = m.delayMs)),
        "loadingStatus" in m && r(4, (c = m.loadingStatus)),
        "onLoadingStatusChange" in m && r(6, (d = m.onLoadingStatusChange)),
        "asChild" in m && r(1, (h = m.asChild)),
        "el" in m && r(0, (y = m.el)),
        "$$scope" in m && r(7, (u = m.$$scope));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 16 && c !== void 0 && S.set(c),
        t.$$.dirty & 32 && k("delayMs", l);
    }),
    [y, h, C, s, c, l, d, u, a, A]
  );
}
let Pi = class extends He {
  constructor(e) {
    super(),
      Ve(this, e, Oi, Fi, Me, {
        delayMs: 5,
        loadingStatus: 4,
        onLoadingStatusChange: 6,
        asChild: 1,
        el: 0,
      });
  }
};
const Li = (t) => ({ builder: t & 8 }),
  qr = (t) => ({ builder: t[3] });
function Di(t) {
  let e,
    r,
    n,
    s = [t[3], { alt: t[1] }, t[5]],
    a = {};
  for (let u = 0; u < s.length; u += 1) a = fe(a, s[u]);
  return {
    c() {
      (e = Ae("img")), this.h();
    },
    l(u) {
      (e = xe(u, "IMG", { alt: !0 })), this.h();
    },
    h() {
      nt(e, a);
    },
    m(u, l) {
      Ee(u, e, l), t[10](e), r || ((n = Ar(t[3].action(e))), (r = !0));
    },
    p(u, l) {
      nt(
        e,
        (a = Ye(s, [l & 8 && u[3], l & 2 && { alt: u[1] }, l & 32 && u[5]])),
      );
    },
    i: Tt,
    o: Tt,
    d(u) {
      u && pe(e), t[10](null), (r = !1), n();
    },
  };
}
function Ui(t) {
  let e;
  const r = t[9].default,
    n = We(r, t, t[8], qr);
  return {
    c() {
      n && n.c();
    },
    l(s) {
      n && n.l(s);
    },
    m(s, a) {
      n && n.m(s, a), (e = !0);
    },
    p(s, a) {
      n &&
        n.p &&
        (!e || a & 264) &&
        qe(n, r, s, s[8], e ? Ge(r, s[8], a, Li) : ze(s[8]), qr);
    },
    i(s) {
      e || (oe(n, s), (e = !0));
    },
    o(s) {
      se(n, s), (e = !1);
    },
    d(s) {
      n && n.d(s);
    },
  };
}
function ji(t) {
  let e, r, n, s;
  const a = [Ui, Di],
    u = [];
  function l(c, d) {
    return c[2] ? 0 : 1;
  }
  return (
    (e = l(t)),
    (r = u[e] = a[e](t)),
    {
      c() {
        r.c(), (n = Ie());
      },
      l(c) {
        r.l(c), (n = Ie());
      },
      m(c, d) {
        u[e].m(c, d), Ee(c, n, d), (s = !0);
      },
      p(c, [d]) {
        let h = e;
        (e = l(c)),
          e === h
            ? u[e].p(c, d)
            : (Ft(),
              se(u[h], 1, 1, () => {
                u[h] = null;
              }),
              Ot(),
              (r = u[e]),
              r ? r.p(c, d) : ((r = u[e] = a[e](c)), r.c()),
              oe(r, 1),
              r.m(n.parentNode, n));
      },
      i(c) {
        s || (oe(r), (s = !0));
      },
      o(c) {
        se(r), (s = !1);
      },
      d(c) {
        c && pe(n), u[e].d(c);
      },
    }
  );
}
function Wi(t, e, r) {
  let n, s;
  const a = ["src", "alt", "asChild", "el"];
  let u = ve(e, a),
    l,
    c = Tt,
    d = () => (c(), (c = ci(n, (v) => r(7, (l = v)))), n);
  t.$$.on_destroy.push(() => c());
  let { $$slots: h = {}, $$scope: y } = e,
    { src: S = void 0 } = e,
    { alt: k = void 0 } = e,
    { asChild: T = !1 } = e,
    { el: C = void 0 } = e;
  const A = { "data-bits-avatar-image": "" };
  function m(v) {
    Bt[v ? "unshift" : "push"](() => {
      (C = v), r(0, C);
    });
  }
  return (
    (t.$$set = (v) => {
      (e = fe(fe({}, e), Qe(v))),
        r(5, (u = ve(e, a))),
        "src" in v && r(6, (S = v.src)),
        "alt" in v && r(1, (k = v.alt)),
        "asChild" in v && r(2, (T = v.asChild)),
        "el" in v && r(0, (C = v.el)),
        "$$scope" in v && r(8, (y = v.$$scope));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 64 && d(r(4, (n = Ti(S).elements.image))),
        t.$$.dirty & 128 && r(3, (s = l)),
        t.$$.dirty & 8 && Object.assign(s, A);
    }),
    [C, k, T, s, n, u, S, l, y, h, m]
  );
}
let qi = class extends He {
  constructor(e) {
    super(), Ve(this, e, Wi, ji, Me, { src: 6, alt: 1, asChild: 2, el: 0 });
  }
};
const zi = (t) => ({ builder: t & 4 }),
  zr = (t) => ({ builder: t[2] }),
  Gi = (t) => ({ builder: t & 4 }),
  Gr = (t) => ({ builder: t[2] });
function Hi(t) {
  let e, r, n, s;
  const a = t[7].default,
    u = We(a, t, t[6], zr);
  let l = [t[2], t[4]],
    c = {};
  for (let d = 0; d < l.length; d += 1) c = fe(c, l[d]);
  return {
    c() {
      (e = Ae("span")), u && u.c(), this.h();
    },
    l(d) {
      e = xe(d, "SPAN", {});
      var h = Xe(e);
      u && u.l(h), h.forEach(pe), this.h();
    },
    h() {
      nt(e, c);
    },
    m(d, h) {
      Ee(d, e, h),
        u && u.m(e, null),
        t[8](e),
        (r = !0),
        n || ((s = Ar(t[2].action(e))), (n = !0));
    },
    p(d, h) {
      u &&
        u.p &&
        (!r || h & 68) &&
        qe(u, a, d, d[6], r ? Ge(a, d[6], h, zi) : ze(d[6]), zr),
        nt(e, (c = Ye(l, [h & 4 && d[2], h & 16 && d[4]])));
    },
    i(d) {
      r || (oe(u, d), (r = !0));
    },
    o(d) {
      se(u, d), (r = !1);
    },
    d(d) {
      d && pe(e), u && u.d(d), t[8](null), (n = !1), s();
    },
  };
}
function Vi(t) {
  let e;
  const r = t[7].default,
    n = We(r, t, t[6], Gr);
  return {
    c() {
      n && n.c();
    },
    l(s) {
      n && n.l(s);
    },
    m(s, a) {
      n && n.m(s, a), (e = !0);
    },
    p(s, a) {
      n &&
        n.p &&
        (!e || a & 68) &&
        qe(n, r, s, s[6], e ? Ge(r, s[6], a, Gi) : ze(s[6]), Gr);
    },
    i(s) {
      e || (oe(n, s), (e = !0));
    },
    o(s) {
      se(n, s), (e = !1);
    },
    d(s) {
      n && n.d(s);
    },
  };
}
function Yi(t) {
  let e, r, n, s;
  const a = [Vi, Hi],
    u = [];
  function l(c, d) {
    return c[1] ? 0 : 1;
  }
  return (
    (e = l(t)),
    (r = u[e] = a[e](t)),
    {
      c() {
        r.c(), (n = Ie());
      },
      l(c) {
        r.l(c), (n = Ie());
      },
      m(c, d) {
        u[e].m(c, d), Ee(c, n, d), (s = !0);
      },
      p(c, [d]) {
        let h = e;
        (e = l(c)),
          e === h
            ? u[e].p(c, d)
            : (Ft(),
              se(u[h], 1, 1, () => {
                u[h] = null;
              }),
              Ot(),
              (r = u[e]),
              r ? r.p(c, d) : ((r = u[e] = a[e](c)), r.c()),
              oe(r, 1),
              r.m(n.parentNode, n));
      },
      i(c) {
        s || (oe(r), (s = !0));
      },
      o(c) {
        se(r), (s = !1);
      },
      d(c) {
        c && pe(n), u[e].d(c);
      },
    }
  );
}
function Ji(t, e, r) {
  let n;
  const s = ["asChild", "el"];
  let a = ve(e, s),
    u,
    { $$slots: l = {}, $$scope: c } = e,
    { asChild: d = !1 } = e,
    { el: h = void 0 } = e;
  const {
    elements: { fallback: y },
    getAttrs: S,
  } = ki();
  Cn(t, y, (C) => r(5, (u = C)));
  const k = S("fallback");
  function T(C) {
    Bt[C ? "unshift" : "push"](() => {
      (h = C), r(0, h);
    });
  }
  return (
    (t.$$set = (C) => {
      (e = fe(fe({}, e), Qe(C))),
        r(4, (a = ve(e, s))),
        "asChild" in C && r(1, (d = C.asChild)),
        "el" in C && r(0, (h = C.el)),
        "$$scope" in C && r(6, (c = C.$$scope));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 32 && r(2, (n = u)), t.$$.dirty & 4 && Object.assign(n, k);
    }),
    [h, d, n, y, a, u, c, l, T]
  );
}
let Ki = class extends He {
  constructor(e) {
    super(), Ve(this, e, Ji, Yi, Me, { asChild: 1, el: 0 });
  }
};
function Xi(t, e) {
  const r = [];
  return (
    e.builders.forEach((n) => {
      const s = n.action(t);
      s && r.push(s);
    }),
    {
      destroy: () => {
        r.forEach((n) => {
          n.destroy && n.destroy();
        });
      },
    }
  );
}
function Hr(t) {
  const e = {};
  return (
    t.forEach((r) => {
      Object.keys(r).forEach((n) => {
        n !== "action" && (e[n] = r[n]);
      });
    }),
    e
  );
}
function Zi(t) {
  let e = t[1] ? "a" : "button",
    r,
    n,
    s = (t[1] ? "a" : "button") && Kt(t);
  return {
    c() {
      s && s.c(), (r = Ie());
    },
    l(a) {
      s && s.l(a), (r = Ie());
    },
    m(a, u) {
      s && s.m(a, u), Ee(a, r, u), (n = !0);
    },
    p(a, u) {
      a[1],
        e
          ? Me(e, a[1] ? "a" : "button")
            ? (s.d(1),
              (s = Kt(a)),
              (e = a[1] ? "a" : "button"),
              s.c(),
              s.m(r.parentNode, r))
            : s.p(a, u)
          : ((s = Kt(a)),
            (e = a[1] ? "a" : "button"),
            s.c(),
            s.m(r.parentNode, r));
    },
    i(a) {
      n || (oe(s, a), (n = !0));
    },
    o(a) {
      se(s, a), (n = !1);
    },
    d(a) {
      a && pe(r), s && s.d(a);
    },
  };
}
function Qi(t) {
  let e = t[1] ? "a" : "button",
    r,
    n,
    s = (t[1] ? "a" : "button") && Xt(t);
  return {
    c() {
      s && s.c(), (r = Ie());
    },
    l(a) {
      s && s.l(a), (r = Ie());
    },
    m(a, u) {
      s && s.m(a, u), Ee(a, r, u), (n = !0);
    },
    p(a, u) {
      a[1],
        e
          ? Me(e, a[1] ? "a" : "button")
            ? (s.d(1),
              (s = Xt(a)),
              (e = a[1] ? "a" : "button"),
              s.c(),
              s.m(r.parentNode, r))
            : s.p(a, u)
          : ((s = Xt(a)),
            (e = a[1] ? "a" : "button"),
            s.c(),
            s.m(r.parentNode, r));
    },
    i(a) {
      n || (oe(s, a), (n = !0));
    },
    o(a) {
      se(s, a), (n = !1);
    },
    d(a) {
      a && pe(r), s && s.d(a);
    },
  };
}
function Kt(t) {
  let e, r, n, s, a;
  const u = t[7].default,
    l = We(u, t, t[6], null);
  let c = [
      { type: (r = t[1] ? void 0 : t[2]) },
      { href: t[1] },
      { tabindex: "0" },
      t[5],
      t[4],
    ],
    d = {};
  for (let h = 0; h < c.length; h += 1) d = fe(d, c[h]);
  return {
    c() {
      (e = Ae(t[1] ? "a" : "button")), l && l.c(), this.h();
    },
    l(h) {
      e = xe(h, ((t[1] ? "a" : "button") || "null").toUpperCase(), {
        type: !0,
        href: !0,
        tabindex: !0,
      });
      var y = Xe(e);
      l && l.l(y), y.forEach(pe), this.h();
    },
    h() {
      Wt(t[1] ? "a" : "button")(e, d);
    },
    m(h, y) {
      Ee(h, e, y),
        l && l.m(e, null),
        (n = !0),
        s ||
          ((a = [
            he(e, "click", t[14]),
            he(e, "change", t[15]),
            he(e, "keydown", t[16]),
            he(e, "keyup", t[17]),
            he(e, "mouseenter", t[18]),
            he(e, "mouseleave", t[19]),
          ]),
          (s = !0));
    },
    p(h, y) {
      l &&
        l.p &&
        (!n || y & 64) &&
        qe(l, u, h, h[6], n ? Ge(u, h[6], y, null) : ze(h[6]), null),
        Wt(h[1] ? "a" : "button")(
          e,
          (d = Ye(c, [
            (!n || (y & 6 && r !== (r = h[1] ? void 0 : h[2]))) && { type: r },
            (!n || y & 2) && { href: h[1] },
            { tabindex: "0" },
            y & 32 && h[5],
            h[4],
          ])),
        );
    },
    i(h) {
      n || (oe(l, h), (n = !0));
    },
    o(h) {
      se(l, h), (n = !1);
    },
    d(h) {
      h && pe(e), l && l.d(h), (s = !1), xr(a);
    },
  };
}
function Xt(t) {
  let e, r, n, s, a, u;
  const l = t[7].default,
    c = We(l, t, t[6], null);
  let d = [
      { type: (r = t[1] ? void 0 : t[2]) },
      { href: t[1] },
      { tabindex: "0" },
      Hr(t[3]),
      t[5],
      t[4],
    ],
    h = {};
  for (let y = 0; y < d.length; y += 1) h = fe(h, d[y]);
  return {
    c() {
      (e = Ae(t[1] ? "a" : "button")), c && c.c(), this.h();
    },
    l(y) {
      e = xe(y, ((t[1] ? "a" : "button") || "null").toUpperCase(), {
        type: !0,
        href: !0,
        tabindex: !0,
      });
      var S = Xe(e);
      c && c.l(S), S.forEach(pe), this.h();
    },
    h() {
      Wt(t[1] ? "a" : "button")(e, h);
    },
    m(y, S) {
      Ee(y, e, S),
        c && c.m(e, null),
        t[20](e),
        (s = !0),
        a ||
          ((u = [
            he(e, "click", t[8]),
            he(e, "change", t[9]),
            he(e, "keydown", t[10]),
            he(e, "keyup", t[11]),
            he(e, "mouseenter", t[12]),
            he(e, "mouseleave", t[13]),
            Ar((n = Xi.call(null, e, { builders: t[3] }))),
          ]),
          (a = !0));
    },
    p(y, S) {
      c &&
        c.p &&
        (!s || S & 64) &&
        qe(c, l, y, y[6], s ? Ge(l, y[6], S, null) : ze(y[6]), null),
        Wt(y[1] ? "a" : "button")(
          e,
          (h = Ye(d, [
            (!s || (S & 6 && r !== (r = y[1] ? void 0 : y[2]))) && { type: r },
            (!s || S & 2) && { href: y[1] },
            { tabindex: "0" },
            S & 8 && Hr(y[3]),
            S & 32 && y[5],
            y[4],
          ])),
        ),
        n && fi(n.update) && S & 8 && n.update.call(null, { builders: y[3] });
    },
    i(y) {
      s || (oe(c, y), (s = !0));
    },
    o(y) {
      se(c, y), (s = !1);
    },
    d(y) {
      y && pe(e), c && c.d(y), t[20](null), (a = !1), xr(u);
    },
  };
}
function $i(t) {
  let e, r, n, s;
  const a = [Qi, Zi],
    u = [];
  function l(c, d) {
    return c[3] && c[3].length ? 0 : 1;
  }
  return (
    (e = l(t)),
    (r = u[e] = a[e](t)),
    {
      c() {
        r.c(), (n = Ie());
      },
      l(c) {
        r.l(c), (n = Ie());
      },
      m(c, d) {
        u[e].m(c, d), Ee(c, n, d), (s = !0);
      },
      p(c, [d]) {
        let h = e;
        (e = l(c)),
          e === h
            ? u[e].p(c, d)
            : (Ft(),
              se(u[h], 1, 1, () => {
                u[h] = null;
              }),
              Ot(),
              (r = u[e]),
              r ? r.p(c, d) : ((r = u[e] = a[e](c)), r.c()),
              oe(r, 1),
              r.m(n.parentNode, n));
      },
      i(c) {
        s || (oe(r), (s = !0));
      },
      o(c) {
        se(r), (s = !1);
      },
      d(c) {
        c && pe(n), u[e].d(c);
      },
    }
  );
}
function eo(t, e, r) {
  const n = ["href", "type", "builders", "el"];
  let s = ve(e, n),
    { $$slots: a = {}, $$scope: u } = e,
    { href: l = void 0 } = e,
    { type: c = void 0 } = e,
    { builders: d = [] } = e,
    { el: h = void 0 } = e;
  const y = { "data-button-root": "" };
  function S(N) {
    ce.call(this, t, N);
  }
  function k(N) {
    ce.call(this, t, N);
  }
  function T(N) {
    ce.call(this, t, N);
  }
  function C(N) {
    ce.call(this, t, N);
  }
  function A(N) {
    ce.call(this, t, N);
  }
  function m(N) {
    ce.call(this, t, N);
  }
  function v(N) {
    ce.call(this, t, N);
  }
  function B(N) {
    ce.call(this, t, N);
  }
  function O(N) {
    ce.call(this, t, N);
  }
  function L(N) {
    ce.call(this, t, N);
  }
  function F(N) {
    ce.call(this, t, N);
  }
  function j(N) {
    ce.call(this, t, N);
  }
  function q(N) {
    Bt[N ? "unshift" : "push"](() => {
      (h = N), r(0, h);
    });
  }
  return (
    (t.$$set = (N) => {
      (e = fe(fe({}, e), Qe(N))),
        r(5, (s = ve(e, n))),
        "href" in N && r(1, (l = N.href)),
        "type" in N && r(2, (c = N.type)),
        "builders" in N && r(3, (d = N.builders)),
        "el" in N && r(0, (h = N.el)),
        "$$scope" in N && r(6, (u = N.$$scope));
    }),
    [h, l, c, d, y, s, u, a, S, k, T, C, A, m, v, B, O, L, F, j, q]
  );
}
let to = class extends He {
  constructor(e) {
    super(), Ve(this, e, eo, $i, Me, { href: 1, type: 2, builders: 3, el: 0 });
  }
};
function Tn(t) {
  var e,
    r,
    n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var s = t.length;
      for (e = 0; e < s; e++)
        t[e] && (r = Tn(t[e])) && (n && (n += " "), (n += r));
    } else for (r in t) t[r] && (n && (n += " "), (n += r));
  return n;
}
function ro() {
  for (var t, e, r = 0, n = "", s = arguments.length; r < s; r++)
    (t = arguments[r]) && (e = Tn(t)) && (n && (n += " "), (n += e));
  return n;
}
const Ir = "-";
function no(t) {
  const e = oo(t),
    { conflictingClassGroups: r, conflictingClassGroupModifiers: n } = t;
  function s(u) {
    const l = u.split(Ir);
    return l[0] === "" && l.length !== 1 && l.shift(), kn(l, e) || io(u);
  }
  function a(u, l) {
    const c = r[u] || [];
    return l && n[u] ? [...c, ...n[u]] : c;
  }
  return { getClassGroupId: s, getConflictingClassGroupIds: a };
}
function kn(t, e) {
  var u;
  if (t.length === 0) return e.classGroupId;
  const r = t[0],
    n = e.nextPart.get(r),
    s = n ? kn(t.slice(1), n) : void 0;
  if (s) return s;
  if (e.validators.length === 0) return;
  const a = t.join(Ir);
  return (u = e.validators.find(({ validator: l }) => l(a))) == null
    ? void 0
    : u.classGroupId;
}
const Vr = /^\[(.+)\]$/;
function io(t) {
  if (Vr.test(t)) {
    const e = Vr.exec(t)[1],
      r = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (r) return "arbitrary.." + r;
  }
}
function oo(t) {
  const { theme: e, prefix: r } = t,
    n = { nextPart: new Map(), validators: [] };
  return (
    ao(Object.entries(t.classGroups), r).forEach(([a, u]) => {
      hr(u, n, a, e);
    }),
    n
  );
}
function hr(t, e, r, n) {
  t.forEach((s) => {
    if (typeof s == "string") {
      const a = s === "" ? e : Yr(e, s);
      a.classGroupId = r;
      return;
    }
    if (typeof s == "function") {
      if (so(s)) {
        hr(s(n), e, r, n);
        return;
      }
      e.validators.push({ validator: s, classGroupId: r });
      return;
    }
    Object.entries(s).forEach(([a, u]) => {
      hr(u, Yr(e, a), r, n);
    });
  });
}
function Yr(t, e) {
  let r = t;
  return (
    e.split(Ir).forEach((n) => {
      r.nextPart.has(n) ||
        r.nextPart.set(n, { nextPart: new Map(), validators: [] }),
        (r = r.nextPart.get(n));
    }),
    r
  );
}
function so(t) {
  return t.isThemeGetter;
}
function ao(t, e) {
  return e
    ? t.map(([r, n]) => {
        const s = n.map((a) =>
          typeof a == "string"
            ? e + a
            : typeof a == "object"
              ? Object.fromEntries(
                  Object.entries(a).map(([u, l]) => [e + u, l]),
                )
              : a,
        );
        return [r, s];
      })
    : t;
}
function lo(t) {
  if (t < 1) return { get: () => {}, set: () => {} };
  let e = 0,
    r = new Map(),
    n = new Map();
  function s(a, u) {
    r.set(a, u), e++, e > t && ((e = 0), (n = r), (r = new Map()));
  }
  return {
    get(a) {
      let u = r.get(a);
      if (u !== void 0) return u;
      if ((u = n.get(a)) !== void 0) return s(a, u), u;
    },
    set(a, u) {
      r.has(a) ? r.set(a, u) : s(a, u);
    },
  };
}
const In = "!";
function uo(t) {
  const e = t.separator,
    r = e.length === 1,
    n = e[0],
    s = e.length;
  return function (u) {
    const l = [];
    let c = 0,
      d = 0,
      h;
    for (let C = 0; C < u.length; C++) {
      let A = u[C];
      if (c === 0) {
        if (A === n && (r || u.slice(C, C + s) === e)) {
          l.push(u.slice(d, C)), (d = C + s);
          continue;
        }
        if (A === "/") {
          h = C;
          continue;
        }
      }
      A === "[" ? c++ : A === "]" && c--;
    }
    const y = l.length === 0 ? u : u.substring(d),
      S = y.startsWith(In),
      k = S ? y.substring(1) : y,
      T = h && h > d ? h - d : void 0;
    return {
      modifiers: l,
      hasImportantModifier: S,
      baseClassName: k,
      maybePostfixModifierPosition: T,
    };
  };
}
function co(t) {
  if (t.length <= 1) return t;
  const e = [];
  let r = [];
  return (
    t.forEach((n) => {
      n[0] === "[" ? (e.push(...r.sort(), n), (r = [])) : r.push(n);
    }),
    e.push(...r.sort()),
    e
  );
}
function fo(t) {
  return { cache: lo(t.cacheSize), splitModifiers: uo(t), ...no(t) };
}
const ho = /\s+/;
function po(t, e) {
  const {
      splitModifiers: r,
      getClassGroupId: n,
      getConflictingClassGroupIds: s,
    } = e,
    a = new Set();
  return t
    .trim()
    .split(ho)
    .map((u) => {
      const {
        modifiers: l,
        hasImportantModifier: c,
        baseClassName: d,
        maybePostfixModifierPosition: h,
      } = r(u);
      let y = n(h ? d.substring(0, h) : d),
        S = !!h;
      if (!y) {
        if (!h) return { isTailwindClass: !1, originalClassName: u };
        if (((y = n(d)), !y))
          return { isTailwindClass: !1, originalClassName: u };
        S = !1;
      }
      const k = co(l).join(":");
      return {
        isTailwindClass: !0,
        modifierId: c ? k + In : k,
        classGroupId: y,
        originalClassName: u,
        hasPostfixModifier: S,
      };
    })
    .reverse()
    .filter((u) => {
      if (!u.isTailwindClass) return !0;
      const { modifierId: l, classGroupId: c, hasPostfixModifier: d } = u,
        h = l + c;
      return a.has(h)
        ? !1
        : (a.add(h), s(c, d).forEach((y) => a.add(l + y)), !0);
    })
    .reverse()
    .map((u) => u.originalClassName)
    .join(" ");
}
function go() {
  let t = 0,
    e,
    r,
    n = "";
  for (; t < arguments.length; )
    (e = arguments[t++]) && (r = Mn(e)) && (n && (n += " "), (n += r));
  return n;
}
function Mn(t) {
  if (typeof t == "string") return t;
  let e,
    r = "";
  for (let n = 0; n < t.length; n++)
    t[n] && (e = Mn(t[n])) && (r && (r += " "), (r += e));
  return r;
}
function bo(t, ...e) {
  let r,
    n,
    s,
    a = u;
  function u(c) {
    const d = e.reduce((h, y) => y(h), t());
    return (r = fo(d)), (n = r.cache.get), (s = r.cache.set), (a = l), l(c);
  }
  function l(c) {
    const d = n(c);
    if (d) return d;
    const h = po(c, r);
    return s(c, h), h;
  }
  return function () {
    return a(go.apply(null, arguments));
  };
}
function ge(t) {
  const e = (r) => r[t] || [];
  return (e.isThemeGetter = !0), e;
}
const Nn = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  mo = /^\d+\/\d+$/,
  yo = new Set(["px", "full", "screen"]),
  _o = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  wo =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  vo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  Eo = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Co =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function Ke(t) {
  return lt(t) || yo.has(t) || mo.test(t);
}
function et(t) {
  return _t(t, "length", Mo);
}
function lt(t) {
  return !!t && !Number.isNaN(Number(t));
}
function Dt(t) {
  return _t(t, "number", lt);
}
function Ct(t) {
  return !!t && Number.isInteger(Number(t));
}
function Ro(t) {
  return t.endsWith("%") && lt(t.slice(0, -1));
}
function J(t) {
  return Nn.test(t);
}
function tt(t) {
  return _o.test(t);
}
const So = new Set(["length", "size", "percentage"]);
function Ao(t) {
  return _t(t, So, Bn);
}
function xo(t) {
  return _t(t, "position", Bn);
}
const To = new Set(["image", "url"]);
function ko(t) {
  return _t(t, To, Bo);
}
function Io(t) {
  return _t(t, "", No);
}
function Rt() {
  return !0;
}
function _t(t, e, r) {
  const n = Nn.exec(t);
  return n
    ? n[1]
      ? typeof e == "string"
        ? n[1] === e
        : e.has(n[1])
      : r(n[2])
    : !1;
}
function Mo(t) {
  return wo.test(t) && !vo.test(t);
}
function Bn() {
  return !1;
}
function No(t) {
  return Eo.test(t);
}
function Bo(t) {
  return Co.test(t);
}
function Fo() {
  const t = ge("colors"),
    e = ge("spacing"),
    r = ge("blur"),
    n = ge("brightness"),
    s = ge("borderColor"),
    a = ge("borderRadius"),
    u = ge("borderSpacing"),
    l = ge("borderWidth"),
    c = ge("contrast"),
    d = ge("grayscale"),
    h = ge("hueRotate"),
    y = ge("invert"),
    S = ge("gap"),
    k = ge("gradientColorStops"),
    T = ge("gradientColorStopPositions"),
    C = ge("inset"),
    A = ge("margin"),
    m = ge("opacity"),
    v = ge("padding"),
    B = ge("saturate"),
    O = ge("scale"),
    L = ge("sepia"),
    F = ge("skew"),
    j = ge("space"),
    q = ge("translate"),
    N = () => ["auto", "contain", "none"],
    H = () => ["auto", "hidden", "clip", "visible", "scroll"],
    re = () => ["auto", J, e],
    I = () => [J, e],
    W = () => ["", Ke, et],
    U = () => ["auto", lt, J],
    V = () => [
      "bottom",
      "center",
      "left",
      "left-bottom",
      "left-top",
      "right",
      "right-bottom",
      "right-top",
      "top",
    ],
    G = () => ["solid", "dashed", "dotted", "double", "none"],
    Y = () => [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity",
      "plus-lighter",
    ],
    te = () => [
      "start",
      "end",
      "center",
      "between",
      "around",
      "evenly",
      "stretch",
    ],
    X = () => ["", "0", J],
    le = () => [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column",
    ],
    K = () => [lt, Dt],
    Z = () => [lt, J];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Rt],
      spacing: [Ke, et],
      blur: ["none", "", tt, J],
      brightness: K(),
      borderColor: [t],
      borderRadius: ["none", "", "full", tt, J],
      borderSpacing: I(),
      borderWidth: W(),
      contrast: K(),
      grayscale: X(),
      hueRotate: Z(),
      invert: X(),
      gap: I(),
      gradientColorStops: [t],
      gradientColorStopPositions: [Ro, et],
      inset: re(),
      margin: re(),
      opacity: K(),
      padding: I(),
      saturate: K(),
      scale: K(),
      sepia: X(),
      skew: Z(),
      space: I(),
      translate: I(),
    },
    classGroups: {
      aspect: [{ aspect: ["auto", "square", "video", J] }],
      container: ["container"],
      columns: [{ columns: [tt] }],
      "break-after": [{ "break-after": le() }],
      "break-before": [{ "break-before": le() }],
      "break-inside": [
        { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
      ],
      "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
      box: [{ box: ["border", "content"] }],
      display: [
        "block",
        "inline-block",
        "inline",
        "flex",
        "inline-flex",
        "table",
        "inline-table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row-group",
        "table-row",
        "flow-root",
        "grid",
        "inline-grid",
        "contents",
        "list-item",
        "hidden",
      ],
      float: [{ float: ["right", "left", "none", "start", "end"] }],
      clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [
        { object: ["contain", "cover", "fill", "none", "scale-down"] },
      ],
      "object-position": [{ object: [...V(), J] }],
      overflow: [{ overflow: H() }],
      "overflow-x": [{ "overflow-x": H() }],
      "overflow-y": [{ "overflow-y": H() }],
      overscroll: [{ overscroll: N() }],
      "overscroll-x": [{ "overscroll-x": N() }],
      "overscroll-y": [{ "overscroll-y": N() }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{ inset: [C] }],
      "inset-x": [{ "inset-x": [C] }],
      "inset-y": [{ "inset-y": [C] }],
      start: [{ start: [C] }],
      end: [{ end: [C] }],
      top: [{ top: [C] }],
      right: [{ right: [C] }],
      bottom: [{ bottom: [C] }],
      left: [{ left: [C] }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{ z: ["auto", Ct, J] }],
      basis: [{ basis: re() }],
      "flex-direction": [
        { flex: ["row", "row-reverse", "col", "col-reverse"] },
      ],
      "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
      flex: [{ flex: ["1", "auto", "initial", "none", J] }],
      grow: [{ grow: X() }],
      shrink: [{ shrink: X() }],
      order: [{ order: ["first", "last", "none", Ct, J] }],
      "grid-cols": [{ "grid-cols": [Rt] }],
      "col-start-end": [{ col: ["auto", { span: ["full", Ct, J] }, J] }],
      "col-start": [{ "col-start": U() }],
      "col-end": [{ "col-end": U() }],
      "grid-rows": [{ "grid-rows": [Rt] }],
      "row-start-end": [{ row: ["auto", { span: [Ct, J] }, J] }],
      "row-start": [{ "row-start": U() }],
      "row-end": [{ "row-end": U() }],
      "grid-flow": [
        { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
      ],
      "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", J] }],
      "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", J] }],
      gap: [{ gap: [S] }],
      "gap-x": [{ "gap-x": [S] }],
      "gap-y": [{ "gap-y": [S] }],
      "justify-content": [{ justify: ["normal", ...te()] }],
      "justify-items": [
        { "justify-items": ["start", "end", "center", "stretch"] },
      ],
      "justify-self": [
        { "justify-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      "align-content": [{ content: ["normal", ...te(), "baseline"] }],
      "align-items": [
        { items: ["start", "end", "center", "baseline", "stretch"] },
      ],
      "align-self": [
        { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
      ],
      "place-content": [{ "place-content": [...te(), "baseline"] }],
      "place-items": [
        { "place-items": ["start", "end", "center", "baseline", "stretch"] },
      ],
      "place-self": [
        { "place-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      p: [{ p: [v] }],
      px: [{ px: [v] }],
      py: [{ py: [v] }],
      ps: [{ ps: [v] }],
      pe: [{ pe: [v] }],
      pt: [{ pt: [v] }],
      pr: [{ pr: [v] }],
      pb: [{ pb: [v] }],
      pl: [{ pl: [v] }],
      m: [{ m: [A] }],
      mx: [{ mx: [A] }],
      my: [{ my: [A] }],
      ms: [{ ms: [A] }],
      me: [{ me: [A] }],
      mt: [{ mt: [A] }],
      mr: [{ mr: [A] }],
      mb: [{ mb: [A] }],
      ml: [{ ml: [A] }],
      "space-x": [{ "space-x": [j] }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{ "space-y": [j] }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", J, e] }],
      "min-w": [{ "min-w": [J, e, "min", "max", "fit"] }],
      "max-w": [
        {
          "max-w": [
            J,
            e,
            "none",
            "full",
            "min",
            "max",
            "fit",
            "prose",
            { screen: [tt] },
            tt,
          ],
        },
      ],
      h: [{ h: [J, e, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "min-h": [{ "min-h": [J, e, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "max-h": [{ "max-h": [J, e, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      size: [{ size: [J, e, "auto", "min", "max", "fit"] }],
      "font-size": [{ text: ["base", tt, et] }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [
        {
          font: [
            "thin",
            "extralight",
            "light",
            "normal",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
            Dt,
          ],
        },
      ],
      "font-family": [{ font: [Rt] }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [
        {
          tracking: [
            "tighter",
            "tight",
            "normal",
            "wide",
            "wider",
            "widest",
            J,
          ],
        },
      ],
      "line-clamp": [{ "line-clamp": ["none", lt, Dt] }],
      leading: [
        {
          leading: [
            "none",
            "tight",
            "snug",
            "normal",
            "relaxed",
            "loose",
            Ke,
            J,
          ],
        },
      ],
      "list-image": [{ "list-image": ["none", J] }],
      "list-style-type": [{ list: ["none", "disc", "decimal", J] }],
      "list-style-position": [{ list: ["inside", "outside"] }],
      "placeholder-color": [{ placeholder: [t] }],
      "placeholder-opacity": [{ "placeholder-opacity": [m] }],
      "text-alignment": [
        { text: ["left", "center", "right", "justify", "start", "end"] },
      ],
      "text-color": [{ text: [t] }],
      "text-opacity": [{ "text-opacity": [m] }],
      "text-decoration": [
        "underline",
        "overline",
        "line-through",
        "no-underline",
      ],
      "text-decoration-style": [{ decoration: [...G(), "wavy"] }],
      "text-decoration-thickness": [
        { decoration: ["auto", "from-font", Ke, et] },
      ],
      "underline-offset": [{ "underline-offset": ["auto", Ke, J] }],
      "text-decoration-color": [{ decoration: [t] }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
      indent: [{ indent: I() }],
      "vertical-align": [
        {
          align: [
            "baseline",
            "top",
            "middle",
            "bottom",
            "text-top",
            "text-bottom",
            "sub",
            "super",
            J,
          ],
        },
      ],
      whitespace: [
        {
          whitespace: [
            "normal",
            "nowrap",
            "pre",
            "pre-line",
            "pre-wrap",
            "break-spaces",
          ],
        },
      ],
      break: [{ break: ["normal", "words", "all", "keep"] }],
      hyphens: [{ hyphens: ["none", "manual", "auto"] }],
      content: [{ content: ["none", J] }],
      "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
      "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
      "bg-opacity": [{ "bg-opacity": [m] }],
      "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
      "bg-position": [{ bg: [...V(), xo] }],
      "bg-repeat": [
        { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
      ],
      "bg-size": [{ bg: ["auto", "cover", "contain", Ao] }],
      "bg-image": [
        {
          bg: [
            "none",
            { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
            ko,
          ],
        },
      ],
      "bg-color": [{ bg: [t] }],
      "gradient-from-pos": [{ from: [T] }],
      "gradient-via-pos": [{ via: [T] }],
      "gradient-to-pos": [{ to: [T] }],
      "gradient-from": [{ from: [k] }],
      "gradient-via": [{ via: [k] }],
      "gradient-to": [{ to: [k] }],
      rounded: [{ rounded: [a] }],
      "rounded-s": [{ "rounded-s": [a] }],
      "rounded-e": [{ "rounded-e": [a] }],
      "rounded-t": [{ "rounded-t": [a] }],
      "rounded-r": [{ "rounded-r": [a] }],
      "rounded-b": [{ "rounded-b": [a] }],
      "rounded-l": [{ "rounded-l": [a] }],
      "rounded-ss": [{ "rounded-ss": [a] }],
      "rounded-se": [{ "rounded-se": [a] }],
      "rounded-ee": [{ "rounded-ee": [a] }],
      "rounded-es": [{ "rounded-es": [a] }],
      "rounded-tl": [{ "rounded-tl": [a] }],
      "rounded-tr": [{ "rounded-tr": [a] }],
      "rounded-br": [{ "rounded-br": [a] }],
      "rounded-bl": [{ "rounded-bl": [a] }],
      "border-w": [{ border: [l] }],
      "border-w-x": [{ "border-x": [l] }],
      "border-w-y": [{ "border-y": [l] }],
      "border-w-s": [{ "border-s": [l] }],
      "border-w-e": [{ "border-e": [l] }],
      "border-w-t": [{ "border-t": [l] }],
      "border-w-r": [{ "border-r": [l] }],
      "border-w-b": [{ "border-b": [l] }],
      "border-w-l": [{ "border-l": [l] }],
      "border-opacity": [{ "border-opacity": [m] }],
      "border-style": [{ border: [...G(), "hidden"] }],
      "divide-x": [{ "divide-x": [l] }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{ "divide-y": [l] }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{ "divide-opacity": [m] }],
      "divide-style": [{ divide: G() }],
      "border-color": [{ border: [s] }],
      "border-color-x": [{ "border-x": [s] }],
      "border-color-y": [{ "border-y": [s] }],
      "border-color-t": [{ "border-t": [s] }],
      "border-color-r": [{ "border-r": [s] }],
      "border-color-b": [{ "border-b": [s] }],
      "border-color-l": [{ "border-l": [s] }],
      "divide-color": [{ divide: [s] }],
      "outline-style": [{ outline: ["", ...G()] }],
      "outline-offset": [{ "outline-offset": [Ke, J] }],
      "outline-w": [{ outline: [Ke, et] }],
      "outline-color": [{ outline: [t] }],
      "ring-w": [{ ring: W() }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{ ring: [t] }],
      "ring-opacity": [{ "ring-opacity": [m] }],
      "ring-offset-w": [{ "ring-offset": [Ke, et] }],
      "ring-offset-color": [{ "ring-offset": [t] }],
      shadow: [{ shadow: ["", "inner", "none", tt, Io] }],
      "shadow-color": [{ shadow: [Rt] }],
      opacity: [{ opacity: [m] }],
      "mix-blend": [{ "mix-blend": Y() }],
      "bg-blend": [{ "bg-blend": Y() }],
      filter: [{ filter: ["", "none"] }],
      blur: [{ blur: [r] }],
      brightness: [{ brightness: [n] }],
      contrast: [{ contrast: [c] }],
      "drop-shadow": [{ "drop-shadow": ["", "none", tt, J] }],
      grayscale: [{ grayscale: [d] }],
      "hue-rotate": [{ "hue-rotate": [h] }],
      invert: [{ invert: [y] }],
      saturate: [{ saturate: [B] }],
      sepia: [{ sepia: [L] }],
      "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
      "backdrop-blur": [{ "backdrop-blur": [r] }],
      "backdrop-brightness": [{ "backdrop-brightness": [n] }],
      "backdrop-contrast": [{ "backdrop-contrast": [c] }],
      "backdrop-grayscale": [{ "backdrop-grayscale": [d] }],
      "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [h] }],
      "backdrop-invert": [{ "backdrop-invert": [y] }],
      "backdrop-opacity": [{ "backdrop-opacity": [m] }],
      "backdrop-saturate": [{ "backdrop-saturate": [B] }],
      "backdrop-sepia": [{ "backdrop-sepia": [L] }],
      "border-collapse": [{ border: ["collapse", "separate"] }],
      "border-spacing": [{ "border-spacing": [u] }],
      "border-spacing-x": [{ "border-spacing-x": [u] }],
      "border-spacing-y": [{ "border-spacing-y": [u] }],
      "table-layout": [{ table: ["auto", "fixed"] }],
      caption: [{ caption: ["top", "bottom"] }],
      transition: [
        {
          transition: [
            "none",
            "all",
            "",
            "colors",
            "opacity",
            "shadow",
            "transform",
            J,
          ],
        },
      ],
      duration: [{ duration: Z() }],
      ease: [{ ease: ["linear", "in", "out", "in-out", J] }],
      delay: [{ delay: Z() }],
      animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", J] }],
      transform: [{ transform: ["", "gpu", "none"] }],
      scale: [{ scale: [O] }],
      "scale-x": [{ "scale-x": [O] }],
      "scale-y": [{ "scale-y": [O] }],
      rotate: [{ rotate: [Ct, J] }],
      "translate-x": [{ "translate-x": [q] }],
      "translate-y": [{ "translate-y": [q] }],
      "skew-x": [{ "skew-x": [F] }],
      "skew-y": [{ "skew-y": [F] }],
      "transform-origin": [
        {
          origin: [
            "center",
            "top",
            "top-right",
            "right",
            "bottom-right",
            "bottom",
            "bottom-left",
            "left",
            "top-left",
            J,
          ],
        },
      ],
      accent: [{ accent: ["auto", t] }],
      appearance: [{ appearance: ["none", "auto"] }],
      cursor: [
        {
          cursor: [
            "auto",
            "default",
            "pointer",
            "wait",
            "text",
            "move",
            "help",
            "not-allowed",
            "none",
            "context-menu",
            "progress",
            "cell",
            "crosshair",
            "vertical-text",
            "alias",
            "copy",
            "no-drop",
            "grab",
            "grabbing",
            "all-scroll",
            "col-resize",
            "row-resize",
            "n-resize",
            "e-resize",
            "s-resize",
            "w-resize",
            "ne-resize",
            "nw-resize",
            "se-resize",
            "sw-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "zoom-in",
            "zoom-out",
            J,
          ],
        },
      ],
      "caret-color": [{ caret: [t] }],
      "pointer-events": [{ "pointer-events": ["none", "auto"] }],
      resize: [{ resize: ["none", "y", "x", ""] }],
      "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
      "scroll-m": [{ "scroll-m": I() }],
      "scroll-mx": [{ "scroll-mx": I() }],
      "scroll-my": [{ "scroll-my": I() }],
      "scroll-ms": [{ "scroll-ms": I() }],
      "scroll-me": [{ "scroll-me": I() }],
      "scroll-mt": [{ "scroll-mt": I() }],
      "scroll-mr": [{ "scroll-mr": I() }],
      "scroll-mb": [{ "scroll-mb": I() }],
      "scroll-ml": [{ "scroll-ml": I() }],
      "scroll-p": [{ "scroll-p": I() }],
      "scroll-px": [{ "scroll-px": I() }],
      "scroll-py": [{ "scroll-py": I() }],
      "scroll-ps": [{ "scroll-ps": I() }],
      "scroll-pe": [{ "scroll-pe": I() }],
      "scroll-pt": [{ "scroll-pt": I() }],
      "scroll-pr": [{ "scroll-pr": I() }],
      "scroll-pb": [{ "scroll-pb": I() }],
      "scroll-pl": [{ "scroll-pl": I() }],
      "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
      "snap-stop": [{ snap: ["normal", "always"] }],
      "snap-type": [{ snap: ["none", "x", "y", "both"] }],
      "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
      touch: [{ touch: ["auto", "none", "manipulation"] }],
      "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
      "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
      "touch-pz": ["touch-pinch-zoom"],
      select: [{ select: ["none", "text", "all", "auto"] }],
      "will-change": [
        { "will-change": ["auto", "scroll", "contents", "transform", J] },
      ],
      fill: [{ fill: [t, "none"] }],
      "stroke-w": [{ stroke: [Ke, et, Dt] }],
      stroke: [{ stroke: [t, "none"] }],
      sr: ["sr-only", "not-sr-only"],
      "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: [
        "inset-x",
        "inset-y",
        "start",
        "end",
        "top",
        "right",
        "bottom",
        "left",
      ],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": [
        "fvn-ordinal",
        "fvn-slashed-zero",
        "fvn-figure",
        "fvn-spacing",
        "fvn-fraction",
      ],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: [
        "rounded-s",
        "rounded-e",
        "rounded-t",
        "rounded-r",
        "rounded-b",
        "rounded-l",
        "rounded-ss",
        "rounded-se",
        "rounded-ee",
        "rounded-es",
        "rounded-tl",
        "rounded-tr",
        "rounded-br",
        "rounded-bl",
      ],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": [
        "border-w-s",
        "border-w-e",
        "border-w-t",
        "border-w-r",
        "border-w-b",
        "border-w-l",
      ],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": [
        "border-color-t",
        "border-color-r",
        "border-color-b",
        "border-color-l",
      ],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": [
        "scroll-mx",
        "scroll-my",
        "scroll-ms",
        "scroll-me",
        "scroll-mt",
        "scroll-mr",
        "scroll-mb",
        "scroll-ml",
      ],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": [
        "scroll-px",
        "scroll-py",
        "scroll-ps",
        "scroll-pe",
        "scroll-pt",
        "scroll-pr",
        "scroll-pb",
        "scroll-pl",
      ],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"],
    },
    conflictingClassGroupModifiers: { "font-size": ["leading"] },
  };
}
const Oo = bo(Fo);
function je(...t) {
  return Oo(ro(t));
}
function Po(t) {
  let e;
  const r = t[3].default,
    n = We(r, t, t[4], null);
  return {
    c() {
      n && n.c();
    },
    l(s) {
      n && n.l(s);
    },
    m(s, a) {
      n && n.m(s, a), (e = !0);
    },
    p(s, a) {
      n &&
        n.p &&
        (!e || a & 16) &&
        qe(n, r, s, s[4], e ? Ge(r, s[4], a, null) : ze(s[4]), null);
    },
    i(s) {
      e || (oe(n, s), (e = !0));
    },
    o(s) {
      se(n, s), (e = !1);
    },
    d(s) {
      n && n.d(s);
    },
  };
}
function Lo(t) {
  let e, r;
  const n = [
    { delayMs: t[1] },
    { class: je("relative flex h-10 w-10 shrink-0 overflow-hidden", t[0]) },
    t[2],
  ];
  let s = { $$slots: { default: [Po] }, $$scope: { ctx: t } };
  for (let a = 0; a < n.length; a += 1) s = fe(s, n[a]);
  return (
    (e = new Pi({ props: s })),
    {
      c() {
        Pe(e.$$.fragment);
      },
      l(a) {
        Le(e.$$.fragment, a);
      },
      m(a, u) {
        De(e, a, u), (r = !0);
      },
      p(a, [u]) {
        const l =
          u & 7
            ? Ye(n, [
                u & 2 && { delayMs: a[1] },
                u & 1 && {
                  class: je(
                    "relative flex h-10 w-10 shrink-0 overflow-hidden",
                    a[0],
                  ),
                },
                u & 4 && Ht(a[2]),
              ])
            : {};
        u & 16 && (l.$$scope = { dirty: u, ctx: a }), e.$set(l);
      },
      i(a) {
        r || (oe(e.$$.fragment, a), (r = !0));
      },
      o(a) {
        se(e.$$.fragment, a), (r = !1);
      },
      d(a) {
        Ue(e, a);
      },
    }
  );
}
function Do(t, e, r) {
  const n = ["class", "delayMs"];
  let s = ve(e, n),
    { $$slots: a = {}, $$scope: u } = e,
    { class: l = void 0 } = e,
    { delayMs: c = void 0 } = e;
  return (
    (t.$$set = (d) => {
      (e = fe(fe({}, e), Qe(d))),
        r(2, (s = ve(e, n))),
        "class" in d && r(0, (l = d.class)),
        "delayMs" in d && r(1, (c = d.delayMs)),
        "$$scope" in d && r(4, (u = d.$$scope));
    }),
    [l, c, s, a, u]
  );
}
class Uo extends He {
  constructor(e) {
    super(), Ve(this, e, Do, Lo, Me, { class: 0, delayMs: 1 });
  }
}
function jo(t) {
  let e, r;
  const n = [
    { src: t[1] },
    { alt: t[2] },
    { class: je("aspect-square h-full w-full", t[0]) },
    t[3],
  ];
  let s = {};
  for (let a = 0; a < n.length; a += 1) s = fe(s, n[a]);
  return (
    (e = new qi({ props: s })),
    {
      c() {
        Pe(e.$$.fragment);
      },
      l(a) {
        Le(e.$$.fragment, a);
      },
      m(a, u) {
        De(e, a, u), (r = !0);
      },
      p(a, [u]) {
        const l =
          u & 15
            ? Ye(n, [
                u & 2 && { src: a[1] },
                u & 4 && { alt: a[2] },
                u & 1 && { class: je("aspect-square h-full w-full", a[0]) },
                u & 8 && Ht(a[3]),
              ])
            : {};
        e.$set(l);
      },
      i(a) {
        r || (oe(e.$$.fragment, a), (r = !0));
      },
      o(a) {
        se(e.$$.fragment, a), (r = !1);
      },
      d(a) {
        Ue(e, a);
      },
    }
  );
}
function Wo(t, e, r) {
  const n = ["class", "src", "alt"];
  let s = ve(e, n),
    { class: a = void 0 } = e,
    { src: u = void 0 } = e,
    { alt: l = void 0 } = e;
  return (
    (t.$$set = (c) => {
      (e = fe(fe({}, e), Qe(c))),
        r(3, (s = ve(e, n))),
        "class" in c && r(0, (a = c.class)),
        "src" in c && r(1, (u = c.src)),
        "alt" in c && r(2, (l = c.alt));
    }),
    [a, u, l, s]
  );
}
class qo extends He {
  constructor(e) {
    super(), Ve(this, e, Wo, jo, Me, { class: 0, src: 1, alt: 2 });
  }
}
function zo(t) {
  let e;
  const r = t[2].default,
    n = We(r, t, t[3], null);
  return {
    c() {
      n && n.c();
    },
    l(s) {
      n && n.l(s);
    },
    m(s, a) {
      n && n.m(s, a), (e = !0);
    },
    p(s, a) {
      n &&
        n.p &&
        (!e || a & 8) &&
        qe(n, r, s, s[3], e ? Ge(r, s[3], a, null) : ze(s[3]), null);
    },
    i(s) {
      e || (oe(n, s), (e = !0));
    },
    o(s) {
      se(n, s), (e = !1);
    },
    d(s) {
      n && n.d(s);
    },
  };
}
function Go(t) {
  let e, r;
  const n = [
    {
      class: je(
        "flex h-full w-full items-center justify-center rounded-lg bg-muted",
        t[0],
      ),
    },
    t[1],
  ];
  let s = { $$slots: { default: [zo] }, $$scope: { ctx: t } };
  for (let a = 0; a < n.length; a += 1) s = fe(s, n[a]);
  return (
    (e = new Ki({ props: s })),
    {
      c() {
        Pe(e.$$.fragment);
      },
      l(a) {
        Le(e.$$.fragment, a);
      },
      m(a, u) {
        De(e, a, u), (r = !0);
      },
      p(a, [u]) {
        const l =
          u & 3
            ? Ye(n, [
                u & 1 && {
                  class: je(
                    "flex h-full w-full items-center justify-center rounded-lg bg-muted",
                    a[0],
                  ),
                },
                u & 2 && Ht(a[1]),
              ])
            : {};
        u & 8 && (l.$$scope = { dirty: u, ctx: a }), e.$set(l);
      },
      i(a) {
        r || (oe(e.$$.fragment, a), (r = !0));
      },
      o(a) {
        se(e.$$.fragment, a), (r = !1);
      },
      d(a) {
        Ue(e, a);
      },
    }
  );
}
function Ho(t, e, r) {
  const n = ["class"];
  let s = ve(e, n),
    { $$slots: a = {}, $$scope: u } = e,
    { class: l = void 0 } = e;
  return (
    (t.$$set = (c) => {
      (e = fe(fe({}, e), Qe(c))),
        r(1, (s = ve(e, n))),
        "class" in c && r(0, (l = c.class)),
        "$$scope" in c && r(3, (u = c.$$scope));
    }),
    [l, s, a, u]
  );
}
class Vo extends He {
  constructor(e) {
    super(), Ve(this, e, Ho, Go, Me, { class: 0 });
  }
}
function Yo(t) {
  let e;
  const r = t[5].default,
    n = We(r, t, t[8], null);
  return {
    c() {
      n && n.c();
    },
    l(s) {
      n && n.l(s);
    },
    m(s, a) {
      n && n.m(s, a), (e = !0);
    },
    p(s, a) {
      n &&
        n.p &&
        (!e || a & 256) &&
        qe(n, r, s, s[8], e ? Ge(r, s[8], a, null) : ze(s[8]), null);
    },
    i(s) {
      e || (oe(n, s), (e = !0));
    },
    o(s) {
      se(n, s), (e = !1);
    },
    d(s) {
      n && n.d(s);
    },
  };
}
function Jo(t) {
  let e, r;
  const n = [
    { builders: t[3] },
    { class: je(en({ variant: t[1], size: t[2], className: t[0] })) },
    { type: "button" },
    t[4],
  ];
  let s = { $$slots: { default: [Yo] }, $$scope: { ctx: t } };
  for (let a = 0; a < n.length; a += 1) s = fe(s, n[a]);
  return (
    (e = new to({ props: s })),
    e.$on("click", t[6]),
    e.$on("keydown", t[7]),
    {
      c() {
        Pe(e.$$.fragment);
      },
      l(a) {
        Le(e.$$.fragment, a);
      },
      m(a, u) {
        De(e, a, u), (r = !0);
      },
      p(a, [u]) {
        const l =
          u & 31
            ? Ye(n, [
                u & 8 && { builders: a[3] },
                u & 7 && {
                  class: je(en({ variant: a[1], size: a[2], className: a[0] })),
                },
                n[2],
                u & 16 && Ht(a[4]),
              ])
            : {};
        u & 256 && (l.$$scope = { dirty: u, ctx: a }), e.$set(l);
      },
      i(a) {
        r || (oe(e.$$.fragment, a), (r = !0));
      },
      o(a) {
        se(e.$$.fragment, a), (r = !1);
      },
      d(a) {
        Ue(e, a);
      },
    }
  );
}
function Ko(t, e, r) {
  const n = ["class", "variant", "size", "builders"];
  let s = ve(e, n),
    { $$slots: a = {}, $$scope: u } = e,
    { class: l = void 0 } = e,
    { variant: c = "default" } = e,
    { size: d = "default" } = e,
    { builders: h = [] } = e;
  function y(k) {
    ce.call(this, t, k);
  }
  function S(k) {
    ce.call(this, t, k);
  }
  return (
    (t.$$set = (k) => {
      (e = fe(fe({}, e), Qe(k))),
        r(4, (s = ve(e, n))),
        "class" in k && r(0, (l = k.class)),
        "variant" in k && r(1, (c = k.variant)),
        "size" in k && r(2, (d = k.size)),
        "builders" in k && r(3, (h = k.builders)),
        "$$scope" in k && r(8, (u = k.$$scope));
    }),
    [l, c, d, h, s, a, y, S, u]
  );
}
class Fn extends He {
  constructor(e) {
    super(),
      Ve(this, e, Ko, Jo, Me, { class: 0, variant: 1, size: 2, builders: 3 });
  }
}
var Jr = (t) => (typeof t == "boolean" ? `${t}` : t === 0 ? "0" : t),
  Se = (t) => !t || typeof t != "object" || Object.keys(t).length === 0,
  Xo = (t, e) => JSON.stringify(t) === JSON.stringify(e);
function On(t, e) {
  t.forEach(function (r) {
    Array.isArray(r) ? On(r, e) : e.push(r);
  });
}
function Pn(t) {
  let e = [];
  return On(t, e), e;
}
var Ln = (...t) => Pn(t).filter(Boolean),
  Dn = (t, e) => {
    let r = {},
      n = Object.keys(t),
      s = Object.keys(e);
    for (let a of n)
      if (s.includes(a)) {
        let u = t[a],
          l = e[a];
        typeof u == "object" && typeof l == "object"
          ? (r[a] = Dn(u, l))
          : Array.isArray(u) || Array.isArray(l)
            ? (r[a] = Ln(l, u))
            : (r[a] = l + " " + u);
      } else r[a] = t[a];
    for (let a of s) n.includes(a) || (r[a] = e[a]);
    return r;
  },
  Kr = (t) => (!t || typeof t != "string" ? t : t.replace(/\s+/g, " ").trim());
function Zo() {
  for (var t = 0, e, r, n = ""; t < arguments.length; )
    (e = arguments[t++]) && (r = Un(e)) && (n && (n += " "), (n += r));
  return n;
}
function Un(t) {
  if (typeof t == "string") return t;
  for (var e, r = "", n = 0; n < t.length; n++)
    t[n] && (e = Un(t[n])) && (r && (r += " "), (r += e));
  return r;
}
var Mr = "-";
function Qo(t) {
  var e = es(t),
    r = t.conflictingClassGroups,
    n = t.conflictingClassGroupModifiers,
    s = n === void 0 ? {} : n;
  function a(l) {
    var c = l.split(Mr);
    return c[0] === "" && c.length !== 1 && c.shift(), jn(c, e) || $o(l);
  }
  function u(l, c) {
    var d = r[l] || [];
    return c && s[l] ? [].concat(d, s[l]) : d;
  }
  return { getClassGroupId: a, getConflictingClassGroupIds: u };
}
function jn(t, e) {
  var u;
  if (t.length === 0) return e.classGroupId;
  var r = t[0],
    n = e.nextPart.get(r),
    s = n ? jn(t.slice(1), n) : void 0;
  if (s) return s;
  if (e.validators.length !== 0) {
    var a = t.join(Mr);
    return (u = e.validators.find(function (l) {
      var c = l.validator;
      return c(a);
    })) == null
      ? void 0
      : u.classGroupId;
  }
}
var Xr = /^\[(.+)\]$/;
function $o(t) {
  if (Xr.test(t)) {
    var e = Xr.exec(t)[1],
      r = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (r) return "arbitrary.." + r;
  }
}
function es(t) {
  var e = t.theme,
    r = t.prefix,
    n = { nextPart: new Map(), validators: [] },
    s = rs(Object.entries(t.classGroups), r);
  return (
    s.forEach(function (a) {
      var u = a[0],
        l = a[1];
      pr(l, n, u, e);
    }),
    n
  );
}
function pr(t, e, r, n) {
  t.forEach(function (s) {
    if (typeof s == "string") {
      var a = s === "" ? e : Zr(e, s);
      a.classGroupId = r;
      return;
    }
    if (typeof s == "function") {
      if (ts(s)) {
        pr(s(n), e, r, n);
        return;
      }
      e.validators.push({ validator: s, classGroupId: r });
      return;
    }
    Object.entries(s).forEach(function (u) {
      var l = u[0],
        c = u[1];
      pr(c, Zr(e, l), r, n);
    });
  });
}
function Zr(t, e) {
  var r = t;
  return (
    e.split(Mr).forEach(function (n) {
      r.nextPart.has(n) ||
        r.nextPart.set(n, { nextPart: new Map(), validators: [] }),
        (r = r.nextPart.get(n));
    }),
    r
  );
}
function ts(t) {
  return t.isThemeGetter;
}
function rs(t, e) {
  return e
    ? t.map(function (r) {
        var n = r[0],
          s = r[1],
          a = s.map(function (u) {
            return typeof u == "string"
              ? e + u
              : typeof u == "object"
                ? Object.fromEntries(
                    Object.entries(u).map(function (l) {
                      var c = l[0],
                        d = l[1];
                      return [e + c, d];
                    }),
                  )
                : u;
          });
        return [n, a];
      })
    : t;
}
function ns(t) {
  if (t < 1) return { get: function () {}, set: function () {} };
  var e = 0,
    r = new Map(),
    n = new Map();
  function s(a, u) {
    r.set(a, u), e++, e > t && ((e = 0), (n = r), (r = new Map()));
  }
  return {
    get: function (u) {
      var l = r.get(u);
      if (l !== void 0) return l;
      if ((l = n.get(u)) !== void 0) return s(u, l), l;
    },
    set: function (u, l) {
      r.has(u) ? r.set(u, l) : s(u, l);
    },
  };
}
var Wn = "!";
function is(t) {
  var e = t.separator || ":",
    r = e.length === 1,
    n = e[0],
    s = e.length;
  return function (u) {
    for (var l = [], c = 0, d = 0, h, y = 0; y < u.length; y++) {
      var S = u[y];
      if (c === 0) {
        if (S === n && (r || u.slice(y, y + s) === e)) {
          l.push(u.slice(d, y)), (d = y + s);
          continue;
        }
        if (S === "/") {
          h = y;
          continue;
        }
      }
      S === "[" ? c++ : S === "]" && c--;
    }
    var k = l.length === 0 ? u : u.substring(d),
      T = k.startsWith(Wn),
      C = T ? k.substring(1) : k,
      A = h && h > d ? h - d : void 0;
    return {
      modifiers: l,
      hasImportantModifier: T,
      baseClassName: C,
      maybePostfixModifierPosition: A,
    };
  };
}
function os(t) {
  if (t.length <= 1) return t;
  var e = [],
    r = [];
  return (
    t.forEach(function (n) {
      var s = n[0] === "[";
      s ? (e.push.apply(e, r.sort().concat([n])), (r = [])) : r.push(n);
    }),
    e.push.apply(e, r.sort()),
    e
  );
}
function ss(t) {
  return { cache: ns(t.cacheSize), splitModifiers: is(t), ...Qo(t) };
}
var as = /\s+/;
function ls(t, e) {
  var r = e.splitModifiers,
    n = e.getClassGroupId,
    s = e.getConflictingClassGroupIds,
    a = new Set();
  return t
    .trim()
    .split(as)
    .map(function (u) {
      var l = r(u),
        c = l.modifiers,
        d = l.hasImportantModifier,
        h = l.baseClassName,
        y = l.maybePostfixModifierPosition,
        S = n(y ? h.substring(0, y) : h),
        k = !!y;
      if (!S) {
        if (!y) return { isTailwindClass: !1, originalClassName: u };
        if (((S = n(h)), !S))
          return { isTailwindClass: !1, originalClassName: u };
        k = !1;
      }
      var T = os(c).join(":"),
        C = d ? T + Wn : T;
      return {
        isTailwindClass: !0,
        modifierId: C,
        classGroupId: S,
        originalClassName: u,
        hasPostfixModifier: k,
      };
    })
    .reverse()
    .filter(function (u) {
      if (!u.isTailwindClass) return !0;
      var l = u.modifierId,
        c = u.classGroupId,
        d = u.hasPostfixModifier,
        h = l + c;
      return a.has(h)
        ? !1
        : (a.add(h),
          s(c, d).forEach(function (y) {
            return a.add(l + y);
          }),
          !0);
    })
    .reverse()
    .map(function (u) {
      return u.originalClassName;
    })
    .join(" ");
}
function gr() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  var n,
    s,
    a,
    u = l;
  function l(d) {
    var h = e[0],
      y = e.slice(1),
      S = y.reduce(function (k, T) {
        return T(k);
      }, h());
    return (n = ss(S)), (s = n.cache.get), (a = n.cache.set), (u = c), c(d);
  }
  function c(d) {
    var h = s(d);
    if (h) return h;
    var y = ls(d, n);
    return a(d, y), y;
  }
  return function () {
    return u(Zo.apply(null, arguments));
  };
}
function be(t) {
  var e = function (n) {
    return n[t] || [];
  };
  return (e.isThemeGetter = !0), e;
}
var qn = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  us = /^\d+\/\d+$/,
  cs = new Set(["px", "full", "screen"]),
  fs = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  ds =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  hs = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function Be(t) {
  return ut(t) || cs.has(t) || us.test(t) || br(t);
}
function br(t) {
  return ft(t, "length", _s);
}
function ps(t) {
  return ft(t, "size", zn);
}
function gs(t) {
  return ft(t, "position", zn);
}
function bs(t) {
  return ft(t, "url", ws);
}
function Ut(t) {
  return ft(t, "number", ut);
}
function ut(t) {
  return !Number.isNaN(Number(t));
}
function ms(t) {
  return t.endsWith("%") && ut(t.slice(0, -1));
}
function St(t) {
  return Qr(t) || ft(t, "number", Qr);
}
function ne(t) {
  return qn.test(t);
}
function At() {
  return !0;
}
function rt(t) {
  return fs.test(t);
}
function ys(t) {
  return ft(t, "", vs);
}
function ft(t, e, r) {
  var n = qn.exec(t);
  return n ? (n[1] ? n[1] === e : r(n[2])) : !1;
}
function _s(t) {
  return ds.test(t);
}
function zn() {
  return !1;
}
function ws(t) {
  return t.startsWith("url(");
}
function Qr(t) {
  return Number.isInteger(Number(t));
}
function vs(t) {
  return hs.test(t);
}
function mr() {
  var t = be("colors"),
    e = be("spacing"),
    r = be("blur"),
    n = be("brightness"),
    s = be("borderColor"),
    a = be("borderRadius"),
    u = be("borderSpacing"),
    l = be("borderWidth"),
    c = be("contrast"),
    d = be("grayscale"),
    h = be("hueRotate"),
    y = be("invert"),
    S = be("gap"),
    k = be("gradientColorStops"),
    T = be("gradientColorStopPositions"),
    C = be("inset"),
    A = be("margin"),
    m = be("opacity"),
    v = be("padding"),
    B = be("saturate"),
    O = be("scale"),
    L = be("sepia"),
    F = be("skew"),
    j = be("space"),
    q = be("translate"),
    N = function () {
      return ["auto", "contain", "none"];
    },
    H = function () {
      return ["auto", "hidden", "clip", "visible", "scroll"];
    },
    re = function () {
      return ["auto", ne, e];
    },
    I = function () {
      return [ne, e];
    },
    W = function () {
      return ["", Be];
    },
    U = function () {
      return ["auto", ut, ne];
    },
    V = function () {
      return [
        "bottom",
        "center",
        "left",
        "left-bottom",
        "left-top",
        "right",
        "right-bottom",
        "right-top",
        "top",
      ];
    },
    G = function () {
      return ["solid", "dashed", "dotted", "double", "none"];
    },
    Y = function () {
      return [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
        "plus-lighter",
      ];
    },
    te = function () {
      return [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
      ];
    },
    X = function () {
      return ["", "0", ne];
    },
    le = function () {
      return [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ];
    },
    K = function () {
      return [ut, Ut];
    },
    Z = function () {
      return [ut, ne];
    };
  return {
    cacheSize: 500,
    theme: {
      colors: [At],
      spacing: [Be],
      blur: ["none", "", rt, ne],
      brightness: K(),
      borderColor: [t],
      borderRadius: ["none", "", "full", rt, ne],
      borderSpacing: I(),
      borderWidth: W(),
      contrast: K(),
      grayscale: X(),
      hueRotate: Z(),
      invert: X(),
      gap: I(),
      gradientColorStops: [t],
      gradientColorStopPositions: [ms, br],
      inset: re(),
      margin: re(),
      opacity: K(),
      padding: I(),
      saturate: K(),
      scale: K(),
      sepia: X(),
      skew: Z(),
      space: I(),
      translate: I(),
    },
    classGroups: {
      aspect: [{ aspect: ["auto", "square", "video", ne] }],
      container: ["container"],
      columns: [{ columns: [rt] }],
      "break-after": [{ "break-after": le() }],
      "break-before": [{ "break-before": le() }],
      "break-inside": [
        { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
      ],
      "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
      box: [{ box: ["border", "content"] }],
      display: [
        "block",
        "inline-block",
        "inline",
        "flex",
        "inline-flex",
        "table",
        "inline-table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row-group",
        "table-row",
        "flow-root",
        "grid",
        "inline-grid",
        "contents",
        "list-item",
        "hidden",
      ],
      float: [{ float: ["right", "left", "none"] }],
      clear: [{ clear: ["left", "right", "both", "none"] }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [
        { object: ["contain", "cover", "fill", "none", "scale-down"] },
      ],
      "object-position": [{ object: [].concat(V(), [ne]) }],
      overflow: [{ overflow: H() }],
      "overflow-x": [{ "overflow-x": H() }],
      "overflow-y": [{ "overflow-y": H() }],
      overscroll: [{ overscroll: N() }],
      "overscroll-x": [{ "overscroll-x": N() }],
      "overscroll-y": [{ "overscroll-y": N() }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{ inset: [C] }],
      "inset-x": [{ "inset-x": [C] }],
      "inset-y": [{ "inset-y": [C] }],
      start: [{ start: [C] }],
      end: [{ end: [C] }],
      top: [{ top: [C] }],
      right: [{ right: [C] }],
      bottom: [{ bottom: [C] }],
      left: [{ left: [C] }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{ z: ["auto", St] }],
      basis: [{ basis: re() }],
      "flex-direction": [
        { flex: ["row", "row-reverse", "col", "col-reverse"] },
      ],
      "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
      flex: [{ flex: ["1", "auto", "initial", "none", ne] }],
      grow: [{ grow: X() }],
      shrink: [{ shrink: X() }],
      order: [{ order: ["first", "last", "none", St] }],
      "grid-cols": [{ "grid-cols": [At] }],
      "col-start-end": [{ col: ["auto", { span: ["full", St] }, ne] }],
      "col-start": [{ "col-start": U() }],
      "col-end": [{ "col-end": U() }],
      "grid-rows": [{ "grid-rows": [At] }],
      "row-start-end": [{ row: ["auto", { span: [St] }, ne] }],
      "row-start": [{ "row-start": U() }],
      "row-end": [{ "row-end": U() }],
      "grid-flow": [
        { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
      ],
      "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", ne] }],
      "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", ne] }],
      gap: [{ gap: [S] }],
      "gap-x": [{ "gap-x": [S] }],
      "gap-y": [{ "gap-y": [S] }],
      "justify-content": [{ justify: ["normal"].concat(te()) }],
      "justify-items": [
        { "justify-items": ["start", "end", "center", "stretch"] },
      ],
      "justify-self": [
        { "justify-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      "align-content": [{ content: ["normal"].concat(te(), ["baseline"]) }],
      "align-items": [
        { items: ["start", "end", "center", "baseline", "stretch"] },
      ],
      "align-self": [
        { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
      ],
      "place-content": [{ "place-content": [].concat(te(), ["baseline"]) }],
      "place-items": [
        { "place-items": ["start", "end", "center", "baseline", "stretch"] },
      ],
      "place-self": [
        { "place-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      p: [{ p: [v] }],
      px: [{ px: [v] }],
      py: [{ py: [v] }],
      ps: [{ ps: [v] }],
      pe: [{ pe: [v] }],
      pt: [{ pt: [v] }],
      pr: [{ pr: [v] }],
      pb: [{ pb: [v] }],
      pl: [{ pl: [v] }],
      m: [{ m: [A] }],
      mx: [{ mx: [A] }],
      my: [{ my: [A] }],
      ms: [{ ms: [A] }],
      me: [{ me: [A] }],
      mt: [{ mt: [A] }],
      mr: [{ mr: [A] }],
      mb: [{ mb: [A] }],
      ml: [{ ml: [A] }],
      "space-x": [{ "space-x": [j] }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{ "space-y": [j] }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{ w: ["auto", "min", "max", "fit", ne, e] }],
      "min-w": [{ "min-w": ["min", "max", "fit", ne, Be] }],
      "max-w": [
        {
          "max-w": [
            "0",
            "none",
            "full",
            "min",
            "max",
            "fit",
            "prose",
            { screen: [rt] },
            rt,
            ne,
          ],
        },
      ],
      h: [{ h: [ne, e, "auto", "min", "max", "fit"] }],
      "min-h": [{ "min-h": ["min", "max", "fit", ne, Be] }],
      "max-h": [{ "max-h": [ne, e, "min", "max", "fit"] }],
      "font-size": [{ text: ["base", rt, br] }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [
        {
          font: [
            "thin",
            "extralight",
            "light",
            "normal",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
            Ut,
          ],
        },
      ],
      "font-family": [{ font: [At] }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [
        {
          tracking: [
            "tighter",
            "tight",
            "normal",
            "wide",
            "wider",
            "widest",
            ne,
          ],
        },
      ],
      "line-clamp": [{ "line-clamp": ["none", ut, Ut] }],
      leading: [
        {
          leading: [
            "none",
            "tight",
            "snug",
            "normal",
            "relaxed",
            "loose",
            ne,
            Be,
          ],
        },
      ],
      "list-image": [{ "list-image": ["none", ne] }],
      "list-style-type": [{ list: ["none", "disc", "decimal", ne] }],
      "list-style-position": [{ list: ["inside", "outside"] }],
      "placeholder-color": [{ placeholder: [t] }],
      "placeholder-opacity": [{ "placeholder-opacity": [m] }],
      "text-alignment": [
        { text: ["left", "center", "right", "justify", "start", "end"] },
      ],
      "text-color": [{ text: [t] }],
      "text-opacity": [{ "text-opacity": [m] }],
      "text-decoration": [
        "underline",
        "overline",
        "line-through",
        "no-underline",
      ],
      "text-decoration-style": [{ decoration: [].concat(G(), ["wavy"]) }],
      "text-decoration-thickness": [{ decoration: ["auto", "from-font", Be] }],
      "underline-offset": [{ "underline-offset": ["auto", ne, Be] }],
      "text-decoration-color": [{ decoration: [t] }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      indent: [{ indent: I() }],
      "vertical-align": [
        {
          align: [
            "baseline",
            "top",
            "middle",
            "bottom",
            "text-top",
            "text-bottom",
            "sub",
            "super",
            ne,
          ],
        },
      ],
      whitespace: [
        {
          whitespace: [
            "normal",
            "nowrap",
            "pre",
            "pre-line",
            "pre-wrap",
            "break-spaces",
          ],
        },
      ],
      break: [{ break: ["normal", "words", "all", "keep"] }],
      hyphens: [{ hyphens: ["none", "manual", "auto"] }],
      content: [{ content: ["none", ne] }],
      "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
      "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
      "bg-opacity": [{ "bg-opacity": [m] }],
      "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
      "bg-position": [{ bg: [].concat(V(), [gs]) }],
      "bg-repeat": [
        { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
      ],
      "bg-size": [{ bg: ["auto", "cover", "contain", ps] }],
      "bg-image": [
        {
          bg: [
            "none",
            { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
            bs,
          ],
        },
      ],
      "bg-color": [{ bg: [t] }],
      "gradient-from-pos": [{ from: [T] }],
      "gradient-via-pos": [{ via: [T] }],
      "gradient-to-pos": [{ to: [T] }],
      "gradient-from": [{ from: [k] }],
      "gradient-via": [{ via: [k] }],
      "gradient-to": [{ to: [k] }],
      rounded: [{ rounded: [a] }],
      "rounded-s": [{ "rounded-s": [a] }],
      "rounded-e": [{ "rounded-e": [a] }],
      "rounded-t": [{ "rounded-t": [a] }],
      "rounded-r": [{ "rounded-r": [a] }],
      "rounded-b": [{ "rounded-b": [a] }],
      "rounded-l": [{ "rounded-l": [a] }],
      "rounded-ss": [{ "rounded-ss": [a] }],
      "rounded-se": [{ "rounded-se": [a] }],
      "rounded-ee": [{ "rounded-ee": [a] }],
      "rounded-es": [{ "rounded-es": [a] }],
      "rounded-tl": [{ "rounded-tl": [a] }],
      "rounded-tr": [{ "rounded-tr": [a] }],
      "rounded-br": [{ "rounded-br": [a] }],
      "rounded-bl": [{ "rounded-bl": [a] }],
      "border-w": [{ border: [l] }],
      "border-w-x": [{ "border-x": [l] }],
      "border-w-y": [{ "border-y": [l] }],
      "border-w-s": [{ "border-s": [l] }],
      "border-w-e": [{ "border-e": [l] }],
      "border-w-t": [{ "border-t": [l] }],
      "border-w-r": [{ "border-r": [l] }],
      "border-w-b": [{ "border-b": [l] }],
      "border-w-l": [{ "border-l": [l] }],
      "border-opacity": [{ "border-opacity": [m] }],
      "border-style": [{ border: [].concat(G(), ["hidden"]) }],
      "divide-x": [{ "divide-x": [l] }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{ "divide-y": [l] }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{ "divide-opacity": [m] }],
      "divide-style": [{ divide: G() }],
      "border-color": [{ border: [s] }],
      "border-color-x": [{ "border-x": [s] }],
      "border-color-y": [{ "border-y": [s] }],
      "border-color-t": [{ "border-t": [s] }],
      "border-color-r": [{ "border-r": [s] }],
      "border-color-b": [{ "border-b": [s] }],
      "border-color-l": [{ "border-l": [s] }],
      "divide-color": [{ divide: [s] }],
      "outline-style": [{ outline: [""].concat(G()) }],
      "outline-offset": [{ "outline-offset": [ne, Be] }],
      "outline-w": [{ outline: [Be] }],
      "outline-color": [{ outline: [t] }],
      "ring-w": [{ ring: W() }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{ ring: [t] }],
      "ring-opacity": [{ "ring-opacity": [m] }],
      "ring-offset-w": [{ "ring-offset": [Be] }],
      "ring-offset-color": [{ "ring-offset": [t] }],
      shadow: [{ shadow: ["", "inner", "none", rt, ys] }],
      "shadow-color": [{ shadow: [At] }],
      opacity: [{ opacity: [m] }],
      "mix-blend": [{ "mix-blend": Y() }],
      "bg-blend": [{ "bg-blend": Y() }],
      filter: [{ filter: ["", "none"] }],
      blur: [{ blur: [r] }],
      brightness: [{ brightness: [n] }],
      contrast: [{ contrast: [c] }],
      "drop-shadow": [{ "drop-shadow": ["", "none", rt, ne] }],
      grayscale: [{ grayscale: [d] }],
      "hue-rotate": [{ "hue-rotate": [h] }],
      invert: [{ invert: [y] }],
      saturate: [{ saturate: [B] }],
      sepia: [{ sepia: [L] }],
      "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
      "backdrop-blur": [{ "backdrop-blur": [r] }],
      "backdrop-brightness": [{ "backdrop-brightness": [n] }],
      "backdrop-contrast": [{ "backdrop-contrast": [c] }],
      "backdrop-grayscale": [{ "backdrop-grayscale": [d] }],
      "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [h] }],
      "backdrop-invert": [{ "backdrop-invert": [y] }],
      "backdrop-opacity": [{ "backdrop-opacity": [m] }],
      "backdrop-saturate": [{ "backdrop-saturate": [B] }],
      "backdrop-sepia": [{ "backdrop-sepia": [L] }],
      "border-collapse": [{ border: ["collapse", "separate"] }],
      "border-spacing": [{ "border-spacing": [u] }],
      "border-spacing-x": [{ "border-spacing-x": [u] }],
      "border-spacing-y": [{ "border-spacing-y": [u] }],
      "table-layout": [{ table: ["auto", "fixed"] }],
      caption: [{ caption: ["top", "bottom"] }],
      transition: [
        {
          transition: [
            "none",
            "all",
            "",
            "colors",
            "opacity",
            "shadow",
            "transform",
            ne,
          ],
        },
      ],
      duration: [{ duration: Z() }],
      ease: [{ ease: ["linear", "in", "out", "in-out", ne] }],
      delay: [{ delay: Z() }],
      animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", ne] }],
      transform: [{ transform: ["", "gpu", "none"] }],
      scale: [{ scale: [O] }],
      "scale-x": [{ "scale-x": [O] }],
      "scale-y": [{ "scale-y": [O] }],
      rotate: [{ rotate: [St, ne] }],
      "translate-x": [{ "translate-x": [q] }],
      "translate-y": [{ "translate-y": [q] }],
      "skew-x": [{ "skew-x": [F] }],
      "skew-y": [{ "skew-y": [F] }],
      "transform-origin": [
        {
          origin: [
            "center",
            "top",
            "top-right",
            "right",
            "bottom-right",
            "bottom",
            "bottom-left",
            "left",
            "top-left",
            ne,
          ],
        },
      ],
      accent: [{ accent: ["auto", t] }],
      appearance: ["appearance-none"],
      cursor: [
        {
          cursor: [
            "auto",
            "default",
            "pointer",
            "wait",
            "text",
            "move",
            "help",
            "not-allowed",
            "none",
            "context-menu",
            "progress",
            "cell",
            "crosshair",
            "vertical-text",
            "alias",
            "copy",
            "no-drop",
            "grab",
            "grabbing",
            "all-scroll",
            "col-resize",
            "row-resize",
            "n-resize",
            "e-resize",
            "s-resize",
            "w-resize",
            "ne-resize",
            "nw-resize",
            "se-resize",
            "sw-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "zoom-in",
            "zoom-out",
            ne,
          ],
        },
      ],
      "caret-color": [{ caret: [t] }],
      "pointer-events": [{ "pointer-events": ["none", "auto"] }],
      resize: [{ resize: ["none", "y", "x", ""] }],
      "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
      "scroll-m": [{ "scroll-m": I() }],
      "scroll-mx": [{ "scroll-mx": I() }],
      "scroll-my": [{ "scroll-my": I() }],
      "scroll-ms": [{ "scroll-ms": I() }],
      "scroll-me": [{ "scroll-me": I() }],
      "scroll-mt": [{ "scroll-mt": I() }],
      "scroll-mr": [{ "scroll-mr": I() }],
      "scroll-mb": [{ "scroll-mb": I() }],
      "scroll-ml": [{ "scroll-ml": I() }],
      "scroll-p": [{ "scroll-p": I() }],
      "scroll-px": [{ "scroll-px": I() }],
      "scroll-py": [{ "scroll-py": I() }],
      "scroll-ps": [{ "scroll-ps": I() }],
      "scroll-pe": [{ "scroll-pe": I() }],
      "scroll-pt": [{ "scroll-pt": I() }],
      "scroll-pr": [{ "scroll-pr": I() }],
      "scroll-pb": [{ "scroll-pb": I() }],
      "scroll-pl": [{ "scroll-pl": I() }],
      "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
      "snap-stop": [{ snap: ["normal", "always"] }],
      "snap-type": [{ snap: ["none", "x", "y", "both"] }],
      "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
      touch: [
        {
          touch: [
            "auto",
            "none",
            "pinch-zoom",
            "manipulation",
            { pan: ["x", "left", "right", "y", "up", "down"] },
          ],
        },
      ],
      select: [{ select: ["none", "text", "all", "auto"] }],
      "will-change": [
        { "will-change": ["auto", "scroll", "contents", "transform", ne] },
      ],
      fill: [{ fill: [t, "none"] }],
      "stroke-w": [{ stroke: [Be, Ut] }],
      stroke: [{ stroke: [t, "none"] }],
      sr: ["sr-only", "not-sr-only"],
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: [
        "inset-x",
        "inset-y",
        "start",
        "end",
        "top",
        "right",
        "bottom",
        "left",
      ],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": [
        "fvn-ordinal",
        "fvn-slashed-zero",
        "fvn-figure",
        "fvn-spacing",
        "fvn-fraction",
      ],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: [
        "rounded-s",
        "rounded-e",
        "rounded-t",
        "rounded-r",
        "rounded-b",
        "rounded-l",
        "rounded-ss",
        "rounded-se",
        "rounded-ee",
        "rounded-es",
        "rounded-tl",
        "rounded-tr",
        "rounded-br",
        "rounded-bl",
      ],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": [
        "border-w-s",
        "border-w-e",
        "border-w-t",
        "border-w-r",
        "border-w-b",
        "border-w-l",
      ],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": [
        "border-color-t",
        "border-color-r",
        "border-color-b",
        "border-color-l",
      ],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": [
        "scroll-mx",
        "scroll-my",
        "scroll-ms",
        "scroll-me",
        "scroll-mt",
        "scroll-mr",
        "scroll-mb",
        "scroll-ml",
      ],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": [
        "scroll-px",
        "scroll-py",
        "scroll-ps",
        "scroll-pe",
        "scroll-pt",
        "scroll-pr",
        "scroll-pb",
        "scroll-pl",
      ],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
    },
    conflictingClassGroupModifiers: { "font-size": ["leading"] },
  };
}
function Es(t, e) {
  for (var r in e) Gn(t, r, e[r]);
  return t;
}
var Cs = Object.prototype.hasOwnProperty,
  Rs = new Set(["string", "number", "boolean"]);
function Gn(t, e, r) {
  if (!Cs.call(t, e) || Rs.has(typeof r) || r === null) {
    t[e] = r;
    return;
  }
  if (Array.isArray(r) && Array.isArray(t[e])) {
    t[e] = t[e].concat(r);
    return;
  }
  if (typeof r == "object" && typeof t[e] == "object") {
    if (t[e] === null) {
      t[e] = r;
      return;
    }
    for (var n in r) Gn(t[e], n, r[n]);
  }
}
function Ss(t) {
  for (
    var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), n = 1;
    n < e;
    n++
  )
    r[n - 1] = arguments[n];
  return typeof t == "function"
    ? gr.apply(void 0, [mr, t].concat(r))
    : gr.apply(
        void 0,
        [
          function () {
            return Es(mr(), t);
          },
        ].concat(r),
      );
}
var As = gr(mr),
  xs = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 },
  Hn = (t) => t || void 0,
  Mt = (...t) => Hn(Pn(t).filter(Boolean).join(" ")),
  Zt = null,
  qt = {},
  yr = !1,
  xt =
    (...t) =>
    (e) =>
      e.twMerge
        ? ((!Zt || yr) && ((yr = !1), (Zt = Se(qt) ? As : Ss(qt))),
          Hn(Zt(Mt(t))))
        : Mt(t),
  $r = (t, e) => {
    for (let r in e)
      t.hasOwnProperty(r) ? (t[r] = Mt(t[r], e[r])) : (t[r] = e[r]);
    return t;
  },
  Ts = (t, e) => {
    let {
        extend: r = null,
        slots: n = {},
        variants: s = {},
        compoundVariants: a = [],
        compoundSlots: u = [],
        defaultVariants: l = {},
      } = t,
      c = { ...xs, ...e },
      d =
        r != null && r.base
          ? Mt(r.base, t == null ? void 0 : t.base)
          : t == null
            ? void 0
            : t.base,
      h = r != null && r.variants && !Se(r.variants) ? Dn(s, r.variants) : s,
      y =
        r != null && r.defaultVariants && !Se(r.defaultVariants)
          ? { ...r.defaultVariants, ...l }
          : l;
    !Se(c.twMergeConfig) &&
      !Xo(c.twMergeConfig, qt) &&
      ((yr = !0), (qt = c.twMergeConfig));
    let S = Se(r == null ? void 0 : r.slots),
      k = Se(n)
        ? {}
        : {
            base: Mt(
              t == null ? void 0 : t.base,
              S && (r == null ? void 0 : r.base),
            ),
            ...n,
          },
      T = S
        ? k
        : $r(
            { ...(r == null ? void 0 : r.slots) },
            Se(k) ? { base: t == null ? void 0 : t.base } : k,
          ),
      C = (m) => {
        if (Se(h) && Se(n) && S)
          return xt(
            d,
            m == null ? void 0 : m.class,
            m == null ? void 0 : m.className,
          )(c);
        if (a && !Array.isArray(a))
          throw new TypeError(
            `The "compoundVariants" prop must be an array. Received: ${typeof a}`,
          );
        if (u && !Array.isArray(u))
          throw new TypeError(
            `The "compoundSlots" prop must be an array. Received: ${typeof u}`,
          );
        let v = (I, W, U = [], V) => {
            let G = U;
            if (typeof W == "string")
              G = G.concat(
                Kr(W)
                  .split(" ")
                  .map((Y) => `${I}:${Y}`),
              );
            else if (Array.isArray(W))
              G = G.concat(W.reduce((Y, te) => Y.concat(`${I}:${te}`), []));
            else if (typeof W == "object" && typeof V == "string") {
              for (let Y in W)
                if (W.hasOwnProperty(Y) && Y === V) {
                  let te = W[Y];
                  if (te && typeof te == "string") {
                    let X = Kr(te);
                    G[V]
                      ? (G[V] = G[V].concat(
                          X.split(" ").map((le) => `${I}:${le}`),
                        ))
                      : (G[V] = X.split(" ").map((le) => `${I}:${le}`));
                  } else
                    Array.isArray(te) &&
                      te.length > 0 &&
                      (G[V] = te.reduce((X, le) => X.concat(`${I}:${le}`), []));
                }
            }
            return G;
          },
          B = (I, W = h, U = null, V = null) => {
            var G;
            let Y = W[I];
            if (!Y || Se(Y)) return null;
            let te =
              (G = V == null ? void 0 : V[I]) != null
                ? G
                : m == null
                  ? void 0
                  : m[I];
            if (te === null) return null;
            let X = Jr(te),
              le =
                (Array.isArray(c.responsiveVariants) &&
                  c.responsiveVariants.length > 0) ||
                c.responsiveVariants === !0,
              K = y == null ? void 0 : y[I],
              Z = [];
            if (typeof X == "object" && le)
              for (let [Fe, Je] of Object.entries(X)) {
                let R = Y[Je];
                if (Fe === "initial") {
                  K = Je;
                  continue;
                }
                (Array.isArray(c.responsiveVariants) &&
                  !c.responsiveVariants.includes(Fe)) ||
                  (Z = v(Fe, R, Z, U));
              }
            let ue = Y[X] || Y[Jr(K)];
            return typeof Z == "object" && typeof U == "string" && Z[U]
              ? $r(Z, ue)
              : Z.length > 0
                ? (Z.push(ue), Z)
                : ue;
          },
          O = () => (h ? Object.keys(h).map((I) => B(I, h)) : null),
          L = (I, W) => {
            if (!h || typeof h != "object") return null;
            let U = new Array();
            for (let V in h) {
              let G = B(V, h, I, W),
                Y = I === "base" && typeof G == "string" ? G : G && G[I];
              Y && (U[U.length] = Y);
            }
            return U;
          },
          F = {};
        for (let I in m) m[I] !== void 0 && (F[I] = m[I]);
        let j = (I, W) => {
            var U;
            let V =
              typeof (m == null ? void 0 : m[I]) == "object"
                ? { [I]: (U = m[I]) == null ? void 0 : U.initial }
                : {};
            return { ...y, ...F, ...V, ...W };
          },
          q = (I = [], W) => {
            let U = [];
            for (let { class: V, className: G, ...Y } of I) {
              let te = !0;
              for (let [X, le] of Object.entries(Y)) {
                let K = j(X, W);
                if (Array.isArray(le)) {
                  if (!le.includes(K[X])) {
                    te = !1;
                    break;
                  }
                } else if (K[X] !== le) {
                  te = !1;
                  break;
                }
              }
              te && (V && U.push(V), G && U.push(G));
            }
            return U;
          },
          N = (I) => {
            let W = q(a, I),
              U = q(r == null ? void 0 : r.compoundVariants, I);
            return Ln(U, W);
          },
          H = (I) => {
            let W = N(I);
            if (!Array.isArray(W)) return W;
            let U = {};
            for (let V of W)
              if (
                (typeof V == "string" && (U.base = xt(U.base, V)(c)),
                typeof V == "object")
              )
                for (let [G, Y] of Object.entries(V)) U[G] = xt(U[G], Y)(c);
            return U;
          },
          re = (I) => {
            if (u.length < 1) return null;
            let W = {};
            for (let { slots: U = [], class: V, className: G, ...Y } of u) {
              if (!Se(Y)) {
                let te = !0;
                for (let X of Object.keys(Y)) {
                  let le = j(X, I)[X];
                  if (
                    le === void 0 ||
                    (Array.isArray(Y[X]) ? !Y[X].includes(le) : Y[X] !== le)
                  ) {
                    te = !1;
                    break;
                  }
                }
                if (!te) continue;
              }
              for (let te of U) (W[te] = W[te] || []), W[te].push([V, G]);
            }
            return W;
          };
        if (!Se(n) || !S) {
          let I = {};
          if (typeof T == "object" && !Se(T))
            for (let W of Object.keys(T))
              I[W] = (U) => {
                var V, G;
                return xt(
                  T[W],
                  L(W, U),
                  ((V = H(U)) != null ? V : [])[W],
                  ((G = re(U)) != null ? G : [])[W],
                  U == null ? void 0 : U.class,
                  U == null ? void 0 : U.className,
                )(c);
              };
          return I;
        }
        return xt(
          d,
          O(),
          N(),
          m == null ? void 0 : m.class,
          m == null ? void 0 : m.className,
        )(c);
      },
      A = () => {
        if (!(!h || typeof h != "object")) return Object.keys(h);
      };
    return (
      (C.variantKeys = A()),
      (C.extend = r),
      (C.base = d),
      (C.slots = T),
      (C.variants = h),
      (C.defaultVariants = y),
      (C.compoundSlots = u),
      (C.compoundVariants = a),
      C
    );
  };
const en = Ts({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});
function ks(t) {
  let e,
    r,
    n,
    s,
    a = [
      {
        class: (r = je(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          t[1],
        )),
      },
      t[2],
    ],
    u = {};
  for (let l = 0; l < a.length; l += 1) u = fe(u, a[l]);
  return {
    c() {
      (e = Ae("input")), this.h();
    },
    l(l) {
      (e = xe(l, "INPUT", { class: !0 })), this.h();
    },
    h() {
      nt(e, u);
    },
    m(l, c) {
      Ee(l, e, c),
        e.autofocus && e.focus(),
        Or(e, t[0]),
        n ||
          ((s = [
            he(e, "input", t[17]),
            he(e, "blur", t[3]),
            he(e, "change", t[4]),
            he(e, "click", t[5]),
            he(e, "focus", t[6]),
            he(e, "focusin", t[7]),
            he(e, "focusout", t[8]),
            he(e, "keydown", t[9]),
            he(e, "keypress", t[10]),
            he(e, "keyup", t[11]),
            he(e, "mouseover", t[12]),
            he(e, "mouseenter", t[13]),
            he(e, "mouseleave", t[14]),
            he(e, "paste", t[15]),
            he(e, "input", t[16]),
          ]),
          (n = !0));
    },
    p(l, [c]) {
      nt(
        e,
        (u = Ye(a, [
          c & 2 &&
            r !==
              (r = je(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                l[1],
              )) && { class: r },
          c & 4 && l[2],
        ])),
      ),
        c & 1 && e.value !== l[0] && Or(e, l[0]);
    },
    i: Tt,
    o: Tt,
    d(l) {
      l && pe(e), (n = !1), xr(s);
    },
  };
}
function Is(t, e, r) {
  const n = ["class", "value"];
  let s = ve(e, n),
    { class: a = void 0 } = e,
    { value: u = void 0 } = e;
  function l(F) {
    ce.call(this, t, F);
  }
  function c(F) {
    ce.call(this, t, F);
  }
  function d(F) {
    ce.call(this, t, F);
  }
  function h(F) {
    ce.call(this, t, F);
  }
  function y(F) {
    ce.call(this, t, F);
  }
  function S(F) {
    ce.call(this, t, F);
  }
  function k(F) {
    ce.call(this, t, F);
  }
  function T(F) {
    ce.call(this, t, F);
  }
  function C(F) {
    ce.call(this, t, F);
  }
  function A(F) {
    ce.call(this, t, F);
  }
  function m(F) {
    ce.call(this, t, F);
  }
  function v(F) {
    ce.call(this, t, F);
  }
  function B(F) {
    ce.call(this, t, F);
  }
  function O(F) {
    ce.call(this, t, F);
  }
  function L() {
    (u = this.value), r(0, u);
  }
  return (
    (t.$$set = (F) => {
      (e = fe(fe({}, e), Qe(F))),
        r(2, (s = ve(e, n))),
        "class" in F && r(1, (a = F.class)),
        "value" in F && r(0, (u = F.value));
    }),
    [u, a, s, l, c, d, h, y, S, k, T, C, A, m, v, B, O, L]
  );
}
class Ms extends He {
  constructor(e) {
    super(), Ve(this, e, Is, ks, Me, { class: 1, value: 0 });
  }
}
const Vn = Tr(void 0);
function Ns(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
function Bs(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return (
    Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.keys(t).forEach(function (n) {
      var s = Object.getOwnPropertyDescriptor(t, n);
      Object.defineProperty(
        r,
        n,
        s.get
          ? s
          : {
              enumerable: !0,
              get: function () {
                return t[n];
              },
            },
      );
    }),
    r
  );
}
var _r = { exports: {} },
  Qt,
  tn;
function Fs() {
  if (tn) return Qt;
  tn = 1;
  var t = 1e3,
    e = t * 60,
    r = e * 60,
    n = r * 24,
    s = n * 7,
    a = n * 365.25;
  Qt = function (h, y) {
    y = y || {};
    var S = typeof h;
    if (S === "string" && h.length > 0) return u(h);
    if (S === "number" && isFinite(h)) return y.long ? c(h) : l(h);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" +
        JSON.stringify(h),
    );
  };
  function u(h) {
    if (((h = String(h)), !(h.length > 100))) {
      var y =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          h,
        );
      if (y) {
        var S = parseFloat(y[1]),
          k = (y[2] || "ms").toLowerCase();
        switch (k) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return S * a;
          case "weeks":
          case "week":
          case "w":
            return S * s;
          case "days":
          case "day":
          case "d":
            return S * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return S * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return S * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return S * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return S;
          default:
            return;
        }
      }
    }
  }
  function l(h) {
    var y = Math.abs(h);
    return y >= n
      ? Math.round(h / n) + "d"
      : y >= r
        ? Math.round(h / r) + "h"
        : y >= e
          ? Math.round(h / e) + "m"
          : y >= t
            ? Math.round(h / t) + "s"
            : h + "ms";
  }
  function c(h) {
    var y = Math.abs(h);
    return y >= n
      ? d(h, y, n, "day")
      : y >= r
        ? d(h, y, r, "hour")
        : y >= e
          ? d(h, y, e, "minute")
          : y >= t
            ? d(h, y, t, "second")
            : h + " ms";
  }
  function d(h, y, S, k) {
    var T = y >= S * 1.5;
    return Math.round(h / S) + " " + k + (T ? "s" : "");
  }
  return Qt;
}
function Os(t) {
  (r.debug = r),
    (r.default = r),
    (r.coerce = c),
    (r.disable = a),
    (r.enable = s),
    (r.enabled = u),
    (r.humanize = Fs()),
    (r.destroy = d),
    Object.keys(t).forEach((h) => {
      r[h] = t[h];
    }),
    (r.names = []),
    (r.skips = []),
    (r.formatters = {});
  function e(h) {
    let y = 0;
    for (let S = 0; S < h.length; S++)
      (y = (y << 5) - y + h.charCodeAt(S)), (y |= 0);
    return r.colors[Math.abs(y) % r.colors.length];
  }
  r.selectColor = e;
  function r(h) {
    let y,
      S = null,
      k,
      T;
    function C(...A) {
      if (!C.enabled) return;
      const m = C,
        v = Number(new Date()),
        B = v - (y || v);
      (m.diff = B),
        (m.prev = y),
        (m.curr = v),
        (y = v),
        (A[0] = r.coerce(A[0])),
        typeof A[0] != "string" && A.unshift("%O");
      let O = 0;
      (A[0] = A[0].replace(/%([a-zA-Z%])/g, (F, j) => {
        if (F === "%%") return "%";
        O++;
        const q = r.formatters[j];
        if (typeof q == "function") {
          const N = A[O];
          (F = q.call(m, N)), A.splice(O, 1), O--;
        }
        return F;
      })),
        r.formatArgs.call(m, A),
        (m.log || r.log).apply(m, A);
    }
    return (
      (C.namespace = h),
      (C.useColors = r.useColors()),
      (C.color = r.selectColor(h)),
      (C.extend = n),
      (C.destroy = r.destroy),
      Object.defineProperty(C, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () =>
          S !== null
            ? S
            : (k !== r.namespaces && ((k = r.namespaces), (T = r.enabled(h))),
              T),
        set: (A) => {
          S = A;
        },
      }),
      typeof r.init == "function" && r.init(C),
      C
    );
  }
  function n(h, y) {
    const S = r(this.namespace + (typeof y > "u" ? ":" : y) + h);
    return (S.log = this.log), S;
  }
  function s(h) {
    r.save(h), (r.namespaces = h), (r.names = []), (r.skips = []);
    let y;
    const S = (typeof h == "string" ? h : "").split(/[\s,]+/),
      k = S.length;
    for (y = 0; y < k; y++)
      S[y] &&
        ((h = S[y].replace(/\*/g, ".*?")),
        h[0] === "-"
          ? r.skips.push(new RegExp("^" + h.slice(1) + "$"))
          : r.names.push(new RegExp("^" + h + "$")));
  }
  function a() {
    const h = [...r.names.map(l), ...r.skips.map(l).map((y) => "-" + y)].join(
      ",",
    );
    return r.enable(""), h;
  }
  function u(h) {
    if (h[h.length - 1] === "*") return !0;
    let y, S;
    for (y = 0, S = r.skips.length; y < S; y++)
      if (r.skips[y].test(h)) return !1;
    for (y = 0, S = r.names.length; y < S; y++)
      if (r.names[y].test(h)) return !0;
    return !1;
  }
  function l(h) {
    return h
      .toString()
      .substring(2, h.toString().length - 2)
      .replace(/\.\*\?$/, "*");
  }
  function c(h) {
    return h instanceof Error ? h.stack || h.message : h;
  }
  function d() {
    console.warn(
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
    );
  }
  return r.enable(r.load()), r;
}
var Ps = Os;
(function (t, e) {
  var r = {};
  (e.formatArgs = s),
    (e.save = a),
    (e.load = u),
    (e.useColors = n),
    (e.storage = l()),
    (e.destroy = (() => {
      let d = !1;
      return () => {
        d ||
          ((d = !0),
          console.warn(
            "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
          ));
      };
    })()),
    (e.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33",
    ]);
  function n() {
    return typeof window < "u" &&
      window.process &&
      (window.process.type === "renderer" || window.process.__nwjs)
      ? !0
      : typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
        ? !1
        : (typeof document < "u" &&
            document.documentElement &&
            document.documentElement.style &&
            document.documentElement.style.WebkitAppearance) ||
          (typeof window < "u" &&
            window.console &&
            (window.console.firebug ||
              (window.console.exception && window.console.table))) ||
          (typeof navigator < "u" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
            parseInt(RegExp.$1, 10) >= 31) ||
          (typeof navigator < "u" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function s(d) {
    if (
      ((d[0] =
        (this.useColors ? "%c" : "") +
        this.namespace +
        (this.useColors ? " %c" : " ") +
        d[0] +
        (this.useColors ? "%c " : " ") +
        "+" +
        t.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    const h = "color: " + this.color;
    d.splice(1, 0, h, "color: inherit");
    let y = 0,
      S = 0;
    d[0].replace(/%[a-zA-Z%]/g, (k) => {
      k !== "%%" && (y++, k === "%c" && (S = y));
    }),
      d.splice(S, 0, h);
  }
  e.log = console.debug || console.log || (() => {});
  function a(d) {
    try {
      d ? e.storage.setItem("debug", d) : e.storage.removeItem("debug");
    } catch {}
  }
  function u() {
    let d;
    try {
      d = e.storage.getItem("debug");
    } catch {}
    return !d && typeof process < "u" && "env" in process && (d = r.DEBUG), d;
  }
  function l() {
    try {
      return localStorage;
    } catch {}
  }
  t.exports = Ps(e);
  const { formatters: c } = t.exports;
  c.j = function (d) {
    try {
      return JSON.stringify(d);
    } catch (h) {
      return "[UnexpectedJSONParseError]: " + h.message;
    }
  };
})(_r, _r.exports);
var Ls = _r.exports,
  Ds = function () {
    if (typeof globalThis > "u") return null;
    var e = {
      RTCPeerConnection:
        globalThis.RTCPeerConnection ||
        globalThis.mozRTCPeerConnection ||
        globalThis.webkitRTCPeerConnection,
      RTCSessionDescription:
        globalThis.RTCSessionDescription ||
        globalThis.mozRTCSessionDescription ||
        globalThis.webkitRTCSessionDescription,
      RTCIceCandidate:
        globalThis.RTCIceCandidate ||
        globalThis.mozRTCIceCandidate ||
        globalThis.webkitRTCIceCandidate,
    };
    return e.RTCPeerConnection ? e : null;
  },
  wr = { exports: {} },
  vr = { exports: {} },
  wt = {},
  Vt = {};
Vt.byteLength = Ws;
Vt.toByteArray = zs;
Vt.fromByteArray = Vs;
var Oe = [],
  ke = [],
  Us = typeof Uint8Array < "u" ? Uint8Array : Array,
  $t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var mt = 0, js = $t.length; mt < js; ++mt)
  (Oe[mt] = $t[mt]), (ke[$t.charCodeAt(mt)] = mt);
ke[45] = 62;
ke[95] = 63;
function Yn(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  r === -1 && (r = e);
  var n = r === e ? 0 : 4 - (r % 4);
  return [r, n];
}
function Ws(t) {
  var e = Yn(t),
    r = e[0],
    n = e[1];
  return ((r + n) * 3) / 4 - n;
}
function qs(t, e, r) {
  return ((e + r) * 3) / 4 - r;
}
function zs(t) {
  var e,
    r = Yn(t),
    n = r[0],
    s = r[1],
    a = new Us(qs(t, n, s)),
    u = 0,
    l = s > 0 ? n - 4 : n,
    c;
  for (c = 0; c < l; c += 4)
    (e =
      (ke[t.charCodeAt(c)] << 18) |
      (ke[t.charCodeAt(c + 1)] << 12) |
      (ke[t.charCodeAt(c + 2)] << 6) |
      ke[t.charCodeAt(c + 3)]),
      (a[u++] = (e >> 16) & 255),
      (a[u++] = (e >> 8) & 255),
      (a[u++] = e & 255);
  return (
    s === 2 &&
      ((e = (ke[t.charCodeAt(c)] << 2) | (ke[t.charCodeAt(c + 1)] >> 4)),
      (a[u++] = e & 255)),
    s === 1 &&
      ((e =
        (ke[t.charCodeAt(c)] << 10) |
        (ke[t.charCodeAt(c + 1)] << 4) |
        (ke[t.charCodeAt(c + 2)] >> 2)),
      (a[u++] = (e >> 8) & 255),
      (a[u++] = e & 255)),
    a
  );
}
function Gs(t) {
  return (
    Oe[(t >> 18) & 63] + Oe[(t >> 12) & 63] + Oe[(t >> 6) & 63] + Oe[t & 63]
  );
}
function Hs(t, e, r) {
  for (var n, s = [], a = e; a < r; a += 3)
    (n =
      ((t[a] << 16) & 16711680) + ((t[a + 1] << 8) & 65280) + (t[a + 2] & 255)),
      s.push(Gs(n));
  return s.join("");
}
function Vs(t) {
  for (
    var e, r = t.length, n = r % 3, s = [], a = 16383, u = 0, l = r - n;
    u < l;
    u += a
  )
    s.push(Hs(t, u, u + a > l ? l : u + a));
  return (
    n === 1
      ? ((e = t[r - 1]), s.push(Oe[e >> 2] + Oe[(e << 4) & 63] + "=="))
      : n === 2 &&
        ((e = (t[r - 2] << 8) + t[r - 1]),
        s.push(Oe[e >> 10] + Oe[(e >> 4) & 63] + Oe[(e << 2) & 63] + "=")),
    s.join("")
  );
}
var Nr = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ Nr.read =
  function (t, e, r, n, s) {
    var a,
      u,
      l = s * 8 - n - 1,
      c = (1 << l) - 1,
      d = c >> 1,
      h = -7,
      y = r ? s - 1 : 0,
      S = r ? -1 : 1,
      k = t[e + y];
    for (
      y += S, a = k & ((1 << -h) - 1), k >>= -h, h += l;
      h > 0;
      a = a * 256 + t[e + y], y += S, h -= 8
    );
    for (
      u = a & ((1 << -h) - 1), a >>= -h, h += n;
      h > 0;
      u = u * 256 + t[e + y], y += S, h -= 8
    );
    if (a === 0) a = 1 - d;
    else {
      if (a === c) return u ? NaN : (k ? -1 : 1) * (1 / 0);
      (u = u + Math.pow(2, n)), (a = a - d);
    }
    return (k ? -1 : 1) * u * Math.pow(2, a - n);
  };
Nr.write = function (t, e, r, n, s, a) {
  var u,
    l,
    c,
    d = a * 8 - s - 1,
    h = (1 << d) - 1,
    y = h >> 1,
    S = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    k = n ? 0 : a - 1,
    T = n ? 1 : -1,
    C = e < 0 || (e === 0 && 1 / e < 0) ? 1 : 0;
  for (
    e = Math.abs(e),
      isNaN(e) || e === 1 / 0
        ? ((l = isNaN(e) ? 1 : 0), (u = h))
        : ((u = Math.floor(Math.log(e) / Math.LN2)),
          e * (c = Math.pow(2, -u)) < 1 && (u--, (c *= 2)),
          u + y >= 1 ? (e += S / c) : (e += S * Math.pow(2, 1 - y)),
          e * c >= 2 && (u++, (c /= 2)),
          u + y >= h
            ? ((l = 0), (u = h))
            : u + y >= 1
              ? ((l = (e * c - 1) * Math.pow(2, s)), (u = u + y))
              : ((l = e * Math.pow(2, y - 1) * Math.pow(2, s)), (u = 0)));
    s >= 8;
    t[r + k] = l & 255, k += T, l /= 256, s -= 8
  );
  for (
    u = (u << s) | l, d += s;
    d > 0;
    t[r + k] = u & 255, k += T, u /= 256, d -= 8
  );
  t[r + k - T] |= C * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (t) {
  const e = Vt,
    r = Nr,
    n =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (t.Buffer = l), (t.SlowBuffer = v), (t.INSPECT_MAX_BYTES = 50);
  const s = 2147483647;
  (t.kMaxLength = s),
    (l.TYPED_ARRAY_SUPPORT = a()),
    !l.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
  function a() {
    try {
      const f = new Uint8Array(1),
        i = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(i, Uint8Array.prototype),
        Object.setPrototypeOf(f, i),
        f.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(l.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (l.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(l.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (l.isBuffer(this)) return this.byteOffset;
      },
    });
  function u(f) {
    if (f > s)
      throw new RangeError(
        'The value "' + f + '" is invalid for option "size"',
      );
    const i = new Uint8Array(f);
    return Object.setPrototypeOf(i, l.prototype), i;
  }
  function l(f, i, o) {
    if (typeof f == "number") {
      if (typeof i == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return y(f);
    }
    return c(f, i, o);
  }
  l.poolSize = 8192;
  function c(f, i, o) {
    if (typeof f == "string") return S(f, i);
    if (ArrayBuffer.isView(f)) return T(f);
    if (f == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof f,
      );
    if (
      Re(f, ArrayBuffer) ||
      (f && Re(f.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (Re(f, SharedArrayBuffer) || (f && Re(f.buffer, SharedArrayBuffer))))
    )
      return C(f, i, o);
    if (typeof f == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    const p = f.valueOf && f.valueOf();
    if (p != null && p !== f) return l.from(p, i, o);
    const _ = A(f);
    if (_) return _;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof f[Symbol.toPrimitive] == "function"
    )
      return l.from(f[Symbol.toPrimitive]("string"), i, o);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof f,
    );
  }
  (l.from = function (f, i, o) {
    return c(f, i, o);
  }),
    Object.setPrototypeOf(l.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(l, Uint8Array);
  function d(f) {
    if (typeof f != "number")
      throw new TypeError('"size" argument must be of type number');
    if (f < 0)
      throw new RangeError(
        'The value "' + f + '" is invalid for option "size"',
      );
  }
  function h(f, i, o) {
    return (
      d(f),
      f <= 0
        ? u(f)
        : i !== void 0
          ? typeof o == "string"
            ? u(f).fill(i, o)
            : u(f).fill(i)
          : u(f)
    );
  }
  l.alloc = function (f, i, o) {
    return h(f, i, o);
  };
  function y(f) {
    return d(f), u(f < 0 ? 0 : m(f) | 0);
  }
  (l.allocUnsafe = function (f) {
    return y(f);
  }),
    (l.allocUnsafeSlow = function (f) {
      return y(f);
    });
  function S(f, i) {
    if (((typeof i != "string" || i === "") && (i = "utf8"), !l.isEncoding(i)))
      throw new TypeError("Unknown encoding: " + i);
    const o = B(f, i) | 0;
    let p = u(o);
    const _ = p.write(f, i);
    return _ !== o && (p = p.slice(0, _)), p;
  }
  function k(f) {
    const i = f.length < 0 ? 0 : m(f.length) | 0,
      o = u(i);
    for (let p = 0; p < i; p += 1) o[p] = f[p] & 255;
    return o;
  }
  function T(f) {
    if (Re(f, Uint8Array)) {
      const i = new Uint8Array(f);
      return C(i.buffer, i.byteOffset, i.byteLength);
    }
    return k(f);
  }
  function C(f, i, o) {
    if (i < 0 || f.byteLength < i)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (f.byteLength < i + (o || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let p;
    return (
      i === void 0 && o === void 0
        ? (p = new Uint8Array(f))
        : o === void 0
          ? (p = new Uint8Array(f, i))
          : (p = new Uint8Array(f, i, o)),
      Object.setPrototypeOf(p, l.prototype),
      p
    );
  }
  function A(f) {
    if (l.isBuffer(f)) {
      const i = m(f.length) | 0,
        o = u(i);
      return o.length === 0 || f.copy(o, 0, 0, i), o;
    }
    if (f.length !== void 0)
      return typeof f.length != "number" || it(f.length) ? u(0) : k(f);
    if (f.type === "Buffer" && Array.isArray(f.data)) return k(f.data);
  }
  function m(f) {
    if (f >= s)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          s.toString(16) +
          " bytes",
      );
    return f | 0;
  }
  function v(f) {
    return +f != f && (f = 0), l.alloc(+f);
  }
  (l.isBuffer = function (i) {
    return i != null && i._isBuffer === !0 && i !== l.prototype;
  }),
    (l.compare = function (i, o) {
      if (
        (Re(i, Uint8Array) && (i = l.from(i, i.offset, i.byteLength)),
        Re(o, Uint8Array) && (o = l.from(o, o.offset, o.byteLength)),
        !l.isBuffer(i) || !l.isBuffer(o))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (i === o) return 0;
      let p = i.length,
        _ = o.length;
      for (let E = 0, x = Math.min(p, _); E < x; ++E)
        if (i[E] !== o[E]) {
          (p = i[E]), (_ = o[E]);
          break;
        }
      return p < _ ? -1 : _ < p ? 1 : 0;
    }),
    (l.isEncoding = function (i) {
      switch (String(i).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (l.concat = function (i, o) {
      if (!Array.isArray(i))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (i.length === 0) return l.alloc(0);
      let p;
      if (o === void 0) for (o = 0, p = 0; p < i.length; ++p) o += i[p].length;
      const _ = l.allocUnsafe(o);
      let E = 0;
      for (p = 0; p < i.length; ++p) {
        let x = i[p];
        if (Re(x, Uint8Array))
          E + x.length > _.length
            ? (l.isBuffer(x) || (x = l.from(x)), x.copy(_, E))
            : Uint8Array.prototype.set.call(_, x, E);
        else if (l.isBuffer(x)) x.copy(_, E);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        E += x.length;
      }
      return _;
    });
  function B(f, i) {
    if (l.isBuffer(f)) return f.length;
    if (ArrayBuffer.isView(f) || Re(f, ArrayBuffer)) return f.byteLength;
    if (typeof f != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof f,
      );
    const o = f.length,
      p = arguments.length > 2 && arguments[2] === !0;
    if (!p && o === 0) return 0;
    let _ = !1;
    for (;;)
      switch (i) {
        case "ascii":
        case "latin1":
        case "binary":
          return o;
        case "utf8":
        case "utf-8":
          return ae(f).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return o * 2;
        case "hex":
          return o >>> 1;
        case "base64":
          return vt(f).length;
        default:
          if (_) return p ? -1 : ae(f).length;
          (i = ("" + i).toLowerCase()), (_ = !0);
      }
  }
  l.byteLength = B;
  function O(f, i, o) {
    let p = !1;
    if (
      ((i === void 0 || i < 0) && (i = 0),
      i > this.length ||
        ((o === void 0 || o > this.length) && (o = this.length), o <= 0) ||
        ((o >>>= 0), (i >>>= 0), o <= i))
    )
      return "";
    for (f || (f = "utf8"); ; )
      switch (f) {
        case "hex":
          return X(this, i, o);
        case "utf8":
        case "utf-8":
          return U(this, i, o);
        case "ascii":
          return Y(this, i, o);
        case "latin1":
        case "binary":
          return te(this, i, o);
        case "base64":
          return W(this, i, o);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return le(this, i, o);
        default:
          if (p) throw new TypeError("Unknown encoding: " + f);
          (f = (f + "").toLowerCase()), (p = !0);
      }
  }
  l.prototype._isBuffer = !0;
  function L(f, i, o) {
    const p = f[i];
    (f[i] = f[o]), (f[o] = p);
  }
  (l.prototype.swap16 = function () {
    const i = this.length;
    if (i % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let o = 0; o < i; o += 2) L(this, o, o + 1);
    return this;
  }),
    (l.prototype.swap32 = function () {
      const i = this.length;
      if (i % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let o = 0; o < i; o += 4) L(this, o, o + 3), L(this, o + 1, o + 2);
      return this;
    }),
    (l.prototype.swap64 = function () {
      const i = this.length;
      if (i % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let o = 0; o < i; o += 8)
        L(this, o, o + 7),
          L(this, o + 1, o + 6),
          L(this, o + 2, o + 5),
          L(this, o + 3, o + 4);
      return this;
    }),
    (l.prototype.toString = function () {
      const i = this.length;
      return i === 0
        ? ""
        : arguments.length === 0
          ? U(this, 0, i)
          : O.apply(this, arguments);
    }),
    (l.prototype.toLocaleString = l.prototype.toString),
    (l.prototype.equals = function (i) {
      if (!l.isBuffer(i)) throw new TypeError("Argument must be a Buffer");
      return this === i ? !0 : l.compare(this, i) === 0;
    }),
    (l.prototype.inspect = function () {
      let i = "";
      const o = t.INSPECT_MAX_BYTES;
      return (
        (i = this.toString("hex", 0, o)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > o && (i += " ... "),
        "<Buffer " + i + ">"
      );
    }),
    n && (l.prototype[n] = l.prototype.inspect),
    (l.prototype.compare = function (i, o, p, _, E) {
      if (
        (Re(i, Uint8Array) && (i = l.from(i, i.offset, i.byteLength)),
        !l.isBuffer(i))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof i,
        );
      if (
        (o === void 0 && (o = 0),
        p === void 0 && (p = i ? i.length : 0),
        _ === void 0 && (_ = 0),
        E === void 0 && (E = this.length),
        o < 0 || p > i.length || _ < 0 || E > this.length)
      )
        throw new RangeError("out of range index");
      if (_ >= E && o >= p) return 0;
      if (_ >= E) return -1;
      if (o >= p) return 1;
      if (((o >>>= 0), (p >>>= 0), (_ >>>= 0), (E >>>= 0), this === i))
        return 0;
      let x = E - _,
        ee = p - o;
      const _e = Math.min(x, ee),
        ye = this.slice(_, E),
        we = i.slice(o, p);
      for (let de = 0; de < _e; ++de)
        if (ye[de] !== we[de]) {
          (x = ye[de]), (ee = we[de]);
          break;
        }
      return x < ee ? -1 : ee < x ? 1 : 0;
    });
  function F(f, i, o, p, _) {
    if (f.length === 0) return -1;
    if (
      (typeof o == "string"
        ? ((p = o), (o = 0))
        : o > 2147483647
          ? (o = 2147483647)
          : o < -2147483648 && (o = -2147483648),
      (o = +o),
      it(o) && (o = _ ? 0 : f.length - 1),
      o < 0 && (o = f.length + o),
      o >= f.length)
    ) {
      if (_) return -1;
      o = f.length - 1;
    } else if (o < 0)
      if (_) o = 0;
      else return -1;
    if ((typeof i == "string" && (i = l.from(i, p)), l.isBuffer(i)))
      return i.length === 0 ? -1 : j(f, i, o, p, _);
    if (typeof i == "number")
      return (
        (i = i & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? _
            ? Uint8Array.prototype.indexOf.call(f, i, o)
            : Uint8Array.prototype.lastIndexOf.call(f, i, o)
          : j(f, [i], o, p, _)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function j(f, i, o, p, _) {
    let E = 1,
      x = f.length,
      ee = i.length;
    if (
      p !== void 0 &&
      ((p = String(p).toLowerCase()),
      p === "ucs2" || p === "ucs-2" || p === "utf16le" || p === "utf-16le")
    ) {
      if (f.length < 2 || i.length < 2) return -1;
      (E = 2), (x /= 2), (ee /= 2), (o /= 2);
    }
    function _e(we, de) {
      return E === 1 ? we[de] : we.readUInt16BE(de * E);
    }
    let ye;
    if (_) {
      let we = -1;
      for (ye = o; ye < x; ye++)
        if (_e(f, ye) === _e(i, we === -1 ? 0 : ye - we)) {
          if ((we === -1 && (we = ye), ye - we + 1 === ee)) return we * E;
        } else we !== -1 && (ye -= ye - we), (we = -1);
    } else
      for (o + ee > x && (o = x - ee), ye = o; ye >= 0; ye--) {
        let we = !0;
        for (let de = 0; de < ee; de++)
          if (_e(f, ye + de) !== _e(i, de)) {
            we = !1;
            break;
          }
        if (we) return ye;
      }
    return -1;
  }
  (l.prototype.includes = function (i, o, p) {
    return this.indexOf(i, o, p) !== -1;
  }),
    (l.prototype.indexOf = function (i, o, p) {
      return F(this, i, o, p, !0);
    }),
    (l.prototype.lastIndexOf = function (i, o, p) {
      return F(this, i, o, p, !1);
    });
  function q(f, i, o, p) {
    o = Number(o) || 0;
    const _ = f.length - o;
    p ? ((p = Number(p)), p > _ && (p = _)) : (p = _);
    const E = i.length;
    p > E / 2 && (p = E / 2);
    let x;
    for (x = 0; x < p; ++x) {
      const ee = parseInt(i.substr(x * 2, 2), 16);
      if (it(ee)) return x;
      f[o + x] = ee;
    }
    return x;
  }
  function N(f, i, o, p) {
    return pt(ae(i, f.length - o), f, o, p);
  }
  function H(f, i, o, p) {
    return pt($e(i), f, o, p);
  }
  function re(f, i, o, p) {
    return pt(vt(i), f, o, p);
  }
  function I(f, i, o, p) {
    return pt(ht(i, f.length - o), f, o, p);
  }
  (l.prototype.write = function (i, o, p, _) {
    if (o === void 0) (_ = "utf8"), (p = this.length), (o = 0);
    else if (p === void 0 && typeof o == "string")
      (_ = o), (p = this.length), (o = 0);
    else if (isFinite(o))
      (o = o >>> 0),
        isFinite(p)
          ? ((p = p >>> 0), _ === void 0 && (_ = "utf8"))
          : ((_ = p), (p = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    const E = this.length - o;
    if (
      ((p === void 0 || p > E) && (p = E),
      (i.length > 0 && (p < 0 || o < 0)) || o > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    _ || (_ = "utf8");
    let x = !1;
    for (;;)
      switch (_) {
        case "hex":
          return q(this, i, o, p);
        case "utf8":
        case "utf-8":
          return N(this, i, o, p);
        case "ascii":
        case "latin1":
        case "binary":
          return H(this, i, o, p);
        case "base64":
          return re(this, i, o, p);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return I(this, i, o, p);
        default:
          if (x) throw new TypeError("Unknown encoding: " + _);
          (_ = ("" + _).toLowerCase()), (x = !0);
      }
  }),
    (l.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function W(f, i, o) {
    return i === 0 && o === f.length
      ? e.fromByteArray(f)
      : e.fromByteArray(f.slice(i, o));
  }
  function U(f, i, o) {
    o = Math.min(f.length, o);
    const p = [];
    let _ = i;
    for (; _ < o; ) {
      const E = f[_];
      let x = null,
        ee = E > 239 ? 4 : E > 223 ? 3 : E > 191 ? 2 : 1;
      if (_ + ee <= o) {
        let _e, ye, we, de;
        switch (ee) {
          case 1:
            E < 128 && (x = E);
            break;
          case 2:
            (_e = f[_ + 1]),
              (_e & 192) === 128 &&
                ((de = ((E & 31) << 6) | (_e & 63)), de > 127 && (x = de));
            break;
          case 3:
            (_e = f[_ + 1]),
              (ye = f[_ + 2]),
              (_e & 192) === 128 &&
                (ye & 192) === 128 &&
                ((de = ((E & 15) << 12) | ((_e & 63) << 6) | (ye & 63)),
                de > 2047 && (de < 55296 || de > 57343) && (x = de));
            break;
          case 4:
            (_e = f[_ + 1]),
              (ye = f[_ + 2]),
              (we = f[_ + 3]),
              (_e & 192) === 128 &&
                (ye & 192) === 128 &&
                (we & 192) === 128 &&
                ((de =
                  ((E & 15) << 18) |
                  ((_e & 63) << 12) |
                  ((ye & 63) << 6) |
                  (we & 63)),
                de > 65535 && de < 1114112 && (x = de));
        }
      }
      x === null
        ? ((x = 65533), (ee = 1))
        : x > 65535 &&
          ((x -= 65536),
          p.push(((x >>> 10) & 1023) | 55296),
          (x = 56320 | (x & 1023))),
        p.push(x),
        (_ += ee);
    }
    return G(p);
  }
  const V = 4096;
  function G(f) {
    const i = f.length;
    if (i <= V) return String.fromCharCode.apply(String, f);
    let o = "",
      p = 0;
    for (; p < i; )
      o += String.fromCharCode.apply(String, f.slice(p, (p += V)));
    return o;
  }
  function Y(f, i, o) {
    let p = "";
    o = Math.min(f.length, o);
    for (let _ = i; _ < o; ++_) p += String.fromCharCode(f[_] & 127);
    return p;
  }
  function te(f, i, o) {
    let p = "";
    o = Math.min(f.length, o);
    for (let _ = i; _ < o; ++_) p += String.fromCharCode(f[_]);
    return p;
  }
  function X(f, i, o) {
    const p = f.length;
    (!i || i < 0) && (i = 0), (!o || o < 0 || o > p) && (o = p);
    let _ = "";
    for (let E = i; E < o; ++E) _ += Et[f[E]];
    return _;
  }
  function le(f, i, o) {
    const p = f.slice(i, o);
    let _ = "";
    for (let E = 0; E < p.length - 1; E += 2)
      _ += String.fromCharCode(p[E] + p[E + 1] * 256);
    return _;
  }
  l.prototype.slice = function (i, o) {
    const p = this.length;
    (i = ~~i),
      (o = o === void 0 ? p : ~~o),
      i < 0 ? ((i += p), i < 0 && (i = 0)) : i > p && (i = p),
      o < 0 ? ((o += p), o < 0 && (o = 0)) : o > p && (o = p),
      o < i && (o = i);
    const _ = this.subarray(i, o);
    return Object.setPrototypeOf(_, l.prototype), _;
  };
  function K(f, i, o) {
    if (f % 1 !== 0 || f < 0) throw new RangeError("offset is not uint");
    if (f + i > o)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (l.prototype.readUintLE = l.prototype.readUIntLE =
    function (i, o, p) {
      (i = i >>> 0), (o = o >>> 0), p || K(i, o, this.length);
      let _ = this[i],
        E = 1,
        x = 0;
      for (; ++x < o && (E *= 256); ) _ += this[i + x] * E;
      return _;
    }),
    (l.prototype.readUintBE = l.prototype.readUIntBE =
      function (i, o, p) {
        (i = i >>> 0), (o = o >>> 0), p || K(i, o, this.length);
        let _ = this[i + --o],
          E = 1;
        for (; o > 0 && (E *= 256); ) _ += this[i + --o] * E;
        return _;
      }),
    (l.prototype.readUint8 = l.prototype.readUInt8 =
      function (i, o) {
        return (i = i >>> 0), o || K(i, 1, this.length), this[i];
      }),
    (l.prototype.readUint16LE = l.prototype.readUInt16LE =
      function (i, o) {
        return (
          (i = i >>> 0), o || K(i, 2, this.length), this[i] | (this[i + 1] << 8)
        );
      }),
    (l.prototype.readUint16BE = l.prototype.readUInt16BE =
      function (i, o) {
        return (
          (i = i >>> 0), o || K(i, 2, this.length), (this[i] << 8) | this[i + 1]
        );
      }),
    (l.prototype.readUint32LE = l.prototype.readUInt32LE =
      function (i, o) {
        return (
          (i = i >>> 0),
          o || K(i, 4, this.length),
          (this[i] | (this[i + 1] << 8) | (this[i + 2] << 16)) +
            this[i + 3] * 16777216
        );
      }),
    (l.prototype.readUint32BE = l.prototype.readUInt32BE =
      function (i, o) {
        return (
          (i = i >>> 0),
          o || K(i, 4, this.length),
          this[i] * 16777216 +
            ((this[i + 1] << 16) | (this[i + 2] << 8) | this[i + 3])
        );
      }),
    (l.prototype.readBigUInt64LE = Te(function (i) {
      (i = i >>> 0), M(i, "offset");
      const o = this[i],
        p = this[i + 7];
      (o === void 0 || p === void 0) && D(i, this.length - 8);
      const _ =
          o + this[++i] * 2 ** 8 + this[++i] * 2 ** 16 + this[++i] * 2 ** 24,
        E = this[++i] + this[++i] * 2 ** 8 + this[++i] * 2 ** 16 + p * 2 ** 24;
      return BigInt(_) + (BigInt(E) << BigInt(32));
    })),
    (l.prototype.readBigUInt64BE = Te(function (i) {
      (i = i >>> 0), M(i, "offset");
      const o = this[i],
        p = this[i + 7];
      (o === void 0 || p === void 0) && D(i, this.length - 8);
      const _ =
          o * 2 ** 24 + this[++i] * 2 ** 16 + this[++i] * 2 ** 8 + this[++i],
        E = this[++i] * 2 ** 24 + this[++i] * 2 ** 16 + this[++i] * 2 ** 8 + p;
      return (BigInt(_) << BigInt(32)) + BigInt(E);
    })),
    (l.prototype.readIntLE = function (i, o, p) {
      (i = i >>> 0), (o = o >>> 0), p || K(i, o, this.length);
      let _ = this[i],
        E = 1,
        x = 0;
      for (; ++x < o && (E *= 256); ) _ += this[i + x] * E;
      return (E *= 128), _ >= E && (_ -= Math.pow(2, 8 * o)), _;
    }),
    (l.prototype.readIntBE = function (i, o, p) {
      (i = i >>> 0), (o = o >>> 0), p || K(i, o, this.length);
      let _ = o,
        E = 1,
        x = this[i + --_];
      for (; _ > 0 && (E *= 256); ) x += this[i + --_] * E;
      return (E *= 128), x >= E && (x -= Math.pow(2, 8 * o)), x;
    }),
    (l.prototype.readInt8 = function (i, o) {
      return (
        (i = i >>> 0),
        o || K(i, 1, this.length),
        this[i] & 128 ? (255 - this[i] + 1) * -1 : this[i]
      );
    }),
    (l.prototype.readInt16LE = function (i, o) {
      (i = i >>> 0), o || K(i, 2, this.length);
      const p = this[i] | (this[i + 1] << 8);
      return p & 32768 ? p | 4294901760 : p;
    }),
    (l.prototype.readInt16BE = function (i, o) {
      (i = i >>> 0), o || K(i, 2, this.length);
      const p = this[i + 1] | (this[i] << 8);
      return p & 32768 ? p | 4294901760 : p;
    }),
    (l.prototype.readInt32LE = function (i, o) {
      return (
        (i = i >>> 0),
        o || K(i, 4, this.length),
        this[i] | (this[i + 1] << 8) | (this[i + 2] << 16) | (this[i + 3] << 24)
      );
    }),
    (l.prototype.readInt32BE = function (i, o) {
      return (
        (i = i >>> 0),
        o || K(i, 4, this.length),
        (this[i] << 24) | (this[i + 1] << 16) | (this[i + 2] << 8) | this[i + 3]
      );
    }),
    (l.prototype.readBigInt64LE = Te(function (i) {
      (i = i >>> 0), M(i, "offset");
      const o = this[i],
        p = this[i + 7];
      (o === void 0 || p === void 0) && D(i, this.length - 8);
      const _ =
        this[i + 4] + this[i + 5] * 2 ** 8 + this[i + 6] * 2 ** 16 + (p << 24);
      return (
        (BigInt(_) << BigInt(32)) +
        BigInt(
          o + this[++i] * 2 ** 8 + this[++i] * 2 ** 16 + this[++i] * 2 ** 24,
        )
      );
    })),
    (l.prototype.readBigInt64BE = Te(function (i) {
      (i = i >>> 0), M(i, "offset");
      const o = this[i],
        p = this[i + 7];
      (o === void 0 || p === void 0) && D(i, this.length - 8);
      const _ =
        (o << 24) + this[++i] * 2 ** 16 + this[++i] * 2 ** 8 + this[++i];
      return (
        (BigInt(_) << BigInt(32)) +
        BigInt(
          this[++i] * 2 ** 24 + this[++i] * 2 ** 16 + this[++i] * 2 ** 8 + p,
        )
      );
    })),
    (l.prototype.readFloatLE = function (i, o) {
      return (
        (i = i >>> 0), o || K(i, 4, this.length), r.read(this, i, !0, 23, 4)
      );
    }),
    (l.prototype.readFloatBE = function (i, o) {
      return (
        (i = i >>> 0), o || K(i, 4, this.length), r.read(this, i, !1, 23, 4)
      );
    }),
    (l.prototype.readDoubleLE = function (i, o) {
      return (
        (i = i >>> 0), o || K(i, 8, this.length), r.read(this, i, !0, 52, 8)
      );
    }),
    (l.prototype.readDoubleBE = function (i, o) {
      return (
        (i = i >>> 0), o || K(i, 8, this.length), r.read(this, i, !1, 52, 8)
      );
    });
  function Z(f, i, o, p, _, E) {
    if (!l.isBuffer(f))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (i > _ || i < E)
      throw new RangeError('"value" argument is out of bounds');
    if (o + p > f.length) throw new RangeError("Index out of range");
  }
  (l.prototype.writeUintLE = l.prototype.writeUIntLE =
    function (i, o, p, _) {
      if (((i = +i), (o = o >>> 0), (p = p >>> 0), !_)) {
        const ee = Math.pow(2, 8 * p) - 1;
        Z(this, i, o, p, ee, 0);
      }
      let E = 1,
        x = 0;
      for (this[o] = i & 255; ++x < p && (E *= 256); )
        this[o + x] = (i / E) & 255;
      return o + p;
    }),
    (l.prototype.writeUintBE = l.prototype.writeUIntBE =
      function (i, o, p, _) {
        if (((i = +i), (o = o >>> 0), (p = p >>> 0), !_)) {
          const ee = Math.pow(2, 8 * p) - 1;
          Z(this, i, o, p, ee, 0);
        }
        let E = p - 1,
          x = 1;
        for (this[o + E] = i & 255; --E >= 0 && (x *= 256); )
          this[o + E] = (i / x) & 255;
        return o + p;
      }),
    (l.prototype.writeUint8 = l.prototype.writeUInt8 =
      function (i, o, p) {
        return (
          (i = +i),
          (o = o >>> 0),
          p || Z(this, i, o, 1, 255, 0),
          (this[o] = i & 255),
          o + 1
        );
      }),
    (l.prototype.writeUint16LE = l.prototype.writeUInt16LE =
      function (i, o, p) {
        return (
          (i = +i),
          (o = o >>> 0),
          p || Z(this, i, o, 2, 65535, 0),
          (this[o] = i & 255),
          (this[o + 1] = i >>> 8),
          o + 2
        );
      }),
    (l.prototype.writeUint16BE = l.prototype.writeUInt16BE =
      function (i, o, p) {
        return (
          (i = +i),
          (o = o >>> 0),
          p || Z(this, i, o, 2, 65535, 0),
          (this[o] = i >>> 8),
          (this[o + 1] = i & 255),
          o + 2
        );
      }),
    (l.prototype.writeUint32LE = l.prototype.writeUInt32LE =
      function (i, o, p) {
        return (
          (i = +i),
          (o = o >>> 0),
          p || Z(this, i, o, 4, 4294967295, 0),
          (this[o + 3] = i >>> 24),
          (this[o + 2] = i >>> 16),
          (this[o + 1] = i >>> 8),
          (this[o] = i & 255),
          o + 4
        );
      }),
    (l.prototype.writeUint32BE = l.prototype.writeUInt32BE =
      function (i, o, p) {
        return (
          (i = +i),
          (o = o >>> 0),
          p || Z(this, i, o, 4, 4294967295, 0),
          (this[o] = i >>> 24),
          (this[o + 1] = i >>> 16),
          (this[o + 2] = i >>> 8),
          (this[o + 3] = i & 255),
          o + 4
        );
      });
  function ue(f, i, o, p, _) {
    b(i, p, _, f, o, 7);
    let E = Number(i & BigInt(4294967295));
    (f[o++] = E),
      (E = E >> 8),
      (f[o++] = E),
      (E = E >> 8),
      (f[o++] = E),
      (E = E >> 8),
      (f[o++] = E);
    let x = Number((i >> BigInt(32)) & BigInt(4294967295));
    return (
      (f[o++] = x),
      (x = x >> 8),
      (f[o++] = x),
      (x = x >> 8),
      (f[o++] = x),
      (x = x >> 8),
      (f[o++] = x),
      o
    );
  }
  function Fe(f, i, o, p, _) {
    b(i, p, _, f, o, 7);
    let E = Number(i & BigInt(4294967295));
    (f[o + 7] = E),
      (E = E >> 8),
      (f[o + 6] = E),
      (E = E >> 8),
      (f[o + 5] = E),
      (E = E >> 8),
      (f[o + 4] = E);
    let x = Number((i >> BigInt(32)) & BigInt(4294967295));
    return (
      (f[o + 3] = x),
      (x = x >> 8),
      (f[o + 2] = x),
      (x = x >> 8),
      (f[o + 1] = x),
      (x = x >> 8),
      (f[o] = x),
      o + 8
    );
  }
  (l.prototype.writeBigUInt64LE = Te(function (i, o = 0) {
    return ue(this, i, o, BigInt(0), BigInt("0xffffffffffffffff"));
  })),
    (l.prototype.writeBigUInt64BE = Te(function (i, o = 0) {
      return Fe(this, i, o, BigInt(0), BigInt("0xffffffffffffffff"));
    })),
    (l.prototype.writeIntLE = function (i, o, p, _) {
      if (((i = +i), (o = o >>> 0), !_)) {
        const _e = Math.pow(2, 8 * p - 1);
        Z(this, i, o, p, _e - 1, -_e);
      }
      let E = 0,
        x = 1,
        ee = 0;
      for (this[o] = i & 255; ++E < p && (x *= 256); )
        i < 0 && ee === 0 && this[o + E - 1] !== 0 && (ee = 1),
          (this[o + E] = (((i / x) >> 0) - ee) & 255);
      return o + p;
    }),
    (l.prototype.writeIntBE = function (i, o, p, _) {
      if (((i = +i), (o = o >>> 0), !_)) {
        const _e = Math.pow(2, 8 * p - 1);
        Z(this, i, o, p, _e - 1, -_e);
      }
      let E = p - 1,
        x = 1,
        ee = 0;
      for (this[o + E] = i & 255; --E >= 0 && (x *= 256); )
        i < 0 && ee === 0 && this[o + E + 1] !== 0 && (ee = 1),
          (this[o + E] = (((i / x) >> 0) - ee) & 255);
      return o + p;
    }),
    (l.prototype.writeInt8 = function (i, o, p) {
      return (
        (i = +i),
        (o = o >>> 0),
        p || Z(this, i, o, 1, 127, -128),
        i < 0 && (i = 255 + i + 1),
        (this[o] = i & 255),
        o + 1
      );
    }),
    (l.prototype.writeInt16LE = function (i, o, p) {
      return (
        (i = +i),
        (o = o >>> 0),
        p || Z(this, i, o, 2, 32767, -32768),
        (this[o] = i & 255),
        (this[o + 1] = i >>> 8),
        o + 2
      );
    }),
    (l.prototype.writeInt16BE = function (i, o, p) {
      return (
        (i = +i),
        (o = o >>> 0),
        p || Z(this, i, o, 2, 32767, -32768),
        (this[o] = i >>> 8),
        (this[o + 1] = i & 255),
        o + 2
      );
    }),
    (l.prototype.writeInt32LE = function (i, o, p) {
      return (
        (i = +i),
        (o = o >>> 0),
        p || Z(this, i, o, 4, 2147483647, -2147483648),
        (this[o] = i & 255),
        (this[o + 1] = i >>> 8),
        (this[o + 2] = i >>> 16),
        (this[o + 3] = i >>> 24),
        o + 4
      );
    }),
    (l.prototype.writeInt32BE = function (i, o, p) {
      return (
        (i = +i),
        (o = o >>> 0),
        p || Z(this, i, o, 4, 2147483647, -2147483648),
        i < 0 && (i = 4294967295 + i + 1),
        (this[o] = i >>> 24),
        (this[o + 1] = i >>> 16),
        (this[o + 2] = i >>> 8),
        (this[o + 3] = i & 255),
        o + 4
      );
    }),
    (l.prototype.writeBigInt64LE = Te(function (i, o = 0) {
      return ue(
        this,
        i,
        o,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    })),
    (l.prototype.writeBigInt64BE = Te(function (i, o = 0) {
      return Fe(
        this,
        i,
        o,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    }));
  function Je(f, i, o, p, _, E) {
    if (o + p > f.length) throw new RangeError("Index out of range");
    if (o < 0) throw new RangeError("Index out of range");
  }
  function R(f, i, o, p, _) {
    return (
      (i = +i),
      (o = o >>> 0),
      _ || Je(f, i, o, 4),
      r.write(f, i, o, p, 23, 4),
      o + 4
    );
  }
  (l.prototype.writeFloatLE = function (i, o, p) {
    return R(this, i, o, !0, p);
  }),
    (l.prototype.writeFloatBE = function (i, o, p) {
      return R(this, i, o, !1, p);
    });
  function w(f, i, o, p, _) {
    return (
      (i = +i),
      (o = o >>> 0),
      _ || Je(f, i, o, 8),
      r.write(f, i, o, p, 52, 8),
      o + 8
    );
  }
  (l.prototype.writeDoubleLE = function (i, o, p) {
    return w(this, i, o, !0, p);
  }),
    (l.prototype.writeDoubleBE = function (i, o, p) {
      return w(this, i, o, !1, p);
    }),
    (l.prototype.copy = function (i, o, p, _) {
      if (!l.isBuffer(i)) throw new TypeError("argument should be a Buffer");
      if (
        (p || (p = 0),
        !_ && _ !== 0 && (_ = this.length),
        o >= i.length && (o = i.length),
        o || (o = 0),
        _ > 0 && _ < p && (_ = p),
        _ === p || i.length === 0 || this.length === 0)
      )
        return 0;
      if (o < 0) throw new RangeError("targetStart out of bounds");
      if (p < 0 || p >= this.length) throw new RangeError("Index out of range");
      if (_ < 0) throw new RangeError("sourceEnd out of bounds");
      _ > this.length && (_ = this.length),
        i.length - o < _ - p && (_ = i.length - o + p);
      const E = _ - p;
      return (
        this === i && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(o, p, _)
          : Uint8Array.prototype.set.call(i, this.subarray(p, _), o),
        E
      );
    }),
    (l.prototype.fill = function (i, o, p, _) {
      if (typeof i == "string") {
        if (
          (typeof o == "string"
            ? ((_ = o), (o = 0), (p = this.length))
            : typeof p == "string" && ((_ = p), (p = this.length)),
          _ !== void 0 && typeof _ != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof _ == "string" && !l.isEncoding(_))
          throw new TypeError("Unknown encoding: " + _);
        if (i.length === 1) {
          const x = i.charCodeAt(0);
          ((_ === "utf8" && x < 128) || _ === "latin1") && (i = x);
        }
      } else
        typeof i == "number"
          ? (i = i & 255)
          : typeof i == "boolean" && (i = Number(i));
      if (o < 0 || this.length < o || this.length < p)
        throw new RangeError("Out of range index");
      if (p <= o) return this;
      (o = o >>> 0), (p = p === void 0 ? this.length : p >>> 0), i || (i = 0);
      let E;
      if (typeof i == "number") for (E = o; E < p; ++E) this[E] = i;
      else {
        const x = l.isBuffer(i) ? i : l.from(i, _),
          ee = x.length;
        if (ee === 0)
          throw new TypeError(
            'The value "' + i + '" is invalid for argument "value"',
          );
        for (E = 0; E < p - o; ++E) this[E + o] = x[E % ee];
      }
      return this;
    });
  const P = {};
  function z(f, i, o) {
    P[f] = class extends o {
      constructor() {
        super(),
          Object.defineProperty(this, "message", {
            value: i.apply(this, arguments),
            writable: !0,
            configurable: !0,
          }),
          (this.name = `${this.name} [${f}]`),
          this.stack,
          delete this.name;
      }
      get code() {
        return f;
      }
      set code(_) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: _,
          writable: !0,
        });
      }
      toString() {
        return `${this.name} [${f}]: ${this.message}`;
      }
    };
  }
  z(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function (f) {
      return f
        ? `${f} is outside of buffer bounds`
        : "Attempt to access memory outside buffer bounds";
    },
    RangeError,
  ),
    z(
      "ERR_INVALID_ARG_TYPE",
      function (f, i) {
        return `The "${f}" argument must be of type number. Received type ${typeof i}`;
      },
      TypeError,
    ),
    z(
      "ERR_OUT_OF_RANGE",
      function (f, i, o) {
        let p = `The value of "${f}" is out of range.`,
          _ = o;
        return (
          Number.isInteger(o) && Math.abs(o) > 2 ** 32
            ? (_ = Q(String(o)))
            : typeof o == "bigint" &&
              ((_ = String(o)),
              (o > BigInt(2) ** BigInt(32) || o < -(BigInt(2) ** BigInt(32))) &&
                (_ = Q(_)),
              (_ += "n")),
          (p += ` It must be ${i}. Received ${_}`),
          p
        );
      },
      RangeError,
    );
  function Q(f) {
    let i = "",
      o = f.length;
    const p = f[0] === "-" ? 1 : 0;
    for (; o >= p + 4; o -= 3) i = `_${f.slice(o - 3, o)}${i}`;
    return `${f.slice(0, o)}${i}`;
  }
  function g(f, i, o) {
    M(i, "offset"),
      (f[i] === void 0 || f[i + o] === void 0) && D(i, f.length - (o + 1));
  }
  function b(f, i, o, p, _, E) {
    if (f > o || f < i) {
      const x = typeof i == "bigint" ? "n" : "";
      let ee;
      throw (
        (E > 3
          ? i === 0 || i === BigInt(0)
            ? (ee = `>= 0${x} and < 2${x} ** ${(E + 1) * 8}${x}`)
            : (ee = `>= -(2${x} ** ${(E + 1) * 8 - 1}${x}) and < 2 ** ${(E + 1) * 8 - 1}${x}`)
          : (ee = `>= ${i}${x} and <= ${o}${x}`),
        new P.ERR_OUT_OF_RANGE("value", ee, f))
      );
    }
    g(p, _, E);
  }
  function M(f, i) {
    if (typeof f != "number") throw new P.ERR_INVALID_ARG_TYPE(i, "number", f);
  }
  function D(f, i, o) {
    throw Math.floor(f) !== f
      ? (M(f, o), new P.ERR_OUT_OF_RANGE(o || "offset", "an integer", f))
      : i < 0
        ? new P.ERR_BUFFER_OUT_OF_BOUNDS()
        : new P.ERR_OUT_OF_RANGE(
            o || "offset",
            `>= ${o ? 1 : 0} and <= ${i}`,
            f,
          );
  }
  const me = /[^+/0-9A-Za-z-_]/g;
  function $(f) {
    if (((f = f.split("=")[0]), (f = f.trim().replace(me, "")), f.length < 2))
      return "";
    for (; f.length % 4 !== 0; ) f = f + "=";
    return f;
  }
  function ae(f, i) {
    i = i || 1 / 0;
    let o;
    const p = f.length;
    let _ = null;
    const E = [];
    for (let x = 0; x < p; ++x) {
      if (((o = f.charCodeAt(x)), o > 55295 && o < 57344)) {
        if (!_) {
          if (o > 56319) {
            (i -= 3) > -1 && E.push(239, 191, 189);
            continue;
          } else if (x + 1 === p) {
            (i -= 3) > -1 && E.push(239, 191, 189);
            continue;
          }
          _ = o;
          continue;
        }
        if (o < 56320) {
          (i -= 3) > -1 && E.push(239, 191, 189), (_ = o);
          continue;
        }
        o = (((_ - 55296) << 10) | (o - 56320)) + 65536;
      } else _ && (i -= 3) > -1 && E.push(239, 191, 189);
      if (((_ = null), o < 128)) {
        if ((i -= 1) < 0) break;
        E.push(o);
      } else if (o < 2048) {
        if ((i -= 2) < 0) break;
        E.push((o >> 6) | 192, (o & 63) | 128);
      } else if (o < 65536) {
        if ((i -= 3) < 0) break;
        E.push((o >> 12) | 224, ((o >> 6) & 63) | 128, (o & 63) | 128);
      } else if (o < 1114112) {
        if ((i -= 4) < 0) break;
        E.push(
          (o >> 18) | 240,
          ((o >> 12) & 63) | 128,
          ((o >> 6) & 63) | 128,
          (o & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return E;
  }
  function $e(f) {
    const i = [];
    for (let o = 0; o < f.length; ++o) i.push(f.charCodeAt(o) & 255);
    return i;
  }
  function ht(f, i) {
    let o, p, _;
    const E = [];
    for (let x = 0; x < f.length && !((i -= 2) < 0); ++x)
      (o = f.charCodeAt(x)), (p = o >> 8), (_ = o % 256), E.push(_), E.push(p);
    return E;
  }
  function vt(f) {
    return e.toByteArray($(f));
  }
  function pt(f, i, o, p) {
    let _;
    for (_ = 0; _ < p && !(_ + o >= i.length || _ >= f.length); ++_)
      i[_ + o] = f[_];
    return _;
  }
  function Re(f, i) {
    return (
      f instanceof i ||
      (f != null &&
        f.constructor != null &&
        f.constructor.name != null &&
        f.constructor.name === i.name)
    );
  }
  function it(f) {
    return f !== f;
  }
  const Et = (function () {
    const f = "0123456789abcdef",
      i = new Array(256);
    for (let o = 0; o < 16; ++o) {
      const p = o * 16;
      for (let _ = 0; _ < 16; ++_) i[p + _] = f[o] + f[_];
    }
    return i;
  })();
  function Te(f) {
    return typeof BigInt > "u" ? ot : f;
  }
  function ot() {
    throw new Error("BigInt not supported");
  }
})(wt);
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ (function (
  t,
  e,
) {
  var r = wt,
    n = r.Buffer;
  function s(u, l) {
    for (var c in u) l[c] = u[c];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow
    ? (t.exports = r)
    : (s(r, e), (e.Buffer = a));
  function a(u, l, c) {
    return n(u, l, c);
  }
  (a.prototype = Object.create(n.prototype)),
    s(n, a),
    (a.from = function (u, l, c) {
      if (typeof u == "number")
        throw new TypeError("Argument must not be a number");
      return n(u, l, c);
    }),
    (a.alloc = function (u, l, c) {
      if (typeof u != "number")
        throw new TypeError("Argument must be a number");
      var d = n(u);
      return (
        l !== void 0
          ? typeof c == "string"
            ? d.fill(l, c)
            : d.fill(l)
          : d.fill(0),
        d
      );
    }),
    (a.allocUnsafe = function (u) {
      if (typeof u != "number")
        throw new TypeError("Argument must be a number");
      return n(u);
    }),
    (a.allocUnsafeSlow = function (u) {
      if (typeof u != "number")
        throw new TypeError("Argument must be a number");
      return r.SlowBuffer(u);
    });
})(vr, vr.exports);
var Jn = vr.exports,
  er = 65536,
  Ys = 4294967295;
function Js() {
  throw new Error(`Secure random number generation is not supported by this browser.
Use Chrome, Firefox or Internet Explorer 11`);
}
var Ks = Jn.Buffer,
  zt = window.crypto || window.msCrypto;
zt && zt.getRandomValues ? (wr.exports = Xs) : (wr.exports = Js);
function Xs(t, e) {
  if (t > Ys) throw new RangeError("requested too many random bytes");
  var r = Ks.allocUnsafe(t);
  if (t > 0)
    if (t > er)
      for (var n = 0; n < t; n += er) zt.getRandomValues(r.slice(n, n + er));
    else zt.getRandomValues(r);
  return typeof e == "function"
    ? process.nextTick(function () {
        e(null, r);
      })
    : r;
}
var Zs = wr.exports,
  Er = { exports: {} };
const Qs = {},
  $s = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Qs },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Gt = Bs($s);
var Kn = Gt.EventEmitter,
  tr,
  rn;
function ea() {
  if (rn) return tr;
  rn = 1;
  function t(T, C) {
    var A = Object.keys(T);
    if (Object.getOwnPropertySymbols) {
      var m = Object.getOwnPropertySymbols(T);
      C &&
        (m = m.filter(function (v) {
          return Object.getOwnPropertyDescriptor(T, v).enumerable;
        })),
        A.push.apply(A, m);
    }
    return A;
  }
  function e(T) {
    for (var C = 1; C < arguments.length; C++) {
      var A = arguments[C] != null ? arguments[C] : {};
      C % 2
        ? t(Object(A), !0).forEach(function (m) {
            r(T, m, A[m]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(T, Object.getOwnPropertyDescriptors(A))
          : t(Object(A)).forEach(function (m) {
              Object.defineProperty(
                T,
                m,
                Object.getOwnPropertyDescriptor(A, m),
              );
            });
    }
    return T;
  }
  function r(T, C, A) {
    return (
      (C = u(C)),
      C in T
        ? Object.defineProperty(T, C, {
            value: A,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (T[C] = A),
      T
    );
  }
  function n(T, C) {
    if (!(T instanceof C))
      throw new TypeError("Cannot call a class as a function");
  }
  function s(T, C) {
    for (var A = 0; A < C.length; A++) {
      var m = C[A];
      (m.enumerable = m.enumerable || !1),
        (m.configurable = !0),
        "value" in m && (m.writable = !0),
        Object.defineProperty(T, u(m.key), m);
    }
  }
  function a(T, C, A) {
    return (
      C && s(T.prototype, C),
      A && s(T, A),
      Object.defineProperty(T, "prototype", { writable: !1 }),
      T
    );
  }
  function u(T) {
    var C = l(T, "string");
    return typeof C == "symbol" ? C : String(C);
  }
  function l(T, C) {
    if (typeof T != "object" || T === null) return T;
    var A = T[Symbol.toPrimitive];
    if (A !== void 0) {
      var m = A.call(T, C || "default");
      if (typeof m != "object") return m;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (C === "string" ? String : Number)(T);
  }
  var c = wt,
    d = c.Buffer,
    h = Gt,
    y = h.inspect,
    S = (y && y.custom) || "inspect";
  function k(T, C, A) {
    d.prototype.copy.call(T, C, A);
  }
  return (
    (tr = (function () {
      function T() {
        n(this, T), (this.head = null), (this.tail = null), (this.length = 0);
      }
      return (
        a(T, [
          {
            key: "push",
            value: function (A) {
              var m = { data: A, next: null };
              this.length > 0 ? (this.tail.next = m) : (this.head = m),
                (this.tail = m),
                ++this.length;
            },
          },
          {
            key: "unshift",
            value: function (A) {
              var m = { data: A, next: this.head };
              this.length === 0 && (this.tail = m),
                (this.head = m),
                ++this.length;
            },
          },
          {
            key: "shift",
            value: function () {
              if (this.length !== 0) {
                var A = this.head.data;
                return (
                  this.length === 1
                    ? (this.head = this.tail = null)
                    : (this.head = this.head.next),
                  --this.length,
                  A
                );
              }
            },
          },
          {
            key: "clear",
            value: function () {
              (this.head = this.tail = null), (this.length = 0);
            },
          },
          {
            key: "join",
            value: function (A) {
              if (this.length === 0) return "";
              for (var m = this.head, v = "" + m.data; (m = m.next); )
                v += A + m.data;
              return v;
            },
          },
          {
            key: "concat",
            value: function (A) {
              if (this.length === 0) return d.alloc(0);
              for (var m = d.allocUnsafe(A >>> 0), v = this.head, B = 0; v; )
                k(v.data, m, B), (B += v.data.length), (v = v.next);
              return m;
            },
          },
          {
            key: "consume",
            value: function (A, m) {
              var v;
              return (
                A < this.head.data.length
                  ? ((v = this.head.data.slice(0, A)),
                    (this.head.data = this.head.data.slice(A)))
                  : A === this.head.data.length
                    ? (v = this.shift())
                    : (v = m ? this._getString(A) : this._getBuffer(A)),
                v
              );
            },
          },
          {
            key: "first",
            value: function () {
              return this.head.data;
            },
          },
          {
            key: "_getString",
            value: function (A) {
              var m = this.head,
                v = 1,
                B = m.data;
              for (A -= B.length; (m = m.next); ) {
                var O = m.data,
                  L = A > O.length ? O.length : A;
                if (
                  (L === O.length ? (B += O) : (B += O.slice(0, A)),
                  (A -= L),
                  A === 0)
                ) {
                  L === O.length
                    ? (++v,
                      m.next
                        ? (this.head = m.next)
                        : (this.head = this.tail = null))
                    : ((this.head = m), (m.data = O.slice(L)));
                  break;
                }
                ++v;
              }
              return (this.length -= v), B;
            },
          },
          {
            key: "_getBuffer",
            value: function (A) {
              var m = d.allocUnsafe(A),
                v = this.head,
                B = 1;
              for (v.data.copy(m), A -= v.data.length; (v = v.next); ) {
                var O = v.data,
                  L = A > O.length ? O.length : A;
                if ((O.copy(m, m.length - A, 0, L), (A -= L), A === 0)) {
                  L === O.length
                    ? (++B,
                      v.next
                        ? (this.head = v.next)
                        : (this.head = this.tail = null))
                    : ((this.head = v), (v.data = O.slice(L)));
                  break;
                }
                ++B;
              }
              return (this.length -= B), m;
            },
          },
          {
            key: S,
            value: function (A, m) {
              return y(this, e(e({}, m), {}, { depth: 0, customInspect: !1 }));
            },
          },
        ]),
        T
      );
    })()),
    tr
  );
}
function ta(t, e) {
  var r = this,
    n = this._readableState && this._readableState.destroyed,
    s = this._writableState && this._writableState.destroyed;
  return n || s
    ? (e
        ? e(t)
        : t &&
          (this._writableState
            ? this._writableState.errorEmitted ||
              ((this._writableState.errorEmitted = !0),
              process.nextTick(Cr, this, t))
            : process.nextTick(Cr, this, t)),
      this)
    : (this._readableState && (this._readableState.destroyed = !0),
      this._writableState && (this._writableState.destroyed = !0),
      this._destroy(t || null, function (a) {
        !e && a
          ? r._writableState
            ? r._writableState.errorEmitted
              ? process.nextTick(jt, r)
              : ((r._writableState.errorEmitted = !0),
                process.nextTick(nn, r, a))
            : process.nextTick(nn, r, a)
          : e
            ? (process.nextTick(jt, r), e(a))
            : process.nextTick(jt, r);
      }),
      this);
}
function nn(t, e) {
  Cr(t, e), jt(t);
}
function jt(t) {
  (t._writableState && !t._writableState.emitClose) ||
    (t._readableState && !t._readableState.emitClose) ||
    t.emit("close");
}
function ra() {
  this._readableState &&
    ((this._readableState.destroyed = !1),
    (this._readableState.reading = !1),
    (this._readableState.ended = !1),
    (this._readableState.endEmitted = !1)),
    this._writableState &&
      ((this._writableState.destroyed = !1),
      (this._writableState.ended = !1),
      (this._writableState.ending = !1),
      (this._writableState.finalCalled = !1),
      (this._writableState.prefinished = !1),
      (this._writableState.finished = !1),
      (this._writableState.errorEmitted = !1));
}
function Cr(t, e) {
  t.emit("error", e);
}
function na(t, e) {
  var r = t._readableState,
    n = t._writableState;
  (r && r.autoDestroy) || (n && n.autoDestroy)
    ? t.destroy(e)
    : t.emit("error", e);
}
var Xn = { destroy: ta, undestroy: ra, errorOrDestroy: na },
  dt = {};
function ia(t, e) {
  (t.prototype = Object.create(e.prototype)),
    (t.prototype.constructor = t),
    (t.__proto__ = e);
}
var Zn = {};
function Ne(t, e, r) {
  r || (r = Error);
  function n(a, u, l) {
    return typeof e == "string" ? e : e(a, u, l);
  }
  var s = (function (a) {
    ia(u, a);
    function u(l, c, d) {
      return a.call(this, n(l, c, d)) || this;
    }
    return u;
  })(r);
  (s.prototype.name = r.name), (s.prototype.code = t), (Zn[t] = s);
}
function on(t, e) {
  if (Array.isArray(t)) {
    var r = t.length;
    return (
      (t = t.map(function (n) {
        return String(n);
      })),
      r > 2
        ? "one of "
            .concat(e, " ")
            .concat(t.slice(0, r - 1).join(", "), ", or ") + t[r - 1]
        : r === 2
          ? "one of ".concat(e, " ").concat(t[0], " or ").concat(t[1])
          : "of ".concat(e, " ").concat(t[0])
    );
  } else return "of ".concat(e, " ").concat(String(t));
}
function oa(t, e, r) {
  return t.substr(!r || r < 0 ? 0 : +r, e.length) === e;
}
function sa(t, e, r) {
  return (
    (r === void 0 || r > t.length) && (r = t.length),
    t.substring(r - e.length, r) === e
  );
}
function aa(t, e, r) {
  return (
    typeof r != "number" && (r = 0),
    r + e.length > t.length ? !1 : t.indexOf(e, r) !== -1
  );
}
Ne(
  "ERR_INVALID_OPT_VALUE",
  function (t, e) {
    return 'The value "' + e + '" is invalid for option "' + t + '"';
  },
  TypeError,
);
Ne(
  "ERR_INVALID_ARG_TYPE",
  function (t, e, r) {
    var n;
    typeof e == "string" && oa(e, "not ")
      ? ((n = "must not be"), (e = e.replace(/^not /, "")))
      : (n = "must be");
    var s;
    if (sa(t, " argument"))
      s = "The ".concat(t, " ").concat(n, " ").concat(on(e, "type"));
    else {
      var a = aa(t, ".") ? "property" : "argument";
      s = 'The "'
        .concat(t, '" ')
        .concat(a, " ")
        .concat(n, " ")
        .concat(on(e, "type"));
    }
    return (s += ". Received type ".concat(typeof r)), s;
  },
  TypeError,
);
Ne("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
Ne("ERR_METHOD_NOT_IMPLEMENTED", function (t) {
  return "The " + t + " method is not implemented";
});
Ne("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
Ne("ERR_STREAM_DESTROYED", function (t) {
  return "Cannot call " + t + " after a stream was destroyed";
});
Ne("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
Ne("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
Ne("ERR_STREAM_WRITE_AFTER_END", "write after end");
Ne("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
Ne(
  "ERR_UNKNOWN_ENCODING",
  function (t) {
    return "Unknown encoding: " + t;
  },
  TypeError,
);
Ne("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
dt.codes = Zn;
var la = dt.codes.ERR_INVALID_OPT_VALUE;
function ua(t, e, r) {
  return t.highWaterMark != null ? t.highWaterMark : e ? t[r] : null;
}
function ca(t, e, r, n) {
  var s = ua(e, n, r);
  if (s != null) {
    if (!(isFinite(s) && Math.floor(s) === s) || s < 0) {
      var a = n ? r : "highWaterMark";
      throw new la(a, s);
    }
    return Math.floor(s);
  }
  return t.objectMode ? 16 : 16 * 1024;
}
var Qn = { getHighWaterMark: ca },
  Rr = { exports: {} };
typeof Object.create == "function"
  ? (Rr.exports = function (e, r) {
      r &&
        ((e.super_ = r),
        (e.prototype = Object.create(r.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })));
    })
  : (Rr.exports = function (e, r) {
      if (r) {
        e.super_ = r;
        var n = function () {};
        (n.prototype = r.prototype),
          (e.prototype = new n()),
          (e.prototype.constructor = e);
      }
    });
var Pt = Rr.exports,
  fa = da;
function da(t, e) {
  if (rr("noDeprecation")) return t;
  var r = !1;
  function n() {
    if (!r) {
      if (rr("throwDeprecation")) throw new Error(e);
      rr("traceDeprecation") ? console.trace(e) : console.warn(e), (r = !0);
    }
    return t.apply(this, arguments);
  }
  return n;
}
function rr(t) {
  try {
    if (!window.localStorage) return !1;
  } catch {
    return !1;
  }
  var e = window.localStorage[t];
  return e == null ? !1 : String(e).toLowerCase() === "true";
}
var nr, sn;
function $n() {
  if (sn) return nr;
  (sn = 1), (nr = q);
  function t(R) {
    var w = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function () {
        Je(w, R);
      });
  }
  var e;
  q.WritableState = F;
  var r = { deprecate: fa },
    n = Kn,
    s = wt.Buffer,
    a =
      (typeof window < "u" || typeof window < "u"
        ? window
        : typeof self < "u"
          ? self
          : {}
      ).Uint8Array || function () {};
  function u(R) {
    return s.from(R);
  }
  function l(R) {
    return s.isBuffer(R) || R instanceof a;
  }
  var c = Xn,
    d = Qn,
    h = d.getHighWaterMark,
    y = dt.codes,
    S = y.ERR_INVALID_ARG_TYPE,
    k = y.ERR_METHOD_NOT_IMPLEMENTED,
    T = y.ERR_MULTIPLE_CALLBACK,
    C = y.ERR_STREAM_CANNOT_PIPE,
    A = y.ERR_STREAM_DESTROYED,
    m = y.ERR_STREAM_NULL_VALUES,
    v = y.ERR_STREAM_WRITE_AFTER_END,
    B = y.ERR_UNKNOWN_ENCODING,
    O = c.errorOrDestroy;
  Pt(q, n);
  function L() {}
  function F(R, w, P) {
    (e = e || yt()),
      (R = R || {}),
      typeof P != "boolean" && (P = w instanceof e),
      (this.objectMode = !!R.objectMode),
      P && (this.objectMode = this.objectMode || !!R.writableObjectMode),
      (this.highWaterMark = h(this, R, "writableHighWaterMark", P)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    var z = R.decodeStrings === !1;
    (this.decodeStrings = !z),
      (this.defaultEncoding = R.defaultEncoding || "utf8"),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (Q) {
        G(w, Q);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.emitClose = R.emitClose !== !1),
      (this.autoDestroy = !!R.autoDestroy),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new t(this));
  }
  (F.prototype.getBuffer = function () {
    for (var w = this.bufferedRequest, P = []; w; ) P.push(w), (w = w.next);
    return P;
  }),
    (function () {
      try {
        Object.defineProperty(F.prototype, "buffer", {
          get: r.deprecate(
            function () {
              return this.getBuffer();
            },
            "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
            "DEP0003",
          ),
        });
      } catch {}
    })();
  var j;
  typeof Symbol == "function" &&
  Symbol.hasInstance &&
  typeof Function.prototype[Symbol.hasInstance] == "function"
    ? ((j = Function.prototype[Symbol.hasInstance]),
      Object.defineProperty(q, Symbol.hasInstance, {
        value: function (w) {
          return j.call(this, w)
            ? !0
            : this !== q
              ? !1
              : w && w._writableState instanceof F;
        },
      }))
    : (j = function (w) {
        return w instanceof this;
      });
  function q(R) {
    e = e || yt();
    var w = this instanceof e;
    if (!w && !j.call(q, this)) return new q(R);
    (this._writableState = new F(R, this, w)),
      (this.writable = !0),
      R &&
        (typeof R.write == "function" && (this._write = R.write),
        typeof R.writev == "function" && (this._writev = R.writev),
        typeof R.destroy == "function" && (this._destroy = R.destroy),
        typeof R.final == "function" && (this._final = R.final)),
      n.call(this);
  }
  q.prototype.pipe = function () {
    O(this, new C());
  };
  function N(R, w) {
    var P = new v();
    O(R, P), process.nextTick(w, P);
  }
  function H(R, w, P, z) {
    var Q;
    return (
      P === null
        ? (Q = new m())
        : typeof P != "string" &&
          !w.objectMode &&
          (Q = new S("chunk", ["string", "Buffer"], P)),
      Q ? (O(R, Q), process.nextTick(z, Q), !1) : !0
    );
  }
  (q.prototype.write = function (R, w, P) {
    var z = this._writableState,
      Q = !1,
      g = !z.objectMode && l(R);
    return (
      g && !s.isBuffer(R) && (R = u(R)),
      typeof w == "function" && ((P = w), (w = null)),
      g ? (w = "buffer") : w || (w = z.defaultEncoding),
      typeof P != "function" && (P = L),
      z.ending
        ? N(this, P)
        : (g || H(this, z, R, P)) &&
          (z.pendingcb++, (Q = I(this, z, g, R, w, P))),
      Q
    );
  }),
    (q.prototype.cork = function () {
      this._writableState.corked++;
    }),
    (q.prototype.uncork = function () {
      var R = this._writableState;
      R.corked &&
        (R.corked--,
        !R.writing &&
          !R.corked &&
          !R.bufferProcessing &&
          R.bufferedRequest &&
          X(this, R));
    }),
    (q.prototype.setDefaultEncoding = function (w) {
      if (
        (typeof w == "string" && (w = w.toLowerCase()),
        !(
          [
            "hex",
            "utf8",
            "utf-8",
            "ascii",
            "binary",
            "base64",
            "ucs2",
            "ucs-2",
            "utf16le",
            "utf-16le",
            "raw",
          ].indexOf((w + "").toLowerCase()) > -1
        ))
      )
        throw new B(w);
      return (this._writableState.defaultEncoding = w), this;
    }),
    Object.defineProperty(q.prototype, "writableBuffer", {
      enumerable: !1,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    });
  function re(R, w, P) {
    return (
      !R.objectMode &&
        R.decodeStrings !== !1 &&
        typeof w == "string" &&
        (w = s.from(w, P)),
      w
    );
  }
  Object.defineProperty(q.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function I(R, w, P, z, Q, g) {
    if (!P) {
      var b = re(w, z, Q);
      z !== b && ((P = !0), (Q = "buffer"), (z = b));
    }
    var M = w.objectMode ? 1 : z.length;
    w.length += M;
    var D = w.length < w.highWaterMark;
    if ((D || (w.needDrain = !0), w.writing || w.corked)) {
      var me = w.lastBufferedRequest;
      (w.lastBufferedRequest = {
        chunk: z,
        encoding: Q,
        isBuf: P,
        callback: g,
        next: null,
      }),
        me
          ? (me.next = w.lastBufferedRequest)
          : (w.bufferedRequest = w.lastBufferedRequest),
        (w.bufferedRequestCount += 1);
    } else W(R, w, !1, M, z, Q, g);
    return D;
  }
  function W(R, w, P, z, Q, g, b) {
    (w.writelen = z),
      (w.writecb = b),
      (w.writing = !0),
      (w.sync = !0),
      w.destroyed
        ? w.onwrite(new A("write"))
        : P
          ? R._writev(Q, w.onwrite)
          : R._write(Q, g, w.onwrite),
      (w.sync = !1);
  }
  function U(R, w, P, z, Q) {
    --w.pendingcb,
      P
        ? (process.nextTick(Q, z),
          process.nextTick(ue, R, w),
          (R._writableState.errorEmitted = !0),
          O(R, z))
        : (Q(z), (R._writableState.errorEmitted = !0), O(R, z), ue(R, w));
  }
  function V(R) {
    (R.writing = !1),
      (R.writecb = null),
      (R.length -= R.writelen),
      (R.writelen = 0);
  }
  function G(R, w) {
    var P = R._writableState,
      z = P.sync,
      Q = P.writecb;
    if (typeof Q != "function") throw new T();
    if ((V(P), w)) U(R, P, z, w, Q);
    else {
      var g = le(P) || R.destroyed;
      !g && !P.corked && !P.bufferProcessing && P.bufferedRequest && X(R, P),
        z ? process.nextTick(Y, R, P, g, Q) : Y(R, P, g, Q);
    }
  }
  function Y(R, w, P, z) {
    P || te(R, w), w.pendingcb--, z(), ue(R, w);
  }
  function te(R, w) {
    w.length === 0 && w.needDrain && ((w.needDrain = !1), R.emit("drain"));
  }
  function X(R, w) {
    w.bufferProcessing = !0;
    var P = w.bufferedRequest;
    if (R._writev && P && P.next) {
      var z = w.bufferedRequestCount,
        Q = new Array(z),
        g = w.corkedRequestsFree;
      g.entry = P;
      for (var b = 0, M = !0; P; )
        (Q[b] = P), P.isBuf || (M = !1), (P = P.next), (b += 1);
      (Q.allBuffers = M),
        W(R, w, !0, w.length, Q, "", g.finish),
        w.pendingcb++,
        (w.lastBufferedRequest = null),
        g.next
          ? ((w.corkedRequestsFree = g.next), (g.next = null))
          : (w.corkedRequestsFree = new t(w)),
        (w.bufferedRequestCount = 0);
    } else {
      for (; P; ) {
        var D = P.chunk,
          me = P.encoding,
          $ = P.callback,
          ae = w.objectMode ? 1 : D.length;
        if (
          (W(R, w, !1, ae, D, me, $),
          (P = P.next),
          w.bufferedRequestCount--,
          w.writing)
        )
          break;
      }
      P === null && (w.lastBufferedRequest = null);
    }
    (w.bufferedRequest = P), (w.bufferProcessing = !1);
  }
  (q.prototype._write = function (R, w, P) {
    P(new k("_write()"));
  }),
    (q.prototype._writev = null),
    (q.prototype.end = function (R, w, P) {
      var z = this._writableState;
      return (
        typeof R == "function"
          ? ((P = R), (R = null), (w = null))
          : typeof w == "function" && ((P = w), (w = null)),
        R != null && this.write(R, w),
        z.corked && ((z.corked = 1), this.uncork()),
        z.ending || Fe(this, z, P),
        this
      );
    }),
    Object.defineProperty(q.prototype, "writableLength", {
      enumerable: !1,
      get: function () {
        return this._writableState.length;
      },
    });
  function le(R) {
    return (
      R.ending &&
      R.length === 0 &&
      R.bufferedRequest === null &&
      !R.finished &&
      !R.writing
    );
  }
  function K(R, w) {
    R._final(function (P) {
      w.pendingcb--,
        P && O(R, P),
        (w.prefinished = !0),
        R.emit("prefinish"),
        ue(R, w);
    });
  }
  function Z(R, w) {
    !w.prefinished &&
      !w.finalCalled &&
      (typeof R._final == "function" && !w.destroyed
        ? (w.pendingcb++, (w.finalCalled = !0), process.nextTick(K, R, w))
        : ((w.prefinished = !0), R.emit("prefinish")));
  }
  function ue(R, w) {
    var P = le(w);
    if (
      P &&
      (Z(R, w),
      w.pendingcb === 0 && ((w.finished = !0), R.emit("finish"), w.autoDestroy))
    ) {
      var z = R._readableState;
      (!z || (z.autoDestroy && z.endEmitted)) && R.destroy();
    }
    return P;
  }
  function Fe(R, w, P) {
    (w.ending = !0),
      ue(R, w),
      P && (w.finished ? process.nextTick(P) : R.once("finish", P)),
      (w.ended = !0),
      (R.writable = !1);
  }
  function Je(R, w, P) {
    var z = R.entry;
    for (R.entry = null; z; ) {
      var Q = z.callback;
      w.pendingcb--, Q(P), (z = z.next);
    }
    w.corkedRequestsFree.next = R;
  }
  return (
    Object.defineProperty(q.prototype, "destroyed", {
      enumerable: !1,
      get: function () {
        return this._writableState === void 0
          ? !1
          : this._writableState.destroyed;
      },
      set: function (w) {
        this._writableState && (this._writableState.destroyed = w);
      },
    }),
    (q.prototype.destroy = c.destroy),
    (q.prototype._undestroy = c.undestroy),
    (q.prototype._destroy = function (R, w) {
      w(R);
    }),
    nr
  );
}
var ir, an;
function yt() {
  if (an) return ir;
  an = 1;
  var t =
    Object.keys ||
    function (d) {
      var h = [];
      for (var y in d) h.push(y);
      return h;
    };
  ir = u;
  var e = ti(),
    r = $n();
  Pt(u, e);
  for (var n = t(r.prototype), s = 0; s < n.length; s++) {
    var a = n[s];
    u.prototype[a] || (u.prototype[a] = r.prototype[a]);
  }
  function u(d) {
    if (!(this instanceof u)) return new u(d);
    e.call(this, d),
      r.call(this, d),
      (this.allowHalfOpen = !0),
      d &&
        (d.readable === !1 && (this.readable = !1),
        d.writable === !1 && (this.writable = !1),
        d.allowHalfOpen === !1 &&
          ((this.allowHalfOpen = !1), this.once("end", l)));
  }
  Object.defineProperty(u.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  }),
    Object.defineProperty(u.prototype, "writableBuffer", {
      enumerable: !1,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    }),
    Object.defineProperty(u.prototype, "writableLength", {
      enumerable: !1,
      get: function () {
        return this._writableState.length;
      },
    });
  function l() {
    this._writableState.ended || process.nextTick(c, this);
  }
  function c(d) {
    d.end();
  }
  return (
    Object.defineProperty(u.prototype, "destroyed", {
      enumerable: !1,
      get: function () {
        return this._readableState === void 0 || this._writableState === void 0
          ? !1
          : this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function (h) {
        this._readableState === void 0 ||
          this._writableState === void 0 ||
          ((this._readableState.destroyed = h),
          (this._writableState.destroyed = h));
      },
    }),
    ir
  );
}
var or = {},
  ln;
function un() {
  if (ln) return or;
  ln = 1;
  var t = Jn.Buffer,
    e =
      t.isEncoding ||
      function (m) {
        switch (((m = "" + m), m && m.toLowerCase())) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return !0;
          default:
            return !1;
        }
      };
  function r(m) {
    if (!m) return "utf8";
    for (var v; ; )
      switch (m) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return m;
        default:
          if (v) return;
          (m = ("" + m).toLowerCase()), (v = !0);
      }
  }
  function n(m) {
    var v = r(m);
    if (typeof v != "string" && (t.isEncoding === e || !e(m)))
      throw new Error("Unknown encoding: " + m);
    return v || m;
  }
  or.StringDecoder = s;
  function s(m) {
    this.encoding = n(m);
    var v;
    switch (this.encoding) {
      case "utf16le":
        (this.text = y), (this.end = S), (v = 4);
        break;
      case "utf8":
        (this.fillLast = c), (v = 4);
        break;
      case "base64":
        (this.text = k), (this.end = T), (v = 3);
        break;
      default:
        (this.write = C), (this.end = A);
        return;
    }
    (this.lastNeed = 0),
      (this.lastTotal = 0),
      (this.lastChar = t.allocUnsafe(v));
  }
  (s.prototype.write = function (m) {
    if (m.length === 0) return "";
    var v, B;
    if (this.lastNeed) {
      if (((v = this.fillLast(m)), v === void 0)) return "";
      (B = this.lastNeed), (this.lastNeed = 0);
    } else B = 0;
    return B < m.length ? (v ? v + this.text(m, B) : this.text(m, B)) : v || "";
  }),
    (s.prototype.end = h),
    (s.prototype.text = d),
    (s.prototype.fillLast = function (m) {
      if (this.lastNeed <= m.length)
        return (
          m.copy(
            this.lastChar,
            this.lastTotal - this.lastNeed,
            0,
            this.lastNeed,
          ),
          this.lastChar.toString(this.encoding, 0, this.lastTotal)
        );
      m.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, m.length),
        (this.lastNeed -= m.length);
    });
  function a(m) {
    return m <= 127
      ? 0
      : m >> 5 === 6
        ? 2
        : m >> 4 === 14
          ? 3
          : m >> 3 === 30
            ? 4
            : m >> 6 === 2
              ? -1
              : -2;
  }
  function u(m, v, B) {
    var O = v.length - 1;
    if (O < B) return 0;
    var L = a(v[O]);
    return L >= 0
      ? (L > 0 && (m.lastNeed = L - 1), L)
      : --O < B || L === -2
        ? 0
        : ((L = a(v[O])),
          L >= 0
            ? (L > 0 && (m.lastNeed = L - 2), L)
            : --O < B || L === -2
              ? 0
              : ((L = a(v[O])),
                L >= 0
                  ? (L > 0 && (L === 2 ? (L = 0) : (m.lastNeed = L - 3)), L)
                  : 0));
  }
  function l(m, v, B) {
    if ((v[0] & 192) !== 128) return (m.lastNeed = 0), "�";
    if (m.lastNeed > 1 && v.length > 1) {
      if ((v[1] & 192) !== 128) return (m.lastNeed = 1), "�";
      if (m.lastNeed > 2 && v.length > 2 && (v[2] & 192) !== 128)
        return (m.lastNeed = 2), "�";
    }
  }
  function c(m) {
    var v = this.lastTotal - this.lastNeed,
      B = l(this, m);
    if (B !== void 0) return B;
    if (this.lastNeed <= m.length)
      return (
        m.copy(this.lastChar, v, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    m.copy(this.lastChar, v, 0, m.length), (this.lastNeed -= m.length);
  }
  function d(m, v) {
    var B = u(this, m, v);
    if (!this.lastNeed) return m.toString("utf8", v);
    this.lastTotal = B;
    var O = m.length - (B - this.lastNeed);
    return m.copy(this.lastChar, 0, O), m.toString("utf8", v, O);
  }
  function h(m) {
    var v = m && m.length ? this.write(m) : "";
    return this.lastNeed ? v + "�" : v;
  }
  function y(m, v) {
    if ((m.length - v) % 2 === 0) {
      var B = m.toString("utf16le", v);
      if (B) {
        var O = B.charCodeAt(B.length - 1);
        if (O >= 55296 && O <= 56319)
          return (
            (this.lastNeed = 2),
            (this.lastTotal = 4),
            (this.lastChar[0] = m[m.length - 2]),
            (this.lastChar[1] = m[m.length - 1]),
            B.slice(0, -1)
          );
      }
      return B;
    }
    return (
      (this.lastNeed = 1),
      (this.lastTotal = 2),
      (this.lastChar[0] = m[m.length - 1]),
      m.toString("utf16le", v, m.length - 1)
    );
  }
  function S(m) {
    var v = m && m.length ? this.write(m) : "";
    if (this.lastNeed) {
      var B = this.lastTotal - this.lastNeed;
      return v + this.lastChar.toString("utf16le", 0, B);
    }
    return v;
  }
  function k(m, v) {
    var B = (m.length - v) % 3;
    return B === 0
      ? m.toString("base64", v)
      : ((this.lastNeed = 3 - B),
        (this.lastTotal = 3),
        B === 1
          ? (this.lastChar[0] = m[m.length - 1])
          : ((this.lastChar[0] = m[m.length - 2]),
            (this.lastChar[1] = m[m.length - 1])),
        m.toString("base64", v, m.length - B));
  }
  function T(m) {
    var v = m && m.length ? this.write(m) : "";
    return this.lastNeed
      ? v + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
      : v;
  }
  function C(m) {
    return m.toString(this.encoding);
  }
  function A(m) {
    return m && m.length ? this.write(m) : "";
  }
  return or;
}
var cn = dt.codes.ERR_STREAM_PREMATURE_CLOSE;
function ha(t) {
  var e = !1;
  return function () {
    if (!e) {
      e = !0;
      for (var r = arguments.length, n = new Array(r), s = 0; s < r; s++)
        n[s] = arguments[s];
      t.apply(this, n);
    }
  };
}
function pa() {}
function ga(t) {
  return t.setHeader && typeof t.abort == "function";
}
function ei(t, e, r) {
  if (typeof e == "function") return ei(t, null, e);
  e || (e = {}), (r = ha(r || pa));
  var n = e.readable || (e.readable !== !1 && t.readable),
    s = e.writable || (e.writable !== !1 && t.writable),
    a = function () {
      t.writable || l();
    },
    u = t._writableState && t._writableState.finished,
    l = function () {
      (s = !1), (u = !0), n || r.call(t);
    },
    c = t._readableState && t._readableState.endEmitted,
    d = function () {
      (n = !1), (c = !0), s || r.call(t);
    },
    h = function (T) {
      r.call(t, T);
    },
    y = function () {
      var T;
      if (n && !c)
        return (
          (!t._readableState || !t._readableState.ended) && (T = new cn()),
          r.call(t, T)
        );
      if (s && !u)
        return (
          (!t._writableState || !t._writableState.ended) && (T = new cn()),
          r.call(t, T)
        );
    },
    S = function () {
      t.req.on("finish", l);
    };
  return (
    ga(t)
      ? (t.on("complete", l),
        t.on("abort", y),
        t.req ? S() : t.on("request", S))
      : s && !t._writableState && (t.on("end", a), t.on("close", a)),
    t.on("end", d),
    t.on("finish", l),
    e.error !== !1 && t.on("error", h),
    t.on("close", y),
    function () {
      t.removeListener("complete", l),
        t.removeListener("abort", y),
        t.removeListener("request", S),
        t.req && t.req.removeListener("finish", l),
        t.removeListener("end", a),
        t.removeListener("close", a),
        t.removeListener("finish", l),
        t.removeListener("end", d),
        t.removeListener("error", h),
        t.removeListener("close", y);
    }
  );
}
var Br = ei,
  sr,
  fn;
function ba() {
  if (fn) return sr;
  fn = 1;
  var t;
  function e(B, O, L) {
    return (
      (O = r(O)),
      O in B
        ? Object.defineProperty(B, O, {
            value: L,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (B[O] = L),
      B
    );
  }
  function r(B) {
    var O = n(B, "string");
    return typeof O == "symbol" ? O : String(O);
  }
  function n(B, O) {
    if (typeof B != "object" || B === null) return B;
    var L = B[Symbol.toPrimitive];
    if (L !== void 0) {
      var F = L.call(B, O || "default");
      if (typeof F != "object") return F;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (O === "string" ? String : Number)(B);
  }
  var s = Br,
    a = Symbol("lastResolve"),
    u = Symbol("lastReject"),
    l = Symbol("error"),
    c = Symbol("ended"),
    d = Symbol("lastPromise"),
    h = Symbol("handlePromise"),
    y = Symbol("stream");
  function S(B, O) {
    return { value: B, done: O };
  }
  function k(B) {
    var O = B[a];
    if (O !== null) {
      var L = B[y].read();
      L !== null && ((B[d] = null), (B[a] = null), (B[u] = null), O(S(L, !1)));
    }
  }
  function T(B) {
    process.nextTick(k, B);
  }
  function C(B, O) {
    return function (L, F) {
      B.then(function () {
        if (O[c]) {
          L(S(void 0, !0));
          return;
        }
        O[h](L, F);
      }, F);
    };
  }
  var A = Object.getPrototypeOf(function () {}),
    m = Object.setPrototypeOf(
      ((t = {
        get stream() {
          return this[y];
        },
        next: function () {
          var O = this,
            L = this[l];
          if (L !== null) return Promise.reject(L);
          if (this[c]) return Promise.resolve(S(void 0, !0));
          if (this[y].destroyed)
            return new Promise(function (N, H) {
              process.nextTick(function () {
                O[l] ? H(O[l]) : N(S(void 0, !0));
              });
            });
          var F = this[d],
            j;
          if (F) j = new Promise(C(F, this));
          else {
            var q = this[y].read();
            if (q !== null) return Promise.resolve(S(q, !1));
            j = new Promise(this[h]);
          }
          return (this[d] = j), j;
        },
      }),
      e(t, Symbol.asyncIterator, function () {
        return this;
      }),
      e(t, "return", function () {
        var O = this;
        return new Promise(function (L, F) {
          O[y].destroy(null, function (j) {
            if (j) {
              F(j);
              return;
            }
            L(S(void 0, !0));
          });
        });
      }),
      t),
      A,
    ),
    v = function (O) {
      var L,
        F = Object.create(
          m,
          ((L = {}),
          e(L, y, { value: O, writable: !0 }),
          e(L, a, { value: null, writable: !0 }),
          e(L, u, { value: null, writable: !0 }),
          e(L, l, { value: null, writable: !0 }),
          e(L, c, { value: O._readableState.endEmitted, writable: !0 }),
          e(L, h, {
            value: function (q, N) {
              var H = F[y].read();
              H
                ? ((F[d] = null), (F[a] = null), (F[u] = null), q(S(H, !1)))
                : ((F[a] = q), (F[u] = N));
            },
            writable: !0,
          }),
          L),
        );
      return (
        (F[d] = null),
        s(O, function (j) {
          if (j && j.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var q = F[u];
            q !== null && ((F[d] = null), (F[a] = null), (F[u] = null), q(j)),
              (F[l] = j);
            return;
          }
          var N = F[a];
          N !== null &&
            ((F[d] = null), (F[a] = null), (F[u] = null), N(S(void 0, !0))),
            (F[c] = !0);
        }),
        O.on("readable", T.bind(null, F)),
        F
      );
    };
  return (sr = v), sr;
}
var ar, dn;
function ma() {
  return (
    dn ||
      ((dn = 1),
      (ar = function () {
        throw new Error("Readable.from is not available in the browser");
      })),
    ar
  );
}
var lr, hn;
function ti() {
  if (hn) return lr;
  (hn = 1), (lr = N);
  var t;
  (N.ReadableState = q), Gt.EventEmitter;
  var e = function (b, M) {
      return b.listeners(M).length;
    },
    r = Kn,
    n = wt.Buffer,
    s =
      (typeof window < "u" || typeof window < "u"
        ? window
        : typeof self < "u"
          ? self
          : {}
      ).Uint8Array || function () {};
  function a(g) {
    return n.from(g);
  }
  function u(g) {
    return n.isBuffer(g) || g instanceof s;
  }
  var l = Gt,
    c;
  l && l.debuglog ? (c = l.debuglog("stream")) : (c = function () {});
  var d = ea(),
    h = Xn,
    y = Qn,
    S = y.getHighWaterMark,
    k = dt.codes,
    T = k.ERR_INVALID_ARG_TYPE,
    C = k.ERR_STREAM_PUSH_AFTER_EOF,
    A = k.ERR_METHOD_NOT_IMPLEMENTED,
    m = k.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
    v,
    B,
    O;
  Pt(N, r);
  var L = h.errorOrDestroy,
    F = ["error", "close", "destroy", "pause", "resume"];
  function j(g, b, M) {
    if (typeof g.prependListener == "function") return g.prependListener(b, M);
    !g._events || !g._events[b]
      ? g.on(b, M)
      : Array.isArray(g._events[b])
        ? g._events[b].unshift(M)
        : (g._events[b] = [M, g._events[b]]);
  }
  function q(g, b, M) {
    (t = t || yt()),
      (g = g || {}),
      typeof M != "boolean" && (M = b instanceof t),
      (this.objectMode = !!g.objectMode),
      M && (this.objectMode = this.objectMode || !!g.readableObjectMode),
      (this.highWaterMark = S(this, g, "readableHighWaterMark", M)),
      (this.buffer = new d()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.paused = !0),
      (this.emitClose = g.emitClose !== !1),
      (this.autoDestroy = !!g.autoDestroy),
      (this.destroyed = !1),
      (this.defaultEncoding = g.defaultEncoding || "utf8"),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      g.encoding &&
        (v || (v = un().StringDecoder),
        (this.decoder = new v(g.encoding)),
        (this.encoding = g.encoding));
  }
  function N(g) {
    if (((t = t || yt()), !(this instanceof N))) return new N(g);
    var b = this instanceof t;
    (this._readableState = new q(g, this, b)),
      (this.readable = !0),
      g &&
        (typeof g.read == "function" && (this._read = g.read),
        typeof g.destroy == "function" && (this._destroy = g.destroy)),
      r.call(this);
  }
  Object.defineProperty(N.prototype, "destroyed", {
    enumerable: !1,
    get: function () {
      return this._readableState === void 0
        ? !1
        : this._readableState.destroyed;
    },
    set: function (b) {
      this._readableState && (this._readableState.destroyed = b);
    },
  }),
    (N.prototype.destroy = h.destroy),
    (N.prototype._undestroy = h.undestroy),
    (N.prototype._destroy = function (g, b) {
      b(g);
    }),
    (N.prototype.push = function (g, b) {
      var M = this._readableState,
        D;
      return (
        M.objectMode
          ? (D = !0)
          : typeof g == "string" &&
            ((b = b || M.defaultEncoding),
            b !== M.encoding && ((g = n.from(g, b)), (b = "")),
            (D = !0)),
        H(this, g, b, !1, D)
      );
    }),
    (N.prototype.unshift = function (g) {
      return H(this, g, null, !0, !1);
    });
  function H(g, b, M, D, me) {
    c("readableAddChunk", b);
    var $ = g._readableState;
    if (b === null) ($.reading = !1), G(g, $);
    else {
      var ae;
      if ((me || (ae = I($, b)), ae)) L(g, ae);
      else if ($.objectMode || (b && b.length > 0))
        if (
          (typeof b != "string" &&
            !$.objectMode &&
            Object.getPrototypeOf(b) !== n.prototype &&
            (b = a(b)),
          D)
        )
          $.endEmitted ? L(g, new m()) : re(g, $, b, !0);
        else if ($.ended) L(g, new C());
        else {
          if ($.destroyed) return !1;
          ($.reading = !1),
            $.decoder && !M
              ? ((b = $.decoder.write(b)),
                $.objectMode || b.length !== 0 ? re(g, $, b, !1) : X(g, $))
              : re(g, $, b, !1);
        }
      else D || (($.reading = !1), X(g, $));
    }
    return !$.ended && ($.length < $.highWaterMark || $.length === 0);
  }
  function re(g, b, M, D) {
    b.flowing && b.length === 0 && !b.sync
      ? ((b.awaitDrain = 0), g.emit("data", M))
      : ((b.length += b.objectMode ? 1 : M.length),
        D ? b.buffer.unshift(M) : b.buffer.push(M),
        b.needReadable && Y(g)),
      X(g, b);
  }
  function I(g, b) {
    var M;
    return (
      !u(b) &&
        typeof b != "string" &&
        b !== void 0 &&
        !g.objectMode &&
        (M = new T("chunk", ["string", "Buffer", "Uint8Array"], b)),
      M
    );
  }
  (N.prototype.isPaused = function () {
    return this._readableState.flowing === !1;
  }),
    (N.prototype.setEncoding = function (g) {
      v || (v = un().StringDecoder);
      var b = new v(g);
      (this._readableState.decoder = b),
        (this._readableState.encoding = this._readableState.decoder.encoding);
      for (var M = this._readableState.buffer.head, D = ""; M !== null; )
        (D += b.write(M.data)), (M = M.next);
      return (
        this._readableState.buffer.clear(),
        D !== "" && this._readableState.buffer.push(D),
        (this._readableState.length = D.length),
        this
      );
    });
  var W = 1073741824;
  function U(g) {
    return (
      g >= W
        ? (g = W)
        : (g--,
          (g |= g >>> 1),
          (g |= g >>> 2),
          (g |= g >>> 4),
          (g |= g >>> 8),
          (g |= g >>> 16),
          g++),
      g
    );
  }
  function V(g, b) {
    return g <= 0 || (b.length === 0 && b.ended)
      ? 0
      : b.objectMode
        ? 1
        : g !== g
          ? b.flowing && b.length
            ? b.buffer.head.data.length
            : b.length
          : (g > b.highWaterMark && (b.highWaterMark = U(g)),
            g <= b.length
              ? g
              : b.ended
                ? b.length
                : ((b.needReadable = !0), 0));
  }
  N.prototype.read = function (g) {
    c("read", g), (g = parseInt(g, 10));
    var b = this._readableState,
      M = g;
    if (
      (g !== 0 && (b.emittedReadable = !1),
      g === 0 &&
        b.needReadable &&
        ((b.highWaterMark !== 0 ? b.length >= b.highWaterMark : b.length > 0) ||
          b.ended))
    )
      return (
        c("read: emitReadable", b.length, b.ended),
        b.length === 0 && b.ended ? P(this) : Y(this),
        null
      );
    if (((g = V(g, b)), g === 0 && b.ended))
      return b.length === 0 && P(this), null;
    var D = b.needReadable;
    c("need readable", D),
      (b.length === 0 || b.length - g < b.highWaterMark) &&
        ((D = !0), c("length less than watermark", D)),
      b.ended || b.reading
        ? ((D = !1), c("reading or ended", D))
        : D &&
          (c("do read"),
          (b.reading = !0),
          (b.sync = !0),
          b.length === 0 && (b.needReadable = !0),
          this._read(b.highWaterMark),
          (b.sync = !1),
          b.reading || (g = V(M, b)));
    var me;
    return (
      g > 0 ? (me = w(g, b)) : (me = null),
      me === null
        ? ((b.needReadable = b.length <= b.highWaterMark), (g = 0))
        : ((b.length -= g), (b.awaitDrain = 0)),
      b.length === 0 &&
        (b.ended || (b.needReadable = !0), M !== g && b.ended && P(this)),
      me !== null && this.emit("data", me),
      me
    );
  };
  function G(g, b) {
    if ((c("onEofChunk"), !b.ended)) {
      if (b.decoder) {
        var M = b.decoder.end();
        M &&
          M.length &&
          (b.buffer.push(M), (b.length += b.objectMode ? 1 : M.length));
      }
      (b.ended = !0),
        b.sync
          ? Y(g)
          : ((b.needReadable = !1),
            b.emittedReadable || ((b.emittedReadable = !0), te(g)));
    }
  }
  function Y(g) {
    var b = g._readableState;
    c("emitReadable", b.needReadable, b.emittedReadable),
      (b.needReadable = !1),
      b.emittedReadable ||
        (c("emitReadable", b.flowing),
        (b.emittedReadable = !0),
        process.nextTick(te, g));
  }
  function te(g) {
    var b = g._readableState;
    c("emitReadable_", b.destroyed, b.length, b.ended),
      !b.destroyed &&
        (b.length || b.ended) &&
        (g.emit("readable"), (b.emittedReadable = !1)),
      (b.needReadable = !b.flowing && !b.ended && b.length <= b.highWaterMark),
      R(g);
  }
  function X(g, b) {
    b.readingMore || ((b.readingMore = !0), process.nextTick(le, g, b));
  }
  function le(g, b) {
    for (
      ;
      !b.reading &&
      !b.ended &&
      (b.length < b.highWaterMark || (b.flowing && b.length === 0));

    ) {
      var M = b.length;
      if ((c("maybeReadMore read 0"), g.read(0), M === b.length)) break;
    }
    b.readingMore = !1;
  }
  (N.prototype._read = function (g) {
    L(this, new A("_read()"));
  }),
    (N.prototype.pipe = function (g, b) {
      var M = this,
        D = this._readableState;
      switch (D.pipesCount) {
        case 0:
          D.pipes = g;
          break;
        case 1:
          D.pipes = [D.pipes, g];
          break;
        default:
          D.pipes.push(g);
          break;
      }
      (D.pipesCount += 1), c("pipe count=%d opts=%j", D.pipesCount, b);
      var me =
          (!b || b.end !== !1) && g !== process.stdout && g !== process.stderr,
        $ = me ? $e : ot;
      D.endEmitted ? process.nextTick($) : M.once("end", $), g.on("unpipe", ae);
      function ae(f, i) {
        c("onunpipe"),
          f === M && i && i.hasUnpiped === !1 && ((i.hasUnpiped = !0), pt());
      }
      function $e() {
        c("onend"), g.end();
      }
      var ht = K(M);
      g.on("drain", ht);
      var vt = !1;
      function pt() {
        c("cleanup"),
          g.removeListener("close", Et),
          g.removeListener("finish", Te),
          g.removeListener("drain", ht),
          g.removeListener("error", it),
          g.removeListener("unpipe", ae),
          M.removeListener("end", $e),
          M.removeListener("end", ot),
          M.removeListener("data", Re),
          (vt = !0),
          D.awaitDrain &&
            (!g._writableState || g._writableState.needDrain) &&
            ht();
      }
      M.on("data", Re);
      function Re(f) {
        c("ondata");
        var i = g.write(f);
        c("dest.write", i),
          i === !1 &&
            (((D.pipesCount === 1 && D.pipes === g) ||
              (D.pipesCount > 1 && Q(D.pipes, g) !== -1)) &&
              !vt &&
              (c("false write response, pause", D.awaitDrain), D.awaitDrain++),
            M.pause());
      }
      function it(f) {
        c("onerror", f),
          ot(),
          g.removeListener("error", it),
          e(g, "error") === 0 && L(g, f);
      }
      j(g, "error", it);
      function Et() {
        g.removeListener("finish", Te), ot();
      }
      g.once("close", Et);
      function Te() {
        c("onfinish"), g.removeListener("close", Et), ot();
      }
      g.once("finish", Te);
      function ot() {
        c("unpipe"), M.unpipe(g);
      }
      return g.emit("pipe", M), D.flowing || (c("pipe resume"), M.resume()), g;
    });
  function K(g) {
    return function () {
      var M = g._readableState;
      c("pipeOnDrain", M.awaitDrain),
        M.awaitDrain && M.awaitDrain--,
        M.awaitDrain === 0 && e(g, "data") && ((M.flowing = !0), R(g));
    };
  }
  (N.prototype.unpipe = function (g) {
    var b = this._readableState,
      M = { hasUnpiped: !1 };
    if (b.pipesCount === 0) return this;
    if (b.pipesCount === 1)
      return g && g !== b.pipes
        ? this
        : (g || (g = b.pipes),
          (b.pipes = null),
          (b.pipesCount = 0),
          (b.flowing = !1),
          g && g.emit("unpipe", this, M),
          this);
    if (!g) {
      var D = b.pipes,
        me = b.pipesCount;
      (b.pipes = null), (b.pipesCount = 0), (b.flowing = !1);
      for (var $ = 0; $ < me; $++)
        D[$].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var ae = Q(b.pipes, g);
    return ae === -1
      ? this
      : (b.pipes.splice(ae, 1),
        (b.pipesCount -= 1),
        b.pipesCount === 1 && (b.pipes = b.pipes[0]),
        g.emit("unpipe", this, M),
        this);
  }),
    (N.prototype.on = function (g, b) {
      var M = r.prototype.on.call(this, g, b),
        D = this._readableState;
      return (
        g === "data"
          ? ((D.readableListening = this.listenerCount("readable") > 0),
            D.flowing !== !1 && this.resume())
          : g === "readable" &&
            !D.endEmitted &&
            !D.readableListening &&
            ((D.readableListening = D.needReadable = !0),
            (D.flowing = !1),
            (D.emittedReadable = !1),
            c("on readable", D.length, D.reading),
            D.length ? Y(this) : D.reading || process.nextTick(ue, this)),
        M
      );
    }),
    (N.prototype.addListener = N.prototype.on),
    (N.prototype.removeListener = function (g, b) {
      var M = r.prototype.removeListener.call(this, g, b);
      return g === "readable" && process.nextTick(Z, this), M;
    }),
    (N.prototype.removeAllListeners = function (g) {
      var b = r.prototype.removeAllListeners.apply(this, arguments);
      return (g === "readable" || g === void 0) && process.nextTick(Z, this), b;
    });
  function Z(g) {
    var b = g._readableState;
    (b.readableListening = g.listenerCount("readable") > 0),
      b.resumeScheduled && !b.paused
        ? (b.flowing = !0)
        : g.listenerCount("data") > 0 && g.resume();
  }
  function ue(g) {
    c("readable nexttick read 0"), g.read(0);
  }
  N.prototype.resume = function () {
    var g = this._readableState;
    return (
      g.flowing ||
        (c("resume"), (g.flowing = !g.readableListening), Fe(this, g)),
      (g.paused = !1),
      this
    );
  };
  function Fe(g, b) {
    b.resumeScheduled || ((b.resumeScheduled = !0), process.nextTick(Je, g, b));
  }
  function Je(g, b) {
    c("resume", b.reading),
      b.reading || g.read(0),
      (b.resumeScheduled = !1),
      g.emit("resume"),
      R(g),
      b.flowing && !b.reading && g.read(0);
  }
  N.prototype.pause = function () {
    return (
      c("call pause flowing=%j", this._readableState.flowing),
      this._readableState.flowing !== !1 &&
        (c("pause"), (this._readableState.flowing = !1), this.emit("pause")),
      (this._readableState.paused = !0),
      this
    );
  };
  function R(g) {
    var b = g._readableState;
    for (c("flow", b.flowing); b.flowing && g.read() !== null; );
  }
  (N.prototype.wrap = function (g) {
    var b = this,
      M = this._readableState,
      D = !1;
    g.on("end", function () {
      if ((c("wrapped end"), M.decoder && !M.ended)) {
        var ae = M.decoder.end();
        ae && ae.length && b.push(ae);
      }
      b.push(null);
    }),
      g.on("data", function (ae) {
        if (
          (c("wrapped data"),
          M.decoder && (ae = M.decoder.write(ae)),
          !(M.objectMode && ae == null) &&
            !(!M.objectMode && (!ae || !ae.length)))
        ) {
          var $e = b.push(ae);
          $e || ((D = !0), g.pause());
        }
      });
    for (var me in g)
      this[me] === void 0 &&
        typeof g[me] == "function" &&
        (this[me] = (function ($e) {
          return function () {
            return g[$e].apply(g, arguments);
          };
        })(me));
    for (var $ = 0; $ < F.length; $++) g.on(F[$], this.emit.bind(this, F[$]));
    return (
      (this._read = function (ae) {
        c("wrapped _read", ae), D && ((D = !1), g.resume());
      }),
      this
    );
  }),
    typeof Symbol == "function" &&
      (N.prototype[Symbol.asyncIterator] = function () {
        return B === void 0 && (B = ba()), B(this);
      }),
    Object.defineProperty(N.prototype, "readableHighWaterMark", {
      enumerable: !1,
      get: function () {
        return this._readableState.highWaterMark;
      },
    }),
    Object.defineProperty(N.prototype, "readableBuffer", {
      enumerable: !1,
      get: function () {
        return this._readableState && this._readableState.buffer;
      },
    }),
    Object.defineProperty(N.prototype, "readableFlowing", {
      enumerable: !1,
      get: function () {
        return this._readableState.flowing;
      },
      set: function (b) {
        this._readableState && (this._readableState.flowing = b);
      },
    }),
    (N._fromList = w),
    Object.defineProperty(N.prototype, "readableLength", {
      enumerable: !1,
      get: function () {
        return this._readableState.length;
      },
    });
  function w(g, b) {
    if (b.length === 0) return null;
    var M;
    return (
      b.objectMode
        ? (M = b.buffer.shift())
        : !g || g >= b.length
          ? (b.decoder
              ? (M = b.buffer.join(""))
              : b.buffer.length === 1
                ? (M = b.buffer.first())
                : (M = b.buffer.concat(b.length)),
            b.buffer.clear())
          : (M = b.buffer.consume(g, b.decoder)),
      M
    );
  }
  function P(g) {
    var b = g._readableState;
    c("endReadable", b.endEmitted),
      b.endEmitted || ((b.ended = !0), process.nextTick(z, b, g));
  }
  function z(g, b) {
    if (
      (c("endReadableNT", g.endEmitted, g.length),
      !g.endEmitted &&
        g.length === 0 &&
        ((g.endEmitted = !0), (b.readable = !1), b.emit("end"), g.autoDestroy))
    ) {
      var M = b._writableState;
      (!M || (M.autoDestroy && M.finished)) && b.destroy();
    }
  }
  typeof Symbol == "function" &&
    (N.from = function (g, b) {
      return O === void 0 && (O = ma()), O(N, g, b);
    });
  function Q(g, b) {
    for (var M = 0, D = g.length; M < D; M++) if (g[M] === b) return M;
    return -1;
  }
  return lr;
}
var ri = Ze,
  Yt = dt.codes,
  ya = Yt.ERR_METHOD_NOT_IMPLEMENTED,
  _a = Yt.ERR_MULTIPLE_CALLBACK,
  wa = Yt.ERR_TRANSFORM_ALREADY_TRANSFORMING,
  va = Yt.ERR_TRANSFORM_WITH_LENGTH_0,
  Jt = yt();
Pt(Ze, Jt);
function Ea(t, e) {
  var r = this._transformState;
  r.transforming = !1;
  var n = r.writecb;
  if (n === null) return this.emit("error", new _a());
  (r.writechunk = null), (r.writecb = null), e != null && this.push(e), n(t);
  var s = this._readableState;
  (s.reading = !1),
    (s.needReadable || s.length < s.highWaterMark) &&
      this._read(s.highWaterMark);
}
function Ze(t) {
  if (!(this instanceof Ze)) return new Ze(t);
  Jt.call(this, t),
    (this._transformState = {
      afterTransform: Ea.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null,
    }),
    (this._readableState.needReadable = !0),
    (this._readableState.sync = !1),
    t &&
      (typeof t.transform == "function" && (this._transform = t.transform),
      typeof t.flush == "function" && (this._flush = t.flush)),
    this.on("prefinish", Ca);
}
function Ca() {
  var t = this;
  typeof this._flush == "function" && !this._readableState.destroyed
    ? this._flush(function (e, r) {
        pn(t, e, r);
      })
    : pn(this, null, null);
}
Ze.prototype.push = function (t, e) {
  return (
    (this._transformState.needTransform = !1),
    Jt.prototype.push.call(this, t, e)
  );
};
Ze.prototype._transform = function (t, e, r) {
  r(new ya("_transform()"));
};
Ze.prototype._write = function (t, e, r) {
  var n = this._transformState;
  if (
    ((n.writecb = r),
    (n.writechunk = t),
    (n.writeencoding = e),
    !n.transforming)
  ) {
    var s = this._readableState;
    (n.needTransform || s.needReadable || s.length < s.highWaterMark) &&
      this._read(s.highWaterMark);
  }
};
Ze.prototype._read = function (t) {
  var e = this._transformState;
  e.writechunk !== null && !e.transforming
    ? ((e.transforming = !0),
      this._transform(e.writechunk, e.writeencoding, e.afterTransform))
    : (e.needTransform = !0);
};
Ze.prototype._destroy = function (t, e) {
  Jt.prototype._destroy.call(this, t, function (r) {
    e(r);
  });
};
function pn(t, e, r) {
  if (e) return t.emit("error", e);
  if ((r != null && t.push(r), t._writableState.length)) throw new va();
  if (t._transformState.transforming) throw new wa();
  return t.push(null);
}
var Ra = Nt,
  ni = ri;
Pt(Nt, ni);
function Nt(t) {
  if (!(this instanceof Nt)) return new Nt(t);
  ni.call(this, t);
}
Nt.prototype._transform = function (t, e, r) {
  r(null, t);
};
var ur;
function Sa(t) {
  var e = !1;
  return function () {
    e || ((e = !0), t.apply(void 0, arguments));
  };
}
var ii = dt.codes,
  Aa = ii.ERR_MISSING_ARGS,
  xa = ii.ERR_STREAM_DESTROYED;
function gn(t) {
  if (t) throw t;
}
function Ta(t) {
  return t.setHeader && typeof t.abort == "function";
}
function ka(t, e, r, n) {
  n = Sa(n);
  var s = !1;
  t.on("close", function () {
    s = !0;
  }),
    ur === void 0 && (ur = Br),
    ur(t, { readable: e, writable: r }, function (u) {
      if (u) return n(u);
      (s = !0), n();
    });
  var a = !1;
  return function (u) {
    if (!s && !a) {
      if (((a = !0), Ta(t))) return t.abort();
      if (typeof t.destroy == "function") return t.destroy();
      n(u || new xa("pipe"));
    }
  };
}
function bn(t) {
  t();
}
function Ia(t, e) {
  return t.pipe(e);
}
function Ma(t) {
  return !t.length || typeof t[t.length - 1] != "function" ? gn : t.pop();
}
function Na() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  var n = Ma(e);
  if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2))
    throw new Aa("streams");
  var s,
    a = e.map(function (u, l) {
      var c = l < e.length - 1,
        d = l > 0;
      return ka(u, c, d, function (h) {
        s || (s = h), h && a.forEach(bn), !c && (a.forEach(bn), n(s));
      });
    });
  return e.reduce(Ia);
}
var Ba = Na;
(function (t, e) {
  (e = t.exports = ti()),
    (e.Stream = e),
    (e.Readable = e),
    (e.Writable = $n()),
    (e.Duplex = yt()),
    (e.Transform = ri),
    (e.PassThrough = Ra),
    (e.finished = Br),
    (e.pipeline = Ba);
})(Er, Er.exports);
var Fa = Er.exports;
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ let mn;
var Oa =
  typeof queueMicrotask == "function"
    ? queueMicrotask.bind(window)
    : (t) =>
        (mn || (mn = Promise.resolve())).then(t).catch((e) =>
          setTimeout(() => {
            throw e;
          }, 0),
        );
function yn(t, e) {
  for (const r in e)
    Object.defineProperty(t, r, {
      value: e[r],
      enumerable: !0,
      configurable: !0,
    });
  return t;
}
function Pa(t, e, r) {
  if (!t || typeof t == "string")
    throw new TypeError("Please pass an Error to err-code");
  r || (r = {}), typeof e == "object" && ((r = e), (e = "")), e && (r.code = e);
  try {
    return yn(t, r);
  } catch {
    (r.message = t.message), (r.stack = t.stack);
    const s = function () {};
    return (
      (s.prototype = Object.create(Object.getPrototypeOf(t))), yn(new s(), r)
    );
  }
}
var La = Pa;
/*! simple-peer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ const Da =
    Ls("simple-peer"),
  oi = Ds,
  _n = Zs,
  Ua = Fa,
  cr = Oa,
  ie = La,
  { Buffer: ja } = wt,
  fr = 64 * 1024,
  Wa = 5 * 1e3,
  qa = 5 * 1e3;
function wn(t) {
  return t.replace(/a=ice-options:trickle\s\n/g, "");
}
function za(t) {
  console.warn(t);
}
class ct extends Ua.Duplex {
  constructor(e) {
    if (
      ((e = Object.assign({ allowHalfOpen: !1 }, e)),
      super(e),
      (this._id = _n(4).toString("hex").slice(0, 7)),
      this._debug("new peer %o", e),
      (this.channelName = e.initiator
        ? e.channelName || _n(20).toString("hex")
        : null),
      (this.initiator = e.initiator || !1),
      (this.channelConfig = e.channelConfig || ct.channelConfig),
      (this.channelNegotiated = this.channelConfig.negotiated),
      (this.config = Object.assign({}, ct.config, e.config)),
      (this.offerOptions = e.offerOptions || {}),
      (this.answerOptions = e.answerOptions || {}),
      (this.sdpTransform = e.sdpTransform || ((r) => r)),
      (this.streams = e.streams || (e.stream ? [e.stream] : [])),
      (this.trickle = e.trickle !== void 0 ? e.trickle : !0),
      (this.allowHalfTrickle =
        e.allowHalfTrickle !== void 0 ? e.allowHalfTrickle : !1),
      (this.iceCompleteTimeout = e.iceCompleteTimeout || Wa),
      (this.destroyed = !1),
      (this.destroying = !1),
      (this._connected = !1),
      (this.remoteAddress = void 0),
      (this.remoteFamily = void 0),
      (this.remotePort = void 0),
      (this.localAddress = void 0),
      (this.localFamily = void 0),
      (this.localPort = void 0),
      (this._wrtc = e.wrtc && typeof e.wrtc == "object" ? e.wrtc : oi()),
      !this._wrtc)
    )
      throw ie(
        typeof window > "u"
          ? new Error(
              "No WebRTC support: Specify `opts.wrtc` option in this environment",
            )
          : new Error("No WebRTC support: Not a supported browser"),
        "ERR_WEBRTC_SUPPORT",
      );
    (this._pcReady = !1),
      (this._channelReady = !1),
      (this._iceComplete = !1),
      (this._iceCompleteTimer = null),
      (this._channel = null),
      (this._pendingCandidates = []),
      (this._isNegotiating = !1),
      (this._firstNegotiation = !0),
      (this._batchedNegotiation = !1),
      (this._queuedNegotiation = !1),
      (this._sendersAwaitingStable = []),
      (this._senderMap = new Map()),
      (this._closingInterval = null),
      (this._remoteTracks = []),
      (this._remoteStreams = []),
      (this._chunk = null),
      (this._cb = null),
      (this._interval = null);
    try {
      this._pc = new this._wrtc.RTCPeerConnection(this.config);
    } catch (r) {
      this.destroy(ie(r, "ERR_PC_CONSTRUCTOR"));
      return;
    }
    (this._isReactNativeWebrtc = typeof this._pc._peerConnectionId == "number"),
      (this._pc.oniceconnectionstatechange = () => {
        this._onIceStateChange();
      }),
      (this._pc.onicegatheringstatechange = () => {
        this._onIceStateChange();
      }),
      (this._pc.onconnectionstatechange = () => {
        this._onConnectionStateChange();
      }),
      (this._pc.onsignalingstatechange = () => {
        this._onSignalingStateChange();
      }),
      (this._pc.onicecandidate = (r) => {
        this._onIceCandidate(r);
      }),
      typeof this._pc.peerIdentity == "object" &&
        this._pc.peerIdentity.catch((r) => {
          this.destroy(ie(r, "ERR_PC_PEER_IDENTITY"));
        }),
      this.initiator || this.channelNegotiated
        ? this._setupData({
            channel: this._pc.createDataChannel(
              this.channelName,
              this.channelConfig,
            ),
          })
        : (this._pc.ondatachannel = (r) => {
            this._setupData(r);
          }),
      this.streams &&
        this.streams.forEach((r) => {
          this.addStream(r);
        }),
      (this._pc.ontrack = (r) => {
        this._onTrack(r);
      }),
      this._debug("initial negotiation"),
      this._needsNegotiation(),
      (this._onFinishBound = () => {
        this._onFinish();
      }),
      this.once("finish", this._onFinishBound);
  }
  get bufferSize() {
    return (this._channel && this._channel.bufferedAmount) || 0;
  }
  get connected() {
    return this._connected && this._channel.readyState === "open";
  }
  address() {
    return {
      port: this.localPort,
      family: this.localFamily,
      address: this.localAddress,
    };
  }
  signal(e) {
    if (!this.destroying) {
      if (this.destroyed)
        throw ie(
          new Error("cannot signal after peer is destroyed"),
          "ERR_DESTROYED",
        );
      if (typeof e == "string")
        try {
          e = JSON.parse(e);
        } catch {
          e = {};
        }
      this._debug("signal()"),
        e.renegotiate &&
          this.initiator &&
          (this._debug("got request to renegotiate"), this._needsNegotiation()),
        e.transceiverRequest &&
          this.initiator &&
          (this._debug("got request for transceiver"),
          this.addTransceiver(
            e.transceiverRequest.kind,
            e.transceiverRequest.init,
          )),
        e.candidate &&
          (this._pc.remoteDescription && this._pc.remoteDescription.type
            ? this._addIceCandidate(e.candidate)
            : this._pendingCandidates.push(e.candidate)),
        e.sdp &&
          this._pc
            .setRemoteDescription(new this._wrtc.RTCSessionDescription(e))
            .then(() => {
              this.destroyed ||
                (this._pendingCandidates.forEach((r) => {
                  this._addIceCandidate(r);
                }),
                (this._pendingCandidates = []),
                this._pc.remoteDescription.type === "offer" &&
                  this._createAnswer());
            })
            .catch((r) => {
              this.destroy(ie(r, "ERR_SET_REMOTE_DESCRIPTION"));
            }),
        !e.sdp &&
          !e.candidate &&
          !e.renegotiate &&
          !e.transceiverRequest &&
          this.destroy(
            ie(
              new Error("signal() called with invalid signal data"),
              "ERR_SIGNALING",
            ),
          );
    }
  }
  _addIceCandidate(e) {
    const r = new this._wrtc.RTCIceCandidate(e);
    this._pc.addIceCandidate(r).catch((n) => {
      !r.address || r.address.endsWith(".local")
        ? za("Ignoring unsupported ICE candidate.")
        : this.destroy(ie(n, "ERR_ADD_ICE_CANDIDATE"));
    });
  }
  send(e) {
    if (!this.destroying) {
      if (this.destroyed)
        throw ie(
          new Error("cannot send after peer is destroyed"),
          "ERR_DESTROYED",
        );
      this._channel.send(e);
    }
  }
  addTransceiver(e, r) {
    if (!this.destroying) {
      if (this.destroyed)
        throw ie(
          new Error("cannot addTransceiver after peer is destroyed"),
          "ERR_DESTROYED",
        );
      if ((this._debug("addTransceiver()"), this.initiator))
        try {
          this._pc.addTransceiver(e, r), this._needsNegotiation();
        } catch (n) {
          this.destroy(ie(n, "ERR_ADD_TRANSCEIVER"));
        }
      else
        this.emit("signal", {
          type: "transceiverRequest",
          transceiverRequest: { kind: e, init: r },
        });
    }
  }
  addStream(e) {
    if (!this.destroying) {
      if (this.destroyed)
        throw ie(
          new Error("cannot addStream after peer is destroyed"),
          "ERR_DESTROYED",
        );
      this._debug("addStream()"),
        e.getTracks().forEach((r) => {
          this.addTrack(r, e);
        });
    }
  }
  addTrack(e, r) {
    if (this.destroying) return;
    if (this.destroyed)
      throw ie(
        new Error("cannot addTrack after peer is destroyed"),
        "ERR_DESTROYED",
      );
    this._debug("addTrack()");
    const n = this._senderMap.get(e) || new Map();
    let s = n.get(r);
    if (!s)
      (s = this._pc.addTrack(e, r)),
        n.set(r, s),
        this._senderMap.set(e, n),
        this._needsNegotiation();
    else
      throw s.removed
        ? ie(
            new Error(
              "Track has been removed. You should enable/disable tracks that you want to re-add.",
            ),
            "ERR_SENDER_REMOVED",
          )
        : ie(
            new Error("Track has already been added to that stream."),
            "ERR_SENDER_ALREADY_ADDED",
          );
  }
  replaceTrack(e, r, n) {
    if (this.destroying) return;
    if (this.destroyed)
      throw ie(
        new Error("cannot replaceTrack after peer is destroyed"),
        "ERR_DESTROYED",
      );
    this._debug("replaceTrack()");
    const s = this._senderMap.get(e),
      a = s ? s.get(n) : null;
    if (!a)
      throw ie(
        new Error("Cannot replace track that was never added."),
        "ERR_TRACK_NOT_ADDED",
      );
    r && this._senderMap.set(r, s),
      a.replaceTrack != null
        ? a.replaceTrack(r)
        : this.destroy(
            ie(
              new Error("replaceTrack is not supported in this browser"),
              "ERR_UNSUPPORTED_REPLACETRACK",
            ),
          );
  }
  removeTrack(e, r) {
    if (this.destroying) return;
    if (this.destroyed)
      throw ie(
        new Error("cannot removeTrack after peer is destroyed"),
        "ERR_DESTROYED",
      );
    this._debug("removeSender()");
    const n = this._senderMap.get(e),
      s = n ? n.get(r) : null;
    if (!s)
      throw ie(
        new Error("Cannot remove track that was never added."),
        "ERR_TRACK_NOT_ADDED",
      );
    try {
      (s.removed = !0), this._pc.removeTrack(s);
    } catch (a) {
      a.name === "NS_ERROR_UNEXPECTED"
        ? this._sendersAwaitingStable.push(s)
        : this.destroy(ie(a, "ERR_REMOVE_TRACK"));
    }
    this._needsNegotiation();
  }
  removeStream(e) {
    if (!this.destroying) {
      if (this.destroyed)
        throw ie(
          new Error("cannot removeStream after peer is destroyed"),
          "ERR_DESTROYED",
        );
      this._debug("removeSenders()"),
        e.getTracks().forEach((r) => {
          this.removeTrack(r, e);
        });
    }
  }
  _needsNegotiation() {
    this._debug("_needsNegotiation"),
      !this._batchedNegotiation &&
        ((this._batchedNegotiation = !0),
        cr(() => {
          (this._batchedNegotiation = !1),
            this.initiator || !this._firstNegotiation
              ? (this._debug("starting batched negotiation"), this.negotiate())
              : this._debug(
                  "non-initiator initial negotiation request discarded",
                ),
            (this._firstNegotiation = !1);
        }));
  }
  negotiate() {
    if (!this.destroying) {
      if (this.destroyed)
        throw ie(
          new Error("cannot negotiate after peer is destroyed"),
          "ERR_DESTROYED",
        );
      this.initiator
        ? this._isNegotiating
          ? ((this._queuedNegotiation = !0),
            this._debug("already negotiating, queueing"))
          : (this._debug("start negotiation"),
            setTimeout(() => {
              this._createOffer();
            }, 0))
        : this._isNegotiating
          ? ((this._queuedNegotiation = !0),
            this._debug("already negotiating, queueing"))
          : (this._debug("requesting negotiation from initiator"),
            this.emit("signal", { type: "renegotiate", renegotiate: !0 })),
        (this._isNegotiating = !0);
    }
  }
  destroy(e) {
    this._destroy(e, () => {});
  }
  _destroy(e, r) {
    this.destroyed ||
      this.destroying ||
      ((this.destroying = !0),
      this._debug("destroying (error: %s)", e && (e.message || e)),
      cr(() => {
        if (
          ((this.destroyed = !0),
          (this.destroying = !1),
          this._debug("destroy (error: %s)", e && (e.message || e)),
          (this.readable = this.writable = !1),
          this._readableState.ended || this.push(null),
          this._writableState.finished || this.end(),
          (this._connected = !1),
          (this._pcReady = !1),
          (this._channelReady = !1),
          (this._remoteTracks = null),
          (this._remoteStreams = null),
          (this._senderMap = null),
          clearInterval(this._closingInterval),
          (this._closingInterval = null),
          clearInterval(this._interval),
          (this._interval = null),
          (this._chunk = null),
          (this._cb = null),
          this._onFinishBound &&
            this.removeListener("finish", this._onFinishBound),
          (this._onFinishBound = null),
          this._channel)
        ) {
          try {
            this._channel.close();
          } catch {}
          (this._channel.onmessage = null),
            (this._channel.onopen = null),
            (this._channel.onclose = null),
            (this._channel.onerror = null);
        }
        if (this._pc) {
          try {
            this._pc.close();
          } catch {}
          (this._pc.oniceconnectionstatechange = null),
            (this._pc.onicegatheringstatechange = null),
            (this._pc.onsignalingstatechange = null),
            (this._pc.onicecandidate = null),
            (this._pc.ontrack = null),
            (this._pc.ondatachannel = null);
        }
        (this._pc = null),
          (this._channel = null),
          e && this.emit("error", e),
          this.emit("close"),
          r();
      }));
  }
  _setupData(e) {
    if (!e.channel)
      return this.destroy(
        ie(
          new Error("Data channel event is missing `channel` property"),
          "ERR_DATA_CHANNEL",
        ),
      );
    (this._channel = e.channel),
      (this._channel.binaryType = "arraybuffer"),
      typeof this._channel.bufferedAmountLowThreshold == "number" &&
        (this._channel.bufferedAmountLowThreshold = fr),
      (this.channelName = this._channel.label),
      (this._channel.onmessage = (n) => {
        this._onChannelMessage(n);
      }),
      (this._channel.onbufferedamountlow = () => {
        this._onChannelBufferedAmountLow();
      }),
      (this._channel.onopen = () => {
        this._onChannelOpen();
      }),
      (this._channel.onclose = () => {
        this._onChannelClose();
      }),
      (this._channel.onerror = (n) => {
        const s =
          n.error instanceof Error
            ? n.error
            : new Error(
                `Datachannel error: ${n.message} ${n.filename}:${n.lineno}:${n.colno}`,
              );
        this.destroy(ie(s, "ERR_DATA_CHANNEL"));
      });
    let r = !1;
    this._closingInterval = setInterval(() => {
      this._channel && this._channel.readyState === "closing"
        ? (r && this._onChannelClose(), (r = !0))
        : (r = !1);
    }, qa);
  }
  _read() {}
  _write(e, r, n) {
    if (this.destroyed)
      return n(
        ie(
          new Error("cannot write after peer is destroyed"),
          "ERR_DATA_CHANNEL",
        ),
      );
    if (this._connected) {
      try {
        this.send(e);
      } catch (s) {
        return this.destroy(ie(s, "ERR_DATA_CHANNEL"));
      }
      this._channel.bufferedAmount > fr
        ? (this._debug(
            "start backpressure: bufferedAmount %d",
            this._channel.bufferedAmount,
          ),
          (this._cb = n))
        : n(null);
    } else
      this._debug("write before connect"), (this._chunk = e), (this._cb = n);
  }
  _onFinish() {
    if (this.destroyed) return;
    const e = () => {
      setTimeout(() => this.destroy(), 1e3);
    };
    this._connected ? e() : this.once("connect", e);
  }
  _startIceCompleteTimeout() {
    this.destroyed ||
      this._iceCompleteTimer ||
      (this._debug("started iceComplete timeout"),
      (this._iceCompleteTimer = setTimeout(() => {
        this._iceComplete ||
          ((this._iceComplete = !0),
          this._debug("iceComplete timeout completed"),
          this.emit("iceTimeout"),
          this.emit("_iceComplete"));
      }, this.iceCompleteTimeout)));
  }
  _createOffer() {
    this.destroyed ||
      this._pc
        .createOffer(this.offerOptions)
        .then((e) => {
          if (this.destroyed) return;
          !this.trickle && !this.allowHalfTrickle && (e.sdp = wn(e.sdp)),
            (e.sdp = this.sdpTransform(e.sdp));
          const r = () => {
              if (this.destroyed) return;
              const a = this._pc.localDescription || e;
              this._debug("signal"),
                this.emit("signal", { type: a.type, sdp: a.sdp });
            },
            n = () => {
              this._debug("createOffer success"),
                !this.destroyed &&
                  (this.trickle || this._iceComplete
                    ? r()
                    : this.once("_iceComplete", r));
            },
            s = (a) => {
              this.destroy(ie(a, "ERR_SET_LOCAL_DESCRIPTION"));
            };
          this._pc.setLocalDescription(e).then(n).catch(s);
        })
        .catch((e) => {
          this.destroy(ie(e, "ERR_CREATE_OFFER"));
        });
  }
  _requestMissingTransceivers() {
    this._pc.getTransceivers &&
      this._pc.getTransceivers().forEach((e) => {
        !e.mid &&
          e.sender.track &&
          !e.requested &&
          ((e.requested = !0), this.addTransceiver(e.sender.track.kind));
      });
  }
  _createAnswer() {
    this.destroyed ||
      this._pc
        .createAnswer(this.answerOptions)
        .then((e) => {
          if (this.destroyed) return;
          !this.trickle && !this.allowHalfTrickle && (e.sdp = wn(e.sdp)),
            (e.sdp = this.sdpTransform(e.sdp));
          const r = () => {
              if (this.destroyed) return;
              const a = this._pc.localDescription || e;
              this._debug("signal"),
                this.emit("signal", { type: a.type, sdp: a.sdp }),
                this.initiator || this._requestMissingTransceivers();
            },
            n = () => {
              this.destroyed ||
                (this.trickle || this._iceComplete
                  ? r()
                  : this.once("_iceComplete", r));
            },
            s = (a) => {
              this.destroy(ie(a, "ERR_SET_LOCAL_DESCRIPTION"));
            };
          this._pc.setLocalDescription(e).then(n).catch(s);
        })
        .catch((e) => {
          this.destroy(ie(e, "ERR_CREATE_ANSWER"));
        });
  }
  _onConnectionStateChange() {
    this.destroyed ||
      (this._pc.connectionState === "failed" &&
        this.destroy(
          ie(new Error("Connection failed."), "ERR_CONNECTION_FAILURE"),
        ));
  }
  _onIceStateChange() {
    if (this.destroyed) return;
    const e = this._pc.iceConnectionState,
      r = this._pc.iceGatheringState;
    this._debug("iceStateChange (connection: %s) (gathering: %s)", e, r),
      this.emit("iceStateChange", e, r),
      (e === "connected" || e === "completed") &&
        ((this._pcReady = !0), this._maybeReady()),
      e === "failed" &&
        this.destroy(
          ie(new Error("Ice connection failed."), "ERR_ICE_CONNECTION_FAILURE"),
        ),
      e === "closed" &&
        this.destroy(
          ie(new Error("Ice connection closed."), "ERR_ICE_CONNECTION_CLOSED"),
        );
  }
  getStats(e) {
    const r = (n) => (
      Object.prototype.toString.call(n.values) === "[object Array]" &&
        n.values.forEach((s) => {
          Object.assign(n, s);
        }),
      n
    );
    this._pc.getStats.length === 0 || this._isReactNativeWebrtc
      ? this._pc.getStats().then(
          (n) => {
            const s = [];
            n.forEach((a) => {
              s.push(r(a));
            }),
              e(null, s);
          },
          (n) => e(n),
        )
      : this._pc.getStats.length > 0
        ? this._pc.getStats(
            (n) => {
              if (this.destroyed) return;
              const s = [];
              n.result().forEach((a) => {
                const u = {};
                a.names().forEach((l) => {
                  u[l] = a.stat(l);
                }),
                  (u.id = a.id),
                  (u.type = a.type),
                  (u.timestamp = a.timestamp),
                  s.push(r(u));
              }),
                e(null, s);
            },
            (n) => e(n),
          )
        : e(null, []);
  }
  _maybeReady() {
    if (
      (this._debug(
        "maybeReady pc %s channel %s",
        this._pcReady,
        this._channelReady,
      ),
      this._connected ||
        this._connecting ||
        !this._pcReady ||
        !this._channelReady)
    )
      return;
    this._connecting = !0;
    const e = () => {
      this.destroyed ||
        this.getStats((r, n) => {
          if (this.destroyed) return;
          r && (n = []);
          const s = {},
            a = {},
            u = {};
          let l = !1;
          n.forEach((d) => {
            (d.type === "remotecandidate" || d.type === "remote-candidate") &&
              (s[d.id] = d),
              (d.type === "localcandidate" || d.type === "local-candidate") &&
                (a[d.id] = d),
              (d.type === "candidatepair" || d.type === "candidate-pair") &&
                (u[d.id] = d);
          });
          const c = (d) => {
            l = !0;
            let h = a[d.localCandidateId];
            h && (h.ip || h.address)
              ? ((this.localAddress = h.ip || h.address),
                (this.localPort = Number(h.port)))
              : h && h.ipAddress
                ? ((this.localAddress = h.ipAddress),
                  (this.localPort = Number(h.portNumber)))
                : typeof d.googLocalAddress == "string" &&
                  ((h = d.googLocalAddress.split(":")),
                  (this.localAddress = h[0]),
                  (this.localPort = Number(h[1]))),
              this.localAddress &&
                (this.localFamily = this.localAddress.includes(":")
                  ? "IPv6"
                  : "IPv4");
            let y = s[d.remoteCandidateId];
            y && (y.ip || y.address)
              ? ((this.remoteAddress = y.ip || y.address),
                (this.remotePort = Number(y.port)))
              : y && y.ipAddress
                ? ((this.remoteAddress = y.ipAddress),
                  (this.remotePort = Number(y.portNumber)))
                : typeof d.googRemoteAddress == "string" &&
                  ((y = d.googRemoteAddress.split(":")),
                  (this.remoteAddress = y[0]),
                  (this.remotePort = Number(y[1]))),
              this.remoteAddress &&
                (this.remoteFamily = this.remoteAddress.includes(":")
                  ? "IPv6"
                  : "IPv4"),
              this._debug(
                "connect local: %s:%s remote: %s:%s",
                this.localAddress,
                this.localPort,
                this.remoteAddress,
                this.remotePort,
              );
          };
          if (
            (n.forEach((d) => {
              d.type === "transport" &&
                d.selectedCandidatePairId &&
                c(u[d.selectedCandidatePairId]),
                ((d.type === "googCandidatePair" &&
                  d.googActiveConnection === "true") ||
                  ((d.type === "candidatepair" ||
                    d.type === "candidate-pair") &&
                    d.selected)) &&
                  c(d);
            }),
            !l && (!Object.keys(u).length || Object.keys(a).length))
          ) {
            setTimeout(e, 100);
            return;
          } else (this._connecting = !1), (this._connected = !0);
          if (this._chunk) {
            try {
              this.send(this._chunk);
            } catch (h) {
              return this.destroy(ie(h, "ERR_DATA_CHANNEL"));
            }
            (this._chunk = null),
              this._debug('sent chunk from "write before connect"');
            const d = this._cb;
            (this._cb = null), d(null);
          }
          typeof this._channel.bufferedAmountLowThreshold != "number" &&
            ((this._interval = setInterval(() => this._onInterval(), 150)),
            this._interval.unref && this._interval.unref()),
            this._debug("connect"),
            this.emit("connect");
        });
    };
    e();
  }
  _onInterval() {
    !this._cb ||
      !this._channel ||
      this._channel.bufferedAmount > fr ||
      this._onChannelBufferedAmountLow();
  }
  _onSignalingStateChange() {
    this.destroyed ||
      (this._pc.signalingState === "stable" &&
        ((this._isNegotiating = !1),
        this._debug("flushing sender queue", this._sendersAwaitingStable),
        this._sendersAwaitingStable.forEach((e) => {
          this._pc.removeTrack(e), (this._queuedNegotiation = !0);
        }),
        (this._sendersAwaitingStable = []),
        this._queuedNegotiation
          ? (this._debug("flushing negotiation queue"),
            (this._queuedNegotiation = !1),
            this._needsNegotiation())
          : (this._debug("negotiated"), this.emit("negotiated"))),
      this._debug("signalingStateChange %s", this._pc.signalingState),
      this.emit("signalingStateChange", this._pc.signalingState));
  }
  _onIceCandidate(e) {
    this.destroyed ||
      (e.candidate && this.trickle
        ? this.emit("signal", {
            type: "candidate",
            candidate: {
              candidate: e.candidate.candidate,
              sdpMLineIndex: e.candidate.sdpMLineIndex,
              sdpMid: e.candidate.sdpMid,
            },
          })
        : !e.candidate &&
          !this._iceComplete &&
          ((this._iceComplete = !0), this.emit("_iceComplete")),
      e.candidate && this._startIceCompleteTimeout());
  }
  _onChannelMessage(e) {
    if (this.destroyed) return;
    let r = e.data;
    r instanceof ArrayBuffer && (r = ja.from(r)), this.push(r);
  }
  _onChannelBufferedAmountLow() {
    if (this.destroyed || !this._cb) return;
    this._debug(
      "ending backpressure: bufferedAmount %d",
      this._channel.bufferedAmount,
    );
    const e = this._cb;
    (this._cb = null), e(null);
  }
  _onChannelOpen() {
    this._connected ||
      this.destroyed ||
      (this._debug("on channel open"),
      (this._channelReady = !0),
      this._maybeReady());
  }
  _onChannelClose() {
    this.destroyed || (this._debug("on channel close"), this.destroy());
  }
  _onTrack(e) {
    this.destroyed ||
      e.streams.forEach((r) => {
        this._debug("on track"),
          this.emit("track", e.track, r),
          this._remoteTracks.push({ track: e.track, stream: r }),
          !this._remoteStreams.some((n) => n.id === r.id) &&
            (this._remoteStreams.push(r),
            cr(() => {
              this._debug("on stream"), this.emit("stream", r);
            }));
      });
  }
  _debug() {
    const e = [].slice.call(arguments);
    (e[0] = "[" + this._id + "] " + e[0]), Da.apply(null, e);
  }
}
ct.WEBRTC_SUPPORT = !!oi();
ct.config = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:global.stun.twilio.com:3478",
      ],
    },
  ],
  sdpSemantics: "unified-plan",
};
ct.channelConfig = {};
var Ga = ct;
const si = Ns(Ga);
var Fr = ((t) => ((t.HOST = "HOST"), (t.JOIN_HOST = "JOIN_HOST"), t))(Fr || {}),
  Sr = ((t) => ((t.HOST_OK = "HOST_OK"), (t.JOIN_OK = "JOIN_OK"), t))(Sr || {});
async function ai() {
  const t = new WebSocket("ws://127.0.0.1:8080");
  return (
    await new Promise((e) => {
      (t.onopen = () => {
        console.info("ws connection established"), e();
      }),
        (t.onerror = (r) => {
          console.error(`ws error ${r}`);
        });
    }),
    t
  );
}
function Ha(t) {
  const e = new si({ initiator: !1, trickle: !1 });
  e.signal(t),
    e.on("connect", () => {
      console.info("connected to new client"),
        e.send("test message sent from new server");
    });
}
async function Va() {
  const t = await ai();
  console.log("create room"),
    (t.onmessage = ({ data: r }) => {
      const n = JSON.parse(r);
      switch (n.type) {
        case Sr.HOST_OK:
          Vn.set(n.roomId);
          break;
        case Sr.JOIN_OK:
          Ha(n.signal);
          break;
      }
    });
  const e = { type: Fr.HOST };
  t.send(JSON.stringify(e));
}
async function Ya(t) {
  const e = await ai(),
    r = new si({ initiator: !0, trickle: !1 });
  console.log("join room", t),
    r.on("connect", () => {
      console.info("connected to new server"),
        r.send("test message sent from new client");
    }),
    r.on("stream", (n) => {
      console.log("got stream", n);
      const s = new Audio();
      (s.srcObject = n), s.play();
    }),
    r.once("signal", (n) => {
      console.log("sending Join host request");
      const s = { type: Fr.JOIN_HOST, roomId: t, signal: n };
      e.send(JSON.stringify(s));
    });
}
function vn(t) {
  let e, r;
  return (
    (e = new Fn({
      props: {
        variant: "outline",
        $$slots: { default: [Ja] },
        $$scope: { ctx: t },
      },
    })),
    e.$on("click", Va),
    {
      c() {
        Pe(e.$$.fragment);
      },
      l(n) {
        Le(e.$$.fragment, n);
      },
      m(n, s) {
        De(e, n, s), (r = !0);
      },
      i(n) {
        r || (oe(e.$$.fragment, n), (r = !0));
      },
      o(n) {
        se(e.$$.fragment, n), (r = !1);
      },
      d(n) {
        Ue(e, n);
      },
    }
  );
}
function Ja(t) {
  let e;
  return {
    c() {
      e = kt("createRoom");
    },
    l(r) {
      e = It(r, "createRoom");
    },
    m(r, n) {
      Ee(r, e, n);
    },
    d(r) {
      r && pe(e);
    },
  };
}
function Ka(t) {
  let e;
  return {
    c() {
      e = kt("joinRoom");
    },
    l(r) {
      e = It(r, "joinRoom");
    },
    m(r, n) {
      Ee(r, e, n);
    },
    d(r) {
      r && pe(e);
    },
  };
}
function Xa(t) {
  let e;
  return {
    c() {
      e = kt("CN");
    },
    l(r) {
      e = It(r, "CN");
    },
    m(r, n) {
      Ee(r, e, n);
    },
    d(r) {
      r && pe(e);
    },
  };
}
function Za(t) {
  let e, r, n, s;
  return (
    (e = new qo({
      props: { src: "https://github.com/shadcn.png", alt: "@shadcn" },
    })),
    (n = new Vo({
      props: { $$slots: { default: [Xa] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        Pe(e.$$.fragment), (r = st()), Pe(n.$$.fragment);
      },
      l(a) {
        Le(e.$$.fragment, a), (r = at(a)), Le(n.$$.fragment, a);
      },
      m(a, u) {
        De(e, a, u), Ee(a, r, u), De(n, a, u), (s = !0);
      },
      p(a, u) {
        const l = {};
        u & 16 && (l.$$scope = { dirty: u, ctx: a }), n.$set(l);
      },
      i(a) {
        s || (oe(e.$$.fragment, a), oe(n.$$.fragment, a), (s = !0));
      },
      o(a) {
        se(e.$$.fragment, a), se(n.$$.fragment, a), (s = !1);
      },
      d(a) {
        a && pe(r), Ue(e, a), Ue(n, a);
      },
    }
  );
}
function Qa(t) {
  let e,
    r,
    n,
    s,
    a,
    u,
    l,
    c,
    d,
    h,
    y,
    S,
    k,
    T,
    C,
    A,
    m,
    v = "playlist",
    B,
    O,
    L = "current_playing",
    F,
    j = !t[1] && vn(t);
  function q(H) {
    t[2](H);
  }
  let N = { placeholder: "RoomId" };
  return (
    t[0] !== void 0 && (N.value = t[0]),
    (d = new Ms({ props: N })),
    Bt.push(() => hi(d, "value", q)),
    (S = new Fn({
      props: {
        variant: "outline",
        $$slots: { default: [Ka] },
        $$scope: { ctx: t },
      },
    })),
    S.$on("click", t[3]),
    (C = new Uo({
      props: {
        class: "h-96 w-96 rounded-2xl",
        $$slots: { default: [Za] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = Ae("div")),
          (r = Ae("div")),
          (n = Ae("h1")),
          (s = kt("Room : ")),
          (a = kt(t[1])),
          (u = st()),
          j && j.c(),
          (l = st()),
          (c = Ae("div")),
          Pe(d.$$.fragment),
          (y = st()),
          Pe(S.$$.fragment),
          (k = st()),
          (T = Ae("div")),
          Pe(C.$$.fragment),
          (A = st()),
          (m = Ae("div")),
          (m.textContent = v),
          (B = st()),
          (O = Ae("div")),
          (O.textContent = L),
          this.h();
      },
      l(H) {
        e = xe(H, "DIV", { class: !0 });
        var re = Xe(e);
        r = xe(re, "DIV", { class: !0 });
        var I = Xe(r);
        n = xe(I, "H1", {});
        var W = Xe(n);
        (s = It(W, "Room : ")),
          (a = It(W, t[1])),
          W.forEach(pe),
          (u = at(I)),
          j && j.l(I),
          (l = at(I)),
          (c = xe(I, "DIV", { class: !0 }));
        var U = Xe(c);
        Le(d.$$.fragment, U),
          (y = at(U)),
          Le(S.$$.fragment, U),
          U.forEach(pe),
          I.forEach(pe),
          (k = at(re)),
          (T = xe(re, "DIV", { class: !0 }));
        var V = Xe(T);
        Le(C.$$.fragment, V),
          V.forEach(pe),
          (A = at(re)),
          (m = xe(re, "DIV", { class: !0, "data-svelte-h": !0 })),
          Pr(m) !== "svelte-1k0piss" && (m.textContent = v),
          (B = at(re)),
          (O = xe(re, "DIV", { class: !0, "data-svelte-h": !0 })),
          Pr(O) !== "svelte-1r9tz44" && (O.textContent = L),
          re.forEach(pe),
          this.h();
      },
      h() {
        gt(c, "class", "flex flex-row space-x-2"),
          gt(
            r,
            "class",
            "flex flex-col items-center space-y-8 border border-red-500",
          ),
          gt(
            T,
            "class",
            "flex flex-col items-center justify-center border border-blue-500",
          ),
          gt(m, "class", "border border-yellow-500"),
          gt(O, "class", "col-span-3 border border-green-500"),
          gt(
            e,
            "class",
            "grid h-screen w-screen grid-cols-[1fr_3fr_2fr] grid-rows-[11fr_1fr]",
          );
      },
      m(H, re) {
        Ee(H, e, re),
          Ce(e, r),
          Ce(r, n),
          Ce(n, s),
          Ce(n, a),
          Ce(r, u),
          j && j.m(r, null),
          Ce(r, l),
          Ce(r, c),
          De(d, c, null),
          Ce(c, y),
          De(S, c, null),
          Ce(e, k),
          Ce(e, T),
          De(C, T, null),
          Ce(e, A),
          Ce(e, m),
          Ce(e, B),
          Ce(e, O),
          (F = !0);
      },
      p(H, [re]) {
        (!F || re & 2) && pi(a, H[1]),
          H[1]
            ? j &&
              (Ft(),
              se(j, 1, 1, () => {
                j = null;
              }),
              Ot())
            : j
              ? re & 2 && oe(j, 1)
              : ((j = vn(H)), j.c(), oe(j, 1), j.m(r, l));
        const I = {};
        !h && re & 1 && ((h = !0), (I.value = H[0]), di(() => (h = !1))),
          d.$set(I);
        const W = {};
        re & 16 && (W.$$scope = { dirty: re, ctx: H }), S.$set(W);
        const U = {};
        re & 16 && (U.$$scope = { dirty: re, ctx: H }), C.$set(U);
      },
      i(H) {
        F ||
          (oe(j),
          oe(d.$$.fragment, H),
          oe(S.$$.fragment, H),
          oe(C.$$.fragment, H),
          (F = !0));
      },
      o(H) {
        se(j),
          se(d.$$.fragment, H),
          se(S.$$.fragment, H),
          se(C.$$.fragment, H),
          (F = !1);
      },
      d(H) {
        H && pe(e), j && j.d(), Ue(d), Ue(S), Ue(C);
      },
    }
  );
}
function $a(t, e, r) {
  let n;
  Cn(t, Vn, (l) => r(1, (n = l)));
  let s;
  function a(l) {
    (s = l), r(0, s);
  }
  return [s, n, a, () => Ya(s)];
}
class ll extends He {
  constructor(e) {
    super(), Ve(this, e, $a, Qa, Me, {});
  }
}
export { ll as component };
