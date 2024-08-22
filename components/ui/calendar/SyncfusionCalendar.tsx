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
  EventSettingsModel,
  ResourcesDirective,
  ResourceDirective,
  Schedule,
  Resize,
  DragAndDrop,
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
import { enableRtl, L10n } from "@syncfusion/ej2-base";
import he from "./he.json";
import axios from "axios";

export type AdditionData = {
  service?: { label: string; value: string };
  customer?: { label: string; value: string };
};

const ScheduleComponenta = React.forwardRef(
  (props: any, ref: React.Ref<Schedule>) => {
    L10n.load({
      en: {
        schedule: {
          day: "יום",
          week: "שבוע",
          workWeek: "שבוע עבודה",
          month: "חודש",
          agenda: "סדר יום",
          weekAgenda: "סדר יום שבועי",
          workWeekAgenda: "סדר יום לשבוע עבודה",
          monthAgenda: "סדר יום חודשי",
          today: "היום",
          noEvents: "אין אירועים",
          emptyContainer: "אין אירועים מתוכננים ליום זה.",
          allDay: "כל היום",
          start: "התחלה",
          end: "סיום",
          more: "עוד",
          close: "סגור",
          cancel: "ביטול",
          noTitle: "(ללא כותרת)",
          delete: "מחק",
          deleteEvent: "אירוע זה",
          deleteMultipleEvent: "מחק מספר אירועים",
          selectedItems: "פריטים נבחרים",
          deleteSeries: "סדרה מלאה",
          edit: "ערוך",
          editSeries: "סדרה מלאה",
          editEvent: "אירוע זה",
          createEvent: "צור",
          subject: "נושא",
          addTitle: "הוסף כותרת",
          moreDetails: "פרטים נוספים",
          save: "שמור",
          editContent: "כיצד ברצונך לשנות את המפגש בסדרה?",
          deleteContent: "האם אתה בטוח שברצונך למחוק את האירוע הזה?",
          deleteMultipleContent:
            "האם אתה בטוח שברצונך למחוק את האירועים שנבחרו?",
          newEvent: "אירוע חדש",
          title: "כותרת",
          location: "מיקום",
          description: "תיאור",
          timezone: "אזור זמן",
          startTimezone: "אזור זמן התחלה",
          endTimezone: "אזור זמן סיום",
          repeat: "חזור",
          saveButton: "שמור",
          cancelButton: "ביטול",
          deleteButton: "מחק",
          recurrence: "הופעה חוזרת",
          wrongPattern: "תבנית החזרה אינה תקפה.",
          seriesChangeAlert:
            "האם ברצונך לבטל את השינויים שבוצעו במקרים מסוימים של הסדרה הזו ולחברם שוב עם כל הסדרה?",
          createError:
            "משך הזמן של האירוע חייב להיות קצר יותר מתדירות ההופעה. קיצר את משך הזמן או שנה את תבנית החזרה בעורך האירועים החוזרים.",
          sameDayAlert: "שתי הופעות של אותו אירוע לא יכולות להתרחש באותו יום.",
          editRecurrence: "ערוך הופעה חוזרת",
          repeats: "חוזר",
          alert: "התראה",
          startEndError: "התאריך הנבחר לסיום קורה לפני תאריך ההתחלה.",
          invalidDateError: "הערך שהוזן לתאריך אינו תקף.",
          blockAlert: "לא ניתן לתכנן אירועים בטווח הזמן החסום.",
          ok: "אישור",
          yes: "כן",
          no: "לא",
          occurrence: "התרחשות",
          series: "סדרה",
          previous: "קודם",
          next: "הבא",
          timelineDay: "יום קו זמן",
          timelineWeek: "שבוע קו זמן",
          timelineWorkWeek: "שבוע עבודה בקו זמן",
          timelineMonth: "חודש קו זמן",
          timelineYear: "שנת קו זמן",
          editFollowingEvent: "ערוך אירועים עוקבים",
          deleteTitle: "מחק אירוע",
          editTitle: "ערוך אירוע",
          beginFrom: "התחל מ",
          endAt: "סיים ב",
        },
        recurrenceeditor: {
          none: "אין",
          daily: "יומי",
          weekly: "שבועי",
          monthly: "חודשי",
          month: "חודש",
          yearly: "שנתי",
          never: "לעולם לא",
          until: "עד",
          count: "ספירה",
          first: "ראשון",
          second: "שני",
          third: "שלישי",
          fourth: "רביעי",
          last: "אחרון",
          repeat: "חזור",
          repeatEvery: "חזור כל",
          on: "חזור ב",
          end: "סיום",
          onDay: "יום",
          days: "ימים)",
          weeks: "שבועות)",
          months: "חודשים)",
          years: "שנים)",
          every: "כל",
          summaryTimes: "פעמים)",
          summaryOn: "ב",
          summaryUntil: "עד",
          summaryRepeat: "חוזר",
          summaryDay: "ימים)",
          summaryWeek: "שבועות)",
          summaryMonth: "חודשים)",
          summaryYear: "שנים)",
          monthWeek: "שבוע חודש",
          monthPosition: "מיקום חודש",
          monthExpander: "מאריך חודש",
          yearExpander: "מאריך שנה",
          repeatInterval: "מרווח חזרה",
        },
        calendar: {
          today: "היום",
          weekHeader: "שבוע",
          firstDayOfWeek: 0, // Sunday as the first day of the week
          months: {
            names: [
              "ינואר",
              "פברואר",
              "מרץ",
              "אפריל",
              "מאי",
              "יוני",
              "יולי",
              "אוגוסט",
              "ספטמבר",
              "אוקטובר",
              "נובמבר",
              "דצמבר",
            ],
            namesAbbr: [
              "ינו",
              "פבר",
              "מרץ",
              "אפר",
              "מאי",
              "יונ",
              "יול",
              "אוג",
              "ספט",
              "אוק",
              "נוב",
              "דצמ",
            ],
          },
          days: {
            names: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
            namesAbbr: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
            namesShort: ["א", "ב", "ג", "ד", "ה", "ו", "ש"],
          },
        },
        datepicker: {
          placeholder: "בחר תאריך",
          today: "היום",
        },
        timepicker: {
          placeholder: "בחר זמן",
        },
        datetimepicker: {
          placeholder: "בחר תאריך ושעה",
          today: "היום",
        },
      },
    });
    // Enables Right to left alignment for all controls
    enableRtl(true);
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
            timeScale={timeScale}
            allowDragAndDrop
            allowResizing
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
            <Inject services={[Day, Week, Month, Resize, DragAndDrop]} />
          </ScheduleComponenta>
        </div>
      </div>
    </div>
  );
};

export default RecurrenceEvents;
