document.addEventListener('DOMContentLoaded', () => {

  function startMap() {
  // Store Ironhack's coordinates
  const store = { lat: 41.3977381,  lng: 2.190471916 };

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
    title: "Barcelona Campus"
  });


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(store);

      // Add a marker for your user location
      const ironHackBCNMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here"
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}
  startMap();
  

}, false);