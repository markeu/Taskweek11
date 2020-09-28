"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    description: "This is the default root query provided by the backend",
    fields: {
        organizations: queries_1.findAll(),
        organization: queries_1.findOne(),
    },
});
const RootMutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    description: "Default mutation provided by the backend APIs",
    fields: {
        loginUser: mutations_1.signIn(),
        signUpUser: mutations_1.signUp(),
        postOrganization: mutations_1.createOrg(),
        updateOrganization: mutations_1.updateOrg(),
        deleteOrganization: mutations_1.deleteOrg(),
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
//# sourceMappingURL=index.js.map