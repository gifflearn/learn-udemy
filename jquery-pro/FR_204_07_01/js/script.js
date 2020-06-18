$(document).ready(function(){
	
	var question = $('.question'), reponse = $('.reponse');

	$(question).each(function(){
		$(this).on('click', function(){
			$(this).next().slideToggle();
			$(reponse).not($(this).next()).hide();
		});
	});

});


