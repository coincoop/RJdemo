'use client'

import productsAPI from '@/apis/productApi';
import { ImageKey, images } from '@/constants';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BrandSidebar from '@/components/BrandSidebar';
import ProductDisplay from '@/components/ProductDisplay';
import NotFound from '@/components/NotFound';
import Loading from '@/components/Loading';
import style from '@/styles/PageProduct.module.css'
import ProductList from '@/components/ProductList';


const Brand = () => {
    const [isLoading, setIsLoading] = useState(false)
    const marque = useParams<{brand : string}>();
    console.log(marque.brand);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductByBrand()
    }, []);

    const getProductByBrand = async () => {
        setIsLoading(true)
        try {
            const res = await productsAPI.handleProduct(`/get-product-by-brand/${marque.brand}`, 'get');
            setProducts(res.data);

            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }


    if(isLoading) {
        return <Loading/>
    }
    return <ProductList products={products}/>
}

export default Brand