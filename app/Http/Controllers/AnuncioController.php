<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use App\Models\Comentario;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;


class AnuncioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //    $anuncios=Anuncio::all();
    //     $anuncios=Anuncio::with('user')->get();
       
    // //    return Inertia::render('dashboard', [
    // //        'articulos' => $articulos,
    // //    ]);

    // return Inertia::render('Anuncios/Index2', ['anuncios'=>$anuncios]);
    
    // // return Inertia::render('Articulos/Index');
    // // return Inertia::render('Anuncios/Index2');
    // }



    public function index(){
        // $anuncios=Anuncio::all();

        //with->datos de los anuncios y los datos relacionados con ese usuario
        //withCount -> para acragar en nº de comentarios
        //get-> Toddos los annunciios
        
        $anuncios=Anuncio::with('user') ->withCount('comentario')->get();

        //datos del usuario logueado
        $userLogin = Auth::user();
       
        return Inertia::render('Anuncios/Index', [
            'anuncios' => $anuncios,
            'userLogin' => $userLogin,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Anuncios/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $validated=$request->validate([
            'articulo'=>'required|string|max:255',
            'valor'=>'required|numeric',
            'descripcion'=>'required|string|max:1000',
            'cambio'=>'required|string|max:255',
            'lugar'=>'required|string|max:255',
       ]);

       $validated['user_id']=Auth::id();

       Anuncio::create($validated);

       return redirect()->route('anuncios.index')->with('creado','Anuncio creado con éxtio');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $anuncio = Anuncio::with('user')->findOrFail($id);
    $userLogin = Auth::user();

    $comentarios=Comentario::where('anuncio_id',$id)->with('user')->get();

    return Inertia::render('Anuncios/Detalles/Detalle', [
        'anuncio' => $anuncio,
        'userLogin' => $userLogin,
        'comentarios' => $comentarios,
    ]);
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $anuncio=Anuncio::findOrFail($id);
        
        return Inertia::render('Anuncios/Edit', props: ['anuncio'=>$anuncio]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated=$request->validate([
            'articulo'=>'required|string|max:255',
            'valor'=>'required|numeric',
            'descripcion'=>'required|string|max:1000',
            'cambio'=>'required|string|max:255',
            'lugar'=>'required|string|max:255',
        ]);
        
        $anuncio=Anuncio::findOrFail($id);
        
        $anuncio->update($validated);
        return redirect()->route('anuncios.index')->with('actualizado','Anuncio editado con éxito');
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $anuncio=Anuncio::findOrFail($id);
        $anuncio->delete();
        
        return redirect()->route('anuncios.index')->with('eliminado','Anuncio eliminado con éxito');
        
    }

    public function dashboard(){
        // $anuncios=Anuncio::all();
        $anuncios=Anuncio::with('user')->get();
       
        return Inertia::render('dashboard', [
            'anuncios' => $anuncios,
        ]);
    }

    
    // public function index2(){
    //     // $anuncios=Anuncio::all();
    //     $anuncios=Anuncio::with('user')->get();
       
    //     return Inertia::render('Anuncios/Index2', [
    //         'anuncios' => $anuncios,
    //     ]);
    // }

 
    
}
