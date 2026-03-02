class IntervalHub {
  static ALL_INTERVALS = [];

  static startInterval(func, timer) {
    const interval = setInterval(func, timer);
    this.ALL_INTERVALS.push(interval);
  }

  static stopAllInterval(){
    this.ALL_INTERVALS.forEach(clearInterval);
    this.ALL_INTERVALS = [];
  };
}


