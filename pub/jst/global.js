var Global;

Global = {
  astroInterval: false,
  fbarInterval: false,
  phraseTimeout: false,
  phraseInterval: false,
  thumbTimeout: false,
  cache: {},
  i: function() {
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
    if ($(window).width() > 1000) {
      Global.fbarInterval = setInterval(function() {
        return Global.fbar();
      }, 20);
    }
    Global.handlers();
    if ($(window).width() > 1000) {
      return Global.fbar();
    }
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
    $('.menu > .inner > .options > .suboptions > .option').on('click', Global.suboption);
    $('.thumbs > .thumb, .projects > .thumb, .related > .inner > .relateds > .thumb').on('mousemove', Global.thumb);
    return $('.footer > .inner > .gravity, .footer > .inner > .manifesto > .inner > .close').on('click', Global.manifesto);
  },
  manifesto: function() {
    var mf;
    mf = $('.manifesto');
    if (mf.hasClass('on')) {
      return _.off(mf);
    } else {
      return _.on(mf);
    }
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
  suboption: function() {
    var url;
    $(this).addClass('active');
    url = $(this).data('url');
    setTimeout(function() {
      location.href = url;
      return setTimeout(function() {
        return location.reload();
      }, 400);
    }, 400);
    return true;
  },
  option: function() {
    var option, t;
    t = $(this);
    option = t.text().trim();
    if (option === 'about') {
      if (t.hasClass('active')) {
        t.removeClass('active');
        _.off('.suboptions');
        $('.menu > .inner > .options').removeClass('subopts');
      } else {
        $('.menu > .inner > .options > .option').removeClass('active');
        t.addClass('active');
        _.on('.suboptions');
        $('.menu > .inner > .options').addClass('subopts');
      }
      return true;
    }
    $('.menu > .inner > .options > .option').removeClass('active');
    t.addClass('active');
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
      return url[1].replace(/"/g, '');
    } else {
      console.log('ERROR cannot find style for element', style);
      return console.log(url);
    }
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBRUU7RUFBQSxhQUFBLEVBQWUsS0FBZjtFQUNBLFlBQUEsRUFBYyxLQURkO0VBRUEsYUFBQSxFQUFlLEtBRmY7RUFHQSxjQUFBLEVBQWdCLEtBSGhCO0VBSUEsWUFBQSxFQUFjLEtBSmQ7RUFLQSxLQUFBLEVBQU8sRUFMUDtFQU9BLENBQUEsRUFBRyxTQUFBO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFiLEdBQXFCLENBQUEsQ0FBRSxRQUFGO0lBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBYixHQUFvQixDQUFBLENBQUUsT0FBRjtJQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQWIsR0FBc0IsQ0FBQSxDQUFFLGtDQUFGO0lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBYixHQUFzQixDQUFBLENBQUUseUJBQUY7SUFFdEIsVUFBQSxDQUFXLFNBQUE7YUFDVCxNQUFNLENBQUMsS0FBUCxDQUFhLElBQWI7SUFEUyxDQUFYLEVBRUUsR0FGRjtJQUlBLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFdBQUEsQ0FBWSxTQUFBO2FBQ2pDLE1BQU0sQ0FBQyxLQUFQLENBQUE7SUFEaUMsQ0FBWixFQUVyQixHQUZxQjtJQUl2QixJQUFHLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxLQUFWLENBQUEsQ0FBQSxHQUFvQixJQUF2QjtNQUNFLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLFdBQUEsQ0FBWSxTQUFBO2VBQ2hDLE1BQU0sQ0FBQyxJQUFQLENBQUE7TUFEZ0MsQ0FBWixFQUVwQixFQUZvQixFQUR4Qjs7SUFPQSxNQUFNLENBQUMsUUFBUCxDQUFBO0lBRUEsSUFBRyxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsS0FBVixDQUFBLENBQUEsR0FBb0IsSUFBdkI7YUFDRSxNQUFNLENBQUMsSUFBUCxDQUFBLEVBREY7O0VBeEJDLENBUEg7RUFrQ0EsSUFBQSxFQUFNLFNBQUE7SUFFSixJQUFHLENBQUEsQ0FBRSxxQkFBRixDQUF3QixDQUFDLE1BQXpCLEtBQW1DLENBQXRDO0FBQ0UsYUFBTyxLQURUOztJQUdBLElBQUcsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFNBQVYsQ0FBQSxDQUFBLEdBQXdCLENBQUMsQ0FBQSxDQUFFLHFCQUFGLENBQXdCLENBQUMsTUFBekIsQ0FBQSxDQUFpQyxDQUFDLEdBQW5DLENBQTNCO2FBQ0UsQ0FBQSxDQUFFLFVBQUYsQ0FBYSxDQUFDLFFBQWQsQ0FBdUIsT0FBdkIsRUFERjtLQUFBLE1BQUE7YUFHRSxDQUFBLENBQUUsVUFBRixDQUFhLENBQUMsV0FBZCxDQUEwQixPQUExQixFQUhGOztFQUxJLENBbENOO0VBNkNBLFFBQUEsRUFBVSxTQUFBO0lBRVIsQ0FBQSxDQUFFLHlCQUFGLENBQTRCLENBQUMsRUFBN0IsQ0FBZ0MsT0FBaEMsRUFBeUMsTUFBTSxDQUFDLE1BQWhEO0lBQ0EsQ0FBQSxDQUFFLHFDQUFGLENBQXdDLENBQUMsRUFBekMsQ0FBNEMsT0FBNUMsRUFBcUQsTUFBTSxDQUFDLE1BQTVEO0lBQ0EsQ0FBQSxDQUFFLG1EQUFGLENBQXNELENBQUMsRUFBdkQsQ0FBMEQsT0FBMUQsRUFBbUUsTUFBTSxDQUFDLFNBQTFFO0lBRUEsQ0FBQSxDQUFFLDhFQUFGLENBQWlGLENBQUMsRUFBbEYsQ0FBcUYsV0FBckYsRUFBa0csTUFBTSxDQUFDLEtBQXpHO1dBRUEsQ0FBQSxDQUFFLDhFQUFGLENBQWlGLENBQUMsRUFBbEYsQ0FBcUYsT0FBckYsRUFBOEYsTUFBTSxDQUFDLFNBQXJHO0VBUlEsQ0E3Q1Y7RUF3REEsU0FBQSxFQUFXLFNBQUE7QUFFVCxRQUFBO0lBQUEsRUFBQSxHQUFLLENBQUEsQ0FBRSxZQUFGO0lBRUwsSUFBRyxFQUFFLENBQUMsUUFBSCxDQUFZLElBQVosQ0FBSDthQUVFLENBQUMsQ0FBQyxHQUFGLENBQU0sRUFBTixFQUZGO0tBQUEsTUFBQTthQUtFLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxFQUxGOztFQUpTLENBeERYO0VBbUVBLEtBQUEsRUFBTyxTQUFDLEtBQUQ7QUFFTCxRQUFBO0lBQUEsQ0FBQSxHQUFJLENBQUEsQ0FBRSxJQUFGO0lBQ0osRUFBQSxHQUFLLENBQUMsQ0FBQyxJQUFGLENBQU8sUUFBUDtJQUNMLElBQUEsR0FBTyxDQUFDLENBQUMsSUFBRixDQUFPLDhCQUFQO0lBQ1AsT0FBQSxHQUFVLENBQUMsQ0FBQyxJQUFGLENBQU8saUNBQVA7SUFDVixJQUFBLEdBQU8sQ0FBRSxDQUFBLENBQUEsQ0FBRSxDQUFDLHFCQUFMLENBQUE7SUFDUCxRQUFBLEdBQVcsSUFBSyxDQUFBLENBQUEsQ0FBRSxDQUFDLHFCQUFSLENBQUE7SUFDWCxXQUFBLEdBQWMsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLHFCQUFYLENBQUE7SUFFZCxTQUFBLEdBQWdCLElBQUEsT0FBQSxDQUNkO01BQUEsS0FBQSxFQUFPLElBQUksQ0FBQyxLQUFaO01BQ0EsTUFBQSxFQUFRLElBQUksQ0FBQyxNQURiO01BRUEsR0FBQSxFQUFLLEVBRkw7S0FEYztJQUtoQixXQUFBLEdBQWtCLElBQUEsT0FBQSxDQUNoQjtNQUFBLEtBQUEsRUFBTyxJQUFJLENBQUMsS0FBWjtNQUNBLE1BQUEsRUFBUSxJQUFJLENBQUMsTUFEYjtNQUVBLEdBQUEsRUFBSyxRQUZMO0tBRGdCO0lBS2xCLGNBQUEsR0FBcUIsSUFBQSxPQUFBLENBQ25CO01BQUEsS0FBQSxFQUFPLElBQUksQ0FBQyxLQUFaO01BQ0EsTUFBQSxFQUFRLElBQUksQ0FBQyxNQURiO01BRUEsR0FBQSxFQUFLLFdBRkw7S0FEbUI7SUFLckIsTUFBQSxHQUFTLENBQUMsQ0FBQyxNQUFGLENBQUE7SUFDVCxDQUFBLEdBQUksSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFLLENBQUMsS0FBTixHQUFjLE1BQU0sQ0FBQyxJQUFoQztJQUNKLENBQUEsR0FBSSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUssQ0FBQyxLQUFOLEdBQWMsTUFBTSxDQUFDLEdBQWhDO0lBQ0osRUFBQSxHQUFLLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQSxHQUFJLEdBQUosR0FBVSxDQUFDLENBQUMsS0FBRixDQUFBLENBQXJCO0lBQ0wsRUFBQSxHQUFLLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQSxHQUFJLEdBQUosR0FBVSxDQUFDLENBQUMsTUFBRixDQUFBLENBQXJCO0lBRUwsSUFBQSxHQUFPLENBQUMsRUFBQSxHQUFHLEVBQUosQ0FBQSxHQUFRO0lBQ2YsSUFBQSxHQUFPLENBQUMsRUFBQSxHQUFHLEVBQUosQ0FBQSxHQUFRO0lBRWYsSUFBQSxHQUFPLENBQUMsRUFBQSxHQUFHLEVBQUosQ0FBQSxHQUFRO0lBQ2YsSUFBQSxHQUFPLENBQUMsRUFBQSxHQUFHLEVBQUosQ0FBQSxHQUFRO0lBRWYsSUFBQSxHQUFPLENBQUMsRUFBQSxHQUFHLEVBQUosQ0FBQSxHQUFRO0lBQ2YsSUFBQSxHQUFPLENBQUMsRUFBQSxHQUFHLEVBQUosQ0FBQSxHQUFRO0lBRWYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFuQixJQUF3QjtJQUN4QixTQUFTLENBQUMsUUFBUSxDQUFDLENBQW5CLElBQXdCO0lBRXhCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBbEIsSUFBdUIsQ0FBQztJQUN4QixTQUFTLENBQUMsT0FBTyxDQUFDLENBQWxCLElBQXVCLENBQUM7SUFFeEIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUF0QixJQUEyQixDQUFDO0lBQzVCLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBdEIsSUFBMkIsQ0FBQztJQUU1QixTQUFTLENBQUMsVUFBVSxDQUFDLENBQXJCLElBQTBCO0lBQzFCLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBckIsSUFBMEI7SUFFMUIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxXQUFQLEVBQW9CLFNBQVMsQ0FBQyxRQUFWLENBQUEsQ0FBcEI7SUFFQSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQXJCLElBQTBCO0lBQzFCLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBckIsSUFBMEI7SUFFMUIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFwQixJQUF5QixDQUFDO0lBQzFCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBcEIsSUFBeUIsQ0FBQztJQUUxQixXQUFXLENBQUMsV0FBVyxDQUFDLENBQXhCLElBQTZCLENBQUM7SUFDOUIsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUF4QixJQUE2QixDQUFDO0lBRTlCLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBdkIsSUFBNEI7SUFDNUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUF2QixJQUE0QjtJQUU1QixJQUFJLENBQUMsR0FBTCxDQUFTLFdBQVQsRUFBc0IsV0FBVyxDQUFDLFFBQVosQ0FBQSxDQUF0QjtJQUdBLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBeEIsSUFBNkI7SUFDN0IsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUF4QixJQUE2QjtJQUU3QixjQUFjLENBQUMsT0FBTyxDQUFDLENBQXZCLElBQTRCLENBQUM7SUFDN0IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUF2QixJQUE0QixDQUFDO0lBRTdCLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBM0IsSUFBZ0MsQ0FBQztJQUNqQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQTNCLElBQWdDLENBQUM7SUFFakMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUExQixJQUErQjtJQUMvQixjQUFjLENBQUMsVUFBVSxDQUFDLENBQTFCLElBQStCO1dBRy9CLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWixFQUF5QixjQUFjLENBQUMsUUFBZixDQUFBLENBQXpCO0VBbEZLLENBbkVQOztBQXVKQTs7Ozs7Ozs7Ozs7OztFQWNBLE1BQUEsRUFBUSxTQUFBO0FBRU4sUUFBQTtJQUFBLE1BQUEsR0FBUyxPQUFRLENBQUEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBYyxPQUFPLENBQUMsTUFBakMsQ0FBQTtJQUVqQixRQUFBLEdBQVc7SUFDWCxLQUFBLEdBQVEsTUFBTSxDQUFDO0lBQ2YsWUFBQSxHQUFlLElBQUksQ0FBQyxLQUFMLENBQVcsUUFBQSxHQUFXLEtBQXRCO0lBQ2YsSUFBQSxHQUFPO0lBRVAsT0FBQSxHQUFVO0lBQ1YsSUFBQSxHQUFPLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixFQUF5QixHQUF6QixFQUE2QixHQUE3QixFQUFpQyxHQUFqQyxFQUFxQyxHQUFyQyxFQUF5QyxHQUF6QyxFQUE2QyxHQUE3QyxFQUFpRCxHQUFqRCxFQUFxRCxHQUFyRDtJQUNQLE9BQUEsR0FBVSxJQUFJLENBQUMsTUFBTCxHQUFZO0lBRXRCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQXBCLENBQXlCLEVBQXpCO0lBQ0EsSUFBQSxHQUFPO0lBQ1AsTUFBTSxDQUFDLGNBQVAsR0FBd0IsV0FBQSxDQUFZLFNBQUE7TUFFbEMsT0FBQTtNQUNBLElBQUcsT0FBQSxLQUFXLEVBQWQ7UUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFwQixDQUF5QixFQUFBLEdBQUcsSUFBSCxHQUFVLE1BQU8sQ0FBQSxJQUFBLEVBQUEsQ0FBMUM7UUFDQSxJQUFBLEdBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBcEIsQ0FBQTtRQUNQLE9BQUEsR0FBVSxFQUhaO09BQUEsTUFBQTtRQUtFLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQXBCLENBQXlCLEVBQUEsR0FBRyxJQUFILEdBQVUsSUFBSyxDQUFBLENBQUMsQ0FBQyxJQUFGLENBQU8sQ0FBUCxFQUFTLE9BQVQsQ0FBQSxDQUF4QyxFQUxGOztNQVFBLElBQUcsSUFBQSxLQUFRLEtBQVg7ZUFDRSxhQUFBLENBQWMsTUFBTSxDQUFDLGNBQXJCLEVBREY7O0lBWGtDLENBQVosRUFjdEIsWUFBQSxHQUFhLEVBZFM7SUFnQnhCLE9BQU8sQ0FBQyxHQUFSLENBQVksUUFBWixFQUFzQixNQUFNLENBQUMsTUFBN0IsRUFBcUMsWUFBckMsRUFBbUQsTUFBbkQ7V0FFQSxNQUFNLENBQUMsYUFBUCxHQUF1QixVQUFBLENBQVcsU0FBQTthQUNoQyxDQUFDLENBQUMsRUFBRixDQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBbEI7SUFEZ0MsQ0FBWCxFQUVyQixLQUZxQjtFQWpDakIsQ0FyS1I7RUEwTUEsTUFBQSxFQUFRLFNBQUE7SUFFTixJQUFHLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxRQUFSLENBQWlCLElBQWpCLENBQUg7YUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQVosQ0FBQSxFQURGO0tBQUEsTUFBQTthQUdFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBWixDQUFBLEVBSEY7O0VBRk0sQ0ExTVI7RUFpTkEsS0FBQSxFQUFPLFNBQUMsS0FBRDtJQUVMLElBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFkLEdBQTBCLEVBQTFCLElBQWdDLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBekIsR0FBcUMsRUFBckUsSUFBNEUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFuQixDQUE0QixLQUE1QixDQUFBLElBQXNDLEtBQXZDLENBQS9FO01BQ0UsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQWxCLEVBQXlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBdEMsRUFBNEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUF6RCxFQUFpRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQTlFO0FBQ0EsYUFBTyxLQUZUOztJQUlBLElBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQWQsR0FBMEIsRUFBMUIsSUFBZ0MsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUF6QixHQUFxQyxFQUF0RSxDQUFBLElBQThFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBbkIsQ0FBNEIsSUFBNUIsQ0FBQSxJQUFxQyxLQUF0QyxDQUFqRjtNQUNFLENBQUMsQ0FBQyxHQUFGLENBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFuQixFQUEwQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQXZDLEVBQTZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBMUQsRUFBa0UsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUEvRTtNQUNBLFlBQUEsQ0FBYSxNQUFNLENBQUMsYUFBcEI7TUFDQSxhQUFBLENBQWMsTUFBTSxDQUFDLGNBQXJCO01BQ0EsTUFBTSxDQUFDLE1BQVAsQ0FBQTtBQUNBLGFBQU8sS0FMVDs7RUFOSyxDQWpOUDtFQThOQSxJQUFBLEVBRUU7SUFBQSxFQUFBLEVBQUksU0FBQTtNQUNGLENBQUMsQ0FBQyxFQUFGLENBQUssT0FBTDtNQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sU0FBTjthQUNBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxRQUFWLENBQW1CLE9BQW5CO0lBSEUsQ0FBSjtJQUtBLEdBQUEsRUFBSyxTQUFBO01BQ0gsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxPQUFOO01BQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxTQUFMO2FBQ0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFdBQVYsQ0FBc0IsT0FBdEI7SUFIRyxDQUxMO0dBaE9GO0VBME9BLFNBQUEsRUFBVyxTQUFBO0FBQ1QsUUFBQTtJQUFBLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxRQUFSLENBQWlCLFFBQWpCO0lBQ0EsR0FBQSxHQUFNLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsS0FBYjtJQUNOLFVBQUEsQ0FBVyxTQUFBO01BQ1QsUUFBUSxDQUFDLElBQVQsR0FBZ0I7YUFDaEIsVUFBQSxDQUFXLFNBQUE7ZUFDVCxRQUFRLENBQUMsTUFBVCxDQUFBO01BRFMsQ0FBWCxFQUVFLEdBRkY7SUFGUyxDQUFYLEVBS0UsR0FMRjtBQU1BLFdBQU87RUFURSxDQTFPWDtFQW9QQSxNQUFBLEVBQVEsU0FBQTtBQUVOLFFBQUE7SUFBQSxDQUFBLEdBQUksQ0FBQSxDQUFFLElBQUY7SUFDSixNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsQ0FBQSxDQUFRLENBQUMsSUFBVCxDQUFBO0lBRVQsSUFBRyxNQUFBLEtBQVUsT0FBYjtNQUVFLElBQUcsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxRQUFYLENBQUg7UUFDRSxDQUFDLENBQUMsV0FBRixDQUFjLFFBQWQ7UUFDQSxDQUFDLENBQUMsR0FBRixDQUFNLGFBQU47UUFDQSxDQUFBLENBQUUsMkJBQUYsQ0FBOEIsQ0FBQyxXQUEvQixDQUEyQyxTQUEzQyxFQUhGO09BQUEsTUFBQTtRQUtFLENBQUEsQ0FBRSxxQ0FBRixDQUF3QyxDQUFDLFdBQXpDLENBQXFELFFBQXJEO1FBQ0EsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxRQUFYO1FBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxhQUFMO1FBQ0EsQ0FBQSxDQUFFLDJCQUFGLENBQThCLENBQUMsUUFBL0IsQ0FBd0MsU0FBeEMsRUFSRjs7QUFVQSxhQUFPLEtBWlQ7O0lBY0EsQ0FBQSxDQUFFLHFDQUFGLENBQXdDLENBQUMsV0FBekMsQ0FBcUQsUUFBckQ7SUFDQSxDQUFDLENBQUMsUUFBRixDQUFXLFFBQVg7V0FFQSxVQUFBLENBQVcsU0FBQTtNQUVULE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBWixDQUFBO01BQ0EsQ0FBQSxDQUFFLHFDQUFGLENBQXdDLENBQUMsV0FBekMsQ0FBcUQsUUFBckQ7TUFFQSxJQUFHLE1BQUEsS0FBVSxNQUFiO1FBQ0UsSUFBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQWQsQ0FBb0IsTUFBcEIsQ0FBQSxLQUFpQyxJQUFwQztVQUNFLElBQUksQ0FBQyxPQUFMLENBQUE7VUFDQSxDQUFDLENBQUMsRUFBRixDQUFLLDZCQUFMO1VBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxzREFBTjtVQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssMERBQUwsRUFKRjtTQUFBLE1BQUE7VUFNRSxRQUFRLENBQUMsSUFBVCxHQUFnQixTQU5sQjtTQURGOztNQVNBLElBQUcsTUFBQSxLQUFVLE1BQWI7UUFDRSxJQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBZCxDQUFvQixNQUFwQixDQUFBLEtBQWlDLElBQXBDO1VBQ0UsSUFBSSxDQUFDLE9BQUwsQ0FBQTtVQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssNkJBQUw7VUFDQSxDQUFDLENBQUMsR0FBRixDQUFNLHNEQUFOO1VBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSywwREFBTCxFQUpGO1NBQUEsTUFBQTtVQU1FLFFBQVEsQ0FBQyxJQUFULEdBQWdCLFNBTmxCO1NBREY7O01BU0EsSUFBRyxNQUFBLEtBQVUsT0FBYjtRQUNJLFFBQVEsQ0FBQyxJQUFULEdBQWdCLFVBRHBCOztNQUVBLElBQUcsTUFBQSxLQUFVLFNBQWI7ZUFDSSxRQUFRLENBQUMsSUFBVCxHQUFnQixZQURwQjs7SUF6QlMsQ0FBWCxFQTRCRSxHQTVCRjtFQXRCTSxDQXBQUjtFQXdTQSxPQUFBLEVBQVMsU0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQixRQUFsQjtBQUVQLFFBQUE7SUFBQSxNQUFBLEdBQVM7SUFDVCxNQUFBLEdBQVM7SUFDVCxLQUFBLEdBQVEsS0FBSyxDQUFDO0FBRWQ7U0FBQSwrQ0FBQTs7TUFDRSxNQUFPLENBQUEsQ0FBQSxDQUFQLEdBQWdCLElBQUEsS0FBQSxDQUFBO01BQ2hCLE1BQU8sQ0FBQSxDQUFBLENBQUUsQ0FBQyxHQUFWLEdBQWdCO21CQUNoQixNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBVixHQUFtQixTQUFBO0FBQ2pCLFlBQUE7UUFBQSxNQUFBO1FBQ0EsSUFBQSxHQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsTUFBQSxHQUFPLEtBQVAsR0FBYSxHQUF4QixDQUFBLEdBQTZCO1FBQ3BDLElBQUcsTUFBQSxLQUFVLEtBQWI7aUJBQXdCLFFBQUEsQ0FBUyxJQUFULEVBQXhCO1NBQUEsTUFBQTtpQkFBNEMsUUFBQSxDQUFTLElBQVQsRUFBNUM7O01BSGlCO0FBSHJCOztFQU5PLENBeFNUO0VBc1RBLFlBQUEsRUFBYyxTQUFDLEVBQUQ7QUFDWixRQUFBO0lBQUEsS0FBQSxHQUFRLEVBQUUsQ0FBQyxJQUFILENBQVEsT0FBUjtJQUNSLEdBQUEsR0FBTSxLQUFLLENBQUMsS0FBTixDQUFZLGFBQVo7SUFDTixJQUFHLEdBQUEsS0FBUyxJQUFULElBQWtCLEdBQUksQ0FBQSxDQUFBLENBQUosS0FBWSxNQUFqQztBQUNFLGFBQU8sR0FBSSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQVAsQ0FBZSxJQUFmLEVBQXFCLEVBQXJCLEVBRFQ7S0FBQSxNQUFBO01BR0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxxQ0FBWixFQUFtRCxLQUFuRDthQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksR0FBWixFQUpGOztFQUhZLENBdFRkIiwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkdsb2JhbCA9XG5cbiAgYXN0cm9JbnRlcnZhbDogZmFsc2VcbiAgZmJhckludGVydmFsOiBmYWxzZVxuICBwaHJhc2VUaW1lb3V0OiBmYWxzZVxuICBwaHJhc2VJbnRlcnZhbDogZmFsc2VcbiAgdGh1bWJUaW1lb3V0OiBmYWxzZVxuICBjYWNoZToge31cblxuICBpOiAtPlxuXG4gICAgR2xvYmFsLmNhY2hlLmFzdHJvID0gJCgnLmFzdHJvJylcbiAgICBHbG9iYWwuY2FjaGUucmVkMSA9ICQoJy5yZWQxJylcbiAgICBHbG9iYWwuY2FjaGUuYnVyZ2VyID0gJCgnLnRvcCA+IC5pbm5lciA+IC5idXJnZXIgPiAuaW5uZXInKVxuICAgIEdsb2JhbC5jYWNoZS5waHJhc2UgPSAkKCcudG9wID4gLmlubmVyID4gLnBocmFzZScpXG5cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBHbG9iYWwuYXN0cm8odHJ1ZSlcbiAgICAsIDQwMFxuXG4gICAgR2xvYmFsLmFzdHJvSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCAtPlxuICAgICAgR2xvYmFsLmFzdHJvKClcbiAgICAsIDUwMFxuXG4gICAgaWYgJCh3aW5kb3cpLndpZHRoKCkgPiAxMDAwXG4gICAgICBHbG9iYWwuZmJhckludGVydmFsID0gc2V0SW50ZXJ2YWwgLT5cbiAgICAgICAgR2xvYmFsLmZiYXIoKVxuICAgICAgLCAyMFxuXG4gICAgI0dsb2JhbC5waHJhc2UoKVxuXG4gICAgR2xvYmFsLmhhbmRsZXJzKClcblxuICAgIGlmICQod2luZG93KS53aWR0aCgpID4gMTAwMFxuICAgICAgR2xvYmFsLmZiYXIoKVxuXG4gIGZiYXI6IC0+XG5cbiAgICBpZiAkKCcuZmNvbnRhaW5lcjp2aXNpYmxlJykubGVuZ3RoIGlzIDBcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBpZiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAoJCgnLmZjb250YWluZXI6dmlzaWJsZScpLm9mZnNldCgpLnRvcClcbiAgICAgICQoJy5maWx0ZXJzJykuYWRkQ2xhc3MgJ2Zsb2F0J1xuICAgIGVsc2VcbiAgICAgICQoJy5maWx0ZXJzJykucmVtb3ZlQ2xhc3MgJ2Zsb2F0J1xuXG4gICAgXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnLnRvcCA+IC5pbm5lciA+IC5idXJnZXInKS5vbiAnY2xpY2snLCBHbG9iYWwuYnVyZ2VyXG4gICAgJCgnLm1lbnUgPiAuaW5uZXIgPiAub3B0aW9ucyA+IC5vcHRpb24nKS5vbiAnY2xpY2snLCBHbG9iYWwub3B0aW9uXG4gICAgJCgnLm1lbnUgPiAuaW5uZXIgPiAub3B0aW9ucyA+IC5zdWJvcHRpb25zID4gLm9wdGlvbicpLm9uICdjbGljaycsIEdsb2JhbC5zdWJvcHRpb25cblxuICAgICQoJy50aHVtYnMgPiAudGh1bWIsIC5wcm9qZWN0cyA+IC50aHVtYiwgLnJlbGF0ZWQgPiAuaW5uZXIgPiAucmVsYXRlZHMgPiAudGh1bWInKS5vbiAnbW91c2Vtb3ZlJywgR2xvYmFsLnRodW1iXG5cbiAgICAkKCcuZm9vdGVyID4gLmlubmVyID4gLmdyYXZpdHksIC5mb290ZXIgPiAuaW5uZXIgPiAubWFuaWZlc3RvID4gLmlubmVyID4gLmNsb3NlJykub24gJ2NsaWNrJywgR2xvYmFsLm1hbmlmZXN0b1xuXG5cbiAgbWFuaWZlc3RvOiAtPlxuXG4gICAgbWYgPSAkKCcubWFuaWZlc3RvJylcblxuICAgIGlmIG1mLmhhc0NsYXNzICdvbidcbiAgICAgICMkKCdib2R5JykucmVtb3ZlQ2xhc3MgJ2ZpeGVkJ1xuICAgICAgXy5vZmYgbWZcbiAgICBlbHNlXG4gICAgICAjJCgnYm9keScpLmFkZENsYXNzICdmaXhlZCdcbiAgICAgIF8ub24gbWZcblxuICB0aHVtYjogKGV2ZW50KSAtPlxuXG4gICAgdCA9ICQgdGhpc1xuICAgIGJnID0gdC5maW5kICcuaW5uZXInXG4gICAgbmFtZSA9IHQuZmluZCAnLmlubmVyID4gLmJnID4gLmNvcHkgPiAubmFtZSdcbiAgICBmaWx0ZXJzID0gdC5maW5kICcuaW5uZXIgPiAuYmcgPiAuY29weSA+IC5maWx0ZXJzJ1xuICAgIHJlY3QgPSB0WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgbmFtZVJlY3QgPSBuYW1lWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgZmlsdGVyc1JlY3QgPSBmaWx0ZXJzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBkaXN0b3J0QmcgPSBuZXcgRGlzdG9ydFxuICAgICAgd2lkdGg6IHJlY3Qud2lkdGhcbiAgICAgIGhlaWdodDogcmVjdC5oZWlnaHRcbiAgICAgICRlbDogYmdcblxuICAgIGRpc3RvcnROYW1lID0gbmV3IERpc3RvcnRcbiAgICAgIHdpZHRoOiByZWN0LndpZHRoXG4gICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0XG4gICAgICAkZWw6IG5hbWVSZWN0XG5cbiAgICBkaXN0b3J0RmlsdGVycyA9IG5ldyBEaXN0b3J0XG4gICAgICB3aWR0aDogcmVjdC53aWR0aFxuICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICAgICAgJGVsOiBmaWx0ZXJzUmVjdFxuXG4gICAgb2Zmc2V0ID0gdC5vZmZzZXQoKVxuICAgIHggPSBNYXRoLmZsb29yKGV2ZW50LnBhZ2VYIC0gb2Zmc2V0LmxlZnQpXG4gICAgeSA9IE1hdGguZmxvb3IoZXZlbnQucGFnZVkgLSBvZmZzZXQudG9wKVxuICAgIHB4ID0gTWF0aC5mbG9vcih4ICogMTAwIC8gdC53aWR0aCgpKVxuICAgIHB5ID0gTWF0aC5mbG9vcih5ICogMTAwIC8gdC5oZWlnaHQoKSlcblxuICAgIG9weDggPSAocHgtNTApLzhcbiAgICBvcHk4ID0gKHB5LTUwKS84XG5cbiAgICBvcHg2ID0gKHB4LTUwKS80XG4gICAgb3B5NiA9IChweS01MCkvNFxuXG4gICAgb3B4NCA9IChweC01MCkvNFxuICAgIG9weTQgPSAocHktNTApLzRcblxuICAgIGRpc3RvcnRCZy50b3BSaWdodC54IC09IG9weThcbiAgICBkaXN0b3J0QmcudG9wUmlnaHQueSAtPSBvcHg4XG5cbiAgICBkaXN0b3J0QmcudG9wTGVmdC54IC09IC1vcHk4XG4gICAgZGlzdG9ydEJnLnRvcExlZnQueSAtPSAtb3B4OFxuXG4gICAgZGlzdG9ydEJnLmJvdHRvbVJpZ2h0LnggLT0gLW9weThcbiAgICBkaXN0b3J0QmcuYm90dG9tUmlnaHQueSAtPSAtb3B4OFxuXG4gICAgZGlzdG9ydEJnLmJvdHRvbUxlZnQueCAtPSBvcHk4XG4gICAgZGlzdG9ydEJnLmJvdHRvbUxlZnQueSAtPSBvcHg4XG5cbiAgICBiZy5jc3MgJ3RyYW5zZm9ybScsIGRpc3RvcnRCZy50b1N0cmluZygpXG5cbiAgICBkaXN0b3J0TmFtZS50b3BSaWdodC54IC09IG9weTRcbiAgICBkaXN0b3J0TmFtZS50b3BSaWdodC55IC09IG9weDRcblxuICAgIGRpc3RvcnROYW1lLnRvcExlZnQueCAtPSAtb3B5NFxuICAgIGRpc3RvcnROYW1lLnRvcExlZnQueSAtPSAtb3B4NFxuXG4gICAgZGlzdG9ydE5hbWUuYm90dG9tUmlnaHQueCAtPSAtb3B5NFxuICAgIGRpc3RvcnROYW1lLmJvdHRvbVJpZ2h0LnkgLT0gLW9weDRcblxuICAgIGRpc3RvcnROYW1lLmJvdHRvbUxlZnQueCAtPSBvcHk0XG4gICAgZGlzdG9ydE5hbWUuYm90dG9tTGVmdC55IC09IG9weDRcblxuICAgIG5hbWUuY3NzICd0cmFuc2Zvcm0nLCBkaXN0b3J0TmFtZS50b1N0cmluZygpXG5cblxuICAgIGRpc3RvcnRGaWx0ZXJzLnRvcFJpZ2h0LnggLT0gb3B5NlxuICAgIGRpc3RvcnRGaWx0ZXJzLnRvcFJpZ2h0LnkgLT0gb3B4NlxuXG4gICAgZGlzdG9ydEZpbHRlcnMudG9wTGVmdC54IC09IC1vcHk2XG4gICAgZGlzdG9ydEZpbHRlcnMudG9wTGVmdC55IC09IC1vcHg2XG5cbiAgICBkaXN0b3J0RmlsdGVycy5ib3R0b21SaWdodC54IC09IC1vcHk2XG4gICAgZGlzdG9ydEZpbHRlcnMuYm90dG9tUmlnaHQueSAtPSAtb3B4NlxuXG4gICAgZGlzdG9ydEZpbHRlcnMuYm90dG9tTGVmdC54IC09IG9weTZcbiAgICBkaXN0b3J0RmlsdGVycy5ib3R0b21MZWZ0LnkgLT0gb3B4NlxuXG5cbiAgICBmaWx0ZXJzLmNzcyAndHJhbnNmb3JtJywgZGlzdG9ydEZpbHRlcnMudG9TdHJpbmcoKVxuXG4gICMjI1xuICBwaHJhc2U6IC0+XG4gICAgcGhyYXNlID0gcGhyYXNlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcGhyYXNlcy5sZW5ndGgpXVxuICAgIGNvbXBpbGVkID0gJydcbiAgICBmb3IgaSBpbiBbMC4uKHBocmFzZS5sZW5ndGgtMSldXG4gICAgICBjb21waWxlZCAgPSBcIiN7Y29tcGlsZWR9PGRpdj4je3BocmFzZVtpXS5yZXBsYWNlKCcgJywgJyZuYnNwOycpfTwvZGl2PlwiXG5cbiAgICBHbG9iYWwuY2FjaGUucGhyYXNlLmh0bWwgY29tcGlsZWRcblxuICAgIEdsb2JhbC5waHJhc2VUaW1lb3V0ID0gc2V0VGltZW91dCAtPlxuICAgICAgXy5vbiBHbG9iYWwuY2FjaGUucGhyYXNlXG4gICAgLCA1MDAwXG4gICMjI1xuICBcbiAgcGhyYXNlOiAtPlxuXG4gICAgcGhyYXNlID0gcGhyYXNlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcGhyYXNlcy5sZW5ndGgpXVxuXG4gICAgZHVyYXRpb24gPSAyMDAwXG4gICAgY2hhcnMgPSBwaHJhc2UubGVuZ3RoXG4gICAgY2hhckR1cmF0aW9uID0gTWF0aC5yb3VuZCBkdXJhdGlvbiAvIGNoYXJzXG4gICAgY2hhciA9IDBcblxuICAgIGNvdW50ZXIgPSAwXG4gICAgbnVtcyA9IFsnIScsJ0AnLCdfJywnIycsJyUnLCdeJywnJicsJyonLCdfJywnKCcsJyknLCdbJywnXScsJ18nXVxuICAgIG51bXNNYXggPSBudW1zLmxlbmd0aC0xXG5cbiAgICBHbG9iYWwuY2FjaGUucGhyYXNlLnRleHQgJydcbiAgICB0ZXh0ID0gJydcbiAgICBHbG9iYWwucGhyYXNlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCAtPlxuXG4gICAgICBjb3VudGVyKytcbiAgICAgIGlmIGNvdW50ZXIgaXMgMTBcbiAgICAgICAgR2xvYmFsLmNhY2hlLnBocmFzZS50ZXh0IFwiI3t0ZXh0fSN7cGhyYXNlW2NoYXIrK119XCJcbiAgICAgICAgdGV4dCA9IEdsb2JhbC5jYWNoZS5waHJhc2UudGV4dCgpXG4gICAgICAgIGNvdW50ZXIgPSAwXG4gICAgICBlbHNlXG4gICAgICAgIEdsb2JhbC5jYWNoZS5waHJhc2UudGV4dCBcIiN7dGV4dH0je251bXNbXy5yYW5kKDAsbnVtc01heCldfVwiXG5cblxuICAgICAgaWYgY2hhciBpcyBjaGFyc1xuICAgICAgICBjbGVhckludGVydmFsIEdsb2JhbC5waHJhc2VJbnRlcnZhbFxuXG4gICAgLCBjaGFyRHVyYXRpb24vMTBcblxuICAgIGNvbnNvbGUubG9nIGR1cmF0aW9uLCBwaHJhc2UubGVuZ3RoLCBjaGFyRHVyYXRpb24sIHBocmFzZVxuXG4gICAgR2xvYmFsLnBocmFzZVRpbWVvdXQgPSBzZXRUaW1lb3V0IC0+XG4gICAgICBfLm9uIEdsb2JhbC5jYWNoZS5waHJhc2VcbiAgICAsIDEwMDAwXG5cbiAgYnVyZ2VyOiAtPlxuXG4gICAgaWYgJCh0aGlzKS5oYXNDbGFzcyAnb24nXG4gICAgICBHbG9iYWwubWVudS5vbigpXG4gICAgZWxzZVxuICAgICAgR2xvYmFsLm1lbnUub2ZmKClcblxuICBhc3RybzogKGNsZWFuKSAtPlxuXG4gICAgaWYgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPiA1MCBvciBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID4gNTAgYW5kIChHbG9iYWwuY2FjaGUuYXN0cm8uaGFzQ2xhc3MoJ29mZicpIG9yIGNsZWFuKVxuICAgICAgXy5vbiBHbG9iYWwuY2FjaGUuYXN0cm8sIEdsb2JhbC5jYWNoZS5yZWQxLCBHbG9iYWwuY2FjaGUuYnVyZ2VyLCBHbG9iYWwuY2FjaGUucGhyYXNlXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIDwgNTAgb3IgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA8IDUwKSBhbmQgKEdsb2JhbC5jYWNoZS5hc3Ryby5oYXNDbGFzcygnb24nKSBvciBjbGVhbilcbiAgICAgIF8ub2ZmIEdsb2JhbC5jYWNoZS5hc3RybywgR2xvYmFsLmNhY2hlLnJlZDEsIEdsb2JhbC5jYWNoZS5idXJnZXIsIEdsb2JhbC5jYWNoZS5waHJhc2VcbiAgICAgIGNsZWFyVGltZW91dCBHbG9iYWwucGhyYXNlVGltZW91dFxuICAgICAgY2xlYXJJbnRlcnZhbCBHbG9iYWwucGhyYXNlSW50ZXJ2YWxcbiAgICAgIEdsb2JhbC5waHJhc2UoKVxuICAgICAgcmV0dXJuIHRydWVcblxuICBtZW51OlxuXG4gICAgb246IC0+XG4gICAgICBfLm9uICcubWVudSdcbiAgICAgIF8ub2ZmICcuYnVyZ2VyJ1xuICAgICAgJCgnYm9keScpLmFkZENsYXNzICdmaXhlZCdcblxuICAgIG9mZjogLT5cbiAgICAgIF8ub2ZmICcubWVudSdcbiAgICAgIF8ub24gJy5idXJnZXInXG4gICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MgJ2ZpeGVkJ1xuXG4gIHN1Ym9wdGlvbjogLT5cbiAgICAkKHRoaXMpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgdXJsID0gJCh0aGlzKS5kYXRhICd1cmwnXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgbG9jYXRpb24uaHJlZiA9IHVybFxuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgLCA0MDBcbiAgICAsIDQwMFxuICAgIHJldHVybiB0cnVlXG4gIG9wdGlvbjogLT5cblxuICAgIHQgPSAkIHRoaXNcbiAgICBvcHRpb24gPSB0LnRleHQoKS50cmltKClcblxuICAgIGlmIG9wdGlvbiBpcyAnYWJvdXQnXG5cbiAgICAgIGlmIHQuaGFzQ2xhc3MgJ2FjdGl2ZSdcbiAgICAgICAgdC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgICBfLm9mZiAnLnN1Ym9wdGlvbnMnXG4gICAgICAgICQoJy5tZW51ID4gLmlubmVyID4gLm9wdGlvbnMnKS5yZW1vdmVDbGFzcyAnc3Vib3B0cydcbiAgICAgIGVsc2VcbiAgICAgICAgJCgnLm1lbnUgPiAuaW5uZXIgPiAub3B0aW9ucyA+IC5vcHRpb24nKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICAgICB0LmFkZENsYXNzICdhY3RpdmUnXG4gICAgICAgIF8ub24gJy5zdWJvcHRpb25zJ1xuICAgICAgICAkKCcubWVudSA+IC5pbm5lciA+IC5vcHRpb25zJykuYWRkQ2xhc3MgJ3N1Ym9wdHMnXG5cbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICAkKCcubWVudSA+IC5pbm5lciA+IC5vcHRpb25zID4gLm9wdGlvbicpLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgdC5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gICAgc2V0VGltZW91dCAtPlxuXG4gICAgICBHbG9iYWwubWVudS5vZmYoKVxuICAgICAgJCgnLm1lbnUgPiAuaW5uZXIgPiAub3B0aW9ucyA+IC5vcHRpb24nKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuXG4gICAgICBpZiBvcHRpb24gaXMgJ3dvcmsnXG4gICAgICAgIGlmIGxvY2F0aW9uLmhyZWYubWF0Y2goJ3dvcmsnKSBpc250IG51bGxcbiAgICAgICAgICBXb3JrLnN1bW1hcnkoKVxuICAgICAgICAgIF8ub24gJy5zdW1tYXJ5ID4gLnRodW1icyA+IC50aHVtYidcbiAgICAgICAgICBfLm9mZiAnLnN1bW1hcnkgPiAuZmlsdGVycyA+IC5pbm5lciA+IC5maWx0ZXJtZW51ID4gLmZpbHRlcidcbiAgICAgICAgICBfLm9uICcuc3VtbWFyeSA+IC5maWx0ZXJzID4gLmlubmVyID4gLmZpbHRlcm1lbnUgPiAuZmlsdGVyX2FsbCdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL3dvcmsvJ1xuXG4gICAgICBpZiBvcHRpb24gaXMgJ2Jsb2cnXG4gICAgICAgIGlmIGxvY2F0aW9uLmhyZWYubWF0Y2goJ2Jsb2cnKSBpc250IG51bGxcbiAgICAgICAgICBCbG9nLnN1bW1hcnkoKVxuICAgICAgICAgIF8ub24gJy5zdW1tYXJ5ID4gLnRodW1icyA+IC50aHVtYidcbiAgICAgICAgICBfLm9mZiAnLnN1bW1hcnkgPiAuZmlsdGVycyA+IC5pbm5lciA+IC5maWx0ZXJtZW51ID4gLmZpbHRlcidcbiAgICAgICAgICBfLm9uICcuc3VtbWFyeSA+IC5maWx0ZXJzID4gLmlubmVyID4gLmZpbHRlcm1lbnUgPiAuZmlsdGVyX2FsbCdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Jsb2cvJ1xuXG4gICAgICBpZiBvcHRpb24gaXMgJ2Fib3V0J1xuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Fib3V0LydcbiAgICAgIGlmIG9wdGlvbiBpcyAnY29udGFjdCdcbiAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9jb250YWN0LydcblxuICAgICwgNDAwXG5cbiAgcHJlbG9hZDogKHNyY2VzLCBwcm9ncmVzcywgY29tcGxldGUpIC0+XG5cbiAgICBpbWFnZXMgPSBbXVxuICAgIGxvYWRlZCA9IDBcbiAgICB0b3RhbCA9IHNyY2VzLmxlbmd0aFxuXG4gICAgZm9yIHNyYywgaSBpbiBzcmNlc1xuICAgICAgaW1hZ2VzW2ldID0gbmV3IEltYWdlKClcbiAgICAgIGltYWdlc1tpXS5zcmMgPSBzcmNcbiAgICAgIGltYWdlc1tpXS5vbmxvYWQgPSAtPlxuICAgICAgICBsb2FkZWQrK1xuICAgICAgICBwZXJjID0gTWF0aC5yb3VuZChsb2FkZWQvdG90YWwqMTAwKS8xMDBcbiAgICAgICAgaWYgbG9hZGVkIGlzIHRvdGFsIHRoZW4gY29tcGxldGUodHJ1ZSkgZWxzZSBwcm9ncmVzcyhwZXJjKVxuXG4gIHNyY0Zyb21TdHlsZTogKGVsKSAtPlxuICAgIHN0eWxlID0gZWwuYXR0ciAnc3R5bGUnXG4gICAgdXJsID0gc3R5bGUubWF0Y2goL3VybFxcKCguKilcXCkvKVxuICAgIGlmIHVybCBpc250IG51bGwgYW5kIHVybFsxXSBpc250IHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIHVybFsxXS5yZXBsYWNlKC9cIi9nLCAnJylcbiAgICBlbHNlXG4gICAgICBjb25zb2xlLmxvZyAnRVJST1IgY2Fubm90IGZpbmQgc3R5bGUgZm9yIGVsZW1lbnQnLCBzdHlsZVxuICAgICAgY29uc29sZS5sb2cgdXJsXG4iXX0=
