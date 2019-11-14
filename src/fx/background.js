class Background {
    constructor(game) {

        this.game = game;
        this.background = new Image();
        this.background.src = "../src/sprites/spritesheets/longtrench.png";

        this.sx= 0;
        this.sy= 0;
        this.sWidth= 230;
        this.sHeight= 4430;
        this.dx= 0; 
        this.dy= 0; 
        this.dWidth= 550;
        this.dHeight= this.sHeight * 2;
    }

    draw(ctx) {
        if (this.dy >= 0) this.dy -= 3786*2
        ctx.drawImage(this.background, 
            this.sx, this.sy, this.sWidth,this.sHeight,
            this.dx,this.dy, this.dWidth, this.dHeight);
    
    } // draw

    update(delta) {
        var scrollDelta = Math.floor(delta * 0.8)
        if (scrollDelta === 0) scrollDelta = 1
        // console.log(scrollDelta)
        this.dy += scrollDelta
    }

} // class

module.exports = Background