"use client";
import "./styles.css";
import { ReactNode } from "react";
import googleLogo from "@public/google.png";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

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

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

function Card({ title, content, logo }: Props) {
  /*   const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;
   */
  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="splash" /* style={{ background }} */ />
      <motion.div className="card relative px-5" variants={cardVariants}>
        <h4
          style={{ direction: "rtl" }}
          className="w-max text-xl absolute top-2 left-1/2 transform -translate-x-1/2"
        >
          {title}
        </h4>
        {logo}
        <p
          style={{ direction: "rtl" }}
          className="absolute top-36 w-11/12 font-normal text-base text-right"
        >
          {content}
        </p>
      </motion.div>
    </motion.div>
  );
}

const food: Props[] = [
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
        width={40}
        height={40}
      />
    ),
  },
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
        width={40}
        height={40}
      />
    ),
  },
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
        width={40}
        height={40}
      />
    ),
  },
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
        width={40}
        height={40}
      />
    ),
  },
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
        width={40}
        height={40}
      />
    ),
  },
  /* ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320], */
];

export default function Cards() {
  return (
    <>
      {food.map(({ title, content, logo }) => (
        <Card title={title} content={content} logo={logo} key={title} />
      ))}
    </>
  );
}
