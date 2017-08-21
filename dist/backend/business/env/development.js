'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  env: 'development',
  db: process.argv[2] || 'mongodb://19admin:agghgagag@localhost:27017/19vote',
  port: process.argv[3] || 80
};
module.exports = exports['default'];
//# sourceMappingURL=development.js.map
