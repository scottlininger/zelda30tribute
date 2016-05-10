#!/usr/bin/env python2

import shutil
import os
import os.path
from os.path import abspath
import errno
import urllib
import urllib2
import argparse
from zipfile import ZipFile
from hashlib import md5
from random import shuffle

# URLs of sites from where these assets can be downloaded
mirrors = {
    # URLs to zip files
    'zip': [
        "https://www.dropbox.com/sh"
        "/3hcoezbmfbajo06/AAC4LzV7E2BmYm-l9qGi5jo9a?dl=1",
        "https://github.com/jbosse/zelda30tribute/archive/master.zip",
        "https://github.com/frozwa/zelda30tribute/archive/master.zip",
        "https://github.com/rickpage/zelda30tribute/archive/master.zip",
        "https://github.com/DrivenByHim/zelda30tribute/archive/master.zip",
        "https://github.com/rcorreia/zelda30tribute/archive/master.zip",
        "https://github.com/ritterskitter/zelda30tribute/archive/master.zip",
        "https://github.com/chaddm/zelda30tribute/archive/master.zip",
        "https://github.com/ebabel-eu/zelda30tribute/archive/master.zip",
        "https://github.com/unk1nd/zelda30tribute/archive/master.zip",
        "https://github.com/HPTesla/zelda30tribute/archive/master.zip",
        "https://github.com/ogregoire/zelda30tribute/archive/master.zip",
        "https://github.com/borismalezyk/zelda30tribute/archive/master.zip",
        "https://github.com/patrickgan/zelda30tribute/archive/master.zip",
        "https://github.com/matsukaz/zelda30tribute/archive/master.zip",
        "https://github.com/doubleagent/zelda30tribute/archive/master.zip",
        "https://github.com/malamoney/zelda30tribute/archive/master.zip",
        "https://github.com/escapedcat/zelda30tribute/archive/master.zip",
        "https://github.com/kingballer29/zelda30tribute/archive/master.zip",
        "https://github.com/blockhart615/zelda30tribute/archive/master.zip",
        "https://github.com/finger563/zelda30tribute/archive/master.zip",
        "https://github.com/milo-ft/zelda30tribute/archive/master.zip",
        "https://github.com/philipz/zelda30tribute/archive/master.zip",
        "https://github.com/TopherLee513/zelda30tribute/archive/master.zip",
        "https://github.com/sjohnsonaz/zelda30tribute/archive/master.zip",
        "https://github.com/scottlininger/zelda30tribute/archive/master.zip",
    ],
    # URLs to directory roots
    'plain': [
        "https://raw.githubusercontent.com/scottlininger/zelda30tribute/",
    ],
}

