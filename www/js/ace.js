/**
 * @fileoverview The main script for ace, which at one point stood for
 *     "adventure construction engine" and at this point just stands for ace.
 *
 *     This file contains global constants and some global helper functions.
 *
 * @author Scott Lininger (scott@scottlininger.com)
 */


/**
 * Handy DOM access.
 */
var $ = $ || function(id) { return document.getElementById(id); }

/**
 * A namespace to hang functions from.
 * @namespace
 */
var ace = ace || {};


ace.UNDER_CONSTRUCTION_MESSAGE = ' OH NO! MY DEMO IS\n' +
                                 'SHOWING. THIS DUNGEON\n' +
                                 ' IS NOT YET COMPLETE.';

ace.KEY_LEFT = 37;
ace.KEY_UP = 38;
ace.KEY_RIGHT = 39;
ace.KEY_DOWN = 40;
ace.KEY_SPACE = 32;
ace.KEY_SHIFT = 16;
ace.KEY_ENTER = 13;
ace.MIDDLE_MOUSE_BUTTON = 1;
ace.LEFT_MOUSE_BUTTON = 0;


// A handy multiplier, like 10 * facingX['left']
ace.xMultByFacing = {
      left: -1,
      right: 1,
      up: 0,
      down: 0,
      none: 0
    };
ace.yMultByFacing = {
      left: 0,
      right: 0,
      up: 1,
      down: -1
    };
ace.clockwiseByFacing = {
      left: 'up',
      right: 'down',
      up: 'right',
      down: 'left'
    };
ace.counterClockwiseByFacing = {
      left: 'down',
      right: 'up',
      up: 'left',
      down: 'right'
    };

ace.getClockwiseFacing = function(facing) {
  return ace.clockwiseByFacing[facing];
};

ace.HITPOINTS_DEAD = -9999;
ace.HITPOINTS_DYING = -8888;
ace.ZINDEX_ALWAYS_BEHIND = 1;


// Each underworld room has 4 potential "doors". These
// constants record which type it is.
ace.OPEN = 0;
ace.WALL = 1;
ace.BOMBABLE = 2;


ace.TILE_SIZE = 16;
ace.OVERWORLD_ROOM_TILE_WIDTH = 16;
ace.OVERWORLD_ROOM_TILE_HEIGHT = 11;
ace.OVERWORLD_ROOM_PIXEL_WIDTH = ace.TILE_SIZE * ace.OVERWORLD_ROOM_TILE_WIDTH;
ace.OVERWORLD_ROOM_PIXEL_HEIGHT = ace.TILE_SIZE * ace.OVERWORLD_ROOM_TILE_HEIGHT;
ace.UNDERWORLD_ROOM_PIXEL_WIDTH = 256;
ace.UNDERWORLD_ROOM_PIXEL_HEIGHT = 176;

var vector = [-2, -2, 4];
vec3.normalize(vector, vector);
ace.OVERWORLD_LIGHT_DIRECTION = vector;

var vector2 = [0, -2, 6];
vec3.normalize(vector2, vector2);
ace.UNDERWORLD_LIGHT_DIRECTION = vector2;



ace.LIGHT_MAP_HEIGHT = 512;
ace.LIGHT_MAP_WIDTH = 512;
ace.QUARTER_LIGHT_MAP_WIDTH = ace.LIGHT_MAP_WIDTH / 4;
ace.HALF_LIGHT_MAP_WIDTH = ace.LIGHT_MAP_WIDTH / 2;
ace.DUNGEON_CANVAS_SIZE = 2048;

/**
 * Metadata about items that can be picked up.
 */
ace.selectableItemList = ['boomerang', 'bomb', 'bow', 'candle',
    'whistle', 'meat', 'potion', 'wand'];  

ace.itemInfoBySpriteName = {
	'itemwoodensword': {isOneHanded:true},
	'bow': {isOneHanded:true},
	'boomerang': {isOneHanded:true},
	'boomerang_blue': {isOneHanded:true},
	'raft': {isOneHanded:true},
	'whistle': {isOneHanded:true}
};


/**
 * Returns the number of radians in a given number of degrees.
 * @param {number} degrees The number of degrees.
 */
ace.radians = function(degrees) {
  return degrees * Math.PI / 180;
};


/**
 * Handy bind function.
 */
ace.bind = function(fn, selfObj, var_args) {
  var boundArgs = fn.boundArgs_;
  if(arguments.length > 2) {
    var args = Array.prototype.slice.call(arguments, 2);
    if(boundArgs)args.unshift.apply(args, boundArgs);
    boundArgs = args
  }selfObj = fn.boundSelf_ || selfObj;
  fn = fn.boundFn_ || fn;
  var newfn;
  var context = selfObj || goog.global;
  if(boundArgs)newfn = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift.apply(args, boundArgs);
    return fn.apply(context, args)
  };
  else newfn = function() {
    return fn.apply(context, arguments)
  };
  newfn.boundArgs_ = boundArgs;
  newfn.boundSelf_ = selfObj;
  newfn.boundFn_ = fn;
  return newfn
};


