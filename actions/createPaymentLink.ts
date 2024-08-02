"use server";

import axios, { AxiosError } from "axios";

async function createPaymentLink({
  sum,
  fullName,
  userId,
  description,
}: {
  sum: number;
  fullName?: string;
  userId?: string;
  description: string;
}) {
  try {
    const response = await axios.post(
      "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentLink",
      {
        pageCode: "c34d1f4a546f",
        userId: userId || "4ec1d595ae764243",
        apiKey: "57ce86548429",
        sum: sum,
        successUrl: "https://mysite.co.il/thank.html?test=1",
        cancelUrl: "https://mysite.co.il/thank.html?test=1",
        description: description,
        "pageField[fullName]": fullName,
      }
    );

    console.log("Payment link created successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Error creating payment link:",
        error.response ? error.response.data : error.message
      );
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}
