import React from 'react'
import style from '@/styles/BrandSidebar.module.css'
import Link from 'next/link';

const BrandSidebar = () => {
    const listBrands = [
        { id: 1, name: 'BMW' },
        { id: 2, name: 'Porsche' },
        { id: 3, name: 'IMSA 2023' },
        { id: 4, name: 'Audi' },
        { id: 5, name: 'McLarren' },
    ];
    return (
        <div className={style['container']}>
            <div className={style['brand-header']}>
                <h3 className={style['brand-title']}>Brands</h3>
            </div>
            <div className={style['brand-item']}>
                {
                    listBrands.map((item) => (
                        <span key={item.id} className={style['brand-name']}>
                            <Link href={'#'}>{item.name}</Link>
                        </span>
                    ))
                }
            </div>
        </div>
    )
}

export default BrandSidebar