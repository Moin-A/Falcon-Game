import { Animation, Animation_vehicle } from "./utility/helper";
export function ModPlanets(name, value, online) {
  Animation(name, value, online);
}
var arr = [];

export function ModVehicles(name, value, mission_no) {
  if (arr.mission_no !== mission_no) {
    arr.shift();
  }
  if (arr[0] && !arr.includes(value.name)) {
    document.querySelector(
      `div.${arr[0].replace(" ", "-")} .total_no`
    ).innerText =
      "Total No:" +
      (parseInt(
        document
          .querySelector(`div.${arr.shift().replace(" ", "-")} .total_no`)
          .innerText.split(":")[1]
      ) +
        1);
  }

  arr = [...new Set([value.name, ...arr])];
  arr.mission_no = mission_no;
  Animation_vehicle(value);
}

export function ModVoyage(no, self) {
  const { planet, vehicle } = self[no];

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
    document.querySelectorAll(".status")[no - 1].innerText = "online";
    $(".aria-disabled").toggleClass("aria-disabled");

    document
      .querySelector(`.${planet.name} button`)
      .classList.toggle("disabled");
  }
}
