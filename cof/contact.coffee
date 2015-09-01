Contact =

  map: false

  i: ->

    src = '/img/contact/banner.jpg'

    Global.preload [src],
      (progress) ->
        NProgress.set progress
      , (complete) ->
        NProgress.done()
        _.off '.orbit'
        _.on '.contact > .banner > .inner'

    Contact.mapbox()

  mapbox: ->

    L.mapbox.accessToken = accessToken

    Contact.map = L.mapbox.map 'map', mapId
    #  zoomControl: false

    #Contact.map.dragging.disable()
    Contact.map.touchZoom.disable()
    Contact.map.doubleClickZoom.disable()
    Contact.map.scrollWheelZoom.disable()
    
    return true

