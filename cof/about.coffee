About =
  jobs: false

  i: ->

    _.off '.orbit'

    About.handlers()

    if location.hash isnt ""
      About.menu location.hash.replace('#','')

  handlers: ->

    $('.hsbpd > .dots > .dot').on 'click', About.hsbpd

    $('.capcenter > .capmenu > .cap').on 'click', About.capcenter
    $('.fived > .fivedmenu > .item').on 'click', About.fived

    $('.about > .fcontainer > .filters > .inner > .filtermenu > .filter').on 'click', About.menuHandler
    $('.about > .sections > .section_careers').on 'click', '.jobs > .job', About.jobHandler

  menuHandler: ->
    section = $(this).html().trim()
    About.menu section

  menu: (section) ->

    location.hash = section

    if section is 'careers' and About.jobs is false
      Loader.load 'https://api.greenhouse.io/v1/boards/astrostudios/embed/jobs?callback=About.joblist'
    _.off '.about > .fcontainer > .filters > .inner > .filtermenu > .filter', '.sections > .section'
    _.on ".fcontainer > .filters > .inner > .filtermenu > .filter.filter_#{section}", ".sections > .section.section_#{section}"

    $('html, body').animate(
      scrollTop: $(".sections").offset().top - 64
    , 1000)


  hsbpd: ->
    section = $(this).data 'section'

    $('.hsbpd > .slide.on').addClass('offing').removeClass('on')

    _.on ".hsbpd > .slide.slide_#{section[0]}"

    setTimeout ->
      _.off '.hsbpd > .slide.offing'
      $('.hsbpd > .slide.offing').removeClass('offing')
    , 3000

    _.off '.hsbpd > .dots > .dot'
    _.on $(this)

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



