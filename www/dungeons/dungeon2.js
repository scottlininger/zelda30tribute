/**
 * @fileoverview  Create dungeon.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Setup calls for dungeon.
 * @type {ace.Dungeon}
 */
ace.dungeons = ace.dungeons || {};
var dungeon = new ace.Dungeon('dungeons/dungeon2.png');
ace.dungeons['2'] = dungeon;
ace.dungeons['2'].name = 'Dungeon2';
 
 

//-------------------------------------------------
// Room 1,1
//-------------------------------------------------
var room = dungeon.addRoom(1,1);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Rope',312,296);
room.addActor('Rope',312,232);
room.addActor('Rope',344,280); 
room.addActor('Rope',344,248);
room.addActor('Rope',376,280);
room.addActor('Rope',376,248);
room.addActor('SecretKey',392,264);


//-------------------------------------------------
// Room 2,0
//-------------------------------------------------
var room = dungeon.addRoom(2,0);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('CaveExit', 2*256+128, 0, {teleportTo: [3192,810, -16]});
room.addActor('Statue',568,120,{type:'leftred'});
room.addActor('Statue',568,88,{type:'leftred'});
room.addActor('Statue',568,56,{type:'leftred'});
room.addActor('Statue',616,120,{type:'leftred'});
room.addActor('Statue',616,88,{type:'leftred'});
room.addActor('Statue',616,56,{type:'leftred'});
room.addActor('Statue',664,120,{type:'rightred'});
room.addActor('Statue',664,88,{type:'rightred'});
room.addActor('Statue',664,56,{type:'rightred'});
room.addActor('Statue',712,120,{type:'rightred'});
room.addActor('Statue',712,88,{type:'rightred'});
room.addActor('Statue',712,56,{type:'rightred'});


//-------------------------------------------------
// Room 2,1
//-------------------------------------------------
var room = dungeon.addRoom(2,1);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',536,264);
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Rope',552,264);
room.addActor('Rope',568,296);
room.addActor('Rope',568,232);
room.addActor('Block',584,296,{type:'blue'});
room.addActor('Block',584,232,{type:'blue'});
room.addActor('Rope',600,280);
room.addActor('Rope',680,216);
room.addActor('Block',696,296,{type:'blue'});
room.addActor('Block',696,232,{type:'blue'});


//-------------------------------------------------
// Room 2,7
//-------------------------------------------------
var room = dungeon.addRoom(2,7);
room.isCompassPoint = true;
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Block',568,1352,{type:'blue'});
room.addActor('Block',568,1336,{type:'blue'});
room.addActor('Block',568,1320,{type:'blue'});
room.addActor('Block',568,1304,{type:'blue'});
room.addActor('Block',568,1288,{type:'blue'});
room.addActor('Block',584,1352,{type:'blue'});
room.addActor('Block',584,1288,{type:'blue'});
room.addActor('Block',600,1352,{type:'blue'});
room.addActor('Statue',600,1320,{type:'leftblue'});
room.addActor('Block',600,1288,{type:'blue'});
room.addActor('Block',616,1352,{type:'blue'});
room.addActor('Statue',616,1336,{type:'leftblue'});
room.addActor('Block',616,1288,{type:'blue'});
room.addActor('Block',632,1352,{type:'blue'});
room.addActor('TriforcePiece',640,1312, {teleportTo: [3192,810, -16]});
room.addActor('Block',648,1352,{type:'blue'});
room.addActor('Block',664,1352,{type:'blue'});
room.addActor('Statue',664,1336,{type:'rightblue'});
room.addActor('Block',664,1288,{type:'blue'});
room.addActor('Block',680,1352,{type:'blue'});
room.addActor('Statue',680,1320,{type:'rightblue'});
room.addActor('Block',680,1288,{type:'blue'});
room.addActor('Block',696,1352,{type:'blue'});
room.addActor('Block',696,1288,{type:'blue'});
room.addActor('Block',712,1352,{type:'blue'});
room.addActor('Block',712,1336,{type:'blue'});
room.addActor('Block',712,1320,{type:'blue'});
room.addActor('Block',712,1304,{type:'blue'});
room.addActor('Block',712,1288,{type:'blue'});


//-------------------------------------------------
// Room 3,0
//-------------------------------------------------
var room = dungeon.addRoom(3,0);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 2*256+128, 0, {teleportTo: [3192,810, -16]});
room.addActor('Rope',888,88);
room.addActor('SecretKey',904,88);
room.addActor('Rope',920,120);
room.addActor('Rope',952,56);
room.addActor('Rope',984,88);
room.addActor('Rope',984,40);


