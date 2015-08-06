
Project =

  i: ->

    

    srcs = Project.srcs 'versus'
    console.log srcs
    Project.preload srcs,
      (progress) ->
        console.log 'progress', progress
      , (complete) ->
        console.log 'complete', complete
        _.on '.project_versus'

  preload: (srces, progress, complete) ->

    images = []
    loaded = 0
    total = srces.length

    for src, i in srces
      images[i] = new Image()
      images[i].src = src
      images[i].onload = ->
        loaded++
        perc = Math.round(loaded/total*10)/10
        if loaded is total then complete(true) else progress(perc)

    

  srcs: (project) ->
    cover = $(".project_#{project} > .cover").attr 'style'
    url = cover.match(/url\("(.*)"\)/)
    srcs = [url[1]]
    $(".project_#{project} img").each (i, v) ->
      console.log $(v).attr 'src'
      srcs.push $(v).attr 'src'

    return srcs