# Relative directories for all assets
assets = {
    "www/img/hud-panel.png",
    "www/img/grave_bush.png",
    "www/img/HurlerRock.png",
    "www/img/sprite_boulder.png",
    "www/img/chars/charN.png",
    "www/img/chars/char0.png",
    "www/img/chars/charO.png",
    "www/img/chars/charJ.png",
    "www/img/chars/char9.png",
    "www/img/chars/charD.png",
    "www/img/chars/char,.png",
    "www/img/chars/char&.png",
    "www/img/chars/char8.png",
    "www/img/chars/charS.png",
    "www/img/chars/charQ.png",
    "www/img/chars/char-.png",
    "www/img/chars/char5.png",
    "www/img/chars/chartick.png",
    "www/img/chars/char!.png",
    "www/img/chars/charT.png",
    "www/img/chars/charG.png",
    "www/img/chars/charF.png",
    "www/img/chars/charX.png",
    "www/img/chars/char2.png",
    "www/img/chars/charP.png",
    "www/img/chars/charZ.png",
    "www/img/chars/char3.png",
    "www/img/chars/charU.png",
    "www/img/chars/charY.png",
    "www/img/chars/charB.png",
    "www/img/chars/char1.png",
    "www/img/chars/charM.png",
    "www/img/chars/charC.png",
    "www/img/chars/char7.png",
    "www/img/chars/charL.png",
    "www/img/chars/charI.png",
    "www/img/chars/charR.png",
    "www/img/chars/charA.png",
    "www/img/chars/charW.png",
    "www/img/chars/char6.png",
    "www/img/chars/charE.png",
    "www/img/chars/char..png",
    "www/img/chars/charK.png",
    "www/img/chars/char4.png",
    "www/img/chars/charquestion.png",
    "www/img/chars/charV.png",
    "www/img/chars/charH.png",
    "www/img/favicon.gif",
    "www/img/ow_water_bl.png",
    "www/img/forest_bush.png",
    "www/img/sprite_linkstab.png",
    "www/img/forest_rock_bl.png",
    "www/img/ow_rock_tl.png",
    "www/img/OrcBlueOdd.png",
    "www/img/controller2.png",
    "www/img/HurlerEven.png",
    "www/img/dpad.png",
    "www/img/overworld_with_shadow_map15.png",
    "www/img/hud-heart.png",
    "www/img/level9.png",
    "www/img/logo-share.png",
    "www/img/sprites4/fairy.png",
    "www/img/sprites4/manhandla_center.png",
    "www/img/sprites4/lynel2.png",
    "www/img/sprites4/lynelblue2.png",
    "www/img/sprites4/dodongo_open_tail.png",
    "www/img/sprites4/dodongo_explode_tail.png",
    "www/img/sprites4/stairs.png",
    "www/img/sprites4/darknut1.png",
    "www/img/sprites4/whistle.png",
    "www/img/sprites4/bubble-blue.png",
    "www/img/sprites4/sand25.png",
    "www/img/sprites4/sand75.png",
    "www/img/sprites4/manhandla_open.png",
    "www/img/sprites4/manhandla_closed.png",
    "www/img/sprites4/ghini.png",
    "www/img/sprites4/dodongo_open_head.png",
    "www/img/sprites4/bubble-red.png",
    "www/img/sprites4/fairy2.png",
    "www/img/sprites4/lynel1.png",
    "www/img/sprites4/sand.png",
    "www/img/sprites4/water.png",
    "www/img/sprites4/dodongo_closed_tail.png",
    "www/img/sprites4/dodongo_explode_head.png",
    "www/img/sprites4/lynelblue1.png",
    "www/img/sprites4/darknut2.png",
    "www/img/sprites4/sand50.png",
    "www/img/sprites4/dodongo_closed_head.png",
    "www/img/link.png",
    "www/img/sprite_linknose.png",
    "www/img/grave_knight.png",
    "www/img/forest_rock_tl.png",
    "www/img/forest_rock_tr.png",
    "www/img/sprite_linkstand.png",
    "www/img/ow_water_tr.png",
    "www/img/sprite_woodensword.png",
    "www/img/ow_water_l.png",
    "www/img/title/title1-5.png",
    "www/img/title/title0-4.png",
    "www/img/title/title2-5.png",
    "www/img/title/title9-4.png",
    "www/img/title/title4-5.png",
    "www/img/title/title8-5.png",
    "www/img/title/title9-1.png",
    "www/img/title/title3-5.png",
    "www/img/title/title4-1.png",
    "www/img/title/title1-0.png",
    "www/img/title/title5-0.png",
    "www/img/title/title8-4.png",
    "www/img/title/title11-1.png",
    "www/img/title/title10-1.png",
    "www/img/title/title6-2.png",
    "www/img/title/title9-0.png",
    "www/img/title/title6-3.png",
    "www/img/title/title5-3.png",
    "www/img/title/title7-1.png",
    "www/img/title/title11-4.png",
    "www/img/title/title0-1.png",
    "www/img/title/title-rocktop.png",
    "www/img/title/title8-3.png",
    "www/img/title/title10-4.png",
    "www/img/title/title4-4.png",
    "www/img/title/title9-3.png",
    "www/img/title/title1-4.png",
    "www/img/title/title9-2.png",
    "www/img/title/title10-3.png",
    "www/img/title/title10-5.png",
    "www/img/title/title2-1.png",
    "www/img/title/title10-0.png",
    "www/img/title/title5-5.png",
    "www/img/title/title1-2.png",
    "www/img/title/title3-4.png",
    "www/img/title/title9-5.png",
    "www/img/title/title10-2.png",
    "www/img/title/title4-0.png",
    "www/img/title/title7-2.png",
    "www/img/title/title0-0.png",
    "www/img/title/title-rock-solid.png",
    "www/img/title/title1-3.png",
    "www/img/title/title1-1.png",
    "www/img/title/title6-1.png",
    "www/img/title/title5-4.png",
    "www/img/title/title11-0.png",
    "www/img/title/title8-1.png",
    "www/img/title/title3-0.png",
    "www/img/title/title8-0.png",
    "www/img/title/title3-3.png",
    "www/img/title/title-rock.png",
    "www/img/title/title11-2.png",
    "www/img/title/title7-0.png",
    "www/img/title/title2-2.png",
    "www/img/title/title-water.png",
    "www/img/title/title-mist.png",
    "www/img/title/title8-2.png",
    "www/img/title/title0-5.png",
    "www/img/title/title0-2.png",
    "www/img/title/title7-4.png",
    "www/img/title/title5-2.png",
    "www/img/title/title2-4.png",
    "www/img/title/title11-5.png",
    "www/img/title/title5-1.png",
    "www/img/title/title3-2.png",
    "www/img/title/title6-0.png",
    "www/img/title/title11-3.png",
    "www/img/title/title4-3.png",
    "www/img/title/title3-1.png",
    "www/img/title/title4-2.png",
    "www/img/title/title6-4.png",
    "www/img/title/title2-3.png",
    "www/img/title/title7-5.png",
    "www/img/title/title6-5.png",
    "www/img/title/title0-3.png",
    "www/img/title/title7-3.png",
    "www/img/title/title2-0.png",
    "www/img/forest_turtle.png",
    "www/img/overworld.gif",
    "www/img/ow_rock_bl.png",
    "www/img/ow_water_br.png",
    "www/img/ow_knight.png",
    "www/img/hud-panel-underworld.png",
    "www/img/intro-text.gif",
    "www/img/forest_rock_t.png",
    "www/img/hud-panel-selector.png",
    "www/img/death2.png",
    "www/img/death3.png",
    "www/img/ow_bush.png",
    "www/img/ow_water_t.png",
    "www/img/loading.png",
    "www/img/hud-max-hit-points.png",
    "www/img/OrcOrangeEven.png",
    "www/img/icon-mobile.png",
    "www/img/intro-text-after.gif",
    "www/img/sprites2/block_gray.png",
    "www/img/sprites2/statue_leftblue.png",
    "www/img/sprites2/aquamentusbottomleft2.png",
    "www/img/sprites2/fireball.png",
    "www/img/sprites2/cloud2.png",
    "www/img/sprites2/statue_rightgreen.png",
    "www/img/sprites2/sprite_linkyay2.png",
    "www/img/sprites2/statue_rightblue.png",
    "www/img/sprites2/swordshard-tr.png",
    "www/img/sprites2/statue_rightgray.png",
    "www/img/sprites2/gel2.png",
    "www/img/sprites2/aquamentustopright.png",
    "www/img/sprites2/goriya2_blue.png",
    "www/img/sprites2/bow.png",
    "www/img/sprites2/gel1.png",
    "www/img/sprites2/trap.png",
    "www/img/sprites2/statue_leftgreen.png",
    "www/img/sprites2/leeverblue2.png",
    "www/img/sprites2/block_tan.png",
    "www/img/sprites2/leever5.png",
    "www/img/sprites2/merchant.png",
    "www/img/sprites2/lockeddoortop1.png",
    "www/img/sprites2/fire.png",
    "www/img/sprites2/barreddoor.png",
    "www/img/sprites2/blank.png",
    "www/img/sprites2/octoroc1.png",
    "www/img/sprites2/triforcepiece.png",
    "www/img/sprites2/leever1.png",
    "www/img/sprites2/statue_leftcyan.png",
    "www/img/sprites2/swordshard-bl.png",
    "www/img/sprites2/wallmaster2.png",
    "www/img/sprites2/whitesword.png",
    "www/img/sprites2/goriya_blue.png",
    "www/img/sprites2/lockeddoortop.png",
    "www/img/sprites2/whitebrick.png",
    "www/img/sprites2/aquamentusbottomright.png",
    "www/img/sprites2/oldman1.png",
    "www/img/sprites2/heartblue.png",
    "www/img/sprites2/aquamentusbottomright2.png",
    "www/img/sprites2/boomerang_blue.png",
    "www/img/sprites2/leever4.png",
    "www/img/sprites2/leever3.png",
    "www/img/sprites2/goriya.png",
    "www/img/sprites2/block_blue.png",
    "www/img/sprites2/sprite_linkyay.png",
    "www/img/sprites2/map.png",
    "www/img/sprites2/lockeddoor1.png",
    "www/img/sprites2/caverock.png",
    "www/img/sprites2/key.png",
    "www/img/sprites2/fire2.png",
    "www/img/sprites2/medicinewoman.png",
    "www/img/sprites2/aquamentustopleft.png",
    "www/img/sprites2/stalfos2.png",
    "www/img/sprites2/stalfos.png",
    "www/img/sprites2/block_lime.png",
    "www/img/sprites2/goriya2.png",
    "www/img/sprites2/lockeddoor.png",
    "www/img/sprites2/boomerangflat_blue.png",
    "www/img/sprites2/leever2.png",
    "www/img/sprites2/cloud.png",
    "www/img/sprites2/zola.png",
    "www/img/sprites2/block.png",
    "www/img/sprites2/statue_leftgray.png",
    "www/img/sprites2/oldman2.png",
    "www/img/sprites2/leeverblue5.png",
    "www/img/sprites2/wallmaster1.png",
    "www/img/sprites2/barreddoor1.png",
    "www/img/sprites2/statue_rightred.png",
    "www/img/sprites2/bomb.png",
    "www/img/sprites2/boomerangflat.png",
    "www/img/sprites2/statue2.png",
    "www/img/sprites2/boomerang.png",
    "www/img/sprites2/leeverblue3.png",
    "www/img/sprites2/aquamentustopleft2.png",
    "www/img/sprites2/heartcontainer.png",
    "www/img/sprites2/barreddoortop1.png",
    "www/img/sprites2/keese1.png",
    "www/img/sprites2/door.png",
    "www/img/sprites2/keese2.png",
    "www/img/sprites2/swordshard-tl.png",
    "www/img/sprites2/statue_rightcyan.png",
    "www/img/sprites2/item_woodensword.png",
    "www/img/sprites2/compass.png",
    "www/img/sprites2/statue_leftred.png",
    "www/img/sprites2/coinblue.png",
    "www/img/sprites2/leeverblue1.png",
    "www/img/sprites2/bombhole.png",
    "www/img/sprites2/statue1.png",
    "www/img/sprites2/octoroc2.png",
    "www/img/sprites2/aquamentusbottomleft.png",
    "www/img/sprites2/block_green.png",
    "www/img/sprites2/barreddoortop.png",
    "www/img/sprites2/leeverblue4.png",
    "www/img/sprites2/swordshard-br.png",
    "www/img/link-with-sign.png",
    "www/img/ArcherArrow.png",
    "www/img/coin.png",
    "www/img/death0.png",
    "www/img/icon-mobile-192.png",
    "www/img/sprites/JumperBlueDown.png",
    "www/img/sprites/HurlerBlueEven.png",
    "www/img/sprites/TreeTopRightGreen.png",
    "www/img/sprites/TreeFaceGreen.png",
    "www/img/sprites/Spinner.png",
    "www/img/sprites/TreeBottomRightBrown.png",
    "www/img/sprites/TreeFaceBrown.png",
    "www/img/sprites/HurlerRedEven.png",
    "www/img/sprites/JumperBlueUp.png",
    "www/img/sprites/HurlerRedOdd.png",
    "www/img/sprites/JumperOrangeUp.png",
    "www/img/sprites/TreeBottomRightGreen.png",
    "www/img/sprites/Octoroc1.png",
    "www/img/sprites/TreeTopLeftBrown.png",
    "www/img/sprites/Octoroc2.png",
    "www/img/sprites/TreeBottomLeftBrown.png",
    "www/img/sprites/TreeTopRightBrown.png",
    "www/img/sprites/HurlerBlueOdd.png",
    "www/img/sprites/TreeTopLeftGreen.png",
    "www/img/sprites/JumperOrangeDown.png",
    "www/img/sprites/TreeBottomLeftGreen.png",
    "www/img/forest_knight.png",
    "www/img/ow_cave.png",
    "www/img/ow_water_r.png",
    "www/img/sprite_linkwalk.png",
    "www/img/ow_rock_tr.png",
    "www/img/death1.png",
    "www/img/death4.png",
    "www/img/HurlerOdd.png",
    "www/img/OrcOrangeOdd.png",
    "www/img/ow_path.png",
    "www/img/ow_turtle.png",
    "www/img/heart.png",
    "www/img/sprites3/grave_pillar_tr.png",
    "www/img/sprites3/forest_totem_t.png",
    "www/img/sprites3/forest_pillar_tl.png",
    "www/img/sprites3/grave_pillar_bl.png",
    "www/img/sprites3/rope1.png",
    "www/img/sprites3/rope2.png",
    "www/img/sprites3/zora.png",
    "www/img/sprites3/grave_totem_b.png",
    "www/img/sprites3/raft.png",
    "www/img/sprites3/dodongorear.png",
    "www/img/sprites3/ow_pillar_tl.png",
    "www/img/sprites3/bubbles.png",
    "www/img/sprites3/forest_totem_b.png",
    "www/img/sprites3/forest_pillar_bl.png",
    "www/img/sprites3/zol2.png",
    "www/img/sprites3/grave_pillar_tl.png",
    "www/img/sprites3/ow_pillar_tr.png",
    "www/img/sprites3/ow_pillar_bl.png",
    "www/img/sprites3/ow_pillar_br.png",
    "www/img/sprites3/forest_pillar_tr.png",
    "www/img/sprites3/forest_pillar_br.png",
    "www/img/sprites3/ow_totem_b.png",
    "www/img/sprites3/dodongofront.png",
    "www/img/sprites3/ow_totem_t.png",
    "www/img/sprites3/dodongofront2.png",
    "www/img/sprites3/grave_totem_t.png",
    "www/img/sprites3/grave_pillar_br.png",
    "www/img/sprites3/zol1.png",
    "www/img/sprites3/dodongorear2.png",
    "www/img/OrcBlueEven.png",
    "www/img/linkleft.png",
    "www/img/linkfront.png",
    "www/img/original-start-screen.gif",
    "www/img/ow_water_tl.png",
    "www/img/forest_rock_br.png",
    "www/img/grave_grave.png",
    "www/img/ow_rock_br.png",
    "www/img/ow_rock_t.png",
    "www/img/light-red.png",
    "www/img/light-black.png",
    "www/img/light-fire.png",
    "www/img/light-star.png",
    "www/img/shadow-round.png",
    "www/img/light-lantern.png",
    "www/img/shadow-obstacle.png",
    "www/img/lightmap.png",
    "www/tools/font.png",
    "www/tools/overworld_clean.png",
    "www/dungeons/dungeon3.png",
    "www/dungeons/dungeon8.png",
    "www/dungeons/dungeon7.png",
    "www/dungeons/dungeon6.png",
    "www/dungeons/dungeon5.png",
    "www/dungeons/dungeon4.png",
    "www/dungeons/dungeon1.png",
    "www/dungeons/dungeon9.png",
    "www/dungeons/dungeon2.png",
    "www/sounds/triforce.mp3",
    "www/sounds/missile.mp3",
    "www/sounds/coin.mp3",
    "www/sounds/die.mp3",
    "www/sounds/boss1.mp3",
    "www/sounds/bomb.mp3",
    "www/sounds/overworld.mp3",
    "www/sounds/kill.mp3",
    "www/sounds/candle.mp3",
    "www/sounds/secret.mp3",
    "www/sounds/bombdrop.mp3",
    "www/sounds/health-loop.mp3",
    "www/sounds/swordshoot.mp3",
    "www/sounds/underworld.mp3",
    "www/sounds/gameover.mp3",
    "www/sounds/heart.mp3",
    "www/sounds/introreo.mp3",
    "www/sounds/boss2.mp3",
    "www/sounds/arrow.mp3",
    "www/sounds/intro.mp3",
    "www/sounds/key.mp3",
    "www/sounds/hurt.mp3",
    "www/sounds/fanfare.mp3",
    "www/sounds/sword.mp3",
    "www/sounds/stairs.mp3",
    "www/sounds/text.mp3",
    "www/sounds/flute.mp3",
    "www/sounds/health.mp3",
    "www/sounds/shield.mp3",
    "www/sounds/unlock.mp3",
    "www/sounds/boomerang.mp3",
    "www/sounds/item.mp3",
    "www/sounds/ocean.mp3",
    "www/sounds/deathmountain.mp3",
    "www/sounds/hit.mp3",
    "sourceFiles/sxl/blueSoldierVoxel.csv",
    "sourceFiles/sxl/linkstab5.csv",
    "sourceFiles/sxl/linkstab2.csv",
    "sourceFiles/sxl/link.csv",
    "sourceFiles/sxl/linkstab4.csv",
    "sourceFiles/sxl/linkWalk9.sxl",
    "sourceFiles/sxl/linkWalk7.sxl",
    "sourceFiles/sxl/greenBlock.csv",
    "sourceFiles/sxl/linkWalk12.sxl",
    "sourceFiles/sxl/voxelRock.png",
    "sourceFiles/sxl/voxelGreenBlock.png",
    "sourceFiles/sxl/linkWalk4.sxl",
    "sourceFiles/sxl/linkstab3.csv",
    "sourceFiles/sxl/link.skp",
    "sourceFiles/sxl/linkWalk6.sxl",
    "sourceFiles/sxl/linkWalk3.sxl",
    "sourceFiles/sxl/linkWalk1.sxl",
    "sourceFiles/sxl/linkWalk5.sxl",
    "sourceFiles/sxl/linkWalk2.sxl",
    "sourceFiles/sxl/linkWalk8.sxl",
    "sourceFiles/sxl/tree.csv",
    "sourceFiles/sxl/linkWalk10.sxl",
    "sourceFiles/sxl/linkWalk11.sxl",
    "sourceFiles/sxl/rock.csv",
    "sourceFiles/sxl/linkstab.csv",
    "sourceFiles/UIMock03.psd",
    "sourceFiles/SocialShareImage_BigLogo.psd",
    "sourceFiles/UIMock04.psd",
    "sourceFiles/SocialShareImage_Title.psd",
    "sourceFiles/light-red.psd",
    "sourceFiles/font.psd",
    "sourceFiles/SocialShareImage_Logo.psd",
    "sourceFiles/linkSprites.psd",
    "sourceFiles/StartScreen01.psd",
    "sourceFiles/StartScreen04.psd",
    "sourceFiles/UIMock01.psd",
    "sourceFiles/README.md",
    "sourceFiles/hud-panel-underworld.psd",
    "sourceFiles/icon-mobile-192.psd",
    "sourceFiles/icon-mobile-240.psd",
    "sourceFiles/SocialShareImage.psd",
    "sourceFiles/UIMock05.psd",
    "sourceFiles/SocialShareIcon_Mixed.psd",
    "sourceFiles/StartScreen03.psd",
    "sourceFiles/UIMock02.psd",
    "sourceFiles/StartScreen02.psd",
    "sourceFiles/font.png",
    "sourceFiles/imagesAndSuch/lozOverworldBroad_v3_su8.skp",
    "sourceFiles/imagesAndSuch/startScreen.png",
    "sourceFiles/imagesAndSuch/lozOverworldBroad_v3.skp",
    "sourceFiles/imagesAndSuch/voxelBuilder.html",
    "sourceFiles/imagesAndSuch/lozBothWorlds_v1_su8.skp",
    "sourceFiles/imagesAndSuch/lozOverworldBroad_v4_su8.skp",
    "sourceFiles/imagesAndSuch/out.js",
    "sourceFiles/imagesAndSuch/TopSprites.psd",
    "sourceFiles/imagesAndSuch/sword.sxl",
    "sourceFiles/imagesAndSuch/top-sprites.png",
    "sourceFiles/imagesAndSuch/lozBothWorlds_v1_su8.skb",
    "sourceFiles/imagesAndSuch/side-sprites.png",
    "sourceFiles/imagesAndSuch/light-fire.png",
    "sourceFiles/imagesAndSuch/lozOverworldBroad_v3.obj",
    "sourceFiles/imagesAndSuch/voxelBuilder2.html",
    "sourceFiles/imagesAndSuch/heightMapMaker.html",
    "sourceFiles/imagesAndSuch/SideSprites.png",
    "sourceFiles/imagesAndSuch/topSprites.png",
    "sourceFiles/imagesAndSuch/lozOverworldBroad_v4.obj",
    "sourceFiles/imagesAndSuch/voxelBuilder3.html",
    "sourceFiles/imagesAndSuch/AllZeldaVoxels.sxl",
    "sourceFiles/imagesAndSuch/overworld_clean.psd",
    "sourceFiles/imagesAndSuch/lozOverworldBroad_v4_su8.skb",
    "sourceFiles/imagesAndSuch/AllSprites.png",
    "sourceFiles/imagesAndSuch/SideSprites.psd",
    "sourceFiles/imagesAndSuch/lozOverworldBroad_v4.mtl",
    "sourceFiles/imagesAndSuch/light-fire.psd",
    "sourceFiles/imagesAndSuch/voxelSourceImages/ow_rock_tl.png",
    "sourceFiles/imagesAndSuch/voxelSourceImages/turtleVoxel.csv",
    "sourceFiles/imagesAndSuch/voxelSourceImages/treeVoxel.png",
    "sourceFiles/imagesAndSuch/voxelSourceImages/linkVoxel.png",
    "sourceFiles/imagesAndSuch/voxelSourceImages/woodenSwordVoxel.csv",
    "sourceFiles/imagesAndSuch/voxelSourceImages/turtleVoxel.png",
    "sourceFiles/imagesAndSuch/voxelSourceImages/woodenSwordVoxel.png",
    "sourceFiles/imagesAndSuch/voxelSourceImages/blueSoldierVoxel.png",
    "sourceFiles/SocialShareImage_BigLogo.png",
    "sourceFiles/StartScreenLayers/B03.png",
    "sourceFiles/StartScreenLayers/15.png",
    "sourceFiles/StartScreenLayers/C11.png",
    "sourceFiles/StartScreenLayers/B14.png",
    "sourceFiles/StartScreenLayers/B05.png",
    "sourceFiles/StartScreenLayers/02.png",
    "sourceFiles/StartScreenLayers/C01.png",
    "sourceFiles/StartScreenLayers/03.png",
    "sourceFiles/StartScreenLayers/B15.png",
    "sourceFiles/StartScreenLayers/B01.png",
    "sourceFiles/StartScreenLayers/06.png",
    "sourceFiles/StartScreenLayers/01.png",
    "sourceFiles/StartScreenLayers/05.png",
    "sourceFiles/StartScreenLayers/C04.png",
    "sourceFiles/StartScreenLayers/B13.png",
    "sourceFiles/StartScreenLayers/B02.png",
    "sourceFiles/StartScreenLayers/C03.png",
    "sourceFiles/StartScreenLayers/10.png",
    "sourceFiles/StartScreenLayers/C09.png",
    "sourceFiles/StartScreenLayers/C06.png",
    "sourceFiles/StartScreenLayers/B08.png",
    "sourceFiles/StartScreenLayers/C14.png",
    "sourceFiles/StartScreenLayers/B09.png",
    "sourceFiles/StartScreenLayers/08.png",
    "sourceFiles/StartScreenLayers/StartScreen04.psd",
    "sourceFiles/StartScreenLayers/B12.png",
    "sourceFiles/StartScreenLayers/00.png",
    "sourceFiles/StartScreenLayers/07.png",
    "sourceFiles/StartScreenLayers/C08.png",
    "sourceFiles/StartScreenLayers/C10.png",
    "sourceFiles/StartScreenLayers/13.png",
    "sourceFiles/StartScreenLayers/04.png",
    "sourceFiles/StartScreenLayers/14.png",
    "sourceFiles/StartScreenLayers/C05.png",
    "sourceFiles/StartScreenLayers/B10.png",
    "sourceFiles/StartScreenLayers/09.png",
    "sourceFiles/StartScreenLayers/C07.png",
    "sourceFiles/StartScreenLayers/C00.png",
    "sourceFiles/StartScreenLayers/B07.png",
    "sourceFiles/StartScreenLayers/B04.png",
    "sourceFiles/StartScreenLayers/C02.png",
    "sourceFiles/StartScreenLayers/12.png",
    "sourceFiles/StartScreenLayers/B11.png",
    "sourceFiles/StartScreenLayers/11.png",
    "sourceFiles/StartScreenLayers/B00.png",
    "sourceFiles/StartScreenLayers/C13.png",
    "sourceFiles/StartScreenLayers/B06.png",
    "sourceFiles/StartScreenLayers/C15.png",
    "sourceFiles/StartScreenLayers/C12.png",
    "sourceFiles/ZeldaOverworldMapQ1.png",
    "sourceFiles/qef/AquamentusTopLeft.qef",
    "sourceFiles/qef/leever5.qef",
    "sourceFiles/qef/AquamentusBottomRight2.qef",
    "sourceFiles/qef/AquamentusTopRight.qef",
    "sourceFiles/qef/Octoroc2.qef",
    "sourceFiles/qef/Keese1.qef",
    "sourceFiles/qef/Keese2.qef",
    "sourceFiles/qef/Statue1.qef",
    "sourceFiles/qef/Statue2.qef",
    "sourceFiles/qef/WallMaster2.qef",
    "sourceFiles/qef/Gel1.qef",
    "sourceFiles/qef/Gel2.qef",
    "sourceFiles/qef/WallMaster1.qef",
    "sourceFiles/qef/Fire.qef",
    "sourceFiles/qef/Goriya.qef",
    "sourceFiles/qef/Stalfos.qef",
    "sourceFiles/qef/AquamentusBottomLeft.qef",
    "sourceFiles/qef/OldMan1.qef",
    "sourceFiles/qef/AquamentusTopLeft2.qef",
    "sourceFiles/qef/AquamentusBottomLeft2.qef",
    "sourceFiles/qef/Merchant.qef",
    "sourceFiles/qef/OldMan2.qef",
    "sourceFiles/qef/SocialShareIcon_Mixed.psd",
    "sourceFiles/qef/Octoroc1.qef",
    "sourceFiles/qef/MedicineWoman.qef",
    "sourceFiles/Auto Processed Sprites/Mummy.png",
    "sourceFiles/Auto Processed Sprites/DragonFront.png",
    "sourceFiles/Auto Processed Sprites/DragonBack.png",
    "sourceFiles/Auto Processed Sprites/ChargerOddOrange.png",
    "sourceFiles/Auto Processed Sprites/WormOrange.png",
    "sourceFiles/Auto Processed Sprites/SpinnerOrange.png",
    "sourceFiles/Auto Processed Sprites/BubbleOrange.png",
    "sourceFiles/Auto Processed Sprites/BatEvenBlue.png",
    "sourceFiles/Auto Processed Sprites/Whistle.png",
    "sourceFiles/Auto Processed Sprites/PotionRed.png",
    "sourceFiles/Auto Processed Sprites/Ghost.png",
    "sourceFiles/Auto Processed Sprites/FlyTrapBody.png",
    "sourceFiles/Auto Processed Sprites/RobotEvenOrange.png",
    "sourceFiles/Auto Processed Sprites/Ladder.png",
    "sourceFiles/Auto Processed Sprites/EyeBlobSmall.png",
    "sourceFiles/Auto Processed Sprites/OldWoman.png",
    "sourceFiles/Auto Processed Sprites/WandBlue.png",
    "sourceFiles/Auto Processed Sprites/BigBlobDown.png",
    "sourceFiles/Auto Processed Sprites/RobotOddOrange.png",
    "sourceFiles/Auto Processed Sprites/PrincessHolding.png",
    "sourceFiles/Auto Processed Sprites/ShieldOrange.png",
    "sourceFiles/Auto Processed Sprites/PatraFlyEven.png",
    "sourceFiles/Auto Processed Sprites/Fire.png",
    "sourceFiles/Auto Processed Sprites/DustPile.png",
    "sourceFiles/Auto Processed Sprites/DinoFrontHurt.png",
    "sourceFiles/Auto Processed Sprites/DinoBackHurt.png",
    "sourceFiles/Auto Processed Sprites/FlyTrapMouthOpen.png",
    "sourceFiles/Auto Processed Sprites/BlockGray.png",
    "sourceFiles/Auto Processed Sprites/CaterpillarHeadOrange.png",
    "sourceFiles/Auto Processed Sprites/FairyOdd.png",
    "sourceFiles/Auto Processed Sprites/LikeLikeSmall.png",
    "sourceFiles/Auto Processed Sprites/TempleFaceWhite.png",
    "sourceFiles/Auto Processed Sprites/CaterpillarBodyOrange.png",
    "sourceFiles/Auto Processed Sprites/GryphonBlockBlue.png",
    "sourceFiles/Auto Processed Sprites/TreeBottomRightBrown.png",
    "sourceFiles/Auto Processed Sprites/Key.png",
    "sourceFiles/Auto Processed Sprites/JumperUpOrange.png",
    "sourceFiles/Auto Processed Sprites/CrabLegsOdd.png",
    "sourceFiles/Auto Processed Sprites/MouseDown.png",
    "sourceFiles/Auto Processed Sprites/RaftOrange.png",
    "sourceFiles/Auto Processed Sprites/GargoyleBlockBlue.png",
    "sourceFiles/Auto Processed Sprites/Compass.png",
    "sourceFiles/Auto Processed Sprites/Bow.png",
    "sourceFiles/Auto Processed Sprites/JumperDownOrange.png",
    "sourceFiles/Auto Processed Sprites/TreeFaceBrown.png",
    "sourceFiles/Auto Processed Sprites/FairyEven.png",
    "sourceFiles/Auto Processed Sprites/MagicSword.png",
    "sourceFiles/Auto Processed Sprites/MouseUp.png",
    "sourceFiles/Auto Processed Sprites/EyeBlobLarge.png",
    "sourceFiles/Auto Processed Sprites/BigHeart.png",
    "sourceFiles/Auto Processed Sprites/SmallBlobUp.png",
    "sourceFiles/Auto Processed Sprites/TempleTopLeftGreen.png",
    "sourceFiles/Auto Processed Sprites/Clock.png",
    "sourceFiles/Auto Processed Sprites/GoblinOrange.png",
    "sourceFiles/Auto Processed Sprites/CrabEyeOpen.png",
    "sourceFiles/Auto Processed Sprites/TempleBottomLeftGreen.png",
    "sourceFiles/Auto Processed Sprites/LikeLikeLarge.png",
    "sourceFiles/Auto Processed Sprites/LionKey.png",
    "sourceFiles/Auto Processed Sprites/TriForceBlue.png",
    "sourceFiles/Auto Processed Sprites/SnakeEven.png",
    "sourceFiles/Auto Processed Sprites/BatOddBlue.png",
    "sourceFiles/Auto Processed Sprites/CrabEyeClosed.png",
    "sourceFiles/Auto Processed Sprites/DinoFront.png",
    "sourceFiles/Auto Processed Sprites/SpikeBlue.png",
    "sourceFiles/Auto Processed Sprites/LikeLikeMedium.png",
    "sourceFiles/Auto Processed Sprites/CandleRed.png",
    "sourceFiles/Auto Processed Sprites/DemonDown.png",
    "sourceFiles/Auto Processed Sprites/DinoBack.png",
    "sourceFiles/Auto Processed Sprites/ChargerEvenOrange.png",
    "sourceFiles/Auto Processed Sprites/DemonUp.png",
    "sourceFiles/Auto Processed Sprites/OldMan2.png",
    "sourceFiles/Auto Processed Sprites/TreeTopLeftBrown.png",
    "sourceFiles/Auto Processed Sprites/Princess.png",
    "sourceFiles/Auto Processed Sprites/Meat.png",
    "sourceFiles/Auto Processed Sprites/SnakeOdd.png",
    "sourceFiles/Auto Processed Sprites/TriForcePieceOrange.png",
    "sourceFiles/Auto Processed Sprites/TreeBottomLeftBrown.png",
    "sourceFiles/Auto Processed Sprites/FoamDown.png",
    "sourceFiles/Auto Processed Sprites/Book.png",
    "sourceFiles/Auto Processed Sprites/TriForceOrange.png",
    "sourceFiles/Auto Processed Sprites/Skeleton.png",
    "sourceFiles/Auto Processed Sprites/Bracelet.png",
    "sourceFiles/Auto Processed Sprites/FoamUp.png",
    "sourceFiles/Auto Processed Sprites/RingBlue.png",
    "sourceFiles/Auto Processed Sprites/BoomerangBlue.png",
    "sourceFiles/Auto Processed Sprites/FishHead.png",
    "sourceFiles/Auto Processed Sprites/TempleFaceGreen.png",
    "sourceFiles/Auto Processed Sprites/FlyTrapMouthClosed.png",
    "sourceFiles/Auto Processed Sprites/PatraHead.png",
    "sourceFiles/Auto Processed Sprites/TreeTopRightBrown.png",
    "sourceFiles/Auto Processed Sprites/DiggerOrange.png",
    "sourceFiles/Auto Processed Sprites/CrabLegsEven.png",
    "sourceFiles/Auto Processed Sprites/PatraFlyOdd.png",
    "sourceFiles/Auto Processed Sprites/SmallBlobDown.png",
    "sourceFiles/Auto Processed Sprites/Vendor.png",
    "sourceFiles/Auto Processed Sprites/WizardOrange.png",
    "sourceFiles/Auto Processed Sprites/BigBlobUp.png",
    "sourceFiles/Auto Processed Sprites/LinkHolding1.png",
    "sourceFiles/Auto Processed Sprites/OrcOrange.png",
    "sourceFiles/Auto Processed Sprites/HandClosed.png",
    "sourceFiles/Auto Processed Sprites/Map.png",
    "sourceFiles/Auto Processed Sprites/DragonHead.png",
    "sourceFiles/Auto Processed Sprites/OldMan1.png",
    "sourceFiles/Auto Processed Sprites/LinkHolding2.png",
    "sourceFiles/Auto Processed Sprites/LadderFlat.png",
    "sourceFiles/Auto Processed Sprites/ArrowGreen.png",
    "sourceFiles/Auto Processed Sprites/Bomb.png",
    "sourceFiles/Auto Processed Sprites/SerpentNeck.png",
    "sourceFiles/Auto Processed Sprites/BoomerangOrange.png",
    "sourceFiles/Auto Processed Sprites/HandOpen.png",
    "sourceFiles/Auto Processed Sprites/RayBlue.png",
}


