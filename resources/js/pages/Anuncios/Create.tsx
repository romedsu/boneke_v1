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
<div className="mx-auto flex h-full w-full max-w-full flex-1 flex-col rounded-xl p-2 px-4  md:px-6 lg:px-12 xl:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl xl:p-4">
                <Head title="Nuevo Anuncio" />

                {/* HEADER */}

                <div className="flex w-full items-center justify-center text-4xl font-bold md:justify-start">
                    <h1>{titulo}</h1>
                </div>

                <Card className="mx-auto w-full max-w-4xl items-start justify-center border border-amber-600 px-10 sm:px-10">
                    {' '}
                    <div className="flex items-center justify-center gap-2">
                        {/* <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 p-5">
        <AppLogoIcon className="w-17 fill-current text-[var(--foreground)] dark:text-white" />
    </div> */}
                        <img className="mb-4 w-60 bg-amber-700" src="/storage/boneke_04.png" alt="logo boneke" />
                    </div>
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
                            <textarea
                                value={data.descripcion}
                                onChange={(e) => setData('descripcion', e.target.value)}
                                className="mb-5 max-h-60 min-h-[3rem] w-full resize-y rounded-md border border-neutral-800 p-2"
                                placeholder="Descripción:"
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

                        <div className="flex justify-end">
                            <Button className="text-md mx-5 my-2 bg-amber-700 font-semibold text-white">Publicar</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Create;
