"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const organizationSchema = new Schema({
    organization: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    marketValue: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    ceo: {
        type: String,
        required: true,
    },
    noOfEmployees: Number,
    employees: [String],
    products: [String],
});
const Organization = mongoose_1.default.model("Organization", organizationSchema);
exports.Organization = Organization;
//# sourceMappingURL=organization.js.map