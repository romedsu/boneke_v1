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
            ['nombre' => 'admin', 'email' => 'admin@a.com', 'is_admin' => true,],
            ['nombre' => 'Alba', 'email' => 'alba@a.com', 'is_admin' => false,],
            ['nombre' => 'Belen', 'email' => 'belen@b.com', 'is_admin' => false,],
            ['nombre' => 'Carlos', 'email' => 'carlos@c.com', 'is_admin' => false,],
            ['nombre' => 'Diana', 'email' => 'diana@d.com', 'is_admin' => false,],
            ['nombre' => 'Esteban', 'email' => 'esteban@e.com','is_admin' => false,],
            ['nombre' => 'Federica', 'email' => 'federica@f.com','is_admin' => false,],
        ];

        foreach ($usuarios as $usuario) {
            User::create([
                'name' => $usuario['nombre'],
                'email' => $usuario['email'],
                'password' => Hash::make('password'),
                'is_admin' => $usuario['is_admin'],
            ]);
        }
    }
}
