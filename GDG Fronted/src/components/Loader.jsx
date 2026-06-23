import React from 'react';

const Loader = () => {
  return (
    <div id="pageLoader" className="page-loader fixed inset-0 flex justify-center items-center bg-radial from-gray-900/96 to-slate-950/98 text-white z-[9999] opacity-1 visible" aria-hidden="true">
      <div className="text-center grid place-items-center gap-4.5">
        <div className="relative w-[92px] h-[92px] rounded-full border-[10px] border-white/14 border-t-goog-blue animate-spin shadow-[0_0_28px_rgba(66,133,244,0.24)]">
          <span className="absolute inset-0 grid place-items-center">
            <img src="/asset/GDGlogo.jpeg" alt="GDG Logo" className="w-[42px] h-[42px] object-contain rounded-lg" />
          </span>
        </div>
        <p className="m-0 text-[#d7e3ff] text-[0.95rem] tracking-wider">Loading GDG content…</p>
      </div>
    </div>
  );
};

export default Loader;
