/**
 * @fileoverview  Create dungeon.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Setup calls for dungeon.
 * @type {ace.Dungeon}
 */
ace.dungeons = ace.dungeons || {};
var dungeon = new ace.Dungeon('dungeons/dungeon6.png');
ace.dungeons['6'] = dungeon;
ace.dungeons['6'].name = 'Dungeon6';
 
 

//-------------------------------------------------
// Room 0,0
//-------------------------------------------------
var room = dungeon.addRoom(0,0);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',232,88);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 1*256+128, 0, {teleportTo: [645,982, -16]});
room.addActor('Block',56,120,{type:'tan'});
room.addActor('Block',56,56,{type:'tan'});
room.addActor('Block',72,120,{type:'tan'});
room.addActor('Block',72,56,{type:'tan'});
room.addActor('Block',120,88,{type:'tan'});
room.addActor('Block',136,88,{type:'tan'});
room.addActor('Wizzrobe',152,88);
room.addActor('Wizzrobe',168,88);
room.addActor('Block',184,120,{type:'tan'});
room.addActor('Wizzrobe',184,88);
room.addActor('Block',184,56,{type:'tan'});
room.addActor('Block',200,120,{type:'tan'});
room.addActor('Wizzrobe',200,88);
room.addActor('Block',200,56,{type:'tan'});


//-------------------------------------------------
// Room 0,1
//-------------------------------------------------
var room = dungeon.addRoom(0,1);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Zol',56,296);
room.addActor('Block',72,280,{type:'tan'});
room.addActor('Block',72,264,{type:'tan'});
room.addActor('Block',72,248,{type:'tan'});
room.addActor('Zol',88,312);
room.addActor('Block',88,280,{type:'tan'});
room.addActor('Block',88,264,{type:'tan'});
room.addActor('Block',88,248,{type:'tan'});
room.addActor('Zol',104,280);
room.addActor('Zol',136,248);
room.addActor('Zol',152,280);
room.addActor('Block',168,280,{type:'tan'});
room.addActor('Block',168,264,{type:'tan'});
room.addActor('Block',168,248,{type:'tan'});
room.addActor('Block',184,280,{type:'tan'});
room.addActor('Block',184,264,{type:'tan'});
room.addActor('Block',184,248,{type:'tan'});


//-------------------------------------------------
// Room 0,2
//-------------------------------------------------
var room = dungeon.addRoom(0,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',128,504);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Statue',40,488,{type:'leftred'});
room.addActor('Statue',40,392,{type:'leftred'});
room.addActor('Keese',56,472);
room.addActor('Keese',88,424);
room.addActor('Keese',104,456);
room.addActor('SecretKey',136,440);
room.addActor('Keese',136,424);
room.addActor('Keese',152,456);
room.addActor('Keese',168,488);
room.addActor('Keese',168,424);
room.addActor('Keese',200,472);


