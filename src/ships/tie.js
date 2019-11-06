const Util = require("../util");
const MovingObject = require("../moving_object");
const Ship = require("./ship");
const Bullet = require("../weapons/bullet");
const PhotonTorpedo = require('../weapons/photon_torpedo')

const GreenLaser = require('../weapons/green_laser')
const SmallExplosion = require('../fx/small_explosion')
const BigExplosion = require('../fx/big_explosion')
const VerticalExplosion = require('../fx/vertical_explosion')

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 20,
  SPEED: 5,
  HEALTH: 15,
};

const COOLDOWN = 10;
const LONGCOOLDOWN = 60;

class Tie extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    // options.health = DEFAULTS.HEALTH;
    super(options);
    this.bounces = true;
    this.health = DEFAULTS.HEALTH;
    // this.color = '#00FF00'
    this.overheated = Math.floor(Math.random() * 100)
    this.burst = false
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    let shipImage = new Image();
    shipImage.src = "../src/sprites/spritesheets/tiefighter.png";
    ctx.drawImage(shipImage,this.pos[0]-24 ,this.pos[1]-24 , 48, 48);
  }
  
  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      // otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet) {
      const boom = new SmallExplosion({
        pos: [otherObject.pos[0], otherObject.pos[1]],
        vel: [0,0],
        color: 'yellow',
        game: this.game,
      });
      this.game.add(boom);
      this.health--
      if (this.health <= 0) {
        this.remove();
        const boom = new VerticalExplosion({
          pos: [otherObject.pos[0], otherObject.pos[1]],
          vel: this.vel,
          color: 'yellow',
          game: this.game,
        });
        this.game.add(boom);
      } 
    } else if (otherObject instanceof PhotonTorpedo) {

      if (otherObject.radius === 110) {
        const boom = new BigExplosion({
          pos: [this.pos[0], this.pos[1]],
          vel: this.vel,
          color: 'yellow',
          game: this.game,
        });
        this.game.add(boom);
        this.remove();
        // otherObject.remove();
      } else {
        otherObject.radius = 110
      }

      return true;
    }

    return false;
  }

  fireBullet() {
    const bulletVel = [0,20]

    const right = new GreenLaser({
      pos: [this.pos[0] + 2, this.pos[1] + 9],
      vel: bulletVel,
      color: this.color,
      game: this.game
    });
    const left = new GreenLaser({
      pos: [this.pos[0] - 6, this.pos[1] + 9],
      vel: bulletVel,
      color: this.color,
      game: this.game
    });
    this.game.add(right);
    this.game.add(left);
    this.overheated = COOLDOWN
    if (this.burst) {
      this.overheated += LONGCOOLDOWN;
      this.burst = false
    } else {
      this.burst = true
    }
  }

  update(delta) {
    var overheatDelta = delta * 0.15
    if (this.overheated <= 0) (this.fireBullet() );
    this.overheated -= overheatDelta
  }

}

module.exports = Tie;
