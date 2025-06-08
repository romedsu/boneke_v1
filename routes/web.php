<?php

use App\Http\Controllers\AnuncioController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CategoriaController;


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');


// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// Route::middleware(['auth', 'verified'])
//         ->group(function () {
//             Route::get('/dashboard', [AnuncioController::class, 'dashboard'])->name('dashboard');
//             Route::get('/', [AnuncioController::class, 'dashboard'])->name('home');
// });
    
Route::get('/', [AnuncioController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])
        ->group(function () {
            Route::get('/dashboard', [AnuncioController::class, 'dashboard'])->name('dashboard');
        
});

//index anuncios para no logueados
Route::get('/anuncios', [AnuncioController::class, 'index'])->name('anuncios.index');

//ANUNCIOS
Route::resource('anuncios', AnuncioController::class)
        ->only(['store','update','edit','destroy','show','create'])
        ->middleware(['auth']);

//ACTUALIZAR LIKE
Route::put('/anuncios/{anuncio}/like', [AnuncioController::class, 'updateLike'])->middleware('auth');
        
Route::get('/anuncios/categoria/{categoriaId}', [AnuncioController::class, 'porCategoria'])->name('anuncios.porCategoria');

Route::get('/mis-anuncios', [AnuncioController::class, 'misAnuncios'])->name('anuncios.misAnuncios')->middleware('auth');

Route::get('/mis-likes', [AnuncioController::class, 'misLikes'])->name('anuncios.misLikes')->middleware('auth');


Route::get('/contacto',function(){
        return Inertia::render('Contacto');
});

//COMENTARIOS
Route::resource('comentarios', ComentarioController::class);


Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

//LIKES
Route::put('/likes/{anuncio}', [LikeController::class, 'update'])->middleware('auth');

//CATEGORIAS
Route::resource('categorias', CategoriaController::class)
        ->only(['index','show','store','destroy'])
        ->middleware(['auth']);

//BUSCADOR (anuncio controller)
Route::get('/buscar', [AnuncioController::class, 'buscar']);  

//QUINES SOMOS
Route::get('/quienes-somos', function () {
    return Inertia::render('quienes-somos');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
