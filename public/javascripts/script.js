document.addEventListener('DOMContentLoaded', () => {

  function startMap() {
  // Store Ironhack's coordinates
  const store = { lat: window.coordinates[0],  lng: window.coordinates[1] };

  // Map initialization
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: store
  });

  // Add a marker for Ironhack Barcelona
  const IronHackBCNMarker = new google.maps.Marker({
    position: {
      lat: store.lat,
      lng: store.lng
    },
    map: map,
    // title: `${window.storetitle}`
  });


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(store);

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}
  startMap();

}, false);