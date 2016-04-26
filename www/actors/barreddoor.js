/**
 * @fileoverview  Provide the BarredDoor class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the BarredDoor class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.BarredDoor = function(game, room) {
  ace.base(this, game, room);
  this.name = 'BarredDoor';
  this.bottomSprite = 'barreddoor';
  this.topSprite = 'barreddoortop';
  this.isWalkable = true;
};
ace.inherits(ace.BarredDoor, ace.LockedDoor);



/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.BarredDoor.prototype.onTick = function(game) {
  // This is for when you walk into a room.
  if (this.isWalkable && this.distance(game.avatar) < 24) {
    return;
  } else if (this.isWalkable) {
    this.isWalkable = false;
    game.playSound('unlock');
  }

  this.draw(this.bottomSprite);
  this.draw(this.topSprite, [this.x + this.dx, this.y + this.dy, this.z + this.dz]);

  game.engine.drawLight($('light-lantern'), this.x - this.dx, this.y - this.dy,50);

  if (this.openAction && this.openAction == 'PushableBlock') {
    // Test that a PushableBlock has been pushed.
    for (var i = 0; i < game.actors.length; i++) {
      var actor = game.actors[i];
      if (actor.name == 'PushableBlock' && actor.hasBeenPushed) {
        game.playSound('unlock');
        this.hide();
      }
    }
    
  } else if (game.allEnemiesAreDead()) {
    game.playSound('unlock');
		this.hide();
  }
};