"use client";
import React from "react";
import axios from "axios";

type formData = {
  name: string;
  phoneNumber: string;
};

function StepOne({ handleNext, setRequestId }: any) {
  const [stepOneData, setStepOneData] = React.useState<formData>({
    name: "",
    phoneNumber: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepOneData({
      ...stepOneData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(stepOneData.name);

    try {
      const res = await axios.post(`/api/verification/stepone`, stepOneData);
      setRequestId(res.data);
      if (res.status === 200) handleNext();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="name">Enter Name</label>
        <input type="text" name="name" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="phoneNumber">Enter phone</label>
        <input type="text" name="phoneNumber" onChange={handleChange} />
      </div>
      <button>submit</button>
      <button type="button" onClick={handleNext}>
        button
      </button>
    </form>
  );
}

export default StepOne;
