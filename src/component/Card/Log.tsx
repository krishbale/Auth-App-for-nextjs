import React from 'react'
import style from './logcard.module.css'
const LogCard = ({item,index}:any) => {
  return (
    <div key={index} className={style.timeline}>
    <div className={style.outer}>
      <div className={style.card}>
        <div className={style.info}>
          <h3 className={style.title}>Day {item}</h3>
          <p>
            Date: January 8, 2024 Arrived in Kathmandu today, greeted
            by the vibrant chaos of Thamels bustling streets.
            Explored the historic Durbar Square, marveled at ancient
            temples and intricate architecture. Indulged in authentic
            momos and immersed myself in the rich culture of this
            enchanting city. Cant wait for more adventures in the
            heart of Nepals capital.
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LogCard