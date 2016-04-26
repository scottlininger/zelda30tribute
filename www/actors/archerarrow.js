
/**
 * @fileoverview  Provide the ArcherArrow class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the ArcherArrow class, the thing Archers shoot.
 * @constructor
 * @extends {ace.HurlerRock}
 */
ace.ArcherArrow = function(game, room) {
  ace.base(this, game, room);
  this.name = 'ArcherArrow';


  this.facing = 'down';
  this.damage = .5;
  this.speed = 18;
  this.reflectingFrame = 0;
};
ace.inherits(ace.ArcherArrow, ace.HurlerRock);


/**
 * What to do when we first appear.
 * @param {ace.Runner} The game Runner.
 */
ace.ArcherArrow.prototype.onSpawn = function(runner) {

};
