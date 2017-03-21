'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EMPTY_MAP = {};

var Map = function () {
  function Map(keyValues) {
    _classCallCheck(this, Map);

    this.map = EMPTY_MAP;
    if (keyValues) {
      if (keyValues.length === 1) {
        this.map = keyValues[0];
      } else if (keyValues.length % 2 !== 0) {
        throw new Error('Missing value for key: ' + keyValues[keyValues.length - 1]);
      } else {
        for (var index = 0, element; (element = keyValues[index]) != null; index += 2) {
          this.map[element] = keyValues[index + 1];
        }
      }
    }
    return this;
  }

  _createClass(Map, [{
    key: 'each',
    value: function each(iteratee) {
      for (var key in this.map) {
        iteratee(key, this.map[key], this.map);
      }
      return this;
    }
  }], [{
    key: 'of',
    value: function of() /*...keyValues*/{
      return new Map(arguments);
    }
  }]);

  return Map;
}();

exports.default = Map;