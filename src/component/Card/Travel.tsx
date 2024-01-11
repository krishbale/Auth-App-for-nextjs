import React from 'react'
import style from './travelcard.module.css'
import Image from 'next/image'
import Link from 'next/link'
const TravelCard = ({item}:any) => {
  return (
    <>
    <Link href={'/log/kathmandu'}>

    <div  className={style.travelcard}>
      <div className={style.travelcard_image}>
     
        <Image alt="" width={"300"} height={"300"} src={item.src} />
     
      </div>
      <div className={style.travelcard_content}>
        <div>
          <p>Sep 26, 2021</p>
          <p>Kathmandu</p>
        </div>
      </div>
    </div>
    </Link>
  </>
  )
}

export default TravelCard