import React from 'react'
import CartList from '@/components/cart/CartList'
import style from '@/styles/Page.module.css'

const Cart = () => {
  
    return (
        <section  className={style['container']}>
            <CartList />
        </section>
    )
}

export default Cart