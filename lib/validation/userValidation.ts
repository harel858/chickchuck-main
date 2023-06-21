import joi from "joi";

const schema = joi.object({
  name: joi.string().max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  businessName: joi.string().required(),
});

function validateUser(user: any) {
  return schema.validate(user);
}

export default validateUser;
