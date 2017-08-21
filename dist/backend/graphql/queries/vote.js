'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.voteById = exports.rankById = exports.matchById = exports.titleById = exports.tournamentById = exports.clanById = exports.memberById = exports.vote = exports.rank = exports.match = exports.title = exports.tournament = exports.clan = exports.member = undefined;

var _graphql = require('graphql');

var _vote = require('../types/vote');

var GraphQLType = _interopRequireWildcard(_vote);

var _mongodb = require('../../mongodb');

var Model = _interopRequireWildcard(_mongodb);

var _util = require('../../common/util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var makeQuery = function makeQuery(graphQLType, model, multi) {
  if (multi) {
    return {
      type: new _graphql.GraphQLList(graphQLType),
      args: {
        q: {
          type: _graphql.GraphQLString
        }
      },
      resolve: function resolve(_, _ref) {
        var q = _ref.q;

        var options = JSON.parse(q);
        return model.findAsync(options).then(function (docs) {
          return docs.map(function (doc) {
            return (0, _util.standardDoc)(doc);
          });
        }).error(function (e) {});
      }
    };
  } else {
    return {
      type: graphQLType,
      args: {
        q: {
          type: _graphql.GraphQLString
        }
      },
      resolve: function resolve(_, _ref2) {
        var q = _ref2.q;

        var options = JSON.parse(q);
        return model.findOneAsync(options).then(function (doc) {
          return (0, _util.standardDoc)(doc);
        }).error(function (e) {});
      }
    };
  }
};
var member = exports.member = makeQuery(GraphQLType.MemberType, Model.Member, true);
var clan = exports.clan = makeQuery(GraphQLType.ClanType, Model.Clan, true);
var tournament = exports.tournament = makeQuery(GraphQLType.TournamentType, Model.Tournament, true);
var title = exports.title = makeQuery(GraphQLType.TitleType, Model.Title, true);
var match = exports.match = makeQuery(GraphQLType.MatchType, Model.Match, true);
var rank = exports.rank = makeQuery(GraphQLType.RankType, Model.Rank, true);
var vote = exports.vote = makeQuery(GraphQLType.VoteType, Model.Vote, true);

var memberById = exports.memberById = makeQuery(GraphQLType.MemberType, Model.Member, false);
var clanById = exports.clanById = makeQuery(GraphQLType.ClanType, Model.Clan, false);
var tournamentById = exports.tournamentById = makeQuery(GraphQLType.TournamentType, Model.Tournament, false);
var titleById = exports.titleById = makeQuery(GraphQLType.TitleType, Model.Title, false);
var matchById = exports.matchById = makeQuery(GraphQLType.MatchType, Model.Match, false);
var rankById = exports.rankById = makeQuery(GraphQLType.RankType, Model.Rank, false);
var voteById = exports.voteById = makeQuery(GraphQLType.VoteType, Model.Vote, false);
//# sourceMappingURL=vote.js.map
