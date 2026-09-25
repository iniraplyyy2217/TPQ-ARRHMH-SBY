import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  HelpCircle,
  Newspaper,
  CheckCircle2,
  Clock,
  Heart,
  Award,
  ArrowRight,
  ShieldCheck,
  Send,
  Users,
  Star,
  Volume2,
  PartyPopper,
  Sun,
  Moon,
} from 'lucide-react';
import {
  RubElHizbIcon,
  CheerfulStar,
  SmilingCrescentMoon,
  CuteCloud,
} from '../components/IslamicDecorations';
import { NavTab } from '../components/Navbar';
import { triggerKidsConfetti } from '../components/KidsMascot';
import { INITIAL_STUDENTS_LIST } from '../data/presensiIjazahData';

interface HomePageProps {
  setActiveTab: (tab: NavTab) => void;
}

// Fun Hijaiyah sample for interactive kids soundboard
const HIJAIYAH_LETTERS = [
  { char: 'ا', name: 'Alif', sound: 'Alif', bg: 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-200' },
  { char: 'ب', name: 'Ba', sound: 'Baa', bg: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-200' },
  { char: 'ت', name: 'Ta', sound: 'Taa', bg: 'bg-sky-50 hover:bg-sky-100 text-sky-950 border-sky-200' },
  { char: 'ث', name: 'Tsa', sound: 'Tsaa', bg: 'bg-rose-50 hover:bg-rose-100 text-rose-950 border-rose-200' },
  { char: 'ج', name: 'Jim', sound: 'Jeem', bg: 'bg-purple-50 hover:bg-purple-100 text-purple-950 border-purple-200' },
  { char: 'ح', name: 'Ha', sound: 'Haa', bg: 'bg-lime-50 hover:bg-lime-100 text-lime-950 border-lime-200' },
  { char: 'خ', name: 'Kha', sound: 'Khaa', bg: 'bg-orange-50 hover:bg-orange-100 text-orange-950 border-orange-200' },
  { char: 'د', name: 'Dal', sound: 'Daal', bg: 'bg-teal-50 hover:bg-teal-100 text-teal-950 border-teal-200' },
];

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  // Dynamic real count of registered santri from website database
  const [studentCount, setStudentCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tpq_master_students_polos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.length;
      }
    } catch {}
    return INITIAL_STUDENTS_LIST.length;
  });

  useEffect(() => {
    const updateCount = () => {
      try {
        const saved = localStorage.getItem('tpq_master_students_polos');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setStudentCount(parsed.length);
            return;
          }
        }
      } catch {}
      setStudentCount(INITIAL_STUDENTS_LIST.length);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    const interval = setInterval(updateCount, 1500);
    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, []);

  // Daily deeds checklist for kids gamification
  const [deeds, setDeeds] = useState<{ [key: string]: boolean }>({
    salim: false,
    bismillah: false,
    baca: false,
  });

  const toggleDeed = (key: string) => {
    const updated = { ...deeds, [key]: !deeds[key] };
    setDeeds(updated);
    if (!deeds[key] && Object.values(updated).filter(Boolean).length === 3) {
      triggerKidsConfetti();
    }
  };

  const playLetterSound = (letter: { char: string; name: string; sound: string }) => {
    setActiveLetter(letter.name);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(letter.char);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setActiveLetter(null), 1200);
  };

  const completedDeedsCount = Object.values(deeds).filter(Boolean).length;

  return (
    <div className="space-y-16 pb-20 overflow-hidden">
      {/* Hero Section with Warm Atmosphere */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-teal-50/40 to-transparent py-14 sm:py-20 border-b border-emerald-100">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-8 left-8 text-emerald-200/50 animate-float pointer-events-none">
          <CuteCloud size={70} />
        </div>
        <div className="absolute top-12 right-12 text-teal-200/50 animate-float-reverse pointer-events-none">
          <CuteCloud size={85} />
        </div>
        <div className="absolute top-16 left-1/4 text-amber-300 opacity-70 animate-twinkle pointer-events-none">
          <CheerfulStar size={30} />
        </div>
        <div className="absolute top-10 right-1/4 text-amber-300 opacity-70 animate-twinkle pointer-events-none">
          <SmilingCrescentMoon size={36} />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center relative z-10">
          {/* Greeting Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-1.5 shadow-2xs mb-6 animate-bounce-fun">
            <span className="text-sm">🎈</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-800">
              Assalamu'alaikum Sahabat Santri Cilik!
            </span>
            <span className="text-sm">🌸</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] max-w-3xl mx-auto font-display">
            Belajar Al-Qur'an Jadi{' '}
            <span className="relative inline-block text-emerald-700 underline decoration-wavy decoration-amber-400 decoration-3">
              Seru & Ceria
              <span className="absolute -top-3 -right-6 text-2xl animate-spin-slow">✨</span>
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Taman Pendidikan Al-Qur'an ramah anak dengan 4 pilar kurikulum bergambar, kuis bintang berhadiah kebaikan, latihan makharijul huruf interaktif, serta rekap presensi instan ke WhatsApp orang tua.
          </p>

          {/* Unified Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => setActiveTab('materi')}
              className="btn-primary text-sm sm:text-base py-3 px-6 rounded-2xl"
            >
              <BookOpen size={18} className="text-amber-300" />
              <span>Buka Materi 4 Buku</span>
            </button>

            <button
              onClick={() => setActiveTab('bank-soal')}
              className="btn-amber text-sm sm:text-base py-3 px-6 rounded-2xl"
            >
              <HelpCircle size={18} className="text-amber-950" />
              <span>Main Kuis Bintang</span>
            </button>

            <button
              onClick={() => setActiveTab('berita')}
              className="btn-secondary text-sm sm:text-base py-3 px-5 rounded-2xl"
            >
              <Send size={16} className="text-emerald-700" />
              <span>Warta & Presensi</span>
            </button>
          </div>

          {/* Stat quick numbers: Single-Elevation Cards */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-emerald-100">
            <div
              onClick={() => setActiveTab('berita')}
              className="rounded-2xl bg-white border border-emerald-100 p-4 shadow-xs hover:border-emerald-300 hover:-translate-y-0.5 transition-all cursor-pointer group"
              title="Klik untuk melihat daftar santri"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 group-hover:text-emerald-800 transition-colors font-mono tabular-nums">
                {studentCount}
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1 flex items-center justify-center gap-1">
                <span>🌟</span> Santri Terdaftar
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-amber-100 p-4 shadow-xs hover:border-amber-300 hover:-translate-y-0.5 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono tabular-nums">
                4 Pilar
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1 flex items-center justify-center gap-1">
                <span>📚</span> Kurikulum Utama
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-sky-100 p-4 shadow-xs hover:border-sky-300 hover:-translate-y-0.5 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 font-mono tabular-nums">
                WhatsApp
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1 flex items-center justify-center gap-1">
                <span>📲</span> Kabar Presensi
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-rose-100 p-4 shadow-xs hover:border-rose-300 hover:-translate-y-0.5 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono tabular-nums">
                100%
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1 flex items-center justify-center gap-1">
                <span>❤️</span> Cinta Al-Qur'an
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Hijaiyah Sound & Play Pad */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-yellow-50/40 to-emerald-50/50 p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                <span>🎵</span>
                <span>Pojok Suara Huruf Hijaiyah</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Sentuh & Dengarkan Bunyi Huruf!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                Klik huruf hijaiyah untuk mendengar pelafalan makhraj yang fasih dan benar.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200/60 shadow-2xs">
              <span className="text-xs font-medium text-slate-600">Audio Suara:</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Volume2 size={15} />
              </span>
            </div>
          </div>

          {/* Letter grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {HIJAIYAH_LETTERS.map((letter) => {
              const isSelected = activeLetter === letter.name;
              return (
                <button
                  key={letter.name}
                  onClick={() => playLetterSound(letter)}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl ${letter.bg} p-3.5 sm:p-4 border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'ring-3 ring-amber-400 scale-105 -translate-y-1 shadow-sm'
                      : 'hover:scale-105 active:scale-95 shadow-2xs'
                  }`}
                  title={`Klik untuk mendengar huruf ${letter.name}`}
                >
                  <span className="font-arabic text-3xl sm:text-4xl leading-none font-bold mb-1 group-hover:scale-110 transition-transform">
                    {letter.char}
                  </span>
                  <span className="text-[11px] font-bold tracking-wide uppercase opacity-85">
                    {letter.name}
                  </span>
                  {isSelected && (
                    <span className="absolute -top-1.5 -right-1.5 text-xs animate-bounce-fun">
                      ⭐
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 text-center">
            <span className="inline-block text-xs text-slate-600 bg-white/90 border border-slate-200/80 rounded-full px-4 py-1.5 shadow-2xs font-medium">
              💡 Tips: Ucapkan huruf dengan tartil dan tersenyum ya adik-adik santri!
            </span>
          </div>
        </div>
      </section>

      {/* Misi Bintang Kebaikan Hari Ini (Interactive Kids Quest) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 font-bold text-lg">
                ⭐
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Misi Bintang Kebaikan Hari Ini
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Selesaikan 3 kebiasaan baik untuk mengumpulkan bintang harian santri!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">
                Bintang Terkumpul:
              </span>
              <div className="flex gap-1">
                {[1, 2, 3].map((star) => (
                  <span
                    key={star}
                    className={`text-xl transition-all ${
                      star <= completedDeedsCount ? 'scale-110 text-amber-400' : 'text-slate-200'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Checklist items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => toggleDeed('salim')}
              className={`flex items-center gap-3 rounded-2xl p-4 text-left border transition-all duration-150 cursor-pointer ${
                deeds.salim
                  ? 'border-emerald-300 bg-emerald-50/70 shadow-2xs'
                  : 'border-slate-200 hover:border-emerald-200 bg-slate-50/50'
              }`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold ${
                  deeds.salim ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                {deeds.salim ? '✓' : '1'}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Salim Ayah & Ibu 😊
                </span>
                <span className="text-[11px] text-slate-500">
                  Mencium tangan & doa
                </span>
              </div>
            </button>

            <button
              onClick={() => toggleDeed('bismillah')}
              className={`flex items-center gap-3 rounded-2xl p-4 text-left border transition-all duration-150 cursor-pointer ${
                deeds.bismillah
                  ? 'border-emerald-300 bg-emerald-50/70 shadow-2xs'
                  : 'border-slate-200 hover:border-emerald-200 bg-slate-50/50'
              }`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold ${
                  deeds.bismillah ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                {deeds.bismillah ? '✓' : '2'}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Ucap Bismillah & Senyum 🌸
                </span>
                <span className="text-[11px] text-slate-500">
                  Sebelum belajar & makan
                </span>
              </div>
            </button>

            <button
              onClick={() => toggleDeed('baca')}
              className={`flex items-center gap-3 rounded-2xl p-4 text-left border transition-all duration-150 cursor-pointer ${
                deeds.baca
                  ? 'border-emerald-300 bg-emerald-50/70 shadow-2xs'
                  : 'border-slate-200 hover:border-emerald-200 bg-slate-50/50'
              }`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold ${
                  deeds.baca ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                {deeds.baca ? '✓' : '3'}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Mengaji 1 Halaman 📖
                </span>
                <span className="text-[11px] text-slate-500">
                  Iqra atau surah pendek
                </span>
              </div>
            </button>
          </div>

          {completedDeedsCount === 3 && (
            <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900 animate-in fade-in">
              <span className="flex items-center gap-2">
                <span>🏆</span>
                <span>MasyaAllah! Semua misi kebaikan hari ini tuntas! Kamu santri teladan!</span>
              </span>
              <button
                onClick={triggerKidsConfetti}
                className="btn-amber text-xs py-1 px-3 rounded-lg"
              >
                Rayakan! 🎉
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4 Pilar Kurikulum Buku */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-emerald-800 mb-2">
            <span>Kurikulum Utama · 4 Pilar Pendidikan TPQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Materi Pembelajaran Terpadu
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal">
            Buku panduan lengkap bergambar yang membuat belajar Al-Qur'an dan ibadah jadi mudah dipahami santri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Mudah Tajwid */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 mb-4 group-hover:scale-105 transition-transform">
                <BookOpen size={24} />
              </div>
              <div className="text-xs text-slate-500 font-medium mb-1">
                <span>Pilar 1</span>
                <span className="mx-1.5">·</span>
                <span>Dr. Zulkarnain</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">Mudah Tajwid</h3>
              <p className="mt-2 text-xs text-slate-600 font-normal leading-relaxed">
                Makharijul huruf interaktif, hukum nun mati & tanwin, mim mati, qalqalah memantul, dan kaidah mad praktis.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('materi')}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
              >
                <span>Pelajari Tajwid</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Card 2: Dinul Islam */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div className="text-xs text-slate-500 font-medium mb-1">
                <span>Pilar 2</span>
                <span className="mx-1.5">·</span>
                <span>UIN Suska</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">Dinul Islam</h3>
              <p className="mt-2 text-xs text-slate-600 font-normal leading-relaxed">
                Rukun Iman, Rukun Islam, akhlak terpuji terhadap orang tua dan teman, serta adab santri sholeh.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('materi')}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-sky-800 hover:bg-sky-600 hover:text-white transition-all cursor-pointer"
              >
                <span>Pelajari Dinul Islam</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Card 3: Praktik Sholat */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-amber-300 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 mb-4 group-hover:scale-105 transition-transform">
                <Clock size={24} />
              </div>
              <div className="text-xs text-slate-500 font-medium mb-1">
                <span>Pilar 3</span>
                <span className="mx-1.5">·</span>
                <span>Wudhu & Sholat</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">Praktik Sholat</h3>
              <p className="mt-2 text-xs text-slate-600 font-normal leading-relaxed">
                Urutan wudhu segar, niat sholat 5 waktu, rukun bacaan takbir, sujud tumakninah hingga salam doa.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('materi')}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-amber-800 hover:bg-amber-500 hover:text-amber-950 transition-all cursor-pointer"
              >
                <span>Panduan Sholat</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Card 4: Hafalan Doa & Juz 30 */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-rose-300 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 mb-4 group-hover:scale-105 transition-transform">
                <Star size={24} />
              </div>
              <div className="text-xs text-slate-500 font-medium mb-1">
                <span>Pilar 4</span>
                <span className="mx-1.5">·</span>
                <span>Metode 3T</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">Hafalan Juz 'Amma</h3>
              <p className="mt-2 text-xs text-slate-600 font-normal leading-relaxed">
                Doa sehari-hari, surat pendek Juz 30 berharakat, audio murottal 5 Qori, dan uji tikrar seru.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('materi')}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-rose-800 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
              >
                <span>Buka Hafalan</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi TPQ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-8 sm:p-12 shadow-xs">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
              Pedoman Pembinaan Santri
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Mendidik dengan Cinta, Membimbing dengan Senyuman
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              TPQ AR-ROHMAH berkomitmen menumbuhkan akhlakul karimah dan kecintaan pada kalam ilahi sejak dini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visi Card */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center gap-3 text-emerald-700 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                    <RubElHizbIcon size={20} className="text-amber-200" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display">Visi TPQ AR-ROHMAH</h3>
                    <p className="text-xs text-slate-500 font-normal">Cita-cita generasi Qur'ani</p>
                  </div>
                </div>
                <blockquote className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed italic border-l-3 border-amber-400 pl-4 py-2 bg-amber-50/40 rounded-r-xl">
                  "Terwujudnya generasi santri Qur'ani yang ceria, berakhlak mulia, fasih melafalkan kalam Allah sesuai kaidah tajwid, istiqamah sholat fardhu, dan berbakti kepada orang tua."
                </blockquote>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <Heart size={15} className="text-rose-500 fill-rose-500" />
                <span>Pendidikan ramah anak berlandaskan Al-Qur'an dan Sunnah</span>
              </div>
            </div>

            {/* Misi Card */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-3 text-emerald-700 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-amber-950 shadow-xs font-bold">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">4 Misi Pembelajaran</h3>
                  <p className="text-xs text-slate-500 font-normal">Langkah bimbingan bertahap</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Tajwid Asyik & Mudah:</strong> Bimbingan makhraj huruf dengan metode visual dan audio yang mudah ditirukan anak.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Praktek Sholat Ceria:</strong> Bimbingan wudhu berurutan dan sholat berjamaah tumakninah di masjid.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Hafalan Juz 30 Bintang:</strong> Muroja'ah ayat hafalan bersama asatidz dengan metode 3T yang terstruktur.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Presensi WhatsApp Real-Time:</strong> Notifikasi kehadiran anak langsung ke ponsel orang tua setiap pertemuan.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Jadwal Kegiatan Pembelajaran */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Waktu Mengaji
              </span>
              <h3 className="mt-1 text-2xl font-bold text-slate-900 font-display">
                Jadwal Kelas Santri
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Sesi sore dan malam dengan bimbingan asatidz yang sabar dan ramah.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('berita')}
              className="btn-primary text-xs py-2 px-4 rounded-xl self-start md:self-auto"
            >
              <Send size={14} />
              <span>Buka Presensi Real-Time</span>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sesi Sore */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Sun size={15} className="text-amber-600" />
                  <span>SESI SORE (ASHAR)</span>
                </span>
                <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-amber-200/80 font-mono tabular-nums">
                  15:30 - 17:15 WIB
                </span>
              </div>
              <h4 className="mt-3 text-base font-bold text-slate-900 font-display">
                Halaqah Iqra & Tahsin Tajwid
              </h4>
              <p className="mt-2 text-xs text-slate-600 font-normal leading-relaxed">
                Mengenal huruf hijaiyah, menyambung huruf bergambar, dan mempraktikkan hukum tajwid mudah dipandu asatidz.
              </p>
            </div>

            {/* Sesi Malam */}
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <Moon size={15} className="text-indigo-600" />
                  <span>SESI MALAM (MAGHRIB)</span>
                </span>
                <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-indigo-200/80 font-mono tabular-nums">
                  18:00 - 19:45 WIB
                </span>
              </div>
              <h4 className="mt-3 text-base font-bold text-slate-900 font-display">
                Sholat Berjamaah & Tahfidz Juz 30
              </h4>
              <p className="mt-2 text-xs text-slate-600 font-normal leading-relaxed">
                Praktik sholat berjamaah di masjid, muroja'ah hafalan surah pendek, kisah sahabat nabi, dan doa harian.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
