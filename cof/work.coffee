
Work =
  hash: false
  cproject: false

  i: ->

    if Object.keys(projects).indexOf(location.hash.replace('#','')) isnt -1
      project = location.hash.replace '#', ''
      Work.cproject = project
      Work.load project
    else
      Work.summary()

    document.body.scrollTop = document.documentElement.scrollTop = 0

    Work.handlers()

  handlers: ->

    $('.projects > .summary > .thumbs > .thumb, .related > .inner > .relateds > .thumb').on 'click', Work.projectHandler
    $('.project .filters > .inner > .filtermenu > .filter').on 'click', Work.filterHandler
    $('.summary .filters > .inner > .filtermenu > .filter').on 'click', Work.summaryFilterHandler
    $('.project > .description > .filters > .filter').on 'click', Work.projectFilterHandler
    $(window).on 'popstate', Work.pop

  pop: (e) ->

    document.body.scrollTop = document.documentElement.scrollTop = 0

    if Object.keys(projects).indexOf(location.hash.replace('#','')) isnt -1
      project = location.hash.replace '#', ''
      Work.cproject = project
      Work.load project
    else
      Work.summary()
      _.on '.summary > .thumbs > .thumb'
      _.off '.summary > .filters > .inner > .filtermenu > .filter'
      _.on '.summary > .filters > .inner > .filtermenu > .filter_all'

  projectFilterHandler: ->

    filter = $(this).text()
    Work.summary(filter)

  summaryFilterHandler: ->
    filter = $(this).text().trim()
    copy = $(this).data 'copy'
    Work.summaryFilter filter, copy

  summaryFilter: (filter, copy) ->

    #document.body.scrollTop = document.documentElement.scrollTop = 0

    _.off '.summary .filters > .inner > .filtermenu > .filter'
    _.on ".summary .filters > .inner > .filtermenu > .filter.filter_#{filter}"

    $('.summary > .hero > .copy2').text copy if copy

    if filter is 'all'
      _.on '.summary > .thumbs > .thumb'
      return true

    _.off '.summary > .thumbs > .thumb'
    setTimeout ->
      $('.summary > .thumbs > .thumb').each (i, el) ->
        filters = $(el).data 'filters'
        if filters.indexOf(filter) isnt -1
          _.on $(el)
        else
          _.off $(el)
    , 200

  filterHandler: ->
    t = $ this
    $('html, body').animate(
      scrollTop: $(".filter_mark.filter_#{t.html()}").offset().top
    , 500)

  projectHandler: ->

    project = $(this).data 'project'
    history.pushState null, null, "/work/##{project}"

    document.body.scrollTop = document.documentElement.scrollTop = 0
    Work.load project

  summary: (filter) ->
    location.hash = ''

    setTimeout ->
      $('.orbit').removeClass (index, css) ->
        (css.match(/\borbit_\S+/g) or []).join ' '
      $('.dbar').removeClass (index, css) ->
        (css.match(/\bbar_\S+/g) or []).join ' '
    , 500

    _.off '.project'
    _.on '.orbit'
    dbar.i()

    srcs = []

    $('.summary > .thumbs > .thumb > .inner').each (i, el) ->
      srcs.push(Global.srcFromStyle($(el)))

    Global.preload srcs,
      (progress) ->
        dbar.perc progress
      , (complete) ->
        dbar.d()
        _.off '.orbit'
        _.on '.summary'
        Work.summaryFilter(filter) if filter

  load: (project) ->
    _.off '.project, .summary'

    $('.orbit').addClass "orbit_#{project}"
    $('.dbar').addClass "bar_#{project}"

    _.on '.orbit'

    dbar.i()
    $('.dbar').addClass "bar_#{project}"
    srcs = Work.srcs project

    document.body.scrollTop = document.documentElement.scrollTop = 0

    Global.preload srcs,
      (progress) ->
        dbar.perc progress
      , (complete) ->
        dbar.d()
        _.off '.orbit'
        $(".project img").attr 'src', ''

        $(".project_#{project} img").each (i, v) ->
          $(v).attr 'src', "/img/work/#{project}/1440/#{$(v).data('src')}"

        _.on ".project_#{project}"
        
        setTimeout ->
          $('.orbit').removeClass (index, css) ->
            (css.match(/\borbit_\S+/g) or []).join ' '
          $('.dbar').removeClass (index, css) ->
            (css.match(/\bbar_\S+/g) or []).join ' '
        , 500

  srcs: (project) ->

    srcs = [Global.srcFromStyle($(".project_#{project} > .cover"))]

    $(".project_#{project} img").each (i, v) ->
      srcs.push "/img/work/#{project}/1440/#{$(v).data('src')}"

    return srcs


