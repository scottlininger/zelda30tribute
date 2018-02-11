/**
 * @fileoverview Establish the main engine object, which draws all of the
 *    WebGL stuff into a canvas.
 */


/**
 * A global gl context.
 */
var gl;


 /**
 * The main Engine object. New up this sucker and it'll get going.
 * @param {string} divId The div id to render into.
 */
ace.EngineVoxel = function(divId, opt_settings) {
  var settings = opt_settings || {};

  /**
   * The div we're rendering everything into.
   */
  this.document = settings['document'] || document;
  
  /**
   * The div we're rendering everything into.
   */
  this.div = this.document.getElementById(divId);
  
  /**
   * The "native" width of the game canvas.
   */
  this.width = window.innerWidth;
  
  /**
   * The "native" height of the game canvas.
   */
  this.height = window.innerHeight - 100;


  /**
   * The main game canvas, where everything will be rendered.
   */
  this.canvas = this.document.createElement('canvas');
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.canvas.display = 'none';
  this.canvas.id = 'game-canvas';
  this.canvas.style.display = 'block';
  this.div.appendChild(this.canvas);

  /**
   * The webgl canvas context.
   */
  this.gl = this.canvas.getContext('experimental-webgl', {antialias:false});
  gl = this.gl;

  /**
   * The size of the sprite voxel canvas, in pixels.
   */
  this.voxelSpriteCanvasWidth_ = 4096;
  this.voxelSpriteCanvasHeight_ = 2048;
  this.voxelSpriteSize_ = 16;
  this.voxelSpriteCount_ = 0;

  /**
   * Number of pixels of padding between our voxel sprite strips on the
   * canvas. This saves us some processing in the shader by not having to
   * worry about culling the adjacent pixels.
   */
  this.voxelSpritePadding_ = 1;

  /**
   * A hash of index numbers describing where in our texture image our voxel
   * sprite data is loaded, keyed by the friendly name.
   */
  this.voxelSpriteIdsByName_ = {};

  /**
   * The light map canvas. Any lighting or shadow effects that the actors
   * wants to add to the world will be rendered in 2D into this little map,
   * which is always centered on the avatar. Then during the actual render
   * pass, the custom shader will look for the light values to determine
   * how to modify the colors. A gray rgb value of 128,128,128 represents
   * "no light change". Anything else will be drawn as colored light or shadow.
   */
  this.lightMapCanvas_ = this.document.createElement('canvas');
  this.lightMapCanvas_.setAttribute('screencanvas', '0');
  this.lightMapCanvas_.width = ace.LIGHT_MAP_WIDTH;
  this.lightMapCanvas_.height = ace.LIGHT_MAP_HEIGHT;
  this.lightMapCanvas_.id = 'canvas-light-map';
  this.div.appendChild(this.lightMapCanvas_);

  /**
   * The light map context. Fill it with 50% gray, which is neutral light.
   */
  this.lightMapCtx_ = this.lightMapCanvas_.getContext('2d');
  this.lightMapCtx_.fillStyle = 'rgb(128, 128, 128)';
  this.lightMapCtx_.fillRect(0, 0, ace.LIGHT_MAP_WIDTH, ace.LIGHT_MAP_HEIGHT);
  this.lightMapCtx_.drawImage($('lightmap'), 0, 0, ace.LIGHT_MAP_WIDTH, ace.LIGHT_MAP_HEIGHT);

  /**
   * The dungeon canvas. This holds the texture that's mapped onto the underworld.
   */
  this.dungeonCanvas_ = this.document.createElement('canvas');
  this.dungeonCanvas_.setAttribute('screencanvas', '0');
  this.dungeonCanvas_.width = ace.DUNGEON_CANVAS_SIZE;
  this.dungeonCanvas_.height = ace.DUNGEON_CANVAS_SIZE;
  this.dungeonCanvas_.id = 'dungeon-texture';
  this.div.appendChild(this.dungeonCanvas_);
  this.dungeonCtx_ = this.dungeonCanvas_.getContext('2d');
  this.dungeonCtx_.fillStyle = 'rgb(0, 0, 0)';
  this.dungeonCtx_.fillRect(0, 0, ace.DUNGEON_CANVAS_SIZE, ace.DUNGEON_CANVAS_SIZE);

  /**
   * The voxel sprite canvas.
   */
  this.spriteCanvas_ = this.document.createElement('canvas');
  this.spriteCanvas_.style.display = 'none';
  this.spriteCanvas_.setAttribute('screencanvas', '0');
  this.spriteCanvas_.width = this.voxelSpriteCanvasWidth_;
  this.spriteCanvas_.height = this.voxelSpriteCanvasHeight_;
  this.div.appendChild(this.spriteCanvas_);
  this.overWorldNativeHeight_ = 1408;
  this.overWorldNativeWidth_ = 4096;

  /**
   * The size of our default "room" in tiles.
   */
  this.roomSizeX_ = 16;
  this.roomSizeY_ = 11;
  this.roomSizeZ_ = 2;

  /**
   * The texture context.
   */
  this.ctx = this.spriteCanvas_.getContext('2d');
  this.ctx.clearRect(0, 0, this.spriteCanvas_.width, this.spriteCanvas_.height);

  /**
   * The "picking" canvas, a much smaller viewport into the world
   * that we will render with a different shader.
   * TODO (scott): Uh, this isn't working. Maybe finish someday.
   */
  this.pickDebugCanvas_ = this.document.createElement('canvas');
  this.pickDebugCanvas_.width = 20;
  this.pickDebugCanvas_.height = 20;
  this.pickDebugCanvas_.style.display = 'none';
  this.div.appendChild(this.pickDebugCanvas_);

  /**
   * The webgl canvas context.
   */
  this.gl = this.canvas.getContext('experimental-webgl', {antialias:false});
  gl = this.gl;

  // Wire up some bound event handlers.
  var boundOnClick = ace.bind(this.onClick, this);
  var boundOnMouseMove = ace.bind(this.onMouseMove, this);
  var boundOnMouseUp = ace.bind(this.onMouseUp, this);
  var boundOnMouseDown = ace.bind(this.onMouseDown, this);
  var boundOnMouseWheel = ace.bind(this.onMouseWheel, this);
  var boundOnFullScreenChanged = ace.bind(this.onFullScreenChanged, this);
  this.canvas.addEventListener('click', boundOnClick);
  this.canvas.addEventListener('mousemove', boundOnMouseMove);
  this.canvas.addEventListener('mouseup', boundOnMouseUp);
  this.canvas.addEventListener('mousedown', boundOnMouseDown);
  this.canvas.addEventListener('mousewheel', boundOnMouseWheel);
  this.div.addEventListener(fullScreenApi.fullScreenEventName, boundOnFullScreenChanged);
  this.boundOnTick = ace.bind(this.onTick, this);

  /**
   * A handy container for our current per-sprite offset Transformation.
   */
  this.uOffsetTransform_ = mat4.create();

  /**
   * A handy holder for our z-axis.
   */
  this.zAxis_ = vec3.fromValues(0, 0, 1);

  this.setupWebGL_();
};

