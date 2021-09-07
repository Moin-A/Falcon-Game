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
})({"Constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameState = exports.MISSION_PLAN = void 0;
const MISSION_PLAN = {
  1: {
    online: false
  },
  2: {
    online: false
  },
  3: {
    online: false
  },
  4: {
    online: false
  }
};
exports.MISSION_PLAN = MISSION_PLAN;
const gameState = {
  MISSION_NO: "1",
  MISSION_PLAN,
  planetList: "",
  vehicleList: ""
};
exports.gameState = gameState;
},{}],"initFunc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initButtons = initButtons;
exports.initslider = initslider;
exports.popultateplanetlist = popultateplanetlist;
exports.popultatvehiclelist = popultatvehiclelist;

var _gamestate = require("./gamestate");

var _Constants = require("./Constants");

function initButtons(handleUser, handleSubmit, Result) {
  //handle user interaction
  window.addEventListener("popstate", e => {
    $(".inherit div.min-h-screen").toggleClass("hidden");
  });
  $(".buttons").on("click", function buttonclick({
    target
  }) {
    handleUser({
      [$(this).attr("name")]: JSON.parse($(this).val())
    });
  });
  $(".submit_button").on("click", e => {
    e.preventDefault();

    if (window.confirm("Are you sure")) {
      handleSubmit();
    }
  });
  $(".reset").on("click", e => {
    e.preventDefault();
    (0, _gamestate.Reset)(_Constants.MISSION_PLAN);
  });
}

function initslider() {
  $(".slider").slick({
    infinite: false,
    slidesToShow: 2,
    dots: true,
    infinite: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        dots: true
      }
    }, {
      breakpoint: 300,
      settings: "unslick" // destroys slick

    }]
  });
}

function popultateplanetlist(classname, data) {
  document.getElementsByClassName(classname)[0].innerHTML = data.reduce((list, current, index) => list + `<div class="p-3 ${current.name}">
            <div class="bg-gray-900 shadow-lg rounded p-3">
            <div class="group relative">
            <img class="w-full   block rounded" src="https://upload.wikimedia.org/wikipedia/en/c/ca/Tycho_-_Awake.png" alt="">
            <div class="absolute  h-full bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">   
            <button name="planet" value=${JSON.stringify({
    name: current.name,
    distance: current.distance
  })} class="cursor-pointer fill-mode focus:animate-spin-slow  buttons bg-green-400 rounded-lg p-2 hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
            SELECT
            </button>     
            </div>
            </div>
            <div class="p-5">
            <h3 class="text-white text-lg">${current.name}</h3>
            <p class="text-gray-400">Max-Distance:${current.distance}</p>
            </div>
            </div>
           </div> 
           `, "");
}

function popultatvehiclelist(classname, data) {
  document.getElementsByClassName(classname)[0].innerHTML = data.reduce((list, current, index) => list + `<div class="p-3 ${current.name.replace(" ", "-")}">
            <div class="bg-gray-900 shadow-lg rounded p-3">
            <div class="group relative">
            <img class="w-full   block rounded" src="https://cdn.dribbble.com/users/968846/screenshots/3528105/mekik3.png?compress=1&resize=400x300" alt="">
            <div class="absolute  h-full bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">   
            <button name="vehicle" value=${JSON.stringify({
    name: current.name.replace(" ", "-"),
    max_distance: current.max_distance,
    total_no: current.total_no,
    speed: current.speed
  })} class="buttons cursor-pointer fill-mode focus:animate-spin-slow bg-green-400 rounded-lg p-2 hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
            SELECT
            </button>         
            </div>
            </div>
            <div class="p-5">
            <h3 class="text-white text-lg">${current.name}</h3>
            <p data-no=${current.total_no} class="text-gray-400 total_no">Total No :${current.total_no}</p>
            <p class="text-gray-400">Max Distance :${current.max_distance}</p>
            <p class="text-gray-400">Speed :${current.speed}</p>
            </div>
            </div>
           </div> 
           `, "");
}
},{"./gamestate":"gamestate.js","./Constants":"Constants.js"}],"utility/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Enable_Submit_button = Enable_Submit_button;
exports.Animation = Animation;
exports.Animation_vehicle = Animation_vehicle;
exports.Vehicle_toggle_func = Vehicle_toggle_func;
exports.Edit_MISSION_PLAN = Edit_MISSION_PLAN;
exports.Normalize_request_bdy = Normalize_request_bdy;
exports.find_totalTime = find_totalTime;
exports.fetch_result = fetch_result;
exports.ModifyResultScreen = ModifyResultScreen;
exports.Filter_planets = exports.Filter_vehicles = exports.Normalizer = void 0;

