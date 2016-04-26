/**
 * @fileoverview  Provide the Game class. This is the top-level object that
 *    orchestrates everything else.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the game class, the thing that runs a game.
 * @param {ace.Game} game The game to run.
 * @param {HtmlElement} div The div to run in.
 * @param {Object=} opt_settings An optional hash with settings to adopt.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Game = function(divId, opt_settings) {
  var settings = settings || {};

  /**
   * The document.
   */
  this.document = settings['document'] || document;

  /**
   * The window.
   */
  this.window = settings['window'] || window;
  
  /**
   * Pointer to the Engine class.
   * @type {ace.EngineVoxel}
   */
  this.engine =  settings['engine'] || new ace.EngineVoxel(divId, opt_settings);

  /**
   * The div we're running in.
   * @type {HTMLElement}
   */
  this.div = this.document.getElementById(divId);
  
  /**
   * How many frames per second.
   * @type {number}
   */
  this.frameRate = settings.frameRate || 20;
  
  /**
   * Length of each frame in milliseconds.
   * @type {number}
   */
  this.frameLength = 1000 / this.frameRate;
  
  /**
   * A hash of booleans by keyCode
   * @type {Object}
   */
  this.keyIsDown_ = {};

  /**
   * A hash of booleans by keyCode. This will be reset to empty every frame.
   * @type {Object}
   */
  this.keyWasPressed_ = {};

  /**
   * Whether we're scrolling.
   */
  this.isScrolling = false;

  /**
   * The avatar.
   */
  this.avatar = new ace.Avatar(this);

  /**
   * A list of all of the active actors in this room.
   */
  this.actors = [this.avatar];


  /**
   * Pointers to our "Heads Up Display" canvas, where we'll
   * render the pause screen.
   */
  this.hudCanvas_ = $('hud-canvas');
  this.hudCtx_ = this.hudCanvas_.getContext('2d');
  

  /**
   * A hash of sounds by sound name.
   */
  this.sounds = {}
  this.loadSound('sword', 'sounds/sword.mp3');
  this.loadSound('boss1', 'sounds/boss1.mp3');
  this.loadSound('boss2', 'sounds/boss2.mp3');
  this.loadSound('swordshoot', 'sounds/swordshoot.mp3');
  this.loadSound('hit', 'sounds/hit.mp3');
  this.loadSound('coin', 'sounds/coin.mp3');
  this.loadSound('key', 'sounds/key.mp3');
  this.loadSound('text', 'sounds/text.mp3');
  this.loadSound('heart', 'sounds/heart.mp3');
  this.loadSound('hurt', 'sounds/hurt.mp3');
  this.loadSound('shield', 'sounds/shield.mp3');
  this.loadSound('secret', 'sounds/secret.mp3');
  this.loadSound('stairs', 'sounds/stairs.mp3');
  this.loadSound('item', 'sounds/item.mp3');
  this.loadSound('fanfare', 'sounds/fanfare.mp3');
  this.loadSound('unlock', 'sounds/unlock.mp3');
  this.loadSound('overworld', 'sounds/overworld.mp3');
  this.loadSound('intro', 'sounds/intro.mp3');
  this.loadSound('underworld', 'sounds/underworld.mp3');
  this.loadSound('triforce', 'sounds/triforce.mp3');
  this.loadSound('boomerang', 'sounds/boomerang.mp3');
  this.loadSound('bombdrop', 'sounds/bombdrop.mp3');
  this.loadSound('bomb', 'sounds/bomb.mp3');
  this.loadSound('flute', 'sounds/flute.mp3');
  this.loadSound('gameover', 'sounds/gameover.mp3');
  this.loadSound('health', 'sounds/health-loop.mp3');
  this.loadSound('flute', 'sounds/flute.mp3');
  
  this.playSound('overworld', {'loops': 9999999, volume:50});

  /**
   * We'll keep track of whether it's an "blink" frame, which will
   * come up once every few frames. This is helpful since @ 20fps, one
   * frame blinking animation is too fast.
   */
  this.isBlinkFrame = false;
  this.ticksPerLogicFrame = 3;
  this.ticksPerAnimationFrame = 3;

  this.idealFrameLength = 1000 / 20;
  this.lastTimeStamp = 0;


  /**
   * This seems to come in handy, so we'll maintain it here.
   */
  this.isEvenFrame = true;

  /**
   * We'll just keep a running frame count. Cuz it's cool. And to figure out
   * the isBlinkFrame.
   */
  this.tickCount = 0;

  /**
   * Eye and target arrays for the camera.
   */  
  this.cameraEye_ = vec3.fromValues(this.avatar.x - 2500, this.avatar.y - 1000, this.avatar.z + 19100);
  this.cameraTarget_ = vec3.fromValues(this.avatar.x, this.avatar.y + 2000, this.avatar.z);
  this.targetEye_ = vec3.fromValues(100, 0, 0);
  this.targetTarget_ = vec3.fromValues(this.avatar.x, this.avatar.y, this.avatar.z);
  this.cameraEyeDelta_ = vec3.fromValues(0, 0, 0);
  this.cameraTargetDelta_ = vec3.fromValues(0, 0, 0);

  /**
   * Game state.
   */
  this.currentDungeon_ = ace.dungeons['1'];
  this.currentRoom_ = this.getRoom(-1, -1, 0);

  // The current "save game" state, with everything important we've done.
  this.state = {inventory:{},
                coins: 0,
                bombs: 0,
                keys: 0,
                canvasScaleX: 1,
                canvasScaleY: 1,
                hasCompassByDungeon: {},
                hasMapByDungeon: {},
                hasVisitedRoomByDungeon: {},
                maxHitPoints: 3
                };
  
  // Attempt to load saved game from localStorage.
  if (window.localStorage && window.localStorage['zelda30tribute']) {
    var doLoad = confirm('I\'m going to load your saved game, okay?\n(cancel to start over)');
    if (doLoad) {
      this.state = JSON.parse(window.localStorage['zelda30tribute']);
    }
  }
  
  
  // How quickly the camera's eye and target positions track toward
  // their targets;
  this.cameraEyeSpeed = .2;
  this.cameraTargetSpeed = .4;
  this.showStartScreen();
  
  /**
   * Event handlers.
   */
  var boundOnKeyDown = ace.bind(this.onKeyDown, this);
  var boundOnKeyUp = ace.bind(this.onKeyUp, this);
  var boundOnResize = ace.bind(this.onResize, this);
  this.document.addEventListener('keydown', boundOnKeyDown);
  this.document.addEventListener('keyup', boundOnKeyUp);
  this.window.addEventListener('resize', boundOnResize);
  

  var boundOnTouchStart = ace.bind(this.onTouchStart_, this);
  var boundOnTouchMove = ace.bind(this.onTouchMove_, this);
  var boundOnTouchEnd = ace.bind(this.onTouchEnd_, this);
  var boundOnMouseDown = ace.bind(this.onMouseDown_, this);
  var boundOnMouseMove = ace.bind(this.onMouseMove_, this);
  var boundOnMouseUp = ace.bind(this.onMouseUp_, this);
  
  this.document.addEventListener('touchstart', boundOnTouchStart);
  this.document.addEventListener('touchmove', boundOnTouchMove);
  this.document.addEventListener('touchend', boundOnTouchEnd);
  this.document.addEventListener('mousedown', boundOnMouseDown);
  this.document.addEventListener('mousemove', boundOnMouseMove);
  this.document.addEventListener('mouseup', boundOnMouseUp);


  /**
   * Wire up the dPad
   */
  this.dPad = $('dpad');


  this.boundOnTick = ace.bind(this.onTick, this);
  requestAnimationFrame(this.boundOnTick);

  setTimeout(function() {
    game.refreshInfoPanel();
  }, 0);
};


