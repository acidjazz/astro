var Global;

Global = {
  interval: false,
  phraseTimeout: false,
  cache: {},
  i: function() {
    NProgress.configure({
      showSpinner: false
    });
    Global.cache.astro = $('.astro');
    Global.cache.red1 = $('.red1');
    Global.cache.burger = $('.top > .inner > .burger > .inner');
    Global.cache.phrase = $('.top > .inner > .phrase');
    setTimeout(function() {
      return Global.astro(true);
    }, 400);
    Global.interval = setInterval(function() {
      return Global.astro();
    }, 500);
    Global.phrase();
    return Global.handlers();
  },
  handlers: function() {
    $('.top > .inner > .burger').on('click', Global.burger);
    return $('.menu > .inner > .options > .option').on('click', Global.option);
  },
  phrase: function() {
    var compiled, i, j, phrase, ref;
    phrase = phrases[Math.floor(Math.random() * phrases.length)];
    compiled = '';
    for (i = j = 0, ref = phrase.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      compiled = compiled + "<div>" + (phrase[i].replace(' ', '&nbsp;')) + "</div>";
    }
    Global.cache.phrase.html(compiled);
    return Global.phraseTimeout = setTimeout(function() {
      return _.on(Global.cache.phrase);
    }, 5000);
  },
  burger: function() {
    if ($(this).hasClass('on')) {
      return Global.menu.on();
    } else {
      return Global.menu.off();
    }
  },
  astro: function(clean) {
    if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0 && (Global.cache.astro.hasClass('off') || clean)) {
      _.on(Global.cache.astro, Global.cache.red1, Global.cache.burger, Global.cache.phrase);
      return true;
    }
    if ((document.body.scrollTop === 0 || document.documentElement.scrollTop === 0) && (Global.cache.astro.hasClass('on') || clean)) {
      _.off(Global.cache.astro, Global.cache.red1, Global.cache.burger, Global.cache.phrase);
      clearTimeout(Global.phraseTimeout);
      Global.phrase();
      return true;
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
    return setTimeout(function() {
      Global.menu.off();
      $('.menu > .inner > .options > .option').removeClass('active');
      if (option === 'work') {
        if (location.href.match('work') !== null) {
          Work.summary();
          _.on('.summary > .thumbs > .thumb');
          _.off('.summary > .filters > .inner > .filtermenu > .filter');
          _.on('.summary > .filters > .inner > .filtermenu > .filter_all');
        } else {
          location.href = '/work/';
        }
      }
      if (option === 'about') {
        location.href = '/about/';
      }
      if (option === 'contact') {
        return location.href = '/contact/';
      }
    }, 400);
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
