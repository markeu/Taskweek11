"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = __importDefault(require("../serverTaskOne/graphql"));
dotenv_1.default.config();
/**
 * Connect to MongoDB.
 */
mongoose_1.default
    .connect("mongodb://127.0.0.1/organization", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err.message));
mongoose_1.default.connection.on("error", function () {
    console.log("MongoDB Connection Error. Please make sure that MongoDB is running.");
    process.exit(1);
});
mongoose_1.default.set("debug", true);
/**
 * Express configuration.
 */
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const port = 8000;
/**
 * GraphQL server
 */
// app.use(
//   "/graphql",
//   jwt({
//     secret: process.env.JWT_SECRET,
//     requestProperty: "auth",
//     credentialsRequired: false,
//   })
// );
// app.use("/graphql", async (req, res, done) => {
//   var userId = req.auth && req.auth.id ? req.auth.id : undefined;
//   const user = userId ? await User.findById(userId) : undefined;
//   req.headers = {
//     user: user,
//   };
//   done();
// });
app.use("/graphql", express_graphql_1.graphqlHTTP((req) => ({
    schema: graphql_1.default,
    context: req.headers,
    graphiql: true,
})));
const server = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = server;
//# sourceMappingURL=app.js.map