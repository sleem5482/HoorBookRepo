"use client";
import { BaseUrl, headers } from "@/app/components/Baseurl";
import Container from "@/app/components/Container";
import { fetchData, Postresponse } from "@/app/lib/methodes";
import { AddToChart, ApiResponse, ProductDetails } from "@/app/lib/type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import SmartNavbar from "@/app/components/ui/Navbar";
import { CallApi } from "@/app/lib/utilits";
import { Button } from "@/app/components/ui/Button";
import CommentPopup from "@/app/components/ui/popup";
import toast from "react-hot-toast";
export default function Details() {
  const [showPopup, setShowPopup] = useState(false);
  const sendres = `${BaseUrl}api/carts`;
  const pathname = usePathname();
  const productid = pathname.split("/").pop();
  const [details, setDetails] = useState<ProductDetails>();
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<"Piece" | "Packet">("Piece");
  const [quantity, setQuantity] = useState(1);

  const [chart, setchart] = useState<Partial<AddToChart>>({
    product_type: "Piece",
    qty: 0,
    product_id: Number(productid),
  });

  const handelchange = (field: keyof AddToChart, value: string | number) => {
    setchart((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
  }, [productid,showPopup]);

  if (!details) return <div className="text-center p-10">جار التحميل...</div>;
const imgcomment=`${BaseUrl}${details.image}`
  const selectedMedia = details.media.find((img) => img.color_id === selectedColorId);
  const mainImage = selectedMedia?.image || details.image;
  const selectedColor = details.colors.find((color) => color.id === selectedColorId);

  // حساب أقصى كمية ممكنة بناءً على الوحدة المختارة
  const maxQuantity = (() => {
    if (selectedUnit === "Packet") {
      // لو الوحدة كرتونة
      if (details.colors.length > 0 && selectedColor) {
        return Math.floor(selectedColor.stock / (details.packet_pieces || 1));
      } else {
        return Math.floor(details.stock / (details.packet_pieces || 1));
      }
    } else {
      // لو الوحدة قطعة
      if (details.colors.length > 0 && selectedColor) {
        return selectedColor.stock;
      } else {
        return details.stock;
      }
    }
  })();

  const price =
    selectedUnit === "Piece"
      ? details.piece_price_after_offer || details.piece_price
      : details.packet_price_after_offer || details.packet_price;

  const handelsupmit = async () => {
    try {
      let payload = { ...chart };

      if (details.colors.length === 0) {
        delete payload.color_id;
      }

      const res: ApiResponse<AddToChart> = await CallApi("post", sendres, payload, headers);
      console.log(res);
      if(res.data===null){
        toast.error("نفذت هذه الكميه برجاء اختيار كميه اقل")
      }
      if(res.status?.code===200 ){
       toast.success("تمت الاضافه بنجاح")
      }
      console.log(payload);
    } catch (error) {
      console.log(error);
    }
  };

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
              unoptimized
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
              onClick={() => {
                setSelectedUnit("Piece");
                handelchange("product_type", "Piece");
                handelchange("qty", 1);
                setQuantity(1);
              }}
            >
              {(details.piece_price_after_offer === '') ? (
                `قطعة (${details.piece_price} ج.م)`
              ) : (
                <div className="flex flex-col">
                  <span>قطعة ({details.piece_price_after_offer} ج.م)</span>
                  <span className="line-through text-gray-400">قطعة ({details.piece_price} ج.م)</span>
                </div>
              )}
            </button>
            {(details.packet_pieces !== 0) && (
              <button
                className={`flex-1 px-4 py-2 border rounded-md transition text-sm md:text-base ${
                  selectedUnit === "Packet"
                    ? "bg-violet-100 border-violet-600 font-semibold text-black"
                    : "border-gray-300 text-black"
                }`}
                onClick={() => {
                  setSelectedUnit("Packet");
                  handelchange("product_type", "Packet");
                  handelchange("qty", 1);
                  setQuantity(1);
                }}
              >
                {(details.packet_price_after_offer === '') ? (
                  `${details.packet_price} قطعة  دسته`
                ) : (
                  <div className="flex flex-col">
                    <span>{details.packet_price_after_offer} قطعة  ({details.packet_price_after_offer} ج.م)دسته</span>
                    <span className="line-through text-gray-500 text-sm">
                      {details.packet_price} قطعة  ({details.packet_price} ج.م)دسته
                    </span>
                  </div>
                )}
              </button>
            )}
          </div>

          {/* الألوان */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">اختر اللون:</p>
            <div className="flex gap-3 flex-wrap">
              {details.colors.map((color) => (
                <div
                  key={color.id}
                  onClick={() => {
                    setSelectedColorId(color.id);
                    handelchange("color_id", color.id);
                    setQuantity(1);
                    handelchange("qty", 1);
                  }}
                  className={`w-10 h-10 rounded-full border-4 cursor-pointer transition-transform ${
                    selectedColorId === color.id ? "border-black scale-110" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.code }}
                ></div>
              ))}
            </div>
          </div>

          {/* عرض حالة المخزون */}
          {((selectedColor && selectedColor.stock === 0) || (!selectedColor && details.stock === 0)) ? (
            <p className="text-red-600 font-semibold mb-4 text-sm md:text-base">نفذت الكميه</p>
          ) : (
            <p className="text-green-600 font-semibold mb-4 text-sm md:text-base">✅ متوفر حالياً</p>
          )}

          {/* السعر والكمية */}
          <div className="flex items-center justify-between mb-6 text-black">
            {/* السعر */}
            <span className="text-2xl font-bold text-orange-600">{price} ج.م</span>

            {/* تحديد الكمية من select */}
            <div className="flex items-center gap-2">
              <select
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuantity(val);
                  handelchange("qty", val);
                }}
                className="p-2 border rounded-md text-sm"
                disabled={maxQuantity === 0}
              >
                <option value={0} disabled>اختر الكمية</option>
                {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              {/* عرض المتاح */}
              <span className="text-sm text-gray-600">
                {selectedUnit === "Packet"
                  ? `(متاح ${maxQuantity} ${maxQuantity > 1 ? "كرتونات" : "كرتونة"})`
                  : selectedUnit === "Piece"
                    ? selectedColor
                      ? `(متاح ${selectedColor.stock} قطعة)`
                      : `(متاح ${details.stock} قطعة)`
                    : ""}
              </span>
            </div>
          </div>

          {/* زر الإضافة للسلة */}
          <button
            className="w-full bg-gradient-to-r from-orange-400 to-purple-500 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:opacity-90 transition"
            onClick={() => { handelsupmit(); }}
            disabled={maxQuantity === 0}
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
            {details.reviews_avg !== null ? (
              `⭐ تقييمات المستخدمين (${details.reviews_avg.toFixed(1)})`
            ) : (
              <span className="text-gray-400">كن انت اول المقيمين </span>
            )}
          </h3>

          <div className="space-y-4 relative">

          <div className="comment">
            <Button theme="primary" onclick={() => setShowPopup(true)}>Add Comment</Button>

   {showPopup && (
          <CommentPopup
            productId={Number(productid)} 
            onClose={() => setShowPopup(false)}
              imageUrl={`${BaseUrl}${details.image}`}
          />
        )}

          </div>
            {details.reviews.map((review) => (
              <div key={review.id} className="border rounded-md p-4 bg-gray-50 shadow-sm">
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-gray-500 text-xs mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>



        </div>
      </div>
    </Container>
  );
}
