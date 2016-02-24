var Index;

Index = {
  lineKey: 0,
  lineInterval: false,
  i: function() {
    var src;
    console.log('Index.i()');
    src = Global.srcFromStyle($('.featureds > .inner > .featured:first-child'));
    dbar.i();
    console.log(src);
    Global.preload([src], function(progress) {
      return dbar.perc(progress);
    }, function(complete) {
      dbar.d();
      _.off('.orbit');
      return _.on('.lines');
    });
    Index.handlers();
    if (Index.lineInterval !== false) {
      clearInterval(Index.lineInterval);
    }
    Index.lineInterval = setInterval(Index.lineRotate, 4000);
    return Index.instagram.load();
  },
  handlers: function() {
    $('.lines > .line').on('click', Index.lineHandler);
    $('.featureds').on('click', Index.featuredHandler);
    return $('.projects > .thumb').on('click', Index.grid);
  },
  instagram: {
    endpoint: 'https://api.instagram.com/v1/users/self/media/recent/',
    token: '264367793.55cd6c3.ae227ede2f5c48eaab95ca57ffc4c0f6',
    loaded: false,
    posts: 6,
    load: function() {
      Loader.load(Index.instagram.endpoint + "?access_token=" + Index.instagram.token + "&callback=Index.instagram.callback");
      return Index.instagram.loaded = true;
    },
    callback: function(json) {
      var i, index, len, post, ref;
      console.log(json);
      ref = json.data;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        post = ref[index];
        if (index === Index.instagram.posts) {
          $('.instagram').append('<div class="clear"></div>');
        }
        if (index === Index.instagram.posts) {
          return true;
        }
        $('.instagram').append("\n<a href=\"" + post.link + "\" target=\"_new\" class=\"post\">\n  <img src=\"" + post.images.standard_resolution.url + "\" />\n</a>");
      }
    }
  },
  lineRotate: function() {
    if (Index.lineKey === ($('.featureds > .inner > .featured').length - 1)) {
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
  featuredHandler: function() {
    var link;
    link = $(".line_" + Index.lineKey).data('link');
    return location.href = link;
  },
  line: function(key) {
    var src;
    Index.lineKey = key;
    src = Global.srcFromStyle($(".featureds > .inner > .featured:nth-child(" + (key + 1) + ")"));
    dbar.i();
    return Global.preload([src], function(progress) {
      return dbar.perc(progress);
    }, function(complete) {
      dbar.d();
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

//# sourceMappingURL=data:application/json;base64,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RDtNQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sZ0JBQU47YUFDQSxDQUFDLENBQUMsRUFBRixDQUFLLFFBQUEsR0FBUyxHQUFkO0lBTEEsQ0FIRjtFQVBJLENBM0VOO0VBNEZBLElBQUEsRUFBTSxTQUFBO0FBRUosUUFBQTtJQUFBLENBQUEsR0FBSSxDQUFBLENBQUUsSUFBRjtJQUNKLElBQUEsR0FBTyxDQUFDLENBQUMsSUFBRixDQUFPLE1BQVA7SUFDUCxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsQ0FBTyxRQUFQO0lBQ1QsSUFBRyxJQUFBLEtBQVEsTUFBWDtNQUNFLFFBQVEsQ0FBQyxJQUFULEdBQWdCLFNBQUEsR0FBWSxPQUQ5Qjs7SUFFQSxJQUFHLElBQUEsS0FBUSxNQUFYO2FBQ0UsUUFBUSxDQUFDLElBQVQsR0FBZ0IsU0FBQSxHQUFZLE9BRDlCOztFQVBJLENBNUZOIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiSW5kZXggPVxuXG4gIGxpbmVLZXk6IDBcbiAgbGluZUludGVydmFsOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBjb25zb2xlLmxvZyAnSW5kZXguaSgpJ1xuXG4gICAgc3JjID0gR2xvYmFsLnNyY0Zyb21TdHlsZSgkKCcuZmVhdHVyZWRzID4gLmlubmVyID4gLmZlYXR1cmVkOmZpcnN0LWNoaWxkJykpXG5cbiAgICBkYmFyLmkoKVxuICAgIGNvbnNvbGUubG9nIHNyY1xuICAgIEdsb2JhbC5wcmVsb2FkIFtzcmNdLFxuICAgICAgKHByb2dyZXNzKSAtPlxuICAgICAgICBkYmFyLnBlcmMgcHJvZ3Jlc3NcbiAgICAsIChjb21wbGV0ZSkgLT5cbiAgICAgIGRiYXIuZCgpXG4gICAgICBfLm9mZiAnLm9yYml0J1xuICAgICAgXy5vbiAnLmxpbmVzJ1xuXG4gICAgSW5kZXguaGFuZGxlcnMoKVxuICAgIGNsZWFySW50ZXJ2YWwgSW5kZXgubGluZUludGVydmFsIGlmIEluZGV4LmxpbmVJbnRlcnZhbCBpc250IGZhbHNlXG4gICAgSW5kZXgubGluZUludGVydmFsID0gc2V0SW50ZXJ2YWwgSW5kZXgubGluZVJvdGF0ZSwgNDAwMFxuXG4gICAgSW5kZXguaW5zdGFncmFtLmxvYWQoKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnLmxpbmVzID4gLmxpbmUnKS5vbiAnY2xpY2snLCBJbmRleC5saW5lSGFuZGxlclxuICAgICQoJy5mZWF0dXJlZHMnKS5vbiAnY2xpY2snLCBJbmRleC5mZWF0dXJlZEhhbmRsZXJcblxuICAgICQoJy5wcm9qZWN0cyA+IC50aHVtYicpLm9uICdjbGljaycsIEluZGV4LmdyaWRcblxuICBpbnN0YWdyYW06XG5cbiAgICBlbmRwb2ludDogJ2h0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vdjEvdXNlcnMvc2VsZi9tZWRpYS9yZWNlbnQvJ1xuICAgIHRva2VuOiAnMjY0MzY3NzkzLjU1Y2Q2YzMuYWUyMjdlZGUyZjVjNDhlYWFiOTVjYTU3ZmZjNGMwZjYnXG4gICAgbG9hZGVkOiBmYWxzZVxuICAgIHBvc3RzOiA2XG4gICAgbG9hZDogLT5cbiAgICAgIExvYWRlci5sb2FkIFwiI3tJbmRleC5pbnN0YWdyYW0uZW5kcG9pbnR9P2FjY2Vzc190b2tlbj0je0luZGV4Lmluc3RhZ3JhbS50b2tlbn0mY2FsbGJhY2s9SW5kZXguaW5zdGFncmFtLmNhbGxiYWNrXCJcbiAgICAgIEluZGV4Lmluc3RhZ3JhbS5sb2FkZWQgPSB0cnVlXG5cbiAgICBjYWxsYmFjazogKGpzb24pIC0+XG4gICAgICBjb25zb2xlLmxvZyBqc29uXG4gICAgICBmb3IgcG9zdCwgaW5kZXggaW4ganNvbi5kYXRhXG4gICAgICAgICQoJy5pbnN0YWdyYW0nKS5hcHBlbmQgJzxkaXYgY2xhc3M9XCJjbGVhclwiPjwvZGl2PicgaWYgaW5kZXggaXMgSW5kZXguaW5zdGFncmFtLnBvc3RzXG4gICAgICAgIHJldHVybiB0cnVlIGlmIGluZGV4IGlzIEluZGV4Lmluc3RhZ3JhbS5wb3N0c1xuICAgICAgICAkKCcuaW5zdGFncmFtJykuYXBwZW5kIFwiXCJcIlxuXG4gICAgICAgICAgPGEgaHJlZj1cIiN7cG9zdC5saW5rfVwiIHRhcmdldD1cIl9uZXdcIiBjbGFzcz1cInBvc3RcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiI3twb3N0LmltYWdlcy5zdGFuZGFyZF9yZXNvbHV0aW9uLnVybH1cIiAvPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgXCJcIlwiXG5cbiAgbGluZVJvdGF0ZTogLT5cbiAgICBpZiBJbmRleC5saW5lS2V5IGlzICgkKCcuZmVhdHVyZWRzID4gLmlubmVyID4gLmZlYXR1cmVkJykubGVuZ3RoLTEpXG4gICAgICBJbmRleC5saW5lIDBcbiAgICBlbHNlXG4gICAgICBJbmRleC5saW5lIEluZGV4LmxpbmVLZXkrMVxuXG4gIGxpbmVIYW5kbGVyOiAtPlxuXG4gICAgdCA9ICQgdGhpc1xuICAgIEluZGV4LmxpbmUgdC5kYXRhICdrZXknXG5cbiAgICBjbGVhckludGVydmFsIEluZGV4LmxpbmVJbnRlcnZhbFxuICAgIEluZGV4LmxpbmVJbnRlcnZhbCA9IHNldEludGVydmFsIEluZGV4LmxpbmVSb3RhdGUsIDUwMDBcbiAgICBjb25zb2xlLmxvZyAnaW50ZXJ2YWwgcmVzZXQnXG5cblxuICBmZWF0dXJlZEhhbmRsZXI6IC0+XG5cbiAgICBsaW5rID0gJChcIi5saW5lXyN7SW5kZXgubGluZUtleX1cIikuZGF0YSAnbGluaydcbiAgICBsb2NhdGlvbi5ocmVmID0gbGlua1xuXG4gIGxpbmU6IChrZXkpIC0+XG5cbiAgICBJbmRleC5saW5lS2V5ID0ga2V5XG5cbiAgICBzcmMgPSBHbG9iYWwuc3JjRnJvbVN0eWxlKCQoXCIuZmVhdHVyZWRzID4gLmlubmVyID4gLmZlYXR1cmVkOm50aC1jaGlsZCgje2tleSsxfSlcIikpXG5cbiAgICBkYmFyLmkoKVxuICAgIEdsb2JhbC5wcmVsb2FkIFtzcmNdLFxuICAgICAgKHByb2dyZXNzKSAtPlxuICAgICAgICBkYmFyLnBlcmMgcHJvZ3Jlc3NcbiAgICAsIChjb21wbGV0ZSkgLT5cbiAgICAgIGRiYXIuZCgpXG4gICAgICBfLm9mZiAnLmZlYXR1cmVkcyA+IC5pbm5lciA+IC5mZWF0dXJlZCdcbiAgICAgIF8ub24gXCIuZmVhdHVyZWRzID4gLmlubmVyID4gLmZlYXR1cmVkOm50aC1jaGlsZCgje2tleSsxfSlcIlxuICAgICAgXy5vZmYgJy5saW5lcyA+IC5saW5lJ1xuICAgICAgXy5vbiBcIi5saW5lXyN7a2V5fVwiXG5cbiAgZ3JpZDogLT5cblxuICAgIHQgPSAkIHRoaXNcbiAgICB0eXBlID0gdC5kYXRhICd0eXBlJ1xuICAgIGZvbGRlciA9IHQuZGF0YSAnZm9sZGVyJ1xuICAgIGlmIHR5cGUgaXMgJ3dvcmsnXG4gICAgICBsb2NhdGlvbi5ocmVmID0gJy93b3JrLyMnICsgZm9sZGVyXG4gICAgaWYgdHlwZSBpcyAnYmxvZydcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Jsb2cvIycgKyBmb2xkZXJcblxuXG5cbiJdfQ==
