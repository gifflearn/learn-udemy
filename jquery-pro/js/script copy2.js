$(document).ready(function() {

// var article2 = $('#2');
// offset = article2.offset();
// console.log(offset);
// alert(' Position : ' + offset.top +'px du haut et '+offset.left+'px du bord gauche');

// var paragraphe = $('p:last');
// var offset = paragraphe.offset();

	// var article1 = $('#1');
	// article1.click(function(){
	// 	$(this).offset({top: 1200, left: 100});
	// })

	// var madiv = $('#maDiv');
	// pos = madiv.position();
	// console.log(pos);


	$('#top').click(function(){
			$(document).scrollTop(0);
	});

	$('#ar3').click(function(){
		var coord = $('#3').offset();
		console.log(coord);
		$(document).scrollTop(coord.top);
});

});