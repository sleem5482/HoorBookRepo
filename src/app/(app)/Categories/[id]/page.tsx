"use client";
import { useEffect, useRef, useState } from "react";
import { Searchproduct } from "@/app/store/SearchproductsStore";
import { fetchData } from "@/app/lib/methodes";
import { ApiResponse, Favorit, HomePageData } from "@/app/lib/type";
import { Card } from "@/app/components/ui/Card";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, LayoutGrid, Package, Search, Settings2Icon, ShoppingCart, User2 } from "lucide-react";
import Link from "next/link";
import Logo from '../../../../../public/asset/images/حورلوجو-1.png'
import debounce from "lodash.debounce";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from "next/navigation";
import { BaseUrl, headers } from "@/app/components/Baseurl";
import { useCartStore } from "@/app/store/cartStore";
import React from "react";
import Cookies from "js-cookie";

import { CallApi } from "@/app/lib/utilits";
export default function ProductPage() {
    const pathname = usePathname();
    const categoryId = pathname.split("/").pop();
  const [inputValue, setInputValue] = useState("");
const token = Cookies.get("access_token_login");

  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { cartCount, refreshCartCount } = useCartStore()
  const [login,setlogin]=useState<boolean>(false)
const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const [filters, setFilters] = useState({
  hasStock: "",
  hasColors: "",
  hasPacket: "",
  hasOffer: "",
  category:categoryId
  
});
const url =`${BaseUrl}api/products/favourite`

const handelfavorit = async (id: number) => {
  try {
    if(!token){
      setlogin(true)
      console.log(login);
      
     return;
    }
    setlogin(false)
    const dataToSend = { product_id: id };
    const res: ApiResponse<Favorit> = await CallApi("post", url, dataToSend, headers);
    console.log('Accepted', res);
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
  );
      
  
  } catch (error) {
    console.log(error);
  }
};

const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);

const fetchFavorites = async () => {
  try {
    const res: any = await CallApi("get", `${BaseUrl}api/products?page=1&favourite=1`, {}, headers);
    const favIds = res?.data?.data?.map((item: any) => item.id) || [];
    setFavoriteProducts(favIds);
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
};

const [showFilters,setShowFilters]=useState(false)
  const {
    products,
    fetchProducts,
    hasMore,
    loading,
    setSearchTerm,
  } = Searchproduct();

useEffect(() => {
  fetchProducts(true, '', { ...filters, category: categoryId || '' });
  fetchFavorites();
}, []);



  // Debounce input

const debouncedSearch = useRef(
  debounce((value: string, filtersParam: typeof filters) => {
    setSearchTerm(value);
    fetchProducts(true, value,filtersParam);
  }, 500)
).current;

useEffect(() => {
  if (inputValue.trim()) {
    debouncedSearch(inputValue,filters);
  }
}, [inputValue,filters]);


  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
           fetchProducts(false, inputValue, filters);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);



  
  const isSearching = inputValue.trim().length > 0;
  const renderProducts = products;

const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    const currentScrollY = window.scrollY
    setVisible(currentScrollY < lastScrollY || currentScrollY < 80)
    setLastScrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])
  

  const filter_offer=()=>{
    const filtered=filters.hasOffer === 'true' ? '' : 'true'
    setFilters((prev) => ({ ...prev, hasOffer: filtered }));
    fetchProducts(true, inputValue, { ...filters, hasOffer: filtered });
  }
  const filter_packet=()=>
    {
    const filtered=filters.hasPacket === 'true' ? '' : 'true'
    setFilters((prev) =>
      ({ ...prev, hasPacket: filtered }));
    fetchProducts(true, inputValue, { ...filters, hasPacket: filtered });
  }

  const filter_stock=()=>
  {
    const filtered=filters.hasStock === 'true' ? '' : 'true'
    setFilters((prev) =>
      ({ ...prev, hasStock: filtered }));
    fetchProducts(true, inputValue, { ...filters, hasStock: filtered });
  }
  const filter_color=()=>{
    const filtered=filters.hasColors === 'true' ? '' : 'true'
    setFilters((prev) =>
      ({ ...prev, hasColors: filtered }));
    fetchProducts(true, inputValue, { ...filters, hasColors: filtered });
  }

  return (
<>
    <header
      dir="rtl"
      className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-300  ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } bg-gradient-to-tr from-[#6B2B7A] via-[#844C9A] to-[#6B2B7A] shadow-lg backdrop-blur-md`}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
        <Image
    src={Logo}
    alt="شعار"
    width={200}
    height={100}
    className="w-[300px] h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
    unoptimized
  />
</Link>

        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-md hidden md:block">
            <div className="flex items-center bg-white/90 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-yellow-400 transition">
              <Search className="text-gray-500 ml-2" size={18} />
              <input
                type="text"
                placeholder="إبحث عن منتج..."
              onChange={(e) => setInputValue(e.target.value)}

                className="bg-transparent flex-1 text-sm focus:outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white text-xs sm:text-sm">
          <Link href="/register" className="flex flex-col items-center hover:text-yellow-400 transition transform hover:scale-110">
            <div className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition">
              <User2 size={18} />
            </div>
          </Link>

          <div className="border-l border-white/30 h-6 mx-1" />

          <Link href="/favorite" className="flex flex-col items-center hover:text-pink-300 transition transform hover:scale-110">
            <div className="p-2 rounded-full bg-white/10 hover:bg-pink-300/20 transition">
              <Heart size={18} />
            </div>
          </Link>
   <div className="border-l border-white/30 h-6 mx-1" />

              <Link href="/dashboard" className="flex flex-col items-center hover:text-pink-300 transition transform hover:scale-110">
            <div className="p-2 rounded-full bg-white/10 hover:bg-pink-300/20 transition">
              <LayoutGrid  size={18} />
            </div>
          </Link>
          <div className="border-l border-white/30 h-6 mx-1" />

          <Link href="/cart" className="relative flex flex-col items-center hover:text-yellow-400 transition transform hover:scale-110">
            <div className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition">
              <ShoppingCart size={18} />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d2a400] text-white text-[12px] px-1.5 py-[1px] p-4 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
            <div className="border-l border-white/30 h-6 mx-1" />
            <Link
  href="/orders"
  className="relative flex flex-col items-center hover:text-green-300 transition transform hover:scale-110"
