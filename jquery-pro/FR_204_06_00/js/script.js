$(document).ready(function(){

	var article = $('#article');
	cacher = $('#cacher'); afficher = $('#afficher');

	/*
	$(cacher).on('click', function(){
		$(article).hide();
		$(this).hide();
		$(afficher).show();
	});

	$(afficher).on('click', function(){
		$(article).show();
		$(this).hide();
		$(cacher).show();
	});
*/

	/*
	$(cacher).on('click', function(){
		$(article).fadeOut(2000);
		$(this).hide();
		$(afficher).show();
	});

	$(afficher).on('click', function(){
		$(article).fadeIn(500);
		$(this).hide();
		$(cacher).show();
	});
*/
	
	/*
	$(cacher).on('click', function(){
		$(article).slideUp(2000);
		$(this).hide();
		$(afficher).show();
	});

	$(afficher).on('click', function(){
		$(article).slideDown();
		$(this).hide();
		$(cacher).show();
	});
*/

	$(cacher).on('click', function(){
		$(article).slideToggle('fast');
	});


});


