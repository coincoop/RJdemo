'use client'

import CarouselProdcut from "@/components/CarouselProduct";
import ImageSlider from "@/components/ImageSlider";
import Space from "@/components/Space";
import {images} from "@/constants"
import { useContext } from "react";
import { shopContext } from "@/contexts/shopContext";

export default function Home(){

    const img_slider = [images.img_silder_1, images.img_silder_2, images.img_silder_3].map(image => image.src)
    const all_product = useContext(shopContext)
    console.log(all_product);
    return(
        <>
            <ImageSlider imgUrls={img_slider}/>
            <Space height="2em"/>
            <CarouselProdcut title="Sản phẩm nổi bật" products={all_product}/>
        </>
    )
}