$(document).ready(function(){

	$('div.article:not(#tab1)').hide();
	var tab = $('li');

	$(tab).each(function(){
		$(this).on('click', function(){
			$(tab).not(this).removeClass('active');
			$(this).addClass('active');
			var anchor = $(this).find('a').attr('href');
			$('.article:not('+anchor+')').hide();
			$(anchor).fadeIn();
		});
	});

});


