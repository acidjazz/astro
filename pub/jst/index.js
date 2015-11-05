var Index;

Index = {
  lineKey: 0,
  lineInterval: false,
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
    Index.handlers();
    if (Index.lineInterval !== false) {
      clearInterval(Index.lineInterval);
    }
    return Index.lineInterval = setInterval(Index.lineRotate, 5000);
  },
  handlers: function() {
    $('.lines > .line').on('click', Index.lineHandler);
    return $('.projects > .thumb').on('click', Index.grid);
  },
  lineRotate: function() {
    if (Index.lineKey === 3) {
      return Index.line(0);
    } else {
      return Index.line(Index.lineKey + 1);
    }
  },
  lineHandler: function() {
    var t;
    t = $(this);
    Index.line(t.data('key'));
    clearInterval(Index.lineInterval);
    Index.lineInterval = setInterval(Index.lineRotate, 5000);
    return console.log('interval reset');
  },
  line: function(key) {
    var src;
    Index.lineKey = key;
    src = Global.srcFromStyle($(".featureds > .inner > .featured:nth-child(" + (key + 1) + ")"));
    NProgress.start();
    return Global.preload([src], function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.featureds > .inner > .featured');
      _.on(".featureds > .inner > .featured:nth-child(" + (key + 1) + ")");
      _.off('.lines > .line');
      return _.on(".line_" + key);
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
