/**
 * @fileoverview  Provide the Charger class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Charger class, baddie who walks around and shoots
 * arrows.
 * @constructor
 * @extends {ace.Hurler}
 */
ace.Charger = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Charger';
  this.frame = 'Even';

  this.hitPoints = 4;
  this.walkSpeed = 2;

  // Which kind of missile is spawn when I shoot.
  this.rockToSpawn = 'ChargerSword';
  this.cloudFrames = 1;
};
ace.inherits(ace.Charger, ace.Hurler);


/**
 * What happens when this guy is spawned.
 * @param {ace.Runner} The runner object.
 */
ace.Charger.prototype.onSpawn = function(runner) {
  this.hitPoints = 4;
}

/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Charger.prototype.onTick = function(runner) {
  if (this.standardCloudSpawnCheck()) return;
  if (this.standardDeathCheck(runner)) return;

  

  // If we're standing, we have a small chance to start going again.
  if (this.state == 'standing') {
    if (ace.randomInt(100) < 8) {
      this.state = ace.randomFacing();
      this.facing = this.state;
    }
  } else {

    // We're walking. There's a small chance we'll just stop.
    if (ace.randomInt(100) < 2) {
      this.state = 'standing';
    }
    
    var dX = this.walkSpeed * ace.xMultByFacing[this.facing];
    var dY = this.walkSpeed * ace.yMultByFacing[this.facing];
    if (this.canWalk(dX, dY)) {
      this.x += dX;
      this.y += dY;
      
      if (runner.isEvenFrame) {
				if (this.frame == 'Even') {
					this.setFrame('Odd');
				} else {
					this.setFrame('Even');
				}
			}
  
    } else {
      this.state = 'standing';
    }
  }

  // Shoot!
  if (ace.randomInt(100) < 4) {
    if (this.rock) {
      if (this.rock.isHidden) {
        this.rock.x = this.x;
        this.rock.y = this.y;
        this.rock.facing = this.facing;
        this.rock.unhide();
      }
    } else {
      var opts = {x: this.x, y: this.y, z: this.z, facing: this.facing};
      this.rock = game.spawn(this.rockToSpawn, opts);
    }
  }
  
  this.rotZ = ace.getRotZByFacing(this.facing);
  if (this.frame == 'Even') {
    this.zOffset = 0;
  } else {
    this.zOffset = -1;
  }
  
  this.draw();
};
