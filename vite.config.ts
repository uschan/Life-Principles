import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // We use process.cwd() to ensure we are looking in the project root.
  // Fix TS error: process.cwd() is missing on the inferred type because of global declarations in frontend code.
  const cwd = (process as any).cwd();
  const env = loadEnv(mode, cwd, '');

  // Prioritize VITE_API_KEY as per standard Vite convention, fallback to API_KEY
  const apiKey = env.VITE_API_KEY || env.API_KEY || '';

  // --- BUILD TIME LOGGING ---
  // This will show up in your VPS terminal when you run `npm run build`
  console.log("----------------------------------------------------------");
  console.log(`[BUILD LOG] Building in mode: ${mode}`);
  console.log(`[BUILD LOG] Searching for API Key in: ${cwd}/.env`);
  if (apiKey) {
    console.log(`[BUILD LOG] ✅ API Key FOUND (Length: ${apiKey.length})`);
    console.log(`[BUILD LOG] Variable 'process.env.API_KEY' will be injected.`);
  } else {
    console.log(`[BUILD LOG] ⚠️  API Key NOT FOUND! App will default to Mock Mode.`);
    console.log(`[BUILD LOG] Please ensure .env exists and contains VITE_API_KEY=...`);
  }
  console.log("----------------------------------------------------------");

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        manifest: {
          name: 'The Zenith Protocol',
          short_name: 'Zenith',
          description: 'Anti-fragile operating system for life decisions.',
          theme_color: '#030303',
          background_color: '#030303',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            {
              src: 'https://pic.wildsalt.me/storage/img/logo/life-principles-png-1767321905743-1263.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'https://pic.wildsalt.me/storage/img/logo/life-principles-png-1767321905743-1263.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          // Exclude the remote image from being cached by workbox to avoid CORS issues during build/precaching
          // It will still be loaded by the browser for the home screen icon.
          runtimeCaching: [{
            urlPattern: ({ url }) => url.href.includes('pic.wildsalt.me'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'remote-images',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              }
            }
          }]
        }
      })
    ],
    define: {
      // Define global constant replacement
      // This forces the value of apiKey to be hardcoded into the build output
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});