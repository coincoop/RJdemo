'use client';

import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import { addAuth, authSelector } from "@/redux/reducers/authReducer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from '@/styles/AdminPage.module.css';
import { DashBoardNavbar } from "@/components/layout/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { jwtDecode, JwtPayload } from "jwt-decode";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    interface CustomJwtPayload extends JwtPayload {
        role: string; // Thêm thuộc tính role
    }

    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [role, setRole] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const userLocal = localStorage.getItem('auth');
            if (userLocal) {
                const parsedUser = JSON.parse(userLocal);
                dispatch(addAuth(parsedUser));
                const decoded = jwtDecode<CustomJwtPayload>(parsedUser.accessToken);
                setRole(decoded.role);

                if (decoded.role === 'admin') {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error('Auth error:', error);
            setIsAuthorized(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthorized && !isLoading) {
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