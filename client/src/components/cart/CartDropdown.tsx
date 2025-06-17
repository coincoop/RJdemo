'use client'

import React from 'react'
import style from '@/styles/DropdownCart.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { authSelector } from '@/redux/reducers/authReducer'
import { useSelector } from 'react-redux'
import cartsAPI from '@/apis/cartApi'
import { io } from 'socket.io-client';
import { appInfo } from '@/constants/appInfos'
import type { ImageKey } from '@/constants';
import { useRouter } from 'next/navigation'
import Button from '../ui/Button'
import Loading from '../common/Loading'


const DropdownCart = ({ onClose }: {
    onClose?: () => void;
}
) => {

    interface Product {
        _id: string;
        name: string;
        price: number;
        description: string;
        img: string;
        img_more: string[];
        item_no: string;
        scale: string;
        marque: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    interface Cart {
        _id: string;
        id_user: string;
        products: CartItem[];
    }

    interface CartItem {
        _id: string;
        id_cart: string;
        id_product: Product;
        quantity: number;
        price: number;
    }

    const socket = io(appInfo.BASE_URL);
    const user = useSelector(authSelector)
    const [cart, setCart] = React.useState<CartItem[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const router = useRouter()

    React.useEffect(() => {
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
            const res = await cartsAPI.handleCart('/get-cart-by-id_user', {
                id_user: user.id,
            },
                'post',
            )
            setCart(res.data.items)
            console.log(res.data.items);

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={style['container']}>
            <div style={{ height: '1rem' }} />
            {
                isLoading ? (

                    <div className={style["loading-container"]}>
                        <div className={style["spinner"]}></div>
                        <p>Loading...</p>
                    </div>

                ) : cart && cart?.length > 0 ? (
                    cart.map((product) => (

                        <div key={product.id_product._id} className={style['items-container']}>
                            <Image
                                width={300}
                                height={300}
                                src={product.id_product.img}
                                alt={product.id_product.name}
                                className={style['img']}
                            />
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
                <Button name='Check out' onClick={() => {
                    router.push('/cart')
                    onClose && onClose()
                }} />
            </div>
        </div>
    )
}

export default DropdownCart