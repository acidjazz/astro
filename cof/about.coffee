About =

  i: ->

    _.off '.preloader'

    About.handlers()


  handlers: ->

    $('.capcenter > .capmenu > .cap').on 'click', About.capcenter
    $('.fived > .fivedmenu > .item').on 'click', About.fived

    $('.about > .filters > .inner > .filtermenu > .filter').on 'click', About.menu

  menu: ->
    section = $(this).html().trim()

    _.off '.about > .filters > .inner > .filtermenu > .filter', '.sections > .section'
    _.on this, ".sections > .section.section_#{section}"

  capcenter: ->

    cap = $(this).html().trim()
    _.off '.capcenter > .capmenu > .cap', '.capcenter > .descs > .desc'
    _.on this, ".capcenter > .descs > .desc_#{cap}"

  fived: ->

    item = $(this).find('.copy > .name').html().trim()
    _.off '.fived > .fivedmenu > .item', '.fived > .bodys > .body'
    _.on this, ".fived > .bodys > .body_#{item}"

