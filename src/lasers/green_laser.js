const MovingObject = require("../moving_object");

class GreenLaser extends MovingObject {
  constructor(options) {
    options.radius = GreenLaser.RADIUS;
    super(options);
    this.isWrappable = false;
    this.color = '#00FF00'
  }

} // class

GreenLaser.RADIUS = 2;
GreenLaser.SPEED = 15;

module.exports = GreenLaser;
