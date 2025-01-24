import { prisma } from "@lib/prisma";
import axios from "axios";

type DestinationObj = {
  lastNineDigits: string;
  name: string;
  businessName: string;
  treatment: string;
  time: string;
  dynamicLink: string;
};

export const createNewCL = async (
  destination: DestinationObj,
  customerPhone: string
) => {
  console.log("destination", destination);

  console.log("destination.phone", destination.lastNineDigits);

  const url = "https://019sms.co.il/api";
  const apiKey = process.env.WHATSAPP_API_KEY;

  const body = {
    newCL: {
      user: {
        username: "harellevi",
      },
      cl: [
        {
          name: destination.name,
          destinations: {
            destination: [
              {
                phone: destination.lastNineDigits,
                df1: destination.name,
                df2: destination.businessName,
                df3: destination.treatment,
                df4: destination.time,
                df5: destination.dynamicLink,
              },
            ],
          },
        },
      ],
    },
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log("data", data);

    if (data.status === 0) {
      const clId = data.identifiers[0];
      console.log("destination.phone", destination.lastNineDigits);
      console.log("data.identifiers[0]", clId);

      await prisma.customer.update({
        where: { phoneNumber: customerPhone },
        data: { clId },
      });
      return clId;
    }
  } catch (error) {
    console.error("Error making request:", error);
  }
};
export const addNumberToCL = async (
  destination: DestinationObj,
  clId: string
) => {
  const url = "https://019sms.co.il/api";
  const apiKey = process.env.WHATSAPP_API_KEY;

  const addNumCLbody = {
    addNumCL: {
      user: {
        username: "harellevi",
      },
      cl: [
        {
          id: clId,
          destinations: {
            destination: [
              {
                phone: destination.lastNineDigits,
                df1: destination.name,
                df2: destination.businessName,
                df3: destination.treatment,
                df4: destination.time,
                df5: destination.dynamicLink,
              },
            ],
          },
        },
      ],
    },
  };
  const rmNumCLbody = {
    rmNumCL: {
      user: {
        username: "harellevi",
      },
      cl: [
        {
          id: clId,
          destinations: {
            phone: destination.lastNineDigits,
          },
        },
      ],
    },
  };

  try {
    const rmResponse = await axios.post(url, rmNumCLbody, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    console.log("rmResponse", rmResponse.data);

    if (rmResponse.data.status === 0) {
      const addResponse = await axios.post(url, addNumCLbody, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      console.log("addResponse", addResponse.data);

      console.log("clId", clId);
      return clId;
    }
    return null;
  } catch (error) {
    console.error("Error making request:", error);
    return null;
  }
};
