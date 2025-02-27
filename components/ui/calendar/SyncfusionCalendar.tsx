"use client";
import "./tailwind.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
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
  Agenda,
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
import { DataSource } from "app/[locale]/(auth)/(business)/schedule/page";
import { onDataBinding } from "./utils/onDataBinding";
import { onCellClick } from "./utils/onCellClick";
import resourceHeaderTemplate from "./resourceHeaderTemplate";
import CustomHeaderTemplate from "./CustomHeaderTemplate";
import eventTemplate from "./eventTemplate";
import { onPopupOpen } from "./utils/onPopupOpen";
import { fields } from "./utils/eventSettings";
import { enableRtl, L10n, registerLicense } from "@syncfusion/ej2-base";
import { useLocale } from "use-intl";

if (process.env.NEXT_PUBLIC_SYNCFUSION_SECRET) {
  registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_SECRET);
} else {
  console.error("Syncfusion license key is not defined");
}

// ✅ תבנית מותאמת אישית להצגת השעות
const timeTemplate = (props: any) => {
  const dateObj = new Date(props?.date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const isMajor = minutes === 0; // האם זו שעה עגולה?

  return (
    <div className={`${isMajor ? "font-bold" : "font-normal"}`}>
      {dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </div>
  );
};

// ✅ הגדרת תרגום לפורמט השעות
L10n.load({
  en: {
    schedule: {
      timeScale: {
        majorSlotTemplate: timeTemplate, // תבנית לשעות עגולות
        minorSlotTemplate: timeTemplate, // תבנית לרבעי שעה
      },
    },
  },
});
// ✅ הפעלת RTL לכל הקומפוננטות
enableRtl(true);

export type AdditionData = {
  service?: { label: string; value: string };
  customer?: { label: string; value: string };
};

// ✅ קומפוננטה ראשית
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
  const [timeScale, setTimeScale] = useState({
    enable: true,
    interval: 30,
    slotCount: 2,
    majorSlotTemplate: timeTemplate,
    minorSlotTemplate: timeTemplate,
  });

  const locale = useLocale();
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

  // ✅ התאמת `timeScale` בהתאם לגודל המסך
  useEffect(() => {
    const updateScale = () => {
      const newTimeScale =
        window.innerWidth < 768
          ? {
              enable: true,
              interval: 30,
              slotCount: 2,
              majorSlotTemplate: timeTemplate,
              minorSlotTemplate: timeTemplate,
            }
          : {
              enable: true,
              interval: 15,
              slotCount: 4,
              majorSlotTemplate: timeTemplate,
              minorSlotTemplate: timeTemplate,
            };

      setTimeScale(newTimeScale);
      console.log("Updated timeScale:", newTimeScale); // בדיקה אם הערך מתעדכן
    };

    window.addEventListener("resize", updateScale);
    updateScale(); // הפעלת הפונקציה מיד בעת טעינת העמוד

    return () => window.removeEventListener("resize", updateScale);
  }, []);

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
            timeFormat="HH:mm"
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
            workHours={{ start: "08:00", end: "18:00" }}
            workDays={[0, 1, 2, 3, 4, 5, 6]} // כל הימים נחשבים ימי עבודה
            timeScale={timeScale}
            allowDragAndDrop
            allowResizing
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
              <ViewDirective eventTemplate={eventTemplate} option="Day" />
              <ViewDirective eventTemplate={eventTemplate} option="Week" />
              <ViewDirective eventTemplate={eventTemplate} option="Month" />
            </ViewsDirective>
            <Inject
              services={[Day, Week, Month, Agenda, Resize, DragAndDrop]}
            />
          </ScheduleComponenta>
        </div>
      </div>
    </div>
  );
};

export default RecurrenceEvents;