/**
* Draws a light into the light map canvas.
*/
ace.EngineVoxel.prototype.drawLight = function(lightImg, worldX, worldY, size, alpha, rotation) {

	// The current "room" is drawn within a centered 256x256 region
	// of the light map. That center region is the room where the avatar
	// is, so we render shadows and things relative to that.
	var avatarRoomOriginX = Math.floor(game.avatar.x / ace.OVERWORLD_ROOM_PIXEL_WIDTH) * ace.OVERWORLD_ROOM_PIXEL_WIDTH;
	var avatarRoomOriginY = Math.floor(game.avatar.y / ace.OVERWORLD_ROOM_PIXEL_HEIGHT) * ace.OVERWORLD_ROOM_PIXEL_HEIGHT;

	var dX = worldX - avatarRoomOriginX;
	var dY = worldY - avatarRoomOriginY;
	
	var x = 128 + dX;
	var y = 384 - dY;
	
	if (alpha === undefined) {
	  alpha = 1;
	}
	alpha = Math.min(1, alpha);
	alpha = Math.max(0, alpha);
	
	var rotation = rotation || 0;
  this.lightMapCtx_.save();
  this.lightMapCtx_.translate(x, y);
  this.lightMapCtx_.rotate(-rotation);
  this.lightMapCtx_.translate(-x, -y);
  this.lightMapCtx_.globalAlpha = alpha;
	this.lightMapCtx_.drawImage(lightImg, x - size/2, y - size/2, size, size);
  this.lightMapCtx_.restore();
  this.lightMapCtx_.globalAlpha = 1;
};


/**
 * Clears the base light map, so it's ready for the actors to draw shadows into.
 */
ace.EngineVoxel.prototype.clearLightMap = function() {
  // TODO(scott): get lighting map here.
  var isInUnderworld = false;
  if (game.avatar) {
    isInUnderworld = game.avatar.isInUnderworld();

    if (isInUnderworld) {
      this.lightMapCtx_.fillStyle = 'black';
      this.lightMapCtx_.fillRect(0, 0, ace.LIGHT_MAP_WIDTH, ace.LIGHT_MAP_HEIGHT);
      var distanceFromRoomEdgeX = Math.abs(game.avatar.x - Math.round(game.avatar.x/256)*256);
      var distanceFromRoomEdgeY = Math.abs(game.avatar.y - Math.round(game.avatar.y/176)*176);
      var distanceFromBottom = Math.max(0, game.avatar.y - 16);
      var distanceFromRoomEdge = Math.min(distanceFromRoomEdgeX, distanceFromRoomEdgeY, distanceFromBottom);
      
      var zone = 16;
      
      var c = 128 - Math.max(0, zone - distanceFromRoomEdge) * (128/zone);
      this.lightMapCtx_.fillStyle = 'rgb(' + c + ',' + c + ',' + c + ')';
      this.lightMapCtx_.fillRect(128, 128, 256, 256);
      this.lightMapCtx_.drawImage($('lightmap'), ace.LIGHT_MAP_WIDTH / 4,
          ace.LIGHT_MAP_WIDTH / 4, ace.LIGHT_MAP_WIDTH / 2, ace.LIGHT_MAP_WIDTH / 2);
		  
    } else {
    	this.lightMapCtx_.fillStyle = 'rgb(128, 128, 128)';
  		this.lightMapCtx_.fillRect(0, 0, ace.LIGHT_MAP_WIDTH, ace.LIGHT_MAP_HEIGHT);
    }
  }
};


/**
 * Handles the next frame. Tick!
 */
ace.EngineVoxel.prototype.onTick = function(refreshPick) {    

	// Tell the shader where the avatar is, for relative light
	// map reads.
  gl.uniform3fv(this.uAvatarRoomOriginLoc,
    [Math.floor(game.avatar.x / 256) * 256,
     Math.floor(game.avatar.y / 176) * 176, 0]);

  this.updateLightMap_();

  // Draw the overworld. (Sprite id -1)
  gl.uniform1f(this.uSpriteIdLoc, -1);
  mat4.identity(this.uOffsetTransform_);
  gl.uniformMatrix4fv(this.uOffsetLoc, false, this.uOffsetTransform_);
  
  // The door triangles are stuck on the back end of the world buffer.
  var worldBufferLength = ace.overWorldBufferData_.length - 32;
  gl.drawArrays(gl.TRIANGLES, 0, worldBufferLength / this.vertexStride_);

	if (game.currentRoom_.exitByFacing) {
		if (game.currentRoom_.exitByFacing['left']) { this.drawWall('left'); }
		if (game.currentRoom_.exitByFacing['right']) { this.drawWall('right'); }
		if (game.currentRoom_.exitByFacing['up']) { this.drawWall('up'); }
		if (game.currentRoom_.exitByFacing['down']) { this.drawWall('down'); }
	}
};


ace.EngineVoxel.prototype.setLightDirection = function(vector) {
  gl.uniform3fv(this.uLightDirectionLoc, vector);
};

ace.EngineVoxel.prototype.drawWall = function(facing) {
  var centerX = Math.floor(game.avatar.x / 256) * 256 + 256 / 2;
  var centerY = Math.floor(game.avatar.y / 176) * 176 + 176 / 2;
  centerX += 112 * ace.xMultByFacing[facing];
  centerY += 72 * ace.yMultByFacing[facing];
  this.drawRelativeDoor_([centerX, centerY, -1008], ace.getRotZByFacing(facing));
};

ace.EngineVoxel.prototype.drawRelativeDoor_ = function(offset, rotZ) {
  var worldBufferLength = ace.overWorldBufferData_.length - 32;

  mat4.identity(this.uOffsetTransform_);
  mat4.translate(this.uOffsetTransform_, this.uOffsetTransform_, offset);
  if (rotZ) {
    mat4.rotateZ(this.uOffsetTransform_, this.uOffsetTransform_, rotZ);
  }
  mat4.translate(this.uOffsetTransform_, this.uOffsetTransform_, [-13, -16, 0]);
  gl.uniformMatrix4fv(this.uOffsetLoc, false, this.uOffsetTransform_);
  gl.drawArrays(gl.TRIANGLES, worldBufferLength / this.vertexStride_, 48 / this.vertexStride_);

}


/**
 * Click handler for the canvas.
 * @param {event} e The event.
 */
ace.EngineVoxel.prototype.onClick = function(e) {
  ace.EngineVoxel.prototype.cameraRotZ_ = 1.7;
  ace.EngineVoxel.prototype.cameraRotX_ = 0;
};


/**
 * Mousedown handler for the canvas.
 * @param {event} e The event.
 */
ace.EngineVoxel.prototype.onMouseDown = function(e) {
  this.isDragging_ = true;
  this.dragStartX_ = e.offsetX;
  this.dragStartY_ = e.offsetY;
  e.preventDefault();
};


/**
 * Handles the mouseWheel event for the canvas.
 * @param {event} e The event.
 */
ace.EngineVoxel.prototype.onMouseWheel = function(e) {
  var delta = e.wheelDelta / 120;
  if (delta < 0) {
    this.cameraDistance_ *= 1.2;
  } else {
    this.cameraDistance_ *= .8;
  }
  
  e.preventDefault();
};


/**
 * Mousedown handler for the canvas.
 * @param {event} e The event.
 */
ace.EngineVoxel.prototype.onMouseUp = function(e) {
  this.isDragging_ = false;
};


ace.EngineVoxel.prototype.cameraTarget_ = [8, 0, 0];
ace.EngineVoxel.prototype.cameraRotZ_ = Math.PI;
ace.EngineVoxel.prototype.cameraRotX_ = 1;
ace.EngineVoxel.prototype.cameraDistance_ = 3000;

/**
 * Click handler for the canvas.
 * @param {event} e The event.
 */
ace.EngineVoxel.prototype.onMouseMove = function(e) {

  if (this.isDragging_) {
    var dx = e.offsetX - this.dragStartX_;
    var dy = e.offsetY - this.dragStartY_;

    if (e.shiftKey) {
      this.cameraTarget_[0] += dx * (this.cameraDistance_ / 800) * Math.cos(this.cameraRotZ_)
          - dy * (this.cameraDistance_ / 800) * Math.sin(this.cameraRotZ_);
      this.cameraTarget_[1] -= dx * (this.cameraDistance_ / 800) * Math.sin(this.cameraRotZ_)
          + dy * (this.cameraDistance_ / 800) * Math.cos(this.cameraRotZ_);
    } else {
      this.cameraRotZ_ += dx / 100;
      this.cameraRotX_ -= dy / 100;
    }

    this.dragStartX_ = e.offsetX;
    this.dragStartY_ = e.offsetY;
    e.preventDefault();
  }
};


