export const index = 2;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/pages/_page.svelte.js"))
    .default);
export const imports = [
  "_app/immutable/nodes/2.3Vcu6JbE.js",
  "_app/immutable/chunks/scheduler.2pBl59A6.js",
  "_app/immutable/chunks/index.JfgdDZH5.js",
  "_app/immutable/chunks/index.VIQqXnB6.js",
];
export const stylesheets = [];
export const fonts = [];
