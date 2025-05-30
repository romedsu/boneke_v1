<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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
    'user_id',
    'categoria_id',
   ];

   public function user(){
      return $this->belongsTo(User::class);
   }

   public function comentario(){
      return $this->hasMany(Comentario::class);
   }

   public function imagen(){
      return $this->hasMany(Imagen::class);
   }
   public function likes(){
      return $this->hasMany(Like::class);
   }

   public function categoria(){
      return $this->belongsTo(Categoria::class);
   }

   use HasFactory;
}
