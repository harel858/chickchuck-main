"use client";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { useEffect } from "react";
import { Session } from "next-auth";
import {
  ScheduleComponent,
  ViewsDirective,
  Inject,
  Day,
  WorkWeek,
  Month,
  Week,
  Agenda,
  ViewDirective,
  NavigatingEventArgs,
  ActionEventArgs,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
/**
 * schedule google calendar integration sample
 */

const CalendarIntegration = ({ session }: { session: Session }) => {
  let calendarId: string = "primary";
  let publicKey: string = "AIzaSyCXih7Ziti69CcVIh1w8gZh28N3W5ipbF4";
  let dataManger: DataManager = new DataManager({
    url:
      "https://www.googleapis.com/calendar/v3/calendars/" +
      calendarId +
      "/events?key=" +
      publicKey,
    headers: [
      {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    ], // Add the access token as an Authorization header
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  const onDataBinding = (e: Record<string, any>): void => {
    let items: Record<string, any>[] = ((
      e.result as Record<string, Record<string, any>[]>
    ).items = []);
    let scheduleData: Record<string, any>[] = [];
    if (items.length > 0) {
      for (let event of items) {
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
          Subject: event.summary,
          StartTime: new Date(start),
          EndTime: new Date(end),
          IsAllDay: !event.start.dateTime,
        });
      }
    }
    e.result = scheduleData;
  };
  const onNavigating = (args: NavigatingEventArgs): void => {
    console.log("args", args);
  };

  const onActionComplete = (args: ActionEventArgs): void => {
    console.log("args", args);
  };

  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper drag-sample-wrapper">
          <div className="schedule-container">
            <ScheduleComponent
              width="100%"
              height="88.5vh"
              readonly={false}
              eventSettings={{
                dataSource: dataManger,
                editFollowingEvents: true,
              }}
              dataBinding={onDataBinding}
              currentView="Month"
              timezone="UTC"
              navigating={onNavigating}
              actionComplete={onActionComplete}
              actionFailure={async (actionFailureProps) => {
                console.log("actionFailureProps", actionFailureProps);
              }}
            >
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  WorkWeek,
                  Month,
                  Agenda,
                  Resize,
                  DragAndDrop,
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CalendarIntegration;
