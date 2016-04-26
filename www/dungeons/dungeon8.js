/**
 * @fileoverview  Create dungeon.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Setup calls for dungeon.
 * @type {ace.Dungeon}
 */
ace.dungeons = ace.dungeons || {};
var dungeon = new ace.Dungeon('dungeons/dungeon8.png');
ace.dungeons['8'] = dungeon;
ace.dungeons['8'].name = 'Dungeon8';
 
 

//-------------------------------------------------
// Room 0,3
//-------------------------------------------------
var room = dungeon.addRoom(0,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',232,616);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Darknut',56,584);
room.addActor('Darknut',88,632);
room.addActor('Darknut',88,568);
room.addActor('Statue',104,616,{type:'leftcyan'});
room.addActor('SecretKey',136,616);
room.addActor('Statue',152,616,{type:'rightcyan'});
room.addActor('Darknut',168,632);
room.addActor('Darknut',168,568);
room.addActor('Darknut',200,584);


//-------------------------------------------------
// Room 0,4
//-------------------------------------------------
var room = dungeon.addRoom(0,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',232,792);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Fire',80,808);
room.addActor('OldMan',128,800);
room.addActor('Fire',176,808);


//-------------------------------------------------
// Room 1,0
//-------------------------------------------------
var room = dungeon.addRoom(1,0);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 3*256+128, 0, {teleportTo: [3475,312,0]});
room.addActor('OldMan', 3*256+128, 90, {'text1': ace.UNDER_CONSTRUCTION_MESSAGE });

room.addActor('Gibdo',296,88);
room.addActor('Gibdo',312,120);
room.addActor('Bubble',312,56);
room.addActor('Bubble',344,104);
room.addActor('DarknutBlue',344,72);
room.addActor('Gibdo',360,120);
room.addActor('Block',360,88,{type:'gray'});
room.addActor('Block',376,104,{type:'gray'});
room.addActor('Block',376,72,{type:'gray'});
room.addActor('Block',392,120,{type:'gray'});
room.addActor('book',392,104);
room.addActor('Stairs',392,88);
room.addActor('Block',392,56,{type:'gray'});
room.addActor('Block',408,104,{type:'gray'});
room.addActor('Block',408,72,{type:'gray'});
room.addActor('Darknut',424,136);
room.addActor('Block',424,88,{type:'gray'});
room.addActor('Darknut',424,40);


//-------------------------------------------------
// Room 1,2
//-------------------------------------------------
var room = dungeon.addRoom(1,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Statue',296,488,{type:'leftgray'});
room.addActor('Statue',296,392,{type:'leftgray'});
room.addActor('Darknut',344,424);
room.addActor('Darknut',376,456);
room.addActor('Darknut',376,424);
room.addActor('SecretKey',392,440);
room.addActor('Statue',472,488,{type:'rightgray'});
room.addActor('Statue',472,392,{type:'rightgray'});


//-------------------------------------------------
// Room 1,3
//-------------------------------------------------
var room = dungeon.addRoom(1,3);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',280,616);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',384,680);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Block',312,648,{type:'gray'});
room.addActor('Block',312,632,{type:'gray'});
room.addActor('Block',312,616,{type:'gray'});
room.addActor('Block',312,600,{type:'gray'});
room.addActor('Block',312,584,{type:'gray'});
room.addActor('Block',328,648,{type:'gray'});
room.addActor('Block',328,584,{type:'gray'});
room.addActor('Block',344,648,{type:'gray'});
room.addActor('PolsVoice',344,600);
room.addActor('Block',344,584,{type:'gray'});
room.addActor('PolsVoice',344,568);
room.addActor('Block',360,648,{type:'gray'});
room.addActor('Block',360,584,{type:'gray'});
room.addActor('Block',376,648,{type:'gray'});
room.addActor('Block',376,616,{type:'gray'});
room.addActor('Block',376,584,{type:'gray'});
room.addActor('Block',392,648,{type:'gray'});
room.addActor('a',392,632);
room.addActor('Block',392,616,{type:'gray'});
room.addActor('Block',392,584,{type:'gray'});
room.addActor('Block',408,648,{type:'gray'});
room.addActor('Stairs',408,632);
room.addActor('Block',408,616,{type:'gray'});
room.addActor('Block',408,584,{type:'gray'});
room.addActor('Block',424,648,{type:'gray'});
room.addActor('Block',424,632,{type:'gray'});
room.addActor('Block',424,616,{type:'gray'});
room.addActor('PolsVoice',424,600);
room.addActor('Block',424,584,{type:'gray'});
room.addActor('PolsVoice',424,568);
room.addActor('Block',440,584,{type:'gray'});
room.addActor('Block',456,664,{type:'gray'});
room.addActor('Block',456,648,{type:'gray'});
room.addActor('Block',456,632,{type:'gray'});
room.addActor('Block',456,616,{type:'gray'});
room.addActor('Block',456,600,{type:'gray'});
room.addActor('Block',456,584,{type:'gray'});
room.addActor('SecretKey',472,664);


