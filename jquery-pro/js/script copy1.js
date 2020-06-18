$(document).ready(function() {
	// $('#paragraphe').css('color','#f55');
	// $('#paragraphe').text('texte de remplacement');

	// $('#paragraphe').on('click', function(){
	// 	$(this).css('font-weight', 'bold');
	// 	$(this).text('texte de remplacement');
	// });

	// $('.article').each(function(){
	// 	$(this).on('click', function(){
	// 		$(this).css('color', 'blue');
	// 		alert($(this).css('color'));
	// 	});
	// });

	// $('#button').on('click',function(){
	// 	$('.article').width('400').css('color','blue');
	// });

	// $('p').parent('#parent').css('color','blue');

	// $('#autre').children().css('color','red');

	// $('#paraph')

	// ajout de text
	// .text()
	// .html()
	// .after()
	// .before()
	// .append()
	// .prepend()

	// var url =$('a#lien').attr('href');
	// alert(url);

	// $('a#lien').attr('href','https://www.fnac.com');

	// alert($('a#lien').hasClass('link'));

	$('#vider').click(function(){
		$('.content').empty();
	});

	// supprimer
	// .remove

	// $('#add').click(function(){
	// 	if(!$('#paraph').hasClass('article')) {
	// 		$('#paraph').addClass('article');
	// 	} else {
	// 		$('#paraph').removeClass('article');
	// 	}
		
	// });

	
	$('#add').click(function(){
		$('#paraph').toggleClass('article');
	});



});