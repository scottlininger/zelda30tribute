/**
 * @fileoverview  Create dungeon.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Setup calls for dungeon.
 * @type {ace.Dungeon}
 */
ace.dungeons = ace.dungeons || {};
var dungeon = new ace.Dungeon('dungeons/dungeon4.png');
ace.dungeons['4'] = dungeon;
ace.dungeons['4'].name = 'Dungeon4';
 
 

//-------------------------------------------------
// Room 1,0
//-------------------------------------------------
var room = dungeon.addRoom(1,0);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 2*256+128, 0, {teleportTo: [1417,625, -16]});
room.addActor('Keese',296,88);
room.addActor('Keese',312,56);
room.addActor('Keese',344,104);
room.addActor('Keese',344,72);
room.addActor('Keese',376,104);
room.addActor('Keese',376,72);
room.addActor('SecretKey',408,88);
room.addActor('Keese',424,136);
room.addActor('Keese',424,40);


//-------------------------------------------------
// Room 1,2
//-------------------------------------------------
var room = dungeon.addRoom(1,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('RoomDarkener',488,376);
room.addActor('Vire',296,440);
room.addActor('Block',296,392,{type:'tan'});
room.addActor('Block',312,472,{type:'tan'});
room.addActor('Block',312,408,{type:'tan'});
room.addActor('Block',328,488,{type:'tan'});
room.addActor('Block',328,424,{type:'tan'});
room.addActor('Vire',344,456);
room.addActor('Block',344,440,{type:'tan'});
room.addActor('Block',360,456,{type:'tan'});
room.addActor('Block',376,472,{type:'tan'});
room.addActor('Vire',376,424);
room.addActor('Block',392,408,{type:'tan'});
room.addActor('Block',408,424,{type:'tan'});
room.addActor('Vire',424,488);
room.addActor('Block',424,440,{type:'tan'});
room.addActor('Vire',424,392);
room.addActor('Block',440,456,{type:'tan'});
room.addActor('Block',440,392,{type:'tan'});
room.addActor('Block',456,472,{type:'tan'});
room.addActor('Block',456,408,{type:'tan'});
room.addActor('Block',472,488,{type:'tan'});



//-------------------------------------------------
// Room 1,3
//-------------------------------------------------
var room = dungeon.addRoom(1,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('RoomDarkener',488,552);
room.addActor('Water',312,648);
room.addActor('Water',312,632);
room.addActor('Water',312,616);
room.addActor('Water',312,600);
room.addActor('Water',312,584);
room.addActor('Water',328,648);
room.addActor('Water',328,584);
room.addActor('Zol',344,664);
room.addActor('Water',344,648);
room.addActor('Water',344,616);
room.addActor('Zol',344,600);
room.addActor('Water',344,584);
room.addActor('Zol',360,632);
room.addActor('Water',360,616);
room.addActor('Water',376,616);
room.addActor('SecretKey',392,632);
room.addActor('Water',392,616);
room.addActor('Zol',408,632);
room.addActor('Water',408,616);
room.addActor('Zol',424,664);
room.addActor('Water',424,648);
room.addActor('Water',424,616);
room.addActor('Water',424,584);
room.addActor('Water',440,648);
room.addActor('Water',440,584);
room.addActor('Water',456,648);
room.addActor('Water',456,632);
room.addActor('Water',456,616);
room.addActor('Water',456,600);
room.addActor('Water',456,584);


//-------------------------------------------------
// Room 1,4
//-------------------------------------------------
var room = dungeon.addRoom(1,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('RoomDarkener',488,728);
room.addActor('LockedDoor',488,792);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',384,856);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Water',296,808);
room.addActor('Bubble',312,824);
room.addActor('Water',312,808);
room.addActor('Water',328,808);
room.addActor('Vire',344,840);
room.addActor('Water',344,808);
room.addActor('Vire',344,776);
room.addActor('Water',360,808);
room.addActor('Water',376,808);
room.addActor('Water',392,808);
room.addActor('Vire',392,792);
room.addActor('Water',408,808);
room.addActor('Water',424,808);
room.addActor('Water',440,808);
room.addActor('Bubble',456,824);
room.addActor('Water',456,808);
room.addActor('Water',472,808);


//-------------------------------------------------
// Room 1,5
//-------------------------------------------------
var room = dungeon.addRoom(1,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',384,904);
room.addActor('Water',312,1000);
room.addActor('Water',312,984);
room.addActor('Water',312,968);
room.addActor('Water',312,952);
room.addActor('Water',312,936);
room.addActor('Water',328,1000);
room.addActor('Water',328,936);
room.addActor('Vire',344,1016);
room.addActor('Water',344,1000);
room.addActor('Water',344,968);
room.addActor('Water',344,936);
room.addActor('Vire',360,984);
room.addActor('Water',360,968);
room.addActor('Water',376,968);
room.addActor('Water',392,968);
room.addActor('Vire',408,984);
room.addActor('Water',408,968);
room.addActor('Vire',424,1016);
room.addActor('Water',424,1000);
room.addActor('Water',424,968);
room.addActor('Vire',424,952);
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
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',488,1144);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',384,1208);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',384,1080);
room.addActor('Statue',296,1096,{type:'lefttan'});
room.addActor('Block',312,1144,{type:'tan'});
room.addActor('Manhandla',344,1144);
room.addActor('Block',344,1112,{type:'tan'});
room.addActor('Block',424,1112,{type:'tan'});
room.addActor('Block',456,1144,{type:'tan'});
room.addActor('Statue',472,1096,{type:'righttan'});


//-------------------------------------------------
// Room 1,7
//-------------------------------------------------
var room = dungeon.addRoom(1,7);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',488,1320);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Fire',336,1336);
room.addActor('OldMan',384,1328);
room.addActor('Fire',432,1336);


//-------------------------------------------------
// Room 2,0
//-------------------------------------------------
var room = dungeon.addRoom(2,0);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('CaveExit', 2*256+128, 0, {teleportTo: [1417,625, -16]});

room.addActor('OldMan', 2*256+128, 90, {'text1': ace.UNDER_CONSTRUCTION_MESSAGE });

room.addActor('Statue',568,120,{type:'leftblue'});
room.addActor('Statue',568,88,{type:'leftblue'});
room.addActor('Statue',568,56,{type:'leftblue'});
room.addActor('Statue',616,120,{type:'leftblue'});
room.addActor('Statue',616,88,{type:'leftblue'});
room.addActor('Statue',616,56,{type:'leftblue'});
room.addActor('Statue',664,120,{type:'rightblue'});
room.addActor('Statue',664,88,{type:'rightblue'});
room.addActor('Statue',664,56,{type:'rightblue'});
room.addActor('Statue',712,120,{type:'rightblue'});
room.addActor('Statue',712,88,{type:'rightblue'});
room.addActor('Statue',712,56,{type:'rightblue'});


//-------------------------------------------------
// Room 2,1
//-------------------------------------------------
var room = dungeon.addRoom(2,1);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',744,264);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',584,280,{type:'tan'});
room.addActor('Block',584,248,{type:'tan'});
room.addActor('Vire',600,248);
room.addActor('Vire',616,280);
room.addActor('Vire',648,264);
room.addActor('Block',696,280,{type:'tan'});
room.addActor('Block',696,248,{type:'tan'});


