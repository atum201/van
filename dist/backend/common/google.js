'use strict';

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongodb = require('../mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gcs = (0, _storage2.default)({
  projectId: 'vote-20119',
  keyFilename: '../store/key/google-cloud-19vote.json'
});

var appEngine = "https://vote-20119.appspot.com/";

var pushGoogleCloud = function pushGoogleCloud(buffer, cloud, bucket, name, fileType) {
  return new Promise(function (resolve, reject) {
    var upload = uploadUtil[cloud];
    upload(name, fileType, buffer, bucket).then(function () {
      _https2.default.get(appEngine + '?b=' + bucket + '&n=' + name, function (resp) {
        var data = '';
        resp.on('data', function (chunk) {
          data += chunk;
        });
        resp.on('end', function () {
          console.log(data);
          resolve(JSON.parse(data).link);
        });
      }).on("error", function (err) {
        console.log("Error: " + err.message);
      });
    });
  });
};

var delImageGoogleCloud = function delImageGoogleCloud(imageId) {
  _mongodb.Image.get(imageId).then(function (img) {
    //delete in storage
    delImg(img.name, img.bucket).then(function () {
      _https2.default.get(appEngine + 'del?blob_key=' + img.blob_key, function () {}).on("error", function (err) {
        console.log("Error: " + err.message);
      });
    });
  });
};

var ImageUploadTool = function ImageUploadTool(file, query) {
  return new Promise(function (resolve, reject) {
    var _query$bucket = query.bucket,
        bucket = _query$bucket === undefined ? '19vote' : _query$bucket,
        _query$name = query.name,
        name = _query$name === undefined ? bucket + '-' + new Date().getTime() : _query$name,
        _query$cloud = query.cloud,
        cloud = _query$cloud === undefined ? 'google' : _query$cloud;

    var upload = uploadUtil[cloud],
        mimetype = file.mimetype;
    upload(name, mimetype, file.buffer, bucket).then(function () {
      _https2.default.get(appEngine + '?b=' + bucket + '&n=' + name, function (resp) {
        var data = '';
        resp.on('data', function (chunk) {
          data += chunk;
        });
        resp.on('end', function () {
          resolve({ link: JSON.parse(data).link, cloud: cloud, name: name, bucket: bucket });
        });
      }).on("error", function (err) {
        console.log("Error: " + err.message);
      });
    });
  });
};

var getPublicUrl = function getPublicUrl(bucketName, filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
};

var ImgUpload = function ImgUpload(req, res, next) {
  if (!req.file) return next();
  ImageUploadTool(req.file, req.query).then(function (value) {
    req.file = _lodash2.default.assign(req.file, value);
    console.log(req.file);
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

var google = function google(name, type, fileBuffer) {
  var cloudBucket = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '19vote';

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
      return resolve();
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
exports.pushGoogleCloud = pushGoogleCloud;
exports.delImageGoogleCloud = delImageGoogleCloud;
// import sharp from 'sharp'
// const bucket = {
//   avatar:{
//     name:'19avatar',
//     big:960,
//     normal:320,
//     small: 64
//   },
//   image:{
//     name:'19image',
//     big:1280,
//     normal:720,
//     small:320,
//   }
// }

// let ImageUploadTool = (file,query) =>{
//   return new Promise((resolve,reject)=>{
//     let {
//       type = 'image',
//       origin = true,
//       prefix = type,
//       name = `${prefix}-${new Date().getTime()}`,
//       loc = 'google'
//     } = query;
//     let {big,normal,small} = bucket[type]
//     let b = big,n = normal,s = small;

//     sharp(file.buffer).toBuffer({},(err,buffer,info)=>{
//       if(err)
//         return next();
//       let {width,height} = info
//       let upload = uploadUtil[loc],
//           mimetype = file.mimetype,
//           path = bucket[type].name;

//       if(width>big){// 3 image resize
//         Promise.all([
//           sharp(buffer).resize(big).toBuffer().then(b=>upload(name+'-big',mimetype,b,bucket[type].name)),
//           sharp(buffer).resize(normal).toBuffer().then(b=>upload(name+'-normal',mimetype,b,bucket[type].name)),
//           sharp(buffer).resize(small).toBuffer().then(b=>upload(name+'-small',mimetype,b,bucket[type].name))
//         ]).then(values=> resolve({big:values[0],normal:values[1],small:values[2],loc,path}))
//       }else if(width>normal){// 3 image 2 resize
//         Promise.all([
//           upload(name+'-big',mimetype,buffer,bucket[type].name),
//           sharp(buffer).resize(normal).toBuffer().then(b=>upload(name+'-normal',mimetype,b,bucket[type].name)),
//           sharp(buffer).resize(small).toBuffer().then(b=>upload(name+'-small',mimetype,b,bucket[type].name))
//         ]).then(values=> resolve({big:values[0],normal:values[1],small:values[2],loc,path}) )
//       }else if(width>small){ // 2 image 1 resize
//         Promise.all([
//           upload(name+'-normal',mimetype,buffer,bucket[type].name),
//           sharp(buffer).resize(small).toBuffer().then(b=>upload(name+'-small',mimetype,b,bucket[type].name))
//         ]).then(values=>resolve({normal:values[0],small:values[1],loc,path }))
//       }else{ // 1 image
//         upload(name+'-small',mimetype,buffer,bucket[type].name).then(link=>resolve({small:link ,loc,path}))
//       }
//     })
//   })
// }
//# sourceMappingURL=google.js.map
