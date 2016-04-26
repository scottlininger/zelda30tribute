/**
 * @fileoverview  Create dungeon 1.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Setup calls for dungeon 1.
 * @type {ace.Dungeon}
 */
ace.dungeons = ace.dungeons || {};
ace.dungeons['1'] = new ace.Dungeon('dungeons/dungeon1.png');
ace.dungeons['1'].name = 'Dungeon1';



//-------------------------------------------------
// The initial room with the old man and the sword.
//-------------------------------------------------
room = ace.dungeons[1].addRoom(7,0);
room.hideOnMap = true;
room.cameraTargetOffset = [0,40,0];
room.cameraEyeOffset = [0,0,-25];
room.addActor('Fire', 1872, 110);
room.addActor('Fire', 1968, 110);
room.addActor('CaveExit', 1920, 8, {teleportTo: [1864, 150, -16]});
room.addActor('Text', 1846, 115, {'text': "IT'S DANGEROUS TO GO\n  ALONE! TAKE THIS.", hideIfInventory: 'itemwoodensword'});
room.addActor('OldMan', 1920, 110, {'spriteName': 'oldman1', faceAvatar: true, hideIfInventory: 'itemwoodensword'});
room.addActor('Treasure', 1921, 110 - 24, {'spriteName': 'itemwoodensword', hideIfInventory: 'itemwoodensword'});


room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.song = null;

for (var col = 0; col < 13; col++) {
  room.addActor('Obstacle', 1824 + col * 16, 
                150 - ace.randomInt(4), {'spriteName': 'caverock', rotX: -Math.random() / 2});
}
/*
for (var row = 0; row < 8; row++) {
  room.addActor('Obstacle', 1816 + row % 2.5, 
                40 + row * 16, {'spriteName': 'caverock'});
  room.addActor('Obstacle', 2024 - row % 2.5, 
                40 + row * 16, {'spriteName': 'caverock'});
}
*/

//-------------------------------------------------
// The store just north west of the start room.
//-------------------------------------------------
room = ace.dungeons[1].addRoom(7,1);
room.hideOnMap = true;
room.addActor('Fire', 1872, 110 + 176);
room.addActor('Fire', 1968, 110 + 176);
room.addActor('CaveExit', 1920, 176 + 8, {teleportTo: [1656, 328, -16]});
room.addActor('Text', 1846, 115 + 176, {'text': "BUY SOMETHIN\' WILL YA!", hideIfInventory: 'notsure'});
room.addActor('OldMan', 1920, 110 + 176, {'spriteName': 'merchant', hideIfInventory: 'notsure'});

room.addActor('Treasure', 1921, 110 - 24 + 176, {'spriteName': 'whistle', hideIfInventory: 'notsure'});
room.addActor('Raft', 1921 - 32, 110 - 24 + 176);
room.addActor('Bow', 1921 + 32, 110 - 24 + 176);

room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.song = null;

for (var col = 0; col < 13; col++) {
  room.addActor('Obstacle', 1824 + col * 16, 
                150 - ace.randomInt(4) + 176, {'spriteName': 'caverock', rotX: -Math.random() / 2});
}


//-------------------------------------------------
// The generic "Not yet done" placeholder.
//-------------------------------------------------
room = ace.dungeons[1].addRoom(7,2);
room.hideOnMap = true;
room.addActor('Fire', 1872, 110 + 176 + 176);
room.addActor('Fire', 1968, 110 + 176 + 176);
room.addActor('CaveExit', 1920, 176 + 176 + 8, {teleportToLastOverworldLocation: true});
room.addActor('OldMan', 1920, 460, {'text1': ' OH NO! MY DEMO IS\n' +
                                             ' SHOWING. THIS ROOM\n' +
                                             ' IS NOT YET WORKING.'});

room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.song = null;

for (var col = 0; col < 13; col++) {
  room.addActor('Obstacle', 1824 + col * 16, 
                150 - ace.randomInt(4) + 176, {'spriteName': 'caverock', rotX: -Math.random() / 2});
}



//-------------------------------------------------
// Entry room.
//-------------------------------------------------
room = ace.dungeons[1].addRoom(2,0);

room.addActor('CaveExit', 640, 0, {teleportTo: [1912, 808, -16]});
//room.exitByFacing['up'] = ace.LOCKED;



