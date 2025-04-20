

import ProductCarousel from "@/components/product/ProductCarousel";
import ImageSlider from "@/components/common/ImageSlider";
import Space from "@/components/ui/Space";
import {images} from "@/constants"
import { useContext } from "react";
import { shopContext } from "@/contexts/shopContext";
import SearchForm from "@/components/ui/SearchForm";
import authenticationAPI from "@/apis/authApi";
import Loading from "@/components/common/Loading";
import Button from "@/components/ui/Button";

export  default async function Home({searchParams}: {searchParams:Promise< {query?: string}>}) {

    const query = (await searchParams).query 
    const img_slider = [images.img_silder_1, images.img_silder_2, images.img_silder_3].map(image => image.src)
    // const all_product = useContext(shopContext)

    return(
        <section >
            <SearchForm query={query}/>
          
            <ImageSlider imgUrls={img_slider}/>
            <Space height="2em"/>
            <ProductCarousel title="Trending Products" />
            
        </section>
    )
}