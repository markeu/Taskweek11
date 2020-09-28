import { GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import organizationType from "../types/organization";
import resolverController from "../resolvers";
import { isAuthenticated } from "../../utils/authenticate";

const { index, single } = resolverController;

export const findAll = () => {
  return {
    type: new GraphQLList(organizationType),
    description: "This will return all the organization found in the database",
    resolve(parent, args, context, info) {
      if (isAuthenticated(context)) {
        return index();
      }
    },
  };
};

export const findOne = () => {
  return {
    type: organizationType,
    description: "This returns a specific company from the database",
    args: {
      organization: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Please enter a company name",
      },
    },
    resolve(parent, args, context, info) {
      if (isAuthenticated(context)) {
        return single({ organization: args.organization });
      }
    },
  };
};
