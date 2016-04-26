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
ace.dungeons['4'] = new ace.Dungeon('dungeons/dungeon' + '4' + '.png');
ace.dungeons['4'].name = 'Dungeon' + '4';


//-------------------------------------------------
// Entry room.
//-------------------------------------------------
room = ace.dungeons['4'].addRoom(2,0);
room.addActor('CaveExit', 2*256+128, 0, {teleportTo: [1417,625, -16]});

