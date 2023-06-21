import React from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import logo from "../../../src/logo.png";
import { AppointmentEvent } from "../../types/types";
import { Address } from "@prisma/client";
import { Button } from "@ui/Button";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
/* 
const InvoicePDF = ({
  business,
  event,
}: {
  business: {
    openingTime: string;
    closingTime: string;
    activityDays: number[];
    address: Address;
  };
  event: AppointmentEvent;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logo} />
      <InvoiceTitle title="Invoice" />
      <InvoiceNo invoice={invoice} />
      <BillTo invoice={invoice} />
      <InvoiceItemsTable invoice={invoice} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);
 */
export default function DownloadPDF({
  event,
  business,
}: {
  event: AppointmentEvent;
  business: {
    openingTime: string;
    closingTime: string;
    activityDays: number[];
    address: Address;
  };
}) {
  return (
    <div className="flex justify-around gap-5 bg-yellow-500/60 dark:bg-gray-300 text-black rounded-b-2xl w-full px-5 relative top-0 py-3">
      {/*    <PDFDownloadLink
        document={<InvoicePDF business={business} event={event} />}
        fileName={`Invoice_${event.date}`}
      >
        {({ loading }) =>
          loading ? (
            <Button isLoading={true}>Loading...</Button>
          ) : (
            <Button>Download Invoice</Button>
          )
        }
      </PDFDownloadLink> */}
    </div>
  );
}
