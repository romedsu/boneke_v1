<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use App\Models\Comentario;
use App\Models\Imagen;
use App\Models\Categoria;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        //get-> Toddos los annuncios
        
        $anuncios=Anuncio::with('user','imagen','categoria')
        ->orderBy('created_at', 'desc') 
        ->withCount('comentario','likes')
        ->paginate(9);

        // ->get()
        //  ->map(function ($anuncio) {
        //     // Agregar si el usuario actual ya dio like
        //     $anuncio->liked_by_user = $anuncio->likes->contains('user_id', Auth::id());
        //     return $anuncio;
        // });

          $anuncios->getCollection()->transform(function ($anuncio) {
        $anuncio->liked_by_user = $anuncio->likes->contains('user_id', Auth::id());
        return $anuncio;
    });


        //datos del usuario logueado
        $userLogin = Auth::user();
       
        return Inertia::render('Anuncios/Index', [
            'anuncios' => $anuncios,
            'userLogin' => $userLogin,
            'flash' => session('flash'),
            'titulo' => 'Anuncios',
            
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
           $categorias = Categoria::all(['id', 'nombre']);
    return Inertia::render('Anuncios/Create', [
        'categorias' => $categorias
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd('Método store llamado', $request->all());
        // Categoria::find($request->categoria_id);
        
       $validated=$request->validate([
            'articulo'=>'required|string|max:50',
            'valor'=>'required|numeric',
            'descripcion'=>'required|string|max:1000',
            'cambio'=>'required|string|max:25',
            'lugar'=>'required|string|max:25',
            'imagen'=>'required|array',
            'imagen.*'=>'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'categoria_id' => 'required|exists:categorias,id',
       ]);

       $validated['user_id']=Auth::id();

     $anuncio= Anuncio::create([
        'articulo' => $validated['articulo'],
        'valor' => $validated['valor'],
        'descripcion' => $validated['descripcion'],
        'cambio' => $validated['cambio'],
        'lugar' => $validated['lugar'],
        'user_id' => $validated['user_id'],
        'categoria_id' => $validated['categoria_id'],
       ]);

       //opción varias imágenes
       if ($request->hasFile('imagen')) {
        foreach ($request->file('imagen') as $img) {
            $path = $img->store('nuevas', 'public'); 

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
    
       return redirect()->route('anuncios.index')->with('flash','Anuncio creado');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $anuncio = Anuncio::with('user','imagen','categoria')
    ->withCount('comentario','likes')
    ->findOrFail($id);
    $userLogin = Auth::user();

     $anuncio->liked_by_user = $anuncio->likes->contains('user_id', Auth::id());
     
    $comentarios=Comentario::where('anuncio_id',$id)->with('user')
     ->orderBy('created_at', 'desc')
    ->get();
    $categorias = Categoria::all(['id', 'nombre']);

    // $imagen=Imagen::where('anuncio_id',$id)->get();

    return Inertia::render('Anuncios/Detalles/Detalle', [
        'anuncio' => $anuncio,
        'userLogin' => $userLogin,
        'comentarios' => $comentarios,
        // 'imagen' => $imagen,
        'flash' => session('flash'),
        'categorias'=>$categorias,
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
try{
        $validated=$request->validate([
            'articulo'=>'required|string|max:50',
            'valor'=>'required|numeric',
            'descripcion'=>'required|string|max:1000',
            'cambio'=>'required|string|max:25',
            'lugar'=>'required|string|max:25',
            'categoria_id' => 'required|exists:categorias,id',
            'imagen' => 'nullable|array',
            'imagen.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            
        ]);
        
        $anuncio=Anuncio::findOrFail($id);
        
        // AUTORIZACIÓN Solo el usuario que lo creo puede actualizarlo
        //  $this->authorize('update', $anuncio);
        
        
        // $anuncio->update($validated);
          $anuncio->update([
        'articulo' => $validated['articulo'],
        'valor' => $validated['valor'],
        'descripcion' => $validated['descripcion'],
        'cambio' => $validated['cambio'],
        'lugar' => $validated['lugar'],
        'categoria_id' => $validated['categoria_id'],
        
    ]);
        
        // Si se suben nuevas imágenes, las guardamos y eliminamos las anteriores
        
        if ($request->hasFile('imagen')) {
            // Elimina imágenes anteriores
            foreach ($anuncio->imagen as $img) {
                Storage::disk('public')->delete($img->ruta);
                $img->delete();
            }
            // Guarda las nuevas imágenes
            foreach ($request->file('imagen') as $img) {
                $path = $img->store('nuevas', 'public');
                Imagen::create([
                    'anuncio_id' => $anuncio->id,
                    'ruta' => $path,
                ]);
            }
        }
        
        
        //OPCION v1 (desde la vista de editar con formulario)
        // return redirect()->route('anuncios.index')->with('actualizado','Anuncio editado con éxito');

        return back()->with('flash','Anuncio actualizado');
           } catch (\Exception $e) {
        return back()->with('flash', 'No se pudo actualizar el anuncio.');
           }
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $anuncio=Anuncio::findOrFail($id);
            // $this->authorize('delete', $anuncio);
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

 
   //ANUNCIORS POR CATEGORÍA
public function porCategoria($categoriaId)
{
    $anuncios = Anuncio::with('user', 'imagen', 'categoria')
        ->where('categoria_id', $categoriaId)
        ->orderBy('created_at', 'desc')
        ->withCount('comentario', 'likes')
        ->paginate(9);

    $anuncios->getCollection()->transform(function ($anuncio) {
        $anuncio->liked_by_user = $anuncio->likes->contains('user_id', Auth::id());
        return $anuncio;
    });

    $userLogin = Auth::user();

    return Inertia::render('Anuncios/Index', [
        'anuncios' => $anuncios,
        'userLogin' => $userLogin,
        'flash' => session('flash'),
    ]);
}
//MIS ANUNCIOS (anuncios del usuario logueado)
public function misAnuncios()
{
    $anuncios = Anuncio::with('user', 'imagen', 'categoria')
        ->where('user_id', Auth::id())
        ->orderBy('created_at', 'desc')
        ->withCount('comentario', 'likes')
        ->paginate(9);

       $anuncios->getCollection()->transform(function ($anuncio) {
        $anuncio->liked_by_user = $anuncio->likes->contains('user_id', Auth::id());
        return $anuncio;
    });


    return inertia('Anuncios/Index', [
        'anuncios' => $anuncios,
        'userLogin' =>Auth::user(),
        'titulo' => 'Mis Anuncios',
        'flash' => session('flash'),
    ]);
}

//MIS LIKES (anuncios que le gustan al usuario logueado)
public function misLikes()
{
    $anuncios = Anuncio::whereHas('likes', function ($query) {
            $query->where('user_id', Auth::id());
        })
        ->with('user', 'imagen', 'categoria')
        ->orderBy('created_at', 'desc')
        ->withCount('comentario', 'likes')
        ->paginate(9);

 
    $anuncios->getCollection()->transform(function ($anuncio) {
        $anuncio->liked_by_user = true;
        return $anuncio;
    });

    return inertia('Anuncios/Index', [
        'anuncios' => $anuncios,
        'userLogin' => Auth::user(),
        'titulo' => 'Favoritos',
        'flash' => session('flash'),
    ]);
}

public function updateLike(Anuncio $anuncio)
{
    $user = Auth::user();
    $liked = $anuncio->likes()->where('user_id', $user->id)->exists();

    if ($liked) {
        $anuncio->likes()->where('user_id', $user->id)->delete();
    } else {
        $anuncio->likes()->create(['user_id' => $user->id]);
    }

    // Refresca los datos del anuncio
    $anuncio->loadCount('likes');
    $anuncio->liked_by_user = !$liked;

    session()->flash('flash', $liked ? 'Like eliminado' : 'Like añadido');


    return response()->json([
        'anuncio' => $anuncio,
        'liked' => !$liked,

    ]);
}


//BUSCADOR
public function buscar(Request $request)
{
    $query = $request->input('query');

    $anuncios = Anuncio::with(['categoria', 'user','imagen'])
        ->where('articulo', 'like', "%{$query}%")
        ->orWhere('descripcion', 'like', "%{$query}%")
        ->orWhere('lugar', 'like', "%{$query}%")
        ->get();

    return response()->json($anuncios);
}
    
}