const Normalizer = data => data.reduce((obj, value) => {
  let {
    name
  } = value;
  return {
    [name]: value,
    ...obj
  };
}, {});

exports.Normalizer = Normalizer;

const Filter_vehicles = (vehicleList, value) => {
  let filteredlist = Object.values(vehicleList).filter(x => x.max_distance < value.distance);

  for (let x of filteredlist) {
    $(`.${x.name.replace(" ", "-")} button`)[0].classList.toggle("aria-disabled");
  }
};

exports.Filter_vehicles = Filter_vehicles;

const Filter_planets = (planetList, max_distance) => {
  let filteredlist = planetList.filter(x => x.distance > max_distance);

  for (let x of filteredlist) {
    $(`.${x.name} button`)[0].classList.toggle("aria-disabled");
  }
};

exports.Filter_planets = Filter_planets;

function Enable_Submit_button() {
  document.querySelector(".card-content button").removeAttribute("disabled");
}

function Animation(name, value, online) {
  const date = Date.now();

  function Animation() {
    let obj = {
      name,
      value,
      online
    };

    if (date + 1000 < Date.now()) {
      if (!obj.online) {
        $(".planets .aria-disabled").parent().removeClass("bg-opacity-60");
        $(".planets .aria-disabled").removeClass("aria-disabled");
        $("." + obj.value.name + " button").addClass("aria-disabled");
      }

      window.scrollTo({ ...$(".vehicles").position(),
        behavior: "smooth"
      });
      return;
    }

    requestAnimationFrame(Animation);
  }

  return Animation();
}

function Animation_vehicle(value) {
  const date = Date.now();

  function Animation() {
    let {
      name
    } = value;
    $(`.${name} .total_no`)[0].style.display = parseFloat($(`.${name} .total_no`)[0].innerText.split(":")[1]) == 0 ? "none!important" : "block!important";

    if (date + 1000 < Date.now()) {
      window.scrollTo({ ...$(".planets").position(),
        behavior: "smooth"
      });
      let tag = $(`.${name.replace(" ", "-")} .total_no`);
      let button = $(`.${name.replace(" ", "-")} button`);
      tag[0].innerText = `Total No :${Number(tag[0].innerText[10]) - 1}`;
      button.attr("disabled", tag[0].innerText[10] == 0);
      return;
    }

    requestAnimationFrame(Animation);
  }

  Animation();
}

var arr = [];

function Vehicle_toggle_func(value, mission_no) {
  if (arr.mission_no !== mission_no) {
    arr.shift();
  }

  if (arr[0] && !arr.includes(value.name)) {
    let tag = $(`div.${arr[0].replace(" ", "-")} .total_no`)[0];
    let button = $(`div.${arr[0].replace(" ", "-")} button`);
    tag.innerText = "Total No: " + (Number($(`div.${arr.shift().replace(" ", "-")} .total_no`)[0].innerText[10]) + 1);
    button.attr("disabled", tag.innerText[10] == 0);
  }

  arr = [...new Set([value.name, ...arr])];
  arr.mission_no = mission_no;
}

