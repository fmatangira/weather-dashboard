var openWeatherAPIKey = '82c1957b36587417514454703465992f';
var currentCoords = {
  lat: "",
  long: ""
};
var openWeatherURL;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

$(document).ready(function() {

  //WHEN USER AGREES TO SHARE LOCATION, GET DATA FOR THEIR CURRENT POSITION
  function currentLocalWeather() {

    navigator.geolocation.getCurrentPosition(function(pos) {

      currentCoords.lat = pos.coords.latitude;
      currentCoords.long = pos.coords.longitude;

      openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${currentCoords.lat}&lon=${currentCoords.long}&units=imperial&appid=${openWeatherAPIKey}`;
      openWeatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentCoords.lat}&lon=${currentCoords.long}&units=imperial&appid=${openWeatherAPIKey}`

      var minTemp = [];
      var maxTemp = [];

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
        $('#weatherIconMain').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        $('.temperatureMain').text(Math.round(data.main.temp) + '°F');
        $('.weatherDesc').text(capitalize_Words(data.weather[0].description));
        $('#dateMain').text(today);
        $('#humidity').text(`Humidity: ${data.main.humidity}%`);
        $('#windSpeed').text(`Wind Speed: ${data.wind.speed} MPH`);
        $('#Pressure').text(`Pressure: ${data.main.pressure} in.`);
        // console.log(data.weather[0].icon);
      });

      $.ajax({
        url: openWeatherForecastURL,
        method: "GET"
      }).then(function(data){
        var forecastDate1 = (data.list[3].dt_txt).slice(5,7)+'/'+(data.list[3].dt_txt).slice(8,10)+'/'+(data.list[3].dt_txt).slice(0,4);
        var forecastDate2 = (data.list[11].dt_txt).slice(5,7)+'/'+(data.list[11].dt_txt).slice(8,10)+'/'+(data.list[11].dt_txt).slice(0,4);
        var forecastDate3 = (data.list[20].dt_txt).slice(5,7)+'/'+(data.list[20].dt_txt).slice(8,10)+'/'+(data.list[20].dt_txt).slice(0,4);
        var forecastDate4 = (data.list[28].dt_txt).slice(5,7)+'/'+(data.list[28].dt_txt).slice(8,10)+'/'+(data.list[28].dt_txt).slice(0,4);
        var forecastDate5 = (data.list[36].dt_txt).slice(5,7)+'/'+(data.list[36].dt_txt).slice(8,10)+'/'+(data.list[36].dt_txt).slice(0,4);

        // console.log(data);
        for (var i = 0; i < 8; i++) {
          minTemp.push(data.list[i].main.temp_min);
          maxTemp.push(data.list[i].main.temp_max);
        }

        // console.log(minTemp);
        $('.forecastTempMin1').text(Math.round(Math.min(...minTemp))+'°F');
        $('.forecastTempMax1').text(Math.round(Math.max(...maxTemp))+'°F');
        $('.forecastDesc1').text(data.list[3].weather[0].description)
        $('.forecastIcon1').attr('src', `https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`)
        $('.forecastDate1').text(forecastDate1);


        minTemp = [];
        maxTemp = [];

        for (var i = 8; i < 15; i++) {
          minTemp.push(data.list[i].main.temp_min);
          maxTemp.push(data.list[i].main.temp_max);
        }

        $('.forecastTempMin2').text(Math.round(Math.min(...minTemp))+'°F');
        $('.forecastTempMax2').text(Math.round(Math.max(...maxTemp))+'°F');
        $('.forecastDesc2').text(data.list[11].weather[0].description)
        $('.forecastIcon2').attr('src', `https://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@2x.png`)
        $('.forecastDate2').text(forecastDate2);

        minTemp = [];
        maxTemp = [];

        for (var i = 15; i < 23; i++) {
          minTemp.push(data.list[i].main.temp_min);
          maxTemp.push(data.list[i].main.temp_max);
        }

        $('.forecastTempMin3').text(Math.round(Math.min(...minTemp))+'°F');
        $('.forecastTempMax3').text(Math.round(Math.max(...maxTemp))+'°F');
        $('.forecastDesc3').text(data.list[20].weather[0].description)
        $('.forecastIcon3').attr('src', `https://openweathermap.org/img/wn/${data.list[20].weather[0].icon}@2x.png`)
        $('.forecastDate3').text(forecastDate3);

        minTemp = [];
        maxTemp = [];

        for (var i = 23; i < 31; i++) {
          minTemp.push(data.list[i].main.temp_min);
          maxTemp.push(data.list[i].main.temp_max);
        }

        $('.forecastTempMin4').text(Math.round(Math.min(...minTemp))+'°F');
        $('.forecastTempMax4').text(Math.round(Math.max(...maxTemp))+'°F');
        $('.forecastDesc4').text(data.list[28].weather[0].description)
        $('.forecastIcon4').attr('src', `https://openweathermap.org/img/wn/${data.list[28].weather[0].icon}@2x.png`)
        $('.forecastDate4').text(forecastDate4);

        minTemp = [];
        maxTemp = [];

        for (var i = 31; i < 39; i++) {
          minTemp.push(data.list[i].main.temp_min);
          maxTemp.push(data.list[i].main.temp_max);
        }

        $('.forecastTempMin5').text(Math.round(Math.min(...minTemp))+'°F');
        $('.forecastTempMax5').text(Math.round(Math.max(...maxTemp))+'°F');
        $('.forecastDesc5').text(data.list[36].weather[0].description)
        $('.forecastIcon5').attr('src', `https://openweathermap.org/img/wn/${data.list[36].weather[0].icon}@2x.png`)
        $('.forecastDate5').text(forecastDate5);
      });
    });
  }

  //GET DATA FROM USER INPUT BY CLICKING SEARCH BUTTON OR PRESSING ENTER
  function searchHistory() {

    $('#button-addon1').on('click', function(event) {
      event.preventDefault();

      var searchInput = $('#searchBar').val();
      openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=${openWeatherAPIKey}`;
      openWeatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&units=imperial&appid=${openWeatherAPIKey}`;

      var minTemp = [];
      var maxTemp = [];

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
          // console.log(data);
          $('#cityMain').text(data.name);
          $('#weatherIconMain').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
          $('.temperatureMain').text(Math.round(data.main.temp) + '°F');
          $('.weatherDesc').text(capitalize_Words(data.weather[0].description));
          $('#dateMain').text(today);
          $('#humidity').text(`Humidity: ${data.main.humidity}%`);
          $('#windSpeed').text(`Wind Speed: ${data.wind.speed} MPH`);
          $('#Pressure').text(`Pressure: ${data.main.pressure} in.`);
          // console.log(data.weather[0].icon);
        });

        $.ajax({
          url: openWeatherForecastURL,
          method: "GET"
        }).then(function(data){

          var forecastDate1 = (data.list[3].dt_txt).slice(5,7)+'/'+(data.list[3].dt_txt).slice(8,10)+'/'+(data.list[3].dt_txt).slice(0,4);
          var forecastDate2 = (data.list[11].dt_txt).slice(5,7)+'/'+(data.list[11].dt_txt).slice(8,10)+'/'+(data.list[11].dt_txt).slice(0,4);
          var forecastDate3 = (data.list[20].dt_txt).slice(5,7)+'/'+(data.list[20].dt_txt).slice(8,10)+'/'+(data.list[20].dt_txt).slice(0,4);
          var forecastDate4 = (data.list[28].dt_txt).slice(5,7)+'/'+(data.list[28].dt_txt).slice(8,10)+'/'+(data.list[28].dt_txt).slice(0,4);
          var forecastDate5 = (data.list[36].dt_txt).slice(5,7)+'/'+(data.list[36].dt_txt).slice(8,10)+'/'+(data.list[36].dt_txt).slice(0,4);

          for (var i = 0; i < 8; i++) {
            minTemp.push(data.list[i].main.temp_min);
            maxTemp.push(data.list[i].main.temp_max);
          }

          // console.log(minTemp);
          $('.forecastTempMin1').text(Math.round(Math.min(...minTemp))+'°F');
          $('.forecastTempMax1').text(Math.round(Math.max(...maxTemp))+'°F');
          $('.forecastDesc1').text(data.list[3].weather[0].description)
          $('.forecastIcon1').attr('src', `https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`)
          $('.forecastDate1').text(forecastDate1);

          minTemp = [];
          maxTemp = [];

          for (var i = 8; i < 15; i++) {
            minTemp.push(data.list[i].main.temp_min);
            maxTemp.push(data.list[i].main.temp_max);
          }

          $('.forecastTempMin2').text(Math.round(Math.min(...minTemp))+'°F');
          $('.forecastTempMax2').text(Math.round(Math.max(...maxTemp))+'°F');
          $('.forecastDesc2').text(data.list[11].weather[0].description)
          $('.forecastIcon2').attr('src', `https://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@2x.png`)
          $('.forecastDate2').text(forecastDate2);

          minTemp = [];
          maxTemp = [];

          for (var i = 15; i < 23; i++) {
            minTemp.push(data.list[i].main.temp_min);
            maxTemp.push(data.list[i].main.temp_max);
          }

          $('.forecastTempMin3').text(Math.round(Math.min(...minTemp))+'°F');
          $('.forecastTempMax3').text(Math.round(Math.max(...maxTemp))+'°F');
          $('.forecastDesc3').text(data.list[20].weather[0].description)
          $('.forecastIcon3').attr('src', `https://openweathermap.org/img/wn/${data.list[20].weather[0].icon}@2x.png`)
          $('.forecastDate3').text(forecastDate3);

          minTemp = [];
          maxTemp = [];

          for (var i = 23; i < 31; i++) {
            minTemp.push(data.list[i].main.temp_min);
            maxTemp.push(data.list[i].main.temp_max);
          }

          $('.forecastTempMin4').text(Math.round(Math.min(...minTemp))+'°F');
          $('.forecastTempMax4').text(Math.round(Math.max(...maxTemp))+'°F');
          $('.forecastDesc4').text(data.list[28].weather[0].description)
          $('.forecastIcon4').attr('src', `https://openweathermap.org/img/wn/${data.list[28].weather[0].icon}@2x.png`)
          $('.forecastDate4').text(forecastDate4);

          minTemp = [];
          maxTemp = [];

          for (var i = 31; i < 39; i++) {
            minTemp.push(data.list[i].main.temp_min);
            maxTemp.push(data.list[i].main.temp_max);
          }

          $('.forecastTempMin5').text(Math.round(Math.min(...minTemp))+'°F');
          $('.forecastTempMax5').text(Math.round(Math.max(...maxTemp))+'°F');
          $('.forecastDesc5').text(data.list[36].weather[0].description)
          $('.forecastIcon5').attr('src', `https://openweathermap.org/img/wn/${data.list[36].weather[0].icon}@2x.png`)
          $('.forecastDate5').text(forecastDate5);
        });

      $('#searchBar').val("");
    });

  }

  // GET DATA FROM CLICKING ON BUTTONS IN SEARCH HISTORY
  function cityData() {
    var city = $(this).text();
    // console.log(city);
    openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${openWeatherAPIKey}`;
    openWeatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${openWeatherAPIKey}`;
    // console.log(openWeatherURL);
    var minTemp = [];
    var maxTemp = [];

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
      $('#weatherIconMain').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      $('.temperatureMain').text(Math.round(data.main.temp) + '°F');
      $('.weatherDesc').text(capitalize_Words(data.weather[0].description));
      $('#dateMain').text(today);
      $('#humidity').text(`Humidity: ${data.main.humidity}%`);
      $('#windSpeed').text(`Wind Speed: ${data.wind.speed} MPH`);
      $('#Pressure').text(`Pressure: ${data.main.pressure} in.`);
      // console.log(data.weather[0].icon);
    });

    $.ajax({
      url: openWeatherForecastURL,
      method: "GET"
    }).then(function(data){
      var forecastDate1 = (data.list[3].dt_txt).slice(5,7)+'/'+(data.list[3].dt_txt).slice(8,10)+'/'+(data.list[3].dt_txt).slice(0,4);
      var forecastDate2 = (data.list[11].dt_txt).slice(5,7)+'/'+(data.list[11].dt_txt).slice(8,10)+'/'+(data.list[11].dt_txt).slice(0,4);
      var forecastDate3 = (data.list[20].dt_txt).slice(5,7)+'/'+(data.list[20].dt_txt).slice(8,10)+'/'+(data.list[20].dt_txt).slice(0,4);
      var forecastDate4 = (data.list[28].dt_txt).slice(5,7)+'/'+(data.list[28].dt_txt).slice(8,10)+'/'+(data.list[28].dt_txt).slice(0,4);
      var forecastDate5 = (data.list[36].dt_txt).slice(5,7)+'/'+(data.list[36].dt_txt).slice(8,10)+'/'+(data.list[36].dt_txt).slice(0,4);

      for (var i = 0; i < 8; i++) {
        minTemp.push(data.list[i].main.temp_min);
        maxTemp.push(data.list[i].main.temp_max);
      }

      // console.log(minTemp);
      $('.forecastTempMin1').text(Math.round(Math.min(...minTemp))+'°F');
      $('.forecastTempMax1').text(Math.round(Math.max(...maxTemp))+'°F');
      $('.forecastDesc1').text(data.list[3].weather[0].description)
      $('.forecastIcon1').attr('src', `https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`)
      $('.forecastDate1').text(forecastDate1);

      minTemp = [];
      maxTemp = [];

      for (var i = 8; i < 15; i++) {
        minTemp.push(data.list[i].main.temp_min);
        maxTemp.push(data.list[i].main.temp_max);
      }

      $('.forecastTempMin2').text(Math.round(Math.min(...minTemp))+'°F');
      $('.forecastTempMax2').text(Math.round(Math.max(...maxTemp))+'°F');
      $('.forecastDesc2').text(data.list[11].weather[0].description)
      $('.forecastIcon2').attr('src', `https://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@2x.png`)
      $('.forecastDate2').text(forecastDate2);

      minTemp = [];
      maxTemp = [];

      for (var i = 15; i < 23; i++) {
        minTemp.push(data.list[i].main.temp_min);
        maxTemp.push(data.list[i].main.temp_max);
      }

      $('.forecastTempMin3').text(Math.round(Math.min(...minTemp))+'°F');
      $('.forecastTempMax3').text(Math.round(Math.max(...maxTemp))+'°F');
      $('.forecastDesc3').text(data.list[20].weather[0].description)
      $('.forecastIcon3').attr('src', `https://openweathermap.org/img/wn/${data.list[20].weather[0].icon}@2x.png`)
      $('.forecastDate3').text(forecastDate3);

      minTemp = [];
      maxTemp = [];

      for (var i = 23; i < 31; i++) {
        minTemp.push(data.list[i].main.temp_min);
        maxTemp.push(data.list[i].main.temp_max);
      }

      $('.forecastTempMin4').text(Math.round(Math.min(...minTemp))+'°F');
      $('.forecastTempMax4').text(Math.round(Math.max(...maxTemp))+'°F');
      $('.forecastDesc4').text(data.list[28].weather[0].description)
      $('.forecastIcon4').attr('src', `https://openweathermap.org/img/wn/${data.list[28].weather[0].icon}@2x.png`)
      $('.forecastDate4').text(forecastDate4);

      minTemp = [];
      maxTemp = [];

      for (var i = 31; i < 39; i++) {
        minTemp.push(data.list[i].main.temp_min);
        maxTemp.push(data.list[i].main.temp_max);
      }

      $('.forecastTempMin5').text(Math.round(Math.min(...minTemp))+'°F');
      $('.forecastTempMax5').text(Math.round(Math.max(...maxTemp))+'°F');
      $('.forecastDesc5').text(data.list[36].weather[0].description)
      $('.forecastIcon5').attr('src', `https://openweathermap.org/img/wn/${data.list[36].weather[0].icon}@2x.png`)
      $('.forecastDate5').text(forecastDate5);
    });

  }

  // cityData();
  currentLocalWeather();
  searchHistory();
  $(document).on('click', '.cityButtons', cityData);
});
