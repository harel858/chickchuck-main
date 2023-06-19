// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AvailableSlot } from "@prisma/client";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createAvailableSlots,
  getQueuesByMonth,
} from "@lib/prisma/ActivitySlots";
import {
  getById,
  updateActivityDays,
  updateActivityTime,
} from "@lib/prisma/users";

type SlotBody = {
  activityDays: number[];
  availableSlots: AvailableSlot[];
  userId: string;
  startActivity: string;
  endActivity: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const {
        activityDays,
        availableSlots,
        userId,
        startActivity,
        endActivity,
      } = req.body as SlotBody;

      const { userExist, err } = await getById(userId);
      if (err || !userExist) return res.status(500).json(`user not found`);
      const business = userExist.Business[0];

      const activityDaysChanged =
        JSON.stringify(activityDays.sort()) !==
        JSON.stringify(business.activityDays.sort());

      if (activityDaysChanged) {
        const { updateDaysFailed, updateDaysSuccess } =
          await updateActivityDays(business.id, activityDays);

        if (updateDaysFailed || !updateDaysSuccess)
          return res.status(500).json(`update Days Failed`);
      }

      const { availableSlot, slotFailed } = await createAvailableSlots(
        availableSlots,
        userId,
        business.id
      );
      console.log(availableSlot);
      if (slotFailed || !availableSlot)
        return res.status(500).json(`Create Available Slots Failed`);

      const { response, error } = await updateActivityTime(
        userId,
        startActivity,
        endActivity
      );
      if (error || !response) return res.status(500).json(`update Time Failed`);

      return res.status(200).json({ response, error });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  if (req.method === "GET") {
    try {
      const { chosenDate, userId, duration } = req.query as {
        chosenDate: string;
        userId: string;
        duration: string;
      };

      const date = dayjs(chosenDate);

      const { userExist, err } = await getById(userId);
      if (!userExist || err) return res.status(400).json("no existing user");
      console.log(chosenDate);
      const { availableSlots, availableSlotsErr } = await getQueuesByMonth(
        userId,
        date,
        JSON.parse(duration)
      );
      if (availableSlotsErr || !availableSlots)
        return res.status(500).json(err);

      return res.status(200).json(availableSlots);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}
