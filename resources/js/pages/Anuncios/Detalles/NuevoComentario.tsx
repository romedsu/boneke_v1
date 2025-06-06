// import Authenticated from '@/layouts/AuthenticatedLayout'

import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

import { Card } from '@/components/ui/card';

import { Textarea } from '@/components/ui/textarea';
import { MessageCirclePlus } from 'lucide-react';

const NuevoComentario: React.FC<{ anuncio_id: number }> = ({ anuncio_id }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        contenido: '',
        anuncio_id: anuncio_id || 0,
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route('comentarios.store'), { onSuccess: () => reset() });
    };

    return (
        <div className="mt-0 mb-4">
            <div className="flex mb-1 w-full items-center justify-end gap-2 pr-6 lg:justify-center">
                <MessageCirclePlus />
                <h1 className="font-medium text-amber-600 lg:text-xl">NUEVO COMENTARIO</h1>
            </div>
            <div className="mx-0 flex flex-col items-center">
                <Card 
                className="mx-2 mt-2 mb-3 w-full max-w-[48rem] border border-neutral-600">
                    <form onSubmit={submit}>
                        <label className="flex flex-col">
                            Añade tu comentario :
                            <Textarea
                                className="mt-3"
                                placeholder="¿Qué opinas sobre este anuncio?"
                                value={data.contenido}
                                onChange={(e) => setData('contenido', e.target.value)}
                            ></Textarea>
                        </label>

                        <div className="flex justify-end">
                            <Button
                                disabled={processing}
                                className="h-7 px-3 text-md mx-0 mt-5 rounded-3xl bg-amber-700 font-medium text-white hover:border hover:border-amber-700 hover:bg-transparent"
                            >
                                Comentar
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default NuevoComentario;
