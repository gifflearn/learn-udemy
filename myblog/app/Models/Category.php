<?php

namespace App\Models;

use App\Http\Controllers\ArticleController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'label'
    ];

    public function articles()
    {
            return $this->hasMany(Article::class);
    }
}
