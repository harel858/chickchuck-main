// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getById } from "../../lib/prisma/users";
import { getTreatmentById } from "../../lib/prisma/treatment";
import validateAppointment from "../../lib/validation/appointmentValidation";
import { AppointmentInput, UserData } from "../../types";
import { createAppointment } from "../../lib/prisma/appointments";
import { AvailableSlot, Customer, Treatment } from "@prisma/client";

interface ReqBody {
  availableSlot: AvailableSlot[];
  customer: Customer;
  date: string;
  treatment: Treatment;
  userData: UserData;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { availableSlot, customer, date, treatment, userData } =
        req.body as ReqBody;
      console.log(`date:${date}`);
      if (customer && treatment) {
        const { appointment, createErr } = await createAppointment(
          customer.id,
          availableSlot,
          treatment?.id,
          null,
          date
        );
        console.log(appointment);
        console.log(createErr);
        if (appointment) return res.status(200).json(appointment);
        return res.status(500).json("error with the appointment function");
      }
      return res.status(400).json("missing values");
    } catch (err) {
      return res.status(500).json(`server error`);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}