//-------------------------------------------------
// Room 0,3
//-------------------------------------------------
var room = dungeon.addRoom(0,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',56,616,{type:'tan'});
room.addActor('Block',72,632,{type:'tan'});
room.addActor('Block',72,600,{type:'tan'});
room.addActor('Block',184,632,{type:'tan'});
room.addActor('Block',184,600,{type:'tan'});
room.addActor('Block',200,616,{type:'tan'});


//-------------------------------------------------
// Room 0,4
//-------------------------------------------------
var room = dungeon.addRoom(0,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',128,856);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',128,728);
room.addActor('Bubble',88,776);
room.addActor('LikeLike',104,808);
room.addActor('Block',104,792,{type:'tan'});
room.addActor('WizzrobeBlue',136,792);
room.addActor('WizzrobeBlue',152,808);
room.addActor('Block',152,792,{type:'tan'});
room.addActor('LikeLike',168,840);
room.addActor('LikeLike',200,824);


//-------------------------------------------------
// Room 0,5
//-------------------------------------------------
var room = dungeon.addRoom(0,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',232,968);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',128,904);
room.addActor('Block',56,1000,{type:'tan'});
room.addActor('Block',56,968,{type:'tan'});
room.addActor('Block',56,936,{type:'tan'});
room.addActor('Block',88,1000,{type:'tan'});
room.addActor('Block',88,968,{type:'tan'});
room.addActor('Block',88,936,{type:'tan'});
room.addActor('Wizzrobe',104,920);
room.addActor('WizzrobeBlue',120,1016);
room.addActor('Block',120,1000,{type:'tan'});
room.addActor('WizzrobeBlue',120,984);
room.addActor('Block',120,968,{type:'tan'});
room.addActor('WizzrobeBlue',120,952);
room.addActor('Block',120,936,{type:'tan'});
room.addActor('Block',136,1000,{type:'tan'});
room.addActor('Block',136,968,{type:'tan'});
room.addActor('Block',136,936,{type:'tan'});
room.addActor('Wizzrobe',152,920);
room.addActor('Block',168,1000,{type:'tan'});
room.addActor('Block',168,968,{type:'tan'});
room.addActor('Block',168,936,{type:'tan'});
room.addActor('Block',200,1000,{type:'tan'});
room.addActor('Block',200,968,{type:'tan'});
room.addActor('Block',200,936,{type:'tan'});


//-------------------------------------------------
// Room 0,6
//-------------------------------------------------
var room = dungeon.addRoom(0,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',232,1144);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',128,1080);
room.addActor('Block',40,1192,{type:'tan'});
room.addActor('Block',40,1176,{type:'tan'});
room.addActor('Block',40,1160,{type:'tan'});
room.addActor('Block',56,1192,{type:'tan'});
room.addActor('Block',56,1176,{type:'tan'});
room.addActor('Block',56,1160,{type:'tan'});
room.addActor('Block',72,1192,{type:'tan'});
room.addActor('Block',72,1176,{type:'tan'});
room.addActor('Block',72,1112,{type:'tan'});
room.addActor('Block',88,1192,{type:'tan'});
room.addActor('Block',88,1176,{type:'tan'});
room.addActor('Block',104,1192,{type:'tan'});
room.addActor('Gleeok',128,1176);
room.addActor('Block',152,1192,{type:'tan'});
room.addActor('Block',168,1192,{type:'tan'});
room.addActor('Block',168,1176,{type:'tan'});
room.addActor('Block',184,1192,{type:'tan'});
room.addActor('Block',184,1176,{type:'tan'});
room.addActor('Block',184,1112,{type:'tan'});
room.addActor('Block',200,1192,{type:'tan'});
room.addActor('Block',200,1176,{type:'tan'});
room.addActor('Block',200,1160,{type:'tan'});
room.addActor('Block',216,1192,{type:'tan'});
room.addActor('Block',216,1176,{type:'tan'});
room.addActor('Block',216,1160,{type:'tan'});


//-------------------------------------------------
// Room 1,0
//-------------------------------------------------
var room = dungeon.addRoom(1,0);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',280,88);
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('CaveExit', 1*256+128, 0, {teleportTo: [645,982, -16]});
room.addActor('OldMan', 1*256+128, 90, {'text1': ace.UNDER_CONSTRUCTION_MESSAGE });

room.addActor('Statue',312,120,{type:'leftred'});
room.addActor('Statue',312,88,{type:'leftred'});
room.addActor('Statue',312,56,{type:'leftred'});
room.addActor('Statue',360,120,{type:'leftred'});
room.addActor('Statue',360,88,{type:'leftred'});
room.addActor('Statue',360,56,{type:'leftred'});

room.addActor('Statue',312+6*16,120,{type:'rightred'});
room.addActor('Statue',312+6*16,88,{type:'rightred'});
room.addActor('Statue',312+6*16,56,{type:'rightred'});
room.addActor('Statue',360+6*16,120,{type:'rightred'});
room.addActor('Statue',360+6*16,88,{type:'rightred'});
room.addActor('Statue',360+6*16,56,{type:'rightred'});


//-------------------------------------------------
// Room 1,4
//-------------------------------------------------
var room = dungeon.addRoom(1,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',488,792);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',384,856);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Vire',344,808);
room.addActor('Vire',344,744);
room.addActor('Vire',360,776);
room.addActor('Vire',376,792);
room.addActor('Vire',408,776);
room.addActor('Water',424,840);
room.addActor('Water',424,824);
room.addActor('Water',424,808);
room.addActor('Water',424,792);
room.addActor('Water',424,776);
room.addActor('Water',424,760);
room.addActor('Water',424,744);


//-------------------------------------------------
// Room 1,5
//-------------------------------------------------
var room = dungeon.addRoom(1,5);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',280,968);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',384,1032);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Wizzrobe',296,920);
room.addActor('Water',312,1000);
room.addActor('Water',312,984);
room.addActor('Water',312,968);
room.addActor('Water',312,952);
room.addActor('Water',312,936);
room.addActor('Water',328,1000);
room.addActor('Water',328,936);
room.addActor('WizzrobeBlue',344,1016);
room.addActor('Water',344,1000);
room.addActor('Wizzrobe',344,968);
room.addActor('Water',344,936);
room.addActor('Water',360,1000);
room.addActor('Water',360,936);
room.addActor('Water',376,1000);
room.addActor('WizzrobeBlue',376,984);
room.addActor('Water',376,936);
room.addActor('Water',392,1000);
room.addActor('SecretKey',392,968);
room.addActor('Water',392,936);
room.addActor('Water',408,1000);
room.addActor('Water',408,936);
room.addActor('Water',424,1000);
room.addActor('Water',424,936);
room.addActor('Water',440,1000);
room.addActor('Water',440,936);
room.addActor('Water',456,1000);
room.addActor('Water',456,984);
room.addActor('Water',456,968);
room.addActor('Water',456,952);
room.addActor('Water',456,936);


