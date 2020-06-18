$(document).ready(function(){
	
	var image = $('#image');

	/*
	$(image).on('click', function(){
		alert('Image cliquée');
	});
*/
	
	/*
	$(image).on('mouseenter', function(){
		alert('Tu rentre sur un élément');
	});*/

	/*
	$(image).on('mouseout', function(){
		alert('La souris est sortie');
	});
*/
	/*
	$(image).on('mouseover', function(){
		alert('La souris est dessus');
	});
*/

	$(image).on('mouseleave', function(){
		alert('Souris a quitté');
	});

});


