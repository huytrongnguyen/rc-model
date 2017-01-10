'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('./../data/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var dataContainer = function dataContainer(config) {
  return function (target) {
    target.prototype.componentWillMount = function () {
      var _this = this;

      this.props.lazy = {};
      var mutations = config.mutations;

      if (mutations) {
        var lazy = this.props.lazy;

        var _loop = function _loop(mutationName) {
          lazy[mutationName] = function (options) {
            return _this.commitUpdate(mutations[mutationName], options);
          };
        };

        for (var mutationName in mutations) {
          _loop(mutationName);
        }
      }
    };

    target.prototype.componentDidMount = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var endpoint, params, response, resolve;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              endpoint = config.endpoint;

              if (endpoint) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return');

            case 3:
              params = endpoint.initialVariables ? endpoint.initialVariables() : null;

              endpoint = endpoint.name || endpoint;
              _context.next = 7;
              return _store2.default.fetch(endpoint, params);

            case 7:
              response = _context.sent;
              resolve = config.resolve;

              if (resolve) {
                response = resolve(response);
              }
              this.setState(function () {
                return response;
              });

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    target.prototype.commitUpdate = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(mutator, options) {
        var endpoint, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                endpoint = options.path || mutator.path;
                _context2.next = 3;
                return _store2.default.mutate(endpoint, mutator.type, options.record);

              case 3:
                response = _context2.sent;

                if (response && options.success) {
                  options.success(response);
                } else if (options.failure) {
                  options.failure();
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();
  };
};

exports.default = dataContainer;