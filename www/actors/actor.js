/**
 * @fileoverview  Provide the Actor class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Actor class, something that moves on a map.
 * @param {Object|null} settings An optional hash with settings to adopt.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Actor = function(game, room, settings) {

  var settings = settings || {};

  /**
   * The game this belongs to.
   * @type {ace.Game}
   */
  this.game = game;

  /**
   * The room this belongs to.
   * @type {ace.Game}
   */
  this.room = room;

  /**
   * A relative or absolute URL to an image to use for this tile.
   * @type {string}
   */
  this.imgSrc = settings.imgSrc || 'img/avatar.png';

  /**
   * The width of the sprite div.
   * @type {number}
   */
  this.width = settings.width || 16;

  /**
   * The height of the sprite div.
   * @type {number}
   */
  this.height = settings.height || 16;

  /**
   * The width of the "hittable" region, centered inside the display
   * div whose width is defined by this.width.
   * @type {number}
   */
  this.hitWidth = settings.hitWidth || 16;

  /**
   * The height of the "hittable" region, centered inside the display
   * div whose height is defined by this.height.
   * @type {number}
   */
  this.hitHeight = settings.hitHeight || 16;

  /**
   * The friendly name of this tile.
   * @type {string}
   */
  this.name = settings.name || 'Actor';

  /**
   * A collection of any frames this thing contains. Frames are keyed
   * by an arbitrary name and contain a hash of style settings to apply
   * such as frames.Walk1.backgroundPosition = '-5px -18px' and
   * frame.Walk1.opacity = '.5'.
   */
  this.frames = {};

  if (this.room) {
    /**
     * The width of the room in pixels.
     * @type {number}
     */
    this.roomWidth = this.room.map.tileSize * this.room.map.roomWidth;

    /**
     * The height of the room in pixels.
     * @type {number}
     */
    this.roomHeight = this.room.map.tileSize * this.room.map.roomHeight;
  }
  
  /**
   * Whether this guy is hidden. Hidden actors don't interact at all.
   * @type {boolean}
   */
  this.isHidden = false;

  /**
   * If true, this guy is not drawn.
   * @type {boolean}
   */
  this.isInvisible = false;
  
   
  /**
   * Whether this guy should be rendered with "negative" color, which is
   * useful for showing actors taking damage.
   * @type {boolean}
   */ 
  this.renderNegativeColor = false;

  /**
   * The x location of the Actor in the world.
   * @type {number}
   */
  this.x = settings.x || 0;

  /**
   * The y location of the Actor in the world.
   * @type {number}
   */
  this.y = settings.y || 0;

  /**
   * The z location of the Actor in the world.
   * @type {number}
   */
  this.z = settings.z || 0;

  /**
   * The opacity, from 0 to 1.
   * @type {number}
   */
  this.opacity = settings.opacity || 1;


  /**
   * The rotation about the actor's Z Axis, in radians.
   * @type {number}
   */
  this.rotZ = settings.rotZ || 0;

  /**
   * A string name for the frame we're on.
   */
  this.frame = '';

  /**
   * Handy member variables for moving us in "visual" direction.
   */
  this.xOffset = 0;
  this.yOffset = 0;
  this.zOffset = 0;
  

  /**
   * Which actor I am in the current list, useful for
   * spawning cloud animations.
   */
  this.actorCountNumber = 0;
  if (game.actors) {
    this.actorCountNumber = game.actors.length;
  };

};


/**
 * Contains the string "Actor" for each instance of this class.
 * @type {string}
 */
ace.Actor.prototype.typeName = 'Actor';


/**
 * A nicely formatted string describing the Object.
 * @return {string} A string like 'Map'
 */
ace.Actor.prototype.toString = function() {
  return this.name + (this.uniqueId || '');
};


/**
 * Spawns an actor into the game.
 */
ace.Actor.prototype.spawn = function(game) {
  this.onSpawn(game);
};


/**
 * Applies a given named frame.
 * @return {string} frameName The frame name.
 */
