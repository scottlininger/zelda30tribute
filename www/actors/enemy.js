
/**
 * @fileoverview  Provide the Enemy class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Enemy class, the guy who walks around the map.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Enemy = function(game, room) {
  ace.base(this, game, room);
  this.imgSrc = 'img/enemies.png';
  this.width = 80;
  this.height = 80;
  this.hitWidth = 19;
  this.hitHeight = 19;
  this.name = 'Enemy';

  // Used in the isTouching method and for SecretKeys
  // to know when all of the enemies are dead, and for
  // the canWalk method.
  this.isEnemy = true;

  // By default, enemies flash when hit and are invincible for a moment.
  this.flashesWhenHit = true;

  this.hitPoints = 1;
  this.lastSwordHitFacing = 'None';
  this.knockbackDistance = 100;
  this.knockbackTargetX = null;
  this.knockbackTargetY = null;
};
ace.inherits(ace.Enemy, ace.Actor);


/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damage The damage to apply.
 * @param {boolean} opt_damageFacing Some enemies, like Darknuts, are
 *     immune to hits from certain directions.
 * @return {boolean} Whether the damage was "applied" by the enemy.
 *     Some enemies don't get hurt in certain states.
 */
ace.Enemy.prototype.takeDamage = function(damage, opt_damageFacing) {
  if (this.cloudFrames || this.invincibilityCounter) {
    // Then we can't be hit yet.
    return false;
  }
  this.hitPoints -= damage;
  var multX = ace.xMultByFacing[this.lastSwordHitFacing] || 0;
  var multY = ace.yMultByFacing[this.lastSwordHitFacing] || 0;
  this.knockbackTargetX = this.x + this.knockbackDistance * multX;
  this.knockbackTargetY = this.y + this.knockbackDistance * multY;
  this.knockbackFrames = 0;
  
  
  if (this.flashesWhenHit == true) {
    this.invincibilityCounter = 20;
  }
  
  return true;
};

/**
 * You can call this at the beginning of your onTick to have a "standard"
 * death, meaning the Actor gets knocked back and turns into stuff.
 * @return {boolean} True if the Actor is dead.
 */
