const EMPTY_MAP = {};

export default class Map {
  constructor(keyValues) {
    this.map = EMPTY_MAP;
    if (keyValues) {
      if (keyValues.length === 1) {
        this.map = keyValues[0];
      } else if (keyValues.length % 2 !== 0) {
        throw new Error('Missing value for key: ' + keyValues[keyValues.length - 1]);
      } else {
        for (let index = 0, element; (element = keyValues[index]) != null; index += 2) {
          this.map[element] = keyValues[index + 1];
        }
      }
    }
    return this;
  }

  static of(/*...keyValues*/) {
    return new Map(arguments);
  }

  each(iteratee) {
    for (let key in this.map) {
      iteratee(key, this.map[key], this.map);
    }
    return this;
  }
}