var openWeatherAPIKey = '82c1957b36587417514454703465992f';
var currentCoords = {
  lat: "",
  long: ""
};
var openWeatherURL;

$(document).ready(function() {

  function currentLocalWeather() {

    navigator.geolocation.getCurrentPosition(function(pos) {

      currentCoords.lat = pos.coords.latitude;
      currentCoords.long = pos.coords.longitude;

      openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${currentCoords.lat}&lon=${currentCoords.long}&units=imperial&appid=${openWeatherAPIKey}`;

      // console.log(openWeatherURL);

      function capitalize_Words(str) {
        return str.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

      $.ajax({
        url: openWeatherURL,
        method: "GET"
      }).then(function(data) {
        $('#cityMain').text(data.name);
        $('#weatherIconMain').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        $('.temperatureMain').text(Math.round(data.main.temp) + '°F');
        $('.weatherDesc').text(capitalize_Words(data.weather[0].description));
        // console.log(data.weather[0].icon);
      });

    });
  }

  function searchHistory() {

    $('#button-addon1').on('click', function(event) {
      event.preventDefault();

      var searchInput = $('#searchBar').val();
      openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=${openWeatherAPIKey}`;

      $('.list-group').prepend(`
        <button type="button" class="list-group-item list-group-item-action cityButtons" data-name=${searchInput}>${searchInput}</button>`);

        function capitalize_Words(str) {
          return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        }

        $.ajax({
          url: openWeatherURL,
          method: "GET"
        }).then(function(data) {
          console.log(data);
          $('#cityMain').text(data.name);
          $('#weatherIconMain').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
          $('.temperatureMain').text(Math.round(data.main.temp) + '°F');
          $('.weatherDesc').text(capitalize_Words(data.weather[0].description));
          // console.log(data.weather[0].icon);
        });

      $('#searchBar').val("");
    });

  }

  function cityData() {
    var city = $(this).text();
    console.log(city);
    openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${openWeatherAPIKey}`;
    // console.log(openWeatherURL);
    function capitalize_Words(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    $.ajax({
      url: openWeatherURL,
      method: "GET"
    }).then(function(data) {
      $('#cityMain').text(data.name);
      $('#weatherIconMain').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      $('.temperatureMain').text(Math.round(data.main.temp) + '°F');
      $('.weatherDesc').text(capitalize_Words(data.weather[0].description));
      // console.log(data.weather[0].icon);
    });

  }

  // cityData();
  currentLocalWeather();
  searchHistory();
  $(document).on('click', '.cityButtons', cityData);
});
