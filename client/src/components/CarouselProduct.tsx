'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import Space from './Space';
import '@/styles/CarouselProduct.css'
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import carsAPI from '@/apis/carApi';
import { images } from '@/constants';
import Link from 'next/link';

type Product = {
    _id: string;
    name: string;
    price: string;
    img: keyof typeof images;
};

const CarouselProdcut = ({ title }: CarouselProductProps) => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            const res = await carsAPI.handleCar('/get-all-car',
                'get'
            )
            setProducts(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    }


    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    return (
        <div className="embla">
            <h1 className='carousel-title'>{title}</h1>
            <Space height='1em' />
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {products.map(product => (
                        <div key={product._id} className="carousel-prod">

                            <Link href={`/products/${product._id}`}>
                                <Image src={images[product.img]} alt={product.name} className="carousel-prod-image" />
                            </Link>
                            <Space height='1em' />
                            <h3 className="carousel-prod-name">{product.name}</h3>
                            <Space height='1em' />
                            <p className=" carousel-prod-price">{product.price} vnđ</p>
                            <Space height='1em' />
                            <div className="carousel-prod-btn">
                                <button>Mua ngay</button>
                            </div>
                            <Space height='1em' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CarouselProdcut