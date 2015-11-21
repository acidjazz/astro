var Contact;

Contact = {
  placeId: 'ChIJYRO5t4GAhYARo4h4qnXunmc',
  map: false,
  i: function() {
    var src;
    src = '/img/contact/space.jpg';
    Global.preload([src], function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.orbit');
      return _.on('.contact > .banner > .inner');
    });
    return google.maps.event.addDomListener(window, 'load', Contact.gmaps);
  },
  gmaps: function() {
    var image, infoContent, infoWindow, loc, map, mapCanvas, mapOptions, marker;
    loc = {
      lat: 37.7777875,
      lng: -122.4072472
    };
    mapCanvas = document.getElementById('map');
    mapOptions = {
      center: new google.maps.LatLng(loc.lat, loc.lng),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: Contact.style(),
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: false
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
    image = {
      url: '/img/contact/hitchhiker.png',
      scaledSize: new google.maps.Size(45, 75)
    };
    marker = new google.maps.Marker({
      title: 'map title is here',
      position: loc,
      icon: image,
      map: map
    });
    infoContent = '<a href="https://goo.gl/maps/aXfACwrzpGT2" target="_new">Astro Studios</a><br /><br />348 6th St<br />San Francisco, CA<br />94103';
    infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });
    return marker.addListener('click', function() {
      return infoWindow.open(map, marker);
    });
  },
  style: function() {
    return [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": 36
          }, {
            "color": "#000000"
          }, {
            "lightness": 40
          }
        ]
      }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          }, {
            "color": "#000000"
          }, {
            "lightness": 16
          }
        ]
      }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 20
          }
        ]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 17
          }, {
            "weight": 1.2
          }
        ]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 20
          }
        ]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 21
          }
        ]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 17
          }
        ]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 29
          }, {
            "weight": 0.2
          }
        ]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 18
          }
        ]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 16
          }
        ]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 19
          }
        ]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }, {
            "lightness": 17
          }
        ]
      }
    ];
  }
};
