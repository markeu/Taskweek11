import bcrypt from "bcryptjs";
import { Organization } from "../../models/organization";
import User from "../../models/user";
import { includeAccessToken } from "../../utils/authenticate";

export default class ResolverController {
  static async auth(data, context) {
    return User.findOne({ email: data.email })
      .exec()
      .then((user) => {
        if (!user) {
          return new Error("Invalid signin credentials.");
        }
        if (bcrypt.compareSync(data.password, user["password"])) {
          return includeAccessToken(user);
        } else {
          return new Error("Invalid login credentials.");
        }
      });
  }

  static async createUser(data) {
    const newUser = new User(data);
    try {
      newUser["password"] = bcrypt.hashSync(newUser["password"]);
      const record = await newUser.save();
      return includeAccessToken(record);
    } catch (error) {
      return error;
    }
  }

  static async index() {
    return Organization.find()
      .exec()
      .then((records) => records)
      .catch((error) => error);
  }

  static async single(data) {
    return Organization.findOne({ organization: data.organization })
      .exec()
      .then((org) => org)
      .catch((error) => error);
  }

  static async createOrganization(data) {
    const newOrganization = new Organization(data);
    try {
      newOrganization["noOfEmployee"] = newOrganization["employees"].length;
      const record = await newOrganization.save();
      return record;
    } catch (error) {
      return new Error("Organization must be of unique value");
    }
  }

  static async updateOrganization(data) {
    const specOrg = await Organization.findOne({
      organization: data.organization,
    });
    if (specOrg == null)
      return new Error("No organization found in the database");
    const specId = specOrg.id;
    return await Organization.findByIdAndUpdate(
      specId,
      {
        $set: {
          organization: data.organization || specOrg["organization"],
          marketValue: data.marketValue || specOrg["marketValue"],
          address: data.address || specOrg["address"],
          ceo: data.ceo || specOrg["ceo"],
          employees: data.employees || specOrg["employees"],
          products: data.products || specOrg["products"],
        },
      },
      { new: true }
    );
  }

  static async deleteOrganization(data) {
    const specificOrganization = await Organization.findById({ _id: data.id });
    if (!specificOrganization)
      throw new Error("Organization not found in the DB");
    return await Organization.findByIdAndDelete({ _id: data.id });
  }

  static async deleteOrganizationByCompany(data) {
    const specificOrganization = await Organization.findOne({
      organization: data.organization,
    });
    if (!specificOrganization)
      throw new Error("Organization not found in the DB");
    return await Organization.findOneAndDelete({
      organization: data.organization,
    });
  }

  static async deleteUser(data) {
    const specificUser = await User.findOne({
      email: data.email,
    });
    if (!specificUser) throw new Error("User not found in the DB");
    return await User.findOneAndDelete({
      email: data.email,
    });
  }
}
