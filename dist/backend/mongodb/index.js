'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _egov = require('./model/egov');

var egov = _interopRequireWildcard(_egov);

var _vote = require('./model/vote');

var vote = _interopRequireWildcard(_vote);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = Object.assign(egov, vote);
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
