var openWeatherAPIKey = '82c1957b36587417514454703465992f';
var currentCoords = {
  lat: "",
  long: ""
};
var openWeatherURL;

$(document).ready(function() {

  function currentCoordsSetup() {

    navigator.geolocation.getCurrentPosition(function(pos) {

    currentCoords.lat = pos.coords.latitude;
    currentCoords.long = pos.coords.longitude;

    openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${currentCoords.lat}&lon=${currentCoords.long}&units=imperial&appid=${openWeatherAPIKey}`;

    // console.log(openWeatherURL);

    $.ajax({
      url: openWeatherURL,
      method: "GET"
    }).then(function(data){
      $('#weatherIconMain').attr('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      // console.log(data.weather[0].icon);
    });

});
  }

  function currentLocalWeather() {
    openWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + currentCoords.lat + '&lon='+currentCoords.long+'units=imperial&appid=' + openWeatherAPIKey;
    console.log(openWeatherURL);
  }

  function searchHistory() {

    $('#button-addon1').on('click', function(event) {
      event.preventDefault();

      var searchInput = $('#searchBar').val();
      openWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInput + '&units=imperial&appid=' + openWeatherAPIKey;

      $('.list-group').prepend(`
        <button type="button" class="list-group-item list-group-item-action cityButtons" data-name=${searchInput}>${searchInput}</button>`);

      $.ajax({
        url: openWeatherURL,
        method: "GET"
      }).then(function(data) {
        console.log(data);
      });

      $('#searchBar').val("");
    });

  }

  function cityData() {
    var city = $(this).attr('data-name');
    console.log(city);
    openWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + openWeatherAPIKey;
    // console.log(openWeatherURL);
    $.ajax({
      url: openWeatherURL,
      method: "GET"
    }).then(function(data) {
      console.log(data);
      // console.log(JSON.stringify(data,null,4));
    });

  }

  // cityData();
  currentCoordsSetup();
  console.log(openWeatherURL);
  console.log(currentCoords.lat);
  console.log(currentCoords.long);
  searchHistory();
  $(document).on('click', '.cityButtons', cityData);
});