def commondir(paths):
    (folder, sep, tail) = os.path.commonprefix(paths).rpartition('/')
    return folder


def parse_hashfile(hashfile):
    hashes = dict()
    with open(hashfile, 'r') as f:
        lines = f.readlines()
        for line in lines:
            (hashstr, path) = line.split(None, 1)
            hashstr = hashstr.strip()
            path = path.strip()
            hashes[path] = hashstr
    return hashes


def check_file_integrity(folder, verbose=False):
    assetpaths = {os.path.join(folder, p) for p in assets}
    expectedhashes = parse_hashfile('{}.md5'.format(folder))
    for path in assetpaths:
        with open(path, 'rb') as f:
            filehash = md5(f.read()).hexdigest()
            expected = expectedhashes[path]
            errormsg = "Hashes not equal for file: {}".format(path)
            assert filehash == expected, errormsg
            if verbose:
                print("{}: OK".format(path))
    print("All md5 checks passed.")


def unzip(zippath, outdir):
    """
    Unzip the contents of zippath to outdir. Example:
    unzip("zelda30tribute.zip", "./assets")
    """
    f = open(zippath, 'rb')
    z = ZipFile(f)
    ziprootdir = commondir(z.namelist())
    fileno = 0
    for asset in assets:
        fileno += 1
        outpath = os.path.join(outdir, asset)
        inpath = os.path.join(ziprootdir, asset)
        print("Extracting ({}/{}): {} -> {}"
              .format(fileno, len(assets), inpath, outpath))
        z.extract(inpath, outdir)
    if ziprootdir:
        # If the assets are stored within a top folder:
        srcpath = os.path.join(asset_dir, ziprootdir)
        dstpath = asset_dir
        print("Replacing top folder: {} -> {}".format(srcpath, dstpath))
        topfiles = os.listdir(srcpath)
        for topfile in topfiles:
            shutil.move(os.path.join(srcpath, topfile), dstpath)
        shutil.rmtree(srcpath)


