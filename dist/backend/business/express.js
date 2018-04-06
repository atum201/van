'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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

var _google = require('../common/google');

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

var _util = require('../common/util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.memoryStorage();
var uploadImage = (0, _multer2.default)({ storage: storage });
var uploadImages = (0, _multer2.default)({ storage: storage }).any('images');
var updateImgTemp = (0, _multer2.default)({ dest: _path2.default.join(__dirname, './public/uploads/') });
var uploadFile = (0, _multer2.default)({ dest: _path2.default.join(__dirname, './public/uploads/') }).any('recfiles');
// let uploadFile = multer({ dest: path.join(__dirname,'../public/uploads/')}).any('recfiles')

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

app.post('/upload/img', updateImgTemp.single('image'), function (req, res) {
  var _req$query = req.query,
      _req$query$bucket = _req$query.bucket,
      bucket = _req$query$bucket === undefined ? '19vote' : _req$query$bucket,
      _req$query$name = _req$query.name,
      name = _req$query$name === undefined ? bucket + '-' + new Date().getTime() : _req$query$name,
      _req$query$cloud = _req$query.cloud,
      cloud = _req$query$cloud === undefined ? 'google' : _req$query$cloud;

  var img = new _mongodb.Image({ name: name, fileType: req.file.mimetype, temp: req.file.path, state: "0" });
  img.saveAsync().then(function (img) {
    res.send((0, _util.standardDoc)(img));
    _fs2.default.readFile(req.file.path, function (err, data) {
      (0, _google.pushGoogleCloud)(data, cloud, bucket, img._id || img.id, req.file.mimetype).then(function (link) {
        img.link = link;
        img.state = '1';
        img.saveAsync();
      });
    });
  });
});
var checkRequest = function checkRequest(req, res, next) {
  console.log("Log body request update", req.body);
  next();
};
app.get('/upload/image', uploadImage.single('image'), _google.ImgUpload, function (req, res) {
  var data = req.body;
  if (req.file && req.file.link) {
    var _req$file = req.file,
        link = _req$file.link,
        cloud = _req$file.cloud,
        name = _req$file.name,
        bucket = _req$file.bucket,
        mimetype = _req$file.mimetype;

    var img = new _mongodb.Image({ link: link, cloud: cloud, name: name, bucket: bucket, fileType: mimetype });
    img.saveAsync().then(function (file) {
      res.send((0, _util.standardDoc)(file));
    });
  } else {
    res.send({});
  }
});
app.post('/upload/image', checkRequest, uploadImage.single('image'), _google.ImgUpload, function (req, res) {
  var data = req.body;
  if (req.file && req.file.link) {
    var _req$file2 = req.file,
        link = _req$file2.link,
        cloud = _req$file2.cloud,
        name = _req$file2.name,
        bucket = _req$file2.bucket,
        mimetype = _req$file2.mimetype;

    var img = new _mongodb.Image({ link: link, cloud: cloud, name: name, bucket: bucket, fileType: mimetype });
    img.saveAsync().then(function (file) {
      res.send((0, _util.standardDoc)(file));
    });
  } else {
    res.send({});
  }
});

app.get('/upload/index.html', uploadImage.single('image'), _google.ImgUpload, function (req, res) {
  var data = req.body;
  if (req.file && req.file.link) {
    var _req$file3 = req.file,
        link = _req$file3.link,
        cloud = _req$file3.cloud,
        name = _req$file3.name,
        bucket = _req$file3.bucket,
        mimetype = _req$file3.mimetype;

    var img = new _mongodb.Image({ link: link, cloud: cloud, name: name, bucket: bucket, fileType: mimetype });
    img.saveAsync().then(function (file) {
      res.send((0, _util.standardDoc)(file));
    });
  } else {
    res.send({});
  }
});
app.post('/upload/index.html', uploadImage.single('image'), _google.ImgUpload, function (req, res) {
  var data = req.body;
  if (req.file && req.file.link) {
    var _req$file4 = req.file,
        link = _req$file4.link,
        cloud = _req$file4.cloud,
        name = _req$file4.name,
        bucket = _req$file4.bucket,
        mimetype = _req$file4.mimetype;

    var img = new _mongodb.Image({ link: link, cloud: cloud, name: name, bucket: bucket, fileType: mimetype });
    img.saveAsync().then(function (file) {
      res.send((0, _util.standardDoc)(file));
    });
  } else {
    res.send({});
  }
});

// });

app.post('/upload/images', uploadImages, _google.ImgUploads, function (req, res) {
  var data = req.body;
  if (req.files.length > 0) {
    Promise.all(req.files.map(function (file) {
      var link = file.link,
          cloud = file.cloud,
          name = file.name,
          bucket = file.bucket,
          mimetype = file.mimetype;

      var img = new _mongodb.Image({ link: link, cloud: cloud, name: name, bucket: bucket, fileType: mimetype });
      return img.saveAsync();
    })).then(function (values) {
      res.send(values.map(function (v) {
        return (0, _util.standardDoc)(v);
      }));
    });
  } else {
    res.send([]);
  }
});
app.get('/upload/images', uploadImages, _google.ImgUploads, function (req, res) {
  var data = req.body;
  if (req.files.length > 0) {
    Promise.all(req.files.map(function (file) {
      var link = file.link,
          cloud = file.cloud,
          name = file.name,
          bucket = file.bucket,
          mimetype = file.mimetype;

      var img = new _mongodb.Image({ link: link, cloud: cloud, name: name, bucket: bucket, fileType: mimetype });
      return img.saveAsync();
    })).then(function (values) {
      res.send(values.map(function (v) {
        return (0, _util.standardDoc)(v);
      }));
    });
  } else {
    res.send([]);
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

app.get('/api/upload', uploadFile, function (req, res) {
  var _loop2 = function _loop2(i) {
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
    _loop2(i);
  };
  res.end();
});

app.get('/download/:idfile', function (req, res) {
  _mongodb.File.get(req.params.idfile).then(function (file) {
    res.download(file.path, file.fileName);
  }).error(function (e) {});
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

app.get('/api/capnhatmysql', function (req, res) {
  (0, _mysql2.default)().then(function (result) {
    res.send(result);
  });
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

exports.default = app;

// Use Sharp
// app.get('/upload/image',uploadImage.single('image'),ImgUpload,function (req,res) {
//   const data = req.body;
//   if (req.file && (req.file.big || req.file.normal || req.file.small)) {
//     let {name= req.file.originalname,loc,path,big,normal,small,mimetype} = req.file;
//     let img = new Image({name,big,normal,small,fileType:mimetype,loc,path});
//     img.saveAsync().then(file=>{
//       res.send(standardDoc(file));
//     });
//   }else{
//     res.send({});
//   }

// Use Sharp
// app.get('/upload/images',uploadImages,ImgUploads,function (req,res) {
//   const data = req.body;
//   if(req.files.length > 0){
//     Promise.all(req.files.map(file=>{
//       let {name=file.originalname,loc='google',path,big,normal,small,mimetype} = file;
//       let img = new Image({name,big,normal,small,fileType:mimetype,loc,path});
//       return img.saveAsync();
//     })).then(values=>{
//       res.send(values.map(v=>standardDoc(v)));
//     })
//   }else{
//     res.send([]);
//   }
// });

module.exports = exports['default'];
//# sourceMappingURL=express.js.map
