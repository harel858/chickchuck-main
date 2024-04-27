import { FieldModel } from "@syncfusion/ej2-react-schedule";

export const fields: FieldModel = {
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
};
