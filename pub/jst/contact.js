var Contact;

Contact = {
  i: function() {
    var src;
    src = '/img/contact/banner.jpg';
    return Global.preload([src], function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.preloader');
      return _.on('.contact > .banner > .inner');
    });
  }
};