room.addActor('Obstacle', 560+8, 112+8, {'spriteName': 'statue1', rotX: -.2, rotZ:Math.PI/2});
room.addActor('Obstacle', 560+8+48, 112+8, {'spriteName': 'statue1', rotX: -.2, rotZ:Math.PI/2});
room.addActor('Obstacle', 560+8, 112+8-32, {'spriteName': 'statue1', rotX: -.2, rotZ:Math.PI/2});
room.addActor('Obstacle', 560+8+48, 112+8-32, {'spriteName': 'statue1', rotX: -.2, rotZ:Math.PI/2});
room.addActor('Obstacle', 560+8, 112+8-32-32, {'spriteName': 'statue1', rotX: -.2, rotZ:Math.PI/2});
room.addActor('Obstacle', 560+8+48, 112+8-32-32, {'spriteName': 'statue1', rotX: -.2, rotZ:Math.PI/2});


room.addActor('Obstacle', 656+8, 112+8, {'spriteName': 'statue2', rotX: -.2, rotZ:-Math.PI/2});
room.addActor('Obstacle', 656+8+48, 112+8, {'spriteName': 'statue2', rotX: -.2, rotZ:-Math.PI/2});
room.addActor('Obstacle', 656+8, 112+8-32, {'spriteName': 'statue2', rotX: -.2, rotZ:-Math.PI/2});
room.addActor('Obstacle', 656+8+48, 112+8-32, {'spriteName': 'statue2', rotX: -.2, rotZ:-Math.PI/2});
room.addActor('Obstacle', 656+8, 112+8-32-32, {'spriteName': 'statue2', rotX: -.2, rotZ:-Math.PI/2});
room.addActor('Obstacle', 656+8+48, 112+8-32-32, {'spriteName': 'statue2', rotX: -.2, rotZ:-Math.PI/2});


room.addActor('LockedDoor', 640, 152)

/*room.addActor('BarredDoor', 640, 152);
room.addActor('BarredDoor', 536, 88);
room.addActor('BarredDoor', 744, 88);
room.addActor('BarredDoor', 640, 24);
room.addActor('BombHole', 640+32, 152);
room.addActor('BombHole', 536, 88+32);
room.addActor('BombHole', 744, 88+32);
room.addActor('BombHole', 640+32, 24);*/


//room.addActor('Gel', 640, 100);


//-----------------------
room = ace.dungeons[1].addRoom(3,0);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;

room.addActor('Obstacle', 832+8, 64+8, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8, 64+8+16, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8, 64+8+32, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8+16, 64+8, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8+16, 64+8+16, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8+16, 64+8+32, {'spriteName': 'block', rotZ:0});

room.addActor('Obstacle', 832+8+96, 64+8, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8+96, 64+8+16, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8+96, 64+8+32, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8+16+96, 64+8, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8+16+96, 64+8+16, {'spriteName': 'block', rotZ:0});
room.addActor('Obstacle', 832+8+16+96, 64+8+32, {'spriteName': 'block', rotZ:0});

room.addActor('Stalfos', 857, 40);
room.addActor('Stalfos', 857, 137);
room.addActor('Stalfos', 905, 72);
room.addActor('Stalfos', 904, 104);
room.addActor('Stalfos', 984, 88, {carrying: 'key'});


//-----------------------
room = ace.dungeons[1].addRoom(2,1);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['left'] = ace.WALL;

room.addActor('Obstacle', 624+8, 240+8, {'spriteName': 'block'});
room.addActor('Obstacle', 624+8, 240+8+16, {'spriteName': 'block'});
room.addActor('Obstacle', 624+8, 240+8+32, {'spriteName': 'block'});
room.addActor('Obstacle', 624+8+16, 240+8, {'spriteName': 'block'});
room.addActor('Obstacle', 624+8+16, 240+8+16, {'spriteName': 'block'});
room.addActor('Obstacle', 624+8+16, 240+8+32, {'spriteName': 'block'});

room.addActor('Stalfos', 600, 249);
room.addActor('Stalfos', 617, 280);
room.addActor('Stalfos', 600, 250);



//-----------------------
room = ace.dungeons[1].addRoom(2,2);
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('Obstacle', 576+8, 416+8, {'spriteName': 'block'});
room.addActor('Obstacle', 576+8, 416+8+32, {'spriteName': 'block'});
room.addActor('Obstacle', 576+8+7*16, 416+8, {'spriteName': 'block'});
room.addActor('Obstacle', 576+8+7*16, 416+8+32, {'spriteName': 'block'});
room.addActor('Stalfos', 600, 424);
room.addActor('Stalfos', 617, 456);
room.addActor('Stalfos', 647, 440);
room.addActor('Stalfos', 665, 456);
room.addActor('Stalfos', 680, 488);
room.addActor('SecretKey', 648, 470);
room.addActor('BombHole', 640, 504);


//-----------------------
room = ace.dungeons[1].addRoom(1,0);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;

room.addActor('SecretKey', 423, 39);
room.addActor('Keese', 311, 54);
room.addActor('Keese', 344, 103);
room.addActor('Keese', 311, 121);


//-----------------------
room = ace.dungeons[1].addRoom(1,2);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;

