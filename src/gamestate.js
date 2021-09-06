import {
  popultateplanetlist,
  popultatvehiclelist,
  initslider,
} from "./initFunc";
import { ModPlanets, ModVehicles, ModVoyage } from "./ui";
import {
  Normalizer,
  Filter_vehicles,
  Filter_planets,
  Enable_Submit_button,
  fetch_result as fetch_APi,
  ModifyResultScreen,
} from "./utility/helper";
import { MISSION_PLAN as PLAN } from "./Constants";

const gameState = {
  MISSION_NO: "1",
  MISSION_PLAN: { ...PLAN },
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

    if (this.MISSION_NO == 5) {
      Enable_Submit_button();
    }
  },

  async handleSubmit() {
    let { token } = await fetch_APi();
    let Search_Outcome = await fetch_APi(this.MISSION_PLAN, token);
    ModifyResultScreen(Search_Outcome);
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
  Reset() {
    this.MISSION_PLAN = { ...PLAN };
    this.MISSION_NO = "1";
    $(".card-name-user").html("<h3 class='font-semibold'></h3><p></p>");
    $(".status").html("offline");
    $(".card-content-profil .gap-x-1").html(
      "<span class='h-3 w-3 rounded-full bg-yellow-500'></span><span class='status'>offline</span></div>"
    );
    $(".aria-disabled").toggleClass("aria-disabled");
    $(".disabled").toggleClass("disabled");
    $(".buttons").attr("disabled", false);
    Array.from($(".total_no")).forEach((x) => {
      let name = x.getAttribute("data-no");
      x.innerText = `Total No :${name}`;
    });
  },
  loaderoff() {
    $("body").loadingModal("hide");
    $("body").loadingModal("destroy");
  },
};

export default gameState;
export const Reset = gameState.Reset.bind(gameState);
export const handleSubmit = gameState.handleSubmit.bind(gameState);
export const handleUserFunction = gameState.handleUser.bind(gameState);
