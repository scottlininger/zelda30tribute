/**
 * @fileoverview  Provide the DiggerBlue class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the DiggerBlue class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.DiggerBlue = function(game, room) {
  ace.base(this, game, room);
  this.name = 'DiggerBlue';
  this.spriteVariant = 'blue';
  this.hitPoints = 4;
};
ace.inherits(ace.DiggerBlue, ace.Digger);

