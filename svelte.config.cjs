const sveltePreprocess = require("svelte-preprocess");
const node = require("@sveltejs/adapter-node");
const pkg = require("./package.json");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess(),
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: node(),

    // set good path
    files: {
      assets: "static",
      hooks: "src/renderer/hooks",
      lib: "src/renderer/lib",
      routes: "src/renderer/routes",
      serviceWorker: "src/renderer/service-worker",
      template: "src/renderer/app.html",
    },

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    appDir: "renderer",
    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
};
