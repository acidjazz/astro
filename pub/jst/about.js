var About;

About = {
  i: function() {
    _.off('.orbit');
    About.handlers();
    if (location.hash !== "") {
      return About.menu(location.hash.replace('#', ''));
    }
  },
  handlers: function() {
    $('.hsbpd > .dots > .dot').on('click', About.hsbpd);
    $('.capcenter > .capmenu > .cap').on('click', About.capcenter);
    $('.fived > .fivedmenu > .item').on('click', About.fived);
    return $('.about > .fcontainer > .filters > .inner > .filtermenu > .filter').on('click', About.menuHandler);
  },
  menuHandler: function() {
    var section;
    section = $(this).html().trim();
    return About.menu(section);
  },
  menu: function(section) {
    _.off('.about > .fcontainer > .filters > .inner > .filtermenu > .filter', '.sections > .section');
    _.on(".fcontainer > .filters > .inner > .filtermenu > .filter.filter_" + section, ".sections > .section.section_" + section);
    $('html, body').animate({
      scrollTop: $(".sections").offset().top - 64
    }, 1000);
    return location.hash = section;
  },
  hsbpd: function() {
    var section;
    section = $(this).data('section');
    $('.hsbpd > .slide.on').addClass('offing').removeClass('on');
    _.on(".hsbpd > .slide.slide_" + section[0]);
    setTimeout(function() {
      _.off('.hsbpd > .slide.offing');
      return $('.hsbpd > .slide.offing').removeClass('offing');
    }, 3000);
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
