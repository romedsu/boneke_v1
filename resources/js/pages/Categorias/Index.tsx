import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorias',
        href: '/categorias/index',
    },
];

const Index: React.FC<{ categorias: any }> = ({ categorias }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categorías" />

            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] max-w-[1024px] flex-1 overflow-hidden rounded-xl border md:min-h-min">
               
               
               {/* TABLA */}
                <Table>
                   
                    <TableHeader className="bg-amber-700">
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>CATEGORIA</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categorias.map((categoria: any) => (
                            // <TableRow key={anuncio.id}>

                            //link al detalle de cada anuncio
                            <TableRow
                                key={categoria.id}
                                className="cursor-pointer duration-500 hover:bg-amber-700"
                                onClick={() => (window.location.href = route('anuncios.porCategoria', categoria.id))}
                            >
                                <TableCell className="font-medium">{categoria.id}</TableCell>
                                <TableCell className="font-medium">{categoria.nombre}</TableCell>
                                {/* <TableCell>{categoria.user.name}</TableCell> */}
                                {/* <TableCell>{categoria.lugar}</TableCell>
                                    <TableCell>{categoria.valor}</TableCell> */}
                                {/* <TableCell className='max-w-[50px]'>{limitarPalabras(categoria.descripcion,4)}</TableCell> */}
                                {/* <TableCell>{categoria.cambio}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
};

export default Index;
