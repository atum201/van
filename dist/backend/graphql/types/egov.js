"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhanCapType = exports.DonViType = exports.UserType = exports.RecentType = exports.GroupType = exports.LoginType = exports.MessageType = exports.g = exports.u = undefined;

var _graphql = require("graphql");

// Input Type
var u = exports.u = {
  type: new _graphql.GraphQLInputObjectType({
    name: "userInput",
    fields: {
      id: { type: _graphql.GraphQLString },
      avatar: { type: _graphql.GraphQLString },
      contactId: { type: _graphql.GraphQLString },
      groupId: { type: _graphql.GraphQLString },
      action: { type: _graphql.GraphQLString }
    }
  }) };

var g = exports.g = {
  type: new _graphql.GraphQLInputObjectType({
    name: "groupInput",
    fields: {
      id: { type: _graphql.GraphQLString },
      title: { type: _graphql.GraphQLString },
      creater: { type: _graphql.GraphQLString },
      member: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
      action: { type: _graphql.GraphQLString }
    }
  }) };

// Output Type
var MessageType = exports.MessageType = new _graphql.GraphQLObjectType({
  name: 'Message',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    from: { type: _graphql.GraphQLString },
    toUser: { type: _graphql.GraphQLString },
    toGroup: { type: _graphql.GraphQLString },
    content: { type: _graphql.GraphQLString },
    state: { type: _graphql.GraphQLInt },
    time: { type: _graphql.GraphQLString }
  }
});
var LoginType = exports.LoginType = new _graphql.GraphQLObjectType({
  name: "Login",
  fields: {
    username: { type: _graphql.GraphQLString },
    login: { type: _graphql.GraphQLInt }
  }
});
var GroupType = exports.GroupType = new _graphql.GraphQLObjectType({
  name: 'Group',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    name: { type: _graphql.GraphQLString },
    member: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    creater: { type: _graphql.GraphQLString },
    createdAt: { type: _graphql.GraphQLString }
  }
});
var RecentType = exports.RecentType = new _graphql.GraphQLObjectType({
  name: "Recent",
  fields: {
    id: { type: _graphql.GraphQLString },
    type: { type: _graphql.GraphQLString },
    last: { type: _graphql.GraphQLString },
    unread: { type: _graphql.GraphQLInt },
    del: { type: _graphql.GraphQLString }
  }
});
var UserType = exports.UserType = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    userId: { type: _graphql.GraphQLString },
    nickName: { type: _graphql.GraphQLString },
    avatar: { type: _graphql.GraphQLString },
    groups: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    friends: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
    recent: { type: new _graphql.GraphQLList(RecentType) },
    status: { type: _graphql.GraphQLString },
    login: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) },
    first: { type: _graphql.GraphQLInt },
    last: { type: _graphql.GraphQLInt }
  }
});

var DonViType = exports.DonViType = new _graphql.GraphQLObjectType({
  name: "DonVi",
  fields: function fields() {
    return {
      DonViCon: {
        type: new _graphql.GraphQLList(DonViType),
        resolve: function resolve(DonVi) {
          return DonVi.DonViCon;
        }
      },
      ThanhVien: { type: new _graphql.GraphQLList(_graphql.GraphQLID) },
      TenDonVi: { type: _graphql.GraphQLString }
    };
  }
});

var PhanCapType = exports.PhanCapType = new _graphql.GraphQLObjectType({
  name: 'PhanCap',
  fields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    phanCap: { type: DonViType },
    time: { type: _graphql.GraphQLString }
  }
});
//# sourceMappingURL=egov.js.map
