
Project =
  hash: false
  cproject: false

  i: ->
    NProgress.configure
      showSpinner: false

    if Object.keys(projects).indexOf(location.hash.replace('#','')) isnt -1
      project = location.hash.replace '#', ''
      Project.cproject = project
      Project.load project
    else
      Project.summary()

    document.body.scrollTop = document.documentElement.scrollTop = 0

    Project.handlers()

  handlers: ->

    $('.projects > .summary > .thumbs > .thumb').on 'click', Project.projectHandler
    $('.projects > .summary > .thumbs > .thumb, .related > .relateds > .thumb').on 'click', Project.projectHandler
    $('.top > .inner > .astro').on 'click', Project.summaryHandler
    $('.project > .filters > .inner > .filtermenu > .filter').on 'click', Project.filterHandler

  filterHandler: ->
    t = $ this
    console.log t.html()
    $('html, body').animate(
      scrollTop: $(".filter_mark.filter_#{t.html()}").offset().top
    , 500)

  summaryHandler: ->
    location.hash = ''
    Project.summary()

  projectHandler: ->

    project = $(this).data 'project'
    location.hash = project
    document.body.scrollTop = document.documentElement.scrollTop = 0
    Project.load project

  summary: () ->
    for oproject, key of projects
      $('.preloader').removeClass "preloader_#{key}"
    _.off '.project'
    _.on '.preloader'
    NProgress.start()

    srcs = []

    $('.summary > .thumbs > .thumb').each (i, el) ->
      srcs.push(Project.srcFromStyle($(el)))

    console.log srcs
    Project.preload srcs,
      (progress) ->
        NProgress.set progress
      , (complete) ->
        NProgress.done()
        _.off '.preloader'
        _.on '.summary'

  load: (project) ->
    _.off '.project, .summary'

    for oproject, key of projects
      $('.preloader').removeClass "preloader_#{key}"
    $('.preloader').addClass "preloader_#{project}"
    _.on '.preloader'

    console.log "loading project #{project}"

    NProgress.start()
    srcs = Project.srcs project
    Project.preload srcs,
      (progress) ->
        NProgress.set progress
      , (complete) ->
        NProgress.done()
        _.off '.preloader'
        _.on ".project_#{project}"

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

  srcs: (project) ->
    srcs = [Project.srcFromStyle($(".project_#{project} > .cover"))]
    $(".project_#{project} .img").each (i, v) ->
      srcs.push Project.srcFromStyle($(v))

    return srcs

  srcFromStyle: (el) ->
    style = el.attr 'style'
    url = style.match(/url\("(.*)"\)/)
    return url[1]
