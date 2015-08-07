var Project;

Project = {
  hash: false,
  i: function() {
    var project;
    NProgress.configure({
      showSpinner: false
    });
    project = 'versus';
    if (Object.keys(projects).indexOf(location.hash.replace('#', '')) !== -1) {
      project = location.hash.replace('#', '');
    }
    return Project.load(project);
  },
  load: function(project) {
    var srcs;
    _.off('.project');
    _.on('.preloader');
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
    var cover, srcs, url;
    cover = $(".project_" + project + " > .cover").attr('style');
    url = cover.match(/url\("(.*)"\)/);
    srcs = [url[1]];
    $(".project_" + project + " img").each(function(i, v) {
      return srcs.push($(v).attr('src'));
    });
    return srcs;
  }
};
