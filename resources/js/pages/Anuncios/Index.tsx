import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Heart, MessageCircleMore, Search, Trash2 } from 'lucide-react';

import { Link } from '@inertiajs/react';

import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

import { router } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Index',
        href: '/anuncios/index',
    },
];

//TOKEN (recuperar token almacenado en meta, para su uso en botones editar y borrar)
// const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

const getToken = () =>
    document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

// FN para limitar máximo palabras para mostrar
const limite = 13;
const limitarPalabras = (texto: string, limite: number): string => {
    const palabras = texto.split(' ');
    if (palabras.length > limite) {
        return palabras.slice(0, limite).join(' ') + '...';
    }
    return texto;
};

//FN para actualizar likes
const updateLike = async (anuncioId: number, setAnuncios: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const res = await fetch(`/likes/${anuncioId}`, {
            method: 'PUT',
            headers: {
                // 'X-CSRF-TOKEN': token,
                'X-CSRF-TOKEN': getToken(),
                'Content-Type': 'application/json',
            },
            
        });
        console.log('Token usado para like:', getToken());
        const data = await res.json();

        // Actualizar lod likes en el estado
        setAnuncios((prevAnuncios) =>
            prevAnuncios.map((anuncio) =>
                anuncio.id === anuncioId
                    ? {
                          ...anuncio,
                          liked_by_user: data.liked,
                          likes_count: data.liked ? anuncio.likes_count + 1 : anuncio.likes_count - 1,
                      }
                    : anuncio,
            ),
        );
    } catch (error) {
        console.error('Error al dar like:', error);
    }
};

// -------



