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
ace.dungeons['8'] = new ace.Dungeon('dungeons/dungeon' + '8' + '.png');
ace.dungeons['8'].name = 'Dungeon' + '8';


//-------------------------------------------------
// Entry room.
//-------------------------------------------------
room = ace.dungeons['8'].addRoom(3,0);
room.addActor('CaveExit', 3*256+128, 0, {teleportTo: [3475,312,0]});


