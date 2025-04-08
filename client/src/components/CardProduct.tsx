import React from 'react'
import Image from 'next/image'
import style from '@/styles/CardProduct.module.css'
import { images } from '@/constants'

const CardProduct = ({ listCar }: {
  listCar: {
    img: keyof typeof images; 
    name: string, 
    id: string;
    description: string;
    price: number;
    item_no: string;
    scale: string;
    marque: string;
    status: string;
    img_more:  keyof typeof images;
  }
}) => {
  return (
    <div className={style['container']} >
      <Image width={300} height={200} src={images[listCar.img]} alt={listCar.name} className={style['image']} />
      {listCar.name}
    </div >
  )
}

export default CardProduct