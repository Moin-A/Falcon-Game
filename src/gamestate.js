import { popultateplanetlist, popultatvehiclelist } from "./initFunc";
import { ModPlanets, ModVehicles, ModVoyage } from "./ui";
import {
  Normalizer,
  Filter_vehicles,
  Filter_planets,
  Enable_Submit_button,
  Normalize_request_bdy,
  fetch_result,
} from "./utility/helper";
import { MISSION_PLAN } from "./Constants";

const gameState = {
  MISSION_NO: "1",
  MISSION_PLAN,
  planetList: "",
  vehicleList: "",

  async fetchApi() {
    debugger;
    let response = await fetch("https://findfalcone.herokuapp.com/planets");
    let data = await response.json();
    this.planetList = await data;
    response = await fetch("https://findfalcone.herokuapp.com/vehicles");
    data = await response.json();
    this.vehicleList = Normalizer(data);
  },

  handleUser(value) {
    //handle user actions

    if (value.submit !== "Submit") {
      this.MISSION_PLAN[this.MISSION_NO] = {
        ...this.MISSION_PLAN[this.MISSION_NO],
        ...value,
      };
    }

    let {
      planet: planetinfo,
      online,
      vehicle: vehicleinfo,
    } = this.MISSION_PLAN[this.MISSION_NO];

    switch (Object.keys(value)[0]) {
      case "planet":
        this.selectPlanet(planetinfo, online);
        break;
      case "vehicle":
        this.selectVehicle(vehicleinfo, online);
        break;
      case "submit":
        this.handleSubmit();
        break;
    }

    if (vehicleinfo && planetinfo) {
      debugger;
      this.MISSION_PLAN[this.MISSION_NO].online = true;
    }

    ModVoyage(this.MISSION_NO, this.MISSION_PLAN);

    if (vehicleinfo && planetinfo) {
      this.MISSION_NO++;
    }

    if (this.MISSION_NO == 5) {
      Enable_Submit_button();
    }
  },

  async handleSubmit() {
    debugger;
    let response = await fetch("https://findfalcone.herokuapp.com/token", {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    let { token } = await response.json();
    const data = Normalize_request_bdy(Object.values(this.MISSION_PLAN), token);
    let moin = await fetch_result(data);
    $(".inherit div.min-h-screen").toggleClass("hidden");
    window.history.pushState({ data: "moin" }, "New Page Title", "/result");
    alert(moin.status);
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
  loaderon() {
    $("body").loadingModal({
      position: "auto",
      text: "",
      color: "#fff",
      opacity: "0.7",
      backgroundColor: "rgba(37, 37, 19, 1)",
      animation: "wanderingCubes",
    });
  },
  loaderoff() {
    $("body").loadingModal("hide");
    $("body").loadingModal("destroy");
  },
};

export default gameState;
export const handleSubmit = gameState.handleSubmit.bind(gameState);
export const handleUserFunction = gameState.handleUser.bind(gameState);
