'use client'

import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Space from "@/components/Space";
import { addAuth, authSelector } from "@/redux/reducers/authReducer";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [isShowLoading, setIsShowLoading] = useState(true);
    const dispatch = useDispatch()
    const auth = useSelector(authSelector)



    useEffect(() => {
        checkLogin()
        const timeout = setTimeout(() => {
            setIsShowLoading(false);
        }, 1500);
    }, [])

    const checkLogin = async () => {

        const userLocal = localStorage.getItem('auth')
        try {
            userLocal &&  dispatch(addAuth(JSON.parse(userLocal)))

        } catch (error) {
            console.log(error)
        }
    }

    console.log(auth);
    console.log('auth', auth.accessToken);


    return (
        <main>
            {isShowLoading ? (
                <>
                    <Navbar isLogin={true} />
                    {/* code sau */}
                    <Loading/>
                    <Space height="100vh"/>
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