import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Footer from '@/components/ui/footer';

export default function QuienesSomos() {
    return (
        <AppLayout>
            <Head title="Quiénes somos" />
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
                <img className="mb-8 w-60 rounded-xl bg-amber-700" src="/storage/logos/boneke_04.png" alt="logo boneke" />

                <h1 className="mb-6 text-4xl font-bold text-neutral-300">Quiénes somos</h1>
                <div className="max-w-2xl space-y-4  px-4 text-justify text-lg text-neutral-200">
                    <p className="indent-8">
                        <strong className="text-amber-700">Boneke</strong> es un proyecto dedicado a conectar personas a través de anuncios y
                        oportunidades en nuestra comunidad. Nuestro objetivo es ofrecer una plataforma sencilla, segura y confiable donde puedas
                        publicar, buscar y descubrir anuncios de todo tipo.
                    </p>
                    <p>
                        Creemos en el poder de la colaboración y la comunicación local. Por eso, trabajamos cada día para mejorar la experiencia de
                        nuestros usuarios, fomentando el respeto, la transparencia y el apoyo mutuo.
                    </p>
                    <p className="text-center">
                        ¡ Gracias por ser parte de <strong className="text-amber-700">Boneke</strong> !
                    </p>
                </div>
            </div>
                <Footer />
        </AppLayout>
    );
}
