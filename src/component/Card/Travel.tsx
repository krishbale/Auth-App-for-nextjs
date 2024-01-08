import React from 'react'
import style from './travelcard.module.css'
import Image from 'next/image'
import Button from '../Button/Button';
const TravelCard = ({item,index,slide}:any) => {
  let value;

  if (slide.includes(index)) {
    value = style.travelcontainer;
  } else {
    value = style.hidden;
  }
  return (
    <div key={index} className={value}>
    <div className={style.travelcard}>
      <div className={style.travelcard_image}>
      
        <Image alt="" width={"300"} height={"300"} src={item.src} />
        
      </div>
      <div className={style.travelcard_content}>
        <div>
          <p>Sep 26, 2021</p>
          <h3>Kathmandu</h3>
          <Button where={'/log/Kathmandu'} name={'View Details'} ></Button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TravelCard