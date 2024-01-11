import React from "react";
import style from "./timeline.module.css";
import LogCard from "../../Card/Log";
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Timeline = () => {
  return (
    <div className={style.timelinecontainer}>
      {arr.map((item, index) => {
        const isLastCard = index === arr.length - 1;
        return (
          <LogCard
            item={item}
            isLastCard={isLastCard}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default Timeline;
