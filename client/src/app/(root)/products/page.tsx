
import authenticationAPI from '@/apis/carApi'
import BrandSidebar from '@/components/BrandSidebar'
import ProductList from '@/components/ProductList'
import Space from '@/components/Space'
import TestApi from '@/components/TestApi'
import { log } from 'console'
import React, { useEffect, useState } from 'react'

const Products = () => {


    return (
        <div>
            <div style={{ paddingTop: '2rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between',flexWrap: 'wrap', maxWidth: '80%' }}>
                <BrandSidebar />
                <ProductList />
            </div>
        </div>

    )
};


export default Products