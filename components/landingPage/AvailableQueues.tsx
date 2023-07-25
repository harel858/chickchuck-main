import { AvailableSlot } from "@prisma/client";
import { Spin } from "antd";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { AppointmentInput, UserData } from "../../types/types";

export default function AvailableQueues({
  date,
  appointmentInput,
  setAppointmentInput,
}: {
  date: Dayjs;
  userData: UserData[];
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
}) {
  const [allQueues, setAllQueues] = useState<
    {
      id: string;
      start: string;
      end: string;
      date: string;
      userId: string;
      businessId: string;
    }[][]
  >([]);

  const [queues, setQueues] = useState<
    {
      id: string;
      start: string;
      end: string;
      userId: string;
      businessId: string;
    }[][]
  >([]);

  const [loading, setLoading] = useState(false);

  const queuesSorting = (
    allQueues: {
      id: string;
      start: string;
      end: string;
      date: string;
      userId: string;
      businessId: string;
    }[][]
  ) => {
    setLoading(true);
    const chosenDate = date.format("DD/MM/YYYY");
    const chosenDateQueues: {
      id: string;
      start: string;
      end: string;
      userId: string;
      businessId: string;
    }[][] = [];

    if (allQueues && allQueues.length > 0) {
      for (let i = 0; i < allQueues.length; i++) {
        if (allQueues[i]?.[0]?.date === chosenDate) {
          const queuesWithoutDate = allQueues[i]?.map(
            ({ date, ...queueWithoutDate }) => queueWithoutDate
          );

          queuesWithoutDate && chosenDateQueues.push(queuesWithoutDate);
        }
        if (dayjs().format("DD/MM/YYYY") === chosenDate) {
          chosenDateQueues.forEach((queue, index) => {
            const lastSlotStartTime = queue[0]?.start;
            const isSlotValid = dayjs(lastSlotStartTime, "HH:mm").isAfter(
              dayjs()
            );

            if (!isSlotValid) {
              chosenDateQueues.splice(index, 1);
            }
          });
        }
      }
    }
    setLoading(false);
    setQueues(chosenDateQueues);
  };

  useEffect(() => {
    const getQueues = async (date: Dayjs) => {
      setLoading(true);
      try {
        let res = await axios.get(
          `/api/slots/slot?chosenDate=${date}&userId=${appointmentInput?.user?.userId}&duration=${appointmentInput?.treatment?.duration}`
        );
        console.log(res);

        setAllQueues(res.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    if (date.month() !== appointmentInput.date.month() || allQueues.length <= 0)
      getQueues(date);
    setAppointmentInput({ ...appointmentInput, date: date });
  }, [date]);

  useEffect(() => {
    queuesSorting(allQueues);
  }, [allQueues, date]);

  const handleChange = useCallback(
    (availableSlot: AvailableSlot[]) => {
      setAppointmentInput({ ...appointmentInput, availableSlot });
    },
    [appointmentInput]
  );

  return (
    <>
      <div className="gap-2 flex justify-start align-center items-center flex-wrap align-center">
        {loading ? (
          <Spin className="self-center" />
        ) : (
          queues?.map((item, i) => {
            return (
              <Queue
                i={i}
                key={item[0]?.id}
                item={item}
                appointmentInput={appointmentInput}
                handleChange={handleChange}
              />
            );
          })
        )}
      </div>
    </>
  );
}

function Queue({
  i,
  item,
  appointmentInput,
  handleChange,
}: {
  i: number;
  item: {
    id: string;
    start: string;
    end: string;
    userId: string;
    businessId: string;
  }[];
  appointmentInput: AppointmentInput;
  handleChange: (availableSlot: AvailableSlot[]) => void;
}) {
  return (
    <Zoom key={item[i]?.id} damping={1000} duration={350} delay={i * 100}>
      <button
        key={item[i]?.id}
        onClick={() => handleChange(item)}
        className={` px-4 py-2  border-2 transition-all border-black ease-in-out duration-300 hover:bg-orange-500 font-medium ${
          appointmentInput?.availableSlot[0]?.id == item[0]?.id
            ? `bg-orange-500 `
            : `bg-rose-100 `
        } text-black rounded-2xl`}
      >
        {item[0]?.start} - {item[item.length - 1]?.end}
      </button>
    </Zoom>
  );
}
