
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

    $('.projects > .summary > .thumbs > .thumb').on 'click', Work.projectHandler
    $('.projects > .summary > .thumbs > .thumb, .related > .relateds > .thumb').on 'click', Work.projectHandler
    $('.project > .filters > .inner > .filtermenu > .filter').on 'click', Work.filterHandler

  filterHandler: ->
    t = $ this
    $('html, body').animate(
      scrollTop: $(".filter_mark.filter_#{t.html()}").offset().top
    , 500)

  projectHandler: ->

    project = $(this).data 'project'
    location.hash = project
    document.body.scrollTop = document.documentElement.scrollTop = 0
    Work.load project

  summary: () ->
    location.hash = ''
    for oproject, key of projects
      $('.preloader').removeClass "preloader_#{key}"
      $('#nprogress .bar').removeClass "bar_#{key}"
    _.off '.project'
    _.on '.preloader'
    NProgress.start()

    srcs = []

    $('.summary > .thumbs > .thumb').each (i, el) ->
      srcs.push(Global.srcFromStyle($(el)))

    Global.preload srcs,
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
      $('#nprogress .bar').removeClass "bar_#{key}"
    $('.preloader').addClass "preloader_#{project}"
    $('#nprogress .bar').addClass "bar_#{project}"
    _.on '.preloader'

    console.log "loading project #{project}"

    NProgress.start()
    $('#nprogress .bar').addClass "bar_#{project}"
    srcs = Work.srcs project
    Global.preload srcs,
      (progress) ->
        NProgress.set progress
      , (complete) ->
        NProgress.done()
        _.off '.preloader'
        _.on ".project_#{project}"

  srcs: (project) ->
    srcs = [Global.srcFromStyle($(".project_#{project} > .cover"))]
    $(".project_#{project} .img").each (i, v) ->
      srcs.push Global.srcFromStyle($(v))

    return srcs


