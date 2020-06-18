$(document).ready(function(){

	var button = $('#button');

	$(button).on('click', function(){
		var monTexte = $(this).text();

		$.getJSON('target.php', {text: monTexte}, function(data){
			console.log(data);
		});
	});

});


