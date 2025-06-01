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

                <div className="flex justify-center">
                    <Card key={comentario.id} className="mx-4 my-2 w-full max-w-[50rem] flex-col bg-neutral-800 px-1 py-4">
                        <CardHeader>
                            {/* <CardTitle> {comentario.user.name}</CardTitle> */}

                           <CardTitle className="text-sm font-light  mb-3 text-right">
                                        {' '}
                                        Publicado por <span className="font-bold text-amber-600">{comentario.user.name}</span> el{' '}
                                        <span className="font-medium text-amber-600">{new Date(comentario.created_at).toLocaleDateString()}</span>
                                    </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {/* OPERADOR TERNARIO (editable con id de comentario o no editable (visualizacion) con null) */}
                            {editable === comentario.id ? (
                                // Modo de editable
                                <form method="POST" action={route('comentarios.update', comentario.id)}>
                                    <input type="hidden" name="_token" value={token} />
                                    <input type="hidden" name="anuncio_id" value={anuncio_id} />
                                    <input type="hidden" name="_method" value="PUT" />

                                    <textarea name="contenido" defaultValue={comentario.contenido} className="w-full rounded border p-2"></textarea>
                                    <div className="mt-2 flex gap-2">
                                        <Button type="submit" className="p-3">
                                            Actualizar
                                        </Button>
                                        <Button type="button" className="p-3" onClick={() => setEditable(null)}>
                                            Cancelar
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                // Modo de visualización
                                <CardDescription> {comentario.contenido}</CardDescription>
                            )}
                        </CardContent>

                        {userLogin.id === comentario.user_id && editable !== comentario.id && (
                            <CardFooter className="flex justify-end gap-4">
                                <Button onClick={() => setEditable(comentario.id)} className="p-3">
                                    <LucidePenBox />
                                </Button>

                                <form method="POST" action={route('comentarios.destroy', comentario.id)}>
                                    <input type="hidden" name="_token" value={token} />
                                    <input type="hidden" name="_anuncio_id" value={anuncio_id} />

                                    <input type="hidden" name="_method" value="DELETE" />
                                    <Button type="submit" className="p-3">
                                        <Trash2 />
                                    </Button>
                                </form>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            ))}

            <NuevoComentario anuncio_id={anuncio_id} />
        </div>
    );
};

export default Comentarios;
