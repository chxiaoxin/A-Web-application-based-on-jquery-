(function() {

  var GoogleMapView = {};

  // zoom level for Google Map
  var DEFAULT_ZOOM = 18;
  var STATUS_OK = 200;

  /* Renders a map for the given entry into the provided $map element. */
  GoogleMapView.render = function($map, entryData) {
    var map=new google.maps.Map($map.get('0'),{zoom:DEFAULT_ZOOM,center:{lat:1.30,lng:103.77}});
    var geocoder=new google.maps.Geocoder();
    var address=entryData.address;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
  };

  window.GoogleMapView = GoogleMapView;

})();
