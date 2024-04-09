import React, { useState, useTransition } from "react";
import TextArea from "antd/es/input/TextArea";
import { Button } from "@ui/Button";
import { updateEvent } from "actions/updateEvent";
import { calendar_v3 } from "googleapis";
import { Session } from "next-auth";
import { message } from "antd";

const DescriptionForm = ({
  item,
  session,
}: {
  item: calendar_v3.Schema$Event;
  session: Session;
}) => {
  const [description, setDescription] = useState<string>(
    item?.description || ""
  );
  const [isPending, startTransition] = useTransition();

  const eventProps = {
    id: item.id || "",
    summary: item?.summary || "",
    description: description || "",
    start: {
      dateTime: item?.start?.dateTime || "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: item?.end?.dateTime || "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    extendedProperties: {
      private: {
        customerId: item?.extendedProperties?.private?.customerId || "",
        treatmentId: item?.extendedProperties?.private?.treatmentId || "",
        customerName: item?.extendedProperties?.private?.customerName || "",
      },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    startTransition(() => {
      updateEvent(session.user.access_token, eventProps).then(() => {
        message.success("הערה נרשמה בהצלחה");
      });
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 pb-3">
      <TextArea
        rows={3}
        placeholder="מקסימום 255 תווים"
        maxLength={255}
        value={description}
        onChange={handleChange}
        defaultValue={item.description || ""}
      />
      <Button type="button" onClick={handleSubmit} isLoading={isPending}>
        שמור
      </Button>
    </div>
  );
};

export default DescriptionForm;
