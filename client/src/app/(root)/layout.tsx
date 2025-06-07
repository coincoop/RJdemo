'use client'

import React from 'react'
import Footer from "@/components/layout/Footer";
import Loading from "@/components/common/Loading";
import Navbar from "@/components/layout/Navbar";
import Space from "@/components/ui/Space";
import { addAuth, authSelector, removeAuth } from "@/redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";


export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [isShowLoading, setIsShowLoading] = React.useState(true);
    const dispatch = useDispatch()
    const auth = useSelector(authSelector)

    const checkTokenExpiration = () => {
        if (auth.accessToken) {
            try {
                const tokenData = JSON.parse(atob(auth.accessToken.split('.')[1]));
                const expirationTime = tokenData.exp * 1000;
                const currentTime = Date.now();

                if (currentTime >= expirationTime) {
                    localStorage.removeItem('auth');
                    dispatch(removeAuth());
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra token:', error);
            }
        }
    }

    React.useEffect(() => {
        checkLogin()
        checkTokenExpiration()
        const timeout = setTimeout(() => {
            setIsShowLoading(false);
        }, 1500);

        const tokenCheckInterval = setInterval(checkTokenExpiration, 60000);

        return () => {
            clearTimeout(timeout);
            clearInterval(tokenCheckInterval);
        }
        
    }, [])

    const checkLogin = async () => {

        const userLocal = localStorage.getItem('auth')
        try {
            userLocal && dispatch(addAuth(JSON.parse(userLocal)))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <main>  
            {isShowLoading ? (
                <>
                    <Navbar isLogin={true} />
                    {/* code sau */}
                    <Loading />
                    <Space height="100vh" />
                    <Space height="2em" />
                    <Footer />
                </>
            ) : auth.accessToken ? (
                <>
                    <Navbar isLogin={true} />
                    {children}
                    <Space height="2em" />
                    <Footer />
                </>
            ) : (
                <>
                    <Navbar isLogin={false} />
                    {children}
                    <Space height="2em" />
                    <Footer />
                </>
            )}
        </main>
    )
}