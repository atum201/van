'use strict';

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gcs = (0, _storage2.default)({
  projectId: 'vote-20119',
  keyFilename: '..store/key/google-cloud-19vote.json'
});

var bucketName = '19vote';
var bucket = gcs.bucket(bucketName);

var getPublicUrl = function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
};

var ImgUpload = function ImgUpload(req, res, next) {
  if (!req.file) return next();

  var gcsname = req.file.originalname;
  var file = bucket.file(gcsname);

  var stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });
  stream.on('error', function (err) {
    req.file.cloudStorageError = err;
    console.log("error", err);
    next(err);
  });

  stream.on('finish', function () {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

exports.ImgUpload = ImgUpload;
//# sourceMappingURL=google.js.map