/**
 * Sets up webgl.
 */
ace.EngineVoxel.prototype.setupWebGL_ = function() {

  this.vertexPosBuffer_ = gl.createBuffer();
  this.vertices_ = new Float32Array(183600 + ace.overWorldBufferData_.length);

  this.vertices_.set(ace.overWorldBufferData_, 0);
  this.vertexStride_ = 6;
  this.numVertices_ = 0;


  this.singleVoxelSpriteVertexCount_ = this.populateOnionSkin_(this.voxelSpriteSize_,
                                                               this.voxelSpriteSize_,
                                                               this.voxelSpriteSize_);

  
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPosBuffer_);
  gl.bufferData(gl.ARRAY_BUFFER, this.vertices_, gl.STATIC_DRAW);



  
  var vs = document.getElementById('vshader').textContent;
  var fs = document.getElementById('fshader').textContent;
  this.program = this.makeProgram(gl, vs, fs);
  var ctx = this.ctx;

  this.registerVoxelSprite('boulder', 'img/sprite_boulder.png');
  this.registerVoxelSprite('woodensword', 'img/sprite_woodensword.png');
  this.registerVoxelSprite('itemwoodensword', 'img/sprites2/item_woodensword.png');
  
  this.registerVoxelSprite('lockeddoor', 'img/sprites2/lockeddoor.png');
  this.registerVoxelSprite('lockeddoortop', 'img/sprites2/lockeddoortop.png');
  this.registerVoxelSprite('barreddoor', 'img/sprites2/barreddoor.png');
  this.registerVoxelSprite('barreddoortop', 'img/sprites2/barreddoortop.png');

  this.registerVoxelSprite('linkstand', 'img/sprite_linkstand.png');
  this.registerVoxelSprite('linkwalk', 'img/sprite_linkwalk.png');
  this.registerVoxelSprite('linkstab', 'img/sprite_linkstab.png');
  this.registerVoxelSprite('linknose', 'img/sprite_linknose.png');
  this.registerVoxelSprite('linkyay', 'img/sprites2/sprite_linkyay.png');
  this.registerVoxelSprite('linkyay2', 'img/sprites2/sprite_linkyay2.png');

  this.registerVoxelSprite('forest_turtle', 'img/forest_turtle.png');
  this.registerVoxelSprite('forest_bush', 'img/forest_bush.png');
  this.registerVoxelSprite('ow_bush', 'img/ow_bush.png');
  this.registerVoxelSprite('ow_turtle', 'img/ow_turtle.png');
  this.registerVoxelSprite('ow_path', 'img/ow_path.png');

  this.registerVoxelSprite('ow_tree_br', 'img/sprites/TreeBottomRightBrown.png');
  this.registerVoxelSprite('ow_tree_bl', 'img/sprites/TreeBottomLeftBrown.png');
  this.registerVoxelSprite('ow_tree_tr', 'img/sprites/TreeTopRightBrown.png');
  this.registerVoxelSprite('ow_tree_tl', 'img/sprites/TreeTopLeftBrown.png');
  this.registerVoxelSprite('ow_ent', 'img/sprites/TreeFaceBrown.png');

  this.registerVoxelSprite('forest_tree_br', 'img/sprites/TreeBottomRightGreen.png');
  this.registerVoxelSprite('forest_tree_bl', 'img/sprites/TreeBottomLeftGreen.png');
  this.registerVoxelSprite('forest_tree_tr', 'img/sprites/TreeTopRightGreen.png');
  this.registerVoxelSprite('forest_tree_tl', 'img/sprites/TreeTopLeftGreen.png');
  this.registerVoxelSprite('forest_ent', 'img/sprites/TreeFaceGreen.png');


  this.registerVoxelSprite('forest_rock_bl', 'img/forest_rock_bl.png');
  this.registerVoxelSprite('forest_rock_br', 'img/forest_rock_br.png');

  this.registerVoxelSprite('forest_rock_t', 'img/forest_rock_t.png');
  this.registerVoxelSprite('forest_rock_tl', 'img/forest_rock_tl.png');
  this.registerVoxelSprite('forest_rock_tr', 'img/forest_rock_tr.png');

  this.registerVoxelSprite('ow_rock_bl', 'img/ow_rock_bl.png');
  this.registerVoxelSprite('ow_rock_br', 'img/ow_rock_br.png');
  this.registerVoxelSprite('forest_knight', 'img/forest_knight.png');

  this.registerVoxelSprite('ow_rock_t', 'img/ow_rock_t.png');
  this.registerVoxelSprite('ow_rock_tl', 'img/ow_rock_tl.png');
  this.registerVoxelSprite('ow_rock_tr', 'img/ow_rock_tr.png');
  this.registerVoxelSprite('ow_knight', 'img/ow_knight.png');
  this.registerVoxelSprite('ow_cave', 'img/ow_cave.png');

  this.registerVoxelSprite('ow_water_l', 'img/ow_water_l.png');
  this.registerVoxelSprite('ow_water_t', 'img/ow_water_t.png');
  this.registerVoxelSprite('ow_water_tl', 'img/ow_water_tl.png');
  this.registerVoxelSprite('ow_water_tr', 'img/ow_water_tr.png');
  this.registerVoxelSprite('ow_water_bl', 'img/ow_water_bl.png');
  this.registerVoxelSprite('ow_water_br', 'img/ow_water_br.png'); 
  
  this.registerVoxelSprite('ow_water_r', 'img/ow_water_r.png');
  
  this.registerVoxelSprite('grave_bush', 'img/grave_bush.png');
  this.registerVoxelSprite('grave_grave', 'img/grave_grave.png');
  this.registerVoxelSprite('grave_knight', 'img/grave_knight.png');

  this.registerVoxelSprite('Peahat', 'img/sprites/Spinner.png');

  this.registerVoxelSprite('HurlerToughOdd', 'img/sprites/HurlerBlueEven.png');
  this.registerVoxelSprite('HurlerToughEven', 'img/sprites/HurlerBlueOdd.png');
  this.registerVoxelSprite('HurlerEven', 'img/sprites/HurlerRedEven.png');
  this.registerVoxelSprite('HurlerOdd', 'img/sprites/HurlerRedOdd.png');
  this.registerVoxelSprite('HurlerRock', 'img/HurlerRock.png');

  this.registerVoxelSprite('ArcherEven', 'img/OrcOrangeEven.png');
  this.registerVoxelSprite('ArcherOdd', 'img/OrcOrangeOdd.png');
  this.registerVoxelSprite('ArcherToughOdd', 'img/OrcBlueOdd.png');
  this.registerVoxelSprite('ArcherToughEven', 'img/OrcBlueEven.png');
  this.registerVoxelSprite('ArcherArrow', 'img/ArcherArrow.png');

  this.registerVoxelSprite('JumperUp', 'img/sprites/JumperBlueUp.png');
  this.registerVoxelSprite('JumperDown', 'img/sprites/JumperBlueDown.png');
  this.registerVoxelSprite('JumperToughUp', 'img/sprites/JumperOrangeUp.png');
  this.registerVoxelSprite('JumperToughDown', 'img/sprites/JumperOrangeDown.png');


  this.registerVoxelSprite('coin', 'img/coin.png');
  this.registerVoxelSprite('heart', 'img/heart.png');

  this.registerVoxelSprite('death0', 'img/death0.png');
  this.registerVoxelSprite('death1', 'img/death1.png');
  this.registerVoxelSprite('death2', 'img/death2.png');
  this.registerVoxelSprite('death3', 'img/death3.png');


  this.registerVoxelSprite('-', 'img/chars/char-.png');
  this.registerVoxelSprite(',', 'img/chars/char,.png');
  this.registerVoxelSprite('!', 'img/chars/char!.png');
  this.registerVoxelSprite('.', 'img/chars/char..png');
  this.registerVoxelSprite('tick', 'img/chars/chartick.png');
  this.registerVoxelSprite('&', 'img/chars/char&.png');
  this.registerVoxelSprite('question', 'img/chars/charquestion.png');
  this.registerVoxelSprite('0', 'img/chars/char0.png');
  this.registerVoxelSprite('1', 'img/chars/char1.png');
  this.registerVoxelSprite('2', 'img/chars/char2.png');
  this.registerVoxelSprite('3', 'img/chars/char3.png');
  this.registerVoxelSprite('4', 'img/chars/char4.png');
  this.registerVoxelSprite('5', 'img/chars/char5.png');
  this.registerVoxelSprite('6', 'img/chars/char6.png');
  this.registerVoxelSprite('7', 'img/chars/char7.png');
  this.registerVoxelSprite('8', 'img/chars/char8.png');
  this.registerVoxelSprite('9', 'img/chars/char9.png');
  this.registerVoxelSprite('A', 'img/chars/charA.png');
  this.registerVoxelSprite('B', 'img/chars/charB.png');
  this.registerVoxelSprite('C', 'img/chars/charC.png');
  this.registerVoxelSprite('D', 'img/chars/charD.png');
  this.registerVoxelSprite('E', 'img/chars/charE.png');
  this.registerVoxelSprite('F', 'img/chars/charF.png');
  this.registerVoxelSprite('G', 'img/chars/charG.png');
  this.registerVoxelSprite('H', 'img/chars/charH.png');
  this.registerVoxelSprite('I', 'img/chars/charI.png');
  this.registerVoxelSprite('J', 'img/chars/charJ.png');
  this.registerVoxelSprite('K', 'img/chars/charK.png');
  this.registerVoxelSprite('L', 'img/chars/charL.png');
  this.registerVoxelSprite('M', 'img/chars/charM.png');
  this.registerVoxelSprite('N', 'img/chars/charN.png');
  this.registerVoxelSprite('O', 'img/chars/charO.png');
  this.registerVoxelSprite('P', 'img/chars/charP.png');
  this.registerVoxelSprite('Q', 'img/chars/charQ.png');
  this.registerVoxelSprite('R', 'img/chars/charR.png');
  this.registerVoxelSprite('S', 'img/chars/charS.png');
  this.registerVoxelSprite('T', 'img/chars/charT.png');
  this.registerVoxelSprite('U', 'img/chars/charU.png');
  this.registerVoxelSprite('V', 'img/chars/charV.png');
  this.registerVoxelSprite('W', 'img/chars/charW.png');
  this.registerVoxelSprite('X', 'img/chars/charX.png');
  this.registerVoxelSprite('Y', 'img/chars/charY.png');
  this.registerVoxelSprite('Z', 'img/chars/charZ.png');

	this.registerVoxelSprite('aquamentusbottomleft', 'img/sprites2/aquamentusbottomleft.png');
	this.registerVoxelSprite('aquamentusbottomleft2', 'img/sprites2/aquamentusbottomleft2.png');
	this.registerVoxelSprite('aquamentusbottomright', 'img/sprites2/aquamentusbottomright.png');
	this.registerVoxelSprite('aquamentusbottomright2', 'img/sprites2/aquamentusbottomright2.png');
	this.registerVoxelSprite('aquamentustopleft', 'img/sprites2/aquamentustopleft.png');
	this.registerVoxelSprite('aquamentustopleft2', 'img/sprites2/aquamentustopleft2.png');
	this.registerVoxelSprite('aquamentustopright', 'img/sprites2/aquamentustopright.png');
	this.registerVoxelSprite('fire', 'img/sprites2/fire2.png');
	this.registerVoxelSprite('gel1', 'img/sprites2/gel1.png');
	this.registerVoxelSprite('gel2', 'img/sprites2/gel2.png');
	
	this.registerVoxelSprite('keese1', 'img/sprites2/keese1.png');
	this.registerVoxelSprite('keese2', 'img/sprites2/keese2.png');
	this.registerVoxelSprite('medicinewoman', 'img/sprites2/medicinewoman.png');
	this.registerVoxelSprite('merchant', 'img/sprites2/merchant.png');
	this.registerVoxelSprite('octoroc1', 'img/sprites2/octoroc1.png');
	this.registerVoxelSprite('octoroc2', 'img/sprites2/octoroc2.png');
	this.registerVoxelSprite('oldman1', 'img/sprites2/oldman1.png');
	this.registerVoxelSprite('oldman2', 'img/sprites2/oldman2.png');
	this.registerVoxelSprite('stalfos', 'img/sprites2/stalfos.png');
	this.registerVoxelSprite('stalfos2', 'img/sprites2/stalfos2.png');
	this.registerVoxelSprite('statue1', 'img/sprites2/statue1.png');
	this.registerVoxelSprite('statue2', 'img/sprites2/statue2.png');
	this.registerVoxelSprite('wallmaster1', 'img/sprites2/wallmaster1.png');
	this.registerVoxelSprite('wallmaster2', 'img/sprites2/wallmaster2.png');
	this.registerVoxelSprite('caverock', 'img/sprites2/caverock.png');
	this.registerVoxelSprite('block', 'img/sprites2/block.png');
	this.registerVoxelSprite('block_blue', 'img/sprites2/block_blue.png');
	this.registerVoxelSprite('block_green', 'img/sprites2/block_green.png');
	this.registerVoxelSprite('block_tan', 'img/sprites2/block_tan.png');
	this.registerVoxelSprite('block_lime', 'img/sprites2/block_lime.png');
	this.registerVoxelSprite('block_gray', 'img/sprites2/block_gray.png');
	
	this.registerVoxelSprite('key', 'img/sprites2/key.png');
	this.registerVoxelSprite('bomb', 'img/sprites2/bomb.png');
	this.registerVoxelSprite('bombhole', 'img/sprites2/bombhole.png');
	this.registerVoxelSprite('triforcepiece', 'img/sprites2/triforcepiece.png');
	this.registerVoxelSprite('cloud', 'img/sprites2/cloud.png');
	this.registerVoxelSprite('cloud2', 'img/sprites2/cloud2.png');
	this.registerVoxelSprite('compass', 'img/sprites2/compass.png');

	this.registerVoxelSprite('title-rock', 'img/title/title-rock.png');
	this.registerVoxelSprite('title-rock-solid', 'img/title/title-rock-solid.png');
	this.registerVoxelSprite('title-rocktop', 'img/title/title-rocktop.png');
	this.registerVoxelSprite('title-water', 'img/title/title-water.png');
	this.registerVoxelSprite('title-mist', 'img/title/title-mist.png');

	this.registerVoxelSprite('gel1', 'img/sprites2/gel1.png');
	this.registerVoxelSprite('gel2', 'img/sprites2/gel2.png');
  this.registerVoxelSprite('map', 'img/sprites2/map.png');
  this.registerVoxelSprite('goriya', 'img/sprites2/goriya.png');
  this.registerVoxelSprite('goriya2', 'img/sprites2/goriya2.png');
  this.registerVoxelSprite('goriya_blue', 'img/sprites2/goriya_blue.png');
  this.registerVoxelSprite('goriya2_blue', 'img/sprites2/goriya2_blue.png');
  
  this.registerVoxelSprite('blank', 'img/sprites2/blank.png');	
  this.registerVoxelSprite('trap', 'img/sprites2/trap.png');
	this.registerVoxelSprite('whitebrick', 'img/sprites2/whitebrick.png');
  this.registerVoxelSprite('bow', 'img/sprites2/bow.png');
  this.registerVoxelSprite('boomerang', 'img/sprites2/boomerang.png');
  this.registerVoxelSprite('boomerang_blue', 'img/sprites2/boomerang_blue.png');
  this.registerVoxelSprite('boomerangflat', 'img/sprites2/boomerangflat.png');
  this.registerVoxelSprite('boomerangflat_blue', 'img/sprites2/boomerangflat_blue.png');
  this.registerVoxelSprite('heartcontainer', 'img/sprites2/heartcontainer.png');
  this.registerVoxelSprite('fireball', 'img/sprites2/fireball.png');
  this.registerVoxelSprite('leever1', 'img/sprites2/leever1.png');
  this.registerVoxelSprite('leever2', 'img/sprites2/leever2.png');
  this.registerVoxelSprite('leever3', 'img/sprites2/leever3.png');
  this.registerVoxelSprite('leever4', 'img/sprites2/leever4.png');
  this.registerVoxelSprite('zola', 'img/sprites2/zola.png');

  this.registerVoxelSprite('leever1', 'img/sprites2/leever1.png');
  this.registerVoxelSprite('leever2', 'img/sprites2/leever2.png');
  this.registerVoxelSprite('leever3', 'img/sprites2/leever3.png');
  this.registerVoxelSprite('leever4', 'img/sprites2/leever4.png');
	this.registerVoxelSprite('leever5', 'img/sprites2/leever5.png');

  this.registerVoxelSprite('leeverblue1', 'img/sprites2/leeverblue1.png');
  this.registerVoxelSprite('leeverblue2', 'img/sprites2/leeverblue2.png');
  this.registerVoxelSprite('leeverblue3', 'img/sprites2/leeverblue3.png');
  this.registerVoxelSprite('leeverblue4', 'img/sprites2/leeverblue4.png');
	this.registerVoxelSprite('leeverblue5', 'img/sprites2/leeverblue5.png');
	this.registerVoxelSprite('whitesword', 'img/sprites2/whitesword.png');
	this.registerVoxelSprite('swordshard-tl', 'img/sprites2/swordshard-tl.png');
	this.registerVoxelSprite('swordshard-tr', 'img/sprites2/swordshard-tr.png');
	this.registerVoxelSprite('swordshard-bl', 'img/sprites2/swordshard-bl.png');
	this.registerVoxelSprite('swordshard-br', 'img/sprites2/swordshard-br.png');
	this.registerVoxelSprite('heartblue', 'img/sprites2/heartblue.png');
	this.registerVoxelSprite('coinblue', 'img/sprites2/coinblue.png');
	
	
	this.registerVoxelSprite('forest_pillar_tl', 'img/sprites3/forest_pillar_tl.png');
	this.registerVoxelSprite('forest_pillar_bl', 'img/sprites3/forest_pillar_bl.png');
	this.registerVoxelSprite('forest_pillar_tr', 'img/sprites3/forest_pillar_tr.png');
	this.registerVoxelSprite('forest_pillar_br', 'img/sprites3/forest_pillar_br.png');
	this.registerVoxelSprite('forest_totem_t', 'img/sprites3/forest_totem_t.png');
	this.registerVoxelSprite('forest_totem_b', 'img/sprites3/forest_totem_b.png');

	this.registerVoxelSprite('ow_pillar_tl', 'img/sprites3/ow_pillar_tl.png');
	this.registerVoxelSprite('ow_pillar_bl', 'img/sprites3/ow_pillar_bl.png');
	this.registerVoxelSprite('ow_pillar_tr', 'img/sprites3/ow_pillar_tr.png');
	this.registerVoxelSprite('ow_pillar_br', 'img/sprites3/ow_pillar_br.png');
	this.registerVoxelSprite('ow_totem_t', 'img/sprites3/ow_totem_t.png');
	this.registerVoxelSprite('ow_totem_b', 'img/sprites3/ow_totem_b.png');

	this.registerVoxelSprite('grave_pillar_tl', 'img/sprites3/grave_pillar_tl.png');
	this.registerVoxelSprite('grave_pillar_bl', 'img/sprites3/grave_pillar_bl.png');
	this.registerVoxelSprite('grave_pillar_tr', 'img/sprites3/grave_pillar_tr.png');
	this.registerVoxelSprite('grave_pillar_br', 'img/sprites3/grave_pillar_br.png');
	this.registerVoxelSprite('grave_totem_t', 'img/sprites3/grave_totem_t.png');
	this.registerVoxelSprite('grave_totem_b', 'img/sprites3/grave_totem_b.png');
	
	this.registerVoxelSprite('rope1', 'img/sprites3/rope1.png');
	this.registerVoxelSprite('rope2', 'img/sprites3/rope2.png');

	this.registerVoxelSprite('statue_leftred', 'img/sprites2/statue_leftred.png');
	this.registerVoxelSprite('statue_rightred', 'img/sprites2/statue_rightred.png');
	this.registerVoxelSprite('statue_leftblue', 'img/sprites2/statue_leftblue.png');
	this.registerVoxelSprite('statue_rightblue', 'img/sprites2/statue_rightblue.png');
	this.registerVoxelSprite('statue_leftgreen', 'img/sprites2/statue_leftgreen.png');
	this.registerVoxelSprite('statue_rightgreen', 'img/sprites2/statue_rightgreen.png');
	this.registerVoxelSprite('statue_leftgray', 'img/sprites2/statue_leftgray.png');
	this.registerVoxelSprite('statue_rightgray', 'img/sprites2/statue_rightgray.png');
	this.registerVoxelSprite('statue_leftcyan', 'img/sprites2/statue_leftcyan.png');
	this.registerVoxelSprite('statue_rightcyan', 'img/sprites2/statue_rightcyan.png');
	
  this.registerVoxelSprite('zora', 'img/sprites3/zora.png');
  this.registerVoxelSprite('bubbles', 'img/sprites3/bubbles.png');

  this.registerVoxelSprite('dodongofront', 'img/sprites3/dodongofront.png');
  this.registerVoxelSprite('dodongofront2', 'img/sprites3/dodongofront2.png');
  this.registerVoxelSprite('dodongorear', 'img/sprites3/dodongorear.png');
  this.registerVoxelSprite('dodongorear2', 'img/sprites3/dodongorear2.png');
  
  this.registerVoxelSprite('zol1', 'img/sprites3/zol1.png');
  this.registerVoxelSprite('zol2', 'img/sprites3/zol2.png');
  

  this.registerVoxelSprite('dodongo_closed_head', 'img/sprites4/dodongo_closed_head.png');
  this.registerVoxelSprite('dodongo_closed_tail', 'img/sprites4/dodongo_closed_tail.png');
  this.registerVoxelSprite('dodongo_explode_head', 'img/sprites4/dodongo_explode_head.png');
  this.registerVoxelSprite('dodongo_explode_tail', 'img/sprites4/dodongo_explode_tail.png');
  this.registerVoxelSprite('dodongo_open_head', 'img/sprites4/dodongo_open_head.png');
  this.registerVoxelSprite('dodongo_open_tail', 'img/sprites4/dodongo_open_tail.png');


  this.registerVoxelSprite('darknut1', 'img/sprites4/darknut1.png');
  this.registerVoxelSprite('darknut2', 'img/sprites4/darknut2.png');
  this.registerVoxelSprite('raft', 'img/sprites3/raft.png');
  this.registerVoxelSprite('bubble-red', 'img/sprites4/bubble-red.png');
  this.registerVoxelSprite('bubble-blue', 'img/sprites4/bubble-blue.png');
	
  this.registerVoxelSprite('ghost', 'img/sprites4/ghini.png');
  this.registerVoxelSprite('manhandla_center', 'img/sprites4/manhandla_center.png');
  this.registerVoxelSprite('manhandla_open', 'img/sprites4/manhandla_open.png');
  this.registerVoxelSprite('manhandla_closed', 'img/sprites4/manhandla_closed.png');

  this.registerVoxelSprite('ChargerEven', 'img/sprites4/lynel1.png');
  this.registerVoxelSprite('ChargerOdd', 'img/sprites4/lynel2.png');
  this.registerVoxelSprite('ChargerToughEven', 'img/sprites4/lynelblue1.png');
  this.registerVoxelSprite('ChargerToughOdd', 'img/sprites4/lynelblue2.png');
  this.registerVoxelSprite('fairy', 'img/sprites4/fairy.png');
  this.registerVoxelSprite('fairy2', 'img/sprites4/fairy2.png');
  this.registerVoxelSprite('sand', 'img/sprites4/sand.png');
  this.registerVoxelSprite('sand25', 'img/sprites4/sand25.png');
  this.registerVoxelSprite('sand50', 'img/sprites4/sand50.png');
  this.registerVoxelSprite('sand75', 'img/sprites4/sand75.png');
  this.registerVoxelSprite('water', 'img/sprites4/water.png');
  this.registerVoxelSprite('whistle', 'img/sprites4/whistle.png');
  this.registerVoxelSprite('stairs', 'img/sprites4/stairs.png');

	// Title screen sprites.
  for (var c = 0; c < 12; c++) {
		for (var r = 0; r < 6; r++) {
		  this.registerVoxelSprite('title' + c + '-' + r,
		      'img/title/title' + c + '-' + r + '.png');
		}
	}
  this.loadOverWorldTexture_();
  this.updateLightMap_();

};



