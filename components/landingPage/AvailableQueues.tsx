import { AvailableSlot } from "@prisma/client";
import { Spin } from "antd";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppointmentInput, UserData } from "../../types/types";
const scaleSpringTransition = {
  stiffness: 750,
  damping: 10,
  duration: 0.3,
};

export default function AvailableQueues({
  date,
  appointmentInput,
  setAppointmentInput,
}: {
  date: Dayjs;
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
  const [validDay, setValidDay] = useState(true);
  console.log(validDay);

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
    console.log(appointmentInput.user?.activityDays);

    const validDay = appointmentInput.user?.activityDays.some(
      (item) => item == date.day()
    );
    setValidDay(validDay || false);
    if (!appointmentInput.user || !appointmentInput.treatment) return;

    const getQueues = async (date: Dayjs) => {
      setLoading(true);

      try {
        let res = await axios.get(
          `/api/slots/slot?chosenDate=${date}&userId=${appointmentInput?.user?.userId}&duration=${appointmentInput?.treatment?.duration}`
        );
        console.log(res.data);
        setAllQueues(res.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    if (date.month() !== appointmentInput.date.month() || allQueues.length <= 0)
      getQueues(date);
    setAppointmentInput({ ...appointmentInput, date: date });
  }, [date, appointmentInput.treatment, appointmentInput.user]);

  useEffect(() => {
    queuesSorting(allQueues);
  }, [allQueues, date]);

  const handleChange = useCallback(
    (availableSlot: AvailableSlot[]) => {
      setAppointmentInput({ ...appointmentInput, availableSlot });
    },
    [appointmentInput]
  );

  return loading ? (
    <Spin size="large" />
  ) : (
    <>
      <div
        className={`${
          queues.length > 0 ? "h-36" : "h-auto"
        } w-10/12 rounded-2xl max-md:w-full overflow-x-hidden overflow-y-auto gap-2 flex justify-center align-center items-center flex-wrap align-center`}
      >
        {validDay ? (
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
        ) : (
          <p className="text-black">Day is not Valid</p>
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
    <motion.div
      className="flex justify-center items-center content-center gap-5"
      transition={{ ...scaleSpringTransition, delay: 0.01 * i }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
    >
      <button
        key={item[i]?.id}
        onClick={() => handleChange(item)}
        className={`text-base font-medium font-sans px-4 py-2 border transition-all border-black ease-in-out duration-300 hover:bg-sky-500 ${
          appointmentInput?.availableSlot[0]?.id == item[0]?.id
            ? `bg-sky-500`
            : `bg-white`
        } text-black rounded-xl`}
      >
        {item[0]?.start} - {item[item.length - 1]?.end}
      </button>
    </motion.div>
  );
}
