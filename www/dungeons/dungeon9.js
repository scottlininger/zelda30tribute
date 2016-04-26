/**
 * @fileoverview  Create dungeon.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Setup calls for dungeon.
 * @type {ace.Dungeon}
 */
ace.dungeons = ace.dungeons || {};
var dungeon = new ace.Dungeon('dungeons/dungeon9.png');
ace.dungeons['9'] = dungeon;
ace.dungeons['9'].name = 'Dungeon9';
 
 

//-------------------------------------------------
// Room 0,2
//-------------------------------------------------
var room = dungeon.addRoom(0,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',232,440);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',128,504);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Zol',40,440);
room.addActor('Water',56,472);
room.addActor('Water',56,456);
room.addActor('Water',56,440);
room.addActor('Water',56,424);
room.addActor('Water',56,408);
room.addActor('Water',72,472);
room.addActor('Water',72,408);
room.addActor('Water',88,472);
room.addActor('Zol',88,456);
room.addActor('Zol',88,424);
room.addActor('Water',88,408);
room.addActor('Water',104,472);
room.addActor('Water',104,408);
room.addActor('Water',120,472);
room.addActor('Water',120,408);
room.addActor('Water',136,472);
room.addActor('Water',136,408);
room.addActor('Water',152,472);
room.addActor('Water',152,408);
room.addActor('Zol',168,488);
room.addActor('Water',168,472);
room.addActor('Water',168,408);
room.addActor('Zol',168,392);
room.addActor('Water',184,472);
room.addActor('Water',184,408);
room.addActor('Water',200,472);
room.addActor('Water',200,456);
room.addActor('Water',200,440);
room.addActor('Water',200,424);
room.addActor('Water',200,408);


//-------------------------------------------------
// Room 0,3
//-------------------------------------------------
var room = dungeon.addRoom(0,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',128,680);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',128,552);
room.addActor('Water',40,664);
room.addActor('Water',40,648);
room.addActor('Water',40,632);
room.addActor('Water',40,600);
room.addActor('Water',40,584);
room.addActor('Water',40,568);
room.addActor('Water',56,664);
room.addActor('WizzrobeBlue',56,648);
room.addActor('Water',56,568);
room.addActor('Water',72,664);
room.addActor('Water',72,632);
room.addActor('Water',72,616);
room.addActor('Water',72,600);
room.addActor('Water',72,568);
room.addActor('Water',88,664);
room.addActor('Water',88,632);
room.addActor('Water',88,600);
room.addActor('Water',88,568);
room.addActor('Water',104,664);
room.addActor('Water',104,648);
room.addActor('Water',104,632);
room.addActor('Water',104,600);
room.addActor('Water',104,584);
room.addActor('Water',104,568);
room.addActor('Water',120,648);
room.addActor('Wizzrobe',120,600);
room.addActor('Water',120,584);
room.addActor('Water',136,648);
room.addActor('SecretRupee',136,616);
room.addActor('Water',136,584);
room.addActor('Water',152,664);
room.addActor('Water',152,648);
room.addActor('Water',152,632);
room.addActor('WizzrobeBlue',152,616);
room.addActor('Water',152,600);
room.addActor('Water',152,584);
room.addActor('Water',152,568);
room.addActor('Water',168,664);
room.addActor('Water',168,632);
room.addActor('Water',168,600);
room.addActor('Water',168,568);
room.addActor('Water',184,664);
room.addActor('Water',184,632);
room.addActor('Water',184,616);
room.addActor('Water',184,600);
room.addActor('Water',184,568);
room.addActor('Water',200,664);
room.addActor('Water',200,568);
room.addActor('Water',216,664);
room.addActor('Water',216,648);
room.addActor('Water',216,632);
room.addActor('Water',216,600);
room.addActor('Water',216,584);
room.addActor('Water',216,568);


//-------------------------------------------------
// Room 0,4
//-------------------------------------------------
var room = dungeon.addRoom(0,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',232,792);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',128,728);
room.addActor('Trap',40,840);
room.addActor('Trap',40,744);
room.addActor('Block',104,792,{type:'gray'});
room.addActor('WizzrobeBlue',120,792);
room.addActor('Wizzrobe',120,776);
room.addActor('Wizzrobe',120,760);
room.addActor('Block',152,792,{type:'gray'});
room.addActor('WizzrobeBlue',168,840);
room.addActor('TrapAndStairs',216,840);
room.addActor('Trap',216,744);


//-------------------------------------------------
// Room 0,5
//-------------------------------------------------
var room = dungeon.addRoom(0,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',128,1032);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Wizzrobe',40,952);
room.addActor('WizzrobeBlue',88,936);
room.addActor('Block',104,968,{type:'gray'});
room.addActor('WizzrobeBlue',120,1000);
room.addActor('Block',120,984,{type:'gray'});
room.addActor('Block',120,952,{type:'gray'});
room.addActor('Block',136,1000,{type:'gray'});
room.addActor('Stairs',136,968);
room.addActor('Block',136,936,{type:'gray'});
room.addActor('WizzrobeBlue',136,920);
room.addActor('Block',152,984,{type:'gray'});
room.addActor('Block',152,952,{type:'gray'});
room.addActor('Block',168,968,{type:'gray'});
room.addActor('Wizzrobe',200,952);