/**
 * Handles the screen resizing.
 * @param {object} viewport An object with a w and h member.
 */
ace.EngineVoxel.prototype.onResize = function(viewport, wScale, hScale, topPadding) {
  this.wScale = wScale;
  this.hScale = hScale;
  var w = Math.floor(viewport.w * wScale);
  var h = Math.floor(viewport.h * hScale);
  this.width = w;
  this.height = h;

  var yFromStart = 3820 + game.cameraEye_[1];
  var letterBoxAmount = 1 - Math.min(1, (yFromStart / (topPadding * 2)));
  
  this.canvas.style.top = topPadding - ((topPadding/2) * letterBoxAmount) + 'px';
  $('hud-panel').style.top = this.canvas.style.top;
	
	this.canvas.width = w;
	this.canvas.height = h;
	this.canvas.style.width = Math.floor(w / wScale) + 'px';
	this.canvas.style.height = Math.floor(h / hScale) + 'px';
	
  
  if (this.gl) {
  	this.gl.viewport(0, 0, this.width, this.height);
  }
};


/**
 * Sets up one of our vertex attribute sub-items.
 * @param {string} name The name of the variable in the shader.
 * @param {number} size The size of the attribute. For example, a vec3 would be
 *     3, a mat4 would be 16.
 * @param {number} type Like gl.FLOAT or gl.UNSIGNED_SHORT 
 * @private
 */
