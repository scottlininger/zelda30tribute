/**
 * @fileoverview  Create dungeon.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Setup calls for dungeon.
 * @type {ace.Dungeon}
 */
ace.dungeons = ace.dungeons || {};
var dungeon = new ace.Dungeon('dungeons/dungeon3.png');
ace.dungeons['3'] = dungeon;
ace.dungeons['3'].name = 'Dungeon3';
 
 

//-------------------------------------------------
// Room 0,1
//-------------------------------------------------
var room = dungeon.addRoom(0,1);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Darknut',56,232);
room.addActor('Darknut',88,280);
room.addActor('Darknut',88,216);
room.addActor('Darknut',104,248);
room.addActor('Darknut',120,264);
room.addActor('Darknut',152,248);
room.addActor('Block',168,312,{type:'green'});
room.addActor('Block',168,296,{type:'green'});
room.addActor('Darknut',168,280);
room.addActor('Block',168,232,{type:'green'});
room.addActor('Block',168,216,{type:'green'});
room.addActor('Block',184,312,{type:'green'});
room.addActor('Block',184,296,{type:'green'});
room.addActor('Block',184,280,{type:'green'});
room.addActor('Block',184,248,{type:'green'});
room.addActor('Block',184,232,{type:'green'});
room.addActor('Block',184,216,{type:'green'});
room.addActor('Block',200,312,{type:'green'});
room.addActor('Block',200,296,{type:'green'});
room.addActor('Block',200,280,{type:'green'});
room.addActor('Block',200,248,{type:'green'});
room.addActor('Block',200,232,{type:'green'});
room.addActor('Block',200,216,{type:'green'});
room.addActor('Block',216,312,{type:'green'});
room.addActor('Block',216,296,{type:'green'});
room.addActor('Block',216,280,{type:'green'});
room.addActor('Stairs',216,264,{z: -990, teleportTo: [55, 1014, -1008, 3]});
room.addActor('Block',216,248,{type:'green'});
room.addActor('Block',216,232,{type:'green'});
room.addActor('Block',216,216,{type:'green'});


//-------------------------------------------------
// Room 0,2
//-------------------------------------------------
var room = dungeon.addRoom(0,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',232,440);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',128,376);
room.addActor('Darknut',40,440);
room.addActor('Darknut',56,472);
room.addActor('Block',72,456,{type:'green'});
room.addActor('Block',72,440,{type:'green'});
room.addActor('Block',72,424,{type:'green'});
room.addActor('Block',88,456,{type:'green'});
room.addActor('Block',88,440,{type:'green'});
room.addActor('Block',88,424,{type:'green'});
room.addActor('Darknut',120,424);
room.addActor('Darknut',168,488);
room.addActor('Block',168,456,{type:'green'});
room.addActor('Block',168,440,{type:'green'});
room.addActor('Block',168,424,{type:'green'});
room.addActor('Darknut',168,392);
room.addActor('Block',184,456,{type:'green'});
room.addActor('Block',184,440,{type:'green'});
room.addActor('Block',184,424,{type:'green'});


//-------------------------------------------------
// Room 0,3
//-------------------------------------------------
var room = dungeon.addRoom(0,3);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Keese',40,616);
room.addActor('Bubble',56,584);
room.addActor('Bubble',88,632);
room.addActor('Bubble',88,600);
room.addActor('Zol',120,632);
room.addActor('Zol',120,600);
room.addActor('SecretKey',136,616);
room.addActor('Keese',168,664);
room.addActor('Keese',168,568);


//-------------------------------------------------
// Room 1,2
//-------------------------------------------------
var room = dungeon.addRoom(1,2);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',280,440);
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Trap',296,488);
room.addActor('Trap',296,392);
room.addActor('Keese',312,472);
room.addActor('Keese',312,408);
room.addActor('Keese',344,456);
room.addActor('Keese',344,424);
room.addActor('Compass',392,440);
room.addActor('Trap',472,488);
room.addActor('Trap',472,392);