//-------------------------------------------------
// Room 0,6
//-------------------------------------------------
var room = dungeon.addRoom(0,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',128,1080);
room.addActor('Block',56,1176,{type:'gray'});
room.addActor('Block',56,1112,{type:'gray'});
room.addActor('Block',72,1176,{type:'gray'});
room.addActor('Block',72,1112,{type:'gray'});
room.addActor('Wizzrobe',72,1096);
room.addActor('Bubble',88,1192);
room.addActor('Block',88,1176,{type:'gray'});
room.addActor('Bubble',88,1128);
room.addActor('Block',88,1112,{type:'gray'});
room.addActor('Block',104,1176,{type:'gray'});
room.addActor('WizzrobeBlue',104,1160);
room.addActor('Block',104,1112,{type:'gray'});
room.addActor('Block',120,1176,{type:'gray'});
room.addActor('Block',120,1112,{type:'gray'});
room.addActor('Block',136,1176,{type:'gray'});
room.addActor('WizzrobeBlue',136,1144);
room.addActor('Block',136,1112,{type:'gray'});
room.addActor('Block',152,1176,{type:'gray'});
room.addActor('Block',152,1112,{type:'gray'});
room.addActor('WizzrobeBlue',168,1192);
room.addActor('Block',168,1176,{type:'gray'});
room.addActor('Bubble',168,1128);
room.addActor('Block',168,1112,{type:'gray'});
room.addActor('Block',184,1176,{type:'gray'});
room.addActor('Block',184,1112,{type:'gray'});
room.addActor('Block',200,1176,{type:'gray'});
room.addActor('Block',200,1160,{type:'gray'});
room.addActor('Block',200,1144,{type:'gray'});
room.addActor('Block',200,1128,{type:'gray'});
room.addActor('Block',200,1112,{type:'gray'});
room.addActor('Stairs',216,1192);


//-------------------------------------------------
// Room 1,0
//-------------------------------------------------
var room = dungeon.addRoom(1,0);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 6*256+128, 0, {teleportTo: [1365,1299, -16]});
room.addActor('Block',424,136,{type:'gray'});
room.addActor('Block',424,120,{type:'gray'});
room.addActor('Block',424,56,{type:'gray'});
room.addActor('Block',424,40,{type:'gray'});
room.addActor('Block',440,136,{type:'gray'});
room.addActor('Block',440,120,{type:'gray'});
room.addActor('Block',440,104,{type:'gray'});
room.addActor('Block',440,72,{type:'gray'});
room.addActor('Block',440,56,{type:'gray'});
room.addActor('Block',440,40,{type:'gray'});
room.addActor('Block',456,136,{type:'gray'});
room.addActor('Block',456,120,{type:'gray'});
room.addActor('Block',456,104,{type:'gray'});
room.addActor('Block',456,72,{type:'gray'});
room.addActor('Block',456,56,{type:'gray'});
room.addActor('Block',456,40,{type:'gray'});
room.addActor('Block',472,136,{type:'gray'});
room.addActor('Block',472,120,{type:'gray'});
room.addActor('Block',472,104,{type:'gray'});
room.addActor('Stairs',472,88);
room.addActor('Block',472,72,{type:'gray'});
room.addActor('Block',472,56,{type:'gray'});
room.addActor('Block',472,40,{type:'gray'});


//-------------------------------------------------
// Room 1,1
//-------------------------------------------------
var room = dungeon.addRoom(1,1);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',360,264,{type:'gray'});
room.addActor('Block',376,248,{type:'gray'});
room.addActor('Patra',392,296);
room.addActor('Stairs',392,264);
room.addActor('Block',392,232,{type:'gray'});
room.addActor('Block',408,280,{type:'gray'});
room.addActor('Block',408,248,{type:'gray'});
room.addActor('Block',424,264,{type:'gray'});
room.addActor('SecretKey',472,312);


//-------------------------------------------------
// Room 1,2
//-------------------------------------------------
var room = dungeon.addRoom(1,2);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',280,440);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',296,392,{type:'gray'});
room.addActor('Block',312,472,{type:'gray'});
room.addActor('Block',312,408,{type:'gray'});
room.addActor('Block',328,488,{type:'gray'});
room.addActor('Block',328,424,{type:'gray'});
room.addActor('LikeLike',344,488);
room.addActor('Block',344,440,{type:'gray'});
room.addActor('LikeLike',344,424);
room.addActor('Block',360,456,{type:'gray'});
room.addActor('Block',376,472,{type:'gray'});
room.addActor('LikeLike',392,440);
room.addActor('Block',392,408,{type:'gray'});
room.addActor('LikeLike',408,456);
room.addActor('Block',408,424,{type:'gray'});
room.addActor('LikeLike',424,488);
room.addActor('Block',424,440,{type:'gray'});
room.addActor('LikeLike',424,424);
room.addActor('Block',440,456,{type:'gray'});
room.addActor('Block',440,392,{type:'gray'});
room.addActor('Block',456,472,{type:'gray'});
room.addActor('Block',456,408,{type:'gray'});
room.addActor('Block',472,488,{type:'gray'});


//-------------------------------------------------
// Room 1,3
//-------------------------------------------------
var room = dungeon.addRoom(1,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',384,552);
room.addActor('Trap',296,664);
room.addActor('Trap',296,568);
room.addActor('LikeLike',392,616);
room.addActor('LikeLike',408,632);
room.addActor('LikeLike',424,664);
room.addActor('LikeLike',424,600);
room.addActor('Trap',472,664);
room.addActor('Trap',472,568);


//-------------------------------------------------
// Room 1,4
//-------------------------------------------------
var room = dungeon.addRoom(1,4);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',280,792);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',384,728);
room.addActor('Wizzrobe',296,744);
room.addActor('Bubble',344,840);
room.addActor('Wizzrobe',344,792);
room.addActor('LikeLike',344,744);
room.addActor('WizzrobeBlue',392,808);
room.addActor('WizzrobeBlue',392,776);
room.addActor('LikeLike',424,808);
room.addActor('LikeLike',456,824);


//-------------------------------------------------
// Room 1,5
//-------------------------------------------------
var room = dungeon.addRoom(1,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',488,968);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',384,904);
room.addActor('Patra',392,1000);


//-------------------------------------------------
// Room 1,6
//-------------------------------------------------
var room = dungeon.addRoom(1,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',384,1080);
room.addActor('LanmolaBlue',312,1096);
room.addActor('LanmolaBlue',328,1112);
room.addActor('SecretBomb',392,1144);


//-------------------------------------------------
// Room 1,7
//-------------------------------------------------
var room = dungeon.addRoom(1,7);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',488,1320);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',384,1256);
room.addActor('Keese',296,1320);
room.addActor('Bubble',296,1304);
room.addActor('Zol',312,1352);
room.addActor('Bubble',312,1288);
room.addActor('Zol',344,1336);
room.addActor('Bubble',344,1304);
room.addActor('Keese',376,1336);
room.addActor('Keese',376,1304);
room.addActor('Water',424,1368);
room.addActor('Water',424,1352);
room.addActor('Water',424,1336);
room.addActor('Water',424,1320);
room.addActor('Water',424,1304);
room.addActor('Water',424,1288);
room.addActor('Water',424,1272);


//-------------------------------------------------
// Room 2,1
//-------------------------------------------------
var room = dungeon.addRoom(2,1);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',744,264);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Keese',600,312);
room.addActor('Keese',600,216);
room.addActor('Keese',648,280);
room.addActor('SecretRupee',648,264);
room.addActor('Keese',648,248);
room.addActor('Keese',680,280);
room.addActor('Keese',680,248);
room.addActor('Keese',712,296);
room.addActor('Keese',712,232);


