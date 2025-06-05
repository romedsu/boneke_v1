<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //  $categorias = [
        //     'Electrónica',
        //     'Vehículos',
        //     'Moda',
        //     'Deportes',
        //     'Hogar',
        //     'Jardín',
        //     'Mascotas',
        //     'Juguetes',
        //     'Libros',
        //     'Música',
        //     'Informática',
        //     'Servicios',
        //     'Empleo',
        //     'Salud',
        //     'Belleza',
        //     'Arte',
        //     'Coleccionismo',
        //     'Alimentación',
        //     'Muebles',
        //     'Fotografía',
        //     'Infantil',
        //     'Transporte',
        //     'Juegos',
        //     'Videojuegos',
        //     'Electrodomésticos',
        // ];

            $categorias = [
        ['nombre' => 'Electrónica',      'icon' => 'Laptop'],
        ['nombre' => 'Vehículos',        'icon' => 'Car'],
        ['nombre' => 'Moda',             'icon' => 'Shirt'],
        ['nombre' => 'Deportes',         'icon' => 'Volleyball'],
        ['nombre' => 'Hogar',            'icon' => 'Home'],
        ['nombre' => 'Jardín',           'icon' => 'Leaf'],
        ['nombre' => 'Mascotas',         'icon' => 'PawPrint'],
        ['nombre' => 'Juguetes',         'icon' => 'Puzzle'],
        ['nombre' => 'Libros',           'icon' => 'Book'],
        ['nombre' => 'Música',           'icon' => 'Music'],
        ['nombre' => 'Informática',      'icon' => 'Laptop'],
        ['nombre' => 'Servicios',        'icon' => 'Paintbrush'],
        ['nombre' => 'Empleo',           'icon' => 'UserCheck'],
        ['nombre' => 'Salud',            'icon' => 'HeartPulse'],
        ['nombre' => 'Belleza',          'icon' => 'Scissors'],
        ['nombre' => 'Arte',             'icon' => 'Palette'],
        ['nombre' => 'Coleccionismo',    'icon' => 'Star'],
        ['nombre' => 'Alimentación',     'icon' => 'Utensils'],
        ['nombre' => 'Muebles',          'icon' => 'Sofa'],
        ['nombre' => 'Fotografía',       'icon' => 'Camera'],
        ['nombre' => 'Infantil',         'icon' => 'Baby'],
        ['nombre' => 'Transporte',       'icon' => 'Bus'],
        ['nombre' => 'Juegos',           'icon' => 'Dices'],
        ['nombre' => 'Videojuegos',      'icon' => 'Gamepad2'],
        ['nombre' => 'Electrodomésticos','icon' => 'Refrigerator'],
    ];


         foreach ($categorias as $categoria) {
            Categoria::create([
                'nombre' => $categoria['nombre'], 
                'icon' => $categoria['icon']
        ]);
        }
    }
}
