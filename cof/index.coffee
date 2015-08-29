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
      _.off '.preloader'
      _.on '.circles'

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