//-------------------------------------------------
// Room 2,2
//-------------------------------------------------
var room = dungeon.addRoom(2,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',640,504);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Patra',648,472);
room.addActor('Block',680,488,{type:'gray'});
room.addActor('Block',680,472,{type:'gray'});
room.addActor('Block',680,408,{type:'gray'});
room.addActor('Block',680,392,{type:'gray'});
room.addActor('Block',696,488,{type:'gray'});
room.addActor('Block',696,472,{type:'gray'});
room.addActor('Block',696,456,{type:'gray'});
room.addActor('Block',696,424,{type:'gray'});
room.addActor('Block',696,408,{type:'gray'});
room.addActor('Block',696,392,{type:'gray'});
room.addActor('Block',712,488,{type:'gray'});
room.addActor('Block',712,472,{type:'gray'});
room.addActor('Block',712,456,{type:'gray'});
room.addActor('Block',712,424,{type:'gray'});
room.addActor('Block',712,408,{type:'gray'});
room.addActor('Block',712,392,{type:'gray'});
room.addActor('Block',728,488,{type:'gray'});
room.addActor('Block',728,472,{type:'gray'});
room.addActor('Block',728,456,{type:'gray'});
room.addActor('Stairs',728,440);
room.addActor('Block',728,424,{type:'gray'});
room.addActor('Block',728,408,{type:'gray'});
room.addActor('Block',728,392,{type:'gray'});


//-------------------------------------------------
// Room 2,3
//-------------------------------------------------
var room = dungeon.addRoom(2,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',640,680);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',640,552);
room.addActor('Statue',552,664,{type:'leftred'});
room.addActor('Statue',552,568,{type:'leftred'});
room.addActor('Gannon',616,600);
room.addActor('Triforce',648,632);
room.addActor('Statue',728,664,{type:'rightred'});
room.addActor('Statue',728,568,{type:'rightred'});


//-------------------------------------------------
// Room 2,4
//-------------------------------------------------
var room = dungeon.addRoom(2,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',640,728);
room.addActor('Block',552,840,{type:'gray'});
room.addActor('Block',552,824,{type:'gray'});
room.addActor('Block',552,808,{type:'gray'});
room.addActor('Block',552,792,{type:'gray'});
room.addActor('Block',552,776,{type:'gray'});
room.addActor('Block',552,760,{type:'gray'});
room.addActor('Block',552,744,{type:'gray'});
room.addActor('Block',568,840,{type:'gray'});
room.addActor('Block',584,840,{type:'gray'});
room.addActor('Block',584,808,{type:'gray'});
room.addActor('Block',584,792,{type:'gray'});
room.addActor('Statue',584,744,{type:'leftgray'});
room.addActor('Block',600,840,{type:'gray'});
room.addActor('Block',600,808,{type:'gray'});
room.addActor('Block',600,792,{type:'gray'});
room.addActor('Block',616,840,{type:'gray'});
room.addActor('Block',616,824,{type:'gray'});
room.addActor('Statue',616,776,{type:'leftgray'});
room.addActor('Fire',608,744);
room.addActor('Block',632,840,{type:'gray'});
room.addActor('Fire',624,776);
room.addActor('Block',648,840,{type:'gray'});
room.addActor('Zelda',648,792);
room.addActor('Fire',640,776);
room.addActor('Block',664,840,{type:'gray'});
room.addActor('Block',664,824,{type:'gray'});
room.addActor('Statue',664,776,{type:'rightgray'});
room.addActor('Fire',656,744);
room.addActor('Block',680,840,{type:'gray'});
room.addActor('Block',680,808,{type:'gray'});
room.addActor('Block',680,792,{type:'gray'});
room.addActor('Block',696,840,{type:'gray'});
room.addActor('Block',696,808,{type:'gray'});
room.addActor('Block',696,792,{type:'gray'});
room.addActor('Statue',696,744,{type:'rightgray'});
room.addActor('Block',712,840,{type:'gray'});
room.addActor('Block',728,840,{type:'gray'});
room.addActor('Block',728,824,{type:'gray'});
room.addActor('Block',728,808,{type:'gray'});
room.addActor('Block',728,792,{type:'gray'});
room.addActor('Block',728,776,{type:'gray'});
room.addActor('Block',728,760,{type:'gray'});
room.addActor('Block',728,744,{type:'gray'});


//-------------------------------------------------
// Room 2,5
//-------------------------------------------------
var room = dungeon.addRoom(2,5);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',536,968);
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',744,968);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',640,1032);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Block',584,984,{type:'gray'});
room.addActor('Block',584,968,{type:'gray'});
room.addActor('Block',584,952,{type:'gray'});
room.addActor('Block',600,984,{type:'gray'});
room.addActor('Block',600,968,{type:'gray'});
room.addActor('Block',600,952,{type:'gray'});
room.addActor('Bubble',600,920);
room.addActor('Bubble',616,952);
room.addActor('Zol',632,968);
room.addActor('Zol',664,952);
room.addActor('Block',680,984,{type:'gray'});
room.addActor('Block',680,968,{type:'gray'});
room.addActor('Block',680,952,{type:'gray'});
room.addActor('LikeLike',680,920);
room.addActor('Block',696,984,{type:'gray'});
room.addActor('Block',696,968,{type:'gray'});
room.addActor('Block',696,952,{type:'gray'});
room.addActor('LikeLike',712,936);


//-------------------------------------------------
// Room 2,6
//-------------------------------------------------
var room = dungeon.addRoom(2,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',744,1144);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',640,1208);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',640,1080);
room.addActor('Lanmola',568,1096);
room.addActor('Lanmola',584,1112);
room.addActor('SecretRupee',648,1144);


//-------------------------------------------------
// Room 2,7
//-------------------------------------------------
var room = dungeon.addRoom(2,7);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',536,1320);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Fire',592,1336);
room.addActor('OldMan',640,1328);
room.addActor('OldMan',672,1344);
room.addActor('Fire',688,1336);


//-------------------------------------------------
// Room 3,0
//-------------------------------------------------
var room = dungeon.addRoom(3,0);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',1000,88);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',896,152);
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 6*256+128, 0, {teleportTo: [1365,1299, -16]});
room.addActor('Block',824,120,{type:'gray'});
room.addActor('Block',824,56,{type:'gray'});
room.addActor('Block',840,120,{type:'gray'});
room.addActor('Block',840,56,{type:'gray'});
room.addActor('Bubble',856,40);
room.addActor('Bubble',872,72);
room.addActor('WizzrobeBlue',872,40);
room.addActor('Wizzrobe',888,104);
room.addActor('Block',888,88,{type:'gray'});
room.addActor('Wizzrobe',888,72);
room.addActor('Block',904,88,{type:'gray'});
room.addActor('Bubble',920,72);
room.addActor('WizzrobeBlue',936,104);
room.addActor('WizzrobeBlue',936,40);
room.addActor('Block',952,120,{type:'gray'});
room.addActor('Block',952,56,{type:'gray'});
room.addActor('Block',968,120,{type:'gray'});
room.addActor('Block',968,56,{type:'gray'});


