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
    const [sortField, setSortField] = useState<'name' | 'price'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            const res = await productsAPI.handleProduct('/get-all-product',
                'get'
            )
            setProducts(res.data);
            console.log(res.data);
            console.log(res.data._id);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        } finally {
            setLoading(false);
        }
    }

    const sortProducts = (a: any, b: any) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];
    
        if (sortField === 'name') {
            fieldA = fieldA.toLowerCase();
            fieldB = fieldB.toLowerCase();
            if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
            if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        }
    
        if (sortField === 'price') {
            return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        }
    
        return 0;
    };
    
    const filteredProducts = (query ? products.filter((p: any) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    ) : [...products]).sort(sortProducts);
    


    return (
        loading ? <Loading /> :
            <section className={style['container']}>
                <select onChange={(e) => setSortField(e.target.value as 'name' | 'price')}>
                    <option value="name">Sắp xếp theo tên</option>
                    <option value="price">Sắp xếp theo giá</option>
                </select>

                <select onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value="asc">Tăng dần</option>
                    <option value="desc">Giảm dần</option>
                </select>
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