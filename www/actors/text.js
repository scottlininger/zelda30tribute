/**
 * @fileoverview  Provide the Text class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Text class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Text = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Text';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.animatedText = '';
  this.rotX = -.3;
};
ace.inherits(ace.Text, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Text.prototype.onTick = function(game) {

  if (game.isEvenFrame) {
    
    var textToDraw = this.text || 'SOMETHING';
    if (this.animatedText.length < textToDraw.length) {
      game.avatar.isFrozen = true;
		  game.playSound('text');
      this.animatedText += textToDraw.substr(this.animatedText.length, 1);
    } else {
      game.avatar.isFrozen = false;
    }
  }
  
  this.drawText(this.animatedText, game);
};


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Text.prototype.drawText = function(txt, game) {
  var x = this.x;
  var y = this.y + 16;
  var z = this.z + 28 + 7;
  
  for (var i = 0; i < txt.length; i++) {
    var c = txt.substr(i, 1);
    if (c == "'") { c = 'tick'; }
    if (c == "?") { c = 'question'; }
    if (game.engine.spriteHasBeenRegistered(c)) {
		  this.draw(c, [x, y, z]);
		  x += 8;
	  } else if (c == '\n') {
      z -= 9;
      y -= 2;
      x = this.x;
    } else {
      x += 8;
    }
	}
};
