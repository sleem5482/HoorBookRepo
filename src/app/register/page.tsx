"use client";
import { useState } from "react";
import Container from "../components/Container";
import FormField from "../components/ui/Formfield";
import { FieldForm } from "../lib/type";
import { Heart, Search, ShoppingCart, User2 } from "lucide-react";
import InputField from "../components/ui/Input";
  import Logo from '../../../public/asset/images/حورلوجو.jpeg'
import Image from "next/image";
import Link from "next/link";


export default function Registerpage() {
  const fields: FieldForm[] = [
    { name: "fullName", label: "الاسم كاملاً", type: "text", placeholder: "ادخل اسمك كاملاً" },
    { name: "email", label: "البريد الإلكتروني", type: "email", placeholder: "ادخل بريدك الالكتروني" },
    { name: "password", label: "الرقم السري", type: "password", placeholder: "ادخل الرقم السري" },
    { name: "confirmPassword", label: "تأكيد كلمة السر", type: "password", placeholder: "ادخل تأكيد كلمة السر" },
    {
      name: "accountType",
      label: "نوع الحساب",
      type: "select",
      options: ["مستخدم عادي", "مدير"],
    },
  ];

  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ بيانات التسجيل:", formData);
  };

  return (
  <>
  <div dir="rtl" className="navbar px-4 py-2 flex items-center justify-between p-5   shadow-md bg-btn-color">

  <div className="text-white font-bold text-lg">
    <Image src={Logo} alt="شعار الموقع" className="h-[42px] w-[55px] rounded-[10px]" />
  </div>



  <div className="flex items-center space-x-4 rtl:space-x-reverse text-white">
    
    <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition">
      <User2 size={22} />
      <span className="text-sm">تسجيل دخول</span>
    </div>

    <div className="h-6 w-px bg-gray-400"></div>

    <Heart size={22} className="cursor-pointer hover:text-yellow-400 transition" />

    <div className="h-6 w-px bg-gray-400"></div>

    <ShoppingCart size={22} className="cursor-pointer hover:text-yellow-400 transition" />
  </div>
  </div>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-purple-800 text-center">إنشاء حساب جديد</h2>

          <FormField fields={fields} data={formData} onChange={setFormData} />

          <p className="text-xs text-gray-500 text-right leading-relaxed">
            بالضغط على الزر، فأنت توافق على{" "}
            <span className="text-purple-600 underline cursor-pointer">شروط الاستخدام</span> و{" "}
            <span className="text-purple-600 underline cursor-pointer">سياسة الخصوصية</span>.
          </p>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 to-orange-400 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            إنشاء حساب جديد
          </button>

          <p className="text-center text-sm">
            لدي حساب؟{" "}
            <Link href={'/login'}>
            <span className="text-purple-700 font-semibold underline cursor-pointer flex center justify-center">
              تسجيل الدخول
            </span>
            </Link>
          </p>
        </form>
      </Container>
    </div>
  </>

  );
}
