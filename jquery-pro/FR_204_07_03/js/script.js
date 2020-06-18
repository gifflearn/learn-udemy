$(document).ready(function(){
	
	var img = $('.img-thumbnail'), large = $('#large');

	$(img).each(function(){
		$(this).on('click', function(e){
			e.preventDefault();
			var src = $(this).attr('src');
			$(large).attr('src', src);
			$(large).parent().attr('href', src);
		});
	});

});


