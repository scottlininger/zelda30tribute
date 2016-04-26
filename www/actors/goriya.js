/**
 * @fileoverview  Provide the Goriya class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Goriya class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Goriya = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Goriya';
  this.isEvenFrame = true;
  this.facing = ace.randomFacing();
  this.maxWalkSpeed = 2;
  this.rotX2 = -.3;
  this.hitPoints = 3;
  this.walkSpeed = 1;
  this.changeChance = 3;
  this.throwSpeed = 8;
  this.throwDistance = 256;
  this.boomerangSpin = 1.5;
  this.spriteSuffix = '';
};
ace.inherits(ace.Goriya, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Goriya.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

	// We're walking. There's a small chance we'll change something.
	if (ace.randomInt(100) < this.changeChance) {
	  if (this.walkSpeed == 0) {
		  if (!this.boomerang) {
				this.boomerang = {pos: [this.x, this.y, this.z], r: 0,
													dx: this.throwSpeed * ace.xMultByFacing[this.facing],
													dy: this.throwSpeed * ace.yMultByFacing[this.facing],
													throwDistance: this.throwDistance};
      	this.boomerangFrames = 1;
      }
		} else {
		  
			if (ace.randomInt(100) < 80) {
				this.walkSpeed = 0;
			} else {
			  this.facing = ace.randomFacing();
				this.walkSpeed = this.maxWalkSpeed;
			}
		}

		if (!this.boomerang && ace.randomInt(100) < 50) {
		  this.walkSpeed = this.maxWalkSpeed;
		}		
	}
	
	this.rotZ = ace.getRotZByFacing(this.facing);
	
	var dX = this.walkSpeed * ace.xMultByFacing[this.facing];
	var dY = this.walkSpeed * ace.yMultByFacing[this.facing];
	if (this.canWalk(dX, dY)) {
		this.x += dX;
		this.y += dY;
	} else {
		this.facing = ace.randomFacing();
	}
  
  if (game.isBlinkFrame) {
    this.isEvenFrame = !this.isEvenFrame;
  }
  if (this.isEvenFrame) {
  	this.draw('goriya' + this.spriteSuffix);
  } else {
    this.draw('goriya2' + this.spriteSuffix);
  }
  if (this.boomerang) {
    this.boomerang.r += this.boomerangSpin;
    this.draw('boomerangflat' + this.spriteSuffix, this.boomerang.pos, this.boomerang.r, 0.001, 0.001);
    
    game.engine.drawLight($('shadow-obstacle'), this.boomerang.pos[0],
       this.boomerang.pos[1], 12, .5);
       
    if (game.avatar.distance({x:this.boomerang.pos[0], y:this.boomerang.pos[1]})
        <= 12) {
      game.avatar.takeDamage(.5);
      this.boomerang.throwDistance =
          this.distance({x:this.boomerang.pos[0], y:this.boomerang.pos[1]});
    }
    this.boomerangFrames++;
    var reversePoint = this.boomerang.throwDistance / this.throwSpeed;
    if (this.boomerangFrames >= reversePoint * 2) {
      this.boomerang = false;
      this.walkSpeed = this.maxWalkSpeed;
    } else if (this.boomerangFrames <= reversePoint) {
      this.boomerang.pos[0] += this.boomerang.dx;
      this.boomerang.pos[1] += this.boomerang.dy;
      // If we hit a wall, declare that our maximum throw distance.
      if (this.isOffScreen(this.boomerang.pos[0], this.boomerang.pos[1])) {
        this.boomerang.throwDistance =
          this.distance({x:this.boomerang.pos[0], y:this.boomerang.pos[1]});
      }
      
    } else {
      this.boomerang.pos[0] -= this.boomerang.dx;
      this.boomerang.pos[1] -= this.boomerang.dy;
    }
  }
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y,21,.5);
   
    
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Goriya.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(.5);
};

