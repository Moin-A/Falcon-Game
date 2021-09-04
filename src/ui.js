import {
  Animation,
  Animation_vehicle,
  Vehicle_toggle_func,
  Edit_MISSION_PLAN,
} from "./utility/helper";

export function ModPlanets(name, value, online) {
  Animation(name, value, online);
}

export function ModVehicles(name, value, mission_no) {
  Vehicle_toggle_func(value, mission_no);
  Animation_vehicle(value);
}

export function ModVoyage(no, self) {
  const { planet, vehicle } = self[no];

  Edit_MISSION_PLAN(planet, vehicle, no);
}
