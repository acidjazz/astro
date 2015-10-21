var About;

About = {
  jobs: false,
  hsbpdInterval: false,
  hsbpdSection: 'holistic',
  cache: {},
  i: function() {
    _.off('.orbit');
    About.cache.hsbpd = $('.hsbpd');
    About.cache.blocks = $('.blocks');
    About.cache.blocksp = $('.blocksp');
    About.handlers();
    if (location.hash !== "") {
      return About.menu(location.hash.replace('#', ''));
    }
  },
  handlers: function() {
    $('.hsbpd > .dots > .dot').on('click', About.hsbpdHandler);
    $('.capcenter > .capmenu > .cap').on('click', About.capcenter);
    $('.fived > .fivedmenu > .item').on('click', About.fived);
    $('.about > .fcontainer > .filters > .inner > .filtermenu > .filter').on('click', About.menuHandler);
    $('.about > .sections > .section_careers').on('click', '.jobs > .job', About.jobHandler);
    return About.hsbpdInterval = setInterval(function() {
      return About.hsbpdCheck();
    }, 10);
  },
  menuHandler: function() {
    var section;
    section = $(this).html().trim();
    return About.menu(section);
  },
  menu: function(section) {
    location.hash = section;
    if (section === 'careers' && About.jobs === false) {
      Loader.load('https://api.greenhouse.io/v1/boards/astrostudios/embed/jobs?callback=About.joblist');
    }
    _.off('.about > .fcontainer > .filters > .inner > .filtermenu > .filter', '.sections > .section');
    _.on(".fcontainer > .filters > .inner > .filtermenu > .filter.filter_" + section, ".sections > .section.section_" + section);
    return $('html, body').animate({
      scrollTop: $(".sections").offset().top - 64
    }, 1000);
  },
  hsbpdCheck: function() {
    var b, i, j, len, results, section, sections, st, t, threshold, top;
    st = $(window).scrollTop();
    console.log(st);
    top = 1386;
    threshold = 631;
    if (st >= top && !About.cache.hsbpd.hasClass('fixed')) {
      About.cache.hsbpd.addClass('fixed').removeClass('bottom');
      About.cache.blocks.addClass('fixed');
      About.cache.blocksp.removeClass('off').addClass('on');
    }
    if (st < top && About.cache.hsbpd.hasClass('fixed')) {
      About.cache.hsbpd.removeClass('fixed').removeClass('bottom');
      About.cache.blocks.removeClass('fixed');
      About.cache.blocksp.removeClass('on').addClass('off');
    }
    if (st >= (top + (threshold * 5))) {
      About.cache.hsbpd.removeClass('fixed').addClass('bottom');
    }
    if (st < top) {
      return true;
    }
    sections = ['holistic', 'strategy', 'brand', 'product', 'digital'];
    results = [];
    for (i = j = 0, len = sections.length; j < len; i = ++j) {
      section = sections[i];
      t = top + ((i + 0) * threshold);
      b = top + ((i + 1) * threshold);
      if (st > t && st < b && About.hsbpdSection !== section) {
        results.push(About.hsbpd(section));
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  hsbpdHandler: function() {
    var section;
    section = $(this).data('section');
    return About.hsbpd(section);
  },
  hsbpd: function(section) {
    About.hsbpdSection = section;
    $('.hsbpd > .slide.on').addClass('offing').removeClass('on');
    _.on(".hsbpd > .slide.slide_" + section[0]);
    setTimeout(function() {
      _.off('.hsbpd > .slide.offing');
      return $('.hsbpd > .slide.offing').removeClass('offing');
    }, 3000);
    _.off('.hsbpd > .dots > .dot');
    return _.on(".hsbpd > .dots > .dot_" + section);
  },
  capcenter: function() {
    var cap;
    cap = $(this).html().trim();
    _.off('.capcenter > .capmenu > .cap', '.capcenter > .descs > .desc');
    return _.on(this, ".capcenter > .descs > .desc_" + cap);
  },
  fived: function() {
    var item;
    item = $(this).find('.copy > .name').html().trim();
    _.off('.fived > .fivedmenu > .item', '.fived > .bodys > .body');
    return _.on(this, ".fived > .bodys > .body_" + item);
  },
  jobHandler: function() {
    var t;
    t = $(this);
    if (t.hasClass('on')) {
      return _.off(t);
    }
    _.off('.about > .sections > .section_careers > .jobs > .job');
    return _.on(this);
  },
  joblist: function(data) {
    var count, j, job, len, ref, results, total;
    About.jobs = {};
    total = Object.keys(data.jobs).length;
    count = 0;
    ref = data.jobs;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      job = ref[j];
      results.push($.ajax({
        url: "https://api.greenhouse.io/v1/boards/astrostudios/embed/job?id=" + job.id + "?callback=About.job",
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonpCallback: 'About.job',
        complete: function(response) {
          count++;
          if (count === total) {
            return About.jobulate();
          }
        }
      }));
    }
    return results;
  },
  job: function(job) {
    return About.jobs[job.id] = job;
  },
  jobulate: function() {
    var apply, content, el, id, job, jobsEl, ref, results;
    jobsEl = $('.jobs');
    ref = About.jobs;
    results = [];
    for (id in ref) {
      job = ref[id];
      el = $("<div class='job off'><div class='title'>" + job.title + "</div><div class='content'></div></div>");
      content = el.find('.content');
      content.html($('<div/>').html(job.content).text());
      apply = $("<a href='" + job.absolute_url + "' target='_new' class='apply'>Apply Now</a>");
      content.append(apply);
      results.push(jobsEl.append(el));
    }
    return results;
  }
};
