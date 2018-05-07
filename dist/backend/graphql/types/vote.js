'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponseType = exports.DocType = exports.ResponseVoteType = exports.CommonVoteType = exports.ImgType = exports.ImageType = exports.TitleType = exports.TournamentType = exports.TeamType = exports.MatchType = exports.PlayerType = exports.VoteType = exports.RankType = exports.ClanType = exports.MsgType = exports.InboxType = exports.MemberType = exports.EmprireType = exports.PageType = exports.SubmitType = exports.FindType = exports.InputVoteType = undefined;

var _graphql = require('graphql');

var MillisecondsType = new _graphql.GraphQLScalarType({
  name: 'MillisecondsType',
  serialize: function serialize(value) {
    return value;
  },
  parseValue: function parseValue(value) {
    return value;
  },
  parseLiteral: function parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError("Query error: Can only parse object but got a: " + ast.kind, [ast]);
    }
    return ast.value;
  }
});

var ScaleType = new _graphql.GraphQLScalarType({
  name: 'ScaleType',
  serialize: function serialize(value) {
    return value;
  },
  parseValue: function parseValue(value) {
    return value;
  },
  parseLiteral: function parseLiteral(ast) {
    if (ast.kind !== Kind.OBJECT) {
      throw new GraphQLError("Query error: Can only parse object but got a: " + ast.kind, [ast]);
    }
    return ast.value;
  }
});

// Input Type
var InputVoteType = exports.InputVoteType = {
  type: new _graphql.GraphQLInputObjectType({
    name: "InputVote",
    fields: {
      payload: { type: _graphql.GraphQLString },
      action: { type: _graphql.GraphQLString }
    }
  }) };

var FindType = exports.FindType = {
  type: new _graphql.GraphQLInputObjectType({
    name: "Find",
    fields: {
      find: { type: ScaleType },
      sort: { type: ScaleType },
      page: { type: _graphql.GraphQLInt },
      size: { type: _graphql.GraphQLInt }
    }
  }) };

var SubmitType = exports.SubmitType = {
  type: new _graphql.GraphQLInputObjectType({
    name: "Submit",
    fields: {
      payload: { type: ScaleType },
      action: { type: _graphql.GraphQLString }
    }
  }) };

// Output Type

var PageType = exports.PageType = function PageType(type) {
  return new _graphql.GraphQLObjectType({
    name: type.name + 'Page',
    fields: {
      sum: { type: _graphql.GraphQLInt },
      page: { type: _graphql.GraphQLInt },
      size: { type: _graphql.GraphQLInt },
      item: { type: new _graphql.GraphQLList(type) }
    }
  });
};

var EmprireType = exports.EmprireType = new _graphql.GraphQLObjectType({
  name: 'Emprire',
  fields: {
    id: { type: _graphql.GraphQLInt },
    emprire: { type: _graphql.GraphQLString },
    short: { type: _graphql.GraphQLString }
  }
});
var MemberType = exports.MemberType = new _graphql.GraphQLObjectType({
  name: 'Member',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    username: { type: _graphql.GraphQLString },
    password: { type: _graphql.GraphQLString },
    level: { type: _graphql.GraphQLInt },
    type: { type: _graphql.GraphQLInt },
    name: { type: _graphql.GraphQLString },
    birthDay: { type: _graphql.GraphQLString },
    address: { type: _graphql.GraphQLString },
    introduce: { type: _graphql.GraphQLString },
    nickName: { type: _graphql.GraphQLString },
    avatar: { type: _graphql.GraphQLString },
    banner: { type: _graphql.GraphQLString },
    phone: { type: _graphql.GraphQLString },
    email: { type: _graphql.GraphQLString },
    slogan: { type: _graphql.GraphQLString },
    point: { type: _graphql.GraphQLInt },
    winGame: { type: _graphql.GraphQLInt },
    totalGame: { type: _graphql.GraphQLInt },
    netClub: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    team: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    clan: { type: _graphql.GraphQLString },
    title: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    inbox: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    createdAt: { type: MillisecondsType }
  }
});

