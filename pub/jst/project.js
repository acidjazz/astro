var Project;

Project = {
  i: function() {
    var srcs;
    srcs = Project.srcs('versus');
    console.log(srcs);
    return Project.preload(srcs, function(progress) {
      return console.log('progress', progress);
    }, function(complete) {
      console.log('complete', complete);
      return _.on('.project_versus');
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
        perc = Math.round(loaded / total * 10) / 10;
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
      console.log($(v).attr('src'));
      return srcs.push($(v).attr('src'));
    });
    return srcs;
  }
};
