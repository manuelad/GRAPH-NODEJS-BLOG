const { GraphQLList, GraphQLID } = require("graphql");
const { UserType, PostType, CommentType } = require("./types");
const { User, Post } = require('../models');
const { findById } = require("../models/User");
const Comment = require("../models/Comment");


const users = {
    type: new GraphQLList(UserType),
    resolve() {
        return User.find();
    }
}

const user = {
    type: UserType,
    description: "get a user by id",
    args: { id: { type: GraphQLID } },
    resolve(_, args) {
        return User.findById(args.id)
    }
}

const posts = {
    type: new GraphQLList(PostType),
    description: "get All posts",
    resolve() {
        return Post.find()
    }
}

const post = {
    type: PostType,
    description: "get a post by id",
    args: {
        id: { type: GraphQLID }
    },
    resolve(_, args) {
        return Post.findById(args.id)
    }
}

const comments = {
    type: new GraphQLList(CommentType),
    description: "get all comments",
    resolve() {
        return Comment.find()
    }
}

const comment = {
    type: CommentType,
    description: "get a comment by id",
    args: {
        id: { type: GraphQLID }
    },
    resolve(_, { id }) {
        return Comment.findById(id)
    }
}
module.exports = { users, user, posts, post, comments, comment }