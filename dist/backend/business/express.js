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

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _mongodb = require('mongodb');

var _google = require('../common/google');

var _util = require('../common/util');

var _mongodb2 = require('../mongodb');

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
var uploadImages = (0, _multer2.default)({ storage: storage }).any('images');
var uploadFile = (0, _multer2.default)({ dest: _path2.default.join(__dirname, '../../public/uploads/') }).any('recfiles');

var ImageSharpTool = function ImageSharpTool(file, query) {
  return new Promise(function (resolve, reject) {
    var _query$c = query.c,
        c = _query$c === undefined ? 1 : _query$c,
        _query$w = query.w,
        w = _query$w === undefined ? 350 : _query$w,
        _query$q = query.q,
        q = _query$q === undefined ? 50 : _query$q,
        _query$n = query.n,
        n = _query$n === undefined ? (0, _util.randomString)(8) + '-' + new Date().getTime() : _query$n,
        t = query.t;


    (0, _sharp2.default)(file.buffer).toBuffer({}, function (err, buffer, info) {
      if (err) reject(err);
      var width = info.width,
          height = info.height;

      w = w > width ? width : w;
      var quality = q;
      (0, _sharp2.default)(buffer).resize(w).jpeg({ quality: quality }).webp({ quality: quality }).png({ quality: quality }).toFile(_path2.default.join(__dirname, '../../public/img/' + c + '/' + n + '.png'), function (err, info) {
        var img = new _mongodb2.Img({
          path: '/img/' + c + '/' + n + '.png',
          title: t,
          name: n,
          type: c
        });
        img.saveAsync().then(function (img) {
          return resolve(img);
        });
      });
    });
  });
};

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

// upload image to google cloud
app.post('/upload/image', uploadImage.single('image'), _google.ImgUpload, function (req, res) {
  var data = req.body;
  if (req.file && req.file.link) {
    var _req$file = req.file,
        link = _req$file.link,
        cloud = _req$file.cloud,
        name = _req$file.name,
        bucket = _req$file.bucket,
        mimetype = _req$file.mimetype;

    var img = new _mongodb2.Image({ link: link, cloud: cloud, name: name, bucket: bucket, fileType: mimetype });
    img.saveAsync().then(function (file) {
      res.send((0, _util.standardDoc)(file));
    });
  } else {
    res.send({});
  }
});

app.post('/upload/images', uploadImages, _google.ImgUploads, function (req, res) {
  var data = req.body;
  if (req.files.length > 0) {
    Promise.all(req.files.map(function (file) {
      var link = file.link,
          cloud = file.cloud,
          name = file.name,
          bucket = file.bucket,
          mimetype = file.mimetype;

      var img = new _mongodb2.Image({ link: link, cloud: cloud, name: name, bucket: bucket, fileType: mimetype });
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
// upload image to server local
app.post('/api/images', uploadImages, function (req, res) {
  if (!req.files) return next();
  Promise.all(req.files.map(function (file) {
    return ImageSharpTool(file, req.query);
  })).then(function (values) {
    res.send(values);
  });
});
// upload file to server local, chat cu
app.post('/api/upload', uploadFile, function (req, res) {
  var _loop = function _loop(i) {
    var file = new _mongodb2.File({
      fileName: req.files[i].originalname,
      fileType: req.files[i].mimetype,
      path: req.files[i].path,
      creater: (0, _mongodb.ObjectID)(req.body.from)
    });
    file.saveAsync().then(function (file) {
      var message = new Message({
        from: req.body ? (0, _mongodb.ObjectID)(req.body.from) : undefined,
        toGroup: req.body.toGroup ? (0, _mongodb.ObjectID)(req.body.toGroup) : undefined,
        toUser: req.body.toUser ? (0, _mongodb.ObjectID)(req.body.toUser) : undefined,
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
          User.findOneAsync({ _id: (0, _mongodb.ObjectID)(message.toUser) }).then(function (user) {
            user.recent = updateRecent(user.recent, message.from.toString());
            user.saveAsync();
          });
        }
        if (message.toGroup) {
          // gui tin nhan den cac thanh vien trong group dang online.
          type = "group";
          Group.findOneAsync({ _id: (0, _mongodb.ObjectID)(message.toGroup) }).then(function (group) {
            socker.forEach(function (sk) {
              if (group.member.indexOf(sk.userId) != -1) {
                sk.emit(SOCKET_GET_MESSAGE, message, req.body.temp[i]);
              }
            });
            var idsIn = _.flatMap(group.member, function (m) {
              return (0, _mongodb.ObjectID)(m);
            });
            User.findAsync({ _id: { $in: idsIn } }).then(function (users) {
              users.forEach(function (user) {
                user.recent = updateRecent(user.recent, message.toGroup.toString(), "group");
                user.saveAsync();
              });
            });
          });
        }
        User.findOneAsync({ _id: (0, _mongodb.ObjectID)(message.from) }).then(function (user) {
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
  _mongodb2.File.get(req.params.idfile).then(function (file) {
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
