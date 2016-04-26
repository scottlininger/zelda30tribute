/**
 * @fileoverview  Provide the FlyingSword class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the FlyingSword class, the thing you shoot at full hearts.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.FlyingSword = function(game, room) {
  ace.base(this, game, room);
  this.name = 'FlyingSword';

  this.width = 16;
  this.height = 16;
  this.hitWidth = 36;
  this.hitHeight = 36;
  this.facing = 'down';

  this.moveSpeed_ = 12;
  this.hasJustSpawned = true;
};
ace.inherits(ace.FlyingSword, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.FlyingSword.prototype.onTick = function(runner) {
  if (this.explodeFrame) {
    /*if (this.explodeFrame == 1) {
      this.x = ace.clamp(this.x, 0, this.roomWidth);
      this.y = ace.clamp(this.y, 0, this.roomHeight);
    }

    this.setFrame('explode' + this.explodeFrame);
    */
    
    this.explodeFrame = (this.explodeFrame + 8.5) / 2;
		
		var alpha = 1 - (this.explodeFrame / 8);
		game.engine.drawLight($('light-lantern'), this.x, this.y,100, alpha);
			
		var dx = this.explodeFrame * 2;
		var dy = this.explodeFrame * 2;
		var rotZ = 0.01;
		var rotX = -1.1;
		if (runner.isEvenFrame) {
		  game.engine.drawLight($('light-lantern'), this.x - dx, this.y + dy,50);
			game.engine.drawLight($('light-lantern'), this.x + dx, this.y + dy,50);
			game.engine.drawLight($('light-lantern'), this.x - dx, this.y - dy,50);
			game.engine.drawLight($('light-lantern'), this.x + dx, this.y - dy,50);
	    dx = -dx;
	    rotZ = Math.PI;
		}
    this.draw('swordshard-tl', [this.x - dx, this.y + dy, this.z], rotZ, rotX);
    this.draw('swordshard-tr', [this.x + dx, this.y + dy, this.z], rotZ, rotX);
    this.draw('swordshard-bl', [this.x - dx, this.y - dy, this.z], rotZ, rotX);
    this.draw('swordshard-br', [this.x + dx, this.y - dy, this.z], rotZ, rotX);

    
    if (this.explodeFrame > 8) {
      this.explodeFrame = 0;
      this.hide();
    }
    return;
  }


  var dX = this.moveSpeed_ * ace.xMultByFacing[this.facing];
  var dY = this.moveSpeed_ * ace.yMultByFacing[this.facing];
  
  if (!this.hasJustSpawned) {
    this.x += dX;
    this.y += dY;
  }
  this.hasJustSpawned = false;

  // Now render the glow into the light map.
  if (this.isInUnderworld()) {
    game.engine.drawLight($('light-lantern'), this.x, this.y,100);
  }
  
  if (runner.isEvenFrame) {
    this.draw('whitesword');
    if (this.isInUnderworld()) {
			game.engine.drawLight($('light-lantern'), this.x, this.y,100);
		}
  } else {
    this.draw('woodensword');
  }
  
  // Look at other actors to see if we hit them.
  for (var i = 1; i < runner.actors.length; i++) {
    var actor = runner.actors[i];
    if (actor != this && !actor.isHidden) {
      if (actor.hitPoints && actor.hitPoints > 0 && this.isTouching(actor)) {
        actor.lastSwordHitFacing = this.facing;
        var success = actor.takeDamage(runner.avatar.swordDamage, this.facing);
        if (success === false) {
				  // Then we didn't hurt the thing and the sword should keep moving.	
			  } else {
			    this.x = actor.x;
					this.y = actor.y;
					runner.playSound('hit');
					this.explodeFrame = 1;
					return;
			 }
      }
    }
  }

  if (this.isOffScreen()) {
    this.explodeFrame = 1;
  }
  this.rotZ = ace.getRotZByFacing(this.facing);
  
  

  
};
