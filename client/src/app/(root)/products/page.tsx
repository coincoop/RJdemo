
import authenticationAPI from '@/apis/carApi'
import BrandSidebar from '@/components/BrandSidebar'
import ProductList from '@/components/ProductList'
import Space from '@/components/Space'
import TestApi from '@/components/TestApi'
import { log } from 'console'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import style from '@/styles/Page.module.css'

const Products = () => {
    

    return (
        <div>
            <div className={style['container']}>
                <BrandSidebar />
                <ProductList/>
            </div>
        </div>

    )
};


export default Products