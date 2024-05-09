export const onDataBinding = (e: Record<string, any>): void => {
  const items: Record<string, any>[] =
    (JSON.parse(e?.actual?.message) as Record<
      string,
      Record<string, any>[]
    >[]) || [];

  let scheduleData: Record<string, any>[] = [];
  if (items.length > 0) {
    for (const event of items) {
      // Check if the event is cancelled
      if (event?.status === "cancelled") {
        // Handle cancelled events here (if needed)
        continue; // Skip the current event and move to the next one
      }
      let when: string = event?.start?.dateTime as string;
      let start: string = event?.start?.dateTime as string;
      let end: string = event?.end?.dateTime as string;
      if (!when) {
        when = event?.start?.date as string;
        start = event?.start?.date as string;
        end = event?.end?.date as string;
      }

      const conferenceId = event?.extendedProperties?.private?.conferenceId
        ? event?.extendedProperties?.private?.conferenceId
        : "primary";

      scheduleData.push({
        Id: event?.id,
        status: event?.status,
        Subject: event?.summary,
        descripition: event?.description,
        StartTime: new Date(start),
        EndTime: new Date(end),
        IsAllDay: !event?.start?.dateTime,
        ConferenceId: [conferenceId],
        ExtendedProperties: event?.extendedProperties, // Include extended properties
      });
    }
  }
  console.log("scheduleData", scheduleData);

  e.result = scheduleData;
};
