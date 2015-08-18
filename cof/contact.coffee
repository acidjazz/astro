Contact =

  i: ->

    src = '/img/contact/banner.jpg'

    Global.preload [src],
      (progress) ->
        NProgress.set progress
      , (complete) ->
        NProgress.done()
        _.off '.preloader'
        _.on '.contact > .banner > .inner'
