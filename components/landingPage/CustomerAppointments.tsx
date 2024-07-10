import React, { useState } from "react";
import { Divider, List, Skeleton } from "antd";
import { calendar_v3 } from "googleapis";
import { isGoogleEvent } from "@ui/(navbar)/specialOperations/notifications/utils/typeGourd";
import RequestEvent from "./RequestEvent";
import InfiniteScroll from "react-infinite-scroll-component";
import LargeHeading from "@ui/LargeHeading";
import { AppointmentRequest, Customer, Treatment, User } from "@prisma/client";

const CustomerAppointments = ({
  customerAppointments,
  freebusy,
}: {
  freebusy: string;
  customerAppointments:
    | (
        | calendar_v3.Schema$Event
        | (AppointmentRequest & {
            treatment: Treatment;
            customer: Customer;
            user: User;
          })
      )[]
    | null
    | undefined;
}) => {
  const [visibleAppointments, setVisibleAppointments] = useState<
    (
      | calendar_v3.Schema$Event
      | (AppointmentRequest & {
          treatment: Treatment;
          customer: Customer;
          user: User;
        })
    )[]
  >(customerAppointments ? customerAppointments.slice(0, 10) : []);

  const loadMoreData = () => {
    if (customerAppointments) {
      setVisibleAppointments((prevAppointments) => [
        ...prevAppointments,
        ...customerAppointments.slice(
          prevAppointments.length,
          prevAppointments.length + 10
        ),
      ]);
    }
  };

  return (
    <div
      className="w-1/2 max-md:w-11/12 bg-slate-200 rounded-xl"
      style={{ height: 200, overflow: "auto" }}
    >
      {" "}
      <div className="sticky top-0 w-full flex justify-center items-center bg-slate-200 z-10">
        <LargeHeading size={"sm"} className="text-lg text-center font-medium">
          תורים עתידיים
        </LargeHeading>
      </div>
      <InfiniteScroll
        dataLength={visibleAppointments.length}
        next={loadMoreData}
        hasMore={
          !!customerAppointments &&
          visibleAppointments.length < customerAppointments.length
        }
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>זה הכל, אין עוד פגישות</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          bordered
          dataSource={visibleAppointments}
          renderItem={(appointments, index) =>
            isGoogleEvent(appointments) ? (
              <></>
            ) : (
              <RequestEvent
                key={index}
                item={appointments}
                freebusy={freebusy}
              />
            )
          }
        />
      </InfiniteScroll>
    </div>
  );
};

export default CustomerAppointments;
