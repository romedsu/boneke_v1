<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Anuncio;

class AnuncioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Anuncio::factory(20)->create();

       Anuncio::factory(20)->create()->each(function ($anuncio) {
            $anuncio->imagen()->create([
                'ruta' => 'imagenes/cat_' . rand(1, 10) . '.jpg',
            ]);
        });
    }
}
