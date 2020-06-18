$(document).ready(function(){

	var link = $('a'); description = $('#description');

	$(link).each(function(){
		$(this).on('click', function(e){
			e.preventDefault();
			$(link).not(this).parent('li').removeClass('active');
			$(this).parent('li').addClass('active');
			var url = $(this).attr('href');
			$.ajax({
				type: 'GET',
				url: url,
				dataType: 'json',
			}).done(function(response){
				console.log(response);
				$(description).hide().text(response.content).fadeIn('slow');
			});
		});
	});
	
});


