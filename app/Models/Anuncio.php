<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Anuncio extends Model
{
   protected $fillable= [
   //  'name',
   //  'price',
   //  'stock',
   //  'user_id'

    'articulo',
    'valor',
    'descripcion',
    'cambio',
    'lugar',
    'user_id'
   ];

   public function user(){
      return $this->belongsTo(User::class);
   }

   public function comentario(){
      return $this->hasMany(Comentario::class);
   }
}
