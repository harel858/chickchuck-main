import Joi from "joi";

interface ReqBody {
  phoneNumber: string;
  name: string;
  bussinesId: string;
}
const ReqBodySchema = Joi.object({
  phoneNumber: Joi.number().min(10).required(),
  name: Joi.string().required(),
  bussinesId: Joi.string().required(),
});
function validateCustomer(data: ReqBody) {
  return ReqBodySchema.validate(data);
}

export default validateCustomer;
