var Work;

Work = {
  hash: false,
  cproject: false,
  i: function() {
    var project;
    if (Object.keys(projects).indexOf(location.hash.replace('#', '')) !== -1) {
      project = location.hash.replace('#', '');
      Work.cproject = project;
      Work.load(project);
    } else {
      Work.summary();
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Work.handlers();
  },
  handlers: function() {
    $('.projects > .summary > .thumbs > .thumb, .related > .inner > .relateds > .thumb').on('click', Work.projectHandler);
    $('.project .filters > .inner > .filtermenu > .filter').on('click', Work.filterHandler);
    $('.summary .filters > .inner > .filtermenu > .filter').on('click', Work.summaryFilterHandler);
    $('.project > .description > .filters > .filter').on('click', Work.projectFilterHandler);
    return $(window).on('popstate', Work.pop);
  },
  pop: function(e) {
    var project;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (Object.keys(projects).indexOf(location.hash.replace('#', '')) !== -1) {
      project = location.hash.replace('#', '');
      Work.cproject = project;
      return Work.load(project);
    } else {
      Work.summary();
      _.on('.summary > .thumbs > .thumb');
      _.off('.summary > .filters > .inner > .filtermenu > .filter');
      return _.on('.summary > .filters > .inner > .filtermenu > .filter_all');
    }
  },
  projectFilterHandler: function() {
    var filter;
    filter = $(this).text();
    return Work.summary(filter);
  },
  summaryFilterHandler: function() {
    var copy, filter;
    filter = $(this).text().trim();
    copy = $(this).data('copy');
    return Work.summaryFilter(filter, copy);
  },
  summaryFilter: function(filter, copy) {
    _.off('.summary .filters > .inner > .filtermenu > .filter');
    _.on(".summary .filters > .inner > .filtermenu > .filter.filter_" + filter);
    if (copy) {
      $('.summary > .hero > .copy2').text(copy);
    }
    if (filter === 'all') {
      _.on('.summary > .thumbs > .thumb');
      return true;
    }
    _.off('.summary > .thumbs > .thumb');
    return setTimeout(function() {
      return $('.summary > .thumbs > .thumb').each(function(i, el) {
        var filters;
        filters = $(el).data('filters');
        if (filters.indexOf(filter) !== -1) {
          return _.on($(el));
        } else {
          return _.off($(el));
        }
      });
    }, 200);
  },
  filterHandler: function() {
    var t;
    t = $(this);
    return $('html, body').animate({
      scrollTop: $(".filter_mark.filter_" + (t.html())).offset().top
    }, 500);
  },
  projectHandler: function() {
    var project;
    project = $(this).data('project');
    history.pushState(null, null, "/work/#" + project);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Work.load(project);
  },
  summary: function(filter) {
    var srcs;
    location.hash = '';
    $('.orbit').removeClass(function(index, css) {
      return (css.match(/\borbit_\S+/g) || []).join(' ');
    });
    $('#nprogress .bar').removeClass(function(index, css) {
      return (css.match(/\bbar__\S+/g) || []).join(' ');
    });
    _.off('.project');
    _.on('.orbit');
    NProgress.start();
    srcs = [];
    $('.summary > .thumbs > .thumb > .inner').each(function(i, el) {
      return srcs.push(Global.srcFromStyle($(el)));
    });
    return Global.preload(srcs, function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.orbit');
      _.on('.summary');
      if (filter) {
        return Work.summaryFilter(filter);
      }
    });
  },
  load: function(project) {
    var srcs;
    _.off('.project, .summary');
    $('.orbit').addClass("orbit_" + project);
    $('#nprogress .bar').addClass("bar_" + project);
    _.on('.orbit');
    NProgress.start();
    $('#nprogress .bar').addClass("bar_" + project);
    srcs = Work.srcs(project);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Global.preload(srcs, function(progress) {
      return NProgress.set(progress);
    }, function(complete) {
      NProgress.done();
      _.off('.orbit');
      $(".project img").attr('src', '');
      $(".project_" + project + " img").each(function(i, v) {
        return $(v).attr('src', "/img/work/" + project + "/1440/" + ($(v).data('src')));
      });
      _.on(".project_" + project);
      $('.orbit').removeClass(function(index, css) {
        return (css.match(/\borbit_\S+/g) || []).join(' ');
      });
      return $('#nprogress .bar').removeClass(function(index, css) {
        return (css.match(/\bbar__\S+/g) || []).join(' ');
      });
    });
  },
  srcs: function(project) {
    var srcs;
    srcs = [Global.srcFromStyle($(".project_" + project + " > .cover"))];
    $(".project_" + project + " img").each(function(i, v) {
      return srcs.push("/img/work/" + project + "/1440/" + ($(v).data('src')));
    });
    return srcs;
  }
};