ace.Actor.prototype.setFrame = function(frameName) {
  this.frame = frameName;
  return;

  var frame = this.frames[frameName];
  if (frame) {
    for (key in frame) {
      this.div.style[key] = frame[key];
    }
    this.currentFrame = frameName;
  } else {
    throw new Error('Could not find frame "' + frameName + '" in ' + this);
  }
};


/**
 * Returns whether this actor can "walk" somewhere, based on the
 * isWalkable trait of the tile they're about to step into. Note
 * that this is smart enough to handle world and room wraparound,
 * so make sure that's what you want to check for.
 * @param {number} dx The x offset from my center I want to check.
 * @param {number} dy The y offset from my center I want to check.
 * @return {boolean} Whether I can walk there.
 */
ace.Actor.prototype.canWalk = function(dx, dy) {
  var x = this.x + dx;
  var y = this.y + dy;
  if (dx > 0) x += this.hitWidth / 2;
  if (dx < 0) x -= this.hitWidth / 2;
  if (dy > 0) y += this.hitHeight / 2;
  if (dy < 0) y -= this.hitHeight / 2;

	for (var i = 0; i < game.actors.length; i++) {
		var actor = game.actors[i];
		if (actor.isHitAt(x, y) && actor.isWalkable === false) {
			return false;
		}
	}

  if (this.isInUnderworld()) {
    
    var room = game.getRoom(x, y, this.z);
    if (!room.getTileAt(x, y).isWalkable) {
      return false;
    }
    
    // This happens on the very edge of the map. Allow because otherwise
    // the localX, localY wraps around and you can never escape.
    var nextRoom = game.getRoom(x, y, this.z);
    if (room != nextRoom) {
      return true;
    }
    var localX = x % ace.UNDERWORLD_ROOM_PIXEL_WIDTH;
    var localY = y % ace.UNDERWORLD_ROOM_PIXEL_HEIGHT;
		var tileX = Math.floor(localX / ace.TILE_SIZE);
		var tileY = Math.floor(localY / ace.TILE_SIZE);
		
		// The avatar can walk through doors. Nobody else can.
		if (this.name == 'Avatar') {
			if (tileY == 5) {
				if (tileX < 2) { return game.canExit(room, 'left') };
				if (tileX > 13) { return game.canExit(room, 'right') };
			} else if (localX > 120 && localX < 136) {
				if (tileY < 2) { return game.canExit(room, 'down') };
				if (tileY > 8) { return game.canExit(room, 'up') };
			}
	  }
    return (tileX > 1 && tileX < 14 && tileY > 1 && tileY < 9);
  }

  var tile = this.getTileAt(x, y);
  
  if (this.isEnemy) {
    if (tile && tile.isWalkableByEnemies) {
      return true;
    }
    return false;
  }
  
  if (tile && tile.isWalkable) {
    return true;
  }
  return false;
};


/**
 * Returns whether this actor can "fly" somewhere, based on the
 * room size.
 * @param {number} dx The x offset from my center I want to check.
 * @param {number} dy The y offset from my center I want to check.
 * @return {boolean} Whether I can walk there.
 */
ace.Actor.prototype.canFly = function(dx, dy) {
  var x = this.x + dx;
  var y = this.y + dy;
  if (dx > 0) x += this.hitWidth / 2;
  if (dx < 0) x -= this.hitWidth / 2;
  if (dy > 0) y += this.hitHeight / 2;
  if (dy < 0) y -= this.hitHeight / 2;
    
	var localX = x % ace.UNDERWORLD_ROOM_PIXEL_WIDTH;
	var localY = y % ace.UNDERWORLD_ROOM_PIXEL_HEIGHT;
	var tileX = Math.floor(localX / ace.TILE_SIZE);
	var tileY = Math.floor(localY / ace.TILE_SIZE);
	return (tileX > 1 && tileX < 14 && tileY > 1 && tileY < 9);
};