def url_is_retrievable(url):
    try:
        urllib2.urlopen(url, timeout=10)
        return True
    except urllib2.HTTPError:
        return False
    except urllib2.URLError:
        return False


def download_reporthook(count, blocksize, filesize):
    filesizestr = ""
    if filesize != -1:
        filesizestr = "/{}".format(filesize/blocksize)
    print("Retrieving block {}{}, block size {}".format(count, filesizestr,
                                                        blocksize))


def download_from_url(mirror, to_rootdir, zipfile=False):
    print("Checking to see if site is up...")
    any_asset_url = os.path.join(mirror, next(iter(assets)))
    if not url_is_retrievable(any_asset_url):
        return
    print("Site is up. Downloading assets...")
    if zipfile:
        zipfilename = "zelda30tribute.zip"
        urllib.urlretrieve(mirror, filename=zipfilename,
                           reporthook=download_reporthook)
        print("Unzipping {} -> {}".format(zipfilename, to_rootdir))
        unzip(zipfilename, to_rootdir)
    else:
        fileno = 0
        for asset in assets:
            fileno += 1
            asseturl = os.path.join(mirror, asset)
            dstpath = os.path.join(to_rootdir, asset)
            print("Downloading asset ({}/{}): {} -> {}"
                  .format(fileno, len(assets), asseturl, dstpath))
            makedirs(dstpath)
            urllib.urlretrieve(asseturl, filename=dstpath)


