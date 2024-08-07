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
  EventSettingsModel,
  ResourcesDirective,
  ResourceDirective,
  Schedule,
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
import { DataSource } from "@app/(business)/schedule/page";
import { onDataBinding } from "./utils/onDataBinding";
import { onCellClick } from "./utils/onCellClick";
import resourceHeaderTemplate from "./resourceHeaderTemplate";
import CustomHeaderTemplate from "./CustomHeaderTemplate";
import eventTemplate from "./eventTemplate";
import { onPopupOpen } from "./utils/onPopupOpen";
import { fields } from "./utils/eventSettings";
import { enableRtl } from "@syncfusion/ej2-base";
// Enables Right to left alignment for all controls
enableRtl(true);
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
  const scheduleObj = useRef<ScheduleComponent>(null);

  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({
    dataSource: new DataManager({
      url: `/api/google/events?id=${
        session.user.accountId
      }&calendarsIds=${JSON.stringify(calendarsIds)}`,
      headers: [{ Authorization: `Bearer ${access_token}` }],
      adaptor: new UrlAdaptor(),
      crudUrl: `/api/google/crud`,
      crossDomain: true,
    }),
    editFollowingEvents: true,
    includeFiltersInQuery: true,
    fields: fields,
  });

  const editorTemplate = useCallback(
    (props: any) => {
      let ConferenceId = props.ConferenceId?.[0] || "primary";

      return props !== undefined && !props?.Guid ? (
        <NewEvent
          ref={scheduleObj}
          props={props}
          business={business}
          session={session}
          user={user}
          ConferenceId={ConferenceId}
          access_token={access_token}
        />
      ) : (
        <EditEvent
          ref={scheduleObj}
          props={props}
          business={business}
          session={session}
          user={user}
          conferenceId={ConferenceId}
          access_token={access_token}
        />
      );
    },
    [session, business, user]
  );
  const timeScale = { enable: true, interval: 60, slotCount: 6 };
  const onDataBindingCallBack = useCallback(
    (e: Record<string, any>) => onDataBinding(e),
    []
  );
  return (
    <div className="schedule-control-section">
      <div className="col-lg-9 control-section">
        <div className="control-wrapper">
          <ScheduleComponenta
            width="100%"
            height="100vh"
            selectedDate={new Date()}
            ref={scheduleObj}
            eventSettings={eventSettings}
            dataBinding={onDataBindingCallBack}
            popupOpen={onPopupOpen}
            cellClick={(props: any) => onCellClick(props, scheduleObj)}
            editorTemplate={editorTemplate}
            editorFooterTemplate={() => <></>}
            showQuickInfo={true}
            resourceHeaderTemplate={resourceHeaderTemplate}
            group={{ allowGroupEdit: true, resources: ["Conferences"] }}
            enableRtl
            timeScale={timeScale}
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
              <ViewDirective
                eventTemplate={eventTemplate}
                dateHeaderTemplate={CustomHeaderTemplate}
                option="Day"
              />
              <ViewDirective
                eventTemplate={eventTemplate}
                option="Week"
                dateHeaderTemplate={CustomHeaderTemplate}
              />
              <ViewDirective
                eventTemplate={eventTemplate}
                dateHeaderTemplate={CustomHeaderTemplate}
                option="Month"
              />
            </ViewsDirective>
            <Inject services={[Day, Week, Month]} />
          </ScheduleComponenta>
        </div>
      </div>
    </div>
  );
};

export default RecurrenceEvents;
