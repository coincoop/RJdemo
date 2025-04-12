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


const DropdownCart = (
) => {

    interface Product {
        _id: string; // ID của sản phẩm
        name: string; // Tên sản phẩm
        price: number; // Giá sản phẩm
        description: string; // Mô tả sản phẩm
        img: keyof typeof images; // Key của `images` để truyền vào
        img_more: string[]; // Danh sách ảnh bổ sung
        item_no: string; // Mã sản phẩm
        scale: string; // Tỷ lệ sản phẩm
        marque: string; // Thương hiệu
        status: string; // Trạng thái sản phẩm
        createdAt: string; // Thời gian tạo
        updatedAt: string; // Thời gian cập nhật
        __v: number; // Phiên bản của document
    }

    interface CartProduct {
        id_product: Product; // Tham chiếu đến kiểu `Product`
        quantity: number; // Số lượng sản phẩm
        price: number; // Giá sản phẩm
        totalPrice: number; // Tổng giá của sản phẩm
        _id: string; // ID của sản phẩm trong giỏ hàng
    }

    interface CartUseState {
        _id: string; // ID của giỏ hàng
        id_user: string; // ID của người dùng
        products: CartProduct[]; // Danh sách sản phẩm trong giỏ hàng
        createdAt: string; // Thời gian tạo giỏ hàng
        updatedAt: string; // Thời gian cập nhật giỏ hàng
        __v: number; // Phiên bản của document
    }

    const socket = io(appInfo.BASE_URL);
    const user = useSelector(authSelector)
    const [cart, setCart] = useState<CartUseState>()
    const [isLoading, setIsLoading] = useState(false)

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
                isLoading?(
                    <div className={style['items-container']}>
                    <p>Loading...</p>
                </div>
                ) : cart && cart.products.length > 0 ? (
                    cart.products.map((product) => (
                        <Link href={'#'}>
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
                        </Link>
                    ))
                ) : (
                    <div className={style['items-container']}>
                        <p>Không có sản phẩm nào trong giỏ hàng</p>
                    </div>
                )
            }
            <div className={style['btn-container']}>

                <button className={style['btn']}>Check out</button>
            </div>
        </div>
    )
}

export default DropdownCart