'use client'

import Loading from "@/components/Loading"
import NotFound from "@/components/NotFound"
import { addAuth, authReducer, authSelector } from "@/redux/reducers/authReducer"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

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
                dispatch(addAuth(JSON.parse(userLocal)));
            }
            if (!user || !user.role) {
                setIsAuthorized(false);
            } else if (user.role === "user") {
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthorized) {
        return <NotFound />;
    }

    return <>{children}</>;
}