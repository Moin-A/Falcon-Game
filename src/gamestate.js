import { popultateplanetlist, popultatvehiclelist } from "./initFunc";
import { ModPlanets, ModVehicles, ModVoyage } from "./ui";

const gameState = {
  MISSION_NO: "1",
  MISSION_PLAN: {
    1: { online: false },
    2: { online: false },
    3: { online: false },
    4: { online: false },
  },
  planetList: "",
  vehicleList: "",

  async fetchApi() {
    let response = await fetch("https://findfalcone.herokuapp.com/planets");
    let data = await response.json();
    this.planetList = await data;
    response = await fetch("https://findfalcone.herokuapp.com/vehicles");
    data = await response.json();

    this.vehicleList = data.reduce((obj, value) => {
      let { name } = value;
      return { [name]: value, ...obj };
    }, {});
  },

  handleUser(value) {
    //handle user actions

    const { planet, vehicle } = value;
    this.MISSION_PLAN[this.MISSION_NO] = {
      ...this.MISSION_PLAN[this.MISSION_NO],
      ...value,
    };

    let {
      planet: planetinfo,
      online,
      vehicle: vehicleinfo,
    } = this.MISSION_PLAN[this.MISSION_NO];

    switch (Object.keys(value).shift()) {
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

    ModVoyage(this.MISSION_NO, this.MISSION_PLAN);

    if (vehicleinfo && planetinfo) {
      this.MISSION_NO++;
    }
  },

  selectPlanet(value, distance, online) {
    $(".vehicles .aria-disabled").toggleClass("aria-disabled");
    let filteredlist = Object.values(this.vehicleList).filter(
      (x) => x.max_distance < value.distance
    );
    debugger;
    for (let x of filteredlist) {
      $(`.${x.name.replace(" ", "-")} button`)[0].classList.toggle(
        "aria-disabled"
      );
    }
    ModPlanets("planet", value, distance, online);
  },
  selectVehicle({ name, total_no, max_distance }) {
    $(".planets .aria-disabled").toggleClass("aria-disabled");
    let filteredlist = this.planetList.filter((x) => x.distance > max_distance);

    for (let x of filteredlist) {
      $(`.${x.name} button`)[0].classList.toggle("aria-disabled");
    }
    debugger;
    ModVehicles("vehicle", { name, total_no }, this.MISSION_NO);
  },

  populate() {
    popultateplanetlist("planetlist", this.planetList);
    popultatvehiclelist("vehiclelist", Object.values(this.vehicleList));
  },
};

export default gameState;

export const handleUserFunction = gameState.handleUser.bind(gameState);
