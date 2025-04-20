'use client'

import React, { useEffect, useState } from 'react'
import style from '@/styles/BrandSidebar.module.css'
import Link from 'next/link';
import { link } from 'fs';
import BrandSelector from './BrandSelector';
import marquesAPI from '@/apis/marqueApi';

const BrandSidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const [marques, setMarques] = useState([]);

    useEffect(() => {
        getMarque()
    }
    ,   [])

    useEffect(() => {
    
        const handleClick = (event: MouseEvent) => {
            if (event.target instanceof Element &&
                !event.target.closest('.BrandSidebar_btn__F9HDT') &&
                !event.target.closest('.BrandSelector_container__fJD6F')) {
                closeModal();
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [])

    const getMarque = async () => {
        try {
            const res = await marquesAPI.handleMarque('/get-all-marque', 'get')
            console.log(res.data);
            setMarques(res.data.allMarque)
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <section className={style['container']}>
            <div className={style['desktop-container']}>

                <div className={style['brand-header']}>
                    <h3 className={style['brand-title']}>Brands</h3>
                </div>
                <div className={style['brand-item']}>
                    {
                         marques.map((item: any) => (
                            <div key={item._id} className={style['brand-name']} onClick={() => console.log('Clicked DIV:', item.name)}>
                                <Link href={`/products/brands/${item.url}`} onClick={() => console.log('Clicked LINK:', item.name)}>
                                    {item.name}
                                </Link>
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
                    <BrandSelector onClose={closeModal} isOpen={isModalOpen} listBrand={marques} />
                </div>
            </div>
            <div style={{ height: '2rem' }} />
        </section>

    )
}

export default BrandSidebar