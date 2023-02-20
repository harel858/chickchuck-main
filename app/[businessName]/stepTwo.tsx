"use client";
import React from "react";
import axios from "axios";

type formData = {
  request_id: string;
  code: string;
};

function StepTwo({ handleNext, requestId }: any) {
  console.log(requestId);

  const [stepTwoData, setStepTwoData] = React.useState<formData>({
    request_id: requestId,
    code: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepTwoData({
      ...stepTwoData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/verification/steptwo`, stepTwoData);
      if (res.status === 200) handleNext();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="code">Enter Code</label>
        <input type="text" name="code" onChange={handleChange} />
      </div>

      <button>submit</button>
    </form>
  );
}

export default StepTwo;
