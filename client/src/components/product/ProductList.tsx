'use client'

import React from 'react'
import ProductCard from './ProductCard'
import style from '@/styles/ProductList.module.css'
import { useSearchParams } from 'next/navigation'
import Loading from '../common/Loading'


const ProductList = ({ products, title }: {
    products: any[],
    title?: string
}) => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const [sortField, setSortField] = React.useState<'name' | 'price'>('name');
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

    const sortProducts = (a: any, b: any) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];

        if (sortField === 'name') {
            fieldA = (fieldA || '').toLowerCase();
            fieldB = (fieldB || '').toLowerCase();
            if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
            if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        }

        if (sortField === 'price') {
            const priceA = Number(fieldA) || 0;
            const priceB = Number(fieldB) || 0;
            return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        }

        return 0;
    };

    const baseList = query
        ? products.filter((p: any) =>
            p.name && p.name.toLowerCase().includes(query.toLowerCase())
        )
        : products;

    const finalProductList = [...baseList].sort(sortProducts);


    return (
        <section className={style['container']}>

            <div className={style['header-container']}>
                {
                    query ? <h1 className={style['title']}>Search results for "{query}"</h1> : title ? <h1 className={style['title']}>All {title} products</h1> : <h1 className={style['title']}>All product</h1>
                }
                <div className={style['selection-container']}>
                    <select className={style['selection']} value={sortField} onChange={(e) => setSortField(e.target.value as 'name' | 'price')}>
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                    </select>

                    <select className={style['selection']} value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Decreasing</option>
                    </select>
                </div>
            </div>
            <div className={style['container-products']}>
                {query && finalProductList.length === 0 ? (
                    <div className={style['no-results']}>
                        No results found "{query}".
                    </div>
                ) : finalProductList.length === 0 ? (
                    <div className={style['no-results']}>
                        No products available.
                    </div>
                )
                    : (
                        finalProductList.map((product: any) => (
                            <ProductCard key={product._id} listCar={product} />
                        ))
                    )}
            </div>
        </section>

    )
}
export default ProductList