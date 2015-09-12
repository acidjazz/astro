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
    else
      $('.filters').removeClass 'float'

    
  handlers: ->

    $('.top > .inner > .burger').on 'click', Global.burger
    $('.menu > .inner > .options > .option').on 'click', Global.option

    $('.thumbs > .thumb, .projects > .thumb').on 'mousemove', Global.thumb

  thumb: (event) ->

    ###
    if Global.thumbTimeout isnt false
      return true

    if Global.thumbTimeout is false
      Global.thumbTimeout = setTimeout ->
        clearTimeout Global.thumbTimeout
        Global.thumbTimeout = false
      , 20
    ###

    t = $ this
    bg = t.find '.inner'
    name = t.find '.inner > .bg > .copy > .name'
    filters = t.find '.inner > .bg > .copy > .filters'
    rect = t[0].getBoundingClientRect()
    nameRect = name[0].getBoundingClientRect()

    distortBg = new Distort
      width: rect.width
      height: rect.height
      $el: bg

    distortName = new Distort
      width: rect.width
      height: rect.height
      $el: nameRect

    offset = t.offset()
    x = Math.floor(event.pageX - offset.left)
    y = Math.floor(event.pageY - offset.top)
    px = Math.floor(x * 100 / t.width())
    py = Math.floor(y * 100 / t.height())

    opx8 = (px-50)/8
    opy8 = (py-50)/8

    opx6 = (px-50)/6
    opy6 = (py-50)/6

    distortBg.topRight.x -= opy8
    distortBg.topRight.y -= opx8

    distortBg.topLeft.x -= -opy8
    distortBg.topLeft.y -= -opx8

    distortBg.bottomRight.x -= -opy8
    distortBg.bottomRight.y -= -opx8

    distortBg.bottomLeft.x -= opy8
    distortBg.bottomLeft.y -= opx8

    bg.css 'transform', distortBg.toString()

    distortName.topRight.x -= opy6
    distortName.topRight.y -= opx6

    distortName.topLeft.x -= -opy6
    distortName.topLeft.y -= -opx6

    distortName.bottomRight.x -= -opy6
    distortName.bottomRight.y -= -opx6

    distortName.bottomLeft.x -= opy6
    distortName.bottomLeft.y -= opx6

    name.css 'transform', distortName.toString()
    #filters.css 'transform', distortName.toString()


    ###

    opx4 = (px-50)/10
    opy4 = (py-50)/10

    opx6 = (px-50)/6
    opy6 = (py-50)/6


    name.css 'transform', "translate(#{-opx6}px, #{-opy6}px)"
    filters.css 'transform', "translate(#{-opx8}px, #{-opy8}px)"
    bg.css 'background-position', "#{opx4+50}% #{opy4+50}%"
    ###

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
