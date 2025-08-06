const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-white/80 z-50">
      {/* Spinner */}
      <div className="loader-spinner" />

      {/* "Loading" with animated dots */}
      <div className="text-blue-700 font-mono text-2xl font-bold">
      جاري التحميل<span className="loading-dots" />
      </div>
    </div>
  );
};

export default Loading;