ace.EngineVoxel.prototype.setUpAttribute_ = function(gl, program, name, size, type) {
  program.attributeSetUpStartIndex_ = program.attributeSetUpStartIndex_ || 0;

  var bytesPerItem = 4;
  var byteStride = this.vertexStride_ * bytesPerItem;

  var loc = gl.getAttribLocation(program, name);
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, size, type, false, byteStride, program.attributeSetUpStartIndex_);

  program.attributeSetUpStartIndex_ += size * bytesPerItem;
};


/**
 * Goes into fullScreen.
 * @param {event} e The event.
 */
ace.EngineVoxel.prototype.goFullScreen = function(opt_div) {
  var el = opt_div || this.div;

  var rfs = el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen;
  rfs.call(el);
};


/**
 * Handles full screen.
 * @param {event} e The event.
 */
ace.EngineVoxel.prototype.onFullScreenChanged = function(e) {

  var scale = 1; 
  
  // TODO(scott): This line make the scale to full the screen. Might want it.
  // var scale = screen.height / (this.height * this.scale);
  if (document.webkitIsFullScreen || document.fullScreen ||
      document.mozFullScreen) {
    this.div.style.webkitTransform = 'scale(' + scale + ')';
    this.div.style.transform = 'scale(' + scale + ')';
  } else {
    this.div.style.webkitTransform = 'scale(1)';
    this.div.style.transform = 'scale(1)';
  }
};


