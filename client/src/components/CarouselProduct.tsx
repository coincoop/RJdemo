'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import Space from './Space';
import '@/styles/CarouselProduct.css'
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import productsAPI from '@/apis/productApi';
import { ImageKey, images } from '@/constants';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/reducers/authReducer';
import cartsAPI from '@/apis/cartApi';
import Loading from './Loading';
import { useRouter } from 'next/navigation';

type Product = {
    _id: string;
    name: string;
    price: string;
    img: ImageKey;
};

const CarouselProdcut = ({ title }: CarouselProductProps) => {
    const user = useSelector(authSelector)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [idProduct, setIdProduct] = useState('')
    const router = useRouter()
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])


    useEffect(() => {
        fetchProducts();
    }, []);

    const addCartHandle = async () => {
        setIsLoading(true)
        try {
            const res = await cartsAPI.handleCart(
                '/create-cart',
                {
                    id_user: user.id,
                    products: [{
                        id_product: idProduct,
                        quantity: 1
                    }]
                },
                'post',
            )
            setIsLoading(false)
        } catch (error) {
            console.log(error);

        }
    }

    const fetchProducts = async () => {
        try {
            const res = await productsAPI.handleProduct('/get-all-product',
                'get'
            )
            setProducts(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    }

    return (
        <>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <section className="embla">
                        <h1 className='carousel-title'>{title}</h1 >
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
                                            <button onClick={() => {
                                                setIdProduct(product._id)
                                                addCartHandle()
                                            }
                                            }>Mua ngay</button>
                                        </div>
                                        <Space height='1em' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section >
                )
            }
        </>
    )
}

export default CarouselProdcut