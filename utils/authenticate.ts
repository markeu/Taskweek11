import jwt from "jsonwebtoken";
const isAuthenticated = (context) => {
  if (context.headers.authorization) {
    return true;
  }
  throw new Error("User is not logged in (or authenticated).");
};

const includeAccessToken = (user) => {
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  let userObject = user.toJSON();
  const token = jwt.sign(payload, "hilariousmofo");
  userObject["token"] = token;
  return userObject;
};

export { isAuthenticated, includeAccessToken };
