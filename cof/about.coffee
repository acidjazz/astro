About =

  i: ->

    _.off '.orbit'

    About.handlers()


  handlers: ->

    $('.hsbpd > .dots > .dot').on 'click', About.hsbpd

    $('.capcenter > .capmenu > .cap').on 'click', About.capcenter
    $('.fived > .fivedmenu > .item').on 'click', About.fived

    $('.about > .fcontainer > .filters > .inner > .filtermenu > .filter').on 'click', About.menu

  menu: ->
    section = $(this).html().trim()

    _.off '.about > .fcontainer > .filters > .inner > .filtermenu > .filter', '.sections > .section'
    _.on this, ".sections > .section.section_#{section}"

    $('html, body').animate(
      scrollTop: $(".sections").offset().top - 64
    , 200)

  hsbpd: ->
    section = $(this).data 'section'
    _.off '.hsbpd > .slide'
    _.on ".hsbpd > .slide.slide_#{section[0]}"
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

