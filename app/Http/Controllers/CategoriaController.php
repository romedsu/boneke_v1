<?php

namespace App\Http\Controllers;

use App\Models\Categoria;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categoria::all();

        $userLogin = Auth::user();
       return inertia('Categorias/Index',
       ['categorias' => $categorias,
        'titulo' => 'Categorias',
        'userLogin' => $userLogin,
        'flash' => session('flash'),
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
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);
        Categoria::create($validatedData);
        return redirect()->route('categorias.index')->with('flash', 'Categoría creada');
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $categoria= Categoria::findOrFail($id);
        $categoria->delete();
        return redirect()->route('categorias.index')->with('flash', 'Categoría eliminada');
    }
}
