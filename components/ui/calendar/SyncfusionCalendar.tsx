"use client";
import "./schedule-component.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
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
  ResourcesDirective,
  ResourceDirective,
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
import dayjs from "dayjs";
import { AnyARecord } from "dns";
import { UserOutlined } from "@ant-design/icons";
import { DataSource } from "@app/(business)/schedule/page";

export type AdditionData = {
  service?: { label: string; value: string };
  customer?: { label: string; value: string };
};

const RecurrenceEvents = ({
  session,
  business,
  user,
  resourceData,
  calendarsIds,
}: {
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
  const scheduleObj = useRef<ScheduleComponent>(null);
  const getTimeString = (value: any) => {
    return dayjs(value).format("h:mm");
  };
  console.log("calendarsIds", calendarsIds);
  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({
    dataSource: new DataManager({
      url: `http://localhost:3000/api/google/events?id=${
        session.user.accountId
      }&calendarsIds=${JSON.stringify(calendarsIds)}`,
      headers: [{ Authorization: `Bearer ${session.user.access_token}` }],
      adaptor: new UrlAdaptor(),
      crudUrl: "http://localhost:3000/api/google/crud",
      crossDomain: true,
    }),
    editFollowingEvents: true,
    includeFiltersInQuery: true,
    fields: {
      id: "Id",
      subject: { name: "Subject", title: "Conference Name" },
      isAllDay: { name: "IsAllDay" },
      location: { name: "Location" },
      description: { name: "Description", title: "Summary" },
      startTime: { name: "StartTime" },
      endTime: { name: "EndTime" },
      startTimezone: { name: "StartTimezone" },
      endTimezone: { name: "EndTimezone" },
      recurrenceID: { name: "RecurrenceID" },
      recurrenceRule: { name: "RecurrenceRule" },
      recurrenceException: { name: "RecurrenceException" },
    },
  });

  console.log("eventSettings.dataSource", eventSettings.dataSource);

  const getEmployeeName = (value: any) => {
    return value.resourceData
      ? value.resourceData[value.resource.textField]
      : value.resourceName;
  };

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
        console.log("event", event);
        const conferenceId = event?.extendedProperties?.private?.conferenceId
          ? event.extendedProperties.private.conferenceId
          : "primary";

        scheduleData.push({
          Id: event.id,
          status: event.status,
          Subject: event.summary,
          descripition: event.description,
          StartTime: new Date(start),
          EndTime: new Date(end),
          IsAllDay: !event.start.dateTime,
          ConferenceId: [conferenceId],
          ExtendedProperties: event.extendedProperties, // Include extended properties
        });
      }
    }
    console.log("scheduleData", scheduleData);

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
      console.log("editorTemplateprops", props);
      if (!props.ConferenceId) return;

      const ConferenceId = props.ConferenceId[0] as string;
      console.log("ConferenceId", ConferenceId);

      return props !== undefined && !props?.Guid ? (
        <NewEvent
          scheduleObj={scheduleObj}
          props={props}
          business={business}
          session={session}
          user={user}
          ConferenceId={ConferenceId}
        />
      ) : (
        <EditEvent
          scheduleObj={scheduleObj}
          props={props}
          business={business}
          session={session}
          user={user}
          conferenceId={ConferenceId}
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
      </div>
    );
  };

  const resourceHeaderTemplate = (props: any) => {
    console.log("props", props);

    return (
      <div className="template-wrap flex justify-center items-center flex-wrap gap-2">
        <div className={"resource-image "}>
          <UserOutlined className="text-2xl" />
        </div>
        <div className="resource-details">
          <div className="resource-name font-bold text-xl">
            {getEmployeeName(props)}
          </div>
          {/*           <div className="resource-designation">חבר צוות</div>
           */}{" "}
        </div>
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
            resourceHeaderTemplate={resourceHeaderTemplate}
            group={{ allowGroupEdit: true, resources: ["Conferences"] }}
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
