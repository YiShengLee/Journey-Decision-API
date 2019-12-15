// Default Singapore google map
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      // set the default map display
      lat: 1.3521,
      lng: 103.8198
    },
    zoom: 11.5
  });
}

var newmap;
var searchlat;
var searchlong;

$(document).ready(function () {
  $("#frm").submit(function (e) {
    e.preventDefault();
    // testing if the preventDefault working
    // console.log("form...");
    var location = $("#location").val();





    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=+" + location + ",+SG&key=AIzaSyCHWMwcTeozXv6qrb4iD6l5JRZZ9HFeSa4";
    $.ajax({
      url: url,
      success: function (result) {
        var address = result['results'][0]['address_components'][0]['long_name'] + " " + result['results'][0]['address_components'][1]['long_name'] + " " + "Weather Report";
        $('#tableHeader').html(address);
        // console.log(address);


        if (google.maps.GeocoderStatus.OK == "OK") {
          var newmap = result["results"][0]["geometry"]["location"];
          searchlat = result["results"][0]["geometry"]["location"]["lat"];
          searchlong = result["results"][0]["geometry"]["location"]["lng"];
          var newurl = "https://api.darksky.net/forecast/795c3669281b12e43538aa2100be89fb/" + searchlat + "," + searchlong + "?callback=?&units=si";
          // console.log(newurl);

          $.getJSON(newurl, function (data) {
            // console.log(data);
            var summary = data["currently"]["summary"];

            // map.addListener('bounds_changed', function() {
            //   searchBox.setBounds(map.getBounds());
            // });

            // Date Row on the Table Javascript
            var curr = data['currently']['time'];

            let date = " " + "[" + dayjs.unix(curr).format("D MMMM YYYY, dddd") + "]";
            $('#tableHeader1').html(date);

            // Time Row on the Table Javascript
            // Current Time
            let currtime = "Current Time" + "<br>" + dayjs.unix(curr).format("hh:mm:ss a");
            $('#currtime').html(currtime);

            // One Hour Later
            var onehr = dayjs.unix(curr).add('1','hour');
            var onehrs = onehr.format("hh:mm:ss a");

            let onehrtime = "One Hour Later" + "<br>" + onehrs;
            $('#onehrtime').html(onehrtime);

            // console.log(onehrs);

            // Two Hours Later
            var twohr = dayjs.unix(curr).add('2','hour');
            var twohrs = twohr.format("hh:mm:ss a");

            let twohrtime = "Two Hour Later" + "<br>" + twohrs;
            $('#twohrtime').html(twohrtime);
            
            // console.log(twohrs);
            
            // Three Hours Later
            var threehr = dayjs.unix(curr).add('3','hour');
            var threehrs = threehr.format("hh:mm:ss a");

            let threehrtime = "Three Hour Later" + "<br>" + threehrs;
            $('#threehrtime').html(threehrtime);
            
            // console.log(threehrs);
            
            // Temperature Row on the Table Javascript
            // Current Temperature
            var currtemp = data['currently']['temperature'] + "&deg;C";
            $('#currtemp').html(currtemp);

            // One Hour Later Temperature
            var onehourtemp = data['hourly']['data'][1]['temperature'] + "&deg;C";
            $('#onehourtemp').html(onehourtemp);

            // Two Hours Later Temperature
            var twohourtemp = data['hourly']['data'][2]['temperature'] + "&deg;C";
            $('#twohourtemp').html(twohourtemp);

            // Three Hours Later Temperature
            var threehourtemp = data['hourly']['data'][3]['temperature'] + "&deg;C";
            $('#threehourtemp').html(threehourtemp);


            // Weather Row on the Table Javascript
            // Current Weather
            var currwea = data['currently']['summary'];
            $('#currwea').html(currwea);

            // One Hour Later Weather
            var onehourwea = data['hourly']['data'][1]['summary'];
            $('#onehourwea').html(onehourwea);

            // Two Hour Later Weather
            var twohourwea = data['hourly']['data'][2]['summary'];
            $('#twohourwea').html(twohourwea);

            // Three Hour Later Weather
            var threehourwea = data['hourly']['data'][3]['summary'];
            $('#threehourwea').html(threehourwea);

            // Humidity Row on the Table Javascript
            // Current Humidity
            var currhum = data['currently']['humidity']*100 + "%";
            $('#currhum').html(currhum);

            // One Hour Later Humidity
            var onehourhum = data['hourly']['data'][1]['humidity']*100 + "%";
            $('#onehourhum').html(onehourhum);

            // Two Hour Later Humidity
            var twohourhum = data['hourly']['data'][2]['humidity']*100 + "%";
            $('#twohourhum').html(twohourhum);

            // Three Hour Later Humidity
            var threehourhum = data['hourly']['data'][3]['humidity']*100 + "%";
            $('#threehourhum').html(threehourhum);

          });

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



var latitudeCurrent;
var longtitudeCurrent;

// Ipappi Section 
$.getJSON('https://ipapi.co/json/', function (ipaddress) {
  // console.log(ipaddress);
  var country = ipaddress.country_name;
  // Display flag image
  var flag = "images/Flag_icons/" + country.toLowerCase() + ".png";
  // var flag = "/Project 2/images/Flag_icons/" + "malaysia.png";
  latitudeCurrent = ipaddress.latitude;
  longtitudeCurrent = ipaddress.longitude;
  $("#country").html(country)
  document.getElementById("flag").src = flag;
  // console.log(flag);
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
    } else if (condition === "clear-night") {
      icons.set(day, w[1]);
    } else if (condition === "partly-cloudy-day") {
      icons.set(day, w[2]);
    } else if (condition === "partly-cloudy-night") {
      icons.set(day, w[3]);
    } else if (condition === "cloudy") {
      icons.set(day, w[4]);
    } else if (condition === "rain") {
      icons.set(day, w[5]);
    } else if (condition === "sleet") {
      icons.set(day, w[6]);
    } else if (condition === "snow") {
      icons.set(day, w[7]);
    } else if (condition === "wind") {
      icons.set(day, w[8]);
    } else {}
  }

  // Display all the weather icon information
  var display = new Skycons({
    "color": "black"
  });

  display.set("clear-day", Skycons.CLEAR_DAY);
  display.set("clear-night", Skycons.CLEAR_NIGHT);
  display.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
  display.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
  display.set("cloudy", Skycons.CLOUDY);
  display.set("rain", Skycons.RAIN);
  display.set("sleet", Skycons.SLEET);
  display.set("snow", Skycons.SNOW);
  display.set("wind", Skycons.WIND);
  display.set("fog", Skycons.FOG);

  display.play();

  // Set the latitude and longtitude into weather api
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (location) {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
      // console.log(latitude + " " + longitude);
      // console.log(location);

      var geolocation = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + '%2C' + longitude + '&language=en';

      // Display loading image
      setTimeout(function () {
        $('div').removeClass('loader');
      }, 1500);

      // Dark sky API key
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
        getWeatherIcon(weathericon, w, "day0");

        // Change the icon image
        // $(".weathericon").attr("id", weathericon);
        // console.log("Current Weather", weathericon);

        icons.play();

        //bloody timeout so you can see the loading bars
        setTimeout(function () {
          // $("#icon").html("<i class=\"" + icon + "\">");
          $("#description").html(description);
          $("#humidity").html(humidity);
          $("#wind").html(wind);
          $(".celsius").html(celsius);
          $(".fahrenheit").html(fahrenheit);

          //today forecast in C
          var todayMaxTemp = data.daily.data[0].temperatureMax.toFixed(0);
          var todayMinTemp = data.daily.data[0].temperatureMin.toFixed(0);
          var todayIcon = data.daily.data[0].icon;
          $("#todayC").html("<br>" + todayMinTemp + "&deg;/" + todayMaxTemp + "&deg;");
          //today forecast in F 
          var todayMaxTemp = (data.daily.data[0].temperatureMax * 9 / 5 + 32).toFixed(0);
          var todayMinTemp = (data.daily.data[0].temperatureMin * 9 / 5 + 32).toFixed(0);
          var todayIcon = data.daily.data[0].icon;
          $("#todayF").html("<br>" + todayMinTemp + "&deg;/" + todayMaxTemp + "&deg; <br>");

          // console.log(todayIcon);

          getWeatherIcon(todayIcon, w, "day1");

          //tomorrow forecast in C
          var tomorrowMaxTemp = data.daily.data[1].temperatureMax.toFixed(0);
          var tomorrowMinTemp = data.daily.data[1].temperatureMin.toFixed(0);
          var tomorrowIcon = data.daily.data[1].icon;
          $("#tomorrowC").html("<br>" + tomorrowMinTemp + "&deg;/" + tomorrowMaxTemp + "&deg; <br> ");



          //tomorrow forecast in F
          var tomorrowMaxTemp = (data.daily.data[1].temperatureMax * 9 / 5 + 32).toFixed(0);
          var tomorrowMinTemp = (data.daily.data[1].temperatureMin * 9 / 5 + 32).toFixed(0);
          var tomorrowIcon = data.daily.data[1].icon;
          $("#tomorrowF").html("<br>" + tomorrowMinTemp + "&deg;/" + tomorrowMaxTemp + "&deg; <br>");

          // console.log(tomorrowIcon);
          getWeatherIcon(tomorrowIcon, w, "day2");

          //after tomorrow forecast in C
          var afterTomorrowMaxTemp = data.daily.data[2].temperatureMax.toFixed(0);
          var afterTomorrowMinTemp = data.daily.data[2].temperatureMin.toFixed(0);
          var afterTomorrowIcon = data.daily.data[2].icon;
          $("#afterTomorrowC").html("<br>" + afterTomorrowMinTemp + "&deg;/" + afterTomorrowMaxTemp + "&deg; <br>");
          //after tomorrow forecast in F
          var afterTomorrowMaxTemp = (data.daily.data[2].temperatureMax * 9 / 5 + 32).toFixed(0);
          var afterTomorrowMinTemp = (data.daily.data[2].temperatureMin * 9 / 5 + 32).toFixed(0);
          var afterTomorrowIcon = data.daily.data[2].icon;
          $("#afterTomorrowF").html("<br>" + afterTomorrowMinTemp + "&deg;/" + afterTomorrowMaxTemp + "&deg; <br>");

          getWeatherIcon(afterTomorrowIcon, w, "day3");

          //after after tomorrow forecast in C :))
          var afterAfterTomorrowMaxTemp = data.daily.data[3].temperatureMax.toFixed(0);
          var afterAfterTomorrowMinTemp = data.daily.data[3].temperatureMin.toFixed(0);
          var afterAfterTomorrowIcon = data.daily.data[3].icon;
          $("#afterAfterTomorrowC").html("<br>" + afterAfterTomorrowMinTemp + "&deg;/" + afterAfterTomorrowMaxTemp + "&deg; <br>");
          //after after tomorrow forecast in F :))
          var afterAfterTomorrowMaxTemp = (data.daily.data[3].temperatureMax * 9 / 5 + 32).toFixed(0);
          var afterAfterTomorrowMinTemp = (data.daily.data[3].temperatureMin * 9 / 5 + 32).toFixed(0);
          var afterAfterTomorrowIcon = data.daily.data[3].icon;
          $("#afterAfterTomorrowF").html("<br>" + afterAfterTomorrowMinTemp + "&deg;/" + afterAfterTomorrowMaxTemp + "&deg; <br>");

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
    alert("We couldn't retrieve your location, please check your location settings");
  };


  // date array 
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth(); //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  today = dd + '. ' + months[mm] + ', ' + yyyy;
  $(".date").html(today);
  //end date



});

// Toggle Section

// Toggle Map Button
$("#toggle1").click(function () {
  $("#map").toggle();
});

$("#toggle2").click(function () {
  $("#table").toggle();
  $("#tableHeader").toggle();
  $("#tableHeader1").toggle();
});