import { MyAudio } from "../myAudio.js";
export class AudioHub {
  // #region Properties

  static START_GAME = new MyAudio("./assets/audio/game/gameStart.mp3");

  static CHARACTER = {
    run: new MyAudio("./assets/audio/character/characterRun.mp3"),
    jump: new MyAudio("./assets/audio/character/characterJump.wav"),
    damage: new MyAudio("./assets/audio/character/characterDamage.mp3"),
    dead: new MyAudio("./assets/audio/character/characterDead.wav"),
  };

  static CHICKEN = {
    dead: new MyAudio("./assets/audio/chicken/chickenDead.mp3"),
  };

  static COLLECTIBLE = {
    collectBottle: new MyAudio(
      "./assets/audio/collectibles/bottleCollectSound.wav",
    ),
    collectCoin: new MyAudio("./assets/audio/collectibles/collectSound.wav"),
  };

  static THROWABLE = {
    broken: new MyAudio("./assets/audio/throwable/bottleBreak.mp3"),
  };

  static ALL_SOUNDS = [
    AudioHub.START_GAME,
    AudioHub.CHARACTER.run,
    AudioHub.CHARACTER.jump,
    AudioHub.CHARACTER.damage,
    AudioHub.CHARACTER.dead,
    AudioHub.CHICKEN.dead,
    AudioHub.COLLECTIBLE.collectBottle,
    AudioHub.COLLECTIBLE.collectCoin,
    AudioHub.THROWABLE.broken,
  ];

  // #region Flags
  static MUTE_FLAG = true;

  // #endregion

  // #endregion

  // #region Methods
  static playSound(truck, checkPaused) {
    if (!AudioHub.MUTE_FLAG) {
      if (checkPaused == false) {
        AudioHub.startPlaying(truck);
      } else {
        if (!truck.sound.paused) return;
        AudioHub.startPlaying(truck);
      }
    }
  }

  static startPlaying(truck) {
    if (truck.sound.readyState == 4 || truck.IS_LOADED == true) {
      truck.IS_LOADED = true;
      truck.sound.volume = 1;
      truck.sound.currentTime = 0;
      truck.sound.play();
    }
  }

  static stopSound(truck) {
    truck.sound.pause();
  }

  static stopAllSounds() {
    AudioHub.ALL_SOUNDS.forEach((truck) => {
      truck.sound.pause();
    });
  }

  static mute() {
    AudioHub.ALL_SOUNDS.forEach((truck) => (truck.sound.volume = 0));
    AudioHub.MUTE_FLAG = true;
  }

  static unMute() {
    AudioHub.ALL_SOUNDS.forEach((truck) => (truck.sound.volume = 0.2));
    AudioHub.MUTE_FLAG = false;
  }
  // #endregion
}
