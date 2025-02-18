import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            base: "/hkrgm2/",
            workbox: {
                maximumFileSizeToCacheInBytes: 9999999999999
            }
        })
    ],
    base: "/hkrgm2/",
    build: {
        sourcemap: "hidden",
        outDir: "docs",
    }
});
