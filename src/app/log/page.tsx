import React from "react";
import style from "./log.module.css";
import Travel from "@/component/Timeline/Timeline/Travel";
import LogForm from "@/component/LogForm/LogForm";
const page = () => {
  return (
    <>
      <div className={style.main}>
        
        <Travel />
       
      </div>

    </>
  );
};

export default page;
