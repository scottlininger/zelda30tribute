/**
 * @fileoverview  Provide the Dodongo class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Dodongo class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Dodongo = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Dodongo';
  this.isEvenFrame = true;
  this.facing = ace.randomFacing();
  this.walkSpeed = 1.5;
  this.hitPoints = 8;
  this.hitWidth = 30;
  this.hitHeight = 30;
  this.countDown = 0;
};
ace.inherits(ace.Dodongo, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Dodongo.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;
  this.rotZ = ace.getRotZByFacing(this.facing);
  var slideX = 8 * ace.xMultByFacing[this.facing];
  var slideY = 8 * ace.yMultByFacing[this.facing];

  if (this.countDown > 0) {
    this.rotX = - Math.random() / 10;
    this.rotZ += Math.PI / 2;
    this.draw('dodongo_explode_head', [this.x + slideX, this.y + slideY, this.z]);
    this.draw('dodongo_explode_tail', [this.x - slideX, this.y - slideY, this.z - 1]);
    this.countDown--;
    if (this.countDown == 0) {
      game.playSound('bomb');
      this.takeDamage(4);
      
      this.draw('cloud2', [this.x + 9, this.y - 6, this.z-6])
      this.draw('cloud2', [this.x + 9, this.y + 6, this.z-6])
      this.draw('cloud2', [this.x - 9, this.y - 6, this.z-6])
      this.draw('cloud2', [this.x - 9, this.y + 6, this.z-6])
      this.draw('cloud2', [this.x + 0, this.y - 9, this.z-6])
      this.draw('cloud2', [this.x + 0, this.y + 9, this.z-6])
    
    }
  } else {
    // We're walking. There's a small chance we'll change directions.
    if (ace.randomInt(100) < 2) {
      this.facing = ace.randomFacing();
    }
    
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
      this.rotZ += Math.PI / 2;
      this.rotX = -.2;
      this.draw('dodongo_closed_head', [this.x + slideX, this.y + slideY, this.z-1]);
      this.draw('dodongo_closed_tail', [this.x - slideX, this.y - slideY, this.z]);
    } else {
      this.rotZ += Math.PI / 2;
      this.rotX = -.15;
      this.draw('dodongo_open_head', [this.x + slideX, this.y + slideY, this.z]);
      this.draw('dodongo_open_tail', [this.x - slideX, this.y - slideY, this.z]);
    }
  }
  
  if (this.carrying) {
    this.draw(this.carrying.toLowerCase());
  }
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y+4,36,.7);
  
  
  for (var i = 1; i < game.actors.length; i++) {
    var actor = game.actors[i];
    if (actor != this && !actor.isHidden) {
      if (actor.name == 'Bomb' && this.isTouching(actor)) {
        actor.hide();
        if (this.facing == 'up') { this.facing = 'down' };
        this.countDown = 20;
      }
    }
  }
    
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Dodongo.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  if (this.invincibilityCounter) {
    return;
  }
  runner.avatar.takeDamage(1);
};


/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damge The damage to apply.
 */
ace.Dodongo.prototype.takeDamage = function(damage, opt_damageFacing) {
  
  if (this.cloudFrames || this.invincibilityCounter) {
    // Then we can't be hit yet.
    return false;
  }
  
  // Face the enemy!
  if (opt_damageFacing) {
    this.facing = ace.oppositeFacings[opt_damageFacing];
  }
  
  if (damage < 4) {
    game.playSound('shield');
    return false;
  }
  
  this.hitPoints -= damage;
  this.knockbackDistance = 4;
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


