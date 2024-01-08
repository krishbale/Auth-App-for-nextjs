import React from "react";
import style from "./log.module.css";
import Travel from "@/component/Timeline/Timeline/Travel";
import Timeline from "@/component/Timeline/Timeline/Timeline";
const page = () => {
  return (
    <>
      <div className={style.main}>
        
        {/* traveltimeline */}
        <Travel />

       {/* timelinefor log */}
       {/* <Timeline /> */}
       
      </div>
    </>
  );
};

export default page;
