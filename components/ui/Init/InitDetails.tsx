"use client";
import React, { useState } from "react";
import { Space, Table, Switch, TimePicker } from "antd";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { ActivityDays } from "@prisma/client";

interface DataType {
  key: number;
  Days: React.ReactNode;
  start: React.ReactNode;
  end: React.ReactNode;
  isActive: boolean;
}

interface DayData {
  value: number;
  label: string;
  start: string;
  end: string;
  isActive: boolean;
}

function InitDetails() {
  const days: DayData[] = [
    { value: 0, label: "Su", start: "09:00", end: "17:00", isActive: true },
    { value: 1, label: "Mo", start: "09:00", end: "17:00", isActive: true },
    { value: 2, label: "Tu", start: "09:00", end: "17:00", isActive: true },
    { value: 3, label: "We", start: "09:00", end: "17:00", isActive: true },
    { value: 4, label: "Mo", start: "09:00", end: "17:00", isActive: true },
    { value: 5, label: "Fr", start: "09:00", end: "17:00", isActive: true },
    { value: 6, label: "Sa", start: "09:00", end: "17:00", isActive: true },
  ];

  const [activityDays, setActivityDays] = useState<DayData[]>(days);
  console.log("activityDays", activityDays);

  const format = "HH:mm";

  const setStartTime = (time: dayjs.Dayjs, value: number) => {
    const newDays = activityDays.map((currentDay) =>
      currentDay.value === value
        ? { ...currentDay, start: time.toISOString() }
        : currentDay
    );

    setActivityDays(newDays);
  };
  const setEndTime = (time: dayjs.Dayjs, value: number) => {
    const newDays = activityDays.map((currentDay) =>
      currentDay.value === value
        ? { ...currentDay, end: time.toISOString() }
        : currentDay
    );

    setActivityDays(newDays);
  };
  const onSwitchChange = (isActive: boolean, value: number) => {
    const newDays = activityDays.map((currentDay) =>
      currentDay.value === value
        ? { ...currentDay, isActive: !currentDay.isActive }
        : currentDay
    );
    console.log("newDays", newDays);
    setActivityDays(newDays);
  };

  const data: DataType[] = React.useMemo(() => {
    const dataSource = activityDays.map((day) => ({
      key: day.value,
      Days: day.label,
      start: day.start,
      end: day.end,
      isActive: day.isActive,
    }));
    return dataSource;
  }, [activityDays, setActivityDays]);

  const columns: ColumnsType<DataType> = React.useMemo(() => {
    return [
      {
        title: "Day",
        dataIndex: "Days",
        key: "Days",
        render: (text) => (
          <p className="font-semibold font-xl text-black">{text}</p>
        ),
      },
      {
        title: "Start",
        dataIndex: "start",
        key: "start",
        render: (value, day, index) => {
          return (
            <TimePicker
              minuteStep={5}
              defaultValue={dayjs(value, format)}
              onSelect={(time) => setStartTime(time, day.key)}
              format={format}
              disabled={!day.isActive}
              showSecond={false}
            />
          );
        },
      },
      {
        title: "End",
        dataIndex: "end",
        key: "end",
        render: (value, day, index) => {
          return (
            <TimePicker
              minuteStep={5}
              defaultValue={dayjs(value, format)}
              onSelect={(time) => setEndTime(time, day.key)}
              format={format}
              disabled={!day.isActive}
              showSecond={false}
            />
          );
        },
      },
      {
        title: "Active",
        key: "isActive",
        dataIndex: "isActive",
        render: (_, record) => {
          console.log("recnold", record);

          return (
            <Switch
              checked={record.isActive}
              onChange={(isActive) => onSwitchChange(isActive, record.key)}
            />
          );
        },
      },
    ];
  }, [activityDays, setActivityDays]);

  return (
    <Table
      className="w-full"
      columns={columns}
      dataSource={data}
      size={"large"}
      pagination={false}
    />
  );
}

export default InitDetails;
