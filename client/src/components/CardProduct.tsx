import React from 'react'
import Image from 'next/image'
import style from '@/styles/CardProduct.module.css'
import { icons, images } from '@/constants'
import Link from 'next/link'

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
    img_more: keyof typeof images;
  }
}) => {
  return (
    <div className={style['container']} >
      <div className={style["img-container"]}>
        <Image src={images[listCar.img]} alt={listCar.name} className={style['image']} />
        <div className={style['icon-container']}>
          <Image className={style['icon']} src={icons.link} alt="Link Icon" />
        </div>
        <Link className={style['link']} href={'#'} />

      </div>
      <div className={style['text-container']}>

        <p className={style['name']}>
          {listCar.name}
        </p>
        <p className={style['description']}>
          {listCar.item_no}
        </p>
        <p className={style['price']}>
          {listCar.price} vnđ
        </p>
      </div>
    </div >
  )
}

export default CardProduct