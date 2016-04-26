/**
 * @fileoverview  Provide the StartScreen class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the StartScreen class, which handles the game welcome experience.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.StartScreen = function(game, room) {
  ace.base(this, game, room);
  this.name = 'StartScreen';
  this.fg = [1891, -3590, 1880];
  this.rotZ = -.5;
  this.rocks = {'L': Math.PI/2,			// light
								'F': Math.PI/2 * 2, // flipped
								'D': Math.PI/2 * 3, // dark
								'N': 0.001} // normal
  this.waterZ = 0;
};
ace.inherits(ace.StartScreen, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.StartScreen.prototype.onTick = function(game) {
  if (game.cameraEye_[1] > -2800) {
    return;
  }
  var centerX = 1891;
  var centerY = -3420;
  var centerZ = 1975;

  var columns = 12;
  var rows = 6;
  var size = 16;
  var baseX = centerX - (columns - 1) / 2 * size;
  var baseY = centerY;
  var baseZ = centerZ + 50;

  this.rotZ += .014;

  // Title screen sprites.
  for (var c = 0; c < columns; c++) {
		for (var r = 0; r < rows; r++) {
		  var sprite = 'title' + c + '-' + r;
		  var xOffsetFromCenter = (baseX + c * size) - centerX;
		  
		  this.x = centerX + xOffsetFromCenter * Math.cos(this.rotZ);
		  this.y = centerY + xOffsetFromCenter * Math.sin(this.rotZ);
		  this.z = baseZ - r * size;
		  this.draw(sprite);
		}
	}
	
	var x = this.fg[0];
	var y = this.fg[1];
	var z = this.fg[2];
	
	this.draw('title-rock', this.fg, this.rocks.N);
	this.draw('title-rocktop', [x,y,z+16], this.rocks.N);
  this.draw('title-rocktop', [x+12,y-1,z+12], this.rocks.N);
  this.draw('title-rocktop', [x+18,y-3,z+9], this.rocks.N);
  this.draw('title-rocktop', [x+32,y-1,z+12], this.rocks.N);
  this.draw('title-rocktop', [x+48,y,z+16], this.rocks.L);
  this.draw('title-rock', [x+64,y-2,z+16], this.rocks.N);
  this.draw('title-rock', [x+64+10,y+4,z+32], this.rocks.N);
  this.draw('title-rock', [x+64+10,y+4,z+48], this.rocks.N);
  this.draw('title-rock', [x+64+16,y+4,z+64], this.rocks.N);
  this.draw('title-rock', [x+64+16,y+4,z+70], this.rocks.N);
  this.draw('title-rocktop', [x+64+20,y+8,z+86], this.rocks.N);
  this.draw('title-rocktop', [x+15,y,z+1], this.rocks.L);
  this.draw('title-rock', [x+30,y,z], this.rocks.F);
  this.draw('title-rock', [x+46,y,z], this.rocks.L);
  this.draw('title-rock', [x+61,y-12,z+8], this.rocks.N);

  this.draw('title-rock', [x+64+16,y+4,z+64-16], this.rocks.D);
  this.draw('title-rock', [x+64+16,y+5,z+64-33], this.rocks.D);
  
  this.draw('title-rock', [x+46+15,y,z], this.rocks.L);
  this.draw('title-rock', [x+61+15,y-12,z+16], this.rocks.N);
  
  this.waterZ = (this.waterZ + 1) % 8;
  this.draw('title-water', [x-16,y+10,z+18], this.rocks.N, this.rocks.L);
  this.draw('title-water', [x-16,y+1,z-this.waterZ+16-6], this.rocks.N);
  this.draw('title-water', [x-16,y,z-this.waterZ-6+2], this.rocks.N);
  
  this.draw('title-mist', [x-16,y+4,z+12], this.rocks.N, this.rotZ*10);
  this.draw('title-mist', [x-17,y+4,z+12], this.rocks.N, this.rotZ*10 + Math.PI/2);
  this.draw('title-mist', [x-18,y+4,z+13], this.rocks.N, this.rotZ*10 + Math.PI);
  
  this.draw('title-rock', [x-32,y,z], this.rocks.D);
  this.draw('title-rocktop', [x-32,y,z+16], this.rocks.D);
  this.draw('title-rock', [x-32-8,y-4,z+4], this.rocks.N);
  this.draw('title-rocktop', [x-32-8,y-4,z+16+4], this.rocks.N);
  this.draw('title-rock', [x-48,y,z], this.rocks.L);
  this.draw('title-rocktop', [x-48,y,z+16], this.rocks.L);
  
  this.draw('title-rock', [x-65,y+8,z], this.rocks.F);
  this.draw('title-rock', [x-65,y+8,z+16], this.rocks.F);
  this.draw('title-rock', [x-70,y+12,z+32], 2);
  
  this.draw('title-rock', [x-60,y+28,z], this.rocks.F);
  this.draw('title-rock', [x-80,y+28,z+16], this.rocks.F);
  this.draw('title-rock', [x-77,y+28,z+32], 1.3);
  this.draw('title-rock', [x-77,y+28,z+48], 1.3);
  this.draw('title-rock', [x-77,y+28,z+64], 1.3);
  this.draw('title-rock', [x-90,y+72,z+80], 1);
  this.draw('title-rock', [x-90,y+72,z+96], 1);
  this.draw('title-rocktop', [x-90,y+72,z+112], 1);
  this.draw('title-rock', [x+4*16,y-42,z], 1);
  
  this.draw('title-rock', [x-70,y-12,z], this.rocks.N);
  
  this.draw('title-rock', [x+3*16+8,y-42-70,z], this.rocks.N);
  this.draw('title-rock', [x-3*16-1,y-42-75,z-2], 1);
  
  //game.engine.drawLight($('light-lantern'), 1891, 150,200);
  game.engine.drawLight($('light-star'), 1891, 150,300);
  

  game.engine.drawLight($('light-lantern'), 1891-16, -10,15);
  game.engine.drawLight($('light-lantern'), 1891-16, -10,15);
  game.engine.drawLight($('light-lantern'), 1891-16, -10,15);
/*game.engine.drawLight($('shadow-obstacle'), 1891-60, 30,200);
game.engine.drawLight($('shadow-obstacle'), 1891-60, 30,200);
*/

};

