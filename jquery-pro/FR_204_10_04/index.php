<?php
  if(!empty($_FILES)){
    $file = $_FILES['file'];
    $filename = $file['name'];
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    $allowed = array('jpg','jpeg','png','mp4');
    if(!in_array($ext, $allowed)){
      $response = array('error'=>'Fichier non autorisé');
      echo json_encode($response);exit;
    }

    $uploadfile = 'files/'.uniqid().'.'.$ext;
    if(move_uploaded_file($file['tmp_name'], $uploadfile)){
      $response = array('message' => 'Fichier enregistré');
      echo json_encode($response);exit;
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Upload en ajax</title>

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
          <a class="navbar-brand" href="#">Upload en AJAX</a>
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

      <div id="upload">
          <form method="post" action="index.php" enctype="multipart/form-data">
              <input type="file" name="file" id="file">
              <br><br>
              <input type="submit" class="btn btn-primary" value="Upload">
          </form>
          <br>

          <div style="display:none;" class="progress" id="progress">
              <div id="progressbar" class="progress-bar" role="progressbar">
          </div>
      </div>
    
    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/jquery.js"></script>
    <script src="js/script.js"></script>
  </body>
</html>
