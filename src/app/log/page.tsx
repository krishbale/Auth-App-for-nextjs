import React from "react";
import style from "./log.module.css";
import Image from "next/image";
const page = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div className={style.main}>
        <div className={style.logcontainer}>
          {arr.map((item, index) => (
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
          ))}
        </div>
        <div className={style.timelinecontainer}>
          {arr.map((item, index) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
