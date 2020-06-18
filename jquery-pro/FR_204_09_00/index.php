
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Selecteurs formulaire</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <style>
    body{
      padding-top: 100px;
    }
    </style>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Selecteurs formulaires</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
        <!--
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        -->
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <div class="container">

      <form id="form">
      <input type="text" name="nom" id="nom" class="form-control">

      <br>

      <select name="choix" class="form-control" id="choix">
        <option value="0">Choisissez une couleur</option>
        <option value="bleu">Bleu</option>
        <option value="jaune">Jaune</option>
        <option value="rouge">Rouge</option>
      </select>
      <br>

      <input type="checkbox" name="fruit1" value="orange"> Orange
      <input type="checkbox" name="fruit2" value="pomme"> Pomme
      <input type="checkbox" name="fruit3" value="poire"> Poire
      <br><br>

      <input type="radio" name="radio" value="poireau"> Poireau
      <input type="radio" name="radio" value="carotte"> Carotte
      <input type="radio" name="radio" value="navet"> Navet
      <br><br>

      <input type="submit" class="btn btn-primary" id="submit" value="Envoyer">
      </form>
    
    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/jquery.js"></script>
    <script src="js/script.js"></script>
  </body>
</html>
