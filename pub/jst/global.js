var Global;

Global = {
  interval: false,
  cache: {},
  i: function() {
    NProgress.configure({
      showSpinner: false
    });
    Global.cache.astro = $('.astro');
    Global.cache.red1 = $('.red1');
    Global.cache.burger = $('.top > .inner > .burger > .inner');
    Global.interval = setInterval(function() {
      return Global.astro();
    }, 500);
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
  astro: function() {
    if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
      return _.on(Global.cache.astro, Global.cache.red1, Global.cache.burger);
    } else {
      return _.off(Global.cache.astro, Global.cache.red1, Global.cache.burger);
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
    var option, t;
    t = $(this);
    $('.menu > .inner > .options > .option').removeClass('active');
    t.addClass('active');
    option = t.text().trim();
    if (option === 'work') {
      if (location.href.match('work') !== null) {
        Work.summary();
      } else {
        location.href = '/work/';
      }
    }
    if (option === 'contact') {
      location.href = '/contact/';
    }
    return setTimeout(function() {
      Global.menu.off();
      return $('.menu > .inner > .options > .option').removeClass('active');
    }, 200);
  },
  preload: function(srces, progress, complete) {
    var i, images, j, len, loaded, results, src, total;
    images = [];
    loaded = 0;
    total = srces.length;
    results = [];
    for (i = j = 0, len = srces.length; j < len; i = ++j) {
      src = srces[i];
      images[i] = new Image();
      images[i].src = src;
      results.push(images[i].onload = function() {
        var perc;
        loaded++;
        perc = Math.round(loaded / total * 100) / 100;
        if (loaded === total) {
          return complete(true);
        } else {
          return progress(perc);
        }
      });
    }
    return results;
  },
  srcFromStyle: function(el) {
    var style, url;
    style = el.attr('style');
    url = style.match(/url\("(.*)"\)/);
    return url[1];
  }
};
