'use client'

import React, { useState } from 'react'
import style from '@/styles/DashBoardSidebar.module.css'
import { icons } from '@/constants'
import { useRouter } from 'next/navigation';

const DashboardSidebar = () => {

  const [isActive, setIsActive] = useState(false);
  const [activeButton, setActiveButton] = useState('');
  const router = useRouter();



  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const handleNavigation = (page: string) => {
    setActiveButton(page);
    if (page !== 'Home') {
      router.push(`/admin/${page.toLowerCase()}`)
    } else {
      router.push('/admin')
    }
  };

  return (
    <div className={`${style['container']} ${isActive ? style['active'] : ''}`}>
      <div className={style['header']}>
        <img className={style['img-header']} src={(icons.dashboard).src} alt="" />
        <p className={style['name-header']}>Management</p>
      </div>
      <div className={style['list-items-container']}>
        <div className={style['items-container']}>
          <button
            className={`${style['btn']} ${activeButton === 'Home' ? style['active-btn'] : ''}`}
            onClick={() => handleNavigation('Home')}
          >
            <img className={style['img']} src={(icons.chart).src} alt="" />
            <p className={style['name']}>Dashboard</p>
          </button>
        </div>
        <div className={style['items-container']}>
          <button
            className={`${style['btn']} ${activeButton === 'Customers' ? style['active-btn'] : ''}`}
            onClick={() => handleNavigation('Customers')}
          >
            <img className={style['img']} src={(icons.customer).src} alt="" />
            <p className={style['name']}>Customer</p>
          </button>
        </div>
        <div className={style['items-container']}>
          <button
            className={`${style['btn']} ${activeButton === 'Products' ? style['active-btn'] : ''}`}
            onClick={() => handleNavigation('Products')}
          >
            <img className={style['img']} src={(icons.product).src} alt="" />
            <p className={style['name']}>Products</p>
          </button>
        </div>
        <div className={style['items-container']}>
          <button
            className={`${style['btn']} ${activeButton === 'Carts' ? style['active-btn'] : ''}`}
            onClick={() => handleNavigation('Carts')}
          >
            <img className={style['img']} src={(icons.cart).src} alt="" />
            <p className={style['name']}>Carts</p>
          </button>
        </div>
        <div className={style['items-container']}>
          <button
            className={`${style['btn']} ${activeButton === 'Marques' ? style['active-btn'] : ''}`}
            onClick={() => handleNavigation('Marques')}
          >
            <img className={style['img']} src={(icons.cart).src} alt="" />
            <p className={style['name']}>Marques</p>
          </button>
        </div>
      </div>
      <div className={style['header']}>
        <button onClick={toggleSidebar} className={style['btn']}>
          {isActive ?
            <>
              <img className={style['img-footer']} src={(icons.left_arrow).src} alt="" />
            </> :
            <>
              <img className={style['img-footer']} src={(icons.right_arrow).src} alt="" />
            </>
          }
        </button>
      </div>
    </div>
  )
}

export default DashboardSidebar