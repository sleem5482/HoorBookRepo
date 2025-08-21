"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TermsAndConditions() {
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

    // تحديد جميع الجمل (span)
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
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sentence,
            start: "top 85%", // يبدأ أول ما الجملة تدخل الشاشة
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
          duration: 0.7,
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <Head>
        <title>شروط وأحكام تطبيق حور بوك</title>
        <meta name="description" content="شروط وأحكام استخدام تطبيق حور بوك" />
      </Head>

      <div
        className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
        ref={containerRef}
      >
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
           
            <div className="text-center mb-10" ref={titleRef}>
              <h1 className="text-4xl font-bold text-indigo-800 mb-4">
                شروط وأحكام استخدام تطبيق حور بوك
              </h1>
              <p className="text-lg text-gray-600 underline">
                آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
              </p>
            </div>

           
            <div className="prose prose-lg max-w-none" ref={contentRef}>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  تحكم هذه الشروط والأحكام استخدامك لتطبيق حور بوك وتحدد الحقوق
                  والالتزامات بينك (المستخدم) وصاحب التطبيق.
                </span>
                <span className="sentence block mb-2">
                  من خلال الوصول إلى التطبيق أو استخدامه، فإنك توافق على
                  الامتثال لهذه الشروط والأحكام.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                1. قبول الشروط
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  <strong>1.1.</strong> بتنزيل أو تثبيت أو استخدام تطبيق حور بوك،
                  فإنك توافق على الالتزام بهذه الشروط والأحكام.
                </span>
                <span className="sentence block mb-2">
                  <strong>1.2.</strong> إذا لم توافق على أي جزء من هذه الشروط
                  والأحكام، فيجب عليك عدم استخدام تطبيق حور بوك.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                2. حساب المستخدم
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  <strong>2.1.</strong> لاستخدام بعض ميزات تطبيق حور بوك، قد يُطلب
                  منك إنشاء حساب مستخدم.
                </span>
                <span className="sentence block mb-2">
                  <strong>2.2.</strong> أنت مسؤول عن الحفاظ على سرية معلومات
                  حسابك وضمان أمانه.
                </span>
                <span className="sentence block mb-2">
                  <strong>2.3.</strong> يجب عليك تقديم معلومات دقيقة وحديثة عند
                  إنشاء حسابك.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                3. استخدام التطبيق
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  <strong>3.1.</strong> توافق على استخدام تطبيق حور بوك لأغراض
                  قانونية فقط وتطبيق جميع القوانين واللوائح المعمول بها.
                </span>
                <span className="sentence block mb-2">
                  <strong>3.2.</strong> يجب عليك عدم القيام بأي أنشطة قد تضر أو
                  تعطل وظيفة تطبيق حور بوك أو المستخدمين الآخرين.
                </span>
                <span className="sentence block mb-2">
                  <strong>3.3.</strong> أنت مسؤول بشكل كامل عن أي محتوى تنشره أو
                  تشاركه أو تنقله عبر تطبيق حور بوك.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                4. الملكية الفكرية
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  <strong>4.1.</strong> تطبيق حور بوك، بما في ذلك تصميمه ورسوماته
                  وشعاراته ومحتواه، هي ملكية فكرية لصاحب التطبيق ومحمية بقوانين
                  حقوق النشر.
                </span>
                <span className="sentence block mb-2">
                  <strong>4.2.</strong> لا يجوز لك نسخ أو تعديل أو توزيع أو
                  استنساخ أي جزء من التطبيق دون إذن صريح من المالك.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                5. الخصوصية
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  <strong>5.1.</strong> نحن نهتم بخصوصيتك. جمع واستخدام المعلومات
                  الشخصية يخضع لسياسة الخصوصية الخاصة بنا، والتي تُدرج ضمن هذه
                  الشروط والأحكام.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                6. تحمل المسؤولية المحدودة
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  <strong>6.1.</strong> تطبيق حور بوك يُقدم "كما هو" و"حسب
                  التوفر" دون أي ضمانات أو ضمانات من أي نوع.
                </span>
                <span className="sentence block mb-2">
                  <strong>6.2.</strong> صاحب التطبيق غير مسؤول عن أي أضرار مباشرة
                  أو غير مباشرة أو عرضية أو تبعية أو عقابية تنشأ عن استخدام تطبيق
                  حور بوك أو تتعلق به.
                </span>
              </p>

              <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4 border-r-4 border-indigo-500 pr-3">
                7. تعديلات على الشروط والأحكام
              </h2>
              <p className="text-gray-700 mb-6">
                <span className="sentence block mb-2">
                  <strong>7.1.</strong> يحتفظ صاحب التطبيق بحق تعديل أو تحديث هذه
                  الشروط والأحكام في أي وقت دون إشعار مسبق.
                </span>
                <span className="sentence block mb-2">
                  <strong>7.2.</strong> تتحمل مسؤولية مراجعة هذه الشروط والأحكام
                  بشكل دوري للتعرف على أي تغييرات.
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
