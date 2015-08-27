var Contact;

Contact = {
  map: false,
  i: function() {
    var src;
    src = '/img/contact/banner.jpg';
    Global.preload([src], function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.preloader');
      return _.on('.contact > .banner > .inner');
    });
    return Contact.mapbox();
  },
  mapbox: function() {
    L.mapbox.accessToken = accessToken;
    Contact.map = L.mapbox.map('map', mapId);
    Contact.map.touchZoom.disable();
    Contact.map.doubleClickZoom.disable();
    Contact.map.scrollWheelZoom.disable();
    return true;
  }
};