/**
 * Contains the string "Game" for each instance of this class.
 * @type {string}
 */
ace.Game.prototype.typeName = 'Game';


/**
 * Handler for the onTouchStart event.
 * @param {event} e The event.
 * @private
 */
ace.Game.prototype.onTouchStart_ = function(e) {
  e.preventDefault();
  this.simulateKeyboardFromTouches_(e.targetTouches, true);  
};


/**
 * Handler for the onTouchEnd event.
 * @param {event} e The event.
 * @private
 */
ace.Game.prototype.onTouchEnd_ = function(e) {
  e.preventDefault();
  this.simulateKeyboardFromTouches_(e.targetTouches);  
};


/**
 * Handler for the onTouchMove event.
 * @param {event} e The event.
 * @private
 */
ace.Game.prototype.onTouchMove_ = function(e) {
  e.preventDefault();
  this.simulateKeyboardFromTouches_(e.targetTouches);
};


/**
 * Updates the dPad and A/B buttons, and fires the appropriate keyboard simulation.
 * @param {array} targetTouches An array of points where fingers are
 *     touching the screen.
 * @param {boolean} isTouchStart Will be true if this is a touch start event,
 *     which is when we'll simulate new button presses.
 * @private
 */
ace.Game.prototype.simulateKeyboardFromTouches_ = function(targetTouches, isTouchStart) {

  this.keyIsDown_[ace.KEY_LEFT] = false;
  this.keyIsDown_[ace.KEY_RIGHT] = false;
  this.keyIsDown_[ace.KEY_UP] = false;
  this.keyIsDown_[ace.KEY_DOWN] = false;
  this.keyIsDown_[ace.KEY_SPACE] = false; // B button
  this.keyIsDown_['x'] = false; // B button
  this.keyIsDown_['z'] = false; // A button
  this.keyIsDown_[ace.KEY_ENTER] = false; // start button
  
  for (var i =0; i < targetTouches.length; i++) {
    var x = targetTouches[i].clientX;
    var y = targetTouches[i].clientY;
    if (x > this.window.innerWidth - 250) {
      if (this.pointIsOverElement(x, y, $('button-a'))) {
        this.keyIsDown_['x'] = true;
        this.keyIsDown_[ace.KEY_SPACE] = true;
        if (isTouchStart) {
          this.keyWasPressed_['x'] = true;
          this.keyWasPressed_[ace.KEY_SPACE] = true; 
        }
        
      } else if (this.pointIsOverElement(x, y, $('button-b'))) {
        
        this.keyIsDown_['z'] = true;
        if (isTouchStart) {
          this.keyWasPressed_['z'] = true; 
        }
      } else if (this.pointIsOverElement(x, y, $('button-start'))) {
        this.keyIsDown_[ace.KEY_ENTER] = true;
        
        if (isTouchStart) {
          this.keyWasPressed_['button-start'] = true;
          this.pressStart();
        }
      }
    }

    if (x < 250) {
      if (this.pointIsOverElement(x, y, $('dpad-u'))) {
        this.keyIsDown_[ace.KEY_UP] = true;        
      } else if (this.pointIsOverElement(x, y, $('dpad-d'))) {
        this.keyIsDown_[ace.KEY_DOWN] = true;
      } else if (this.pointIsOverElement(x, y, $('dpad-l'))) {
        this.keyIsDown_[ace.KEY_LEFT] = true;
      } else if (this.pointIsOverElement(x, y, $('dpad-r'))) {
        this.keyIsDown_[ace.KEY_RIGHT] = true;
      } else if (this.pointIsOverElement(x, y, $('dpad-dr'))) {
        this.keyIsDown_[ace.KEY_RIGHT] = true;
        this.keyIsDown_[ace.KEY_DOWN] = true;
      } else if (this.pointIsOverElement(x, y, $('dpad-dl'))) {
        this.keyIsDown_[ace.KEY_LEFT] = true;
        this.keyIsDown_[ace.KEY_DOWN] = true;
      } else if (this.pointIsOverElement(x, y, $('dpad-ur'))) {
        this.keyIsDown_[ace.KEY_UP] = true;
        this.keyIsDown_[ace.KEY_RIGHT] = true;
      } else if (this.pointIsOverElement(x, y, $('dpad-ul'))) {
        this.keyIsDown_[ace.KEY_LEFT] = true;
        this.keyIsDown_[ace.KEY_UP] = true;
      } 
    }
    
    if (isTouchStart) {
      this.keyWasPressed_[ace.KEY_LEFT] = this.keyIsDown_[ace.KEY_LEFT]; 
      this.keyWasPressed_[ace.KEY_RIGHT] = this.keyIsDown_[ace.KEY_RIGHT]; 
      this.keyWasPressed_[ace.KEY_UP] = this.keyIsDown_[ace.KEY_UP]; 
      this.keyWasPressed_[ace.KEY_DOWN] = this.keyIsDown_[ace.KEY_DOWN]; 
    }
  }

  this.updateButtons_();
}
  
/**
 * Updates the dPad and A/B buttons based on keyboard state.
 * @private
 */
ace.Game.prototype.updateButtons_ = function() {

  if (this.keyIsDown_['z'] || this.keyIsDown_['k']) {
    $('button-b').className = 'pressed';
  } else {
    $('button-b').className = '';
  }
  
  if (this.keyIsDown_[ace.KEY_SPACE] || this.keyIsDown_['x'] || this.keyIsDown_['l']) {
    $('button-a').className = 'pressed';
  } else {
    $('button-a').className = '';
  }
  
  if (this.keyIsDown_[ace.KEY_ENTER]) {
    $('button-start').className = 'pressed';
  } else {
    $('button-start').className = '';
  }

  var dPadTransform = '';
  dPadTransform += (this.keyIsDown_[ace.KEY_DOWN] || this.keyIsDown_['s']) ? ' rotateX( -12deg ) ' : ''; 
  dPadTransform += (this.keyIsDown_[ace.KEY_UP] || this.keyIsDown_['w']) ? ' rotateX( 12deg ) ' : ''; 
  dPadTransform += (this.keyIsDown_[ace.KEY_LEFT] || this.keyIsDown_['a']) ? ' rotateY( -12deg ) ' : ''; 
  dPadTransform += (this.keyIsDown_[ace.KEY_RIGHT] || this.keyIsDown_['d']) ? ' rotateY( 12deg ) ' : ''; 

  this.dPad.style.transform = dPadTransform;
  this.dPad.style.webkitTransform = dPadTransform;
  this.dPad.style.oTransform = dPadTransform;
  this.dPad.style.mozTransform = dPadTransform;
};


/**
 * Handler for the onMouseDown event.
 * @param {event} e The event.
 * @private
 */
ace.Game.prototype.onMouseDown_ = function(e) {
  // Simulate a single touch.
  this.mouseIsDown = true;
  var touchEvent = {preventDefault: function() {},
                    targetTouches: [{clientX: e.clientX, 
                                     clientY: e.clientY}]};
  this.onTouchStart_(touchEvent);
};


/**
 * Handler for the onMouseUp event.
 * @param {event} e The event.
 * @private
 */
ace.Game.prototype.onMouseUp_ = function(e) {
  // Simulate an ending touch.
  this.mouseIsDown = false;
  var touchEvent = {preventDefault: function() {}, targetTouches: []};
  this.onTouchEnd_(touchEvent);
};


/**
 * Handler for the onMouseMove event.
 * @param {event} e The event.
 * @private
 */
