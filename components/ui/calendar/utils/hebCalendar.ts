import { PickerLocale } from "antd/es/date-picker/generatePicker";

export const hebrewClendar: PickerLocale = {
  lang: {
    locale: "he",
    placeholder: "בחר תאריך",
    rangePlaceholder: ["תאריך התחלה", "תאריך סיום"],
    today: "היום",
    now: "עכשיו",
    backToToday: "חזרה להיום",
    ok: "אישור",
    clear: "נקה",
    month: "חודש",
    year: "שנה",
    timeSelect: "בחר שעה",
    dateSelect: "בחר תאריך",
    monthSelect: "בחר חודש",
    yearSelect: "בחר שנה",
    decadeSelect: "בחר תקופה",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "Previous month (PageUp)",
    nextMonth: "Next month (PageDown)",
    previousYear: "Last year (Control + left)",
    nextYear: "Next year (Control + right)",
    previousDecade: "Last decade",
    nextDecade: "Next decade",
    previousCentury: "Last century",
    nextCentury: "Next century",
    shortWeekDays: ["'א", "'ב", "'ג", "'ד", "'ה", "'ו", "'ש"],
    shortMonths: [
      "'ינו",
      "'פבר",
      "מרץ",
      "'אפר",
      "מאי",
      "יוני",
      "יולי",
      "'אוג",
      "'ספט",
      "'אוק",
      "'נוב",
      "'דצמ",
    ],
  },
  timePickerLocale: {
    placeholder: "בחר זמן",
  },
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
};
