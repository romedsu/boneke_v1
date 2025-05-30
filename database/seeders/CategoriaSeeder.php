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
            'Inmuebles',
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
            'Viajes',
            'Salud',
            'Belleza',
            'Arte',
            'Coleccionismo',
            'Alimentación',
        ];

         foreach ($categorias as $nombre) {
            Categoria::create(['nombre' => $nombre]);
        }
    }
}
