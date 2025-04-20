'use client'

import React, { useEffect, useState } from 'react'
import style from '@/styles/CartList.module.css'
import { icons, ImageKey, images } from '@/constants'
import { useSelector } from 'react-redux'
import { authSelector } from '@/redux/reducers/authReducer'
import cartsAPI from '@/apis/cartApi'
import Loading from '../common/Loading'
import { useRouter } from 'next/navigation'
import Button from '../ui/Button'


const CartList = () => {
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
  const user = useSelector(authSelector)
  const [cart, setCart] = useState<CartUseState>()
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const router = useRouter()

  useEffect(() => {
    handleGetCart()
  }, [])

  const handleSelectProduct = (productId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleDeleteSelectedProducts = () => {
    if (!cart) return;

    const updatedProducts = cart.products.filter(
      (product) => !selectedProducts.includes(product.id_product._id)
    );

    const newTotalPrice = updatedProducts.reduce((sum, product) => sum + product.totalPrice, 0);

    setCart({ ...cart, products: updatedProducts });
    setTotalPrice(newTotalPrice);
    setSelectedProducts([]);

    updateCartOnServer(updatedProducts);
  };

  const handleDeleteAllProducts = () => {
    if (!cart) return;
  
    setCart({ ...cart, products: [] });
    setTotalPrice(0);
    setSelectedProducts([]);
  
    updateCartOnServer([]);
  };

  const handleGetCart = async () => {
    try {
      setIsLoading(true)
      const res = await cartsAPI.handleCart('/get-cart-by-id_user', {
        id_user: user.id
      },
        'post'
      )
      const total = res.data.products?.reduce((sum: number, product: CartProduct): number => {
        return sum + product.totalPrice;
      }, 0);
      setCart(res.data)
      setTotalPrice(total)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  const updateCartOnServer = async (updatedProducts: CartProduct[]) => {
    try {
      await cartsAPI.handleCart(
        '/update-cart',
        {
          id_user: user.id,
          products: updatedProducts
        },
        'post'
      )
    } catch (error) {
      console.log(error);

    }
  }

  const handleQuantityChange = (productId: string, action: 'plus' | 'minus') => {
    if (!cart) return;

    const updatedProducts = cart.products.map((product) => {
      if (product.id_product._id === productId) {
        const newQuantity = action === 'plus' ? product.quantity + 1 : product.quantity - 1;

        if (newQuantity < 1) return product;

        return {
          ...product,
          quantity: newQuantity,
          totalPrice: newQuantity * product.price,
        };
      }
      return product;
    });

    const newTotalPrice = updatedProducts.reduce((sum, product) => sum + product.totalPrice, 0);

    setCart({ ...cart, products: updatedProducts });
    setTotalPrice(newTotalPrice);

    updateCartOnServer(updatedProducts);
  };

  const handleDeleteProduct = (productId: string) => {
    if (!cart) return

    const updatedProducts = cart.products.filter(
      (product) => product.id_product._id !== productId
    )

    const newTotalPrice = updatedProducts?.reduce((sum, product) => sum + product.totalPrice, 0)

    setCart({ ...cart, products: updatedProducts })
    setTotalPrice(newTotalPrice)

    updateCartOnServer(updatedProducts)
  }
  return (
    <>
      {
        !isLoading ? (
          <div className={style['container']}>
            <div style={{ height: '1rem' }} />
            <div className={style['header-container']}>
              <p>Cart</p>
              {selectedProducts.length > 0 && (
                <div className={style['btn-del-selected-container']}>
                  <button onClick={handleDeleteSelectedProducts} className={style['btn-del-selected']}>
                    Xóa các sản phẩm đã chọn
                  </button>
                </div>
              )}
            </div>
            <div className={style['cart-list']}>
              {
                cart && cart?.products?.length > 0 ? (
                  cart.products.map((product) => (
                    <div key={product.id_product._id} className={style['product-container']}>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id_product._id)}
                        onChange={(e) => handleSelectProduct(product.id_product._id, e.target.checked)}
                        className={style['checkbox']}
                      />
                      <div className={style['img-container']}>
                        <img className={style['img']} src={(images[product.id_product.img]).src} alt={product.id_product.name} />
                      </div>
                      <div className={style['info-container']}>
                        <div className={style['name']}>{product.id_product.name}</div>
                        <div className={style['price']}>{product.id_product.price} vnđ</div>
                        <div className={style['quantity-container']}>
                          <button onClick={() =>
                            handleQuantityChange(product.id_product._id, 'plus')
                          }
                            className={style['btn-pm']}>
                            <img className={style['icon-pm']} src={(icons.plus).src} alt="" />
                          </button>
                          <input className={style['quantity']} type="number" value={product.quantity} readOnly />
                          <button onClick={() =>
                            handleQuantityChange(product.id_product._id, 'minus')
                          }
                            className={style['btn-pm']}>
                            <img className={style['icon-pm']} src={(icons.minus).src} alt="" />
                          </button>
                        </div>
                      </div>
                      <div className={style['btn-del-container']}>
                        <button onClick={() => handleDeleteProduct(product.id_product._id)} className={style['btn-del']}>
                          <img className={style['icon-del']} src={(icons.remove).src} alt="" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={style['cart-list']}>
                    <div className={style['empty-container']}>
                      <p className={style['empty']}>Your cart is empty</p>
                    </div>
                  </div>
                )
              }
            </div>

            {cart && cart.products?.length > 0 && (
              <div className={style['btn-del-all-container']}>
                <button onClick={handleDeleteAllProducts} className={style['btn-del-all']}>
                  Xóa tất cả sản phẩm
                </button>
              </div>
            )}
            
            {cart && cart.products?.length > 0 ? (
              <>
                <div className={style['total-price']}>Total Price:  <p>{totalPrice.toLocaleString()} vnđ</p></div>
                <div className={style['btn-po']}>
                  <Button name='Place order' onClick={() => console.log('lo')
                  } />
                </div>
              </>

            ) : (
              <div className={style['btn-po']}>
                <button onClick={() => router.push('/products')} className={style['']}>Tiếp tục mua sắm</button>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )
      }
    </>
  )
}

export default CartList