import { AvailableSlot, Customer, Treatment } from "@prisma/client";
import dayjs from "dayjs";
import Joi from "joi";

interface ReqBody {
  availableSlot: AvailableSlot[];
  customerId: string;
  date: { appointmentDate: string }; // Correct structure for 'date'
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
        userId: Joi.string().required(),
        businessId: Joi.string(),
        breakTimeId: Joi.string().allow(null),
        // add more properties here if needed
      })
    )
    .required(),
  customerId: Joi.string().required(),
  date: Joi.object({
    appointmentDate: Joi.string()
      .custom((value, helpers) => {
        const dayjsDate = dayjs(value);
        if (dayjsDate.isValid()) {
          return value;
        } else {
          return helpers.error("any.custom");
        }
      })
      .required(),
  }),
  treatment: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    cost: Joi.number().required(),
    advancePayment: Joi.number(),
    duration: Joi.number().required(),
    businessId: Joi.string().required(),
    // add more properties here if needed
  }).required(),
  userId: Joi.string().required(),
});

function validateAppointment(data: ReqBody) {
  return ReqBodySchema.validate(data);
}

export default validateAppointment;
