'use client'

import React, { useEffect, useState } from 'react'
import CardProduct from './CardProduct'
import carsAPI from '@/apis/carApi'
import style from '@/styles/ProductList.module.css'
import { useSearchParams } from 'next/navigation'


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
            const res = await carsAPI.handleCar('/get-all-car',
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
        loading ? <div>Loading...</div> :
            <div className={style['container']}>
                <div>
                    {
                        query ? <h1 className={style['title']}>Kết quả tìm kiếm cho "{query}"</h1> : <h1 className={style['title']}>Tất cả sản phẩm</h1>
                    }
                </div>
                <div className={style['container-products']}>
                    {query && filteredProducts.length === 0 ? (
                        <div className={style['no-results']}>
                            Không có kết quả nào phù hợp với "{query}".
                        </div>
                    ) : (
                        (query ? filteredProducts : products).map((product: any) => (
                            <CardProduct key={product._id} listCar={product} />
                        ))
                    )}
                </div>
            </div>

    )
}
export default ProductList