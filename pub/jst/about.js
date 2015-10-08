var About;

About = {
  i: function() {
    _.off('.orbit');
    return About.handlers();
  },
  handlers: function() {
    $('.hsbpd > .dots > .dot').on('click', About.hsbpd);
    $('.capcenter > .capmenu > .cap').on('click', About.capcenter);
    $('.fived > .fivedmenu > .item').on('click', About.fived);
    return $('.about > .fcontainer > .filters > .inner > .filtermenu > .filter').on('click', About.menu);
  },
  menu: function() {
    var section;
    section = $(this).html().trim();
    _.off('.about > .fcontainer > .filters > .inner > .filtermenu > .filter', '.sections > .section');
    _.on(this, ".sections > .section.section_" + section);
    return $('html, body').animate({
      scrollTop: $(".sections").offset().top - 64
    }, 200);
  },
  hsbpd: function() {
    var section;
    section = $(this).data('section');
    _.off('.hsbpd > .slide');
    _.on(".hsbpd > .slide.slide_" + section[0]);
    _.off('.hsbpd > .dots > .dot');
    return _.on($(this));
  },
  capcenter: function() {
    var cap;
    cap = $(this).html().trim();
    _.off('.capcenter > .capmenu > .cap', '.capcenter > .descs > .desc');
    return _.on(this, ".capcenter > .descs > .desc_" + cap);
  },
  fived: function() {
    var item;
    item = $(this).find('.copy > .name').html().trim();
    _.off('.fived > .fivedmenu > .item', '.fived > .bodys > .body');
    return _.on(this, ".fived > .bodys > .body_" + item);
  }
};
