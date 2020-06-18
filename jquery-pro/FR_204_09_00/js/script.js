$(document).ready(function(){

	var choix = $('#choix'), nom = $('input:text'), checkbox = $('input:checkbox'),
	radio = $('input:radio');

	$(nom).on('focus', function(){
		$(this).css('border-color', 'red');
	});

	$(checkbox).each(function(){
		$(this).on('click', function(){
			if($(this).is(':checked')){
				console.log($(this).val());
			}
		});
	});

	$(radio).each(function(){
		$(this).on('click', function(){
			if($(this).is(':checked')){
				console.log($(this).val());
			}
		});
	});

	$(choix).change(function(){
		console.log($(this).val());
	});

});


