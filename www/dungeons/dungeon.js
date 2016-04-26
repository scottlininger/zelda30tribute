/**
 * @fileoverview  Provide the dungeon class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the dungeon class, which stores everything we
 *   need to know about a LOZ dungeon.
 * @param {string} backgroundUrl Url to a JPG or PNG which contains
 *     the dungeon's background image.
 * @param {Object=} opt_settings An optional hash with settings to adopt.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Dungeon = function(backgroundUrl, opt_settings) {
  var settings = settings || {};
  
  /**
   * The div we're rendering everything into.
   */
  this.backgroundUrl = backgroundUrl;
  
  this.roomsByLocationName_ = {};
};


/**
 * Add a room record and return it.
 * @param {number} roomX The room's grid x position.
 * @param {number} roomY The room's grid y position.
 * @return {Object} The new room.
 */
ace.Dungeon.prototype.addRoom = function(roomX, roomY) {
  var room = new ace.Room(roomX, roomY);
  this.roomsByLocationName_[roomX + ',' + roomY] = room;
  room.dungeonName = this.name;
  return room;
};


/**
 * Gets a room record and returns it. If none exists yet, go ahead and
 * create one.
 * @param {number} roomX The room's grid x position.
 * @param {number} roomY The room's grid y position.
 * @return {Object} The new room.
 */
ace.Dungeon.prototype.getRoom = function(roomX, roomY) {
  var roomName = roomX + ',' + roomY;
  var room = this.roomsByLocationName_[roomName];
  if (!room) {
    var room = this.addRoom(roomX, roomY);
    room.hideOnMap = true;
  }
  room.name = roomName;
  return room;
};


