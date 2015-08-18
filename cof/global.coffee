Global =

  interval: false
  cache: {}

  i: ->

    NProgress.configure
      showSpinner: false

    Global.cache.astro = $('.astro')
    Global.cache.red1 = $('.red1')
    Global.cache.burger = $('.top > .inner > .burger > .inner')

    Global.interval = setInterval ->
      Global.astro()
    , 500


    Global.handlers()

  handlers: ->

    $('.top > .inner > .burger').on 'click', Global.burger
    $('.menu > .inner > .options > .option').on 'click', Global.option

  burger: ->

    if $(this).hasClass 'on'
      Global.menu.on()
    else
      Global.menu.off()

  astro: ->

    if document.body.scrollTop isnt 0 or document.documentElement.scrollTop isnt 0
      _.on Global.cache.astro, Global.cache.red1, Global.cache.burger
    else
      _.off Global.cache.astro, Global.cache.red1, Global.cache.burger
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

    if option is 'work'
      if location.href.match('work') isnt null
        Work.summary()
      else
        location.href = '/work/'

    if option is 'contact'
        location.href = '/contact/'
    setTimeout ->
      Global.menu.off()
      $('.menu > .inner > .options > .option').removeClass 'active'
    , 200

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
