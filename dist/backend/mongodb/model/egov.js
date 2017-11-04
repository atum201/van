'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhanCap = exports.File = exports.Group = exports.Message = exports.User = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = require('../schema');

var Schema = _interopRequireWildcard(_schema);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = function Model(name, schema) {
  return _mongoose2.default.model(name, Schema[schema || name + "Schema"]);
};
// import MongoDB from '../database/egov'
var User = exports.User = Model("User");
var Message = exports.Message = Model("Message");
var Group = exports.Group = Model("Group");
var File = exports.File = Model("File");
var PhanCap = exports.PhanCap = Model("PhanCap");
//# sourceMappingURL=egov.js.map
