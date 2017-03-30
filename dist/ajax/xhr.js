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
    this.ajaxBefore = function () {/* to be implemented */};
    this.ajaxError = function (error) {/* to be implemented */};
    this.ajaxComplete = function () {/* to be implemented */};
  }

  _createClass(Xhr, [{
    key: 'ajax',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
        var url = _ref2.url,
            _ref2$method = _ref2.method,
            method = _ref2$method === undefined ? 'GET' : _ref2$method,
            record = _ref2.record,
            next = _ref2.next,
            error = _ref2.error,
            complete = _ref2.complete;
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                this.ajaxBefore();
                _context.next = 4;
                return this.promise({ url: url, method: method, record: record });

              case 4:
                response = _context.sent;

                next && next(response);
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                this.ajaxError(_context.t0);
                error && error(_context.t0);

              case 12:
                _context.prev = 12;

                this.ajaxComplete();
                complete && complete();
                return _context.finish(12);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8, 12, 16]]);
      }));

      function ajax(_x) {
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
    value: function request(_ref3, done) {
      var url = _ref3.url,
          method = _ref3.method,
          record = _ref3.record;

      if (this.BASE_URL) {
        url = this.BASE_URL + '/' + url;
      }
      if (method === 'get' && record !== null) {
        url = url + '?' + _string2.default.toQueryString(record);
      }
      var xhr = this.xhr;
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            done(null, JSON.parse(xhr.responseText));
          } else {
            try {
              done(JSON.parse(xhr.responseText));
            } catch (e) {
              done(xhr.responseText);
            }
          }
        }
      };
      xhr.send(record !== null ? JSON.stringify(record) : null);
    }
  }]);

  return Xhr;
}();

exports.default = new Xhr();