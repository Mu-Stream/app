export const index = 1;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/fallbacks/error.svelte.js"))
    .default);
export const imports = [
  "_app/immutable/nodes/1.1-H60si4.js",
  "_app/immutable/chunks/scheduler.2pBl59A6.js",
  "_app/immutable/chunks/index.JfgdDZH5.js",
  "_app/immutable/chunks/entry.mUfVn78s.js",
  "_app/immutable/chunks/index.VIQqXnB6.js",
];
export const stylesheets = [];
export const fonts = [];
