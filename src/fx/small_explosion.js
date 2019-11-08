const MovingObject = require("../moving_object");
// const boom = require('../sprites/spritesheets/explosion.png')

const BLASTTIME = 30;

class SmallExplosion extends MovingObject {
    constructor(options) {
        // options.radius = Ship.RADIUS;
        options.vel = options.vel || [0, 0];
        super(options);
        this.color = 'yellow'
        this.isWrappable = false;

        this.boom = new Image();
        this.boom.src = "../src/sprites/spritesheets/explosion.png";

        this.health = BLASTTIME;
        this.update = this.update.bind(this)

        this.sx= 0;
        this.sy= 0;
        this.sWidth= 16;
        this.sHeight= 16;
        this.dx= this.pos[0]; 
        this.dy= this.pos[1]; 
        this.dWidth = 16;
        this.dHeight = 16;

    }

    update(delta) {
        // if (this.health < (BLASTTIME * (1/5)) ) this.sx + this.sWidth
        if (this.health < (BLASTTIME * (4/5)) ) this.sx = this.sWidth
        if (this.health < (BLASTTIME * (3/5)) ) this.sx = this.sWidth * 2
        if (this.health < (BLASTTIME * (2/5)) ) this.sx = this.sWidth * 3
        if (this.health < (BLASTTIME * (1/5)) ) this.sx = this.sWidth * 4

        // this.health--
        
        var healthDelta = Math.floor(delta * 0.15)
        if (healthDelta === 0) healthDelta = 1
        // console.log(healthDelta)
        this.health -= healthDelta

        if (this.health <= 0) this.remove()
      }

    draw(ctx) {
        
        ctx.drawImage(this.boom, 
            this.sx, this.sy, this.sWidth,this.sHeight,
            this.dx,this.dy, this.dWidth, this.dHeight);
    
    } // draw

} // class

module.exports = SmallExplosion