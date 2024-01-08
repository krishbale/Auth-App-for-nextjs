'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import style from './button.module.css'
const Button = ({where,name}:any) => {
  const router = useRouter()

  return (
    <button className={style.button} onClick={() => router.push(where)}>{name}</button>
    )
}

export default Button