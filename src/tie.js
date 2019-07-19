const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Bullet = require("./lasers/bullet");
const GreenLaser = require('./lasers/green_laser')

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 20,
  SPEED: 5,
  HEALTH: 4,
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
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.health--
      if (this.health <= 0) {
        this.remove();
      }
      otherObject.remove();
      return true;
    }

    return false;
  }

  fireBullet() {
    const norm = Util.norm(this.vel);

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

  update() {
    if (this.overheated <= 0) (this.fireBullet() );
    this.overheated--
  }

}

module.exports = Tie;
