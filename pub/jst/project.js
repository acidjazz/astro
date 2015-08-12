var Project;

Project = {
  hash: false,
  i: function() {
    var project;
    NProgress.configure({
      showSpinner: false
    });
    if (Object.keys(projects).indexOf(location.hash.replace('#', '')) !== -1) {
      project = location.hash.replace('#', '');
      Project.load(project);
    } else {
      Project.summary();
    }
    return Project.handlers();
  },
  handlers: function() {
    $('.projects > .summary > .thumbs > .thumb').on('click', Project.projectHandler);
    return $('.top > .inner > .a').on('click', Project.summaryHandler);
  },
  summaryHandler: function() {
    console.log('clicked the A');
    return Project.summary();
  },
  projectHandler: function() {
    var project;
    console.log('clicked a thumb');
    project = $(this).data('project');
    location.hash = project;
    return Project.load(project);
  },
  summary: function() {
    var srcs;
    _.off('.project');
    _.on('.preloader');
    NProgress.start();
    console.log("loading project summaries");
    srcs = [];
    $('.summary > .thumbs > .thumb').each(function(i, el) {
      return srcs.push(Project.srcFromStyle($(el)));
    });
    return Project.preload(srcs, function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.preloader');
      return _.on('.summary');
    });
  },
  load: function(project) {
    var srcs;
    _.off('.project, .summary');
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
    $(".project_" + project + " img").each(function(i, v) {
      return srcs.push($(v).attr('src'));
    });
    console.log('srcs', srcs);
    return srcs;
  },
  srcFromStyle: function(el) {
    var style, url;
    style = el.attr('style');
    url = style.match(/url\("(.*)"\)/);
    return url[1];
  }
};