ace.Game.prototype.onMouseMove_ = function(e) {
  // Simulate a single touch.
  if (this.mouseIsDown) {
    var touchEvent = {preventDefault: function() {},
                      targetTouches: [{clientX: e.clientX, 
                                       clientY: e.clientY}]};
    this.onTouchMove_(touchEvent);
  }
};



/**
 * Tests if a given window coordinate is "over" the bounding rectangle of
 * of an element.
 * @param {number} x The x position to test.
 * @param {number} y The y position to test.
 * @param {Element} el The div or whatever to test.
 */
ace.Game.prototype.pointIsOverElement = function(x, y, el) {
  var bounds = el.getBoundingClientRect();

  return (x >= bounds.left && x <= bounds.right &&
          y >= bounds.top && y <= bounds.bottom);
};


/**
 * Spawns all actors in a room.
 * @param {ace.Room} room The Room to build from.
 */
ace.Game.prototype.spawnRoomActors = function(room) {
  for (var i = 0; i < room.actors.length; i++) {
    var actor = room.actors[i];    
    
    if (actor.settings.hideIfInventory &&
        game.avatar.hasInventory(actor.settings.hideIfInventory)) {
      continue;
    }
    
    var z = this.getWorldZ(actor.x, actor.y);
    if (room.isInUnderworld) {
      z = -1008;
    }
    var spawnSettings = {x: actor.x, y: actor.y, z: z};
    var actorSettings = actor.settings || {};
    for (var key in actorSettings) {
      spawnSettings[key] = actorSettings[key];
    }
    var newActor = this.spawn(actor.type, spawnSettings);
    
    var roomName = this.getRoomUniqueName(room);
    this.state.isHiddenByActorCountNumber = this.state.isHiddenByActorCountNumber || {};
    
    if (newActor && this.state.isHiddenByActorCountNumber[roomName] &&
        this.state.isHiddenByActorCountNumber[roomName][newActor.actorCountNumber]) {
      newActor.hide();
      newActor.hitPoints = 0;
    }
    
  }
};


/**
 * Spawns a single actor.
 * @param {string} type The type (class name) of actor, like "Orc".
 * @param {Object=} opt_settings Optional settings hash.
 * @return {ace.Actor} The actor.
 */
ace.Game.prototype.spawn = function(type, opt_settings) {
  var settings = opt_settings || {};
  if (!ace[type]) {
    console.log('MISSING ACTOR TYPE: ' + type);
    return;
  }
  var newActor = new ace[type](this, null, settings);
  for (var key in settings) {
    newActor[key] = settings[key];
  }
  this.actors.push(newActor);
  newActor.spawn(this);
  return newActor;
}


/**
 * Disposes of all actors except the avatar.
 * @param {ace.Room} room The Room to build from.
 */
ace.Game.prototype.destroyOldActors = function() {
  // Start at 1 so we don't dispose the avatar. She's always first.
  while(this.actors.length > 1) {
    var actor = this.actors.pop();
    actor.dispose();
  }
};


/**
 * Stops the game from goin'.
 */
ace.Game.prototype.stop = function() {
  ace.events.removeAll(window);
  this.pauseSound('overworld');
  clearTimeout(this.timerId);
};


/**
 * Draws the room into the canvas. Blip!
 * @param {ace.Room} room The room to draw.
 */
