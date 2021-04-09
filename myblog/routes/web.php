<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::get('/env',function () {
    dd(env('DB_DATABASE'));
});

Route::get('/test',function () {
    return 5;
});

Route::redirect('/test','/');

Route::post('/store', function () {
    return 'POST Route';
});

Route::put('/update', function () {
    return 'PUT Route';
});

Route::get('/article/{id}/comment/{author?}', function ($id,$author='Nicolas') {
    return $author .' a écrit un commentaire sur l\'article '. $id;
});

Route::prefix('admin')->group(function () {
    Route::get('/users', function () {
        return response('Programme',202);
    });
    Route::get('/articles', function () {
        return redirect('/admin/users');
    });
    Route::get('/categories', function () {
        return response()->json([
            'name'=>"Millesimes",
            'nb_lots'=>456
        ]);
    });
});



