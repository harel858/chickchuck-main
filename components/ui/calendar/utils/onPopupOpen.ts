import dayjs from "dayjs";

export const onPopupOpen = (args: any) => {
  if (!args?.data?.Guid && args?.type === "QuickInfo") {
    args.cancel = true; // Cancel the opening of the popup
    return; // Exit the function
  }

  if (
    args.type === "QuickInfo" &&
    args.target.classList.contains("e-appointment")
  ) {
    return; // אם זה אירוע קיים, אל תשנה את זה
  }

  // הגדרת ברירת מחדל לכותרת
  args.data.Subject = `📅 אירוע חדש - ${dayjs(args.data.StartTime).format(
    "HH:mm"
  )}`;
};
