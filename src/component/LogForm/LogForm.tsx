import React from 'react'
import style from './FormStyles.module.css'
const LogForm = () => {
  return (
    <div>
      <form className={style.logform}>
        {/* <label htmlFor="title">Enter Log day</label> */}
        <input className={style.logday} placeholder='Enter log day' type="text" id="title" />
        {/* <label htmlFor="content">Enter your log</label> */}
        <textarea placeholder='Log Something........' className={style.logdescription} id="content" />
        <button className={style.logbutton} type="submit">Submit</button>
      </form>

      
    </div>
  )
}

export default LogForm