import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "Kayo Ultrawide",
  version: packageJson.version,
  description: packageJson.description,
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-48.png",
  },
  icons: {
    "128": "icon-128.png",
  },
  content_scripts: [
    {
      matches: [
        "https://kayosports.com.au/*",
        "https://www.kayosports.com.au/*",
      ],
      js: ["src/pages/content/index.js"],
      // KEY for cache invalidation
      // css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "icon-128.png",
        "icon-48.png",
      ],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