var InboxLogType = new _graphql.GraphQLObjectType({
  name: 'InboxLog',
  fields: {
    member: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    action: { type: _graphql.GraphQLString },
    time: { type: MillisecondsType }
  }
});

var InboxType = exports.InboxType = new _graphql.GraphQLObjectType({
  name: 'Inbox',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    member: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    creater: { type: _graphql.GraphQLString },
    label: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    name: { type: _graphql.GraphQLString },
    state: { type: _graphql.GraphQLInt },
    log: { type: new _graphql.GraphQLList(InboxLogType) },
    time: { type: MillisecondsType }
  }
});

var MsgType = exports.MsgType = new _graphql.GraphQLObjectType({
  name: 'Msg',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    from: { type: _graphql.GraphQLString },
    inbox: { type: _graphql.GraphQLString },
    content: { type: _graphql.GraphQLString },
    state: { type: _graphql.GraphQLInt },
    vote: { type: _graphql.GraphQLInt },
    blame: { type: _graphql.GraphQLInt },
    time: { type: MillisecondsType }
  }
});

var ClanRoleType = new _graphql.GraphQLObjectType({
  name: 'ClanRole',
  fields: {
    member: { type: _graphql.GraphQLString },
    rule: { type: _graphql.GraphQLInt },
    title: { type: _graphql.GraphQLString }
  }
}, { _id: false });

var ClanType = exports.ClanType = new _graphql.GraphQLObjectType({
  name: 'Clan',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    name: { type: _graphql.GraphQLString },
    owner: { type: _graphql.GraphQLString },
    avatar: { type: _graphql.GraphQLString },
    description: { type: _graphql.GraphQLString },
    role: { type: ClanRoleType },
    level: { type: _graphql.GraphQLInt },
    strength: { type: _graphql.GraphQLInt },
    member: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    inviteMember: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    applyMember: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    createdAt: { type: MillisecondsType }
  }
});

var RankType = exports.RankType = new _graphql.GraphQLObjectType({
  name: 'Rank',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    createdAt: { type: MillisecondsType }
  }
});

var VoteType = exports.VoteType = new _graphql.GraphQLObjectType({
  name: 'Vote',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    tournamentId: { type: _graphql.GraphQLString },
    members: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    index: { type: _graphql.GraphQLInt },
    name: { type: _graphql.GraphQLString },
    time: { type: MillisecondsType }
  }
});

var PlayerType = exports.PlayerType = new _graphql.GraphQLObjectType({
  name: 'Player',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    username: { type: _graphql.GraphQLString },
    info: { type: ScaleType },
    extend: { type: ScaleType },
    nickName: { type: _graphql.GraphQLString },
    avatar: { type: _graphql.GraphQLString },
    // thong ke ve player
    point: { type: new _graphql.GraphQLList(new _graphql.GraphQLList(_graphql.GraphQLInt)) }, //[[chem,chuluc,kinang,chienthuat,conghien],[...]]
    rating: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) }, //
    game: { type: new _graphql.GraphQLList(new _graphql.GraphQLList(_graphql.GraphQLInt)) }, // [[thang/tongso],[thang gan nhat++]]
    clan: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    title: { type: new _graphql.GraphQLList(ScaleType) }
  }
});

var GameType = new _graphql.GraphQLObjectType({
  name: 'Game',
  fields: {
    emprire: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) },
    tp: { type: new _graphql.GraphQLList(new _graphql.GraphQLList(_graphql.GraphQLInt)) },
    win: { type: _graphql.GraphQLInt },
    note: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
  }
});

var TurnType = new _graphql.GraphQLObjectType({
  name: 'Turn',
  fields: {
    game: { type: new _graphql.GraphQLList(GameType) },
    player: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    bo: { type: _graphql.GraphQLInt },
    pt: { type: _graphql.GraphQLInt },
    dgta: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) },
    pr: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) },
    scored: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) }
  }
});

