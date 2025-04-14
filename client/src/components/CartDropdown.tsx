'use client'

import React, { useEffect, useState } from 'react'
import style from '@/styles/DropdownCart.module.css'
import Link from 'next/link'
import { images } from '@/constants'
import { authSelector } from '@/redux/reducers/authReducer'
import { useSelector } from 'react-redux'
import cartsAPI from '@/apis/cartApi'
import { io } from 'socket.io-client';
import { appInfo } from '@/constants/appInfos'
import type { ImageKey } from '@/constants';
import { useRouter } from 'next/navigation'


const DropdownCart = ({ onClose }: {
    onClose?: () => void;
}
) => {

    interface Product {
        _id: string;
        name: string;
        price: number;
        description: string;
        img: ImageKey;
        img_more: string[];
        item_no: string;
        scale: string;
        marque: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    interface CartProduct {
        id_product: Product;
        quantity: number;
        price: number;
        totalPrice: number;
        _id: string;
    }

    interface CartUseState {
        _id: string;
        id_user: string;
        products: CartProduct[];
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    const socket = io(appInfo.BASE_URL);
    const user = useSelector(authSelector)
    const [cart, setCart] = useState<CartUseState>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        handleGetCart();
        socket.on('cartUpdated', (data) => {
            console.log('Cart updated:', data);
            if (data.id_user === 'user_id_here') {
                setCart(data.cart.products);
            }
        });
        return () => {
            socket.off('cartUpdated');
        };
    }, []);

    const handleGetCart = async () => {
        try {
            setIsLoading(true)
            const res = await cartsAPI.handleCart('/get-cart-by-id_user', {
                id_user: user.id,
            },
                'post',
            )
            setCart(res.data)
          
            
            setIsLoading(false)
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className={style['container']}>
            {
                isLoading ? (
                    <div className={style['items-container']}>
                        <p>Loading...</p>
                    </div>
                ) : cart && cart?.products?.length > 0 ? (
                    cart.products.map((product) => (

                        <div key={product.id_product._id} className={style['items-container']}>
                            <img
                                className={style['img']}
                                src={images[product.id_product.img].src}
                                alt={product.id_product.name} />
                            <div className={style['infos-container']}>
                                <p className={style['name']}>{product.id_product.name}</p>
                                <p className={style['price']}>{product.price} vnđ</p>
                                <p className={style['quantity']}>Quantity: {product.quantity}</p>
                            </div>

                        </div>

                    ))
                ) : (
                    <div className={style['items-container']}>
                        <p>Your cart are empty</p>
                    </div>
                )
            }
            <div className={style['btn-container']}>

                <button
                    onClick={() => {
                        if(onClose) onClose()
                        router.push('/cart')
                    }}
                    className={style['btn']}>Check out</button>
            </div>
        </div>
    )
}

export default DropdownCart