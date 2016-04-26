/**
 * @fileoverview  Provide the RoomDarkener class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the RoomDarkener class, which darkens dungeon rooms
 * until a candle is used.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.RoomDarkener = function(game, room) {
  ace.base(this, game, room);
  this.name = 'RoomDarkener';
  this.darkenSpeed = .1;
  this.maxAlpha = 1;
};
ace.inherits(ace.RoomDarkener, ace.Actor);

/**
 * What to do when we spawn.
 * @param {ace.Game} The game.
 */
ace.RoomDarkener.prototype.onSpawn = function(game) {
  this.alpha = 1;
  this.state = 'DARK';
};

/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.RoomDarkener.prototype.onTick = function(game) {
  if (this.state == 'DARK') {
    this.alpha = Math.min(this.maxAlpha, this.alpha + this.darkenSpeed);
    game.engine.drawLight($('light-black'), this.x, this.y, 512, this.alpha);
    game.engine.drawLight($('light-lantern'), game.avatar.x, game.avatar.y,50);
    game.engine.drawLight($('light-lantern'), game.avatar.x, game.avatar.y,50);
  }
};

