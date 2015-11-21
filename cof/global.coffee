Global =

  astroInterval: false
  fbarInterval: false
  phraseTimeout: false
  phraseInterval: false
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

    if $(window).width() > 1000
      Global.fbarInterval = setInterval ->
        Global.fbar()
      , 20

    #Global.phrase()

    Global.handlers()

    if $(window).width() > 1000
      Global.fbar()

  fbar: ->

    if $('.fcontainer:visible').length is 0
      return true

    if $(window).scrollTop() > ($('.fcontainer:visible').offset().top)
      $('.filters').addClass 'float'
    else
      $('.filters').removeClass 'float'

    
  handlers: ->

    $('.top > .inner > .burger').on 'click', Global.burger
    $('.menu > .inner > .options > .option').on 'click', Global.option

    $('.thumbs > .thumb, .projects > .thumb, .related > .inner > .relateds > .thumb').on 'mousemove', Global.thumb

    $('.footer > .inner > .gravity, .footer > .inner > .manifesto > .inner > .close').on 'click', Global.manifesto


  manifesto: ->

    mf = $('.manifesto')

    if mf.hasClass 'on'
      _.off mf
      $('body').removeClass 'fixed'
    else
      $('body').addClass 'fixed'
      _.on mf

  thumb: (event) ->

    t = $ this
    bg = t.find '.inner'
    name = t.find '.inner > .bg > .copy > .name'
    filters = t.find '.inner > .bg > .copy > .filters'
    rect = t[0].getBoundingClientRect()
    nameRect = name[0].getBoundingClientRect()
    filtersRect = filters[0].getBoundingClientRect()

    distortBg = new Distort
      width: rect.width
      height: rect.height
      $el: bg

    distortName = new Distort
      width: rect.width
      height: rect.height
      $el: nameRect

    distortFilters = new Distort
      width: rect.width
      height: rect.height
      $el: filtersRect

    offset = t.offset()
    x = Math.floor(event.pageX - offset.left)
    y = Math.floor(event.pageY - offset.top)
    px = Math.floor(x * 100 / t.width())
    py = Math.floor(y * 100 / t.height())

    opx8 = (px-50)/8
    opy8 = (py-50)/8

    opx6 = (px-50)/4
    opy6 = (py-50)/4

    opx4 = (px-50)/4
    opy4 = (py-50)/4

    distortBg.topRight.x -= opy8
    distortBg.topRight.y -= opx8

    distortBg.topLeft.x -= -opy8
    distortBg.topLeft.y -= -opx8

    distortBg.bottomRight.x -= -opy8
    distortBg.bottomRight.y -= -opx8

    distortBg.bottomLeft.x -= opy8
    distortBg.bottomLeft.y -= opx8

    bg.css 'transform', distortBg.toString()

    distortName.topRight.x -= opy4
    distortName.topRight.y -= opx4

    distortName.topLeft.x -= -opy4
    distortName.topLeft.y -= -opx4

    distortName.bottomRight.x -= -opy4
    distortName.bottomRight.y -= -opx4

    distortName.bottomLeft.x -= opy4
    distortName.bottomLeft.y -= opx4

    name.css 'transform', distortName.toString()


    distortFilters.topRight.x -= opy6
    distortFilters.topRight.y -= opx6

    distortFilters.topLeft.x -= -opy6
    distortFilters.topLeft.y -= -opx6

    distortFilters.bottomRight.x -= -opy6
    distortFilters.bottomRight.y -= -opx6

    distortFilters.bottomLeft.x -= opy6
    distortFilters.bottomLeft.y -= opx6


    filters.css 'transform', distortFilters.toString()

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
  ###
  
  phrase: ->

    phrase = phrases[Math.floor(Math.random()*phrases.length)]

    duration = 2000
    chars = phrase.length
    charDuration = Math.round duration / chars
    char = 0

    counter = 0
    nums = ['!','@','_','#','%','^','&','*','_','(',')','[',']','_']
    numsMax = nums.length-1

    Global.cache.phrase.text ''
    text = ''
    Global.phraseInterval = setInterval ->

      counter++
      if counter is 10
        Global.cache.phrase.text "#{text}#{phrase[char++]}"
        text = Global.cache.phrase.text()
        counter = 0
      else
        Global.cache.phrase.text "#{text}#{nums[_.rand(0,numsMax)]}"


      if char is chars
        clearInterval Global.phraseInterval

    , charDuration/10

    console.log duration, phrase.length, charDuration, phrase

    Global.phraseTimeout = setTimeout ->
      _.on Global.cache.phrase
    , 10000

  burger: ->

    if $(this).hasClass 'on'
      Global.menu.on()
    else
      Global.menu.off()

  astro: (clean) ->

    if document.body.scrollTop > 50 or document.documentElement.scrollTop > 50 and (Global.cache.astro.hasClass('off') or clean)
      _.on Global.cache.astro, Global.cache.red1, Global.cache.burger, Global.cache.phrase
      return true

    if (document.body.scrollTop < 50 or document.documentElement.scrollTop < 50) and (Global.cache.astro.hasClass('on') or clean)
      _.off Global.cache.astro, Global.cache.red1, Global.cache.burger, Global.cache.phrase
      clearTimeout Global.phraseTimeout
      clearInterval Global.phraseInterval
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

      if option is 'blog'
        if location.href.match('blog') isnt null
          Blog.summary()
          _.on '.summary > .thumbs > .thumb'
          _.off '.summary > .filters > .inner > .filtermenu > .filter'
          _.on '.summary > .filters > .inner > .filtermenu > .filter_all'
        else
          location.href = '/blog/'

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
    url = style.match(/url\((.*)\)/)
    if url isnt null and url[1] isnt undefined
      return url[1]
    else
      console.log 'ERROR cannot find style for element', style
      console.log url
