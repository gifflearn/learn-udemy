$(document).ready(function(){

	map = new GMaps({
		div: '#map',
		lat: 47.997542,
		lng: -4.097899
	});

	$('#form').submit(function(e){
		e.preventDefault();
		GMaps.geocode({
			address: $('#search').val().trim(),
			callback: function(results, status){
				console.log(results);
				console.log(status);
				if(status == 'OK'){
					var latlng = results[0].geometry.location;
					console.log(latlng);
					map.setCenter(latlng.lat(), latlng.lng());
					map.addMarker({
						lat: latlng.lat(),
						lng: latlng.lng()
					});
				}
			}
		});
	});
	
});