ace.Game.prototype.onTick = function(timeStamp) {
  
  if (this.isPaused) {
    var currentItemId = 0;
    for (var i = 0; i < ace.selectableItemList.length; i++) {
	    var itemName = ace.selectableItemList[i];
	    if (itemName == this.avatar.currentItem) {
	      currentItemId = i;
	    }
	  }
	  
	  var row = Math.floor(currentItemId / 4);
	  var col = currentItemId % 4;
    if (game.keyWasPressed(ace.KEY_LEFT) || game.keyWasPressed('a')) {
      col = col - 1;
		}
		if (game.keyWasPressed(ace.KEY_RIGHT) || game.keyWasPressed('d')) {
      col = col + 1;
		}
		if (game.keyWasPressed(ace.KEY_UP) || game.keyWasPressed('w')) {
      row = row - 1;
		}
		if (game.keyWasPressed(ace.KEY_DOWN) || game.keyWasPressed('s')) {
      row = row + 1;
		}
		row = (row + 2) % 2;
		col = (col + 4) % 4;
		currentItemId = row * 4 + col;
		game.avatar.currentItem = ace.selectableItemList[currentItemId];
		
    this.refreshInfoPanel();
    this.keyWasPressed_ = {};
    requestAnimationFrame(this.boundOnTick);
    
    return;
  }
  

  var isLogicFrame = false;
  var elapsed = timeStamp - this.lastTimeStamp;
  
  if (elapsed >= this.idealFrameLength) {
    isLogicFrame = true;
  }

  if (!isLogicFrame) {
    requestAnimationFrame(this.boundOnTick);
    return;
  }

  this.lastTimeStamp = timeStamp;

  this.tickCount++;
  this.isBlinkFrame = (this.tickCount % this.ticksPerAnimationFrame) == 0;
  this.isEvenFrame = (this.tickCount % 2) == 0;

  if (this.isScrolling) {
    if (this.scroller.scrollLeft == this.targetScrollLeft &&
        this.scroller.scrollTop == this.targetScrollTop) {
      this.isScrolling = false;
      this.drawRoom(this.targetScrollRoom);
    } else {
      this.scroller.scrollLeft += this.targetScrollDx;
      this.scroller.scrollTop += this.targetScrollDy;
    }

  } else {

    this.engine.clearLightMap();
    for (var i = 0; i < this.actors.length; i++) {
      if (!this.actors[i].isHidden) {
        this.actors[i].onTick(this);
      }
    }
    this.engine.onTick();

    var newRoom = this.getRoom(this.avatar.x, this.avatar.y, this.avatar.z);
    if (newRoom != this.currentRoom_) {
      // Remove all of the actors for now.
      // And store a list of hidden actors, so things don't respawn.
      this.currentRoom_.isHiddenByActorCountNumber = {};
      
      var roomName = this.getRoomUniqueName(this.currentRoom_);
      this.state.isHiddenByActorCountNumber =
          this.state.isHiddenByActorCountNumber || {};
      this.state.isHiddenByActorCountNumber[roomName] =
          this.state.isHiddenByActorCountNumber[roomName] || {};

      var actorsToDisappear = [];
      for (var i = 1; i < this.actors.length; i++) {
        var actor = this.actors[i];
        if (actor.isHidden) {
          this.state.isHiddenByActorCountNumber[roomName][actor.actorCountNumber] = true;
        } else if (!newRoom.isInUnderworld && actor.isEnemy && !actor.cloudFrames) {
          // Remember which actors to show clouds for.
          actorsToDisappear.push({x: actor.x, y: actor.y, z: actor.z});
        }
      }
      
					
      this.actors = [this.actors.shift()];
      this.avatar.flyingSword = null;
      
      
      if (newRoom.song !== this.currentRoom_.song) {
        game.stopSound('underworld');
        game.stopSound('overworld');
        if (newRoom.song != null) {
          setTimeout(function() {
            game.playSound(newRoom.song, {'loops': 99999, volume:50});
          }, 1500);
        }
      }
      
      if (newRoom.isInUnderworld != this.currentRoom_.isInUnderworld) {
        this.refreshInfoPanel();
        if (newRoom.isInUnderworld) {
          this.engine.canvas.style.backgroundColor = 'black';
          // Deal with any hangover of animating our camera speed.
					game.cameraEyeSpeed = game.idealCameraEyeSpeed;
					game.cameraTargetSpeed = game.idealCameraTargetSpeed;
          this.engine.setLightDirection(ace.UNDERWORLD_LIGHT_DIRECTION);
        } else {
          // Whenever we come out of a cave, reset the overworld.
          game.resetOverworld();
          this.engine.setLightDirection(ace.OVERWORLD_LIGHT_DIRECTION);
          // Also, if we've been in the first dungeon and we're
          // now coming out, activate the classic glitch, which you'll
          // find implemented in lockeddoor.js
          if (top.hasBeenInFirstDungeonEntrance) {
            top.readyForDungeon1Glitch = true;
          }
        }
      }
      
      if (newRoom.isInUnderworld) {
        var dungeonName = game.currentDungeon_.name;
        game.state.hasVisitedRoomByDungeon[dungeonName] =
            game.state.hasVisitedRoomByDungeon[dungeonName] || {};
        game.state.hasVisitedRoomByDungeon[dungeonName][newRoom.name] = true;
        this.refreshInfoPanel();
      }
      
      console.log('ENTERING ROOM:' + newRoom.x + ',' + newRoom.y);
      //console.log(newRoom);
      this.currentRoom_ = newRoom;
      this.spawnRoomActors(this.currentRoom_);
      
      // Show a cloud for any old overworld enemies hanging around.
      for (var i = 0; i < actorsToDisappear.length; i++) {
        this.spawn('Cloud', actorsToDisappear[i]);
      }
      
      this.refreshInfoPanel();
    }

    var avatarGridX = Math.floor(this.avatar.x / 16);
    var avatarGridY = Math.floor(this.avatar.y / 16);
    
    // If the screen is wider, we need to render more sprites.
    var screenRatio = this.engine.canvas.width / this.engine.canvas.height;
    var scale = screenRatio / 1.5;
    
    // Also, if we're at high altitudes, render more.
    var altitudeCorrection = Math.ceil(this.avatar.z / 15);

    var xTileSeek = Math.ceil(9 * scale);
    var yTileSeek = 8;
    for (var gridX = avatarGridX - xTileSeek; gridX < avatarGridX + xTileSeek; gridX++) {
      for (var gridY = avatarGridY - (yTileSeek - 1); gridY < avatarGridY + yTileSeek + altitudeCorrection; gridY++) {
        var worldX = gridX * 16 + 8;
        var worldY = gridY * 16 + 8;
        var tile = this.getTileAt(worldX, worldY);
        
        // We have some extra work to do with caves.
        if (tile.name == 'Cave') {
          var z = game.getWorldZ(worldX, worldY);
          var capTileFix = 0;
          var rx = Math.floor(worldX / ace.OVERWORLD_ROOM_PIXEL_WIDTH);
          var ry = Math.floor(worldY / ace.OVERWORLD_ROOM_PIXEL_HEIGHT);
          var room = ace.overworldActorInfo[rx + ',' + ry];
          if (room && room['Cave'] && room['Cave'].capTile) {
						this.engine.drawSingleSprite(room['Cave'].capTile,
								[worldX, worldY, z+16], 0);
						capTileFix = 1;
          }
          this.engine.drawSingleSprite('ow_cave',
						[worldX, worldY + capTileFix, z], 0);
              
        }
        
        if (this.engine.spriteHasBeenRegistered(tile.name) && !ace[tile.name]) {
          var shells = ace.shellsByTileName[tile.name];
          var z = game.getWorldZ(worldX, worldY);
          if (tile.name == 'ow_path' || tile.name.indexOf('rock') > -1) {
            z -= 16;
          } else if (tile.name.indexOf('ow_water') > -1) {
            z -= 8;
          }
          worldY += (ace.yOffsetsByName[tile.name] || 0);
          z += (ace.zOffsetsByName[tile.name] || 0);
          
          // Fix for SketchUp model.
          var room = this.getRoom(worldX, worldY);
          if (ace.overworldTileXOffset[room.x + ',' + room.y]) {
            worldX += ace.overworldTileXOffset[room.x + ',' + room.y];
          }

          this.engine.drawSingleSprite(tile.name,
              [worldX, worldY, z], 0, shells);
        }
      }
    }

    this.updateCamera();
  }
  
  // Reset key press hash.
  this.keyWasPressed_ = {};
  this.onResize();
  requestAnimationFrame(this.boundOnTick);

};

/**
 * Updates the camera dynamically.
 * @param {ace.Room} room The room to draw.
 */
ace.Game.prototype.updateCamera = function() {
  // Handle camera stuff here.
  var eyeFixY = 0;
  var eyeFixZ = 0;
  var fovDegrees = 45;
  


  // If we're blocked by the big green mountain, move eye up.
  if (this.avatar.x > 3060 && this.avatar.x < 3330 &&
      this.avatar.y > 880 && this.avatar.y < 1032) {
    eyeFixY = 120;
    eyeFixZ = 50;
  }
  var quantizedZ = Math.round(this.avatar.z / 8) * 8;
  var eyeX = this.avatar.x;
  var eyeY = this.avatar.y - 200 + eyeFixY;
  var eyeZ = quantizedZ + 220 + eyeFixZ;
  
  
  
  var cameraMinSensitivity = .3;
  var targetX = this.avatar.x;
  var targetY = this.avatar.y;
  
  // If we're in the underworld, everything is different.
  if (this.avatar.isInUnderworld()) {

    var relativeY = Math.abs(-1000 - this.avatar.y) / 3;
    var eyeZ = quantizedZ + 200 + eyeFixZ;
    eyeY += 100; // - relativeY * 2;

    fovDegrees = 60;
    cameraMinSensitivity = 0
    this.cameraEyeSpeed = .4;
  }
  
  var targetOffset = this.currentRoom_.cameraTargetOffset;
  var eyeOffset = this.currentRoom_.cameraEyeOffset;
  if (targetOffset) {
    targetX += targetOffset[0];
    targetY += targetOffset[1];
    quantizedZ += targetOffset[2];
    eyeX += eyeOffset[0];
    eyeY += eyeOffset[1];
    eyeZ += eyeOffset[2];
  }
  
  vec3.set(this.targetEye_, eyeX, eyeY, eyeZ);
  vec3.set(this.targetTarget_, targetX, targetY, quantizedZ);

  vec3.subtract(this.cameraEyeDelta_, this.targetEye_, this.cameraEye_);
  vec3.subtract(this.cameraTargetDelta_, this.targetTarget_, this.cameraTarget_);
  vec3.scale(this.cameraEyeDelta_, this.cameraEyeDelta_, this.cameraEyeSpeed);
  vec3.scale(this.cameraTargetDelta_, this.cameraTargetDelta_, this.cameraTargetSpeed);
  
  
  if (vec3.length(this.cameraEyeDelta_) > cameraMinSensitivity ||
      this.needsCameraRefresh_) {
    vec3.add(this.cameraEye_, this.cameraEye_, this.cameraEyeDelta_);
    vec3.add(this.cameraTarget_, this.cameraTarget_, this.cameraTargetDelta_);
    this.engine.setCamera(this.cameraEye_, this.cameraTarget_, fovDegrees);
    this.needsCameraRefresh_ = false;
  }

  // If we're "zoomAnimating" the camera, everything is different. 
  if (this.isZoomAnimating) {
    this.zoomAnimatingFrames = this.zoomAnimatingFrames || 1;
    this.zoomAnimatingFrames++;
    var rotZ = this.zoomAnimatingFrames / 30;
    var rotX = .4;
    var distance = (100 + 500 - this.zoomAnimatingFrames) / 2;
    var eye = this.cameraEye_;

    eye[0] = this.cameraTarget_[0] + Math.sin(rotZ) *
      distance * Math.sin(rotX);
    eye[1] = this.cameraTarget_[1] + Math.cos(rotZ) *
        distance * Math.sin(rotX);
    eye[2] = this.cameraTarget_[2] + Math.cos(rotX) *
        distance;
    this.engine.setCamera(eye, this.cameraTarget_, fovDegrees);
  }

};


