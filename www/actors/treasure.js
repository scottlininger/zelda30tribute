/**
 * @fileoverview  Provide the Treasure class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Treasure class, a simple, single-block Treasure.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Treasure = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Treasure';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
};
ace.inherits(ace.Treasure, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Treasure.prototype.onTick = function(game) {
  this.draw(this.spriteName || 'oldman1');
  if (this.isTouching(game.avatar)) {
    game.avatar.pickUp(this.spriteName);
    this.hide();
    
    // Hide any old men or text objects.
    for (var i = 0; i < game.actors.length; i++) {
      var actor = game.actors[i];
      if (actor.name == 'Text' || actor.name == 'OldMan') {
        actor.hide();
      }
    }
    
  }
};