/**
 * Does the math to build a SketchUp-friendly MVP matrix. For now it relies on
 * the gl-matrix.js library.
 * @private
 */
ace.EngineVoxel.prototype.buildMVP_ = function(eye, target, up, opt_fovDegrees) {
  var fovDegrees =  opt_fovDegrees || 45;
  var fovy = Math.tan(fovDegrees * Math.PI / 360);
  var aspect = (this.width / this.wScale) / (this.height / this.hScale);
  var near = 50;
  var far = 4000;

  // First build the view matrix.
  var v = mat4.create();
  mat4.lookAt(v, eye, target, up);

  // Then the projection matrix.
  var p = mat4.create();
  mat4.perspective(p, fovy, aspect, near, far);

  // We assume the model matrix is always identity, so we can skip that multiply.
  var mvp = mat4.create();
  mat4.multiply(mvp, p, v);

  return mvp;
}


/**
 * Loads a voxel sprite into our texture canvas and registers it by name.
 * @param {string} name The friendly name of the sprite to register.
 * @param {string} path The load path for the png with the voxel data.
 */
ace.EngineVoxel.prototype.registerVoxelSprite = function(name, path) {
  var img = new Image();
  var id = this.voxelSpriteCount_;
  img.spriteId = id;
  this.voxelSpriteIdsByName_[name] = id;
  this.voxelSpriteCount_++;
  
  img.onload = ace.bind(function() {
    var id = img.spriteId;

    var drawPos = this.getVoxelSpriteCanvasPosition_(id);

    // The voxel sprite pngs come off the server without padding between
    // the frames. Add that here.
    var paddedWidth = this.voxelSpriteSize_ + this.voxelSpritePadding_;
    for (var i = 0; i < this.voxelSpriteSize_; i++) {
      var xWithPad = paddedWidth * i;
      var innerX = i * this.voxelSpriteSize_;
      this.ctx.drawImage(img,
          innerX, 0,
          this.voxelSpriteSize_, this.voxelSpriteSize_,
          drawPos.x + xWithPad, drawPos.y,
          this.voxelSpriteSize_, this.voxelSpriteSize_
          );
    }

  }, this);
  img.src = path;
};


/**
 * Returns whether a given sprite name has been registered.
 * @param {string} name The friendly name of the sprite to check.
 * @return {boolean} Whether it exists.
 */
ace.EngineVoxel.prototype.spriteHasBeenRegistered = function(name) {
  if (this.voxelSpriteIdsByName_[name]) {
    return true;
  }
  return false;
};


/**
 * Loads a voxel sprite into our texture canvas and registers it by name.
 * @param {string} name The friendly name of the sprite to register.
 * @param {string} path The load path for the png with the voxel data.
 */
