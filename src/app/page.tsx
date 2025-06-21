"use client";

import Container from "./components/Container";
import { Card } from "./components/ui/Card"; 
import InputField from "./components/ui/Input";
import { Heart, Home, List, Search, ShoppingCart, User2 } from "lucide-react";
import Logo from '../../public/asset/images/حورلوجو-1.png';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Slider } from "./components/ui/Slider";
import { Circle } from "./components/ui/Circle";
import { useEffect, useMemo, useState } from "react";
import { ApiResponse, HomePageData } from "./lib/type";
import { fetchData } from "./lib/methodes";
import { BaseUrl } from "./components/Baseurl";
import debounce from "lodash.debounce";
import Link from "next/link";
import SliderSkeleton from "./components/ui/SliderSkeleton";


export default function HomePage() {
  const urldatapage = `${BaseUrl}api/home`;
  const [homedata, sethomedata] = useState<HomePageData>({
    sliders: [],
    hotDeals: [],
    topSelling: [],
    categoriesWithProducts: [],
    categories: [],
  });

  const [searchText, setSearchText] = useState("");
const [loading, setLoading] = useState<Boolean>(true);




  const searchProducts = async (value: string) => {
    if (!value) {
      const response: ApiResponse<HomePageData> = await fetchData(urldatapage);
      sethomedata(response.data);
      return;
    }

   const url = `${BaseUrl}api/products?name=${value}`;
   try {
      const response: ApiResponse<any> = await fetchData(url);
const result = response?.data?.data ?? [];

      sethomedata({
        sliders: [],
        hotDeals: [],
        topSelling: result,
        categoriesWithProducts: [],
        categories: [],
      });
    } catch (error) {
      console.error("Error in search:", error);
    }
  };

  const debouncedSearch = useMemo(
    () => debounce((value: string) => searchProducts(value), 200),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    const fetchdatapage = async () => {
      try {
        const response: ApiResponse<HomePageData> = await fetchData(urldatapage);
        sethomedata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
      setLoading(false);
    }
    };
    fetchdatapage();
  }, []);
  return (
    <section className="bg-white">
      {loading?(
        <SliderSkeleton/>
      ):(
<>
  <div dir="rtl" className="navbar px-4 py-2 flex items-center justify-center gap-[40px] shadow-sm bg-btn-color">

  <div className="text-white font-bold text-lg">
    <Image src={Logo} alt="شعار الموقع" className="h-[42px] w-[55px] rounded-[10px]" />
  </div>

  <div className="flex flex-1 mx-4 max-w-xl bg-white rounded-lg outline-none overflow-hidden shadow-inner">
    <div className="flex-grow">
       <InputField
              type="text"
              name="search"
              placeholder="بتدور على ايه؟"
              value={searchText}
              onChange={handleSearchChange}
              className="!bg-white text-black placeholder:text-gray-400 border-solid-[1px] border-gray-400 outline-none focus:ring-0"
            />
    </div>
    <div className=" px-4 py-2  font-bold text-sm flex items-center rounded-none rounded-l-lg text-black">
      <Search className="ml-1" size={18} />
    </div>
  </div>

  <div className="flex items-center space-x-4 rtl:space-x-reverse text-white">
    <Link href={'/register'}>
    <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition">
      <User2 size={22} />
      <span className="text-sm">تسجيل دخول</span>
    </div>
    </Link>

    <div className="h-6 w-px bg-gray-400"></div>

    <Heart size={22} className="cursor-pointer hover:text-yellow-400 transition" />

    <div className="h-6 w-px bg-gray-400"></div>

    <ShoppingCart size={22} className="cursor-pointer hover:text-yellow-400 transition" />
  </div>
  </div>


  {/* Routing icons */}
<div dir="rtl" className="navbar px-4 py-3 flex items-center justify-center gap-6 bg-white shadow-md rounded-xl">
  {/* الرئيسية */}
  <div className="flex flex-col items-center p-3  bg-btn-color rounded-xl shadow-md text-white cursor-pointer">
    <Home size={22} />
    <span className="text-xs ">الرئيسية</span>
  </div>

  {/* الفئات */}
  <div className="flex flex-col items-center p-3 px-4   bg-btn-color rounded-xl shadow-md text-white cursor-pointer">
    <List size={22} />
    <span className="text-xs ">الفئات</span>
  </div>

  {/* عربة التسوق */}
  <div className="flex flex-col items-center p-3 px-4  bg-btn-color rounded-xl shadow-md text-white cursor-pointer">
    <ShoppingCart size={22} />
    <span className="text-xs ">السلة</span>
  </div>

  {/* المفضلة */}
  <div className="flex flex-col items-center p-3  bg-btn-color rounded-xl shadow-md text-white cursor-pointer">
    <Heart size={22} />
    <span className="text-xs ">المفضلة</span>
  </div>

  {/* الملف الشخصي */}
  <div className="flex flex-col items-center p-3 px-4  bg-btn-color rounded-xl shadow-md text-white cursor-pointer">
    <User2 size={22} />
    <span className="text-xs ">حسابي</span>
  </div>
</div>
<Container >
<div className="max-w-screen-xl mx-auto">
<div className="absolute top-[150px] left-0 w-full h-[600px] z-0 pointer-events-none overflow-hidden">
  <svg
    viewBox="0 0 1440 220"
    className="w-full h-full"
    preserveAspectRatio="none"
  >
    <path
      fill="#F5EFFF"
      fillOpacity="1"
      d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    ></path>
  </svg>
</div>




<div className="w-full bg-white">
  <div className="max-w-screen-xl mx-auto p-5 text-black z-[10000]">
{homedata?.sliders?.length > 0 &&(
  <Slider
    items={homedata.sliders}
    height="h-[500px]"
    objectFit="cover"
    showNavigation={true}
    showPagination={true}
    autoPlayDelay={3000}
  />
)}


  </div>
</div>



 
<div className="w-full bg-white mt-3">
  
  <div className=" p-5 overflow-x-auto scrollbar-hide">
    <div className="flex w-max">
      {homedata.categories?.map((image, index) => (
        <div key={index}>
          <Circle
            id={index + 1}
            image={image.image}
            name={image.name}
          />
        </div>
      ))}
    </div>
  </div>
</div>


<div className="w-full bg-white mt-3">
   <div className="flex justify-end">
      <h2 className="text-btn-color font-bold text-xl">
        الأكثر مبيعاً
      </h2>
    </div>
  <div className=" overflow-x-auto scrollbar-hide px-1 py-5">
    <div className="flex gap-4 w-max">
      {homedata.topSelling?.map((image, index) => (
        <div
          key={index}
          className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] flex-shrink-0"
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
  reviews_avg={image.reviews_avg} // e.g., 2.5, 4.1
  handellove={() => console.log(`Liked product ${index + 1}`)}
/>

        </div>
      ))}
    </div>
  </div>
</div>




<div className="w-full bg-white mt-3">
   <div className="flex justify-end">
      <h2 className="text-btn-color font-bold text-xl">
عروض مميزة
      </h2>
    </div>
  <div className=" overflow-x-auto scrollbar-hide px-1 py-5">
    <div className="flex gap-4 w-max">
      {homedata.hotDeals?.map((image, index) => (
        <div
          key={index}
          className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] flex-shrink-0"
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
      reviews_avg={image.reviews_avg} // e.g., 2.5, 4.1
      handellove={() => console.log(`Liked product ${index + 1}`)}
/>

        </div>
      ))}
    </div>
  </div>
</div>


<div className="w-full bg-white mt-3">
  {homedata.categoriesWithProducts?.map((item) => (
    <div key={item.id} className="mb-6">
      <h2 className="text-btn-color font-bold text-xl text-right px-4 mb-2">
        {item.name}
      </h2>

      {/* Product List */}
      <div className="overflow-x-auto scrollbar-hide px-1 py-5">
        <div className="flex gap-4 w-max">
          {item.products.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] flex-shrink-0"
            >
              <Card
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                originalPrice={product.originalPrice}
                category={product.category}
                discount={product.discount}
                love={product.love}
                stock={product.stock}
                soldOut={product.soldOut}
                packet_pieces={product.packet_pieces}
                packet_price={product.packet_price}
                piece_price_after_offer={product.piece_price_after_offer}
                packet_price_after_offer={product.packet_price_after_offer}
                reviews_avg={product.reviews_avg}
                handellove={() => console.log(`Liked product ${product.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>

</div>


</Container>
</>
      )}
    {/* Navbar */}




  </section>
  );
  } 