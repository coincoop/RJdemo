'use client'

import { jwtDecode, JwtPayload } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import style from '@/styles/DropdownCart.module.css'
import { icons, images } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '@/redux/reducers/authReducer';
import { useRouter } from 'next/navigation';

const UserDropdown = ({ onClose }: {
    onClose?: () => void;
}) => {
    interface CustomJwtPayload extends JwtPayload {
        role: string; // Thêm thuộc tính role
    }

    const [role, setRole] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector(authSelector)

    const handleLogout = async () => {
        onClose?.()
        localStorage.removeItem("auth");
        dispatch(removeAuth())
        router.push('/')
    }

    useEffect(() => {
        const userData = user.accessToken;
        if (userData) {
            try {
                const decoded = jwtDecode<CustomJwtPayload>(userData); 
                setRole(decoded.role);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, [user]);

    return (
        <div className={style['container']}>
            <div style={{ height: '1rem' }} />
            <button className={style['items-btn-container']}>
                <div className={style['icon-user']}>
                    <img src={(icons.user).src} alt="" />
                </div>
                <p className={style['name-btn']}>
                    Hello {user.name}
                </p>
            </button>
            <div style={{ height: '1rem' }} />
            {
                role === 'admin' &&
                <button onClick={() => {
                    router.push('/admin')
                }} className={style['items-btn-container']}>
                    <div className={style['icon-user']}>
                        <img src={(icons.user).src} alt="" />
                    </div>
                    <p className={style['name-btn']}>
                        Go to Dashboard
                    </p>
                </button>
            }
            <div style={{ height: '1rem' }} />
            <button onClick={handleLogout} className={style['items-btn-container']}>
                <div className={style['icon-user']}>
                    <img src={(icons.user).src} alt="" />
                </div>
                <p className={style['name-btn']}>
                    Logout
                </p>
            </button>
            <div style={{ height: '1rem' }} />
        </div>
    )
}

export default UserDropdown