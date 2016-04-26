/**
 * @fileoverview  Provide the Statue class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Statue class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Statue = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Statue';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.isWalkable = false;
  this.rotX = -.2;
};
ace.inherits(ace.Statue, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Statue.prototype.onTick = function(game) {
  var roomX = this.x - Math.floor(this.x / 256) * 256;
  if (roomX < 128) {
    this.rotZ = Math.PI/2;
  } else {
    this.rotZ = -Math.PI/2; 
  }
  
  // Shoot fireballs, but only if the avatar isn't picking anything
  // up at the moment.
  if (this.shootsFireballs && ace.randomInt(200) < 2 &&
      !game.avatar.pickingUp) {
    // Shoot a fireball.
    var opts = {x: this.x, y: this.y - 8, z: this.z + 8};
    //game.playSound('boomerang');
    game.spawn('FireBall', opts);
  }
  
  if (this.type) {
    this.draw('statue_' + this.type);
  } else if (roomX < 128) {
    this.draw('statue1');
  } else {
    this.draw('statue2');  
  }
};
