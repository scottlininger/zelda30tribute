/**
 * @fileoverview  Provide the LakeSand class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the LakeSand class, which covers up the
 * lake above dungeon 7.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.LakeSand = function(game, room) {
  ace.base(this, game, room);
  this.name = 'LakeSand';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 6 * 16;
  this.hitHeight = 4 * 16;
  this.isWalkable = false;
};
ace.inherits(ace.LakeSand, ace.Actor);

/**
 * What to do when we spawn.
 * @param {ace.Runner} The game Runner.
 */
ace.LakeSand.prototype.onSpawn = function(game) {
  this.z = -18;
  this.targetZ = -18;
  this.state = 'WAITING';
}

/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.LakeSand.prototype.onTick = function(game) {
  this.x = 640;
  this.y = 624;
  var dY = Math.floor(Math.min(game.avatar.y - 532, 16) / 4);
  
  
  this.targetZ = -18 + dY;
  
  var sprite = 'water';
  if (game.currentRoom_.whistleHasBeenBlown) {
    sprite = 'sand';
    if (dY > 3) {
      this.targetZ = -16.5;
      this.isWalkable = true;
      
      if (this.z < -12) { sprite = 'sand25'; }
      if (this.z < -13.5) { sprite = 'sand50'; }
      if (this.z < -15) { sprite = 'sand75'; }
      if (this.z < -16) { sprite = 'sand'; }
      
    }
    this.z = (this.targetZ + this.z * 3) / 4;
    
    
    if (dY < 4) { sprite = 'sand75'; }
    if (dY < 3) { sprite = 'sand50'; }
    if (dY < 2) { sprite = 'sand25'; }
    if (dY < 1) { sprite = 'water'; }
    
  } else {
    this.z = (this.targetZ + this.z * 3) / 4; 
  }

  
  for (var col = 0; col < 6; col++) {
    for (var row = 0; row < 4; row++) {
      
      this.rotX = 0;
      this.zOffset = 0;
      var offset = 0;
      if (col == 1 && row == 1 && game.currentRoom_.whistleHasBeenBlown && sprite == 'sand') {
        this.rotX = -Math.PI / 2;
        this.draw('stairs', [this.x - 3*16 + col*16 + 8, this.y - 2*16 + row*16 + 8 - 12, this.z + 11]); 
      } else {
        this.draw(sprite, [this.x - 3*16 + col*16 + 8, this.y - 2*16 + row*16 + 8, this.z]); 
      }
    }
  }

  

};