//-------------------------------------------------
// Room 2,2
//-------------------------------------------------
var room = dungeon.addRoom(2,2);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Keese',568,472);
room.addActor('Block',584,472,{type:'tan'});
room.addActor('Block',584,408,{type:'tan'});
room.addActor('Keese',600,488);
room.addActor('Keese',600,424);
room.addActor('Keese',648,440);
room.addActor('Keese',664,456);
room.addActor('SecretKey',664,440);
room.addActor('Keese',680,488);
room.addActor('Keese',680,424);
room.addActor('Block',696,472,{type:'tan'});
room.addActor('Block',696,408,{type:'tan'});
room.addActor('Keese',712,472);


//-------------------------------------------------
// Room 2,4
//-------------------------------------------------
var room = dungeon.addRoom(2,4);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',536,792);
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',744,792);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',640,856);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Water',552,840);
room.addActor('Water',552,824);
room.addActor('Water',552,808);
room.addActor('Water',552,776);
room.addActor('Water',552,760);
room.addActor('Water',552,744);
room.addActor('Water',568,840);
room.addActor('Water',568,744);
room.addActor('Water',584,840);
room.addActor('Water',584,808);
room.addActor('Water',584,792);
room.addActor('Water',584,776);
room.addActor('Water',584,760);
room.addActor('Water',584,744);
room.addActor('Water',600,840);
room.addActor('Water',600,744);
room.addActor('Water',616,840);
room.addActor('Water',616,824);
room.addActor('Water',616,808);
room.addActor('Water',616,792);
room.addActor('Water',616,776);
room.addActor('Water',616,744);
room.addActor('Water',632,776);
room.addActor('Water',648,808);
room.addActor('Vire',648,776);
room.addActor('Water',664,840);
room.addActor('Water',664,808);
room.addActor('Water',664,792);
room.addActor('Water',664,776);
room.addActor('Water',664,760);
room.addActor('Water',664,744);
room.addActor('Water',680,840);
room.addActor('Vire',680,808);
room.addActor('Vire',680,776);
room.addActor('Water',680,744);
room.addActor('Water',696,840);
room.addActor('Water',696,824);
room.addActor('Water',696,808);
room.addActor('Water',696,792);
room.addActor('Water',696,776);
room.addActor('Water',696,744);
room.addActor('Water',712,840);
room.addActor('Vire',712,824);
room.addActor('Vire',712,760);
room.addActor('Water',712,744);
room.addActor('Water',728,840);
room.addActor('Water',728,824);
room.addActor('Water',728,808);
room.addActor('Water',728,776);
room.addActor('Water',728,760);
room.addActor('Water',728,744);


//-------------------------------------------------
// Room 2,5
//-------------------------------------------------
var room = dungeon.addRoom(2,5);
room.addActor('RoomDarkener',744,904);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',640,1032);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',640,904);
room.addActor('Water',568,1000);
room.addActor('Water',568,984);
room.addActor('Water',568,968);
room.addActor('Water',568,952);
room.addActor('Water',568,936);
room.addActor('Water',568,920);
room.addActor('Water',584,1000);
room.addActor('Water',584,984);
room.addActor('Water',584,968);
room.addActor('Water',584,952);
room.addActor('Water',584,936);
room.addActor('Water',584,920);
room.addActor('Water',600,1000);
room.addActor('Water',600,984);
room.addActor('Water',600,936);
room.addActor('Water',600,920);
room.addActor('Gel',616,1016);
room.addActor('Water',616,1000);
room.addActor('Water',616,984);
room.addActor('Gel',616,952);
room.addActor('Water',616,936);
room.addActor('Water',616,920);
room.addActor('Water',632,1000);
room.addActor('Water',632,984);
room.addActor('Gel',632,952);
room.addActor('Water',648,1000);
room.addActor('Water',648,984);
room.addActor('Water',664,1000);
room.addActor('Water',664,984);
room.addActor('Gel',664,968);
room.addActor('Water',664,936);
room.addActor('Water',664,920);
room.addActor('Water',680,1000);
room.addActor('Water',680,984);
room.addActor('Water',680,936);
room.addActor('Water',680,920);
room.addActor('Water',696,1000);
room.addActor('Water',696,984);
room.addActor('Water',696,968);
room.addActor('Water',696,952);
room.addActor('Water',696,936);
room.addActor('Water',696,920);
room.addActor('Water',712,1000);
room.addActor('Water',712,984);
room.addActor('Water',712,968);
room.addActor('Water',712,952);
room.addActor('Water',712,936);
room.addActor('Water',712,920);
room.addActor('Gel',728,1000);
room.addActor('Map',728,920);