//-------------------------------------------------
// Room 1,4
//-------------------------------------------------
var room = dungeon.addRoom(1,4);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',280,792);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',384,856);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',384,728);
room.addActor('Block',296,840,{type:'gray'});
room.addActor('Block',296,824,{type:'gray'});
room.addActor('Block',296,808,{type:'gray'});
room.addActor('SecretHeartContainer',296,744);
room.addActor('Block',312,840,{type:'gray'});
room.addActor('Block',312,824,{type:'gray'});
room.addActor('Block',312,808,{type:'gray'});
room.addActor('Block',328,840,{type:'gray'});
room.addActor('Block',328,824,{type:'gray'});
room.addActor('Block',328,760,{type:'gray'});
room.addActor('Block',344,840,{type:'gray'});
room.addActor('Block',344,824,{type:'gray'});
room.addActor('Block',360,840,{type:'gray'});
room.addActor('Gleeok',384,824);
room.addActor('Block',408,840,{type:'gray'});
room.addActor('Block',424,840,{type:'gray'});
room.addActor('Block',424,824,{type:'gray'});
room.addActor('Block',440,840,{type:'gray'});
room.addActor('Block',440,824,{type:'gray'});
room.addActor('Block',440,760,{type:'gray'});
room.addActor('Block',456,840,{type:'gray'});
room.addActor('Block',456,824,{type:'gray'});
room.addActor('Block',456,808,{type:'gray'});
room.addActor('Block',472,840,{type:'gray'});
room.addActor('Block',472,824,{type:'gray'});
room.addActor('Block',472,808,{type:'gray'});


//-------------------------------------------------
// Room 1,5
//-------------------------------------------------
var room = dungeon.addRoom(1,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',312,1000,{type:'gray'});
room.addActor('Block',312,984,{type:'gray'});
room.addActor('Block',312,968,{type:'gray'});
room.addActor('Block',312,952,{type:'gray'});
room.addActor('Block',312,936,{type:'gray'});
room.addActor('Block',328,1000,{type:'gray'});
room.addActor('Block',328,936,{type:'gray'});
room.addActor('Block',344,1000,{type:'gray'});
room.addActor('Statue',344,968,{type:'leftgray'});
room.addActor('Block',344,936,{type:'gray'});
room.addActor('Block',360,1000,{type:'gray'});
room.addActor('Statue',360,984,{type:'leftgray'});
room.addActor('Block',360,936,{type:'gray'});
room.addActor('Block',376,1000,{type:'gray'});
room.addActor('TriforcePiece',384,960);
room.addActor('Block',392,1000,{type:'gray'});
room.addActor('Block',408,1000,{type:'gray'});
room.addActor('Statue',408,984,{type:'rightgray'});
room.addActor('Block',408,936,{type:'gray'});
room.addActor('Block',424,1000,{type:'gray'});
room.addActor('Statue',424,968,{type:'rightgray'});
room.addActor('Block',424,936,{type:'gray'});
room.addActor('Block',440,1000,{type:'gray'});
room.addActor('Block',440,936,{type:'gray'});
room.addActor('Block',456,1000,{type:'gray'});
room.addActor('Block',456,984,{type:'gray'});
room.addActor('Block',456,968,{type:'gray'});
room.addActor('Block',456,952,{type:'gray'});
room.addActor('Block',456,936,{type:'gray'});


//-------------------------------------------------
// Room 2,0
//-------------------------------------------------
var room = dungeon.addRoom(2,0);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',536,88);
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 3*256+128, 0, {teleportTo: [3475,312,0]});
room.addActor('Statue',616,88,{type:'leftcyan'});
room.addActor('Manhandla',632,120);
room.addActor('SecretRupee',648,88);
room.addActor('Patra',664,104);
room.addActor('Statue',664,88,{type:'rightcyan'});