>
  <div className="p-2 rounded-full text-white bg-white/10 hover:bg-green-300/20 transition">
    <Package size={18} />
  </div>
</Link>
        </div>
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
    <div className="p-4">

      {/* عرض المنتجات في شكل شبكة */}
      {renderProducts.length === 0 ? (
        <div className="flex justify-center item-center flex-col">

    
        <p className="text-center text-gray-500 mt-20 text-lg"> لاتوجد منتجات </p>
          </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-6 lg:px-12 mt-28"
          dir="rtl"
        >
          {renderProducts.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.015] border border-gray-100"
            >
              <Card
                id={image.id}
                image={image.image}
                name={image.name}
                description={image.description}
                price={image.price}
                originalPrice={image.originalPrice}
                category={image.category}
                discount={image.discount}
                love={favoriteProducts.includes(image.id)}
                stock={image.stock}
                soldOut={image.soldOut}
                packet_pieces={image.packet_pieces}
                packet_price={image.packet_price}
                piece_price_after_offer={image.piece_price_after_offer}
                packet_price_after_offer={image.packet_price_after_offer}
                reviews_avg={image.reviews_avg}
                handellove={() => (handelfavorit(image.id))}
                
              />
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      { hasMore && (
        <div
          ref={loaderRef}
          className="h-10 w-full mt-6 flex justify-center items-center"
        >
          <div className="w-6 h-6 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* زر الفلاتر */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[999] w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center text-white text-xl sm:text-2xl transition-transform duration-500 hover:rotate-12 ${
          showFilters
            ? 'bg-gradient-to-br from-yellow-500 to-red-400 rotate-180'
            : 'bg-btn-color'
        }`}
      >
        <Settings2Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* الفلاتر */}
<AnimatePresence>
  {showFilters && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 z-[998] w-full h-full flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setShowFilters(false)}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="w-[90%] sm:w-[340px] p-5 rounded-3xl bg-btn-color shadow-[0_10px_40px_rgba(0,0,0,0.6)] mb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {[
          {
            text: "المنتجات المتوفرة",
            active: filters.hasStock === "true",
            onClick: filter_stock,
          },
          {
            text: "منتجات تحتوي على عروض",
            active: filters.hasOffer === "true",
            onClick: filter_offer,
          },
          {
            text: "منتجات بعدة ألوان",
            active: filters.hasColors === "true",
            onClick: filter_color,
          },
          {
            text: "منتجات بها أكثر من باكت",
            active: filters.hasPacket === "true",
            onClick: filter_packet,
          },
        ].map((btn, i) => (
          <motion.button
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileTap={{ scale: 0.96 }}
            onClick={btn.onClick}
            className={`w-full py-3 px-4 mt-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 backdrop-blur-md border ${
              btn.active
                ? 'bg-[#2e1534] text-white border-transparent shadow-lg'
                : 'bg-white text-[#F06292] border-[#F06292] hover:bg-[#f0629215] hover:shadow-[0_0_8px_#F06292]'
            }`}
          >
            {btn.text}
          </motion.button>
        ))}

        {/* زر التفعيل */}
        <motion.button
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            fetchProducts(true, inputValue, filters);
            setShowFilters(false);
          }}
          className="w-full py-3 mt-5 rounded-full bg-gradient-to-r from-[#6B2B7A] to-[#E25EA1] hover:from-[#813191] hover:to-[#FF69B4] text-white font-bold text-sm tracking-wide shadow-xl transition-all"
        >
          تفعيل الفلاتر
        </motion.button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
</>
  );

}
