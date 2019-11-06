const MovingObject = require("../moving_object");
// const boom = require('../sprites/spritesheets/explosion.png')

// const BLASTTIME = 140;
const BLASTTIME = 70;


class VerticalExplosion extends MovingObject {
    constructor(options) {
        // options.radius = Ship.RADIUS;
        options.vel = options.vel || [0, 0];
        super(options);
        // this.vel = [0,4]
        this.color = 'yellow'
        this.isWrappable = false;

        this.boom = new Image();
        this.boom.src = "../src/sprites/spritesheets/vertical-explosion.png";

        this.health = BLASTTIME;
        this.update = this.update.bind(this)

        this.sx= 0;
        this.sy= 0;
        this.sWidth= 100;
        this.sHeight= 100;
        this.dx= this.pos[0] -70; 
        this.dy= this.pos[1] -20; 
        this.dWidth = 140;
        this.dHeight = 140;

    }

    update(delta) {
        this.health--

        // var healthDelta = delta * 0.15
        // this.health -= healthDelta
        if (this.health % 2 === 0) this.sx += this.sWidth;
        if (this.health % 20 === 0) {
            this.sy += this.sHeight;
            this.sx = 0
        }
        if (this.health <= 0) this.remove()
      }

    draw(ctx) {
        ctx.drawImage(this.boom, 
            this.sx, this.sy, this.sWidth,this.sHeight,
            this.dx,this.dy, this.dWidth, this.dHeight);
    
    } // draw

} // class

module.exports = VerticalExplosion