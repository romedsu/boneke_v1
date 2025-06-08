import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowRightLeft, CalendarDays, Heart, LucidePenBox, MapPin, MessageCircleMore, PiggyBank, Trash2, UserPen } from 'lucide-react';

import React, { useState } from 'react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

import FlashMsj from '@/components/FlashMsj';

import Footer from '@/components/ui/footer';
import { Icon } from '@/components/ui/iconCat';
import { Inertia } from '@inertiajs/inertia';
import Comentarios from './Comentarios';

const getToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

const updateLike = async (anuncioId: number) => {
    try {
        await fetch(`/anuncios/${anuncioId}/like`, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': getToken(),
                'Content-Type': 'application/json',
            },
        });

        Inertia.reload({ only: ['anuncio'] });
    } catch (error) {
        console.error('Error al dar like:', error);
    }
};

const Detalle: React.FC<{ anuncio: any; userLogin: any; comentarios: any; categorias: any }> = ({ anuncio, userLogin, comentarios, categorias }) => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

    const [editable, setEditable] = useState<number | null>(null);
    const [categoriaId, setCategoriaId] = useState(anuncio.categoria?.id ? String(anuncio.categoria.id) : '');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Anuncios',
            href: '/anuncios',
        },
        {
            title: `${anuncio.articulo}`,
            href: `/anuncios/${anuncio.id}`,
        },
    ];

    const fecha = new Date(anuncio.created_at).toLocaleDateString();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FlashMsj />

            <div className="mx-auto flex h-full w-full max-w-full flex-1 flex-col overflow-x-hidden rounded-xl p-2 px-2 sm:max-w-xl sm:px-4 md:max-w-2xl md:px-8 lg:max-w-3xl lg:px-8 xl:max-w-3xl xl:p-4 xl:px-0">
                <Head title={anuncio.articulo}></Head>

                {/* HEADER */}
                <div className="m-2 flex flex-col items-center justify-end gap-2 md:flex-row">
                    {/* TITULO pagina*/}
                    <div className="flex w-full items-center justify-center text-4xl font-bold md:justify-start">
                        <h1>{anuncio.articulo ?? 'Boneke'}</h1>
                    </div>
                </div>

                <div className="flex w-full flex-col items-center">
                    <div className="mx-auto w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl">
                        <Card
                            key={anuncio.id}
                            className="mx-auto mb-8 w-full max-w-full border border-amber-600 bg-neutral-900 px-2 py-4 sm:max-w-xl sm:px-4 md:max-w-2xl md:px-2 lg:max-w-3xl xl:max-w-3xl"
                        >
                            <CardHeader>
                                {/* EDITAR */}
                                {editable === anuncio.id ? (
                                    <form
                                        method="POST"
                                        action={route('anuncios.update', anuncio.id)}
                                        encType="multipart/form-data"
                                        className="mx-auto w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl"
                                    >
                                        <h2 className="mb-2 text-center text-2xl font-bold text-amber-600">EDITAR</h2>
                                        <input type="hidden" name="_token" value={token} />
                                        <input type="hidden" name="_method" value="PUT" />

                                        <CardContent className="flex flex-col gap-7">
                                            <CardTitle className="flex flex-col gap-2 sm:flex-row sm:gap-5">
                                                <span className="text-lg font-semibold text-amber-600">Titulo:</span>
                                                <input
                                                    type="text"
                                                    name="articulo"
                                                    defaultValue={anuncio.articulo}
                                                    className="w-full border-b border-gray-500 bg-transparent text-base font-bold text-white focus:border-amber-600 focus:outline-none"
                                                />
                                            </CardTitle>

                                            {/* CATEGORIA EDICIÓN */}
                                            <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                                                <span className="text-lg font-semibold text-amber-600">Categoría:</span>
                                                <div className="mb-5 w-full font-semibold">
                                                    <Select value={categoriaId} onValueChange={setCategoriaId}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Elige una" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Categorías</SelectLabel>
                                                                {categorias.map((categoria: any) => (
                                                                    <SelectItem key={categoria.id} value={String(categoria.id)}>
                                                                        {categoria.nombre}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <input type="hidden" name="categoria_id" value={categoriaId} />
                                                </div>
                                            </CardTitle>

                                            {/* VALOR EDICIÓN */}
                                            <CardTitle className="flex flex-col gap-2 sm:flex-row sm:gap-5">
                                                <span className="text-lg font-semibold text-amber-600">Valor:</span>
                                                <input
                                                    type="number"
                                                    name="valor"
                                                    defaultValue={anuncio.valor}
                                                    className="w-full border-b border-gray-500 bg-transparent text-base font-bold text-white focus:border-amber-600 focus:outline-none"
                                                />
                                            </CardTitle>

                                            {/* DESCRIPCIÓN EDICIÓN */}
                                            <CardTitle className="flex flex-col gap-2 sm:flex-row sm:gap-5">
                                                <span className="text-lg font-semibold text-amber-600">Descripción:</span>
                                                <textarea
                                                    name="descripcion"
                                                    defaultValue={anuncio.descripcion}
                                                    className="w-full resize-none overflow-hidden border-b border-gray-500 bg-transparent text-base font-normal text-white focus:border-amber-600 focus:outline-none"
                                                    ref={(el) => {
                                                        if (el) {
                                                            el.style.height = 'auto';
                                                            el.style.height = el.scrollHeight + 'px';
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        const target = e.target as HTMLTextAreaElement;
                                                        target.style.height = 'auto';
                                                        target.style.height = target.scrollHeight + 'px';
                                                    }}
                                                />
                                            </CardTitle>

                                            {/* CAMBIO EDICIÓN */}
                                            <CardTitle className="flex flex-col gap-2 sm:flex-row sm:gap-5">
                                                <span className="text-lg font-semibold text-amber-600">Cambio:</span>
                                                <input
                                                    name="cambio"
                                                    defaultValue={anuncio.cambio}
                                                    className="w-full border-b border-gray-500 bg-transparent text-base font-normal text-white focus:border-amber-600 focus:outline-none"
                                                />
                                            </CardTitle>

                                            {/* LUGAR EDICIÓN */}
                                            <CardTitle className="flex flex-col gap-2 sm:flex-row sm:gap-5">
                                                <span className="text-lg font-semibold text-amber-600">Lugar:</span>
                                                <input
                                                    name="lugar"
                                                    defaultValue={anuncio.lugar}
                                                    className="w-full border-b border-gray-500 bg-transparent text-base font-normal text-white focus:border-amber-600 focus:outline-none"
                                                />
                                            </CardTitle>

                                            {/* IMAGENES EDICIÓN */}
                                            <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                                                <span className="text-lg font-semibold text-amber-600">Imágenes:</span>
                                                <label
                                                    htmlFor="imagen"
                                                    className="inline-block cursor-pointer rounded-lg border border-amber-600 bg-transparent px-2 py-1 text-sm font-semibold text-white transition hover:bg-amber-700"
                                                >
                                                    Seleccionar archivos
                                                    <input id="imagen" type="file" name="imagen[]" multiple accept="image/*" className="hidden" />
                                                </label>
                                                <span className="text-xs font-medium text-neutral-400">Puedes seleccionar varias imágenes</span>
                                            </CardTitle>
                                            {/* mostrar imagnes actuales */}
                                            {anuncio.imagen && anuncio.imagen.length > 0 && (
                                                <div className="my-2 flex flex-wrap gap-2">
                                                    {anuncio.imagen.map((img: any, idx: number) => (
                                                        <img
                                                            key={idx}
                                                            src={`/storage/${img.ruta}`}
                                                            alt={`Imagen ${idx + 1}`}
                                                            className="h-24 w-24 rounded border border-neutral-700 object-cover"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>

                                        <div className="mt-2 flex justify-end gap-2">
                                            <Button
                                                type="submit"
                                                className="text-md mx-0 mt-5 rounded-3xl bg-amber-700 font-semibold text-white hover:border hover:border-amber-700 hover:bg-transparent"
                                            >
                                                Actualizar
                                            </Button>
                                            <Button
                                                type="reset"
                                                className="text-md text-neutral-200-700 mx-0 mt-5 rounded-3xl border border-amber-700 bg-transparent font-semibold transition hover:border-red-700 hover:bg-red-700 hover:text-white"
                                                onClick={() => setEditable(null)}
                                            >
                                                Cancelar
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    //  -----------------<FIN EDITAR>-----------------
                                    <div>
                                        {/* TITULO */}
                                        <CardTitle className="m-1 mb-3 text-center text-3xl font-semibold transition duration-400 hover:text-amber-600 lg:mt-3">
                                            {anuncio.articulo}
                                        </CardTitle>
                                        <CardDescription className="mb-2 flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-5">
                                            {/* categoria anuncio */}
                                            <div className="flex items-center gap-1 text-lg">
                                                <Icon name={anuncio.categoria.icon} className="h-5 w-5 text-neutral-400" />
                                                <a
                                                    className="cursor-pointer text-sm font-semibold text-amber-600 hover:text-neutral-100 md:text-lg lg:text-xl"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.location.href = route('anuncios.porCategoria', anuncio.categoria.id);
                                                    }}
                                                >
                                                    {anuncio.categoria ? anuncio.categoria.nombre : 'Sin categoría'}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {/* autor */}
                                                <div className="flex items-center gap-1">
                                                    <UserPen className="w-3.5 md:w-4 lg:w-5" />
                                                    <span className="text-sm font-semibold text-amber-600 md:text-base lg:text-lg">
                                                        {anuncio.user.name}
                                                    </span>
                                                </div>
                                                {/* fecha */}
                                                <div className="flex items-center gap-1">
                                                    <CalendarDays className="w-3.5 md:w-4 lg:w-5" />
                                                    <span className="text-xs font-medium text-amber-600 md:text-base lg:text-lg">{fecha}</span>
                                                </div>
                                            </div>
                                        </CardDescription>

                                        <CardDescription className="text-justify text-neutral-200">{anuncio.descripcion}</CardDescription>

                                        {/* IMAGENES */}
                                        {anuncio.imagen && anuncio.imagen.length > 0 && (
                                            <div className="grid grid-cols-1 md:gap-2 lg:grid-cols-3">
                                                {/* CARRUSEL IMAGENES */}
                                                <Carousel className="col-span-2 mx-auto w-full max-w-sm">
                                                    <CarouselContent>
                                                        {anuncio.imagen.map((img: any, index: number) => (
                                                            <CarouselItem className="" key={index}>
                                                                <div>
                                                                    <Card className="mx-auto justify-center bg-neutral-800 p-3">
                                                                        <CardContent className="flex aspect-square items-center justify-center p-0 md:p-2">
                                                                            <img
                                                                                src={`/storage/${img.ruta}`}
                                                                                alt={`Imagen ${index + 1}`}
                                                                                className="mx-auto max-h-60 w-auto max-w-full rounded-lg object-contain md:max-h-96 md:max-w-full md:rounded-xl"
                                                                            />
                                                                        </CardContent>
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

                                                <CardDescription className="flex flex-col items-center justify-center gap-1 md:gap-4 lg:items-center">
                                                    <div className="flex w-full items-center justify-between lg:flex-col lg:items-center lg:justify-center lg:gap-1">
                                                        {/* LUGAR */}
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-4 w-4 md:h-6 md:w-6" />
                                                            <span className="text-[1rem] font-semibold text-neutral-200 md:text-xl">
                                                                {anuncio.lugar}
                                                            </span>
                                                        </div>
                                                        {/* VALOR */}
                                                        <div className="flex items-center gap-2">
                                                            <PiggyBank className="h-6 w-6 md:h-8 md:w-8" />
                                                            <span className="text-[1.4rem] font-semibold text-amber-600 md:text-3xl lg:text-4xl">
                                                                {anuncio.valor} €
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* CAMBIO */}
                                                    <div className="flex items-center justify-center gap-1">
                                                        <ArrowRightLeft className="h-5 w-5 md:h-6 md:w-6" />
                                                        <span className="text-[1rem] font-semibold text-amber-600 md:text-xl"> {anuncio.cambio}</span>
                                                    </div>
                                                    {/* EDITAR Y BORRAR */}
                                                    <CardFooter className="my-2 flex w-full items-center justify-between gap-10 border-t px-4 py-1 pt-6 md:items-center md:gap-4 lg:flex-col lg:items-center">
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    updateLike(anuncio.id);
                                                                }}
                                                                className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0"
                                                            >
                                                                <Heart
                                                                    className={`h-6.5 w-6.5 transition-transform duration-200 ${
                                                                        anuncio.liked_by_user
                                                                            ? 'fill-red-400 text-red-400 hover:scale-105'
                                                                            : 'text-gray-400 hover:scale-105 hover:text-red-400'
                                                                    }`}
                                                                />
                                                                <span className="text-md">{anuncio.likes_count}</span>
                                                            </button>
                                                            {/* contador comentarios */}
                                                            <div className="flex items-center gap-1 text-neutral-400">
                                                                <MessageCircleMore className="h-6 w-6 text-gray-400" />
                                                                <span className="text-md text-neutral-200">{anuncio.comentario_count}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 sm:gap-4">
                                                            {(userLogin?.id === anuncio.user.id || userLogin.is_admin == true) &&
                                                                editable !== anuncio.id && (
                                                                    <>
                                                                        <Button
                                                                            onClick={() => setEditable(anuncio.id)}
                                                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-amber-700 font-semibold text-neutral-200 transition duration-400 hover:border hover:border-amber-700 hover:bg-transparent sm:h-10 sm:w-10"
                                                                        >
                                                                            <LucidePenBox className="h-4 w-4 sm:h-5 sm:w-5" />
                                                                        </Button>
                                                                        <form method="POST" action={route('anuncios.destroy', anuncio.id)}>
                                                                            <input type="hidden" name="_token" value={token} />
                                                                            <input type="hidden" name="_method" value="DELETE" />
                                                                            <Button
                                                                                type="submit"
                                                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-700 bg-transparent font-semibold text-neutral-200 transition duration-400 hover:border hover:border-red-800 hover:bg-red-800 sm:h-10 sm:w-10"
                                                                            >
                                                                                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                                                            </Button>
                                                                        </form>
                                                                    </>
                                                                )}
                                                        </div>
                                                    </CardFooter>
                                                </CardDescription>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardHeader>
                        </Card>
                        {/* Al componente Comentarios se le pasan 3 parametros */}
                        <div className="mx-auto w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl">
                            <Comentarios comentarios={comentarios} anuncio_id={anuncio.id} userLogin={userLogin} />
                        </div>
                    </div>
                </div>
            </div>
                <Footer />
        </AppLayout>
    );
};
export default Detalle;
