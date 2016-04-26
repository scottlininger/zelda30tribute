/**
 * @fileoverview  Provide the Hurler class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Hurler class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Hurler = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Hurler';
  this.frame = 'Even';

  // Which kind of missile is spawn when I shoot.
  this.rockToSpawn = 'HurlerRock';

  this.facing = ace.randomFacing();
  this.state = this.facing;
  this.walkSpeed = 1 + ace.randomInt(2);
  this.cloudFrames = 1;
};
ace.inherits(ace.Hurler, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Hurler.prototype.onTick = function(runner) {
  if (this.standardCloudSpawnCheck()) return;
  if (this.standardDeathCheck(runner)) return;
  

  if (runner.isEvenFrame) {
    if (this.frame == 'Even') {
      this.setFrame('Odd');
    } else {
      this.setFrame('Even');
    }
  }

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
      var opts = {x: this.x, y: this.y, facing: this.facing};
      this.rock = game.spawn(this.rockToSpawn, opts);
    }
  }
  
  this.rotZ = ace.getRotZByFacing(this.facing);
  this.draw();
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Hurler.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(.5);
};

