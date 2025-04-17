'use client'

import { jwtDecode, JwtPayload } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import style from '@/styles/DropdownCart.module.css'
import { Iconkey, icons, images } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '@/redux/reducers/authReducer';
import { useRouter } from 'next/navigation';

interface CustomJwtPayload extends JwtPayload {
    role: string;
}
interface DropdownItem {
    name: string;
    btn: () => void;
    icon: Iconkey;
}

const UserDropdown = ({ items }: {
    items: DropdownItem[]
}) => {

    return (
        <div className={style['container']}>

            {
                items.map((item, index) => (
                    <React.Fragment key={index}>
                        <div style={{ height: '1rem' }} />
                        <button onClick={item.btn} className={style['items-btn-container']}>
                            <div className={style['icon-user']}>
                                <img src={(icons[item.icon]).src} alt="" />
                            </div>
                            <p className={style['name-btn']}>
                                {item.name}
                            </p>
                        </button>
                    </React.Fragment>
                ))
            }
            <div style={{ height: '1rem' }} />
        </div>
    )
}

export default UserDropdown