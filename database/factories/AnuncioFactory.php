<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Categoria;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Anuncio>
 */
class AnuncioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //NO
        
        $articulosCategorias = [
            'Bicicleta de montaña' => 'Deportes',
            'Teléfono móvil' => 'Electrónica',
            'Portátil Lenovo' => 'Informática',
            'Silla de oficina'=> 'Muebles',
            'Cámara réflex' => 'Fotografía',
            'Mesa de comedor' => 'Muebles',
            
            'Guitarra eléctrica' => 'Música',
            'Aspiradora' => 'Electrodomésticos',
            'Impresora láser' => 'Informática',
            'Sofá de tres plazas' => 'Muebles',
            'Reloj inteligente' => 'Electrónica',
            'Tablet Samsung' => 'Electrónica',
            'Cochecito de bebé' => 'Infantil',
            'PlayStation 4' => 'Videojuegos',
            'Patinete eléctrico' => 'Transporte',
            'Juego de mesa' => 'Juegos',
            'Nintendo Switch' => 'Videojuegos',

            'Cafetera espresso' => 'Electrodomésticos',
            'Libro de cocina' => 'Libros',
            'Microondas'=> 'Electrodomésticos',
            'Lavadora'=> 'Electrodomésticos',
            'Televisor LED'=> 'Electrónica',
            'Altavoz Bluetooth'=> 'Electrónica',
            
            'Chaqueta de cuero' => 'Moda',
            'Zapatillas ' => 'Moda',
            'Bolso de mano' => 'Moda',
            'Lámpara de pie' => 'Hogar',
            'Alfombra persa' => 'Hogar',
            'Transportín para gatos' => 'Mascotas',
            'Collar de perro' => 'Mascotas',
            'Muñeca articulada' => 'Juguetes',
            'Coche teledirigido' => 'Juguetes',
            'Clases de inglés' => 'Servicios',
            'Cuidado de niños' => 'Servicios',
            'Reparaciones' => 'Servicios',
            'Tensiómetro digital' => 'Salud',

                
            'Moneda antigua' => 'Coleccionismo',
            'Cromos de fútbol' => 'Coleccionismo',
            'Caja de naranjas' => 'Alimentación',
            'Patatas' => 'Alimentación',
            
            'Trona' => 'Infantil',
            'Puzzle 1000 piezas' => 'Juegos',
        ];
        
        $articulo = $this->faker->randomElement(array_keys($articulosCategorias));
        $categoriaNombre = $articulosCategorias[$articulo];
        
        $categoria = Categoria::where('nombre', $categoriaNombre)->first();

        
        
        return [
        'articulo' => $articulo,
        'valor' => $this->faker->randomFloat(2, 10, 2000),
        'descripcion' => $this->faker->realText(200), 
        'cambio' => $this->faker->randomElement(['No', 'Sí', 'A negociar']),
        'lugar' => $this->faker->city(),
        'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
        'categoria_id' => $categoria?->id ?? Categoria::factory(),
    ];

        
    }
}
