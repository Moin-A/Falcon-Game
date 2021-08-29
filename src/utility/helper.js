export const Normalizer = (data) =>
  data.reduce((obj, value) => {
    let { name } = value;
    return { [name]: value, ...obj };
  }, {});

export const Filter_vehicles = (vehicleList, value) => {
  debugger;
  let filteredlist = Object.values(vehicleList).filter(
    (x) => x.max_distance < value.distance
  );
  for (let x of filteredlist) {
    debugger;
    $(`.${x.name.replace(" ", "-")} button`)[0].classList.toggle(
      "aria-disabled"
    );
    debugger;
  }
};

export const Filter_planets = (planetList, max_distance) => {
  debugger;
  let filteredlist = planetList.filter((x) => x.distance > max_distance);
  for (let x of filteredlist) {
    $(`.${x.name} button`)[0].classList.toggle("aria-disabled");
  }
};

export function Animation(name, value, online) {
  const date = Date.now();
  function Animation() {
    let obj = { name, value, online };
    debugger;
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
