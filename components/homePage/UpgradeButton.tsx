"use client";

import { Button } from "@ui/Button";
import { ArrowRight } from "lucide-react";

const UpgradeButton = () => {
  /*  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? "/dashboard/billing";
    },
  });
 */
  return (
    <Button /* onClick={() => createStripeSession()} */ className="w-full">
      שדרג עכשיו
      <ArrowRight className="h-5 w-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;
