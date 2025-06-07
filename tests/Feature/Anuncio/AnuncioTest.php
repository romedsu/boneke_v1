<?php

use App\Models\User;
use App\Models\Categoria;
use App\Models\Anuncio;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;


//TEST: Un usuario no registrado puede ver el listado de anuncios
test('un usuario no registrado puede ver el listado de anuncios', function () {
    $response = get(route('anuncios.index'));
    $response->assertStatus(200)
            //se espera encontrar el texto "Anuncios"
             ->assertSee('Anuncios');
});

//TEST: Un usuario registrado puede crear un anuncio
test('un usuario registrado puede crear un anuncio', function () {
   Storage::fake('public');
    $user = User::factory()->create();
    // Creamos una categoría manualmente, igual que en el seeder
    $categoria = Categoria::create(['nombre' => 'Electrónica']);

    actingAs($user)
        ->post(route('anuncios.store'), [
            'articulo' => 'Bicicleta de montaña',
            'valor' => 150.00,
            'descripcion' => 'Bicicleta en buen estado, poco uso.',
            'cambio' => 'No',
            'lugar' => 'Gijón',
            'categoria_id' => $categoria->id,
            'imagen' => [UploadedFile::fake()->image('anuncio.jpg')], 
        ])
        ->assertRedirect(route('anuncios.index'));

    expect(Anuncio::where('articulo', 'Bicicleta de montaña')->exists())->toBeTrue();
});

// TEST: Un usuario registrado puede ver el formulario de creación de anuncios
test('un usuario no registrado no puede crear anuncios', function () {
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    post(route('anuncios.store'), [
        'articulo' => 'Bicicleta de montaña',
        'valor' => 150.00,
        'descripcion' => 'Bicicleta en buen estado, poco uso.',
        'cambio' => 'No',
        'lugar' => 'Oviedo',
        'categoria_id' => $categoria->id,
        // No se envía imagen porque el usuario no está autenticado y será redirigido antes de validar
    ])->assertRedirect(route('login'));
});

// TEST: Un anuncio no puede crearse sin título/artículo
test('no se puede crear un anuncio sin artículo', function () {
    $user = User::factory()->create();
    $categoria = Categoria::create(['nombre' => 'Electrónica']);

    actingAs($user)
        ->post(route('anuncios.store'), [
            // 'articulo' => 'Falta el artículo',
            'valor' => 100,
            'descripcion' => 'Sin artículo',
            'cambio' => 'No',
            'lugar' => 'Gijón',
            'categoria_id' => $categoria->id,
            'imagen' => [UploadedFile::fake()->image('anuncio.jpg')],
        ])
        ->assertSessionHasErrors('articulo');
});


// TEST: Cada anuncio muestra su autor, artículo, descripción y lugar
test('cada anuncio muestra su autor, artículo, descripción y lugar', function () {
    Anuncio::query()->delete(); // Limpia la tabla

    $user = User::factory()->create(['name' => 'Ana López']);
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    $anuncio = Anuncio::create([
        'user_id' => $user->id,
        'articulo' => 'Portátil HP',
        'descripcion' => 'Portátil en perfecto estado',
        'lugar' => 'Madrid',
        'categoria_id' => $categoria->id,
        'valor' => 100,
        'cambio' => 'No',
    ]);

    actingAs($user);

    $response = get(route('anuncios.index'));
    $response->assertStatus(200);

    $page = $response->viewData('page') ?? $response->original->getData()['page'];

    // Si usas paginación, accede así:
    $anuncios = $page['props']['anuncios']['data'] ?? $page['props']['anuncios'];

    $anuncioData = collect($anuncios)->firstWhere('id', $anuncio->id);

    expect($anuncioData)->not->toBeNull();
    expect($anuncioData['articulo'])->toBe('Portátil HP');
    expect($anuncioData['user']['name'])->toBe('Ana López');
    expect($anuncioData['descripcion'])->toBe('Portátil en perfecto estado');
    expect($anuncioData['lugar'])->toBe('Madrid');
});

// TEST: No se puede crear un anuncio con texto en el valor
test('no se puede crear un anuncio con texto en el valor', function () {
    $user = User::factory()->create();
    $categoria = Categoria::create(['nombre' => 'Electrónica']);

    actingAs($user)
        ->post(route('anuncios.store'), [
            'articulo' => 'Artículo negativo',
            'valor' => 'hola',
            'descripcion' => 'Valor negativo',
            'cambio' => 'No',
            'lugar' => 'Gijón',
            'categoria_id' => $categoria->id,
            'imagen' => [UploadedFile::fake()->image('anuncio.jpg')],
        ])
        ->assertSessionHasErrors('valor');
});

// TEST: Un usuario no puede eliminar un anuncio de otro usuario
test('un usuario no puede eliminar un anuncio de otro usuario', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    $anuncio = Anuncio::create([
        'user_id' => $user1->id,
        'categoria_id' => $categoria->id,
        'articulo' => 'Tablet',
        'valor' => 200,
        'descripcion' => 'Tablet nueva',
        'cambio' => 'No',
        'lugar' => 'Madrid',
    ]);

    actingAs($user2)
        ->delete(route('anuncios.destroy', $anuncio))
        ->assertStatus(302); 
});

//TEST: Un usuario logueado puede actualizar su propio anuncio
test('un usuario logueado puede actualizar su propio anuncio', function () {
    $user = User::factory()->create();
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    $anuncio = Anuncio::create([
        'user_id' => $user->id,
        'categoria_id' => $categoria->id,
        'articulo' => 'Tablet',
        'valor' => 200,
        'descripcion' => 'Tablet original',
        'cambio' => 'No',
        'lugar' => 'Madrid',
    ]);

    actingAs($user)
        ->put(route('anuncios.update', $anuncio), [
            'articulo' => 'Nuevo título',
            'valor' => 200,
            'descripcion' => 'Actualizado',
            'cambio' => 'No',
            'lugar' => 'Oviedo',
            'categoria_id' => $categoria->id,
        ])
        ->assertStatus(302); // O usa ->assertRedirect(...) si tu app redirige tras actualizar

    $anuncio->refresh();
    expect($anuncio->articulo)->toBe('Nuevo título');
});
//TEST: Un usuario  no puede actualizar un anuncio de otro usuario
test('un usuario no puede actualizar el anuncio de otro usuario', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    $anuncio = Anuncio::create([
        'user_id' => $user1->id,
        'categoria_id' => $categoria->id,
        'articulo' => 'Tablet',
        'valor' => 200,
        'descripcion' => 'Tablet nueva',
        'cambio' => 'No',
        'lugar' => 'Madrid',
    ]);

    actingAs($user2)
        ->put(route('anuncios.update', $anuncio), [
            'articulo' => 'Hackeado',
            'valor' => 999,
            'descripcion' => 'No debería poder',
            'cambio' => 'Sí',
            'lugar' => 'Madrid',
            'categoria_id' => $categoria->id,
        ])
        ->assertStatus(302);
        
});

//TEST: Un usuario no logueado no puede actualizar un anuncio sin título/artículo
test('un usuario no logueado no puede ver el detalle de un anuncio', function () {
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    $anuncio = Anuncio::create([
        'user_id' => User::factory()->create()->id,
        'categoria_id' => $categoria->id,
        'articulo' => 'Tablet',
        'valor' => 200,
        'descripcion' => 'Tablet nueva',
        'cambio' => 'No',
        'lugar' => 'Madrid',
    ]);

    get(route('anuncios.show', $anuncio))
       ->assertRedirect(route('login'));
});

  
