Index =

  lineKey: 0
  lineInterval: false

  i: ->

    console.log 'Index.i()'

    src = Global.srcFromStyle($('.featureds > .inner > .featured:first-child'))

    dbar.i()
    console.log src
    Global.preload [src],
      (progress) ->
        dbar.perc progress
    , (complete) ->
      dbar.d()
      _.off '.orbit'
      _.on '.lines'

    Index.handlers()
    clearInterval Index.lineInterval if Index.lineInterval isnt false
    Index.lineInterval = setInterval Index.lineRotate, 4000

  handlers: ->

    $('.lines > .line').on 'click', Index.lineHandler
    $('.featureds').on 'click', Index.featuredHandler

    $('.projects > .thumb').on 'click', Index.grid

  lineRotate: ->
    if Index.lineKey is ($('.featureds > .inner > .featured').length-1)
      Index.line 0
    else
      Index.line Index.lineKey+1

  lineHandler: ->

    t = $ this
    Index.line t.data 'key'

    clearInterval Index.lineInterval
    Index.lineInterval = setInterval Index.lineRotate, 5000
    console.log 'interval reset'


  featuredHandler: ->

    link = $(".line_#{Index.lineKey}").data 'link'
    location.href = link

  line: (key) ->

    Index.lineKey = key

    src = Global.srcFromStyle($(".featureds > .inner > .featured:nth-child(#{key+1})"))

    dbar.i()
    Global.preload [src],
      (progress) ->
        dbar.perc progress
    , (complete) ->
      dbar.d()
      _.off '.featureds > .inner > .featured'
      _.on ".featureds > .inner > .featured:nth-child(#{key+1})"
      _.off '.lines > .line'
      _.on ".line_#{key}"

  grid: ->

    t = $ this
    type = t.data 'type'
    folder = t.data 'folder'
    if type is 'work'
      location.href = '/work/#' + folder
    if type is 'blog'
      location.href = '/blog/#' + folder



