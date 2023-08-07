import Joi from "joi";

interface ReqBody {
  phoneNumber: number;
  name: string;
}
const ReqBodySchema = Joi.object({
  phoneNumber: Joi.number().min(10).required(),
  name: Joi.string().required(),
});
function validateCustomer(data: ReqBody) {
  return ReqBodySchema.validate(data);
}

export default validateCustomer;
