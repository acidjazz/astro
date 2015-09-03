var Work;

Work = {
  hash: false,
  cproject: false,
  i: function() {
    var project;
    if (Object.keys(projects).indexOf(location.hash.replace('#', '')) !== -1) {
      project = location.hash.replace('#', '');
      Work.cproject = project;
      Work.load(project);
    } else {
      Work.summary();
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Work.handlers();
  },
  handlers: function() {
    $('.projects > .summary > .thumbs > .thumb').on('click', Work.projectHandler);
    $('.projects > .summary > .thumbs > .thumb, .related > .relateds > .thumb').on('click', Work.projectHandler);
    $('.project .filters > .inner > .filtermenu > .filter').on('click', Work.filterHandler);
    return $('.summary .filters > .inner > .filtermenu > .filter').on('click', Work.summaryFilterHandler);
  },
  summaryFilterHandler: function() {
    var copy, filter;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    _.off('.summary .filters > .inner > .filtermenu > .filter');
    _.on(this);
    filter = $(this).text().trim();
    copy = $(this).data('copy');
    $('.summary > .hero > .copy2').text(copy);
    $('.summary > .hero > .copy1').text(filter);
    if (filter === 'all') {
      _.on('.summary > .thumbs > .thumb');
      return true;
    }
    _.off('.summary > .thumbs > .thumb');
    return setTimeout(function() {
      return $('.summary > .thumbs > .thumb').each(function(i, el) {
        var filters;
        filters = $(el).data('filters');
        if (filters.indexOf(filter) !== -1) {
          return _.on($(el));
        } else {
          return _.off($(el));
        }
      });
    }, 200);
  },
  filterHandler: function() {
    var t;
    t = $(this);
    return $('html, body').animate({
      scrollTop: $(".filter_mark.filter_" + (t.html())).offset().top
    }, 500);
  },
  projectHandler: function() {
    var project;
    project = $(this).data('project');
    location.hash = project;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Work.load(project);
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
    $('.summary > .thumbs > .thumb').each(function(i, el) {
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
  load: function(project) {
    var srcs;
    _.off('.project, .summary');
    $('.orbit').addClass("orbit_" + project);
    $('#nprogress .bar').addClass("bar_" + project);
    _.on('.orbit');
    NProgress.start();
    $('#nprogress .bar').addClass("bar_" + project);
    srcs = Work.srcs(project);
    return Global.preload(srcs, function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.orbit');
      _.on(".project_" + project);
      $('.orbit').removeClass(function(index, css) {
        return (css.match(/\borbit_\S+/g) || []).join(' ');
      });
      return $('#nprogress .bar').removeClass(function(index, css) {
        return (css.match(/\bbar__\S+/g) || []).join(' ');
      });
    });
  },
  srcs: function(project) {
    var srcs;
    srcs = [Global.srcFromStyle($(".project_" + project + " > .cover"))];
    $(".project_" + project + " .img").each(function(i, v) {
      return srcs.push(Global.srcFromStyle($(v)));
    });
    return srcs;
  }
};
