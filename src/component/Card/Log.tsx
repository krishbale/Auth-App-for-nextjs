import React from 'react'
import style from './logcard.module.css'
const LogCard = ({item,index,isLastCard}:any) => {
  const isFirstCard = index === -1;
  const isEven = (index + 1) % 2 === 0;
  const className = style.card +
          `${isFirstCard ? style.cardFirst : ''} ` +
          `${isEven ? style.cardEven : style.cardOdd} ` +
          `${isLastCard ? (isEven ? style.cardLastEven : style.cardLastOdd) : ''}`;
  return (

    <div key={index} className={style.timeline}>
    <div className={style.outer}>
      <div  className={className.trim()}>
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