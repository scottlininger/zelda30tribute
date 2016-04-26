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
ace.dungeons['6'] = new ace.Dungeon('dungeons/dungeon' + '6' + '.png');
ace.dungeons['6'].name = 'Dungeon' + '6';


//-------------------------------------------------
// Entry room.
//-------------------------------------------------
room = ace.dungeons['6'].addRoom(1,0);
room.addActor('CaveExit', 1*256+128, 0, {teleportTo: [645,982, -16]});

