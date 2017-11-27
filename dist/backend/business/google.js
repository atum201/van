'use strict';

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bucket = {
  avatar: {
    name: '19avatar',
    big: 960,
    normal: 320,
    small: 64
  },
  image: {
    name: '19image',
    big: 1280,
    normal: 720,
    small: 320
  }
};

var gcs = (0, _storage2.default)({
  projectId: 'vote-20119',
  keyFilename: 'store/key/google-cloud-19vote.json'
});

var getPublicUrl = function getPublicUrl(bucketName, filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
};

var ImageUploadTool = function ImageUploadTool(file, query) {
  return new Promise(function (resolve, reject) {
    var _query$type = query.type,
        type = _query$type === undefined ? 'image' : _query$type,
        _query$origin = query.origin,
        origin = _query$origin === undefined ? true : _query$origin,
        _query$prefix = query.prefix,
        prefix = _query$prefix === undefined ? type : _query$prefix,
        _query$name = query.name,
        name = _query$name === undefined ? prefix + '-' + new Date().getTime() : _query$name,
        _query$loc = query.loc,
        loc = _query$loc === undefined ? 'google' : _query$loc;
    var _bucket$type = bucket[type],
        big = _bucket$type.big,
        normal = _bucket$type.normal,
        small = _bucket$type.small;

    var b = big,
        n = normal,
        s = small;

    (0, _sharp2.default)(file.buffer).toBuffer({}, function (err, buffer, info) {
      if (err) return next();
      var width = info.width,
          height = info.height;

      var upload = uploadUtil[loc],
          mimetype = file.mimetype,
          path = bucket[type].name;

      if (width > big) {
        // 3 image resize
        Promise.all([(0, _sharp2.default)(buffer).resize(big).toBuffer().then(function (b) {
          return upload(name + '-big', mimetype, b, bucket[type].name);
        }), (0, _sharp2.default)(buffer).resize(normal).toBuffer().then(function (b) {
          return upload(name + '-normal', mimetype, b, bucket[type].name);
        }), (0, _sharp2.default)(buffer).resize(small).toBuffer().then(function (b) {
          return upload(name + '-small', mimetype, b, bucket[type].name);
        })]).then(function (values) {
          return resolve({ big: values[0], normal: values[1], small: values[2], loc: loc, path: path });
        });
      } else if (width > normal) {
        // 3 image 2 resize
        Promise.all([upload(name + '-big', mimetype, buffer, bucket[type].name), (0, _sharp2.default)(buffer).resize(normal).toBuffer().then(function (b) {
          return upload(name + '-normal', mimetype, b, bucket[type].name);
        }), (0, _sharp2.default)(buffer).resize(small).toBuffer().then(function (b) {
          return upload(name + '-small', mimetype, b, bucket[type].name);
        })]).then(function (values) {
          return resolve({ big: values[0], normal: values[1], small: values[2], loc: loc, path: path });
        });
      } else if (width > small) {
        // 2 image 1 resize
        Promise.all([upload(name + '-normal', mimetype, buffer, bucket[type].name), (0, _sharp2.default)(buffer).resize(small).toBuffer().then(function (b) {
          return upload(name + '-small', mimetype, b, bucket[type].name);
        })]).then(function (values) {
          return resolve({ normal: values[0], small: values[1], loc: loc, path: path });
        });
      } else {
        // 1 image
        upload(name + '-small', mimetype, buffer, bucket[type].name).then(function (link) {
          return resolve({ small: link, loc: loc, path: path });
        });
      }
    });
  });
};

var ImgUpload = function ImgUpload(req, res, next) {
  if (!req.file) return next();
  ImageUploadTool(req.file, req.query).then(function (value) {
    req.file = _lodash2.default.assign(req.file, value);
    next();
  });
};

var ImgUploads = function ImgUploads(req, res, next) {
  if (!req.files) return next();
  Promise.all(req.files.map(function (file) {
    return ImageUploadTool(file, req.query);
  })).then(function (values) {
    for (var i = 0; i < req.files.length; i++) {
      if (values[i]) req.files[i] = _lodash2.default.assign(req.files[i], values[i]);
    }next();
  });
};

var delImg = function delImg(name, cloudBucket) {
  var bucket = gcs.bucket(cloudBucket);
  return new Promise(function (resolve, reject) {
    if (Array.isArray(filename)) {
      Promise.all(filename.map(function (f) {
        return bucket.file(f).delete();
      })).then(function (values) {
        return resolve(values);
      });
    } else {
      bucket.file(filename).delete().then(function (value) {
        return resolve(value);
      });
    }
  });
};

var google = function google(name, type, fileBuffer, cloudBucket) {
  var bucket = gcs.bucket(cloudBucket);
  return new Promise(function (resolve, reject) {
    var file = bucket.file(name);
    var stream = file.createWriteStream({
      metadata: {
        contentType: type
      }
    });
    stream.on('error', function (err) {
      console.log("error", err);
      reject(err);
    });
    stream.on('finish', function () {
      return resolve(getPublicUrl(cloudBucket, name));
    });
    stream.end(fileBuffer);
  });
};

var local = function local(name, type, fileBuffer, cloudBucket) {
  var bucket = gcs.bucket(cloudBucket);
  return new Promise(function (resolve, reject) {
    var file = bucket.file(name);
    var stream = file.createWriteStream({
      metadata: {
        contentType: type
      }
    });
    stream.on('error', function (err) {
      console.log("error", err);
      reject(err);
    });
    stream.on('finish', function () {
      return resolve(getPublicUrl(cloudBucket, name));
    });
    stream.end(fileBuffer);
  });
};

var uploadUtil = { google: google, local: local };

exports.ImgUpload = ImgUpload;
exports.ImgUploads = ImgUploads;
exports.delImg = delImg;
//# sourceMappingURL=google.js.map
