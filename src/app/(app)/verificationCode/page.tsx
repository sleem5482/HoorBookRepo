'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/app/components/Baseurl';
import Container from "@/app/components/Container";
import SmartNavbar from "@/app/components/ui/Navbar";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";


const VerifyCodePage = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
    
        const router=useRouter()

  // جلب الإيميل من sessionStorage
  useEffect(() => {
    const savedEmail = Cookies.get('reset_pass_email');
    if (savedEmail) setEmail(savedEmail);
    console.log(savedEmail)
  }, []);

  // عداد الوقت
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  // إعادة إرسال الكود
  const handleResend = async () => {
    setTimer(60);
    setCanResend(false);

    try {
      await axios.post(
        `${BaseUrl}api/user/forget-password`,
        new URLSearchParams({ email }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
    } catch (err) {
      console.error('Error resending code:', err);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}api/user/verify-code-forget-password`,
        new URLSearchParams({
          email,
          verification_code: code,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const result =await response.data;
      console.log(result)

      if (result.status.status == true) {
        Cookies.set('verifyCode',code)
        router.push ('/resetPassword')
      } else {
        setErrorModal(true)
      }
    } catch (err) {
      console.error('Error verifying code:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 px-2 sm:px-4 py-6 sm:py-10">
    <SmartNavbar />

    <div className="flex justify-center mt-10 md:mt-5 ">
      <Container>
    <div  className="bg-white shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-full space-y-6 border border-purple-100 mt-10 mx-auto text-center">
      <h2 className="text-xl font-bold text-purple-800 mb-2">
        تم ارسال كود التحقق الى الايميل الخاص بكم
      </h2>

      <p className="text-sm text-gray-700 mb-4">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-purple-800 underline hover:text-purple-500"
          >
            إعادة ارسال كود التحقق
          </button>
        ) : (
          <span>اعادة ارسال كود التحقق بعد: {timer} ثانية</span>
        )}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={handleCodeChange}
          placeholder="ادخل الرمز"
          className="border border-purple-300 rounded px-4 py-2 text-center w-40 text-black outline-none mx-auto"
        />
      </div>

      <button
        onClick={handleConfirm}
        className="w-2/3 bg-gradient-to-r from-purple-700 to-orange-400 text-white font-bold py-3 text-lg rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 mt-2"
      >
        تأكيد
      </button>
      </div>
        </Container>
          </div>
        {errorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-[90%] max-w-sm text-center">
                        <div className="mb-4 text-lg text-black">
                            كود التحقق غير صحيح
                        </div>
                        <button
                            className="text-purple-700 font-bold mt-2"
                            onClick={() => setErrorModal(false)}>
                            تأكيد
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
};

export default VerifyCodePage;