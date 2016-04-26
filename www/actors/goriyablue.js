/**
 * @fileoverview  Provide the GoriyaBlue class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the GoriyaBlue class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.GoriyaBlue = function(game, room) {
  ace.base(this, game, room);
  this.name = 'GoriyaBlue';
  this.spriteSuffix = '_blue';
};
ace.inherits(ace.GoriyaBlue, ace.Goriya);

