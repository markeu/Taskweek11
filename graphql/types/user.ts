import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type for managing all the users in our application.",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "ID of the user, Generated automatically by MongoDB",
    },
    firstName: {
      type: GraphQLString,
      description: "First name of the user",
    },
    lastName: {
      type: GraphQLString,
      description: "Last name of the user",
    },
    password: {
      type: GraphQLString,
      description: "Password of the user",
    },
    email: {
      type: GraphQLString,
      description: "Emaill address of the user",
    },
    token: {
      type: GraphQLString,
      description: "AUTH TOKEN",
    },
  }),
});

export default UserType;
