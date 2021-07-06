<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UniqueActionController;

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
// Route::get('/', function () {
//     return view('base');
// });

// Route::get('/test', function () {
//     return view('test');
// })->middleware('custom.auth');

// Route::get('/test', function () {
//     return view('test');
// })->middleware('auth.basic');



Route::get('/', [MainController::class,'home'])->name('home');
// Route::get('/home',[App\Http\Controllers\HomeController::class,'index'])->name('home');
Route::get('/articles', [MainController::class,'index'])->name('articles');
//Route::get('/articles/{slug}', [MainController::class,'show'])->name('article');
Route::get('/articles/{article:slug}', [MainController::class,'show'])->name('article');

Auth::routes();

Route::prefix('admin')->middleware('admin')->group(function() {
    // On peut remplacer toutes les route d'un meme controller par une route unique
    Route::resource('articles', ArticleController::class)->except([
        'show'
    ]);
    // Route::get('/articles',[ArticleController::class, 'index'])->name('articles.index');
    // Route::get('/articles/create',[ArticleController::class, 'create'])->name('articles.create');
    // Route::post('/articles/store',[ArticleController::class, 'store'])->name('articles.store');
    // Route::delete('/articles/{article:id}/delete',[ArticleController::class, 'delete'])->name('articles.delete');
    // Route::get('/articles/{article}/edit',[ArticleController::class, 'edit'])->name('articles.edit');
    // Route::put('/articles/{article}/update',[ArticleController::class, 'update'])->name('articles.update');
});


//Route::get('/unique', UniqueActionController::class);

//  Route::resource('articles',ArticleController::class);


// Route::get('/test/{id}/{part}', function ($id,$part) {
//     return view('folder/test',[
//         'id'=>$id,
//         'part'=>$part
//     ]);
// });


// Route::get('/env',function () {
//     dd(env('DB_DATABASE'));
// });

// Route::get('/test',function () {
//     return 5;
// });

// Route::redirect('/test','/');

// Route::post('/store', function () {
//     return 'POST Route';
// });

// Route::put('/update', function () {
//     return 'PUT Route';
// });

// Route::get('/article/{id}/comment/{author?}', function ($id,$author='Nicolas') {
//     return $author .' a écrit un commentaire sur l\'article '. $id;
// });

// Route::prefix('admin')->group(function () {
//     Route::get('/users', function () {
//         return response('Programme',202);
//     });
//     Route::get('/articles', function () {
//         return redirect('/admin/users');
//     });
//     Route::get('/categories', function () {
//         return response()->json([
//             'name'=>"Millesimes",
//             'nb_lots'=>456
//         ]);
//     });
// });







