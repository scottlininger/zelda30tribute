soundManager.url = 'swf/'; // directory where SM2 .SWFs live
soundManager.flashVersion = 9
soundManager.useHighPerformance = true
soundManager.useFastPolling = true
soundManager.autoLoad = true

/*
 * Note that SoundManager will determine and append the appropriate .SWF file to the URL,
 * eg. /path/to/sm2-flash-files/soundmanager2.swf automatically.
 *
 * Bonus: Read up on HTML5 audio support, if you're feeling adventurous.
 * iPad/iPhone and devices without flash installed will always attempt to use it.
 *
 * Also, See the flashblock demo when you want to start getting fancy.
*/

// disable debug mode after development/testing..
soundManager.debugMode = false;

// The basics: onready() callback

soundManager.onready(function(){
  init();
});

// Optional: ontimeout() callback for handling start-up failure

soundManager.ontimeout(function(){
  alert('There was a problem loading sound. Are your plugins disabled?');
  init();
});