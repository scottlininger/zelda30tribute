/**
 * @fileoverview  Provide the room class.
 * @author scott@scottlininger.com (Scott Lininger)
 */
 

/**
 * Constructor for the room class, which stores everything we
 *   need to know about a LOZ dungeon room.
 * @param {number} roomX The roomX of the room in the grid.
 * @param {number} roomY The roomY of the room in the grid.
 * @constructor
 */
ace.Room = function(roomX, roomY) {
  var settings = settings || {};

  /**
   * The room's gridX position on the map.
   */
  this.x = roomX;

  /**
   * The room's gridY position on the map.
   */
  this.y = roomY;

	/**
	 * A boolean used by the game to differentiate this room from the
	 * overworld rooms that are constructed on the fly.
	 */
  this.isInUnderworld = true;

  /**
   * A collection of data structures, not of the spawned actors,
   * but describing what actors to spawn when the room is entered.
   */
  this.actors = [];

  /**
   * Any offset to the camera target to respect while inside this room.
   */
  this.cameraTargetOffset = [0,0,0];
   
  /**
   * Any offset to the camera eye to respect while inside this room.
   */
  this.cameraEyeOffset = [0,0,0];  
     
  /**
   * Assume we're using that standard song.
   */
  this.song = 'underworld';
  
  /**
   * A collection of whether this room can be exited in various
   * directions.
   */
  this.exitByFacing = {};
  this.exitByFacing['left'] = ace.OPEN;
  this.exitByFacing['right'] = ace.OPEN;
  this.exitByFacing['up'] = ace.OPEN;
  this.exitByFacing['down'] = ace.OPEN;
  
};


/**
 * Adds an actor record to our collection.
 * @param {string} The type string of the actor, like 'Hurler'.
 * @param {Object} settings
 */
ace.Room.prototype.addActor = function(type, x, y, settings) {
  var actor = {};
  actor.type = type;
  actor.x = x;
  actor.y = y;
  actor.settings = settings || {};
  this.actors.push(actor); 
};


/**
 * Stores a string that represents a series of walkable spots in
 * a room. Useful for underworld maps with mazes.
 * @param {string} walkMapString The 
 */
ace.Room.prototype.addWalkMap = function(walkMap) {
  this.walkMap_ = walkMap;
};


/**
 * Gets a tile record at a given worldX and worldY position.
 * @param {number} worldX The x position.
 * @param {number} worldY The y position.
 */
ace.Room.prototype.getTileAt = function(worldX, worldY) {
  var tile = {
		'id': ace.tileIdsByName['ow_ground'],
		'name': 'ow_ground',
		'isWalkable': true,
		'walkSpeedFactor': 1
	};
		
  if (!this.walkMap_) {
    return tile;
  }
  
  var floorX = worldX - this.x * ace.UNDERWORLD_ROOM_PIXEL_WIDTH - 32;
  var floorY = worldY - this.y * ace.UNDERWORLD_ROOM_PIXEL_HEIGHT - 32;
  var tileX = Math.floor(floorX / 16);
  var tileY = Math.floor(floorY / 16);
  if (tileX < 0 || tileX > 11 || tileY < 0 || tileY > 6) {
    return tile;
  }
  var c = this.walkMap_.substr((6 - tileY) * 12 + tileX, 1);
  if (c == ' ') {
    tile.id = ace.tileIdsByName['ow_rock_br'];
    tile.name = 'ow_rock_br';
    tile.isWalkable = false;
    return tile;
  }
  return tile;
};

