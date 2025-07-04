"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Container from "@/app/components/Container";
import { BadgeCheck, User, Star } from "lucide-react";
import SmartNavbar from "@/app/components/ui/Navbar";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    type_name: "",
    points: "0",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const name = Cookies.get("name") || "";
    const email = Cookies.get("email") || "";
    const type_name = Cookies.get("type_name") || "غير محدد";
    const points = Cookies.get("points") || "0";

    setUser({ name, email, type_name, points });
    setIsLoggedIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-10 px-4">
      <SmartNavbar />
      <Container>
        {isLoggedIn ? (
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full mx-auto space-y-6 text-center pt-6 mt-12">
            <div className="flex flex-col items-center space-y-2 mt-4 pt-6">
              <User className="text-purple-600 w-12 h-12" />
              <h2 className="text-xl font-bold text-purple-800">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <div className="bg-purple-100 rounded-xl p-4 flex flex-col items-center">
              <BadgeCheck className="text-purple-500 mb-2" />
              <p className="text-sm text-gray-700">نوع الحساب</p>
              <p className="text-md font-semibold text-purple-700">{user.type_name}</p>
            </div>

            <div className="bg-orange-100 rounded-xl p-4 flex flex-col items-center">
              <Star className="text-orange-500 mb-2" />
              <p className="text-sm text-gray-700">النقاط</p>
              <p className="text-lg font-bold text-orange-600">{user.points}</p>
            </div>
          </div>
        ) : (
          <div className="text-center mt-10 space-y-6">
            <h2 className="text-xl font-bold text-purple-800">
              يجب تسجيل الدخول أولاً
            </h2>
            <Link
              href="/login"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              الذهاب لتسجيل الدخول
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
