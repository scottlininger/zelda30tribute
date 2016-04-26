/**
 * @fileoverview  Create the overworld actor overrides.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Some metadata about the exits to escape the overworld.
 */
ace.overworldActorInfo = {};

// Starting space.
ace.overworldActorInfo['7,0'] = {};
ace.overworldActorInfo['7,0']['Cave'] = { teleportTo: [1920,52-8,-1008] }; 
ace.overworldActorInfo['7,0']['StartScreen'] = {};

ace.overworldActorInfo['6,0'] = {};
ace.overworldActorInfo['6,0']['Cave'] = { capTile: 'forest_rock_tr', state: 'WAITING_FOR_BOMB'};
ace.overworldActorInfo['7,1'] = {};
ace.overworldActorInfo['7,1']['Cave'] = { capTile: 'forest_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['11,0'] = {};
ace.overworldActorInfo['11,0']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['3,7'] = {};
ace.overworldActorInfo['3,7']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['1,7'] = {};
ace.overworldActorInfo['1,7']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['0,6'] = {};
ace.overworldActorInfo['0,6']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['5,5'] = {};
ace.overworldActorInfo['5,5']['Cave'] = { capTile: 'ow_rock_tr' };

ace.overworldActorInfo['1,0'] = {};
ace.overworldActorInfo['1,0']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['7,7'] = {};
ace.overworldActorInfo['7,7']['Cave'] = { capTile: 'ow_rock_tr'};

ace.overworldActorInfo['3,4'] = {};
ace.overworldActorInfo['3,4']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['6,6'] = {};
ace.overworldActorInfo['6,6']['Cave'] = { state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['12,5'] = {};
ace.overworldActorInfo['12,5']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['13,5'] = {};
ace.overworldActorInfo['13,5']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['7,5'] = {};
ace.overworldActorInfo['7,5']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};

ace.overworldActorInfo['14,6'] = {};
ace.overworldActorInfo['14,6']['Cave'] = { capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB'};




// Merchant just northwest of start room.
ace.overworldActorInfo['6,1'] = {};
ace.overworldActorInfo['6,1']['Cave'] = { teleportTo: [1920,52-8+176,-1008] }; 


// Entry to dungeon 1.
ace.overworldActorInfo['7,4'] = {};
ace.overworldActorInfo['7,4']['Cave'] = { teleportTo: [640,60,-1008] };

// Entry to dungeon 2.
ace.overworldActorInfo['12,4'] = {};
ace.overworldActorInfo['12,4']['Cave'] = { teleportTo: [640,60,-1008,'2'] };

// Entry to dungeon 3.
ace.overworldActorInfo['4,0'] = {};
ace.overworldActorInfo['4,0']['Cave'] = { teleportTo: [898,50,-1008,'3'] };

// Entry to dungeon 4.
ace.overworldActorInfo['5,3'] = {};
ace.overworldActorInfo['5,3']['Cave'] = { teleportTo: [640,50,-1008,'4'] };

// Entry to dungeon 5.
ace.overworldActorInfo['11,7'] = {};
ace.overworldActorInfo['11,7']['Cave'] = { teleportTo: [640,50,-1008,'5'] };

// Entry to dungeon 6.
ace.overworldActorInfo['2,5'] = {};
ace.overworldActorInfo['2,5']['Cave'] = { teleportTo: [385,50,-1008,'6'] };

// Entry to dungeon 7.
ace.overworldActorInfo['2,3'] = {};
ace.overworldActorInfo['2,3']['Stairs'] = { teleportTo: [385,50,-1008,'7'] };

// Entry to dungeon 8.
ace.overworldActorInfo['13,1'] = {};
ace.overworldActorInfo['13,1']['Stairs'] = { teleportTo: [898,48,-1008,'8'] };

// Entry to dungeon 9.
ace.overworldActorInfo['5,7'] = {};
ace.overworldActorInfo['5,7']['Cave'] = { teleportTo: [1407+256,44,-1008,'9'],
    capTile: 'ow_rock_tr', state: 'WAITING_FOR_BOMB' };

// TODO(scott): For now, we assume any caves will teleport to our
// placeholder spot. Fix.
for (var x = 0; x <= 15; x++) {
  for (var y = 0; y <= 7; y++) {
    var actorInfo = ace.overworldActorInfo[x + ',' + y] || {};
    ace.overworldActorInfo[x + ',' + y] = actorInfo;
    actorInfo['Cave'] = actorInfo['Cave'] || {};
    actorInfo['Cave']['teleportTo'] = actorInfo['Cave']['teleportTo'] ||
        [1920,52-8+176+176,-1008];
  }
}





// Fairy lake fix for SketchUp model.
ace.overworldTileXOffset = {};
ace.overworldTileXOffset['3,3'] = -1;
ace.overworldTileXOffset['2,3'] = -1;
