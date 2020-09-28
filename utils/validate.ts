import Joi from "joi";
import { signupType, orgInterface } from "./types";

export function createUserValidation(input) {
  const joiQuery: signupType = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(50).required(),
  };

  return Joi.validate(input, joiQuery);
}

export function signinUserValidation(input) {
  const joiQuery: signupType = {
    email: Joi.string().email(),
    password: Joi.string().min(6).max(50).required(),
  };

  return Joi.validate(input, joiQuery);
}

export function organizationSchema(input) {
  const joiQuery: orgInterface = {
    organization: Joi.string().required(),
    marketValue: Joi.string().required(),
    address: Joi.string().required(),
    ceo: Joi.string().required(),
    products: Joi.array().items(Joi.string()),
    employees: Joi.array().items(Joi.string()),
  };

  return Joi.validate(input, joiQuery);
}
