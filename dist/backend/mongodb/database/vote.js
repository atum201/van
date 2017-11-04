'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.createConnection('mongodb://dragon:bElOngtOmE@localhost:6996/cloud', { useMongoClient: true, keepAlive: 1 });
module.exports = exports['default'];
//# sourceMappingURL=vote.js.map
