import UserType from "../types/user";
import resolverController from "../resolvers";
import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } from "graphql";
import OrganizationType from "../types/organization";
import {
  organizationSchema,
  signinUserValidation,
  createUserValidation,
} from "../../utils/validate";
import { isAuthenticated } from "../../utils/authenticate";

const {
  auth,
  createUser,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  deleteOrganizationByCompany,
  deleteUser,
} = resolverController;

export const signIn = () => {
  return {
    type: UserType,
    description: "Login registered User",
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Email cannot be left empty",
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Enter password, will be automatically hashed",
      },
    },
    resolve(_, fields, context) {
      const { error } = signinUserValidation(fields);
      if (error) throw new Error(error.details[0].message);
      return auth(fields, context);
    },
  };
};

export const signUp = () => {
  return {
    type: UserType,
    description: "Add new User",

    args: {
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Enter firstname, Cannot be left empty",
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Enter last name, Cannot be left empty",
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Enter email",
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Enter password, will be automatically hashed",
      },
    },
    resolve(parent, fields) {
      const { error } = createUserValidation(fields);
      if (error) throw new Error(error.details[0].message);
      return createUser(fields);
    },
  };
};

export const createOrg = () => {
  return {
    type: OrganizationType,
    description: "Add new organization to the database",
    args: {
      organization: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Name of the organization as found in the database",
      },
      marketValue: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Market value of the organization as seen in the database",
      },
      address: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Address of the organization as seen in the database",
      },
      ceo: {
        type: new GraphQLNonNull(GraphQLString),
        description: "CEO of the organization as seen in the database",
      },
      employees: {
        type: new GraphQLNonNull(GraphQLList(GraphQLString)),
        description: "Array of employees in an organization",
      },
      products: {
        type: new GraphQLNonNull(GraphQLList(GraphQLString)),
        description: "Array of products specific to an organization",
      },
    },
    resolve(parent, fields, context) {
      const { error } = organizationSchema(fields);
      if (error) throw new Error(error.details[0].message);
      if (isAuthenticated(context)) {
        return createOrganization(fields);
      }
    },
  };
};

export const updateOrg = () => {
  return {
    type: OrganizationType,
    description: "Update organization details",
    args: {
      organization: {
        type: GraphQLString,
        description: "Name of the organization as found in the database",
      },
      marketValue: {
        type: GraphQLString,
        description: "Market value of the organization as seen in the database",
      },
      address: {
        type: GraphQLString,
        description: "Address of the organization as seen in the database",
      },
      ceo: {
        type: GraphQLString,
        description: "CEO of the organization as seen in the database",
      },
      employees: {
        type: GraphQLList(GraphQLString),
        description: "Array of employees in an organization",
      },
      products: {
        type: GraphQLList(GraphQLString),
        description: "Array of products specific to an organization",
      },
    },
    resolve(parent, fields, context) {
      if (isAuthenticated(context)) {
        return updateOrganization(fields);
      }
    },
  };
};

export const deleteOrg = () => {
  return {
    type: OrganizationType,
    description: "Delete organization from the database",
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: "Please enter a valid organization id",
      },
    },
    resolve(parent, args, context, info) {
      if (isAuthenticated(context)) {
        return deleteOrganization(args);
      }
    },
  };
};

export const deleteOrgByCompany = () => {
  return {
    type: OrganizationType,
    description: "Delete organization from the database by company",
    args: {
      organization: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Please enter a valid organization name",
      },
    },
    resolve(parent, args, context, info) {
      if (isAuthenticated(context)) {
        return deleteOrganizationByCompany(args);
      }
    },
  };
};

export const deleteUserFromDb = () => {
  return {
    type: UserType,
    description: "Delete user from the database by company",
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Please enter a valid authenicated user email",
      },
    },
    resolve(parent, args, context, info) {
      return deleteUser(args);
    },
  };
};
