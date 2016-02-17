var Contact;

Contact = {
  placeId: 'ChIJYRO5t4GAhYARo4h4qnXunmc',
  map: false,
  i: function() {
    var src;
    src = '/img/contact/space.jpg';
    dbar.i();
    Global.preload([src], function(progress) {
      return dbar.perc(progress);
    }, function(complete) {
      dbar.d();
      _.off('.orbit');
      return _.on('.contact > .banner > .inner');
    });
    return google.maps.event.addDomListener(window, 'load', Contact.gmaps);
  },
  gmaps: function() {
    var image, infoContent, infoWindow, loc, map, mapCanvas, mapOptions, marker;
    loc = {
      lat: 37.777824,
      lng: -122.405037
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
      scaledSize: new google.maps.Size(45, 75),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(45, 75)
    };
    marker = new google.maps.Marker({
      title: 'map title is here',
      icon: image,
      map: map,
      animation: google.maps.Animation.DROP,
      position: loc
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

//# sourceMappingURL=data:application/json;base64,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QVksRUFBYjtXQUFyQjtTQUExRDtPQUFyeUM7O0VBRkYsQ0EvRFAiLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkNvbnRhY3QgPVxuXG4gIHBsYWNlSWQ6ICdDaElKWVJPNXQ0R0FoWUFSbzRoNHFuWHVubWMnXG5cbiAgbWFwOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBzcmMgPSAnL2ltZy9jb250YWN0L3NwYWNlLmpwZydcblxuXG4gICAgZGJhci5pKClcbiAgICBHbG9iYWwucHJlbG9hZCBbc3JjXSxcbiAgICAgIChwcm9ncmVzcykgLT5cbiAgICAgICAgZGJhci5wZXJjIHByb2dyZXNzXG4gICAgICAsIChjb21wbGV0ZSkgLT5cbiAgICAgICAgZGJhci5kKClcbiAgICAgICAgXy5vZmYgJy5vcmJpdCdcbiAgICAgICAgXy5vbiAnLmNvbnRhY3QgPiAuYmFubmVyID4gLmlubmVyJ1xuXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIENvbnRhY3QuZ21hcHMpXG5cbiAgZ21hcHM6IC0+XG5cbiAgICBsb2MgPVxuICAgICAgbGF0OiAzNy43Nzc4MjRcbiAgICAgIGxuZzogLTEyMi40MDUwMzdcblxuICAgIG1hcENhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdtYXAnXG4gICAgbWFwT3B0aW9ucyA9XG4gICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobG9jLmxhdCwgbG9jLmxuZyksXG4gICAgICB6b29tOiAxNyxcbiAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcbiAgICAgIHN0eWxlczogQ29udGFjdC5zdHlsZSgpXG4gICAgICBzY3JvbGx3aGVlbDogZmFsc2VcbiAgICAgIG5hdmlnYXRpb25Db250cm9sOiBmYWxzZVxuICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlXG4gICAgICBzY2FsZUNvbnRyb2w6IGZhbHNlXG4gICAgICBkcmFnZ2FibGU6IGZhbHNlXG5cbiAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcENhbnZhcywgbWFwT3B0aW9ucylcblxuICAgIGltYWdlID1cbiAgICAgIHVybDogJy9pbWcvY29udGFjdC9oaXRjaGhpa2VyLnBuZydcbiAgICAgIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDQ1LCA3NSlcbiAgICAgIG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50IDAsIDBcbiAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50IDQ1LCA3NVxuXG4gICAgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlclxuICAgICAgdGl0bGU6ICdtYXAgdGl0bGUgaXMgaGVyZSdcbiAgICAgIGljb246IGltYWdlXG4gICAgICBtYXA6IG1hcFxuICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUFxuICAgICAgcG9zaXRpb246IGxvY1xuXG4gICAgaW5mb0NvbnRlbnQgPSAnPGEgaHJlZj1cImh0dHBzOi8vZ29vLmdsL21hcHMvYVhmQUN3cnpwR1QyXCIgdGFyZ2V0PVwiX25ld1wiPkFzdHJvIFN0dWRpb3M8L2E+PGJyIC8+PGJyIC8+MzQ4IDZ0aCBTdDxiciAvPlNhbiBGcmFuY2lzY28sIENBPGJyIC8+OTQxMDMnXG4gICAgaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93XG4gICAgICBjb250ZW50OiBpbmZvQ29udGVudFxuICAgIG1hcmtlci5hZGRMaXN0ZW5lciAnY2xpY2snLCAtPlxuICAgICAgaW5mb1dpbmRvdy5vcGVuIG1hcCwgbWFya2VyXG4gICAgXG4gICAgIyBpZnJhbWVcbiAgICAjIDxpZnJhbWVcbiAgICAjICAgc3JjPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL2VtYmVkP3BiPSExbTE4ITFtMTIhMW0zITFkMzE1My41MjI3Mzc1MzAzMjM0ITJkLTEyMi40MDcyNDcxODQ3MTU4MyEzZDM3Ljc3Nzc4NzUxOTc1OTI2NSEybTMhMWYwITJmMCEzZjAhM20yITFpMTAyNCEyaTc2OCE0ZjEzLjEhM20zITFtMiExczB4ODA4NTgwODFiN2I5MTM2MSUzQTB4Njc5ZWVlNzVhYTc4ODhhMyEyc0FzdHJvK1N0dWRpb3MrSW5jITVlMCEzbTIhMXNlbiEyc3VzITR2MTQ0NDg3MDUxNzE0MVwiIHdpZHRoPVwiNjAwXCIgaGVpZ2h0PVwiNDUwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cblxuICBzdHlsZTogLT5cblxuICAgIHJldHVybiBbe1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOjM2fSx7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjo0MH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjIwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxN30se1wid2VpZ2h0XCI6MS4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MjF9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTd9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyOX0se1wid2VpZ2h0XCI6MC4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTh9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQubG9jYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE5fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE3fV19XVxuXG4iXX0=
