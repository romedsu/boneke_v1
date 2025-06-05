import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { CalendarDays, Heart, LayoutGrid, MessageCircleMore, Trash2, UserPen } from 'lucide-react';

import { Link } from '@inertiajs/react';

import { useEffect } from 'react';

// import { Toaster, toast } from 'sonner';

// import 'react-toastify/dist/ReactToastify.css';

import FlashMsj from '@/components/FlashMsj';

import { Inertia } from '@inertiajs/inertia';

import Buscador from '@/components/Buscador';

import { Icon } from '@/components/ui/iconCat';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Anuncios',
        href: '/anuncios/index',
    },
];

//TOKEN (recuperar token almacenado en meta, para su uso en botones editar y borrar)
// const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

const getToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

// FN para limitar máximo palabras para mostrar
const limite = 10;
const limitarPalabras = (texto: string, limite: number): string => {
    const palabras = texto.split(' ');
    if (palabras.length > limite) {
        return palabras.slice(0, limite).join(' ') + '...';
    }
    return texto;
};

//FN para actualizar likes
// const updateLike = async (anuncioId: number, setAnuncios: React.Dispatch<React.SetStateAction<any[]>>) => {
//     try {
//         const res = await fetch(`/likes/${anuncioId}`, {
//             method: 'PUT',
//             headers: {
//                 // 'X-CSRF-TOKEN': token,
//                 'X-CSRF-TOKEN': getToken(),
//                 'Content-Type': 'application/json',
//             },
//         });
//         console.log('Token usado para like:', getToken());
//         const data = await res.json();

//         toast.success(data.liked ? '¡Te gusta!' : 'Ya no te gusta...');

//         // Actualizar lod likes en el estado
//         setAnuncios((prevAnuncios) =>
//             prevAnuncios.map((anuncio) =>
//                 anuncio.id === anuncioId
//                     ? {
//                           ...anuncio,
//                           liked_by_user: data.liked,
//                           likes_count: data.liked ? anuncio.likes_count + 1 : anuncio.likes_count - 1,
//                       }
//                     : anuncio,
//             ),
//         );
//     } catch (error) {
//         console.error('Error al dar like:', error);
//     }
// };

const updateLike = async (anuncioId: number) => {
    try {
        await fetch(`/anuncios/${anuncioId}/like`, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': getToken(),
                'Content-Type': 'application/json',
            },
        });

        // Recarga los datos de la página actual desde el backend

        Inertia.reload({ only: ['anuncios'] });
    } catch (error) {
        console.error('Error al dar like:', error);
    }
};

// -------