function Edit_MISSION_PLAN(planet, vehicle, no) {
  document.querySelectorAll(".text-xs h3")[no - 1].innerText = planet ? planet.name : "";
  document.querySelectorAll(".text-xs p")[no - 1].innerText = vehicle ? vehicle.name : "";

  if (planet && vehicle) {
    document.querySelectorAll("span.rounded-full")[no - 1].classList.toggle("bg-yellow-500");
    document.querySelectorAll("span.rounded-full")[no - 1].classList.add("bg-green-500", "animate-ping");
    document.querySelectorAll(".status")[no - 1].innerText = "Online";
    $(".aria-disabled").toggleClass("aria-disabled");
    document.querySelector(`.${planet.name} button`).classList.toggle("disabled");
  }
}

function Normalize_request_bdy(data, token) {
  return data.reduce((obj, value) => {
    let {
      planet,
      vehicle
    } = value;
    let {
      planet_names,
      vehicle_names
    } = obj;
    return {
      token,
      planet_names: [...planet_names, planet.name],
      vehicle_names: [...vehicle_names, vehicle.name.replace("-", " ")]
    };
  }, {
    planet_names: [],
    vehicle_names: []
  });
}

function find_totalTime(data) {
  return data.map(({
    planet,
    vehicle
  }) => planet.distance / vehicle.speed).reduce((obj, value) => obj + value);
}

async function fetch_result(data, token) {
  let url = data ? "find" : "token";
  let Nrlzdata = data ? Normalize_request_bdy(Object.values(data), token) : {};
  let response = await fetch("https://findfalcone.herokuapp.com/" + url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(Nrlzdata)
  });
  let newdata = await response.json();
  return await newdata;
}

function ModifyResultScreen(Search_Outcome, time) {
  document.querySelector(".result_screen h1").innerText = Search_Outcome.status !== "success" ? "The Mission was a Failure" : "The Mission was a Success";
  $(".inherit div.min-h-screen").toggleClass("hidden");

  if (Search_Outcome.status == "success") {
    document.querySelector(".result_screen p").innerHTML = `The Queen was found in ${Search_Outcome.planet_name}. The Mission took ${time} hours`;
  }

  if (Search_Outcome.status !== "success") {
    document.querySelector(".result_screen p").innerHTML = ``;
  }

  window.history.pushState({
    data: "moin"
  }, "New Page Title", "/result");
}
},{}],"ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModPlanets = ModPlanets;
exports.ModVehicles = ModVehicles;
exports.ModVoyage = ModVoyage;

var _helper = require("./utility/helper");

function ModPlanets(name, value, online) {
  (0, _helper.Animation)(name, value, online);
}

function ModVehicles(name, value, mission_no) {
  (0, _helper.Vehicle_toggle_func)(value, mission_no);
  (0, _helper.Animation_vehicle)(value);
}

function ModVoyage(no, self) {
  const {
    planet,
    vehicle
  } = self[no];
  (0, _helper.Edit_MISSION_PLAN)(planet, vehicle, no);
}
},{"./utility/helper":"utility/helper.js"}],"gamestate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUserFunction = exports.handleSubmit = exports.Reset = exports.default = void 0;

var _initFunc = require("./initFunc");

var _ui = require("./ui");

var _helper = require("./utility/helper");

var _Constants = require("./Constants");

