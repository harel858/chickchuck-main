import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";

export const onCellClick = (
  args: any,
  scheduleObj: React.RefObject<ScheduleComponent> // Define scheduleObj prop
) => {
  const startTime = new Date(args?.startTime); // Convert to Date object
  const currentTime = new Date(); // Current time
  if (startTime < currentTime || args?.isAllDay) {
    args.cancel = true; // Cancel the opening of the popup
    return; // Exit the function
  }
  scheduleObj.current?.openEditor(args, "Add");
  scheduleObj.current?.closeQuickInfoPopup();
};
