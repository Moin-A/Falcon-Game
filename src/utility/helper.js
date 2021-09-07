export const Normalizer = (data) =>
  data.reduce((obj, value) => {
    let { name } = value;
    return { [name]: value, ...obj };
  }, {});

export const Filter_vehicles = (vehicleList, value) => {
  let filteredlist = Object.values(vehicleList).filter(
    (x) => x.max_distance < value.distance
  );
  for (let x of filteredlist) {
    $(`.${x.name.replace(" ", "-")} button`)[0].classList.toggle(
      "aria-disabled"
    );
  }
};

export const Filter_planets = (planetList, max_distance) => {
  let filteredlist = planetList.filter((x) => x.distance > max_distance);
  for (let x of filteredlist) {
    $(`.${x.name} button`)[0].classList.toggle("aria-disabled");
  }
};

export function Enable_Submit_button() {
  document.querySelector(".card-content button").removeAttribute("disabled");
}

export function Animation(name, value, online) {
  const date = Date.now();
  function Animation() {
    let obj = { name, value, online };

    if (date + 1000 < Date.now()) {
      if (!obj.online) {
        $(".planets .aria-disabled").parent().removeClass("bg-opacity-60");
        $(".planets .aria-disabled").removeClass("aria-disabled");
        $("." + obj.value.name + " button").addClass("aria-disabled");
      }
      window.scrollTo({ ...$(".vehicles").position(), behavior: "smooth" });
      return;
    }
    requestAnimationFrame(Animation);
  }
  return Animation();
}

export function Animation_vehicle(value) {
  const date = Date.now();
  function Animation() {
    let { name } = value;
    $(`.${name} .total_no`)[0].style.display =
      parseFloat($(`.${name} .total_no`)[0].innerText.split(":")[1]) == 0
        ? "none!important"
        : "block!important";

    if (date + 1000 < Date.now()) {
      window.scrollTo({ ...$(".planets").position(), behavior: "smooth" });
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
export function Vehicle_toggle_func(value, mission_no) {
  if (arr.mission_no !== mission_no) {
    arr.shift();
  }
  if (arr[0] && !arr.includes(value.name)) {
    let tag = $(`div.${arr[0].replace(" ", "-")} .total_no`)[0];
    let button = $(`div.${arr[0].replace(" ", "-")} button`);

    tag.innerText =
      "Total No: " +
      (Number(
        $(`div.${arr.shift().replace(" ", "-")} .total_no`)[0].innerText[10]
      ) +
        1);

    button.attr("disabled", tag.innerText[10] == 0);
  }

  arr = [...new Set([value.name, ...arr])];
  arr.mission_no = mission_no;
}

export function Edit_MISSION_PLAN(planet, vehicle, no) {
  document.querySelectorAll(".text-xs h3")[no - 1].innerText = planet
    ? planet.name
    : "";
  document.querySelectorAll(".text-xs p")[no - 1].innerText = vehicle
    ? vehicle.name
    : "";
  if (planet && vehicle) {
    document
      .querySelectorAll("span.rounded-full")
      [no - 1].classList.toggle("bg-yellow-500");
    document
      .querySelectorAll("span.rounded-full")
      [no - 1].classList.add("bg-green-500", "animate-ping");
    document.querySelectorAll(".status")[no - 1].innerText = "Online";
    $(".aria-disabled").toggleClass("aria-disabled");

    document
      .querySelector(`.${planet.name} button`)
      .classList.toggle("disabled");
  }
}

export function Normalize_request_bdy(data, token) {
  return data.reduce(
    (obj, value) => {
      let { planet, vehicle } = value;
      let { planet_names, vehicle_names } = obj;
      return {
        token,
        planet_names: [...planet_names, planet.name],
        vehicle_names: [...vehicle_names, vehicle.name.replace("-", " ")],
      };
    },
    { planet_names: [], vehicle_names: [] }
  );
}

export function find_totalTime(data) {
  return data
    .map(({ planet, vehicle }) => planet.distance / vehicle.speed)
    .reduce((obj, value) => obj + value);
}

export async function fetch_result(data, token) {
  let url = data ? "find" : "token";
  let Nrlzdata = data ? Normalize_request_bdy(Object.values(data), token) : {};

  let response = await fetch("https://findfalcone.herokuapp.com/" + url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(Nrlzdata),
  });

  let newdata = await response.json();

  return await newdata;
}

export function ModifyResultScreen(Search_Outcome, time) {
  document.querySelector(".result_screen h1").innerText =
    Search_Outcome.status !== "success"
      ? "The Mission was a Failure"
      : "The Mission was a Success";
  $(".inherit div.min-h-screen").toggleClass("hidden");

  if (Search_Outcome.status == "success") {
    document.querySelector(
      ".result_screen p"
    ).innerHTML = `The Queen was found in ${Search_Outcome.planet_name}. The Mission took ${time} hours`;
  }

  if (Search_Outcome.status !== "success") {
    document.querySelector(".result_screen p").empty.innerHTML = ``;
  }
  window.history.pushState({ data: "moin" }, "New Page Title", "/result");
}
