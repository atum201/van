'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vote = exports.Rank = exports.Match = exports.Clan = exports.Team = exports.Title = exports.Tournament = exports.Member = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = require('../schema');

var Schema = _interopRequireWildcard(_schema);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = function Model(name, schema) {
  return _mongoose2.default.model(name, Schema[schema || name + "Schema"]);
};

var Member = exports.Member = Model("Member");
var Tournament = exports.Tournament = Model("Tournament");
var Title = exports.Title = Model("Title");
var Team = exports.Team = Model("Team");
var Clan = exports.Clan = Model("Clan");
var Match = exports.Match = Model("Match");
var Rank = exports.Rank = Model("Rank");
var Vote = exports.Vote = Model("Vote");
//# sourceMappingURL=vote.js.map
