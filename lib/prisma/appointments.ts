import prisma from ".";

export const createAppointment = async (
  name: string,
  phoneNumber: string,
  appointmentTime: string,
  treatmentId: any,
  userId: string
) => {
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        treatmentId: treatmentId,
        name,
        phoneNumber,
        createAt: new Date(),
        appointmentTime,
        treatment: { connect: { id: treatmentId } },
        business: { connect: { id: userId } },
      },
    });
    console.log(newAppointment);

    return { newAppointment };
  } catch (appointmentErr) {
    console.log(appointmentErr);

    return { appointmentErr };
  }
};

export const getAppointments = async (id: string) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { businessId: id },
      include: { treatment: true },
    });
    if (!appointments) return { err: `appointments not found ` };
    return { appointments };
  } catch (appointmentErr) {
    console.log(appointmentErr);
    return { appointmentErr };
  }
};