/**
 * Scrolls us to an adjacent room.
 * @param {string} facing The relative direction of the room to move to.
 */
ace.Game.prototype.scrollRoom = function(facing) {
  this.isScrolling = true;
  var fx = ace.xMultByFacing[facing];
  var fy = ace.yMultByFacing[facing];
  this.targetScrollLeft = this.canvasWidth + this.canvasWidth * fx;
  this.targetScrollTop = this.canvasHeight + this.canvasHeight * fy;
  this.targetScrollDx = this.map.tileSize * fx;
  this.targetScrollDy = this.map.tileSize * fy;
  this.avatar.x -= this.canvasWidth * fx;
  this.avatar.y -= this.canvasHeight * fy;
  var col = (this.map.width + this.room.x + fx) % this.map.width;
  var row = (this.map.height + this.room.y + fy) % this.map.height;
  this.targetScrollRoom = this.map.rooms[col][row];
};


/**
 * Returns whether a given key is currently down.
 * @param {number} keyCode The code to check.
 * @return {boolean} Whether it's down.
 */
ace.Game.prototype.keyIsDown = function(keyCode) {
  return this.keyIsDown_[keyCode];
};


/**
 * Returns whether a given key was pressed this last frame.
 * @param {number} keyCode The code to check.
 * @return {boolean} Whether it was pressed.
 */
ace.Game.prototype.keyWasPressed = function(keyCode) {
  return this.keyWasPressed_[keyCode];
};


/**
 * Refreshes the info bar that shows coins, hearts, etc.
 */
ace.Game.prototype.refreshInfoPanel = function() {
  
  if (!game.avatar.isInUnderworld() ||
      this.currentDungeon_.name == 'Dungeon1' && this.currentRoom_.x > 5) {
   
    this.hudCtx_.drawImage($('hud-image'), 0, 0);
    $('hud-room').style.left = (16 + this.currentRoom_.x * 8) + 'px';
    $('hud-room').style.top = (72 + 360 - this.currentRoom_.y * 8) + 'px';
    
  } else {
  
    this.hudCtx_.drawImage($('hud-image-underworld'), 0, 0);

    for (var x = 0; x <= 10; x++) {
      for (var y = 0; y <= 10; y++) {
        var room = this.currentDungeon_.getRoom(x, y);
        var dungeonName = game.currentDungeon_.name;
        game.state.hasVisitedRoomByDungeon[dungeonName] =
            game.state.hasVisitedRoomByDungeon[dungeonName] || {};
        var hasVisitedThisRoom =  game.state.hasVisitedRoomByDungeon[dungeonName][room.name];               
        if (!room.hideOnMap) {
          var mx = 14 + 16 * x;
          var my = 440 - 8 * y;
          if (game.state.hasMapByDungeon[game.currentDungeon_.name] == true) {
            if (hasVisitedThisRoom) {
              this.hudCtx_.fillStyle = '#2038ec';
            } else {
              this.hudCtx_.fillStyle = '#1627a6';
            }
            this.hudCtx_.fillRect(mx, my - 6, 14, 6);
          } else {
            
            if (hasVisitedThisRoom) {
              this.hudCtx_.fillStyle = '#454545';
              this.hudCtx_.fillRect(mx, my - 6, 14, 6);
            }
            
          }
          if (room.isCompassPoint == true &&
              game.state.hasCompassByDungeon[game.currentDungeon_.name] == true) {
            this.hudCtx_.fillStyle = '#d82800';
            this.hudCtx_.fillRect(mx + 4, my - 6, 6, 6);
          }
        }
      }
    }

    if (!game.state.hasMapByDungeon[game.currentDungeon_.name]) {
      this.hudCtx_.clearRect(84, 222, 48, 48);
    }
    if (!game.state.hasCompassByDungeon[game.currentDungeon_.name]) {
      this.hudCtx_.clearRect(84, 302, 48, 48);
    }
          

    $('hud-room').style.left = (19 + this.currentRoom_.x * 16) + 'px';
    $('hud-room').style.top = (74 + 360 - this.currentRoom_.y * 8) + 'px';
  }
  
  // We placed the various "caves" inside the first dungeon, off to the
  // right of the map. So if we're in a cave, don't show the link
  // pixel on the map.
  if (game.avatar.isInUnderworld() &&
      this.currentDungeon_.name == 'Dungeon1' && this.currentRoom_.x > 5) {
    $('hud-room').style.top = '-5000px';
  }
  
	for (var i = 0; i < ace.selectableItemList.length; i++) {
	  var itemName = ace.selectableItemList[i];
	  var col = i % 4;
	  var row = Math.floor(i / 4);
	  var x = 228 + 48 * col;
	  var y = 94 + row * 32;
	  if (!this.avatar.hasInventory(itemName)) {
	    this.hudCtx_.clearRect(x, y, 32, 32);
	  }
	  if (this.avatar.currentItem == itemName) {
	    if (this.avatar.hasInventory(itemName)) {
        this.hudCtx_.drawImage(this.hudCanvas_, x + 2, y, 28, 32,
                               232, 390, 28, 32);
        this.hudCtx_.drawImage(this.hudCanvas_, x, y, 32, 32,
                               100, 94, 32, 32);
      } 
      this.hudCtx_.drawImage($('hud-panel-selector'),
	                           0, 0, 32, 32,
	                           x, y, 32, 32);              
	  }
	}
	var itemList = ['raft', 'book', 'ring', 'ladder', 'magickey', 'bracelet'];  
	for (var i = 0; i < itemList.length; i++) {
	  var x = 228 + 32 * i;
	  var y = 46;
	  if (!this.avatar.hasInventory(itemList[i])) {
	    this.hudCtx_.clearRect(x, y, 32, 32);
	  }
	}
	if (!this.avatar.hasInventory('itemwoodensword')) {
    this.hudCtx_.clearRect(280, 388, 28, 34);
  }
  
  
  
  $('runner-info-panel').innerHTML = this.state.coins + '<br/><br/>' +
      this.state.keys + '<br/>' + this.state.bombs;
  $('hud-hearts').style.width = (this.avatar.hitPoints * 16) + 'px';
  $('hud-max-hit-points').style.width = (this.avatar.maxHitPoints * 16) + 'px';  
};


/**
 * Refreshes the info panel that shows coins, hearts, etc.
 * @param {string} soundName A friendy name, like 'sword'.
 * @param {string} src The path to the sound file.
 */
ace.Game.prototype.loadSound = function(soundName, src) {
  // The following lines (kinda) work for HTML5 audio. After much
  // frustration, using soundManager2 instead.
  //
  // var audioElement = document.createElement('audio');
  // audioElement.setAttribute('src', src);
  // this.sounds[soundName] = audioElement;

  // Here's the SoundManager2 stuff.
  this.sounds[soundName] = soundManager.createSound({
    id: soundName,
    url: src
  });
  if (this.sounds[soundName].load) {
    this.sounds[soundName].load();
  }
};


/**
 * Plays a sound.
 * @param {string} soundName A friendy name, like 'sword'.
 */
ace.Game.prototype.playSound = function(soundName, settings) {
  if (this.sounds[soundName].play) {
    this.sounds[soundName].play(settings);
  }
};


