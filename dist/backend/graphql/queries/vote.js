'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speech = exports.inbox = exports.vote = exports.rank = exports.match = exports.title = exports.tournament = exports.clan = exports.member = exports.speechId = exports.inboxId = exports.voteId = exports.rankId = exports.matchId = exports.titleId = exports.tournamentId = exports.clanId = exports.memberId = exports.speechs = exports.inboxs = exports.votes = exports.ranks = exports.matchs = exports.titles = exports.tournaments = exports.clans = exports.members = undefined;

var _graphql = require('graphql');

var _mongodb = require('mongodb');

var _vote = require('../types/vote');

var GraphQLType = _interopRequireWildcard(_vote);

var _mongodb2 = require('../../mongodb');

var Model = _interopRequireWildcard(_mongodb2);

var _util = require('../../common/util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var FindType = GraphQLType.FindType;


var makeQuery = function makeQuery(graphQLType, model, multi, id) {
  if (multi) {
    return {
      type: new _graphql.GraphQLList(graphQLType),
      args: {
        q: FindType
      },
      resolve: function resolve(_, _ref) {
        var q = _ref.q;
        var find = q.find,
            sort = q.sort,
            page = q.page,
            size = q.size;

        return model.findAsync(find || {}).then(function (docs) {
          return docs.map(function (doc) {
            return (0, _util.standardDoc)(doc);
          });
        }).error(function (e) {});
      }
    };
  } else if (id) {
    return {
      type: graphQLType,
      args: {
        q: _graphql.GraphQLString
      },
      resolve: function resolve(_, _ref2) {
        var q = _ref2.q;

        return model.findOneAsync({ _id: (0, _mongodb.ObjectID)(q) }).then(function (doc) {
          return (0, _util.standardDoc)(doc);
        }).error(function (e) {});
      }
    };
  } else {
    return {
      type: graphQLType,
      args: {
        q: FindType
      },
      resolve: function resolve(_, _ref3) {
        var q = _ref3.q;
        var find = q.find,
            sort = q.sort;

        return model.findOneAsync(find || {}).then(function (doc) {
          return (0, _util.standardDoc)(doc);
        }).error(function (e) {});
      }
    };
  }
};
var members = exports.members = makeQuery(GraphQLType.MemberType, Model.Member, true);
var clans = exports.clans = makeQuery(GraphQLType.ClanType, Model.Clan, true);
var tournaments = exports.tournaments = makeQuery(GraphQLType.TournamentType, Model.Tournament, true);
var titles = exports.titles = makeQuery(GraphQLType.TitleType, Model.Title, true);
var matchs = exports.matchs = makeQuery(GraphQLType.MatchType, Model.Match, true);
var ranks = exports.ranks = makeQuery(GraphQLType.RankType, Model.Rank, true);
var votes = exports.votes = makeQuery(GraphQLType.VoteType, Model.Vote, true);
var inboxs = exports.inboxs = makeQuery(GraphQLType.InboxType, Model.Inbox, true);
var speechs = exports.speechs = makeQuery(GraphQLType.SpeechType, Model.Speech, true);

var memberId = exports.memberId = makeQuery(GraphQLType.MemberType, Model.Member, false, true);
var clanId = exports.clanId = makeQuery(GraphQLType.ClanType, Model.Clan, false, true);
var tournamentId = exports.tournamentId = makeQuery(GraphQLType.TournamentType, Model.Tournament, false, true);
var titleId = exports.titleId = makeQuery(GraphQLType.TitleType, Model.Title, false, true);
var matchId = exports.matchId = makeQuery(GraphQLType.MatchType, Model.Match, false, true);
var rankId = exports.rankId = makeQuery(GraphQLType.RankType, Model.Rank, false, true);
var voteId = exports.voteId = makeQuery(GraphQLType.VoteType, Model.Vote, false, true);
var inboxId = exports.inboxId = makeQuery(GraphQLType.InboxType, Model.Inbox, false, true);
var speechId = exports.speechId = makeQuery(GraphQLType.SpeechType, Model.Speech, false, true);

var member = exports.member = makeQuery(GraphQLType.MemberType, Model.Member, false);
var clan = exports.clan = makeQuery(GraphQLType.ClanType, Model.Clan, false);
var tournament = exports.tournament = makeQuery(GraphQLType.TournamentType, Model.Tournament, false);
var title = exports.title = makeQuery(GraphQLType.TitleType, Model.Title, false);
var match = exports.match = makeQuery(GraphQLType.MatchType, Model.Match, false);
var rank = exports.rank = makeQuery(GraphQLType.RankType, Model.Rank, false);
var vote = exports.vote = makeQuery(GraphQLType.VoteType, Model.Vote, false);
var inbox = exports.inbox = makeQuery(GraphQLType.InboxType, Model.Inbox, false);
var speech = exports.speech = makeQuery(GraphQLType.SpeechType, Model.Speech, false);
//# sourceMappingURL=vote.js.map
