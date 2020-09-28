"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.findAll = void 0;
const graphql_1 = require("graphql");
const organization_1 = __importDefault(require("../types/organization"));
const resolvers_1 = __importDefault(require("../resolvers"));
const { index, single } = resolvers_1.default;
exports.findAll = () => {
    return {
        type: new graphql_1.GraphQLList(organization_1.default),
        description: "This will return all the organization found in the database",
        resolve(parent, args, context, info) {
            return index();
        },
    };
};
exports.findOne = () => {
    return {
        type: organization_1.default,
        description: "This returns a specific company from the database",
        args: {
            organization: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                description: "Please enter a company name",
            },
        },
        resolve(parent, args, context, info) {
            return single({ organization: args.organization });
        },
    };
};
//# sourceMappingURL=index.js.map