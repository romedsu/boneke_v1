import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Card } from '@/components/ui/card';

const Create = ({}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        articulo: '',
        valor: '',
        descripcion: '',
        cambio: '',
        lugar: '',
        imagen:[] as File[],
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
            <Head title="Nuevo anuncio" />

            <Card>
                <form onSubmit={submit} encType="multipart/form-data">
                    <label>
                        Articulo
                        <Input
                            value={data.articulo}
                            onChange={(e) => setData('articulo', e.target.value)}
                            type="text"
                            className="m-2"
                            placeholder="Artículo:"
                            autoFocus
                        />
                        <InputError message={errors.articulo} />
                    </label>

                    <label>
                        Valor
                        <Input
                            value={data.valor}
                            onChange={(e) => setData('valor', e.target.value)}
                            type="number"
                            className="m-2"
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
                            className="m-2"
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
                            className="m-2"
                            placeholder="Cambio por:"
                            autoFocus
                        />
                        <InputError message={errors.cambio} />
                    </label>

                    <label>
                        Lugar
                        <Input
                            value={data.lugar}
                            onChange={(e) => setData('lugar',e.target.value)}
                            type="text"
                            className="m-2"
                            placeholder="Lugar:"
                            autoFocus
                        />
                        <InputError message={errors.lugar} />
                    </label>

                    <label>
                        Imagen (obligatorio)
                        <Input
                            // value={data.imagen}
                            onChange={(e) => setData('imagen',  e.target.files ? Array.from(e.target.files): [])}
                            type="file"
                            className="m-2"
                           accept='image/*'
                           multiple
                        />
                        <InputError message={errors.imagen} />
                    </label>

                    <Button className="text-md mx-5 my-2 bg-amber-700 font-bold text-white">Publicar</Button>
                </form>
            </Card>
        </AppLayout>
    );
};

export default Create;
