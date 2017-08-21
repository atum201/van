'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _google = require('./google');

var _mongodb = require('../mongodb');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _graphql = require('../graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _index = require('./env/index');

var _cors3 = require('./cors');

var corsOption = _interopRequireWildcard(_cors3);

var _mysql = require('../sql/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _common = require('../common');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.memoryStorage();
var uploadImage = (0, _multer2.default)({ storage: storage });
var uploadFile = (0, _multer2.default)({ dest: _path2.default.join(__dirname, '../public/uploads/') }).any('recfiles');

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)());
app.use((0, _helmet2.default)());

app.use('/graphql',
// cors(corsOptions),
(0, _expressGraphql2.default)(function (req) {
  return {
    schema: _graphql2.default,
    graphiql: true,
    rootValue: { request: req }
  };
}));

app.get('/', function (req, res) {
  res.sendfile('dist/public/index.html');
});

app.use(_express2.default.static('dist/public'));

app.post('/upload/avatar', uploadImage.single('avatar'), _google.ImgUpload, function (req, res) {
  var data = req.body;
  if (req.file && req.file.cloudStoragePublicUrl) {
    var file = new _mongodb.File({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      path: req.file.cloudStoragePublicUrl,
      creater: ObjectID(req.body.from)
    });
    file.saveAsync().then(function (file) {
      res.send(file);
    });
  } else {
    res.send({});
  }
});

app.post('/api/upload', uploadFile, function (req, res) {
  var _loop = function _loop(i) {
    var file = new _mongodb.File({
      fileName: req.files[i].originalname,
      fileType: req.files[i].mimetype,
      path: req.files[i].path,
      creater: ObjectID(req.body.from)
    });
    file.saveAsync().then(function (file) {
      var message = new Message({
        from: req.body ? ObjectID(req.body.from) : undefined,
        toGroup: req.body.toGroup ? ObjectID(req.body.toGroup) : undefined,
        toUser: req.body.toUser ? ObjectID(req.body.toUser) : undefined,
        content: "<a href=\"/download/" + file.id + "\" class=\"fileattach\"><i class=\"fa " + getFileTypeFA(file.fileType) + " fa-3x\"></i>" + file.fileName + "</a>",
        state: 0,
        time: new Date().getTime()
      });
      message.saveAsync().then(function (message) {
        var type = "user";
        if (message.toUser) {
          socker.forEach(function (sk) {
            if (sk.userId == message.toUser || sk.userId == message.from) {
              sk.emit(SOCKET_GET_MESSAGE, message, req.body.temp[i]);
            }
          });
          User.findOneAsync({ _id: ObjectID(message.toUser) }).then(function (user) {
            user.recent = updateRecent(user.recent, message.from.toString());
            user.saveAsync();
          });
        }
        if (message.toGroup) {
          // gui tin nhan den cac thanh vien trong group dang online.
          type = "group";
          Group.findOneAsync({ _id: ObjectID(message.toGroup) }).then(function (group) {
            socker.forEach(function (sk) {
              if (group.member.indexOf(sk.userId) != -1) {
                sk.emit(SOCKET_GET_MESSAGE, message, req.body.temp[i]);
              }
            });
            var idsIn = _.flatMap(group.member, function (m) {
              return ObjectID(m);
            });
            User.findAsync({ _id: { $in: idsIn } }).then(function (users) {
              users.forEach(function (user) {
                user.recent = updateRecent(user.recent, message.toGroup.toString(), "group");
                user.saveAsync();
              });
            });
          });
        }
        User.findOneAsync({ _id: ObjectID(message.from) }).then(function (user) {
          if (!user.recent) {
            user.recent = [];
          }
          var rid = message.toGroup || message.toUser;
          var ii = _.findIndex(user.recent, { id: rid });
          if (ii == -1) user.recent.push({ id: rid, last: new Date().getTime(), type: type });
          user.saveAsync();
        });
      });
    });
  };

  for (var i = 0; i < req.files.length; i++) {
    _loop(i);
  };
  res.end();
});

app.get('/download/:idfile', function (req, res) {
  _mongodb.File.get(req.params.idfile).then(function (file) {
    res.download(file.path, file.fileName);
  }).error(function (e) {});
});

app.post('/api/dsnguoidung', function (req, res) {
  if (req.body) {
    var listuser = req.body; // [user]
    Promise.each(listuser, function (val) {
      return (0, _common.checkUser)(val).then(function (user) {});
    }).then(function (originalArray) {
      return res.send(1);
    }).catch(function (e) {
      return res.send(0);
    });
  }
});
app.post('/api/capnhatnguoidung', function (req, res) {
  //{Id:"",update:{}}
  if (req.body) {
    User.findOneAsync({ userId: req.body.Id }).then(function (user) {
      if (user) {
        user.userId = req.body.update.Id || user.userId;
        user.avatar = req.body.update.AnhDaiDien || user.avatar;
        user.nickName = req.body.update.HoTen || user.nickName;
        user.saveAsync().then(function (u) {
          return res.send("Đã cập nhật người dùng Id:" + req.body.Id);
        });
      } else {
        res.send("Người dùng " + req.body.Id + "không tồn tại.");
      }
    });
  }
});

app.post('/api/capnhatphancap', function (req, res) {
  if (req.body) {
    (0, _common.capnhatphancap)(req.body).then(function (phancap) {
      var phanCap = new PhanCap({
        phanCap: phancap
      });
      phanCap.saveAsync().then(function (pc) {
        console.log(pc._id.toString());
        res.send("Nguoi dung da duoc cap nhat tai ban ghi " + pc._id.toString());
      });
    });
  }
});

app.post('/api/capnhatmysql', function (req, res) {
  (0, _mysql2.default)().then(function (result) {
    res.send(result);
  });
});

exports.default = app;
module.exports = exports['default'];
//# sourceMappingURL=express.js.map
