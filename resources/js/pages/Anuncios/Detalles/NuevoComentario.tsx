// import Authenticated from '@/layouts/AuthenticatedLayout'

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Textarea } from "@/components/ui/textarea";

const NuevoComentario: React.FC<{anuncio_id:number}> = ({anuncio_id}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        contenido: '',
        anuncio_id: anuncio_id || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('comentarios.store'), { onSuccess: () => reset() });
    };

    return (
        <div >
            <h1>NUEVO COMENTARIO</h1>
            <div className='flex justify-center'>
            <Card className='m-4 w-full max-w-[970px]'>
                <form onSubmit={submit} >
                    <label className="flex flex-col">
                        Añade tu comentario :
                        {/* <Input
                            value={data.articulo}
                            onChange={(e) => setData('articulo', e.target.value)}
                            type="text"
                            className="m-2"
                            placeholder="Artículo:"
                            autoFocus
                            />
                            <InputError message={errors.articulo} /> */}

                        <Textarea className='mt-3'
                            placeholder="¿Qué opinas sobre este anuncio?"
                            value={data.contenido}
                            onChange={(e) => setData('contenido', e.target.value)}
                        >

                        </Textarea>
                    </label>


                    <div className="flex justify-end">
                        <Button disabled={processing} className="text-md mx-0 mt-5 bg-amber-700 font-bold text-white ">Comentar</Button>
                    </div>
                </form>
            </Card>
            </div>
        
        </div>
    );
};

export default NuevoComentario;