const Index: React.FC<{ anuncios: any; userLogin: any; titulo?: string }> = ({ anuncios: initialAnuncios, userLogin, titulo }) => {
    // const [anuncios, setAnuncios] = useState(initialAnuncios);
    const [anuncios] = useState(initialAnuncios.data);

    const [busqueda, setBusqueda] = useState('');

    const [resultados, setResultados] = useState([]);

    //  filtrar anuncios para buscador
    // const anunciosFiltrados = anuncios.filter(
    //     (anuncio: any) =>
    //         anuncio.articulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    //         anuncio.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
    //         anuncio.lugar.toLowerCase().includes(busqueda.toLowerCase()),
    // );

    //Buscar anuncios al escribir en el buscador
    useEffect(() => {
        if (busqueda.trim() === '') {
            setResultados([]);
            return;
        }

        const fetchResultados = async () => {
            const response = await fetch(`/buscar?query=${encodeURIComponent(busqueda)}`);
            if (response.ok) {
                const data = await response.json();
                setResultados(data);
            } else {
                setResultados([]);
            }
        };

        fetchResultados();
    }, [busqueda]);



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
       
            {/* MENSAJES FEEDBACK */}
            <FlashMsj />

            <div className="mx-auto flex h-full max-w-7xl flex-1 flex-col gap-4 rounded-xl p-4">
                <Head title="Anuncios" />

                {/* HEADER */}
                <div className="m-4 flex flex-col items-center justify-end gap-2 md:flex-row">
                    {/* TITULO pagina*/}
                    <div className="flex w-full items-center justify-center text-4xl font-bold md:justify-start">
                        <h1>{titulo ?? 'Boneke'}</h1>
                    </div>

                    {/* BUSCADOR */}
                    <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
                </div>

                {/* ANUNCIOS */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {/* {anunciosFiltrados.map((anuncio: any) => ( */}
                    {(busqueda.trim() ? resultados : anuncios).map((anuncio: any) => (
                        <Card
                            key={anuncio.id}
                            // className="m-1.5 bg-neutral-800 px-1"

                            className="m-2 h-[24.5rem] max-w-2xl cursor-pointer border border-transparent px-1 py-3 duration-500 hover:border-amber-600"
                            onClick={() => (window.location.href = route('anuncios.show', anuncio.id))}
                        >
                            <CardHeader>
                                <CardTitle className="mt-1.5 font-semibold transition duration-400 hover:text-amber-600">
                                    {limitarPalabras(anuncio.articulo, 3)}
                                </CardTitle>

                                <CardDescription className="mb-2 flex justify-between gap-5">
                                    {/* categoria anuncio */}
                                    <div className="flex items-center gap-2">
                                        {/* <LayoutGrid className="w-4" /> */}
                                        <Icon name={anuncio.categoria.icon} className="w-5 h-5 text-neutral-400" />
                                        <a
                                            className="cursor-pointer font-semibold text-amber-600 hover:text-neutral-100"
                                            onClick={(e) => {
                                                // evitar que el click afecte al card(que el link lleve al anuncio)
                                                e.stopPropagation();
                                                window.location.href = route('anuncios.porCategoria', anuncio.categoria.id);
                                            }}
                                        >
                                            {/* {anuncio.categoria.nombre} */}
                                            {anuncio.categoria ? anuncio.categoria.nombre : 'Sin categoría'}

                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* autor */}
                                        <div className="flex items-center gap-1">
                                            <UserPen className="w-5" />
                                            <span className="font-semibold text-amber-600">{anuncio.user.name}</span>
                                        </div>

                                        {/* fecha */}
                                        <div className="flex items-center gap-1">
                                            <CalendarDays className="w-5" />
                                            <span className="font-medium text-amber-600">{new Date(anuncio.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                {/* descripcion */}
                                <CardDescription className="h-[2rem]">{limitarPalabras(anuncio.descripcion, limite)}</CardDescription>

                                {/* imagen */}
                                <div className="mx-auto my-5 flex h-[8rem] w-[12rem] items-center justify-center overflow-hidden rounded-md bg-neutral-700 md:h-[10rem]">
                                    {Array.isArray(anuncio.imagen) && anuncio.imagen.length > 0 && (
                                        <img
                                            src={`/storage/${anuncio.imagen[0]?.ruta}`}
                                            alt={`Imagen`}
                                            className="h-full w-auto object-contain p-2"
                                        />
                                    )}
                                </div>
                            </CardContent>

                            {/*CARD FOOTER */}
                            <CardFooter className="my-4 flex items-center justify-between border-t px-4 py-4">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateLike(anuncio.id);
                                        }}
                                        className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0"
                                    >
                                        <Heart
                                            className={`h-5.5 w-5.5 transition-transform duration-200 ${
                                                anuncio.liked_by_user
                                                    ? 'fill-red-400 text-red-400 hover:scale-105'
                                                    : 'text-gray-400 hover:scale-105 hover:text-red-400'
                                            }`}
                                        />
                                        <span className="text-md">{anuncio.likes_count}</span>
                                    </button>

                                    {/* contador comentarios */}
                                    <div className="flex items-center gap-1 text-neutral-400">
                                        <MessageCircleMore className="h-5 w-5 text-gray-400" />
                                        <span className="text-md text-neutral-200">{anuncio.comentario_count}</span>
                                    </div>
                                </div>

                                {/* BORRAR */}
                                {/* solo usuario que lo ah creado y admin */}
                                <div className="flex gap-4">
                                    {/* equivale a IF */}
                                    {userLogin && (userLogin.id === anuncio.user.id || userLogin.is_admin == true) && (
                                        <form method="POST" action={route('anuncios.destroy', anuncio.id)}>
                                            <input type="hidden" name="_token" value={getToken()} />
                                            <input type="hidden" name="_method" value="DELETE" />

                                            <Button
                                                type="submit"
                                                size="icon"
                                                variant="ghost"
                                                //  className='rounded-2xl border border-transparent font-semibold text-neutral-200 transition duration-400 hover:border hover:border-amber-700 hover:bg-transparent hover:cursor-pointer'
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-700 bg-transparent font-semibold text-neutral-200 transition duration-400 hover:border hover:border-red-800 hover:bg-red-800"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </form>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="rounded-2xl border border-transparent bg-amber-700 font-semibold text-neutral-200 transition duration-400 hover:border hover:border-amber-700 hover:bg-transparent"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Link href={route('anuncios.show', anuncio.id)}>Ver anuncio</Link>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            {/* PAGINACIÓN */}
             {/* eliminaa paginacion al hacer búsqueda        */}
            {!busqueda.trim() && (
                <div className="mt-2 mb-7 flex justify-center gap-2">
                    {initialAnuncios.links.map((link: any, idx: number) => (
                        <button
                            key={idx}
                            disabled={!link.url}
                            onClick={() => link.url && window.location.assign(link.url)}
                            className={`rounded-2xl px-3 py-1 ${
                                link.active
                                    ? 'bg-amber-700 font-bold text-white'
                                    : 'border border-amber-700 text-neutral-400 hover:cursor-pointer hover:text-neutral-100'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AppLayout>
    );
};

export default Index;
