import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/classCue/",
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: false
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: (assetInfo) => {
          // Don't hash manifest.json and other PWA assets
          if (assetInfo.name.endsWith('.json') || 
              assetInfo.name.includes('pwa-') ||
              assetInfo.name === 'apple-touch-icon.png' ||
              assetInfo.name === 'favicon.ico') {
            return `[name].[ext]`;
          }
          return `assets/[name].[hash].[ext]`;
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  }
})
