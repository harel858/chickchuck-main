import Joi from "joi";

interface ReqBody {
  title: string;
  cost: number;
  duration: number;
  documentName: string;
  businessId: string;
}
const ReqBodySchema = Joi.object({
  title: Joi.string().required(),
  cost: Joi.number().required(),
  duration: Joi.number().required(),
  documentName: Joi.string(),
  businessId: Joi.string().required(),
});
function validateService(data: ReqBody) {
  return ReqBodySchema.validate(data);
}

export default validateService;