room.addActor('Obstacle', 368+8, 416+8, {'spriteName': 'block'});
room.addActor('Obstacle', 368+8, 416+8+16, {'spriteName': 'block'});
room.addActor('Obstacle', 368+8, 416+8+32, {'spriteName': 'block'});

room.addActor('Obstacle', 368+8+16, 416+8, {'spriteName': 'block'});
room.addActor('Obstacle', 368+8+16, 416+8+16, {'spriteName': 'block'});
room.addActor('Obstacle', 368+8+16, 416+8+32, {'spriteName': 'block'});


room.addActor('Keese', 422, 392);
room.addActor('Keese', 422, 488);
room.addActor('Keese', 343, 423);
room.addActor('Keese', 344, 455);
room.addActor('Keese', 311, 408);
room.addActor('Keese', 296, 441);
room.addActor('BarredDoor', 488, 440);
room.addActor('LockedDoor', 384, 504);



//-----------------------
room = ace.dungeons[1].addRoom(3,2);
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.exitByFacing['up'] = ace.BOMBABLE;
room.addActor('Keese', 904, 424);
room.addActor('Keese', 904, 424+32);
room.addActor('Keese', 904+32, 424);
room.addActor('Keese', 904+32, 424+32);
room.addActor('Keese', 968, 408);
room.addActor('Keese', 968, 408 + 4*16);
room.addActor('Keese', 968+16, 408 + 2*16);
room.addActor('Keese', 858, 488);
room.addActor('Compass', 968, 440);
room.addActor('Block', 840, 408);
room.addActor('Block', 840, 408 + 4*16);
room.addActor('Block', 840+112, 408);
room.addActor('Block', 840+112, 408 + 4*16);
room.addActor('BombHole', 896, 504);

//----------------------
// START ROW 3
//-----------------------
room = ace.dungeons[1].addRoom(0,3);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.exitByFacing['left'] = ace.WALL;
room.addActor('OldMan', 128, 648, {'text1': "EASTMOST PENNINSULA\n   IS THE SECRET."});
room.addActor('Fire', 80, 648);
room.addActor('Fire', 176, 648);

room = ace.dungeons[1].addRoom(1,3);
room.exitByFacing['up'] = ace.WALL;
room.addActor('Gel', 392, 600);
room.addActor('Gel', 408, 632);
room.addActor('Gel', 424, 664);
room.addActor('PushableBlock', 376, 616);
room.addActor('BarredDoor', 280, 616, {openAction: 'PushableBlock'});

room = ace.dungeons[1].addRoom(2,3);
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('LockedDoor', 744, 616);
room.addActor('Gel', 600, 584);
room.addActor('Gel', 616, 664);
room.addActor('Gel', 680, 616);
room.addActor('Gel', 680, 586);
room.addActor('Gel', 728, 632);
room.addActor('Block', 568, 584);
room.addActor('Block', 568+16, 584);
room.addActor('Block', 568, 584+4*16);
room.addActor('Block', 568+16, 584+4*16);
room.addActor('Block', 568+128, 584);
room.addActor('Block', 568+16+128, 584);
room.addActor('Block', 568+128, 584+4*16);
room.addActor('Block', 568+16+128, 584+4*16);
room.addActor('Block', 568+64, 584+32);
room.addActor('Block', 568+16+64, 584+32);
room.addActor('Map', 712, 616);
room.addActor('BombHole', 640,552);

room = ace.dungeons[1].addRoom(3,3);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['down'] = ace.BOMBABLE;
room.addActor('Goriya', 848+8, 560+8);
room.addActor('Goriya', 848+8, 560+8 + 6*16);
room.addActor('Goriya', 976+8, 608+8);
room.addActor('Block', 832+8, 592+8);
room.addActor('Block', 832+8, 592+8+32);
room.addActor('Block', 832+8+112, 592+8);
room.addActor('Block', 832+8+112, 592+8+32);
room.addActor('Boomerang', 896+8, 640+8);
room.addActor('BombHole', 640+256,552);


