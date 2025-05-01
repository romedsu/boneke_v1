<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $fillable =[
        'contenido',
        'anuncio_id',
        'user_id',

    ];
    public function anuncio()
    {
        return $this->belongsTo(Anuncio::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
