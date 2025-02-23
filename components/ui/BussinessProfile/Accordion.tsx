import React, { useCallback, useEffect, useState, useTransition } from "react";
import { CollapseProps, message } from "antd";
import { Collapse } from "antd";
import { ActivityDays, Business } from "@prisma/client";
import InitActivityDetails, { DayData } from "@ui/Init/InitActivityDetails";
import { Button } from "@ui/Button";
import updateActivityTime from "actions/updateActivityTime";
import BusinessDetailsForm from "./BusinessDetailsForm";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Accordion = ({
  business,
  locale,
}: {
  business: Business & { activityDays: ActivityDays[] };
  locale: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [activityDays, setActivityDays] = useState<DayData[]>([]);

  useEffect(() => {
    const labels: string[] = ["'א", "'ב", "'ג", "'ד", "'ה", "'ו", "'ש"];
    const initDays: DayData[] = business.activityDays.map((day) => {
      const lable = labels[day.day]!;
      return {
        end: day.end,
        isActive: day.isActive,
        value: day.day,
        start: day.start,
        label: lable,
      };
    });
    setActivityDays(initDays);
  }, []);
  async function saveActivityDays() {
    try {
      startTransition(
        async () => await updateActivityTime(business.id, activityDays)
      );
      message.success("זמני פעילות עודכנו בהצלחה");
    } catch (err: any) {
      console.log(err);
      message.error("פעולה נכשלה, אנא פנה לתמיכה");
    }
  }
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "זמני פעילות",
      children: (
        <div className="flex flex-col justify-center items-center gap-2">
          <InitActivityDetails
            locale={locale}
            setActivityDays={setActivityDays}
            activityDays={activityDays}
          />
          <Button isLoading={isPending} onClick={saveActivityDays}>
            שמור
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: "פרטי העסק",
      children: <BusinessDetailsForm business={business} />,
    },
    /* {
      key: "3",
      label: "הגדרות תורים",
      children: <AppointmentSettings business={business} />,
    } */
  ];
  return <Collapse className="bg-slate-100" accordion items={items} />;
};

export default Accordion;
