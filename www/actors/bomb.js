/**
 * @fileoverview  Provide the Bomb class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Bomb class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Bomb = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Bomb';
  this.countDown = 20;
  this.hitWidth = 36;
  this.hitHeight = 36;
  this.damage = 4;
  this.rotX = -.4;
};
ace.inherits(ace.Bomb, ace.Actor);




/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Bomb.prototype.onTick = function(runner) {
  this.countDown--;

  // Look at other actors to see if we hit them.
  if (this.countDown == 0) {
    
    for (var i = 1; i < runner.actors.length; i++) {
      var actor = runner.actors[i];
      if (actor != this && !actor.isHidden) {
        if (actor.hitPoints && actor.hitPoints > 0 && this.isTouching(actor)) {
          var success = actor.takeDamage(this.damage);
        }
      }
    }
  }

  // Play the sound.
  if (this.countDown == 0) {
    game.playSound('bomb');
  }

  // Draw the smoke.
  if (this.countDown == -1 || this.countDown == 0) { 
    this.draw('cloud');
    var dz = this.countDown * 8;
    this.draw('cloud2', [this.x + 9, this.y - 6, this.z + dz])
    this.draw('cloud2', [this.x + 9, this.y + 6, this.z + dz])
    this.draw('cloud2', [this.x - 9, this.y - 6, this.z + dz])
    this.draw('cloud2', [this.x - 9, this.y + 6, this.z + dz])
    this.draw('cloud2', [this.x + 0, this.y - 9, this.z + dz])
    this.draw('cloud2', [this.x + 0, this.y + 9, this.z + dz])
    game.engine.drawLight($('light-lantern'), this.x, this.y,200 - dz * 10);
    return;
  } else if (this.countDown == -2) { 
    this.draw('cloud2', [this.x, this.y, this.z - 8]);
    return;
  }
  
  // If we're done with the smoke, go ahead and hide.
  if (this.countDown == -3) { 
    this.hide()
    return;
  }

  // Otherwise, draw a flashing bomb.
  if (runner.isEvenFrame) {
    this.renderNegativeColor = true;
    this.draw('bomb');
    if (this.isInUnderworld()) {
			game.engine.drawLight($('light-lantern'), this.x, this.y,30);
		}
  } else {
    this.draw('bomb');
  }
  
  this.renderNegativeColor = false;
  
  
  
};
