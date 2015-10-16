var Index;

Index = {
  i: function() {
    var src;
    console.log('Index.i()');
    src = Global.srcFromStyle($('.featureds > .inner > .featured:first-child'));
    NProgress.start();
    Global.preload([src], function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.orbit');
      return _.on('.lines');
    });
    return Index.handlers();
  },
  handlers: function() {
    $('.lines > .line').on('click', Index.line);
    return $('.projects > .thumb').on('click', Index.grid);
  },
  line: function() {
    var key, src, t;
    t = $(this);
    key = t.data('key');
    src = Global.srcFromStyle($(".featureds > .inner > .featured:nth-child(" + (key + 1) + ")"));
    NProgress.start();
    return Global.preload([src], function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.featureds > .inner > .featured');
      _.on(".featureds > .inner > .featured:nth-child(" + (key + 1) + ")");
      _.off('.lines > .line');
      return _.on(t);
    });
  },
  grid: function() {
    var folder, t, type;
    t = $(this);
    type = t.data('type');
    folder = t.data('folder');
    if (type === 'work') {
      location.href = '/work/#' + folder;
    }
    if (type === 'blog') {
      return location.href = '/blog/#' + folder;
    }
  }
};
