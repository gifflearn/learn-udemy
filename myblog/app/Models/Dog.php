<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dog extends Model
{
    use HasFactory;

    // on peut préciser le nom d'une table si elle doit être differente de la table par default : Dog + s
    // protected $table = 'animals'
}
