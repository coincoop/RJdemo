'use client'

import React, { useEffect, useState } from 'react'
import CardProduct from './CardProduct'
import productsAPI from '@/apis/productApi'
import style from '@/styles/ProductList.module.css'
import { useSearchParams } from 'next/navigation'
import Loading from './Loading'


const ProductList = ({ products }: {
    products: any[],
}) => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const [sortField, setSortField] = useState<'name' | 'price'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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
        <section className={style['container']}>

            <div className={style['header-container']}>
                {
                    query ? <h1 className={style['title']}>Search results for "{query}"</h1> : <h1 className={style['title']}>All product</h1>
                }
                <div className={style['selection-container']}>
                    <select className={style['selection']} onChange={(e) => setSortField(e.target.value as 'name' | 'price')}>
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                    </select>

                    <select className={style['selection']} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Decreasing</option>
                    </select>
                </div>
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