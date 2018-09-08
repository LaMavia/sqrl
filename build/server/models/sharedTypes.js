"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
type DeleteResult {
  n: Int!
  ok: Int
}

type UpdateResult {
  n: Int!
  ok: Int!
  nModified: Int!
}

type Comment {
  _id: ID!
  Author: User!
  Date: String!
  Content: String!
  Post: Post!
}

type Post {
  _id: ID!
  Author: User!
  Date: String!
  Content: String!
  Likes: Int!
  Image: String
  Edited: Boolean
}

type User {
  _id: ID
  Name: String!
  Username: String!
  Password: String!
  Email: String!
  ProfileImageURL: String
  BackgroundImageURL: String
  Followers: [User]
  LikedPosts: [Post]
}
`;
