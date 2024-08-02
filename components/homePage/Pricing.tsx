import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import MaxWidthWrapper from "@components/MaxWidthWrapper";
import { PLANS } from "config/stripe";
import { Button, buttonVariants } from "@ui/Button";
import { cn } from "@lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import UpgradeButton from "./UpgradeButton";
import CreatePaymentButton from "./CreatePaymentButton"; // ייבוא הרכיב החדש

export const Pricing = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const pricingItems = [
    {
      plan: "בסיסי",
      tagline: "מתאים לעסקים בתחילת דרכם",
      quota: 50,
      features: [
        {
          text: "תמיכה בתורים - עד 10 תורים בחודש",
          footnote: "מתאים לעסקים בתחילת דרכם.",
        },
        {
          text: "ממשק מותאם לנייד",
          footnote: "תכנון וניהול תורים בקלות מכל מכשיר נייד.",
        },
        {
          text: "תזכורות SMS ללקוחות",
          footnote: "שירות תזכורת באמצעות דוא״ל עבור כל תור.",
        },
        {
          text: "הגבלת תזכורות SMS",
          footnote: "עד 300 תזכורות SMS בכל חודש.",
          negative: true,
        },
        {
          text: "תמיכה בסיסית",
          footnote: "שירות תמיכה בסיסי ללא תיעדוף.",
          negative: true,
        },
      ],
    },
    {
      plan: "לייט",
      tagline: "מתאים לעסקים מתפתחים עם צוות קטן",
      quota: 200,
      features: [
        {
          text: "תמיכה בתורים - עד 50 תורים בחודש",
          footnote: "מתאים לעסקים בצמיחה עם נפח תורים בינוני.",
        },
        {
          text: "ממשק מותאם לנייד",
          footnote: "ניהול תורים מתקדם מכל מכשיר נייד.",
        },
        {
          text: "תזכורות SMS ללקוחות",
          footnote: "תזכורות דוא״ל מקצועיות לכל לקוח.",
        },

        {
          text: "תזכורות SMS ללא הגבלה",
          footnote: "שליחת תזכורות SMS ללא הגבלה.",
        },
        {
          text: "תזכורות ווצאפ ללקוחות",
          footnote: "תזכורות דוא״ל מקצועיות לכל לקוח.",
        },
        {
          text: "תמיכה מועדפת",
          footnote: "שירות תמיכה עם תגובה מהירה ותיעדוף.",
        },
      ],
    },
    {
      plan: "פרימיום",
      tagline: "מתאים לעסקים גדולים ומתקדמים",
      quota: 500,
      features: [
        {
          text: "תמיכה בתורים ללא הגבלה",
          footnote: "מתאים לעסקים גדולים עם נפח תורים גבוה.",
        },
        {
          text: "ממשק מותאם לנייד",
          footnote: "גישה וניהול תורים מתקדם מכל מכשיר נייד.",
        },
        {
          text: "תזכורות ווצאפ ללקוחות",
          footnote: "תזכורות דוא״ל מותאמות אישית ואוטומטיות.",
        },
        {
          text: "תזכורות SMS ללקוחות",
          footnote: "תזכורות דוא״ל מקצועיות לכל לקוח.",
        },
        {
          text: "תזכורות SMS ללא הגבלה",
          footnote: "שירות תזכורות SMS ללא הגבלה.",
        },
        {
          text: "תמיכה מקצועית",
          footnote: "תמיכה ברמה הגבוהה ביותר עם תיעדוף מלא.",
        },
      ],
    },
  ];

  return (
    <>
      <MaxWidthWrapper classNames="mb-8 mt-24 text-center max-w-full">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-6xl font-bold sm:text-7xl">מחירון</h1>
          <p className="mt-5 text-gray-600 sm:text-lg">
            בין אם אתם רק מתחילים או זקוקים לפתרונות מתקדמים, יש לנו תוכנית
            שתתאים בדיוק לצרכים שלכם.
          </p>
        </div>

        <div className="pt-12 flex flex-row-reverse max-xl:flex-col flex-nowrap justify-center items-baseline max-xl:items-center content-baseline gap-10">
          <TooltipProvider>
            {pricingItems.map(({ plan, tagline, quota, features }) => {
              const price =
                PLANS.find((p) => p.slug === plan.toLowerCase())?.price
                  .amount || 0;

              return (
                <div
                  key={plan}
                  className={cn(
                    "relative w-1/3 max-xl:w-11/12 rounded-2xl bg-white shadow-lg",
                    {
                      "border-2 border-blue-600 shadow-blue-200":
                        plan === "לייט",
                      "border border-gray-200": plan !== "לייט",
                    }
                  )}
                >
                  {plan === "לייט" && (
                    <div className="absolute -top-5 left-0 right-0 mx-auto w-max rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
                      המשתלמת ביותר
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="my-3 text-center font-display text-3xl font-bold">
                      {plan}
                    </h3>
                    <p className="text-gray-500">{tagline}</p>
                    <p className="my-5 font-display text-6xl font-semibold">
                      ₪{price}
                    </p>
                    <p className="text-gray-500">לחודש</p>
                  </div>

                  <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-1">
                      <p>{quota.toLocaleString()} תורים בחודש</p>

                      <Tooltip delayDuration={300}>
                        <TooltipTrigger className="cursor-default ml-1.5">
                          <HelpCircle className="h-4 w-4 text-zinc-500" />
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-2">
                          הכמות המרבית של תורים שניתן להוסיף בכל חודש.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <ul className="my-10 space-y-5 px-8">
                    {features.map(({ text, footnote, negative }) => (
                      <li key={text} className="flex space-x-5">
                        <div className="flex-shrink-0">
                          {negative ? (
                            <Minus className="h-6 w-6 text-gray-300" />
                          ) : (
                            <Check className="h-6 w-6 text-green-500" />
                          )}
                        </div>
                        {footnote ? (
                          <div className="flex items-center space-x-1">
                            <p
                              className={cn("text-gray-600", {
                                "text-gray-400": negative,
                              })}
                            >
                              {text}
                            </p>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger className="cursor-default ml-1.5">
                                <HelpCircle className="h-4 w-4 text-zinc-500" />
                              </TooltipTrigger>
                              <TooltipContent className="w-80 p-2">
                                {footnote}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <p
                            className={cn("text-gray-600", {
                              "text-gray-400": negative,
                            })}
                          >
                            {text}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200" />
                  <div className="p-5">
                    <CreatePaymentButton
                      sum={price}
                      description={`תשלום עבור תוכנית ${plan}`}
                      userId={user?.id || "4ec1d595ae764243"}
                      fullName={user?.name || "לקוח"}
                    />
                  </div>
                </div>
              );
            })}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Pricing;
