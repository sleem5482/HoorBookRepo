import { type CardProps } from '@/app/lib/type'
import React, { useState } from 'react'
import Container from '../container'
import Image from 'next/image'
import { Heart } from 'lucide-react'

export const Card: React.FC<CardProps > = ({
id,
title,
description,
image,
category,
price,
discount,
originalPrice,
stockStatus,
soldOut = false,
}) => {
const [love,setlove]=useState<boolean>(false);
const handellove=()=>{
    console.log("love clicked", id);
    setlove(!love);
}






return (
<Container>
    <div dir="rtl" className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[linear-gradient(135deg,_#e8f3f0,_#f8f8f8)] hover:shadow-xl transition duration-300 relative">
    <div className="absolute top-2 left-2 bg-pink-100 p-1 rounded-full z-10" onClick={() => handellove()}>
    {love ? (
<Heart
size={18}
className="text-pink-500"
fill="#ec4899"      
stroke="#ec4899"   
/>
) : (
<Heart
size={18}
className="text-gray-500"
fill="none"         
stroke="#6b7280"    
/>
)}
        
    </div>

    <div className="relative w-full h-56">
        <Image
        src={image}
        alt={title}
        fill
        className="object-contain rounded-t-2xl"
        sizes="(max-width: 100%) 100vw, 300px"
        />
    </div>

    <div className="p-4 space-y-2 text-right">
        {category && (
        <span className="text-xs font-medium text-gray-500 uppercase">
            {category}
        </span>
        )}
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Price section */}
        <div className="flex items-center justify-between mt-2">
        <div className="space-x-1 rtl:space-x-reverse">
            <span className="font-bold text-lg text-black">{price} ج.م</span>
            {originalPrice && (
            <span className="text-gray-400 line-through">{originalPrice} ج.م</span>
            )}
        </div>

        {discount && (
            <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs font-semibold">
            خصم {discount}%
            </span>
        )}
        </div>

        {/* Stock Status */}

        {typeof stockStatus === 'number' ? (
        stockStatus <= 4 && stockStatus >= 1 ? (
            <span className="text-orange-300 font-semibold text-xs ">
            متبقى {stockStatus} قطعة في المخزن
            </span>
        ) : stockStatus === 0 ? (
            <span className="text-red-500 text-xs font-medium">
            متوفر في المخزن 
            ليس 
            </span>
        ) : null
        ) : null}

        {/* Sold Out */}
    </div>
    </div>
</Container>
)
}