//-------------------------------------------------
// Room 2,2
//-------------------------------------------------
var room = dungeon.addRoom(2,2);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('PolsVoice',552,440);
room.addActor('Block',552,392,{type:'gray'});
room.addActor('Block',568,472,{type:'gray'});
room.addActor('Block',568,408,{type:'gray'});
room.addActor('Block',584,488,{type:'gray'});
room.addActor('Block',584,424,{type:'gray'});
room.addActor('Gibdo',600,456);
room.addActor('Block',600,440,{type:'gray'});
room.addActor('Gibdo',600,424);
room.addActor('Block',616,456,{type:'gray'});
room.addActor('Block',632,472,{type:'gray'});
room.addActor('Keese',632,456);
room.addActor('Keese',632,424);
room.addActor('SecretKey',648,440);
room.addActor('Block',648,408,{type:'gray'});
room.addActor('Block',664,424,{type:'gray'});
room.addActor('PolsVoice',680,488);
room.addActor('Block',680,440,{type:'gray'});
room.addActor('Block',696,456,{type:'gray'});
room.addActor('Block',696,392,{type:'gray'});
room.addActor('Block',712,472,{type:'gray'});
room.addActor('Block',712,408,{type:'gray'});
room.addActor('Block',728,488,{type:'gray'});


//-------------------------------------------------
// Room 2,3
//-------------------------------------------------
var room = dungeon.addRoom(2,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',744,616);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',640,680);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Gohma',656,648);


//-------------------------------------------------
// Room 2,4
//-------------------------------------------------
var room = dungeon.addRoom(2,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Fire',592,808);
room.addActor('OldMan',640,800);
room.addActor('OldMan',656,816);
room.addActor('Fire',688,808);
room.addActor('OldMan',704,816);


//-------------------------------------------------
// Room 2,5
//-------------------------------------------------
var room = dungeon.addRoom(2,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',744,968);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Rupee',616,968);
room.addActor('Rupee',632,1000,{xOffset:8});
room.addActor('Rupee',632,984);
room.addActor('Rupee',632,968);
room.addActor('Rupee',632,952);
room.addActor('Rupee',632,936,{xOffset:8});
room.addActor('Rupee',648,984);
room.addActor('Rupee',648,968);
room.addActor('Rupee',648,952);
room.addActor('Rupee',664,968);


//-------------------------------------------------
// Room 2,6
//-------------------------------------------------
var room = dungeon.addRoom(2,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',744,1144);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',552,1096,{type:'gray'});
room.addActor('Block',568,1176,{type:'gray'});
room.addActor('Block',568,1112,{type:'gray'});
room.addActor('Block',584,1192,{type:'gray'});
room.addActor('Block',584,1128,{type:'gray'});
room.addActor('Block',600,1144,{type:'gray'});
room.addActor('PolsVoice',616,1176);
room.addActor('Block',616,1160,{type:'gray'});
room.addActor('Block',632,1176,{type:'gray'});
room.addActor('PolsVoice',632,1144);
room.addActor('SecretBomb',648,1144);
room.addActor('Block',648,1112,{type:'gray'});
room.addActor('Block',664,1128,{type:'gray'});
room.addActor('PolsVoice',664,1112);
room.addActor('PolsVoice',680,1176);
room.addActor('Block',680,1144,{type:'gray'});
room.addActor('PolsVoice',680,1128);
room.addActor('Block',696,1160,{type:'gray'});
room.addActor('Block',696,1096,{type:'gray'});
room.addActor('Block',712,1176,{type:'gray'});
room.addActor('Block',712,1112,{type:'gray'});
room.addActor('Block',728,1192,{type:'gray'});


//-------------------------------------------------
// Room 3,0
//-------------------------------------------------
var room = dungeon.addRoom(3,0);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('OldMan', 3*256+128, 90, {'text1': ace.UNDER_CONSTRUCTION_MESSAGE });

room.addActor('CaveExit', 3*256+128, 0, {teleportTo: [3475,312,0]});
room.addActor('Statue',824,120,{type:'leftcyan'});
room.addActor('Statue',824,88,{type:'leftcyan'});
room.addActor('Statue',824,56,{type:'leftcyan'});
room.addActor('Statue',872,120,{type:'leftcyan'});
room.addActor('Statue',872,88,{type:'leftcyan'});
room.addActor('Statue',872,56,{type:'leftcyan'});
room.addActor('Statue',920,120,{type:'rightcyan'});
room.addActor('Statue',920,88,{type:'rightcyan'});
room.addActor('Statue',920,56,{type:'rightcyan'});
room.addActor('Statue',968,120,{type:'rightcyan'});
room.addActor('Statue',968,88,{type:'rightcyan'});
room.addActor('Statue',968,56,{type:'rightcyan'});


//-------------------------------------------------
// Room 3,1
//-------------------------------------------------
var room = dungeon.addRoom(3,1);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',896,328);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('SecretRupee',904,264);
room.addActor('Manhandla',936,280);
room.addActor('Patra',968,264);


//-------------------------------------------------
// Room 3,2
//-------------------------------------------------
var room = dungeon.addRoom(3,2);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',792,440);
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',1000,440);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',896,504);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',896,376);
room.addActor('Statue',808,488,{type:'leftcyan'});
room.addActor('Statue',808,392,{type:'leftcyan'});
room.addActor('DarknutBlue',888,440);
room.addActor('SecretKey',904,440);
room.addActor('DarknutBlue',920,456);
room.addActor('DarknutBlue',936,488);
room.addActor('DarknutBlue',936,424);
room.addActor('DarknutBlue',968,472);
room.addActor('Statue',984,488,{type:'rightcyan'});
room.addActor('Statue',984,392,{type:'rightcyan'});


