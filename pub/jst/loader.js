var Loader;

Loader = {
  root: './',
  scripts: {
    jst: [],
    jst_lib: [],
    jst_cune: [],
    jst_cune_lib: []
  },
  i: function(callback) {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    this.mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.iPad = /iPad/i.test(navigator.userAgent);
    this.iPhone = /iPhone/i.test(navigator.userAgent);
    this.Chrome = /Chrome/i.test(navigator.userAgent);
    this.Safari = /Safari/i.test(navigator.userAgent) && !Loader.Chrome;
    if (Loader.compatible()) {
      return Loader.loadscripts(Loader.scripts, function() {
        if (window.cfg !== 'undefined') {
          return callback(true);
        } else {
          return Loader.config(function() {
            return callback(true);
          });
        }
      });
    } else {
      return callback(false);
    }
  },
  searchString: function(data) {
    var dataString, i;
    i = 0;
    while (i < data.length) {
      dataString = data[i].string;
      this.versionSearchString = data[i].subString;
      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
      i++;
    }
  },
  searchVersion: function(dataString) {
    var index;
    index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    }, {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer"
    }, {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    }, {
      string: navigator.userAgent,
      subString: "Safari",
      identity: "Safari"
    }, {
      string: navigator.userAgent,
      subString: "Opera",
      identity: "Opera"
    }
  ],
  compatible: function() {
    if (Loader.browser === 'Chrome' && Loader.version < 17) {
      return Loader.redirect();
    }
    if (Loader.browser === 'MSIE' && Loader.version < 10) {
      return Loader.redirect();
    }
    if (Loader.browser === 'Explorer' && Loader.version < 10) {
      return Loader.redirect();
    }
    if (Loader.browser === 'FireFox' && Loader.version < 20) {
      return Loader.redirect();
    }
    if (Loader.browser === 'Safari' && Loader.version < 6) {
      return Loader.redirect();
    }
    if (!Loader.browser.indexOf(['Chrome', 'MSIE', 'FireFox', 'Safari'])) {
      return Loader.redirect();
    }
    return true;
  },
  redirect: function() {
    location.href = '/compatible/';
    return false;
  },
  loadscripts: function(list, complete) {
    var floop, folder, i, j, len, paths, script, scripts;
    paths = [];
    i = 0;
    for (folder in list) {
      scripts = list[folder];
      for (j = 0, len = scripts.length; j < len; j++) {
        script = scripts[j];
        paths.push(Loader.root + folder.replace(/_/g, '/') + '/' + script + '.js');
      }
    }
    floop = function(arr) {
      return Loader.load(paths[i], false, function() {
        if (++i === paths.length) {
          return complete();
        } else {
          return floop(arr);
        }
      });
    };
    return floop(paths);
  },
  config: function(complete) {
    return $.getJSON('./cfg/config.json', function(result) {
      window.cfg = result.cfg;
      return complete();
    });
  },
  load: function(script, initiate, complete) {
    var el;
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = script;
    el.addEventListener('load', function(e) {
      if (typeof complete === 'function') {
        complete();
      }
      if (initiate !== void 0 && initiate !== false) {
        return window[initiate].i();
      }
    }, false);
    return document.body.appendChild(el);
  },
  jsonp: function(script, initiate, complete) {
    var el;
    el = document.createElement('script');
    el.type = 'text/json';
    el.src = script;
    el.addEventListener('load', function(e) {
      if (typeof complete === 'function') {
        complete();
      }
      if (initiate !== void 0 && initiate !== false) {
        return window[initiate].i();
      }
    }, false);
    return document.body.appendChild(el);
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsSUFBQTs7QUFBQSxNQUFBLEdBRUU7RUFBQSxJQUFBLEVBQU0sSUFBTjtFQUVBLE9BQUEsRUFBUztJQUFDLEdBQUEsRUFBSyxFQUFOO0lBQVUsT0FBQSxFQUFTLEVBQW5CO0lBQXVCLFFBQUEsRUFBVSxFQUFqQztJQUFxQyxZQUFBLEVBQWMsRUFBbkQ7R0FGVDtFQUlBLENBQUEsRUFBRyxTQUFDLFFBQUQ7SUFFRCxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLFdBQWYsQ0FBQSxJQUErQjtJQUMxQyxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxhQUFELENBQWUsU0FBUyxDQUFDLFNBQXpCLENBQUEsSUFBdUMsSUFBQyxDQUFBLGFBQUQsQ0FBZSxTQUFTLENBQUMsVUFBekIsQ0FBdkMsSUFBK0U7SUFDMUYsSUFBQyxDQUFBLE1BQUQsR0FBVSwyREFBMkQsQ0FBQyxJQUE1RCxDQUFpRSxTQUFTLENBQUMsU0FBM0U7SUFDVixJQUFDLENBQUEsSUFBRCxHQUFRLE9BQU8sQ0FBQyxJQUFSLENBQWEsU0FBUyxDQUFDLFNBQXZCO0lBQ1IsSUFBQyxDQUFBLE1BQUQsR0FBVSxTQUFTLENBQUMsSUFBVixDQUFlLFNBQVMsQ0FBQyxTQUF6QjtJQUNWLElBQUMsQ0FBQSxNQUFELEdBQVUsU0FBUyxDQUFDLElBQVYsQ0FBZSxTQUFTLENBQUMsU0FBekI7SUFDVixJQUFDLENBQUEsTUFBRCxHQUFVLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBUyxDQUFDLFNBQXpCLENBQUEsSUFBdUMsQ0FBQyxNQUFNLENBQUM7SUFFekQsSUFBRyxNQUFNLENBQUMsVUFBUCxDQUFBLENBQUg7YUFDRSxNQUFNLENBQUMsV0FBUCxDQUFtQixNQUFNLENBQUMsT0FBMUIsRUFBbUMsU0FBQTtRQUNqQyxJQUFHLE1BQU0sQ0FBQyxHQUFQLEtBQWdCLFdBQW5CO2lCQUNFLFFBQUEsQ0FBUyxJQUFULEVBREY7U0FBQSxNQUFBO2lCQUdFLE1BQU0sQ0FBQyxNQUFQLENBQWMsU0FBQTttQkFDWixRQUFBLENBQVMsSUFBVDtVQURZLENBQWQsRUFIRjs7TUFEaUMsQ0FBbkMsRUFERjtLQUFBLE1BQUE7YUFRRSxRQUFBLENBQVMsS0FBVCxFQVJGOztFQVZDLENBSkg7RUF3QkEsWUFBQSxFQUFjLFNBQUMsSUFBRDtBQUNaLFFBQUE7SUFBQSxDQUFBLEdBQUk7QUFDSixXQUFNLENBQUEsR0FBSSxJQUFJLENBQUMsTUFBZjtNQUNFLFVBQUEsR0FBYSxJQUFLLENBQUEsQ0FBQSxDQUFFLENBQUM7TUFDckIsSUFBQyxDQUFBLG1CQUFELEdBQXVCLElBQUssQ0FBQSxDQUFBLENBQUUsQ0FBQztNQUMvQixJQUErQixVQUFVLENBQUMsT0FBWCxDQUFtQixJQUFLLENBQUEsQ0FBQSxDQUFFLENBQUMsU0FBM0IsQ0FBQSxLQUF5QyxDQUFDLENBQXpFO0FBQUEsZUFBTyxJQUFLLENBQUEsQ0FBQSxDQUFFLENBQUMsU0FBZjs7TUFDQSxDQUFBO0lBSkY7RUFGWSxDQXhCZDtFQWlDQSxhQUFBLEVBQWUsU0FBQyxVQUFEO0FBQ2IsUUFBQTtJQUFBLEtBQUEsR0FBUSxVQUFVLENBQUMsT0FBWCxDQUFtQixJQUFDLENBQUEsbUJBQXBCO0lBQ1IsSUFBVSxLQUFBLEtBQVMsQ0FBQyxDQUFwQjtBQUFBLGFBQUE7O1dBQ0EsVUFBQSxDQUFXLFVBQVUsQ0FBQyxTQUFYLENBQXFCLEtBQUEsR0FBUSxJQUFDLENBQUEsbUJBQW1CLENBQUMsTUFBN0IsR0FBc0MsQ0FBM0QsQ0FBWDtFQUhhLENBakNmO0VBc0NBLFdBQUEsRUFBYTtJQUNYO01BQUUsTUFBQSxFQUFRLFNBQVMsQ0FBQyxTQUFwQjtNQUErQixTQUFBLEVBQVcsUUFBMUM7TUFBb0QsUUFBQSxFQUFVLFFBQTlEO0tBRFcsRUFFWDtNQUFFLE1BQUEsRUFBUSxTQUFTLENBQUMsU0FBcEI7TUFBK0IsU0FBQSxFQUFXLE1BQTFDO01BQWtELFFBQUEsRUFBVSxVQUE1RDtLQUZXLEVBR1g7TUFBRSxNQUFBLEVBQVEsU0FBUyxDQUFDLFNBQXBCO01BQStCLFNBQUEsRUFBVyxTQUExQztNQUFxRCxRQUFBLEVBQVUsU0FBL0Q7S0FIVyxFQUlYO01BQUUsTUFBQSxFQUFRLFNBQVMsQ0FBQyxTQUFwQjtNQUErQixTQUFBLEVBQVcsUUFBMUM7TUFBb0QsUUFBQSxFQUFVLFFBQTlEO0tBSlcsRUFLWDtNQUFFLE1BQUEsRUFBUSxTQUFTLENBQUMsU0FBcEI7TUFBK0IsU0FBQSxFQUFXLE9BQTFDO01BQW1ELFFBQUEsRUFBVSxPQUE3RDtLQUxXO0dBdENiO0VBOENBLFVBQUEsRUFBWSxTQUFBO0lBQ1YsSUFBNEIsTUFBTSxDQUFDLE9BQVAsS0FBa0IsUUFBbEIsSUFBK0IsTUFBTSxDQUFDLE9BQVAsR0FBaUIsRUFBNUU7QUFBQSxhQUFPLE1BQU0sQ0FBQyxRQUFQLENBQUEsRUFBUDs7SUFDQSxJQUE0QixNQUFNLENBQUMsT0FBUCxLQUFrQixNQUFsQixJQUE2QixNQUFNLENBQUMsT0FBUCxHQUFpQixFQUExRTtBQUFBLGFBQU8sTUFBTSxDQUFDLFFBQVAsQ0FBQSxFQUFQOztJQUNBLElBQTRCLE1BQU0sQ0FBQyxPQUFQLEtBQWtCLFVBQWxCLElBQWlDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLEVBQTlFO0FBQUEsYUFBTyxNQUFNLENBQUMsUUFBUCxDQUFBLEVBQVA7O0lBQ0EsSUFBNEIsTUFBTSxDQUFDLE9BQVAsS0FBa0IsU0FBbEIsSUFBZ0MsTUFBTSxDQUFDLE9BQVAsR0FBaUIsRUFBN0U7QUFBQSxhQUFPLE1BQU0sQ0FBQyxRQUFQLENBQUEsRUFBUDs7SUFDQSxJQUE0QixNQUFNLENBQUMsT0FBUCxLQUFrQixRQUFsQixJQUErQixNQUFNLENBQUMsT0FBUCxHQUFpQixDQUE1RTtBQUFBLGFBQU8sTUFBTSxDQUFDLFFBQVAsQ0FBQSxFQUFQOztJQUNBLElBQTRCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFmLENBQXVCLENBQUMsUUFBRCxFQUFVLE1BQVYsRUFBaUIsU0FBakIsRUFBMkIsUUFBM0IsQ0FBdkIsQ0FBN0I7QUFBQSxhQUFPLE1BQU0sQ0FBQyxRQUFQLENBQUEsRUFBUDs7QUFDQSxXQUFPO0VBUEcsQ0E5Q1o7RUF1REEsUUFBQSxFQUFVLFNBQUE7SUFDUixRQUFRLENBQUMsSUFBVCxHQUFnQjtBQUNoQixXQUFPO0VBRkMsQ0F2RFY7RUEyREEsV0FBQSxFQUFhLFNBQUMsSUFBRCxFQUFPLFFBQVA7QUFDWCxRQUFBO0lBQUEsS0FBQSxHQUFRO0lBQ1IsQ0FBQSxHQUFJO0FBQ0osU0FBQSxjQUFBOztBQUFBLFdBQUEseUNBQUE7O1FBQUEsS0FBSyxDQUFDLElBQU4sQ0FBVyxNQUFNLENBQUMsSUFBUCxHQUFjLE1BQU0sQ0FBQyxPQUFQLENBQWUsSUFBZixFQUFvQixHQUFwQixDQUFkLEdBQXlDLEdBQXpDLEdBQStDLE1BQS9DLEdBQXdELEtBQW5FO0FBQUE7QUFBQTtJQUVBLEtBQUEsR0FBUSxTQUFDLEdBQUQ7YUFDTixNQUFNLENBQUMsSUFBUCxDQUFZLEtBQU0sQ0FBQSxDQUFBLENBQWxCLEVBQXNCLEtBQXRCLEVBQTZCLFNBQUE7UUFDM0IsSUFBRyxFQUFFLENBQUYsS0FBTyxLQUFLLENBQUMsTUFBaEI7aUJBQTRCLFFBQUEsQ0FBQSxFQUE1QjtTQUFBLE1BQUE7aUJBQTRDLEtBQUEsQ0FBTSxHQUFOLEVBQTVDOztNQUQyQixDQUE3QjtJQURNO1dBSVIsS0FBQSxDQUFNLEtBQU47RUFUVyxDQTNEYjtFQXNFQSxNQUFBLEVBQVEsU0FBQyxRQUFEO1dBQ04sQ0FBQyxDQUFDLE9BQUYsQ0FBVSxtQkFBVixFQUErQixTQUFDLE1BQUQ7TUFDN0IsTUFBTSxDQUFDLEdBQVAsR0FBYSxNQUFNLENBQUM7YUFDcEIsUUFBQSxDQUFBO0lBRjZCLENBQS9CO0VBRE0sQ0F0RVI7RUEyRUEsSUFBQSxFQUFNLFNBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsUUFBbkI7QUFFSixRQUFBO0lBQUEsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCO0lBQ0wsRUFBRSxDQUFDLElBQUgsR0FBVTtJQUNWLEVBQUUsQ0FBQyxHQUFILEdBQVM7SUFDVCxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsTUFBcEIsRUFBNkIsU0FBQyxDQUFEO01BQzNCLElBQWMsT0FBTyxRQUFQLEtBQW1CLFVBQWpDO1FBQUEsUUFBQSxDQUFBLEVBQUE7O01BQ0EsSUFBd0IsUUFBQSxLQUFjLE1BQWQsSUFBNEIsUUFBQSxLQUFjLEtBQWxFO2VBQUEsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLENBQWpCLENBQUEsRUFBQTs7SUFGMkIsQ0FBN0IsRUFHRSxLQUhGO1dBS0EsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLEVBQTFCO0VBVkksQ0EzRU47RUF3RkEsS0FBQSxFQUFPLFNBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsUUFBbkI7QUFFTCxRQUFBO0lBQUEsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCO0lBQ0wsRUFBRSxDQUFDLElBQUgsR0FBVTtJQUNWLEVBQUUsQ0FBQyxHQUFILEdBQVM7SUFDVCxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsTUFBcEIsRUFBNkIsU0FBQyxDQUFEO01BQzNCLElBQWMsT0FBTyxRQUFQLEtBQW1CLFVBQWpDO1FBQUEsUUFBQSxDQUFBLEVBQUE7O01BQ0EsSUFBd0IsUUFBQSxLQUFjLE1BQWQsSUFBNEIsUUFBQSxLQUFjLEtBQWxFO2VBQUEsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLENBQWpCLENBQUEsRUFBQTs7SUFGMkIsQ0FBN0IsRUFHRSxLQUhGO1dBS0EsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLEVBQTFCO0VBVkssQ0F4RlAiLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiXG5Mb2FkZXIgPVxuXG4gIHJvb3Q6ICcuLydcblxuICBzY3JpcHRzOiB7anN0OiBbXSwganN0X2xpYjogW10sIGpzdF9jdW5lOiBbXSwganN0X2N1bmVfbGliOiBbXX1cblxuICBpOiAoY2FsbGJhY2spIC0+XG5cbiAgICBAYnJvd3NlciA9IEBzZWFyY2hTdHJpbmcoQGRhdGFCcm93c2VyKSBvciBcIk90aGVyXCJcbiAgICBAdmVyc2lvbiA9IEBzZWFyY2hWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQpIG9yIEBzZWFyY2hWZXJzaW9uKG5hdmlnYXRvci5hcHBWZXJzaW9uKSBvciBcIlVua25vd25cIlxuICAgIEBtb2JpbGUgPSAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgQGlQYWQgPSAvaVBhZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICBAaVBob25lID0gL2lQaG9uZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICBAQ2hyb21lID0gL0Nocm9tZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICBAU2FmYXJpID0gL1NhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIUxvYWRlci5DaHJvbWVcblxuICAgIGlmIExvYWRlci5jb21wYXRpYmxlKClcbiAgICAgIExvYWRlci5sb2Fkc2NyaXB0cyBMb2FkZXIuc2NyaXB0cywgLT5cbiAgICAgICAgaWYgd2luZG93LmNmZyBpc250ICd1bmRlZmluZWQnXG4gICAgICAgICAgY2FsbGJhY2sgdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgTG9hZGVyLmNvbmZpZyAtPlxuICAgICAgICAgICAgY2FsbGJhY2sgdHJ1ZVxuICAgIGVsc2VcbiAgICAgIGNhbGxiYWNrIGZhbHNlXG5cbiAgc2VhcmNoU3RyaW5nOiAoZGF0YSkgLT5cbiAgICBpID0gMFxuICAgIHdoaWxlIGkgPCBkYXRhLmxlbmd0aFxuICAgICAgZGF0YVN0cmluZyA9IGRhdGFbaV0uc3RyaW5nXG4gICAgICBAdmVyc2lvblNlYXJjaFN0cmluZyA9IGRhdGFbaV0uc3ViU3RyaW5nXG4gICAgICByZXR1cm4gZGF0YVtpXS5pZGVudGl0eSB1bmxlc3MgZGF0YVN0cmluZy5pbmRleE9mKGRhdGFbaV0uc3ViU3RyaW5nKSBpcyAtMVxuICAgICAgaSsrXG4gICAgcmV0dXJuXG5cbiAgc2VhcmNoVmVyc2lvbjogKGRhdGFTdHJpbmcpIC0+XG4gICAgaW5kZXggPSBkYXRhU3RyaW5nLmluZGV4T2YoQHZlcnNpb25TZWFyY2hTdHJpbmcpXG4gICAgcmV0dXJuIGlmIGluZGV4IGlzIC0xXG4gICAgcGFyc2VGbG9hdCBkYXRhU3RyaW5nLnN1YnN0cmluZyhpbmRleCArIEB2ZXJzaW9uU2VhcmNoU3RyaW5nLmxlbmd0aCArIDEpXG5cbiAgZGF0YUJyb3dzZXI6IFtcbiAgICB7IHN0cmluZzogbmF2aWdhdG9yLnVzZXJBZ2VudCwgc3ViU3RyaW5nOiBcIkNocm9tZVwiLCBpZGVudGl0eTogXCJDaHJvbWVcIiB9XG4gICAgeyBzdHJpbmc6IG5hdmlnYXRvci51c2VyQWdlbnQsIHN1YlN0cmluZzogXCJNU0lFXCIsIGlkZW50aXR5OiBcIkV4cGxvcmVyXCIgfVxuICAgIHsgc3RyaW5nOiBuYXZpZ2F0b3IudXNlckFnZW50LCBzdWJTdHJpbmc6IFwiRmlyZWZveFwiLCBpZGVudGl0eTogXCJGaXJlZm94XCIgfVxuICAgIHsgc3RyaW5nOiBuYXZpZ2F0b3IudXNlckFnZW50LCBzdWJTdHJpbmc6IFwiU2FmYXJpXCIsIGlkZW50aXR5OiBcIlNhZmFyaVwiIH1cbiAgICB7IHN0cmluZzogbmF2aWdhdG9yLnVzZXJBZ2VudCwgc3ViU3RyaW5nOiBcIk9wZXJhXCIsIGlkZW50aXR5OiBcIk9wZXJhXCIgfVxuICBdXG5cbiAgY29tcGF0aWJsZTogLT5cbiAgICByZXR1cm4gTG9hZGVyLnJlZGlyZWN0KCkgaWYgTG9hZGVyLmJyb3dzZXIgPT0gJ0Nocm9tZScgYW5kIExvYWRlci52ZXJzaW9uIDwgMTdcbiAgICByZXR1cm4gTG9hZGVyLnJlZGlyZWN0KCkgaWYgTG9hZGVyLmJyb3dzZXIgPT0gJ01TSUUnIGFuZCBMb2FkZXIudmVyc2lvbiA8IDEwXG4gICAgcmV0dXJuIExvYWRlci5yZWRpcmVjdCgpIGlmIExvYWRlci5icm93c2VyID09ICdFeHBsb3JlcicgYW5kIExvYWRlci52ZXJzaW9uIDwgMTBcbiAgICByZXR1cm4gTG9hZGVyLnJlZGlyZWN0KCkgaWYgTG9hZGVyLmJyb3dzZXIgPT0gJ0ZpcmVGb3gnIGFuZCBMb2FkZXIudmVyc2lvbiA8IDIwXG4gICAgcmV0dXJuIExvYWRlci5yZWRpcmVjdCgpIGlmIExvYWRlci5icm93c2VyID09ICdTYWZhcmknIGFuZCBMb2FkZXIudmVyc2lvbiA8IDZcbiAgICByZXR1cm4gTG9hZGVyLnJlZGlyZWN0KCkgaWYgIUxvYWRlci5icm93c2VyLmluZGV4T2YgWydDaHJvbWUnLCdNU0lFJywnRmlyZUZveCcsJ1NhZmFyaSddXG4gICAgcmV0dXJuIHRydWVcblxuICByZWRpcmVjdDogLT5cbiAgICBsb2NhdGlvbi5ocmVmID0gJy9jb21wYXRpYmxlLydcbiAgICByZXR1cm4gZmFsc2VcblxuICBsb2Fkc2NyaXB0czogKGxpc3QsIGNvbXBsZXRlKSAtPlxuICAgIHBhdGhzID0gW11cbiAgICBpID0gMFxuICAgIHBhdGhzLnB1c2ggTG9hZGVyLnJvb3QgKyBmb2xkZXIucmVwbGFjZSgvXy9nLCcvJykgKyAnLycgKyBzY3JpcHQgKyAnLmpzJyBmb3Igc2NyaXB0IGluIHNjcmlwdHMgZm9yIGZvbGRlciwgc2NyaXB0cyBvZiBsaXN0XG5cbiAgICBmbG9vcCA9IChhcnIpIC0+XG4gICAgICBMb2FkZXIubG9hZCBwYXRoc1tpXSwgZmFsc2UsIC0+XG4gICAgICAgIGlmICsraSBpcyBwYXRocy5sZW5ndGggdGhlbiBjb21wbGV0ZSgpIGVsc2UgZmxvb3AoYXJyKVxuXG4gICAgZmxvb3AgcGF0aHNcblxuICBjb25maWc6IChjb21wbGV0ZSkgLT5cbiAgICAkLmdldEpTT04gJy4vY2ZnL2NvbmZpZy5qc29uJywgKHJlc3VsdCkgLT5cbiAgICAgIHdpbmRvdy5jZmcgPSByZXN1bHQuY2ZnXG4gICAgICBjb21wbGV0ZSgpXG5cbiAgbG9hZDogKHNjcmlwdCwgaW5pdGlhdGUsIGNvbXBsZXRlKSAtPlxuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlKCkgaWYgdHlwZW9mIGNvbXBsZXRlIGlzICdmdW5jdGlvbidcbiAgICAgIHdpbmRvd1tpbml0aWF0ZV0uaSgpIGlmIGluaXRpYXRlIGlzbnQgdW5kZWZpbmVkIGFuZCBpbml0aWF0ZSBpc250IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbClcblxuXG4gIGpzb25wOiAoc2NyaXB0LCBpbml0aWF0ZSwgY29tcGxldGUpIC0+XG5cbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcbiAgICBlbC50eXBlID0gJ3RleHQvanNvbidcbiAgICBlbC5zcmMgPSBzY3JpcHRcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyICdsb2FkJyAsIChlKSAtPlxuICAgICAgY29tcGxldGUoKSBpZiB0eXBlb2YgY29tcGxldGUgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgd2luZG93W2luaXRpYXRlXS5pKCkgaWYgaW5pdGlhdGUgaXNudCB1bmRlZmluZWQgYW5kIGluaXRpYXRlIGlzbnQgZmFsc2VcbiAgICAsIGZhbHNlXG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKVxuIl19
