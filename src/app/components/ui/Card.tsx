import { type CardProps } from '@/app/lib/type'
import React, { useState } from 'react'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import Container from '../Container'
import { BaseUrl } from '../Baseurl'

export const Card: React.FC<CardProps> = ({
  id, name, description, image, category,
  price, discount, originalPrice,
  stock, soldOut = false, love = false, handellove = () => {},
  packet_pieces, packet_price, piece_price_after_offer,
  packet_price_after_offer, reviews_avg
}) => {
  const [loveit, setLove] = useState<boolean>(love)
  const handleLoveToggle = () => {
    setLove(!loveit); handellove()
  }

  const renderStars = (rating?: number) => {
    const totalStars = 5
    const fullStars = rating ? Math.floor(rating) : 0
    const hasHalfStar = rating ? rating % 1 >= 0.5 : false

    return (
      <div className="flex items-center gap-1">
        {[...Array(totalStars)].map((_, i) => (
          <Star key={i} size={16}
            className={
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : hasHalfStar && i === fullStars
                ? 'fill-yellow-300 text-yellow-300'
                : 'text-gray-300'
            }
          />
        ))}
        <span className="text-xs text-gray-500 font-medium">
          {typeof rating === 'number' ? `(${rating.toFixed(1)})` : '(بدون تقييم)'}
        </span>
      </div>
    )
  }

  return (
    <Container>
      <div dir="rtl" className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#e8f3f0] to-[#f8f8f8] hover:shadow-xl transition relative">
        <div className="absolute top-2 left-2 bg-pink-100 p-1 rounded-full z-10 cursor-pointer" onClick={handleLoveToggle}>
          {loveit
            ? <Heart size={18} className="text-pink-500" fill="#ec4899" stroke="#ec4899" />
            : <Heart size={18} className="text-gray-500" fill="none" stroke="#6b7280" />
          }
        </div>

        <div className="relative w-full h-56">
          <Image src={`${BaseUrl}${image}`} alt={name} fill className="object-contain rounded-t-2xl" sizes="300px" />
        </div>

        <div className="p-4 space-y-2 text-right">
          {category && <span className="text-xs font-medium text-gray-500 uppercase">{typeof category === 'string' ? category : category.name}</span>}

          <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h2>

          <p className="text-sm text-gray-600 line-clamp-2 max-h-[3rem] overflow-hidden">{description}</p>

          {renderStars(reviews_avg)}

          <div className="flex items-center justify-between mt-2">
            <div className="space-x-1 rtl:space-x-reverse">
              <span className="font-bold text-lg text-black">{piece_price_after_offer ?? price} ج.م</span>
              {originalPrice && <span className="text-gray-400 line-through">{originalPrice} ج.م</span>}
            </div>
            {discount && <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs font-semibold">خصم {discount}%</span>}
          </div>

          {packet_price && packet_pieces !== undefined && (
            <p className="text-xs text-gray-600">السعر بالكرتونة: {packet_price_after_offer ?? packet_price} ج.م ({packet_pieces} قطعة)</p>
          )}

          {typeof stock === 'number' && (
            <p className={`text-xs font-bold  ${stock === 0 ? 'text-red-500' : stock <= 4 ? 'text-orange-300' : 'text-gray-600'}`}>
              {stock === 0 ? 'غير متوفر في المخزن' : stock <= 4 ? `متبقى ${stock} قطعة` : `كمية: ${stock}`}
            </p>
          )}

          {soldOut && <span className="text-red-600 font-bold text-sm">نفذت الكمية</span>}
        </div>
      </div>
    </Container>
  )
}
