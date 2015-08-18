Global =

  i: ->

    NProgress.configure
      showSpinner: false

    Global.handlers()

  handlers: ->

    $('.top > .inner > .burger').on 'click', Global.burger
    $('.menu > .inner > .options > .option').on 'click', Global.option

  burger: ->

    if $(this).hasClass 'on'
      Global.menu.on()
    else
      Global.menu.off()

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
        console.log 'summary'
      else
        location.href = '/work/'
        console.log 'location.href'

    if option is 'about'
        location.href = '/about/'

    setTimeout ->
      Global.menu.off()
      $('.menu > .inner > .options > .option').removeClass 'active'
    , 200

  preload: (srces, progress, complete) ->

    images = []
    loaded = 0
    total = srces.length

    for src, i in srces
      console.log 'Global.preload()', src
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
