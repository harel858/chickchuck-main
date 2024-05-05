"use client";
import React, { useState } from "react";
import { Table, Switch, TimePicker } from "antd";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { AlignType } from "rc-table/lib/interface";

interface DataType {
  key: number;
  Days: React.ReactNode;
  start: React.ReactNode;
  end: React.ReactNode;
  isActive: boolean;
}

export interface DayData {
  value: number;
  label: string;
  start: string;
  end: string;
  isActive: boolean;
}

function InitDetails({
  setActivityDays,
  activityDays,
}: {
  setActivityDays: React.Dispatch<React.SetStateAction<DayData[]>>;
  activityDays: DayData[];
}) {
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
    const ISOstring = time.toISOString();
    console.log("ISOstring to time", dayjs(ISOstring).format(format));

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
        title: "יום",
        dataIndex: "Days",
        key: "Days",
        align: "center" as AlignType,
        render: (text) => (
          <p className="font-semibold font-xl text-black">{text}</p>
        ),
      },
      {
        title: "התחלה",
        dataIndex: "start",
        key: "start",
        align: "center" as AlignType,
        render: (value, day, index) => {
          return (
            <TimePicker
              minuteStep={5}
              className="w-max"
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
        title: "סיום",
        dataIndex: "end",
        key: "end",
        align: "center" as AlignType,
        render: (value, day, index) => {
          return (
            <TimePicker
              minuteStep={5}
              className="w-max"
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
        title: "פעיל",
        key: "isActive",
        dataIndex: "isActive",
        align: "center" as AlignType,
        render: (_, record) => {
          console.log("record", record);

          return (
            <Switch
              checked={record.isActive}
              className="bg-black/60"
              onChange={(isActive) => onSwitchChange(isActive, record.key)}
            />
          );
        },
      },
    ];
  }, [activityDays, setActivityDays]);

  return (
    <Table
      className="rounded-3xl"
      sticky
      columns={columns}
      dataSource={data}
      size={"small"}
      pagination={false}
      title={() => (
        <h2 className="text-black text-2xl text-center">זמני פעילות</h2>
      )}
    />
  );
}

export default InitDetails;
