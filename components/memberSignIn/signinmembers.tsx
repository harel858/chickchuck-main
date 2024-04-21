import React, { useCallback, useState } from "react";
import { Button } from "@ui/Button";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MemberSignin, TMemberSignin } from "@lib/validators/memberSignin";
import findUserByPhone from "actions/findUserByPhone";
import { message } from "antd";
import FormFields from "./FormField";
import MobileStepperMUI from "@components/MobileStepperMUI";
import { User } from "@prisma/client";
export interface FieldType {
  label: "סיסמה" | "אימות סיסמה";
  name: "password" | "confirmPassword";
}

export default function SignInSteps() {
  const form = useForm<TMemberSignin>({
    resolver: zodResolver(MemberSignin),
    defaultValues: { confirmPassword: "" },
  });
  const {
    register,
    formState: { errors },
    getValues,
    control,
  } = form;
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const firstTime = !!user && !user?.password;
  const handleNext = useCallback(
    () => setActiveStep((prevStep) => prevStep + 1),
    []
  );
  const handleBack = useCallback(
    () => setActiveStep((prevStep) => prevStep - 1),
    []
  );

  const findUser = async () => {
    const data = getValues();
    try {
      const user = await findUserByPhone(data.phone);
      if (user?.UserRole === "TEAMMEATE") {
        setUser(user);
        handleNext();
      } else {
        message.error("המשתמש לא נמצא");
      }
    } catch (err) {
      console.error("Error finding user:", err);
      message.error("המשתמש לא נמצא");
    }
  };

  const formType: FieldType[] = [
    { label: "סיסמה", name: "password" },
    { label: "אימות סיסמה", name: "confirmPassword" },
  ];

  const steps = [
    {
      title: "סוג השירות",
      content: (
        <FormFields
          errors={errors}
          register={register}
          control={control}
          name="phone"
          label="מספר נייד"
          key={0}
        />
      ),
    },
    {
      title: "סיסמה",
      content:
        user && !user?.password ? (
          formType.map((item, i) => (
            <FormFields
              errors={errors}
              register={register}
              control={control}
              name={item.name}
              label={item.label}
              key={i}
            />
          ))
        ) : (
          <FormFields
            errors={errors}
            register={register}
            control={control}
            name="password"
            label="סיסמה"
            key={1}
          />
        ),
    },
  ];

  return (
    <div className="relative pb-5 w-full max-md:w-11/12 flex flex-col justify-center items-center bg-slate-200 rounded-xl mb-20 gap-5">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MobileStepperMUI
          stepsLength={steps.length}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
        <div className="w-full">{steps[activeStep]?.content}</div>
      </div>
      <Button
        disabled={activeStep >= steps.length}
        onClick={async () => {
          try {
            if (activeStep === 0) return findUser();
            if (
              firstTime &&
              getValues().password !== getValues().confirmPassword
            )
              return message.error("סיסמאות לא תואמות");
            console.log(getValues());

            const res = await signIn("credentials", {
              ...getValues(),
              name: firstTime ? "Sign Up" : "Sign In",
            });
            console.log("res", res);
          } catch (err: any) {
            console.log(err);
            throw new Error(err);
          }
        }}
        className="text-2xl w-1/3 max-md:w-full transition-all ease-in-out duration-300"
      >
        {user && !user?.password ? "התחבר" : "המשך"}
      </Button>
    </div>
  );
}
