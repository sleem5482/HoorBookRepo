"use client";
import Container from "../components/Container";
import { signIn } from "next-auth/react";
import { ApiResponse, FieldForm, Login } from "../lib/type";
import { useState } from "react";
import FormField from "../components/ui/Formfield";
import SmartNavbar from "../components/ui/Navbar";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { BaseUrl } from "../components/Baseurl";
import { Postresponse } from "../lib/methodes";
import Cookies from 'js-cookie'
import toast, {Toaster} from 'react-hot-toast';
import { usePathname, useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [login, setLogin] = useState<Record<string, any>>({});
  const router=useRouter();
  const fields: FieldForm[] = [
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "email",
      requierd: true,
    },
    {
      label: "كلمة المرور",
      name: "password",
      type: "password",
      requierd: true,
    },
  ];
const url= `${BaseUrl}api/user/login`
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const res :ApiResponse<Login> = await Postresponse(url,login)
      const { access_token, user, token_type } = res.data;
      Cookies.set("access_token_login", access_token, { expires: 1 });
      Cookies.set("token_type_login", token_type);
      Cookies.set("login_user_id", user.id.toString());
      Cookies.set("login_user_name", user.name);
      Cookies.set("login_user_email", user.email);
      Cookies.set("login_user_type", user.type.toString());
      Cookies.set("login_user_type_name", user.type_name);
      Cookies.set("login_cart_count", user.CartCount.toString());
      toast.success('تم تسجيل الدخول بنجاح 🎉')
      window.window.location.href='/'
      
if (user.pointsSettings) {
  Cookies.set("login_points", user.pointsSettings.points);
  Cookies.set("login_price", user.pointsSettings.price);
  Cookies.set("login_point_price", user.pointsSettings.point_price);
}
 
    }
    catch(error){
      toast.error('فشل الدخول يرجى اعاده المحاوله ')
    }
  };

  return (
    <>
      <SmartNavbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center px-4">
        <Container>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <h2 className="text-3xl font-bold text-purple-800">مرحبًا بعودتك</h2>
              <p className="text-sm text-gray-500">سجّل دخولك للوصول إلى حسابك</p>
            </div>

            <FormField fields={fields} data={login} onChange={setLogin} />

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-purple-700 to-orange-400 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
            >
              تسجيل الدخول
            </button>

            <div className="relative flex items-center justify-center text-gray-400">
              <div className="absolute left-0 right-0 h-px bg-gray-200" />
              <span className="bg-white px-3 z-10 text-sm">أو</span>
            </div>

       <div className="w-full flex justify-center mt-2">
<GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("لم يتم استلام بيانات الاعتماد من جوجل");
        return;
      }
      const decoded: any = jwtDecode(credentialResponse.credential);

      const payload = {
        name: `${decoded.given_name} ${decoded.family_name}`,
        email: decoded.email,
        provider: "google",
        provider_id: decoded.sub,
      };

      const res = await fetch(`${BaseUrl}user/social/google/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        Cookies.set("access_token_login", data.token);
        Cookies.set("email", data.user?.email || payload.email);
        Cookies.set("name", data.user?.name || payload.name);

        toast.success("تم تسجيل الدخول بجوجل بنجاح 🎉");
        // window.location.href = "/"; // أو أي توجيه آخر
      } else {
        toast.error(data.message || "فشل تسجيل الدخول بجوجل");
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء تسجيل الدخول بجوجل");
    }
  }}
  onError={() => toast.error("فشل تسجيل الدخول بجوجل")}
/>

</div>


            <p className="text-sm text-center mt-4">
              لا تمتلك حسابًا؟{" "}
              <Link
                href="/register"
                className="text-purple-700 hover:underline font-semibold text-center flex justify-center" 
              >
                إنشاء حساب جديد
              </Link>
            </p>
          </form>
        </Container>
      </div>
    </>
  );
}