//-------------------------------------------------
// Room 1,6
//-------------------------------------------------
var room = dungeon.addRoom(1,6);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',384,1208);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',384,1080);
room.addActor('Zol',312,1176);
room.addActor('LikeLike',344,1192);
room.addActor('LikeLike',344,1128);
room.addActor('Map',392,1144);
room.addActor('Bubble',392,1112);
room.addActor('Bubble',408,1160);
room.addActor('Water',424,1192);
room.addActor('Water',424,1176);
room.addActor('Water',424,1160);
room.addActor('Water',424,1144);
room.addActor('Water',424,1128);
room.addActor('Water',424,1112);
room.addActor('Water',424,1096);
room.addActor('Zol',456,1176);


//-------------------------------------------------
// Room 1,7
//-------------------------------------------------
var room = dungeon.addRoom(1,7);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',488,1320);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',384,1256);
room.addActor('WizzrobeBlue',312,1352);
room.addActor('Block',360,1320,{type:'tan'});
room.addActor('Wizzrobe',376,1320);
room.addActor('Wizzrobe',376,1304);
room.addActor('Block',408,1320,{type:'tan'});
room.addActor('WizzrobeBlue',424,1368);
room.addActor('WizzrobeBlue',424,1304);
room.addActor('Stairs',456,1368,{type:'wand'});
room.addActor('Stairs',472,1368,{type:'ladder'});


//-------------------------------------------------
// Room 2,0
//-------------------------------------------------
var room = dungeon.addRoom(2,0);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',640,152);
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 1*256+128, 0, {teleportTo: [645,982, -16]});
room.addActor('SecretKey',648,88);
room.addActor('Wizzrobe',712,88);
room.addActor('Wizzrobe',728,88);


//-------------------------------------------------
// Room 2,1
//-------------------------------------------------
var room = dungeon.addRoom(2,1);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',640,200);
room.addActor('Fire',592,280);
room.addActor('OldMan',640,272);
room.addActor('Fire',688,280);


//-------------------------------------------------
// Room 2,4
//-------------------------------------------------
var room = dungeon.addRoom(2,4);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Wizzrobe',584,792);
room.addActor('LikeLike',600,840);
room.addActor('Wizzrobe',600,792);
room.addActor('Block',632,792,{type:'tan'});
room.addActor('Bubble',648,776);
room.addActor('LikeLike',680,808);
room.addActor('WizzrobeBlue',680,776);
room.addActor('WizzrobeBlue',712,824);
room.addActor('LikeLike',712,760);
room.addActor('Stairs',728,840,{type:'ladder'});


//-------------------------------------------------
// Room 2,6
//-------------------------------------------------
var room = dungeon.addRoom(2,6);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Water',552,1160);
room.addActor('Water',568,1160);
room.addActor('Water',584,1160);
room.addActor('Water',600,1160);
room.addActor('Water',616,1160);
room.addActor('Wizzrobe',632,1176);
room.addActor('Water',632,1160);
room.addActor('Wizzrobe',632,1128);
room.addActor('Water',648,1160);
room.addActor('SecretKey',648,1144);
room.addActor('Water',664,1160);
room.addActor('Water',680,1160);
room.addActor('Water',696,1160);
room.addActor('Water',712,1160);
room.addActor('Water',728,1160);


