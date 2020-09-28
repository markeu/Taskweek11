"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const OrganizationType = new graphql_1.GraphQLObjectType({
    name: "Organization",
    description: "Organization type for managing all the organizations in our application.",
    fields: () => ({
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            description: "ID of the organization, Generated automatically by MongoDB",
        },
        organization: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "Name of the organization as found in the database",
        },
        marketValue: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "Market value of the organization as seen in the database",
        },
        address: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "Address of the organization as seen in the database",
        },
        ceo: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "CEO of the organization as seen in the database",
        },
        createdAt: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "Date the organization was created in the database",
        },
        updateAt: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "Update date the organization in the database",
        },
        noOfEmployee: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            description: "Total number of employees in an organization",
        },
        employees: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLString)),
            description: "Array of employees in an organization",
        },
        products: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLString)),
            description: "Array of products specific to an organization",
        },
    }),
});
exports.default = OrganizationType;
//# sourceMappingURL=organization.js.map