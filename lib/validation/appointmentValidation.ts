import joi from "joi";

const schema = joi.object({
  name: joi.string().min(2).required(),
  phoneNumber: joi.string().max(10).required(),
  appointmentTime: joi.string().required(),
  treatmentId: joi.string().required(),
  userId: joi.string().required(),
});

function validateAppointment(appointment: any) {
  return schema.validate(appointment);
}

export default validateAppointment;
