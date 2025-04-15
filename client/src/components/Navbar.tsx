'use client';

import React, { useState, useEffect, useRef } from 'react';
import "@/styles/Navbar.css";
import { images, icons } from '@/constants'
import Link from 'next/link';
import { authSelector, removeAuth } from '@/redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import CartDropdown from './CartDropdown';
import UserDropdown from './UserDropdown';
import style from '@/styles/Navbar.module.css'

export default function Navbar({ isLogin }: { isLogin?: boolean }) {
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false)
    const [userOpen, setUserOpen] = useState(false)
    const auth = useSelector(authSelector)
    const router = useRouter()

    const dispatch = useDispatch()
    const closeCart = () => setCartOpen(false)
    const closeUser = () => setUserOpen(false)

    const toggleSubmenu = (menuName: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setActiveSubmenu(prevActiveSubmenu =>
            prevActiveSubmenu === menuName ? null : menuName
        );
    };

    const closeAll = () => {
        setActiveSubmenu(null);
        setMobileMenuOpen(false);
        setCartOpen(false)
        setUserOpen(false)
    };

    const toggleMobileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setMobileMenuOpen(prev => !prev);
    };

    const toggleCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        closeAll()
        setCartOpen(prev => !prev);
    };

    const toggleUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        closeAll()
        setUserOpen(prev => !prev);
    };

    useEffect(() => {

        const handleClick = (event: MouseEvent) => {
            if (event.target instanceof Element &&
                !event.target.closest('.navbar__submenu') &&
                !event.target.closest('.navbar__cart') &&
                !event.target.closest('.navbar__profile') &&
                !event.target.closest('.navbar__mobile-toggle')
            ) {
                closeAll();
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <header className="navbar">
            <div className="navbar__left">
                <Link href="/">
                    <img src={images.logo.src} alt="Logo" className="navbar__logo" />
                </Link>
            </div>
            <div className={`navbar__center ${mobileMenuOpen ? 'active' : ''}`}>
                <nav style={{ display: 'flex' }}>
                    <ul className="navbar__menu">
                        <li><Link href="/">Home</Link></li>
                        <li className={`navbar__dropdown ${activeSubmenu === 'products' ? 'active' : ''}`}>
                            <span onClick={(e) => toggleSubmenu('products', e)}><Link href={'/products'}>Products</Link></span>
                            <ul className="navbar__submenu">
                                <li><Link href="/bmw">BMW</Link></li>
                                <li><Link href="/ducati">Ducati</Link></li>
                            </ul>
                        </li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="navbar__right">
                <div className="navbar__cart">
                    <button className='navbar__cart__btn' onClick={toggleCart}>
                        <img className='logo_cart' src={icons.cart.src} alt="Cart" />
                    </button>
                    {
                        cartOpen && <CartDropdown onClose={closeCart} />
                    }
                </div>
                {
                    isLogin && auth ? (
                        <div className="navbar__profile">
                            <button onClick={toggleUser} className='navbar__profile-btn'>

                                <img src={(icons.user).src} alt="" />
                            </button>
                            {
                                userOpen && <UserDropdown onClose={closeUser} />
                            }
                        </div>
                    ) : (
                        <>
                            <Link href="/sign-in" className="navbar__login">
                                Login
                            </Link>
                            <Link href="/sign-up" className="navbar__login">
                                Register
                            </Link>
                        </>
                    )

                }
                <button className="navbar__mobile-toggle" onClick={toggleMobileMenu}>
                    <img src={icons.menu.src} alt="Menu" />
                </button>
            </div>
        </header>
    );
}

export function DashBoardNavbar() {

    const pathname = usePathname();
    console.log(pathname);
    
    const getPageTitle = () => {
        switch (pathname) {
            case '/admin/':
                return 'Home';
            case '/admin/customers':
                return 'Customer';
            case '/admin/products':
                return 'Products';
            case '/admin/carts':
                return 'Carts';
            default:
                return 'Dashboard'; // Tên mặc định
        }
    };

    return (
        <div className={style['container']}>
            <div className={style['header-container']}>
                <p className={style['header']}>
                    {getPageTitle()}
                </p>
            </div>
            <div className={style['right-container']}>
                <div className={style['right-items']}>
                    <button style={{position: 'relative'}} className={style['btn']}>
                        <img  className={style['notification']} src={(icons.notification).src} alt="" />
                        <div className={style['dot']}></div>
                    </button>
                </div>
                <div className={style['right-items']}>
                    <button className={style['btn']}>
                        <img src={(icons.setting).src} alt="" />
                    </button>
                </div>
                <div className={style['right-items']}>
                    <button className={style['btn']}>
                        <img src={(icons.user).src} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}