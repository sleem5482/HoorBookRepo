"use client";
import { Mail } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BaseUrl } from "../Baseurl";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ForgotPasswordModal({
    show,
    onClose,
    setErrorModal,
}: {
    show: boolean;
    onClose: () => void;
    setErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState<string>("");

    const router = useRouter();

    // إغلاق المودال عند الضغط خارج العنصر
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        if (show) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [show]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append("email", email);
        try {
            const response = await axios.post(
                `${BaseUrl}api/user/forget-password`,
                params,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            if (response.data.status.status == true) {
                toast.success("تم إرسال رمز إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
                setEmail("");
                Cookies.set('reset_pass_email',email)
                router.push("/verificationCode");
                onClose(); 
            } else {
                onClose();
                toast.error("حدث خطأ أثناء إرسال الطلب.");
                setEmail("");
                setErrorModal(true);
            }
        } catch (error) {
            console.error("Error sending password reset request:", error);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
                <h2 className="text-xl font-bold mb-2 text-center text-black">
                    نسيت كلمة السر؟
                </h2>
                <p className="text-center mb-4 text-gray-600">
                    أدخل عنوان بريدك الإلكتروني وسنرسل رمزًا لإنشاء كلمة مرور
                    جديدة
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <Mail className="w-5 h-5 text-gray-500 mb-2 mx-auto absolute right-3 top-3" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                            placeholder="ادخل بريدك الإلكتروني"
                            className="w-full p-2 mb-4 border-2 border-gray-500 rounded-lg pr-10 text-black outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-900 to-orange-400 text-white w-full py-2 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center shadow-lg">
                        استمرار
                    </button>
                </form>
            </div>
        </div>
    );
}
