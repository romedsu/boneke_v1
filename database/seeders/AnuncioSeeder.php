<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Anuncio;
use App\Models\Categoria;
use App\Models\User;
use App\Models\Imagen;
use Faker\Factory as Faker;

use Illuminate\Support\Facades\Hash;

class AnuncioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Anuncio::factory(20)->create();

    //    Anuncio::factory(20)->create()->each(function ($anuncio) {
    //         $anuncio->imagen()->create([
    //             'ruta' => 'imagenes/cat_' . rand(1, 10) . '.jpg',
    //         ]);
    //     });



    $faker = Faker::create();

 $articulosCategorias = [
            'Bicicleta de montaña' => 'Deportes',
            'Teléfono móvil' => 'Electrónica',
            'Caja de naranjas' => 'Alimentación',
            'Silla de oficina'=> 'Muebles',
           
            'Cochecito de bebé' => 'Infantil',
            'Guitarra eléctrica' => 'Música',
            'Moto' => 'Vehículos',
            'Alfombra persa' => 'Hogar',
            'Aspiradora' => 'Electrodomésticos',
            'Cuadro óleo' => 'Arte',
            'Lámpara' => 'Hogar',
            'Impresora láser' => 'Informática',
            'Cuidado de personas mayores' => 'Servicios',
            'Tumbona' => 'Jardín',
            'Moneda antigua' => 'Coleccionismo',
            'Clases de inglés' => 'Servicios',
            'Sofá salón' => 'Muebles',
            'Reloj' => 'Moda',
            'Portátil Lenovo' => 'Informática',
            'Raqueta pádel' => 'Deportes',
            
            'Microondas'=> 'Electrodomésticos',
            'PlayStation 5' => 'Videojuegos',
            'Coche teledirigido' => 'Juguetes',
            'Mesa de comedor' => 'Muebles',
            'Tablet Samsung' => 'Electrónica',
            'Transportín para gatos' => 'Mascotas',
            'Patinete eléctrico' => 'Transporte',
            'Secador' => 'Belleza',
            'Juego de mesa' => 'Juegos',
            'Cámara retro' => 'Fotografía',
            'Cafetera espresso' => 'Electrodomésticos',
            'Libro de cocina' => 'Libros',
            'Altavoz Bluetooth'=> 'Electrónica',
            
            'Chaqueta de cuero' => 'Moda',
            'Nintendo Switch' => 'Videojuegos',
            
            'Collar de perro' => 'Mascotas',
            'Muñeca articulada' => 'Juguetes',
            'Lavadora'=> 'Electrodomésticos',
            'Reparaciones' => 'Servicios',
            'Bolso de mano' => 'Moda',
            'Televisor LED'=> 'Electrónica',
            'Tensiómetro digital' => 'Salud',
            
            'Cromos de fútbol' => 'Coleccionismo',
            'Patatas' => 'Alimentación',
            'Zapatillas ' => 'Moda',
            'Trona' => 'Infantil',
            'Puzzle 1000 piezas' => 'Juegos',
        ];

        $ciudades = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao',
    'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', 'Hospitalet', 'A Coruña', 'Vitoria', 'Granada', 'Elche'
    ];

        // $user = User::first(); 

        foreach ($articulosCategorias as $articulo => $categoriaNombre) {
            //  $articulo = $faker->randomElement(array_keys($articulosCategorias));
                 
            $categoria = Categoria::where('nombre', $categoriaNombre)->first();

            //Excepto admin
            $user = User::where('is_admin', false)->inRandomOrder()->first();

            $cambio = $faker->randomElement(array_keys($articulosCategorias));


               
               $anuncio =  Anuncio::create([
                   'articulo' => $articulo,
                   'valor' => rand(10, 2000),
                   'descripcion' => $faker->realText(200),
                //    'cambio' => $faker->randomElement(['No', 'Sí', 'A negociar']),
                   'cambio' => $cambio,
                   'lugar' => $faker->randomElement($ciudades),
                   'user_id' => $user->id,
                   'categoria_id' => $categoria?->id,
                   
                ]);


                // Obtener la primera palabra del artículo, quitar espacios y pasar a minúsculas
                // $imagen = strtolower(str_replace(' ', '', explode(' ', $articulo)[0])) . '.jpg';


                $imagen = explode(' ', $articulo)[0];
                $imagen = strtolower(iconv('UTF-8', 'ASCII//TRANSLIT', $imagen));
                $imagen = preg_replace('/[^a-z0-9]/', '', $imagen);
                
            Imagen::create([
                'anuncio_id' => $anuncio->id,
                // 'ruta' => 'imagenes/'.$imagen ,
                'ruta' => 'imagenes/'.$imagen . '.jpg',
            ]);




        }



    }
}
