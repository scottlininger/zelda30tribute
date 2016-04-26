/**
 * @fileoverview  Provide the Jumper class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Jumper class, the guy who walks around the map.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Jumper = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Jumper';
  this.counter = 0;
  this.isPausing = true;
  this.completion = 0;
  this.jumpHeight = 30;
  this.maxJumpDistance = 100;
  this.cloudFrames = 1;
};
ace.inherits(ace.Jumper, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Jumper.prototype.onTick = function(game) {
  if (this.standardCloudSpawnCheck()) return;
  if (this.standardDeathCheck(game)) return;

	if (this.isPausing) {
	  this.z = game.getWorldZ(this.x, this.y);
  
		this.counter++;
		
		if (this.counter == 4) {
			this.counter = 0;
			if (this.frame == 'Up') {
				this.setFrame('Down');
			} else {
				this.setFrame('Up');
				if (ace.randomInt(3) == 1) {
				  this.isPausing = false;
				  
				  this.start = {x: this.x, y:this.y, z:this.z};
				  
				  var target = {}; //game.randomSpotInRoom(this.x, this.y);
				  target.x = this.x - this.maxJumpDistance/2 +
				      ace.randomInt(this.maxJumpDistance);
				  target.y = this.y - this.maxJumpDistance/2 +
				      ace.randomInt(this.maxJumpDistance);
				  this.dx = target.x - this.x;
				  this.dy = target.y - this.y;
				  this.dz = game.getWorldZ(target.x, target.y) - this.z;
				  this.completion = 0;
				}
			}
		}
  } else if (this.completion < 1) {
    this.completion += .1;
    this.x = this.start.x + this.dx * this.completion;
    this.y = this.start.y + this.dy * this.completion;
    this.z = this.start.z + this.dz * this.completion +
        Math.sin(this.completion * Math.PI) * this.jumpHeight;
  
  
  } else {
    this.x = this.start.x + this.dx;
    this.y = this.start.y + this.dy;
    this.z = this.start.z + this.dz;
    this.isPausing = true;
  }
	
		
  this.draw();
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Game} The game Runner.
 */
ace.Jumper.prototype.onTouchAvatar = function(game) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(game)) return;

  // Otherwise, dose out some damage...
  game.avatar.takeDamage(.5);
};



/**
 * What happens when this guy is spawned.
 * @param {ace.Game} The runner object.
 */
ace.Jumper.prototype.onSpawn = function(game) {
  this.setFrame('Up');
};