Global =

  astroInterval: false
  fbarInterval: false
  phraseTimeout: false
  thumbTimeout: false
  cache: {}

  i: ->

    NProgress.configure
      showSpinner: false

    Global.cache.astro = $('.astro')
    Global.cache.red1 = $('.red1')
    Global.cache.burger = $('.top > .inner > .burger > .inner')
    Global.cache.phrase = $('.top > .inner > .phrase')

    setTimeout ->
      Global.astro(true)
    , 400

    Global.astroInterval = setInterval ->
      Global.astro()
    , 500

    Global.fbarInterval = setInterval ->
      Global.fbar()
    , 500

    Global.phrase()

    Global.handlers()

    Global.fbar()

  fbar: ->

    if $('.fcontainer:visible').length is 0
      return true

    if $(window).scrollTop() > ($('.fcontainer:visible').offset().top + 60)
      $('.filters').addClass 'float'
      $('.top').addClass 'fbar'
    else
      $('.filters').removeClass 'float'
      $('.top').removeClass 'fbar'

    
  handlers: ->

    $('.top > .inner > .burger').on 'click', Global.burger
    $('.menu > .inner > .options > .option').on 'click', Global.option

    $('.thumbs > .thumb, .projects > .thumb').on 'mousemove', Global.thumb

    console.log 'Global.handlers()'


  thumb: (event) ->

    if Global.thumbTimeout isnt false
      return true

    if Global.thumbTimeout is false
      Global.thumbTimeout = setTimeout ->
        clearTimeout Global.thumbTimeout
        Global.thumbTimeout = false
      , 100

    console.log 'Global.thumb()'

    t = $ this
    name = t.find '.inner > .copy > .name'
    filters = t.find '.inner > .copy > .filters'
    rect = t[0].getBoundingClientRect()
    offset = t.offset()
    x = Math.floor(event.pageX - offset.left)
    y = Math.floor(event.pageY - offset.top)
    px = Math.floor(x * 100 / t.width())
    py = Math.floor(y * 100 / t.height())

    opx4 = (px-50)/4
    opy4 = (py-50)/4

    opx6 = (px-50)/6
    opy6 = (py-50)/6

    opx8 = (px-50)/8
    opy8 = (py-50)/8

    name.css 'transform', "translate(#{-opx6}px, #{-opy6}px)"
    filters.css 'transform', "translate(#{-opx8}px, #{-opy8}px)"
    t.css 'background-position', "#{opx4+50}% #{opy4+50}%"

  phrase: ->
    phrase = phrases[Math.floor(Math.random()*phrases.length)]
    compiled = ''
    for i in [0..(phrase.length-1)]
      compiled  = "#{compiled}<div>#{phrase[i].replace(' ', '&nbsp;')}</div>"

    Global.cache.phrase.html compiled

    Global.phraseTimeout = setTimeout ->
      _.on Global.cache.phrase
    , 5000

  burger: ->

    if $(this).hasClass 'on'
      Global.menu.on()
    else
      Global.menu.off()

  astro: (clean) ->

    if document.body.scrollTop isnt 0 or document.documentElement.scrollTop isnt 0 and (Global.cache.astro.hasClass('off') or clean)
      _.on Global.cache.astro, Global.cache.red1, Global.cache.burger, Global.cache.phrase
      return true

    if (document.body.scrollTop is 0 or document.documentElement.scrollTop is 0) and (Global.cache.astro.hasClass('on') or clean)
      _.off Global.cache.astro, Global.cache.red1, Global.cache.burger, Global.cache.phrase
      clearTimeout Global.phraseTimeout
      Global.phrase()
      return true

  menu:

    on: ->
      _.on '.menu'
      _.off '.burger'
      $('body').addClass 'fixed'

    off: ->
      _.off '.menu'
      _.on '.burger'
      $('body').removeClass 'fixed'

  option: ->

    t = $ this
    $('.menu > .inner > .options > .option').removeClass 'active'
    t.addClass 'active'

    option = t.text().trim()
    setTimeout ->

      Global.menu.off()
      $('.menu > .inner > .options > .option').removeClass 'active'

      if option is 'work'
        if location.href.match('work') isnt null
          Work.summary()
          _.on '.summary > .thumbs > .thumb'
          _.off '.summary > .filters > .inner > .filtermenu > .filter'
          _.on '.summary > .filters > .inner > .filtermenu > .filter_all'
        else
          location.href = '/work/'

      if option is 'about'
          location.href = '/about/'
      if option is 'contact'
          location.href = '/contact/'

    , 400

  preload: (srces, progress, complete) ->

    images = []
    loaded = 0
    total = srces.length

    for src, i in srces
      # console.log 'Global.preload()', src
      images[i] = new Image()
      images[i].src = src
      images[i].onload = ->
        loaded++
        perc = Math.round(loaded/total*100)/100
        if loaded is total then complete(true) else progress(perc)

  srcFromStyle: (el) ->
    style = el.attr 'style'
    url = style.match(/url\("(.*)"\)/)
    return url[1]
