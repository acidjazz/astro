_ =

  off: (el) ->
    i = 0
    len = arguments.length

    while i isnt len
      if arguments[i] instanceof jQuery
        arguments[i].removeClass("on").addClass "off"
      else
        $(arguments[i]).removeClass("on").addClass "off"
      i++
    return

  on: (el) ->
    i = 0
    len = arguments.length

    while i isnt len
      if arguments[i] instanceof jQuery
        arguments[i].removeClass("off").addClass "on"
      else
        $(arguments[i]).removeClass("off").addClass "on"
      i++
    return

  swap: (el) ->
    i = 0
    len = arguments.length

    while i isnt len
      if arguments[i] instanceof jQuery
        if arguments[i].hasClass 'off'
          _.on arguments[i]
        else
          _.off arguments[i]
      else
        if $(arguments[i]).hasClass 'off'
          _.on $(arguments[i])
        else
          _.off $(arguments[i])
      i++
    return

  encode: (str) ->
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+')

  t: (category, action, label, value) ->
    _gaq.push ['_trackEvent', category, action, label, value]
  rand: (min, max) ->
    return Math.floor(Math.random() * max) + min

  llc: ->
    ascii = """
      
      %cmmm/............................................................./mmm
      mmo................-:://::-.......-:::::::::::::-........-::///:-.omm
      md-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm
      mo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom
      m-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m
      d.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d
      h.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h
      h.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh
      d..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm
      m-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm
      mo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm
      md-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm
      mmo.............:::::::::::::::.......-:///::-...........-:///:-..omm
      mmm/............................................................./mmm

      :: syntactic sugar by 256
      :: http://256.io/
      :: https://github.com/acidjazz/astro
    """

    console.log ascii, "color: grey; font-family: Menlo, monospace;"

  detect: ->
    if ((window.outerHeight - window.innerHeight) > 100)
      _.llc()
      clearInterval _.console

_.console = setInterval _.detect, 200