ace.EngineVoxel.prototype.loadOverWorldTexture_ = function() {
  var img = new Image();
  img.onload = ace.bind(function() {
    this.ctx.drawImage(img, 0,
        this.voxelSpriteCanvasHeight_ - this.overWorldNativeHeight_,
        this.overWorldNativeWidth_, this.overWorldNativeHeight_);
    gl.activeTexture(gl.TEXTURE0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        this.spriteCanvas_);
    //gl.generateMipmap(gl.TEXTURE_2D);

    // Show the canvas.
    this.dungeonCtx_.drawImage($('level1'), 0, 2048-1408);
    this.updateDungeonTexture_();
    this.canvas.display = 'block';
    $('game-container').style.backgroundImage = 'none';
    if (top.onGraphicsLoaded) {
      top.onGraphicsLoaded();
    }
  }, this);
  img.src = 'img/overworld_with_shadow_map15.png';
};


/**
 * Updates the light map texture for use in the shader.
 */
ace.EngineVoxel.prototype.updateLightMap_ = function() {
  gl.activeTexture(gl.TEXTURE1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
      this.lightMapCanvas_);
  gl.activeTexture(gl.TEXTURE0);
};

/**
 * Updates the dungeon map texture for use in the shader.
 */
ace.EngineVoxel.prototype.updateDungeonTexture_ = function() {
  gl.activeTexture(gl.TEXTURE2);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
      this.dungeonCanvas_);
  gl.activeTexture(gl.TEXTURE0);
};

/**
 * For a given voxelSpriteId, returns the {x, y} inside the sprite canvas of
 * the upper-left coordinate for that sprite.
 * @param {number} voxelSpriteId The index of the sprite you want.
 * @private
 */
ace.EngineVoxel.prototype.getVoxelSpriteCanvasPosition_ = function(voxelSpriteId) {
  var h = this.voxelSpriteSize_ + this.voxelSpritePadding_;
  var w = h * h;
  var imagesPerRow = Math.floor(this.voxelSpriteCanvasWidth_ / w);
  var gridY = Math.floor(voxelSpriteId / imagesPerRow);
  var gridX = voxelSpriteId - (gridY * imagesPerRow);
  return {x: gridX * w, y: gridY * h + 1};
};


/**
 * Draws a voxel sprite.
 * @param {string} name The friendly name of the sprite to draw.
 * @param {Array} offset The xyz position to draw at.
 * @param {number} opt_rotZ The rotation about Z, in radians.
 * @param {number=} opt_shells Optional number of shells to draw. A value of 1,
 *     for example, only draws the outermost faces of the sprite array.
 */
ace.EngineVoxel.prototype.drawSingleSprite = function(name, offset, rotZ,
    opt_shells, opt_rotX, opt_rotX2, opt_renderNegativeColor) {
  mat4.identity(this.uOffsetTransform_);
  mat4.translate(this.uOffsetTransform_, this.uOffsetTransform_, offset);
  if (opt_rotX) {
    mat4.rotateX(this.uOffsetTransform_, this.uOffsetTransform_, opt_rotX);
  }
  if (rotZ) {
    mat4.rotateZ(this.uOffsetTransform_, this.uOffsetTransform_, rotZ);
  }
  if (opt_rotX2) {
    mat4.rotateX(this.uOffsetTransform_, this.uOffsetTransform_, opt_rotX2);
  }
  mat4.translate(this.uOffsetTransform_, this.uOffsetTransform_, [-8, -8, 0]);
  if (this.voxelSpriteIdsByName_[name] === undefined) {
    console.log('No sprite found named: ' + name);
  }
  gl.uniformMatrix4fv(this.uOffsetLoc, false, this.uOffsetTransform_);
  gl.uniform1f(this.uSpriteIdLoc, this.voxelSpriteIdsByName_[name]);
  if (opt_renderNegativeColor) {
    gl.uniform1f(this.uRenderNegativeColorLoc, 1);
  }
  var shells = opt_shells || (this.voxelSpriteSize_ + 1);
  var verticesPerShell = 6;
  var numberOfDimensions = 3;
  var baseIndex = ace.overWorldBufferData_.length / this.vertexStride_;
  gl.drawArrays(gl.TRIANGLES, baseIndex, shells * verticesPerShell * numberOfDimensions);
  
  if (opt_renderNegativeColor) {
    gl.uniform1f(this.uRenderNegativeColorLoc, 0);
  }
};



/**
 * Sets the camera.
 * @param {Array.<number>} eye The eye position.
 * @param {Array.<number>} target The target position.
 * @private
 */
ace.EngineVoxel.prototype.setCamera = function(eye, target, fovDegrees) {
  this.cameraTarget_ = target;
  this.cameraEye_ = eye;
  this.cameraDistance_ = vec3.distance(eye, target);

  var up = [0, 0, 1];
  var eye = [0, 0, 0];
  
  eye[0] = this.cameraTarget_[0] + Math.sin(this.cameraRotZ_) *
      this.cameraDistance_ * Math.sin(this.cameraRotX_);
  eye[1] = this.cameraTarget_[1] + Math.cos(this.cameraRotZ_) *
      this.cameraDistance_ * Math.sin(this.cameraRotX_);
  eye[2] = this.cameraTarget_[2] + Math.cos(this.cameraRotX_) *
      this.cameraDistance_;

  var mvp = this.buildMVP_(this.cameraEye_, this.cameraTarget_, up, fovDegrees);

  gl.uniformMatrix4fv(this.uMVPLoc, false, mvp);
};


/**
 * Draws an entire room.
 * @param {string} name The friendly name of the room to draw.
 * @param {Array} offset The xyz position to draw at.
 */
ace.EngineVoxel.prototype.drawRoom = function(name, offset) {
  gl.uniform3fv(this.uOffsetLoc, offset);
  gl.uniform1f(this.uSpriteIdLoc, this.voxelSpriteIdsByName_[name]);
  gl.drawArrays(gl.TRIANGLES, this.singleVoxelSpriteVertexCount_, this.roomVertexCount_);
};

/**
 * Populates an onion-skin shell of a given size.
 * @param {number} sx The size along x, in voxels.
 * @param {number} sy The size along y, in voxels.
 * @param {number} sx The size along z, in voxels.
 * @return {number} How many vertices were built.
 */
