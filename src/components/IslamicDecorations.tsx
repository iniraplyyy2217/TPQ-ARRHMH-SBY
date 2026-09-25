import React from 'react';

export const RubElHizbIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-emerald-600',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 8-pointed Islamic Star (Rub el Hizb) */}
    <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
      transform="rotate(45 12 12)"
    />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);

export const CheerfulStar: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-amber-400',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`animate-twinkle ${className}`}
  >
    <path d="M12 2l2.8 6.2 6.7.6-5 4.5 1.5 6.6L12 16.6l-6 3.3 1.5-6.6-5-4.5 6.7-.6L12 2z" />
  </svg>
);

export const SmilingCrescentMoon: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-amber-400',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M26 17.5C25.4 22.8 20.8 27 15.2 27C9.6 27 5 22.4 5 16.8C5 11.2 9.2 6.6 14.5 6C13.2 8.2 12.5 10.8 12.5 13.5C12.5 20.4 18.1 26 25 26C25.3 26 25.7 26 26 17.5Z"
      fill="#FBBF24"
    />
    {/* Cute smiling eye and cheek */}
    <circle cx="13" cy="14" r="1.2" fill="#78350F" />
    <path
      d="M11 17.5C12 18.8 14 18.8 15 17.5"
      stroke="#78350F"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="10" cy="16.5" r="1" fill="#F87171" opacity="0.6" />
  </svg>
);

export const CuteCloud: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-sky-200',
  size = 40,
}) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 64 38"
    fill="currentColor"
    className={className}
  >
    <path d="M16 34h34a12 12 0 003.5-23.5 15.5 15.5 0 00-29.5-2 11 11 0 00-8 25.5z" />
  </svg>
);

export const IslamicArchFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`relative border-2 border-emerald-200 bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className}`}
  >
    {/* Decorative corner stars */}
    <div className="absolute top-3 left-3 text-amber-400 opacity-60">
      <CheerfulStar size={18} />
    </div>
    <div className="absolute top-3 right-3 text-emerald-400 opacity-60">
      <RubElHizbIcon size={18} />
    </div>
    <div className="absolute bottom-3 left-3 text-emerald-400 opacity-60">
      <RubElHizbIcon size={18} />
    </div>
    <div className="absolute bottom-3 right-3 text-amber-400 opacity-60">
      <CheerfulStar size={18} />
    </div>
    {children}
  </div>
);

export const IslamicDivider: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex items-center justify-center my-6 gap-3 text-emerald-600">
    <div className="h-[2px] w-14 bg-gradient-to-r from-transparent via-amber-300 to-emerald-400 rounded-full" />
    <span className="text-amber-400 animate-wiggle">⭐</span>
    <RubElHizbIcon size={20} className="text-emerald-600" />
    {label && (
      <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
        {label}
      </span>
    )}
    {label && <RubElHizbIcon size={20} className="text-emerald-600" />}
    <span className="text-amber-400 animate-wiggle">⭐</span>
    <div className="h-[2px] w-14 bg-gradient-to-l from-transparent via-amber-300 to-emerald-400 rounded-full" />
  </div>
);
