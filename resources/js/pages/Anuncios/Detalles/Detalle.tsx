import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarDays, LayoutGrid, LucidePenBox, Trash2, UserPen } from 'lucide-react';

import React, { useState } from 'react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

import FlashMsj from '@/components/FlashMsj';

const Detalle: React.FC<{ anuncio: any; userLogin: any; comentarios: any; categorias: any }> = ({ anuncio, userLogin, comentarios, categorias }) => {
    // console.log ('Anuncio:', anuncio);
    // console.log (anuncio.imagen[0]?.ruta);
    // console.log(anuncio.imagen);

    //TOKEN (recuperar token almacenado en meta, para su uso en botones editar y borrar)
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
            <div className="mx-auto flex h-full max-w-7xl flex-1 flex-col gap-4 rounded-xl p-4">
                <Head title={anuncio.articulo}></Head>

                {/* HEADER */}
                <div className="m-4 flex flex-col items-center justify-end gap-2 md:flex-row">
                    {/* TITULO pagina*/}
                    <div className="flex w-full items-center justify-center text-4xl font-bold md:justify-start">
                        <h1>{anuncio.articulo ?? 'Boneke'}</h1>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Card
                        key={anuncio.id}
                        className={`m-auto w-[50rem] bg-neutral-800 px-1 ${
                            editable === anuncio.id ? 'border border-amber-600' : 'border border-transparent'
                        }`}
                    >
                        <CardHeader>
                            {/* EDITAR */}
                            {editable === anuncio.id ? (
                                <form method="POST" action={route('anuncios.update', anuncio.id)} encType="multipart/form-data">
                                    <h2 className="mb-2 text-center text-2xl font-bold text-amber-600">EDITAR</h2>
                                    <input type="hidden" name="_token" value={token} />
                                    <input type="hidden" name="_method" value="PUT" />

                                    {/* TITULO EDICIÓN */}
                                    <CardContent className="flex flex-col gap-7">
                                        <CardTitle className="flex gap-5">
                                            {' '}
                                            <span className="text-lg font-semibold text-amber-600">Titulo:</span>
                                            <input
                                                type="text"
                                                name="articulo"
                                                defaultValue={anuncio.articulo}
                                                className="border-b border-gray-500 bg-transparent text-base font-bold text-white focus:border-amber-600 focus:outline-none"
                                            />
                                        </CardTitle>

                                        {/* CATEGORIA EDICIÓN */}
                                        <CardTitle className="flex items-center gap-5">
                                            <span className="text-lg font-semibold text-amber-600">Categoría:</span>
                                            <div className="mb-5 w-[180px]">
                                                <Select value={categoriaId} onValueChange={setCategoriaId}>
                                                    <SelectTrigger>
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
                                                {/* Input oculto para enviar el valor al backend */}
                                                <input type="hidden" name="categoria_id" value={categoriaId} />
                                            </div>
                                        </CardTitle>

                                        {/* VALOR EDICIÓN */}
                                        <CardTitle className="flex gap-5">
                                            {' '}
                                            <span className="text-lg font-semibold text-amber-600">Valor:</span>
                                            <input
                                                type="number"
                                                name="valor"
                                                defaultValue={anuncio.valor}
                                                className="border-b border-gray-500 bg-transparent text-base font-bold text-white focus:border-amber-600 focus:outline-none"
                                            />
                                        </CardTitle>

                                        {/* DESCRIPCIÓN EDICIÓN */}
                                        <CardTitle className="flex gap-5">
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
                                        <CardTitle className="flex gap-5">
                                            {' '}
                                            <span className="text-lg font-semibold text-amber-600">Cambio:</span>
                                            <input
                                                // type="text"
                                                name="cambio"
                                                defaultValue={anuncio.cambio}
                                                className="border-b border-gray-500 bg-transparent text-base font-normal text-white focus:border-amber-600 focus:outline-none"
                                            />
                                        </CardTitle>

                                        {/* LUGAR EDICIÓN */}
                                        <CardTitle className="flex gap-5">
                                            <span className="text-lg font-semibold text-amber-600">Lugar:</span>
                                            <input
                                                name="lugar"
                                                defaultValue={anuncio.lugar}
                                                className="border-b border-gray-500 bg-transparent text-base font-normal text-white focus:border-amber-600 focus:outline-none"
                                            />
                                        </CardTitle>

                                        {/* IMAGENES EDICIÓN */}
                                        <CardTitle className="flex items-center gap-5">
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
                                    </CardContent>

                                    <div className="mt-2 flex justify-end gap-2">
                                        <Button type="submit" className="text-md mx-0 mt-5 rounded-3xl bg-amber-700 font-bold text-white">
                                            Actualizar
                                        </Button>
                                        <Button
                                            type="reset"
                                            className="text-md text-neutral-200-700 mx-0 mt-5 rounded-3xl border border-amber-700 bg-transparent font-bold transition hover:border-red-700 hover:bg-red-700 hover:text-white"
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
                                    <CardTitle className="mt-1.5 font-semibold transition duration-400 hover:text-amber-600">
                                        {anuncio.articulo}
                                    </CardTitle>
                                    <CardDescription className="mb-2 flex justify-between gap-5">
                                        {/* categoria anuncio */}
                                        <div className="flex items-center gap-1">
                                            <LayoutGrid className="w-4" />
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
                                                <UserPen className="w-4" />
                                                <span className="font-semibold text-amber-600">{anuncio.user.name}</span>
                                            </div>

                                            {/* fecha */}
                                            <div className="flex items-center gap-1">
                                                <CalendarDays className="w-4" />
                                                <span className="font-medium text-amber-600">
                                                    {new Date(anuncio.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </CardDescription>
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

                                    <CardDescription>
                                        <p>Nº de comentarios: {comentarios.length}</p>
                                    </CardDescription>
                                </div>
                            )}
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
            </div>

            {/* Al componente Comentarios se le pasan 3 parametros */}
            {/* <Comentarios comentarios={comentarios} anuncio_id={anuncio.id} userLogin={userLogin} /> */}
        </AppLayout>
    );
};
export default Detalle;
