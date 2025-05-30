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


  $articulos = [
        'Bicicleta de montaña',
        'Teléfono móvil',
        'Portátil Lenovo',
        'Silla de oficina',
        'Cámara réflex',
        'Mesa de comedor',
        'Zapatillas deportivas',
        'Guitarra eléctrica',
        'Aspiradora',
        'Impresora láser',
        'Sofá de tres plazas',
        'Reloj inteligente',
        'Tablet Samsung',
        'Cochecito de bebé',
        'Patinete eléctrico',
        'Microondas',
        'Lavadora',
        'Televisor LED',
        'Altavoz Bluetooth',
        'Cafetera automática',
    ];

        return [
        'articulo' => $this->faker->randomElement($articulos),
        'valor' => $this->faker->randomFloat(2, 10, 2000),
        'descripcion' => $this->faker->realText(200), 
        'cambio' => $this->faker->randomElement(['No', 'Sí', 'A negociar']),
        'lugar' => $this->faker->city(),
        'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
        'categoria_id' => Categoria::inRandomOrder()->first()?->id ?? Categoria::factory(),
    ];

        
    }
}
