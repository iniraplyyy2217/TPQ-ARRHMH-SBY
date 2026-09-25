import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { MateriPage } from './pages/MateriPage';
import { BankSoalPage } from './pages/BankSoalPage';
import { BeritaPage } from './pages/BeritaPage';
import { RubElHizbIcon, CheerfulStar, SmilingCrescentMoon } from './components/IslamicDecorations';
import { KidsMascot } from './components/KidsMascot';
import { Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  return (
    <div className="min-h-screen bg-kids-tpq text-slate-800 flex flex-col font-sans-clean selection:bg-emerald-100 selection:text-emerald-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'materi' && (
          <MateriPage />
        )}

        {activeTab === 'bank-soal' && (
          <BankSoalPage />
        )}

        {activeTab === 'berita' && (
          <BeritaPage />
        )}
      </main>

      {/* Cheerful Kids Mascot Floating Companion */}
      <KidsMascot />

      {/* Clean, Refined Footer */}
      <footer className="relative border-t border-emerald-100 bg-white text-xs text-slate-600 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: About */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                  <RubElHizbIcon size={20} className="text-amber-200" />
                </div>
                <div>
                  <span className="text-base font-bold text-slate-900 font-display">
                    TPQ AR-ROHMAH
                  </span>
                  <p className="text-[11px] font-semibold text-emerald-700">Taman Pendidikan Al-Qur'an Sahabat Anak</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-normal">
                Mendidik anak-anak tercinta dengan penuh kasih sayang, membimbing tajwid praktis, pemahaman Dinul Islam, hafalan Juz 30, serta doa sehari-hari dalam suasana ceria dan berkah.
              </p>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-medium text-emerald-900 flex items-start gap-2">
                <span className="text-sm mt-0.5">📖</span>
                <span>"Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya." (HR. Bukhari)</span>
              </div>
            </div>

            {/* Col 2: Nav Quick Links */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Menu Utama
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveTab('home')} className="hover:text-emerald-700 hover:underline font-medium flex items-center gap-2 text-left cursor-pointer">
                    <span>🏠</span> Beranda Ceria
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('materi')} className="hover:text-emerald-700 hover:underline font-medium flex items-center gap-2 text-left cursor-pointer">
                    <span>📚</span> Materi 4 Buku Pelajaran
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('bank-soal')} className="hover:text-emerald-700 hover:underline font-medium flex items-center gap-2 text-left cursor-pointer">
                    <span>🎯</span> Kuis & Bank Soal Bintang
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('berita')} className="hover:text-emerald-700 hover:underline font-medium flex items-center gap-2 text-left cursor-pointer">
                    <span>🌟</span> Warta & Presensi Santri
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Sekretariat TPQ
              </h4>
              <div className="space-y-2.5 text-slate-600 font-normal">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Kompleks Masjid Jami' Ar-Rohmah, Jl. Pesantren No. 45</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={15} className="text-emerald-600 shrink-0" />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-emerald-600 shrink-0" />
                  <span>info@tpq-arrohmah.sch.id</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-emerald-600 shrink-0" />
                  <span>Sesi Sore: 15.30 - 17.30 WIB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
            <div>
              © 2026 TPQ AR-ROHMAH · Pembelajaran Al-Qur'an Ramah Santri Cilik
            </div>
            <div className="flex items-center gap-1.5">
              <span>Dibuat dengan cinta untuk generasi Qur'ani</span>
              <Heart size={13} className="text-rose-500 fill-rose-500" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
