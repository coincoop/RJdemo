'use client'

import React from 'react'
import style from '@/styles/DashBoardSidebar.module.css'
import { icons } from '@/constants'
import { usePathname, useRouter } from 'next/navigation';
import Loading from '../common/Loading';

const DashboardSidebar = () => {

  const [isActive, setIsActive] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === '/admin') {
      setActiveButton('Home');
    } else if (pathname.startsWith('/admin/customers')) {
      setActiveButton('Customers');
    } else if (pathname.startsWith('/admin/products')) {
      setActiveButton('Products');
    } else if (pathname.startsWith('/admin/carts')) {
      setActiveButton('Carts');
    } else if (pathname.startsWith('/admin/marques')) {
      setActiveButton('Marques');
    } else {
      setActiveButton('');
    }
  }, [pathname]);


  const toggleSidebar = () => {
    setIsActive(!isActive);
    setDropdownOpen(null);
  };

  const handleNavigation = (page: string) => {
    setActiveButton(page);

    if (!isActive) {
      // Sidebar đóng: chuyển trang luôn, không dropdown
      if (page === 'Home') {
        router.push('/admin/');
      } else {
        router.push(`/admin/${page.toLowerCase()}`);
      }
      setDropdownOpen(null);
    } else {
      // Sidebar mở: chỉ mở/đóng dropdown, không chuyển trang
      setDropdownOpen(page);
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
        <div className={`${style['items-container']} ${isActive && dropdownOpen === 'Customers' ? style['open'] : ''}`}>
          <button
            className={`${style['btn']} ${activeButton === 'Customers' ? style['active-btn'] : ''}`}
            onClick={() => handleNavigation('Customers')}
          >
            <img className={style['img']} src={(icons.customer).src} alt="" />
            <p className={style['name']}>Customers</p>
          </button>
          {isActive && dropdownOpen === 'Customers' && (
            <div className={`${style['dropdown']} ${style['open']}`}>
              <button
                className={`${style['btn-dropdown']} ${ pathname === '/admin/customers' ? style['active-btn'] : ''}`}
                onClick={() => router.push('/admin/customers')}
              >
                List
              </button>
            </div>
          )}
        </div>
        <div className={`${style['items-container']} ${isActive && dropdownOpen === 'Products' ? style['open'] : ''}`}>
          <button
            className={`${style['btn']} ${activeButton === 'Products' ? style['active-btn'] : ''}`}
            onClick={() => handleNavigation('Products')}
          >
            <img className={style['img']} src={(icons.product).src} alt="" />
            <p className={style['name']}>Products</p>
          </button>
          {isActive && dropdownOpen === 'Products' && (
            <div className={`${style['dropdown']} ${style['open']}`}>
              <button
                className={`${style['btn-dropdown']} ${ pathname === '/admin/products' ? style['active-btn'] : ''}`}
                onClick={() => router.push('/admin/products')}
              >
                List
              </button>
              <button
                className={`${style['btn-dropdown']} ${ pathname === '/admin/products/create' ? style['active-btn'] : ''}`}
                onClick={() => router.push('/admin/products/create')}
              >
                Create
              </button>

            </div>
          )}
        </div>
        <div className={`${style['items-container']} ${isActive && dropdownOpen === 'Carts' ? style['open'] : ''}`}>
          <button
            className={`${style['btn']} ${activeButton === 'Carts' ? style['active-btn'] : ''}`}
            onClick={() => handleNavigation('Carts')}
          >
            <img className={style['img']} src={(icons.cart).src} alt="" />
            <p className={style['name']}>Carts</p>
          </button>
          {isActive && dropdownOpen === 'Carts' && (
            <div className={`${style['dropdown']} ${style['open']}`}>
              <button
                className={`${style['btn-dropdown']} ${ pathname === '/admin/carts' ? style['active-btn'] : ''}`}
                onClick={() => router.push('/admin/carts')}
              >
                List
              </button>
            </div>
          )}
        </div>
        <div className={`${style['items-container']} ${isActive && dropdownOpen === 'Marques' ? style['open'] : ''}`}>
          <button
            className={`${style['btn']} ${activeButton === 'Marques' ? style['active-btn'] : ''}`}
            onClick={() => handleNavigation('Marques')}
          >
            <img className={style['img']} src={(icons.brand).src} alt="" />
            <p className={style['name']}>Marques</p>
          </button>
          {isActive && dropdownOpen === 'Marques' && (
            <div className={`${style['dropdown']} ${style['open']}`}>
              <button
                className={`${style['btn-dropdown']} ${ pathname === '/admin/marques' ? style['active-btn'] : ''}`}
                onClick={() => router.push('/admin/marques')}
              >
                List
              </button>
              <button
                className={`${style['btn-dropdown']} ${ pathname === '/admin/marques/create' ? style['active-btn'] : ''}`}
                onClick={() => router.push('/admin/marques/create')}
              >
                Create
              </button>

            </div>
          )}
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