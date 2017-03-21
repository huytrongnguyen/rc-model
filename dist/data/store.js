'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _xhr = require('./../ajax/xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = function store(config) {
  return function (WrappedComponent) {
    return function (_Component) {
      _inherits(_class, _Component);

      function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.state = {
          store: {
            data: null
          }
        };
        return _this;
      }

      _createClass(_class, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          var store = this.props.store;

          _map2.default.of(config.mutations).each(function (name, mutator) {
            relay[name] = function (options) {
              return _this2.commitUpdate(mutator, options);
            };
          });
        }
      }, {
        key: 'componentDidMount',
        value: function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            var endpoint, params, response, done, fail;
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
                    return _xhr2.default.ajax(this.getRelativeUrl(endpoint), 'GET', params);

                  case 7:
                    response = _context.sent;
                    done = config.done, fail = config.fail;

                    if (response) {

                      store.data = done ? done(response) : response;
                      this.setState(function () {
                        return { store: store };
                      });
                    } else if (fail) {
                      fail();
                    }

                  case 10:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function componentDidMount() {
            return _ref.apply(this, arguments);
          }

          return componentDidMount;
        }()
      }, {
        key: 'commitUpdate',
        value: function () {
          var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(mutator, options) {
            var endpoint, response, done, fail;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    endpoint = options.path || mutator.path;
                    _context2.next = 3;
                    return _xhr2.default.ajax(endpoint, mutator.type, options.record);

                  case 3:
                    response = _context2.sent;
                    done = options.done, fail = options.fail;

                    if (response && done) {
                      done(response);
                    } else if (fail) {
                      fail();
                    }

                  case 6:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function commitUpdate(_x, _x2) {
            return _ref2.apply(this, arguments);
          }

          return commitUpdate;
        }()
      }, {
        key: 'render',
        value: function render() {
          var data = this.state.data;

          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, { store: store }));
        }
      }]);

      return _class;
    }(_react.Component);
  };
};

exports.default = store;