//-------------------------------------------------
// Room 2,6
//-------------------------------------------------
var room = dungeon.addRoom(2,6);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',536,1144);
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',744,1144);
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',640,1208);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',640,1080);
room.addActor('Rupee',616,1144);
room.addActor('Rupee',632,1176,{xOffset:8});
room.addActor('Rupee',632,1160);
room.addActor('Rupee',632,1144);
room.addActor('Rupee',632,1128);
room.addActor('Rupee',632,1112,{xOffset:8});
room.addActor('Rupee',648,1160);
room.addActor('Rupee',648,1144);
room.addActor('Rupee',648,1128);
room.addActor('Rupee',664,1144);


//-------------------------------------------------
// Room 2,7
//-------------------------------------------------
var room = dungeon.addRoom(2,7);
room.addActor('RoomDarkener',744,1256);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',536,1320);
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',640,1256);
room.addActor('Water',552,1368);
room.addActor('Water',552,1352);
room.addActor('Water',552,1336);
room.addActor('Water',552,1304);
room.addActor('Water',552,1288);
room.addActor('Water',552,1272);
room.addActor('Water',568,1368);
room.addActor('Water',568,1272);
room.addActor('Water',584,1368);
room.addActor('Water',584,1336);
room.addActor('Water',584,1320);
room.addActor('Water',584,1304);
room.addActor('Water',584,1272);
room.addActor('Water',600,1368);
room.addActor('Water',600,1336);
room.addActor('Water',600,1304);
room.addActor('Water',600,1272);
room.addActor('Water',616,1368);
room.addActor('Water',616,1352);
room.addActor('Water',616,1336);
room.addActor('Water',616,1304);
room.addActor('Water',616,1288);
room.addActor('Water',616,1272);
room.addActor('Water',632,1352);
room.addActor('Water',632,1288);
room.addActor('Water',648,1352);
room.addActor('SecretKey',648,1336);
room.addActor('Keese',648,1304);
room.addActor('Water',648,1288);
room.addActor('Water',664,1368);
room.addActor('Water',664,1352);
room.addActor('Water',664,1336);
room.addActor('Water',664,1304);
room.addActor('Water',664,1288);
room.addActor('Water',664,1272);
room.addActor('Water',680,1368);
room.addActor('Water',680,1336);
room.addActor('Water',680,1304);
room.addActor('Water',680,1272);
room.addActor('Water',696,1368);
room.addActor('Water',696,1336);
room.addActor('Water',696,1320);
room.addActor('Water',696,1304);
room.addActor('Water',696,1272);
room.addActor('Water',712,1368);
room.addActor('Keese',712,1352);
room.addActor('Keese',712,1288);
room.addActor('Water',712,1272);
room.addActor('Water',728,1368);
room.addActor('Water',728,1352);
room.addActor('Water',728,1336);
room.addActor('Water',728,1304);
room.addActor('Water',728,1288);
room.addActor('Water',728,1272);



//-------------------------------------------------
// Room 3,1
//-------------------------------------------------
var room = dungeon.addRoom(3,1);
room.addActor('RoomDarkener',1000,200);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',792,264);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Block',824,312,{type:'tan'});
room.addActor('Block',824,296,{type:'tan'});
room.addActor('Block',824,280,{type:'tan'});
room.addActor('Block',824,264,{type:'tan'});
room.addActor('Block',824,248,{type:'tan'});
room.addActor('Block',840,248,{type:'tan'});
room.addActor('Block',840,216,{type:'tan'});
room.addActor('Block',856,312,{type:'tan'});
room.addActor('Block',856,296,{type:'tan'});
room.addActor('Block',856,264,{type:'tan'});
room.addActor('Block',856,248,{type:'tan'});
room.addActor('Block',872,296,{type:'tan'});
room.addActor('Block',888,296,{type:'tan'});
room.addActor('Block',888,280,{type:'tan'});
room.addActor('Block',888,264,{type:'tan'});
room.addActor('Block',888,248,{type:'tan'});
room.addActor('Block',888,232,{type:'tan'});
room.addActor('Vire',904,296);
room.addActor('Compass',904,280);
room.addActor('Vire',904,248);
room.addActor('Block',920,296,{type:'tan'});
room.addActor('Block',920,232,{type:'tan'});
room.addActor('Block',920,216,{type:'tan'});
room.addActor('Block',936,296,{type:'tan'});
room.addActor('Vire',936,280);
room.addActor('Vire',936,248);
room.addActor('Block',952,296,{type:'tan'});
room.addActor('Block',952,280,{type:'tan'});
room.addActor('Block',952,264,{type:'tan'});
room.addActor('Block',952,248,{type:'tan'});
room.addActor('Block',952,232,{type:'tan'});
room.addActor('Vire',968,296);
room.addActor('Block',968,280,{type:'tan'});
room.addActor('Block',984,280,{type:'tan'});
room.addActor('Block',984,232,{type:'tan'});
room.addActor('Block',984,216,{type:'tan'});



