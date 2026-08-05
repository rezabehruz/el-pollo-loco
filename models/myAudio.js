/**
 * Creates a new MyAudio
 * @class
 */
export class MyAudio {
  // #region Properties
  sound;
  IS_LOADED = false;
  // #endregion

  // #region Constructor
  /**
   * Intialises the parameter
   * @param {string} sound_ 
   */
  constructor(sound_) {
    this.sound = new Audio(sound_);
  }

  // #endregion
}
