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
      _.off '.orbit'
      _.on '.lines'

    Index.handlers()

  handlers: ->

    $('.lines > .line').on 'click', Index.line

    $('.projects > .thumb').on 'click', Index.grid

  line: ->

    t = $ this

    key = t.data 'key'

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
      _.on t

  grid: ->

    t = $ this
    type = t.data 'type'
    folder = t.data 'folder'
    if type is 'work'
      location.href = '/work/#' + folder
    if type is 'blog'
      location.href = '/blog/#' + folder



