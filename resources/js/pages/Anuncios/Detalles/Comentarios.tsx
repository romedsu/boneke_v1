// import Authenticated from '@/layouts/AuthenticatedLayout'

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import NuevoComentario from './NuevoComentario';

import { LucidePenBox, Trash2 } from 'lucide-react';

import React, { useState } from 'react';

// const Comentarios: React.FC<{ comentarios: any[]; anuncio_id: number }> = ({ comentarios, anuncio_id }) => {
const Comentarios: React.FC<{ comentarios: any[]; anuncio_id: number; userLogin: any }> = ({ comentarios, anuncio_id, userLogin }) => {
    //TOKEN (recuperar token almacenado en meta, para su uso en botones editar y borrar)
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

    //EDITAR desde la propia vista
    const [editable, setEditable] = useState<number | null>(null);

    return (
        <div>

            <h1>COMENTARIOS</h1>
            {comentarios.map((comentario) => (
                //   const fecha= new Date(comentario.created_at).toLocaleDateString();
                
                <div className="flex justify-center">
                    <Card key={comentario.id} className="mx-4 my-2 w-full max-w-[970px] flex-col bg-neutral-800 px-1">
                        <CardHeader>
                            <CardTitle>User_id: {comentario.user_id}</CardTitle>
                            {/* <CardDescription>Publicado por <span className='font-black text-amber-600'>{comentario.user.name}</span> el <span className='font-medium text-amber-600'>{fecha}</span></CardDescription> */}
                            {/* <CardDescription>Publicado por <span className='font-black text-amber-600'>{comentario.user.name}</span> </CardDescription> */}
                        </CardHeader>

                        <CardContent>
                            {editable === comentario.id ? (
                                // Modo de edición (editable o no)
                                <form method="POST" action={route('comentarios.update', comentario.id)}>
                                    <input type="hidden" name="_token" value={token} />
                                    <input type="hidden" name="anuncio_id" value={anuncio_id} />
                                    <input type="hidden" name="_method" value="PUT" />
                                    <textarea name="contenido" defaultValue={comentario.contenido} className="w-full rounded border p-2"></textarea>
                                    <div className="mt-2 flex gap-2">
                                        <Button type="submit" className="p-3">
                                            Guardar
                                        </Button>
                                        <Button type="button" className="p-3" onClick={() => setEditable(null)}>
                                            Cancelar
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                // Modo de visualización
                                <CardDescription>Contenido - {comentario.contenido}</CardDescription>
                            )}
                        </CardContent>

                        <CardFooter className="flex justify-end gap-4">
                            {userLogin.id === comentario.user_id && editable !== comentario.id && (
                                <Button onClick={() => setEditable(comentario.id)} className="p-3">
                                    <LucidePenBox />
                                </Button>
                            )}

                            {userLogin.id === comentario.user_id && (
                                <form method="POST" action={route('comentarios.destroy', comentario.id)}>
                                    <input type="hidden" name="_token" value={token} />
                                    <input type="hidden" name="_anuncio_id" value={anuncio_id} />

                                    <input type="hidden" name="_method" value="DELETE" />
                                    <Button type="submit" className="p-3">
                                        <Trash2 />
                                    </Button>
                                </form>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            ))}

            <NuevoComentario anuncio_id={anuncio_id} />
        </div>
    );
};

export default Comentarios;
