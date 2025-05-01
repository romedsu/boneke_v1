import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

//TOKEN CSRF
// Recuperar el token CSRF desde el meta tag en el HTML (app.blade.php)
// const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

// if (csrfToken) {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
// } else {
//     console.error("CSRF token no encontrado.");
// }

//IMPORTA VISTAS de la carpeta /pages (los .tsx)
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
