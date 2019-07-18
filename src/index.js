import _ from 'lodash';
const Game = require("./game");
// const GameView = require("./game_view");
import GameView from './game_view'



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
  
});

function component() {
  console.log("hello I'm here")
    
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
      
document.body.appendChild(component());