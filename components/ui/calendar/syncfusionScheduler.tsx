"use client";
import "./tailwind.css";

import React, { useState, useRef, useCallback } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  Inject,
  EventSettingsModel,
  ResourcesDirective,
  ResourceDirective,
  Resize,
  DragAndDrop,
  Schedule,
} from "@syncfusion/ej2-react-schedule";

import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import { Session } from "next-auth";
import {
  Account,
  ActivityDays,
  Business,
  Customer,
  Treatment,
  User,
} from "@prisma/client";
import { DataSource } from "app/[locale]/(auth)/(business)/schedule/page";
import { useLocale } from "use-intl";
import { registerLicense } from "@syncfusion/ej2-base";

if (process.env.NEXT_PUBLIC_SYNCFUSION_SECRET) {
  registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_SECRET);
} else {
  console.error("Syncfusion license key is not defined");
}

export type AdditionData = {
  service?: { label: string; value: string };
  customer?: { label: string; value: string };
};

const ScheduleComponenta = React.forwardRef(
  (props: any, ref: React.Ref<Schedule>) => {
    return <ScheduleComponent {...props} />;
  }
);

const RecurrenceEvents = ({
  session,
  business,
  user,
  resourceData,
  calendarsIds,
  access_token,
}: {
  access_token: string;
  session: Session;
  business: Business & {
    Customer: Customer[];
    Treatment: Treatment[];
    user: User[];
  };
  calendarsIds: string[];
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
  resourceData: DataSource[];
}) => {
  const locale = useLocale();
  const scheduleObj = useRef<ScheduleComponent>(null);

  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({
    dataSource: new DataManager({
      url: `/api/google/events?id=${
        session.user.accountId
      }&calendarsIds=${JSON.stringify(calendarsIds)}`,
      headers: [{ Authorization: `Bearer ${access_token}` }],
      adaptor: new UrlAdaptor(),
      crossDomain: true,
    }),
    fields: {
      subject: { name: "Subject", default: "No Title" },
      startTime: { name: "StartTime" },
      endTime: { name: "EndTime" },
    },
  });

  const timeScale = { enable: true, interval: 60, slotCount: 6 };

  return (
    <div className="schedule-control-section">
      <div className="col-lg-9 control-section">
        <div className="control-wrapper">
          <ScheduleComponenta
            width="100%"
            height="100vh"
            selectedDate={new Date()}
            timeFormat="hh:mm a"
            ref={scheduleObj}
            eventSettings={eventSettings}
            timeScale={timeScale}
            enableRtl
            locale="en"
          >
            <ResourcesDirective>
              <ResourceDirective
                field="ConferenceId"
                title="Attendees"
                name="Conferences"
                allowMultiple={true}
                dataSource={resourceData}
                textField="Text"
                idField="Id"
                colorField="Color"
              />
            </ResourcesDirective>
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="Month" />
            </ViewsDirective>
            <Inject services={[Day, Week, Month, Resize, DragAndDrop]} />
          </ScheduleComponenta>
        </div>
      </div>
    </div>
  );
};

export default RecurrenceEvents;
