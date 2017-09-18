'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speech = exports.inbox = exports.vote = exports.rank = exports.match = exports.title = exports.tournament = exports.clan = exports.member = undefined;

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

      console.log(payload, action);
      if (action === _constant.ADD) {
        console.log(_constant.ADD);
        var doc = new col(payload);
        return doc.saveAsync().then(function (d) {
          return (0, _util.standardDoc)(d);
        }).error(function (e) {
          return {
            id: "-1"
          };
        });
      }
      if (action === _constant.EDIT) {
        console.log(_constant.EDIT);
        return col.findOneAsync({ _id: (0, _mongodb.ObjectID)(payload.id) }).then(function (doc) {
          if (doc) {
            _lodash2.default.assign(doc, payload); // update Document
            return doc.saveAsync();
          } else {
            return { id: "-1" };
          }
        });
      }
      if (action === _constant.DEL) {
        console.log(_constant.DEL);
        return col.findOneAsync({ _id: (0, _mongodb.ObjectID)(payload.id) }).then(function (doc) {
          if (doc) {
            doc.removeAsync();
            return {
              id: "0"
            };
          } else {
            return {
              id: "-1"
            };
          }
        }).error(function (e) {
          return {
            id: "-1"
          };
        });
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
var speech = exports.speech = makeSubmit(GraphQLType.SpeechType, Model.Speech);
//# sourceMappingURL=vote.js.map
