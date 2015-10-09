About =

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

  menuHandler: ->
    section = $(this).html().trim()
    About.menu section

  menu: (section) ->

    _.off '.about > .fcontainer > .filters > .inner > .filtermenu > .filter', '.sections > .section'
    _.on ".fcontainer > .filters > .inner > .filtermenu > .filter.filter_#{section}", ".sections > .section.section_#{section}"

    $('html, body').animate(
      scrollTop: $(".sections").offset().top - 64
    , 1000)

    location.hash = section

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

