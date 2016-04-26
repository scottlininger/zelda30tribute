/**
 * @fileoverview  Provide the JumperTough class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the JumperTough class, the guy who walks around the map.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.JumperTough = function(game, room) {
  // According to http://zelda.wikia.com/wiki/Tektite, the
  // only thing that's different about blue is that they
  // drop more rupees.
  ace.base(this, game, room);
  this.name = 'JumperTough';
  this.counter = 0;
};
ace.inherits(ace.JumperTough, ace.Jumper);

