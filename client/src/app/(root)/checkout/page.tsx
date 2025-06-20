'use client'
/* eslint no-use-before-define: 0 */
import React from 'react'
import { useRouter } from 'next/navigation'
import style from '@/styles/Checkout.module.css'
import Form from 'next/form'
import checkoutsAPI from '@/apis/checkoutApi'
import CartList from '@/components/cart/CartList'
import InputField from '@/components/ui/InputField'

const CheckoutPage = () => {
  const router = useRouter()
  const [checkoutData, setCheckoutData] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [cart, setCart] = React.useState<Cart>()
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cash'
  })



  React.useEffect(() => {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const data = localStorage.getItem('checkoutData')
    if (data) {
      setCart(JSON.parse(data).cart)
      setCartItems(JSON.parse(data).cartItems)
      setTotalPrice(JSON.parse(data).totalPrice)
      setCheckoutData(JSON.parse(data))
    } else {
      // Nếu không có dữ liệu, chuyển về trang giỏ hàng
      router.push('/cart')
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      // Gọi API tạo hóa đơn
      const response = await checkoutsAPI.handleCheckout('/create-invoice', {

        id_user: cart?.id_user,
        products: cartItems.map((item: any) => ({
          id_product: item.id_product._id,
          quantity: item.quantity
        })),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        paymentMethod: formData.paymentMethod,
        note: ''

      },
        'post',
      )

      if (response.status === 200) {
        // Chuyển hướng ngay lập tức
        router.push('/success')
        // Sau đó mới xử lý localStorage
        localStorage.removeItem('checkoutData')
        localStorage.setItem('checkoutSuccess', 'true')
      }
      setIsLoading(false)
    } catch (error) {
      console.log('Error creating invoice:', error)
    }
  }

  if (!checkoutData) return null

  return (
    <div className={style['container']}>
      <h1>Checkout</h1>
      <div className={style['checkout-content']}>
        <div className={style['order-summary']}>
          <h2>Order Summary</h2>
          <CartList cart={cart} cartItems={cartItems} totalPrice={totalPrice} setCart={setCart} setCartItems={setCartItems} setTotalPrice={setTotalPrice} />
        </div>
        <div style={{ height: '50px' }} />
        <h2>Shipping Information</h2>
        <Form
          action=""
          onSubmit={handleSubmit}
          className={style['checkout-form']}
        >
          <div className={style['form-group']}>

            <InputField type='text' name='fullName' width='300px' label='Full Name' onChange={handleInputChange} />
            <InputField type='email' name='email' width='300px' label='Email' onChange={handleInputChange} />
            <InputField type='tel' name='phone' width='300px' label='Phone' onChange={handleInputChange} />
            <InputField type='text' name='address' width='300px' label='Address' onChange={handleInputChange} />
            <InputField type='text' name='city' width='300px' label='City' onChange={handleInputChange} />
            <InputField type='text' name='state' width='300px' label='State' onChange={handleInputChange} />
            <InputField type='text' name='zipCode' width='300px' label='ZIP Code' onChange={handleInputChange} />
            <div className={style['form-group-payment']}>
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
              >
                <option value="cash">Cash on Delivery</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="momo">MoMo</option>
                <option value="zalopay">ZaloPay</option>
              </select>
            </div>
          </div>


          <div style={{ height: '20px' }}></div>

          <button
            className={isLoading ? style['btn-disabled'] : style['btn-submit']}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Loading..." : "Place Order"}
          </button>
        </Form>
      </div>
    </div>
  )
}

export default CheckoutPage