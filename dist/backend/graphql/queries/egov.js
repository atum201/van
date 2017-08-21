'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logins = exports.login = exports.userById = exports.user = exports.users = exports.phancap = exports.newMessage = exports.message = exports.group = exports.online = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongodb = require('mongodb');

var _graphql = require('graphql');

var _egov = require('../types/egov');

var _mongodb2 = require('../../mongodb');

var _variable = require('../../common/variable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var online = exports.online = {
  type: new _graphql.GraphQLList(_graphql.GraphQLString),
  resolve: function resolve() {
    return _variable.userOnline;
  }
};
var group = exports.group = {
  type: new _graphql.GraphQLList(_egov.GroupType),
  args: {
    user: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(root, _ref) {
    var user = _ref.user;

    return _mongodb2.User.findOneAsync({ userId: user }).then(function (user) {
      var ids = _lodash2.default.flatMap(user.groups, function (g) {
        return (0, _mongodb.ObjectID)(g);
      });
      return _mongodb2.Group.findAsync({ _id: { $in: ids } }).then(function (groups) {
        return groups;
      }).error(function (e) {});
    });
  }
};

var message = exports.message = {
  type: new _graphql.GraphQLList(_egov.MessageType),
  args: {
    q: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(_, _ref2) {
    var q = _ref2.q;

    var options = JSON.parse(q);
    return _mongodb2.Message.list(options).then(function (messages) {
      return messages;
    }).error(function (e) {});
  }
};

var newMessage = exports.newMessage = {
  type: new _graphql.GraphQLList(_egov.MessageType),
  args: {
    u: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(_, _ref3) {
    var u = _ref3.u;

    return _mongodb2.User.findOneAsync({ userId: u }).then(function (user) {
      if (user) {
        var query = [{ toUser: user.id, state: 0 }];
        if (user.groups) {
          for (var i = 0; i < user.groups.length; i++) {
            query.push({ toGroup: user.groups[i], time: { $gt: user.read[i] || 0 } });
            // query.push({"toGroup":ObjectID(user.groups[i]),time:{$gt:user.read[i]||0}});
          }
        }
        return _mongodb2.Message.list({ $or: query }).then(function (messages) {
          console.log("abc", messages);return messages;
        }).error(function (e) {});
      } else {
        return {};
      }
    });
  }
};

var phancap = exports.phancap = {
  type: _egov.PhanCapType,
  resolve: function resolve() {
    return _mongodb2.PhanCap.getLast({}).then(function (phancap) {
      return phancap;
    }).error(function (e) {});
  }
};

var users = exports.users = {
  type: new _graphql.GraphQLList(_egov.UserType),
  args: {
    q: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(_, _ref4) {
    var q = _ref4.q;

    var options = JSON.parse(q);
    return _mongodb2.User.list(options).then(function (users) {
      return users;
    }).error(function (e) {});
  }
};

var user = exports.user = {
  type: _egov.UserType,
  args: {
    q: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(_, _ref5) {
    var q = _ref5.q;

    return _mongodb2.User.findOneAsync({ userId: q }).then(function (user) {
      return user;
    }).error(function (e) {});
  }
};

var userById = exports.userById = {
  type: _egov.UserType,
  args: {
    q: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(_, _ref6) {
    var q = _ref6.q;

    return _mongodb2.User.get(q).then(function (user) {
      return user;
    }).error(function (e) {});
  }
};

var login = exports.login = {
  type: _graphql.GraphQLFloat,
  args: {
    u: {
      type: _graphql.GraphQLString
    },
    m: {
      type: _graphql.GraphQLString
    },
    y: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(_, _ref7) {
    var u = _ref7.u,
        m = _ref7.m,
        y = _ref7.y;

    return _mongodb2.User.findOneAsync({ userId: u }).then(function (user) {
      var month = m;
      var year = y;
      var result = 0;
      if (user) {
        if (year === "all" || year === '' || year === 'undefined') {
          for (var j = 0; j < user.login.length; j++) {
            result += user.login[j];
          }
        } else {
          if (month === "all" || month === '' || month === 'undefined') {
            var fD = new Date(user.first);
            if (fD.getFullYear <= year) {
              var index = monthdiff(user.first, new Date(year, 12, 1).getTime());
              for (var _j = index; _j > 0; _j--) {
                var k = 0;
                if (k < 12 && typeof user.login[_j] !== 'undefined') result += user.login[_j];
                k++;
              }
            }
          } else {
            var _index = monthdiff(user.first, new Date(year, month, 1).getTime());
            if (typeof user.login[_index] !== 'undefined') result = user.login[_index];
          }
        }
      }
      return result;
    }).error(function (e) {
      console.log(e);return 0;
    });
  }
};

var logins = exports.logins = {
  type: new _graphql.GraphQLList(_egov.LoginType),
  args: {
    u: {
      type: new _graphql.GraphQLList(_graphql.GraphQLString)
    },
    m: {
      type: _graphql.GraphQLString
    },
    y: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(_, _ref8) {
    var u = _ref8.u,
        m = _ref8.m,
        y = _ref8.y;

    return _mongodb2.User.findAsync({ userId: { $in: u } }).then(function (users) {
      var month = m;
      var year = y;
      var result = [];
      if (users) {
        users.forEach(function (user) {
          var ur = { username: user.userId, login: 0 };
          if (year === "all" || year === '' || year === 'undefined') {
            for (var j = 0; j < user.login.length; j++) {
              ur.login += user.login[j];
            }
          } else {
            if (month === "all" || month === '' || month === 'undefined') {
              var fD = new Date(user.first);
              if (fD.getFullYear <= year) {
                var index = monthdiff(user.first, new Date(year, 12, 1).getTime());
                for (var _j2 = index; _j2 > 0; _j2--) {
                  var k = 0;
                  if (k < 12 && typeof user.login[_j2] !== 'undefined') ur.login += user.login[_j2];
                  k++;
                }
              }
            } else {
              var _index2 = monthdiff(user.first, new Date(year, month, 1).getTime());
              if (typeof user.login[_index2] !== 'undefined') ur.login = user.login[_index2];
            }
          }
          result.push(ur);
        });
        var ar = result.chunk(150);
        return result;
      }
    }).error(function (e) {
      console.log(e);return [];
    });
  }
};
//# sourceMappingURL=egov.js.map
