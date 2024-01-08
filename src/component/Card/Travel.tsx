import React from 'react'
import style from './travelcard.module.css'
import Image from 'next/image'
const TravelCard = ({item,index}:any) => {
  return (
    <div key={index} className={style.travelcontainer}>
    <div className={style.travelcard}>
      <div className={style.travelcard_image}>
      
        <Image alt="" width={"300"} height={"300"} src={'https://picsum.photos/200/300'} />
        
      </div>
      <div className={style.travelcard_content}>
        <div>
          <p>Sep 26, 2021</p>
          <h3>Kathmandu</h3>
          <p>View Details</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TravelCard