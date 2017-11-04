'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.createConnection('mongodb://qlvb:QLVB20119@localhost:6996/qlvb', { server: { socketOptions: { keepAlive: 1 } }, useMongoClient: true });
module.exports = exports['default'];
//# sourceMappingURL=egov.js.map
