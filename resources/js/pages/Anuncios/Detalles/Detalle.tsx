import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { LucidePenBox, Trash2 } from 'lucide-react';

import Comentarios from './Comentarios';

import React, { useState } from 'react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Detalle: React.FC<{ anuncio: any; userLogin: any; comentarios: any }> = ({ anuncio, userLogin, comentarios }) => {
    // console.log ('Anuncio:', anuncio);
    // console.log (anuncio.imagen[0]?.ruta);
    // console.log(anuncio.imagen);

    //TOKEN (recuperar token almacenado en meta, para su uso en botones editar y borrar)
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

    const [editable, setEditable] = useState<number | null>(null);

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
                        {editable === anuncio.id ? (
                            <form method="POST" action={route('anuncios.update', anuncio.id)}>
                                <input type="hidden" name="_token" value={token} />
                                <input type="hidden" name="_method" value="PUT" />

                                <CardContent className="flex flex-col gap-2">
                                    <CardTitle className="flex gap-5">
                                        {' '}
                                        <span className="text-lg font-light">Titulo:</span>
                                        <input
                                            type="text"
                                            name="articulo"
                                            defaultValue={anuncio.articulo}
                                            className="border-b border-gray-500 bg-transparent text-base font-bold text-white focus:border-amber-600 focus:outline-none"
                                        />
                                    </CardTitle>

                                    <CardTitle className="flex gap-5">
                                        {' '}
                                        <span className="text-lg font-light">Valor:</span>
                                        <input
                                            type="number"
                                            name="valor"
                                            defaultValue={anuncio.valor}
                                            className="border-b border-gray-500 bg-transparent text-base font-bold text-white focus:border-amber-600 focus:outline-none"
                                        />
                                    </CardTitle>

                                    <CardTitle className="flex gap-5">
                                        {' '}
                                        <span className="text-lg font-light">Descripción:</span>
                                        <textarea
                                            // type="text"
                                            name="descripcion"
                                            defaultValue={anuncio.descripcion}
                                            className="border-b border-gray-500 bg-transparent text-base font-normal text-white focus:border-amber-600 focus:outline-none"
                                        />
                                    </CardTitle>
                                </CardContent>

                                <div className="mt-2 flex justify-end gap-2">
                                    <Button type="submit">Actualizar</Button>
                                    <Button type="reset" onClick={() => setEditable(null)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <CardTitle>Titulo: {anuncio.articulo}</CardTitle>
                                <CardDescription>Valor: {anuncio.valor} €</CardDescription>
                                <CardDescription>Descripcion: {anuncio.descripcion}</CardDescription>

                                {/* 1 IMAGEN */}
                                {/* {anuncio.imagen.map((img: any, index: any) => (
                                    <img key={index} src={`/storage/${img.ruta}`} alt={`Imagen ${index + 1}`} className="h-auto w-1/2" />
                                ))} */}

                                {/* CARRUSEL IMAGENES */}
                                {anuncio.imagen && anuncio.imagen.length > 0 && (
                                    <Carousel className="w-full max-w-xs">
                                        <CarouselContent>
                                            {anuncio.imagen.map((img: any, index: number) => (
                                                <CarouselItem key={index}>
                                                    <div className="p-1">
                                                        <Card>
                                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                                <img
                                                                    src={`/storage/${img.ruta}`}
                                                                    alt={`Imagen ${index + 1}`}
                                                                    className="h-auto w-full"
                                                                />
                                                            </CardContent>

                                                            <span>{anuncio.imagen.length}</span>
                                                        </Card>
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        {anuncio.imagen.length > 1 && (
                                            <div>
                                                <CarouselPrevious />
                                                <CarouselNext />
                                            </div>
                                        )}
                                    </Carousel>
                                )}
                            </div>
                        )}

                        <CardDescription>
                            <p>
                                {' '}
                                Publicado por <span className="font-black text-amber-600">{anuncio.user.name}</span> el{' '}
                                <span className="font-medium text-amber-600">{fecha}</span>
                            </p>
                            <p>Nº de comentarios: {comentarios.length}</p>
                        </CardDescription>
                    </CardHeader>

                    {/* <CardContent>
                        <CardDescription>Descripcion: {anuncio.descripcion}</CardDescription>
                    </CardContent> */}
                    <CardFooter className="flex justify-start gap-4">
                        {userLogin?.id === anuncio.user.id && editable !== anuncio.id && (
                            <>
                                <Button onClick={() => setEditable(anuncio.id)} className="p-3">
                                    <LucidePenBox />
                                </Button>

                                <form method="POST" action={route('anuncios.destroy', anuncio.id)}>
                                    <input type="hidden" name="_token" value={token} />

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