/**
 * Pauses a sound by name.
 * @param {string} soundName A friendy name, like 'sword'.
 */
ace.Game.prototype.pauseSound = function(soundName) {
  if (this.sounds[soundName].pause) {
    this.sounds[soundName].pause();
  }
};


/**
 * Fades out a sound by name.
 * @param {string} soundName A friendy name, like 'sword'.
 * @param {number} duration Milliseconds of fade.
 * @param {number} targetVolume The target volume.
 */
ace.Game.prototype.fadeSound = function(soundName, duration, targetVolume) {

  // Add a fade method to soundManager, then call it.
  if (typeof soundManager !== 'undefined')
    soundManager.fadeTo = function(id, dur, toVol, callback) {
      dur      = dur || 1000;
      toVol    = toVol || 0;
      callback = typeof callback == 'function' ? callback : function(){};
      var s    = soundManager.getSoundById(id);
      var k    = 50; // TODO(scott): This is hardcoded right now for songs.
      
      var t    = dur/Math.abs(k - toVol),
          i    = setInterval(function(){
                k = k > toVol ? k - 1 : k + 1;
                s.setVolume(k);
                if(k == toVol){ 
                        callback.call(this);
                  clearInterval(i);
                  i = null;
                }
        }, t);	
    }
  soundManager.fadeTo(soundName, duration, targetVolume);
};



/**
 * Pauses a sound by name.
 * @param {string} soundName A friendy name, like 'sword'.
 */
ace.Game.prototype.resumeSound = function(soundName) {
  if (this.sounds[soundName].resume) {
    this.sounds[soundName].resume();
  }
};


/**
 * Pauses a sound by name.
 * @param {string} soundName A friendy name, like 'sword'.
 */
ace.Game.prototype.stopSound = function(soundName) {
  if (this.sounds[soundName].stop) {
    this.sounds[soundName].stop();
  }
};


/**
 * Handles the screen resizing.
 * @param {event} e The event.
 */
ace.Game.prototype.onResize = function() {
  var w = this.window.innerWidth;
   var h = this.window.innerHeight;
  var topPadding = 100;
  document.getElementById('button-panel').style.opacity = 1;
  document.getElementById('dpad-panel').style.opacity = 1;
  
  if (w < 460 || h < 500) {
    document.getElementById('hud-panel').style.transform = 'scale(0.5) translateY(230px)';
    topPadding = 50;
    if (w > h) {
      document.getElementById('button-panel').style.opacity = .7;
      document.getElementById('dpad-panel').style.opacity = .7;
    }
  } else {
    document.getElementById('hud-panel').style.transform = '';
    document.getElementById('hud-panel').style.top = '50px';
  }
  
  h = this.window.innerHeight - topPadding;
  
  var ratio = w / h;
  var viewport = {w: w,
                  h: h};

  var minHeight = Math.floor(w * 0.9);
  if (minHeight < h) {
    viewport.top = Math.floor((h - minHeight) / 2);
    viewport.h = minHeight;
  }  
  
  // TODO(scott): Auto size based on performance.
  this.engine.onResize(viewport, 1, 1, topPadding); //this.state.canvasScale);
  this.needsCameraRefresh_ = true;
};


/**
 * Handles the key down.
 * @param {event} e The event.
 */
ace.Game.prototype.onKeyDown = function(e) {
  this.keyIsDown_[e.keyCode] = true;

  var letter = String.fromCharCode(e.keyCode).toLowerCase();
  this.keyIsDown_[letter] = true;
  this.updateButtons_();

  e.preventDefault();
};


/**
 * Handles the key up.
 * @param {event} e The event.
 */
ace.Game.prototype.onKeyUp = function(e) {
  this.keyIsDown_[e.keyCode] = false;
  this.keyWasPressed_[e.keyCode] = true;

  var letter = String.fromCharCode(e.keyCode).toLowerCase();
  this.keyIsDown_[letter] = false;
  this.keyWasPressed_[letter] = true;
  this.updateButtons_();

	if (e.keyCode == ace.KEY_ENTER) {
	  this.pressStart();
	}

  e.preventDefault();
};


/**
 * Gets height of the terrain at a given x/y world position.
 * @param {number} x The world x coordinate.
 * @param {number} y The world y coordinate.
 * @return {number} The z-altitude at the spot.
 */
ace.Game.prototype.getWorldZ = function(x, y) {
  var worldWidth = 4096;
  var worldHeight = 1408;

  if (x > worldWidth || y > worldHeight || y < 0 || x < 0) {
    return 0;
  }
  var gridX = Math.floor(x / 16);
  var gridY = Math.floor(y / 16);
  var row = ace.heightMap[gridY] || [];
  var val = row[gridX];
  return val || 0;
};


/**
 * Returns a random spot inside the current room.
 * @return {object} A simple data structure with x and y.
 */
ace.Game.prototype.randomSpotInRoom = function(worldX, worldY) {
  var baseX = Math.floor(worldX / ace.OVERWORLD_ROOM_PIXEL_WIDTH) *
      ace.OVERWORLD_ROOM_PIXEL_WIDTH;
  var baseY = Math.floor(worldY / ace.OVERWORLD_ROOM_PIXEL_HEIGHT) *
      ace.OVERWORLD_ROOM_PIXEL_HEIGHT;
  
  // Inset for the walls of the underworld.
  baseX += 32;
  baseY += 32;
  
  // Now add randomness.
  baseX += ace.randomInt(ace.OVERWORLD_ROOM_PIXEL_WIDTH - 64);
  baseY += ace.randomInt(ace.OVERWORLD_ROOM_PIXEL_HEIGHT - 64);
  return {x: baseX, y: baseY};

};


/**
 * Gets a tile ID at a given x, y coordinate.
 * @param {number} worldX The world x coordinate.
 * @param {number} worldY The world y coordinate.
 * @return {object} A simple data structure with ID and name.
 */
ace.Game.prototype.getTileAt = function(worldX, worldY, opt_z) {
  var tileX = Math.floor(worldX / 16);
  var tileY = Math.floor(worldY / 16);
  var tileId;
  if (!ace.tileMap[tileY]) {
    tileId = ace.tileIdsByName['ow_ground'];
  } else {
    tileId = ace.tileMap[tileY][tileX];
  }
  
  // If we're in the underworld, everything is ground.
  if (opt_z && opt_z < -100) {
    var room = this.getRoom(worldX, worldY, opt_z);
    return room.getTileAt(worldX, worldY);
  }

  // TODO(scott): Is this correct logic? Need to debug why I have some nulls
  // in the tileMap in the first place.
  if (tileId == null) {
    tileId = ace.tileIdsByName['ow_ground'];
  }
 
  var tileName = ace.tileNamesById[tileId];
  var isWalkable = ace.isWalkableByName[tileName];
  var isWalkableByEnemies = ace.isWalkableByEnemiesByName[tileName];
  if (isWalkable === undefined) {
    isWalkable = this.isActor_(tileName);
  }
  
  // Hardcoded weirdness around the "lake sand" above
  // the entrance to dungeon 7.
  if (worldX > 580 && worldX < 690 && 
      worldY > 580 && worldY < 660) {
    isWalkable = true; 
  }

  var walkSpeedFactor = ace.walkSpeedFactorByTileName[tileName] || 1;
  return {
    'id': ace.tileId,
    'name': tileName,
    'isWalkable': isWalkable,
    'isWalkableByEnemies': isWalkableByEnemies,
    'walkSpeedFactor': walkSpeedFactor
  };

};