//-------------------------------------------------
// Room 3,1
//-------------------------------------------------
var room = dungeon.addRoom(3,1);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',1000,264);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',824,296,{type:'blue'});
room.addActor('Block',824,264,{type:'blue'});
room.addActor('Block',824,232,{type:'blue'});
room.addActor('Block',856,296,{type:'blue'});
room.addActor('Block',856,264,{type:'blue'});
room.addActor('Block',856,232,{type:'blue'});
room.addActor('Block',888,296,{type:'blue'});
room.addActor('Block',888,264,{type:'blue'});
room.addActor('Block',888,232,{type:'blue'});
room.addActor('Block',904,296,{type:'blue'});
room.addActor('Block',904,264,{type:'blue'});
room.addActor('Block',904,232,{type:'blue'});
room.addActor('Rope',920,280);
room.addActor('Rope',936,312);
room.addActor('Block',936,296,{type:'blue'});
room.addActor('Block',936,264,{type:'blue'});
room.addActor('Rope',936,248);
room.addActor('Block',936,232,{type:'blue'});
room.addActor('Block',968,296,{type:'blue'});
room.addActor('Block',968,264,{type:'blue'});
room.addActor('Block',968,232,{type:'blue'});


//-------------------------------------------------
// Room 3,2
//-------------------------------------------------
var room = dungeon.addRoom(3,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',1000,440);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',824,472,{type:'blue'});
room.addActor('Block',824,408,{type:'blue'});
room.addActor('Block',840,472,{type:'blue'});
room.addActor('Block',840,408,{type:'blue'});
room.addActor('Goriya',856,488);
room.addActor('Goriya',856,424);
room.addActor('Goriya',872,456);
room.addActor('Block',888,440,{type:'blue'});
room.addActor('Block',904,440,{type:'blue'});
room.addActor('Goriya',920,456);
room.addActor('Goriya',936,488);
room.addActor('Block',952,472,{type:'blue'});
room.addActor('Block',952,408,{type:'blue'});
room.addActor('Block',968,472,{type:'blue'});
room.addActor('Block',968,408,{type:'blue'});


//-------------------------------------------------
// Room 3,3
//-------------------------------------------------
var room = dungeon.addRoom(3,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',896,552);
room.addActor('Block',840,632,{type:'blue'});
room.addActor('Block',840,600,{type:'blue'});
room.addActor('Rope',888,616);
room.addActor('SecretKey',904,616);
room.addActor('Rope',920,632);
room.addActor('Rope',936,664);
room.addActor('Rope',936,600);
room.addActor('Block',952,632,{type:'blue'});
room.addActor('Block',952,600,{type:'blue'});
room.addActor('Rope',968,648);


//-------------------------------------------------
// Room 3,4
//-------------------------------------------------
var room = dungeon.addRoom(3,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Moldorm',872,808);
room.addActor('Moldorm',904,840);
room.addActor('SecretKey',904,792);


//-------------------------------------------------
// Room 3,5
//-------------------------------------------------
var room = dungeon.addRoom(3,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',1000,968);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',896,1032);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Rope',824,1000);
room.addActor('Block',840,984,{type:'blue'});
room.addActor('Block',840,968,{type:'blue'});
room.addActor('Block',840,952,{type:'blue'});
room.addActor('Rope',856,1016);
room.addActor('Block',856,984,{type:'blue'});
room.addActor('Block',856,968,{type:'blue'});
room.addActor('Block',856,952,{type:'blue'});
room.addActor('Rope',872,984);
room.addActor('Rope',904,968);
room.addActor('Rope',920,984);
room.addActor('Rope',936,1016);
room.addActor('Block',936,984,{type:'blue'});
room.addActor('Block',936,968,{type:'blue'});
room.addActor('Block',936,952,{type:'blue'});
room.addActor('Block',952,984,{type:'blue'});
room.addActor('Block',952,968,{type:'blue'});
room.addActor('Block',952,952,{type:'blue'});
room.addActor('Rope',968,1000);


//-------------------------------------------------
// Room 3,6
//-------------------------------------------------
var room = dungeon.addRoom(3,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',1000,1144);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',896,1208);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',896,1080);
room.addActor('Block',824,1176,{type:'blue'});
room.addActor('Block',824,1144,{type:'blue'});
room.addActor('Block',824,1112,{type:'blue'});
room.addActor('Goriya',856,1192);
room.addActor('Block',856,1176,{type:'blue'});
room.addActor('Block',856,1144,{type:'blue'});
room.addActor('Goriya',856,1128);
room.addActor('Block',856,1112,{type:'blue'});
room.addActor('Goriya',872,1160);
room.addActor('Block',888,1176,{type:'blue'});
room.addActor('Block',888,1144,{type:'blue'});
room.addActor('Block',888,1112,{type:'blue'});
room.addActor('Block',904,1176,{type:'blue'});
room.addActor('Block',904,1144,{type:'blue'});
room.addActor('Block',904,1112,{type:'blue'});
room.addActor('Goriya',936,1192);
room.addActor('Block',936,1176,{type:'blue'});
room.addActor('Block',936,1144,{type:'blue'});
room.addActor('Goriya',936,1128);
room.addActor('Block',936,1112,{type:'blue'});
room.addActor('Block',968,1176,{type:'blue'});
room.addActor('Block',968,1144,{type:'blue'});
room.addActor('Block',968,1112,{type:'blue'});
room.addActor('SecretBomb',984,1192);


//-------------------------------------------------
// Room 3,7
//-------------------------------------------------
var room = dungeon.addRoom(3,7);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',792,1320);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Dodongo',872,1304);
room.addActor('SecretHeartContainer',904,1320);


//-------------------------------------------------
// Room 4,1
//-------------------------------------------------
var room = dungeon.addRoom(4,1);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',1048,264);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1152,328);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Gel',1112,312);
room.addActor('Gel',1112,216);
room.addActor('Block',1144,280,{type:'blue'});
room.addActor('Block',1144,264,{type:'blue'});
room.addActor('Block',1144,248,{type:'blue'});
room.addActor('Block',1160,280,{type:'blue'});
room.addActor('Block',1160,264,{type:'blue'});
room.addActor('Block',1160,248,{type:'blue'});
room.addActor('Gel',1192,280);
room.addActor('Gel',1192,248);
room.addActor('Gel',1224,296);
room.addActor('Compass',1240,312);
room.addActor('Gel',1240,264);


