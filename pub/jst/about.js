var About;

About = {
  i: function() {
    _.off('.preloader');
    return About.handlers();
  },
  handlers: function() {
    $('.capcenter > .capmenu > .cap').on('click', About.capcenter);
    $('.fived > .fivedmenu > .item').on('click', About.fived);
    return $('.about > .filters > .inner > .filtermenu > .filter').on('click', About.menu);
  },
  menu: function() {
    var section;
    section = $(this).html().trim();
    _.off('.about > .filters > .inner > .filtermenu > .filter', '.sections > .section');
    return _.on(this, ".sections > .section.section_" + section);
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
