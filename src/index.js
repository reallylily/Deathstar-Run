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

// function component() {
//   // console.log("hello I'm here")
    
//   // const element = document.createElement('div');
//   // const element = <iframe width="560" height="315" src="https://www.youtube.com/embed/2WBG2rJZGW8?controls=0&amp;start=801" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

//   const element = document.createElement('div');
//   // element.innerHTML = _.join([`<iframe width="560" height="315" src="https://www.youtube.com/embed/2WBG2rJZGW8?controls=0&amp;start=801" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`]);
//   element.innerHTML = _.join([`<iframe src="https://www.youtube.com/embed/2WBG2rJZGW8?start=801&end=831&autoplay=1&modestbranding=1&rel=0&color=white&controls=0" width="560" height="315" frameborder="0"></iframe>`])
//   return element;
// }
      
// document.body.appendChild(component());