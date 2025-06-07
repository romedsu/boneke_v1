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
                        <strong className="text-amber-700">Boneke</strong> es una plataforma de trueque que impulsa la economía sostenible, circular y de proximidad.
                    </p>
                    <p className="indent-8">
                        Nuestro objetivo es facilitar el intercambio de objetos y servicios entre personas de la misma comunidad, fomentando el aprovechamiento de recursos y reduciendo el excedente. 
                    </p>
                      <p className="indent-8">
                        Creemos en un modelo colaborativo, donde cada usuario puede ofrecer y encontrar aquello que necesita sin depender del dinero, promoviendo valores de solidaridad, reutilización y apoyo local para construir a un futuro más responsable y sostenible.
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
