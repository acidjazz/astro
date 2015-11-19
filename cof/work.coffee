
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
    $(window).on 'popstate', Work.pop


  pop: (e) ->

    Work.summary()
    _.on '.summary > .thumbs > .thumb'
    _.off '.summary > .filters > .inner > .filtermenu > .filter'
    _.on '.summary > .filters > .inner > .filtermenu > .filter_all'

  summaryFilterHandler: ->

    #document.body.scrollTop = document.documentElement.scrollTop = 0

    _.off '.summary .filters > .inner > .filtermenu > .filter'
    _.on this

    filter = $(this).text().trim()
    copy = $(this).data 'copy'

    $('.summary > .hero > .copy2').text copy
    #$('.summary > .hero > .copy1').text filter

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

  summary: () ->
    location.hash = ''

    $('.orbit').removeClass (index, css) ->
      (css.match(/\borbit_\S+/g) or []).join ' '
    $('#nprogress .bar').removeClass (index, css) ->
      (css.match(/\bbar__\S+/g) or []).join ' '

    _.off '.project'
    _.on '.orbit'
    NProgress.start()

    srcs = []

    $('.summary > .thumbs > .thumb > .inner').each (i, el) ->
      srcs.push(Global.srcFromStyle($(el)))

    Global.preload srcs,
      (progress) ->
        NProgress.set progress
      , (complete) ->
        NProgress.done()
        _.off '.orbit'
        _.on '.summary'

  load: (project) ->
    _.off '.project, .summary'

    $('.orbit').addClass "orbit_#{project}"
    $('#nprogress .bar').addClass "bar_#{project}"

    _.on '.orbit'

    NProgress.start()
    $('#nprogress .bar').addClass "bar_#{project}"
    srcs = Work.srcs project

    document.body.scrollTop = document.documentElement.scrollTop = 0

    Global.preload srcs,
      (progress) ->
        NProgress.set progress
      , (complete) ->
        NProgress.done()
        _.off '.orbit'
        $(".project img").attr 'src', ''

        $(".project_#{project} img").each (i, v) ->
          $(v).attr 'src', "/img/work/#{project}/1440/#{$(v).data('src')}"

        _.on ".project_#{project}"

        $('.orbit').removeClass (index, css) ->
          (css.match(/\borbit_\S+/g) or []).join ' '
        $('#nprogress .bar').removeClass (index, css) ->
          (css.match(/\bbar__\S+/g) or []).join ' '

  srcs: (project) ->

    srcs = [Global.srcFromStyle($(".project_#{project} > .cover"))]

    $(".project_#{project} img").each (i, v) ->
      srcs.push "/img/work/#{project}/1440/#{$(v).data('src')}"

    console.log srcs
    return srcs


