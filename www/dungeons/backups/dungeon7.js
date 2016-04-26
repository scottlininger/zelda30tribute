//  Copyright: Copyright Scott Lininger.
//  License: All Rights Reserved.

/**
 * @fileoverview  Create dungeon.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Setup calls for dungeon.
 * @type {ace.Dungeon}
 */
ace.dungeons = ace.dungeons || {};
ace.dungeons['7'] = new ace.Dungeon('dungeons/dungeon' + '7' + '.png');
ace.dungeons['7'].name = 'Dungeon' + '7';


//-------------------------------------------------
// Entry room.
//-------------------------------------------------
room = ace.dungeons['7'].addRoom(1,0);
room.addActor('CaveExit', 1*256+128, 0, {teleportTo: [628,602,0]});

