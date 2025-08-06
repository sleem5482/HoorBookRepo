import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomeSkeleton = () => {
  return (
    <div className="relative bg-white">

      {/* خلفية SVG زي اللي فوق */}
      <div className="absolute inset-x-0 top-[20px] h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] z-0 pointer-events-none overflow-hidden w-full aspect-[1440/220] sm:aspect-[1440/300] lg:aspect-[1440/400] ">
        <svg viewBox="0 0 1440 220" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f0f0f0" />
              <stop offset="100%" stopColor="#f0f0f0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient)"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* سلايدر رئيسي */}
      <div className="max-w-screen-xl mx-auto px-5 mt-[140px]">
        <Skeleton height={300} className="rounded-xl" />
      </div>

      {/* كاتيجوريز دايرية */}
      <div className="flex overflow-x-auto px-6 py-6 gap-4 scrollbar-hide justify-center">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton circle width={80} height={80} />
            <Skeleton width={60} height={14} />
          </div>
        ))}
      </div>

      {/* أكثر مبيعًا */}
      <SectionSkeleton title="الأكثر مبيعاً" count={4} />

      {/* عروض مميزة */}
      <SectionSkeleton title="عروض مميزة" count={4} />

      {/* كاتيجوريز بـ منتجات */}
      {[...Array(3)].map((_, i) => (
        <SectionSkeleton key={i} title={`قسم رقم ${i + 1}`} count={4} />
      ))}
    </div>
  );
};

export default HomeSkeleton;

// كومبوننت فرعي لأقسام السلايدر
const SectionSkeleton = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="w-full bg-white mt-6 relative shadow-sm rounded-xl px-6">
      {/* العنوان */}
      <div className="flex justify-center items-center text-2xl mb-4">
        <h2 className="text-btn-color font-bold text-[26px] sm:text-[30px] tracking-tight">
          <Skeleton width={160} height={32} />
        </h2>
      </div>

      {/* المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton height={200} className="rounded-xl" />
            <Skeleton width="80%" height={20} />
            <Skeleton width="60%" height={20} />
          </div>
        ))}
      </div>
    </div>
  );
};