//# sourceMappingURL=data:application/json;base64,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Q0FBRCxDQUF0QztJQURnQyxDQUFsQztBQUdBLFdBQU87RUFQSCxDQS9JTiIsImZpbGUiOiJ3b3JrLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiXG5Xb3JrID1cbiAgaGFzaDogZmFsc2VcbiAgY3Byb2plY3Q6IGZhbHNlXG5cbiAgaTogLT5cblxuICAgIGlmIE9iamVjdC5rZXlzKHByb2plY3RzKS5pbmRleE9mKGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsJycpKSBpc250IC0xXG4gICAgICBwcm9qZWN0ID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlICcjJywgJydcbiAgICAgIFdvcmsuY3Byb2plY3QgPSBwcm9qZWN0XG4gICAgICBXb3JrLmxvYWQgcHJvamVjdFxuICAgIGVsc2VcbiAgICAgIFdvcmsuc3VtbWFyeSgpXG5cbiAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwXG5cbiAgICBXb3JrLmhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJy5wcm9qZWN0cyA+IC5zdW1tYXJ5ID4gLnRodW1icyA+IC50aHVtYiwgLnJlbGF0ZWQgPiAuaW5uZXIgPiAucmVsYXRlZHMgPiAudGh1bWInKS5vbiAnY2xpY2snLCBXb3JrLnByb2plY3RIYW5kbGVyXG4gICAgJCgnLnByb2plY3QgLmZpbHRlcnMgPiAuaW5uZXIgPiAuZmlsdGVybWVudSA+IC5maWx0ZXInKS5vbiAnY2xpY2snLCBXb3JrLmZpbHRlckhhbmRsZXJcbiAgICAkKCcuc3VtbWFyeSAuZmlsdGVycyA+IC5pbm5lciA+IC5maWx0ZXJtZW51ID4gLmZpbHRlcicpLm9uICdjbGljaycsIFdvcmsuc3VtbWFyeUZpbHRlckhhbmRsZXJcbiAgICAkKCcucHJvamVjdCA+IC5kZXNjcmlwdGlvbiA+IC5maWx0ZXJzID4gLmZpbHRlcicpLm9uICdjbGljaycsIFdvcmsucHJvamVjdEZpbHRlckhhbmRsZXJcbiAgICAkKHdpbmRvdykub24gJ3BvcHN0YXRlJywgV29yay5wb3BcblxuICBwb3A6IChlKSAtPlxuXG4gICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMFxuXG4gICAgaWYgT2JqZWN0LmtleXMocHJvamVjdHMpLmluZGV4T2YobG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywnJykpIGlzbnQgLTFcbiAgICAgIHByb2plY3QgPSBsb2NhdGlvbi5oYXNoLnJlcGxhY2UgJyMnLCAnJ1xuICAgICAgV29yay5jcHJvamVjdCA9IHByb2plY3RcbiAgICAgIFdvcmsubG9hZCBwcm9qZWN0XG4gICAgZWxzZVxuICAgICAgV29yay5zdW1tYXJ5KClcbiAgICAgIF8ub24gJy5zdW1tYXJ5ID4gLnRodW1icyA+IC50aHVtYidcbiAgICAgIF8ub2ZmICcuc3VtbWFyeSA+IC5maWx0ZXJzID4gLmlubmVyID4gLmZpbHRlcm1lbnUgPiAuZmlsdGVyJ1xuICAgICAgXy5vbiAnLnN1bW1hcnkgPiAuZmlsdGVycyA+IC5pbm5lciA+IC5maWx0ZXJtZW51ID4gLmZpbHRlcl9hbGwnXG5cbiAgcHJvamVjdEZpbHRlckhhbmRsZXI6IC0+XG5cbiAgICBmaWx0ZXIgPSAkKHRoaXMpLnRleHQoKVxuICAgIFdvcmsuc3VtbWFyeShmaWx0ZXIpXG5cbiAgc3VtbWFyeUZpbHRlckhhbmRsZXI6IC0+XG4gICAgZmlsdGVyID0gJCh0aGlzKS50ZXh0KCkudHJpbSgpXG4gICAgY29weSA9ICQodGhpcykuZGF0YSAnY29weSdcbiAgICBXb3JrLnN1bW1hcnlGaWx0ZXIgZmlsdGVyLCBjb3B5XG5cbiAgc3VtbWFyeUZpbHRlcjogKGZpbHRlciwgY29weSkgLT5cblxuICAgICNkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwXG5cbiAgICBfLm9mZiAnLnN1bW1hcnkgLmZpbHRlcnMgPiAuaW5uZXIgPiAuZmlsdGVybWVudSA+IC5maWx0ZXInXG4gICAgXy5vbiBcIi5zdW1tYXJ5IC5maWx0ZXJzID4gLmlubmVyID4gLmZpbHRlcm1lbnUgPiAuZmlsdGVyLmZpbHRlcl8je2ZpbHRlcn1cIlxuXG4gICAgJCgnLnN1bW1hcnkgPiAuaGVybyA+IC5jb3B5MicpLnRleHQgY29weSBpZiBjb3B5XG5cbiAgICBpZiBmaWx0ZXIgaXMgJ2FsbCdcbiAgICAgIF8ub24gJy5zdW1tYXJ5ID4gLnRodW1icyA+IC50aHVtYidcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBfLm9mZiAnLnN1bW1hcnkgPiAudGh1bWJzID4gLnRodW1iJ1xuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICQoJy5zdW1tYXJ5ID4gLnRodW1icyA+IC50aHVtYicpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgICBmaWx0ZXJzID0gJChlbCkuZGF0YSAnZmlsdGVycydcbiAgICAgICAgaWYgZmlsdGVycy5pbmRleE9mKGZpbHRlcikgaXNudCAtMVxuICAgICAgICAgIF8ub24gJChlbClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIF8ub2ZmICQoZWwpXG4gICAgLCAyMDBcblxuICBmaWx0ZXJIYW5kbGVyOiAtPlxuICAgIHQgPSAkIHRoaXNcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcbiAgICAgIHNjcm9sbFRvcDogJChcIi5maWx0ZXJfbWFyay5maWx0ZXJfI3t0Lmh0bWwoKX1cIikub2Zmc2V0KCkudG9wXG4gICAgLCA1MDApXG5cbiAgcHJvamVjdEhhbmRsZXI6IC0+XG5cbiAgICBwcm9qZWN0ID0gJCh0aGlzKS5kYXRhICdwcm9qZWN0J1xuICAgIGhpc3RvcnkucHVzaFN0YXRlIG51bGwsIG51bGwsIFwiL3dvcmsvIyN7cHJvamVjdH1cIlxuXG4gICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMFxuICAgIFdvcmsubG9hZCBwcm9qZWN0XG5cbiAgc3VtbWFyeTogKGZpbHRlcikgLT5cbiAgICBsb2NhdGlvbi5oYXNoID0gJydcblxuICAgICQoJy5vcmJpdCcpLnJlbW92ZUNsYXNzIChpbmRleCwgY3NzKSAtPlxuICAgICAgKGNzcy5tYXRjaCgvXFxib3JiaXRfXFxTKy9nKSBvciBbXSkuam9pbiAnICdcbiAgICAkKCcjbnByb2dyZXNzIC5iYXInKS5yZW1vdmVDbGFzcyAoaW5kZXgsIGNzcykgLT5cbiAgICAgIChjc3MubWF0Y2goL1xcYmJhcl9fXFxTKy9nKSBvciBbXSkuam9pbiAnICdcblxuICAgIF8ub2ZmICcucHJvamVjdCdcbiAgICBfLm9uICcub3JiaXQnXG4gICAgTlByb2dyZXNzLnN0YXJ0KClcblxuICAgIHNyY3MgPSBbXVxuXG4gICAgJCgnLnN1bW1hcnkgPiAudGh1bWJzID4gLnRodW1iID4gLmlubmVyJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmNzLnB1c2goR2xvYmFsLnNyY0Zyb21TdHlsZSgkKGVsKSkpXG5cbiAgICBHbG9iYWwucHJlbG9hZCBzcmNzLFxuICAgICAgKHByb2dyZXNzKSAtPlxuICAgICAgICBOUHJvZ3Jlc3Muc2V0IHByb2dyZXNzXG4gICAgICAsIChjb21wbGV0ZSkgLT5cbiAgICAgICAgTlByb2dyZXNzLmRvbmUoKVxuICAgICAgICBfLm9mZiAnLm9yYml0J1xuICAgICAgICBfLm9uICcuc3VtbWFyeSdcbiAgICAgICAgV29yay5zdW1tYXJ5RmlsdGVyKGZpbHRlcikgaWYgZmlsdGVyXG5cbiAgbG9hZDogKHByb2plY3QpIC0+XG4gICAgXy5vZmYgJy5wcm9qZWN0LCAuc3VtbWFyeSdcblxuICAgICQoJy5vcmJpdCcpLmFkZENsYXNzIFwib3JiaXRfI3twcm9qZWN0fVwiXG4gICAgJCgnI25wcm9ncmVzcyAuYmFyJykuYWRkQ2xhc3MgXCJiYXJfI3twcm9qZWN0fVwiXG5cbiAgICBfLm9uICcub3JiaXQnXG5cbiAgICBOUHJvZ3Jlc3Muc3RhcnQoKVxuICAgICQoJyNucHJvZ3Jlc3MgLmJhcicpLmFkZENsYXNzIFwiYmFyXyN7cHJvamVjdH1cIlxuICAgIHNyY3MgPSBXb3JrLnNyY3MgcHJvamVjdFxuXG4gICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMFxuXG4gICAgR2xvYmFsLnByZWxvYWQgc3JjcyxcbiAgICAgIChwcm9ncmVzcykgLT5cbiAgICAgICAgTlByb2dyZXNzLnNldCBwcm9ncmVzc1xuICAgICAgLCAoY29tcGxldGUpIC0+XG4gICAgICAgIE5Qcm9ncmVzcy5kb25lKClcbiAgICAgICAgXy5vZmYgJy5vcmJpdCdcbiAgICAgICAgJChcIi5wcm9qZWN0IGltZ1wiKS5hdHRyICdzcmMnLCAnJ1xuXG4gICAgICAgICQoXCIucHJvamVjdF8je3Byb2plY3R9IGltZ1wiKS5lYWNoIChpLCB2KSAtPlxuICAgICAgICAgICQodikuYXR0ciAnc3JjJywgXCIvaW1nL3dvcmsvI3twcm9qZWN0fS8xNDQwLyN7JCh2KS5kYXRhKCdzcmMnKX1cIlxuXG4gICAgICAgIF8ub24gXCIucHJvamVjdF8je3Byb2plY3R9XCJcblxuICAgICAgICAkKCcub3JiaXQnKS5yZW1vdmVDbGFzcyAoaW5kZXgsIGNzcykgLT5cbiAgICAgICAgICAoY3NzLm1hdGNoKC9cXGJvcmJpdF9cXFMrL2cpIG9yIFtdKS5qb2luICcgJ1xuICAgICAgICAkKCcjbnByb2dyZXNzIC5iYXInKS5yZW1vdmVDbGFzcyAoaW5kZXgsIGNzcykgLT5cbiAgICAgICAgICAoY3NzLm1hdGNoKC9cXGJiYXJfX1xcUysvZykgb3IgW10pLmpvaW4gJyAnXG5cbiAgc3JjczogKHByb2plY3QpIC0+XG5cbiAgICBzcmNzID0gW0dsb2JhbC5zcmNGcm9tU3R5bGUoJChcIi5wcm9qZWN0XyN7cHJvamVjdH0gPiAuY292ZXJcIikpXVxuXG4gICAgJChcIi5wcm9qZWN0XyN7cHJvamVjdH0gaW1nXCIpLmVhY2ggKGksIHYpIC0+XG4gICAgICBzcmNzLnB1c2ggXCIvaW1nL3dvcmsvI3twcm9qZWN0fS8xNDQwLyN7JCh2KS5kYXRhKCdzcmMnKX1cIlxuXG4gICAgcmV0dXJuIHNyY3NcblxuXG4iXX0=
