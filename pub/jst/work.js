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
    $('iframe').each(function(i, el) {
      var src;
      src = $(el).attr('src');
      return $(el).attr('src', src);
    });
    location.hash = '';
    $('.orbit').removeClass(function(index, css) {
      return (css.match(/\borbit_\S+/g) || []).join(' ');
    });
    $('.dbar').removeClass(function(index, css) {
      return (css.match(/\bbar_\S+/g) || []).join(' ');
    });
    _.off('.project');
    _.on('.orbit');
    dbar.i();
    srcs = [];
    $('.summary > .thumbs > .thumb > .inner').each(function(i, el) {
      return srcs.push(Global.srcFromStyle($(el)));
    });
    return Global.preload(srcs, function(progress) {
      return dbar.perc(progress);
    }, function(complete) {
      dbar.d();
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
    $('.dbar').addClass("bar_" + project);
    _.on('.orbit');
    dbar.i();
    $('.dbar').addClass("bar_" + project);
    srcs = Work.srcs(project);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return Global.preload(srcs, function(progress) {
      return dbar.perc(progress);
    }, function(complete) {
      dbar.d();
      _.off('.orbit');
      $(".project img").attr('src', '');
      $(".project_" + project + " img").each(function(i, v) {
        return $(v).attr('src', "/img/work/" + project + "/1440/" + ($(v).data('src')));
      });
      _.on(".project_" + project);
      return setTimeout(function() {
        $('.orbit').removeClass(function(index, css) {
          return (css.match(/\borbit_\S+/g) || []).join(' ');
        });
        return $('.dbar').removeClass(function(index, css) {
          return (css.match(/\bbar_\S+/g) || []).join(' ');
        });
      }, 500);
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

//# sourceMappingURL=data:application/json;base64,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R0FBWSxPQUFaLEdBQW9CLFdBQXRCLENBQXBCLENBQUQ7SUFFUCxDQUFBLENBQUUsV0FBQSxHQUFZLE9BQVosR0FBb0IsTUFBdEIsQ0FBNEIsQ0FBQyxJQUE3QixDQUFrQyxTQUFDLENBQUQsRUFBSSxDQUFKO2FBQ2hDLElBQUksQ0FBQyxJQUFMLENBQVUsWUFBQSxHQUFhLE9BQWIsR0FBcUIsUUFBckIsR0FBNEIsQ0FBQyxDQUFBLENBQUUsQ0FBRixDQUFJLENBQUMsSUFBTCxDQUFVLEtBQVYsQ0FBRCxDQUF0QztJQURnQyxDQUFsQztBQUdBLFdBQU87RUFQSCxDQXRKTiIsImZpbGUiOiJ3b3JrLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiXG5Xb3JrID1cbiAgaGFzaDogZmFsc2VcbiAgY3Byb2plY3Q6IGZhbHNlXG5cbiAgaTogLT5cbiAgICBpZiBPYmplY3Qua2V5cyhwcm9qZWN0cykuaW5kZXhPZihsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCcnKSkgaXNudCAtMVxuICAgICAgcHJvamVjdCA9IGxvY2F0aW9uLmhhc2gucmVwbGFjZSAnIycsICcnXG4gICAgICBXb3JrLmNwcm9qZWN0ID0gcHJvamVjdFxuICAgICAgV29yay5sb2FkIHByb2plY3RcbiAgICBlbHNlXG4gICAgICBXb3JrLnN1bW1hcnkoKVxuXG4gICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMFxuXG4gICAgV29yay5oYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCcucHJvamVjdHMgPiAuc3VtbWFyeSA+IC50aHVtYnMgPiAudGh1bWIsIC5yZWxhdGVkID4gLmlubmVyID4gLnJlbGF0ZWRzID4gLnRodW1iJykub24gJ2NsaWNrJywgV29yay5wcm9qZWN0SGFuZGxlclxuICAgICQoJy5wcm9qZWN0IC5maWx0ZXJzID4gLmlubmVyID4gLmZpbHRlcm1lbnUgPiAuZmlsdGVyJykub24gJ2NsaWNrJywgV29yay5maWx0ZXJIYW5kbGVyXG4gICAgJCgnLnN1bW1hcnkgLmZpbHRlcnMgPiAuaW5uZXIgPiAuZmlsdGVybWVudSA+IC5maWx0ZXInKS5vbiAnY2xpY2snLCBXb3JrLnN1bW1hcnlGaWx0ZXJIYW5kbGVyXG4gICAgJCgnLnByb2plY3QgPiAuZGVzY3JpcHRpb24gPiAuZmlsdGVycyA+IC5maWx0ZXInKS5vbiAnY2xpY2snLCBXb3JrLnByb2plY3RGaWx0ZXJIYW5kbGVyXG4gICAgJCh3aW5kb3cpLm9uICdwb3BzdGF0ZScsIFdvcmsucG9wXG5cbiAgcG9wOiAoZSkgLT5cblxuICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IDBcblxuICAgIGlmIE9iamVjdC5rZXlzKHByb2plY3RzKS5pbmRleE9mKGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsJycpKSBpc250IC0xXG4gICAgICBwcm9qZWN0ID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlICcjJywgJydcbiAgICAgIFdvcmsuY3Byb2plY3QgPSBwcm9qZWN0XG4gICAgICBXb3JrLmxvYWQgcHJvamVjdFxuICAgIGVsc2VcbiAgICAgIFdvcmsuc3VtbWFyeSgpXG4gICAgICBfLm9uICcuc3VtbWFyeSA+IC50aHVtYnMgPiAudGh1bWInXG4gICAgICBfLm9mZiAnLnN1bW1hcnkgPiAuZmlsdGVycyA+IC5pbm5lciA+IC5maWx0ZXJtZW51ID4gLmZpbHRlcidcbiAgICAgIF8ub24gJy5zdW1tYXJ5ID4gLmZpbHRlcnMgPiAuaW5uZXIgPiAuZmlsdGVybWVudSA+IC5maWx0ZXJfYWxsJ1xuXG4gIHByb2plY3RGaWx0ZXJIYW5kbGVyOiAtPlxuXG4gICAgZmlsdGVyID0gJCh0aGlzKS50ZXh0KClcbiAgICBXb3JrLnN1bW1hcnkoZmlsdGVyKVxuXG4gIHN1bW1hcnlGaWx0ZXJIYW5kbGVyOiAtPlxuICAgIGZpbHRlciA9ICQodGhpcykudGV4dCgpLnRyaW0oKVxuICAgIGNvcHkgPSAkKHRoaXMpLmRhdGEgJ2NvcHknXG4gICAgV29yay5zdW1tYXJ5RmlsdGVyIGZpbHRlciwgY29weVxuXG4gIHN1bW1hcnlGaWx0ZXI6IChmaWx0ZXIsIGNvcHkpIC0+XG5cbiAgICAjZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMFxuXG4gICAgXy5vZmYgJy5zdW1tYXJ5IC5maWx0ZXJzID4gLmlubmVyID4gLmZpbHRlcm1lbnUgPiAuZmlsdGVyJ1xuICAgIF8ub24gXCIuc3VtbWFyeSAuZmlsdGVycyA+IC5pbm5lciA+IC5maWx0ZXJtZW51ID4gLmZpbHRlci5maWx0ZXJfI3tmaWx0ZXJ9XCJcblxuICAgICQoJy5zdW1tYXJ5ID4gLmhlcm8gPiAuY29weTInKS50ZXh0IGNvcHkgaWYgY29weVxuXG4gICAgaWYgZmlsdGVyIGlzICdhbGwnXG4gICAgICBfLm9uICcuc3VtbWFyeSA+IC50aHVtYnMgPiAudGh1bWInXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgXy5vZmYgJy5zdW1tYXJ5ID4gLnRodW1icyA+IC50aHVtYidcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAkKCcuc3VtbWFyeSA+IC50aHVtYnMgPiAudGh1bWInKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgICAgZmlsdGVycyA9ICQoZWwpLmRhdGEgJ2ZpbHRlcnMnXG4gICAgICAgIGlmIGZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpIGlzbnQgLTFcbiAgICAgICAgICBfLm9uICQoZWwpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBfLm9mZiAkKGVsKVxuICAgICwgMjAwXG5cbiAgZmlsdGVySGFuZGxlcjogLT5cbiAgICB0ID0gJCB0aGlzXG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG4gICAgICBzY3JvbGxUb3A6ICQoXCIuZmlsdGVyX21hcmsuZmlsdGVyXyN7dC5odG1sKCl9XCIpLm9mZnNldCgpLnRvcFxuICAgICwgNTAwKVxuXG4gIHByb2plY3RIYW5kbGVyOiAtPlxuXG4gICAgcHJvamVjdCA9ICQodGhpcykuZGF0YSAncHJvamVjdCdcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSBudWxsLCBudWxsLCBcIi93b3JrLyMje3Byb2plY3R9XCJcblxuICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IDBcbiAgICBXb3JrLmxvYWQgcHJvamVjdFxuXG4gIHN1bW1hcnk6IChmaWx0ZXIpIC0+XG5cbiAgICAkKCdpZnJhbWUnKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIHNyYyA9ICQoZWwpLmF0dHIgJ3NyYydcbiAgICAgICQoZWwpLmF0dHIgJ3NyYycsIHNyY1xuXG4gICAgbG9jYXRpb24uaGFzaCA9ICcnXG5cbiAgICAkKCcub3JiaXQnKS5yZW1vdmVDbGFzcyAoaW5kZXgsIGNzcykgLT5cbiAgICAgIChjc3MubWF0Y2goL1xcYm9yYml0X1xcUysvZykgb3IgW10pLmpvaW4gJyAnXG4gICAgJCgnLmRiYXInKS5yZW1vdmVDbGFzcyAoaW5kZXgsIGNzcykgLT5cbiAgICAgIChjc3MubWF0Y2goL1xcYmJhcl9cXFMrL2cpIG9yIFtdKS5qb2luICcgJ1xuXG4gICAgXy5vZmYgJy5wcm9qZWN0J1xuICAgIF8ub24gJy5vcmJpdCdcbiAgICBkYmFyLmkoKVxuXG4gICAgc3JjcyA9IFtdXG5cbiAgICAkKCcuc3VtbWFyeSA+IC50aHVtYnMgPiAudGh1bWIgPiAuaW5uZXInKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIHNyY3MucHVzaChHbG9iYWwuc3JjRnJvbVN0eWxlKCQoZWwpKSlcblxuICAgIEdsb2JhbC5wcmVsb2FkIHNyY3MsXG4gICAgICAocHJvZ3Jlc3MpIC0+XG4gICAgICAgIGRiYXIucGVyYyBwcm9ncmVzc1xuICAgICAgLCAoY29tcGxldGUpIC0+XG4gICAgICAgIGRiYXIuZCgpXG4gICAgICAgIF8ub2ZmICcub3JiaXQnXG4gICAgICAgIF8ub24gJy5zdW1tYXJ5J1xuICAgICAgICBXb3JrLnN1bW1hcnlGaWx0ZXIoZmlsdGVyKSBpZiBmaWx0ZXJcblxuICBsb2FkOiAocHJvamVjdCkgLT5cblxuXG4gICAgXy5vZmYgJy5wcm9qZWN0LCAuc3VtbWFyeSdcblxuICAgICQoJy5vcmJpdCcpLmFkZENsYXNzIFwib3JiaXRfI3twcm9qZWN0fVwiXG4gICAgJCgnLmRiYXInKS5hZGRDbGFzcyBcImJhcl8je3Byb2plY3R9XCJcblxuICAgIF8ub24gJy5vcmJpdCdcbiAgICBkYmFyLmkoKVxuICAgICQoJy5kYmFyJykuYWRkQ2xhc3MgXCJiYXJfI3twcm9qZWN0fVwiXG4gICAgc3JjcyA9IFdvcmsuc3JjcyBwcm9qZWN0XG5cbiAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwXG5cbiAgICBHbG9iYWwucHJlbG9hZCBzcmNzLFxuICAgICAgKHByb2dyZXNzKSAtPlxuICAgICAgICBkYmFyLnBlcmMgcHJvZ3Jlc3NcbiAgICAgICwgKGNvbXBsZXRlKSAtPlxuICAgICAgICBkYmFyLmQoKVxuICAgICAgICBfLm9mZiAnLm9yYml0J1xuICAgICAgICAkKFwiLnByb2plY3QgaW1nXCIpLmF0dHIgJ3NyYycsICcnXG5cbiAgICAgICAgJChcIi5wcm9qZWN0XyN7cHJvamVjdH0gaW1nXCIpLmVhY2ggKGksIHYpIC0+XG4gICAgICAgICAgJCh2KS5hdHRyICdzcmMnLCBcIi9pbWcvd29yay8je3Byb2plY3R9LzE0NDAvI3skKHYpLmRhdGEoJ3NyYycpfVwiXG5cbiAgICAgICAgXy5vbiBcIi5wcm9qZWN0XyN7cHJvamVjdH1cIlxuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAgICQoJy5vcmJpdCcpLnJlbW92ZUNsYXNzIChpbmRleCwgY3NzKSAtPlxuICAgICAgICAgICAgKGNzcy5tYXRjaCgvXFxib3JiaXRfXFxTKy9nKSBvciBbXSkuam9pbiAnICdcbiAgICAgICAgICAkKCcuZGJhcicpLnJlbW92ZUNsYXNzIChpbmRleCwgY3NzKSAtPlxuICAgICAgICAgICAgKGNzcy5tYXRjaCgvXFxiYmFyX1xcUysvZykgb3IgW10pLmpvaW4gJyAnXG4gICAgICAgICwgNTAwXG5cbiAgc3JjczogKHByb2plY3QpIC0+XG5cbiAgICBzcmNzID0gW0dsb2JhbC5zcmNGcm9tU3R5bGUoJChcIi5wcm9qZWN0XyN7cHJvamVjdH0gPiAuY292ZXJcIikpXVxuXG4gICAgJChcIi5wcm9qZWN0XyN7cHJvamVjdH0gaW1nXCIpLmVhY2ggKGksIHYpIC0+XG4gICAgICBzcmNzLnB1c2ggXCIvaW1nL3dvcmsvI3twcm9qZWN0fS8xNDQwLyN7JCh2KS5kYXRhKCdzcmMnKX1cIlxuXG4gICAgcmV0dXJuIHNyY3NcblxuXG4iXX0=
