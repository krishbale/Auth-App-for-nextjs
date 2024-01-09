import React from "react";
import style from "./carousel.module.css";
import Button from "../Button/Button";
import TravelCard from "../Card/Travel";
const CarouselContent = ({ item, index, slide }: any) => {
  let value;
  if (slide.includes(index)) {
    value = style.travelcontainer;
  } else {
    value = style.hidden;
  }
  return (
    <div key={index} className={value} >
      <TravelCard item={item} index={index}  />
      <Button where={"/log/Kathmandu"} name={"View Details"}></Button>
    </div>
  );
};

export default CarouselContent;
