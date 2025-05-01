import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

const Edit = ({ anuncio }) => {
    const { data, setData, put, processing, errors } = useForm({
        articulo: anuncio.articulo || '',
        descripcion: anuncio.descripcion || '',
        cambio: anuncio.cambio || '',
        valor: anuncio.valor || '',
        lugar: anuncio.lugar || '',
    });
    // console.log(anuncio);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('anuncios.update', anuncio.id)); // Enviar al controlador para actualizar
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Editar Anuncio',
            href: '/{anuncio.id}/edit',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <label className="flex">
                            <Input
                                value={data.articulo ?? ''}
                                onChange={(e) => setData('articulo', e.target.value)}
                                type="text"
                                className="m-2"
                                placeholder="Articulo:"
                                autoFocus
                            />
                            <InputError message={errors.articulo} />
                        </label>

                        <label className="flex px-1">
                            <Input
                                value={data.valor ?? ''}
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
                                value={data.descripcion ?? ''}
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
                                value={data.cambio ?? ''}
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
                                value={data.lugar ?? ''}
                                onChange={(e) => setData('lugar', e.target.value)}
                                type="text"
                                className="m-2"
                                placeholder="Lugar:"
                                autoFocus
                            />
                            <InputError message={errors.lugar} />
                        </label>

                        <Button className="text-md mx-5 my-2 bg-amber-700 font-bold text-white">Actualizar</Button>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Edit;