def download_assets(to_rootdir):
    # Shuffle the mirrors for load balancing:
    shuffled_zip_mirrors = mirrors['zip']
    shuffle(shuffled_zip_mirrors)
    for mirror in shuffled_zip_mirrors:
        print("Attempting to download zip file from mirror: {}".format(mirror))
        download_from_url(mirror, to_rootdir, zipfile=True)
        if not files_missing(to_rootdir):
            return
    for mirror in mirrors['plain']:
        print("Attempting to download from plain mirror: {}".format(mirror))
        download_from_url(mirror, to_rootdir)
        if not files_missing(to_rootdir):
            return
    raise Exception("Found no available mirrors to download all files from.")


def makedirs(path):
    """ Create the directories that lead to the specified file. """
    dirpath = os.path.dirname(path)
    try:
        os.makedirs(dirpath)
        print("Created directory: {}".format(dirpath))
    except OSError as exc:
        if exc.errno == errno.EEXIST and os.path.isdir(dirpath):
            pass
        else:
            raise


def files_missing(rootdir):
    missing = set()
    for asset in assets:
        path = os.path.join(rootdir, asset)
        if not os.path.isfile(path):
            missing.add(path)
    return missing


def print_missing_files(missing):
    allmissing = all(any(m.endswith(asset) for asset in assets)
                     for m in missing)
    if allmissing:
        parentdir = commondir(missing)
        print("All assets are missing in directory: {}".format(parentdir))
        return
    fullpaths = {abspath(path) for path in missing}
    print("Files missing:\n{}".format("\n".join(fullpaths)))