//-------------------------------------------------
// Room 4,2
//-------------------------------------------------
var room = dungeon.addRoom(4,2);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',1048,440);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1152,504);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1152,376);
room.addActor('Block',1096,472,{type:'blue'});
room.addActor('Block',1096,408,{type:'blue'});
room.addActor('Map',1160,440);
room.addActor('Gel',1192,456);
room.addActor('Gel',1192,424);
room.addActor('Block',1208,472,{type:'blue'});
room.addActor('Block',1208,408,{type:'blue'});
room.addActor('Gel',1224,472);
room.addActor('Gel',1224,408);
room.addActor('Gel',1240,440);


//-------------------------------------------------
// Room 4,3
//-------------------------------------------------
var room = dungeon.addRoom(4,3);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1152,680);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1152,552);
room.addActor('Statue',1064,664,{type:'leftblue',shootsFireballs:true});
room.addActor('Statue',1064,568,{type:'leftblue',shootsFireballs:true});
room.addActor('MagicalBoomerang',1160,616);
room.addActor('GoriyaBlue',1192,632);
room.addActor('GoriyaBlue',1192,600);
room.addActor('GoriyaBlue',1224,648);
room.addActor('Statue',1240,664,{type:'rightblue',shootsFireballs:true});
room.addActor('Statue',1240,568,{type:'rightblue',shootsFireballs:true});


//-------------------------------------------------
// Room 4,4
//-------------------------------------------------
var room = dungeon.addRoom(4,4);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1152,856);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1152,728);
room.addActor('Trap',1064,840);
room.addActor('Trap',1064,744);
room.addActor('Keese',1112,840);
room.addActor('Keese',1112,744);
room.addActor('Keese',1160,808);
room.addActor('SecretBomb',1160,792);
room.addActor('Trap',1240,840);
room.addActor('Keese',1240,792);
room.addActor('Trap',1240,744);


//-------------------------------------------------
// Room 4,5
//-------------------------------------------------
var room = dungeon.addRoom(4,5);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',1048,968);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1152,904);
room.addActor('Gel',1096,1016);
room.addActor('Gel',1096,936);
room.addActor('SecretRupee',1160,968);
room.addActor('Gel',1208,1000);
room.addActor('Gel',1224,984);
room.addActor('Gel',1224,920);


//-------------------------------------------------
// Room 4,6
//-------------------------------------------------
var room = dungeon.addRoom(4,6);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1048,1144);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Fire',1104,1160);
room.addActor('OldMan',1152,1160, {'text1': "DODONGO DISLIKES SMOKE."});
room.addActor('Fire',1200,1160);
