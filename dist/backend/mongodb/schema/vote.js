"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Clan Model Data 
var ClanSchema = new _mongoose2.default.Schema({
  name: { type: String },
  owner: { type: _mongoose2.default.Schema.ObjectId, ref: "Member" },
  avatar: { type: String },
  description: { type: String },
  member: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  role: [{
    member: { type: _mongoose2.default.Schema.ObjectId, ref: "Member" },
    rule: { type: Number },
    title: { type: String }
  }],
  level: { type: Number },
  strength: { type: Number },
  inviteMember: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  applyMember: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  createdAt: { type: Number, default: new Date().getTime() }
});
// Member Model Data 
var MemberSchema = new _mongoose2.default.Schema({
  account: { type: String },
  password: { type: String },
  level: { type: Number },
  type: { type: Number }, //0: voter, 1: player,2:boss,3:mod,4:admin
  name: { type: String },
  birthDay: { type: Number },
  address: { type: String },
  introduce: { type: String },

  nickName: { type: String },
  avatar: { type: String },
  banner: { type: String },
  phone: { type: String },
  slogan: { type: String },

  point: { type: Number },
  winGame: { type: Number },
  totalGame: { type: Number },
  netClub: [{ type: String }],

  createdAt: { type: Number, default: new Date().getTime() },
  team: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Team" }],
  clan: { type: _mongoose2.default.Schema.ObjectId, ref: "Clan" },
  title: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Title" }],
  inbox: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Inbox" }]
});
// Match Model Data 
var GameSchema = new _mongoose2.default.Schema({
  emprire: [{ type: Number }],
  vote: [{ type: Number }],
  blame: [{ type: Number }],
  win: { type: Number },
  video: { type: String },
  time: { type: Number, default: new Date().getTime() }
}, { _id: false });
var TurnSchema = new _mongoose2.default.Schema({
  game: [GameSchema],
  player: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  bo: { type: Number },
  scored: [{ type: Number }],
  cash: [{ type: Number }],
  point: [{ type: Number }],
  createdAt: { type: Number, default: new Date().getTime() }
}, { _id: false });
var MatchSchema = new _mongoose2.default.Schema({
  type: { type: String },
  name: { type: String },
  tournament: { type: _mongoose2.default.Schema.ObjectId, ref: "Tournament" },
  team: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Team" }],
  player: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  index: [{ type: Number }],
  turn: [TurnSchema],
  scored: [{ type: Number }],
  createdAt: { type: Number, default: new Date().getTime() }
});
// Rank Model Data 
var RankSchema = new _mongoose2.default.Schema({
  createdAt: { type: Number, default: new Date().getTime() }
});
// Vote Model Data 
var VoteSchema = new _mongoose2.default.Schema({
  createdAt: { type: Number, default: new Date().getTime() }
});
//. Tournament Model Data 
var TeamSchema = new _mongoose2.default.Schema({
  name: { type: String },
  member: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Member" }],
  register: { type: _mongoose2.default.Schema.ObjectId, ref: "Member" },
  clan: { type: _mongoose2.default.Schema.ObjectId, ref: "Clan" },
  match: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Match" }],
  phone: { type: String },
  createdAt: { type: Number, default: new Date().getTime() }
});
var TournamentSchema = new _mongoose2.default.Schema({
  name: { type: String },
  logo: { type: String },
  banner: { type: String },
  description: { type: String },
  team: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Team" }],
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
  point: { type: Number },
  pride: { type: Number },
  tournament: { type: _mongoose2.default.Schema.ObjectId, ref: "Tournament" },
  clan: { type: _mongoose2.default.Schema.ObjectId, ref: "Clan" },
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
  label: [{ type: String, default: '', trim: true }],
  name: { type: String, default: '', trim: true },
  state: { type: Number, default: 0 },
  log: [InboxLogSchema],
  time: { type: Number, default: new Date().getTime() }
});

var MsgSchema = new _mongoose2.default.Schema({
  from: { type: _mongoose2.default.Schema.ObjectId, ref: "Member" },
  inbox: { type: _mongoose2.default.Schema.ObjectId, ref: "Inbox" },
  content: { type: String, default: '', trim: true },
  state: { type: Number, default: 0 },
  vote: { type: Number },
  blame: { type: Number },
  time: { type: Number, default: new Date().getTime() }
});

/**
 * FileVote Schema
 */
var ImageSchema = new _mongoose2.default.Schema({
  bucket: { type: String },
  name: { type: String },
  link: { type: String },
  title: { type: String, default: '' },
  caption: { type: String, default: '' },
  cloud: { type: String, default: 'google', trim: true },
  blob_key: { type: String },
  category: { type: String },
  temp: { type: String },
  state: { type: String },
  fileType: { type: String },
  createdAt: { type: Number, default: new Date().getTime() }
});

ImageSchema.statics = {
  get: function get(id) {
    return this.findById(id).execAsync().then(function (img) {
      if (img) {
        return img;
      }
      return Promise.reject(err);
    });
  },
  list: function list() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var criteria = options.query || {};
    return this.find(criteria).sort({ createdAt: -1 }).execAsync();
  }
};

exports.TournamentSchema = TournamentSchema;

exports.TitleSchema = TitleSchema;

exports.TeamSchema = TeamSchema;

exports.ClanSchema = ClanSchema;

exports.MatchSchema = MatchSchema;

exports.MemberSchema = MemberSchema;

exports.RankSchema = RankSchema;

exports.VoteSchema = VoteSchema;

exports.InboxSchema = InboxSchema;

exports.MsgSchema = MsgSchema;

exports.ImageSchema = ImageSchema;
//# sourceMappingURL=vote.js.map
