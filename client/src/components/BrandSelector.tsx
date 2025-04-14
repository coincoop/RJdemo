'use client'

import React, { use, useEffect, useState } from 'react'
import style from '@/styles/BrandSelector.module.css'
import Link from 'next/link';

const BrandSelector = ({ onClose, isOpen, listBrand }: {
    isOpen: boolean;
    onClose: () => void;
    listBrand: {
        id: number;
        name: string;
        link: string;
    }[]
}) => {


    if (!isOpen) return null;

    return (
        <section className={style['container']}>
            <div style={{ height: '1rem' }} />
            <div className={style['brand-header']}>
                <h3 className={style['brand-title']}>Brands</h3>
            </div>
            <div className={style['brand-item']} onClick={(e) => e.stopPropagation()}>
                {listBrand.map((item) => (
                    <div key={item.id} className={style['brand-name']}>
                        <Link href={'/'}>{item.name}</Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BrandSelector