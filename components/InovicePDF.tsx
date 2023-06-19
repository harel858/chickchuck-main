import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Button } from "@ui/Button";
import { AppointmentEvent } from "../types/types";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "40px",
    fontFamily: "Helvetica",
  },
  titleContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    marginBottom: "10px",
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#555",
  },
  sectionContent: {
    marginLeft: "20px",
    color: "#333",
  },
  footer: {
    marginTop: "50px",
    textAlign: "center",
    fontSize: "12px",
    color: "#777",
  },
});

// Create Document Component
const InvoicePDF = ({ event }: { event: AppointmentEvent }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Invoice</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Date:</Text>
        <Text style={styles.sectionContent}>{event.date}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Name:</Text>
        <Text style={styles.sectionContent}>{event.customer.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product/Service:</Text>
        <Text style={styles.sectionContent}>{event.treatment.title}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price:</Text>
        <Text style={styles.sectionContent}>{event.treatment.cost}</Text>
      </View>
      {/* Add any additional sections you need */}
      <Text style={styles.footer}>
        Thank you for your business. Please keep this invoice for your records.
      </Text>
    </Page>
  </Document>
);

export default function DownloadPDF({ event }: { event: AppointmentEvent }) {
  return (
    <div className="flex justify-around gap-5 bg-yellow-500/60 dark:bg-gray-300 text-black rounded-b-2xl w-full px-5 relative top-0 py-3">
      <PDFDownloadLink
        document={<InvoicePDF event={event} />}
        fileName={`Invoice_${event.date}`}
      >
        {({ loading }) =>
          loading ? (
            <Button isLoading={true}>Loading...</Button>
          ) : (
            <Button>Download Invoice</Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
