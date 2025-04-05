// 'use client'

import CarouselProdcut from "@/components/CarouselProduct";
import ImageSlider from "@/components/ImageSlider";
import Space from "@/components/Space";
import {images} from "@/constants"
import { useContext } from "react";
import { shopContext } from "@/contexts/shopContext";
import SearchForm from "@/components/SearchForm";
import authenticationAPI from "@/apis/authApi";
import TestApi from "@/components/TestApi";

export  default async function Home({searchParams}: {searchParams:Promise< {query?: string}>}) {

    const query = (await searchParams).query 
    const img_slider = [images.img_silder_1, images.img_silder_2, images.img_silder_3].map(image => image.src)
    // const all_product = useContext(shopContext)
    const handleHello = async () => {
        const res = await authenticationAPI.handleAuthentitation('/hello', {
          },
            'get',
          )
        console.log(res.data)
    }
    return(
        <section >
            <SearchForm query={query}/>
            <ImageSlider imgUrls={img_slider}/>
            <Space height="2em"/>
            {/* <CarouselProdcut title="Sản phẩm nổi bật" products={all_product}/> */}
            <TestApi/>
        </section>
    )
}