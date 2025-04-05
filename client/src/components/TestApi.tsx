'use client'
import authenticationAPI from '@/apis/authApi'
import React from 'react'

const TestApi = () => {
    const handleHello = async () => {
        const res = await authenticationAPI.handleAuthentitation('/hello', {
          },
            'get',
          )
        console.log(res.data)
    }
    return (
        <button onClick={handleHello} >
            hello
        </button>
    )
}

export default TestApi