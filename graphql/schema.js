const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { users, user, posts, post, comments, comment } = require('./queries');
const { register, login, createPost, updatePost, deletePost, addComment, updateComment, deleteComment } = require('./mutations')


const rootType = new GraphQLObjectType({
    name: 'rootType',
    description: "the root query type",
    fields: { users, user, posts, post, comments, comment }

});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "the root mutation type",
    fields: { register, login, createPost, updatePost, deletePost, addComment, updateComment, deleteComment }
})

module.exports = new GraphQLSchema({
    query: rootType,
    mutation: MutationType
});