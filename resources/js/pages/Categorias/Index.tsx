import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useState } from 'react';
import Buscador from '@/components/Buscador';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorias',
        href: '/categorias/index',
    },
];

const Index: React.FC<{ categorias: any; titulo: any }> = ({ categorias, titulo }) => {
      const [busqueda, setBusqueda] = useState('');
        const categoriasFiltrados = categorias.filter(
        (categoria: any) =>
            categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
         
    );
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
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

                {/* TABLA */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {categoriasFiltrados.map((categoria: any) => (
                        <div
                            key={categoria.id}
                            className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 shadow transition hover:bg-amber-700"
                            onClick={() => (window.location.href = route('anuncios.porCategoria', categoria.id))}
                        >
                            <span className="w-16 font-bold">ID: {categoria.id}</span>
                            <span className="font-medium">{categoria.nombre}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
