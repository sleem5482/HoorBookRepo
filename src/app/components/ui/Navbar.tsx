'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, Heart, User2 , LayoutGrid,Package  } from 'lucide-react'
import Logo from '../../../../public/asset/images/حورلوجو-1.png'
import { getCartLength } from '@/app/lib/api/cart'
import { useCartStore } from '@/app/store/cartStore'

const SmartNavbar = () => {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
const { cartCount, refreshCartCount } = useCartStore()
  const controlNavbar = () => {
    const currentScrollY = window.scrollY
    setVisible(currentScrollY < lastScrollY || currentScrollY < 80)
    setLastScrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])


  useEffect(() => {
    refreshCartCount()
  }, [])
  return (
    <header
      dir="rtl"
      className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-300  ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } bg-gradient-to-tr from-[#6B2B7A] via-[#844C9A] to-[#6B2B7A] shadow-lg backdrop-blur-md`}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
  <div className=" flex justify-center md:justify-start">
    <Link href="/" className="block">
      <Image
        src={Logo}
        alt="شعار"
        width={70}
        height={70}
        className="w-[480px] sm:w-[360px] md:w-[70px] object-contain"
        unoptimized
      />
    </Link>
  </div>

        <Link href="/Products" className="w-full flex justify-center items-center">
          <div className="w-full max-w-md hidden md:block">
            <div className="flex items-center bg-white/90 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-yellow-400 transition">
              <Search className="text-gray-500 ml-2" size={18} />
              <input
                type="text"
                placeholder="إبحث عن منتج..."
                className="bg-transparent flex-1 text-sm focus:outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-white text-xs sm:text-sm">
          <Link href="/register" className="flex flex-col items-center hover:text-yellow-400 transition transform hover:scale-110">
            <div className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition">
              <User2 size={20} />
            </div>
          </Link>

          <div className="border-l border-white/30 h-6 mx-1" />

          <Link href="/favorite" className="flex flex-col items-center hover:text-pink-300 transition transform hover:scale-110">
            <div className="p-2 rounded-full bg-white/10 hover:bg-pink-300/20 transition">
              <Heart size={20} />
            </div>
          </Link>

          <div className="border-l border-white/30 h-6 mx-1" />

              <Link href="/dashboard" className="flex flex-col items-center hover:text-pink-300 transition transform hover:scale-110">
            <div className="p-2 rounded-full bg-white/10 hover:bg-pink-300/20 transition">
              <LayoutGrid  size={20} />
            </div>
          </Link>
          <div className="border-l border-white/30 h-6 mx-1" />

          <Link href="/cart" className="relative flex flex-col items-center hover:text-yellow-400 transition transform hover:scale-110">
            <div className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition">
              <ShoppingCart size={20} />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d2a400] text-white text-[12px] px-1.5 py-[1px] p-4 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      <div className="border-l border-white/30 h-6 mx-1" />

<Link
  href="/orders"
  className="relative flex flex-col items-center hover:text-green-300 transition transform hover:scale-110"
>
  <div className="p-2 rounded-full text-white bg-white/10 hover:bg-green-300/20 transition">
    <Package size={20} />
  </div>
</Link>
      </div>


      {/* بحث موبايل */}
      <div className="md:hidden px-4 pb-3">
        <Link href="/Products" className="block">
          <div className="flex items-center bg-white/90 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-yellow-400 transition">
            <Search className="text-gray-500 ml-2" size={18} />
            <input
              type="text"
              placeholder="إبحث عن منتج..."
              className="bg-transparent flex-1 text-sm focus:outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </Link>
      </div>
    </header>
  )
}

export default SmartNavbar
