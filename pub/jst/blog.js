var Blog;

Blog = {
  hash: false,
  centry: false,
  title: false,
  i: function() {
    var entry;
    if (Object.keys(entries).indexOf(location.hash.replace('#', '')) !== -1) {
      entry = location.hash.replace('#', '');
      Blog.centry = entry;
      Blog.load(entry);
    } else {
      Blog.summary();
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Blog.handlers();
  },
  handlers: function() {
    $('.blog > .summary > .thumbs > .thumb').on('click', Blog.entryHandler);
    $('.blog > .summary > .thumbs > .thumb, .related > .relateds > .thumb').on('click', Blog.entryHandler);
    $('.entry > .details > .tags a').on('click', Blog.tagHandler);
    $('.entry > .details > .author a').on('click', Blog.authorHandler);
    $('.entry > .details > .shares > .share').on('click', Blog.share);
    $('.blog > .summary > .crumb > .close').on('click', Blog.filterReset);
    return $(window).on('popstate', Blog.pop);
  },
  pop: function(e) {
    var entry;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (Object.keys(entries).indexOf(location.hash.replace('#', '')) !== -1) {
      entry = location.hash.replace('#', '');
      Blog.centry = entry;
      return Blog.load(entry);
    } else {
      return Blog.summary();
    }
  },
  share: function() {
    var i, t, type;
    t = $(this);
    type = t.data('type');
    if (type === 'link') {
      _.swap('.share_url');
      _.swap(t);
      i = t.parent().find('.share_url input').first();
      i.val(location.href);
      i[0].setSelectionRange(0, i[0].value.length);
      return true;
    }
    if (type === 'facebook') {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + location.href, 'Share on Facebook', 'width=626,height=438');
      return true;
    }
    if (type === 'twitter') {
      window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(location.href) + '&text=' + encodeURIComponent(Blog.title), 'Share on Twitter', 'width=626,height=438');
      return true;
    }
  },
  filterReset: function() {
    var entry;
    _.off('.crumb');
    _.on('.thumb');
    entry = location.hash = '';
    return Blog.summary();
  },
  tagHandler: function() {
    var tag;
    tag = $(this).text();
    return Blog.tagFilter(tag);
  },
  authorHandler: function() {
    var tag;
    tag = $(this).text();
    return Blog.authorFilter(tag);
  },
  authorFilter: function(author) {
    Blog.summary();
    _.on('.crumb');
    $('.crumb > .copy > span.desc').text('Posts by ');
    $('.crumb > .copy > span.value').text(author);
    return $('.summary > .thumbs > .thumb').each(function(i, el) {
      if (author === $(el).data('author')) {
        return _.on($(el));
      } else {
        return _.off($(el));
      }
    });
  },
  tagFilter: function(tag) {
    Blog.summary();
    _.on('.crumb');
    $('.crumb > .copy > span.desc').text('Filtering by ');
    $('.crumb > .copy > span.value').text(tag);
    return $('.summary > .thumbs > .thumb').each(function(i, el) {
      var tags;
      tags = $(el).data('tags');
      console.log(tags);
      if (tags.indexOf(tag) !== -1) {
        return _.on($(el));
      } else {
        return _.off($(el));
      }
    });
  },
  entryHandler: function() {
    var entry;
    entry = $(this).data('entry');
    location.hash = entry;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Blog.load(entry);
  },
  summary: function() {
    var srcs;
    location.hash = '';
    $('.orbit').removeClass(function(index, css) {
      return (css.match(/\borbit_\S+/g) || []).join(' ');
    });
    $('#nprogress .bar').removeClass(function(index, css) {
      return (css.match(/\bbar__\S+/g) || []).join(' ');
    });
    _.off('.entry');
    _.on('.orbit');
    NProgress.start();
    srcs = [];
    $('.summary > .thumbs > .thumb > .inner').each(function(i, el) {
      return srcs.push(Global.srcFromStyle($(el)));
    });
    return Global.preload(srcs, function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.orbit');
      return _.on('.summary');
    });
  },
  load: function(entry) {
    var srcs;
    _.off('.entry, .summary');
    $('.orbit').addClass("orbit_" + entry);
    $('#nprogress .bar').addClass("bar_" + entry);
    _.on('.orbit');
    NProgress.start();
    $('#nprogress .bar').addClass("bar_" + entry);
    srcs = Blog.srcs(entry);
    return Global.preload(srcs, function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.orbit');
      _.on(".entry_" + entry);
      Blog.title = $(".entry_" + entry + " > .details > .copy > .name").text();
      $('.orbit').removeClass(function(index, css) {
        return (css.match(/\borbit_\S+/g) || []).join(' ');
      });
      return $('#nprogress .bar').removeClass(function(index, css) {
        return (css.match(/\bbar__\S+/g) || []).join(' ');
      });
    });
  },
  srcs: function(entry) {
    var srcs;
    srcs = [Global.srcFromStyle($(".entry_" + entry + " > .cover"))];
    $(".entry_" + entry + " .img").each(function(i, v) {
      return srcs.push(Global.srcFromStyle($(v)));
    });
    return srcs;
  }
};
