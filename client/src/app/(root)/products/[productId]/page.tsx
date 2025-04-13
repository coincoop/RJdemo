'use client'

import productsAPI from '@/apis/productApi';
import { images } from '@/constants';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BrandSidebar from '@/components/BrandSidebar';
import ProductDisplay from '@/components/ProductDisplay';
import NotFound from '@/components/NotFound';
import Loading from '@/components/Loading';
import style from '@/styles/PageProduct.module.css'

const ProductDetailsPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { productId } = useParams();
    const [product, setProduct] = useState<{
        img: keyof typeof images;
        name: string;
        _id: string;
        description: string;
        price: number;
        item_no: string;
        scale: string;
        marque: string;
        status: string;
        img_more: Array<keyof typeof images>;
    }>();

    useEffect(() => {
        getProductbyId()
    }, []);

    const getProductbyId = async () => {
        setIsLoading(true)
        try {
            const res = await productsAPI.handleProduct(`/get-product/${productId}`, 'get');
            setProduct(res.data);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <div className={style['container']}>
                <BrandSidebar />
                {
                    product ? (
                        <ProductDisplay productList={product} />
                    ) : isLoading ? (
                        <Loading />
                    ) : (
                        <NotFound />
                    )
                }
            </div>

        </>
    )
}

export default ProductDetailsPage