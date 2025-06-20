'use client';
/* eslint no-use-before-define: 0 */
import React from 'react';
import "@/styles/Navbar.css";
import { images, icons, Iconkey } from '@/constants'
import Link from 'next/link';
import { authSelector, removeAuth } from '@/redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import CartDropdown from '@/components/cart/CartDropdown';
import UserDropdown from '../ui/UserDropdown';
import style from '@/styles/Navbar.module.css'
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { relative } from 'path';
import marquesAPI from '@/apis/marqueApi';

interface DropdownItem {
    name: string;
    btn: () => void;
    icon: Iconkey;
}

interface CustomJwtPayload extends JwtPayload {
    role: string;
}



export default function Navbar({ isLogin }: { isLogin?: boolean }) {
    const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [marque, setMarque] = React.useState([])
    const [cartOpen, setCartOpen] = React.useState(false)
    const [userOpen, setUserOpen] = React.useState(false)
    const [role, setRole] = React.useState('')
    const auth = useSelector(authSelector)
    const router = useRouter()

    React.useEffect(() => {
        const userData = auth.accessToken;
        if (userData) {
            try {
                const decoded = jwtDecode<CustomJwtPayload>(userData);
                setRole(decoded.role);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, [auth]);

    const userDropdown: DropdownItem[] = [
        { name: `Hello ${auth.name}`, btn: () => console.log('hello'), icon: 'cart' },
        { name: 'Logout', btn: () => handleLogout(), icon: 'logout' }
    ]

    const adminDropdown: DropdownItem[] = [
        { name: `Hello ${auth.name}`, btn: () => console.log('hello'), icon: 'cart' },
        { name: 'Go to Dashboard', btn: () => router.push('/admin'), icon: 'dashboard' },
        { name: 'Logout', btn: () => handleLogout(), icon: 'logout' }
    ]

    const dispatch = useDispatch()
    const closeCart = () => setCartOpen(false)
    const closeUser = () => { setUserOpen(false); }

    React.useEffect(() => {
        getMarques()
    },[])

    const getMarques = async () => {
        try {
            const res = await marquesAPI.handleMarque('/get-all-marque','get')
            setMarque(res.data.all_marque)
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        closeUser()
        localStorage.removeItem("auth");
        dispatch(removeAuth())
        router.push('/')
    }

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
        setCartOpen(!cartOpen);
    };

    const toggleUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        closeAll()
        setUserOpen(!userOpen);
    };

    React.useEffect(() => {

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
                                {
                                    marque.map((item: any) => (
                                        <li key={item._id}>
                                            <Link href={`/products/brands/${item.url}`}>{item.name}</Link>
                                        </li>
                                    ))
                                }
                                {/* <li><Link href="/bmw">BMW</Link></li>
                                <li><Link href="/ducati">Ducati</Link></li> */}
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
                            {userOpen && (
                                role == 'admin' ? (
                                    <UserDropdown items={adminDropdown} />
                                ) : role == 'user' ? (
                                    <UserDropdown items={userDropdown} />
                                ) : null
                            )}
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
    const auth = useSelector(authSelector)
    const router = useRouter()
    const [userOpen, setUserOpen] = React.useState(false)
    const closeUser = () => { setUserOpen(false); }

    const adminDropdown: DropdownItem[] = [
        { name: `Hello ${auth.name}`, btn: () => console.log('hello'), icon: 'user' },
        { name: 'Back to your shop', btn: () => router.push('/'), icon: 'cart' },
    ]

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
            case '/admin/marques':
                return 'Brands';
            case '/admin/products/create':
                return 'Create Product';
            default:
                return 'Dashboard';
        }
    };

    console.log('pathname', pathname);
    

    const closeAll = () => {
        setUserOpen(false)
    };

    const toggleUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        closeAll()
        setUserOpen(!userOpen);
    };

    React.useEffect(() => {

        const handleClick = (event: MouseEvent) => {
            if (event.target instanceof Element &&
                !event.target.closest('.Navbar_right-items__iO6tx')
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
        <div className={style['container']}>
            <div className={style['header-container']}>
                <p className={style['header']}>
                    {getPageTitle()}
                </p>
            </div>
            <div className={style['right-container']}>
                <div className={style['right-items']}>
                    <button style={{ position: 'relative' }} className={style['btn']}>
                        <img className={style['notification']} src={(icons.notification).src} alt="" />
                        <div className={style['dot']}></div>
                    </button>
                </div>
                <div className={style['right-items']}>
                    <button className={style['btn']}>
                        <img src={(icons.setting).src} alt="" />
                    </button>
                </div>
                <div style={{ position: 'relative' }} className={style['right-items']}>
                    <button onClick={toggleUser} className={style['btn']}>
                        <img src={(icons.user).src} alt="" />
                    </button>
                    {
                        userOpen && <UserDropdown items={adminDropdown} />
                    }
                </div>
            </div>
        </div>
    )
}