//-------------------------------------------------
// Room 1,3
//-------------------------------------------------
var room = dungeon.addRoom(1,3);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',488,616);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',296,632,{type:'green'});
room.addActor('Keese',296,616);
room.addActor('Block',296,600,{type:'green'});
room.addActor('Keese',312,648);
room.addActor('Block',312,632,{type:'green'});
room.addActor('Block',312,600,{type:'green'});
room.addActor('Keese',312,584);
room.addActor('Block',328,632,{type:'green'});
room.addActor('Block',328,600,{type:'green'});
room.addActor('Block',344,632,{type:'green'});
room.addActor('Block',344,600,{type:'green'});
room.addActor('Block',360,632,{type:'green'});
room.addActor('Block',360,600,{type:'green'});
room.addActor('Block',376,632,{type:'green'});
room.addActor('Block',376,600,{type:'green'});
room.addActor('Block',392,632,{type:'green'});
room.addActor('SecretBomb',392,616);
room.addActor('Block',392,600,{type:'green'});
room.addActor('Block',408,632,{type:'green'});
room.addActor('Block',408,600,{type:'green'});
room.addActor('Keese',424,664);
room.addActor('Block',424,632,{type:'green'});
room.addActor('Block',424,600,{type:'green'});
room.addActor('Keese',424,568);
room.addActor('Block',440,632,{type:'green'});
room.addActor('Block',440,600,{type:'green'});
room.addActor('Block',456,632,{type:'green'});
room.addActor('Block',456,600,{type:'green'});
room.addActor('Block',472,632,{type:'green'});
room.addActor('Block',472,600,{type:'green'});


//-------------------------------------------------
// Room 1,5
//-------------------------------------------------
var room = dungeon.addRoom(1,5);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',488,968);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Keese',296,968);
room.addActor('Keese',312,1000);
room.addActor('Keese',312,936);
room.addActor('Block',328,984,{type:'green'});
room.addActor('Block',328,968,{type:'green'});
room.addActor('Block',328,952,{type:'green'});
room.addActor('Block',344,984,{type:'green'});
room.addActor('Block',344,968,{type:'green'});
room.addActor('Block',344,952,{type:'green'});
room.addActor('Keese',376,984);
room.addActor('Keese',376,952);
room.addActor('SecretKey',392,968);
room.addActor('Keese',424,1016);
room.addActor('Block',424,984,{type:'green'});
room.addActor('Block',424,968,{type:'green'});
room.addActor('Block',424,952,{type:'green'});
room.addActor('Keese',424,920);
room.addActor('Block',440,984,{type:'green'});
room.addActor('Block',440,968,{type:'green'});
room.addActor('Block',440,952,{type:'green'});


//-------------------------------------------------
// Room 2,0
//-------------------------------------------------
var room = dungeon.addRoom(2,0);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.OPEN;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('CaveExit', 3*256+128, 0, {teleportTo: [1157,107, -16]});
room.addActor('Zol',568,56);
room.addActor('Block',584,120,{type:'green'});
room.addActor('Block',584,56,{type:'green'});
room.addActor('Zol',600,104);
room.addActor('Zol',600,72);
room.addActor('Zol',632,104);
room.addActor('Zol',632,72);
room.addActor('SecretKey',648,88);
room.addActor('Zol',680,136);
room.addActor('Block',696,120,{type:'green'});
room.addActor('Block',696,56,{type:'green'});


//-------------------------------------------------
// Room 2,1
//-------------------------------------------------
var room = dungeon.addRoom(2,1);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',552,216,{type:'green'});
room.addActor('Block',568,296,{type:'green'});
room.addActor('Block',568,232,{type:'green'});
room.addActor('Block',584,312,{type:'green'});
room.addActor('Block',584,248,{type:'green'});
room.addActor('Block',600,264,{type:'green'});
room.addActor('Zol',600,248);
room.addActor('Block',616,280,{type:'green'});
room.addActor('Block',632,296,{type:'green'});
room.addActor('Zol',632,248);
room.addActor('SecretKey',648,264);
room.addActor('Block',648,232,{type:'green'});
room.addActor('Zol',664,280);
room.addActor('Block',664,248,{type:'green'});
room.addActor('Zol',680,312);
room.addActor('Block',680,264,{type:'green'});
room.addActor('Zol',680,248);
room.addActor('Block',696,280,{type:'green'});
room.addActor('Block',696,216,{type:'green'});
room.addActor('Block',712,296,{type:'green'});
room.addActor('Block',712,232,{type:'green'});
room.addActor('Block',728,312,{type:'green'});


//-------------------------------------------------
// Room 2,2
//-------------------------------------------------
var room = dungeon.addRoom(2,2);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',744,440);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('SecretBomb',648,440);
room.addActor('Darknut',680,488);
room.addActor('Darknut',680,424);
room.addActor('Darknut',712,472);


