$(document).ready(function(){

	var nom = $('#nom'), couleur = $('#couleur'), form = $('#form'),
	langage = $('input:checkbox');

	$(form).on('submit', function(){
		$('.alert').remove();

		if($(nom).val() == ''){
			$(form).before('<div class="alert alert-danger">Indiquez votre nom</div>');
			return false;
		}

		if($(couleur).val() == 0){
			$(form).before('<div class="alert alert-danger">Indiquez une couleur</div>');
			return false;
		}

		if(!$(langage).is(':checked')){
			$(form).before('<div class="alert alert-danger">Indiquez un langage</div>');
			return false;
		}

		if($('input:radio:checked').length == 0){
			$(form).before('<div class="alert alert-danger">Indiquez ce que vous êtes</div>');
			return false;
		}

	});

});


