var showForecast = function(forecast) {

	var results = $('.templates .day').clone();

	var date = results.find('.date');
	date.text(forecast.date.pretty);

	var forecastImg = results.find('.weather-image');
	forecastImg.attr('src', forecast.icon_url);

	var conditions = results.find('.conditions');
	conditions.text(forecast.conditions); 

	var high = results.find('.high');
	high.text('High: ' + forecast.high.fahrenheit + ' F');

	var low = results.find('.low');
	low.text('Low: ' + forecast.low.fahrenheit + ' F');

	return results;
}

function getRequest(zipcode) {
	
	var url = 'https://api.wunderground.com/api/0a1f02ac482c3b35/forecast10day/q/' + zipcode + '.json';
	
	$.getJSON(url, function(data){
		console.log(data.forecast.simpleforecast.forecastday);
		var days = data.forecast.simpleforecast.forecastday;
		$.each(days, function(i, item) {
			var day = showForecast(item);
			$('.results').append(day);
		});

	});
};


$(document).ready(function() {
	$('.zipcode').submit(function(e){
		e.preventDefault();

		var zipcode = $('#zipcode').val();

		getRequest(zipcode);
		console.log(zipcode);

	});
});