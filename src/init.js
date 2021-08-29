import gameState, { handleUserFunction } from "./gamestate";
import { initButtons, initslider } from "./initFunc";

async function init() {
  await gameState.fetchApi();
  gameState.populate();
  initslider();
  initButtons(handleUserFunction);
}

init();
