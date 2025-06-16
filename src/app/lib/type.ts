import { StaticImageData } from "next/image";
export interface ApiResponse<T>{
    statusCode: number;
    meta: string | null;
    succeeded: boolean;
    message: string;
    errors: string | null;
    data: T;
  }
//////card type
export interface CardProps {
  id: number
  name: string
  description: string
  image: string | StaticImageData
  price: string
  originalPrice?: string
  discount?: number
  stock?: number
  soldOut?: boolean
  love?: boolean
  handellove?: () => void
  packet_pieces?: number
  packet_price?: string
  piece_price_after_offer?: string | null
  packet_price_after_offer?: string | null
  category?: Record<string, any> 
  reviews_avg?: number
}

///card type 




///category type 

export interface CategoryProps {
  id: number,
  image: string | StaticImageData
  name: string
  products_count?: number
}
///category type 


///// slider type
export interface Product {
  id: number;
  category_id: number;
  category: string;
  offer: number;
}

export interface ProductSliderItem {
  id: number;
  title: string;
  image: string;
  product_id: number;
  product: Product;
}

export interface SwiperSliderProps {
  items: ProductSliderItem[];
  height?: string;
  objectFit?: "cover" | "contain";
  showNavigation?: boolean;
  showPagination?: boolean;
  autoPlayDelay?: number;
}


///// slider type

///CategoryWithProducts type
export interface CategoryWithProducts {
  id: number;
  name: string;
  image: string;
  products_count: number;
  products: CardProps[];
}



///CategoryWithProducts type



// home type
export interface HomePageData{
sliders: ProductSliderItem[];
  hotDeals: CardProps[];
  topSelling: CardProps[];
  categoriesWithProducts: CategoryWithProducts[];
  categories: CategoryProps[];
}
// home type

export interface acesstoken{
  accessToken: string;
  expires: string;
  tokenType: string;
  scope: string;
  idToken: string;
  sessionState: string;
  user: {
    name: string;
    email: string;
    image?: string;
    sub?: string;
  };
}