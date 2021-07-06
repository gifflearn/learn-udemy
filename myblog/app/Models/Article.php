<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'subtitle',
        'content',
        'category'
    ];

    public function dateFormatted()
    {
        return date_format($this->created_at, 'd-M-Y');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

}
