var Blog;

Blog = {
  hash: false,
  centry: false,
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
    return $('.blog > .summary > .thumbs > .thumb, .related > .relateds > .thumb').on('click', Blog.entryHandler);
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
    _.off('.project');
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
