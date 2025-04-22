'use client'

import productsAPI from '@/apis/productApi';
import { ImageKey, images } from '@/constants';
import { useParams } from 'next/navigation';
import React from 'react'

import ProductDisplay from '@/components/product/ProductDisplay';
import NotFound from '@/components/common/NotFound';
import Loading from '@/components/common/Loading';
import style from '@/styles/PageProduct.module.css'

const ProductDetailsPage = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const { productId } = useParams();
    const [product, setProduct] = React.useState<{
        img: ImageKey;
        name: string;
        _id: string;
        description: string;
        price: number;
        item_no: string;
        scale: string;
        marque: string;
        status: string;
        img_more: Array<ImageKey>;
    }>();

    React.useEffect(() => {
        getProductbyId()
    }, []);

    const getProductbyId = async () => {
        setIsLoading(true)
        try {
            const res = await productsAPI.handleProduct(`/get-product/${productId}`, 'get');
            setProduct(res.data);
            console.log(res.data);
            setIsLoading(false)
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <div className={style['container']}>
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