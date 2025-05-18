<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
 //para que reconzoca el nombre de la tabla 'imagenes' (no 'imagens')  
   protected $table = 'imagenes';

    protected $fillable=[
        'anuncio_id',
        'ruta',
    ];


    public function anuncio(){
        return $this->belongsTo(Anuncio::class);
    }

    // public function user(){
    //     return $this->belongsTo(User::class);
    // }
}
