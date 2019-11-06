const MovingObject = require("../moving_object");
const VortexExplosion = require('../fx/vortex_explosion')

// const Tie = require("../ships/tie");


class PhotonTorpedo extends MovingObject {
  constructor(options) {
    options.radius = PhotonTorpedo.RADIUS;
    super(options);
    this.isWrappable = false;
    this.laser = new Image();
    this.laser.src = "../src/sprites/spritesheets/torpedo.png";
    this.health = 10
    this.exploded = false
  }

  draw(ctx) {
      // ctx.fillStyle = this.color;

      // ctx.beginPath();
      // ctx.arc(
      //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      // );
      // ctx.fill();

    ctx.drawImage(this.laser,this.pos[0] - 10,this.pos[1]-8, 20, 35);
  }

  update() {
    if (this.health <= 0) {
      this.remove();
    }
    if (this.radius > PhotonTorpedo.RADIUS) {
      if (!this.exploded) {
        this.exploded = true;
        const boom = new VortexExplosion({
          pos: [this.pos[0], this.pos[1]],
          vel: this.vel,
          game: this.game,
        });
        this.game.add(boom);
      }
      this.health--;
    }
}


} // class

PhotonTorpedo.RADIUS = 12;
PhotonTorpedo.SPEED = 15;

module.exports = PhotonTorpedo;
