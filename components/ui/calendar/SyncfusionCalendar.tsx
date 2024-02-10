"use client";
import React, { useState, useRef, useCallback } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  EventRenderedArgs,
  Inject,
  Resize,
  DragAndDrop,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import "./schedule-component.css";
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
export type AdditionData = {
  service?: { label: string; value: string };
  customer?: { label: string; value: string };
};
function applyCategoryColor(args: any, currentView: any) {
  let categoryColor = args.data.CategoryColor;
  if (!args.element || !categoryColor) {
    return;
  }
  if (currentView === "Agenda") {
    args.element.firstChild.style.borderLeftColor = categoryColor;
  } else {
    args.element.style.backgroundColor = categoryColor;
  }
}

const RecurrenceEvents = ({
  session,
  business,
  user,
}: {
  session: Session;
  business: Business & {
    Customer: Customer[];
  };
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
}) => {
  const scheduleObj = useRef<ScheduleComponent>(null);
  let newEvent: any = null;
  const dataManagerConfig = {
    url: `http://localhost:3000/api/google/events?id=${session.user.accountId}`,
    headers: [{ Authorization: `Bearer ${session.user.access_token}` }],
    adaptor: new UrlAdaptor(),
    crudUrl: "http://localhost:3000/api/google/crud",
    crossDomain: true,
  };
  const dataManager = new DataManager(dataManagerConfig);

  const [editEvent, setEditEvent] = useState<string | null>(null);

  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({
    dataSource: dataManager,
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
    console.log("items", items);

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
          isBlock: true,
          IsAllDay: !event.start.dateTime,
          ExtendedProperties: event.extendedProperties, // Include extended properties
        });
      }
    }
    e.result = scheduleData;
  };

  const onEventRendered = (args: EventRenderedArgs): void => {
    scheduleObj.current &&
      applyCategoryColor(args, scheduleObj.current.currentView);
  };
  const onPopupOpen = (args: any) => {
    console.log("args", args);

    const startTime = new Date(args.StartTime); // Convert to Date object
    const currentTime = new Date(); // Current time

    // Check if the start time is in the past
    if (startTime < currentTime) {
      args.cancel = true; // Cancel the opening of the popup
      return; // Exit the function
    }

    if (args.type === "Editor") {
      let statusElement = args.element.querySelector("#EventType");
      let footerElement = args.element.querySelector(
        ".e-footer-content"
      ) as HTMLElement;
      if (footerElement) footerElement.className = "hidden";
      if (statusElement) {
        statusElement.setAttribute("name", "EventType");
      }
    }
  };

  const editorTemplate = useCallback((props: any) => {
    console.log("props", props);

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
        setEditEvent={setEditEvent}
        editEvent={editEvent}
      />
    );
  }, []);
  const onActionBegin = (args: any): void => {
    console.log("args", args);

    if (args.requestType === "eventCreate") {
      const eventData = {
        id: args.data.Id,
        subject: args.data.Subject,
        customField: newEvent,
      };
      args.addedRecords = eventData;
    }
  };

  const onCellClick = (args: any) => {
    scheduleObj.current?.openEditor(args, "Add");
  };
  const onEventClick = (args: any) => {
    if (!args.event.RecurrenceRule) {
      scheduleObj.current?.openEditor(args.event, "Save");
    } else {
      scheduleObj.current?.quickPopup.openRecurrenceAlert();
    }
  };
  return (
    <div className="schedule-control-section">
      <div className="col-lg-9 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            width="100%"
            height="87vh"
            selectedDate={new Date()}
            eventClick={onEventClick}
            ref={scheduleObj}
            eventSettings={eventSettings}
            eventRendered={onEventRendered}
            dataBinding={onDataBinding}
            popupOpen={onPopupOpen}
            cellClick={onCellClick}
            editorTemplate={editorTemplate}
            showQuickInfo={false}
            actionBegin={onActionBegin}
          >
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
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
