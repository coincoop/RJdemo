'use client';

import Image from 'next/image'
import React from 'react'
import Space from '../ui/Space';
import '@/styles/CarouselProduct.css'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import productsAPI from '@/apis/productApi';
import { ImageKey, images } from '@/constants';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/reducers/authReducer';
import cartsAPI from '@/apis/cartApi';
import Loading from '../common/Loading';
import Button from '../ui/Button';
import { getPlaiceholder } from "plaiceholder";

type Product = {
    _id: string;
    name: string;
    price: string;
    img: ImageKey;
};

const ProdcutCarousel = ({ title }: CarouselProductProps) => {
    const user = useSelector(authSelector)
    const [isLoading, setIsLoading] = React.useState(false)
    const [products, setProducts] = React.useState<Product[]>([])
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])


    React.useEffect(() => {
        fetchProducts();
    }, []);

    const addCartHandle = async (productId: string) => {
        if (!productId) {
            console.error("idProduct is not set");
            return;
        }
        try {
            setIsLoading(true)
            const res = await cartsAPI.handleCart(
                '/create-cart',
                {
                    id_user: user.id,
                    products: [{
                        id_product: productId,
                        quantity: 1
                    }]
                },
                'post',
            )
            console.log(res);

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
                                            <Image
                                                width={300}
                                                height={300}
                                                src={product.img}
                                                alt={product.name}
                                                className="carousel-prod-image"
                                            />
                                        </Link>
                                        <Space height='1em' />
                                        <h3 className="carousel-prod-name">{product.name}</h3>
                                        <Space height='1em' />
                                        <p className=" carousel-prod-price">{product.price} vnđ</p>
                                        <Space height='1em' />
                                        <div className="carousel-prod-btn">
                                            <Button name='Buy' onClick={() => addCartHandle(product._id)} />
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

export default ProdcutCarousel