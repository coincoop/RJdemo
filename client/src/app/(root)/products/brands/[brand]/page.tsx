'use client'
/* eslint no-use-before-define: 0 */
import productsAPI from '@/apis/productApi';
import { ImageKey, images } from '@/constants';
import { useParams } from 'next/navigation';
import React from 'react'
import Loading from '@/components/common/Loading';
import ProductList from '@/components/product/ProductList';


const Brand = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const marque = useParams<{brand : string}>();
    const [products, setProducts] = React.useState<any>([]);

    React.useEffect(() => {
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

    const capitalizeFirstLetter = (string: string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const pageTitle = capitalizeFirstLetter(marque.brand);


    if(isLoading) {
        return <Loading/>
    }
    return <ProductList title={pageTitle} products={products}/>
}

export default Brand