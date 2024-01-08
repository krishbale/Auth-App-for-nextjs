import React from "react";
import style from "./travelstyle.module.css";
import TravelCard from "../../Card/Travel";

const Travel = () => {
  let arr = [1, 2, 3];
  return (
    <div className={style.travelcontainer}>
      {arr.map((item, index) => (
        <TravelCard item={item} key={index} index={index} />
      ))}
    </div>
  );
};

export default Travel;
