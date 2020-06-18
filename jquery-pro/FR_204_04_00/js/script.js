$(document).ready(function(){

/*
var article2 = $('#2');
offset = article2.offset();
console.log(offset);
alert('Position : '+offset.top+'px du haut et '+offset.left+'px de la gauche');
*/

/*
var paragraphe = $('p:last');
offset = paragraphe.offset();
console.log(offset);
*/
/*
var paragraphe = $('p:first');
offset = paragraphe.offset();
console.log(offset);
*/

/*
var article1 = $('#1');
$(article1).on('click', function(){
	$(this).offset({top: 1200, left: 100});
});
*/

var maDiv = $('#maDiv');
position = maDiv.position();
console.log(position);

$('#top').on('click', function(){
	//$(document).scrollTop(0);

	var coord = $('#2').offset();
	console.log(coord);
	$(document).scrollTop(coord.top);
});

});


