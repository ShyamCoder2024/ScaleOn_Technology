import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import { assertPrerenderedHtml } from './scripts/verify-prerender.mjs'

function verifyPrerenderedHomepage() {
  return {
    name: 'verify-prerendered-homepage',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const homepage = bundle['index.html']

      if (!homepage || homepage.type !== 'asset' || typeof homepage.source !== 'string') {
        this.error('Pre-render verification failed: the production build has no index.html asset.')
      }

      assertPrerenderedHtml(homepage.source, 'the production index.html asset')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: '#root',
    }),
    verifyPrerenderedHomepage(),
  ],
  build: {
    // The deferred Spline runtime and its physics engine are intentionally
    // large standalone chunks. They load only when the hero scene is visible.
    chunkSizeWarningLimit: 2100,
  },
  server: {
    open: false,
  },
})
