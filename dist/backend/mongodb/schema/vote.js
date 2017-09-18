"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Clan Model Data 
var ClanSchema = new _mongoose2.default.Schema({
  name: { type: String },
  owner: { type: _mongoose2.default.Schema.ObjectId, ref: "Member" },
  symbol: { type: String },
  description: { type: String },
  role: [{
    member: { type: _mongoose2.default.Schema.ObjectId, ref: "Member" },
    rule: { type: Number },
    title: { type: String }
  }],
  level: { type: Number },
  member: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  inviteMember: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  applyMember: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  createdAt: { type: Number, default: new Date().getTime() }
});
// Member Model Data 
var MemberSchema = new _mongoose2.default.Schema({
  account: { type: String },
  password: { type: String },
  name: { type: String },
  nickName: { type: String },
  point: { type: Number },
  winGame: { type: Number },
  totalGame: { type: Number },
  avatar: { type: String },
  netClub: [{ type: String }],
  slogan: { type: String },
  birthDay: { type: Number },
  provice: { type: String },
  adress: { type: String },
  introduce: { type: String },
  banner: { type: String },
  phone: [{ type: String }],
  createdAt: { type: Number, default: new Date().getTime() },
  clan: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Clan" }],
  title: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Title" }],
  inbox: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Inbox" }]
});
// Rank Model Data 
var RankSchema = new _mongoose2.default.Schema({
  createdAt: { type: Number, default: new Date().getTime() }
});
// Vote Model Data 
var VoteSchema = new _mongoose2.default.Schema({
  createdAt: { type: Number, default: new Date().getTime() }
});
// Match Model Data 
var TurnSchema = new _mongoose2.default.Schema({
  game: [[{ type: Number }]],
  scored: [{ type: Number }]
}, { _id: false });
var MatchSchema = new _mongoose2.default.Schema({
  type: { type: String },
  tournament: { type: _mongoose2.default.Schema.ObjectId, ref: "Tournament" },
  member: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  index: [{ type: Number }],
  name: { type: String },
  time: { type: Number },
  turn: [TurnSchema],
  scored: [{ type: Number }],
  createdAt: { type: Number, default: new Date().getTime() }
});
//. Tournament Model Data 
var TeamSchema = new _mongoose2.default.Schema({
  name: { type: String },
  member: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }]
});
var TournamentSchema = new _mongoose2.default.Schema({
  name: { type: String },
  logo: { type: String },
  banner: { type: String },
  description: { type: String },
  time: [{ type: Number }],
  team: [TeamSchema],
  config: [{ type: Number }],
  mod: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  title: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Title" }],
  member: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  createdAt: { type: Number, default: new Date().getTime() }
});
var TitleSchema = new _mongoose2.default.Schema({
  name: { type: String },
  description: { type: String },
  time: { type: Number },
  pride: { type: Number },
  tournament: { type: _mongoose2.default.Schema.ObjectId, ref: "Tournament" },
  team: { type: _mongoose2.default.Schema.ObjectId, ref: "Team" },
  member: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  createdAt: { type: Number, default: new Date().getTime() }
});

var InboxLogSchema = new _mongoose2.default.Schema({
  member: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  action: { type: String },
  time: { type: Number, default: new Date().getTime() }
}, { _id: false });

var InboxSchema = new _mongoose2.default.Schema({
  member: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  creater: { type: _mongoose2.default.Schema.ObjectId, ref: "Member" },
  name: { type: String, default: '', trim: true },
  state: { type: Number, default: 0 },
  log: [InboxLogSchema],
  private: { type: Boolean, default: true },
  time: { type: Number, default: new Date().getTime() }
});

var SpeechSchema = new _mongoose2.default.Schema({
  from: { type: _mongoose2.default.Schema.ObjectId, ref: "Member" },
  inbox: { type: _mongoose2.default.Schema.ObjectId, ref: "Inbox" },
  content: { type: String, default: '', trim: true },
  state: { type: Number, default: 0 },
  time: { type: Number, default: new Date().getTime() }
});

exports.TournamentSchema = TournamentSchema;

exports.TitleSchema = TitleSchema;

exports.TeamSchema = TeamSchema;

exports.ClanSchema = ClanSchema;

exports.MatchSchema = MatchSchema;

exports.MemberSchema = MemberSchema;

exports.RankSchema = RankSchema;

exports.VoteSchema = VoteSchema;

exports.InboxSchema = InboxSchema;

exports.SpeechSchema = SpeechSchema;
//# sourceMappingURL=vote.js.map
