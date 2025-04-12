import React from 'react'
import style from '@/styles/DropdownCart.module.css'
import Link from 'next/link'
import { images } from '@/constants'

const DropdownCart = (
   ) => {
    return (
        <div className={style['container']}>
            <Link href={'#'}>
                <div className={style['items-container']}>
                    <img className={style['img']} src={(images.chevrolet_316_1).src} alt="" />
                    <div className={style['infos-container']}>
                        <p className={style['name']}> lore </p>
                        <p className={style['price']}>11111 vnđ</p>
                        <p className={style['quantity']}>quantity: 1</p>
                    </div>

                </div>
            </Link>
            <div className={style['btn-container']}>

                <button className={style['btn']}>Check out</button>
            </div>
        </div>
    )
}

export default DropdownCart