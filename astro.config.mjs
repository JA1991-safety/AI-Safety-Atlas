// @ts-check
import { defineConfig } from 'astro/config';

// Pages are built as plain .html files with relative links (see scripts/relativize.mjs),
// so the site works from any host or sub-folder: Cloudflare Pages, GitHub Pages or a preview link.
export default defineConfig({
  site: 'https://commonground.example', // placeholder until the domain is chosen
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
    assets: 'assets',
  },
  vite: {
    build: { chunkSizeWarningLimit: 1500 },
  },
});
