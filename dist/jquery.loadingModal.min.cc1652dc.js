// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utility/jquery.loadingModal.min.js":[function(require,module,exports) {
!function (s, i, c, t) {
  "use strict";

  function e(c, t) {
    var e = this;
    return this.element = c, this.animations = {
      doubleBounce: {
        html: '<div class="sk-double-bounce"><div class="sk-child sk-double-bounce1"></div><div class="sk-child sk-double-bounce2"></div></div>'
      },
      rotatingPlane: {
        html: '<div class="sk-rotating-plane"></div>',
        setBackground: function (i) {
          e.animationBox.find("*").each(function (c, t) {
            s(t).css("background-color") && "rgba(0, 0, 0, 0)" != s(t).css("background-color") && s(t).css("background-color", i);
          });
        }
      },
      wave: {
        html: '<div class="sk-wave"> <div class="sk-rect sk-rect1"></div> <div class="sk-rect sk-rect2"></div> <div class="sk-rect sk-rect3"></div> <div class="sk-rect sk-rect4"></div> <div class="sk-rect sk-rect5"></div> </div>'
      },
      wanderingCubes: {
        html: '<div class="sk-wandering-cubes"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div></div>'
      },
      spinner: {
        html: '<div class="sk-spinner sk-spinner-pulse"></div>'
      },
      chasingDots: {
        html: '<div class="sk-chasing-dots"><div class="sk-child sk-dot1"></div><div class="sk-child sk-dot2"></div></div>'
      },
      threeBounce: {
        html: '<div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>'
      },
      circle: {
        html: '<div class="sk-circle"> <div class="sk-circle1 sk-child"></div> <div class="sk-circle2 sk-child"></div> <div class="sk-circle3 sk-child"></div> <div class="sk-circle4 sk-child"></div> <div class="sk-circle5 sk-child"></div> <div class="sk-circle6 sk-child"></div> <div class="sk-circle7 sk-child"></div> <div class="sk-circle8 sk-child"></div> <div class="sk-circle9 sk-child"></div> <div class="sk-circle10 sk-child"></div> <div class="sk-circle11 sk-child"></div> <div class="sk-circle12 sk-child"></div> </div>',
        setBackground: function (c) {
          e.animationBox.children().find("*").each(function (t, e) {
            "rgba(0, 0, 0, 0)" !== i.getComputedStyle(e, ":before").getPropertyValue("background-color") && s("body").append(s("<style data-custom-style>." + s(e).attr("class").split(" ")[0] + ":before {background-color: " + c + " !important;}</style>"));
          });
        }
      },
      cubeGrid: {
        html: '<div class="sk-cube-grid"> <div class="sk-cube sk-cube1"></div> <div class="sk-cube sk-cube2"></div> <div class="sk-cube sk-cube3"></div> <div class="sk-cube sk-cube4"></div> <div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div> <div class="sk-cube sk-cube7"></div> <div class="sk-cube sk-cube8"></div> <div class="sk-cube sk-cube9"></div> </div>'
      },
      fadingCircle: {
        html: '<div class="sk-fading-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div> <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div> <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div> <div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div> <div class="sk-circle11 sk-circle"></div> <div class="sk-circle12 sk-circle"></div> </div>',
        setBackground: function (c) {
          e.animationBox.children().find("*").each(function (t, e) {
            "rgba(0, 0, 0, 0)" !== i.getComputedStyle(e, ":before").getPropertyValue("background-color") && s("body").append(s("<style data-custom-style>." + s(e).attr("class").split(" ")[0] + ":before {background-color: " + c + " !important;}</style>"));
          });
        }
      },
      foldingCube: {
        html: '<div class="sk-folding-cube"> <div class="sk-cube1 sk-cube"></div> <div class="sk-cube2 sk-cube"></div> <div class="sk-cube4 sk-cube"></div> <div class="sk-cube3 sk-cube"></div> </div>',
        setBackground: function (c) {
          e.animationBox.find("*").each(function (t, e) {
            "rgba(0, 0, 0, 0)" !== i.getComputedStyle(e, ":before").getPropertyValue("background-color") && s("body").append(s("<style data-custom-style>." + s(e).attr("class").split(" ")[0] + ":before {background-color: " + c + " !important;}</style>"));
          });
        }
      }
    }, this.settings = s.extend({}, l, t), this.modal = null, this.modalText = null, this.animationBox = null, this.modalBg = null, this.currenAnimation = null, this.init(), this;
  }

  var d = "loadingModal",
      l = {
    position: "auto",
    text: "",
    color: "#fff",
    opacity: "0.7",
    backgroundColor: "rgb(0,0,0)",
    animation: "doubleBounce"
  };
  s.extend(e.prototype, {
    init: function () {
      var i = s('<div class="jquery-loading-modal jquery-loading-modal--visible"></div>'),
          c = s('<div class="jquery-loading-modal__bg"></div>'),
          t = s('<div class="jquery-loading-modal__animation"></div>'),
          e = s('<div class="jquery-loading-modal__info-box"></div>'),
          d = s('<div class="jquery-loading-modal__text"></div>');
      "" !== this.settings.text ? d.html(this.settings.text) : d.hide(), this.currenAnimation = this.animations[this.settings.animation], t.append(this.currenAnimation.html), e.append(t).append(d), i.append(c), i.append(e), "auto" === this.settings.position && "body" !== this.element.tagName.toLowerCase() ? (i.css("position", "absolute"), s(this.element).css("position", "relative")) : "auto" !== this.settings.position && s(this.element).css("position", this.settings.position), s(this.element).append(i), this.modalBg = c, this.modal = i, this.modalText = d, this.animationBox = t, this.color(this.settings.color), this.backgroundColor(this.settings.backgroundColor), this.opacity(this.settings.opacity);
    },
    hide: function () {
      var s = this.modal;
      s.removeClass("jquery-loading-modal--visible").addClass("jquery-loading-modal--hidden"), setTimeout(function () {
        s.hide();
      }, 1e3);
    },
    backgroundColor: function (s) {
      this.modalBg.css({
        "background-color": s
      });
    },
    color: function (c) {
      s("[data-custom-style]").remove(), this.modalText.css("color", c), this.currenAnimation.setBackground ? this.currenAnimation.setBackground(c) : this.animationBox.children().find("*").each(function (t, e) {
        s(e).css("background-color") && "rgba(0, 0, 0, 0)" != s(e).css("background-color") && s(e).css("background-color", c), "rgba(0, 0, 0, 0)" !== i.getComputedStyle(e, ":before").getPropertyValue("background-color") && s("body").append(s("<style data-custom-style>." + s(e).attr("class").split(" ")[0] + ":before {background-color: " + c + " !important;}</style>"));
      });
    },
    opacity: function (s) {
      this.modalBg.css({
        opacity: s
      });
    },
    show: function () {
      this.modal.show().removeClass("jquery-loading-modal--hidden").addClass("jquery-loading-modal--visible");
    },
    animation: function (s) {
      this.animationBox.html(""), this.currenAnimation = this.animations[s], this.animationBox.append(this.currenAnimation.html);
    },
    destroy: function () {
      s("[data-custom-style]").remove(), this.modal.remove();
    },
    text: function (s) {
      this.modalText.html(s);
    }
  }), s.fn[d] = function (i) {
    var c = arguments;
    if (i === t || "object" == typeof i) return this.each(function () {
      s.data(this, "plugin_" + d) || s.data(this, "plugin_" + d, new e(this, i));
    });

    if ("string" == typeof i && "_" !== i[0] && "init" !== i) {
      var l;
      return this.each(function () {
        var t = s.data(this, "plugin_" + d);
        t instanceof e && "function" == typeof t[i] && (l = t[i].apply(t, Array.prototype.slice.call(c, 1))), "destroy" === i && s.data(this, "plugin_" + d, null);
      }), l !== t ? l : this;
    }
  };
}(jQuery, window, document);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49620" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","utility/jquery.loadingModal.min.js"], null)
//# sourceMappingURL=/jquery.loadingModal.min.cc1652dc.js.map