//-------------------------------------------------
// Room 3,1
//-------------------------------------------------
var room = dungeon.addRoom(3,1);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',792,264);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',896,328);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',896,200);
room.addActor('Zol',824,232);
room.addActor('Zol',856,280);
room.addActor('Zol',856,216);
room.addActor('Zol',872,248);
room.addActor('Zol',888,264);
room.addActor('Block',936,312,{type:'gray'});
room.addActor('Block',936,296,{type:'gray'});
room.addActor('Block',936,232,{type:'gray'});
room.addActor('Block',936,216,{type:'gray'});
room.addActor('Block',952,312,{type:'gray'});
room.addActor('Block',952,296,{type:'gray'});
room.addActor('Block',952,280,{type:'gray'});
room.addActor('Block',952,248,{type:'gray'});
room.addActor('Block',952,232,{type:'gray'});
room.addActor('Block',952,216,{type:'gray'});
room.addActor('Block',968,312,{type:'gray'});
room.addActor('Block',968,296,{type:'gray'});
room.addActor('Block',968,280,{type:'gray'});
room.addActor('Block',968,248,{type:'gray'});
room.addActor('Block',968,232,{type:'gray'});
room.addActor('Block',968,216,{type:'gray'});
room.addActor('Block',984,312,{type:'gray'});
room.addActor('Block',984,296,{type:'gray'});
room.addActor('Block',984,280,{type:'gray'});
room.addActor('Stairs',984,264);
room.addActor('Block',984,248,{type:'gray'});
room.addActor('Block',984,232,{type:'gray'});
room.addActor('Block',984,216,{type:'gray'});


//-------------------------------------------------
// Room 3,2
//-------------------------------------------------
var room = dungeon.addRoom(3,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',896,504);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',896,376);
room.addActor('LikeLike',824,472);
room.addActor('Bubble',872,456);
room.addActor('Statue',872,440,{type:'leftred'});
room.addActor('Wizzrobe',888,456);
room.addActor('Wizzrobe',888,424);
room.addActor('LikeLike',904,440);
room.addActor('WizzrobeBlue',920,456);
room.addActor('Statue',920,440,{type:'rightred'});
room.addActor('WizzrobeBlue',936,488);
room.addActor('LikeLike',936,424);


//-------------------------------------------------
// Room 3,3
//-------------------------------------------------
var room = dungeon.addRoom(3,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',896,552);
room.addActor('Fire',848,632);
room.addActor('OldMan',896,624);
room.addActor('Fire',944,632);


//-------------------------------------------------
// Room 3,4
//-------------------------------------------------
var room = dungeon.addRoom(3,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',896,856);
room.exitByFacing['down'] = ace.WALL;


//-------------------------------------------------
// Room 3,5
//-------------------------------------------------
var room = dungeon.addRoom(3,5);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',792,968);
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',1000,968);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',896,1032);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',896,904);
room.addActor('Gel',808,968);
room.addActor('Water',824,1000);
room.addActor('Water',824,984);
room.addActor('Water',824,968);
room.addActor('Water',824,952);
room.addActor('Water',824,936);
room.addActor('Water',824,920);
room.addActor('Water',840,1000);
room.addActor('Water',840,984);
room.addActor('Water',840,968);
room.addActor('Water',840,952);
room.addActor('Water',840,936);
room.addActor('Water',840,920);
room.addActor('Water',856,1000);
room.addActor('Water',856,984);
room.addActor('Gel',856,952);
room.addActor('Water',856,936);
room.addActor('Water',856,920);
room.addActor('Water',872,1000);
room.addActor('Water',872,984);
room.addActor('Water',872,936);
room.addActor('Water',872,920);
room.addActor('Water',888,1000);
room.addActor('Water',888,984);
room.addActor('Gel',888,952);
room.addActor('Water',904,1000);
room.addActor('Water',904,984);
room.addActor('Water',920,1000);
room.addActor('Water',920,984);
room.addActor('Water',920,936);
room.addActor('Water',920,920);
room.addActor('Gel',936,1016);
room.addActor('Water',936,1000);
room.addActor('Water',936,984);
room.addActor('Water',936,936);
room.addActor('Water',936,920);
room.addActor('Water',952,1000);
room.addActor('Water',952,984);
room.addActor('Water',952,968);
room.addActor('Water',952,952);
room.addActor('Water',952,936);
room.addActor('Water',952,920);
room.addActor('Water',968,1000);
room.addActor('Water',968,984);
room.addActor('Water',968,968);
room.addActor('Water',968,952);
room.addActor('Water',968,936);
room.addActor('Water',968,920);
room.addActor('SecretBomb',984,1016);


//-------------------------------------------------
// Room 3,6
//-------------------------------------------------
var room = dungeon.addRoom(3,6);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',792,1144);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',896,1080);
room.addActor('Zol',824,1176);
room.addActor('Zol',856,1192);
room.addActor('LikeLike',856,1128);
room.addActor('LikeLike',872,1160);
room.addActor('Bubble',936,1128);
room.addActor('Bubble',968,1176);


//-------------------------------------------------
// Room 3,7
//-------------------------------------------------
var room = dungeon.addRoom(3,7);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',1000,1320);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('LikeLike',808,1320);
room.addActor('Bubble',824,1288);
room.addActor('Bubble',856,1336);
room.addActor('Zol',856,1304);
room.addActor('Block',872,1320,{type:'gray'});
room.addActor('Block',888,1336,{type:'gray'});
room.addActor('Block',888,1304,{type:'gray'});
room.addActor('Block',904,1352,{type:'gray'});
room.addActor('Stairs',904,1320);
room.addActor('Block',904,1288,{type:'gray'});
room.addActor('Block',920,1336,{type:'gray'});
room.addActor('Block',920,1304,{type:'gray'});
room.addActor('Zol',936,1368);
room.addActor('Block',936,1320,{type:'gray'});
room.addActor('LikeLike',936,1272);


//-------------------------------------------------
// Room 4,0
//-------------------------------------------------
var room = dungeon.addRoom(4,0);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',1048,88);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 6*256+128, 0, {teleportTo: [1365,1299, -16]});
room.addActor('LanmolaBlue',1096,40);
room.addActor('LanmolaBlue',1112,56);
room.addActor('Block',1128,88,{type:'gray'});
room.addActor('Block',1144,104,{type:'gray'});
room.addActor('Block',1144,72,{type:'gray'});
room.addActor('Block',1160,120,{type:'gray'});
room.addActor('Stairs',1160,88);
room.addActor('Block',1160,56,{type:'gray'});
room.addActor('Block',1176,104,{type:'gray'});
room.addActor('Block',1176,72,{type:'gray'});
room.addActor('Block',1192,88,{type:'gray'});


