Blog =
  hash: false
  centry: false
  title: false

  i: ->

    $('.thumbs > .thumb').sort (a, b) ->
      return +b.dataset.cdate - +a.dataset.cdate
    .appendTo $('.thumbs')

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

    $('.entry > .details > .shares > .share').on 'click', Blog.share

    $('.blog > .summary > .crumb > .close').on 'click', Blog.filterReset

    $(window).on 'popstate', Blog.pop

  pop: (e) ->

    document.body.scrollTop = document.documentElement.scrollTop = 0

    if Object.keys(entries).indexOf(location.hash.replace('#','')) isnt -1
      entry = location.hash.replace '#', ''
      Blog.centry = entry
      Blog.load entry
    else
      Blog.summary()

  share: ->

    t = $ this
    type = t.data 'type'

    if type == 'link'
      _.swap '.share_url'
      _.swap t
      i = t.parent().find('.share_url input').first()
      i.val(location.href)
      i[0].setSelectionRange(0, i[0].value.length)
      #Item.addShare()
      return true

    if type == 'facebook'
      window.open 'https://www.facebook.com/sharer/sharer.php?u=' + location.href, 'Share on Facebook', 'width=626,height=438'
      #Item.addShare()
      return true
    if type == 'twitter'
      window.open 'https://twitter.com/intent/tweet?url='+encodeURIComponent(location.href)+'&text='+encodeURIComponent(Blog.title), 'Share on Twitter', 'width=626,height=438'
      #Item.addShare()
      return true

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
    #history.pushState null, null, "/blog/##{entry}"
    location.hash = entry
    document.body.scrollTop = document.documentElement.scrollTop = 0
    Blog.load entry

  summary: () ->



    location.hash = ''

    setTimeout ->
      $('.orbit').removeClass (index, css) ->
        (css.match(/\borbit_\S+/g) or []).join ' '
      $('.dbar').removeClass (index, css) ->
        (css.match(/\bbar_\S+/g) or []).join ' '
    , 1000

    _.off '.entry'
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
  load: (entry) ->
    _.off '.entry, .summary'

    $('.orbit').addClass "orbit_#{entry}"
    $('.dbar').addClass "bar_#{entry}"

    _.on '.orbit'

    dbar.i()
    $('.dbar').addClass "bar_#{entry}"
    srcs = Blog.srcs entry
    Global.preload srcs,
      (progress) ->
        dbar.perc progress
      , (complete) ->
        dbar.d()
        _.off '.orbit'
        _.on ".entry_#{entry}"

        Blog.title = $(".entry_#{entry} > .details > .copy > .name").text()

        setTimeout ->
          $('.orbit').removeClass (index, css) ->
            (css.match(/\borbit_\S+/g) or []).join ' '
          $('.dbar').removeClass (index, css) ->
            (css.match(/\bbar_\S+/g) or []).join ' '
        , 1000

  srcs: (entry) ->
    srcs = [Global.srcFromStyle($(".entry_#{entry} > .cover"))]
    $(".entry_#{entry} .img").each (i, v) ->
      srcs.push Global.srcFromStyle($(v))

    return srcs


