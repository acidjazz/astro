var Project;

Project = {
  hash: false,
  cproject: false,
  i: function() {
    var project;
    NProgress.configure({
      showSpinner: false
    });
    if (Object.keys(projects).indexOf(location.hash.replace('#', '')) !== -1) {
      project = location.hash.replace('#', '');
      Project.cproject = project;
      Project.load(project);
    } else {
      Project.summary();
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Project.handlers();
  },
  handlers: function() {
    $('.projects > .summary > .thumbs > .thumb').on('click', Project.projectHandler);
    $('.projects > .summary > .thumbs > .thumb, .related > .relateds > .thumb').on('click', Project.projectHandler);
    $('.top > .inner > .a').on('click', Project.summaryHandler);
    return $('.project > .filters > .inner > .filtermenu > .filter').on('click', Project.filterHandler);
  },
  filterHandler: function() {
    var t;
    t = $(this);
    console.log(t.html());
    return $('html, body').animate({
      scrollTop: $(".filter_mark.filter_" + (t.html())).offset().top
    }, 500);
  },
  summaryHandler: function() {
    location.hash = '';
    return Project.summary();
  },
  projectHandler: function() {
    var project;
    project = $(this).data('project');
    location.hash = project;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Project.load(project);
  },
  summary: function() {
    var key, oproject, srcs;
    for (oproject in projects) {
      key = projects[oproject];
      $('.preloader').removeClass("preloader_" + key);
    }
    _.off('.project');
    _.on('.preloader');
    NProgress.start();
    srcs = [];
    $('.summary > .thumbs > .thumb').each(function(i, el) {
      return srcs.push(Project.srcFromStyle($(el)));
    });
    console.log(srcs);
    return Project.preload(srcs, function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.preloader');
      return _.on('.summary');
    });
  },
  load: function(project) {
    var key, oproject, srcs;
    _.off('.project, .summary');
    for (oproject in projects) {
      key = projects[oproject];
      $('.preloader').removeClass("preloader_" + key);
    }
    $('.preloader').addClass("preloader_" + project);
    _.on('.preloader');
    console.log("loading project " + project);
    NProgress.start();
    srcs = Project.srcs(project);
    return Project.preload(srcs, function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.preloader');
      return _.on(".project_" + project);
    });
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
  srcs: function(project) {
    var srcs;
    srcs = [Project.srcFromStyle($(".project_" + project + " > .cover"))];
    $(".project_" + project + " .img").each(function(i, v) {
      return srcs.push(Project.srcFromStyle($(v)));
    });
    return srcs;
  },
  srcFromStyle: function(el) {
    var style, url;
    style = el.attr('style');
    url = style.match(/url\("(.*)"\)/);
    return url[1];
  }
};
