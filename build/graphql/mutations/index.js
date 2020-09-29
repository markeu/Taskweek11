"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserFromDb = exports.deleteOrgByCompany = exports.deleteOrg = exports.updateOrg = exports.createOrg = exports.signUp = exports.signIn = void 0;
const user_1 = __importDefault(require("../types/user"));
const resolvers_1 = __importDefault(require("../resolvers"));
const graphql_1 = require("graphql");
const organization_1 = __importDefault(require("../types/organization"));
const validate_1 = require("../../utils/validate");
const authenticate_1 = require("../../utils/authenticate");
const { auth, createUser, createOrganization, updateOrganization, deleteOrganization, deleteOrganizationByCompany, deleteUser, } = resolvers_1.default;
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
        resolve(_, fields, context) {
            const { error } = validate_1.signinUserValidation(fields);
            if (error)
                throw new Error(error.details[0].message);
            return auth(fields, context);
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
            const { error } = validate_1.createUserValidation(fields);
            if (error)
                throw new Error(error.details[0].message);
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
        resolve(parent, fields, context) {
            const { error } = validate_1.organizationSchema(fields);
            if (error)
                throw new Error(error.details[0].message);
            if (authenticate_1.isAuthenticated(context)) {
                return createOrganization(fields);
            }
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
        resolve(parent, fields, context) {
            if (authenticate_1.isAuthenticated(context)) {
                return updateOrganization(fields);
            }
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
            if (authenticate_1.isAuthenticated(context)) {
                return deleteOrganization(args);
            }
        },
    };
};
exports.deleteOrgByCompany = () => {
    return {
        type: organization_1.default,
        description: "Delete organization from the database by company",
        args: {
            organization: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                description: "Please enter a valid organization name",
            },
        },
        resolve(parent, args, context, info) {
            if (authenticate_1.isAuthenticated(context)) {
                return deleteOrganizationByCompany(args);
            }
        },
    };
};
exports.deleteUserFromDb = () => {
    return {
        type: user_1.default,
        description: "Delete user from the database by company",
        args: {
            email: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                description: "Please enter a valid authenicated user email",
            },
        },
        resolve(parent, args, context, info) {
            return deleteUser(args);
        },
    };
};
//# sourceMappingURL=index.js.map