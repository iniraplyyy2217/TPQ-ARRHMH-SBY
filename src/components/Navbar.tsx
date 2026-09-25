import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Newspaper,
  Menu,
  X,
  Sparkles,
  PartyPopper,
  Home,
} from 'lucide-react';
import { RubElHizbIcon } from './IslamicDecorations';
import { triggerKidsConfetti } from './KidsMascot';

export type NavTab = 'home' | 'materi' | 'bank-soal' | 'berita';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as NavTab, label: 'Beranda Ceria', icon: Home, emoji: '🏠' },
    { id: 'materi' as NavTab, label: 'Materi 4 Buku', icon: BookOpen, emoji: '📖' },
    { id: 'bank-soal' as NavTab, label: 'Kuis & Bank Soal', icon: HelpCircle, emoji: '🎯' },
    { id: 'berita' as NavTab, label: 'Warta & Presensi', icon: Newspaper, emoji: '🌟' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Micro Announcement Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 px-4 py-1.5 text-center text-xs text-white font-medium flex items-center justify-center gap-2">
        <span className="font-arabic text-sm tracking-wide text-amber-200">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        <span className="text-emerald-200/60 hidden sm:inline">·</span>
        <span className="hidden sm:inline text-emerald-50 text-[11px] font-medium tracking-wide">
          TPQ Ramah Anak — Belajar Al-Qur'an Jadi Mudah & Ceria
        </span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Zone 1: Single-element Brand Zone */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
        >
          <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-sm shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-200">
            <RubElHizbIcon size={24} className="text-amber-200" />
            <span className="absolute -top-1 -right-1 text-[10px]">✨</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-emerald-950 font-display">
                TPQ AR-ROHMAH
              </span>
              <span className="hidden lg:inline text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                Sahabat Cilik
              </span>
            </div>
            <p className="text-[11px] font-medium text-emerald-700/90 hidden xs:block">
              Pondok Belajar Santri Sholeh & Qur'ani
            </p>
          </div>
        </button>

        {/* Zone 2: 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50/80 p-1 rounded-2xl border border-slate-200/60">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-white'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Celebrations */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerKidsConfetti}
            className="btn-amber text-xs py-1.5 px-3.5 rounded-xl cursor-pointer"
            title="Taburkan Bintang Ceria!"
          >
            <PartyPopper size={14} className="text-amber-950" />
            <span className="hidden xs:inline">Tabur Bintang 🎉</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-xl p-2 text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
            aria-label="Buka navigasi"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-emerald-100 bg-white/98 px-4 py-3 md:hidden space-y-1.5 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                <span className="text-base">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
