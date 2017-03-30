'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _map = require('./../core/map');

var _map2 = _interopRequireDefault(_map);

var _xhr = require('./../ajax/xhr');

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

          var store = this.state.store;

          _map2.default.of(config.mutations).each(function (name, mutator) {
            store[name] = function (options) {
              return _this2.commitUpdate(mutator, options);
            };
          });
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this3 = this;

          var endpoint = config.endpoint;

          if (!endpoint) {
            return;
          }
          var record = endpoint.initialVariables ? endpoint.initialVariables() : null;
          endpoint = endpoint.name || endpoint;
          _xhr2.default.ajax({
            url: endpoint,
            record: record,
            next: function next(response) {
              var next = config.next,
                  store = _this3.state.store;

              store.data = next ? next(response) : response;
              _this3.setState(function () {
                return { store: store };
              });
            }
          });
        }
      }, {
        key: 'commitUpdate',
        value: function commitUpdate(mutator, options) {
          var endpoint = options.path || mutator.path;
          _xhr2.default.ajax({
            url: endpoint,
            method: mutator.type,
            record: options.record,
            next: options.next,
            error: options.error,
            complete: options.complete
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var store = this.state.store;

          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, { store: store }));
        }
      }]);

      return _class;
    }(_react.Component);
  };
};

exports.default = store;