
import { ImageKey, images } from '@/constants';
import React, { useState } from 'react';
import style from '@/styles/ProductDisplay.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '@/styles/CustomCarousel.css';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/reducers/authReducer';
import cartsAPI from '@/apis/cartApi';
import Button from './ui/Button';
import Loading from './Loading';

const ProductDisplay = ({ productList }: {
    productList: {
        img: ImageKey;
        name: string;
        _id: string;
        description: string;
        price: number;
        item_no: string;
        scale: string;
        marque: string;
        status: string;
        img_more: Array<ImageKey>;
    }
}) => {

    const user = useSelector(authSelector)
    const allImages = [productList.img, ...productList.img_more];
    const [isLoading, setIsLoading] = useState(false)

    const addCartHandle = async () => {
        setIsLoading(true)
        try {
            await cartsAPI.handleCart(
                '/create-cart',
                {
                    id_user: user.id,
                    products: [{
                        id_product: productList._id,
                        quantity: 1
                    }]
                },
                'post',
            )
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            {
                isLoading ? (
                    <Loading />
                ) : (

                    <div className={style['container']}>
                        <h2 className={style['name']}>
                            {productList.name}
                        </h2>
                        <div style={{ height: '1rem' }} />
                        <div className={style['carousel']}>
                            <Carousel
                                showStatus={false}
                                showThumbs
                                showIndicators={false}
                                autoPlay
                                infiniteLoop>
                                {allImages.map((imgKey, index) => (
                                    <div key={index}>
                                        <img
                                            alt={`${productList.name} - Image ${index + 1}`}
                                            src={images[imgKey].src}
                                        />
                                    </div>
                                ))}
                            </Carousel>

                        </div>
                        <div className={style['info']}>
                            <div className={style['item_no']}>
                                Item No: <span className={style['right-column']}>{productList.item_no}</span>
                            </div>
                            <div className={style['scale']}>
                                Scale: <span className={style['right-column']}>{productList.scale}</span>
                            </div>
                            <div className={style['marque']}>
                                Marque: <span className={style['right-column']}>{productList.marque}</span>
                            </div>
                            <div className={style['status']}>
                                Status: <span className={style['right-column']}>{productList.status}</span>
                            </div>
                            <div className={style['price']}>
                                {productList.price} <span className={style['right-column']}>vnđ</span>
                            </div>
                        </div>
                        <div className={style['btn']}>
                            <Button name='Buy now' onClick={() => { addCartHandle }} />
                        </div>
                        <div className={style['description-container']}>
                            <h2 className={style['description-header']}>
                                Description
                            </h2>
                            <div className={style['description']}>
                                <p>{productList.description}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )

}

export default ProductDisplay