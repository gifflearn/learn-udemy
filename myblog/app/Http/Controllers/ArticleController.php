<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Manager\ArticleManager;
use App\Http\Requests\ArticleRequest;
use Illuminate\Support\Facades\Redirect;

class ArticleController extends Controller
{
    private $articleManager;
    public function __construct(ArticleManager $articleManager) {
        $this->articleManager = $articleManager;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        //$articles = Article::all();
        $articles = Article::paginate(7);
        return view('article.index',[
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('article.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\ArticleRequest  $request
     * @return \Illuminate\Http\Response
     */

    //public function store(Request $request)
    public function store(ArticleRequest $request)
    {
        $validated = $request->validated();
        // insertion "classique"
            // Article::create([
            //     'title' => $request->input('title'),
            //     'subtitle' => $request->input('subtitle'),
            //     'content' => $request->input('content')
            // ]);

        // Utilisation de articleManager
        $this->articleManager->build(new Article(), $request);

        return redirect()->route('articles.index')->with('success',"L'article a bien été sauvegardé !");
        //$validated = $request->validated();
        //
       //dd($request->all());
        // dd($request->input('email'));
        //
        // if ($request->isMethod('GET')) {
        //     die('GET');
        // } else {
        //     die('not GET');
        // }
        //
        // if ($request->missing('email')) { // Attention si le champ est présent et vide => not missing
        //     die('Not OK');
        // } else {
        //     die('OK');
        // }
        //
        // $validatedData = $request->validate([
        //     'name' => 'required|min:5|max:255',
        //     'email' => 'required|min:5|max:255|email'
        // ]);

        // les parametres sont validés
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
        return view('article.edit',[
            'article'=>$article
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\ArticleRequest  $request
     * @param  Article $article
     * @return \Illuminate\Http\Response
     */
    public function update(ArticleRequest $request, Article $article)
    {
        //
        // dd($article);
        // $validated = $request->validated();
        // Article::create([
        //     'title' => $request->input('title'),
        //     'subtitle' => $request->input('subtitle'),
        //     'content' => $request->input('content')
        // ]);
        //
        // Sans manager :
            // $article->title = $request->input('title');
            // $article->subtitle = $request->input('subtitle');
            // $article->content = $request->input('content');
            // $article->save();
        // Utilisation de article Manager
        // dd($this->articleManager); // le namespace
        // dd(get_class($this->articleManager));  // la class
        //dd(get_class_methods($this->articleManager)); // les methodes de la class

        $this->articleManager->build($article,$request);

        return redirect()->route('articles.index')->with('success',"L'article a bien été modifié !");
    }

    public function destroy(Article $article) {

        //dd($article);
        $article->delete();
        return redirect()->route('articles.index')->with('success',"L'article a bien été supprimé !");
    }
}
