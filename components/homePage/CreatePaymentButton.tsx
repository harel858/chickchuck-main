"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import axios, { AxiosError } from "axios";
import { Button, buttonVariants } from "@ui/Button";

interface CreatePaymentButtonProps {
  sum: number;
  description: string;
  userId: string;
  fullName?: string;
}

const CreatePaymentButton = ({
  sum,
  description,
  userId,
  fullName,
}: CreatePaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentLink",
        {
          pageCode: "c34d1f4a546f",
          userId: "4ec1d595ae764243",
          apiKey: "57ce86548429",
          sum: "1",
          successUrl: "https://mysite.co.il/thank.html?test=1",
          cancelUrl: "https://mysite.co.il/thank.html?test=1",
          description: "Course",
          "pageField[fullName]": "John Smith",
          "pageField[phone]": "543023244",
          sendingMode: "1",
        }
      );
      console.log("response", response);

      setPaymentLink(response.data.paymentLink);
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
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={buttonVariants({
          className: "w-full",
        })}
        variant={"default"}
        disabled={loading}
      >
        {loading ? "יוצר קישור מאובטח..." : "שדרג עכשיו"}
        {!loading && <ArrowRight className="h-5 w-5 ml-1.5" />}
      </Button>
      {paymentLink && (
        <div className="mt-4">
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            לחץ כאן לתשלום
          </a>
        </div>
      )}
    </>
  );
};

export default CreatePaymentButton;
