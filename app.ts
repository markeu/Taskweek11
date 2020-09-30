import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import jwt from "express-jwt";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import GraphQlSchema from "./graphql";
import User from "./models/user";
import { includeAccessToken } from "./utils/authenticate";

dotenv.config();

/**
 * Connect to MongoDB.
 */

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

mongoose.connection.on("error", function () {
  console.log(
    "MongoDB Connection Error. Please make sure that MongoDB is running."
  );
  process.exit(1);
});
mongoose.set("debug", true);

/**
 * Express configuration.
 */

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const port = 8080;

/**
 * GraphQL server
 */
app.use(
  "/graphql",
  jwt({
    secret: "12345",
    requestProperty: "auth",
    algorithms: ["RS256"],
    credentialsRequired: false,
  })
);

app.use("/graphql", async (req: any, res, done) => {
  req.auth = "philipe@gmail.com";
  let userId = req.auth ? req.auth : undefined;
  const user = userId ? await User.findOne({ email: req.auth }) : undefined;
  const tokenObject = includeAccessToken(user);
  req.headers.authorization = tokenObject.token;
  done();
});

app.use(
  "/graphql",
  graphqlHTTP((req: any) => ({
    schema: GraphQlSchema,
    context: req,
    graphiql: true,
  }))
);

const server = app.listen(process.env.PORT || port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default server;
