Index =

  lineKey: 0

  i: ->

    console.log 'Index.i()'

    src = Global.srcFromStyle($('.featureds > .inner > .featured:first-child'))

    NProgress.start()
    Global.preload [src],
      (progress) ->
        NProgress.set progress
    , (complete) ->
      NProgress.done()
      _.off '.orbit'
      _.on '.lines'

    Index.handlers()
    Index.lineIntrval = setInterval Index.lineRotate, 5000

  handlers: ->

    $('.lines > .line').on 'click', Index.lineHandler

    $('.projects > .thumb').on 'click', Index.grid

  lineRotate: ->
    console.log 'lineRotate'
    if Index.lineKey is 3
      Index.line 0
    else
      Index.line Index.lineKey+1

  lineHandler: ->
    t = $ this
    Index.line t.data 'key'

  line: (key) ->

    Index.lineKey = key

    src = Global.srcFromStyle($(".featureds > .inner > .featured:nth-child(#{key+1})"))

    NProgress.start()
    Global.preload [src],
      (progress) ->
        NProgress.set progress
    , (complete) ->
      NProgress.done()
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



