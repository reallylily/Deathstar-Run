const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
    this.laser = new Image();
    this.laser.src = "../src/sprites/spritesheets/laser.png";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.drawImage(this.laser,this.pos[0]-1,this.pos[1]-6, 3, 30);
  }

} // class

Bullet.RADIUS = 2;
Bullet.SPEED = 15;

module.exports = Bullet;
