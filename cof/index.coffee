Index =

  lineKey: 0
  lineInterval: false

  i: ->

    src = Global.srcFromStyle($('.featureds > .inner > .featured:first-child'))

    dbar.i()
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

    Index.instagram.load()

  handlers: ->

    $('.lines > .line').on 'click', Index.lineHandler
    $('.featureds').on 'click', Index.featuredHandler

    $('.projects > .thumb').on 'click', Index.grid

  instagram:

    endpoint: 'https://api.instagram.com/v1/users/self/media/recent/'
    token: '264367793.55cd6c3.ae227ede2f5c48eaab95ca57ffc4c0f6'
    loaded: false
    posts: 8
    load: ->
      Loader.load "#{Index.instagram.endpoint}?access_token=#{Index.instagram.token}&callback=Index.instagram.callback"
      Index.instagram.loaded = true

    callback: (json) ->
      for post, index in json.data
        $('.instagram > .inner').append '<div class="clear"></div>' if index is Index.instagram.posts
        return true if index is Index.instagram.posts
        $('.instagram > .inner').append """

          <div class="post">
            <a href="#{post.link}" target="_new" class="post">
              <img src="#{post.images.standard_resolution.url}" />
            </a>
          </div>
        """

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



