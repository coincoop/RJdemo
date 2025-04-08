'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Space from "@/components/Space";
import { addAuth, authSelector } from "@/redux/reducers/authReducer";
import { log } from "console";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    const dispatch = useDispatch()
    const auth = useSelector(authSelector)

    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async () => {

        const userLocal = await localStorage.getItem('auth')
        try {
            userLocal && dispatch(addAuth(JSON.parse(userLocal)))

        } catch (error) {
            console.log(error)
        }
    }
    
    console.log(auth);
    console.log('auth', auth.accessToken);
    
    
    return (
        <main>
            {auth.accessToken ? (
                <>
                    <Navbar isLogin={true}/>
                    {children}
                    <Space height="2em" />
                    <Footer />
                </>
            ) : (
                <>
                    <Navbar isLogin={false}/>
                    {children}
                    <Space height="2em" />
                    <Footer />
                </>
            )}
        </main>
    )
}