//-------------------------------------------------
// Room 4,1
//-------------------------------------------------
var room = dungeon.addRoom(4,1);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('LikeLike',1064,264);
room.addActor('Block',1080,296,{type:'gray'});
room.addActor('Block',1080,232,{type:'gray'});
room.addActor('Block',1096,296,{type:'gray'});
room.addActor('Block',1096,232,{type:'gray'});
room.addActor('WizzrobeBlue',1112,280);
room.addActor('WizzrobeBlue',1112,248);
room.addActor('LikeLike',1144,280);
room.addActor('Block',1144,264,{type:'gray'});
room.addActor('Block',1160,264,{type:'gray'});
room.addActor('Wizzrobe',1176,264);
room.addActor('Bubble',1192,312);
room.addActor('LikeLike',1192,216);
room.addActor('Block',1208,296,{type:'gray'});
room.addActor('Wizzrobe',1208,264);
room.addActor('Block',1208,232,{type:'gray'});
room.addActor('Block',1224,296,{type:'gray'});
room.addActor('Block',1224,232,{type:'gray'});


//-------------------------------------------------
// Room 4,2
//-------------------------------------------------
var room = dungeon.addRoom(4,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',1256,440);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',1080,488,{type:'gray'});
room.addActor('Block',1080,472,{type:'gray'});
room.addActor('Block',1080,456,{type:'gray'});
room.addActor('Block',1080,440,{type:'gray'});
room.addActor('Block',1080,424,{type:'gray'});
room.addActor('Block',1096,424,{type:'gray'});
room.addActor('Block',1096,392,{type:'gray'});
room.addActor('Block',1112,488,{type:'gray'});
room.addActor('Block',1112,472,{type:'gray'});
room.addActor('Block',1112,440,{type:'gray'});
room.addActor('Block',1112,424,{type:'gray'});
room.addActor('Wizzrobe',1112,392);
room.addActor('Block',1128,472,{type:'gray'});
room.addActor('WizzrobeBlue',1128,424);
room.addActor('Wizzrobe',1128,392);
room.addActor('Block',1144,472,{type:'gray'});
room.addActor('Block',1144,456,{type:'gray'});
room.addActor('Block',1144,440,{type:'gray'});
room.addActor('Block',1144,424,{type:'gray'});
room.addActor('Block',1144,408,{type:'gray'});
room.addActor('WizzrobeBlue',1160,456);
room.addActor('WizzrobeBlue',1176,488);
room.addActor('Block',1176,472,{type:'gray'});
room.addActor('Block',1176,408,{type:'gray'});
room.addActor('Block',1176,392,{type:'gray'});
room.addActor('Block',1192,472,{type:'gray'});
room.addActor('Block',1208,472,{type:'gray'});
room.addActor('Block',1208,456,{type:'gray'});
room.addActor('Block',1208,440,{type:'gray'});
room.addActor('Block',1208,424,{type:'gray'});
room.addActor('Block',1208,408,{type:'gray'});
room.addActor('Block',1224,456,{type:'gray'});
room.addActor('Block',1240,456,{type:'gray'});
room.addActor('Block',1240,408,{type:'gray'});
room.addActor('Block',1240,392,{type:'gray'});


//-------------------------------------------------
// Room 4,3
//-------------------------------------------------
var room = dungeon.addRoom(4,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Wizzrobe',1144,632);
room.addActor('Wizzrobe',1144,616);
room.addActor('Wizzrobe',1144,600);
room.addActor('Wizzrobe',1144,584);
room.addActor('SecretRupee',1160,616);


//-------------------------------------------------
// Room 4,4
//-------------------------------------------------
var room = dungeon.addRoom(4,4);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1048,792);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Water',1080,824);
room.addActor('Water',1080,808);
room.addActor('Water',1080,792);
room.addActor('Water',1080,776);
room.addActor('Water',1080,760);
room.addActor('Water',1096,824);
room.addActor('Water',1096,760);
room.addActor('Water',1112,824);
room.addActor('Water',1112,760);
room.addActor('Water',1128,824);
room.addActor('Water',1128,760);
room.addActor('Water',1144,824);
room.addActor('Water',1144,760);
room.addActor('Water',1160,824);
room.addActor('SecretRupee',1160,792);
room.addActor('Water',1160,760);
room.addActor('Water',1176,824);
room.addActor('Water',1176,760);
room.addActor('Water',1192,824);
room.addActor('Water',1192,760);
room.addActor('Water',1208,824);
room.addActor('Water',1208,760);
room.addActor('Water',1224,824);
room.addActor('Water',1224,808);
room.addActor('Water',1224,792);
room.addActor('Water',1224,776);
room.addActor('Water',1224,760);


//-------------------------------------------------
// Room 4,5
//-------------------------------------------------
var room = dungeon.addRoom(4,5);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1048,968);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Water',1064,1016);
room.addActor('Water',1064,1000);
room.addActor('Water',1064,984);
room.addActor('Water',1064,952);
room.addActor('Water',1064,936);
room.addActor('Water',1064,920);
room.addActor('Water',1080,1016);
room.addActor('Vire',1080,936);
room.addActor('Water',1080,920);
room.addActor('Water',1096,1016);
room.addActor('Water',1096,984);
room.addActor('Water',1096,968);
room.addActor('Water',1096,952);
room.addActor('Water',1096,936);
room.addActor('Water',1096,920);
room.addActor('Water',1112,1016);
room.addActor('Vire',1112,984);
room.addActor('Water',1112,920);
room.addActor('Water',1128,1016);
room.addActor('Water',1128,1000);
room.addActor('Water',1128,984);
room.addActor('Water',1128,968);
room.addActor('Water',1128,952);
room.addActor('Water',1128,920);
room.addActor('Vire',1144,968);
room.addActor('Water',1144,952);
room.addActor('Water',1160,984);
room.addActor('Water',1176,1016);
room.addActor('Water',1176,984);
room.addActor('Water',1176,968);
room.addActor('Water',1176,952);
room.addActor('Water',1176,936);
room.addActor('Water',1176,920);
room.addActor('Water',1192,1016);
room.addActor('Vire',1192,984);
room.addActor('Water',1192,920);
room.addActor('Water',1208,1016);
room.addActor('Water',1208,1000);
room.addActor('Water',1208,984);
room.addActor('Water',1208,968);
room.addActor('Water',1208,952);
room.addActor('Water',1208,920);
room.addActor('Water',1224,1016);
room.addActor('Vire',1224,936);
room.addActor('Water',1224,920);
room.addActor('Water',1240,1016);
room.addActor('Water',1240,1000);
room.addActor('Water',1240,984);
room.addActor('Water',1240,952);
room.addActor('Water',1240,936);
room.addActor('Water',1240,920);


