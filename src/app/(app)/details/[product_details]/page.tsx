"use client";
import { BaseUrl } from "@/app/components/Baseurl";
import Container from "@/app/components/Container";
import { fetchData, Postresponse } from "@/app/lib/methodes";
import { AddToChart, ApiResponse, ProductDetails } from "@/app/lib/type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import SmartNavbar from "@/app/components/ui/Navbar";
import { CallApi } from "@/app/lib/utilits";

export default function Details() {
  const sendres=`${BaseUrl}api/carts`
  const pathname = usePathname();
  const productid = pathname.split("/").pop();
  const [details, setDetails] = useState<ProductDetails>();
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<"Piece" | "Packet">("Piece");
  const [quantity, setQuantity] = useState(1);

  const [chart,setchart]=useState<AddToChart>({
    product_type:"",
    qty:0,
    product_id: Number(productid),
    color_id:0,

  }) 


  const handelchange = (field: keyof AddToChart, value: string | number) => {
    setchart((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res: ApiResponse<ProductDetails> = await fetchData(`${BaseUrl}api/products/${productid}`);
        setDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, []);

  if (!details) return <div className="text-center p-10">جار التحميل...</div>;

  const selectedMedia = details.media.find((img) => img.color_id === selectedColorId);
  const mainImage = selectedMedia?.image || details.image;
const selectedColor = details.colors.find((color) => color.id === selectedColorId);
const maxStock = selectedColor?.stock || 0; 

  const price =
    selectedUnit === "Piece"
      ? details.piece_price_after_offer || details.piece_price
      : details.packet_price_after_offer || details.packet_price;



  const handelsupmit=async()=>{
    console.log(chart);
      const headers = {
    Authorization: 'Bearer 2876|C8xIR59urI2TsjizNJhYEwBdzF0fQKy1Gn8XIJ0Gb441a05d',
    userType: '2',
    fcmToken: 'cyKAsscERdS9D9ySlWf0_g:APA91bHqA6kBk9mt26OFjDnbElFxhyYRN06y5wDAFX-ReAYrJJBun5mgIMiBCWR--BlbunQli8_fais25oeGF0FCSgm5gIM6-118-hiM7NfMMGnQ6kLAAZ0',
    lang: 'ar',
    'Content-Type': 'application/json',
  };
    try {

      
      const res:ApiResponse<AddToChart>=await CallApi("post",sendres,chart,headers)
      console.log(res);
      
    }
    catch(error){
      console.log(error);
    }
      
    }
    
    
  return (
    <Container>
      <SmartNavbar />
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* صورة المنتج */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-md aspect-square relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={`${BaseUrl}/${mainImage}`}
              alt="صورة المنتج"
              fill
              objectFit="contain"
              className="transition-transform duration-300 hover:scale-105 rounded-xl"
            />
          </div>
        </div>

        {/* التفاصيل الجانبية */}
        <div className="flex flex-col justify-center">
          {/* عنوان المنتج */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-violet-900">{details.name}</h1>

          {/* وحدة البيع */}
          <div className="flex gap-4 mb-4">
            <button
              className={`flex-1 px-4 py-2 border rounded-md transition text-sm md:text-base ${
                selectedUnit === "Piece"
                  ? "bg-violet-100 border-violet-600 font-semibold text-black"
                  : "border-gray-300 text-black"
              }`}
              onClick={() => {setSelectedUnit("Piece");handelchange("product_type","Piece");handelchange("qty", 0); setQuantity(1); }}
            >
              {(details.piece_price_after_offer==='')?
              `
              قطعة (${details.piece_price} ج.م)
              `
              :(
                <div  className="flex flex-col">
                <span>

                قطعة (${details.piece_price_after_offer} ج.م)
                </span>

                
                <span className="line-through text-gray-400">
              قطعة (${details.piece_price} ج.م)

                </span>
                </div>
              )}
            </button>
            {(details.packet_pieces!=0)?(

            <button
              className={`flex-1 px-4 py-2 border rounded-md transition text-sm md:text-base ${
                selectedUnit === "Packet"
                  ? "bg-violet-100 border-violet-600 font-semibold text-black"
                  : "border-gray-300 text-black"
              }`}
              onClick={() => {setSelectedUnit("Packet");handelchange("product_type","Packet");handelchange("qty", 0); setQuantity(1); }}

            >
              {(details.packet_price_after_offer==='')?(
                `
                ${details.packet_price} قطعة  دسته
                `
              ):(
                <div className="flex flex-col">
                  <span>
                ${details.packet_price_after_offer} قطعة  ({details.packet_price_after_offer} ج.م)دسته

                  </span>

                  <span className="line-through text-gray-500 text-sm">
                ${details.packet_price} قطعة  ({details.packet_price} ج.م)دسته

                  </span>
                </div>
              )}
            </button>
            ):(
              ''
            )}
          </div>

          {/* الألوان */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">اختر اللون:</p>
            <div className="flex gap-3 flex-wrap">
              {details.colors.map((color) => (
                <div
                  key={color.id}
                  onClick={() => {setSelectedColorId(color.id);handelchange("color_id",color.id);  setQuantity(1); 
  handelchange("qty", 1);
                    handelchange("qty", 0);}}
                  className={`w-10 h-10 rounded-full border-4 cursor-pointer transition-transform ${
                    selectedColorId === color.id ? "border-black scale-110" : "border-gray-300"
                  }`}
                  onChange={(e)=>{handelchange("color_id",Number(color.id))}}
                  style={{ backgroundColor: color.code }}
                ></div>
              ))}
            </div>
          </div>
{maxStock && details.stock?(

  <p className="text-green-600 font-semibold mb-4 text-sm md:text-base">✅ متوفر حالياً</p>
):(
  <p className="text-red-600 font-semibold mb-4 text-sm md:text-base">نفذت الكميه </p>

)}

          {/* السعر والكمية */}
     <div className="flex items-center justify-between mb-6 text-black">
  {/* السعر */}
  <span className="text-2xl font-bold text-orange-600">{price} ج.م</span>

  {/* تحديد الكمية من select */}
  <div className="flex items-center gap-2">
{maxStock ? (
  <>
    <select
      value={quantity}
      onChange={(e) => {
        const val = Number(e.target.value);
        setQuantity(val);
        handelchange("qty", val);
      }}
      className="p-2 border rounded-md text-sm"
      disabled={!selectedColor}
    >
      <option value={0} disabled>اختر الكمية</option>
      {selectedColor &&
        Array.from({ length: maxStock }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
    </select>

    
  </>
) : (
  <>
    <select
      value={quantity}
      onChange={(e) => {
        const val = Number(e.target.value);
        setQuantity(val);
        handelchange("qty", val);
      }}
      className="p-2 border rounded-md text-sm"
    >
      <option value={0} disabled>اختر الكمية</option>
      {Array.from({ length: details.stock }, (_, i) => i + 1).map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>

  </>
)}



    {/* عرض المتاح */}
    {selectedColor && (
      <span className="text-sm text-gray-600">({maxStock} متاح)</span>
    )}
  </div>
</div>


          {/* زر الإضافة للسلة */}
          <button 
          className="w-full bg-gradient-to-r from-orange-400 to-purple-500 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:opacity-90 transition"
          onClick={()=>{handelsupmit()}}
          
          >
            🛒 أضف إلى السلة
          </button>
        </div>

        {/* وصف المنتج */}
        <div className="md:col-span-2 mt-10">
          <h2 className="font-semibold text-lg text-violet-900 mb-2">📦 تفاصيل المنتج:</h2>
          <div className="text-gray-800 text-sm leading-relaxed space-y-2">
            {details.desc.split("\r\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        {/* التقييمات */}
        <div className="md:col-span-2 mt-10">
          <h3 className="text-md font-semibold text-violet-900 mb-3">
            
            {(details.reviews_avg!==null) ? (
              `⭐ تقييمات المستخدمين (${details.reviews_avg.toFixed(1)})`
            ): (
              <span className="text-gray-400">كن انت اول المقيمين </span>
            )}
          </h3>
          <div className="space-y-4">
            {details.reviews.map((review) => (
              <div key={review.id} className="border-t pt-2">
                <p className="text-sm text-gray-800">"{review.comment}"</p>
                <p className="text-xs text-gray-500 mt-1">— {review.user.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
