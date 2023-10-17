// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createAppointment } from "../../lib/prisma/appointments";
import { Treatment } from "@prisma/client";
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
    breakTimeId: string | null;
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
      console.log("req.body", req.body);
      if (!availableSlot || !treatment || !user || !customerId || !date)
        return res.status(500).json("missing values");
      const { error } = validateAppointment({
        availableSlot,
        customerId: customerId,
        date: { appointmentDate: date },
        treatment,
        userId: user?.userId,
      });

      if (error) {
        const validationError = error?.details[0]?.message;
        console.log(validationError);
        return res.status(400).json(validationError);
      }

      const { userExist, err } = await getById(user.userId);
      if (!userExist?.Business || err)
        return res.status(500).json("user not found");

      const { existingAppointment, appointment, createErr } =
        await createAppointment(
          userExist.id,
          customerId,
          availableSlot,
          treatment.id,
          userExist.Business.id,
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