/**
 * Handy base function, which allows for sub classing in the style of Google's
 * Closure library.
 */
ace.base = function(a, b) {
  var c = arguments.callee.caller;
  if(c.superClass_) {
    return c.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var d = Array.prototype.slice.call(arguments, 2), e = false, f = a.constructor;f;f = f.superClass_ && f.superClass_.constructor) {
    if(f.prototype[b] === c) {
      e = true
    }else {
      if(e) {
        return f.prototype[b].apply(a, d)
      }
    }
  }
  if(a[b] === c) {
    return a.constructor.prototype[b].apply(a, d)
  }else {
    throw Error("ace.base called from a method of one name to a method of a different name");
  }
};


/**
 * Handy inherits function, which allows for sub classing in the style of Google's
 * Closure library.
 */
ace.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor
};


/**
 * Loads an image.
 * @param {string} url The url to load.
 */
ace.loadImage = function(url) {
  var img = new Image();

  // TODO(scottlininger): Is this bloating the RAM usage a bunch? Maybe should
  // do some additional checking or add a param to control this.
  img.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    img.imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  };

  img.src = url;
  return img;
};


/**
 * Reads a handy pixel struct from an image. Worked in conjunction with
 * ace.loadImage since it assumes a 2D context will be available.
 * @param {Image} img The Image.
 * @param {number} x The x position.
 * @param {number} y The y position.
 * @return {Object} A nice struct with r, g, b, a values.
 */
ace.getPixel = function(img, x, y) {
  var imgData = img.imgData;
  if (!imgData) { return false };
  var index = (y * imgData.width + x) * 4;
  var r = imgData.data[index];
  var g = imgData.data[index + 1];
  var b = imgData.data[index + 2];
  var a = imgData.data[index + 3];
  return { r: r, g: g, b: b, rgb: r + ',' + g + ',' + b };
}


/**
 * How far two numbers are from one another.
 * @param {number} a The first number.
 * @param {number} a The second number.
 */
ace.diff = function(a, b) {
  return Math.abs(a - b);
};


/**
 * Clamps the first number between the next two.
 * @param {number} n The number.
 * @param {number} min The min.
 * @param {number} max The max.
 */
ace.clamp = function(n, min, max) {
  return Math.max(min, Math.min(max, n));
};


/**
 * Gets a facing number from a dx and dy.
 * @param {number} dx The diff in x.
 * @param {number} dy The diff in y.
 */
ace.getFacing = function(dx, dy) {
  if (dy == 0) {
    dy = .00001;
  }
  var ratio = Math.abs(dx / dy);

  if (ratio < .6) {
    var facing = (dy < 0) ? 0 : 4;
    return facing;
  }

  if (ratio > 3.3) {
    var facing = (dx < 0) ? 6 : 2;
    return facing;
  }

  if (dx > 0 && dy < 0) return 1;
  if (dx > 0 && dy > 0) return 3;
  if (dx < 0 && dy > 0) return 5;
  return 7;
};


/**
 * Gets a facing number from a dx and dy.
 * @param {number} dx The diff in x.
 * @param {number} dy The diff in y.
 */
ace.distance = function(dx, dy) {
  var dyScaled = dy * 1;
  return Math.sqrt(dx * dx + dyScaled * dyScaled);
};


/**
 * Gets a random integer between 0 and N.
 * @param {number} max The max to roll.
 */
ace.randomInt = function(max) {
  return Math.floor(Math.random() * (max + 1));
};


/**
 * An number that will be incremented to give a unique id to those elements
 * who want one. It's the responsibility of the element to increment this
 * when it grabs one.
 * @type {number}
 */
ace.nextId = 1;


/**
 * Returns a random facing number.
 * @return {string} The facing string, like 'right'.
 */
ace.randomFacing = function() {
  var roll = ace.randomInt(1000);
  if (roll < 250) {
    return 'up';
  }
  if (roll < 500) {
    return 'right';
  }
  if (roll < 750) {
    return 'down';
  }
  return 'left';
};


/**
 * A hash of the opposite facing, keyed by facing, of course.
 */
ace.oppositeFacings = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up'
};

ace.rotZByFacing_ = {
  'right': Math.PI / 2,
  'left': -Math.PI / 2,
  'down': 0,
  'up': Math.PI
};

ace.getRotZByFacing = function(facing) {
  return ace.rotZByFacing_[facing];
};

/**
 * Whether two facings are opposite one another. Useful for bouncing and stuff.
 * @param {string} facing1 The first facing.
 * @param {string} facing2 The other.
 * @return {boolean} Whether they are opposite.
 */
ace.areOppositeFacings = function(facing1, facing2) {
  return (ace.oppositeFacings[facing1] == facing2);
};




