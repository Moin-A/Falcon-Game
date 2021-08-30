import gameState, { handleUserFunction } from "./gamestate";
import { initButtons, initslider } from "./initFunc";

async function init() {
  gameState.loaderon();
  await gameState.fetchApi();
  gameState.populate();
  initslider();
  initButtons(handleUserFunction);
  gameState.loaderoff();
}

init();