/**
 * Returns the tile at a given x, y screen location. If none is found, returns
 * a global "nothing" tile that can't be walked on.
 * @param {number} worldX The x position.
 * @param {number} worldY The y position.
 * @return {ace.Tile} The tile there, or false if out of bounds.
 */
ace.Actor.prototype.getTileAt = function(worldX, worldY, opt_z) {
  return this.game.getTileAt(worldX, worldY, opt_z);
};


/**
 * Returns whether this actor "is" at a given x, y screen location.
 * @param {number} screenX The x position.
 * @param {number} screenY The y position.
 * @return {boolean} Whether I'm hit.
 */
ace.Actor.prototype.isHitAt = function(screenX, screenY) {
  if (this.isHidden) return false;

  var dX = Math.abs(this.x - screenX);
  if (dX > this.hitWidth / 2) {
    return false;
  }
  
  var dY = Math.abs(this.y - screenY);
  if (dY > this.hitHeight / 2) {
    return false;
  }

  return true;
};

/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damge The damage to apply.
 */
ace.Actor.prototype.takeDamage = function(damage) {
  // Do nothing. See enemy.js for a typical implementation;
};


/**
 * Hides this sucker.
 */
ace.Actor.prototype.hide = function() {
  this.isHidden = true;
};

/**
 * Unhides this sucker.
 */
ace.Actor.prototype.unhide = function() {
  this.isHidden = false;
};


/**
 * Angle to a given x, y position.
 */
ace.Actor.prototype.angleTo = function(x, y) {
  var dx = x - this.x;
  var dy = y - this.y;

  // If asked to aim to our own center, do nothing.
  if (dx == 0 && dy == 0) {
    return 0;
  }
  var angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
  return angle * Math.PI / 180;
};


/**
 * Tells us whether we overlap with another actor.
 */
ace.Actor.prototype.isTouching = function(actor) {
  if (actor.isHidden || this.isHidden) {
    return false;
  }
  if (actor.isEnemy && actor.hitPoints <= ace.HITPOINTS_DYING
    && actor.hitPoints > ace.HITPOINTS_DEAD) {
    return false;
  }
  var dX = Math.abs(this.x - actor.x);
  var rangeX = this.hitWidth / 2 + actor.hitWidth / 2;
  if (dX > rangeX) {
    return false;
  }

  var dY = Math.abs(this.y - actor.y);
  var rangeY = this.hitHeight / 2 + actor.hitHeight / 2;
  if (dY > rangeY) {
    return false;
  }

  // For now this is a hardcoded 16 pixels of difference.
  var dZ = Math.abs(this.z - actor.z);
  if (dZ > 16) {
    return false;
  }

  return true;
};


/**
 * What happens then the avatar touches us.
 */
ace.Actor.prototype.onTouchAvatar = function(runner) {
  // Do nothing, 'cause I'm just a parent class!
};


/**
 * What happens every animation tick.
 */
ace.Actor.prototype.onTick = function(runner) {
  // Do nothing, 'cause I'm just a parent class!
};


/**
 * What happens then we spawn.
 */
ace.Actor.prototype.onSpawn = function() {
  this.baseX = Math.floor(this.x / ace.OVERWORLD_ROOM_PIXEL_WIDTH) * ace.OVERWORLD_ROOM_PIXEL_WIDTH;
  this.baseY = Math.floor(this.y / ace.OVERWORLD_ROOM_PIXEL_HEIGHT) * ace.OVERWORLD_ROOM_PIXEL_HEIGHT;
};


/**
 * Destroys this object and any div it has reference to.
 */
ace.Actor.prototype.dispose = function() {
  delete this;
};


/**
 * Tells us whether we're off the room.
 */
