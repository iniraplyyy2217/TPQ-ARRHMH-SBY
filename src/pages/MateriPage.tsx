import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  ExternalLink,
  Volume2,
  VolumeX,
  Search,
  CheckCircle,
  Eye,
  EyeOff,
  ChevronRight,
  Bookmark,
  Share2,
  Clock,
  Award,
  Play,
  Pause,
  RotateCw,
  Sparkles,
  Music,
  Radio,
  Sliders,
} from 'lucide-react';
import { RubElHizbIcon, IslamicDivider, CheerfulStar, SmilingCrescentMoon } from '../components/IslamicDecorations';
import { triggerKidsConfetti } from '../components/KidsMascot';
import { TAJWID_RULES, TAJWID_CATEGORIES, TAJWID_BOOK_URL } from '../data/tajwidData';
import { DINUL_ISLAM_TOPICS, DINUL_ISLAM_BOOK_URL } from '../data/dinulIslamData';
import { SHOLAT_STEPS, WUDHU_STEPS, PRAKTIK_SHOLAT_BOOK_URL } from '../data/praktikSholatData';
import {
  CHILD_PRAYERS,
  JUZ_30_SURAHS,
  MEMORIZATION_METHOD_GUIDE,
  INTERNATIONAL_QARIS,
  QariInfo,
  getAyahAudioUrl,
} from '../data/hafalanData';

interface MateriPageProps {
  onTriggerAiEvaluator?: (practice?: {
    arabic: string;
    latin: string;
    tajwidLaw: string;
    surah: string;
  }) => void;
}

type BookTab = 'tajwid' | 'dinul-islam' | 'sholat' | 'hafalan';

