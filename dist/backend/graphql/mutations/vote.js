'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doc = exports.image = exports.msg = exports.inbox = exports.vote = exports.rank = exports.match = exports.title = exports.tournament = exports.clan = exports.member = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongodb = require('mongodb');

var _graphql = require('graphql');

var _vote = require('../types/vote');

var GraphQLType = _interopRequireWildcard(_vote);

var _mongodb2 = require('../../mongodb');

var Model = _interopRequireWildcard(_mongodb2);

var _util = require('../../common/util');

var _constant = require('../../common/constant');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubmitType = GraphQLType.SubmitType;


var makeSubmit = function makeSubmit(graphQLType, col) {
  return {
    type: graphQLType,
    args: {
      data: SubmitType
    },
    resolve: function resolve(root, _ref) {
      var data = _ref.data;
      var payload = data.payload,
          action = data.action;

      if (action === _constant.ADD) {
        var _doc = new col(payload);
        return _doc.saveAsync().then(function (d) {
          return (0, _util.standardDoc)(d);
        }).error(function (e) {
          return {
            id: _constant.STATE_ERROR
          };
        });
      }
      if (action === _constant.UPDATE) {
        return col.findOneAsync({ _id: (0, _mongodb.ObjectID)(payload.id) }).then(function (doc) {
          if (doc) {
            _lodash2.default.assign(doc, payload); // update Document
            return doc.saveAsync();
          } else {
            return { id: _constant.STATE_NOT_FOUND };
          }
        }).error(function (e) {
          return {
            id: _constant.STATE_ERROR
          };
        });
      }
      if (action === _constant.REMOVE) {
        if (Array.isArray(payload.id)) {
          var idsIn = _lodash2.default.flatMap(payload.id, function (m) {
            return (0, _mongodb.ObjectID)(m);
          });
          return col.removeAsync({ _id: { $in: idsIn } }).then(function () {
            return { id: _constant.STATE_SUCCESS };
          }).error(function (e) {
            return { id: _constant.STATE_ERROR };
          });
        } else {
          return col.removeAsync({ _id: (0, _mongodb.ObjectID)(payload.id) }).then(function () {
            return { id: _constant.STATE_SUCCESS };
          }).error(function (e) {
            return { id: _constant.STATE_ERROR };
          });
        }
      }
    }
  };
};

var member = exports.member = makeSubmit(GraphQLType.MemberType, Model.Member);
var clan = exports.clan = makeSubmit(GraphQLType.ClanType, Model.Clan);
var tournament = exports.tournament = makeSubmit(GraphQLType.TournamentType, Model.Tournament);
var title = exports.title = makeSubmit(GraphQLType.TitleType, Model.Title);
var match = exports.match = makeSubmit(GraphQLType.MatchType, Model.Match);
var rank = exports.rank = makeSubmit(GraphQLType.RankType, Model.Rank);
var vote = exports.vote = makeSubmit(GraphQLType.VoteType, Model.Vote);
var inbox = exports.inbox = makeSubmit(GraphQLType.InboxType, Model.Inbox);
var msg = exports.msg = makeSubmit(GraphQLType.MsgType, Model.Msg);
var image = exports.image = makeSubmit(GraphQLType.ImageType, Model.Image);
var doc = exports.doc = makeSubmit(GraphQLType.DocType, Model.Doc);
//# sourceMappingURL=vote.js.map
