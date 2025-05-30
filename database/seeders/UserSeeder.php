<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $usuarios = [
            ['nombre' => 'Alba', 'email' => 'alba@a.com'],
            ['nombre' => 'Belen', 'email' => 'belen@b.com'],
            ['nombre' => 'Carlos', 'email' => 'carlos@c.com'],
            ['nombre' => 'Diana', 'email' => 'diana@d.com'],
            ['nombre' => 'Esteban', 'email' => 'esteban@e.com'],
        ];

        foreach ($usuarios as $usuario) {
            User::create([
                'name' => $usuario['nombre'],
                'email' => $usuario['email'],
                'password' => Hash::make('password'),
            ]);
        }
    }
}
