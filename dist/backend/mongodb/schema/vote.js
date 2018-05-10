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
  img: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Img" }],
  createdAt: { type: Number, default: new Date().getTime() }
});
// Member Model Data 
var MemberSchema = new _mongoose2.default.Schema({
  username: { type: String },
  password: { type: String },
  level: { type: Number },
  type: { type: Number }, //0: voter, 1: player,2:boss,3:mod,4:admin
  name: { type: String },
  birthDay: { type: Number },
  address: { type: String },
  introduce: { type: String },
  gender: { type: Number }, // 0:female, 1: male, 2: none

  nickName: { type: String },
  avatar: { type: String },
  banner: { type: String },
  phone: { type: String },
  email: { type: String },
  slogan: { type: String },

  point: { type: Number },
  winGame: { type: Number },
  totalGame: { type: Number },
  netClub: [{ type: String }],

  createdAt: { type: Number, default: new Date().getTime() },
  team: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Team" }],
  clan: { type: _mongoose2.default.Schema.ObjectId, ref: "Clan" },
  title: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Title" }],
  img: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Img" }],
  inbox: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Inbox" }]
});
var PlayerSchema = new _mongoose2.default.Schema({
  // thong tin ve player
  username: { type: String },
  info: { type: _mongoose2.default.Schema.Types.Mixed },
  extend: { type: _mongoose2.default.Schema.Types.Mixed },
  nickName: { type: String },
  avatar: { type: String },
  // thong ke ve player
  point: [[{ type: Number }]], //[[chem,chuluc,kinang,chienthuat,conghien],[...]]
  rating: [{ type: Number }], //
  game: [[{ type: Number }]], // [[thang/tongso],[thang gan nhat++]]
  clan: { type: _mongoose2.default.Schema.ObjectId, ref: "Clan" },
  title: [{ type: _mongoose2.default.Schema.Types.Mixed }]
});
// Match Model Data 
var GameSchema = new _mongoose2.default.Schema({
  emprire: [{ type: Number }],
  tp: [[{ type: Number }]],
  win: { type: Number },
  note: [{ type: String }]
}, { _id: false });

var TurnSchema = new _mongoose2.default.Schema({
  game: [GameSchema],
  //thong tin turn
  player: [{ type: String }], // player tham gia
  dgta: [{ type: Number }], //ty le dong gop: tong game point
  pr: [{ type: Number }], // dgta,pt=> diem +/- cua turn
  score: [{ type: Number }]
}, { _id: false });
var MatchSchema = new _mongoose2.default.Schema({
  type: { type: String },
  title: { type: String },
  tournament: { type: _mongoose2.default.Schema.ObjectId, ref: "Tournament" },
  player: [{ type: String }],
  info: { type: _mongoose2.default.Schema.Types.Mixed },
  turn: [TurnSchema],
  scored: [{ type: Number }],
  bo: { type: Number },
  pt: { type: Number }, // he so gia tri cua turn 
  state: { type: Number }, //0: live, 1 KT
  extend: { type: _mongoose2.default.Schema.Types.Mixed },
  time: { type: Number, default: new Date().getTime() }
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
  img: [{ type: _mongoose2.default.Schema.ObjectId, ref: "Img" }],
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

var ImgSchema = new _mongoose2.default.Schema({
  name: { type: String },
  path: { type: String },
  title: { type: String, default: '' },
  type: { type: String, default: '' }, // 1: img will be deleted after a week
  fileType: { type: String },
  createdAt: { type: Number, default: new Date().getTime() }
});

ImgSchema.statics = {
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

var DocSchema = new _mongoose2.default.Schema({
  type: { type: String },
  content: _mongoose2.default.Schema.Types.Mixed
});

exports.TournamentSchema = TournamentSchema;

exports.TitleSchema = TitleSchema;

exports.TeamSchema = TeamSchema;

exports.ClanSchema = ClanSchema;

exports.PlayerSchema = PlayerSchema;

exports.MatchSchema = MatchSchema;

exports.MemberSchema = MemberSchema;

exports.RankSchema = RankSchema;

exports.VoteSchema = VoteSchema;

exports.InboxSchema = InboxSchema;

exports.MsgSchema = MsgSchema;

exports.ImageSchema = ImageSchema;

exports.ImgSchema = ImgSchema;

exports.DocSchema = DocSchema;
//# sourceMappingURL=vote.js.map
