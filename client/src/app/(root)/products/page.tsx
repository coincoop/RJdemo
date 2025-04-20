'use client'

import authenticationAPI from '@/apis/productApi'
import BrandSidebar from '@/components/brand/BrandSidebar'
import ProductList from '@/components/product/ProductList'
import Space from '@/components/ui/Space'
import { log } from 'console'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import style from '@/styles/PageProduct.module.css'
import productsAPI from '@/apis/productApi'
import Loading from '@/components/common/Loading'

const Products = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            const res = await productsAPI.handleProduct('/get-all-product',
                'get'
            )
            setProducts(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        } finally {
            setIsLoading(false);
        }
    }
    if(isLoading) {
        return <Loading/>
    }
    return <ProductList products={products}/>

};


export default Products