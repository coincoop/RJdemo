import React from 'react'
import style from '@/styles/DropdownCart.module.css'
import { icons, images } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '@/redux/reducers/authReducer';
import { useRouter } from 'next/navigation';

const UserDropdown = ({ onClose }: {
    onClose?: () => void;
}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector(authSelector)

    const handleLogout = async () => {
        onClose?.()
        localStorage.removeItem("auth");
        dispatch(removeAuth())
        router.push('/')
    }

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
                user.role ==='admin' &&
                <button onClick={()=>{
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