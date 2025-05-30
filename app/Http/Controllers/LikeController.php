<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $anuncioId)
    {
        $user = Auth::user();
        $like = Like::where('user_id', $user->id)->where('anuncio_id', $anuncioId)->first();

    // JSON
    if ($like) {
        $like->delete();
        return response()->json(['liked' => false]);
    } else {
        Like::create(['user_id' => $user->id, 'anuncio_id' => $anuncioId]);
        return response()->json(['liked' => true]);
    }

//INERTIA
//   if ($like) {
//         $like->delete();
//         return redirect()->back()->with('flash', 'Dislike');
//     } else {
//         Like::create(['user_id' => $user->id, 'anuncio_id' => $anuncioId]);
//         return redirect()->back()->with('flash', '¡Te gusta!');
//     }


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Like $like)
    {
        //
    }
}