//-------------------------------------------------
// Room 4,6
//-------------------------------------------------
var room = dungeon.addRoom(4,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',1256,1144);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',1080,1176,{type:'gray'});
room.addActor('Block',1080,1160,{type:'gray'});
room.addActor('Block',1080,1144,{type:'gray'});
room.addActor('Block',1080,1128,{type:'gray'});
room.addActor('Block',1080,1112,{type:'gray'});
room.addActor('Block',1096,1176,{type:'gray'});
room.addActor('Block',1096,1112,{type:'gray'});
room.addActor('Block',1112,1176,{type:'gray'});
room.addActor('Block',1112,1112,{type:'gray'});
room.addActor('Block',1128,1176,{type:'gray'});
room.addActor('Block',1128,1112,{type:'gray'});
room.addActor('Block',1144,1176,{type:'gray'});
room.addActor('Block',1144,1144,{type:'gray'});
room.addActor('Block',1144,1112,{type:'gray'});
room.addActor('Block',1160,1176,{type:'gray'});
room.addActor('a',1160,1160);
room.addActor('Block',1160,1144,{type:'gray'});
room.addActor('Block',1160,1112,{type:'gray'});
room.addActor('Block',1176,1176,{type:'gray'});
room.addActor('Stairs',1176,1160);
room.addActor('Block',1176,1144,{type:'gray'});
room.addActor('LikeLike',1176,1128);
room.addActor('Block',1176,1112,{type:'gray'});
room.addActor('Block',1192,1176,{type:'gray'});
room.addActor('Block',1192,1160,{type:'gray'});
room.addActor('Block',1192,1144,{type:'gray'});
room.addActor('Block',1192,1112,{type:'gray'});
room.addActor('LikeLike',1192,1096);
room.addActor('Block',1208,1112,{type:'gray'});
room.addActor('Block',1224,1192,{type:'gray'});
room.addActor('Block',1224,1176,{type:'gray'});
room.addActor('Block',1224,1160,{type:'gray'});
room.addActor('Block',1224,1144,{type:'gray'});
room.addActor('Block',1224,1128,{type:'gray'});
room.addActor('Block',1224,1112,{type:'gray'});


//-------------------------------------------------
// Room 4,7
//-------------------------------------------------
var room = dungeon.addRoom(4,7);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1048,1320);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Trap',1064,1368);
room.addActor('Trap',1064,1272);
room.addActor('Wizzrobe',1096,1352);
room.addActor('WizzrobeBlue',1128,1352);
room.addActor('Block',1128,1320,{type:'gray'});
room.addActor('Block',1144,1336,{type:'gray'});
room.addActor('Block',1144,1304,{type:'gray'});
room.addActor('Block',1160,1352,{type:'gray'});
room.addActor('Stairs',1160,1320);
room.addActor('Block',1160,1288,{type:'gray'});
room.addActor('Block',1176,1336,{type:'gray'});
room.addActor('Block',1176,1304,{type:'gray'});
room.addActor('Block',1192,1320,{type:'gray'});
room.addActor('WizzrobeBlue',1192,1288);
room.addActor('Wizzrobe',1224,1288);
room.addActor('Trap',1240,1368);
room.addActor('Trap',1240,1272);


//-------------------------------------------------
// Room 5,1
//-------------------------------------------------
var room = dungeon.addRoom(5,1);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Water',1320,280);
room.addActor('Wizzrobe',1320,264);
room.addActor('Water',1336,280);
room.addActor('WizzrobeBlue',1336,264);
room.addActor('WizzrobeBlue',1352,296);
room.addActor('Water',1352,280);
room.addActor('Water',1368,280);
room.addActor('Water',1384,280);
room.addActor('WizzrobeBlue',1384,248);
room.addActor('Water',1400,280);
room.addActor('Bubble',1400,248);
room.addActor('Water',1416,280);
room.addActor('Water',1432,280);
room.addActor('Bubble',1448,312);
room.addActor('Water',1448,280);
room.addActor('Bubble',1448,216);
room.addActor('Water',1464,280);
room.addActor('Wizzrobe',1464,264);
room.addActor('Water',1480,280);
room.addActor('Water',1496,280);


//-------------------------------------------------
// Room 5,2
//-------------------------------------------------
var room = dungeon.addRoom(5,2);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1304,440);
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',1512,440);
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1408,504);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1408,376);
room.addActor('Lanmola',1352,392);
room.addActor('Lanmola',1368,408);
room.addActor('Block',1384,440,{type:'gray'});
room.addActor('Block',1400,456,{type:'gray'});
room.addActor('Block',1400,424,{type:'gray'});
room.addActor('Block',1416,472,{type:'gray'});
room.addActor('a',1416,456);
room.addActor('Stairs',1416,440);
room.addActor('Block',1416,408,{type:'gray'});
room.addActor('Block',1432,456,{type:'gray'});
room.addActor('Block',1432,424,{type:'gray'});
room.addActor('Block',1448,440,{type:'gray'});


//-------------------------------------------------
// Room 5,3
//-------------------------------------------------
var room = dungeon.addRoom(5,3);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1408,552);
room.addActor('WizzrobeBlue',1368,664);
room.addActor('LikeLike',1368,568);
room.addActor('LikeLike',1416,600);
room.addActor('WizzrobeBlue',1464,616);
room.addActor('Bubble',1480,648);
room.addActor('LikeLike',1480,584);
room.addActor('Wizzrobe',1496,616);


//-------------------------------------------------
// Room 5,4
//-------------------------------------------------
var room = dungeon.addRoom(5,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1408,856);
room.exitByFacing['down'] = ace.WALL;
room.addActor('WizzrobeBlue',1368,808);
room.addActor('Wizzrobe',1400,776);
room.addActor('WizzrobeBlue',1448,744);
room.addActor('Wizzrobe',1464,840);
room.addActor('WizzrobeBlue',1480,760);


