@extends('base')
@section('content')

@if($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error )
            <li>{{$error}}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="/articles" method="post" class="form-example">
    @csrf
    <div class="form-example">
      <label for="name">Enter your name: </label>
      <input type="text" name="name" id="name">
      @error('name')
        {{$message}}
      @enderror
    </div>
    <div class="form-example">
      <label for="email">Enter your email: </label>
      <input type="text" name="email" id="email">
      @error('email')
      {{$message}}
    @enderror
    </div>
    <div class="form-example">
      <input type="submit" value="Subscribe!">
    </div>
  </form>
@endsection
