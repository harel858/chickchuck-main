import React from "react";
import { authOptions } from "@lib/auth";
import { prisma } from "@lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Clients from "@components/clients/Clients";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

async function getBusinessCustomers(userId: string | undefined) {
  if (!userId) return null;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Business: {
          include: {
            Customer: {
              include: {
                appointments: {
                  include: { treatment: true, appointmentSlot: true },
                },
                blockedByBusiness: true,
              },
            },
          },
        },
      },
    });
    if (!user?.Business) return null;
    const { Business } = user;

    const thisYear = dayjs().year();

    const customersWithIncome = Business.Customer.map((customer) => {
      const appointmentsLastYear = customer.appointments.filter(
        (appointment) =>
          appointment.status !== "COMPLETED" &&
          dayjs(appointment?.appointmentSlot?.date).year() !== thisYear
      );

      const uniqueDates = appointmentsLastYear.reduce(
        (unique: number[], next) => {
          const date = dayjs(next.appointmentSlot.date, "DD/MM/YYY").month();

          if (!unique.includes(date)) {
            unique.push(date);
          }

          return unique;
        },
        []
      );

      console.log("uniqueDates", uniqueDates);

      const totalIncomeLastYear = appointmentsLastYear.reduce(
        (total, appointment) => total + appointment.treatment.cost,
        0
      );
      console.log("totalIncomeLastYear", totalIncomeLastYear);

      const averageMonthlyIncome = uniqueDates.length
        ? totalIncomeLastYear /
          (uniqueDates.length > 1
            ? dayjs().month() - Math.min(...uniqueDates)
            : 1)
        : 0;
      console.log("averageMonthlyIncome", averageMonthlyIncome);

      return {
        ...customer,
        blockedByBusiness: customer.blockedByBusiness.some(
          (business) => business.id === Business.id
        ),
        average_monthly_income: averageMonthlyIncome,
        BusinessId: Business.id,
      };
    });

    return {
      customers: customersWithIncome.sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function Page() {
  const session = await getServerSession(authOptions);
  const customersData = await getBusinessCustomers(session?.user.id);
  if (!customersData || session?.user.UserRole === "CUSTOMER")
    return notFound();
  return <Clients customers={customersData.customers} />;
}

export default Page;
