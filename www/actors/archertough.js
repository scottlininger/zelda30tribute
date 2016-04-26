
/**
 * @fileoverview  Provide the ArcherTough class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the ArcherTough class, baddie who walks around and shoots
 * arrows, and is tough.
 * @constructor
 * @extends {ace.Archer}
 */
ace.ArcherTough = function(game, room) {
  ace.base(this, game, room);
  this.name = 'ArcherTough';

};
ace.inherits(ace.ArcherTough, ace.Archer);


/**
 * What happens when this guy is spawned.
 * @param {ace.Runner} The runner object.
 */
ace.ArcherTough.prototype.onSpawn = function(runner) {
  this.hitPoints = 3;
  this.setFrame('Even');
}

