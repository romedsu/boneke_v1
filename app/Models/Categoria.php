<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categoria extends Model
{
    protected $fillable = [
        'nombre',
        'icon',
    ];

    public function anuncios()
    {
        return $this->hasMany(Anuncio::class);
    }

      use HasFactory;
}
