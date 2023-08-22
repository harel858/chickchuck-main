import React, { useCallback, useEffect, useState } from "react";
import { Appointment, AppointmentSlot, Treatment } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import SearchByDate from "./SearchByDate";
import NoClients from "../NoClients";
import HistoryItem from "./HistoryItem";
import LargeHeading from "@ui/LargeHeading";
import { FaHistory } from "react-icons/fa";

export default function History({
  appointments,
}: {
  appointments: (Appointment & {
    treatment: Treatment;
    appointmentSlot: AppointmentSlot;
  })[];
}) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<dayjs.Dayjs | null>(null);
  const [searchResult, setSearchResult] = useState<
    (Appointment & {
      treatment: Treatment;
      appointmentSlot: AppointmentSlot;
    })[]
  >([]);
  useEffect(() => {
    if (!searchQuery) return;
    const handleSearch = () => {
      setLoading(true);
      const filteredEvents = appointments.filter(
        (appointment) =>
          appointment.appointmentSlot.date === searchQuery.format("DD/MM/YYYY")
      );
      setSearchResult(filteredEvents);
      return setLoading(false); // Set isLoading to false after fetching data
    };
    handleSearch();
  }, [searchQuery]);
  const onSearchChange = useCallback(
    (value: Dayjs) => {
      console.log(value);

      setSearchQuery(value);
    },
    [searchQuery, setSearchQuery]
  );

  return (
    <div className="w-full flex flex-col justify-start items-center h-80 overflow-x-hidden overflow-y-auto gap-10">
      <div className="flex flex-col justify-center items-center gap-3">
        <h2 className="text-2xl font-serif font-semibold flex flex-row items-center justify-center gap-2">
          Service Records
          <FaHistory className="text-2xl" />
        </h2>
        <SearchByDate
          onSearchChange={onSearchChange}
          searchQuery={searchQuery}
        />
      </div>
      {searchQuery && searchResult.length > 0 ? (
        searchResult.map((appointment) => (
          <ul className="flex flex-col items-center justify-center w-full">
            <HistoryItem appointment={appointment} />
          </ul>
        ))
      ) : searchQuery && searchResult.length == 0 ? (
        <ul className="flex flex-col items-center justify-center w-1/3">
          <NoClients title={`No Appointments For This Date`} />
        </ul>
      ) : (
        <>
          {appointments.map((appointment) => (
            <ul className="flex flex-col items-center justify-center w-full">
              <HistoryItem appointment={appointment} />
            </ul>
          ))}
        </>
      )}
    </div>
  );
}
