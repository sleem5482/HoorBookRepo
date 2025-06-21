"use client";
import Container from "../components/Container";
import { signIn } from "next-auth/react";
import { FieldForm } from "../lib/type";
import { useState } from "react";
import FormField from "../components/ui/Formfield";
import Image from "next/image";
import Logo from '../../../public/asset/images/حورلوجو-1.png';
import { Heart, ShoppingCart, User2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [login, setLogin] = useState<Record<string, any>>({});

  const fields: FieldForm[] = [
    {
      label: "Email",
      name: "email",
      type: "email",
      requierd: true
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      requierd: true
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle normal form-based login here if needed
    console.log("Form Submitted:", login);
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", {
      redirect: true,
    });

    console.log("Google Sign-in result:", result);
  };

  return (
    <>
      <div dir="rtl" className="navbar px-4 py-2 flex items-center justify-between p-5 shadow-md bg-btn-color">
        <div className="text-white font-bold text-lg">
          <Link href={'/'}>
          <Image src={Logo} alt="شعار الموقع" className="h-[42px] w-[55px] rounded-[10px]" />
          </Link>
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
          <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-xl rounded-2x p-8 w-full max-w-md space-y-6">
            <div className="text-black flex flex-col items-center justify-center">

              <h2 className="text-2xl font-bold text-purple-800 text-center">مرحبا بعودتك</h2>

              <FormField fields={fields} data={login} onChange={setLogin} />

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-purple-700 to-orange-400 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
              >
                تسجيل الدخول
              </button>

              <button
                type="button"
                  onClick={() => signIn("google",{ callbackUrl: "/" })}
                className="mt-4 w-full bg-red-500 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Google تسجيل الدخول عبر 
              </button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}
