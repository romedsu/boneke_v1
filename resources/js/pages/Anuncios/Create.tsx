import { type BreadcrumbItem } from '@/types';

// import Authenticated from '@/layouts/AuthenticatedLayout'

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Create = ({}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        articulo: '',
        valor: '',
        descripcion: '',
        cambio: '',
        lugar: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('anuncios.store'), { onSuccess: () => reset() });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Nuevo Anuncio',
            href: '/anuncios/create',
        },
    ];

    return (
        // <div>Index</div>
        // <AuthLayout   user={auth.user}>
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo anuncio" />
           
            <Card>
                <form onSubmit={submit}>
                    <label className="flex">
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

                    <label className="flex px-1">
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

                    <label className="flex px-1">
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

                    <label className="flex px-1">
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

                    <label className="flex px-1">
                        <Input
                            value={data.lugar}
                            onChange={(e) => setData('lugar', e.target.value)}
                            type="text"
                            className="m-2"
                            placeholder="Lugar:"
                            autoFocus
                        />
                        <InputError message={errors.lugar} />
                    </label>

                    <Button className="text-md mx-5 my-2 bg-amber-700 font-bold text-white">Publicar</Button>
                </form>
            </Card>

            <Card>
                <CardHeader className="bg-amber-700 p-4">
                    <CardTitle>Title</CardTitle>
                </CardHeader>
                <CardContent>Contenido</CardContent>
            </Card>

            {/* </AuthLayout> */}
        </AppLayout>
    );
};

export default Create;
