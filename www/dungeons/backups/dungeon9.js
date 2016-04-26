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
ace.dungeons['9'] = new ace.Dungeon('dungeons/dungeon' + '9' + '.png');
ace.dungeons['9'].name = 'Dungeon' + '9';


//-------------------------------------------------
// Entry room.
//-------------------------------------------------
room = ace.dungeons['9'].addRoom(6,0);
room.addActor('CaveExit', 6*256+128, 0, {teleportTo: [1365,1299, -16]});

