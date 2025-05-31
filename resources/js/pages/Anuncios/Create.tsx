import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Card } from '@/components/ui/card';

const Create: React.FC<{ categorias: { id: number; nombre: string }[]; titulo?: string }> = ({ categorias, titulo = 'Nuevo Anuncio' }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        articulo: '',
        valor: '',
        descripcion: '',
        cambio: '',
        lugar: '',
        imagen: [] as File[],
        categoria_id: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('anuncios.store'), {
            // data,
            onSuccess: () => reset(),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Nuevo Anuncio',
            href: '/anuncios/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex m-5 h-full max-w-7xl flex-1 flex-col rounded-xl p-4">
                <Head title="Nuevo Anuncio" />

                {/* HEADER */}

                <div className="flex w-full items-center justify-center text-4xl font-bold md:justify-start">
                    <h1>{titulo}</h1>
                </div>

                <Card className="mx-auto w-full max-w-4xl items-start justify-centerpx-10 sm:px-10">
                    {' '}
                    <form onSubmit={submit} encType="multipart/form-data">
                        <label>
                            <span className="my-0"> Articulo</span>
                            <Input
                                value={data.articulo}
                                onChange={(e) => setData('articulo', e.target.value)}
                                type="text"
                                className="mb-5"
                                placeholder="Artículo:"
                                autoFocus
                            />
                            <InputError message={errors.articulo} />
                        </label>
                        <label>
                            Categoria
                            <Select onValueChange={(value) => setData('categoria_id', value)} value={data.categoria_id}>
                                <SelectTrigger className="mb-5 w-[180px]">
                                    <SelectValue placeholder="Elige una" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categorias</SelectLabel>
                                        {categorias.map((categoria) => (
                                            <SelectItem key={categoria.id} value={String(categoria.id)}>
                                                {categoria.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </label>

                        <label>
                            Valor
                            <Input
                                value={data.valor}
                                onChange={(e) => setData('valor', e.target.value)}
                                type="number"
                                className="mb-5"
                                placeholder="Valor:"
                                autoFocus
                            />
                            <InputError message={errors.valor} />
                        </label>

                        <label>
                            Descripción
                            <Input
                                value={data.descripcion}
                                onChange={(e) => setData('descripcion', e.target.value)}
                                type="text"
                                className="mb-5"
                                placeholder="Descripcion:"
                                autoFocus
                            />
                            <InputError message={errors.descripcion} />
                        </label>

                        <label>
                            Cambio por
                            <Input
                                value={data.cambio}
                                onChange={(e) => setData('cambio', e.target.value)}
                                type="text"
                                className="mb-5"
                                placeholder="Cambio por:"
                                autoFocus
                            />
                            <InputError message={errors.cambio} />
                        </label>

                        <label>
                            Lugar
                            <Input
                                value={data.lugar}
                                onChange={(e) => setData('lugar', e.target.value)}
                                type="text"
                                className="mb-5"
                                placeholder="Lugar:"
                                autoFocus
                            />
                            <InputError message={errors.lugar} />
                        </label>

                        <label>
                            Imagen (obligatorio)
                            <Input
                                // value={data.imagen}
                                onChange={(e) => setData('imagen', e.target.files ? Array.from(e.target.files) : [])}
                                type="file"
                                className="mb-5"
                                accept="image/*"
                                multiple
                            />
                            <InputError message={errors.imagen} />
                        </label>

                        <Button className="text-md mx-5 my-2 bg-amber-700 font-bold text-white">Publicar</Button>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Create;
