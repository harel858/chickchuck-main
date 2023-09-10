// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AvailableSlot } from "@prisma/client";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createAvailableSlots,
  createUserAvailableSlots,
  getQueuesByMonth,
} from "@lib/prisma/ActivitySlots";
import {
  getById,
  updateActivityDays,
  updateActivityTime,
  updateUserActivityDays,
  updateUserActivityTime,
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
      console.log("availableSlots", availableSlots);

      //find user
      const { userExist, err } = await getById(userId);
      if (!userExist?.Business || err)
        return res.status(500).json(`user not found`);

      const { Business } = userExist;

      //check if activity days has changed
      const activityDaysChanged =
        JSON.stringify(activityDays.sort()) !==
        JSON.stringify(userExist.activityDays.sort());

      if (activityDaysChanged) {
        const { updateDaysFailed, updateDaysSuccess } =
          await updateUserActivityDays(userExist.id, activityDays);

        if (updateDaysFailed || !updateDaysSuccess)
          return res.status(500).json(`update Days Failed`);
      }

      const { createdSlots, slotFailed } = await createUserAvailableSlots(
        availableSlots,
        userId,
        Business.id
      );

      if (slotFailed || !createdSlots)
        return res.status(500).json(`Create Available Slots Failed`);

      const { response, error } = await updateUserActivityTime(
        userExist.id,
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
      const { availableSlots, error } = await getQueuesByMonth(
        userId,
        date,
        parseInt(duration)
      );
      if (error || !availableSlots) return res.status(500).json(err);

      return res.status(200).json(availableSlots);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}
