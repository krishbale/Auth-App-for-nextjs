import Timeline from "@/component/Timeline/Timeline/Timeline";
import React from "react";
import style from "./slug.module.css";
import Button from "@/component/Button/Button";
import Travel from "@/component/Timeline/Timeline/Travel";
import TravelCard from "@/component/Card/Travel";
import { arr } from "@/backend/lib/data";
const page = ({ params }: any) => {
  const slug = params.slug;
  return (
    <>
      <div className={style.slug}>
        <div className={style.travelinfo}>
          <textarea
            placeholder="Write something.."
            className={style.textarea}
          ></textarea>

          <input className={style.submitButton} type="submit" />
        </div>
        <Timeline />

      </div>
    </>
  );
};

export default page;