/**
 * Gets a grid x,y at a given pixel x, y coordinate.
 * @param {number} worldX The world x coordinate.
 * @param {number} worldY The world y coordinate.
 * @return {object} A simple data structure with x and y;
 */
ace.Game.prototype.getGridXY = function(worldX, worldY) {
  var tileX = Math.floor(worldX / 16);
  var tileY = Math.floor(worldY / 16);
  return {
    'x': tileX,
    'y': tileY
  };
};


/**
 * Returns if the first letter in a string is uppercase, or really whether
 * it's an actor.
 * @param {string} str The string to check.
 * @return {boolean} Whether the first letter is uppercase.
 */
ace.Game.prototype.isActor_ = function(str) {
  var letter = str.substr(0,1);
  return letter == letter.toUpperCase();
};

/**
 * Returns whether an actor can exit in a given direction inside
 * a given room.
 * @param {ace.Room} room The room to check.
 * @param {string} facing One of our standard facing strings, like
 *     'up', or 'right'
 * @return {boolean} Whether the exit in that direction is "walkable".
 */
ace.Game.prototype.canExit = function(room, facing) {
  if (!room && !room.exitByFacing) {
    return true;
  }

  // TODO(scott): Finish the key logic, etc.
  var exit = room.exitByFacing[facing]
  return exit == ace.OPEN || exit == ace.BOMBABLE;
};


/**
 * Returns a little data structure describing the "room" we're in.
 * @param {number} x The global x position to check.
 * @param {number} y The global y position to check.
 * @param {number} z The global z position to check.
 * @return {Object} A data structure like {x:1, y:20}
 */
ace.Game.prototype.getRoom = function(x, y, z) {
  this.cachedOverworldRooms_ = this.cachedOverworldRooms_ || {};
  
  // If we're underground, look for a dungeon room.
  if (z < -100) {
    var rx = Math.floor(x / ace.UNDERWORLD_ROOM_PIXEL_WIDTH);
    var ry = Math.floor(y / ace.UNDERWORLD_ROOM_PIXEL_HEIGHT);
    return this.currentDungeon_.getRoom(rx, ry);
  }
  
  // Otherwise, construct a room record on the fly from our tile map.
  var rx = Math.floor(x / ace.OVERWORLD_ROOM_PIXEL_WIDTH);
  var ry = Math.floor(y / ace.OVERWORLD_ROOM_PIXEL_HEIGHT);
  var name = rx + ',' + ry
  if (!this.cachedOverworldRooms_[name]) {
    var room = {'x': rx, 'y': ry, 'song': 'overworld', 'name': rx + ',' + ry};
    room.actors = [];

    var baseX = rx * ace.OVERWORLD_ROOM_PIXEL_WIDTH;
    var baseY = ry * ace.OVERWORLD_ROOM_PIXEL_HEIGHT;
    var roomActorInfo = ace.overworldActorInfo[rx + ',' + ry] || {};

    var hasSpawnedByActorName = {};

    for (var gridX = 0; gridX < ace.OVERWORLD_ROOM_TILE_WIDTH; gridX++) {
      for (var gridY = 0; gridY < ace.OVERWORLD_ROOM_TILE_HEIGHT; gridY++) {
        var worldX = baseX + gridX * ace.TILE_SIZE + 8;
        var worldY = baseY + gridY * ace.TILE_SIZE + 8;
        var actorTile = this.getTileAt(worldX, worldY);
				
        if (ace[actorTile.name]) {
          var actor = {};
          actor['type'] = actorTile.name;
          actor['x'] = worldX;
          actor['y'] = worldY;
          actor['settings'] = {};
          
          if (roomActorInfo[actorTile.name]) {
            hasSpawnedByActorName[actorTile.name] = true;
            for (var key in roomActorInfo[actorTile.name]) {
              actor['settings'][key] = roomActorInfo[actorTile.name][key];
            }
          }
          
          room.actors.push(actor);
        } else if (actorTile.name.indexOf('_') == -1) {
				  console.log('COULD NOT FIND actor:' + actorTile.name);
				}
      }
    }

    for (var actorName in roomActorInfo) {
      if (!hasSpawnedByActorName[actorName]) {
        var actor = {};
        actor['type'] = actorName;
        actor['x'] = 0;
        actor['y'] = 0;
        actor['settings'] = {};
      
        for (var key in roomActorInfo[actorName]) {
          actor['settings'][key] = roomActorInfo[actorName][key];
        }
        room.actors.push(actor);   
      }
      
    } 
    

    this.cachedOverworldRooms_[name] = room;
  }
  return this.cachedOverworldRooms_[name];
};



/**
 * Sets where the camera is.
 * @param {number} x The global x position.
 * @param {number} y The global y position.
 * @param {number} z The global z position.
 */
ace.Game.prototype.setCameraEye = function(x, y, z) {
  this.cameraEye_ = [x, y, z];
};



/**
 * Sets where the camera targets.
 * @param {number} x The global x position.
 * @param {number} y The global y position.
 * @param {number} z The global z position.
 */
ace.Game.prototype.setCameraTarget = function(x, y, z) {
  this.cameraTarget_ = [x, y, z];
};


/**
 * Animates the camera to the start position of the game.
 */
ace.Game.prototype.zoomToStart = function() {
  this.document.body.style.backgroundColor = 'black';
  var speedScale = 3;
  this.idealCameraEyeSpeed = .2 * speedScale;
  this.idealCameraTargetSpeed = .4 * speedScale;
  this.cameraEyeSpeed = 0.02;
  this.cameraTargetSpeed = 0.02;
  //this.cameraEyeSpeed = 0.2;
  //this.cameraTargetSpeed = 0.2;
  
  
  
  this.zoomToStartTimer = setInterval(function() {
    game.cameraEyeSpeed = (game.cameraEyeSpeed * 40 + game.idealCameraEyeSpeed) / 41;
    game.cameraTargetSpeed = (game.cameraTargetSpeed * 40 + game.idealCameraTargetSpeed) / 41;
    var hasSavedGame = game.state.lastOverworldLocation;
    
    if (Math.abs(game.cameraEyeSpeed - game.idealCameraEyeSpeed) < .35 || hasSavedGame) {
      if (hasSavedGame) {
        game.continue(true);
      }
      game.idealCameraEyeSpeed = .2;
      game.idealCameraTargetSpeed = .4;
      game.cameraEyeSpeed = game.idealCameraEyeSpeed;
      game.cameraTargetSpeed = game.idealCameraTargetSpeed;
      clearInterval(game.zoomToStartTimer);
      game.engine.canvas.style.backgroundColor = 'black';
    }
  }, 150);

};



/**
 * Animates the camera through the logo.
 */
ace.Game.prototype.zoomThroughLogo = function() {
  this.document.body.style.backgroundColor = 'black';
  $('hud-panel').className = 'visible';
  //var idealEye = [1891, -2200, 2430];
  var idealEye = [1891 - 120, -2200, 2130];
  var dX = idealEye[0] - this.cameraEye_[0];
  var dY = idealEye[1] - this.cameraEye_[1];
  var dZ = idealEye[2] - this.cameraEye_[2];
  var zoomFraction = 170;
  dX = dX / zoomFraction;
  dY = dY / zoomFraction;
  dZ = dZ / zoomFraction;
  
  var frames = 0;
  clearInterval(game.zoomThroughLogoTimer);
  game.zoomThroughLogoTimer = setInterval(function() {
    game.cameraEye_[0] += dX;
    game.cameraEye_[1] += dY;
    game.cameraEye_[2] += dZ * 1.2;

    game.cameraTarget_[2] -= dZ * 12;
    frames++;
    if (frames > 30) {
      game.cameraEye_[2] = 200;// = [2000, -1000, 100];
      game.cameraEye_[1] += 1000;// = [2000, -1000, 100];
      game.cameraTarget_[1] += 1000;// = [2000, -1000, 100];
      game.cameraTarget_[2] -= 1000;// = [2000, -1000, 100];
      clearInterval(game.zoomThroughLogoTimer);
      game.zoomToStart();
    }
  }, 1000/20);

};



