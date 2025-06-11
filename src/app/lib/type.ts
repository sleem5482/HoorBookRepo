import { StaticImageData } from "next/image";
export interface ApiResponse<T>{
    statusCode: number;
    meta: string | null;
    succeeded: boolean;
    message: string;
    errors: string | null;
    data: T;
  }

export interface CardProps {
  id: number
  title: string
  description: string
  image: string | StaticImageData
  price: string
  category?: string
  originalPrice?: string
  discount?: number
  stockStatus?: number
  soldOut?: boolean
}
export interface CircleProps {
  id: number,
  image: string | StaticImageData
  title: string

}