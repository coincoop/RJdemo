'use client'

import React from 'react'
import Image from 'next/image'
import { images } from '@/constants'
import styles from '@/styles/Login.module.css'
import Form from 'next/form'
import Link from 'next/link'
import authenticationAPI from '@/apis/authApi'
import { Validate } from '@/utils/validate'
import Modal from '@/components/ui/Modal'
import { useDispatch } from 'react-redux'
import { addAuth } from '@/redux/reducers/authReducer'
import Loading from '@/components/common/Loading'

const Signup = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [codeVerification, setCodeVerification] = React.useState('')
    const [verification, setVerification] = React.useState({
        state: "default",
        error: "",
        code: "",

    })
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [form, setForm] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const dispatch = useDispatch()

    // register form inputs
    const handleRegister = async () => {
        setIsLoading(true)

        try {
            const res = await authenticationAPI.handleAuthentitation('/verification', { email: form.email }, 'post')
            setVerification({
                ...verification,
                state: "pending",
            });
            setCodeVerification(res.data.code)
            setIsLoading(false)
        } catch (error) {
            console.log(error);

        }
    }

    const handleVerification = async () => {
        setIsLoading(true)
        if (verification.code == codeVerification) {
            try {
                const res = await authenticationAPI.handleAuthentitation('/register', { name: form.name, email: form.email, password: form.password }, 'post')
                dispatch(addAuth(res.data))
                localStorage.setItem('auth', JSON.stringify({
                    email: res.data.email,
                    accessToken: res.data.accessToken,
                    name: res.data.name,
                    id: res.data.id
                }))
                console.log(res);

            } catch (error) {
                console.log(error);

            }
            setVerification({
                ...verification,
                state: "success",
            });
            setIsLoading(false)
        } else {
            setVerification({
                ...verification,
                error: "Wrong verification code",
            });
            setIsLoading(false)
        }
    }

    //validate form inputs
    const formValidation = (key: string) => {
        const data = { ...errorMessage }
        let message = ``

        switch (key) {
            case 'email':
                if (!form.email) {
                    message = `Email is required`
                } else if (!Validate.email(form.email)) {
                    message = `Invalid email format`
                } else {
                    message = ``
                }
                break
            case 'password':
                if (!form.password) {
                    message = `Password is required`
                } else if (form.password.length < 6) {
                    message = `Password must be at least 6 characters long`
                } else {
                    message = ``
                }
                break
            case 'name':
                if (!form.name) {
                    message = `Name is required`
                }
                else {
                    message = ``
                }
                break
            case 'confirmPassword':
                if (!form.confirmPassword) {
                    message = `Confirm password is required`
                } else if (form.password !== form.confirmPassword) {
                    message = `Passwords do not match`
                }
                else {
                    message = ``
                }
                break
        }
        data[`${key}`] = message
        setErrorMessage(data)
    }

    return (
        <>
            <section className={styles["container"]}>
                <div className={styles['left-container']}>
                    <Image src={images.login_img} alt="login_img" />
                </div>

                <div className={styles['right-container']}>
                    <div className={styles['form-container']}>
                        <h1>Register</h1>
                        <Form
                            action=""

                            onSubmit={(e) => {
                                e.preventDefault(); 
                                const hasError = Object.values(errorMessage || {}).some((msg) => msg !== "");
                                if (hasError) {
                                    console.log("Form có lỗi, không thể gửi.");
                                    return; 
                                }
                                handleRegister(); 
                            }}>
                            <div className={styles['input-container']}>
                                <input
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    onBlur={() => formValidation('name')}
                                    type="name" id='name' placeholder='Name'
                                />
                            </div>
                            <div className={styles['input-container']}>
                                <input
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    onBlur={() => formValidation('email')}
                                    type="email" id='email' placeholder='Email'
                                />
                            </div>
                            <div className={styles['input-container']}>
                                <input
                                    onBlur={() => formValidation('password')}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    type="password" id='password' placeholder='Password'
                                />
                            </div>
                            <div className={styles['input-container']}>
                                <input
                                    onBlur={() => formValidation('confirmPassword')}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    type="password" id='cfpassword' placeholder='Confirm Password'
                                />
                            </div>
                            {errorMessage && (
                                <div>
                                    {Object.keys(errorMessage).map((error, index) => (
                                        errorMessage[`${error}`] && (
                                            <div
                                                key={`error${index}`}
                                                className='text-red-700 px-5'
                                            >
                                                {errorMessage[`${error}`]}
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}

                            <button type='submit'>Register</button>
                        </Form>
                        <div className={styles['form-footer']}>
                            <p>You alrealy have an account? <Link href={"/sign-in"}>Login</Link></p>

                        </div>
                    </div>
                </div>
                {verification.state === 'pending' && (
                    <Modal error={verification.error} typeModal='input' onSubmit={handleVerification} setVerification={setVerification} />
                )}
                {verification.state === 'success' && (
                    <Modal typeModal='success' setVerification={setVerification} />
                )}
                {
                    isLoading && <Loading />
                }
            </section>

        </>

    )
}

export default Signup