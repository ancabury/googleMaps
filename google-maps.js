var map, markers;

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

  markers.forEach(function(m){
    var info = new google.maps.InfoWindow({
      content: m.title + '!\n' +
        'Position: ' + m.position
    });

    m.addListener('click', function(){
      info.open(map, m);
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
