'use client'

import Loading from "@/components/Loading"
import NotFound from "@/components/NotFound"
import { addAuth, authReducer, authSelector } from "@/redux/reducers/authReducer"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import style from '@/styles/AdminPage.module.css'
import { DashBoardNavbar } from "@/components/Navbar"
import DashboardSidebar from "@/components/DashboardSidebar"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    const [isLoading, setIsLoading] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false);
    const user = useSelector(authSelector)

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        checkRole();
    }, []);

    const checkRole = async () => {
        setIsLoading(true)
        try {
            const userLocal = localStorage.getItem('auth');
            if (userLocal) {
                const parsedUser = JSON.parse(userLocal);
                dispatch(addAuth(parsedUser));
    
                if (!parsedUser.role || parsedUser.role === "user") {
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(true);
                }
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        } finally {
            setIsLoading(false);
        }
    }

    //tat tam thoi
    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthorized) {
        return <NotFound />;
    }

    return (
        <section className={style['container']}>
            <DashboardSidebar />
            <div className={style['component-container']}>
                <DashBoardNavbar />
                {children}
            </div>
        </section>
    );
}