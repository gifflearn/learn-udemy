@extends('base')

@section('content')
    <div class="container">
        <h1 class="text-center mt-5">Editer ce lot</h1>
        <form method="POST" action="{{ route('articles.update',$article->id)}}">
            @csrf
            @method('PUT')
            <div class="col-12">
                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" name="title" value="{{$article->title}}" class="form-control @error('title') is-invalid @enderror" placeholder="Titre de votre article">
                    @error('title')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label>Sous-Titre</label>
                    <input type="text" name="subtitle" value="{{$article->subtitle}}" class="form-control @error('subtitle') is-invalid @enderror" placeholder="Sous-Titre de votre article">
                    <small class="form-text text-muted">Décrivez le contenu de votre article</small>
                    @error('subtitle')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label>Contenu</label>
                    <textarea id="tinycme-editor" name="content"  class="form-control w-100 @error('content') is-invalid @enderror" placeholder="Contenu de votre article">
                        {{$article->content}}
                    </textarea>
                </div>
                @error('content')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                <script>
                    tinymce.init({
                    selector: '#tinycme-editor'
                    });
                </script>
            </div>
            <div class="d-flex justify-content-center mb-5">
                <button class="btn btn-primary" type="submit">Modifier l'article</button>
            </div>
        </form>
    </div>

@endsection
