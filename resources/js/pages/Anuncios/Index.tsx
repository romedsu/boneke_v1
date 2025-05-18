import React, { useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { LucidePenBox, Trash2,MessageCircleMore,Heart } from 'lucide-react';

import { Link } from '@inertiajs/react';




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Index',
        href: '/anuncios/index',
    },
];

//TOKEN (recuperar token almacenado en meta, para su uso en botones editar y borrar)
const token=document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';


// FN para limitar máximo palabras para mostrar
const limite=20;
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
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        // Actualizar el estado de los anuncios
        setAnuncios((prevAnuncios) =>
            prevAnuncios.map((anuncio) =>
                anuncio.id === anuncioId
                    ? {
                          ...anuncio,
                          liked_by_user: data.liked, // Actualizar si el usuario dio like
                          likes_count: data.liked
                              ? anuncio.likes_count + 1 // Incrementar likes si dio like
                              : anuncio.likes_count - 1, // Decrementar likes si quitó el like
                      }
                    : anuncio
            )
        );
    } catch (error) {
        console.error('Error al dar like:', error);
    }
};



const Index: React.FC<{ anuncios: any[]; userLogin: any }> = ({  anuncios: initialAnuncios, userLogin }) => {
     const [anuncios, setAnuncios] = useState(initialAnuncios);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Index" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
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
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative max-w-[1024px] min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
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
                            {anuncios.map((anuncio) => (
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

                        {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter> */}
                    </Table>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {anuncios.map((anuncio) => (
                        <Card key={anuncio.id} 
                        // className="m-1.5 bg-neutral-800 px-1"
                        
                        className="cursor-pointer border border-transparent hover:border-amber-700 duration-500 h-[600px]"
                     

                        onClick={() => (window.location.href = route('anuncios.show', anuncio.id))}
                        >
                            <CardHeader>
                                <CardTitle>Titulo -{anuncio.articulo}</CardTitle>
                                {/* <CardDescription>Publicado por <span className='font-black text-amber-600'>{anuncio.user.name}</span></CardDescription> */}
                                <CardDescription>
                                   <p> Publicado por <span className="font-black text-amber-600">{anuncio.user.name}</span> el{' '}
                                    <span className="font-black text-amber-600">{new Date(anuncio.created_at).toLocaleDateString()}</span></p>
                                    <p className='flex'><MessageCircleMore /> {anuncio.comentario_count} comentarios </p>                                
                                    </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Descripcion - {limitarPalabras(anuncio.descripcion,limite)}</CardDescription>
                            </CardContent>
                            
                            <CardContent>
                                 <div className="h-[250px] w-full bg-neutral-800 flex items-center justify-center rounded-md overflow-hidden">

                                {anuncio.imagen.length >0 &&(
                                    
                                    <img src={`/storage/${anuncio.imagen[0]?.ruta}`} alt={`Imagen`} className="h-full w-auto object-contain p-2" />
                                )}
                              
                                </div>
                            </CardContent>
                            <CardContent>
    <button
        onClick={(e) => {
            e.stopPropagation();
            updateLike(anuncio.id, setAnuncios);
        }}
        className="bg-transparent border-none p-0 cursor-pointer"
    >
        <Heart
            className={`h-6 w-6 transition-transform duration-200 ${
                anuncio.liked_by_user
                    ? 'text-red-400 fill-red-400 hover:scale-105'
                    : 'text-gray-500 hover:text-red-400 hover:scale-105'
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
                                                value={token}
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