//-------------------------------------------------
// Room 2,3
//-------------------------------------------------
var room = dungeon.addRoom(2,3);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',536,616);
room.exitByFacing['right'] = ace.OPEN;
room.addActor('LockedDoor',744,616);
room.exitByFacing['up'] = ace.OPEN;
room.addActor('LockedDoor',640,680);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',568,648,{type:'green'});
room.addActor('Block',568,584,{type:'green'});
room.addActor('Block',584,648,{type:'green'});
room.addActor('Zol',584,632);
room.addActor('Block',584,584,{type:'green'});
room.addActor('Block',600,648,{type:'green'});
room.addActor('Zol',600,616);
room.addActor('Block',600,584,{type:'green'});
room.addActor('Block',616,648,{type:'green'});
room.addActor('Zol',616,632);
room.addActor('Block',616,584,{type:'green'});
room.addActor('Block',632,648,{type:'green'});
room.addActor('Block',632,584,{type:'green'});
room.addActor('Block',648,648,{type:'green'});
room.addActor('SecretKey',648,616);
room.addActor('Block',648,584,{type:'green'});
room.addActor('Block',664,648,{type:'green'});
room.addActor('Block',664,584,{type:'green'});
room.addActor('Block',680,648,{type:'green'});
room.addActor('Block',680,584,{type:'green'});
room.addActor('Block',696,648,{type:'green'});
room.addActor('Block',696,584,{type:'green'});
room.addActor('Block',712,648,{type:'green'});
room.addActor('Block',712,632,{type:'green'});
room.addActor('Block',712,616,{type:'green'});
room.addActor('Block',712,600,{type:'green'});
room.addActor('Block',712,584,{type:'green'});


