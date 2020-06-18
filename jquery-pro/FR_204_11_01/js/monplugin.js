(function($){


	$.fn.colorize = function(options){
		var settings = $.extend({
			color: '#f55',
			backgroundColor: 'black'
		}, options);

		$(this).each(function(){
			$(this).on('mouseover', function(){
				$(this).css('color', settings.color).css('backgroundColor', settings.backgroundColor);
			});
			$(this).on('mouseout', function(){
				$(this).css('color','').css('backgroundColor','');
			});	
		});
	}

	/*
	$.fn.colorize = function(){
		$(this).each(function(){
			$(this).on('mouseover', function(){
				$(this).css('color','red');
			});
			$(this).on('mouseout', function(){
				$(this).css('color', '');
			});
		});
	}
	*/

	/*
	$.fn.colorize = function(color){
		$(this).each(function(){
			$(this).on('mouseover', function(){
				$(this).css('color', color);
			});
			$(this).on('mouseout', function(){
				$(this).css('color', '');
			});
		});
	}
	*/

}(jQuery));