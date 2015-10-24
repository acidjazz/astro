var Global;

Global = {
  astroInterval: false,
  fbarInterval: false,
  phraseTimeout: false,
  phraseInterval: false,
  thumbTimeout: false,
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
    Global.astroInterval = setInterval(function() {
      return Global.astro();
    }, 500);
    Global.fbarInterval = setInterval(function() {
      return Global.fbar();
    }, 20);
    Global.handlers();
    return Global.fbar();
  },
  fbar: function() {
    if ($('.fcontainer:visible').length === 0) {
      return true;
    }
    if ($(window).scrollTop() > ($('.fcontainer:visible').offset().top)) {
      return $('.filters').addClass('float');
    } else {
      return $('.filters').removeClass('float');
    }
  },
  handlers: function() {
    $('.top > .inner > .burger').on('click', Global.burger);
    $('.menu > .inner > .options > .option').on('click', Global.option);
    return $('.thumbs > .thumb, .projects > .thumb, .related > .relateds > .thumb').on('mousemove', Global.thumb);
  },
  thumb: function(event) {
    var bg, distortBg, distortFilters, distortName, filters, filtersRect, name, nameRect, offset, opx4, opx6, opx8, opy4, opy6, opy8, px, py, rect, t, x, y;
    t = $(this);
    bg = t.find('.inner');
    name = t.find('.inner > .bg > .copy > .name');
    filters = t.find('.inner > .bg > .copy > .filters');
    rect = t[0].getBoundingClientRect();
    nameRect = name[0].getBoundingClientRect();
    filtersRect = filters[0].getBoundingClientRect();
    distortBg = new Distort({
      width: rect.width,
      height: rect.height,
      $el: bg
    });
    distortName = new Distort({
      width: rect.width,
      height: rect.height,
      $el: nameRect
    });
    distortFilters = new Distort({
      width: rect.width,
      height: rect.height,
      $el: filtersRect
    });
    offset = t.offset();
    x = Math.floor(event.pageX - offset.left);
    y = Math.floor(event.pageY - offset.top);
    px = Math.floor(x * 100 / t.width());
    py = Math.floor(y * 100 / t.height());
    opx8 = (px - 50) / 8;
    opy8 = (py - 50) / 8;
    opx6 = (px - 50) / 4;
    opy6 = (py - 50) / 4;
    opx4 = (px - 50) / 4;
    opy4 = (py - 50) / 4;
    distortBg.topRight.x -= opy8;
    distortBg.topRight.y -= opx8;
    distortBg.topLeft.x -= -opy8;
    distortBg.topLeft.y -= -opx8;
    distortBg.bottomRight.x -= -opy8;
    distortBg.bottomRight.y -= -opx8;
    distortBg.bottomLeft.x -= opy8;
    distortBg.bottomLeft.y -= opx8;
    bg.css('transform', distortBg.toString());
    distortName.topRight.x -= opy4;
    distortName.topRight.y -= opx4;
    distortName.topLeft.x -= -opy4;
    distortName.topLeft.y -= -opx4;
    distortName.bottomRight.x -= -opy4;
    distortName.bottomRight.y -= -opx4;
    distortName.bottomLeft.x -= opy4;
    distortName.bottomLeft.y -= opx4;
    name.css('transform', distortName.toString());
    distortFilters.topRight.x -= opy6;
    distortFilters.topRight.y -= opx6;
    distortFilters.topLeft.x -= -opy6;
    distortFilters.topLeft.y -= -opx6;
    distortFilters.bottomRight.x -= -opy6;
    distortFilters.bottomRight.y -= -opx6;
    distortFilters.bottomLeft.x -= opy6;
    distortFilters.bottomLeft.y -= opx6;
    return filters.css('transform', distortFilters.toString());
  },

  /*
  phrase: ->
    phrase = phrases[Math.floor(Math.random()*phrases.length)]
    compiled = ''
    for i in [0..(phrase.length-1)]
      compiled  = "#{compiled}<div>#{phrase[i].replace(' ', '&nbsp;')}</div>"
  
    Global.cache.phrase.html compiled
  
    Global.phraseTimeout = setTimeout ->
      _.on Global.cache.phrase
    , 5000
   */
  phrase: function() {
    var char, charDuration, chars, counter, duration, nums, numsMax, phrase, text;
    phrase = phrases[Math.floor(Math.random() * phrases.length)];
    duration = 2000;
    chars = phrase.length;
    charDuration = Math.round(duration / chars);
    char = 0;
    counter = 0;
    nums = ['!', '@', '_', '#', '%', '^', '&', '*', '_', '(', ')', '[', ']', '_'];
    numsMax = nums.length - 1;
    Global.cache.phrase.text('');
    text = '';
    Global.phraseInterval = setInterval(function() {
      counter++;
      if (counter === 10) {
        Global.cache.phrase.text("" + text + phrase[char++]);
        text = Global.cache.phrase.text();
        counter = 0;
      } else {
        Global.cache.phrase.text("" + text + nums[_.rand(0, numsMax)]);
      }
      if (char === chars) {
        return clearInterval(Global.phraseInterval);
      }
    }, charDuration / 10);
    console.log(duration, phrase.length, charDuration, phrase);
    return Global.phraseTimeout = setTimeout(function() {
      return _.on(Global.cache.phrase);
    }, 10000);
  },
  burger: function() {
    if ($(this).hasClass('on')) {
      return Global.menu.on();
    } else {
      return Global.menu.off();
    }
  },
  astro: function(clean) {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 && (Global.cache.astro.hasClass('off') || clean)) {
      _.on(Global.cache.astro, Global.cache.red1, Global.cache.burger, Global.cache.phrase);
      return true;
    }
    if ((document.body.scrollTop < 50 || document.documentElement.scrollTop < 50) && (Global.cache.astro.hasClass('on') || clean)) {
      _.off(Global.cache.astro, Global.cache.red1, Global.cache.burger, Global.cache.phrase);
      clearTimeout(Global.phraseTimeout);
      clearInterval(Global.phraseInterval);
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
      if (option === 'blog') {
        if (location.href.match('blog') !== null) {
          Blog.summary();
          _.on('.summary > .thumbs > .thumb');
          _.off('.summary > .filters > .inner > .filtermenu > .filter');
          _.on('.summary > .filters > .inner > .filtermenu > .filter_all');
        } else {
          location.href = '/blog/';
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
    url = style.match(/url\((.*)\)/);
    if (url !== null && url[1] !== void 0) {
      return url[1];
    } else {
      console.log('ERROR cannot find style for element', style);
      return console.log(url);
    }
  }
};
