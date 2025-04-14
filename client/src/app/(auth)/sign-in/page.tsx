'use client'

import { useDispatch, useSelector } from 'react-redux'
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { images } from '@/constants'
import styles from '@/styles/Login.module.css'
import Form from 'next/form'
import Link from 'next/link'
import { Validate } from '@/utils/validate'
import { addAuth, authSelector } from '@/redux/reducers/authReducer'
import authenticationAPI from '@/apis/authApi'
import { useRouter } from 'next/navigation';


const Signin = () => {
    const auth = useSelector(authSelector)
    const router = useRouter()
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState('')
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        if (form.email || form.password) {
            setErrorMessage('')
        }

    }, [form.email, form.password])
    //xử lí đăng nhập
    const handleLogin = async () => {

        const emailValidation = Validate.email(form.email)
        if (emailValidation) {
            try {

                const res = await authenticationAPI.handleAuthentitation('/login', {
                    email: form.email,
                    password: form.password
                },
                    'post',
                )

                dispatch(addAuth(res.data))
                localStorage.setItem('auth', JSON.stringify(res.data))
                router.push('/');
            } catch (error : any) {
                console.log(error);
                if (error?.status === 403) {
                    setErrorMessage('Sai tài khoản hoặc mật khẩu')
                }

            }
        } else {
            setErrorMessage('Sai định dạng email')
        }

    }

    return (
        <section className={styles["container"]}>
            <div className={styles['left-container']}>
                <Image src={images.login_img} alt="login_img" />
            </div>

            <div className={styles['right-container']}>
                <div className={styles['form-container']}>
                    <h1>Đăng nhập</h1>
                    <Form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            const hasError = Object.values(errorMessage || {}).some((msg) => msg !== "");
                            if (hasError) {
                                console.log("Form có lỗi, không thể gửi.");
                                return;
                            }
                            handleLogin();
                        }}
                    >
                        <div className={styles['input-container']}>
                            <input onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" id='email' placeholder='Email' />
                        </div>
                        <div className={styles['input-container']}>
                            <input onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" id='password' placeholder='Password' />
                        </div>

                        {errorMessage && (
                            <div className={styles['error-message']}>
                                <p>{errorMessage}</p>
                            </div>
                        )}
                        <button type='submit'>Đăng nhập</button>

                    </Form>
                    <div className={styles['form-footer']}>
                        <p>Bạn quên mật khẩu? <Link href={"/forgot-password"}>Quên mật khẩu</Link></p>
                        <p>Bạn chưa có tài khoản <Link href={"/sign-up"}>Đăng kí</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signin