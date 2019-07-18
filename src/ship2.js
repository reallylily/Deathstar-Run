const CONTROLS = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SHIFT: 16,
    SPACE: 32
  }
  ​
  class Ship {
    constructor(game) {
      this.game = game;
      this.cvs = game.cvs,
      this.ctx = game.ctx,
      this.x = this.cvs.width / 2;
      this.y = this.cvs.height - 180;
      this.movement = 3;
      this.focusMovement = 1;
      this.keyDown = {
        UP: false,
        DOWN: false,
        LEFT: false,
        RIGHT: false,
        SHIFT: false,
        SPACE: false,
      }
    }
  ​
    trackMovements() {
      if(this.game.state === 'RUNNING_GAME') {
        document.addEventListener('keydown', (e) => {
          switch (e.keyCode) {
            case CONTROLS.UP: 
              this.keyDown.UP = true;
              break;
            case CONTROLS.DOWN: 
              this.keyDown.DOWN = true;
              break;
            case CONTROLS.LEFT:
              this.keyDown.LEFT = true;
              break;
            case CONTROLS.RIGHT:
              this.keyDown.RIGHT = true;
              break;
            case CONTROLS.SHIFT:
              this.keyDown.SHIFT = true;
              break;
            case CONTROLS.SPACE:
              this.keyDown.SPACE = true;
          }
        });
  ​
        document.addEventListener('keyup', (e) => {
          switch (e.keyCode) {
            case CONTROLS.UP:
              this.keyDown.UP = false;
              break;
            case CONTROLS.DOWN:
              this.keyDown.DOWN = false;
              break;
            case CONTROLS.LEFT:
              this.keyDown.LEFT = false;
              break;
            case CONTROLS.RIGHT:
              this.keyDown.RIGHT = false;
              break;
            case CONTROLS.SHIFT:
              this.keyDown.SHIFT = false;
            case CONTROLS.SPACE:
              this.keyDown.SPACE = false;
          }
        })
      }
    }
  ​
    update() {
      if (this.keyDown.UP) this.y -= (this.keyDown.SHIFT ? this.focusMovement : this.movement);
      if (this.keyDown.DOWN) this.y += (this.keyDown.SHIFT ? this.focusMovement : this.movement);
      if (this.keyDown.LEFT) this.x -= (this.keyDown.SHIFT ? this.focusMovement : this.movement);
      if (this.keyDown.RIGHT) this.x += (this.keyDown.SHIFT ? this.focusMovement : this.movement);
      if (this.keyDown.SPACE) this.x += (this.keyDown.SHIFT ? this.focusMovement : this.movement);
    }
  ​
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'white';
      this.ctx.moveTo(this.x, this.y - 20);
      this.ctx.lineTo(this.x - 15, this.y + 20);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.lineTo(this.x + 15, this.y + 20);
      this.ctx.closePath();
      this.ctx.fill();
    }
  ​
  }
  ​
  // export default Ship;