//-------------------------------------------------
// Room 2,7
//-------------------------------------------------
var room = dungeon.addRoom(2,7);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',536,1320);
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',744,1320);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',640,1256);
room.addActor('Zol',600,1368);
room.addActor('LikeLike',600,1272);
room.addActor('Block',616,1320,{type:'tan'});
room.addActor('LikeLike',648,1336);
room.addActor('Block',664,1320,{type:'tan'});
room.addActor('Bubble',712,1352);
room.addActor('Bubble',712,1288);
room.addActor('Zol',728,1320);


//-------------------------------------------------
// Room 3,6
//-------------------------------------------------
var room = dungeon.addRoom(3,6);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',896,1208);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Wizzrobe',840,1192);
room.addActor('Block',840,1176,{type:'tan'});
room.addActor('Block',840,1112,{type:'tan'});
room.addActor('LikeLike',856,1160);
room.addActor('WizzrobeBlue',856,1112);
room.addActor('LikeLike',872,1128);
room.addActor('Wizzrobe',888,1144);
room.addActor('Bubble',936,1160);
room.addActor('WizzrobeBlue',936,1112);
room.addActor('Bubble',936,1096);
room.addActor('Block',952,1176,{type:'tan'});
room.addActor('Block',952,1112,{type:'tan'});


//-------------------------------------------------
// Room 3,7
//-------------------------------------------------
var room = dungeon.addRoom(3,7);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',792,1320);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Fire',848,1336);
room.addActor('OldMan',896,1328);
room.addActor('OldMan',944,1344);
room.addActor('Fire',944,1336);


//-------------------------------------------------
// Room 4,4
//-------------------------------------------------
var room = dungeon.addRoom(4,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',1152,856);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Water',1064,840);
room.addActor('Water',1064,824);
room.addActor('Water',1064,808);
room.addActor('Water',1064,776);
room.addActor('Water',1064,760);
room.addActor('Water',1064,744);
room.addActor('Water',1080,840);
room.addActor('WizzrobeBlue',1080,760);
room.addActor('Water',1080,744);
room.addActor('Water',1096,840);
room.addActor('Water',1096,808);
room.addActor('Water',1096,792);
room.addActor('Water',1096,776);
room.addActor('Water',1096,760);
room.addActor('Water',1096,744);
room.addActor('Water',1112,840);
room.addActor('Water',1112,744);
room.addActor('Water',1128,840);
room.addActor('Water',1128,824);
room.addActor('Water',1128,808);
room.addActor('Water',1128,792);
room.addActor('Water',1128,776);
room.addActor('Water',1128,744);
room.addActor('Wizzrobe',1144,808);
room.addActor('Water',1144,776);
room.addActor('Water',1160,808);
room.addActor('WizzrobeBlue',1160,792);
room.addActor('Water',1176,840);
room.addActor('WizzrobeBlue',1176,808);
room.addActor('Water',1176,792);
room.addActor('Water',1176,776);
room.addActor('Water',1176,760);
room.addActor('Water',1176,744);
room.addActor('Water',1192,840);
room.addActor('Water',1192,744);
room.addActor('Water',1208,840);
room.addActor('Water',1208,824);
room.addActor('Water',1208,808);
room.addActor('Water',1208,792);
room.addActor('Water',1208,776);
room.addActor('Water',1208,744);
room.addActor('Water',1224,840);
room.addActor('Water',1224,744);
room.addActor('Water',1240,840);
room.addActor('Water',1240,824);
room.addActor('Water',1240,808);
room.addActor('Water',1240,776);
room.addActor('Water',1240,760);
room.addActor('Water',1240,744);


