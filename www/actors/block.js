/**
 * @fileoverview  Provide the Block class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Block class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Block = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Block';
};
ace.inherits(ace.Block, ace.Obstacle);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Block.prototype.onTick = function(game) {
  if (this.type) {
    this.draw('block_' + this.type);
  } else {
    this.draw('block');
  }
};
