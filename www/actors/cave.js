/**
 * @fileoverview  Provide the Cave class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Cave class, a simple, single-block Cave entrance.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Cave = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Cave';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 8;
  this.hitHeight = 8;
  this.state = 'WAITING_TO_ARRIVE';
  this.teleportTo = [1892, 84, 0];
  this.maxHitPoints = 4;
  this.hitPoints = 4;
};
ace.inherits(ace.Cave, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Cave.prototype.onTick = function(game) {
  
  
  if (this.capTile) {
    // TODO(scott): Decide if we need this once we figure out
    // how overworld caves behave once they've been bombed.
    // Right now this rendering is happening in game.js around
    // line 700.
    //this.draw(this.capTile, [this.x, this.y, this.z + 16]);
  }
  
  if (this.state == 'WAITING_FOR_BOMB') {
    this.hitWidth = 16;
    this.hitHeight = 16;
    this.isWalkable = false;
  } else {
    this.hitWidth = 8;
    this.hitHeight = 8; 
    this.isWalkable = true;
    this.draw('ow_cave');
  }
  
  if (this.state == 'STEPPING_DOWN') {
    if (game.tickCount % 5 == 0) {
      this.steps++;
      game.avatar.zOffset = this.steps * -3;
      game.avatar.x = (game.avatar.x + this.x)/2;
      game.avatar.y = (game.avatar.y + this.y + 4)/2;
      if (this.steps == 5) {
        this.state = 'WAITING_TO_ARRIVE';
        game.state.lastOverworldLocation = [game.avatar.x, game.avatar.y, game.avatar.z];
				game.avatar.x = this.teleportTo[0];
				game.avatar.y = this.teleportTo[1];
				game.avatar.z = this.teleportTo[2];
				
				// If the teleport to array has a 4th element, it's the dungeon
				// number. If not, assume dungeon 1.
				if (this.teleportTo[3]) {
				  game.changeDungeon(this.teleportTo[3]);
				} else {
			  	game.changeDungeon('1');
				}
				game.avatar.zOffset = 0;
				game.setCameraEye(game.avatar.x, game.avatar.y, game.avatar.z + 800);
				game.setCameraTarget(game.avatar.x, game.avatar.y, game.avatar.z);
      }
    }
  } else if (this.state == 'STEPPING_UP') {
		if (game.tickCount % 5 == 0) {
			this.steps--;
			game.avatar.zOffset = this.steps * -3;
			game.avatar.x = this.x;
			game.avatar.y = this.y - 7 + (this.steps * 2);
			if (this.steps == 0) {
				this.state = 'WAITING_TO_LEAVE';
				game.avatar.zOffset = 0;
			}
		}
	}
  
  if (this.isTouching(game.avatar)) {
    if (game.avatar.isLeavingCave == true) {
      // When we leave bombed caves, show them as bombed
      // for now, until we figure out the correct behavior.
      if (this.capTile) { 
        this.hasBeenBombed = true;
      }
			this.state = 'STEPPING_UP';
			this.steps = 5;
			game.playSound('stairs');
			game.avatar.isLeavingCave = false;
			game.avatar.x = this.x;
			game.avatar.y = this.y + 4;
			game.avatar.z = this.z;
			game.avatar.zOffset = -20;
		}

		if (this.state == 'WAITING_TO_ARRIVE') {
			this.state = 'STEPPING_DOWN';
			game.avatar.zOffset = -1;
			this.steps = 0;
			game.playSound('stairs');
			game.pauseSound('overworld');
		}
		
  } else {
    if (this.state == 'WAITING_TO_LEAVE') {
      this.state = 'WAITING_TO_ARRIVE';
    }
  }
  
  if (this.hasBeenBombed) {
    this.draw('ow_cave', [this.x, this.y - 1, this.z + 1], Math.PI);
  }
};


/**
 * Handles Damage. The theory is that bombs are the only things
 * that do enough to blow up a door.
 * @param {ace.Game} The game.
 */
ace.Cave.prototype.takeDamage = function(damage) {
  this.hitPoints -= damage;
  if (this.hitPoints <= 0) {
    this.isWalkable = true;
    this.state = 'WAITING_TO_ARRIVE';
    this.hasBeenBombed = true;
    return true;
  } else {
    this.hitPoints = this.maxHitPoints;
    return false;
  }
};

