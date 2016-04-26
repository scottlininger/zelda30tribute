/**
 * @fileoverview  Provide the LockedDoor class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the LockedDoor class, a simple, single-block LockedDoor.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.LockedDoor = function(game, room) {
  ace.base(this, game, room);
  this.name = 'LockedDoor';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.isWalkable = false;
  this.facing = 'down';
  this.dz = 14.5;
  this.bottomSprite = 'lockeddoor';
  this.topSprite = 'lockeddoortop';  
};
ace.inherits(ace.LockedDoor, ace.Actor);


/**
 * What to do right after we spawn.
 * @param {ace.Game} The game.
 */
ace.LockedDoor.prototype.onSpawn = function(game) {
	this.localX = this.x % ace.UNDERWORLD_ROOM_PIXEL_WIDTH;
  this.localY = this.y % ace.UNDERWORLD_ROOM_PIXEL_HEIGHT;
  
  if (this.localX > ace.UNDERWORLD_ROOM_PIXEL_WIDTH * .75) {
    this.facing = 'left';
  } else if (this.localX < ace.UNDERWORLD_ROOM_PIXEL_WIDTH * .25) {
    this.facing = 'right';
  } else if (this.localY < ace.UNDERWORLD_ROOM_PIXEL_HEIGHT * .25) {
    this.facing = 'up';
  }
  
  // Little offset for display.
  this.y -= 1;
  this.rotZ = ace.getRotZByFacing(this.facing);
  this.dy = ace.yMultByFacing[this.facing] * -6;
  this.dx = ace.xMultByFacing[this.facing] * -6;
  this.rotX2 = -.42;
  
  // Add the classic zelda glitch where the first dungeon's
  // locked door goes away if you re-enter dungeon.
  if (game.currentRoom_.name == '2,0' &&
      game.currentDungeon_.name == 'Dungeon1') {
    if (top.readyForDungeon1Glitch) {
      this.hide();
    } else {
      top.hasBeenInFirstDungeonEntrance = true;
    } 
  }
};


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.LockedDoor.prototype.onTick = function(game) {
  this.draw(this.bottomSprite);
  this.draw(this.topSprite, [this.x + this.dx, this.y + this.dy, this.z + this.dz]);

  game.engine.drawLight($('light-lantern'), this.x - this.dx, this.y - this.dy,50);

  // If we're in front of the door, unlock it for cost of 1 key.
  if (this.distance(game.avatar) < 18 &&
      game.avatar.facing == ace.oppositeFacings[this.facing]) {
    if (game.state.keys > 0) {
			game.avatar.changeKeys(-1);
			game.playSound('unlock');
			this.hide();
	  }
  }

  // If we're behind a door, unlock it for free!
  if (this.distance(game.avatar) < 18 &&
      game.avatar.facing == this.facing) {
	  this.hide();
  }
};