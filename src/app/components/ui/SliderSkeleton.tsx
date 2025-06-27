// components/shared/HomeSkeleton.tsx
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SliderSkeleton = () => {
  return (
    <div className="p-4 space-y-6 animate-pulse flex flex-col items-center">

      <Skeleton height={30} width={150} />

      {/* سكليتون كروت */}
      <div className="flex gap-4 flex-wrap justify-center w-full max-w-screen-xl">
        {[...Array(12)].map((_, i) => (
          <Skeleton
            key={i}
            height={200}
            width="100%"
            style={{
              maxWidth: '250px',
              borderRadius: '16px',
              flex: '1 1 calc(50% - 1rem)',
            }}
          />
        ))}
      </div>

      <Skeleton height={180} width="100%" className="max-w-screen-md rounded-xl" />

      {/* سكليتون دائري */}
      <div className="flex space-x-4 rtl:space-x-reverse overflow-x-auto w-full justify-center px-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} circle height={80} width={80} />
        ))}
      </div>

      <Skeleton height={30} width={150} />

      {/* سكليتون إضافي */}
      <div className="flex gap-4 flex-wrap justify-center w-full max-w-screen-lg">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            height={200}
            width="100%"
            style={{
              maxWidth: '250px',
              borderRadius: '16px',
              flex: '1 1 calc(50% - 1rem)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderSkeleton;
