/**
 * @fileoverview  Provide the Aquamentus class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Aquamentus class.
 * @constructorKey
 * @extends {ace.BaseClass}
 */
ace.Aquamentus = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Aquamentus';
  this.rotX =  -.6;
  this.hitPoints = 6;
  this.frameCount = 0;
  this.facing = 'left';
  this.shotSpeed = 4;
  this.shotScatter = 1;
  this.shots = [];
  this.shotDZ = -.5;
  this.knockbackDistance = 8;
  this.lastKnownHitPoints = this.hitPoints;
};
ace.inherits(ace.Aquamentus, ace.Enemy);


/**
 * What to do when we spawn.
 * @param {ace.Game} The game.
 */
ace.Aquamentus.prototype.onSpawn = function(game) {
  this.baseX = this.x;
};

/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Aquamentus.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

  this.frameCount++; 
	this.walkX = Math.cos(this.frameCount/20) * 8; // Walk X offset
	this.x = this.baseX + this.walkX;
	
	if (this.frameCount % 80 == 20) {
	  game.playSound('boss1');
	  console.log('shoot');
		this.shoot(game);
	}
	
  if (game.isBlinkFrame) {
    this.isEvenFrame = !this.isEvenFrame;
  }
  if (this.isEvenFrame) {
		this.draw('aquamentusbottomleft', [this.x, this.y, this.z]);
		this.draw('aquamentusbottomright', [this.x+16, this.y, this.z]);
		this.draw('aquamentustopleft', [this.x, this.y+4, this.z+16]);
  } else {
		this.draw('aquamentusbottomleft2', [this.x, this.y, this.z-1])
		this.draw('aquamentusbottomright2', [this.x+16, this.y, this.z-1]);
		this.draw('aquamentustopleft2', [this.x, this.y+4, this.z+16-1]);
  }
  
  this.draw('aquamentustopright', [this.x+16, this.y+4, this.z+16]);

	for (var i = 0; i < this.shots.length; i++) {
	  var shot = this.shots[i];
	  this.draw('fireball', [shot.x, shot.y, shot.z], this.frameCount * Math.PI);
	  game.engine.drawLight($('light-fire'), shot.x, shot.y, 51);
	  
	  if (game.avatar.distance(shot) < 4) {
	    game.avatar.takeDamage(1);
	  }
	  
	  shot.x += shot.dx;
	  shot.y += shot.dy;
	  shot.z += this.shotDZ;
	}

  game.engine.drawLight($('shadow-obstacle'), this.x+16, this.y-4,21,.5);
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y-4,21,.5);
  
  // Flash if we've been hurt.
  if (game.isEvenFrame && this.hitPoints < this.lastKnownHitPoints) {
    this.lastKnownHitPoints -= .25;
    game.engine.drawLight($('light-lantern'), this.x, this.y,80,1);
    game.engine.drawLight($('light-lantern'), this.x, this.y,80,1);
    game.engine.drawLight($('light-lantern'), this.x, this.y,80,1);
    game.engine.drawLight($('light-lantern'), this.x, this.y,80,1);
  }
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Aquamentus.prototype.onTouchAvatar = function(game) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(game)) return;
  
  // Otherwise, dose out some damage...
  game.avatar.takeDamage(1);
};



/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Aquamentus.prototype.shoot = function(game) {
  var steps = (this.x - game.avatar.x) / this.shotSpeed;
  var dY = (game.avatar.y - this.y) / steps;
	this.shots = [{x: this.x-8, y: this.y, dx: -this.shotSpeed, dy: dY + this.shotScatter, z: this.z + 20},
	              {x: this.x-8, y: this.y, dx: -this.shotSpeed, dy: dY, z: this.z + 16},
	              {x: this.x-8, y: this.y, dx: -this.shotSpeed, dy: dY - this.shotScatter, z: this.z + 20}]
}