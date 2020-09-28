import GraphQl from "graphql";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  signIn,
  signUp,
  createOrg,
  updateOrg,
  deleteOrg,
  deleteOrgByCompany,
  deleteUserFromDb,
} from "./mutations";
import { findAll, findOne } from "./queries";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "This is the default root query provided by the backend",
  fields: {
    organizations: findAll(),
    organization: findOne(),
  },
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Default mutation provided by the backend APIs",
  fields: {
    loginUser: signIn(),
    signUpUser: signUp(),
    postOrganization: createOrg(),
    updateOrganization: updateOrg(),
    deleteOrganization: deleteOrg(),
    deleteOrganizationByCompany: deleteOrgByCompany(),
    deleteUserByEmail: deleteUserFromDb(),
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
