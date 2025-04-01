'use client';

import React, { useEffect } from 'react'
import Slider from 'react-slick';
import Space from './Space';
import '@/styles/CarouselProduct.css'
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const CarouselProdcut = ({ title, products }: CarouselProductProps) => {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    return (
        <div className="embla">
            <h1 className='carousel-title'>{title}</h1>
            <Space height='1em' />
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {products.map(product => (
                        <div key={product.id} className="carousel-prod">

                            <img src={product.image[0]} alt={product.name} className="carousel-prod-image" />
                            <Space height='1em'/>
                            <h3 className="carousel-prod-name">{product.name}</h3>
                            <Space height='1em'/>
                            <p className=" carousel-prod-price">{product.price} vnđ</p>
                            <Space height='1em'/>
                            <div  className="carousel-prod-btn">

                                <button>Mua ngay</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CarouselProdcut