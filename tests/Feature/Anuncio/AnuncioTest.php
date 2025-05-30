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
    $user = User::factory()->create(['name' => 'Ana López']);
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    $anuncio = Anuncio::factory()->for($user)->create([
        'articulo' => 'Portátil HP',
        'descripcion' => 'Portátil en perfecto estado',
        'lugar' => 'Madrid',
        'categoria_id' => $categoria->id,
    ]);

    $response = get(route('anuncios.index'));
    $response->assertStatus(200);

    // Obtener los datos de Inertia directamente como array
    $page = $response->viewData('page') ?? $response->original->getData()['page'];
    $anuncioData = $page['props']['anuncios'][0];

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
    $anuncio = Anuncio::factory()->for($user1)->create(['categoria_id' => $categoria->id]);

    actingAs($user2)
        ->delete(route('anuncios.destroy', $anuncio))
        ->assertForbidden();

    expect(Anuncio::find($anuncio->id))->not->toBeNull();
});

//TEST: Un usuario logueado puede actualizar su propio anuncio
test('un usuario logueado puede actualizar su propio anuncio', function () {
    $user = User::factory()->create();
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    $anuncio = Anuncio::factory()->for($user)->create(['categoria_id' => $categoria->id]);

    actingAs($user)
        ->put(route('anuncios.update', $anuncio), [
            'articulo' => 'Nuevo título',
            'valor' => 200,
            'descripcion' => 'Actualizado',
            'cambio' => 'No',
            'lugar' => 'Oviedo',
            'categoria_id' => $categoria->id,
        ])
       ->assertForbidden();
        expect(Anuncio::find($anuncio->id)->articulo)->not->toBe('Nuevo título');
});

//TEST: Un usuario  no puede actualizar un anuncio de otro usuario
test('un usuario no puede actualizar el anuncio de otro usuario', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    $anuncio = Anuncio::factory()->for($user1)->create(['categoria_id' => $categoria->id]);

    actingAs($user2)
        ->put(route('anuncios.update', $anuncio), [
            'articulo' => 'Hackeado',
            'valor' => 999,
            'descripcion' => 'No debería poder',
            'cambio' => 'Sí',
            'lugar' => 'Madrid',
            'categoria_id' => $categoria->id,
        ])
        ->assertForbidden();

    expect(Anuncio::find($anuncio->id)->articulo)->not->toBe('Hackeado');
});

//TEST: Un usuario no logueado no puede actualizar un anuncio sin título/artículo
test('un usuario no logueado no puede ver el detalle de un anuncio', function () {
    $categoria = Categoria::create(['nombre' => 'Electrónica']);
    $anuncio = Anuncio::factory()->create(['categoria_id' => $categoria->id]);

    get(route('anuncios.show', $anuncio))
       ->assertRedirect(route('login'));
});
     

  
