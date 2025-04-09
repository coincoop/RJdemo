'use client'

import React, { useEffect, useState } from 'react'
import CardProduct from './CardProduct'
import carsAPI from '@/apis/carApi'



const ProductList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProducts();
    },[]);
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await  carsAPI.handleCar('/get-all-car',
                'get'
            )
            setProducts(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    }
    return (
        loading ? <div>Loading...</div> :
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {
                    products.map((product: any) => (
                        <CardProduct key={product._id} listCar={product} />
                    ))
                }
            </div>

    )
}
export default ProductList