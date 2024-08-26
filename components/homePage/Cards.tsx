"use client";
import "./styles.css";
import { ReactNode } from "react";
import googleLogo from "@public/google.png";
import bitLogo from "@public/Bit_logo.png";
import crmLogo from "@public/CRM.png";
import group from "@public/group.png";
import whatsappLogo from "@public/whatsapp_logo.png";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { PieChartTwoTone, ScheduleTwoTone } from "@ant-design/icons";

interface Props {
  title: string;
  content: string | ReactNode;
  logo?: ReactNode;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

function Card({ title, content, logo }: Props) {
  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="splash" />
      <motion.div className="card relative px-5" variants={cardVariants}>
        <h4
          style={{ direction: "rtl" }}
          className="w-max text-xl absolute top-44 left-1/2 transform -translate-x-1/2"
        >
          {title}
        </h4>
        {logo}
      </motion.div>
    </motion.div>
  );
}

const options: Props[] = [
  {
    title: "מתחברים בקליק אחד עם גוגל",
    content: (
      <>
        <span className="font-semibold">המשתמש שלכם כבר קיים!</span> רק תתחברו
        ותערכו את דף העסק שלכם. תנו ללקוחות שלכם לקבוע תורים במהירות ובקלות,
        ישירות מהאפליקציה הנוחה שלנו.
      </>
    ),
    logo: (
      <Image
        className="absolute top-16"
        src={googleLogo}
        alt="Google Logo"
        width={80}
        height={100}
      />
    ),
  },
  {
    title: "קבלת מקדמות ותשלומים בביט",
    content: (
      <>
        <span className="font-semibold">תוכלו לקבל מקדמות בביט בקלות</span>{" "}
        הודות לשילוב עם משולם GROW. ככה תבטיחו הפחתה בהברזות ותשמרו על תזרים
        מזומנים יציב.
      </>
    ),
    logo: (
      <Image
        className="absolute top-16"
        src={bitLogo}
        alt="bit Logo"
        width={80}
        height={80}
      />
    ),
  },
  {
    title: "תזכורות ישירות לווצאפ",
    content: (
      <>
        כל תור או פגישה נשלחים בתזכורות ישירות לוואטסאפ של הלקוח.{" "}
        <span className="font-semibold">
          למי עוד יש סבלנות לספאם ולפרסומות?
        </span>
        תשכחו מהתירוץ של "לא ראיתי את התזכורת כי אני לא פותח את ה-SMS" – כולם
        בוואטסאפ היום.
      </>
    ),
    logo: (
      <Image
        className="absolute top-16"
        src={whatsappLogo}
        alt="whatsapp Logo"
        width={100}
        height={100}
      />
    ),
  },
  {
    title: "ניהול אנשי צוות",
    content: (
      <>
        ניהול כל נותני השירות בעסק.{" "}
        <span className="font-semibold">
          כל איש צוות מקבל יומן עבודה אישי ורשימת תורים מסודרת.
        </span>{" "}
        כל התורים והפגישות מאורגנים בצורה מסודרת וברורה, כך שתוכלו לייעל את
        הפעילות העסקית שלכם ולשמור על סדר מרבי.
      </>
    ),
    logo: (
      <Image
        className="absolute top-16"
        src={group}
        alt="group Logo"
        width={80}
        height={80}
      />
    ),
  },
  {
    title: 'דו"חות וניתוח נתונים',
    content: (
      <>
        <span className="font-semibold">
          קבלו תובנות מיידיות על ביצועי העסק שלכם.{" "}
        </span>
        מערכת הדו"חות המתקדמת של Quickline מאפשרת לכם לעקוב אחר הכנסות, תזרים
        מזומנים וביצועי צוות, ולסייע בקבלת החלטות מבוססות נתונים.
      </>
    ),
    logo: <PieChartTwoTone className="absolute top-16 text-5xl" />,
  },
  {
    title: "ניהול לקוחות (CRM) משולב",
    content: (
      <>
        <span className="font-semibold">כל הלקוחות שלכם במקום אחד. </span>
        Quickline מאפשרת לכם לנהל את כל פרטי הלקוחות, התקשורת והיסטוריית התורים
        שלהם בצורה מסודרת ונוחה, ולספק שירות מותאם אישית ואיכותי.
      </>
    ),
    logo: (
      <Image
        className="absolute top-16"
        src={crmLogo}
        alt="crm Logo"
        width={80}
        height={80}
      />
    ),
  },
  {
    title: "מנגנון ביטול תורים",
    content: (
      <>
        <span className="font-semibold">גמישות מושלמת בניהול התורים. </span>
        Quickline מאפשרת ללקוחות לבטל או לשנות את התור בקלות דרך האפליקציה,
        בהתאם למדיניות הביטולים שלכם. זה מפחית את הצורך בשיחות טלפון מיותרות
        ומייעל את ניהול התורים.
      </>
    ),
    logo: <ScheduleTwoTone className="absolute top-16 text-5xl" />,
  },
];

export default function Cards() {
  return (
    <>
      {options.map(({ title, content, logo }) => (
        <Card title={title} content={content} logo={logo} key={title} />
      ))}
    </>
  );
}
