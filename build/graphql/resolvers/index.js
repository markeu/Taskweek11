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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const organization_1 = require("../../models/organization");
const user_1 = __importDefault(require("../../models/user"));
const includeAccessToken = (user) => {
    const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
    };
    let userObject = user.toJSON();
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
    userObject["token"] = token;
    return userObject;
};
class ResolverController {
    static auth(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findOne({ email: data.email })
                .exec()
                .then((user) => {
                if (!user) {
                    return new Error("Invalid signin credentials.");
                }
                if (bcryptjs_1.default.compareSync(data.password, user["password"])) {
                    return includeAccessToken(user);
                }
                else {
                    return new Error("Invalid login credentials.");
                }
            });
        });
    }
    static createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_1.default(data);
            try {
                const record = yield newUser.save();
                return includeAccessToken(record);
            }
            catch (error) {
                return error;
            }
        });
    }
    static index() {
        return __awaiter(this, void 0, void 0, function* () {
            return organization_1.Organization.find()
                .exec()
                .then((records) => records)
                .catch((error) => error);
        });
    }
    static single(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return organization_1.Organization.findOne({ organization: data.organization })
                .exec()
                .then((org) => org)
                .catch((error) => error);
        });
    }
    static createOrganization(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOrganization = new organization_1.Organization(data);
            try {
                newOrganization["noOfEmployee"] = newOrganization["employees"].length;
                const record = yield newOrganization.save();
                return record;
            }
            catch (error) {
                return error;
            }
        });
    }
    static updateOrganization(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const specOrg = yield organization_1.Organization.findOne({
                organization: data.organization,
            });
            if (specOrg == null)
                return new Error("No organization found in the database");
            const specId = specOrg.id;
            return yield organization_1.Organization.findByIdAndUpdate(specId, {
                $set: {
                    organization: data.organization || specOrg["organization"],
                    marketValue: data.marketValue || specOrg["marketValue"],
                    address: data.address || specOrg["address"],
                    ceo: data.ceo || specOrg["ceo"],
                    employees: data.employees || specOrg["employees"],
                    products: data.products || specOrg["products"],
                },
            }, { new: true });
        });
    }
    static deleteOrganization(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return organization_1.Organization.findByIdAndDelete({ _id: data })
                .exec()
                .then((result) => {
                if (!result)
                    return new Error("Organization not found");
                return result;
            })
                .catch((error) => error);
        });
    }
}
exports.default = ResolverController;
//# sourceMappingURL=index.js.map