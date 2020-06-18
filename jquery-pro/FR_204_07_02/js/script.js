$(document).ready(function(){
	
	var text = $('#text'), go = $('#go');

	$(go).on('click', function(){
		$(text).animate({
			'font-size': '50px',
			'opacity': '0.5'
		}, 2000);
	});

});