//-------------------------------------------------
// Room 5,5
//-------------------------------------------------
var room = dungeon.addRoom(5,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',1512,968);
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1408,1032);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1408,904);
room.addActor('Bubble',1320,968);
room.addActor('Bubble',1336,1000);
room.addActor('Zol',1336,936);
room.addActor('LikeLike',1368,984);
room.addActor('Zol',1368,952);
room.addActor('Block',1384,1016,{type:'gray'});
room.addActor('Block',1384,1000,{type:'gray'});
room.addActor('Block',1384,984,{type:'gray'});
room.addActor('Block',1384,968,{type:'gray'});
room.addActor('Block',1384,952,{type:'gray'});
room.addActor('Block',1384,936,{type:'gray'});
room.addActor('Block',1384,920,{type:'gray'});
room.addActor('LikeLike',1400,984);
room.addActor('SecretBomb',1416,968);
room.addActor('Block',1432,1016,{type:'gray'});
room.addActor('Block',1432,1000,{type:'gray'});
room.addActor('Block',1432,984,{type:'gray'});
room.addActor('Block',1432,968,{type:'gray'});
room.addActor('Block',1432,952,{type:'gray'});
room.addActor('Block',1432,936,{type:'gray'});
room.addActor('Block',1432,920,{type:'gray'});


//-------------------------------------------------
// Room 5,6
//-------------------------------------------------
var room = dungeon.addRoom(5,6);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',1304,1144);
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1408,1080);
room.addActor('Water',1336,1176);
room.addActor('Water',1336,1160);
room.addActor('Water',1336,1144);
room.addActor('Water',1336,1128);
room.addActor('Water',1336,1112);
room.addActor('Water',1352,1176);
room.addActor('Water',1352,1112);
room.addActor('Water',1368,1176);
room.addActor('Water',1368,1112);
room.addActor('WizzrobeBlue',1368,1096);
room.addActor('Water',1384,1176);
room.addActor('Water',1384,1112);
room.addActor('Water',1400,1176);
room.addActor('Water',1400,1112);
room.addActor('Water',1416,1176);
room.addActor('WizzrobeBlue',1416,1160);
room.addActor('SecretRupee',1416,1144);
room.addActor('WizzrobeBlue',1416,1128);
room.addActor('Water',1416,1112);
room.addActor('Water',1432,1176);
room.addActor('Water',1432,1112);
room.addActor('Water',1448,1176);
room.addActor('Water',1448,1112);
room.addActor('Water',1464,1176);
room.addActor('Water',1464,1112);
room.addActor('Water',1480,1176);
room.addActor('Water',1480,1160);
room.addActor('Water',1480,1144);
room.addActor('Water',1480,1128);
room.addActor('Water',1480,1112);


//-------------------------------------------------
// Room 5,7
//-------------------------------------------------
var room = dungeon.addRoom(5,7);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',1512,1320);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('WizzrobeBlue',1368,1304);
room.addActor('Block',1384,1320,{type:'gray'});
room.addActor('WizzrobeBlue',1400,1304);
room.addActor('Wizzrobe',1416,1320);
room.addActor('Block',1432,1320,{type:'gray'});
room.addActor('Stairs',1496,1368);
room.addActor('Wizzrobe',1496,1288);


//-------------------------------------------------
// Room 6,0
//-------------------------------------------------
var room = dungeon.addRoom(6,0);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('CaveExit', 6*256+128, 0, {teleportTo: [1365,1299, -16]});
room.addActor('OldMan', 6*256+128, 90, {'text1': ace.UNDER_CONSTRUCTION_MESSAGE });

room.addActor('Statue',1592,120,{type:'leftgray'});
room.addActor('Statue',1592,88,{type:'leftgray'});
room.addActor('Statue',1592,56,{type:'leftgray'});
room.addActor('Statue',1640,120,{type:'leftgray'});
room.addActor('Statue',1640,88,{type:'leftgray'});
room.addActor('Statue',1640,56,{type:'leftgray'});
room.addActor('Statue',1688,120,{type:'rightgray'});
room.addActor('Statue',1688,88,{type:'rightgray'});
room.addActor('Statue',1688,56,{type:'rightgray'});
room.addActor('Statue',1736,120,{type:'rightgray'});
room.addActor('Statue',1736,88,{type:'rightgray'});
room.addActor('Statue',1736,56,{type:'rightgray'});


//-------------------------------------------------
// Room 6,1
//-------------------------------------------------
var room = dungeon.addRoom(6,1);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',1560,264);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',1664,328);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Fire',1616,280);
room.addActor('OldMan',1664,272);
room.addActor('OldMan',1680,288);
room.addActor('Fire',1712,280);


//-------------------------------------------------
// Room 6,2
//-------------------------------------------------
var room = dungeon.addRoom(6,2);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1560,440);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Water',1576,472);
room.addActor('Water',1576,408);
room.addActor('Water',1592,472);
room.addActor('Water',1592,408);
room.addActor('Water',1608,472);
room.addActor('Water',1608,408);
room.addActor('Water',1624,472);
room.addActor('Zol',1624,456);
room.addActor('Water',1624,408);
room.addActor('Water',1640,472);
room.addActor('LikeLike',1640,424);
room.addActor('Water',1640,408);
room.addActor('Water',1656,472);
room.addActor('LikeLike',1656,456);
room.addActor('Water',1656,408);
room.addActor('Water',1672,472);
room.addActor('SecretKey',1672,440);
room.addActor('Water',1672,408);
room.addActor('Water',1688,472);
room.addActor('Bubble',1688,456);
room.addActor('Water',1688,408);
room.addActor('Bubble',1688,392);
room.addActor('Water',1704,472);
room.addActor('Water',1704,408);
room.addActor('Water',1720,472);
room.addActor('Water',1720,408);
room.addActor('Water',1736,472);
room.addActor('Water',1736,408);
room.addActor('Water',1752,472);
room.addActor('Water',1752,408);


//-------------------------------------------------
// Room 6,3
//-------------------------------------------------
var room = dungeon.addRoom(6,3);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('WizzrobeBlue',1624,664);
room.addActor('WizzrobeBlue',1624,568);
room.addActor('WizzrobeBlue',1672,632);
room.addActor('WizzrobeBlue',1736,648);
room.addActor('WizzrobeBlue',1736,584);
room.addActor('WizzrobeBlue',1752,616);


//-------------------------------------------------
// Room 6,4
//-------------------------------------------------
var room = dungeon.addRoom(6,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',1768,792);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',1664,856);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Bubble',1576,792);
room.addActor('Bubble',1592,824);
room.addActor('Bubble',1592,760);
room.addActor('Zol',1624,808);
room.addActor('Zol',1624,776);


