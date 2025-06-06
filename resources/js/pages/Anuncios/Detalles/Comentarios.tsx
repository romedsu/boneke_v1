// import Authenticated from '@/layouts/AuthenticatedLayout'

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import NuevoComentario from './NuevoComentario';

import { LucidePenBox, MessagesSquare, Trash2 } from 'lucide-react';

import React, { useState } from 'react';

// const Comentarios: React.FC<{ comentarios: any[]; anuncio_id: number }> = ({ comentarios, anuncio_id }) => {
const Comentarios: React.FC<{ comentarios: any[]; anuncio_id: number; userLogin: any }> = ({ comentarios, anuncio_id, userLogin }) => {
    //TOKEN (recuperar token almacenado en meta, para su uso en botones editar y borrar)
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

    //EDITAR desde la propia vista
    const [editable, setEditable] = useState<number | null>(null);

    return (
        <div className="mb-10 flex flex-col justify-center">
            <NuevoComentario anuncio_id={anuncio_id} />

            {comentarios.length != 0 && (
                <div className="flex mb-1 w-full items-center justify-end gap-2 pr-5 lg:mt- lg:justify-center">
                    <MessagesSquare />
                    <h1 className="font-medium text-amber-600 lg:text-xl">COMENTARIOS</h1>
                </div>
            )}
            {comentarios.map((comentario) => (
                <div key={comentario.id} className="flex justify-center">
                    <Card key={comentario.id}
                     className="my-2 mx-0  w-full flex-col px-1 py-3">
                        <CardHeader>
                            {/* <CardTitle> {comentario.user.name}</CardTitle> */}

                            <CardTitle className="mb-1 text-right text-sm font-light">
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
                            <CardFooter className="mt-3 flex justify-end gap-4">
                                <Button
                                    onClick={() => setEditable(comentario.id)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-amber-700 font-semibold text-neutral-200 transition duration-400 hover:border hover:border-amber-700 hover:bg-transparent"
                                >
                                    <LucidePenBox />
                                </Button>

                                <form method="POST" action={route('comentarios.destroy', comentario.id)}>
                                    <input type="hidden" name="_token" value={token} />
                                    <input type="hidden" name="_anuncio_id" value={anuncio_id} />

                                    <input type="hidden" name="_method" value="DELETE" />
                                    <Button
                                        type="submit"
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-700 bg-transparent font-semibold text-neutral-200 transition duration-400 hover:border hover:border-red-800 hover:bg-red-800"
                                    >
                                        <Trash2 />
                                    </Button>
                                </form>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default Comentarios;
