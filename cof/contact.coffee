Contact =

  placeId: 'ChIJYRO5t4GAhYARo4h4qnXunmc'

  map: false

  i: ->

    src = '/img/contact/space.jpg'

    Global.preload [src],
      (progress) ->
        NProgress.set progress
      , (complete) ->
        NProgress.done()
        _.off '.orbit'
        _.on '.contact > .banner > .inner'

    google.maps.event.addDomListener(window, 'load', Contact.gmaps)

  gmaps: ->

    loc =
      lat: 37.7777875
      lng: -122.4072472

    mapCanvas = document.getElementById 'map'
    mapOptions =
      center: new google.maps.LatLng(loc.lat, loc.lng),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      styles: Contact.style()
      scrollwheel: false
      navigationControl: false
      mapTypeControl: false
      scaleControl: false
      draggable: false

    map = new google.maps.Map(mapCanvas, mapOptions)

    image =
      url: '/img/contact/hitchhiker.png'
      scaledSize: new google.maps.Size(45, 75)

    marker = new google.maps.Marker
      title: 'map title is here'
      position: loc
      icon: image
      map: map

    infoContent = '<a href="https://goo.gl/maps/aXfACwrzpGT2" target="_new">Astro Studios</a><br /><br />348 6th St<br />San Francisco, CA<br />94103'
    infoWindow = new google.maps.InfoWindow
      content: infoContent
    marker.addListener 'click', ->
      infoWindow.open map, marker
    
    # iframe
    # <iframe
    #   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5227375303234!2d-122.40724718471583!3d37.777787519759265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858081b7b91361%3A0x679eee75aa7888a3!2sAstro+Studios+Inc!5e0!3m2!1sen!2sus!4v1444870517141" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>

  style: ->

    return [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]

