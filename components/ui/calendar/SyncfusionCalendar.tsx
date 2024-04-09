"use client";
import "./schedule-component.css";
import React, { useState, useRef, useCallback } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  Inject,
  Resize,
  DragAndDrop,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import { Session } from "next-auth";
import NewEvent from "./NewEvent";
import EditEvent from "./EditEvent";
import {
  Account,
  ActivityDays,
  Business,
  Customer,
  Treatment,
  User,
} from "@prisma/client";
import { Browser, Internationalization, extend } from "@syncfusion/ej2-base";
import dayjs from "dayjs";

export type AdditionData = {
  service?: { label: string; value: string };
  customer?: { label: string; value: string };
};

const RecurrenceEvents = ({
  session,
  business,
  user,
}: {
  session: Session;
  business: Business & {
    Customer: Customer[];
    Treatment: Treatment[];
  };
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
}) => {
  const scheduleObj = useRef<ScheduleComponent>(null);
  const getTimeString = (value: any) => {
    return dayjs(value).format("h:mm");
  };
  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({
    dataSource: new DataManager({
      url: `http://localhost:3000/api/google/events?id=${session.user.accountId}`,
      headers: [{ Authorization: `Bearer ${session.user.access_token}` }],
      adaptor: new UrlAdaptor(),
      crudUrl: "http://localhost:3000/api/google/crud",
      crossDomain: true,
    }),
    editFollowingEvents: true,
    includeFiltersInQuery: true,
    fields: {
      id: "Id",
      subject: { name: "Subject" },
      isAllDay: { name: "IsAllDay" },
      location: { name: "Location" },
      description: { name: "Description" },
      startTime: { name: "StartTime" },
      endTime: { name: "EndTime" },
      startTimezone: { name: "StartTimezone" },
      endTimezone: { name: "EndTimezone" },
      recurrenceID: { name: "RecurrenceID" },
      recurrenceRule: { name: "RecurrenceRule" },
      recurrenceException: { name: "RecurrenceException" },
    },
  });

  const onDataBinding = (e: Record<string, any>): void => {
    const items: Record<string, any>[] =
      (JSON.parse(e.actual.message) as Record<
        string,
        Record<string, any>[]
      >[]) || [];
    let scheduleData: Record<string, any>[] = [];
    if (items.length > 0) {
      for (const event of items) {
        let when: string = event.start.dateTime as string;
        let start: string = event.start.dateTime as string;
        let end: string = event.end.dateTime as string;
        if (!when) {
          when = event.start.date as string;
          start = event.start.date as string;
          end = event.end.date as string;
        }
        scheduleData.push({
          Id: event.id,
          status: event.status,
          Subject: event.summary,
          descripition: event.description,
          StartTime: new Date(start),
          EndTime: new Date(end),
          IsAllDay: !event.start.dateTime,
          ExtendedProperties: event.extendedProperties, // Include extended properties
        });
      }
    }
    e.result = scheduleData;
  };

  const onPopupOpen = (args: any) => {
    if (!args?.data?.Guid && args?.type === "QuickInfo") {
      args.cancel = true; // Cancel the opening of the popup
      return; // Exit the function
    }
  };

  const editorTemplate = useCallback(
    (props: any) => {
      return props !== undefined && !props?.Guid ? (
        <NewEvent
          scheduleObj={scheduleObj}
          props={props}
          business={business}
          session={session}
          user={user}
        />
      ) : (
        <EditEvent
          scheduleObj={scheduleObj}
          props={props}
          business={business}
          session={session}
          user={user}
        />
      );
    },
    [session, business, user]
  );

  const onCellClick = (args: any) => {
    const startTime = new Date(args?.startTime); // Convert to Date object
    const currentTime = new Date(); // Current time
    if (startTime < currentTime || args?.isAllDay) {
      args.cancel = true; // Cancel the opening of the popup
      return; // Exit the function
    }
    scheduleObj.current?.openEditor(args, "Add");
    scheduleObj.current?.closeQuickInfoPopup();
  };
  const eventTemplate = (props: any) => {
    console.log("eventTemplateProps", props);

    return (
      <div
        className="template-wrap"
        style={{ background: props.SecondaryColor }}
      >
        <div
          className="subject flex flex-row flex-wrap justify-around items-center"
          style={{ background: props.PrimaryColor }}
        >
          <p className="font-semibold">
            {props?.ExtendedProperties?.private?.customerName || ""}{" "}
          </p>
          <p className="font-semibold">
            {getTimeString(props.StartTime)} -{getTimeString(props.EndTime)}
          </p>
        </div>
        {/*   <div className="time" style={{ background: props.PrimaryColor }}>
          Time: {getTimeString(props.StartTime)} -{getTimeString(props.EndTime)}
        </div> */}
        {/*  <div className="event-description">{props.Description}</div>
        <div
          className="footer"
          style={{ background: props.PrimaryColor }}
        ></div> */}
      </div>
    );
  };
  return (
    <div className="schedule-control-section">
      <div className="col-lg-9 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            width="100%"
            height="88vh"
            selectedDate={new Date()}
            ref={scheduleObj}
            eventSettings={eventSettings}
            dataBinding={onDataBinding}
            popupOpen={onPopupOpen}
            cellClick={onCellClick}
            editorTemplate={editorTemplate}
            editorFooterTemplate={() => <></>}
            showQuickInfo={true}
          >
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective eventTemplate={eventTemplate} option="Week" />
              <ViewDirective option="Month" />
            </ViewsDirective>
            <Inject services={[Day, Week, Month, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};

export default RecurrenceEvents;
