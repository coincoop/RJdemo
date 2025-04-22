'use client'

import React from 'react'
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
  const user = useSelector(authSelector)
  const [cart, setCart] = React.useState<Cart>()
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
  const router = useRouter()

  React.useEffect(() => {
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
    if (!user?.id || selectedProducts.length === 0) return;

    const productIdsToDelete: string[] = selectedProducts;

    const updatedProducts = cartItems.filter(
      (item) => !selectedProducts.includes(item.id_product._id)
    );
    const newTotalPrice = updatedProducts.reduce((sum, product) => sum + product.quantity * product.price, 0);
    setCartItems(updatedProducts);
    setTotalPrice(newTotalPrice);
    setSelectedProducts([]);
    handleDeleteProductCart(productIdsToDelete);
  };

  const handleDeleteAllProducts = () => {
    if (!cartItems) return;
    const allProductIds = cartItems.map(item => item.id_product._id);
    if (allProductIds.length > 0) {
      handleDeleteProductCart(allProductIds);
    }
    setCartItems([]);
    setTotalPrice(0);
    setSelectedProducts([]);

  };

  const handleDeleteProductCart = async (productId: string[] | string) => {
    try {
      setIsLoading(true)
      console.log(productId);

      await cartsAPI.handleCart('/delete-cart', {
        id_user: user.id,
        id_item: productId
      },
        'delete'
      )
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false)
    }
  }

  const handleGetCart = async () => {
    try {
      setIsLoading(true)
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

  const updateCartOnServer = async (itemId: string, newQuantity: number) => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      await cartsAPI.handleCart(
        '/update-cart',
        {
          id_user: user.id,
          id_item: itemId,
          quantity: newQuantity
        },
        'post'
      )
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleQuantityChange = (itemId: string, currentQuantity: number, action: 'plus' | 'minus') => {

    const newQuantity = action === 'plus' ? currentQuantity + 1 : currentQuantity - 1;

    if (newQuantity < 1) return;

    let changedItem: CartItem | undefined;

    const updatedItems = cartItems.map((item) => {
      if (item.id_product._id === itemId) {
        changedItem = { ...item, quantity: newQuantity };
        return changedItem;
      }
      return item;
    });

    if (changedItem) {
      const newTotalPrice = updatedItems.reduce((sum, product) => sum + (product.quantity * product.price), 0);
      setCartItems(updatedItems)
      setTotalPrice(newTotalPrice);
      updateCartOnServer(itemId, newQuantity);
    } else {
      console.error('Item not found in cart items');
    };
  }

  const handleDeleteProduct = (productId: string) => {
    if (!cartItems) return

    const updatedProducts = cartItems.filter(
      (product) => product.id_product._id !== productId
    )

    const newTotalPrice = updatedProducts?.reduce((sum, product) => sum + (product.price * product.quantity), 0)
    handleDeleteProductCart(productId)
    setCartItems(updatedProducts)
    setTotalPrice(newTotalPrice)
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
                cartItems && cartItems?.length > 0 ? (
                  cartItems.map((product) => (
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
                            handleQuantityChange(product.id_product._id, product.quantity, 'plus')
                          }
                            className={style['btn-pm']}>
                            <img className={style['icon-pm']} src={(icons.plus).src} alt="" />
                          </button>
                          <input className={style['quantity']} type="number" value={product.quantity} readOnly />
                          <button onClick={() =>
                            handleQuantityChange(product.id_product._id, product.quantity, 'minus')
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

            {cartItems && cartItems.length > 0 && (
              <div className={style['btn-del-all-container']}>
                <button onClick={handleDeleteAllProducts} className={style['btn-del-all']}>
                  Xóa tất cả sản phẩm
                </button>
              </div>
            )}

            {cartItems && cartItems.length > 0 ? (
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