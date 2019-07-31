class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();

    this.playing = true
  }


  start() {
    // this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    this.playing = false
  }

  animate(time) {
    if(!this.playing){this.ctx=null; return;}


    const timeDelta = time - this.lastTime;
    
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));

    if (this.game.game_won) {
      this.stop()
      document.body.appendChild(this.playMoive());
      let parent = document.getElementById("canvas-container");
      let child = document.getElementById('canvas');
      parent.removeChild(child)
    }
  }

  playMoive() {
    const element = document.createElement('div');
    element.innerHTML = _.join([`<iframe src="https://www.youtube.com/embed/2WBG2rJZGW8?start=801&end=831&autoplay=1&modestbranding=1&rel=0&color=white&controls=0" width="1120" height="630" frameborder="0"></iframe>`])
    return element;
  }

}



module.exports = GameView;
