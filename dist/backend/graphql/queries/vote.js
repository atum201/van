'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doc = exports.image = exports.msg = exports.inbox = exports.vote = exports.rank = exports.match = exports.title = exports.tournament = exports.clan = exports.member = exports.docId = exports.imageId = exports.msgId = exports.inboxId = exports.voteId = exports.rankId = exports.matchId = exports.titleId = exports.tournamentId = exports.clanId = exports.memberId = exports.docs = exports.images = exports.msgs = exports.inboxs = exports.votes = exports.ranks = exports.matchs = exports.titles = exports.tournaments = exports.clans = exports.members = exports.emprires = exports.signin = undefined;

var _graphql = require('graphql');

var _mongodb = require('mongodb');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _vote = require('../types/vote');

var GraphQLType = _interopRequireWildcard(_vote);

var _mongodb2 = require('../../mongodb');

var Model = _interopRequireWildcard(_mongodb2);

var _util = require('../../common/util');

var _constant = require('../../common/constant');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FindType = GraphQLType.FindType,
    PageType = GraphQLType.PageType,
    ResponseType = GraphQLType.ResponseType;


var makeQuery = function makeQuery(graphQLType, model, multi, id) {
  if (multi) {
    return {
      type: PageType(graphQLType),
      args: {
        q: FindType
      },
      resolve: function resolve(_, _ref) {
        var q = _ref.q;
        var find = q.find,
            sort = q.sort,
            page = q.page,
            size = q.size;

        var skip = page * size;
        return model.where(find || {}).countAsync().then(function (sum) {
          return model.findAsync(find || {}, null, { limit: size, skip: skip, sort: sort }).then(function (docs) {
            return { sum: sum, page: page, size: size, item: docs.map(function (doc) {
                return (0, _util.standardDoc)(doc);
              }) };
          }).error(function (e) {});
        });
      }
    };
  } else if (id) {
    return {
      type: graphQLType,
      args: {
        q: {
          type: _graphql.GraphQLString
        }
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

var signin = exports.signin = {
  type: ResponseType,
  args: {
    username: {
      type: _graphql.GraphQLString
    },
    password: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(root, _ref4) {
    var username = _ref4.username,
        password = _ref4.password;
    var Member = Model.Member;

    return Member.findOneAsync({ $and: [{ username: username }, { password: password }] }).then(function (doc) {
      if (doc) {
        return { state: _constant.STATE_SUCCESS };
      } else {
        return { state: _constant.STATE_NOT_FOUND };
      }
    });
  }
};

var emprires = exports.emprires = {
  type: new _graphql.GraphQLList(GraphQLType.EmprireType),
  args: {
    t: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(root, _ref5) {
    var t = _ref5.t;

    var emps = _constant.voteConst.empriresShort;
    var emp = _constant.voteConst.emprires.map(function (emprire, id) {
      return { id: id, emprire: emprire, short: emps[id] };
    });
    if (t) return _lodash2.default.filter(emp, function (e) {
      return e.emprire.indexOf(t) + 1;
    });
    return emp;
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
var msgs = exports.msgs = makeQuery(GraphQLType.MsgType, Model.Msg, true);
var images = exports.images = makeQuery(GraphQLType.ImageType, Model.Image, true);
var docs = exports.docs = makeQuery(GraphQLType.DocType, Model.Doc, true);

var memberId = exports.memberId = makeQuery(GraphQLType.MemberType, Model.Member, false, true);
var clanId = exports.clanId = makeQuery(GraphQLType.ClanType, Model.Clan, false, true);
var tournamentId = exports.tournamentId = makeQuery(GraphQLType.TournamentType, Model.Tournament, false, true);
var titleId = exports.titleId = makeQuery(GraphQLType.TitleType, Model.Title, false, true);
var matchId = exports.matchId = makeQuery(GraphQLType.MatchType, Model.Match, false, true);
var rankId = exports.rankId = makeQuery(GraphQLType.RankType, Model.Rank, false, true);
var voteId = exports.voteId = makeQuery(GraphQLType.VoteType, Model.Vote, false, true);
var inboxId = exports.inboxId = makeQuery(GraphQLType.InboxType, Model.Inbox, false, true);
var msgId = exports.msgId = makeQuery(GraphQLType.MsgType, Model.Msg, false, true);
var imageId = exports.imageId = makeQuery(GraphQLType.ImageType, Model.Image, false, true);
var docId = exports.docId = makeQuery(GraphQLType.DocType, Model.Doc, false, true);

var member = exports.member = makeQuery(GraphQLType.MemberType, Model.Member, false);
var clan = exports.clan = makeQuery(GraphQLType.ClanType, Model.Clan, false);
var tournament = exports.tournament = makeQuery(GraphQLType.TournamentType, Model.Tournament, false);
var title = exports.title = makeQuery(GraphQLType.TitleType, Model.Title, false);
var match = exports.match = makeQuery(GraphQLType.MatchType, Model.Match, false);
var rank = exports.rank = makeQuery(GraphQLType.RankType, Model.Rank, false);
var vote = exports.vote = makeQuery(GraphQLType.VoteType, Model.Vote, false);
var inbox = exports.inbox = makeQuery(GraphQLType.InboxType, Model.Inbox, false);
var msg = exports.msg = makeQuery(GraphQLType.MsgType, Model.Msg, false);
var image = exports.image = makeQuery(GraphQLType.ImageType, Model.Image, false);
var doc = exports.doc = makeQuery(GraphQLType.DocType, Model.Doc, false);
//# sourceMappingURL=vote.js.map
