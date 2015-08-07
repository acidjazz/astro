
Project =
  hash: false

  i: ->
    NProgress.configure
      showSpinner: false

    project = 'versus'

    if Object.keys(projects).indexOf(location.hash.replace('#','')) isnt -1
      project = location.hash.replace '#', ''

    Project.load project

  load: (project) ->
    _.off '.project'
    _.on '.preloader'

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
    cover = $(".project_#{project} > .cover").attr 'style'
    url = cover.match(/url\("(.*)"\)/)
    srcs = [url[1]]
    $(".project_#{project} img").each (i, v) ->
      srcs.push $(v).attr 'src'

    return srcs

