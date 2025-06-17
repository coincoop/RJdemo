'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import style from '@/styles/Success.module.css'
import { icons } from '@/constants'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Loading from '@/components/common/Loading'

const OrderSuccess = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    // Kiểm tra xem có phải từ trang checkout không
    setIsLoading(true)
    const isCheckoutSuccess = localStorage.getItem('checkoutSuccess')
    if (!isCheckoutSuccess) {
      // Nếu không phải từ checkout, chuyển về trang chủ
      router.push('/')
    }
    setIsLoading(false)
    // Xóa flag sau khi kiểm tra
    localStorage.removeItem('checkoutSuccess')
  }, [])

  if (!isLoading) return <Loading />

  return (
    <div className={style['container']}>
      <div className={style['success-content']}>
        <div className={style['icon-container']}>
          <Image 
            src={icons.check_shadow} 
            alt="success" 
            width={100} 
            height={100}
            className={style['success-icon']}
          />
        </div>
        <h1>Đặt hàng thành công!</h1>
        <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>
        <div className={style['button-group']}>
          <Button 
            name='Tiếp tục mua sắm'
            onClick={() => router.push('/')}
          />
          <Button 
            name='Xem đơn hàng của tôi'
            onClick={() => router.push('/orders')}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess