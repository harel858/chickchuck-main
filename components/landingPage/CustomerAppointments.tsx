import React, { useState } from "react";
import { Divider, List, Skeleton } from "antd";
import { calendar_v3 } from "googleapis";
import { isGoogleEvent } from "@ui/(navbar)/specialOperations/notifications/utils/typeGourd";
import RequestEvent from "./RequestEvent";
import InfiniteScroll from "react-infinite-scroll-component";
import LargeHeading from "@ui/LargeHeading";
import { AppointmentRequest, Customer, Treatment, User } from "@prisma/client";
import GoogleEvents from "./GoogleEvents";

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
  >(customerAppointments || []);
  console.log("visibleAppointments", visibleAppointments);

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

  console.log("customerAppointments", customerAppointments);

  return (
    <div
      className="w-full max-md:w-11/12 bg-slate-200 rounded-xl"
      style={{ height: 200, overflow: "auto" }}
    >
      {" "}
      <div className="sticky top-0 w-full flex justify-center items-center bg-slate-200 z-10">
        <LargeHeading size={"sm"} className="text-lg text-center font-medium">
          תורים עתידיים
        </LargeHeading>
      </div>
      <InfiniteScroll
        dataLength={customerAppointments?.length || 0}
        next={loadMoreData}
        hasMore={
          !!customerAppointments &&
          visibleAppointments.length < customerAppointments.length
        }
        loader={<></>}
        endMessage={<Divider plain>זה הכל, אין עוד פגישות</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          bordered
          dataSource={customerAppointments || []}
          renderItem={(appointments, index) =>
            isGoogleEvent(appointments) ? (
              <GoogleEvents
                key={index}
                item={appointments}
                freebusy={freebusy}
              />
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
