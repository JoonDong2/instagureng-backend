const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync  } = require('@graphql-tools/load-files');

const allTypes = loadFilesSync(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = loadFilesSync(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(allTypes, {all: true}),
    resolvers: mergeResolvers(allResolvers)
});

module.exports = {
    schema
};