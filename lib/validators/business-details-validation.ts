import { z } from "zod";

export const BusinessDetailsValidation = z.object({
  businessName: z.string().min(2, {
    message: "Business Name must be at least 2 characters long.",
  }),
  businessPhone: z.string().min(10, {
    message: "Phone number must be at least 10 characters long.",
  }),
  businessAddress: z.string().min(2, {
    message: "Phone number must be at least 2 characters long.",
  }),
  businessType: z.enum([
    "Barber",
    "Beautician",
    "Manicurist",
    "BeautySalon",
    "MedicalClinic",
    "SpaAndWellnessCenter",
    "VeterinaryClinic",
    "Trainer",
    "DogGroomer",
    "TATTOO",
    "Other",
  ]),
  lastCalendar: z.enum([
    "PhysicalCalendar",
    "GoogleCalendar",
    "OtherSystem",
    "NONE",
  ]),
  fromWhere: z.enum([
    "InternetAdvertisement",
    "GoogleSearch",
    "Recommendation",
    "anotherBusiness",
  ]),
});

export type TBusinessDetailsValidation = z.infer<
  typeof BusinessDetailsValidation
>;
