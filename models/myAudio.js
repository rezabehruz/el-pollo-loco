export class MyAudio {
  // #region Properties
  sound;
  IS_LOADED = false;
  // #endregion

  // #region Constructor
  constructor(sound_) {
    this.sound = new Audio(sound_);
  }

  // #endregion
}
