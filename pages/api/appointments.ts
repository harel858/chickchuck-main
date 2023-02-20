// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createAppointment,
  getAppointments,
} from "../../lib/prisma/appointments";
import { getById } from "../../lib/prisma/users";
import { getTreatmentById } from "../../lib/prisma/treatment";
import validateAppointment from "../../lib/validation/appointmentValidation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    console.log(req.body);

    try {
      const { name, phoneNumber, appointmentTime, treatmentId, userId } =
        req.body;

      const { err, userExist } = await getById(userId);
      if (err || !userExist) return res.status(500).json(`business not found`);

      const { treatmentFound, treatmentNotFound } = await getTreatmentById(
        treatmentId
      );

      if (treatmentNotFound || !treatmentFound)
        return res.status(500).json(`treatment not found`);

      const { error } = validateAppointment({
        name,
        phoneNumber,
        appointmentTime,
        treatmentId,
        userId,
      });
      if (error) {
        const err = error.details[0].message;
        console.log({ err });
        return res.status(400).json(err);
      }

      const { newAppointment, appointmentErr } = await createAppointment(
        name,
        phoneNumber,
        appointmentTime,
        treatmentId,
        userId
      );

      if (!newAppointment || appointmentErr)
        return res.status(500).json(`something went wrong`);

      console.log(newAppointment);

      return res.status(201).json(newAppointment);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  if (req.method == "GET") {
    try {
      const { id } = req.query;
      console.log(id);

      if (!id) return res.status(500).json(`no id`);

      const { userExist, err } = await getById(id);
      if (err || !userExist) {
        console.log(err);
        return res.status(500).json(err);
      }
      const { appointments, appointmentErr } = await getAppointments(
        userExist.id
      );
      if (appointmentErr) return res.status(500).json(appointmentErr);
      console.log(appointments);
      return res.status(200).json(appointments);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}
