import { AvailableSlot, Customer, Treatment } from "@prisma/client";
import Joi from "joi";

interface ReqBody {
  availableSlot: AvailableSlot[];
  customerId: string;
  date: string;
  treatment: Treatment;
  userId: string;
}
const ReqBodySchema = Joi.object({
  availableSlot: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        start: Joi.string().required(),
        end: Joi.string().required(),
        businessId: Joi.string(),
        // add more properties here if needed
      })
    )
    .required(),
  customerId: Joi.string().required(),
  date: Joi.string().required(),
  treatment: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    cost: Joi.number().required(),
    duration: Joi.number().required(),
    businessId: Joi.string().required(),
    // add more properties here if needed
  }).required(),
  userId: Joi.string().required(),
});

function validateAppointment(data: ReqBody) {
  console.log(data.availableSlot[0].start);
  return ReqBodySchema.validate(data);
}

export default validateAppointment;
