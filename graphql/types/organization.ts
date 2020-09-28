import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from "graphql";

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  description:
    "Organization type for managing all the organizations in our application.",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "ID of the organization, Generated automatically by MongoDB",
    },
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
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Date the organization was created in the database",
    },
    updateAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Update date the organization in the database",
    },
    noOfEmployee: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Total number of employees in an organization",
    },
    employees: {
      type: new GraphQLNonNull(GraphQLList(GraphQLString)),
      description: "Array of employees in an organization",
    },
    products: {
      type: new GraphQLNonNull(GraphQLList(GraphQLString)),
      description: "Array of products specific to an organization",
    },
  }),
});

export default OrganizationType;
