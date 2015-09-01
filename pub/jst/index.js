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
      return _.on('.triangles');
    });
    return Index.handlers();
  },
  handlers: function() {
    return $('.triangles > .triangle').on('click', Index.triangle);
  },
  triangle: function() {
    var key, src;
    key = $(this).data('key');
    src = Global.srcFromStyle($(".featureds > .inner > .featured:nth-child(" + (key + 1) + ")"));
    NProgress.start();
    return Global.preload([src], function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.featureds > .inner > .featured');
      return _.on(".featureds > .inner > .featured:nth-child(" + (key + 1) + ")");
    });
  }
};