/**
 * Shows the start screen.
 */
ace.Game.prototype.showStartScreen = function() {
  this.pauseSound('overworld');
  this.playSound('intro', {'loops': 99999, volume:50});
  
  this.cameraTarget_ = [1891, -2200, 2230]
  this.cameraEye_ = [1891,-3820,1880];
  this.cameraEyeSpeed = 0;
  this.cameraTargetSpeed = 0;
  $('intro-panel').scrollTop = 0;
  
  this.showCreditsTimer = this.window.setTimeout(function() {
    game.showCredits();
  }, 12000);
};


/**
 * Handles the pressing of the start button on screen.
 */
ace.Game.prototype.pressStart = function() {
  if (this.isStartScreen()) {
    setTimeout(function() {
      game.resumeSound('overworld');//, {'loops': 99999, volume:50});
    }, 3500);
    game.fadeSound('intro', 4500, 0);
        
    clearInterval(game.zoomThroughLogoTimer);
    clearInterval(game.showCreditsTimer);
    clearInterval(game.scrollTimer);
    this.zoomThroughLogo();
    $('intro-panel').style.display = 'none';
  } else {
    this.togglePause();
  }
};

/**
 * Handles the pressing of the start button on screen.
 */
ace.Game.prototype.togglePause = function() {
  if (game.isPaused) {
    document.getElementById('hud-panel').className = 'visible';
    document.getElementById('game-canvas').className = '';
    game.isPaused = false;
  } else {
    document.getElementById('hud-panel').className = 'paused';
    document.getElementById('game-canvas').className = 'paused';
    game.isPaused = true;
  }
};

/**
 * Whether we're on the start screen.
 */
ace.Game.prototype.isStartScreen = function() {
  return this.cameraEye_[1] <= -3820;
};



/**
 * Handles the pressing of the start button on screen.
 */
ace.Game.prototype.allEnemiesAreDead = function() {
  for (var i = 0; i < this.actors.length; i++) {
    if (this.actors[i].isEnemy && this.actors[i].isAlive()) {
      return false;
    }
  }
  return true;
};



/**
 * Shows the credits.
 */
ace.Game.prototype.showCredits = function() {
	$('intro-panel').scrollTop = 0;
	$('intro-panel').className = 'visible';
	var scroll = 0;
  clearInterval(game.scrollTimer);
  var startTime = new Date();
  $('vines-hline-id').style.marginTop = (window.innerHeight / 2 - 180) + 'px'
  var isIPad = navigator.userAgent.match(/iPad/i) != null;
  var scrollAmount = isIPad ? 4 : 2;
  
  game.scrollTimer = this.window.setInterval(function() {
    
    
    var startY = 700;
    var bestY = window.innerHeight / 2 - 200;
    var startPauseAt = startY - bestY;
    
    var pause = 100;
    if (scroll < startPauseAt) {
      $('intro-panel').scrollTop = scroll;
      scroll = scroll + scrollAmount;
    } else {
      // We can do different scroll speed after pause.
      scroll = scroll + (scrollAmount / 2);
    }
    if (scroll > startPauseAt + pause) {
      $('intro-panel').scrollTop = scroll - pause;
    }
    
    var elapsed = new Date() - startTime;

    if (elapsed/1000 > 1400 / 20 && $('intro-panel').className != 'hidden') {
      $('intro-panel').className = 'hidden';
			game.showCreditsTimer = window.setTimeout(function() {
				game.showCredits();
			}, 13000);
    }
  }, 1000/20);
};


/**
 * Changes the dungeon we're in.
 */
ace.Game.prototype.changeDungeon = function(dungeonNumber) {
  this.currentDungeon_ = ace.dungeons[dungeonNumber];
  function onReady() {
    console.log('changed to Dungeon ' + dungeonNumber);
  }
  this.engine.changeDungeonTexture(this.currentDungeon_.backgroundUrl, onReady);
};



/**
 * Handles the "continue" button from the menu.
 */
ace.Game.prototype.continue = function(isRestoringFromSavedGame) {
  if (this.state.lastOverworldLocation) {
    this.avatar.x = this.state.lastOverworldLocation[0];
    this.avatar.y = this.state.lastOverworldLocation[1];
    this.avatar.z = this.state.lastOverworldLocation[2];
    this.avatar.isLeavingCave = true;
  } else {
    this.avatar.x = this.x = 1892;
    this.avatar.y = 84;
    this.avatar.z = 0;
    this.avatar.isLeavingCave = false;
  }
  this.avatar.hitPoints = 3;
  this.avatar.zOffset = 0;
  this.avatar.yOffset = 0;
  this.avatar.facing = 'down';
  this.avatar.invincibleCounter = 0;
  this.avatar.maxHitPoints = game.state.maxHitPoints || 3;
  this.refreshInfoPanel();
  
  this.stopSound('gameover');
  this.resetOverworld();
  game.setCameraEye(game.avatar.x, game.avatar.y, game.avatar.z);
  game.setCameraTarget(game.avatar.x, game.avatar.y, game.avatar.z);

  
  if (!isRestoringFromSavedGame) {
    game.playSound('text');
    game.playSound('overworld');
    window.setTimeout(function () {
      document.getElementById('game-over-wrapper').className = 'hidden';    
      // TODO(scott): For some reason, I have to set the z again
      // when I'm in a side-scrolling room. Hmm.
      game.avatar.z = 0;
      game.setCameraEye(game.avatar.x, game.avatar.y, game.avatar.z);
      game.setCameraTarget(game.avatar.x, game.avatar.y, game.avatar.z);
    }, 500);
    
    window.setTimeout(function () {
      document.getElementById('game-over-wrapper').style.zIndex = 9;
    }, 1500);
  }
};


/**
 * Handles the "reset" button from the menu.
 */
ace.Game.prototype.reset = function() {
  window.location.reload();
};


/**
 * Handles the "save" button from the menu.
 */
ace.Game.prototype.save = function() {
  if (!window.localStorage) {
    alert('Sorry, your browser does not support localStorage, which is needed to save your game.');
    return;
  }
  
  var stateString = JSON.stringify(this.state);
  window.localStorage['zelda30tribute'] = stateString;
  alert('Your game is saved! When you return to this page, you\'ll be in business.');   
};



/**
 * Resets all of the badguys in the overworld.
 */
ace.Game.prototype.resetOverworld = function() {
  for (var key in this.cachedOverworldRooms_) {
    var room = this.cachedOverworldRooms_[key];
    var roomName = this.getRoomUniqueName(room);
    this.state.isHiddenByActorCountNumber = this.state.isHiddenByActorCountNumber || {};
    this.state.isHiddenByActorCountNumber[roomName] = {};
    //room.isHiddenByActorCountNumber = {};
  }
};

/**
 * Gets a string that uniquely identifies this room across all rooms,
 * in the form 'foo,4,5' where the first bit is the dungeon name
 * and the next two are roomX and roomY position.
 */
ace.Game.prototype.getRoomUniqueName = function(room) {
  var dungeonName = room.dungeonName || 'Overworld';
  return dungeonName + ',' + room.x + ',' + room.y;
};