var MatchType = exports.MatchType = new _graphql.GraphQLObjectType({
  name: 'Match',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    title: { type: _graphql.GraphQLString },
    type: { type: _graphql.GraphQLString },
    tournament: { type: _graphql.GraphQLString },
    player: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    info: { type: ScaleType },
    turn: { type: new _graphql.GraphQLList(TurnType) },
    scored: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) },
    state: { type: _graphql.GraphQLInt },
    time: { type: MillisecondsType }
  }
});

var TeamType = exports.TeamType = new _graphql.GraphQLObjectType({
  name: 'Team',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    name: { type: _graphql.GraphQLString },
    member: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    register: { type: _graphql.GraphQLString },
    clan: { type: _graphql.GraphQLString },
    match: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    phone: { type: _graphql.GraphQLString },
    createdAt: { type: MillisecondsType }
  }
});

var TournamentType = exports.TournamentType = new _graphql.GraphQLObjectType({
  name: 'Tournament',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    name: { type: _graphql.GraphQLString },
    logo: { type: _graphql.GraphQLString },
    banner: { type: _graphql.GraphQLString },
    description: { type: _graphql.GraphQLString },
    team: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    config: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) },
    mod: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    title: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    member: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    createdAt: { type: MillisecondsType }
  }
});

var TitleType = exports.TitleType = new _graphql.GraphQLObjectType({
  name: 'Title',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    name: { type: _graphql.GraphQLString },
    description: { type: _graphql.GraphQLString },
    time: { type: _graphql.GraphQLInt },
    point: { type: _graphql.GraphQLInt },
    pride: { type: _graphql.GraphQLInt },
    tournament: { type: _graphql.GraphQLString },
    team: { type: _graphql.GraphQLString },
    member: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    createdAt: { type: MillisecondsType }
  }
});

var ImageType = exports.ImageType = new _graphql.GraphQLObjectType({
  name: 'Image',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    name: { type: _graphql.GraphQLString },
    caption: { type: _graphql.GraphQLString },
    // bucket:{type:StringType},
    // cloud:{type:StringType},
    // blob_key:{type:String},
    title: { type: _graphql.GraphQLString },
    category: { type: _graphql.GraphQLString },
    temp: { type: _graphql.GraphQLString },
    state: { type: _graphql.GraphQLString },
    link: { type: _graphql.GraphQLString },
    fileType: { type: _graphql.GraphQLInt },
    createdAt: { type: MillisecondsType }
  }
});

var ImgType = exports.ImgType = new _graphql.GraphQLObjectType({
  name: 'Img',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    name: { type: _graphql.GraphQLString },
    title: { type: _graphql.GraphQLString },
    type: { type: _graphql.GraphQLString },
    path: { type: _graphql.GraphQLString },
    fileType: { type: _graphql.GraphQLInt },
    createdAt: { type: MillisecondsType }
  }
});

var resolveVoteType = function resolveVoteType(data) {
  if (data.account && data.password) return MemberType;
  if (data.title) return TitleType;
  if (data.clan) return ClanType;
  if (data.team) return TeamType;
  if (data.tournament) return TournamentType;
  if (data.match) return MatchType;
};

var CommonVoteType = exports.CommonVoteType = new _graphql.GraphQLUnionType({
  name: 'CommonVote',
  types: [MemberType, ClanType, RankType, VoteType, MatchType, TeamType, TournamentType, TitleType],
  resolveType: resolveVoteType
});

var ResponseVoteType = exports.ResponseVoteType = new _graphql.GraphQLObjectType({
  name: 'ResponseVote',
  fields: {
    action: { type: _graphql.GraphQLString },
    state: { type: _graphql.GraphQLString },
    payload: { type: CommonVoteType }
  }
});

var DocType = exports.DocType = new _graphql.GraphQLObjectType({
  name: 'Doc',
  fields: {
    type: { type: _graphql.GraphQLString },
    content: { type: ScaleType }
  }
});

var ResponseType = exports.ResponseType = new _graphql.GraphQLObjectType({
  name: 'Response',
  fields: {
    state: { type: _graphql.GraphQLInt },
    message: { type: _graphql.GraphQLString }
  }
});
//# sourceMappingURL=vote.js.map
