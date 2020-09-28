"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrg = exports.updateOrg = exports.createOrg = exports.signUp = exports.signIn = void 0;
const user_1 = __importDefault(require("../types/user"));
const resolvers_1 = __importDefault(require("../resolvers"));
const graphql_1 = require("graphql");
const organization_1 = __importDefault(require("../types/organization"));
const { auth, createUser, createOrganization, updateOrganization, deleteOrganization, } = resolvers_1.default;
exports.signIn = () => {
    return {
        type: user_1.default,
        description: "Login registered User",
        args: {
            email: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                description: "Email cannot be left empty",
            },
            password: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                description: "Enter password, will be automatically hashed",
            },
        },
        resolve(parent, fields) {
            return auth(fields);
        },
    };
};
exports.signUp = () => {
    return {
        type: user_1.default,
        description: "Add new User",
        args: {
            firstName: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                description: "Enter firstname, Cannot be left empty",
            },
            lastName: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                description: "Enter last name, Cannot be left empty",
            },
            email: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                description: "Enter email",
            },
            password: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                description: "Enter password, will be automatically hashed",
            },
        },
        resolve(parent, fields) {
            return createUser(fields);
        },
    };
};
exports.createOrg = () => {
    return {
        type: organization_1.default,
        description: "Add new organization to the database",
        args: {
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
            employees: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLString)),
                description: "Array of employees in an organization",
            },
            products: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLString)),
                description: "Array of products specific to an organization",
            },
        },
        resolve(parent, fields) {
            return createOrganization(fields);
        },
    };
};
exports.updateOrg = () => {
    return {
        type: organization_1.default,
        description: "Update organization details",
        args: {
            organization: {
                type: graphql_1.GraphQLString,
                description: "Name of the organization as found in the database",
            },
            marketValue: {
                type: graphql_1.GraphQLString,
                description: "Market value of the organization as seen in the database",
            },
            address: {
                type: graphql_1.GraphQLString,
                description: "Address of the organization as seen in the database",
            },
            ceo: {
                type: graphql_1.GraphQLString,
                description: "CEO of the organization as seen in the database",
            },
            employees: {
                type: graphql_1.GraphQLList(graphql_1.GraphQLString),
                description: "Array of employees in an organization",
            },
            products: {
                type: graphql_1.GraphQLList(graphql_1.GraphQLString),
                description: "Array of products specific to an organization",
            },
        },
        resolve(parent, fields) {
            return updateOrganization(fields);
        },
    };
};
exports.deleteOrg = () => {
    return {
        type: organization_1.default,
        description: "Delete organization from the database",
        args: {
            id: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                description: "Please enter a valid organization id",
            },
        },
        resolve(parent, args, context, info) {
            return deleteOrganization(args);
        },
    };
};
//# sourceMappingURL=index.js.map