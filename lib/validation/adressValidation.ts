import joi from "joi";
import { BusinessAddress } from "../../types/types";

const schema = joi.object({
  city: joi.string().min(2).required(),
  street: joi.string().min(2).required(),
  zipcode: joi.number().min(2).optional(),
  businessId: joi.string().required(),
  userId: joi.string().required(),
});

function validateAddress(data: BusinessAddress) {
  return schema.validate(data);
}

export default validateAddress;
