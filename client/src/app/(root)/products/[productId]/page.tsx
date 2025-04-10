'use client'

import carsAPI from '@/apis/carApi';
import { images } from '@/constants';
import { useParams } from 'next/navigation';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BrandSidebar from '@/components/BrandSidebar';
import ProductDisplay from '@/components/ProductDisplay';
import NotFound from '@/components/NotFound';

const ProductDetailsPage = () => {

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
    } >();

    useEffect(() => {
        getProductbyId()
        console.log(product);
    }, []);

    const getProductbyId = async () => {
        try {
            const res = await carsAPI.handleCar(`/get-car/${productId}`, 'get');
            setProduct(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ paddingTop: '2rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', maxWidth: '90%' }}>
            <BrandSidebar />
            {
                product ? (
                    <ProductDisplay productList={product} />
                ):(
                    <NotFound/>
                )
            }
        </div>
    )
}

export default ProductDetailsPage