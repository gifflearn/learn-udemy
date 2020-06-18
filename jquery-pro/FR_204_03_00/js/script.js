$(document).ready(function(){
	/*
	//$('#paragraphe').css('color','#f55');
	//$('#paragraphe').text('Texte de remplacement');

	$('#paragraphe').on('click', function(){
		$(this).css('font-weight', 'bold');
	});

	/*
	$('.article').each(function(){
		$(this).on('click', function(){
			//alert('ok');
			$(this).css('color', 'blue');
			alert($(this).css('color'));
		});
	});
	

	$('#button').on('click', function(){
		$('.article').width(400).css('color', 'blue');
	});
	*/

	/*
	var paragraphe = $('#paragraphe'); article = $('.article');
	button = $('#button');

	$(paragraphe).on('click', function(){
		$(this).css('font-weight', 'bold');
	});

	$(article).each(function(){
		$(this).on('click', function(){
			//alert('ok');
			$(this).css('color', 'blue');
			alert($(this).css('color'));
		});
	});
	

	$(button).on('click', function(){
		$('.article').width(400).css('color', 'blue');
	});


	//$('p, div, span').css('color', 'blue');
	$('*').css('font-weight','bold');
	*/

	$('p').parent('#parent').css('color', 'blue');

	$('#autre').children().css('color', 'red');

	$('#paraph').parent().css('color','#999');


});