//-------------------------------------------------
// Room 3,4
//-------------------------------------------------
var room = dungeon.addRoom(3,4);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Zol',856,840);
room.addActor('Bubble',856,744);
room.addActor('Block',872,792,{type:'tan'});
room.addActor('LikeLike',904,808);
room.addActor('Block',920,792,{type:'tan'});
room.addActor('Bubble',968,824);
room.addActor('Zol',968,760);
room.addActor('Stairs',984,840,{type:'ladder'});
room.addActor('LikeLike',984,792);


//-------------------------------------------------
// Room 3,6
//-------------------------------------------------
var room = dungeon.addRoom(3,6);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',792,1144);
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',1000,1144);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Vire',824,1112);
room.addActor('Vire',856,1160);
room.addActor('Vire',856,1096);
room.addActor('Block',872,1144,{type:'tan'});
room.addActor('Vire',872,1128);
room.addActor('Vire',888,1144);
room.addActor('Block',920,1144,{type:'tan'});


//-------------------------------------------------
// Room 3,7
//-------------------------------------------------
var room = dungeon.addRoom(3,7);
room.addActor('RoomDarkener',1000,1256);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Trap',808,1368);
room.addActor('Trap',808,1272);
room.addActor('Block',824,1320,{type:'tan'});
room.addActor('Block',840,1336,{type:'tan'});
room.addActor('Trap',840,1320);
room.addActor('Block',840,1304,{type:'tan'});
room.addActor('Block',952,1336,{type:'tan'});
room.addActor('Trap',952,1320);
room.addActor('Block',952,1304,{type:'tan'});
room.addActor('Block',968,1320,{type:'tan'});
room.addActor('Trap',984,1368);
room.addActor('Trap',984,1272);



//-------------------------------------------------
// Room 4,6
//-------------------------------------------------
var room = dungeon.addRoom(4,6);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',1048,1144);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',1152,1208);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Block',1064,1192,{type:'tan'});
room.addActor('Block',1064,1176,{type:'tan'});
room.addActor('Block',1064,1160,{type:'tan'});
room.addActor('Block',1080,1192,{type:'tan'});
room.addActor('Block',1080,1176,{type:'tan'});
room.addActor('Block',1080,1160,{type:'tan'});
room.addActor('Block',1096,1192,{type:'tan'});
room.addActor('Block',1096,1176,{type:'tan'});
room.addActor('Block',1096,1112,{type:'tan'});
room.addActor('Block',1112,1192,{type:'tan'});
room.addActor('Block',1112,1176,{type:'tan'});
room.addActor('Block',1128,1192,{type:'tan'});
room.addActor('Gleeok',1152,1176);
room.addActor('Block',1176,1192,{type:'tan'});
room.addActor('Block',1192,1192,{type:'tan'});
room.addActor('Block',1192,1176,{type:'tan'});
room.addActor('Block',1208,1192,{type:'tan'});
room.addActor('Block',1208,1176,{type:'tan'});
room.addActor('Block',1208,1112,{type:'tan'});
room.addActor('Block',1224,1192,{type:'tan'});
room.addActor('Block',1224,1176,{type:'tan'});
room.addActor('Block',1224,1160,{type:'tan'});
room.addActor('Block',1240,1192,{type:'tan'});
room.addActor('Block',1240,1176,{type:'tan'});
room.addActor('Block',1240,1160,{type:'tan'});
room.addActor('SecretHeartContainer',1240,1096);


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
