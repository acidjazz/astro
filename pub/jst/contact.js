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

//# sourceMappingURL=data:application/json;base64,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Qzs7RUFGRixDQTdEUCIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQ29udGFjdCA9XG5cbiAgcGxhY2VJZDogJ0NoSUpZUk81dDRHQWhZQVJvNGg0cW5YdW5tYydcblxuICBtYXA6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIHNyYyA9ICcvaW1nL2NvbnRhY3Qvc3BhY2UuanBnJ1xuXG4gICAgR2xvYmFsLnByZWxvYWQgW3NyY10sXG4gICAgICAocHJvZ3Jlc3MpIC0+XG4gICAgICAgIE5Qcm9ncmVzcy5zZXQgcHJvZ3Jlc3NcbiAgICAgICwgKGNvbXBsZXRlKSAtPlxuICAgICAgICBOUHJvZ3Jlc3MuZG9uZSgpXG4gICAgICAgIF8ub2ZmICcub3JiaXQnXG4gICAgICAgIF8ub24gJy5jb250YWN0ID4gLmJhbm5lciA+IC5pbm5lcidcblxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBDb250YWN0LmdtYXBzKVxuXG4gIGdtYXBzOiAtPlxuXG4gICAgbG9jID1cbiAgICAgIGxhdDogMzcuNzc3ODI0XG4gICAgICBsbmc6IC0xMjIuNDA1MDM3XG5cbiAgICBtYXBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnbWFwJ1xuICAgIG1hcE9wdGlvbnMgPVxuICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxvYy5sYXQsIGxvYy5sbmcpLFxuICAgICAgem9vbTogMTcsXG4gICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXG4gICAgICBzdHlsZXM6IENvbnRhY3Quc3R5bGUoKVxuICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlXG4gICAgICBuYXZpZ2F0aW9uQ29udHJvbDogZmFsc2VcbiAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZVxuICAgICAgc2NhbGVDb250cm9sOiBmYWxzZVxuICAgICAgZHJhZ2dhYmxlOiBmYWxzZVxuXG4gICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBDYW52YXMsIG1hcE9wdGlvbnMpXG5cbiAgICBpbWFnZSA9XG4gICAgICB1cmw6ICcvaW1nL2NvbnRhY3QvaGl0Y2hoaWtlci5wbmcnXG4gICAgICBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg0NSwgNzUpXG4gICAgICBvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCAwLCAwXG4gICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCA0NSwgNzVcblxuICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXJcbiAgICAgIHRpdGxlOiAnbWFwIHRpdGxlIGlzIGhlcmUnXG4gICAgICBpY29uOiBpbWFnZVxuICAgICAgbWFwOiBtYXBcbiAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1BcbiAgICAgIHBvc2l0aW9uOiBsb2NcblxuICAgIGluZm9Db250ZW50ID0gJzxhIGhyZWY9XCJodHRwczovL2dvby5nbC9tYXBzL2FYZkFDd3J6cEdUMlwiIHRhcmdldD1cIl9uZXdcIj5Bc3RybyBTdHVkaW9zPC9hPjxiciAvPjxiciAvPjM0OCA2dGggU3Q8YnIgLz5TYW4gRnJhbmNpc2NvLCBDQTxiciAvPjk0MTAzJ1xuICAgIGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvd1xuICAgICAgY29udGVudDogaW5mb0NvbnRlbnRcbiAgICBtYXJrZXIuYWRkTGlzdGVuZXIgJ2NsaWNrJywgLT5cbiAgICAgIGluZm9XaW5kb3cub3BlbiBtYXAsIG1hcmtlclxuICAgIFxuICAgICMgaWZyYW1lXG4gICAgIyA8aWZyYW1lXG4gICAgIyAgIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9lbWJlZD9wYj0hMW0xOCExbTEyITFtMyExZDMxNTMuNTIyNzM3NTMwMzIzNCEyZC0xMjIuNDA3MjQ3MTg0NzE1ODMhM2QzNy43Nzc3ODc1MTk3NTkyNjUhMm0zITFmMCEyZjAhM2YwITNtMiExaTEwMjQhMmk3NjghNGYxMy4xITNtMyExbTIhMXMweDgwODU4MDgxYjdiOTEzNjElM0EweDY3OWVlZTc1YWE3ODg4YTMhMnNBc3RybytTdHVkaW9zK0luYyE1ZTAhM20yITFzZW4hMnN1cyE0djE0NDQ4NzA1MTcxNDFcIiB3aWR0aD1cIjYwMFwiIGhlaWdodD1cIjQ1MFwiIGZyYW1lYm9yZGVyPVwiMFwiIHN0eWxlPVwiYm9yZGVyOjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+XG5cbiAgc3R5bGU6IC0+XG5cbiAgICByZXR1cm4gW3tcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjozNn0se1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6NDB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifSx7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTd9LHtcIndlaWdodFwiOjEuMn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MjB9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjIxfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE3fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6Mjl9LHtcIndlaWdodFwiOjAuMn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE4fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmxvY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTZ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxOX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxN31dfV1cblxuIl19
