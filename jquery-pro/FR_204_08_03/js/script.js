/*
$(document).ready(function(){
  var p = $('#paragraphe');

  $(p).text('Le document est chargé');
});
*/

/*
function warning_close(){
  return 'Confirmer';
}

window.onbeforeunload = warning_close;
*/

/*
$('#img').load(function(){
  console.log($(this).width());
});
*/

/*
$(window).resize(function(){
  $('#paragraphe').text($(window).width()+' px');
}); 
*/

$(window).scroll(function(){
  console.log('Scroll bougé');
});


