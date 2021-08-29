import { popultateplanetlist, popultatvehiclelist } from "./initFunc";
import { ModPlanets, ModVehicles, ModVoyage } from "./ui";
import { Normalizer, Filter_vehicles, Filter_planets } from "./utility/helper";
import { MISSION_PLAN } from "./Constants";

const gameState = {
  MISSION_NO: "1",
  MISSION_PLAN,
  planetList: "",
  vehicleList: "",

  async fetchApi() {
    let response = await fetch("https://findfalcone.herokuapp.com/planets");
    let data = await response.json();
    this.planetList = await data;
    response = await fetch("https://findfalcone.herokuapp.com/vehicles");
    data = await response.json();
    this.vehicleList = Normalizer(data);
  },

  handleUser(value) {
    //handle user actions
    this.MISSION_PLAN[this.MISSION_NO] = {
      ...this.MISSION_PLAN[this.MISSION_NO],
      ...value,
    };

    let {
      planet: planetinfo,
      online,
      vehicle: vehicleinfo,
    } = this.MISSION_PLAN[this.MISSION_NO];
    debugger;
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

    ModVoyage(this.MISSION_NO, this.MISSION_PLAN);

    if (vehicleinfo && planetinfo) {
      this.MISSION_NO++;
    }
  },

  selectPlanet(value, distance, online) {
    $(".vehicles .aria-disabled").toggleClass("aria-disabled");
    Filter_vehicles(this.vehicleList, value);
    ModPlanets("planet", value, distance, online);
  },
  selectVehicle({ name, total_no, max_distance }) {
    $(".planets .aria-disabled").toggleClass("aria-disabled");
    Filter_planets(this.planetList, max_distance);
    ModVehicles("vehicle", { name, total_no }, this.MISSION_NO);
  },

  populate() {
    popultateplanetlist("planetlist", this.planetList);
    popultatvehiclelist("vehiclelist", Object.values(this.vehicleList));
  },
};

export default gameState;

export const handleUserFunction = gameState.handleUser.bind(gameState);
