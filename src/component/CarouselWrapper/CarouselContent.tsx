import React from "react";
import style from "./carousel.module.css";
import Button from "../Button/Button";
import TravelCard from "../Card/Travel";
const CarouselContent = ({ item, index, slide }: any) => {
  console.log('item',item)
  let value;
  if (slide.includes(index)) {
    value = style.travelcontainer;
  } else {
    value = style.hidden;
  }
  return (
    <div key={index} className={value} >
      <TravelCard item={item} index={index}  />
    </div>
  );
};

export default CarouselContent;
