'use client'
import React, { useEffect, useRef, useState } from "react";
import style from "./travelstyle.module.css";
import {arr} from '@/backend/lib/data'
import CarouselContent from "@/component/CarouselWrapper/CarouselContent";
import LogForm from "@/component/LogForm/LogForm";
const Travel = () => {
  
  const [slide, setSlide] = useState([0,1,2]);

  const nextSlide = () => {
    setSlide(slide[slide.length-1] === arr.length  - 1 ? [0, 1, 2] : slide.map(index => (index + 3) % arr.length));
  };

  const prevSlide = () => {
    const lastIndex = arr.length - 1;

    if (slide[1] === 0) {
      setSlide([lastIndex - 1, lastIndex, 0]);
    } else {
      setSlide(slide.map(index => (index - 3 < 0 ? lastIndex + index - 2 : index - 3)));
    }
  };

  return (
    <div className={style.carousel}>

    <div className={style.travelcontainer} >
      {arr.reverse().map((item, index) => (
        <CarouselContent item={item} key={index} slide={slide}  index={index}    />
      ))}
    </div>
  <div  className={style.buttoncontainer}>
  <button className={style.nextbutton} onClick={prevSlide}>
        Previous
      </button>
      <button className={style.nextbutton} onClick={nextSlide}>
        Next
      </button>
  </div>
  <LogForm />

    </div>

  );
};

export default Travel;
