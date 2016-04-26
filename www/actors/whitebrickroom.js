/**
 * @fileoverview  Provide the WhiteBrickRoom class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the WhiteBrickRoom class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.WhiteBrickRoom = function(game, room) {
  ace.base(this, game, room);
  this.name = 'WhiteBrickRoom';
  this.rotX = -Math.PI / 2;
};
ace.inherits(ace.WhiteBrickRoom, ace.Actor);



/**
 * What to do when we spawn.
 * @param {ace.Game} The game.
 */
ace.WhiteBrickRoom.prototype.onSpawn = function(game) {
  var roomX = Math.floor(this.x / ace.UNDERWORLD_ROOM_PIXEL_WIDTH);
  var roomY = Math.floor(this.y / ace.UNDERWORLD_ROOM_PIXEL_HEIGHT);
  this.baseX = roomX * ace.UNDERWORLD_ROOM_PIXEL_WIDTH + 24;
  this.baseY = roomY * ace.UNDERWORLD_ROOM_PIXEL_HEIGHT + 16;
  game.currentRoom_.isSideScroll = true;
  game.currentRoom_.addWalkMap(' X          ' +
                               ' X          ' +
                               ' X   XXXXXXX' +
                               ' X       X  ' +
                               ' X       X  ' +
                               'XXXXXXXXXXXX' +
                               '            ');
                            
  this.brickMap = '  X           ' +
                  '  X           ' +
                  '  X   XXXXXXX ' +
                  '  X   XXXXXXX ' +
                  '  X       X   ' +
                  ' XXXXXXXXXXXX ' +
                  ' XXXXXXXXXXXX ' +
                  '              ' +
                  '              ';
};


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.WhiteBrickRoom.prototype.onTick = function(game) {
  for (var tileX = 0; tileX < 14; tileX++) {
    for (var tileY = 0; tileY < 9; tileY++) {
      var c = this.brickMap.substr((8 - tileY) * 14 + tileX, 1);
      if (c == ' ') {
        var z = -1008;
        if (tileY == 0 || tileY == 8 || tileX == 0 || tileX == 13) {
          z = -1008 + 16;
        }
        if (tileY == 1 || tileY == 7 || tileX == 1 || tileX == 12) {
          z = Math.max(z, -1008 + 8);
        }
        this.draw('whitebrick', [this.baseX + tileX * 16,
                                 this.baseY + tileY * 16, z]);
      }
    }
  }
};

