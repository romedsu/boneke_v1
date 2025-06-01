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
         $categorias = [
            'Electrónica',
            'Vehículos',
            'Moda',
            'Deportes',
            'Hogar',
            'Jardín',
            'Mascotas',
            'Juguetes',
            'Libros',
            'Música',
            'Informática',
            'Servicios',
            'Empleo',
            'Salud',
            'Belleza',
            'Arte',
            'Coleccionismo',
            'Alimentación',
            'Muebles',
            'Fotografía',
            'Infantil',
            'Transporte',
            'Juegos',
            'Videojuegos',
            'Electrodomésticos',
        ];

         foreach ($categorias as $nombre) {
            Categoria::create(['nombre' => $nombre]);
        }
    }
}
