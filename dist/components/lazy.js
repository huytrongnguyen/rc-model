'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('./../data/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyContainer = function (_Component) {
  _inherits(LazyContainer, _Component);

  function LazyContainer(props) {
    _classCallCheck(this, LazyContainer);

    return _possibleConstructorReturn(this, (LazyContainer.__proto__ || Object.getPrototypeOf(LazyContainer)).call(this, props));
  }

  _createClass(LazyContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.createQuerySet();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: 'createQuerySet',
    value: function createQuerySet() {
      var _this2 = this;

      this.props.lazy = {};
      var _props = this.props,
          mutations = _props.mutations,
          lazy = _props.lazy;

      if (mutations) {
        var _loop = function _loop(mutationName) {
          lazy[mutationName] = function (options) {
            return _this2.commitUpdate(mutations[mutationName], options);
          };
        };

        for (var mutationName in mutations) {
          _loop(mutationName);
        }
      }
    }
  }, {
    key: 'commitUpdate',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(mutator, options) {
        var endpoint, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                endpoint = options.path || mutator.path;
                _context.next = 3;
                return _store2.default.mutate(endpoint, mutator.type, options.record);

              case 3:
                response = _context.sent;

                if (response && options.success) {
                  options.success(response);
                } else if (options.failure) {
                  options.failure();
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function commitUpdate(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return commitUpdate;
    }()
  }, {
    key: 'fetchData',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var endpoint, params, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.props.endpoint) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                endpoint = this.props.endpoint;
                params = endpoint.initialVariables ? endpoint.initialVariables() : null;

                endpoint = endpoint.name || endpoint;
                _context2.next = 7;
                return _store2.default.fetch(endpoint, params);

              case 7:
                response = _context2.sent;

                if (this.props.resolve) {
                  response = this.props.resolve(response);
                }
                this.setState(function () {
                  return response;
                });

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchData() {
        return _ref2.apply(this, arguments);
      }

      return fetchData;
    }()
  }]);

  return LazyContainer;
}(_react.Component);

exports.default = LazyContainer;