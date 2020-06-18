<?php

if(!empty($_GET)){
	$text = strip_tags($_GET['text']);
	$length = strlen($text);
	$upper = strtoupper($text);

	$response = [
		'message'=>'Le texte compte '.$length.' caractères',
		'uppercase' => 'Voici le texte en majuscules : '.$upper
	];

	echo json_encode($response);
}

?>