'use client'
import authenticationAPI from '@/apis/carApi'
import React from 'react'

const TestApi = () => {
    const handleHello = async () => {
        const res = await authenticationAPI.handleAuthentitation('/get-all-car', 
            'get'
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