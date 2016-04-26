/**
 * @fileoverview  Provide the WallMaster class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the WallMaster class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.WallMaster = function(game, room) {
  ace.base(this, game, room);
  this.name = 'WallMaster';
  this.isEvenFrame = true;
  this.wall = ace.randomFacing();
  this.facing = ace.randomFacing();
  this.state = 'WAITING';
  this.walkSpeed = 1;
  this.rotX = -.3;
  this.hitPoints = 2;
  this.emergePercent = 30;
  this.zOffset = 13.5;
  this.rotOffset = Math.PI * 1.5;
  this.rotZ = this.rotOffset;
  this.teleportTo = [100,100,-1008];
  this.shadowAlpha = 0;
};
ace.inherits(ace.WallMaster, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.WallMaster.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

  var targetRotZ = (ace.getRotZByFacing(this.facing) + this.rotOffset) % (Math.PI * 2);
  this.rotZ = (this.rotZ * 40 + targetRotZ) / 41;
  this.z = -1008 + Math.sin(game.tickCount / 10) * 5;

  if (this.state == 'WAITING') {
  
    if (ace.randomInt(100) < this.emergePercent) {
      this.wall = ace.randomFacing();
      if (this.wall == 'left') {
        this.x = this.baseX;
        this.y = this.baseY + 48 + ace.randomInt(96);
      } else if (this.wall == 'right') {
        this.x = this.baseX + ace.UNDERWORLD_ROOM_PIXEL_WIDTH;
        this.y = this.baseY + 48 + ace.randomInt(96);
      } else if (this.wall == 'up') {
        this.x = this.baseX + 48 + ace.randomInt(176);
        this.y = this.baseY + ace.UNDERWORLD_ROOM_PIXEL_HEIGHT;
      } else if (this.wall == 'down') {
        this.x = this.baseX + 48 + ace.randomInt(176);
        this.y = this.baseY;
      }
      this.facing = ace.oppositeFacings[this.wall];
      this.target = {x: this.x + 40 * ace.xMultByFacing[this.facing],
                     y: this.y + 40 * ace.yMultByFacing[this.facing]};
      this.state = 'EMERGING';
    }  

  } else if (this.state == 'EMERGING') {
  
    this.x += ace.xMultByFacing[this.facing] * this.walkSpeed;
    this.y += ace.yMultByFacing[this.facing] * this.walkSpeed;
    if (this.distance(this.target) < 1) {
      this.state = 'CRAWLING';
      this.facing = ace.clockwiseByFacing[this.facing];
    }
  } else if (this.state == 'CRAWLING') {
  
		var dX = this.walkSpeed * ace.xMultByFacing[this.facing];
		var dY = this.walkSpeed * ace.yMultByFacing[this.facing];
		if (this.canWalk(dX, dY)) {
			this.x += dX;
			this.y += dY;
		} else {
		  this.facing = ace.clockwiseByFacing[this.facing];
		  this.target = {x: this.x + 24 * ace.xMultByFacing[this.facing],
                     y: this.y + 24 * ace.yMultByFacing[this.facing]};
		  this.state = 'RETREATING';
		}
		
  } else if (this.state == 'RETREATING') {
  
    this.x += ace.xMultByFacing[this.facing] * this.walkSpeed;
    this.y += ace.yMultByFacing[this.facing] * this.walkSpeed;
    if (this.distance(this.target) < 1) {
      this.state = 'WAITING';
      this.wall = ace.randomFacing();
    }
  } else if (this.state == 'GRABBING') {
  
    this.x += ace.xMultByFacing[this.facing] * this.walkSpeed;
    this.y += ace.yMultByFacing[this.facing] * this.walkSpeed;
    game.avatar.x = (game.avatar.x + this.x) / 2;
    game.avatar.y = (game.avatar.y + this.y) / 2;
    this.z = (this.z + (-1008 + 13)) / 2;

    if (this.distance(this.target) < 1) {
      game.avatar.x = this.teleportTo[0];
      game.avatar.y = this.teleportTo[1];
      game.avatar.z = this.teleportTo[2];
    }
  }

  if (this.state != 'WAITING') {
		if (game.isBlinkFrame) {
			this.isEvenFrame = !this.isEvenFrame;
		}
		if (this.isEvenFrame) {
			this.z--;
			this.draw('wallmaster1');
		} else {
			this.draw('wallmaster2');
		}
		this.shadowAlpha = (this.shadowAlpha + 1) / 2;
		
  } else {
    this.shadowAlpha = this.shadowAlpha / 2;
  }
  
  
  
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y,21,this.shadowAlpha);
	game.engine.drawLight($('shadow-obstacle'), this.x, this.y,21,this.shadowAlpha);  
    
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.WallMaster.prototype.onTouchAvatar = function(game) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(game)) return;

  // Carry away poor avatar.
  if (this.state == 'CRAWLING') {
    this.facing = ace.clockwiseByFacing[this.facing];
	  this.target = {x: this.x + 24 * ace.xMultByFacing[this.facing],
                   y: this.y + 24 * ace.yMultByFacing[this.facing]};
    game.avatar.takeDamage(1.5);
    this.state = 'GRABBING';
  }
};



/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damge The damage to apply.
 */
ace.WallMaster.prototype.takeDamage = function(damage) {
  
  if (this.state == 'GRABBING') {
    // Then we're grabbing. Nothing happens.
    return false;
  }
  // retreat to ground!

  if (this.flashesWhenHit == true) {
    this.invincibilityCounter = 15;
  }
  
  this.hitPoints -= damage;
  return true;
};