ace.Enemy.prototype.standardDeathCheck = function(game, opt_disableGoogies) {
  if (this.isHidden) return true;

  if (this.hitPoints == ace.HITPOINTS_DEAD) {
    this.zOffset = -16;
  }
  
  if (this.hitPoints <= ace.HITPOINTS_DEAD) {
    if (this.z < -100) {
      this.z = -1008;
    } else {
      this.z = game.getWorldZ(this.x, this.y);
    }
    this.rotZ += .2;
    this.zOffset = (this.zOffset + 0) / 2;
		
		this.hitPoints = ace.HITPOINTS_DEAD - 1;
		if ((game.tickCount % 4) < 2 && (this.name == 'coin' || this.name == 'heart')) {
		  this.draw(this.name + 'blue', null, null, -.1);
		} else {
		  this.draw(this.name, null, null, -.1);
		}
    var lightSize = Math.min(30, this.rotZ / .8 * 30);
    game.engine.drawLight($('light-lantern'), this.x, this.y,lightSize);
    return true;
  }

  if (this.hitPoints <= ace.HITPOINTS_DYING) {
    this.invincibilityCounter = 0;
    if (this.deathFrame > 4) {
      this.rotX = 0;
      this.rotX2 = 0;
      var goodieRoll = ace.randomInt(100);
      if (game.currentRoom_.isSideScroll) {
       goodieRoll = 1000; // no items in sideScroll.
      }
      if (goodieRoll < 50 && !opt_disableGoogies) {
        this.name = 'coin';
        if (goodieRoll < 25 && !game.avatar.isMaxHitPoints()) {
          this.name = 'heart';
        }
      } else {
        this.isHidden = true;
      }
      
      // This can be overridden by a setting.
      if (this.carrying) {
        this.name = this.carrying;
        this.isHidden = false;
      }
      this.z += 5;
      this.opacity = 1;
      this.hitPoints = ace.HITPOINTS_DEAD;
      
    } else {
      //this.setFrame('death' + this.deathFrame);
      // TODO(scott): Make the death explody thing work.
      //this.setFrame('death' + this.deathFrame);
      game.engine.drawLight($('light-lantern'), this.x, this.y,
          this.deathFrame * 80,(4.5 - this.deathFrame) / 4);
       
      this.name = 'death' + Math.min(Math.floor(this.deathFrame), 3);
      this.deathFrame += .5;
      this.draw();
    }
    
    return true;
  }

  if (this.hitPoints <= 0) {
    this.opacity = 1;
    this.deathFrame = 0;
    this.name = 'death' + this.deathFrame;
    this.rotZ = 0;
    this.hitPoints = ace.HITPOINTS_DYING;
    this.setFrame('');
    this.draw();
    return true;
  }

  // Handle knockback for non-dead enemies.
  if (this.knockbackTargetX != null) {
    var dX = Math.abs(this.x - this.knockbackTargetX);
    var dY = Math.abs(this.y - this.knockbackTargetY);
    this.knockbackFrames++;
    if (dX + dY < 5 || this.knockbackFrames > 10) {
      this.knockbackTargetX = null;
      this.knockbackTargetY = null;
    } else {
      var changeX = (((this.x * 3) + this.knockbackTargetX) / 4) - this.x;
      var changeY = (((this.y * 3) + this.knockbackTargetY) / 4) - this.y;

      this.x += changeX;
      this.y += changeY;
      // Make sure we're on screen. Enemies can't be knocked off the room.
      /*if (this.isOffScreen()) {
        this.moveOnScreen();
        this.knockbackTargetX = null;
        this.knockbackTargetY = null;
      }
      */

      // Then see if we can go on the tile there. If not, stop knocking back.
      if (!this.canWalk(0, 0)) {
        this.x -= changeX;
        this.y -= changeY;
        this.knockbackTargetX = null;
        this.knockbackTargetY = null;
      }
    }
  }
  
  if (this.invincibilityCounter) {
    this.invincibilityCounter--;
    this.renderNegativeColor = !this.renderNegativeColor;
  } else {
    this.renderNegativeColor = false;
  }

  return false;
};


/**
 * Whether we're alive.
 * @return {boolean} True if we're not dead.
 */
ace.Enemy.prototype.isAlive = function() {
  return this.hitPoints > 0;
};


/**
 * You can call this at the beginning of your onTouchAvatar to have a
 * "standard" onTouch, meaning we could grant hearts and stuff.
 * @return {boolean} True if we took action.
 */
ace.Enemy.prototype.standardOnTouchAvatar = function(game) {
  if (this.name == 'coin') {
    this.hide();
    game.avatar.changeCoins(1, game);
    return true;
  }
  if (this.name == 'coinblue') {
    this.hide();
    game.avatar.changeCoins(5, game);
    return true;
  }
  if (this.name == 'heart') {
    this.hide();
    game.avatar.changeHitPoints(1, game);
    return true;
  }
  if (this.name == 'key') {
    this.hide();
    game.avatar.changeKeys(1, game);
    return true;
  }
  if (this.name == 'bomb') {
    this.hide();
    // TODO(scott): Single bombs.
    game.avatar.changeBombs(4, game);
    return true;
  }
  if (this.name == 'heartcontainer') {
    this.hide();
    game.avatar.changeMaxHitPoints(1, game);
    return true;
  }
};


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Enemy.prototype.onTick = function(game) {
  this.standardDeathCheck(game);
};


/**
 * What to do when touched by the avatar.
 * @param {ace.Game} The game.
 */
ace.Enemy.prototype.onTouchAvatar = function(game) {
  this.standardOnTouchAvatar(game);
};
