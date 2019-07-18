const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Bullet = require("./bullet");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 20,
  SPEED: 4
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();
    let shipImage = new Image();
    shipImage.src = "../src/sprites/spritesheets/tiefighter.png";
    ctx.drawImage(shipImage,this.pos[0]-24 ,this.pos[1]-24 , 48, 48);
  // imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }
}

module.exports = Asteroid;
