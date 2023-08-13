import React from "react";

interface ErrorsProps {
  recipientMissing: string;
  treatmentMissing: string;
  customerMissing: string;
}

function Errors({
  customerMissing,
  recipientMissing,
  treatmentMissing,
}: ErrorsProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      {recipientMissing && treatmentMissing ? (
        <p className="text-red-500 font-serif text-lg font-medium">
          Recipient And Service Are Missing!
        </p>
      ) : recipientMissing ? (
        <p className="text-red-500 font-serif text-lg font-medium">
          {recipientMissing}!
        </p>
      ) : treatmentMissing && customerMissing ? (
        <p className="text-red-500 font-serif text-lg font-medium">
          Client And Service Are Missing!
        </p>
      ) : treatmentMissing ? (
        <p className="text-red-500 font-serif text-lg font-medium">
          Service Is Missing!
        </p>
      ) : (
        customerMissing && (
          <p className="text-red-500 font-serif text-lg font-medium">
            {customerMissing}!
          </p>
        )
      )}
    </div>
  );
}

export default Errors;
