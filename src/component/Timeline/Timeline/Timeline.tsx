import React from "react";
import style from './timeline.module.css'
import LogCard from "../../Card/Log";
let arr = [1, 2, 3];
const Timeline = () => {
  return (
    <div className={style.timelinecontainer}>
      {arr.map((item, index) => (
        <LogCard item={item} index={index} key={index} />
      ))}
    </div>
  );
};

export default Timeline;