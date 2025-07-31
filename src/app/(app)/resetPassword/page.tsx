'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff,Sparkles } from "lucide-react";
import Container from "@/app/components/Container";
import SmartNavbar from "@/app/components/ui/Navbar";
import { BaseUrl } from '@/app/components/Baseurl';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import ErrorPopUP from '@/app/components/ui/pop-up_show_message_error';



export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  

  const [modal, setModal] = useState<{show:boolean,message:string}>({ show: false, message: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
   const [showPassword, setShowPassword] = useState({pass:false, confirmPass:false});
   const router=useRouter()

  //  Helper to update form fields
  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  //  Load email and code from sessionStorage
  useEffect(() => {
    const storedEmail = Cookies.get('reset_pass_email') || '';
    const storedCode = Cookies.get('verifyCode') || '';
console.log(storedCode,storedEmail)
    setEmail(storedEmail);
    setVerificationCode(storedCode);
  }, []);

  // 📤 Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModal({message:'',show:false});

    const { password, confirmPassword } = formData;

    if (password.length < 8) {
      setModal({message:'كلمة المرور يجب أن تكون 8 أحرف على الأقل' ,show:true});
      return;
    }

    if (password !== confirmPassword) {
      setModal({message:'كلمتا المرور غير متطابقتين',show:true});
      return;
    }

    const body = new FormData();
    body.append('password', password);
    body.append('password_confirmation', confirmPassword);
    body.append('email', email);
    body.append('verification_code', verificationCode);

    try {
      setLoading(true);
      const res = await axios.post(`${BaseUrl}api/user/update-password`,
       
         body,
          {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await res.data;
      console.log(data)

      if (!res.status) {
        throw new Error(data.message || 'حدث خطأ أثناء إعادة تعيين كلمة المرور');
      }

      toast.success('تم إعادة تعيين كلمة المرور بنجاح!');
      Cookies.remove('reset_pass_email')
      Cookies.remove('verifyCode')
       router.push ('/login')
      setFormData({ password: '', confirmPassword: '' });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className=" min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 px-2 sm:px-4 py-6 sm:py-10">
    <SmartNavbar />

    <div className="flex justify-center mt-10 md:mt-5  my-auto ">
      <Container>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-20 w-full max-w-full space-y-6 border border-purple-100 mt-20 mx-auto"
        dir="rtl"
      >
         <div className="flex flex-col items-center space-y-2">
                        <h2 className="text-2xl font-bold text-purple-800 text-center flex items-center gap-1">
                            <Sparkles className="w-5 h-5 text-orange-400 animate-bounce" />
                             إعادة تعيين كلمة المرور
                        </h2>
                    </div>
        <div>
          <label className="block mb-2 font-medium text-black">الرقم السري</label>
          <div className="relative w-full max-w-sm">
      <input
        type={showPassword.pass ? "text" : "password"}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
        placeholder="ادخل كلمة السر"
                    value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
      />
      <button
        type="button"
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-600"
        onClick={() => setShowPassword((prev) => ({...prev,pass:!prev.pass}))}
      >
        {showPassword.pass ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-black">تأكيد كلمة السر</label>
           <div className="relative w-full max-w-sm">
      <input
        type={showPassword.confirmPass ? "text" : "password"}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
 placeholder="ادخل تأكيد كلمة السر"
            value={formData.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
      />
      <button
        type="button"
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-600"
        onClick={() => setShowPassword((prev) => ({...prev,confirmPass:!prev.confirmPass}))}
      >
        {showPassword.confirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
        </div>

        {modal.show && <p className="text-red-600 text-sm">{modal.message}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-700 to-orange-400 text-white py-2 rounded font-bold shadow-lg hover:scale-[1.02] transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'جاري التأكيد...' : 'تأكيد'}
        </button>
      </form>
       </Container>
    </div>
     {/* المودال */}
    {modal.show && (
      <ErrorPopUP message={modal.message} setClose={setModal}/>
    )}
    </div>
  );
}
