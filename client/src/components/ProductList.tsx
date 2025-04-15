'use client'

import React, { useEffect, useState } from 'react'
import CardProduct from './CardProduct'
import productsAPI from '@/apis/productApi'
import style from '@/styles/ProductList.module.css'
import { useSearchParams } from 'next/navigation'
import Loading from './Loading'


const ProductList = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await productsAPI.handleProduct('/get-all-product',
                'get'
            )
            setProducts(res.data);
            console.log(res.data);
            console.log(res.data._id);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    }

    const filteredProducts = products.filter((product: any) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        loading ? <Loading /> :
            <section className={style['container']}>
                <div>
                    {
                        query ? <h1 className={style['title']}>Search results for "{query}"</h1> : <h1 className={style['title']}>All product</h1>
                    }
                </div>
                <div className={style['container-products']}>
                    {query && filteredProducts.length === 0 ? (
                        <div className={style['no-results']}>
                            No results found "{query}".
                        </div>
                    ) : (
                        (query ? filteredProducts : products).map((product: any) => (
                            <CardProduct key={product._id} listCar={product} />
                        ))
                    )}
                </div>
            </section>

    )
}
export default ProductList