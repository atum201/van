'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var whitelist = [];

exports.default = {
  origin: function origin(_origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(_origin) !== -1;
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  }
};
module.exports = exports['default'];
//# sourceMappingURL=cors.js.map
