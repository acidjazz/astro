var Global;

Global = {
  i: function() {
    console.log('GLobal.i()');
    return Global.handlers();
  },
  handlers: function() {
    $('.top > .inner > .burger').on('click', Global.burger);
    return $('.menu > .inner > .options > .option').on('click', Global.option);
  },
  burger: function() {
    if ($(this).hasClass('on')) {
      return Global.menu.on();
    } else {
      return Global.menu.off();
    }
  },
  menu: {
    on: function() {
      _.on('.menu');
      _.off('.burger');
      return $('body').addClass('fixed');
    },
    off: function() {
      _.off('.menu');
      _.on('.burger');
      return $('body').removeClass('fixed');
    }
  },
  option: function() {
    $('.menu > .inner > .options > .option').removeClass('active');
    $(this).addClass('active');
    Project.summary();
    return setTimeout(function() {
      return Global.menu.off();
    }, 200);
  }
};
