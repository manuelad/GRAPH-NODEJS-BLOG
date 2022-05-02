const { GraphQLString, GraphQLID, GraphQLObjectType } = require("graphql");
const { PostType, CommentType } = require('./types')

const { User, Post } = require("../models");
const { createJWTToken } = require("../util/auth");
const Comment = require("../models/Comment");

const register = {
    type: GraphQLString,
    description: "Register a new user and return a new token",
    args: {
        username: { type: GraphQLString, },
        email: { type: GraphQLString, },
        password: { type: GraphQLString, },
        displayName: { type: GraphQLString, },
    },
    async resolve(_, args) {
        const { username, email, password, displayName } = args;
        const newUser = await User.create({ username, email, password, displayName, });
        const token = createJWTToken({ newUser });
        console.log(token);
        return token;
    },
};

const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_, args) {
        const user = await User.findOne({ email: args.email, password: args.password })
        if (!user) throw new Error('user not found');
        const token = createJWTToken({ user })

        return token;

    }
}

const createPost = {
    type: PostType,
    description: "Create a new post",
    args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    resolve(_, args, { verifyUser }) {
        const post = new Post({ ...args, authorId: verifyUser._id })
        return post.save()
    }
}

const updatePost = {
    name: "PostType",
    type: PostType,
    description: "update a post",
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    async resolve(_, args, { verifyUser }) {
        if (!verifyUser)
            throw new Error("Unauthorized")

        const { title, body, id } = args
        const updatedPost = await Post.findByIdAndUpdate({ _id: id, authorId: verifyUser._id }, { title, body }, { new: true })
        return updatedPost;
    }
}

const deletePost = {
    type: GraphQLString,
    description: "delete a post",
    args: { id: { type: GraphQLID } },
    async resolve(_, { id }, { verifyUser }) {
        if (!verifyUser)
            throw new Error('unauthorized')
        const postDeleted = await Post.deleteOne({ _id: id, authorId: verifyUser._id })
        if (postDeleted) return "delete successfully"
        throw new Error("post not found")

    }
}

const addComment = {
    type: CommentType,
    description: "comment type",
    args: {
        comment: { type: GraphQLString },
        postId: { type: GraphQLID }
    },
    async resolve(_, args, { verifyUser }) {
        if (!verifyUser) throw new Error('Unauthorized')
        const newComment = await Comment.create({ ...args, userId: verifyUser._id })
        return newComment;
    }
}

const updateComment = {
    type: CommentType,
    description: "update a comment",
    args: {
        id: { type: GraphQLID },
        comment: { type: GraphQLString }
    },
    async resolve(_, { id, comment }, { verifyUser }) {
        console.log(verifyUser.username);
        if (!verifyUser) throw new Error('Unauthorized')
        const updatedComment = await Comment.findOneAndUpdate({ _id: id, userId: verifyUser._id }, { comment }, { new: true })

        if (!updatedComment)
            throw new Error("comment not found");
        return updatedComment;
    }
}

const deleteComment = {
    type: GraphQLString,
    description: "delete A Comment",
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_, { id }, { verifyUser }) {
        if (!verifyUser) throw new Error("unAuthorized")
        const deleteComment = await Comment.findByIdAndDelete({ _id: id, userId: verifyUser._id })
        if (!deleteComment) throw new Error('comment not found')
        return "comment delete";
    }

}

module.exports = { register, login, createPost, updatePost, deletePost, addComment, updateComment, deleteComment };