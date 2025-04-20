import React from 'react'
import style from '@/styles/Loading.module.css'

const Loading = () => {
  return (
    <div className={style["loading-container"]}>
      <div className={style["spinner"]}></div>
      <p>Loading...</p>
    </div>
  )
}

export default Loading