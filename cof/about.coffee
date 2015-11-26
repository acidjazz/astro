About =
  jobs: false
  hsbpdInterval: false
  hsbpdSection: 'holistic'
  cache: {}

  i: ->

    _.off '.orbit'

    About.cache.hsbpd = $('.hsbpd')
    About.cache.blocks = $('.blocks')
    About.cache.blocksp = $('.blocksp')

    About.handlers()

    if location.hash isnt ""
      About.menu location.hash.replace('#','')

  handlers: ->

    if $(window).width() > 1000
      $('.hsbpd > .dots > .dot').on 'click', About.hsbpdHandler

    $('.capcenter > .capmenu > .cap').on 'click', About.capcenter
    $('.fived > .fivedmenu > .item').on 'click', About.fived

    $('.about > .fcontainer > .filters > .inner > .filtermenu > .filter').on 'click', About.menuHandler
    $('.about > .sections > .section_careers').on 'click', '.jobs > .job', About.jobHandler

    if $(window).width() > 1000
      About.hsbpdInterval = setInterval ->
        About.hsbpdCheck()
      , 10

    $('.profiles > .profile').on 'click', About.profile
    $('.bios > .bio > .close, .bios > .bio').on 'click', About.profileClose

  profile: ->

    t = $ this
    profile = t.data 'profile'
    rect = t[0].getBoundingClientRect()
    pos = t.position()
    width = $(window).innerWidth()

    About.profileClose()
    _.on $('.bios')
    _.on t
    bio = $(".bios > .bio.bio_#{profile}")

    bio.css('height', "#{rect.height}px")
    bio.css('top', "#{pos.top + rect.height}px")

    bio.css('left', 0)
    bio.css('right', 0)
    bio.css('width', '100%')

    if width > (rect.width*2)

      if width is Math.round(rect.right)
        bio.css('width', "#{rect.width*2}px")
        bio.css('right', "0px")
        bio.css('left', "auto")
      else if rect.left is 0
        bio.css('width', "#{rect.width*2}px")
        bio.css('left', "0px")
        bio.css('right', "auto")
      else
        bio.css('width', "#{rect.width*2}px")
        bio.css('left', "#{pos.left}px")
        bio.css('right', "auto")

    if $(window).width() < 1000
      bio.css('height', "auto")

    _.on bio

    $('html, body').animate(
      scrollTop: t.offset().top - 64
    , 200)

  profileClose: ->

    _.off $('.bios')
    _.off $('.bios > .bio')
    _.off $('.profiles > .profile')

  menuHandler: ->
    section = $(this).html().trim()
    About.menu section

  menu: (section) ->

    location.hash = section

    if section is 'careers' and About.jobs is false
      Loader.load 'https://api.greenhouse.io/v1/boards/astrostudios/embed/jobs?callback=About.joblist'
    _.off '.about > .fcontainer > .filters > .inner > .filtermenu > .filter', '.sections > .section'
    _.on ".fcontainer > .filters > .inner > .filtermenu > .filter.filter_#{section}", ".sections > .section.section_#{section}"

    if $(window).width() > 1000
      $('html, body').animate(
        scrollTop: $(".sections").offset().top - 60
      , 1000)
    else
      $('html, body').animate(
        scrollTop: $(".sections").offset().top - 322
      , 300)

  hsbpdCheck: ->

    st = $(window).scrollTop()

    top = 1386
    threshold = 631

    if st >= top and !About.cache.hsbpd.hasClass 'fixed'
      About.cache.hsbpd.addClass('fixed').removeClass 'bottom'
      About.cache.blocks.addClass('fixed')
      About.cache.blocksp.removeClass('off').addClass('on')
    if st < top and About.cache.hsbpd.hasClass 'fixed'
      About.cache.hsbpd.removeClass('fixed').removeClass 'bottom'
      About.cache.blocks.removeClass('fixed')
      About.cache.blocksp.removeClass('on').addClass('off')
    if st >= (top + (threshold*5))
      About.cache.hsbpd.removeClass('fixed').addClass 'bottom'

    if st < top
      return true

    sections = ['holistic','strategy','brand','product','digital']
    for section, i in sections
      t = top + ( (i+0) * threshold )
      b = top + ( (i+1) * threshold )

      if st > t and st < b and About.hsbpdSection isnt section
        About.hsbpd section

  hsbpdHandler: ->
    section = $(this).data 'section'
    About.hsbpd section

  hsbpd: (section) ->

    About.hsbpdSection = section

    $('.hsbpd > .slide.on').addClass('offing').removeClass('on')

    _.on ".hsbpd > .slide.slide_#{section[0]}"

    setTimeout ->
      _.off '.hsbpd > .slide.offing'
      $('.hsbpd > .slide.offing').removeClass('offing')
    , 3000

    _.off '.hsbpd > .dots > .dot'
    _.on ".hsbpd > .dots > .dot_#{section}"

  capcenter: ->

    cap = $(this).html().trim()
    _.off '.capcenter > .capmenu > .cap', '.capcenter > .descs > .desc'
    _.on this, ".capcenter > .descs > .desc_#{cap}"

  fived: ->

    item = $(this).find('.copy > .name').html().trim()
    _.off '.fived > .fivedmenu > .item', '.fived > .bodys > .body'
    _.on this, ".fived > .bodys > .body_#{item}"


  jobHandler: ->

    t = $ this

    if t.hasClass 'on'
      return _.off t

    _.off '.about > .sections > .section_careers > .jobs > .job'
    _.on this

  joblist: (data) ->

    About.jobs = {}

    total = Object.keys(data.jobs).length
    count = 0

    for job in data.jobs
      $.ajax
        url: "https://api.greenhouse.io/v1/boards/astrostudios/embed/job?id=#{job.id}?callback=About.job"
        type: 'GET'
        dataType: 'jsonp'
        crossDomain: true
        jsonpCallback: 'About.job'
        complete: (response) ->
          count++
          About.jobulate() if count is total

  job: (job) ->
    About.jobs[job.id] = job

  jobulate: ->
    jobsEl = $ '.jobs'

    for id, job of About.jobs
      el = $("<div class='job off'><div class='title'>#{job.title}</div><div class='content'></div></div>")
      content = el.find '.content'
      content.html $('<div/>').html(job.content).text()
      apply = $("<a href='#{job.absolute_url}' target='_new' class='apply'>Apply Now</a>")
      content.append apply
      jobsEl.append el



