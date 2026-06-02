export default function SplashScreen({ isLeaving }: { isLeaving: boolean }) {
  return (
    <div
      className={`absolute inset-0 z-[100] bg-white transition-all duration-500 ease-out ${
        isLeaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={isLeaving}
    >
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-8">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] bg-blue-600 shadow-2xl shadow-blue-200">
            <span className="text-5xl font-black italic leading-none text-white">M</span>
          </div>
          <p className="text-xl font-black tracking-tight text-gray-950">MARKET</p>
          <div className="mt-8 h-1.5 w-36 overflow-hidden rounded-full bg-blue-50">
            <div className="h-full w-1/2 animate-loading-bar rounded-full bg-blue-600" />
          </div>
        </div>

        <div className="px-5 pb-10">
          <div className="mb-4 h-32 animate-pulse rounded-[28px] bg-gray-100" />
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map((item) => (
              <div key={item} className="overflow-hidden rounded-[24px] border border-gray-100 bg-white">
                <div className="aspect-square animate-pulse bg-gray-100" />
                <div className="space-y-2 p-3">
                  <div className="h-3 w-16 animate-pulse rounded-full bg-blue-100" />
                  <div className="h-3 w-full animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3 w-2/3 animate-pulse rounded-full bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
