import React from 'react'
import Image from 'next/image'
import style from '@/styles/CardProduct.module.css'
import { icons, ImageKey, images } from '@/constants'
import Link from 'next/link'
import { ListStart } from 'lucide-react'

const ProductCard = ({ listCar }: {
  listCar: {
    img: ImageKey;
    name: string,
    _id: string;
    description: string;
    price: number;
    item_no: string;
    scale: string;
    marque: string;
    status: string;
    img_more: ImageKey;
  }



}) => {

  return (
    <div className={style['container']} >
      <div className={style["img-container"]}>
        <Image src={listCar.img} width={300} height={300} alt={listCar.name} className={style['image']} />
        <div className={style['icon-container']}>
          <Link href={`/products/${listCar._id}`} >
            <Image className={style['icon']} src={icons.link} alt="Link Icon" />
          </Link>
        </div>
        <Link className={style['link']} href={`/products/${listCar._id}`} />

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

export default ProductCard