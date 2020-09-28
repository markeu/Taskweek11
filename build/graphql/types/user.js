"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    description: "User type for managing all the users in our application.",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID,
            description: "ID of the user, Generated automatically by MongoDB",
        },
        firstName: {
            type: graphql_1.GraphQLString,
            description: "First name of the user",
        },
        lastName: {
            type: graphql_1.GraphQLString,
            description: "Last name of the user",
        },
        password: {
            type: graphql_1.GraphQLString,
            description: "Password of the user",
        },
        email: {
            type: graphql_1.GraphQLString,
            description: "Emaill address of the user",
        },
        token: {
            type: graphql_1.GraphQLString,
            description: "AUTH TOKEN",
        },
    }),
});
exports.default = UserType;
//# sourceMappingURL=user.js.map