//-------------------------------------------------
// Room 4,5
//-------------------------------------------------
var room = dungeon.addRoom(4,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',1152,1032);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('WizzrobeBlue',1064,968);
room.addActor('Wizzrobe',1096,968);
room.addActor('WizzrobeBlue',1192,1016);
room.addActor('Wizzrobe',1224,968);


//-------------------------------------------------
// Room 4,6
//-------------------------------------------------
var room = dungeon.addRoom(4,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',1152,1208);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Statue',1064,1096,{type:'lefttan'});
room.addActor('Block',1080,1144,{type:'tan'});
room.addActor('Block',1112,1112,{type:'tan'});
room.addActor('SecretHeartContainer',1160,1144);
room.addActor('Block',1192,1112,{type:'tan'});
room.addActor('Block',1224,1144,{type:'tan'});
room.addActor('Statue',1240,1096,{type:'righttan'});


//-------------------------------------------------
// Room 4,7
//-------------------------------------------------
var room = dungeon.addRoom(4,7);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',1080,1352,{type:'tan'});
room.addActor('Block',1080,1336,{type:'tan'});
room.addActor('Block',1080,1320,{type:'tan'});
room.addActor('Block',1080,1304,{type:'tan'});
room.addActor('Block',1080,1288,{type:'tan'});
room.addActor('Block',1096,1352,{type:'tan'});
room.addActor('Block',1096,1288,{type:'tan'});
room.addActor('Block',1112,1352,{type:'tan'});
room.addActor('Statue',1112,1320,{type:'lefttan'});
room.addActor('Block',1112,1288,{type:'tan'});
room.addActor('Block',1128,1352,{type:'tan'});
room.addActor('Statue',1128,1336,{type:'lefttan'});
room.addActor('Block',1128,1288,{type:'tan'});
room.addActor('Block',1144,1352,{type:'tan'});
room.addActor('TriforcePiece',1152,1312);
room.addActor('Block',1160,1352,{type:'tan'});
room.addActor('Block',1176,1352,{type:'tan'});
room.addActor('Statue',1176,1336,{type:'righttan'});
room.addActor('Block',1176,1288,{type:'tan'});
room.addActor('Block',1192,1352,{type:'tan'});
room.addActor('Statue',1192,1320,{type:'righttan'});
room.addActor('Block',1192,1288,{type:'tan'});
room.addActor('Block',1208,1352,{type:'tan'});
room.addActor('Block',1208,1288,{type:'tan'});
room.addActor('Block',1224,1352,{type:'tan'});
room.addActor('Block',1224,1336,{type:'tan'});
room.addActor('Block',1224,1320,{type:'tan'});
room.addActor('Block',1224,1304,{type:'tan'});
room.addActor('Block',1224,1288,{type:'tan'});


//-------------------------------------------------
// Room 5,5
//-------------------------------------------------
var room = dungeon.addRoom(5,5);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Bubble',1368,984);
room.addActor('Bubble',1368,920);
room.addActor('Vire',1384,952);
room.addActor('Vire',1400,968);
room.addActor('SecretKey',1416,968);
room.addActor('Vire',1432,952);
room.addActor('Water',1448,1016);
room.addActor('Water',1448,1000);
room.addActor('Water',1448,984);
room.addActor('Water',1448,968);
room.addActor('Water',1448,952);
room.addActor('Water',1448,936);
room.addActor('Water',1448,920);


//-------------------------------------------------
// Room 5,6
//-------------------------------------------------
var room = dungeon.addRoom(5,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Zol',1336,1176);
room.addActor('LikeLike',1336,1112);
room.addActor('Zol',1368,1160);
room.addActor('Bubble',1368,1128);
room.addActor('Bubble',1432,1128);
room.addActor('Block',1448,1192,{type:'tan'});
room.addActor('Block',1448,1176,{type:'tan'});
room.addActor('LikeLike',1448,1160);
room.addActor('Block',1448,1112,{type:'tan'});
room.addActor('Block',1448,1096,{type:'tan'});
room.addActor('Block',1464,1192,{type:'tan'});
room.addActor('Block',1464,1176,{type:'tan'});
room.addActor('Block',1464,1160,{type:'tan'});
room.addActor('Block',1464,1128,{type:'tan'});
room.addActor('Block',1464,1112,{type:'tan'});
room.addActor('Block',1464,1096,{type:'tan'});
room.addActor('Block',1480,1192,{type:'tan'});
room.addActor('Block',1480,1176,{type:'tan'});
room.addActor('Block',1480,1160,{type:'tan'});
room.addActor('Block',1480,1128,{type:'tan'});
room.addActor('Block',1480,1112,{type:'tan'});
room.addActor('Block',1480,1096,{type:'tan'});
room.addActor('Block',1496,1192,{type:'tan'});
room.addActor('Block',1496,1176,{type:'tan'});
room.addActor('Block',1496,1160,{type:'tan'});
room.addActor('Stairs',1496,1144,{type:'ladder'});
room.addActor('Block',1496,1128,{type:'tan'});
room.addActor('Block',1496,1112,{type:'tan'});
room.addActor('Block',1496,1096,{type:'tan'});
