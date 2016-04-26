//  Copyright: Copyright Scott Lininger.
//  License: All Rights Reserved.

/**
 * @fileoverview  Create dungeon.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Setup calls for dungeon 3.
 * @type {ace.Dungeon}
 */
ace.dungeons = ace.dungeons || {};
ace.dungeons['3'] = new ace.Dungeon('dungeons/dungeon' + '3' + '.png');
ace.dungeons['3'].name = 'Dungeon' + '3';


//-------------------------------------------------
// Entry room.
//-------------------------------------------------
room = ace.dungeons['3'].addRoom(3,0);
room.addActor('CaveExit', 3*256+128, 0, {teleportTo: [1157,107, -16]});

