import React from "react";
import style from "./page.module.css";
import { symlink } from "fs";
const page = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.imgContainer}></div>
        <div className={style.textContainer}>
          <p className={style.title}>Discover Adventures</p>
          <p className={style.description}>
            We help you find wonderful trips experience and great vacation place
            and we will provide famous and popular travel stories from all over
            the world
          </p>
        <button className={style.button}>Get Started</button>

        </div>
      </div>
    </>
  );
};

export default page;
