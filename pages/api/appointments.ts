// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createAppointment } from "../../lib/prisma/appointments";

import { AvailableSlot, Customer, Treatment, User } from "@prisma/client";
import validateAppointment from "../../lib/validation/appointmentValidation";
import { getById } from "../../lib/prisma/users";
import { UserData } from "../../types/types";

interface ReqBody {
  treatment: Treatment;
  user: UserData;
  availableSlot: {
    id: string;
    start: string;
    end: string;
    date: string;
    userId: string;
    businessId: string;
  }[];
  date: string;
  customerId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { availableSlot, treatment, user, customerId, date }: ReqBody =
        req.body;

      const { error } = validateAppointment({
        availableSlot,
        customerId: customerId,
        date,
        treatment,
        userId: user.userId,
      });

      if (error) {
        const validationError = error?.details[0].message;
        console.log(validationError);
        return res.status(400).json(validationError);
      }

      const { userExist, err } = await getById(user.userId);
      if (!userExist || err) return res.status(500).json("user not found");

      const { existingAppointment, appointment, createErr } =
        await createAppointment(
          userExist.id,
          customerId,
          availableSlot,
          treatment.id,
          userExist.Business[0].id,
          null,
          date
        );

      if (existingAppointment)
        return res.status(400).json("appointment already exists");

      if (appointment) return res.status(200).json(appointment);
      return res.status(500).json("error with the appointment function");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}
