"use client";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { CredentialsSignInButton, GoogleSignInButton } from "@ui/authButtons";
import Icons from "@ui/Icons";
import SignInMember from "@components/memberSignIn/SignInMember";
import { Button } from "@ui/Button";
import { RiTeamFill } from "react-icons/ri";
import { Modal } from "antd";
import SignInSteps from "@components/memberSignIn/signinmembers";
type signInData = {
  emailORphoneNumber: string;
  password: string;
};

function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLodaing, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<signInData>({
    emailORphoneNumber: "",
    password: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Use formData for API call
    try {
      setIsLoading(true);
      setError("");
      const res = await signIn("User Login", {
        ...formData,
        redirect: false,
      });
      if (res?.ok) return router.push("/profile");
      if (res?.error) {
        setIsLoading(false);
        setError("User Not Found");
        return;
      }

      // reset formData
    } catch (err) {
      setIsLoading(false);
      if (err instanceof AxiosError) {
        console.log(err.message);
      } else {
        console.log(err);
      }

      /* toast({
        title: "Error Signing In",
        message: "Please try again later",
        type: "error",
      }); */
    }
  };
  const handleOk = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              .תן ליומן להתמלא, קוויקלי
            </h1>
          </div>
          <GoogleSignInButton />
          <Button
            onClick={() => setOpen(true)}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
          >
            <RiTeamFill className="text-5xl" />
            <span className="ml-4"> התחבר כאיש צוות</span>
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onOk={handleOk}
        className="z-0"
        okButtonProps={{ className: "hidden" }}
        cancelButtonProps={{ className: "hidden" }}
        confirmLoading={true}
        onCancel={handleCancel}
      >
        <SignInSteps />
      </Modal>
    </>
  );
}

export default SignInForm;
