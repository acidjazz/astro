Global =

  i: ->

    console.log 'GLobal.i()'

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

    $('.menu > .inner > .options > .option').removeClass 'active'
    $(this).addClass 'active'
    Project.summary()

    setTimeout ->
      Global.menu.off()
    , 200
