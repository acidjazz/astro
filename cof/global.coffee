Global =

  astroInterval: false
  fbarInterval: false
  phraseTimeout: false
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
