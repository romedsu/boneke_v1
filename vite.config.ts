import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },

    //docker
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        // hmr: {
        //   host: 'localhost',
        // }

           hmr: {
            host: process.env.VITE_APP_URL
                ? process.env.VITE_APP_URL.replace(/^https?:\/\//, '')
                : 'localhost',
        },
    },
    // server: {
    //     host: '127.0.0.1', // Cambia ::1 a 127.0.0.1 para evitar problemas con IPv6
    //     port: 5173,        // Confirma que el puerto coincide con tus configuracione
    // },
});
