class IntervalHub {

  // #region Properties
  static ALL_INTERVALS = [];

  // #endregion


  // #region Methods
  static startInterval(func, timer) {
    const interval = setInterval(func, timer);
    this.ALL_INTERVALS.push(interval);
  }

  static stopAllInterval(){
    this.ALL_INTERVALS.forEach(clearInterval);
    this.ALL_INTERVALS = [];
  };

  // #endregion
}



