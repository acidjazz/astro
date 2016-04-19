var _;

_ = {
  off: function(el) {
    var i, len;
    i = 0;
    len = arguments.length;
    while (i !== len) {
      if (arguments[i] instanceof jQuery) {
        arguments[i].removeClass("on").addClass("off");
      } else {
        $(arguments[i]).removeClass("on").addClass("off");
      }
      i++;
    }
  },
  on: function(el) {
    var i, len;
    i = 0;
    len = arguments.length;
    while (i !== len) {
      if (arguments[i] instanceof jQuery) {
        arguments[i].removeClass("off").addClass("on");
      } else {
        $(arguments[i]).removeClass("off").addClass("on");
      }
      i++;
    }
  },
  swap: function(el) {
    var i, len;
    i = 0;
    len = arguments.length;
    while (i !== len) {
      if (arguments[i] instanceof jQuery) {
        if (arguments[i].hasClass('off')) {
          _.on(arguments[i]);
        } else {
          _.off(arguments[i]);
        }
      } else {
        if ($(arguments[i]).hasClass('off')) {
          _.on($(arguments[i]));
        } else {
          _.off($(arguments[i]));
        }
      }
      i++;
    }
  },
  encode: function(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  },
  t: function(category, action, label, value) {
    return _gaq.push(['_trackEvent', category, action, label, value]);
  },
  rand: function(min, max) {
    return Math.floor(Math.random() * max) + min;
  },
  llc: function() {
    var ascii;
    ascii = "\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: https://github.com/acidjazz/astro";
    return console.log(ascii, "color: grey; font-family: Menlo, monospace;");
  },
  detect: function() {
    if ((window.outerHeight - window.innerHeight) > 100) {
      _.llc();
      return clearInterval(_.console);
    }
  }
};

_.console = setInterval(_.detect, 200);

//# sourceMappingURL=data:application/json;base64,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QyxDQW5ESDtFQXFEQSxJQUFBLEVBQU0sU0FBQyxHQUFELEVBQU0sR0FBTjtBQUNKLFdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBZ0IsR0FBM0IsQ0FBQSxHQUFrQztFQURyQyxDQXJETjtFQXdEQSxHQUFBLEVBQUssU0FBQTtBQUNILFFBQUE7SUFBQSxLQUFBLEdBQVE7V0FzQlIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLDZDQUFuQjtFQXZCRyxDQXhETDtFQWlGQSxNQUFBLEVBQVEsU0FBQTtJQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBUCxHQUFxQixNQUFNLENBQUMsV0FBN0IsQ0FBQSxHQUE0QyxHQUFoRDtNQUNFLENBQUMsQ0FBQyxHQUFGLENBQUE7YUFDQSxhQUFBLENBQWMsQ0FBQyxDQUFDLE9BQWhCLEVBRkY7O0VBRE0sQ0FqRlI7OztBQXNGRixDQUFDLENBQUMsT0FBRixHQUFZLFdBQUEsQ0FBWSxDQUFDLENBQUMsTUFBZCxFQUFzQixHQUF0QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgb2ZmOiAoZWwpIC0+XG4gICAgaSA9IDBcbiAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG5cbiAgICB3aGlsZSBpIGlzbnQgbGVuXG4gICAgICBpZiBhcmd1bWVudHNbaV0gaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgICAgYXJndW1lbnRzW2ldLnJlbW92ZUNsYXNzKFwib25cIikuYWRkQ2xhc3MgXCJvZmZcIlxuICAgICAgZWxzZVxuICAgICAgICAkKGFyZ3VtZW50c1tpXSkucmVtb3ZlQ2xhc3MoXCJvblwiKS5hZGRDbGFzcyBcIm9mZlwiXG4gICAgICBpKytcbiAgICByZXR1cm5cblxuICBvbjogKGVsKSAtPlxuICAgIGkgPSAwXG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgd2hpbGUgaSBpc250IGxlblxuICAgICAgaWYgYXJndW1lbnRzW2ldIGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICAgIGFyZ3VtZW50c1tpXS5yZW1vdmVDbGFzcyhcIm9mZlwiKS5hZGRDbGFzcyBcIm9uXCJcbiAgICAgIGVsc2VcbiAgICAgICAgJChhcmd1bWVudHNbaV0pLnJlbW92ZUNsYXNzKFwib2ZmXCIpLmFkZENsYXNzIFwib25cIlxuICAgICAgaSsrXG4gICAgcmV0dXJuXG5cbiAgc3dhcDogKGVsKSAtPlxuICAgIGkgPSAwXG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgd2hpbGUgaSBpc250IGxlblxuICAgICAgaWYgYXJndW1lbnRzW2ldIGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICAgIGlmIGFyZ3VtZW50c1tpXS5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgICAgIF8ub24gYXJndW1lbnRzW2ldXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBfLm9mZiBhcmd1bWVudHNbaV1cbiAgICAgIGVsc2VcbiAgICAgICAgaWYgJChhcmd1bWVudHNbaV0pLmhhc0NsYXNzICdvZmYnXG4gICAgICAgICAgXy5vbiAkKGFyZ3VtZW50c1tpXSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgIF8ub2ZmICQoYXJndW1lbnRzW2ldKVxuICAgICAgaSsrXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuICAgICAgXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiBodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovYXN0cm9cbiAgICBcIlwiXCJcblxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApXG4gICAgICBfLmxsYygpXG4gICAgICBjbGVhckludGVydmFsIF8uY29uc29sZVxuXG5fLmNvbnNvbGUgPSBzZXRJbnRlcnZhbCBfLmRldGVjdCwgMjAwXG5cbiJdfQ==
