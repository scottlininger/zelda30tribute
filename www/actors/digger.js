/**
 * @fileoverview  Provide the Digger class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Digger class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Digger = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Digger';
  this.isEvenFrame = true;
  this.facing = ace.randomFacing();
  this.walkSpeed = 1;
  this.hitPoints = 2;
  
  this.sprites = [5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5];
  this.currentSpriteId = this.sprites.length - 1;
  this.spinSpeed = .9;
  this.spriteNumber = this.sprites[0];
  this.spriteVariant = ''; // The blue one will have 'blue' in here.
  this.isUnderground = false;
  this.knockbackDistance = 64;
};
ace.inherits(ace.Digger, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Digger.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

	var dX = this.walkSpeed * ace.xMultByFacing[this.facing];
	var dY = this.walkSpeed * ace.yMultByFacing[this.facing];
	if (this.canWalk(dX, dY)) {
		this.x += dX;
		this.y += dY;
	} else {
		this.facing = ace.randomFacing();
	}

  if (game.isBlinkFrame && !this.isUnderground) {
    this.currentSpriteId = (this.currentSpriteId + 1) % this.sprites.length;
    if (this.currentSpriteId == 0) {
      this.isUnderground = true;
    }
  }
  
  this.spriteNumber = this.sprites[this.currentSpriteId];
  this.zOffset = - ace.randomInt(4) / 2;
  this.rotZ += (1 - (this.spriteNumber / 6)) * this.spinSpeed;
  if (this.isUnderground) {
    if (ace.randomInt(20) == 1) {
			this.x = game.avatar.x + (16 + (16 * this.actorCountNumber)) * ace.xMultByFacing[game.avatar.facing];
			this.y = game.avatar.y + (16 + (16 * this.actorCountNumber)) * ace.yMultByFacing[game.avatar.facing];
			if (this.spriteVariant == 'blue') {
			  this.facing = ace.randomFacing();
			} else {
			  this.facing = game.avatar.facing;
			}
			if (this.canWalk(0, 0)) {
				this.isUnderground = false;
			}
		} else if (ace.randomInt(20) == 1) {
		  this.facing = ace.randomFacing();
		  if (this.canWalk(0, 0)) {
				this.isUnderground = false;
			}
		}
  } else {
  	this.draw('leever' + this.spriteVariant + this.spriteNumber);
  } 
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Digger.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  if (this.spriteNumber > 2 || this.isUnderground) {
    // Then we're underground. Nothing happens.
    return false;
  }
  
  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(.5);
};


/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damge The damage to apply.
 */
ace.Digger.prototype.takeDamage = function(damage) {
  
  if (this.spriteNumber > 3 || this.isUnderground) {
    // Then we're underground. Nothing happens.
    return false;
  }
  // retreat to ground!
  
  this.currentSpriteId = 25;
  this.hitPoints -= damage;
  var multX = ace.xMultByFacing[this.lastSwordHitFacing];
  var multY = ace.yMultByFacing[this.lastSwordHitFacing];
  this.knockbackTargetX = this.x + this.knockbackDistance * multX;
  this.knockbackTargetY = this.y + this.knockbackDistance * multY;
  this.knockbackFrames = 0;
  
  if (this.flashesWhenHit == true) {
    this.invincibilityCounter = 10;
  }
  
  return true;
};

