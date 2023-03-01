// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getById,
  updateActivityDays,
  updateActivityTime,
} from "../../../lib/prisma/users";
import { AvailableSlot } from "../../../types";

type SlotPostBody = {
  activityDays: number[];
  availableSlots: AvailableSlot[];
  id: string;
  startActivity: string;
  endActivity: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { activityDays, availableSlots, id, startActivity, endActivity } =
        req.body as SlotPostBody;

      const { userExist, err } = await getById(id);
      if (err || !userExist) return res.status(500).json(`user not found`);

      const activityDaysChanged =
        JSON.stringify(activityDays.sort()) !==
        JSON.stringify(userExist.activityDays.sort());

      console.log(activityDaysChanged);

      /*     if (activityDaysChanged) {
        const { updateDaysFailed, updateDaysSuccess } =
          await updateActivityDays(id, activityDays);
        if (updateDaysFailed || !updateDaysSuccess)
          return res.status(500).json(`update Days Failed`);
      }
 */
      const { response, error } = await updateActivityTime(
        id,
        startActivity,
        endActivity
      );
      return res.status(200).json({ response, error });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}
