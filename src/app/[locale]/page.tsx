import MaxWidthWrapper from "@components/MaxWidthWrapper";
import Cards from "@components/homePage/Cards";
import Navbar from "@components/homePage/Navbar";
import Phone from "@components/homePage/Phone";
import Pricing from "@components/homePage/Pricing";
import { Reviews } from "@components/homePage/Reviews";
import Footer from "@components/homePage/footer";
import { buttonVariants } from "@ui/Button";
import Icons from "@ui/Icons";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  console.log("locale", locale);

  const t = useTranslations("HomePage");

  return (
    <>
      {" "}
      {/* @ts-ignore */}
      <Navbar locale={locale} />
      <div className="bg-slate-50 grainy-light">
        <section className="w-full">
          <MaxWidthWrapper
            classNames={`pb-24 pt-10 flex ${
              locale === "he" ? `flex-row-reverse` : `flex-row`
            } justify-between items-center max-lg:flex-col sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52`}
          >
            <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
              <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                  {/* i forgot this div right here in the video, it's purely visual gradient and looks nice */}
                  <div className="z-50 scale-150 absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
                  <Image
                    alt="white-rabbit"
                    width={800}
                    height={800}
                    src="/white-rabbit1.png"
                    className="scale-150"
                  />
                </div>
                <h1
                  style={
                    locale === "he"
                      ? { direction: "rtl" }
                      : { direction: "ltr" }
                  }
                  className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl"
                >
                  {t("title1")}{" "}
                  <span
                    style={{ background: "#0097b2" }}
                    className="px-2 text-white"
                  >
                    {t("title2")}
                  </span>{" "}
                  {t("title3")}
                </h1>
                <p
                  style={{ direction: "rtl", textAlign: "center" }}
                  className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap"
                >
                  {t("paragraphA")}{" "}
                  <span className="font-semibold">{t("paragraphB")}</span>
                  {t("paragraphC")}
                </p>

                <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                  <div className="space-y-2">
                    <li
                      style={
                        locale === "he"
                          ? { direction: "rtl" }
                          : { direction: "ltr" }
                      }
                      className="flex gap-1.5 items-center text-left"
                    >
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                      {t("check1")}{" "}
                    </li>
                    <li
                      style={
                        locale === "he"
                          ? { direction: "rtl" }
                          : { direction: "ltr" }
                      }
                      className="flex gap-1.5 items-center text-left"
                    >
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                      {t("check2")}
                    </li>
                    <li
                      style={
                        locale === "he"
                          ? { direction: "rtl" }
                          : { direction: "ltr" }
                      }
                      className="flex gap-1.5 items-center text-left"
                    >
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                      {t("check3")}
                    </li>
                  </div>
                </ul>

                <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="flex -space-x-4">
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/testimonials/2.jpg"
                      alt="user image"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/testimonials/4.jpg"
                      alt="user image"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/testimonials/6.jpg"
                      alt="user image"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/testimonials/8.jpg"
                      alt="user image"
                    />

                    <img
                      className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/testimonials/5.jpg"
                      alt="user image"
                    />
                  </div>

                  <div className="flex flex-col justify-between items-center sm:items-start">
                    <div className="flex gap-0.5">
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    </div>

                    <p
                      style={
                        locale === "he"
                          ? { direction: "rtl" }
                          : { direction: "ltr" }
                      }
                    >
                      <span className="font-semibold">
                        {" "}
                        {t("satisfiedCustomers")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
              <div className="relative md:max-w-xl">
                <img
                  src="/your-image.png"
                  className="absolute -left-40 -top-40 w-40 lg:w-52 select-none hidden sm:block lg:hidden xl:block"
                />
                <img
                  src="/line.png"
                  className="absolute w-20 -left-6 -bottom-6 select-none"
                />
                <Phone
                  className="w-64"
                  imgSrc="/testimonials/screen-shot.jpg"
                />
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
        <section className="bg-slate-100 grainy-dark py-24">
          <MaxWidthWrapper classNames="py-24">
            <div className="mb-12 px-6 lg:px-8">
              <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                  {t("keyfeaturesA")}{" "}
                  <span
                    style={{ background: "#0097b2" }}
                    className="relative px-2 text-white"
                  >
                    {t("keyfeaturesB")}
                  </span>{" "}
                  {t("keyfeaturesC")}
                </h2>
              </div>
            </div>
            {/* <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
                <img
                  src="/arrow.png"
                  className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
                />

                <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                  <img
                    src="/horse.jpg"
                    className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                  />
                </div>

                <Phone className="w-60" imgSrc="/horse_phone.jpg" />
              </div> */}
            <Cards />
            {/*             <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
             */}{" "}
            {/*  <li className="w-fit">
                <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                High-quality silicone material
              </li>
              <li className="w-fit">
                <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                Scratch- and fingerprint resistant coating
              </li>
              <li className="w-fit">
                <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                Wireless charging compatible
              </li>
              <li className="w-fit">
                <Check className="h-5 w-5 text-green-600 inline mr-1.5" />5 year
                print warranty
              </li> */}
            <div className="flex justify-center">
              <Link
                href="/login"
                className={buttonVariants({
                  size: "sm",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                {" "}
                <ArrowLeft className="ml-1.5 h-5 w-5" />
                היכנס לחשבון
              </Link>
            </div>
            {/*        </ul> */}
          </MaxWidthWrapper>
        </section>
        {/* value proposition section */}
        <section className="grainy-dark py-24">
          <MaxWidthWrapper classNames="flex flex-col items-center gap-16 sm:gap-32">
            <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
              <h2
                style={
                  locale === "he" ? { direction: "rtl" } : { direction: "ltr" }
                }
                className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900"
              >
                מה הלקוחות{" "}
                <span className="relative px-2">
                  שלנו{" "}
                  <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
                </span>{" "}
                אומרים
              </h2>
              <img
                src="/white-rabbit1.png"
                className="w-24 order-0 lg:order-2"
              />
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
              <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                <div className="flex gap-0.5 mb-2">
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                </div>
                <div className="text-lg leading-8">
                  <p
                    style={
                      locale === "he"
                        ? { direction: "rtl" }
                        : { direction: "ltr" }
                    }
                  >
                    "Quickline היא הפתרון לכל מי שחי על לוח זמנים צפוף. קביעת
                    התורים מסודרת ומדויקת, עם סנכרון מושלם ליומן בגוגל וללא חשש
                    להתנגשויות. התזכורות בווצאפ או ב-SMS הן בונוס אדיר,
                    <span className="p-0.5 bg-slate-800 text-white">
                      ותשלומי המקדמות בביט הופכים את הכל לכל כך פשוט ונוח{" "}
                    </span>{" "}
                    לא יכולתי לבקש יותר!"
                  </p>
                </div>
                <div className="flex gap-4 mt-2">
                  <img
                    className="rounded-full h-12 w-12 object-cover"
                    src="/testimonials/5.jpg"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">ניסים אדרי</p>
                    <div className="flex gap-1.5 items-center text-zinc-600">
                      <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                      <p
                        className="text-sm"
                        style={
                          locale === "he"
                            ? { direction: "rtl" }
                            : { direction: "ltr" }
                        }
                      >
                        לקוח מאומת
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* second user review */}
              <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                <div className="flex gap-0.5 mb-2">
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                </div>
                <div className="text-lg leading-8">
                  <p
                    style={
                      locale === "he"
                        ? { direction: "rtl" }
                        : { direction: "ltr" }
                    }
                  >
                    "Quickline{" "}
                    <span className="p-0.5 bg-slate-800 text-white">
                      הפכה את חיי להרבה יותר קלים!{" "}
                    </span>{" "}
                    לא רק שאני קובעת תורים בקלות ובמהירות, אלא שהאפליקציה גם
                    מסנכרנת את כל התורים עם היומן בגוגל שלי, מה שמונע כל התנגשות
                    אפשרית. תשלומי המקדמות דרך ביט והתזכורות בווצאפ פשוט
                    מושלמים. הכל במקום אחד!"
                  </p>
                </div>
                <div className="flex gap-4 mt-2">
                  <img
                    className="rounded-full h-12 w-12 object-cover"
                    src="/testimonials/9.jpg"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">נטלי מור</p>
                    <div className="flex gap-1.5 items-center text-zinc-600">
                      <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                      <p
                        className="text-sm"
                        style={
                          locale === "he"
                            ? { direction: "rtl" }
                            : { direction: "ltr" }
                        }
                      >
                        לקוח מאומת
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>

          <div className="pt-16">
            <Reviews />
          </div>
        </section>
        <section className="bg-slate-100 grainy-dark py-24">
          {/* @ts-ignore */}
          <Pricing />
        </section>{" "}
        <Footer />
      </div>
    </>
  );
}
