/**
 * @fileoverview  Provide the Cloud class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Cloud class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Cloud = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Cloud';
};
ace.inherits(ace.Cloud, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Cloud.prototype.onTick = function(game) {
  this.frameCount = this.frameCount || 0;
  this.frameCount += 1;
  this.z -= 2;
  
  if (this.frameCount <= 2) {
    this.draw('cloud');
  } else if (this.frameCount <= 4) {
    this.draw('cloud2');
  } else {
    this.hide();
  }

};
