var map, markers;

function createStreetView(marker, info){
  var streetView = new google.maps.StreetViewService();
  var radius = 50;

  function getStreeView(data, status){
    if (status == google.maps.StreetViewStatus.OK){
      var nearLocation = data.location.latLng;
      var heading = google.maps.geometry.spherical.computeHeading(nearLocation, marker.position);
      info.setContent('<div>' + marker.title + '</div><div id="panorama"></div>');
      var panoramaOptions = {
        position: nearLocation,
        pov: {
          heading: heading,
          pitch: 30
        }
      };
      var panorama = new google.maps.StreetViewPanorama(document.getElementById('panorama'), panoramaOptions);
    }
    else{
      info.setContent('<div>' + marker.title + '</div><div>No panorama found ! :(</div>');
    }
  };

  streetView.getPanoramaByLocation(marker.position, radius, getStreeView);

  info.open(map, marker);
}

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 46.77121, lng: 23.623635 },
    zoom: 13
    });

  var oradeaCoord = { lat: 47.046501, lng: 21.918944 };
  var clujCoord = { lat: 46.77121, lng: 23.623635 };
  var markerIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

  markers = [ new google.maps.Marker({
    position: oradeaCoord,
    map: map,
    title: 'Here is Oradea !',
    label: 'H'
  }),
    new google.maps.Marker({
    position: clujCoord,
    map: map,
    title: 'Here is Cluj !',
    animation: google.maps.Animation.BOUNCE,
    icon: markerIcon
  })];

  var bounds = new google.maps.LatLngBounds();

  // populate info window
  markers.forEach(function(m){
    var info = new google.maps.InfoWindow();

    m.addListener('click', function(){
      createStreetView(m, info);
    });

    bounds.extend(m.position);
  });

  map.fitBounds(bounds);
}

document.getElementById('show-listings').addEventListener('click', function(){
  markers.forEach(function(m){
    m.setMap(map);
  });
});

document.getElementById('hide-listings').addEventListener('click', function(){
  markers.forEach(function(m){
    m.setMap(null);
  });
});
