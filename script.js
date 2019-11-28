// Default Singapore google map
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 1.3521,
      lng: 103.8198
    },
    zoom: 11.5
  });
}

$(document).ready(function () {
  $("#frm").submit(function (e) {
    e.preventDefault();
    // testing if the preventDefault working
    // console.log("form...");
    var location = $("#location").val();


    // var url = "https://maps.googleapis.com/maps/api/geocode/json?address=+" + location + ",+SG&key=AIzaSyCHWMwcTeozXv6qrb4iD6l5JRZZ9HFeSa4";
    $.ajax({
      url: url,
      success: function (result) {
        // console.log(result["results"][0]["geometry"]["location"]);
        // console.log(google.maps.GeocoderStatus);
        // var newmap = result["results"][0]["geometry"]["location"];

        if (google.maps.GeocoderStatus.OK == "OK") {
          var newmap = result["results"][0]["geometry"]["location"];
          var marker = new google.maps.Marker({
            position: newmap,
            map: map
            // zoom: 20
          });

          // Set a marker on the search location
          map.setCenter(newmap);
          map.setZoom(18);
          // map.panTo(marker.position);
        } else {
          alert('Geocode was not successful for the following reason: ' + google.maps.GeocoderStatus.OK);
        };

      }
    });



  });

});

// $.ajax({
//   type: "GET",
//   datatype: "json",
//   url:"https://ipapi.co/8.8.8.8/json/",

//   success: function (data) {
//     console.log(data);
//   }

// });
var latitudeCurrent;
var longtitudeCurrent;

// Ipappi Section 
$.getJSON('https://ipapi.co/json/', function (ipaddress) {
  // console.log(data);
  var country = ipaddress.city;
  latitudeCurrent = ipaddress.latitude;
  longtitudeCurrent = ipaddress.longitude;
  $("#country").html(country)
  // weather()
  // console.log("lat" + latitudeCurrent);
  // console.log("long" + longtitudeCurrent);
});


// Weather API







