import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { Session } from "next-auth";
import { Table, TableColumnsType } from "antd";
import { calendar_v3 } from "googleapis";
import DescriptionForm from "./DescriptionForm";
import dayjs from "dayjs";
import { Customer } from "@prisma/client";

interface DataType {
  key: number;
  subject: string;
  description: ReactNode;
  start: string;
  end: string;
}
const format = "MMMM D, YYYY h:mm A";
function CustomerCard({
  session,
  customer,
}: {
  session: Session;
  customer: Customer;
}) {
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(
          `/api/google/customer?id=${customer.id}`,
          {
            headers: { Authorization: `Bearer ${session.user.access_token}` },
          }
        );
        console.log("customerresponse", response);

        const resultData = await response.data;
        const result = JSON.parse(
          resultData.message
        ) as calendar_v3.Schema$Event[];
        console.log("result", result);

        if (Array.isArray(result) && result.length > 0) {
          const tableData: DataType[] = result.map((item, index) => ({
            key: index, // Using index as key
            subject: item.summary ?? "", // Using nullish coalescing operator to handle potential null or undefined
            start: dayjs(item.start?.dateTime).format(format), // Formatting date using format method
            end: dayjs(item.end?.dateTime).format(format), // Formatting date using format method
            description: <DescriptionForm session={session} item={item} />,
          }));
          setData(tableData); // Update state with tableData
        }
      } catch (error) {
        console.error("Error loading Google Calendar API:", error);
      }
    };
    getEvents();
  }, [customer.id]);

  const columns: TableColumnsType<DataType> = [
    { title: "נושא", dataIndex: "subject", key: "subject", width: 80 },
    { title: "התחלה", dataIndex: "start", key: "start", width: 80 },
    { title: "סיום", dataIndex: "end", key: "end", width: 80 },
  ];

  return (
    <Table
      tableLayout="fixed"
      className="w-full"
      columns={columns}
      expandable={{
        expandedRowRender: (record) => <>{record.description}</>,
        rowExpandable: (record) => true,
      }}
      dataSource={data}
      scroll={{ x: undefined, y: 300 }}
    />
  );
}

export default CustomerCard;
