import Timeline from "@/component/Timeline/Timeline/Timeline";
import React from "react";
import style from "./slug.module.css";
import Button from "@/component/Button/Button";
import Travel from "@/component/Timeline/Timeline/Travel";
import TravelCard from "@/component/Card/Travel";
import { arr } from "@/backend/lib/data";
import MyForm from "@/component/LogForm/LogForm";
import LogForm from "@/component/LogForm/LogForm";
const page = ({ params }: any) => {
  const slug = params.slug;
  return (
    <>
      <div className={style.slug}>
        <div className="">
          <TravelCard item={arr[0]} />
          <LogForm />
        </div>
        <div className="">
          <Timeline />
         
        </div>
       
      </div>
    </>
  );
};

export default page;
