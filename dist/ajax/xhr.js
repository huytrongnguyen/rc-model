'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MutationType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _string = require('./../core/string');

var _string2 = _interopRequireDefault(_string);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MutationType = exports.MutationType = {
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

var Xhr = function () {
  function Xhr() {
    _classCallCheck(this, Xhr);

    this.BASE_URL = null;
    this.xhr = new XMLHttpRequest();
    this.ajaxComplete = function () {/* to be implemented */};
    this.ajaxError = function (error) {/* to be implemented */};
  }

  _createClass(Xhr, [{
    key: 'ajax',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url, method, params) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.promise({ url: url, method: method, params: params });

              case 3:
                response = _context.sent;

                if (!response.error) {
                  _context.next = 7;
                  break;
                }

                this.ajaxError(response.error);
                return _context.abrupt('return', null);

              case 7:
                this.ajaxComplete();
                return _context.abrupt('return', response);

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](0);

                console.error(_context.t0);
                this.ajaxError(_context.t0);
                return _context.abrupt('return', null);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      function ajax(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return ajax;
    }()
  }, {
    key: 'promise',
    value: function promise(settings) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.request(settings, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        });
      });
    }
  }, {
    key: 'request',
    value: function request(settings, done) {
      var xhr = this.xhr;
      var url = settings.url,
          method = settings.method,
          params = settings.params;

      if (this.BASE_URL) {
        url = this.BASE_URL + '/' + url;
      }
      if (method === 'get' && params !== null) {
        url = url + '?' + _string2.default.toQueryString(params);
      }
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          try {
            done(null, JSON.parse(xhr.responseText));
          } catch (e) {
            done(null, xhr.responseText);
          }
        }
      };
      xhr.send(params !== null ? JSON.stringify(params) : null);
    }
  }]);

  return Xhr;
}();

exports.default = new Xhr();