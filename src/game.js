const Bullet = require("./weapons/bullet");
const GreenLaser = require('./weapons/green_laser')
const PhotonTorpedo = require('./weapons/photon_torpedo')


const Ship = require("./ships/ship");
const Tie = require("./ships/tie");
const ExhaustPort = require("./features/exhaust_port");

const SmallExplosion = require('./fx/small_explosion')
const BigExplosion = require('./fx/big_explosion')
const VerticalExplosion = require('./fx/vertical_explosion')
const VortexExplosion = require('./fx/vortex_explosion')


const Background = require('./fx/background')

const Util = require("./util");

const KILLS_TO_WIN = 100

class Game {
  constructor() {
    this.enemies = [];
    this.bullets = [];
    this.ships = [];
    this.background = [];
    this.explosions = [];
    this.exhaust_port = [];

    this.addEnemies();
    this.addBackground();

    this.kill_count = 0

    // this.game_won = true;
    this.game_won = false;

  }

  add(object) {
    if (object instanceof Tie) {
      this.enemies.push(object);
    } else if (object instanceof ExhaustPort) {
      this.exhaust_port.push(object);    }
    else if (object instanceof Bullet) {
      this.bullets.push(object);
    } else if (object instanceof GreenLaser) {
      this.bullets.push(object);
    } else if (object instanceof PhotonTorpedo) {
      this.bullets.push(object);
    } else if (object instanceof Ship) {
      this.ships.push(object);    
    } else if (object instanceof Background) {
      this.background.push(object);
    } else if (object instanceof SmallExplosion) {
        this.explosions.push(object);
    } else if (object instanceof BigExplosion) {
      this.explosions.push(object);
    } else if (object instanceof VerticalExplosion) {
      this.explosions.push(object);
    } else if (object instanceof VortexExplosion) {
      this.explosions.unshift(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addEnemies() {
    for (let i = 0; i < Game.NUM_ENEMIES; i++) {
      this.add(new Tie({ game: this }));
    }
  }

  addEnemy() {
      this.add(new Tie({ game: this }));
  }

  addExhaustPort() {
    this.add(new ExhaustPort({ game: this, pos: this.topMidPosition() }));
  }

  addShip() {
    const ship = new Ship({
      pos: this.startingPosition(),
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
    return [].concat(this.exhaust_port, this.ships, this.enemies, this.bullets);
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

    // Log the objects being rendered
    // console.log(this.background.concat(this.allObjects()).concat(this.explosions))
    this.background.concat(this.allObjects()).concat(this.explosions).forEach((object) => {
      object.draw(ctx);
    });    
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

  topMidPosition() {
    return [275,0]
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof GreenLaser) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof PhotonTorpedo) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Tie) {
      var spawnIdx = [0,1,2]
      if (spawnIdx.includes(this.enemies.indexOf(object))) this.addEnemies()
      // if (this.enemies.indexOf(object) === 1) this.addEnemies()
      // if (this.enemies.indexOf(object) === 2) this.addEnemies()
      // if (this.enemies.indexOf(object) === 5) this.addEnemies()
      
      this.enemies.splice(this.enemies.indexOf(object), 1);
      this.kill_count += 1;
    } else if (object instanceof ExhaustPort) {
      this.exhaust_port.splice(this.exhaust_port.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof SmallExplosion) {
      this.explosions.splice(this.explosions.indexOf(object), 1);
    } else if (object instanceof BigExplosion) {
      this.explosions.splice(this.explosions.indexOf(object), 1);
    } else if (object instanceof VerticalExplosion) {
      this.explosions.splice(this.explosions.indexOf(object), 1);
    } else if (object instanceof VortexExplosion) {
      this.explosions.splice(this.explosions.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }
  
  wrap(pos) {
    return [
      pos[0], Util.wrap(pos[1], Game.DIM_Y)
    ];
  }

  trap(pos) {
    return [
      Util.trap(pos[0], Game.DIM_X), Util.trap(pos[1], Game.DIM_Y)
    ];
  }
  
  bounce(pos, vel) {
    if (pos[1] >= Game.DIM_Y ) return vel
    return Util.bounce(vel)
  }
  
  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
    this.ships[0].update(delta)
    this.enemies.forEach(fighter => fighter.update(delta))
    this.explosions.forEach(boom => boom.update(delta))
    this.bullets.forEach(bullet => { if (bullet instanceof PhotonTorpedo) bullet.update(delta) })
    
    this.background[0].update(delta)
    // this.exhaust_port[0].update(delta)
    this.exhaust_port.forEach(port => port.update(delta))


    if (this.kill_count >= KILLS_TO_WIN && this.exhaust_port.length === 0) this.addExhaustPort()

  }


} // class

Game.BG_COLOR = "#000000";
Game.DIM_X = 550;
Game.DIM_Y = 680;
// Game.FPS = 240;
Game.FPS = 32;

// Game.NUM_ENEMIES = 1;
Game.NUM_ENEMIES = 3;
// Game.NUM_ENEMIES = 10;

module.exports = Game;
