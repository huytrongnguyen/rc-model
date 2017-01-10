'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MutationType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xhr = require('./../ajax/xhr');

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MutationType = exports.MutationType = {
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    this.BASE_URL = '';
  }

  _createClass(Store, [{
    key: 'fetch',
    value: function fetch(endpoint, params) {
      return _xhr2.default.ajax(this.getRelativeUrl(endpoint), 'get', params);
    }
  }, {
    key: 'mutate',
    value: function mutate(endpoint, method, params) {
      return _xhr2.default.ajax(this.getRelativeUrl(endpoint), method, params);
    }
  }, {
    key: 'getRelativeUrl',
    value: function getRelativeUrl(endpoint) {
      return this.BASE_URL === '' ? endpoint : this.BASE_URL + '/' + endpoint;
    }
  }]);

  return Store;
}();

exports.default = new Store();