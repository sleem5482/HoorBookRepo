"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PrivacyPolicy() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!titleRef.current || !contentRef.current) return;

    // Animation لعنوان الصفحة
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animation للجمل
    const sentences = contentRef.current.querySelectorAll<HTMLSpanElement>(
      "span.sentence"
    );
    sentences.forEach((sentence) => {
      gsap.fromTo(
        sentence,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sentence,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animation للعناوين
    const headings = contentRef.current.querySelectorAll<HTMLHeadingElement>(
      "h2"
    );
    headings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <Head>
        <title>سياسة الخصوصية - تطبيق حور بوك</title>
        <meta name="description" content="سياسة الخصوصية لتطبيق حور بوك" />
      </Head>

      <div
        className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
        ref={containerRef}
      >
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
         
            <div className="text-center mb-10" ref={titleRef}>
              <h1 className="text-4xl font-bold text-indigo-800 mb-4">
                سياسة الخصوصية لتطبيق حور بوك
              </h1>
              <p className="text-lg text-gray-600 underline">
                آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
              </p>
            </div>

         
            <div className="prose prose-lg max-w-none" ref={contentRef}>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  نحن في تطبيق حور بوك نحرص على خصوصية المستخدمين وحماية بياناتهم
                  الشخصية. يُرجى قراءة سياسة الخصوصية هذه لفهم كيفية جمع واستخدام
                  وحماية المعلومات التي تُقدّم لنا عند استخدام التطبيق.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                1. جمع المعلومات الشخصية
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  نحن قد نقوم بجمع بعض المعلومات الشخصية التي تُقدّمها طواعية عند
                  التسجيل في التطبيق أو أثناء استخدامه. يشمل ذلك اسم المستخدم،
                  عنوان البريد الإلكتروني، ومعلومات الاتصال الأخرى التي تُقدّمها.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                2. استخدام المعلومات
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  نحن نستخدم المعلومات التي تم جمعها لتوفير وتحسين خدماتنا في
                  تطبيق حور بوك. يمكن استخدام المعلومات لتخصيص تجربة المستخدم،
                  معالجة الطلبات، تقديم المنتجات والخدمات المطلوبة، التواصل مع
                  المستخدمين، وتحسين الأداء والأمان للتطبيق.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                3. مشاركة المعلومات
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  نحن لا نقوم ببيع أو تأجير أو مشاركة المعلومات الشخصية للمستخدمين
                  مع أطراف ثالثة بطرق غير مذكورة في سياسة الخصوصية هذه، إلا إذا
                  كانت هناك موافقة صريحة من المستخدم.
                </span>
              </p>
            </div>

           
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                © {new Date().getFullYear()} تطبيق حور بوك. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
