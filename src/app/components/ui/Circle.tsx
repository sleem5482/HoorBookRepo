import {type CircleProps } from '@/app/lib/type'
import Image from 'next/image'
import React from 'react'
import Container from '../container'
export const Circle:React.FC<CircleProps>=({
    id,
    image,
    title
})=>{
    return(
        <Container>

<div dir="rtl" className="flex flex-col items-center space-y-2">
      <div className="w-24 h-24 rounded-full bg-[linear-gradient(135deg,_#e8f3f0,_#f8f8f8)] flex items-center justify-center overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
      <p className="text-sm font-bold text-center leading-tight text-gray-800">
        {title}
      </p>
    </div>
            </Container>
    )
}
