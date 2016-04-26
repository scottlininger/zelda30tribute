/**
 * @fileoverview  Provide the HurlerTough class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Hurler class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.HurlerTough = function(game, room) {
  ace.base(this, game, room);
  this.name = 'HurlerTough';
  
  
};
ace.inherits(ace.HurlerTough, ace.Hurler);


/**
 * What happens when this guy is spawned.
 * @param {lengine.Runner} The runner object.
 */
ace.HurlerTough.prototype.onSpawn = function(runner) {
  this.hitPoints = 2;
  this.walkSpeed = 2 + ace.randomInt(2);
}