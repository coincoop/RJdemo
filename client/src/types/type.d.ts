
declare interface SpaceProps {
  height: string;
}

declare interface ImageSliderProps {
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
  star: decimal;
}
declare interface CarouselProductProps {
  title: string;
}

declare interface CardCarProps {
  listCar: Car[{
    id: string;
    description: string;
    name: string;
    price: number;
    item_no: string;
    scale: string;
    marque: string;
    status: string;
    img?: string[];
    img_more: string[];
  }];
}
