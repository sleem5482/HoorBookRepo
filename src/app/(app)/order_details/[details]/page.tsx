"use client";

import { BaseUrl, headers } from "@/app/components/Baseurl";
import Container from "@/app/components/Container";
import { OrderData } from "@/app/lib/type";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Ban, RotateCcw } from "lucide-react";
import SmartNavbar from "@/app/components/ui/Navbar";

export default function OrderDetails() {
  const pathname = usePathname();
  const order_id = pathname.split("/").pop();
  const get_order_by_id = `${BaseUrl}api/orders/${order_id}`;
  const [details, setDetails] = useState<OrderData>();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(get_order_by_id, { headers });
        setDetails(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, []);

  if (!details) return <div className="p-6 text-center">جاري تحميل التفاصيل...</div>;

return (
  <section className="py-8 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
    <div className="pb-32 md:pb-20">
      <SmartNavbar />
    </div>

    <Container>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            تفاصيل الطلب #{order_id}
          </h1>
          <p className="mt-1 text-gray-500">معلومات إضافية حول الطلب.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-600 rounded-xl hover:bg-red-700 transition">
            <Ban size={18} /> إلغاء
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-yellow-500 rounded-xl hover:bg-yellow-600 transition">
            <RotateCcw size={18} /> استرجاع
          </button>
        </div>
      </div>

      {/* Order Info + Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Order Info */}
        <div className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 border border-indigo-200 shadow-md rounded-xl p-5 h-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">بيانات الطلب</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>الحالة:</strong> {details.status}</p>
            <p><strong>الدفع:</strong> {details.payment_type} - {details.payment_status}</p>
            <p><strong>الإجمالي:</strong> {details.total} جنيه</p>
            <p><strong>الخصم:</strong> {details.discount} ({details.discount_type})</p>
            <p><strong>ملاحظات:</strong> {details.notes}</p>
            <p><strong>تم الإنشاء:</strong> {details.created_at}</p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-gradient-to-br from-white via-yellow-50 to-yellow-100 border border-yellow-200 shadow-md rounded-xl p-5 h-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">عنوان التوصيل</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>الاسم:</strong> {details.address.full_name}</p>
            <p><strong>المنطقة:</strong> {details.address.area}, {details.address.city}</p>
            <p><strong>المحافظة:</strong> {details.address.governorate}</p>
            <p><strong>التفاصيل:</strong> {details.address.address_details}</p>
            <p><strong>الهاتف:</strong> {details.address.phone}</p>
          </div>
        </div>
      </div>

      {/* المنتجات */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">المنتجات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {details.order_meta.map((item) => (
            <div
              key={item.id}
              className="border border-pink-200 rounded-xl p-4 shadow-md flex flex-col bg-gradient-to-br from-white via-pink-50 to-pink-100 hover:shadow-lg transition"
            >
              <img
                src={`${BaseUrl}${item.product.image}`}
                alt={item.product.name}
                className="w-full h-32 object-contain mb-3 rounded"
                
              />
              <h3 className="font-semibold text-base mb-1 text-gray-800">{item.product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.product.desc}</p>
              <div className="mt-auto text-sm text-gray-700 space-y-1">
                <p><strong>الكمية:</strong> {item.qty}</p>
                <p><strong>السعر:</strong> {item.price_after_discount} جنيه</p>
                <p><strong>النوع:</strong> {item.product_type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

}
