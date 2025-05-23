<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use App\Models\Comentario;
use App\Models\Imagen;
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
        
        $anuncios=Anuncio::with('user','imagen')->orderBy('created_at', 'desc') ->withCount('comentario','likes')->get()
         ->map(function ($anuncio) {
            // Agregar si el usuario actual ya dio like
            $anuncio->liked_by_user = $anuncio->likes->contains('user_id', Auth::id());
            return $anuncio;
        });

        //datos del usuario logueado
        $userLogin = Auth::user();
       
        return Inertia::render('Anuncios/Index', [
            'anuncios' => $anuncios,
            'userLogin' => $userLogin,
            'flash' => session('flash'),
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
        // dd('Método store llamado', $request->all());
        
       $validated=$request->validate([
            'articulo'=>'required|string|max:255',
            'valor'=>'required|numeric',
            'descripcion'=>'required|string|max:1000',
            'cambio'=>'required|string|max:255',
            'lugar'=>'required|string|max:255',
            'imagen'=>'required|array',
            'imagen.*'=>'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
       ]);

       $validated['user_id']=Auth::id();

     $anuncio= Anuncio::create([
        'articulo' => $validated['articulo'],
        'valor' => $validated['valor'],
        'descripcion' => $validated['descripcion'],
        'cambio' => $validated['cambio'],
        'lugar' => $validated['lugar'],
        'user_id' => $validated['user_id'],
       ]);

       //opción varias imágenes
       if ($request->hasFile('imagen')) {
        foreach ($request->file('imagen') as $img) {
            $path = $img->store('imagenes', 'public'); 

            Imagen::create([
                'anuncio_id' => $anuncio->id, 
                'ruta' => $path,
            ]);
        }
    }

    // dd($ruta);
    
    //opcion 1 imagen
      // Imagen::create([
      //     'anuncio_id'=> $anuncio->id,
      //     'ruta'=>$request->file('imagen')->store('imagenes','public'),
      // ]);
    
       return redirect()->route('anuncios.index')->with('flash','Anuncio creado con éxtio');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $anuncio = Anuncio::with('user','imagen')->findOrFail($id);
    $userLogin = Auth::user();

    $comentarios=Comentario::where('anuncio_id',$id)->with('user')->get();

    // $imagen=Imagen::where('anuncio_id',$id)->get();

    return Inertia::render('Anuncios/Detalles/Detalle', [
        'anuncio' => $anuncio,
        'userLogin' => $userLogin,
        'comentarios' => $comentarios,
        // 'imagen' => $imagen,
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
     //  dd('Método update llamado', $request->all());

        $validated=$request->validate([
            'articulo'=>'required|string|max:255',
            'valor'=>'required|numeric',
            'descripcion'=>'required|string|max:1000',
            // 'cambio'=>'required|string|max:255',
            // 'lugar'=>'required|string|max:255',
        ]);
        
        $anuncio=Anuncio::findOrFail($id);
        
        $anuncio->update($validated);

        //OPCION v1 (desde la vista de editar con formulario)
        // return redirect()->route('anuncios.index')->with('actualizado','Anuncio editado con éxito');

        return back()->with('flash','Anuncio actualizado con éxito');
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $anuncio=Anuncio::findOrFail($id);
        $anuncio->delete();
        
        return redirect()->route('anuncios.index')->with('flash','Anuncio eliminado');
        
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
