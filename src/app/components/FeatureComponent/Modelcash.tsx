"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, MapPin, Pencil, Plus, Wallet, X } from "lucide-react";
import Image from "next/image";
import { AddressData, Checkout, Profile, surecash } from "@/app/lib/type";
import { BaseUrl, headers } from "../Baseurl";
import Link from "next/link";
import cash from "../../../../public/asset/images/cash.png";
import toast from "react-hot-toast";

export const Cash = ({
    show,
    id,
    code,
    items,
    oncheckout,
    close,
}: // color_id,
Checkout) => {
    const [addressList, setAddressList] = useState<AddressData[]>([]);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [usePoints, setUsePoints] = useState<string>("0");
<<<<<<< HEAD
=======
      const [profile, setProfile] = useState<Profile>();
      const [delivery,setdelivery]=useState(0)
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
    const [sure, setsure] = useState<surecash>({
        user_address_id: 0,
        payment_type: "1",
        notes: "",
        code: code,
<<<<<<< HEAD
        use_points: "",
=======
        use_points: "0",
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
    });
    const [check, setcheck] = useState(false);
    const order = `${BaseUrl}api/orders`;
    const delete_address = `${BaseUrl}api/address/`;
<<<<<<< HEAD
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await axios.get(`${BaseUrl}api/address`, {
                    headers,
                });
                if (Array.isArray(res.data?.data?.data)) {
                    setAddressList(res.data.data.data);
                } else {
                    console.error("العناوين غير متوفرة بشكل صحيح");
                }
            } catch (err) {
                console.error("فشل تحميل العناوين:", err);
            }
        };

        fetchAddresses();
    }, []);

    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [show]);

    const handelcheck = () => {
        if (check) {
            handelcash("use_points", "0");
            setcheck(false);
        } else {
            setcheck(true);
            handelcash("use_points", "1");
        }
    };
    const handelcash = (field: keyof surecash, value: any) => {
        setsure((prevsure) => ({ ...prevsure, [field]: value }));
    };
    const handleConfirm = async () => {
        const finalCode = code ?? ""; // تفادي undefined

        const finalSure: surecash = {
            ...sure,
            code: finalCode,
        };

        try {
            const res = await axios.post(order, finalSure, { headers });

            if (res.data?.status.code === 200) {
                toast.success("✅ تم إنشاء الطلب بنجاح");
=======
  const url = `${BaseUrl}api/user/profile`;

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await axios.get(`${BaseUrl}api/address`, {
                    headers,
                });
                if (Array.isArray(res.data?.data?.data)) {
                    setAddressList(res.data.data.data);
                } else {
                    console.error("العناوين غير متوفرة بشكل صحيح");
                }
            } catch (err) {
                console.error("فشل تحميل العناوين:", err);
            }
        };
         const getProfile = async () => {
      try {
        const res = await axios.get(url, { headers });
        console.log(res.data.data.name);
        setProfile(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("خطأ فى جلب المعلومات الخاصه بك");
      }
    };

        fetchAddresses();
        getProfile();
    }, []);

    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [show]);

    const handelcheck = () => {
        if (check) {
            handelcash("use_points", "0");
            setcheck(false);
        } else {
            setcheck(true);
            handelcash("use_points", "1");
        }
    };
    const handelcash = (field: keyof surecash, value: any) => {
        setsure((prevsure) => ({ ...prevsure, [field]: value }));
    };
    const handel_delivery_cost=(cost:number)=>{
        setdelivery(cost);
    }
    const handleConfirm = async () => {
        const finalCode = code ?? ""; // تفادي undefined

        const finalSure: surecash = {
            ...sure,
            code: finalCode,
        };

        try {
            const res = await axios.post(order, finalSure, { headers });

            if (res.data?.status.code === 200) {
                toast.success("تم إنشاء الطلب بنجاح");
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e

                if (res.data?.data?.order_number) {
                    toast(`📦 رقم الطلب: ${res.data.data.order_number}`, {
                        icon: "🧾",
                    });
                }

                close();
            } else {
                toast.error("❌ فشل إنشاء الطلب، تأكد من البيانات");
                console.log("🚨 الرد من السيرفر:", res.data);
            }
        } catch (error: any) {
            toast.error("⚠️ حدث خطأ أثناء إرسال الطلب");
            console.error("🛑 Error in order request:", error);
        }

        console.log("📦 الطلب المرسل:", finalSure);
    };

    const handeldelete_address = (id: number) => {
        axios
            .delete(`${delete_address}${id}`, { headers })
            .then((res) => {
                if (res.data.status) {
                    toast.success("✅ تم حذف العنوان بنجاح");
                    setAddressList((prev) =>
                        prev.filter((addr) => addr.id !== id)
                    );
                } else {
                    toast.error("❌ فشل حذف العنوان");
                }
            })
            .catch((err) => {
                console.error("🚨 خطأ في حذف العنوان:", err);
                toast.error("⚠️ حدث خطأ أثناء حذف العنوان");
            });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 overflow-y-auto">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-4 space-y-4 animate-fadeIn relative max-h-screen overflow-y-auto">
                <button
                    className="absolute top-3 left-3 text-xl text-gray-500 hover:text-red-500"
                    onClick={close}>
<<<<<<< HEAD
                    ×
=======
                    <X/>
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
                </button>

                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
                    🧾 تفاصيل الدفع
                </h2>

<<<<<<< HEAD
                {/* ✅ كروت العناوين */}
=======
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
                <div className="space-y-2">
                    <h3 className="text-right font-semibold text-gray-700">
                        📍 اختر العنوان:
                    </h3>
                    <div className=" flex gap-4 overflow-x-auto whitespace-nowrap py-4">
                        {addressList.map((addr) => (
                            <div
                                key={addr.id}
<<<<<<< HEAD
                                // onClick={() => setSelectedAddressId(addr.id)}
                                onClick={() => {
                                    handelcash("user_address_id", addr.id);
                                }}
                                className={`p-3 min-w-[300px] whitespace-normal break-words rounded-xl relative cursor-pointer border-2 transition hover:shadow-md text-right ${
=======
                                onClick={() => {
                                    handelcash("user_address_id", addr.id),
                                    handel_delivery_cost(addr.area.final_cost)
                                }}
                                className={`p-3 min-w-[250px] whitespace-normal break-words rounded-xl relative cursor-pointer border-2 transition hover:shadow-md text-right ${
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
                                    sure.user_address_id === addr.id
                                        ? "border-purple-700 bg-purple-50"
                                        : "border-gray-200 bg-gray-50"
                                }`}>
<<<<<<< HEAD
                                <button
                                    className="absolute top-0 left-3 text-xl text-gray-500 hover:text-red-500"
                                    onClick={() => {
                                        handeldelete_address(addr.id);
                                    }}>
                                    ×
                                </button>
=======
                      
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-gray-800 flex items-center gap-1">
                                        <MapPin size={16} />
                                        {addr.full_name}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {addr.address_details}, {addr.area.name},{" "}
                                    {addr.city.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    تكلفة التوصيل: {addr.area.final_cost} ج.م
                                </p>
                            </div>
                        ))}
                    </div>

                    <Link
                        href={"/location"}
                        className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                        <Plus size={16} />
                        إضافة عنوان جديد
                    </Link>

                    <Link
                        href={"/editLocation"}
                        className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                        <Pencil size={16} />
<<<<<<< HEAD
                        تعديل العنواين
=======
                        تعديل العنوان
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
                    </Link>
                </div>

                {/* ✅ طريقة الدفع */}
                <div className="text-right">
                    <label className="block mb-2 font-medium text-gray-700">
                        💳 طريقة الدفع:
                    </label>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                handelcash("payment_type", "1");
                            }}
                            className={`flex items-center gap-3 px-4 py-2 border rounded-lg transition ${
                                paymentMethod === "cash"
                                    ? "bg-gradient-to-r from-purple-700 to-orange-400 text-white border-none"
                                    : "bg-gray-100 border-gray-300 text-gray-700"
                            }`}>
                            <Wallet size={18} />
<<<<<<< HEAD
                            <span>كاش عند الاستلام</span>
=======
                            <span>الدفع عند الاستلام</span>
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
                            <Image
                                src={cash}
                                alt="Cash"
                                width={24}
                                height={24}
                                className="rounded"
                                unoptimized
                            />
                        </button>
                    </div>
                </div>

<<<<<<< HEAD
                {/* ✅ خصم النقاط */}
=======
<div  className="points w-full p-3  bg-gradient-to-r from-purple-700 to-orange-400 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition">
نقاطك : {profile?.points}
</div>
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
                <div className="flex items-center gap-2 text-right">
                    <input
                        id="usePoints"
                        type="checkbox"
                        onClick={() => {
                            handelcheck();
                        }}
<<<<<<< HEAD
                        className="w-5 h-5 accent-purple-700 cursor-pointer"
=======
                        className="w-5 h-5 accent-purple-700"
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
                    />
                    <label
                        htmlFor="usePoints"
                        className="text-gray-700 font-medium">
                        استخدام النقاط المتاحة للحصول على خصم
                    </label>
                </div>

                {/* ✅ المنتجات */}
<<<<<<< HEAD
                {/* <div className="bg-gray-50 rounded-xl p-3 border text-right">
                    <h3 className="font-semibold text-gray-700 mb-1">
                        🛍️ المنتجات:
                    </h3>
                    <ul className="space-y-1 text-sm text-black">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between border-b pb-1">
                                <span>{item.product.name}</span>
                                <span>
                                    {item.qty} × {item.price_after_discount} ج.م
                                </span>
                            </li>
                        ))}
                    </ul>
                </div> */}

                {/* ✅ كود الخصم */}
=======
               <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-1 gap-4 mb-8 text-center text-sm sm:text-base">
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-200">
      <p className="text-gray-700 font-semibold mb-1">💰 المجموع الفرعى</p>
      <p className="text-green-700 text-lg font-bold">{items?.total} ج.م</p>
    </div>

    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-200">
      <p className="text-gray-700 font-semibold mb-1">🚚 رسوم التوصيل</p>
      <p className="text-orange-600 text-lg font-bold">{delivery??0}  ج.م</p>
    </div>
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-200">
      <p className="text-gray-700 font-semibold mb-1">الاجمالى</p>
      <p className="text-orange-600 text-lg font-bold">
  {Number(items?.total || 0) + Number(delivery || 0)} ج.م
</p>

    </div>
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-200">
      <p className="text-gray-700 font-semibold mb-1">⭐ نقاطك</p>
      <p className="text-purple-700 text-lg font-bold">
         {(profile?.points ?? 0) * Number(profile?.pointsSettings?.point_price  ?? 0)}
           </p>
    </div>

  </div>

>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
                {code && (
                    <div className="text-right text-green-700 font-medium">
                        🎁 كود الخصم المفعّل:{" "}
                        <span className="underline">{code}</span>
                    </div>
                )}
                <div className="notes">
                    <label className="font-semibold text-gray-700 mb-1">
                        ملاحظات
                    </label>
                    <textarea
                        id="notes"
                        className="w-full h-20 p-2 text-gray-700 border rounded-md focus:
    border-purple-700"
                        onChange={(e) => {
                            handelcash("notes", e.target.value);
                        }}></textarea>
                </div>
                {/* ✅ زر التأكيد */}
                <div className="pt-3">
                    <button
                        onClick={handleConfirm}
                        className="bg-gradient-to-r from-purple-700 to-orange-400 hover:opacity-90 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 w-full font-semibold shadow-md text-sm transition">
                        <CheckCircle2 size={18} />
                        تأكيد الطلب
                    </button>
                </div>
            </div>
        </div>
    );
<<<<<<< HEAD
};
=======
};
>>>>>>> 8788c06d22a8adaf41154045830bcff3c7d0e60e
