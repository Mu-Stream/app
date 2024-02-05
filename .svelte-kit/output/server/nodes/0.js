import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.h9oSCYWg.js","_app/immutable/chunks/scheduler.2pBl59A6.js","_app/immutable/chunks/index.JfgdDZH5.js"];
export const stylesheets = ["_app/immutable/assets/0.nr5bNpjZ.css"];
export const fonts = [];
