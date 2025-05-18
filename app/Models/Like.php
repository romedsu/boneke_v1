<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = [
        'user_id',
        'anuncio_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function anuncio()
    {
        return $this->belongsTo(Anuncio::class);
    }
}
