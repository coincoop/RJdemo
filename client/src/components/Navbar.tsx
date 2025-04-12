'use client';

import React, { useState, useEffect, useRef } from 'react';
import "@/styles/Navbar.css";
import { images, icons } from '@/constants'
import Link from 'next/link';
import { authSelector, removeAuth } from '@/redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import DropdownCart from './DropdownCart';

export default function Navbar({ isLogin }: { isLogin?: boolean }) {
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false)
    const auth = useSelector(authSelector)
    const dispatch = useDispatch()
    const router = useRouter()

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
    };

    const toggleMobileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setMobileMenuOpen(prev => !prev);
    };

    const toggleCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setCartOpen(prev => !prev); // Mở/đóng menu giỏ hàng
    };

    const handleLogout = async () => {
        localStorage.setItem("auth", JSON.stringify({ email: auth.email }));
        dispatch(removeAuth())
        router.push('/')
    }

    useEffect(() => {

        const handleClick = (event: MouseEvent) => {
            if (event.target instanceof Element &&
                !event.target.closest('.navbar__submenu') &&
                !event.target.closest('.navbar__cart') &&
                !event.target.closest('.navbar__mobile-toggle')) {
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
                        cartOpen && <DropdownCart  />
                    }
                </div>
                {
                    isLogin && auth ? (
                        // <Link href="/profile" className="navbar__profile">
                        //     {auth.name}
                        // </Link>
                        <button onClick={handleLogout} className="navbar__profile">
                            {auth.name}
                        </button>
                    ) : (
                        <>
                            <Link href="/sign-in" className="navbar__login">
                                Đăng nhập
                            </Link>
                            <Link href="/sign-up" className="navbar__login">
                                Đăng ký
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