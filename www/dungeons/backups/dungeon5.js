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
ace.dungeons['5'] = new ace.Dungeon('dungeons/dungeon' + '5' + '.png');
ace.dungeons['5'].name = 'Dungeon' + '5';


//-------------------------------------------------
// Entry room.
//-------------------------------------------------
room = ace.dungeons['5'].addRoom(2,0);
room.addActor('CaveExit', 2*256+128, 0, {teleportTo: [2936,1334, -16]});

