var playedLevelingbgmGrades = [false, false]
var playedLevelingbgmMarathon = [false, false]
var lastbgmTime = 0
var killAllbgm = false
var sidebgmraised = false

var currentMusic
var sideMusic

function Sound2() {
  var piecetypes = "tgm,npm".split(",")
  var gametypes = "ppt,tgm,npm,yotipo,toj,nes,tf,99,com,party".split(",")
  var uitypes = "ppt,tgm,npm,yotipo,toj,nes,tf,99,com,party".split(",")
  var voxtypes = "alexey,friends,toj".split(",")
  var wavenames = "alarm,bravo,levelup,step,endingstart,erase1,erase2,erase3,erase4,gameover,garbage,lock,tspin0,tspin1,tspin2,tspin3,piece0,piece1,piece2,piece3,piece4,piece5,piece6,harddrop,move,rotate,initialrotate,hold,initialhold,ready,go,linefall,b2b_erase4,b2b_tspin1,b2b_tspin2,b2b_tspin3,erase1,erase2,erase3,erase4,lose,ren1,ren2,ren3,tspin0,tspin1,tspin2,tspin3,win,ren/ren1,ren/ren2,ren/ren3,ren/ren4,ren/ren5,ren/ren6,ren/ren7,ren/ren8,ren/ren9,ren/ren10,ren/ren11,ren/ren12,ren/ren13,ren/ren14,ren/ren15,ren/ren16,ren/ren17,ren/ren18,ren/ren19,ren/ren20,b2b_erase4,b2b_tspin1,b2b_tspin2,b2b_tspin3".split(",");
  var soundtypes = "fixed,game,game,game,ui,game,game,game,game,ui,game,game,game,game,game,game,piece,piece,piece,piece,piece,piece,piece,game,game,game,game,game,game,ui,ui,game,vox,vox,vox,vox,vox,vox,vox,vox,vox,vox,vox,vox,vox,vox,vox,vox,vox,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game,game".split(",");
  var sounds = {}
  var music = {}
  var voices = {}
  var currentMusicName
  var sideMusicName
  this.init = function (type) {
    Howler.unload()

    if (mySettings["Sound"] == 1) {
      for (var i = 0; i < wavenames.length; i++) {
        var iname = wavenames[i];
        //          var wave = document.createElement("AUDIO");
        switch (soundtypes[i]) {
          case "game":

            sounds[iname] = new Howl({
              src: ["se/game/" + gametypes[settings.Soundbank] + "/" + iname + ".wav"],
              volume: mySettings.Volume / 100
            });
            break;
          case "vox":

            voices[iname] = new Howl({
              src: ["vox/" + voxtypes[settings.Voicebank] + "/" + iname + ".wav"],
              volume: mySettings.Volume / 100
            });
            break;
          case "ui":
            sounds[iname] = new Howl({
              src: ["se/ui/" + gametypes[settings.Soundbank] + "/" + iname + ".wav"],
              volume: mySettings.Volume / 100
            });
            break;
          case "piece":
            sounds[iname] = new Howl({
              src: ["se/piece/" + piecetypes[settings.NextType] + "/" + iname + ".wav"],
              volume: mySettings.Volume / 100
            });
            break;
          case "bgm":
            music[iname + "start"] = new Howl({
              src: ["bgm/" + iname + "start.ogg"],
              volume: mySettings.MusicVol / 100,
              onend: function () {
                currentMusic = music[currentMusicName + "loop"].play();
              }
            });
            music[iname + "loop"] = new Howl({
              src: ["bgm/" + iname + "loop.ogg"],
              volume: mySettings.MusicVol / 100,
              loop: true,
            });
            break;
          case "bgmside":
            music[iname + "start"] = new Howl({
              src: ["bgm/" + iname + "start.ogg"],
              volume: 0,
              onend: function () {
                sideMusic = music[sideMusicName + "loop"].play();
              }
            });
            music[iname + "loop"] = new Howl({
              src: ["bgm/" + iname + "loop.ogg"],
              volume: 0,
              loop: true,
            });
            break;
          case "fixed":
            sounds[iname] = new Howl({
              src: ["se/fixed/" + iname + ".wav"],
              volume: mySettings.Volume / 100,
              loop: true
            });
            break;
        }
      }
    }
    this.playse = function (name, arg) {
      let noStop;
      if (name == "ren/ren") {
        noStop = true
        }
      if (mySettings["Sound"] == 1) {
        if (arg !== undefined) {
          name += arg
        }
        
        if (noStop !== true) {
          sounds[name].stop()
        }
        sounds[name].play()
      }
    }
    this.playvox = function (name, arg) {

      if (mySettings["Sound"] == 1 && settings.Voice == 1) {
        if (arg !== undefined) {
          name += arg
        }
        voices[name].stop()
        voices[name].play()
      }
    }
    this.stopse = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (arg !== undefined) {
          name += arg
        }
        sounds[name].stop()
      }
    }
    this.loadbgm = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (arg !== undefined) {
          name += arg
        }
        music[name + "start"] = new Howl({
          src: ["bgm/" + name + "start.ogg"],
          volume: mySettings.MusicVol / 100,
          onend: function () {
            currentMusic = music[currentMusicName + "loop"].play();
          }
        });
        music[name + "loop"] = new Howl({
          src: ["bgm/" + name + "loop.ogg"],
          volume: mySettings.MusicVol / 100,
          loop: true,
        });

      }
    }
    this.loadsidebgm = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (arg !== undefined) {
          name += arg
        }
        music[name + "start"] = new Howl({
          src: ["bgm/" + name + "start.ogg"],
          volume: 0,
          onend: function () {
            sideMusic = music[sideMusicName + "loop"].play();
          }
        });
        music[name + "loop"] = new Howl({
          src: ["bgm/" + name + "loop.ogg"],
          volume: 0,
          loop: true,
        });
      }
    }
    this.playbgm = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (arg !== undefined) {
          name += arg
        }
        currentMusicName = name
        currentMusic = music[name + "start"].play()
      }
    }
    this.playsidebgm = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (arg !== undefined) {
          name += arg
        }
        sideMusicName = name
        sideMusic = music[name + "start"].play()
      }
    }
    this.killbgm = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (arg !== undefined) {
          name += arg
        }
        for (var currentname in music) {
          music[currentname].stop()
        }
      }
    }
    this.raisesidebgm = function (name, arg) {
      sound.syncbgm()
      if (mySettings["Sound"] == 1) {
        if (sidebgmraised == false) {
          music[sideMusicName + "start"].fade(0, settings.MusicVol / 100, 500);
          music[sideMusicName + "loop"].fade(0, settings.MusicVol / 100, 500);
          sidebgmraised = true
        }
      }
    }
    this.lowersidebgm = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (sidebgmraised == true) {
          music[sideMusicName + "start"].fade(settings.MusicVol / 100, 0, 500);
          music[sideMusicName + "loop"].fade(settings.MusicVol / 100, 0, 500);
          sidebgmraised = false
        }
      }
    }
    this.cutsidebgm = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (sidebgmraised == true) {
          music[sideMusicName + "start"].fade(settings.MusicVol / 100, 0, 1);
          music[sideMusicName + "loop"].fade(settings.MusicVol / 100, 0, 1);
          sidebgmraised = false
        }
      }
    }

    this.mutebgm = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (arg !== undefined) {
          name += arg
        }
        for (var currentname in music) {
          music[currentname].mute(true)
        }
      }
    }
    this.unmutebgm = function (name, arg) {
      if (mySettings["Sound"] == 1) {
        if (arg !== undefined) {
          name += arg
        }
        for (var currentname in music) {
          music[currentname].mute(false)
        }
      }
    }
    this.seekbgm = function (arg) {
      if (mySettings["Sound"] == 1) {
//        if (arg !== undefined) {
//          name += arg
//        }
        for (var currentname in music) {
          console.log(music[currentname].seek());
          music[currentname].seek(arg)
        }
      }
    }
    this.seeksidebgm = function (arg) {
      if (mySettings["Sound"] == 1) {
//        if (arg !== undefined) {
//          name += arg
//        }
        music[sideMusicName + "start"].seek(arg);
        music[sideMusicName + "loop"].seek(arg);
      }
    }
    this.syncbgm = function (arg) {
      console.log("syncing")
      if (mySettings["Sound"] == 1) {
        music[sideMusicName + "start"].seek(music[currentMusicName + "start"].seek())
        music[sideMusicName + "loop"].seek(music[currentMusicName + "loop"].seek())
        
      }
    }


  }

}
var sound = new Sound2()
