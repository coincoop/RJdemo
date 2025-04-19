import BrandSidebar from '@/components/BrandSidebar'
import React from 'react'
import style from '@/styles/PageProduct.module.css'


const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <div className={style['container']}>
                <BrandSidebar />
                {children}
            </div>
        </div>
    )
}

export default layout