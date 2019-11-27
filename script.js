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
  weather()
  // console.log("lat" + latitudeCurrent);
  // console.log("long" + longtitudeCurrent);
});


// Weather API
function weather() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "dataType": "jsonp",
    // "url": "https://api.darksky.net/forecast/795c3669281b12e43538aa2100be89fb/" + lat + "," + long ,
    "url": "https://api.darksky.net/forecast/795c3669281b12e43538aa2100be89fb/" + latitudeCurrent + "," + longtitudeCurrent,
    "method": "GET"
  }

  $.ajax(settings).done(function (data) {
    var summary = data["currently"]["summary"];
    // console.log(summary); // Check if the Weather API Work
    var weathericon = data["currently"]["icon"]
    $("#currSummary").html(summary);

    $("#weathericon").html(weathericon);
    // Change the icon image
    $("canvas").attr("id",weathericon);
    console.log(data);
    

    var icons = new Skycons({
      "color": "blue"
    });

    icons.set("clear-day", Skycons.CLEAR_DAY);
    icons.set("clear-night", Skycons.CLEAR_NIGHT);
    icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
    icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
    icons.set("cloudy", Skycons.CLOUDY);
    icons.set("rain", Skycons.RAIN);
    icons.set("sleet", Skycons.SLEET);
    icons.set("snow", Skycons.SNOW);
    icons.set("wind", Skycons.WIND);
    icons.set("fog", Skycons.FOG);

    icons.play();

  });

};



// Toggle Section

// Toggle Map Button
$("#toggle1").click(function () {
  $("#map").toggle();
});

// $("#toggle2").click(function () {
//   $("#weathericon").toggle();
// });