import { Reset } from "./gamestate";
import { MISSION_PLAN } from "./Constants";
export function initButtons(handleUser, handleSubmit, Result) {
  //handle user interaction
  window.addEventListener("popstate", (e) => {
    $(".inherit div.min-h-screen").toggleClass("hidden");
  });
  $(".buttons").on("click", function buttonclick({ target }) {
    handleUser({ [$(this).attr("name")]: JSON.parse($(this).val()) });
  });
  $(".submit_button").on("click", (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure")) {
      handleSubmit();
    }
  });
  $(".reset").on("click", (e) => {
    e.preventDefault();
    Reset(MISSION_PLAN);
  });
}

export function initslider() {
  $(".slider").slick({
    infinite: false,
    slidesToShow: 2,
    dots: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 300,
        settings: "unslick", // destroys slick
      },
    ],
  });
}

export function popultateplanetlist(classname, data) {
  document.getElementsByClassName(classname)[0].innerHTML = data.reduce(
    (list, current, index) =>
      list +
      `<div class="p-3 ${current.name}">
            <div class="bg-gray-900 shadow-lg rounded p-3">
            <div class="group relative">
            <img class="w-full   block rounded" src="https://upload.wikimedia.org/wikipedia/en/c/ca/Tycho_-_Awake.png" alt="">
            <div class="absolute  h-full bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">   
            <button name="planet" value=${JSON.stringify({
              name: current.name,
              distance: current.distance,
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
           `,
    ""
  );
}

export function popultatvehiclelist(classname, data) {
  document.getElementsByClassName(classname)[0].innerHTML = data.reduce(
    (list, current, index) =>
      list +
      `<div class="p-3 ${current.name.replace(" ", "-")}">
            <div class="bg-gray-900 shadow-lg rounded p-3">
            <div class="group relative">
            <img class="w-full   block rounded" src="https://cdn.dribbble.com/users/968846/screenshots/3528105/mekik3.png?compress=1&resize=400x300" alt="">
            <div class="absolute  h-full bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">   
            <button name="vehicle" value=${JSON.stringify({
              name: current.name.replace(" ", "-"),
              max_distance: current.max_distance,
              total_no: current.total_no,
              speed: current.speed,
            })} class="buttons cursor-pointer fill-mode focus:animate-spin-slow bg-green-400 rounded-lg p-2 hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
            SELECT
            </button>         
            </div>
            </div>
            <div class="p-5">
            <h3 class="text-white text-lg">${current.name}</h3>
            <p data-no=${
              current.total_no
            } class="text-gray-400 total_no">Total No :${current.total_no}</p>
            <p class="text-gray-400">Max Distance :${current.max_distance}</p>
            <p class="text-gray-400">Speed :${current.speed}</p>
            </div>
            </div>
           </div> 
           `,
    ""
  );
}
