import { images } from '@/constants';
import React from 'react'
import style from '@/styles/ProductDisplay.module.css'
import Image from 'next/image';
import NotFound from './NotFound';

const ProductDisplay = ({ productList }: {
    productList: {
        img: keyof typeof images;
        name: string;
        _id: string;
        description: string;
        price: number;
        item_no: string;
        scale: string;
        marque: string;
        status: string;
        img_more: Array<keyof typeof images>;
    }
}) => {

    return (

        <div className={style['container']}>
            <h2 className={style['name']}>
                {productList.name}
            </h2>
            <div style={{ height: '1rem' }} />
            <div className={style['carousel']}>
                <Image alt={productList.name ?? 'Product image'} src={images[productList.img ?? 'img_silder_1']} />
            </div>
            <div className={style['info']}>
                <div className={style['item_no']}>
                    Item No: <span className={style['right-column']}>{productList.item_no}</span>
                </div>
                <div className={style['scale']}>
                    Scale: <span className={style['right-column']}>{productList.scale}</span>
                </div>
                <div className={style['marque']}>
                    Marque: <span className={style['right-column']}>{productList.marque}</span>
                </div>
                <div className={style['status']}>
                    Status: <span className={style['right-column']}>{productList.status}</span>
                </div>
                <div className={style['price']}>
                    {productList.price} <span className={style['right-column']}>vnđ</span> 
                </div>
            </div>
            <div className={style['btn']}>
                <button >Buy Now</button>
            </div>
            <div className={style['description']}>
                {productList.description}
            </div>
        </div>
    )

}

export default ProductDisplay