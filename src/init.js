import gameState, {
  handleUserFunction,
  Reset,
  handleSubmit,
} from "./gamestate";
import { initButtons, initslider } from "./initFunc";

async function init() {
  gameState.loaderon();
  await gameState.fetchApi();
  gameState.populate();
  initslider();
  initButtons(handleUserFunction, handleSubmit, Reset);
  gameState.loaderoff();
}

init();
