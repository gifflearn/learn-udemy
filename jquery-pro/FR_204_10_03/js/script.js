$(document).ready(function(){

	var form = $('#form'), comments = $('#comments');

	$(form).on('submit', function(e){
		e.preventDefault();

		$('.alert').remove();

		var data = $(this).serialize();
		url = $(this).attr('action');

		$.ajax({
			type: 'POST',
			url: url,
			data: data,
			dataType: 'json',
			success: function(response){
				if(response.errors){
					$(form).prepend('<div id="errors" class="alert alert-danger"></div>');
					$.each(response.errors, function(index, value){
						console.log(value);
						$('<p>'+value+'</p>').appendTo('#errors');
					});
				}
				else if(response.success){
					console.log(response);
					$(comments).prepend('<h4>'+response.pseudo+'</h4> <p>'+response.message+'</p>');
					$(form).prepend('<div class="alert alert-success">'+response.success+'</div>');
					$(form)[0].reset();
				}
			}
		});
	});

});