ace.EngineVoxel.prototype.populateOnionSkin_ = function(sx, sy, sz) {
  
  var verticesBuilt = 0;
  /**
   * A list of positions going from out to in.
   */
  var positionList = [0, 16, 2, 14, 4, 12, 6, 10, 8, 1, 15, 9, 3, 13, 5, 11, 7];

  var X_DIRECTION = 1;
  var Y_DIRECTION = 2;
  var Z_DIRECTION = 0;

  var layerCount = Math.max(sx, sy, sz) + 1;


  for (var a = 0; a < layerCount * 3; a++) {
    
    /* TODO(scott): wow, turning on fewer layers of voxelness really speeds
       things up. Consider this for terrain and rooms.
    var innerA = a % layerCount;
    if (innerA > 2 && innerA < 15) {
      continue;
    }
    */
    var direction = a % 3;
    var innerPositionIndex = Math.floor(a / 3);
    
    // TODO(scott): Put this back in.
    var innerPosition = positionList[innerPositionIndex];

    if (direction == Z_DIRECTION) {

      // Though we visualize this thing as a big cube, if any dimension is
      // smaller, don't draw more z faces than we need to.
      if (innerPositionIndex > sz + 1) {
        continue;
      }

      var x1 = 0;
      var x2 = sx;
      var y1 = 0;
      var y2 = sy;
      var z1 = innerPosition;
      var z2 = innerPosition;
      var z3 = 0;

      var nx = 0;
      var ny = 0;
      var nz = 1;
    } else if (direction == X_DIRECTION) {

      // Don't draw more x faces than we need to.
      if (innerPositionIndex > sx + 1) {
        continue;
      }

      var x1 = innerPosition;
      var x2 = innerPosition;
      var y1 = sy;
      var y2 = 0;
      var z1 = 0;
      var z2 = sz;
      var z3 = 0;

      var nx = 1;
      var ny = 0;
      var nz = 0;
    } else {

      // Don't draw more y faces than we need to.
      if (innerPositionIndex > sy + 1) {
        continue;
      }

      var x1 = 0;
      var x2 = sx;
      var y1 = innerPosition;
      var y2 = innerPosition;
      var z1 = 0;
      var z2 = 0;
      var z3 = sz;

      var nx = 0;
      var ny = -1;
      var nz = 0;
    }
    var i = ace.overWorldBufferData_.length + this.numVertices_ * this.vertexStride_;

    this.vertices_[i++] = x1;
    this.vertices_[i++] = y1;
    this.vertices_[i++] = z1;
    this.vertices_[i++] = nx;
    this.vertices_[i++] = ny;
    this.vertices_[i++] = nz;

    this.vertices_[i++] = x2;
    this.vertices_[i++] = y1;
    this.vertices_[i++] = z2;
    this.vertices_[i++] = nx;
    this.vertices_[i++] = ny;
    this.vertices_[i++] = nz;

    this.vertices_[i++] = x1;
    this.vertices_[i++] = y2;
    this.vertices_[i++] = z1 + z3;
    this.vertices_[i++] = nx;
    this.vertices_[i++] = ny;
    this.vertices_[i++] = nz;


    this.vertices_[i++] = x2;
    this.vertices_[i++] = y1;
    this.vertices_[i++] = z2;
    this.vertices_[i++] = nx;
    this.vertices_[i++] = ny;
    this.vertices_[i++] = nz;


    this.vertices_[i++] = x2;
    this.vertices_[i++] = y2;
    this.vertices_[i++] = z2 + z3;
    this.vertices_[i++] = nx;
    this.vertices_[i++] = ny;
    this.vertices_[i++] = nz;


    this.vertices_[i++] = x1;
    this.vertices_[i++] = y2;
    this.vertices_[i++] = z1 + z3;
    this.vertices_[i++] = nx;
    this.vertices_[i++] = ny;
    this.vertices_[i++] = nz;


    this.numVertices_ += 6;
    verticesBuilt += 6;
  }

  return verticesBuilt;
};


/**
 * Shows the pick canvas.
 * @param {string} name The friendly name of the room to draw.
 * @param {Array} offset The xyz position to draw at.
 */
ace.EngineVoxel.prototype.showPickCanvas = function() {
  this.pickDebugCanvas_.style.display = 'block';
  this.pickDebugCanvas_.style.position = 'fixed';
  this.pickDebugCanvas_.style.top = '10px';
  this.pickDebugCanvas_.style.left = '10px';
  this.pickDebugCanvas_.style.width = '20px';
  this.pickDebugCanvas_.style.left = '20px';
  this.pickDebugCanvas_.style.zIndex = 9000; 
  this.pickDebugCanvas_.style.border = '1px solid red'; 
};


/**
 * Make a GL program with all the right vertex bindings, etc.
 * @param {string} vs The vertex shader source.
 * @param {string} fs The fragment shader source.
 */
ace.EngineVoxel.prototype.makeProgram = function(gl, vs, fs) {
  
  var program = gl.createProgram();

  var shader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(shader, vs);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }
  gl.attachShader(program, shader);

  var shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(shader, fs);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }
  gl.attachShader(program, shader);



  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw gl.getProgramInfoLog(program);
  }

  gl.useProgram(program);


  // Sprite Texture -----------------------------------------------------------
  this.uSpriteSamplerLoc = gl.getUniformLocation(program, "uSpriteSampler");
  var texture = gl.createTexture();
  this.spriteTexture_ = texture;
  gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.spriteCanvas_);
    // This makes a nearest pixel match. Sharper but blockier.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    // Here's a mipmap for far, nearest for nearest.
    /*gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);*/

  gl.uniform1i(this.uSpriteSamplerLoc, 0);


  // Light Texture -----------------------------------------------------------
  this.uLightSamplerLoc = gl.getUniformLocation(program, "uLightSampler");
  var texture = gl.createTexture();
  this.lightTexture_ = texture;
  gl.activeTexture(gl.TEXTURE1);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.lightMapCanvas_);
    // This makes a nearest pixel match. Sharper but blockier.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);


  gl.uniform1i(this.uLightSamplerLoc, 1);


  // Light Texture -----------------------------------------------------------
  this.uDungeonSamplerLoc = gl.getUniformLocation(program, "uDungeonSampler");
  var texture = gl.createTexture();
  this.dungeonTexture_ = texture;
  gl.activeTexture(gl.TEXTURE2);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.dungeonCanvas_);
    // This makes a nearest pixel match. Sharper but blockier.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

  gl.uniform1i(this.uDungeonSamplerLoc, 2);
  
  
  this.setUpAttribute_(gl, program, 'aPosition', 3, gl.FLOAT);
  this.setUpAttribute_(gl, program, 'aNormal', 3, gl.FLOAT);
  this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.disable(gl.BLEND);
  gl.disable(gl.CULL_FACE);

  this.uMVPLoc = gl.getUniformLocation(program, 'uMVP');
  this.uOffsetLoc = gl.getUniformLocation(program, 'uOffset');
  this.uSpriteIdLoc = gl.getUniformLocation(program, 'uSpriteId');
  this.uAvatarRoomOriginLoc = gl.getUniformLocation(program, 'uAvatarRoomOrigin');
  this.uRenderNegativeColorLoc = gl.getUniformLocation(program, 'uRenderNegativeColor');
  this.uLightDirectionLoc = gl.getUniformLocation(program, 'uLightDirection');

  gl.uniform3fv(this.uLightDirectionLoc, ace.OVERWORLD_LIGHT_DIRECTION);
  
  return program; 
};



/**
 * Prepares the pick buffer.
 * @param {WebGLRenderingContext} gl An initialized and current WebGL context.
 */
ace.EngineVoxel.prototype.preparePickBuffer_ = function() {
  // Create the Framebuffer.
  this.pickBuffer_ = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.pickBuffer_);
  var pickBufferSize = 50;
  this.pickBuffer_.width = pickBufferSize;
  this.pickBuffer_.height = pickBufferSize;

  this.pickData_ = new Uint8Array(this.pickBuffer_.width *
                                  this.pickBuffer_.height * 4);

  // Create a texture.
  // TODO(scottlininger): Eventually we may want to expose this so that other
  // shaders could use it as an input. (Having the depth map as a texture would
  // be useful for screen space ambient occlusion, for example.)
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.pickBuffer_.width,
      this.pickBuffer_.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  // Create the Renderbuffer.
  var renderbuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,
      this.pickBuffer_.width, this.pickBuffer_.height);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D,
      texture, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER, renderbuffer);

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  this.PICK_DEBUG_SCALE = 1;

  if (this.pickDebugCanvas_) {
    this.pickDebugCanvas_.width = this.pickBuffer_.width * this.PICK_DEBUG_SCALE;
    this.pickDebugCanvas_.height = this.pickBuffer_.height * this.PICK_DEBUG_SCALE;
  }
};


/**
 * Changes the dungeon texture.
 * @param {WebGLRenderingContext} gl An initialized and current WebGL context.
 */
ace.EngineVoxel.prototype.changeDungeonTexture = function(url, onReady) {
  var img = document.createElement('img');
  var self = this;
  var onLoad = function() {
    self.dungeonCtx_.drawImage(img, 0, 2048-1408);
    self.updateDungeonTexture_();
    onReady();
  }
  img.onload = onLoad;
  img.src = url;
};
