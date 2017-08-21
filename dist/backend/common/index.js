'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUser = exports.capnhatphancap = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongodb = require('../mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleMember = function handleMember(members, users) {
  var _loop = function _loop(i) {
    var j = _lodash2.default.findIndex(users, function (u) {
      return u.userId == members[i];
    });
    if (j != -1) members.splice(i, 1, users[j]._id.toString());else members.splice(i, 1, undefined);
  };

  for (var i = 0; i < members.length; i++) {
    _loop(i);
  }
  console.log(members);
  return _lodash2.default.compact(members);
};

var handleDonVi = function handleDonVi(donvi, users) {
  if (donvi.ThanhVien) donvi.ThanhVien = handleMember(donvi.ThanhVien, users);

  if (donvi.DonViCon && donvi.DonViCon.length > 0) {
    for (var i = 0; i < donvi.DonViCon.length; i++) {
      donvi.DonViCon[i] = handleDonVi(donvi.DonViCon[i], users);
    }
  } else {
    donvi.DonViCon = undefined;
  }
  console.log("handleDonVi");
  return donvi;
};
var capnhatphancap = exports.capnhatphancap = function capnhatphancap(phancap) {
  return new _bluebird2.default(function (resolve, reject) {
    _mongodb.User.findAsync({}, '_id userId').then(function (users) {
      resolve(handleDonVi(phancap, users));
    });
  });
};

var checkUser = exports.checkUser = function checkUser(val) {
  return new _bluebird2.default(function (resolve, reject) {
    _mongodb.User.findOneAsync({ userId: val.Id }).then(function (user) {
      if (user) {
        user.nickName = val.HoTen || "";
        if (val.AnhDaiDien) user.avatar = val.AnhDaiDien;
      } else {
        user = new _mongodb.User({
          userId: val.Id,
          nickName: val.HoTen || "",
          avatar: val.AnhDaiDien || null });
      }
      user.saveAsync().then(function (user) {
        return resolve(user);
      });
    });
  });
};
//# sourceMappingURL=index.js.map