$(document).ready(function () {


  $('.fahrenheit').hide();
  $("#todayF").hide();
  $("#tomorrowF").hide();
  $("#afterTomorrowF").hide();
  $("#afterAfterTomorrowF").hide();
  var latitude;
  var longitude;

  // Set weather icons color
  var icons = new Skycons({
    "color": "blue"
  });

  // Put the variable in a list
  var w = [Skycons.CLEAR_DAY, Skycons.CLEAR_NIGHT, Skycons.PARTLY_CLOUDY_DAY, Skycons.PARTLY_CLOUDY_NIGHT, Skycons.CLOUDY, Skycons.RAIN, Skycons.SLEET, Skycons.SNOW, Skycons.WIND, Skycons.FOG];

  // Set the IF condition for weather
  function getWeatherIcon(condition, w, day) {
    if (condition === "clear-day") {
      icons.set(day, w[0]);
    } else if (condition == "clear-night") {
      icons.set(day, w[1]);
    } else if (condition == "partly-cloudy-day") {
      icons.set(day, w[2]);
    } else if (condition == "partly-cloudy-night") {
      icons.set(day, w[3]);
    } else if (condition == "cloudy") {
      icons.set(day, w[4]);
    } else if (condition == "rain") {
      icons.set(day, w[5]);
    } else if (condition == "sleet") {
      icons.set(day, w[6]);
    } else if (condition == "snow") {
      icons.set(day, w[7]);
    } else if (condition == "wind") {
      icons.set(day, w[8]);
    } else {}
  }

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (location) {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
      console.log(latitude + " " + longitude);

      var geolocation = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + '%2C' + longitude + '&language=en';


      setTimeout(function () {
        $('div').removeClass('loader');
      }, 1500);

      var url = "https://api.darksky.net/forecast/795c3669281b12e43538aa2100be89fb/" + latitude + "," + longitude + "?callback=?&units=si";

      $.getJSON(url, function (data) {
        // console.log(data);

        var temp = data.currently.temperature;
        var fahrenheit = (data.currently.temperature * 9 / 5 + 32).toFixed(1) + "&deg;F";
        var celsius = data.currently.temperature.toFixed(1) + "&deg;C";
        var description = data.currently.summary;
        var wind = " " + data.currently.windSpeed.toFixed(1) + " m/s ";
        var humidity = " " + (data.currently.humidity * 100).toFixed(0) + " %";

        var summary = data["currently"]["summary"];
        // console.log(summary); // Check if the Weather API Work
        var weathericon = data["currently"]["icon"]
        // $("#currSummary").html(summary);
        // $("#day0").html(weathericon);
        getWeatherIcon(weathericon, w, "day0");

        // Change the icon image
        // $(".weathericon").attr("id", weathericon);
        console.log(data);
        console.log("Current Weather", weathericon);


        // icons.set("clear-day", Skycons.CLEAR_DAY);
        // icons.set("clear-night", Skycons.CLEAR_NIGHT);
        // icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
        // icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
        // icons.set("cloudy", Skycons.CLOUDY);
        // icons.set("rain", Skycons.RAIN);
        // icons.set("sleet", Skycons.SLEET);
        // icons.set("snow", Skycons.SNOW);
        // icons.set("wind", Skycons.WIND);
        // icons.set("fog", Skycons.FOG);


        icons.play();

        //bloody timeout so you can see the loading bars
        setTimeout(function () {
          $("#icon").html("<i class=\"" + icon + "\">");
          $("#description").html(description);
          $("#humidity").html(humidity);
          $("#wind").html(wind);
          $(".celsius").html(celsius);
          $(".fahrenheit").html(fahrenheit);

          //today forecast in C
          var todayMaxTemp = data.daily.data[0].temperatureMax.toFixed(0);
          var todayMinTemp = data.daily.data[0].temperatureMin.toFixed(0);
          var todayIcon = data.daily.data[0].icon;
          $("#todayC").html("<br>" + todayMinTemp + "&deg;/" + todayMaxTemp + "&deg; <br> <i class=\"" + todayIcon + "\" id=\"smallIcon\">");

          // console.log(todayIcon);

          getWeatherIcon(todayIcon, w, "day1");

          //tomorrow forecast in C
          var tomorrowMaxTemp = data.daily.data[1].temperatureMax.toFixed(0);
          var tomorrowMinTemp = data.daily.data[1].temperatureMin.toFixed(0);
          var tomorrowIcon = data.daily.data[1].icon;
          $("#tomorrowC").html("<br>" + tomorrowMinTemp + "&deg;/" + tomorrowMaxTemp + "&deg; <br> ");




          // console.log(tomorrowIcon);
          getWeatherIcon(tomorrowIcon, w, "day2");

          //after tomorrow forecast in C
          var afterTomorrowMaxTemp = data.daily.data[2].temperatureMax.toFixed(0);
          var afterTomorrowMinTemp = data.daily.data[2].temperatureMin.toFixed(0);
          var afterTomorrowIcon = data.daily.data[2].icon;
          $("#afterTomorrowC").html("<br>" + afterTomorrowMinTemp + "&deg;/" + afterTomorrowMaxTemp + "&deg; <br> <i class=\"" + afterTomorrowIcon + "\" id=\"smallIcon\">");

          getWeatherIcon(afterTomorrowIcon, w, "day3");

          //after after tomorrow forecast in C :))
          var afterAfterTomorrowMaxTemp = data.daily.data[3].temperatureMax.toFixed(0);
          var afterAfterTomorrowMinTemp = data.daily.data[3].temperatureMin.toFixed(0);
          var afterAfterTomorrowIcon = data.daily.data[3].icon;
          $("#afterAfterTomorrowC").html("<br>" + afterAfterTomorrowMinTemp + "&deg;/" + afterAfterTomorrowMaxTemp + "&deg; <br> <i class=\"" + afterAfterTomorrowIcon + "\" id=\"smallIcon\">");

          getWeatherIcon(afterAfterTomorrowIcon, w, "day4");

        }, 2200); // end of timeout 

        //temp toggle 
        $(".fahrenheit-btn").on("click", function () {
          $(".celsius").hide();
          $("#todayC").hide();
          $("#tomorrowC").hide();
          $("#afterTomorrowC").hide();
          $("#afterAfterTomorrowC").hide();
          $(".fahrenheit").show(fahrenheit);
          $("#todayF").show();
          $("#tomorrowF").show();
          $("#afterTomorrowF").show();
          $("#afterAfterTomorrowF").show();
        });
        $(".celsius-btn").on("click", function () {
          $(".fahrenheit").hide();
          $("#todayF").hide();
          $("#tomorrowF").hide();
          $("#afterTomorrowF").hide();
          $("#afterAfterTomorrowF").hide();
          $(".celsius").show(celsius);
          $("#todayC").show();
          $("#tomorrowC").show();
          $("#afterTomorrowC").show();
          $("#afterAfterTomorrowC").show();
        });

        //  end of temp toggle  
      });

    });
  } else {
    alert("We couldn` retrieve your location, please check your location settings");
  };







});

// Toggle Section

// Toggle Map Button
$("#toggle1").click(function () {
  $("#map").toggle();
});

// $("#toggle2").click(function () {
//   $("#weathericon").toggle();
// });