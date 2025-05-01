import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { LucidePenBox, Trash2 } from 'lucide-react';

import Comentarios from './Comentarios';

const Detalle: React.FC<{ anuncio: any; userLogin: any; comentarios: any }> = ({ anuncio, userLogin, comentarios }) => {
    // console.log (anuncio);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Anuncios',
            href: '/anuncios',
        },
        {
            title: `Anuncio ${anuncio.articulo}`,
            href: `/anuncios/${anuncio.id}`,
        },
    ];

    const fecha = new Date(anuncio.created_at).toLocaleDateString();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={anuncio.articulo}></Head>

            <div className="flex justify-center">
                <Card key={anuncio.id} className="m-4 w-full max-w-[970px] bg-neutral-800 px-1">
                    <CardHeader>
                        <CardTitle>Titulo -{anuncio.articulo}</CardTitle>
                        <CardDescription>
                           <p> Publicado por <span className="font-black text-amber-600">{anuncio.user.name}</span> el{' '}
                            <span className="font-medium text-amber-600">{fecha}</span></p>
                            <p>Nº de cometarios: {comentarios.length}</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Descripcion - {anuncio.descripcion}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-start gap-4">
                        {userLogin?.id === anuncio.user.id && (
                            <>
                                <form method="POST" action={route('anuncios.edit', anuncio.id)}>
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''}
                                    />

                                    <input type="hidden" name="_method" value="GET" />
                                    <Button type="submit" className="p-3">
                                        <LucidePenBox />
                                    </Button>
                                </form>

                                <form method="POST" action={route('anuncios.destroy', anuncio.id)}>
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''}
                                    />

                                    <input type="hidden" name="_method" value="DELETE" />
                                    <Button type="submit" className="p-3">
                                        <Trash2 />
                                    </Button>
                                </form>
                            </>
                        )}
                    </CardFooter>
                </Card>
            </div>

            {/* Al componente Comentarios se le pasan 3 parametros */}
            <Comentarios comentarios={comentarios} anuncio_id={anuncio.id} userLogin={userLogin} />
            
        </AppLayout>
    );
};
export default Detalle;
