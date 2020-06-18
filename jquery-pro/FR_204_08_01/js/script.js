$(document).ready(function(){
	
	var text = $('#text');

	/*
	$(text).on('keyup', function(){
		//alert('touche relachée');
		alert($(this).val());
	});
*/


	/*
	$(text).on('keypress', function(){
		alert('touche pressée');
	});
*/

	$(text).on('focusout', function(){
		alert('sorti');
	});

});


