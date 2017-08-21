'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submit = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongodb = require('mongodb');

var _graphql = require('graphql');

var _vote = require('../types/vote');

var GraphQLType = _interopRequireWildcard(_vote);

var _mongodb2 = require('../../mongodb');

var Model = _interopRequireWildcard(_mongodb2);

var _util = require('../../common/util');

var _constant = require('../../common/constant');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// submit: phuc vu chung cho viec them, sua, xoa don gian.
var submit = exports.submit = {
  type: GraphQLType.ResponseVoteType,
  args: {
    query: GraphQLType.InputVoteType
  },
  resolve: function resolve(root, _ref) {
    var query = _ref.query;

    var model = query.action.split(':')[1];
    var action = query.action.split(':')[0];
    var col = Model[model];
    console.log(model, "+++++++", col, "+++++++", _mongodb2.Member);
    var obj = JSON.parse(query.payload);
    if (action === _constant.ADD) {
      var doc = new col(obj);
      return doc.saveAsync().then(function (d) {
        return {
          action: query.action,
          state: _constant.STATE_SUCCESS,
          payload: (0, _util.standardDoc)(d)
        };
      }).error(function (e) {
        return {
          action: query.action,
          state: _constant.STATE_ERROR
        };
      });
    }
    if (action === _constant.EDIT) {
      return col.findOneAsync({ _id: (0, _mongodb.ObjectID)(obj.id) }).then(function (doc) {
        if (doc) {
          _lodash2.default.assign(doc, obj); // update Document
          doc.saveAsync().then(function (d) {
            return {
              action: query.action,
              state: _constant.STATE_SUCCESS,
              payload: (0, _util.standardDoc)(d)
            };
          }).error(function (e) {
            return {
              action: query.action,
              state: _constant.STATE_ERROR
            };
          });
        } else {
          return {
            action: query.action,
            state: _constant.STATE_NOT_FOUND
          };
        }
      }).error(function (e) {
        return {
          action: query.action,
          state: _constant.STATE_ERROR
        };
      });
    }
    if (action === _constant.DEL) {
      return col.findOneAsync({ _id: (0, _mongodb.ObjectID)(obj.id) }).then(function (doc) {
        if (doc) {
          doc.removeAsync();
          return {
            action: query.action,
            state: _constant.STATE_SUCCESS
          };
        } else {
          return {
            action: query.action,
            state: _constant.STATE_NOT_FOUND
          };
        }
      }).error(function (e) {
        return {
          action: query.action,
          state: _constant.STATE_ERROR
        };
      });
    }
  }
};
//# sourceMappingURL=vote.js.map
