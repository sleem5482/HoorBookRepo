"use client";
import { useEffect, useRef, useState } from "react";
import { Searchproduct } from "@/app/store/SearchproductsStore";
import { fetchData } from "@/app/lib/methodes";
import { ApiResponse, HomePageData } from "@/app/lib/type";
import { Card } from "@/app/components/ui/Card";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Search, Settings2Icon, ShoppingCart, User2 } from "lucide-react";
import Link from "next/link";
import Logo from '../../../../public/asset/images/حورلوجو-1.png'
import debounce from "lodash.debounce";
import { motion, AnimatePresence } from 'framer-motion';
import empty from '../../../../public/asset/images/empty2-removebg-preview.png';
export default function ProductPage() {
  const [inputValue, setInputValue] = useState("");
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useState({
  hasStock: "",
  hasColors: "",
  hasPacket: "",
  hasOffer: ""
});
const [showFilters,setShowFilters]=useState(false)
  const {
    products,
    fetchProducts,
    hasMore,
    loading,
    setSearchTerm,
  } = Searchproduct();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response: ApiResponse<HomePageData> = await fetchData(
          "https://hoorbookapp.com/api/products?&name="
        );
        setHomeData(response.data);
      } catch (error) {
        console.error("Home Data Error:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (inputValue === "") return; 
    fetchProducts(true, inputValue);
  }, []);

  // Debounce input

const debouncedSearch = useRef(
  debounce((value: string) => {
    setSearchTerm(value);
    fetchProducts(true, value);
  }, 500)
).current;

useEffect(() => {
  if (inputValue.trim()) {
    debouncedSearch(inputValue);
  }
}, [inputValue]);


  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchProducts(false);
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
  const renderProducts = isSearching ? products : homeData?.data ?? [];
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

    <div className="p-4">
      {/* Navbar */}
      <header
        dir="rtl"
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } bg-gradient-to-tr from-[#6B2B7A] via-[#844C9A] to-[#6B2B7A] shadow-lg backdrop-blur-md`}
      >
        <div className="px-2 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-[40px] shadow-sm flex-wrap sm:flex-nowrap">
          {/* الشعار */}
          <div className="text-white font-bold text-lg">
            <Image
              src={Logo}
              alt="شعار الموقع"
              className="h-[42px] w-[55px] rounded-[10px]"
            />
          </div>

          {/* مربع البحث */}
          <div className="flex flex-1 max-w-full sm:mx-4 sm:max-w-xl bg-white/90 backdrop-blur rounded-full overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-yellow-400 transition">
            <input
              type="text"
              name="search"
              placeholder="بتدور على ايه؟"
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full !bg-transparent text-black placeholder:text-gray-400 border-none outline-none focus:ring-0 px-4 py-2 text-sm"
            />
            <div className="px-4 py-2 font-bold text-sm flex items-center text-black">
              <Search className="ml-1" size={18} />
            </div>
          </div>

          {/* الأيقونات */}
          <div className="flex items-center gap-3 text-white text-sm">
            <Link href="/register">
              <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition transform hover:scale-110">
                <User2 size={22} />
                <span className="hidden sm:inline">تسجيل دخول</span>
              </div>
            </Link>

            <div className="h-6 w-px bg-white/30 hidden sm:block"></div>

            <Link href="/wishlist">
              <Heart
                size={22}
                className="cursor-pointer hover:text-pink-300 transition transform hover:scale-110"
              />
            </Link>

            <div className="h-6 w-px bg-white/30 hidden sm:block"></div>

            <Link href="/cart">
              <ShoppingCart
                size={22}
                className="cursor-pointer hover:text-yellow-400 transition transform hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* عرض المنتجات في شكل شبكة */}
      {renderProducts.length === 0 ? (
        <div className="flex justify-center item-center flex-col">

    
        <p className="text-center text-gray-500 mt-20 text-lg"> لاتوجد منتجات </p>
          </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-6 lg:px-12 mt-24"
          dir="rtl"
        >
          {renderProducts.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.015] border border-gray-100"
            >
              <Card
                id={index + 1}
                image={image.image}
                name={image.name}
                description={image.description}
                price={image.price}
                originalPrice={image.originalPrice}
                category={image.category}
                discount={image.discount}
                love={image.love}
                stock={image.stock}
                soldOut={image.soldOut}
                packet_pieces={image.packet_pieces}
                packet_price={image.packet_price}
                piece_price_after_offer={image.piece_price_after_offer}
                packet_price_after_offer={image.packet_price_after_offer}
                reviews_avg={image.reviews_avg}
                handellove={() => console.log(`Liked product ${image.id}`)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      {isSearching && hasMore && (
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
        className="w-[90%] sm:w-[340px] p-5 rounded-3xl bg-[#0E1330]/90 shadow-[0_10px_40px_rgba(0,0,0,0.6)] mb-8"
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
                ? 'bg-[#6B2B7A] text-white border-transparent shadow-lg'
                : 'bg-transparent text-[#F06292] border-[#F06292] hover:bg-[#f0629215] hover:shadow-[0_0_8px_#F06292]'
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
  );

}
