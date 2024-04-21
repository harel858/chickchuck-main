import joi from "joi";

const schema = joi.object({
  name: joi.string().max(20).required(),
  email: joi.string().email().required(),
  phone: joi.string().min(10),
  password: joi
    .string()
    .min(8) // Minimum password length of 8 characters
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    ) // At least one uppercase letter, one lowercase letter, one digit, and one special character
    .required(),
  businessName: joi.string().required(),
});

function validateUser(user: any) {
  return schema.validate(user);
}

export default validateUser;
