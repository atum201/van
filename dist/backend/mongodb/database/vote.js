'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbPort = process.argv[4] || 27017;
exports.default = _mongoose2.default.createConnection('mongodb://dragon:bElOngtOmE@localhost:' + dbPort + '/cloud', { useMongoClient: true, keepAlive: 1 });
module.exports = exports['default'];
//# sourceMappingURL=vote.js.map