const Index: React.FC<{ anuncios: any[]; userLogin: any }> = ({ anuncios: initialAnuncios, userLogin }) => {
    const [anuncios, setAnuncios] = useState(initialAnuncios);
    const [busqueda, setBusqueda] = useState('');

      const { flash } = usePage().props as { flash?: string };
      console.log('Mensaje flash recibido:', flash);
    

    //  filtrar anuncios para buscador
    const anunciosFiltrados = anuncios.filter(
        (anuncio) =>
            anuncio.articulo.toLowerCase().includes(busqueda.toLowerCase()) ||
            anuncio.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
            anuncio.lugar.toLowerCase().includes(busqueda.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

           {flash && (
                <div className="mb-4 rounded bg-green-100 p-3 text-green-800 shadow text-center font-semibold">
                    {flash}
                </div>
            )}

            <div className="mx-auto flex h-full max-w-7xl flex-1 flex-col gap-4 rounded-xl p-4">
                <Head title="Index" />
                

                {/* HEADER */}
                <div className="m-4 flex flex-col md:flex-row items-center justify-end gap-2">
                    <div className="flex w-full  items-center justify-center md:justify-start text-4xl font-bold">
                        <h1>ANUNCIOS</h1>
                    </div>

                    {/* BUSCADOR */}
                    <div className='flex items-center w-full justify-center sm:w-1/2 md:w-[30%]'>

                    <Search className="mr-3" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        // className="w-50px p-2 border rounded-md focus:border-amber-700"
                        // className="w-[30%] max-w-xs rounded-md border border-gray-300 p-2 transition-colors outline-none focus:border-amber-600 focus:bg-neutral-800"
                        className="w-full max-w-xs rounded-md border border-gray-300 p-2 transition-colors outline-none focus:border-amber-600 focus:bg-neutral-800 "
                        />
                        </div>
                </div>

                {/* 3 TARJETAS */}
                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video items-center justify-center space-x-2 overflow-hidden rounded-xl border bg-neutral-800">
                        <Switch />
                        <Label>Modo</Label>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div> */}

                {/* <div className="border-sidebar-border/70 dark:border-sidebar-border relative max-w-[1024px] min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>Una lista de tus recientes artículos 2</TableCaption>
                        <TableHeader className="bg-amber-700">
                            <TableRow>
                                <TableHead className="w-[100px]">Articulo</TableHead>
                                <TableHead>Autor</TableHead>
                                <TableHead>Lugar</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>descripcion</TableHead>
                                <TableHead>Cambio por:</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {anunciosFiltrados.map((anuncio) => (
                                // <TableRow key={anuncio.id}>
                                
                                //link al detalle de cada anuncio
                                <TableRow
                                    key={anuncio.id}
                                    className="cursor-pointer hover:bg-amber-700 duration-500"
                                    onClick={() => (window.location.href = route('anuncios.show', anuncio.id))}
                                >
                                    <TableCell className="font-medium">{anuncio.articulo}</TableCell>
                                    <TableCell>{anuncio.user.name}</TableCell>
                                    <TableCell>{anuncio.lugar}</TableCell>
                                    <TableCell>{anuncio.valor}</TableCell>
                                    <TableCell className='max-w-[50px]'>{limitarPalabras(anuncio.descripcion,4)}</TableCell>
                                    <TableCell>{anuncio.cambio}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </div> */}

                {/* <div className="grid grid-cols-3 gap-4"> */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {anunciosFiltrados.map((anuncio) => (
                        <Card
                            key={anuncio.id}
                            // className="m-1.5 bg-neutral-800 px-1"

                            className="m-2 h-[26rem] max-w-2xl cursor-pointer border border-transparent py-3 px-1 duration-500 hover:border-amber-700"
                            onClick={() => (window.location.href = route('anuncios.show', anuncio.id))}
                        >
                            <CardHeader>
                                <CardTitle className="font-semibold">Titulo -{anuncio.articulo}</CardTitle>
                                {/* <CardDescription>Publicado por <span className='font-black text-amber-600'>{anuncio.user.name}</span></CardDescription> */}
                                <CardDescription>
                                    <p className="mb-3 text-right">
                                        {' '}
                                        Publicado por <span className="font-bold text-amber-600">{anuncio.user.name}</span> el{' '}
                                        <span className="font-medium text-amber-600">{new Date(anuncio.created_at).toLocaleDateString()}</span>
                                    </p>
                                    <div className="flex items-center">
                                        <span className="pr-1 text-lg">{anuncio.comentario_count}</span>
                                        <span>
                                            <MessageCircleMore />
                                        </span>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Descripcion - {limitarPalabras(anuncio.descripcion, limite)}</CardDescription>
                            </CardContent>

                            <CardContent>
                                <div className="flex h-[8rem] md:h-[10rem] w-full items-center justify-center overflow-hidden rounded-md bg-neutral-800">
                                    {anuncio.imagen.length > 0 && (
                                        <img
                                            src={`/storage/${anuncio.imagen[0]?.ruta}`}
                                            alt={`Imagen`}
                                            className="h-full w-auto object-contain p-2"
                                        />
                                    )}
                                </div>
                            </CardContent>
                            <CardContent>
                                <Toaster position="top-center" richColors/>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateLike(anuncio.id, setAnuncios);
                                        toast.success('Like actualizado');
                                    }}
                                    className="cursor-pointer border-none bg-transparent p-0"
                                >
                                    <Heart
                                        className={`h-6 w-6 transition-transform duration-200 ${
                                            anuncio.liked_by_user
                                                ? 'fill-red-400 text-red-400 hover:scale-105'
                                                : 'text-gray-500 hover:scale-105 hover:text-red-400'
                                        }`}
                                    />
                                </button>
                                <p className="mt-2 text-sm text-gray-500">Total de likes: {anuncio.likes_count}</p>
                            </CardContent>

                            <CardFooter className="flex justify-between">
                                {/* if (para mostrar botones de editar y borrar solo al usuario que lo creó) */}
                                {userLogin.id === anuncio.user.id && (
                                    <>
                                        {/* BOTON EDITAR */}
                                        {/* <form method="POST" action={route('anuncios.edit', anuncio.id)}>
                                            <input
                                                type="hidden"
                                                name="_token"
                                                // value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''}
                                                value={token}
                                            />

                                            <input type="hidden" name="_method" value="GET" />
                                            <Button type="submit" className="p-3">
                                                <LucidePenBox />
                                            </Button>
                                        </form> */}

                                        {/* BOTON BORRAR */}
                                        <form method="POST" action={route('anuncios.destroy', anuncio.id)}>
                                            
                                            <input
                                                type="hidden"
                                                name="_token"
                                                // value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''}
                                                value={getToken()}
                                            />

                                            <input type="hidden" name="_method" value="DELETE" />
                                            <Button type="submit" className="p-3">
                                                <Trash2 />
                                            </Button>
                                        </form>
                                    </>
                                )}
                                <Button>
                                    <Link href={route('anuncios.show', anuncio.id)}>Ver anuncio</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