export const MateriPage: React.FC<MateriPageProps> = () => {
  const [activeBook, setActiveBook] = useState<BookTab>('tajwid');

  // Tajwid state
  const [tajwidCategoryFilter, setTajwidCategoryFilter] = useState('all');
  const [tajwidSearch, setTajwidSearch] = useState('');

  // Hafalan state
  const [hafalanSubTab, setHafalanSubTab] = useState<'doa' | 'juz30' | 'sistem'>('doa');
  const [selectedSurahIndex, setSelectedSurahIndex] = useState(0);
  const [clozeHideLevel, setClozeHideLevel] = useState<number>(0); // 0 = all visible, 1 = 33% hidden, 2 = 66% hidden, 3 = 100% hidden
  const [activePlayingVerse, setActivePlayingVerse] = useState<string | null>(null);
  // International Qari Audio player state
  const [selectedQariId, setSelectedQariId] = useState<string>('alafasy');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentlyPlayingAyah, setCurrentlyPlayingAyah] = useState<number | null>(null);
  const [isFullSurahMode, setIsFullSurahMode] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [repeatMode, setRepeatMode] = useState<'1x' | '3x' | 'loop'>('1x');
  const [repeatCount, setRepeatCount] = useState<number>(0);
  const [audioLoading, setAudioLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedQari =
    INTERNATIONAL_QARIS.find((q) => q.id === selectedQariId) || INTERNATIONAL_QARIS[0];

  // Stop currently playing audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setIsPlayingAudio(false);
    setCurrentlyPlayingAyah(null);
    setIsFullSurahMode(false);
    setAudioLoading(false);
    setRepeatCount(0);
  };

  // Play a specific ayah from current surah
  const playAyahAudio = (ayahNum: number, fullSurah = false, currentRepeat = 0) => {
    const curSurah = JUZ_30_SURAHS[selectedSurahIndex];
    if (!curSurah) return;

    // If clicking same ayah while playing and not in full surah progression, toggle pause
    if (currentlyPlayingAyah === ayahNum && isPlayingAudio && !fullSurah) {
      audioRef.current?.pause();
      setIsPlayingAudio(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl = getAyahAudioUrl(curSurah.number, ayahNum, selectedQari.folder);
    const audio = new Audio(audioUrl);
    audio.playbackRate = playbackSpeed;
    audioRef.current = audio;

    setCurrentlyPlayingAyah(ayahNum);
    setIsPlayingAudio(true);
    setIsFullSurahMode(fullSurah);
    setAudioLoading(true);

    audio.oncanplay = () => {
      setAudioLoading(false);
    };

    audio.play().catch(() => {
      setAudioLoading(false);
      setIsPlayingAudio(false);
      setCurrentlyPlayingAyah(null);
    });

    audio.onended = () => {
      // Check repeat mode
      if (repeatMode === 'loop') {
        playAyahAudio(ayahNum, fullSurah, currentRepeat);
        return;
      }

      if (repeatMode === '3x' && currentRepeat < 2) {
        setRepeatCount(currentRepeat + 1);
        playAyahAudio(ayahNum, fullSurah, currentRepeat + 1);
        return;
      }

      setRepeatCount(0);

      // If full surah mode, advance to next ayah
      if (fullSurah) {
        if (ayahNum < curSurah.numberOfAyahs) {
          playAyahAudio(ayahNum + 1, true, 0);
        } else {
          // Finished full surah!
          stopAudio();
          triggerKidsConfetti();
        }
      } else {
        setIsPlayingAudio(false);
        setCurrentlyPlayingAyah(null);
      }
    };

    audio.onerror = () => {
      setAudioLoading(false);
      setIsPlayingAudio(false);
      setCurrentlyPlayingAyah(null);
    };
  };

  // Toggle play/pause for full surah
  const togglePlayFullSurah = () => {
    if (isPlayingAudio && isFullSurahMode) {
      stopAudio();
    } else {
      playAyahAudio(1, true, 0);
    }
  };

  // Change playback speed
  const handleChangeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Cleanup on unmount or surah/qari change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    stopAudio();
  }, [selectedSurahIndex, selectedQariId]);

  // Filter tajwid
  const filteredTajwidRules = TAJWID_RULES.filter((rule) => {
    const matchesCat = tajwidCategoryFilter === 'all' || rule.category === tajwidCategoryFilter;
    const matchesQuery =
      rule.name.toLowerCase().includes(tajwidSearch.toLowerCase()) ||
      rule.description.toLowerCase().includes(tajwidSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // Play audio reference using Web Speech API
  const handlePlayArabicSpeech = (arabicText: string, verseKey: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (activePlayingVerse === verseKey) {
        setActivePlayingVerse(null);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(arabicText);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.onstart = () => setActivePlayingVerse(verseKey);
      utterance.onend = () => setActivePlayingVerse(null);
      utterance.onerror = () => setActivePlayingVerse(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Helper for Cloze test (hiding words for memorization practice)
  const renderClozeArabic = (text: string, level: number) => {
    if (level === 0) return text;
    const words = text.split(' ');
    return words
      .map((word, idx) => {
        if (level === 3) return '______';
        if (level === 2 && idx % 2 === 1) return '______';
        if (level === 1 && idx % 3 === 1) return '______';
        return word;
      })
      .join(' ');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8 font-sans-clean">
      {/* Page Header */}
      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-amber-50/40 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
              <span>📚</span>
              <span>Kurikulum 4 Pilar TPQ AR-ROHMAH</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-display">
              Materi Pembelajaran Lengkap
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-normal max-w-2xl leading-relaxed">
              Petualangan ilmu tajwid praktis, aqidah & akhlak dinul islam, tata cara sholat fardhu tuma'ninah, serta hafalan doa dan juz 30 anak dengan metode seru dan menyenangkan.
            </p>
          </div>

          <a
            href={TAJWID_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2.5 px-4 rounded-xl shrink-0 self-start md:self-auto cursor-pointer"
          >
            <BookOpen size={16} className="text-amber-200" />
            <span>Unduh Buku Tajwid (PDF)</span>
          </a>
        </div>

        {/* 4 Books Dynamic Switcher Tabs */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-emerald-100 relative z-10">
          <button
            onClick={() => setActiveBook('tajwid')}
            className={`flex flex-col items-center justify-center rounded-2xl p-4 text-center transition-all duration-150 cursor-pointer ${
              activeBook === 'tajwid'
                ? 'bg-emerald-600 text-white shadow-sm -translate-y-0.5'
                : 'bg-white border border-slate-200/80 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/50'
            }`}
          >
            <span className="text-2xl mb-1.5">📗</span>
            <span className="text-xs font-bold font-display">1. Mudah Tajwid</span>
            <span className={`text-[10px] mt-0.5 ${activeBook === 'tajwid' ? 'text-emerald-100' : 'text-slate-400'}`}>
              Dr. Zulkarnain Umar
            </span>
          </button>

          <button
            onClick={() => setActiveBook('dinul-islam')}
            className={`flex flex-col items-center justify-center rounded-2xl p-4 text-center transition-all duration-150 cursor-pointer ${
              activeBook === 'dinul-islam'
                ? 'bg-sky-600 text-white shadow-sm -translate-y-0.5'
                : 'bg-white border border-slate-200/80 text-slate-700 hover:border-sky-200 hover:bg-sky-50/50'
            }`}
          >
            <span className="text-2xl mb-1.5">📘</span>
            <span className="text-xs font-bold font-display">2. Dinul Islam</span>
            <span className={`text-[10px] mt-0.5 ${activeBook === 'dinul-islam' ? 'text-sky-100' : 'text-slate-400'}`}>
              UIN Suska Riau
            </span>
          </button>

          <button
            onClick={() => setActiveBook('sholat')}
            className={`flex flex-col items-center justify-center rounded-2xl p-4 text-center transition-all duration-150 cursor-pointer ${
              activeBook === 'sholat'
                ? 'bg-amber-500 text-amber-950 shadow-sm -translate-y-0.5 font-bold'
                : 'bg-white border border-slate-200/80 text-slate-700 hover:border-amber-200 hover:bg-amber-50/50'
            }`}
          >
            <span className="text-2xl mb-1.5">📙</span>
            <span className="text-xs font-bold font-display">3. Praktik Sholat</span>
            <span className={`text-[10px] mt-0.5 ${activeBook === 'sholat' ? 'text-amber-900 font-medium' : 'text-slate-400'}`}>
              Wudhu & 10 Gerakan
            </span>
          </button>

          <button
            onClick={() => setActiveBook('hafalan')}
            className={`flex flex-col items-center justify-center rounded-2xl p-4 text-center transition-all duration-150 cursor-pointer ${
              activeBook === 'hafalan'
                ? 'bg-rose-600 text-white shadow-sm -translate-y-0.5'
                : 'bg-white border border-slate-200/80 text-slate-700 hover:border-rose-200 hover:bg-rose-50/50'
            }`}
          >
            <span className="text-2xl mb-1.5">📕</span>
            <span className="text-xs font-bold font-display">4. Hafalan & Juz 30</span>
            <span className={`text-[10px] mt-0.5 ${activeBook === 'hafalan' ? 'text-rose-100' : 'text-slate-400'}`}>
              Doa Anak & Metode 3T
            </span>
          </button>
        </div>
      </div>

      {/* ================= BOOK 1: MUDAH TAJWID ================= */}
      {activeBook === 'tajwid' && (
        <div className="space-y-6">
          {/* Reference Book Link Callout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#BCD4C0] bg-[#F5FAF6] p-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#516E59] text-white">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#2A4331]">
                  Buku Rujukan Resmi: Buku Panduan Ilmu Tajwid (Dr. Zulkarnain Umar)
                </h4>
                <p className="text-[#516A57]">
                  Tersedia untuk dibaca dan diunduh langsung dari repositori universitas resmi.
                </p>
              </div>
            </div>
            <a
              href={TAJWID_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-white border border-[#A6C5AB] px-4 py-2 font-bold text-[#35543D] hover:bg-[#EAF3EC] transition-colors shrink-0"
            >
              <span>Buka Dokumen PDF Asli</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Filter & Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
              {TAJWID_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTajwidCategoryFilter(cat.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    tajwidCategoryFilter === cat.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-emerald-900 hover:bg-white'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari kaidah tajwid..."
                value={tajwidSearch}
                onChange={(e) => setTajwidSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-1.5 text-xs focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-hidden transition-all"
              />
            </div>
          </div>

          {/* Tajwid Rules Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTajwidRules.map((rule) => (
              <div
                key={rule.id}
                className="rounded-2xl border border-[#D3E0D6] bg-white p-6 shadow-2xs hover:border-[#9ABDA1] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="rounded bg-[#EAF2EC] px-2 py-0.5 text-[10px] font-bold text-[#3D5B44]">
                        {rule.arabicName}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-[#233929]">{rule.name}</h3>
                    </div>
                    <div className="text-[#8BA690]">
                      <RubElHizbIcon size={20} />
                    </div>
                  </div>

                  <p className="text-xs text-[#48634F] leading-relaxed mb-3">
                    {rule.description}
                  </p>

                  <div className="rounded-xl bg-[#F6FAF6] border border-[#DEEADE] p-3 text-xs mb-4">
                    <p className="font-semibold text-[#304B37] mb-1">Huruf-Huruf:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {rule.letters.map((letter, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-[#C6DCB8] bg-white px-2 py-0.5 text-[11px] font-medium text-[#2F4A35]"
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-bold text-[#556F5C] uppercase tracking-wide">
                      Contoh Penerapan Ayat:
                    </p>
                    {rule.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="rounded-xl border border-[#D5E3D8] bg-[#FCFDFC] p-3 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[11px] text-[#556F5C]">
                          <span className="font-semibold">{ex.verse}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handlePlayArabicSpeech(ex.arabic, `${rule.id}-${exIdx}`)}
                              className="flex items-center gap-1 text-[10px] font-semibold text-[#516E59] hover:underline"
                            >
                              {activePlayingVerse === `${rule.id}-${exIdx}` ? (
                                <VolumeX size={13} className="text-red-600" />
                              ) : (
                                <Volume2 size={13} />
                              )}
                              <span>Audio</span>
                            </button>
                          </div>
                        </div>

                        <div className="font-arabic text-xl text-right text-[#1E3324] leading-relaxed">
                          {ex.arabic}
                        </div>
                        <p className="text-xs italic text-[#4A6451]">{ex.latin}</p>
                        <p className="text-[11px] text-[#637C68]">{ex.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-[#6E8874]">Cara Baca: {rule.howToRead}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= BOOK 2: DINUL ISLAM ================= */}
      {activeBook === 'dinul-islam' && (
        <div className="space-y-6">
          {/* Reference Book Link Callout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#BCD4C0] bg-[#F5FAF6] p-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#516E59] text-white">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#2A4331]">
                  Buku Rujukan Resmi: Pendidikan Agama Islam di Perguruan Tinggi Umum (UIN Suska)
                </h4>
                <p className="text-[#516A57]">
                  Membahas pilar-pilar aqidah tauhid, syariah, serta adab dan akhlak terpuji santri.
                </p>
              </div>
            </div>
            <a
              href={DINUL_ISLAM_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-white border border-[#A6C5AB] px-4 py-2 font-bold text-[#35543D] hover:bg-[#EAF3EC] transition-colors shrink-0"
            >
              <span>Buka Dokumen PDF Asli</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Topics List */}
          <div className="space-y-8">
            {DINUL_ISLAM_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="rounded-3xl border border-[#D0DDD2] bg-white p-6 sm:p-8 shadow-xs"
              >
                <div className="flex items-start justify-between gap-4 border-b border-[#E1EDE3] pb-4 mb-6">
                  <div>
                    <span className="rounded bg-[#EAF3EC] px-2.5 py-1 text-xs font-bold text-[#3A5641] uppercase tracking-wide">
                      {topic.category}
                    </span>
                    <h3 className="mt-2 text-xl font-extrabold text-[#233A29]">{topic.title}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#4F6854] max-w-3xl">
                      {topic.summary}
                    </p>
                  </div>
                  <div className="font-arabic text-2xl text-[#516E59] font-bold shrink-0 hidden sm:block">
                    {topic.arabicTitle}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topic.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="rounded-2xl border border-[#DAE7DC] bg-[#FAFDFB] p-4 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-[#273F2F] mb-1.5">{pt.title}</h4>
                        <p className="text-xs text-[#486350] leading-relaxed mb-3">
                          {pt.description}
                        </p>

                        {pt.dalil && (
                          <div className="rounded-xl border border-[#CADECF] bg-white p-3 mb-3 text-right">
                            <div className="font-arabic text-lg text-[#1F3325]">{pt.dalil.arabic}</div>
                            <p className="mt-1 text-[11px] text-left italic text-[#597561]">
                              "{pt.dalil.meaning}"
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="rounded-xl bg-[#EFF6F0] p-2.5 text-[11px] text-[#3A5842] flex items-center gap-2">
                        <CheckCircle size={14} className="text-[#516E59] shrink-0" />
                        <span>
                          <strong>Amalan Santri:</strong> {pt.practiceForKids}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= BOOK 3: PRAKTIK SHOLAT ================= */}
      {activeBook === 'sholat' && (
        <div className="space-y-6">
          {/* Reference Book Link Callout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#BCD4C0] bg-[#F5FAF6] p-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#516E59] text-white">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#2A4331]">
                  Buku Rujukan Resmi: Buku Panduan Praktik Sholat Lengkap (Digilib)
                </h4>
                <p className="text-[#516A57]">
                  Panduan bersuci (wudhu) dan rukun sholat fardhu 5 waktu dengan tuma'ninah.
                </p>
              </div>
            </div>
            <a
              href={PRAKTIK_SHOLAT_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-white border border-[#A6C5AB] px-4 py-2 font-bold text-[#35543D] hover:bg-[#EAF3EC] transition-colors shrink-0"
            >
              <span>Buka Dokumen PDF Asli</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Section: Wudhu */}
          <div className="rounded-3xl border border-[#D0DDD2] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E1EDE3] pb-4 mb-6">
              <div>
                <span className="rounded bg-[#EAF3EC] px-2.5 py-1 text-xs font-bold text-[#3A5641]">
                  BAGIAN 1: THAHARAH
                </span>
                <h3 className="mt-1 text-xl font-extrabold text-[#233A29]">
                  Tata Cara Wudhu Sempurna (9 Langkah)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {WUDHU_STEPS.map((wStep) => (
                <div
                  key={wStep.step}
                  className="rounded-2xl border border-[#D5E3D8] bg-[#FAFDFB] p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#516E59] text-xs font-bold text-white">
                        {wStep.step}
                      </span>
                      <h4 className="text-xs font-bold text-[#253D2D] leading-tight">
                        {wStep.title}
                      </h4>
                    </div>

                    <div className="font-arabic text-base text-right text-[#1E3324] my-2">
                      {wStep.arabic}
                    </div>

                    {wStep.latin && (
                      <p className="text-[11px] italic text-[#4A6451] mb-1">{wStep.latin}</p>
                    )}
                    {wStep.meaning && (
                      <p className="text-[10px] text-gray-500 mb-2">"{wStep.meaning}"</p>
                    )}
                  </div>
                  <p className="text-[11px] text-[#556F5C] pt-2 border-t border-gray-100">
                    {wStep.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: 10 Langkah Gerakan Sholat Fardhu */}
          <div className="rounded-3xl border border-[#D0DDD2] bg-white p-6 sm:p-8 shadow-xs">
            <div className="border-b border-[#E1EDE3] pb-4 mb-6">
              <span className="rounded bg-[#EAF3EC] px-2.5 py-1 text-xs font-bold text-[#3A5641]">
                BAGIAN 2: GERAKAN & BACAAN
              </span>
              <h3 className="mt-1 text-xl font-extrabold text-[#233A29]">
                10 Langkah Gerakan & Bacaan Sholat Fardhu Tuma'ninah
              </h3>
            </div>

            <div className="space-y-6">
              {SHOLAT_STEPS.map((step) => (
                <div
                  key={step.id}
                  className="rounded-2xl border border-[#D7E4DA] bg-[#FCFDFC] p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBF2EC] pb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#516E59] text-xs font-bold text-white">
                        {step.stepNumber}
                      </span>
                      <h4 className="text-base font-bold text-[#233A29]">{step.name}</h4>
                    </div>
                    <span className="font-arabic text-lg text-[#516E59] font-bold">
                      {step.arabicName}
                    </span>
                  </div>

                  <p className="text-xs text-[#4F6854]">{step.description}</p>

                  {step.arabicText && (
                    <div className="rounded-xl border border-[#CADECF] bg-white p-4 text-right">
                      <div className="font-arabic text-2xl text-[#192F20] leading-loose">
                        {step.arabicText}
                      </div>
                      {step.latinText && (
                        <p className="mt-2 text-xs italic text-left text-[#4A6451]">
                          {step.latinText}
                        </p>
                      )}
                      {step.translation && (
                        <p className="mt-1 text-[11px] text-left text-[#617B67]">
                          Artinya: "{step.translation}"
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#526B57] pt-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-[#516E59]" />
                      <strong>Petunjuk Gerakan:</strong> {step.gestureIllustrationNote}
                    </span>
                    {step.arabicText && (
                      <button
                        onClick={() =>
                          handlePlayArabicSpeech(step.arabicText!, `sholat-${step.id}`)
                        }
                        className="flex items-center gap-1 text-[11px] font-bold text-[#3B5A43] hover:underline self-end"
                      >
                        <Volume2 size={14} />
                        <span>Dengarkan Bacaan</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= BOOK 4: HAFALAN & JUZ 30 ================= */}
      {activeBook === 'hafalan' && (
        <div className="space-y-6">
          {/* Sub Navigation */}
          <div className="flex rounded-xl bg-slate-100 p-1 max-w-md border border-slate-200/60">
            <button
              onClick={() => setHafalanSubTab('doa')}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                hafalanSubTab === 'doa' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              Doa Anak-Anak
            </button>
            <button
              onClick={() => setHafalanSubTab('juz30')}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                hafalanSubTab === 'juz30' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              Hafalan Juz 30
            </button>
            <button
              onClick={() => setHafalanSubTab('sistem')}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                hafalanSubTab === 'sistem' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              Sistem Hafalan 3T
            </button>
          </div>

          {/* Sub-tab 1: Doa Anak-Anak */}
          {hafalanSubTab === 'doa' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CHILD_PRAYERS.map((prayer) => (
                <div
                  key={prayer.id}
                  className="rounded-2xl border border-[#D1E0D4] bg-white p-5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded bg-[#EAF2EC] px-2 py-0.5 text-[10px] font-bold text-[#3B5742]">
                        {prayer.category}
                      </span>
                      <button
                        onClick={() => handlePlayArabicSpeech(prayer.arabic, prayer.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-[#516E59] hover:underline"
                      >
                        <Volume2 size={14} />
                        <span>Dengar Doa</span>
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-[#233A2A] mb-3">{prayer.title}</h3>

                    <div className="rounded-xl border border-[#D5E3D8] bg-[#F9FCFA] p-4 text-right mb-3">
                      <div className="font-arabic text-xl sm:text-2xl text-[#1E3324] leading-relaxed">
                        {prayer.arabic}
                      </div>
                    </div>

                    <p className="text-xs italic text-[#48634E] mb-2">{prayer.latin}</p>
                    <p className="text-xs text-[#627C67] mb-3">"{prayer.meaning}"</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-[11px] text-[#4E6A54] flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-[#516E59]" />
                    <span>
                      <strong>Keutamaan:</strong> {prayer.benefit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sub-tab 2: Juz 30 Anak-anak dengan Murottal Qori Internasional & Interactive Word Cloze */}
          {hafalanSubTab === 'juz30' && (
            <div className="space-y-6">
              {/* Studio Qori Internasional Selector */}
              <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50/50 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md animate-wiggle">
                      <Radio size={20} className="text-amber-200" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-emerald-950 flex items-center gap-2">
                        <span>Pilihan Suara Qori Internasional</span>
                        <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300 font-bold">
                          Audio Asli 🎙️
                        </span>
                      </h3>
                      <p className="text-xs text-emerald-800 font-semibold">
                        Dengarkan lantunan tartil merdu dan makhraj fasih dari para Syaikh ternama dunia untuk memandu hafalan anak.
                      </p>
                    </div>
                  </div>

                  {isPlayingAudio && (
                    <div className="flex items-center gap-2 bg-emerald-600 text-white px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-amber-300 animate-ping" />
                      <span>Sedang Memutar: Ayat {currentlyPlayingAyah}</span>
                    </div>
                  )}
                </div>

                {/* Qari list selection chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {INTERNATIONAL_QARIS.map((qari) => {
                    const isSelected = selectedQariId === qari.id;
                    return (
                      <button
                        key={qari.id}
                        onClick={() => setSelectedQariId(qari.id)}
                        className={`flex flex-col text-left rounded-2xl p-3.5 border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-white shadow-md scale-102 ring-2 ring-emerald-300'
                            : 'border-emerald-200/80 bg-white/70 hover:bg-white hover:border-emerald-400'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="text-xl">{qari.flag}</span>
                          <span
                            className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {qari.badge}
                          </span>
                        </div>
                        <span className="text-xs font-black text-emerald-950 leading-snug">
                          {qari.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold mt-1">
                          {qari.country}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Surah Selector Carousel */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-600 block">
                  Pilih Surat Pendek ({JUZ_30_SURAHS.length} Surat Tersedia):
                </span>
                <div className="flex flex-wrap gap-2">
                  {JUZ_30_SURAHS.map((surah, idx) => (
                    <button
                      key={surah.number}
                      onClick={() => {
                        setSelectedSurahIndex(idx);
                        setClozeHideLevel(0);
                      }}
                      className={`rounded-xl px-3.5 py-2 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedSurahIndex === idx
                          ? 'bg-emerald-600 text-white shadow-md scale-105 border-b-2 border-emerald-800'
                          : 'bg-white border border-emerald-200 text-emerald-900 hover:bg-emerald-50 hover:scale-102'
                      }`}
                    >
                      <span className="text-[10px] opacity-75">{surah.number}.</span>
                      <span>{surah.name}</span>
                      <span className="font-arabic text-sm opacity-90">({surah.arabicName})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Surah Detail & Master Player */}
              {(() => {
                const curSurah = JUZ_30_SURAHS[selectedSurahIndex];
                return (
                  <div className="rounded-3xl border-2 border-emerald-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                    {/* Header: Title & Player Master Controls */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-emerald-100 pb-6">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-black text-emerald-950">
                            Surah {curSurah.name}{' '}
                            <span className="font-arabic text-3xl text-emerald-700">
                              ({curSurah.arabicName})
                            </span>
                          </h3>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800 border border-emerald-300">
                            {curSurah.revelationType} · {curSurah.numberOfAyahs} Ayat
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          Arti: "{curSurah.translation}" · Qori:{' '}
                          <strong className="text-emerald-800">{selectedQari.name}</strong> ({selectedQari.country})
                        </p>
                      </div>

                      {/* Main Audio Controls Bar */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Play Full Surah Button */}
                        <button
                          onClick={togglePlayFullSurah}
                          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-black shadow-md transition-all cursor-pointer border-b-4 ${
                            isPlayingAudio && isFullSurahMode
                              ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 border-amber-700 animate-pulse'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-800 hover:scale-105 active:scale-95'
                          }`}
                        >
                          {audioLoading ? (
                            <span className="animate-spin text-base">⏳</span>
                          ) : isPlayingAudio && isFullSurahMode ? (
                            <Pause size={18} />
                          ) : (
                            <Play size={18} className="fill-current" />
                          )}
                          <span>
                            {isPlayingAudio && isFullSurahMode
                              ? 'Jeda Murottal Surat'
                              : 'Putar 1 Surat Penuh ▶'}
                          </span>
                        </button>

                        {/* Stop button */}
                        {isPlayingAudio && (
                          <button
                            onClick={stopAudio}
                            className="rounded-2xl border-2 border-rose-300 bg-rose-50 px-3.5 py-3 text-xs font-black text-rose-700 hover:bg-rose-100 transition-colors"
                            title="Hentikan pemutaran"
                          >
                            Berhenti ⏹
                          </button>
                        )}

                        {/* Repeat Mode Switcher */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
                          <button
                            onClick={() => setRepeatMode('1x')}
                            className={`rounded-xl px-2.5 py-1.5 font-bold transition-all ${
                              repeatMode === '1x'
                                ? 'bg-white text-emerald-900 shadow-2xs font-black'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                            title="Putar ayat 1 kali"
                          >
                            1x
                          </button>
                          <button
                            onClick={() => setRepeatMode('3x')}
                            className={`rounded-xl px-2.5 py-1.5 font-bold transition-all ${
                              repeatMode === '3x'
                                ? 'bg-emerald-600 text-white shadow-2xs font-black'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                            title="Metode Tikrar TPQ: Ulangi 3 kali per ayat"
                          >
                            Ulang 3x 🔁
                          </button>
                          <button
                            onClick={() => setRepeatMode('loop')}
                            className={`rounded-xl px-2.5 py-1.5 font-bold transition-all ${
                              repeatMode === 'loop'
                                ? 'bg-amber-500 text-amber-950 shadow-2xs font-black'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                            title="Ulangi terus menerus tanpa henti"
                          >
                            Loop ♾️
                          </button>
                        </div>

                        {/* Speed Switcher */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
                          <button
                            onClick={() => handleChangeSpeed(0.8)}
                            className={`rounded-xl px-2.5 py-1.5 font-bold transition-all ${
                              playbackSpeed === 0.8
                                ? 'bg-white text-emerald-900 shadow-2xs font-black'
                                : 'text-slate-600'
                            }`}
                            title="Kecepatan lambat untuk belajar tajwid & makhraj"
                          >
                            0.8x Pelan
                          </button>
                          <button
                            onClick={() => handleChangeSpeed(1.0)}
                            className={`rounded-xl px-2.5 py-1.5 font-bold transition-all ${
                              playbackSpeed === 1.0
                                ? 'bg-white text-emerald-900 shadow-2xs font-black'
                                : 'text-slate-600'
                            }`}
                            title="Kecepatan normal"
                          >
                            1.0x Normal
                          </button>
                          <button
                            onClick={() => handleChangeSpeed(1.2)}
                            className={`rounded-xl px-2.5 py-1.5 font-bold transition-all ${
                              playbackSpeed === 1.2
                                ? 'bg-white text-emerald-900 shadow-2xs font-black'
                                : 'text-slate-600'
                            }`}
                            title="Kecepatan lancar"
                          >
                            1.2x Lancar
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Cloze test level switcher (Sembunyikan kata) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-emerald-900 flex items-center gap-1">
                          <span>🧩</span>
                          <span>Uji Tikrar Hafalan Anak:</span>
                        </span>
                        <span className="text-[11px] text-slate-500 font-semibold hidden sm:inline">
                          (Sembunyikan kata bertahap agar anak terlatih mengingat)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-emerald-200">
                        <button
                          onClick={() => setClozeHideLevel(0)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-black transition-all ${
                            clozeHideLevel === 0
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Teks 100%
                        </button>
                        <button
                          onClick={() => setClozeHideLevel(1)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-black transition-all ${
                            clozeHideLevel === 1
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Hilang 33%
                        </button>
                        <button
                          onClick={() => setClozeHideLevel(2)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-black transition-all ${
                            clozeHideLevel === 2
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Hilang 66%
                        </button>
                        <button
                          onClick={() => setClozeHideLevel(3)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-black transition-all ${
                            clozeHideLevel === 3
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Hilang 100% (Tes Memori ⭐)
                        </button>
                      </div>
                    </div>

                    {/* Verses list */}
                    <div className="space-y-4">
                      {curSurah.verses.map((ayah) => {
                        const isCurrentPlaying =
                          currentlyPlayingAyah === ayah.ayahNumber && isPlayingAudio;
                        return (
                          <div
                            key={ayah.ayahNumber}
                            className={`rounded-3xl border-2 p-5 space-y-3 transition-all ${
                              isCurrentPlaying
                                ? 'border-emerald-500 bg-emerald-50/80 shadow-md ring-3 ring-emerald-300'
                                : 'border-slate-200 bg-slate-50/50 hover:border-emerald-300 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs text-slate-600">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`flex h-8 w-8 items-center justify-center rounded-2xl font-black text-xs ${
                                    isCurrentPlaying
                                      ? 'bg-emerald-600 text-white shadow-xs animate-bounce-fun'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                >
                                  {ayah.ayahNumber}
                                </span>
                                {isCurrentPlaying && (
                                  <span className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-white border border-emerald-300 px-3 py-1 rounded-full shadow-2xs">
                                    <span className="flex gap-0.5 items-end h-3">
                                      <span className="w-1 bg-emerald-600 rounded-full h-2 animate-bounce" />
                                      <span className="w-1 bg-emerald-600 rounded-full h-3 animate-bounce delay-75" />
                                      <span className="w-1 bg-emerald-600 rounded-full h-1.5 animate-bounce delay-150" />
                                    </span>
                                    <span>Melantunkan Ayat {ayah.ayahNumber}...</span>
                                  </span>
                                )}
                              </div>

                              {/* Per-Ayat Audio Play Button */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => playAyahAudio(ayah.ayahNumber, false, 0)}
                                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all cursor-pointer ${
                                    isCurrentPlaying
                                      ? 'bg-amber-400 text-amber-950 border border-amber-500 shadow-xs'
                                      : 'bg-white border-2 border-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-white'
                                  }`}
                                  title={`Putar ayat ${ayah.ayahNumber} oleh ${selectedQari.name}`}
                                >
                                  {isCurrentPlaying ? (
                                    <>
                                      <Pause size={13} />
                                      <span>Jeda Ayat</span>
                                    </>
                                  ) : (
                                    <>
                                      <Play size={13} className="fill-current" />
                                      <span>Dengarkan Qori</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="font-arabic text-3xl sm:text-4xl text-right text-emerald-950 leading-loose my-2 select-text font-bold">
                              {renderClozeArabic(ayah.arabic, clozeHideLevel)}
                            </div>

                            {clozeHideLevel === 0 && (
                              <div className="space-y-1 pt-2 border-t border-slate-200/60">
                                <p className="text-xs italic text-emerald-900 font-semibold">
                                  {ayah.latin}
                                </p>
                                <p className="text-xs text-slate-600 font-medium">
                                  "{ayah.translation}"
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Sub-tab 3: Panduan Sistem Hafalan Mudah & Praktis (3T) */}
          {hafalanSubTab === 'sistem' && (
            <div className="rounded-3xl border border-[#CBDCCE] bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-[#E1EDE3] pb-4">
                <span className="rounded bg-[#EAF3EC] px-2.5 py-1 text-xs font-bold text-[#3A5641]">
                  SISTEM HAFALAN PRAKTIS
                </span>
                <h3 className="mt-2 text-2xl font-extrabold text-[#233A29]">
                  {MEMORIZATION_METHOD_GUIDE.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#4F6854]">
                  {MEMORIZATION_METHOD_GUIDE.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MEMORIZATION_METHOD_GUIDE.steps.map((st) => (
                  <div
                    key={st.step}
                    className="rounded-2xl border border-[#D5E3D8] bg-[#FAFDFB] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <span className="rounded-md bg-[#516E59] px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                        {st.badge}
                      </span>
                      <h4 className="mt-3 text-base font-bold text-[#233A29]">{st.title}</h4>
                      <p className="mt-2 text-xs text-[#4F6854] leading-relaxed">{st.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#516E59]">
                      <span className="text-[11px] text-[#6E8874]">Langkah #{st.step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
