<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\Anuncio;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Inertia\Inertia;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comentarios=Comentario::with('user')->get();
        //datos del usuario logueado
        $userLogin = Auth::user();

        return Inertia::render('Anuncios/Detalles/Comentarios', [
            'comentarios' => $comentarios,
            'userLogin' => $userLogin,
            'flash'=>session('flash'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        
        $validated=$request->validate([
            'contenido'=>'required|string|max:1000',
            'anuncio_id' => 'required|exists:anuncios,id',
       ]);

       $validated['user_id']=Auth::id();
   

       Comentario::create($validated);

    //    return redirect()->route('anuncios.detalles.detalle', 
    //    ['id' => $validated['anuncio_id']])
    //     ->with('comentarioCreado', 'Comentario publicado');

    return back()->with('flash', 'Comentario publicado');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $comentario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // $comentario=Comentario::with('user')->findOrFail(id: $comentario->id);

        // dd('Método update llamado', $request->all());

        $validated=$request->validate([
            'contenido'=>'required|string|max:1000',
            'anuncio_id' => 'required|exists:anuncios,id',
       ]);
       $validated['user_id']=Auth::id();

       $comentario=Comentario::findOrFail($id);
        
       $comentario->update($validated);
       return back()->with('flash', 'Comentario actualizado');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
       $comentario=Comentario::findOrFail($id);
       $comentario->delete();
         return back()->with('flash', 'Comentario eliminado');
    }
}
