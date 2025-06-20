'use client'
/* eslint no-use-before-define: 0 */
import React from 'react'
import style from '@/styles/BrandSidebar.module.css'
import Link from 'next/link';
import BrandSelector from './BrandSelector';
import marquesAPI from '@/apis/marqueApi';

const BrandSidebar = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const closeModal = () => setIsModalOpen(false);
    const [marques, setMarques] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        getMarque()
    }, [])

    React.useEffect(() => {
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
            setMarques(res.data.all_marque)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
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
                            <div key={item._id} className={style['brand-name']} >
                                <Link href={
                                    `/products/brands/${item.url}`
                                }
                                    onClick={(e) => {
                                        console.log('Clicked LINK:', item.name)
                                    }}>
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