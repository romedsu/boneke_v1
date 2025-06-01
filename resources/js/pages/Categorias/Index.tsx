import Buscador from '@/components/Buscador';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

import FlashMsj from '@/components/FlashMsj';

import { Button } from '@/components/ui/button';
import { Inertia } from '@inertiajs/inertia';
import { Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorias',
        href: '/categorias/index',
    },
];
const getToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

const Index: React.FC<{ categorias: any; titulo: any; userLogin: any }> = ({ categorias, titulo, userLogin }) => {
    const [busqueda, setBusqueda] = useState('');
    const categoriasFiltrados = categorias.filter((categoria: any) => categoria.nombre.toLowerCase().includes(busqueda.toLowerCase()));

    const { data, setData, post, processing, reset, errors } = useForm({ nombre: '' });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FlashMsj />

            {/* CONTENIDO */}
            <div className="mx-4 flex h-full max-w-7xl flex-1 flex-col gap-4 rounded-xl p-4">
                <Head title="Categorías" />

                {/* HEADER */}
                <div className="m-4 flex flex-col items-center justify-end gap-2 md:flex-row">
                    <div className="flex w-full items-center justify-center text-4xl font-bold md:justify-start">
                        <h1>{titulo ?? 'Boneke'}</h1>
                    </div>

                    {/* BUSCADOR */}
                    <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
                </div>

                {/* NUEVA CATEGORIA (solo admin)  */}
                {userLogin && userLogin.is_admin==true && (
                    // <div className="fixed right-4 bottom-4">
                    <div className="m-auto mb-4 flex w-[40rem] flex-col items-center justify-center gap-4 rounded-xl bg-neutral-900 p-5 shadow-md">
                        <h3 className="text-2xl">Nueva categoria</h3>

                        <div className="flex w-[30rem] items-end">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(route('categorias.store'), {
                                        onSuccess: () => reset(),
                                    });
                                }}
                                className="flex w-full gap-6"
                            >
                                <input
                                    type="text"
                                    className="mb-0 flex-1 rounded border bg-neutral-800 px-2 py-1 focus:border-amber-600 focus:outline-none"
                                    value={data.nombre}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    placeholder="Nombre de la categoría"
                                />
                                <button
                                    type="submit"
                                    className="rounded-3xl bg-amber-700 px-4 py-2 font-bold text-white hover:bg-amber-800"
                                    disabled={processing}
                                >
                                    Añadir
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* TABLA */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {categoriasFiltrados.map((categoria: any) => (
                        <div
                            key={categoria.id}
                            className="flex cursor-pointer items-center gap-4 rounded-lg border bg-neutral-900 p-4 shadow transition hover:bg-amber-700"
                            onClick={() => (window.location.href = route('anuncios.porCategoria', categoria.id))}
                        >
                            <span className="w-16 font-bold">ID: {categoria.id}</span>
                            <span className="font-medium">{categoria.nombre}</span>

                            {/* BORRAR CATEGORIA (solo admin) */}
                           {userLogin && userLogin.is_admin==true && (
                                // OPCION A
                                // <form method="POST" action={route('categorias.destroy', categoria.id)}>
                                //     <input type="hidden" name="_token" value={getToken()} />
                                //     <input type="hidden" name="_method" value="DELETE" />
                                //     <Button>
                                //         <Trash2 />
                                //     </Button>
                                // </form>

                                // OPCION B
                                <Button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        Inertia.post(route('categorias.destroy', categoria.id), {
                                            _method: 'DELETE',
                                        });
                                    }}
                                    className="ml-auto flex h-10 w-10 rounded-full border border-amber-700 bg-transparent font-semibold text-neutral-200 transition duration-400 hover:border hover:border-red-800 hover:bg-red-800"
                                >
                                    <Trash2 />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