ace.Actor.prototype.isOffScreen = function(opt_x, opt_y) {
  var x = this.x;
  var y = this.y;
  if (opt_x !== undefined) {
    x = opt_x;
    y = opt_y;
  }
  if (this.isInUnderworld()) {
    var baseX = Math.floor(x / ace.OVERWORLD_ROOM_PIXEL_WIDTH) *
        ace.OVERWORLD_ROOM_PIXEL_WIDTH;
    var baseY = Math.floor(y / ace.OVERWORLD_ROOM_PIXEL_HEIGHT) *
        ace.OVERWORLD_ROOM_PIXEL_HEIGHT; 
        
    var inset = 32;
    
    if (x < baseX + inset ||
        y < baseY + inset ||
        x > baseX + ace.OVERWORLD_ROOM_PIXEL_WIDTH - inset ||
        y > baseY + ace.OVERWORLD_ROOM_PIXEL_HEIGHT - inset) {
      return true;    
    }
  
  } else {
		var dx = ace.diff(x, game.avatar.x);
		if (dx > ace.OVERWORLD_ROOM_PIXEL_WIDTH / 2) {
			return true;
		}
		var dy = ace.diff(y, game.avatar.y);
		if (dy > ace.OVERWORLD_ROOM_PIXEL_HEIGHT / 2) {
			return true;
		}
  }
  return false;
};



/**
 * If we're off screen, moves to the nearest spot on screen.
 */
ace.Actor.prototype.moveOnScreen = function() {
  if (this.x > this.roomWidth) this.x = this.roomWidth - 1;
  if (this.x < 0) this.x = 0;
  if (this.y > this.roomHeight) this.y = this.roomHeight - 1;
  if (this.y < 0) this.y = 0;
};


/**
 * Draws to the canvas.
 * @param {Array.<number>} opt_name An optional, string sprite name to draw.
 * @param {Array.<number>} opt_position An optional, 3-element position array.
 * @param {Array.<number>} opt_rotZ An optional rotZ, in radians.
 * @param {Array.<number>} opt_rotX An optional rotX, in radians.
 */
ace.Actor.prototype.draw = function (opt_name, opt_position, opt_rotZ, opt_rotX, opt_rotX2) {
  if (!this.isHidden && !this.isInvisible && this.opacity > 0.75) {
    var name = opt_name || this.name + this.frame;
    var pos = opt_position || [this.x + this.xOffset, this.y + this.yOffset, (this.z || 0) + this.zOffset];
    var rotZ = opt_rotZ || this.rotZ;
    var rotX = opt_rotX || this.rotX;
    var rotX2 = opt_rotX2 || this.rotX2;
    var renderNegativeColor = this.renderNegativeColor;

    this.game.engine.drawSingleSprite(name, pos, rotZ, ace.shellsByTileName[name],
        rotX, rotX2, renderNegativeColor);
  }
};

/**
 * Whether the avatar is in the underworld.
 * @return {boolean} True if we are.
 */
ace.Actor.prototype.isInUnderworld = function() {
  return (this.z < -100);
};


/**
 * Gives the distance between this actor and another actor.
 * @return {number} Distance in pixels.
 */
ace.Actor.prototype.distance = function(other) {
  return ace.distance(ace.diff(this.x, other.x), ace.diff(this.y, other.y)); 
};


/**
 * Checks if this thing is spawning with a "cloud", and if so,
 * does that animation. It returns true if the animation is underway.
 * @return {boolean} If we're animating the cloud.
 */
ace.Actor.prototype.standardCloudSpawnCheck = function(other) {
  if (this.cloudFrames) {
  
  	// Do not start spawning if the avatar is right close to you.
  	if (this.distance(game.avatar) < 48 && this.cloudFrames == 1) {
  	  return true;
  	}
  
    this.cloudFrames += .5;
    
    if (this.cloudFrames > this.actorCountNumber + 1 + 1) {
    	this.cloudFrames = false;
    } else if (this.cloudFrames > this.actorCountNumber + 1) {
      this.draw();
      this.draw('cloud2');
    } else {
    	var dz = this.actorCountNumber + 1 - this.cloudFrames;
      this.draw('cloud', [this.x, this.y, this.z - dz*8]);
    }
    return true;
  }
  return false;
}