//-------------------------------------------------
// Room 3,3
//-------------------------------------------------
var room = dungeon.addRoom(3,3);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',792,616);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',896,680);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Gibdo',824,648);
room.addActor('Gibdo',856,664);
room.addActor('Gibdo',856,600);
room.addActor('Bubble',888,616);
room.addActor('SecretRupee',904,616);
room.addActor('Bubble',920,632);
room.addActor('DarknutBlue',936,664);
room.addActor('Darknut',936,600);
room.addActor('Darknut',968,648);


//-------------------------------------------------
// Room 3,4
//-------------------------------------------------
var room = dungeon.addRoom(3,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',1000,792);
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',896,856);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',896,728);
room.addActor('DarknutBlue',824,824);
room.addActor('Statue',872,792,{type:'leftcyan'});
room.addActor('DarknutBlue',920,808);
room.addActor('Statue',920,792,{type:'rightcyan'});
room.addActor('DarknutBlue',936,840);
room.addActor('DarknutBlue',936,776);
room.addActor('DarknutBlue',968,824);


//-------------------------------------------------
// Room 3,5
//-------------------------------------------------
var room = dungeon.addRoom(3,5);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',792,968);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',896,1032);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',896,904);
room.addActor('SecretMap',904,968);
room.addActor('Manhandla',936,984);


//-------------------------------------------------
// Room 3,6
//-------------------------------------------------
var room = dungeon.addRoom(3,6);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',792,1144);
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',1000,1144);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',896,1208);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',896,1080);
room.addActor('Statue',808,1192,{type:'leftcyan'});
room.addActor('Statue',808,1096,{type:'leftcyan'});
room.addActor('Gohma',896,1176);
room.addActor('Statue',984,1192,{type:'rightcyan'});
room.addActor('Statue',984,1096,{type:'rightcyan'});


//-------------------------------------------------
// Room 3,7
//-------------------------------------------------
var room = dungeon.addRoom(3,7);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',896,1256);
room.addActor('Darknut',824,1352);
room.addActor('Darknut',856,1368);
room.addActor('Darknut',856,1304);
room.addActor('SecretBomb',904,1320);
room.addActor('Darknut',936,1304);
room.addActor('Darknut',968,1352);


//-------------------------------------------------
// Room 4,0
//-------------------------------------------------
var room = dungeon.addRoom(4,0);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 3*256+128, 0, {teleportTo: [3475,312,0]});
room.addActor('Water',1064,136);
room.addActor('Water',1064,120);
room.addActor('Water',1064,104);
room.addActor('Water',1064,72);
room.addActor('Water',1064,56);
room.addActor('Water',1064,40);
room.addActor('Water',1080,136);
room.addActor('Water',1080,40);
room.addActor('Water',1096,136);
room.addActor('Water',1096,104);
room.addActor('Water',1096,88);
room.addActor('Water',1096,72);
room.addActor('Water',1096,40);
room.addActor('Water',1112,136);
room.addActor('Water',1112,104);
room.addActor('Water',1112,72);
room.addActor('Water',1112,40);
room.addActor('Water',1128,136);
room.addActor('Water',1128,120);
room.addActor('Water',1128,104);
room.addActor('Water',1128,72);
room.addActor('Water',1128,56);
room.addActor('Water',1128,40);
room.addActor('Water',1144,120);
room.addActor('Keese',1144,72);
room.addActor('Water',1144,56);
room.addActor('Water',1160,120);
room.addActor('Bubble',1160,104);
room.addActor('SecretKey',1160,88);
room.addActor('Zol',1160,72);
room.addActor('Water',1160,56);
room.addActor('Water',1176,136);
room.addActor('Water',1176,120);
room.addActor('Water',1176,104);
room.addActor('Water',1176,72);
room.addActor('Water',1176,56);
room.addActor('Water',1176,40);
room.addActor('Water',1192,136);
room.addActor('Water',1192,104);
room.addActor('Water',1192,72);
room.addActor('Water',1192,40);
room.addActor('Water',1208,136);
room.addActor('Water',1208,104);
room.addActor('Water',1208,88);
room.addActor('Water',1208,72);
room.addActor('Water',1208,40);
room.addActor('WaterAndKeese',1224,136);
room.addActor('Zol',1224,120);
room.addActor('Bubble',1224,56);
room.addActor('Water',1224,40);
room.addActor('Water',1240,136);
room.addActor('Water',1240,120);
room.addActor('WaterAndKeese',1240,104);
room.addActor('Bubble',1240,88);
room.addActor('Water',1240,72);
room.addActor('Water',1240,56);
room.addActor('Water',1240,40);


