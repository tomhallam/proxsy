export class GenericTimer {

  constructor(id) {
    this.id = id;
  }

  start() {
    this.timer = process.hrtime();
  }

  getValue() {
    let diff = process.hrtime(this.timer);
    return (diff[0] * 1e9 + diff[1]) / 1e6;
  }

}