const gameState = {
  MISSION_NO: "1",
  MISSION_PLAN: { ..._Constants.MISSION_PLAN
  },
  planetList: "",
  vehicleList: "",

  async fetchApi() {
    let response = await fetch("https://findfalcone.herokuapp.com/planets");
    let data = await response.json();
    this.planetList = await data;
    response = await fetch("https://findfalcone.herokuapp.com/vehicles");
    data = await response.json();
    this.vehicleList = (0, _helper.Normalizer)(data);
  },

  handleUser(value) {
    //handle user actions
    this.MISSION_PLAN[this.MISSION_NO] = { ...this.MISSION_PLAN[this.MISSION_NO],
      ...value
    };
    let {
      planet: planetinfo,
      online,
      vehicle: vehicleinfo
    } = this.MISSION_PLAN[this.MISSION_NO];

    switch (Object.keys(value)[0]) {
      case "planet":
        this.selectPlanet(planetinfo, online);
        break;

      case "vehicle":
        this.selectVehicle(vehicleinfo, online);
        break;
    }

    if (vehicleinfo && planetinfo) {
      this.MISSION_PLAN[this.MISSION_NO].online = true;
    }

    (0, _ui.ModVoyage)(this.MISSION_NO, this.MISSION_PLAN);

    if (vehicleinfo && planetinfo) {
      this.MISSION_NO++;
    }

    if (this.MISSION_NO == 5) {
      (0, _helper.Enable_Submit_button)();
    }
  },

  async handleSubmit() {
    let {
      token
    } = await (0, _helper.fetch_result)();
    let Search_Outcome = await (0, _helper.fetch_result)(this.MISSION_PLAN, token);
    let totaltime = (0, _helper.find_totalTime)(Object.values(this.MISSION_PLAN));
    (0, _helper.ModifyResultScreen)(Search_Outcome, totaltime);
  },

  selectPlanet(value, distance, online) {
    $(".vehicles .aria-disabled").toggleClass("aria-disabled");
    (0, _helper.Filter_vehicles)(this.vehicleList, value);
    (0, _ui.ModPlanets)("planet", value, distance, online);
  },

  selectVehicle({
    name,
    total_no,
    max_distance
  }) {
    $(".planets .aria-disabled").toggleClass("aria-disabled");
    (0, _helper.Filter_planets)(this.planetList, max_distance);
    (0, _ui.ModVehicles)("vehicle", {
      name,
      total_no
    }, this.MISSION_NO);
  },

  populate() {
    (0, _initFunc.popultateplanetlist)("planetlist", this.planetList);
    (0, _initFunc.popultatvehiclelist)("vehiclelist", Object.values(this.vehicleList));
  },

  loaderon() {
    $("body").loadingModal({
      position: "auto",
      text: "",
      color: "#fff",
      opacity: "0.7",
      backgroundColor: "rgba(37, 37, 19, 1)",
      animation: "wanderingCubes"
    });
  },

  Reset() {
    this.MISSION_PLAN = { ..._Constants.MISSION_PLAN
    };
    this.MISSION_NO = "1";
    $(".card-name-user").html("<h3 class='font-semibold'></h3><p></p>");
    $(".status").html("offline");
    $(".card-content-profil .gap-x-1").html("<span class='h-3 w-3 rounded-full bg-yellow-500'></span><span class='status'>offline</span></div>");
    $(".aria-disabled").toggleClass("aria-disabled");
    $(".disabled").toggleClass("disabled");
    $(".buttons").attr("disabled", false);
    Array.from($(".total_no")).forEach(x => {
      let name = x.getAttribute("data-no");
      x.innerText = `Total No :${name}`;
    });
  },

  loaderoff() {
    $("body").loadingModal("hide");
    $("body").loadingModal("destroy");
  }

};
var _default = gameState;
exports.default = _default;
const Reset = gameState.Reset.bind(gameState);
exports.Reset = Reset;
const handleSubmit = gameState.handleSubmit.bind(gameState);
exports.handleSubmit = handleSubmit;
const handleUserFunction = gameState.handleUser.bind(gameState);
exports.handleUserFunction = handleUserFunction;
},{"./initFunc":"initFunc.js","./ui":"ui.js","./utility/helper":"utility/helper.js","./Constants":"Constants.js"}],"init.js":[function(require,module,exports) {
"use strict";

var _gamestate = _interopRequireWildcard(require("./gamestate"));

var _initFunc = require("./initFunc");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function init() {
  _gamestate.default.loaderon();

  await _gamestate.default.fetchApi();

  _gamestate.default.populate();

  (0, _initFunc.initslider)();
  (0, _initFunc.initButtons)(_gamestate.handleUserFunction, _gamestate.handleSubmit, _gamestate.Reset);

  _gamestate.default.loaderoff();
}

init();
},{"./gamestate":"gamestate.js","./initFunc":"initFunc.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55554" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","init.js"], null)
//# sourceMappingURL=/init.9d6cb373.js.map