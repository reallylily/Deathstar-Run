const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const Ship = require("./ship");
const Background = require('./background')
const Util = require("./util");

class Game {
  constructor() {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.background = [];

    this.addAsteroids();
    this.addBackground();

    

  }

  add(object) {
    if (object instanceof Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Ship) {
      this.ships.push(object);    
    } else if (object instanceof Background) {
        this.background.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addAsteroids() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroid({ game: this }));
    }
  }

  addAsteroid() {
    // for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroid({ game: this }));
    // }
  }

  addShip() {
    const ship = new Ship({
      pos: this.startingPosition(),
      // pos: this.randomPosition(),
      game: this
    });

    this.add(ship);
    return ship;
  }

  addBackground() {

    const background = new Background({
      game: this,
    });

    this.add(background);
    return background;
  }

  allObjects() {
    return [].concat(this.ships, this.asteroids, this.bullets);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.background.concat(this.allObjects()).forEach((object) => {
      object.draw(ctx);
    });    
    // this.allObjects().concat(this.background).forEach((object) => {
    //   object.draw(ctx);
    // });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      0
      // Game.DIM_Y * Math.random()
    ];
  }

  startingPosition() {
    return [275,580]
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroid) {

    if (this.asteroids.indexOf(object) % 2 === 0) this.addAsteroid()
      
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }
  
  wrap(pos) {
    // return pos
    return [
      Util.bounce(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }

  trap(pos) {
    // return pos
    return [
      Util.trap(pos[0], Game.DIM_X), Util.trap(pos[1], Game.DIM_Y)
    ];
  }
  
  // bounce(vel) {
  //   // return vel
  //   return Util.bounce(vel)
  //   // return [
  //     //   Util.bounce(vel[0], Game.DIM_X), Util.bounce(vel[1], Game.DIM_Y)
  //     // ];
  //   }
  
    step(delta) {
      this.moveObjects(delta);
      this.checkCollisions();
      // console.log(this)
      // console.log(this.ships[0].update())
      this.ships[0].update()
    }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 550;
Game.DIM_Y = 680;
// Game.FPS = 240;
Game.FPS = 32;
// Game.NUM_ASTEROIDS = 1;
Game.NUM_ASTEROIDS = 10;

module.exports = Game;
