'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _egov = require('./egov');

var egov = _interopRequireWildcard(_egov);

var _vote = require('./vote');

var vote = _interopRequireWildcard(_vote);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var query = Object.assign(vote, egov);
exports.default = query;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
