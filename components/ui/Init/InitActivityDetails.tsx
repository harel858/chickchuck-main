"use client";
import React, { useState, useMemo } from "react";
import { Table, Switch, Select } from "antd";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { AlignType } from "rc-table/lib/interface";

const { Option } = Select;

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
  const [firstTime, setFirstTime] = useState(true);
  const [firstTime2, setFirstTime2] = useState(true);

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24 * 60; i += 5) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      slots.push(dayjs().hour(hours).minute(minutes).format("HH:mm"));
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const setStartTime = (value: string, dayValue: number) => {
    let newDays;
    if (firstTime) {
      newDays = activityDays.map((currentDay) => ({
        ...currentDay,
        start: value,
      }));
      setFirstTime(false);
    } else {
      newDays = activityDays.map((currentDay) =>
        currentDay.value === dayValue
          ? { ...currentDay, start: value }
          : currentDay
      );
    }

    setActivityDays(newDays);
  };

  const setEndTime = (value: string, dayValue: number) => {
    let newDays;
    if (firstTime2) {
      newDays = activityDays.map((currentDay) => ({
        ...currentDay,
        end: value,
      }));
      setFirstTime2(false);
    } else {
      newDays = activityDays.map((currentDay) =>
        currentDay.value === dayValue
          ? { ...currentDay, end: value }
          : currentDay
      );
    }

    setActivityDays(newDays);
  };

  const onSwitchChange = (isActive: boolean, value: number) => {
    const newDays = activityDays.map((currentDay) =>
      currentDay.value === value
        ? { ...currentDay, isActive: !currentDay.isActive }
        : currentDay
    );
    setActivityDays(newDays);
  };
  console.log("activityDays", activityDays);

  const data: DataType[] = useMemo(() => {
    const dataSource = activityDays.map((day) => ({
      key: day.value,
      Days: day.label,
      start: day.start,
      end: day.end,
      isActive: day.isActive,
    }));
    return dataSource;
  }, [activityDays, setActivityDays]);

  const columns: ColumnsType<DataType> = useMemo(() => {
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
            <Select
              className="w-max"
              defaultValue={value}
              value={activityDays[index]?.start}
              onChange={(value) => setStartTime(value, day.key)}
              disabled={!day.isActive}
            >
              {timeSlots.map((time) => (
                <Option key={time} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
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
            <Select
              className="w-max"
              defaultValue={value}
              value={activityDays[index]?.end}
              onChange={(value) => setEndTime(value, day.key)}
              disabled={!day.isActive}
            >
              {timeSlots.map((time) => (
                <Option key={time} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
          );
        },
      },
      {
        title: "פעיל",
        key: "isActive",
        dataIndex: "isActive",
        align: "center" as AlignType,
        render: (_, record) => {
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
