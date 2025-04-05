declare interface SpaceProps {
    height: string ;
}

declare interface ImageSliderProps{
    imgUrls: string[];
    query?: string;
}

interface Product {
    id: number;
    category: string;
    name: string;
    image: string[];
    price: number;
    description: string;
    star: decimal
  }
declare interface CarouselProductProps{
    title: string;
    products: Product[]
}