//-------------------------------------------------
// Room 2,4
//-------------------------------------------------
var room = dungeon.addRoom(2,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',640,856,{openAction: 'PushableBlock'});
room.exitByFacing['down'] = ace.OPEN;
room.addActor('LockedDoor',640,728);
room.addActor('Trap',552,840);
room.addActor('Trap',552,744);
room.addActor('Zol',568,824);
room.addActor('Zol',600,840);
room.addActor('PushableBlock',616,792,{type:'green'});
room.addActor('Block',664,792,{type:'green'});
room.addActor('Trap',728,840);
room.addActor('Trap',728,744);


//-------------------------------------------------
// Room 2,5
//-------------------------------------------------
var room = dungeon.addRoom(2,5);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Fire',592,984);
room.addActor('OldMan',640,982,
    {'text1': "DID YOU GET THE SWORD\n" +
              "FROM THE OLD MAN ON\nTOP OF THE WATERFALL?"});
room.addActor('Fire',688,984);


//-------------------------------------------------
// Room 3,0
//-------------------------------------------------
var room = dungeon.addRoom(3,0);
room.exitByFacing['left'] = ace.OPEN;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('CaveExit', 3*256+128, 0, {teleportTo: [1157,107, -16]});
room.addActor('Statue',824,120,{type:'leftred'});
room.addActor('Statue',824,88,{type:'leftred'});
room.addActor('Statue',824,56,{type:'leftred'});
room.addActor('Statue',872,120,{type:'leftred'});
room.addActor('Statue',872,88,{type:'leftred'});
room.addActor('Statue',872,56,{type:'leftred'});
room.addActor('Statue',920,120,{type:'rightred'});
room.addActor('Statue',920,88,{type:'rightred'});
room.addActor('Statue',920,56,{type:'rightred'});
room.addActor('Statue',968,120,{type:'rightred'});
room.addActor('Statue',968,88,{type:'rightred'});
room.addActor('Statue',968,56,{type:'rightred'});

//-------------------------------------------------
// Room 3,2
//-------------------------------------------------
var room = dungeon.addRoom(3,2);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',792,440);
room.exitByFacing['right'] = ace.OPEN;
room.addActor('BarredDoor',1000,440);
room.exitByFacing['up'] = ace.OPEN;
room.exitByFacing['down'] = ace.WALL;
room.addActor('Block',824,472,{type:'green'});
room.addActor('Block',824,408,{type:'green'});
room.addActor('Block',840,472,{type:'green'});
room.addActor('Block',840,408,{type:'green'});
room.addActor('Darknut',856,488);
room.addActor('Darknut',856,392);
room.addActor('Block',888,440,{type:'green'});
room.addActor('Block',904,440,{type:'green'});
room.addActor('Block',952,472,{type:'green'});
room.addActor('Block',952,408,{type:'green'});
room.addActor('Block',968,472,{type:'green'});
room.addActor('Block',968,408,{type:'green'});
room.addActor('Darknut',984,440);


//-------------------------------------------------
// Room 3,3
//-------------------------------------------------
var room = dungeon.addRoom(3,3);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('LockedDoor',792,616);
room.exitByFacing['right'] = ace.BOMBABLE;
room.addActor('BombHole',1000,616);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Trap',808,664);
room.addActor('Trap',808,568);
room.addActor('Map',904,616);
room.addActor('Zol',936,600);
room.addActor('Zol',968,648);
room.addActor('Trap',984,664);
room.addActor('Trap',984,568);


//-------------------------------------------------
// Room 4,2
//-------------------------------------------------
var room = dungeon.addRoom(4,2);
room.exitByFacing['left'] = ace.OPEN;
room.addActor('BarredDoor',1048,440);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',1152,504);
room.exitByFacing['down'] = ace.WALL;
room.addActor('Keese',1112,488);
room.addActor('Keese',1112,392);
room.addActor('Block',1144,456,{type:'green'});
room.addActor('Block',1144,440,{type:'green'});
room.addActor('Block',1144,424,{type:'green'});
room.addActor('Block',1160,456,{type:'green'});
room.addActor('Block',1160,440,{type:'green'});
room.addActor('Block',1160,424,{type:'green'});
room.addActor('Bubble',1192,456);
room.addActor('Keese',1192,424);
room.addActor('Bubble',1192,408);
room.addActor('Bubble',1224,472);
room.addActor('Zol',1224,408);
room.addActor('Zol',1240,440);


//-------------------------------------------------
// Room 4,3
//-------------------------------------------------
var room = dungeon.addRoom(4,3);
room.exitByFacing['left'] = ace.BOMBABLE;
room.addActor('BombHole',1048,616);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.OPEN;
room.addActor('BarredDoor',1152,680);
room.exitByFacing['down'] = ace.OPEN;
room.addActor('BarredDoor',1152,552);
room.addActor('Manhandla',1144,632);
room.addActor('SecretHeartContainer',1160,616);


//-------------------------------------------------
// Room 4,4
//-------------------------------------------------
var room = dungeon.addRoom(4,4);
room.isCompassPoint = true;
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.OPEN;
room.addActor('Block',1080,824,{type:'green'});
room.addActor('Block',1080,808,{type:'green'});
room.addActor('Block',1080,792,{type:'green'});
room.addActor('Block',1080,776,{type:'green'});
room.addActor('Block',1080,760,{type:'green'});
room.addActor('Block',1096,824,{type:'green'});
room.addActor('Block',1096,760,{type:'green'});
room.addActor('Block',1112,824,{type:'green'});
room.addActor('Statue',1112,792,{type:'leftgreen'});
room.addActor('Block',1112,760,{type:'green'});
room.addActor('Block',1128,824,{type:'green'});
room.addActor('Statue',1128,808,{type:'leftgreen'});
room.addActor('Block',1128,760,{type:'green'});
room.addActor('Block',1144,824,{type:'green'});
room.addActor('TriforcePiece',1152,784, {teleportTo: [1157,107, -16]});
room.addActor('Block',1160,824,{type:'green'});
room.addActor('Block',1176,824,{type:'green'});
room.addActor('Statue',1176,808,{type:'rightgreen'});
room.addActor('Block',1176,760,{type:'green'});
room.addActor('Block',1192,824,{type:'green'});
room.addActor('Statue',1192,792,{type:'rightgreen'});
room.addActor('Block',1192,760,{type:'green'});
room.addActor('Block',1208,824,{type:'green'});
room.addActor('Block',1208,760,{type:'green'});
room.addActor('Block',1224,824,{type:'green'});
room.addActor('Block',1224,808,{type:'green'});
room.addActor('Block',1224,792,{type:'green'});
room.addActor('Block',1224,776,{type:'green'});
room.addActor('Block',1224,760,{type:'green'});


//----------------------
// RAFT ROOM
//-----------------------
room = dungeon.addRoom(0,5);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.addActor('WhiteBrickRoom', 128, 952);
room.hideOnMap = true;
room.addActor('Keese', 55, 933);
room.addActor('Keese', 55+32, 933);
room.addActor('Keese', 55+64, 933);
room.addActor('Keese', 55+96, 933);
room.addActor('Raft', 137, 985);
room.cameraEyeOffset = [0,90,0];
room.cameraTargetOffset = [0,0,0];
room.addActor('Stairs', 55,1022, {teleportTo: [216-12, 264, -1008, 3]});

