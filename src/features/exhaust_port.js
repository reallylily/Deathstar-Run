const Util = require("../util");
const MovingObject = require("../moving_object");
// const Ship = require("./ship");
// const Bullet = require("../weapons/bullet");
const PhotonTorpedo = require('../weapons/photon_torpedo')

// const GreenLaser = require('../weapons/green_laser')
// const SmallExplosion = require('../fx/small_explosion')
const BigExplosion = require('../fx/big_explosion')
// const VerticalExplosion = require('../fx/vertical_explosion')

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 40,
//   SPEED: 5,
  HEALTH: 15,
};

// const COOLDOWN = 10;
// const LONGCOOLDOWN = 60;

class ExhaustPort extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    // options.vel = [0,5]
    // options.health = DEFAULTS.HEALTH;
    super(options);
    this.bounces = true;
    this.vel = [0,12]
    // this.health = DEFAULTS.HEALTH;
    // this.color = '#00FF00'
    // this.overheated = Math.floor(Math.random() * 100)
    // this.burst = false
  }
  
  draw(ctx) {
      // ctx.fillStyle = 'red';

      // ctx.beginPath();
      // ctx.arc(
      //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      // );
      // ctx.fill();
    let shipImage = new Image();
    shipImage.src = "../src/sprites/spritesheets/exhaust-only.png";
    ctx.drawImage(shipImage,this.pos[0]-250 ,this.pos[1]-115 , 550, 128 *2);
  }
  
  collideWith(otherObject) {
     if (otherObject instanceof PhotonTorpedo && otherObject.radius < 100) {
        this.game.game_won = true;

    //   if (otherObject.radius < 110) {
    //     const boom = new BigExplosion({
    //       pos: [this.pos[0], this.pos[1]],
    //       vel: this.vel,
    //       color: 'yellow',
    //       game: this.game,
    //     });
    //     this.game.add(boom);
    //     this.remove();
        // otherObject.remove();
    //   }

      return true;
    }

    return false;
  }

  update() {
    // if (this.overheated <= 0) (this.fireBullet() );
    // this.overheated--
  }

}

module.exports = ExhaustPort;