//-------------------------------------------------
// Room 4,2
//-------------------------------------------------
var room = dungeon.addRoom(4,2);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',1048,440);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Water',1064,456);
room.addActor('Water',1080,456);
room.addActor('Water',1096,456);
room.addActor('PolsVoice',1112,488);
room.addActor('Water',1112,456);
room.addActor('PolsVoice',1112,392);
room.addActor('Water',1128,456);
room.addActor('Water',1144,456);
room.addActor('Water',1160,456);
room.addActor('Compass',1160,440);
room.addActor('PolsVoice',1160,424);
room.addActor('Water',1176,456);
room.addActor('Water',1192,456);
room.addActor('PolsVoice',1192,424);
room.addActor('Water',1208,456);
room.addActor('PolsVoice',1224,472);
room.addActor('Water',1224,456);
room.addActor('PolsVoice',1224,408);
room.addActor('Water',1240,456);
room.addActor('PolsVoice',1240,440);


//-------------------------------------------------
// Room 4,4
//-------------------------------------------------
var room = dungeon.addRoom(4,4);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',1048,792);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Darknut',1112,840);
room.addActor('Darknut',1112,744);
room.addActor('Gibdo',1160,808);
room.addActor('SecretBomb',1160,792);
room.addActor('Gibdo',1160,776);
room.addActor('Block',1192,840,{type:'gray'});
room.addActor('Block',1192,824,{type:'gray'});
room.addActor('Gibdo',1192,808);
room.addActor('Bubble',1192,776);
room.addActor('Block',1192,760,{type:'gray'});
room.addActor('Block',1192,744,{type:'gray'});
room.addActor('Block',1208,840,{type:'gray'});
room.addActor('Block',1208,824,{type:'gray'});
room.addActor('Block',1208,808,{type:'gray'});
room.addActor('DarknutBlue',1208,792);
room.addActor('Block',1208,776,{type:'gray'});
room.addActor('Block',1208,760,{type:'gray'});
room.addActor('Block',1208,744,{type:'gray'});
room.addActor('Block',1224,840,{type:'gray'});
room.addActor('Block',1224,824,{type:'gray'});
room.addActor('Block',1224,808,{type:'gray'});
room.addActor('a',1224,792);
room.addActor('Block',1224,776,{type:'gray'});
room.addActor('Block',1224,760,{type:'gray'});
room.addActor('Block',1224,744,{type:'gray'});
room.addActor('Block',1240,840,{type:'gray'});
room.addActor('Block',1240,824,{type:'gray'});
room.addActor('Block',1240,808,{type:'gray'});
room.addActor('Stairs',1240,792);
room.addActor('Block',1240,776,{type:'gray'});
room.addActor('Block',1240,760,{type:'gray'});
room.addActor('Block',1240,744,{type:'gray'});


//-------------------------------------------------
// Room 4,6
//-------------------------------------------------
var room = dungeon.addRoom(4,6);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Darknut',1112,1192);
room.addActor('DarknutBlue',1112,1096);
room.addActor('Block',1128,1144,{type:'gray'});
room.addActor('Block',1144,1160,{type:'gray'});
room.addActor('Block',1144,1128,{type:'gray'});
room.addActor('Block',1160,1176,{type:'gray'});
room.addActor('Darknut',1160,1160);
room.addActor('Stairs',1160,1144);
room.addActor('PolsVoice',1160,1128);
room.addActor('Block',1160,1112,{type:'gray'});
room.addActor('Block',1176,1160,{type:'gray'});
room.addActor('Block',1176,1128,{type:'gray'});
room.addActor('Block',1192,1144,{type:'gray'});
room.addActor('PolsVoice',1224,1112);
room.addActor('DarknutBlue',1240,1144);
