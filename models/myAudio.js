/**
 * Creates a new MyAudio
 * @class
 */
export class MyAudio {
  // #region Properties
  sound;
  IS_LOADED = false;
  // #endregion

  /**
   * Intialises the parameter
   * @param {string} sound_ 
   */
  constructor(sound_) {
    this.sound = new Audio(sound_);
  }

}