//-------------------------------------------------
// Room 6,5
//-------------------------------------------------
var room = dungeon.addRoom(6,5);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',1560,968);
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',1768,968);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',1664,904);
room.addActor('Gel',1592,936);
room.addActor('Block',1608,1000,{type:'gray'});
room.addActor('Block',1608,936,{type:'gray'});
room.addActor('Gel',1624,984);
room.addActor('Gel',1624,920);
room.addActor('Gel',1656,968);
room.addActor('SecretRupee',1672,968);
room.addActor('Gel',1688,952);
room.addActor('Gel',1704,984);
room.addActor('Gel',1704,920);
room.addActor('Block',1720,1000,{type:'gray'});
room.addActor('Block',1720,936,{type:'gray'});
room.addActor('Gel',1736,936);


//-------------------------------------------------
// Room 6,6
//-------------------------------------------------
var room = dungeon.addRoom(6,6);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',1664,1208);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',1640,1144,{type:'gray'});
room.addActor('SecretBomb',1672,1144);
room.addActor('Patra',1688,1176);
room.addActor('Block',1688,1144,{type:'gray'});


//-------------------------------------------------
// Room 6,7
//-------------------------------------------------
var room = dungeon.addRoom(6,7);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1560,1320);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',1664,1256);
room.addActor('Fire',1616,1336);
room.addActor('OldMan',1664,1328);
room.addActor('Fire',1712,1336);


//-------------------------------------------------
// Room 7,2
//-------------------------------------------------
var room = dungeon.addRoom(7,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Water',1848,472);
room.addActor('Water',1848,456);
room.addActor('Water',1848,440);
room.addActor('Water',1848,424);
room.addActor('Water',1848,408);
room.addActor('Water',1864,472);
room.addActor('Water',1864,408);
room.addActor('Water',1880,472);
room.addActor('Water',1880,408);
room.addActor('WizzrobeBlue',1880,392);
room.addActor('Water',1896,472);
room.addActor('Water',1896,408);
room.addActor('Water',1912,472);
room.addActor('Wizzrobe',1912,440);
room.addActor('Wizzrobe',1912,424);
room.addActor('Water',1912,408);
room.addActor('Water',1928,472);
room.addActor('SecretKey',1928,440);
room.addActor('Water',1928,408);
room.addActor('Water',1944,472);
room.addActor('Water',1944,408);
room.addActor('Water',1960,472);
room.addActor('WizzrobeBlue',1960,456);
room.addActor('Water',1960,408);
room.addActor('WizzrobeBlue',1960,392);
room.addActor('Water',1976,472);
room.addActor('Water',1976,408);
room.addActor('Water',1992,472);
room.addActor('Water',1992,456);
room.addActor('Water',1992,440);
room.addActor('Water',1992,424);
room.addActor('Water',1992,408);


//-------------------------------------------------
// Room 7,3
//-------------------------------------------------
var room = dungeon.addRoom(7,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('WizzrobeBlue',1848,584);
room.addActor('WizzrobeBlue',1880,568);
room.addActor('Wizzrobe',1896,648);
room.addActor('Wizzrobe',1912,648);
room.addActor('Block',1912,632,{type:'gray'});
room.addActor('Block',1912,616,{type:'gray'});
room.addActor('Block',1912,600,{type:'gray'});
room.addActor('Block',1928,632,{type:'gray'});
room.addActor('Block',1928,616,{type:'gray'});
room.addActor('Block',1928,600,{type:'gray'});
room.addActor('Bubble',1944,600);
room.addActor('Bubble',1960,632);
room.addActor('WizzrobeBlue',1960,568);
room.addActor('Bubble',1992,664);
room.addActor('WizzrobeBlue',1992,584);
room.addActor('SecretKey',2008,664);


//-------------------------------------------------
// Room 7,4
//-------------------------------------------------
var room = dungeon.addRoom(7,4);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1816,792);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1920,856);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Vire',1848,760);
room.addActor('Statue',1896,792,{type:'leftgray'});
room.addActor('Vire',1912,792);
room.addActor('SecretBomb',1928,792);
room.addActor('Statue',1944,792,{type:'rightgray'});
room.addActor('Vire',1944,776);
room.addActor('Vire',1960,808);
room.addActor('Vire',1960,744);
room.addActor('Vire',1992,760);


//-------------------------------------------------
// Room 7,5
//-------------------------------------------------
var room = dungeon.addRoom(7,5);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1816,968);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1920,1032);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1920,904);
room.addActor('Block',1896,968,{type:'gray'});
room.addActor('SecretMap',1928,968);
room.addActor('Block',1944,968,{type:'gray'});


//-------------------------------------------------
// Room 7,6
//-------------------------------------------------
var room = dungeon.addRoom(7,6);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('BombHole',1920,1208);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1920,1080);
room.addActor('Block',1848,1176,{type:'gray'});
room.addActor('Block',1848,1112,{type:'gray'});
room.addActor('Block',1864,1176,{type:'gray'});
room.addActor('Block',1864,1112,{type:'gray'});
room.addActor('Wizzrobe',1864,1096);
room.addActor('WizzrobeBlue',1880,1192);
room.addActor('LikeLike',1880,1128);
room.addActor('Block',1912,1144,{type:'gray'});
room.addActor('Bubble',1928,1176);
room.addActor('Block',1928,1144,{type:'gray'});
room.addActor('LikeLike',1944,1160);
room.addActor('LikeLike',1960,1192);
room.addActor('WizzrobeBlue',1960,1128);
room.addActor('Block',1976,1176,{type:'gray'});
room.addActor('Block',1976,1112,{type:'gray'});
room.addActor('Wizzrobe',1976,1096);
room.addActor('Block',1992,1176,{type:'gray'});
room.addActor('Block',1992,1112,{type:'gray'});


//-------------------------------------------------
// Room 7,7
//-------------------------------------------------
var room = dungeon.addRoom(7,7);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('BombHole',1920,1256);
room.addActor('Bubble',1848,1352);
room.addActor('Wizzrobe',1848,1272);
room.addActor('Bubble',1880,1368);
room.addActor('Block',1896,1320,{type:'gray'});
room.addActor('Block',1912,1336,{type:'gray'});
room.addActor('Block',1912,1304,{type:'gray'});
room.addActor('Block',1928,1352,{type:'gray'});
room.addActor('Stairs',1928,1320);
room.addActor('Block',1928,1288,{type:'gray'});
room.addActor('Block',1944,1336,{type:'gray'});
room.addActor('Block',1944,1304,{type:'gray'});
room.addActor('WizzrobeBlue',1960,1368);
room.addActor('Block',1960,1320,{type:'gray'});
room.addActor('Bubble',1992,1352);
room.addActor('Wizzrobe',1992,1272);
