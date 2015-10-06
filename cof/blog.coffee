Blog =
  hash: false
  centry: false

  i: ->

    if Object.keys(entries).indexOf(location.hash.replace('#','')) isnt -1
      entry = location.hash.replace '#', ''
      Blog.centry = entry
      Blog.load entry
    else
      Blog.summary()

    document.body.scrollTop = document.documentElement.scrollTop = 0

    Blog.handlers()

  handlers: ->
    $('.blog > .summary > .thumbs > .thumb').on 'click', Blog.entryHandler
    $('.blog > .summary > .thumbs > .thumb, .related > .relateds > .thumb').on 'click', Blog.entryHandler

    $('.entry > .details > .tags a').on 'click', Blog.tagHandler
    $('.entry > .details > .author a').on 'click', Blog.authorHandler

    $('.blog > .summary > .crumb > .close').on 'click', Blog.filterReset


  filterReset: ->
    _.off '.crumb'
    _.on '.thumb'
    entry = location.hash = ''
    Blog.summary()

  tagHandler: ->
    tag = $(this).text()
    Blog.tagFilter tag

  authorHandler: ->
    tag = $(this).text()
    Blog.authorFilter tag

  authorFilter: (author) ->

    Blog.summary()

    _.on '.crumb'
    $('.crumb > .copy > span.desc').text 'Posts by '
    $('.crumb > .copy > span.value').text author

    $('.summary > .thumbs > .thumb').each (i, el) ->
      if author is $(el).data 'author'
        _.on $(el)
      else
        _.off $(el)

  tagFilter: (tag) ->

    Blog.summary()

    _.on '.crumb'
    $('.crumb > .copy > span.desc').text 'Filtering by '
    $('.crumb > .copy > span.value').text tag

    $('.summary > .thumbs > .thumb').each (i, el) ->
      tags = $(el).data 'tags'
      console.log tags
      if tags.indexOf(tag) isnt -1
        _.on $(el)
      else
        _.off $(el)

  entryHandler: ->

    entry = $(this).data 'entry'
    location.hash = entry
    document.body.scrollTop = document.documentElement.scrollTop = 0
    Blog.load entry

  summary: () ->
    location.hash = ''

    $('.orbit').removeClass (index, css) ->
      (css.match(/\borbit_\S+/g) or []).join ' '
    $('#nprogress .bar').removeClass (index, css) ->
      (css.match(/\bbar__\S+/g) or []).join ' '

    _.off '.entry'
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

  load: (entry) ->
    _.off '.entry, .summary'

    $('.orbit').addClass "orbit_#{entry}"
    $('#nprogress .bar').addClass "bar_#{entry}"

    _.on '.orbit'

    NProgress.start()
    $('#nprogress .bar').addClass "bar_#{entry}"
    srcs = Blog.srcs entry
    Global.preload srcs,
      (progress) ->
        NProgress.set progress
      , (complete) ->
        NProgress.done()
        _.off '.orbit'
        _.on ".entry_#{entry}"

        $('.orbit').removeClass (index, css) ->
          (css.match(/\borbit_\S+/g) or []).join ' '
        $('#nprogress .bar').removeClass (index, css) ->
          (css.match(/\bbar__\S+/g) or []).join ' '

  srcs: (entry) ->
    srcs = [Global.srcFromStyle($(".entry_#{entry} > .cover"))]
    $(".entry_#{entry} .img").each (i, v) ->
      srcs.push Global.srcFromStyle($(v))

    return srcs


