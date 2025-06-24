'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, Heart, User2 } from 'lucide-react'
import Logo from '../../../../public/asset/images/حورلوجو-1.png'
import InputField from './Input' 

const SmartNavbar = () => {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <div
      dir="rtl"
      className={`navbar fixed top-0 left-0 w-full z-50 px-4 py-2 flex items-center justify-center gap-[40px] shadow-sm bg-btn-color transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Logo */}
      <Link href={'/'}>
      <div className="text-white font-bold text-lg">
        <Image
          src={Logo}
          alt="شعار الموقع"
          className="h-[42px] w-[55px] rounded-[10px]"
        />
      </div>
      </Link>

      {/* Search Bar */}
      <div className="flex flex-1 mx-4 max-w-xl bg-white rounded-lg outline-none overflow-hidden shadow-inner">
        <Link href={'/Products'} className="flex w-full items-center">
          <div className="flex-grow">
            <InputField
              type="text"
              name="search"
              placeholder="بتدور على ايه؟"
              className="!bg-white text-black placeholder:text-gray-400 border-solid-[1px] border-gray-400 outline-none focus:ring-0"
            />
          </div>
          <div className="px-4 py-2 font-bold text-sm flex items-center rounded-none rounded-l-lg text-black">
            <Search className="ml-1" size={18} />
          </div>
        </Link>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-4 rtl:space-x-reverse text-white">
        <Link href={'/register'}>
          <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition">
            <User2 size={22} />
            <span className="text-sm">تسجيل دخول</span>
          </div>
        </Link>

        <div className="h-6 w-px bg-gray-400"></div>

        <Heart
          size={22}
          className="cursor-pointer hover:text-yellow-400 transition"
        />

        <div className="h-6 w-px bg-gray-400"></div>

        <ShoppingCart
          size={22}
          className="cursor-pointer hover:text-yellow-400 transition"
        />
      </div>
    </div>
  )
}

export default SmartNavbar
