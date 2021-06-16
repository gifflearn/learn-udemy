<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('article.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    //public function store(Request $request)
    public function store(ArticleRequest $request)
    {
        $validated = $request->validated();
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
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
