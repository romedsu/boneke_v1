import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
    return (
           <footer className="border-t border-amber-700 py-6  mt-2 mx-auto ">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 w-full xl:min-w-7xl">
                <div className="flex gap-6 justify-center">
                    <a
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-amber-700 transition-colors"
                        aria-label="Instagram"
                    >
                        <Instagram className="h-6 w-6" />
                    </a>
                    <a
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-amber-700 transition-colors"
                        aria-label="Facebook"
                    >
                        <Facebook className="h-6 w-6" />
                    </a>
                  
                </div>
                <span className="text-sm text-neutral-500 text-center">
                    © Boneke |  Todos los derechos reservados | 2025
                </span>
            </div>
        </footer>
    );
}