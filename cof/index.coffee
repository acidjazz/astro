Index =

  i: ->

    console.log 'Index.i()'

    src = Global.srcFromStyle($('.featureds > .inner > .featured:first-child'))

    NProgress.start()
    Global.preload [src],
      (progress) ->
        NProgress.set progress
    , (complete) ->
      NProgress.done()
<<<<<<< HEAD
      _.off '.orbit'
      _.on '.triangles'
=======
      _.off '.preloader'
      _.on '.circles'
>>>>>>> 9e30b06ea0ab16f34243fa4dc6748898fc81ea0f

    Index.handlers()

  handlers: ->

    $('.circles > .circle').on 'click', Index.circle


  circle: ->

    key = $(this).data 'key'

    src = Global.srcFromStyle($(".featureds > .inner > .featured:nth-child(#{key+1})"))

    NProgress.start()
    Global.preload [src],
      (progress) ->
        NProgress.set progress
    , (complete) ->
      NProgress.done()
      _.off '.featureds > .inner > .featured'
      _.on ".featureds > .inner > .featured:nth-child(#{key+1})"