room = ace.dungeons[1].addRoom(4,3);
room.exitByFacing['down'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.addActor('LockedDoor', 1152,672+8);
room.addActor('Key', 1184+8,560+8);
room.threeBlocks = function(x) {
	room.addActor('Block', x+8,584);
	room.addActor('Block', x+8,584+32);
	room.addActor('Block', x+8,584+64);
}
room.threeBlocks(1072);
room.threeBlocks(1072+32);
room.threeBlocks(1072+32+32);
room.threeBlocks(1072+32+32+16);
room.threeBlocks(1072+32+32+16+32);
room.threeBlocks(1072+32+32+16+32+32);
room.addActor('WallMaster',1064,584, { teleportTo: [640,60,-1008] });
room.addActor('WallMaster',1064,632, { teleportTo: [640,60,-1008] });
room.addActor('WallMaster',1064,584, { teleportTo: [640,60,-1008] });
room.addActor('WallMaster',1064,632, { teleportTo: [640,60,-1008] });

//----------------------
// ROW 4
//-----------------------
room = ace.dungeons[1].addRoom(2,4);
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.addActor('LockedDoor', 640, 856);
room.addActor('Stalfos', 586,824);
room.addActor('Stalfos', 712,824, {carrying: 'key'});
room.addActor('Stalfos', 680,776);
room.addWalkMap('     XX     ' +
                ' XXX XXXX X ' +
                ' X X X  X X ' +
                'XX X XX X XX' +
                ' X X  X X X ' +
                ' X XXXX XXX ' +
                '     XX     ');

// Big baddie.
room = ace.dungeons[1].addRoom(4,4);
room.cameraTargetOffset = room.cameraEyeOffset = [0,-30,60];
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['up'] = ace.WALL;
room.blockLine = function(x,y,count) {
	for (var i = 0; i < count; i++) {
	  room.addActor('Block',x+8+i*16, y+8);
	}
}
room.blockLine(1168,736,5);
room.blockLine(1168+32,736+16,3);
room.blockLine(1168+32+16,736+32,2);
room.blockLine(1168,736+96,5);
room.blockLine(1168+32,736+96-16,3);
room.blockLine(1168+32+16,736+96-32,2);
room.addActor('BarredDoor',1248+8,784+8);
room.addActor('Aquamentus',1207,792, {carrying: 'heartcontainer'});

// Triforce
room = ace.dungeons[1].addRoom(5,4);
room.isCompassPoint = true;
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.blockLine = function(x,y,count) {
	for (var i = 0; i < count; i++) {
	  room.addActor('Block',x+8+i*16, y+8);
	}
}
room.blockLine(1328,752+64,10);
room.blockLine(1328,752,4);
room.blockLine(1328+96,752,4);
room.blockLine(1328,752+16,1);
room.blockLine(1328,752+32,1);
room.blockLine(1328,752+48,1);
room.blockLine(1328+144,752+16,1);
room.blockLine(1328+144,752+32,1);
room.blockLine(1328+144,752+48,1);
room.addActor('TriforcePiece',1408,784, {teleportTo: [1912, 808, -16]});
room.addActor('Obstacle', 1368, 792, {'spriteName': 'statue1', rotX: -.2, rotZ:Math.PI/2});
room.addActor('Obstacle', 1368+16, 792+16, {'spriteName': 'statue1', rotX: -.2, rotZ:Math.PI/2});
room.addActor('Obstacle', 1448, 792, {'spriteName': 'statue2', rotX: -.2, rotZ:-Math.PI/2});
room.addActor('Obstacle', 1448-16, 792+16, {'spriteName': 'statue2', rotX: -.2, rotZ:-Math.PI/2});

//----------------------
// ROW 5
//-----------------------
room = ace.dungeons[1].addRoom(0,5);
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
room.addActor('Bow', 137, 985);
room.cameraEyeOffset = [0,90,0];
room.cameraTargetOffset = [0,0,0];
room.addActor('Stairs', 55,1022, {teleportTo: [392-12, 968, -1008]});


room = ace.dungeons[1].addRoom(1,5);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['left'] = ace.WALL;
room.exitByFacing['down'] = ace.WALL;
room.addActor('PushableBlock', 360,968);
room.addActor('Block', 360+16,968+16);
room.addActor('Block', 360+16,968-16);
room.addActor('Block', 360+32,968+32);
room.addActor('Block', 360+32,968-32);
room.addActor('Block', 360+48,968+16);
room.addActor('Block', 360+48,968-16);
room.addActor('Block', 360+64,968);
room.addActor('Trap', 472,920);
room.addActor('Trap', 472,1008+8);
room.addActor('Trap', 288+8,920);
room.addActor('Trap', 288+8,1008+8);
room.addActor('Stairs', 392,968, {z: -990, teleportTo: [55, 1014, -1008]});

room = ace.dungeons[1].addRoom(2,5);
room.exitByFacing['up'] = ace.WALL;
room.exitByFacing['right'] = ace.WALL;
room.addActor('LockedDoor', 536, 968);
room.addActor('Goriya', 616,984);
room.addActor('Goriya', 664,984);
room.addActor('Goriya', 680,1016);
room.addActor('SecretKey', 648, 1000);
room.addWalkMap('XXXXXXXXXXXX' +
                'X   XXXX   X' +
                'X XXXXXXXX X' +
                'X X      X X' +
                'X XXXXXXXX X' +
                'X   XXXX   X' +
                'XXXXXXXXXXXX');


