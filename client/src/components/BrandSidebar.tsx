'use client'
import React, { useState } from 'react'
import style from '@/styles/BrandSidebar.module.css'
import Link from 'next/link';
import { link } from 'fs';
import BrandSelector from './BrandSelector';

const BrandSidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);

    const listBrands = [
        { id: 1, name: 'BMW', link: '#' },
        { id: 2, name: 'Porsche', link: '#' },
        { id: 3, name: 'IMSA 2023', link: '#' },
        { id: 4, name: 'Audi', link: '#' },
        { id: 5, name: 'McLarren', link: '#' },
        { id: 7, name: 'McLarren', link: '#' },
        { id: 8, name: 'McLarren', link: '#' },
        { id: 9, name: 'McLarren', link: '#' },
        { id: 10, name: 'McLarren', link: '#' },
    ];
    return (

        <section className={style['container']}>
            <div className={style['desktop-container']}>

                <div className={style['brand-header']}>
                    <h3 className={style['brand-title']}>Brands</h3>
                </div>
                <div className={style['brand-item']}>
                    {
                        listBrands.map((item) => (
                            <div key={item.id} className={style['brand-name']}>
                                <Link href={'#'}>{item.name}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={style['mobile-container']}>
                <div>
                    <div className={style['btn-container']}>
                        <button
                            onClick={() => {
                                setIsModalOpen(true)
                                console.log(isModalOpen);
                            }}
                            className={style['btn']}>
                                
                                Select Brands</button>
                    </div>
                    <BrandSelector onClose={closeModal} isOpen={isModalOpen} listBrand={listBrands} />
                </div>
            </div>
            <div style={{ height: '2rem' }} />
        </section>

    )
}

export default BrandSidebar