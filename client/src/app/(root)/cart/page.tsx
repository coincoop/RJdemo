'use client'

import React, { useState } from 'react'
import CartList from '@/components/cart/CartList'
import style from '@/styles/Page.module.css'
import cartsAPI from '@/apis/cartApi'
import { useSelector } from 'react-redux'
import { authSelector } from '@/redux/reducers/authReducer'
import Loading from '@/components/common/Loading'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

const Cart = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [cart, setCart] = useState<Cart[]>([])
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [totalPrice, setTotalPrice] = useState(0)
    const user = useSelector(authSelector)
    const router = useRouter()

    React.useEffect(() => {
        handleGetCart()
    }, [])

    const handleGetCart = async () => {
        try {
            const res = await cartsAPI.handleCart('/get-cart-by-id_user', {
                id_user: user.id
            },
                'post'
            )
            const total = res.data.items.reduce((sum: number, product: CartItem): number => {
                return sum + (product.price * product.quantity);
            }, 0);
            setCart(res.data.cart)
            setCartItems(res.data.items)
            setTotalPrice(total)
            setIsLoading(false)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <Loading />
    } else {
        return (
            <section className={style['container']}>
                <CartList cart={cart} cartItems={cartItems} totalPrice={totalPrice} setCart={setCart} setCartItems={setCartItems} setTotalPrice={setTotalPrice} />
                {cartItems && cartItems.length > 0 ? (
                    <>
                        <div className={style['btn-po']}>
                            <Button
                                name='Place order'
                                onClick={() => {
                                    const checkoutData = {
                                        cart,
                                        cartItems,
                                        totalPrice
                                    };
                                    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
                                    router.push('/checkout');
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <div className={style['btn-po']}>
                        <button onClick={() => router.push('/products')} className={style['']}>Tiếp tục mua sắm</button>
                    </div>
                )}

            </section>


        )
    }
}

export default Cart