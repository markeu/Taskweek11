"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = __importDefault(require("./graphql"));
const user_1 = __importDefault(require("./models/user"));
const authenticate_1 = require("./utils/authenticate");
dotenv_1.default.config();
/**
 * Connect to MongoDB.
 */
//mongodb+srv://markeu:uzochukwu1!@cluster0-1kkhs.mongodb.net/organization
//mongodb://127.0.0.1/organization
mongoose_1.default
    .connect("mongodb+srv://markeu:uzochukwu1!@cluster0-1kkhs.mongodb.net/organization", {
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
const port = 8080;
/**
 * GraphQL server
 */
app.use("/graphql", express_jwt_1.default({
    secret: "12345",
    requestProperty: "auth",
    algorithms: ["RS256"],
    credentialsRequired: false,
}));
app.use("/graphql", (req, res, done) => __awaiter(void 0, void 0, void 0, function* () {
    req.auth = "philipe@gmail.com";
    let userId = req.auth ? req.auth : undefined;
    const user = userId ? yield user_1.default.findOne({ email: req.auth }) : undefined;
    const tokenObject = authenticate_1.includeAccessToken(user);
    req.headers.authorization = tokenObject.token;
    done();
}));
app.use("/graphql", express_graphql_1.graphqlHTTP((req) => ({
    schema: graphql_1.default,
    context: req,
    graphiql: true,
})));
const server = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = server;
//# sourceMappingURL=app.js.map