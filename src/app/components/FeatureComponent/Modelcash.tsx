"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, MapPin, Pencil, Plus, Wallet } from "lucide-react";
import Image from "next/image";
import { AddressData, Checkout, surecash } from "@/app/lib/type";
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
    const [sure, setsure] = useState<surecash>({
        user_address_id: 0,
        payment_type: "1",
        notes: "",
        code: code,
        use_points: "",
    });
    const [check, setcheck] = useState(false);
    const order = `${BaseUrl}api/orders`;
    const delete_address = `${BaseUrl}api/address/`;
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
                    ×
                </button>

                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
                    🧾 تفاصيل الدفع
                </h2>

                {/* ✅ كروت العناوين */}
                <div className="space-y-2">
                    <h3 className="text-right font-semibold text-gray-700">
                        📍 اختر العنوان:
                    </h3>
                    <div className=" flex gap-4 overflow-x-auto whitespace-nowrap py-4">
                        {addressList.map((addr) => (
                            <div
                                key={addr.id}
                                // onClick={() => setSelectedAddressId(addr.id)}
                                onClick={() => {
                                    handelcash("user_address_id", addr.id);
                                }}
                                className={`p-3 min-w-[250px] rounded-xl relative cursor-pointer border-2 transition hover:shadow-md text-right ${
                                    sure.user_address_id === addr.id
                                        ? "border-purple-700 bg-purple-50"
                                        : "border-gray-200 bg-gray-50"
                                }`}>
                                <button
                                    className="absolute top-0 left-3 text-xl text-gray-500 hover:text-red-500"
                                    onClick={() => {
                                        handeldelete_address(addr.id);
                                    }}>
                                    ×
                                </button>
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
                        تعديل العنواين
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
                            <span>كاش عند الاستلام</span>
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

                {/* ✅ خصم النقاط */}
                <div className="flex items-center gap-2 text-right">
                    <input
                        id="usePoints"
                        type="checkbox"
                        onClick={() => {
                            handelcheck();
                        }}
                        className="w-5 h-5 accent-purple-700"
                    />
                    <label
                        htmlFor="usePoints"
                        className="text-gray-700 font-medium">
                        استخدام النقاط المتاحة للحصول على خصم
                    </label>
                </div>

                {/* ✅ المنتجات */}
                <div className="bg-gray-50 rounded-xl p-3 border text-right">
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
                </div>

                {/* ✅ كود الخصم */}
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
};