def move_assets(from_rootdir, to_rootdir):
    print('Moving assets: {} -> {}...'.format(abspath(from_rootdir),
                                              abspath(to_rootdir)))
    for asset in assets:
        srcpath = os.path.join(from_rootdir, asset)
        dstpath = os.path.join(to_rootdir, asset)
        makedirs(dstpath)
        print('Moving asset: {} -> {}...'.format(srcpath, dstpath))
        shutil.move(srcpath, dstpath)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--asset_dir', '-a', default="./assets",
                        help="Directory storing the assets.")
    parser.add_argument('--root_dir', '-r', default=".",
                        help="Root directory for the project.")
    parser.add_argument('operation',
                        choices=[
                            'unpack',  # Move asset dir -> root dir
                            'pack',  # Move root dir -> asset dir
                            'check',  # Check existence of assets
                            'verify',  # Check file integrity of assets
                            'unzip',  # Unzip a zip file to asset dir
                            'download',  # Download assets from external site
                        ],
                        help="What do you want to do?")
    args = parser.parse_args()

    asset_dir = args.asset_dir
    root_dir = args.root_dir
    files_missing_in_asset_dir = files_missing(asset_dir)
    files_missing_in_root_dir = files_missing(root_dir)

    if args.operation == "pack":
        if files_missing_in_root_dir:
            if files_missing_in_asset_dir:
                print_missing_files(files_missing_in_root_dir)
            else:
                print("Already packed.")
        else:
            move_assets(root_dir, asset_dir)
    elif args.operation == "unpack":
        if files_missing_in_asset_dir:
            if files_missing_in_root_dir:
                print_missing_files(files_missing_in_asset_dir)
            else:
                print("Already unpacked.")
        else:
            move_assets(asset_dir, root_dir)
    elif args.operation == "check":
        if files_missing_in_asset_dir and files_missing_in_root_dir:
            print_missing_files(files_missing_in_root_dir)
            print_missing_files(files_missing_in_asset_dir)
        else:
            msg = 'All assets are currently stored in {}.'
            if not files_missing_in_asset_dir:
                print(msg.format(abspath(asset_dir)))
            if not files_missing_in_root_dir:
                print(msg.format(abspath(root_dir)))
    elif args.operation == "verify":
        if files_missing_in_asset_dir:
            print("There are files missing in the asset directory. Skipping.")
        else:
            check_file_integrity(asset_dir, verbose=True)
    elif args.operation == "unzip":
        if not files_missing_in_asset_dir:
            print("The files are already stored in {}" .format(asset_dir))
        else:
            zipfilename = "zelda30tribute.zip"
            print("Unzipping {} -> {}".format(zipfilename, asset_dir))
            unzip(zipfilename, asset_dir)
    elif args.operation == "download":
        if not files_missing_in_asset_dir:
            print("The files are already downloaded and stored in {}"
                  .format(asset_dir))
        else:
            if mirrors['zip'] or mirrors['plain']:
                download_assets(asset_dir)
                check_file_integrity(asset_dir)
            else:
                print("There are no sites to download from. Please add an URL "
                      "to the list of mirrors.")
