<?php

namespace App\Manager;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class UserManager
{
    public function uploadAvatar($data) {

        // recuperation de l'image à partir de l'URL
        $content = file_get_contents($data->avatar);
        // Generer le nom de l'image et definir son path
        $path = 'users/'.$data->id.'_'.Str::random(18).'.jpg';
        // Stocker l'image dans son path
        Storage::disk('public')->put($path,$content);
        // retourner le chemin
        return $path;
    }
}
