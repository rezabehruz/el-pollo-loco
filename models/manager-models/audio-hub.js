import { MyAudio } from "../myAudio.js";
export class AudioHub {
  // #region Properties

  static CHARACTER = {
    run: new MyAudio("./assets/audio/character/characterRun.mp3"),
    jump: new MyAudio("./assets/audio/character/characterJump.wav"),
    damage: new MyAudio("./assets/audio/character/characterDamage.mp3"),
    dead: new MyAudio("./assets/audio/character/characterDead.wav"),
    snoring: new MyAudio("./assets/audio/character/characterSnoring.mp3"),
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
    AudioHub.CHARACTER.run,
    AudioHub.CHARACTER.jump,
    AudioHub.CHARACTER.damage,
    AudioHub.CHARACTER.dead,
    AudioHub.CHARACTER.snoring,
  ];
  // #endregion

  // #region Methods
  static playSound(truck, checkPaused) {
    if (checkPaused == false) {
      AudioHub.startPlaying(truck);
    } else {
      if (!truck.sound.paused) return;
      AudioHub.startPlaying(truck);
    }
  }

  static startPlaying(truck) {
    AudioHub.stopAllSounds(AudioHub.ALL_SOUNDS);
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
  }

  static unMute() {
    AudioHub.ALL_SOUNDS.forEach((truck) => (truck.sound.volume = 0.2));
  }
  // #endregion
}
